const path = require("node:path");
const os = require("node:os");
const crypto = require("node:crypto");
const { execFileSync } = require("node:child_process");
const { openDatabase, listLeads, getSummary, getReport, listMeetings, listServiceRequests, recordReply, upsertLead, closeDatabase } = require("./database");
const { buildLinkedInSearches } = require("./searches");
const { buildCloudSnapshot } = require("./cloud-state");

const ROOT = path.resolve(__dirname, "../..");
const DB_PATH = process.env.LINKEDIN_CLIENT_DB || path.join(ROOT, "state", "linkedin-client-engine.sqlite3");
const BRIDGE = process.env.LINKEDIN_BROWSER_BRIDGE || path.join(os.homedir(), "Projects/chatgpt-chrome-bridge/browser-bridge.js");
const SYNC_STATE = path.join(ROOT, "state", "browser-sync.json");
const SEARCHES_PER_SYNC = Math.max(1, Math.min(5, Number(process.env.LINKEDIN_SEARCHES_PER_SYNC || 2)));

function sleep(ms) {
  execFileSync("sleep", [String(Math.ceil(ms / 1000))], { stdio: "ignore" });
}

function bridge(args) {
  return execFileSync("node", [BRIDGE, ...args], { encoding: "utf8", maxBuffer: 8 * 1024 * 1024 }).trim();
}

function bridgeJson(args) {
  const raw = bridge(args);
  try {
    const first = JSON.parse(raw);
    if (typeof first === "string") {
      try { return JSON.parse(first); } catch (_) { return first; }
    }
    return first;
  } catch (_) {
    throw new Error("Browser bridge returned invalid JSON: " + raw.slice(0, 500));
  }
}

function openLinkedIn(url) {
  if (!/^https:\/\/(www\.)?linkedin\.com\//i.test(url)) throw new Error("Only LinkedIn URLs are allowed");
  bridge(["open", url]);
  sleep(1);
}

function evalLinkedIn(expression) {
  return bridgeJson(["eval", "linkedin.com", expression]);
}

function parseMessagingPage(input) {
  const rows = Array.isArray(input) ? input : Array.isArray(input?.conversations) ? input.conversations : [];
  return rows.map((row) => {
    const snippet = String(row.snippet || row.text || "").trim();
    const participant = String(row.name || row.participant || "").trim();
    const direction = /^you\s*:/i.test(snippet) ? "outbound" : (snippet ? "inbound" : "unknown");
    const servicePage = /via\s+services\s+page/i.test(String(row.marker || "") + " " + snippet);
    return {
      name: participant,
      snippet: snippet.replace(/^you\s*:\s*/i, "").trim(),
      direction,
      service_page: servicePage,
      thread_url: /^https:\/\/(www\.)?linkedin\.com\//i.test(String(row.thread_url || "")) ? row.thread_url : null,
      profile_url: /^https:\/\/(www\.)?linkedin\.com\/in\//i.test(String(row.profile_url || "")) ? row.profile_url : null,
      observed_at: row.observed_at || new Date().toISOString()
    };
  }).filter((row) => row.name && row.snippet);
}

function parseServiceRequestsPage(input) {
  const rows = Array.isArray(input) ? input : Array.isArray(input?.requests) ? input.requests : [];
  return rows.map((row) => {
    const text = String(row.text || row.details || "").trim();
    const explicit = String(row.request_type || row.type || "").trim().toLowerCase();
    const requestType = ["premium", "matched"].some((value) => explicit.includes(value) || text.toLowerCase().includes(value))
      ? "premium"
      : "direct";
    const sourceUrl = String(row.source_url || "https://www.linkedin.com/my-items/projects/");
    if (!/^https:\/\/(www\.)?linkedin\.com\//i.test(sourceUrl)) return null;
    return {
      request_type: requestType,
      linkedin_url: /^https:\/\/(www\.)?linkedin\.com\/in\//i.test(String(row.linkedin_url || "")) ? row.linkedin_url : null,
      name: String(row.name || row.person || "").trim() || "LinkedIn Service Request",
      company: String(row.company || "").trim(),
      service: String(row.service || "").trim() || "LinkedIn Service Request",
      scope: String(row.scope || "").trim(),
      timeline: String(row.timeline || "").trim(),
      business_size: String(row.business_size || "").trim(),
      budget: String(row.budget || "").trim(),
      details: text,
      source_url: sourceUrl,
      received_at: row.received_at || new Date().toISOString(),
      request_key: row.request_key || crypto.createHash("sha256").update([requestType, row.linkedin_url || "", row.name || "", row.service || "", text].join("|")).digest("hex").slice(0, 32)
    };
  }).filter(Boolean);
}

function parseSearchResultsPage(input, sourceUrl) {
  const rows = Array.isArray(input) ? input : Array.isArray(input?.results) ? input.results : [];
  if (!/^https:\/\/(www\.)?linkedin\.com\/search\/results\//i.test(sourceUrl)) throw new Error("Search source must be a LinkedIn search URL");
  const seen = new Set();
  return rows.map((row) => {
    const profileUrl = String(row.profile_url || row.linkedin_url || "").trim();
    if (!/^https:\/\/(www\.)?linkedin\.com\/in\//i.test(profileUrl)) return null;
    const canonical = profileUrl.replace(/[?#].*$/, "").replace(/\/$/, "").toLowerCase() + "/";
    if (seen.has(canonical)) return null;
    seen.add(canonical);
    return {
      linkedin_url: canonical,
      name: String(row.name || "").trim(),
      title: String(row.title || row.headline || "").trim(),
      company: String(row.company || "").trim(),
      evidence_text: String(row.evidence_text || row.text || "").trim().slice(0, 5000),
      source_url: sourceUrl,
      source_type: String(row.source_type || "linkedin_search_result"),
      discovered_at: row.discovered_at || new Date().toISOString()
    };
  }).filter(Boolean);
}

function messagingExpression() {
  return `JSON.stringify(Array.from(document.querySelectorAll("h3.msg-conversation-listitem__participant-names")).slice(0,80).map(h=>{let e=h;for(let i=0;i<6&&e;i++,e=e.parentElement){const t=(e.innerText||"").trim();if(t&&t.length<5000&&/You:|Via Services Page|Messages|Service Page/i.test(t)){return {name:(h.innerText||"").trim(),text:t.slice(0,1200),observed_at:new Date().toISOString()};}}return {name:(h.innerText||"").trim(),text:"",observed_at:new Date().toISOString()};}).filter(x=>x.name&&x.text))`;
}

function serviceRequestExpression() {
  return `JSON.stringify(Array.from(document.querySelectorAll("a[href*="/in/"]")).map(a=>{let e=a;for(let i=0;i<7&&e;i++,e=e.parentElement){const t=(e.innerText||"").trim();if(t&&/service|request|budget|timeline/i.test(t)&&t.length<7000)return {name:(a.innerText||"").trim(),linkedin_url:a.href,text:t.slice(0,5000),observed_at:new Date().toISOString()};}return null;}).filter(Boolean).slice(0,80))`;
}

function searchExpression() {
  return `JSON.stringify(Array.from(document.querySelectorAll("a[href*="/in/"]")).map(a=>{let e=a;for(let i=0;i<9&&e;i++,e=e.parentElement){const t=(e.innerText||"").trim();if(t&&/Feed post|Follow|Open control menu/i.test(t)&&t.length<10000)return {name:(a.innerText||"").trim(),profile_url:a.href,text:t.slice(0,7000),source_type:"linkedin_search_result",discovered_at:new Date().toISOString()};}return null;}).filter(Boolean).slice(0,60))`;
}

function loadSyncState() {
  try { return JSON.parse(require("node:fs").readFileSync(SYNC_STATE, "utf8")); } catch (_) { return { search_index: 0, last_action_id: 0 }; }
}

function saveSyncState(state) {
  const fs = require("node:fs");
  fs.mkdirSync(path.dirname(SYNC_STATE), { recursive: true });
  fs.writeFileSync(SYNC_STATE, JSON.stringify(state, null, 2));
}

function applyMessaging(db, rows) {
  const leads = listLeads(db, { limit: 10000 });
  let inbound = 0;
  let servicePage = 0;
  for (const row of rows) {
    if (row.direction !== "inbound") continue;
    const lead = leads.find((item) => item.name.toLowerCase() === row.name.toLowerCase());
    if (!lead) continue;
    const marker = crypto.createHash("sha256").update([lead.id, row.snippet, row.observed_at.slice(0, 16)].join("|")).digest("hex");
    const exists = db.prepare("SELECT 1 FROM activities WHERE lead_id = ? AND activity_type = 'browser_reply_seen' AND note = ?").get(lead.id, marker);
    if (exists) continue;
    recordReply(db, lead.linkedin_url, { text: row.snippet, classification: "needs_review", draft: "" }, { now: row.observed_at });
    db.prepare("INSERT INTO activities (lead_id, activity_type, note, created_at) VALUES (?, ?, ?, ?)").run(lead.id, "browser_reply_seen", marker, row.observed_at);
    inbound += 1;
    if (row.service_page) servicePage += 1;
  }
  return { inbound, servicePage };
}

function applyServiceRequests(db, rows) {
  let created = 0;
  for (const row of rows) {
    const existing = db.prepare("SELECT id FROM service_requests WHERE request_key = ?").get(row.request_key);
    if (existing) continue;
    const request = require("./database").createServiceRequest(db, row);
    if (request) created += 1;
  }
  return { created };
}

function applySearchResults(db, rows) {
  let discovered = 0;
  for (const row of rows) {
    try {
      const existing = db.prepare("SELECT id FROM leads WHERE linkedin_url = ?").get(row.linkedin_url);
      if (existing) continue;
      upsertLead(db, {
        linkedin_url: row.linkedin_url,
        name: row.name || "LinkedIn prospect",
        title: row.title || "LinkedIn prospect",
        company: row.company || "Unknown",
        source_url: row.source_url,
        source_type: row.source_type,
        signal_summary: row.evidence_text,
        signal_strength: "weak",
        evidence_status: "needs_review",
        qualification_status: "needs_review",
        research_status: "needs_review",
        score: 0
      });
      discovered += 1;
    } catch (_) {}
  }
  return { discovered };
}

function collectSource(db, browserObservations, searches) {
  const leads = listLeads(db, { limit: 10000 });
  const replies = db.prepare("SELECT replies.*, leads.name, leads.company, leads.linkedin_url FROM replies JOIN leads ON leads.id = replies.lead_id ORDER BY replies.created_at DESC LIMIT 100").all();
  const followups = db.prepare("SELECT name, company, linkedin_url, status, next_follow_up_at, follow_up_draft FROM leads WHERE next_follow_up_at IS NOT NULL ORDER BY next_follow_up_at ASC LIMIT 100").all();
  const meetings = listMeetings(db, { limit: 100 });
  const serviceRequests = listServiceRequests(db, { limit: 100 });
  const report = getReport(db, {
    start: new Date(Date.now() - 7 * 86400000).toISOString(),
    end: new Date().toISOString()
  });
  return {
    summary: { ...getSummary(db), report },
    leads,
    service_requests: serviceRequests,
    replies,
    followups,
    meetings,
    searches: searches.map((item) => ({ ...item, observed_at: new Date().toISOString() })),
    browser_observations: browserObservations
  };
}

function syncOnce(options = {}) {
  const db = openDatabase(DB_PATH);
  const state = loadSyncState();
  const observations = [];
  try {
    openLinkedIn("https://www.linkedin.com/messaging/");
    const messagingRaw = evalLinkedIn(messagingExpression());
    const messaging = parseMessagingPage(messagingRaw);
    const messagingResult = applyMessaging(db, messaging);
    observations.push({ kind: "messaging", ...messagingResult, checked_at: new Date().toISOString() });

    openLinkedIn("https://www.linkedin.com/my-items/projects/");
    const serviceRaw = evalLinkedIn(serviceRequestExpression());
    const serviceRequests = parseServiceRequestsPage(serviceRaw);
    const serviceResult = applyServiceRequests(db, serviceRequests);
    observations.push({ kind: "service_requests", ...serviceResult, checked_at: new Date().toISOString() });

    const allSearches = buildLinkedInSearches();
    const count = Math.min(SEARCHES_PER_SYNC, allSearches.length);
    for (let offset = 0; offset < count; offset += 1) {
      const index = (state.search_index + offset) % allSearches.length;
      const search = allSearches[index];
      openLinkedIn(search.url);
      const searchRaw = evalLinkedIn(searchExpression());
      const results = parseSearchResultsPage(searchRaw, search.url);
      const result = applySearchResults(db, results);
      observations.push({ kind: "search", search_id: search.id, discovered: result.discovered, checked_at: new Date().toISOString() });
    }
    state.search_index = (state.search_index + count) % allSearches.length;

    const source = collectSource(db, observations, allSearches);
    const snapshot = buildCloudSnapshot(source, { syncedAt: new Date().toISOString() });
    saveSyncState(state);
    return { snapshot, observations, state };
  } finally {
    closeDatabase(db);
  }
}

const { setLeadStatus, saveDrafts, recordMeeting, createServiceRequest } = require("./database");

function vercelRequest(args) {
  const raw = execFileSync("vercel", ["curl", ...args], { encoding: "utf8", maxBuffer: 8 * 1024 * 1024 }).trim();
  try { return JSON.parse(raw); } catch (_) { throw new Error("Vercel sync API returned invalid JSON: " + raw.slice(0, 500)); }
}

function pullCloudActions(afterId) {
  return vercelRequest(["/api/actions?after_id=" + Math.max(0, Number(afterId) || 0)]);
}

function ackCloudActions(ids) {
  if (!ids.length) return [];
  return vercelRequest(["/api/actions", "-X", "PATCH", "-H", "Content-Type: application/json", "-d", JSON.stringify({ ids })]);
}

function pushCloudSnapshot(snapshot) {
  return vercelRequest(["/api/sync", "-X", "POST", "-H", "Content-Type: application/json", "-d", JSON.stringify({ snapshot })]);
}

function applyCloudAction(db, action) {
  const payload = action.payload || {};
  const profileUrl = String(payload.linkedin_url || "").trim();
  switch (action.action_type) {
    case "copy_draft":
      return { action: action.action_type, applied: true, note: "Copy is a dashboard-only action" };
    case "upsert_lead":
      upsertLead(db, payload);
      return { action: action.action_type, applied: true };
    case "save_drafts":
      saveDrafts(db, payload.linkedin_url, payload.drafts || {}, { now: new Date().toISOString() });
      return { action: action.action_type, applied: true };
    case "record_activity":
      require("./database").recordActivity(db, payload.linkedin_url, payload.activity_type, payload.note || "", { now: new Date().toISOString() });
      return { action: action.action_type, applied: true };
    case "mark_invitation_sent":
      setLeadStatus(db, profileUrl, "invitation_sent", { manualConfirmed: true, note: "Confirmed from hosted dashboard" });
      return { action: action.action_type, applied: true };
    case "mark_connected":
      setLeadStatus(db, profileUrl, "connected", { manualConfirmed: true, note: "Confirmed from hosted dashboard" });
      return { action: action.action_type, applied: true };
    case "mark_dm_sent":
      setLeadStatus(db, profileUrl, "dm_sent", { manualConfirmed: true, note: "Confirmed from hosted dashboard" });
      return { action: action.action_type, applied: true };
    case "schedule_followup":
      setLeadStatus(db, profileUrl, "follow_up_due", { next_follow_up_at: payload.next_follow_up_at, note: "Scheduled from hosted dashboard" });
      return { action: action.action_type, applied: true };
    case "record_reply": {
      const reply = payload.reply || payload;
      recordReply(db, profileUrl, {
        text: reply.text,
        classification: reply.classification || "needs_review",
        draft: reply.draft || "",
        next_follow_up_at: reply.next_follow_up_at || null
      });
      return { action: action.action_type, applied: true };
    }
    case "record_meeting": {
      const meeting = payload.meeting || payload;
      recordMeeting(db, profileUrl, meeting, { now: new Date().toISOString() });
      return { action: action.action_type, applied: true };
    }
    case "mark_service_request_reviewed":
    case "mark_service_request_responded":
    case "archive": {
      const status = action.action_type === "mark_service_request_reviewed"
        ? "reviewed"
        : action.action_type === "mark_service_request_responded"
          ? "responded"
          : "archived";
      if (payload.request_key) {
        db.prepare("UPDATE service_requests SET status = ?, updated_at = ? WHERE request_key = ?").run(status, new Date().toISOString(), payload.request_key);
      }
      return { action: action.action_type, applied: true };
    }
    default:
      throw new Error("Unsupported cloud action: " + action.action_type);
  }
}

function runSyncCycle(options = {}) {
  const state = loadSyncState();
  const db = openDatabase(DB_PATH);
  let actionResults = [];
  let appliedIds = [];
  try {
    const actions = pullCloudActions(state.last_action_id || 0);
    for (const action of actions) {
      try {
        const result = applyCloudAction(db, action);
        actionResults.push({ id: action.id, ...result });
        appliedIds.push(action.id);
        state.last_action_id = Math.max(state.last_action_id || 0, Number(action.id));
      } catch (error) {
        actionResults.push({ id: action.id, applied: false, error: error.message });
        break;
      }
    }
  } finally {
    closeDatabase(db);
  }
  if (appliedIds.length) ackCloudActions(appliedIds);
  const result = syncOnce(options);
  const cloud = pushCloudSnapshot(result.snapshot);
  saveSyncState({ ...result.state, last_action_id: state.last_action_id || 0, last_sync_at: result.snapshot.generated_at });
  return { ...result, actionResults, cloud };
}

async function syncLoop(intervalSeconds = 600) {
  const interval = Math.max(120, Number(intervalSeconds) || 600);
  const run = () => {
    try {
      const result = runSyncCycle();
      console.log(JSON.stringify({
        ok: true,
        synced_at: result.snapshot.generated_at,
        observations: result.observations,
        actions: result.actionResults
      }, null, 2));
    } catch (error) {
      console.error(JSON.stringify({ ok: false, error: error.message }, null, 2));
      process.exitCode = 1;
    }
  };
  run();
  setInterval(run, interval * 1000);
}

module.exports = {
  parseMessagingPage,
  parseServiceRequestsPage,
  parseSearchResultsPage,
  syncOnce,
  runSyncCycle,
  syncLoop,
  loadSyncState,
  saveSyncState
};
