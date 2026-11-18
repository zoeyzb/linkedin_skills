#!/usr/bin/env node
const fs = require("node:fs");
const path = require("node:path");
const {
  openDatabase,
  upsertLead,
  listLeads,
  getSummary,
  getReport,
  getResearchQueue,
  getOutreachSteps,
  recordActivity,
  exportLeadsCsv,
  canonicalizeLinkedInUrl,
  closeDatabase
} = require("./database");
const { buildLinkedInSearches } = require("./searches");
const { createAppServer } = require("./server");
const { runSyncCycle, syncLoop } = require("./browser-sync");

const ROOT = path.resolve(__dirname, "../..");
const DB_PATH = process.env.LINKEDIN_CLIENT_DB || path.join(ROOT, "state", "linkedin-client-engine.sqlite3");
const [command, ...args] = process.argv.slice(2);

function usage() {
  console.log(`LinkedIn Client Engine

Commands:
  init                         Create the local SQLite database
  searches                     Print LinkedIn People and Posts search URLs
  import-json <file|->          Import a research batch JSON file; use - to read stdin
  summary                      Show today's ten-prospect target and pipeline
  brief                        Print ChatGPT-ready research, drafts, follow-ups and search links
  research-queue [limit]       Show prospects waiting for research/verification
  report <daily|weekly>        Print evidence-backed outreach performance
  activity <url> <type> [note] Record a manual LinkedIn engagement
  sequence <url>               Show the saved editable outreach sequence
  list [status]                List stored prospects
  export-csv <file>             Export prospect and draft records
  package-skill                 Build and verify the Agent Skill ZIP
  serve [port]                  Start the localhost dashboard (default 4177)
  sync-once                     Read LinkedIn through the existing bridge and publish the dashboard snapshot
  sync [seconds]                Run read-only LinkedIn browser sync continuously (default 600s)

No command sends LinkedIn invitations or messages.
`);
}

function withDatabase(fn) {
  const db = openDatabase(DB_PATH);
  try {
    return fn(db);
  } finally {
    closeDatabase(db);
  }
}

function main() {
  if (!command || command === "help" || command === "--help") {
    usage();
    return;
  }
  if (command === "init") {
    withDatabase(() => {});
    console.log(JSON.stringify({ status: "initialized", database: DB_PATH }, null, 2));
    return;
  }
  if (command === "searches") {
    console.log(JSON.stringify(buildLinkedInSearches(), null, 2));
    return;
  }
  if (command === "import-json") {
    const file = args[0];
    if (!file) throw new Error("Usage: import-json <file>");
    const raw = file === "-" ? fs.readFileSync(0, "utf8") : fs.readFileSync(path.resolve(process.cwd(), file), "utf8");
    const parsed = JSON.parse(raw);
    const leads = Array.isArray(parsed) ? parsed : parsed.leads;
    if (!Array.isArray(leads)) throw new Error("Import JSON must be an array or contain a leads array");
    if (leads.length > 500) throw new Error("Import limit is 500 prospects per batch");
    const result = withDatabase((db) => {
      const seen = new Set();
      let imported = 0;
      let duplicates = 0;
      const errors = [];
      leads.forEach((lead, index) => {
        try {
          const canonical = canonicalizeLinkedInUrl(lead.linkedin_url || lead.linkedin_profile_url);
          const existed = Boolean(db.prepare("SELECT 1 AS found FROM leads WHERE linkedin_url = ?").get(canonical));
          const duplicateInBatch = seen.has(canonical);
          const saved = upsertLead(db, lead);
          if (existed || duplicateInBatch) duplicates += 1;
          else imported += 1;
          seen.add(saved.linkedin_url);
        } catch (error) {
          errors.push({ index, error: error.message });
        }
      });
      return { imported, duplicates, errors };
    });
    console.log(JSON.stringify(result, null, 2));
    return;
  }
  if (command === "summary") {
    console.log(JSON.stringify(withDatabase((db) => getSummary(db)), null, 2));
    return;
  }
  if (command === "brief") {
    const now = new Date().toISOString();
    const result = withDatabase((db) => {
      const leads = listLeads(db, { limit: 10000 });
      const closed = new Set(["not_interested", "rejected", "archived", "booked"]);
      return {
        generated_at: now,
        summary: getSummary(db, { now }),
        due_followups: leads.filter((lead) =>
          lead.next_follow_up_at && lead.next_follow_up_at <= now && !closed.has(lead.status)
        ).slice(0, 50),
        upcoming_followups: leads.filter((lead) =>
          lead.next_follow_up_at && lead.next_follow_up_at > now && !closed.has(lead.status)
        ).sort((a, b) => a.next_follow_up_at.localeCompare(b.next_follow_up_at)).slice(0, 50),
        outreach_ready: leads.filter((lead) =>
          lead.qualification_status === "qualified" && ["qualified", "drafted"].includes(lead.status)
        ).slice(0, 50),
        needs_review: leads.filter((lead) => lead.qualification_status === "needs_review").slice(0, 25),
        research_queue: getResearchQueue(db, { limit: 25 }),
        searches: buildLinkedInSearches()
      };
    });
    console.log(JSON.stringify(result, null, 2));
    return;
  }
  if (command === "research-queue") {
    const limit = args[0] ? Number(args[0]) : 25;
    if (!Number.isInteger(limit) || limit < 1 || limit > 1000) throw new Error("Limit must be an integer from 1 to 1000");
    console.log(JSON.stringify(withDatabase((db) => getResearchQueue(db, { limit })), null, 2));
    return;
  }
  if (command === "report") {
    const kind = String(args[0] || "weekly").toLowerCase();
    if (!["daily", "weekly"].includes(kind)) throw new Error("Usage: report <daily|weekly>");
    const end = new Date();
    const start = new Date(end);
    if (kind === "daily") {
      start.setHours(0, 0, 0, 0);
    } else {
      start.setDate(start.getDate() - 6);
      start.setHours(0, 0, 0, 0);
    }
    console.log(JSON.stringify(withDatabase((db) => getReport(db, {
      start: start.toISOString(),
      end: end.toISOString()
    })), null, 2));
    return;
  }
  if (command === "activity") {
    const profileUrl = args[0];
    const activityType = args[1];
    const note = args.slice(2).join(" ");
    if (!profileUrl || !activityType) throw new Error("Usage: activity <url> <type> [note]");
    console.log(JSON.stringify(withDatabase((db) => recordActivity(db, profileUrl, activityType, note)), null, 2));
    return;
  }
  if (command === "sequence") {
    const profileUrl = args[0];
    if (!profileUrl) throw new Error("Usage: sequence <url>");
    console.log(JSON.stringify(withDatabase((db) => getOutreachSteps(db, profileUrl)), null, 2));
    return;
  }
  if (command === "list") {
    const status = args[0] || "";
    console.log(JSON.stringify(withDatabase((db) => listLeads(db, { status })), null, 2));
    return;
  }
  if (command === "export-csv") {
    const file = args[0];
    if (!file) throw new Error("Usage: export-csv <file>");
    const output = path.resolve(process.cwd(), file);
    fs.mkdirSync(path.dirname(output), { recursive: true });
    fs.writeFileSync(output, withDatabase((db) => exportLeadsCsv(db)), "utf8");
    console.log(JSON.stringify({ exported: output }, null, 2));
    return;
  }
  if (command === "package-skill") {
    const { packageSkill } = require("./package-skill");
    console.log(JSON.stringify({ package: packageSkill(), status: "verified" }, null, 2));
    return;
  }
  if (command === "sync-once") {
    console.log(JSON.stringify(runSyncCycle(), null, 2));
    return;
  }
  if (command === "sync") {
    const interval = args[0] ? Number(args[0]) : 600;
    if (!Number.isInteger(interval) || interval < 120) throw new Error("Sync interval must be an integer of at least 120 seconds");
    syncLoop(interval);
    return;
  }
  if (command === "serve") {
    const port = args[0] ? Number(args[0]) : 4177;
    if (!Number.isInteger(port) || port < 0 || port > 65535) throw new Error("Port must be an integer from 0 to 65535");
    const app = createAppServer({ dbPath: DB_PATH, host: "127.0.0.1", port });
    app.listen().then((address) => {
      console.log(`LinkedIn Client Engine running at http://127.0.0.1:${address.port}`);
      console.log(`Database: ${DB_PATH}`);
      console.log("The dashboard prepares drafts only. Send LinkedIn messages manually.");
    }).catch((error) => {
      console.error(error.message);
      process.exitCode = 1;
    });
    process.on("SIGINT", async () => {
      await app.close();
      process.exit(0);
    });
    return;
  }
  usage();
  throw new Error(`Unknown command: ${command}`);
}

try {
  main();
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
