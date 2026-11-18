const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { execFileSync } = require("node:child_process");

const ROOT = path.resolve(__dirname, "../..");
const CLI = path.join(ROOT, "scripts", "client-engine", "cli.js");

function lead(overrides = {}) {
  return {
    name: "Alex Rivera",
    title: "Founder",
    company: "Northstar Commerce",
    linkedin_url: "https://www.linkedin.com/in/alex-rivera/",
    source_url: "https://www.linkedin.com/posts/alex-rivera_shopify-developer-activity-123/",
    source_type: "linkedin_post",
    signal_type: "explicit_request",
    signal_strength: "explicit",
    contact_path: "connection_request_note",
    signal_summary: "Founder publicly asked for recommendations for a Shopify developer for a new store launch.",
    signal_date: new Date().toISOString().slice(0, 10),
    evidence_status: "verified",
    score_breakdown: { need: 290, service_fit: 240, authority: 145, timing: 140, reachability: 90, capacity: 45 },
    score_evidence: { need: "Founder explicitly requested a Shopify developer.", service_fit: "The request maps directly to Shopify development.", authority: "Profile identifies this person as founder.", timing: "The post was published three days ago.", reachability: "Connection request is available on the profile.", capacity: "The store is active and has current products." },
    fit_reason: "The founder explicitly needs Shopify development support.",
    contact_path: "connection_request_note",
    invitation_draft: "A specific invitation based on the request.",
    first_dm_draft: "A researched post-acceptance message.",
    follow_up_draft: "A useful follow-up with new context.",
    ...overrides
  };
}

test("CLI imports a ChatGPT batch, counts existing duplicates and reports the ten-lead target", () => {
  const folder = fs.mkdtempSync(path.join(os.tmpdir(), "linkedin-client-cli-"));
  const dbPath = path.join(folder, "leads.sqlite3");
  const jsonPath = path.join(folder, "batch.json");
  const env = { ...process.env, LINKEDIN_CLIENT_DB: dbPath };

  try {
    fs.writeFileSync(jsonPath, JSON.stringify({ daily_target: 10, leads: [lead()] }), "utf8");
    const first = JSON.parse(execFileSync(process.execPath, [CLI, "import-json", jsonPath], { cwd: ROOT, env, encoding: "utf8" }));
    assert.equal(first.imported, 1);
    assert.equal(first.duplicates, 0);

    const second = JSON.parse(execFileSync(process.execPath, [CLI, "import-json", jsonPath], { cwd: ROOT, env, encoding: "utf8" }));
    assert.equal(second.imported, 0);
    assert.equal(second.duplicates, 1);

    const summary = JSON.parse(execFileSync(process.execPath, [CLI, "summary"], { cwd: ROOT, env, encoding: "utf8" }));
    assert.equal(summary.daily_target, 10);
    assert.equal(summary.qualified_today, 1);
    assert.equal(summary.drafted_today, 1);
  } finally {
    fs.rmSync(folder, { recursive: true, force: true });
  }
});

test("CLI imports a research batch from stdin without a temporary file", () => {
  const folder = fs.mkdtempSync(path.join(os.tmpdir(), "linkedin-client-stdin-"));
  const dbPath = path.join(folder, "leads.sqlite3");
  const env = { ...process.env, LINKEDIN_CLIENT_DB: dbPath };
  try {
    const result = JSON.parse(execFileSync(process.execPath, [CLI, "import-json", "-"], {
      cwd: ROOT,
      env,
      encoding: "utf8",
      input: JSON.stringify({ leads: [lead()] })
    }));
    assert.equal(result.imported, 1);
    assert.equal(result.duplicates, 0);
    const records = JSON.parse(execFileSync(process.execPath, [CLI, "list"], {
      cwd: ROOT, env, encoding: "utf8"
    }));
    assert.equal(records.length, 1);
    assert.equal(records[0].name, "Alex Rivera");
  } finally {
    fs.rmSync(folder, { recursive: true, force: true });
  }
});

test("daily brief gives ChatGPT one structured view of due follow-ups, ready prospects and review queue", () => {
  const folder = fs.mkdtempSync(path.join(os.tmpdir(), "linkedin-client-brief-"));
  const dbPath = path.join(folder, "leads.sqlite3");
  const env = { ...process.env, LINKEDIN_CLIENT_DB: dbPath };
  try {
    execFileSync(process.execPath, [CLI, "import-json", "-"], {
      cwd: ROOT,
      env,
      encoding: "utf8",
      input: JSON.stringify({ leads: [lead()] })
    });
    const { openDatabase, upsertLead, setLeadStatus, closeDatabase } = require("../../scripts/client-engine/database");
    const db = openDatabase(dbPath);
    const now = Date.now();
    const sentAt = new Date(now - 60000).toISOString();
    const dueAt = new Date(now - 30000).toISOString();
    setLeadStatus(db, lead().linkedin_url, "invitation_sent", {
      manualConfirmed: true, now: new Date(now - 180000).toISOString()
    });
    setLeadStatus(db, lead().linkedin_url, "connected", {
      manualConfirmed: true, now: new Date(now - 120000).toISOString()
    });
    setLeadStatus(db, lead().linkedin_url, "dm_sent", {
      manualConfirmed: true, now: sentAt
    });
    setLeadStatus(db, lead().linkedin_url, "follow_up_due", {
      now: sentAt, next_follow_up_at: dueAt
    });
    const reviewLead = upsertLead(db, lead({
      name: "Jamie Chen",
      linkedin_url: "https://www.linkedin.com/in/jamie-chen/",
      signal_type: "profile_only",
      signal_strength: "weak",
      signal_summary: "The profile describes the company but contains no current buying request.",
      invitation_draft: "",
      first_dm_draft: "",
      follow_up_draft: ""
    }));
    assert.equal(reviewLead.qualification_status, "needs_review");
    closeDatabase(db);

    const brief = JSON.parse(execFileSync(process.execPath, [CLI, "brief"], {
      cwd: ROOT, env, encoding: "utf8"
    }));
    assert.equal(brief.summary.daily_target, 10);
    assert.equal(brief.summary.followups_due, 1);
    assert.equal(brief.due_followups.length, 1);
    assert.equal(brief.due_followups[0].name, "Alex Rivera");
    assert.equal(brief.outreach_ready.length, 0);
    assert.equal(brief.needs_review.length, 1);
    assert.equal(brief.needs_review[0].name, "Jamie Chen");
    assert.equal(brief.searches.length, 19);
  } finally {
    fs.rmSync(folder, { recursive: true, force: true });
  }
});
