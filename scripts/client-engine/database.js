const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const { DatabaseSync } = require("node:sqlite");
const { evaluateLead, validHttpsUrl, validLinkedInProfileUrl } = require("./qualification");

const VALID_STATUSES = new Set([
  "discovered", "needs_review", "qualified", "drafted", "invitation_sent",
  "connected", "dm_sent", "replied", "follow_up_due", "booked",
  "not_interested", "rejected", "archived"
]);
const EXTERNAL_EVENT_STATUSES = new Set(["invitation_sent", "connected", "dm_sent", "booked"]);
const MANUAL_ACTIVITY_TYPES = new Set([
  "followed", "follow_back", "liked", "commented", "profile_viewed", "saved_post", "post_shared"
]);
const DEFAULT_OUTREACH_SEQUENCE = Object.freeze([
  { step_number: 1, step_type: "connection", channel: "linkedin", draft_field: "invitation_draft" },
  { step_number: 2, step_type: "first_dm", channel: "linkedin", draft_field: "first_dm_draft" },
  { step_number: 3, step_type: "follow_up", channel: "linkedin", draft_field: "follow_up_draft" }
]);
const ALLOWED_TRANSITIONS = Object.freeze({
  discovered: ["needs_review", "rejected", "archived"],
  needs_review: ["rejected", "archived"],
  qualified: ["drafted", "invitation_sent", "connected", "dm_sent", "not_interested", "archived"],
  drafted: ["invitation_sent", "connected", "dm_sent", "not_interested", "archived"],
  invitation_sent: ["connected", "replied", "not_interested", "archived"],
  connected: ["dm_sent", "replied", "not_interested", "archived"],
  dm_sent: ["replied", "follow_up_due", "booked", "not_interested", "archived"],
  replied: ["dm_sent", "follow_up_due", "booked", "not_interested", "archived"],
  follow_up_due: ["replied", "dm_sent", "booked", "not_interested", "archived"],
  booked: ["archived"],
  not_interested: ["archived"],
  rejected: ["archived"],
  archived: []
});

function canonicalizeLinkedInUrl(value) {
  if (!value) throw new Error("LinkedIn profile URL is required");
  let url;
  try {
    url = new URL(String(value).trim());
  } catch (_) {
    throw new Error("LinkedIn profile URL is invalid");
  }
  if (!/(^|\.)linkedin\.com$/i.test(url.hostname)) {
    throw new Error("Profile URL must be on linkedin.com");
  }
  const match = url.pathname.match(/^\/in\/([^/]+)\/?$/i);
  if (!match) throw new Error("URL must identify a LinkedIn person profile (/in/...)");
  const slug = decodeURIComponent(match[1]).toLowerCase();
  if (!slug || slug.includes("..")) throw new Error("LinkedIn profile slug is invalid");
  return `https://www.linkedin.com/in/${slug}/`;
}

function leadId(profileUrl) {
  return crypto.createHash("sha256").update(canonicalizeLinkedInUrl(profileUrl)).digest("hex").slice(0, 24);
}

function openDatabase(dbPath) {
  if (!dbPath) throw new Error("Database path is required");
  if (dbPath !== ":memory:") fs.mkdirSync(path.dirname(path.resolve(dbPath)), { recursive: true });
  const db = new DatabaseSync(dbPath);
  db.exec("PRAGMA foreign_keys = ON;");
  if (dbPath !== ":memory:") db.exec("PRAGMA journal_mode = WAL;");
  db.exec(`
    CREATE TABLE IF NOT EXISTS leads (
      id TEXT PRIMARY KEY,
      linkedin_url TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL,
      title TEXT NOT NULL,
      company TEXT NOT NULL,
      company_website TEXT,
      location TEXT,
      industry TEXT,
      source_url TEXT,
      source_type TEXT,
      signal_type TEXT,
      signal_strength TEXT NOT NULL DEFAULT 'weak',
      external_support_signal INTEGER NOT NULL DEFAULT 0,
      signal_summary TEXT,
      signal_date TEXT,
      evidence_status TEXT NOT NULL DEFAULT 'needs_review',
      score_breakdown TEXT NOT NULL DEFAULT '{}',
      score_evidence TEXT NOT NULL DEFAULT '{}',
      score INTEGER NOT NULL DEFAULT 0,
      qualification_status TEXT NOT NULL DEFAULT 'needs_review',
      qualification_reasons TEXT NOT NULL DEFAULT '[]',
      fit_reason TEXT,
      outreach_angle TEXT,
      contact_path TEXT,
      status TEXT NOT NULL DEFAULT 'needs_review',
      invitation_draft TEXT,
      first_dm_draft TEXT,
      follow_up_draft TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      qualified_at TEXT,
      drafted_at TEXT,
      invitation_sent_at TEXT,
      connected_at TEXT,
      dm_sent_at TEXT,
      last_reply_at TEXT,
      next_follow_up_at TEXT,
      reply_type TEXT,
      last_reply_text TEXT,
      last_reply_draft TEXT,
      research_status TEXT NOT NULL DEFAULT 'needs_review',
      research_risk TEXT,
      next_question TEXT,
      proof_point TEXT,
      service_lane TEXT,
      segment TEXT,
      buyer_persona TEXT,
      last_researched_at TEXT
    );
    CREATE TABLE IF NOT EXISTS outreach_steps (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      lead_id TEXT NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
      step_number INTEGER NOT NULL,
      step_type TEXT NOT NULL,
      channel TEXT NOT NULL DEFAULT 'linkedin',
      draft TEXT NOT NULL DEFAULT '',
      draft_version INTEGER NOT NULL DEFAULT 1,
      status TEXT NOT NULL DEFAULT 'pending',
      due_at TEXT,
      completed_at TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      UNIQUE(lead_id, step_number)
    );
    CREATE TABLE IF NOT EXISTS draft_versions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      lead_id TEXT NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
      draft_type TEXT NOT NULL,
      version INTEGER NOT NULL,
      body TEXT NOT NULL,
      created_at TEXT NOT NULL,
      UNIQUE(lead_id, draft_type, version)
    );
    CREATE TABLE IF NOT EXISTS replies (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      lead_id TEXT NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
      reply_text TEXT NOT NULL,
      classification TEXT NOT NULL,
      response_draft TEXT NOT NULL DEFAULT '',
      next_follow_up_at TEXT,
      created_at TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_outreach_steps_lead_status ON outreach_steps(lead_id, status, step_number);
    CREATE INDEX IF NOT EXISTS idx_draft_versions_lead_type ON draft_versions(lead_id, draft_type, version);
    CREATE INDEX IF NOT EXISTS idx_replies_lead_created ON replies(lead_id, created_at);
    CREATE TABLE IF NOT EXISTS evidence (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      lead_id TEXT NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
      source_url TEXT NOT NULL,
      source_type TEXT,
      summary TEXT NOT NULL,
      published_at TEXT,
      checked_at TEXT NOT NULL,
      confidence TEXT NOT NULL DEFAULT 'verified',
      UNIQUE(lead_id, source_url)
    );
    CREATE TABLE IF NOT EXISTS activities (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      lead_id TEXT NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
      activity_type TEXT NOT NULL,
      note TEXT,
      created_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS meetings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      lead_id TEXT NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
      status TEXT NOT NULL DEFAULT 'scheduled',
      scheduled_at TEXT NOT NULL,
      meeting_url TEXT,
      notes TEXT NOT NULL DEFAULT '',
      outcome TEXT NOT NULL DEFAULT '',
      next_step TEXT NOT NULL DEFAULT '',
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_leads_status_score ON leads(status, score DESC);
    CREATE INDEX IF NOT EXISTS idx_leads_follow_up ON leads(next_follow_up_at);
    CREATE INDEX IF NOT EXISTS idx_activities_lead_created ON activities(lead_id, created_at);
    CREATE INDEX IF NOT EXISTS idx_meetings_lead_scheduled ON meetings(lead_id, scheduled_at DESC);
  `);
  ensureColumn(db, "leads", "signal_strength", "TEXT NOT NULL DEFAULT 'weak'");
  ensureColumn(db, "leads", "external_support_signal", "INTEGER NOT NULL DEFAULT 0");
  ensureColumn(db, "leads", "score_evidence", "TEXT NOT NULL DEFAULT '{}'");
  ensureColumn(db, "leads", "research_status", "TEXT NOT NULL DEFAULT 'needs_review'");
  ensureColumn(db, "leads", "research_risk", "TEXT");
  ensureColumn(db, "leads", "next_question", "TEXT");
  ensureColumn(db, "leads", "proof_point", "TEXT");
  ensureColumn(db, "leads", "service_lane", "TEXT");
  ensureColumn(db, "leads", "segment", "TEXT");
  ensureColumn(db, "leads", "buyer_persona", "TEXT");
  ensureColumn(db, "leads", "last_researched_at", "TEXT");
  return db;
}

function ensureColumn(db, table, column, definition) {
  const columns = db.prepare(`PRAGMA table_info(${table})`).all();
  if (!columns.some((item) => item.name === column)) {
    db.exec(`ALTER TABLE ${table} ADD COLUMN ${column} ${definition}`);
  }
}

function normalizeLead(raw, options = {}) {
  const lead = raw || {};
  const name = String(lead.name || "").trim();
  const title = String(lead.title || lead.current_title || "").trim();
  const company = String(lead.company || "").trim();
  if (!name || !title || !company) throw new Error("Lead requires name, title and company");
  const linkedinUrl = canonicalizeLinkedInUrl(lead.linkedin_url || lead.linkedin_profile_url);
  const sourceUrl = String(lead.source_url || lead.evidence_url || "").trim();
  const sourceType = String(lead.source_type || lead.source_type_detail || "public_linkedin_research").trim();
  const signalType = String(lead.signal_type || "unknown").trim().toLowerCase();
  const signalStrength = String(lead.signal_strength || "weak").trim().toLowerCase();
  const externalSupportSignal = lead.external_support_signal === true;
  const contactPath = String(lead.contact_path || "unavailable").trim().toLowerCase();
  const signalSummary = String(lead.signal_summary || lead.evidence_summary || "").trim();
  const signalDate = String(lead.signal_date || "").slice(0, 10);
  const evidenceStatus = String(lead.evidence_status || "needs_review").trim().toLowerCase();
  const scoreBreakdown = lead.score_breakdown && typeof lead.score_breakdown === "object" ? lead.score_breakdown : {};
  const scoreEvidence = lead.score_evidence && typeof lead.score_evidence === "object" ? lead.score_evidence : {};
  const evaluation = evaluateLead({
    ...lead,
    linkedin_url: linkedinUrl,
    source_url: sourceUrl,
    signal_type: signalType,
    signal_strength: signalStrength,
    external_support_signal: externalSupportSignal,
    contact_path: contactPath,
    signal_summary: signalSummary,
    signal_date: signalDate,
    evidence_status: evidenceStatus,
    score_breakdown: scoreBreakdown,
    score_evidence: scoreEvidence
  }, { now: options.now });
  if (sourceUrl && !validHttpsUrl(sourceUrl)) {
    throw new Error("Evidence source URL must use HTTPS");
  }
  return {
    id: leadId(linkedinUrl),
    linkedin_url: linkedinUrl,
    name,
    title,
    company,
    company_website: String(lead.company_website || "").trim(),
    location: String(lead.location || "").trim(),
    industry: String(lead.industry || "").trim(),
    source_url: sourceUrl,
    source_type: sourceType,
    signal_type: signalType,
    signal_strength: signalStrength,
    external_support_signal: externalSupportSignal,
    signal_summary: signalSummary,
    signal_date: signalDate,
    evidence_status: evidenceStatus,
    score_breakdown: evaluation.score_breakdown,
    score_evidence: evaluation.score_evidence,
    score: evaluation.score,
    qualification_status: evaluation.qualification_status,
    qualification_reasons: evaluation.reasons,
    fit_reason: String(lead.fit_reason || lead.reason || "").trim(),
    outreach_angle: String(lead.outreach_angle || lead.personalization_hook || "").trim(),
    research_status: String(lead.research_status || (evidenceStatus === "verified" ? "verified" : "needs_review")).trim().toLowerCase(),
    research_risk: String(lead.research_risk || lead.risk || "").trim(),
    next_question: String(lead.next_question || "").trim(),
    proof_point: String(lead.proof_point || lead.relevant_proof || "").trim(),
    service_lane: String(lead.service_lane || "").trim(),
    segment: String(lead.segment || "").trim(),
    buyer_persona: String(lead.buyer_persona || "").trim(),
    last_researched_at: String(lead.last_researched_at || (sourceUrl || signalSummary ? (options.now || new Date().toISOString()) : "")).trim(),
    contact_path: contactPath,
    invitation_draft: String(lead.invitation_draft || "").trim(),
    first_dm_draft: String(lead.first_dm_draft || lead.first_message_draft || "").trim(),
    follow_up_draft: String(lead.follow_up_draft || "").trim(),
    hard_disqualifier: lead.hard_disqualifier === true
  };
}

function getLeadById(db, id) {
  const row = db.prepare("SELECT * FROM leads WHERE id = ?").get(id);
  return row ? hydrateLead(row) : null;
}

function getLeadByUrl(db, url) {
  return getLeadById(db, leadId(url));
}

function hydrateLead(row) {
  return {
    ...row,
    external_support_signal: row.external_support_signal === 1,
    score_breakdown: JSON.parse(row.score_breakdown || "{}"),
    score_evidence: JSON.parse(row.score_evidence || "{}"),
    qualification_reasons: JSON.parse(row.qualification_reasons || "[]")
  };
}

function addActivity(db, leadIdValue, type, note, now) {
  db.prepare("INSERT INTO activities (lead_id, activity_type, note, created_at) VALUES (?, ?, ?, ?)")
    .run(leadIdValue, type, note || "", now);
}


function upsertLead(db, rawLead, options = {}) {
  const now = options.now || new Date().toISOString();
  const lead = normalizeLead(rawLead, { now });
  const existing = getLeadById(db, lead.id);
  const hasDrafts = Boolean(lead.invitation_draft || lead.first_dm_draft || lead.follow_up_draft);
  if (hasDrafts && lead.qualification_status !== "qualified") {
    throw new Error("Only qualified prospects can receive outreach drafts");
  }
  const nextStatus = existing && !["discovered", "needs_review", "qualified", "rejected"].includes(existing.status)
    ? existing.status
    : (lead.qualification_status === "qualified" && hasDrafts ? "drafted" : lead.qualification_status);
  const qualifiedAt = lead.qualification_status === "qualified"
    ? (existing && existing.qualified_at ? existing.qualified_at : now)
    : (existing ? existing.qualified_at : null);
  const draftedAt = hasDrafts ? now : (existing ? existing.drafted_at : null);

  if (!existing) {
    db.prepare("INSERT INTO leads (id, linkedin_url, name, title, company, company_website, location, industry, source_url, source_type, signal_type, signal_strength, external_support_signal, signal_summary, signal_date, evidence_status, score_breakdown, score_evidence, score, qualification_status, qualification_reasons, fit_reason, outreach_angle, research_status, research_risk, next_question, proof_point, service_lane, segment, buyer_persona, last_researched_at, contact_path, status, invitation_draft, first_dm_draft, follow_up_draft, created_at, updated_at, qualified_at, drafted_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)")
      .run(
        lead.id, lead.linkedin_url, lead.name, lead.title, lead.company, lead.company_website,
        lead.location, lead.industry, lead.source_url, lead.source_type, lead.signal_type,
        lead.signal_strength, lead.external_support_signal ? 1 : 0,
        lead.signal_summary, lead.signal_date, lead.evidence_status, JSON.stringify(lead.score_breakdown),
        JSON.stringify(lead.score_evidence), lead.score, lead.qualification_status, JSON.stringify(lead.qualification_reasons),
        lead.fit_reason, lead.outreach_angle, lead.research_status, lead.research_risk, lead.next_question,
        lead.proof_point, lead.service_lane, lead.segment, lead.buyer_persona, lead.last_researched_at,
        lead.contact_path, nextStatus, lead.invitation_draft, lead.first_dm_draft, lead.follow_up_draft,
        now, now, qualifiedAt, draftedAt
      );
    addActivity(db, lead.id, "lead_imported", lead.fit_reason || "Lead added to prospect registry", now);
  } else {
    db.prepare("UPDATE leads SET name = ?, title = ?, company = ?, company_website = ?, location = ?, industry = ?, source_url = ?, source_type = ?, signal_type = ?, signal_strength = ?, external_support_signal = ?, signal_summary = ?, signal_date = ?, evidence_status = ?, score_breakdown = ?, score_evidence = ?, score = ?, qualification_status = ?, qualification_reasons = ?, fit_reason = ?, outreach_angle = ?, research_status = ?, research_risk = ?, next_question = ?, proof_point = ?, service_lane = ?, segment = ?, buyer_persona = ?, last_researched_at = ?, contact_path = ?, invitation_draft = ?, first_dm_draft = ?, follow_up_draft = ?, status = ?, qualified_at = ?, drafted_at = ?, updated_at = ? WHERE id = ?")
      .run(
        lead.name, lead.title, lead.company, lead.company_website, lead.location, lead.industry,
        lead.source_url, lead.source_type, lead.signal_type, lead.signal_strength,
        lead.external_support_signal ? 1 : 0, lead.signal_summary, lead.signal_date,
        lead.evidence_status, JSON.stringify(lead.score_breakdown), JSON.stringify(lead.score_evidence), lead.score,
        lead.qualification_status, JSON.stringify(lead.qualification_reasons), lead.fit_reason,
        lead.outreach_angle, lead.research_status, lead.research_risk, lead.next_question, lead.proof_point,
        lead.service_lane, lead.segment, lead.buyer_persona, lead.last_researched_at,
        lead.contact_path,
        lead.invitation_draft || existing.invitation_draft,
        lead.first_dm_draft || existing.first_dm_draft,
        lead.follow_up_draft || existing.follow_up_draft,
        nextStatus, qualifiedAt, draftedAt, now, lead.id
      );
    addActivity(db, lead.id, "research_refreshed", "Duplicate LinkedIn profile merged; outreach history preserved", now);
  }

  if (lead.source_url) {
    db.prepare("INSERT INTO evidence (lead_id, source_url, source_type, summary, published_at, checked_at, confidence) VALUES (?, ?, ?, ?, ?, ?, ?) ON CONFLICT(lead_id, source_url) DO UPDATE SET summary = excluded.summary, published_at = excluded.published_at, checked_at = excluded.checked_at, confidence = excluded.confidence")
      .run(
        lead.id, lead.source_url, lead.source_type, lead.signal_summary,
        lead.signal_date || null, now, lead.evidence_status
      );
  }
  return getLeadById(db, lead.id);
}


function syncOutreachSteps(db, lead, now) {
  const existingRows = db.prepare("SELECT * FROM outreach_steps WHERE lead_id = ? ORDER BY step_number").all(lead.id);
  for (const spec of DEFAULT_OUTREACH_SEQUENCE) {
    const draft = String(lead[spec.draft_field] || "").trim();
    const existing = existingRows.find((row) => row.step_number === spec.step_number);
    if (!existing) {
      db.prepare("INSERT INTO outreach_steps (lead_id, step_number, step_type, channel, draft, draft_version, status, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)")
        .run(lead.id, spec.step_number, spec.step_type, spec.channel, draft, draft ? 1 : 0, draft ? "drafted" : "pending", now, now);
    } else if (draft && draft !== existing.draft && !["completed", "cancelled"].includes(existing.status)) {
      db.prepare("UPDATE outreach_steps SET draft = ?, draft_version = draft_version + 1, status = 'drafted', updated_at = ? WHERE id = ?")
        .run(draft, now, existing.id);
    }
  }
}

function saveDraftVersions(db, lead, drafts, now) {
  const mappings = [
    ["invitation", "invitation_draft"],
    ["first_dm", "first_dm_draft"],
    ["follow_up", "follow_up_draft"]
  ];
  for (const [type, field] of mappings) {
    const body = String(drafts[type] || "").trim();
    if (!body) continue;
    const row = db.prepare("SELECT COALESCE(MAX(version), 0) AS version FROM draft_versions WHERE lead_id = ? AND draft_type = ?")
      .get(lead.id, type);
    const version = Number(row.version || 0) + 1;
    db.prepare("INSERT INTO draft_versions (lead_id, draft_type, version, body, created_at) VALUES (?, ?, ?, ?, ?)")
      .run(lead.id, type, version, body, now);
  }
}

function saveDrafts(db, profileUrl, drafts, options = {}) {
  const lead = getLeadByUrl(db, profileUrl);
  if (!lead) throw new Error("Lead not found");
  if (lead.qualification_status !== "qualified") throw new Error("Only evidence-qualified leads can receive outreach drafts");
  const invitation = String(drafts.invitation || "").trim();
  const firstDm = String(drafts.first_dm || drafts.firstDm || "").trim();
  const followUp = String(drafts.follow_up || drafts.followUp || "").trim();
  if (!invitation && !firstDm && !followUp) throw new Error("At least one message draft is required");
  const now = options.now || new Date().toISOString();
  db.prepare("UPDATE leads SET invitation_draft = ?, first_dm_draft = ?, follow_up_draft = ?, status = CASE WHEN status IN ('qualified','drafted') THEN 'drafted' ELSE status END, drafted_at = ?, updated_at = ? WHERE id = ?")
    .run(invitation || lead.invitation_draft, firstDm || lead.first_dm_draft, followUp || lead.follow_up_draft, now, now, lead.id);
  const updated = getLeadById(db, lead.id);
  saveDraftVersions(db, updated, {
    invitation: invitation || updated.invitation_draft,
    first_dm: firstDm || updated.first_dm_draft,
    follow_up: followUp || updated.follow_up_draft
  }, now);
  syncOutreachSteps(db, updated, now);
  addActivity(db, lead.id, "draft_saved", "Outreach drafts saved for manual review; nothing was sent", now);
  return getLeadById(db, lead.id);
}


function setLeadStatus(db, profileUrl, status, details = {}) {
  if (!VALID_STATUSES.has(status)) throw new Error("Invalid status: " + status);
  if (EXTERNAL_EVENT_STATUSES.has(status) && details.manualConfirmed !== true) {
    throw new Error("Manual confirmation is required to record an external LinkedIn action");
  }
  const lead = getLeadByUrl(db, profileUrl);
  if (!lead) throw new Error("Lead not found");
  const now = details.now || new Date().toISOString();

  if (status === "invitation_sent" && lead.qualification_status !== "qualified") {
    throw new Error("Only a qualified prospect can be marked as invitation sent");
  }
  if (status === "qualified" && lead.qualification_status !== "qualified") {
    throw new Error("Qualification is evidence-driven and cannot be manually overridden");
  }
  if (status !== lead.status && !(ALLOWED_TRANSITIONS[lead.status] || []).includes(status)) {
    throw new Error("Invalid status transition: " + lead.status + " -> " + status);
  }
  if (status === "dm_sent" && !["connected", "dm_sent", "replied", "follow_up_due"].includes(lead.status)
    && !["first_degree_dm", "open_profile_dm", "inmail"].includes(lead.contact_path)) {
    throw new Error("A LinkedIn DM can only be recorded when a permitted direct-message route exists");
  }
  if (status === "follow_up_due") {
    if (!["dm_sent", "replied", "follow_up_due"].includes(lead.status)) {
      throw new Error("A follow-up can only be scheduled after a LinkedIn DM or reply");
    }
    const dueAt = details.next_follow_up_at ? new Date(details.next_follow_up_at) : null;
    if (!dueAt || Number.isNaN(dueAt.getTime()) || dueAt.toISOString() <= now) {
      throw new Error("A valid future follow-up date is required");
    }
  }

  const stopFollowUp = ["not_interested", "rejected", "archived", "booked"].includes(status);
  const completedFollowUp = status === "dm_sent" && lead.status === "follow_up_due";
  const nextFollowUpAt = stopFollowUp
    ? null
    : (completedFollowUp && !details.next_follow_up_at ? null : (details.next_follow_up_at || lead.next_follow_up_at));

  db.prepare("UPDATE leads SET status = ?, updated_at = ?, invitation_sent_at = ?, connected_at = ?, dm_sent_at = ?, next_follow_up_at = ? WHERE id = ?")
    .run(
      status,
      now,
      status === "invitation_sent" ? now : lead.invitation_sent_at,
      status === "connected" ? now : lead.connected_at,
      status === "dm_sent" ? now : lead.dm_sent_at,
      nextFollowUpAt,
      lead.id
    );

  if (status === "invitation_sent" || status === "connected") {
    db.prepare("UPDATE outreach_steps SET status = 'completed', completed_at = ?, due_at = NULL, updated_at = ? WHERE lead_id = ? AND step_type = 'connection' AND status <> 'cancelled'")
      .run(now, now, lead.id);
  }
  if (status === "dm_sent") {
    const stepType = completedFollowUp ? "follow_up" : "first_dm";
    db.prepare("UPDATE outreach_steps SET status = 'completed', completed_at = ?, due_at = NULL, updated_at = ? WHERE lead_id = ? AND step_type = ? AND status <> 'cancelled'")
      .run(now, now, lead.id, stepType);
  }
  if (status === "follow_up_due") {
    db.prepare("UPDATE outreach_steps SET status = 'due', due_at = ?, updated_at = ? WHERE lead_id = ? AND step_type = 'follow_up' AND status NOT IN ('completed','cancelled')")
      .run(nextFollowUpAt, now, lead.id);
  }
  if (stopFollowUp) {
    db.prepare("UPDATE outreach_steps SET status = CASE WHEN status = 'completed' THEN status ELSE 'cancelled' END, due_at = NULL, updated_at = ? WHERE lead_id = ?")
      .run(now, lead.id);
  }

  if (EXTERNAL_EVENT_STATUSES.has(status)) {
    addActivity(db, lead.id, status, details.note || ("User confirmed " + status), now);
  }
  addActivity(db, lead.id, "status_changed", details.note || ("Status changed to " + status), now);
  return getLeadById(db, lead.id);
}


function recordReply(db, profileUrl, reply, options = {}) {
  const lead = getLeadByUrl(db, profileUrl);
  if (!lead) throw new Error("Lead not found");
  const text = String(reply.text || "").trim();
  if (!text) throw new Error("Reply text is required");
  const now = options.now || new Date().toISOString();
  const classification = String(reply.classification || "needs_review").trim().toLowerCase();
  const draft = String(reply.draft || "").trim();
  const stopFollowUp = ["not_interested", "unsubscribe", "negative", "rejected"].includes(classification);
  const nextDue = reply.next_follow_up_at ? new Date(reply.next_follow_up_at) : null;
  if (classification === "not_now" && reply.next_follow_up_at
    && (!nextDue || Number.isNaN(nextDue.getTime()) || nextDue.toISOString() <= now)) {
    throw new Error("A valid future follow-up date is required for a not-now reply");
  }
  const nextStatus = stopFollowUp ? "not_interested"
    : (classification === "booked" ? "booked"
      : (classification === "not_now" && reply.next_follow_up_at ? "follow_up_due" : "replied"));
  const nextFollowUpAt = nextStatus === "follow_up_due" ? nextDue.toISOString() : null;
  db.prepare("UPDATE leads SET status = ?, reply_type = ?, last_reply_text = ?, last_reply_draft = ?, last_reply_at = ?, next_follow_up_at = ?, updated_at = ? WHERE id = ?")
    .run(nextStatus, classification, text, draft, now, nextFollowUpAt, now, lead.id);
  db.prepare("INSERT INTO replies (lead_id, reply_text, classification, response_draft, next_follow_up_at, created_at) VALUES (?, ?, ?, ?, ?, ?)")
    .run(lead.id, text, classification, draft, nextFollowUpAt, now);
  if (stopFollowUp) {
    db.prepare("UPDATE outreach_steps SET status = CASE WHEN status = 'completed' THEN status ELSE 'cancelled' END, due_at = NULL, updated_at = ? WHERE lead_id = ?")
      .run(now, lead.id);
  }
  addActivity(db, lead.id, "reply_received", "Reply classified as " + classification, now);
  return getLeadById(db, lead.id);
}

function listLeads(db, filters = {}) {
  const where = [];
  const params = [];
  if (filters.status) {
    where.push("status = ?");
    params.push(filters.status);
  }
  if (filters.qualification_status) {
    where.push("qualification_status = ?");
    params.push(filters.qualification_status);
  }
  const limit = Number.isInteger(filters.limit) ? Math.min(Math.max(filters.limit, 1), 10000) : 100;
  const sql = `SELECT * FROM leads ${where.length ? "WHERE " + where.join(" AND ") : ""} ORDER BY score DESC, updated_at DESC LIMIT ?`;
  return db.prepare(sql).all(...params, limit).map(hydrateLead);
}

function getSummary(db, options = {}) {
  const now = options.now || new Date().toISOString();
  const referenceDate = new Date(now);
  if (Number.isNaN(referenceDate.getTime())) throw new Error("Summary reference time is invalid");
  const date = options.date || [
    referenceDate.getFullYear(),
    String(referenceDate.getMonth() + 1).padStart(2, "0"),
    String(referenceDate.getDate()).padStart(2, "0")
  ].join("-");
  const dayStart = new Date(`${date}T00:00:00`);
  if (Number.isNaN(dayStart.getTime())) throw new Error("Summary calendar date is invalid");
  const dayEnd = new Date(dayStart.getFullYear(), dayStart.getMonth(), dayStart.getDate() + 1);
  const dailyTarget = Number.isInteger(options.dailyTarget) ? options.dailyTarget : 10;
  const qualifiedToday = db.prepare("SELECT COUNT(*) AS count FROM leads WHERE qualification_status = 'qualified' AND qualified_at >= ? AND qualified_at < ?")
    .get(dayStart.toISOString(), dayEnd.toISOString()).count;
  const draftedToday = db.prepare("SELECT COUNT(*) AS count FROM leads WHERE drafted_at >= ? AND drafted_at < ?")
    .get(dayStart.toISOString(), dayEnd.toISOString()).count;
  const followupsDue = db.prepare(`
    SELECT COUNT(*) AS count FROM leads
    WHERE next_follow_up_at IS NOT NULL AND next_follow_up_at <= ?
      AND status NOT IN ('not_interested','rejected','archived','booked')
  `).get(now).count;
  const replied = db.prepare("SELECT COUNT(*) AS count FROM leads WHERE status = 'replied'").get().count;
  const total = db.prepare("SELECT COUNT(*) AS count FROM leads").get().count;
  return {
    total,
    daily_target: dailyTarget,
    qualified_today: qualifiedToday,
    drafted_today: draftedToday,
    followups_due: followupsDue,
    replied,
    remaining_to_target: Math.max(0, dailyTarget - qualifiedToday)
  };
}

function exportLeadsCsv(db) {
  const rows = listLeads(db, { limit: 10000 }).map((lead) => ({
    name: lead.name,
    title: lead.title,
    company: lead.company,
    linkedin_url: lead.linkedin_url,
    company_website: lead.company_website,
    signal_type: lead.signal_type,
    signal_strength: lead.signal_strength,
    external_support_signal: lead.external_support_signal,
    contact_path: lead.contact_path,
    score_evidence: JSON.stringify(lead.score_evidence),
    signal_summary: lead.signal_summary,
    source_url: lead.source_url,
    signal_date: lead.signal_date,
    score: lead.score,
    qualification_status: lead.qualification_status,
    status: lead.status,
    fit_reason: lead.fit_reason,
    invitation_draft: lead.invitation_draft,
    first_dm_draft: lead.first_dm_draft,
    follow_up_draft: lead.follow_up_draft
  }));
  const headers = Object.keys(rows[0] || {
    name: "", title: "", company: "", linkedin_url: "", company_website: "",
    signal_type: "", signal_strength: "", external_support_signal: "", contact_path: "",
    score_evidence: "", signal_summary: "", source_url: "", signal_date: "",
    score: "", qualification_status: "", status: "", fit_reason: "",
    invitation_draft: "", first_dm_draft: "", follow_up_draft: ""
  });
  const { toCsv } = require("../lib/csv");
  return toCsv(headers, rows);
}


function getOutreachSteps(db, profileUrl) {
  const lead = getLeadByUrl(db, profileUrl);
  if (!lead) throw new Error("Lead not found");
  return db.prepare("SELECT * FROM outreach_steps WHERE lead_id = ? ORDER BY step_number").all(lead.id);
}

const MEETING_STATUSES = new Set(["scheduled", "held", "cancelled", "no_show"]);

function recordMeeting(db, profileUrl, meeting, options = {}) {
  const lead = getLeadByUrl(db, profileUrl);
  if (!lead) throw new Error("Lead not found");
  if (lead.status !== "booked") {
    throw new Error("A meeting can only be recorded after the LinkedIn conversation is marked booked");
  }

  const input = meeting || {};
  const status = String(input.status || "scheduled").trim().toLowerCase();
  if (!MEETING_STATUSES.has(status)) throw new Error("Invalid meeting status: " + status);

  const scheduledAt = String(input.scheduled_at || "").trim();
  const scheduledDate = new Date(scheduledAt);
  if (!scheduledAt || Number.isNaN(scheduledDate.getTime())) {
    throw new Error("A valid meeting date and time are required");
  }

  const meetingUrl = String(input.meeting_url || "").trim();
  if (meetingUrl && !validHttpsUrl(meetingUrl)) throw new Error("Meeting URL must use HTTPS");

  const now = options.now || new Date().toISOString();
  const notes = String(input.notes || "").trim();
  const outcome = String(input.outcome || "").trim();
  const nextStep = String(input.next_step || "").trim();

  if (input.meeting_id) {
    const meetingId = Number(input.meeting_id);
    const existing = db.prepare("SELECT id FROM meetings WHERE id = ? AND lead_id = ?").get(meetingId, lead.id);
    if (!existing) throw new Error("Meeting not found");
    db.prepare("UPDATE meetings SET status = ?, scheduled_at = ?, meeting_url = ?, notes = ?, outcome = ?, next_step = ?, updated_at = ? WHERE id = ? AND lead_id = ?")
      .run(status, scheduledDate.toISOString(), meetingUrl, notes, outcome, nextStep, now, meetingId, lead.id);
    addActivity(db, lead.id, "meeting_updated", "Meeting details updated", now);
    return db.prepare("SELECT * FROM meetings WHERE id = ?").get(meetingId);
  }

  const result = db.prepare("INSERT INTO meetings (lead_id, status, scheduled_at, meeting_url, notes, outcome, next_step, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)")
    .run(lead.id, status, scheduledDate.toISOString(), meetingUrl, notes, outcome, nextStep, now, now);
  addActivity(db, lead.id, "meeting_recorded", "Meeting recorded as " + status, now);
  return db.prepare("SELECT * FROM meetings WHERE id = ?").get(Number(result.lastInsertRowid));
}

function getMeetings(db, profileUrl) {
  const lead = getLeadByUrl(db, profileUrl);
  if (!lead) throw new Error("Lead not found");
  return db.prepare("SELECT * FROM meetings WHERE lead_id = ? ORDER BY scheduled_at DESC").all(lead.id);
}

function listMeetings(db, options = {}) {
  const limit = Number.isInteger(options.limit) ? Math.min(Math.max(options.limit, 1), 1000) : 100;
  return db.prepare("SELECT meetings.*, leads.name, leads.company, leads.linkedin_url FROM meetings JOIN leads ON leads.id = meetings.lead_id ORDER BY meetings.scheduled_at ASC LIMIT ?")
    .all(limit);
}

function recordActivity(db, profileUrl, activityType, note = "", options = {}) {
  if (!MANUAL_ACTIVITY_TYPES.has(activityType)) {
    throw new Error("Unsupported manual LinkedIn activity: " + activityType);
  }
  const lead = getLeadByUrl(db, profileUrl);
  if (!lead) throw new Error("Lead not found");
  const now = options.now || new Date().toISOString();
  addActivity(db, lead.id, activityType, note, now);
  return getLeadById(db, lead.id);
}

function getResearchQueue(db, options = {}) {
  const limit = Number.isInteger(options.limit) ? Math.min(Math.max(options.limit, 1), 1000) : 100;
  return db.prepare("SELECT * FROM leads WHERE research_status <> 'verified' AND status NOT IN ('rejected','archived','not_interested','booked') ORDER BY score DESC, updated_at DESC LIMIT ?")
    .all(limit).map(hydrateLead);
}

function ratePercent(numerator, denominator) {
  if (!denominator) return null;
  return Math.round((numerator / denominator) * 1000) / 10;
}

function getReport(db, options = {}) {
  const start = options.start ? new Date(options.start) : new Date(Date.now() - 7 * 86400000);
  const end = options.end ? new Date(options.end) : new Date();
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || start >= end) {
    throw new Error("Report window must contain valid start and end dates");
  }
  const from = start.toISOString();
  const to = end.toISOString();
  const leads = {
    researched: db.prepare("SELECT COUNT(DISTINCT lead_id) AS count FROM activities WHERE activity_type IN ('lead_imported','research_refreshed') AND created_at >= ? AND created_at < ?").get(from, to).count,
    qualified: db.prepare("SELECT COUNT(*) AS count FROM leads WHERE qualification_status = 'qualified' AND qualified_at >= ? AND qualified_at < ?").get(from, to).count,
    drafted: db.prepare("SELECT COUNT(*) AS count FROM leads WHERE drafted_at >= ? AND drafted_at < ?").get(from, to).count,
    replied: db.prepare("SELECT COUNT(*) AS count FROM leads WHERE last_reply_at >= ? AND last_reply_at < ?").get(from, to).count,
    booked: db.prepare("SELECT COUNT(*) AS count FROM leads WHERE status = 'booked' AND updated_at >= ? AND updated_at < ?").get(from, to).count
  };
  const activityTypes = ["invitation_sent", "connected", "dm_sent", "followed", "follow_back", "liked", "commented", "profile_viewed", "saved_post", "post_shared"];
  const activities = Object.fromEntries(activityTypes.map((type) => [
    type,
    db.prepare("SELECT COUNT(*) AS count FROM activities WHERE activity_type = ? AND created_at >= ? AND created_at < ?").get(type, from, to).count
  ]));
  const replyRows = db.prepare("SELECT classification, COUNT(*) AS count FROM replies WHERE created_at >= ? AND created_at < ? GROUP BY classification ORDER BY count DESC").all(from, to);
  const byType = Object.fromEntries(replyRows.map((row) => [row.classification, row.count]));
  const repliesTotal = replyRows.reduce((sum, row) => sum + row.count, 0);
  const meetingRows = db.prepare("SELECT status, COUNT(*) AS count FROM meetings WHERE updated_at >= ? AND updated_at < ? GROUP BY status").all(from, to);
  const meetings = Object.fromEntries(["scheduled", "held", "cancelled", "no_show"].map((status) => [
    status,
    meetingRows.find((row) => row.status === status)?.count || 0
  ]));
  const positiveTypes = new Set(["interested", "question", "not_now", "booked"]);
  const positiveReplies = replyRows.filter((row) => positiveTypes.has(row.classification)).reduce((sum, row) => sum + row.count, 0);
  return {
    window: { start: from, end: to },
    leads,
    meetings,
    activities,
    replies: { total: repliesTotal, by_type: byType, positive: positiveReplies },
    rates: {
      acceptance_rate: ratePercent(activities.connected, activities.invitation_sent),
      reply_rate: ratePercent(repliesTotal, activities.dm_sent),
      positive_reply_rate: ratePercent(positiveReplies, repliesTotal),
      booking_rate: ratePercent(leads.booked, repliesTotal)
    }
  };
}

function closeDatabase(db) {
  db.close();
}

module.exports = {
  VALID_STATUSES,
  canonicalizeLinkedInUrl,
  openDatabase,
  upsertLead,
  saveDrafts,
  setLeadStatus,
  recordReply,
  getOutreachSteps,
  recordMeeting,
  getMeetings,
  listMeetings,
  recordActivity,
  getResearchQueue,
  getReport,
  listLeads,
  getSummary,
  exportLeadsCsv,
  closeDatabase
};
