const test = require("node:test");
const assert = require("node:assert/strict");
const {
  openDatabase,
  upsertLead,
  saveDrafts,
  setLeadStatus,
  recordReply,
  getSummary,
  listLeads,
  getOutreachSteps,
  recordActivity,
  getReport,
  getResearchQueue,
  createServiceRequest,
  listServiceRequests,
  recordMeeting,
  getMeetings,
  closeDatabase
} = require("../../scripts/client-engine/database");

function lead(overrides = {}) {
  return {
    name: "Alex Rivera",
    title: "Founder",
    company: "Northstar Commerce",
    linkedin_url: "https://www.linkedin.com/in/alex-rivera/?trk=profile",
    company_website: "https://northstar.example",
    source_url: "https://www.linkedin.com/posts/alex-rivera_shopify-developer-activity-123/",
    source_type: "linkedin_post",
    signal_type: "explicit_request",
    signal_strength: "explicit",
    contact_path: "connection_request_note",
    signal_summary: "Founder asked for recommendations for a Shopify developer for a new store launch.",
    signal_date: "2026-11-14",
    evidence_status: "verified",
    score_breakdown: { need: 290, service_fit: 240, authority: 145, timing: 140, reachability: 90, capacity: 45 },
    score_evidence: { need: "Founder explicitly requested a Shopify developer.", service_fit: "The request maps directly to Shopify development.", authority: "Profile identifies this person as founder.", timing: "The post was published three days ago.", reachability: "Connection request is available on the profile.", capacity: "The store is active and has current products." },
    fit_reason: "The founder is actively seeking Shopify implementation support.",
    outreach_angle: "Respond to the public request with one relevant implementation observation.",
    ...overrides
  };
}

test("requires LinkedIn-only evidence for a prospect to qualify", () => {
  const db = openDatabase(":memory:");
  const saved = upsertLead(db, lead({
    source_url: "https://example.com/buying-signal",
    source_type: "external_site"
  }), { now: "2026-11-15T09:00:00.000Z" });
  assert.equal(saved.qualification_status, "needs_review");
  assert.ok(saved.qualification_reasons.some((reason) => reason.includes("LinkedIn")));
  closeDatabase(db);
});

test("stores direct and premium LinkedIn service requests for the opportunity inbox", () => {
  const db = openDatabase(":memory:");
  const direct = createServiceRequest(db, {
    request_type: "direct",
    linkedin_url: "https://www.linkedin.com/in/client-direct/",
    name: "Jordan Direct",
    company: "Direct Labs",
    service: "Web Development",
    scope: "One-time website rebuild",
    timeline: "Within two weeks",
    source_url: "https://www.linkedin.com/services/page/000/admin/",
    received_at: "2026-11-18T10:00:00.000Z"
  });
  const premium = createServiceRequest(db, {
    request_type: "premium",
    linkedin_url: "https://www.linkedin.com/in/client-premium/",
    name: "Taylor Premium",
    company: "Premium Labs",
    service: "SaaS Development",
    scope: "Ongoing",
    timeline: "Within one month",
    source_url: "https://www.linkedin.com/services/page/000/admin/",
    received_at: "2026-11-18T10:05:00.000Z"
  });
  assert.equal(direct.request_type, "direct");
  assert.equal(premium.request_type, "premium");
  assert.equal(listServiceRequests(db).length, 2);
  assert.equal(listServiceRequests(db, { request_type: "premium" })[0].name, "Taylor Premium");
  const report = getReport(db, {
    start: "2026-11-18T00:00:00.000Z",
    end: "2026-11-19T00:00:00.000Z"
  });
  assert.equal(report.service_requests.total, 2);
  assert.equal(report.service_requests.direct, 1);
  assert.equal(report.service_requests.premium, 1);
  closeDatabase(db);
});

test("records a booked meeting and its outcome without requiring a paid calendar integration", () => {
  const db = openDatabase(":memory:");
  const saved = upsertLead(db, lead(), { now: "2026-11-15T09:00:00.000Z" });
  recordReply(db, saved.linkedin_url, {
    text: "Yes, let's set up a call.",
    classification: "interested",
    draft: "Absolutely. Here is the scheduling option."
  }, { now: "2026-11-15T09:30:00.000Z" });
  setLeadStatus(db, saved.linkedin_url, "booked", {
    manualConfirmed: true,
    now: "2026-11-15T10:00:00.000Z"
  });
  const meeting = recordMeeting(db, saved.linkedin_url, {
    status: "scheduled",
    scheduled_at: "2026-11-20T16:00:00.000Z",
    meeting_url: "https://meet.google.com/abc-defg-hij",
    notes: "Discovery call about the website rebuild."
  }, { now: "2026-11-15T10:05:00.000Z" });
  assert.equal(meeting.status, "scheduled");
  assert.equal(meeting.meeting_url, "https://meet.google.com/abc-defg-hij");
  assert.equal(getMeetings(db, saved.linkedin_url)[0].scheduled_at, "2026-11-20T16:00:00.000Z");

  const held = recordMeeting(db, saved.linkedin_url, {
    meeting_id: meeting.id,
    status: "held",
    scheduled_at: "2026-11-20T16:00:00.000Z",
    outcome: "Qualified opportunity",
    next_step: "Send proposal",
    notes: "Good fit for the Standard website package."
  }, { now: "2026-11-20T17:00:00.000Z" });
  assert.equal(held.status, "held");
  assert.equal(held.outcome, "Qualified opportunity");
  assert.equal(getMeetings(db, saved.linkedin_url).length, 1);
  const report = getReport(db, { start: "2026-11-15T00:00:00.000Z", end: "2026-11-21T23:59:59.000Z" });
  assert.equal(report.meetings.held, 1);
  closeDatabase(db);
});

test("deduplicates canonical LinkedIn profile URLs and preserves outreach state", () => {
  const db = openDatabase(":memory:");
  const first = upsertLead(db, lead(), { now: "2026-11-15T09:00:00.000Z" });
  assert.equal(first.qualification_status, "qualified");
  assert.equal(first.linkedin_url, "https://www.linkedin.com/in/alex-rivera/");
  setLeadStatus(db, first.linkedin_url, "invitation_sent", {
    manualConfirmed: true,
    now: "2026-11-15T09:10:00.000Z"
  });
  const second = upsertLead(db, lead({
    linkedin_url: "https://linkedin.com/in/alex-rivera/",
    signal_summary: "A second source confirms the founder is still seeking a Shopify developer."
  }), { now: "2026-11-15T10:00:00.000Z" });
  assert.equal(second.id, first.id);
  assert.equal(second.status, "invitation_sent");
  assert.equal(listLeads(db).length, 1);
  closeDatabase(db);
});

test("saves drafts and refuses to send or mark a message sent without manual confirmation", () => {
  const db = openDatabase(":memory:");
  const saved = upsertLead(db, lead(), { now: "2026-11-15T09:00:00.000Z" });
  const drafted = saveDrafts(db, saved.linkedin_url, {
    invitation: "Hi Alex, your request for Shopify implementation recommendations caught my attention.",
    first_dm: "I saw the specific storefront requirements you mentioned. I have built Shopify experiences and wanted to ask one question about the launch.",
    follow_up: "Following up on the storefront question. No worries if priorities have shifted."
  }, { now: "2026-11-15T09:05:00.000Z" });
  assert.equal(drafted.status, "drafted");
  assert.throws(() => setLeadStatus(db, saved.linkedin_url, "invitation_sent", { now: "2026-11-15T09:10:00.000Z" }), /manual confirmation/i);
  const sent = setLeadStatus(db, saved.linkedin_url, "invitation_sent", {
    manualConfirmed: true,
    now: "2026-11-15T09:11:00.000Z"
  });
  assert.equal(sent.status, "invitation_sent");
  closeDatabase(db);
});

test("records replies and computes a ten-prospect daily target without padding", () => {
  const db = openDatabase(":memory:");
  const saved = upsertLead(db, lead(), { now: "2026-11-15T09:00:00.000Z" });
  recordReply(db, saved.linkedin_url, {
    text: "Thanks. Can you send me a couple of examples?",
    classification: "interested",
    draft: "Absolutely. I'll send two relevant examples."
  }, { now: "2026-11-15T10:00:00.000Z" });
  const summary = getSummary(db, { now: "2026-11-15T12:00:00.000Z", date: "2026-11-15", dailyTarget: 10 });
  assert.equal(summary.daily_target, 10);
  assert.equal(summary.qualified_today, 1);
  assert.equal(summary.remaining_to_target, 9);
  assert.equal(summary.replied, 1);
  assert.equal(listLeads(db)[0].status, "replied");
  closeDatabase(db);
});

test("persists the prospect registry after closing and reopening SQLite", () => {
  const fs = require("node:fs");
  const os = require("node:os");
  const path = require("node:path");
  const folder = fs.mkdtempSync(path.join(os.tmpdir(), "linkedin-client-engine-"));
  const file = path.join(folder, "leads.sqlite3");
  let db = openDatabase(file);
  const saved = upsertLead(db, lead(), { now: "2026-11-15T09:00:00.000Z" });
  closeDatabase(db);
  db = openDatabase(file);
  assert.equal(listLeads(db)[0].id, saved.id);
  assert.equal(listLeads(db)[0].name, "Alex Rivera");
  closeDatabase(db);
  fs.rmSync(folder, { recursive: true, force: true });
});

test("a not-interested reply stops future follow-ups", () => {
  const db = openDatabase(":memory:");
  const saved = upsertLead(db, lead(), { now: "2026-11-15T09:00:00.000Z" });
  setLeadStatus(db, saved.linkedin_url, "invitation_sent", {
    manualConfirmed: true,
    next_follow_up_at: "2026-11-20T09:00:00.000Z",
    now: "2026-11-15T09:10:00.000Z"
  });
  const updated = recordReply(db, saved.linkedin_url, {
    text: "Thanks, but we're not interested.",
    classification: "not_interested"
  }, { now: "2026-11-15T10:00:00.000Z" });
  assert.equal(updated.status, "not_interested");
  assert.equal(updated.next_follow_up_at, null);
  const summary = getSummary(db, { now: "2026-11-21T12:00:00.000Z", date: "2026-11-15" });
  assert.equal(summary.followups_due, 0);
  closeDatabase(db);
});

test("imports ChatGPT-ready drafts and contact route into the persistent lead record", () => {
  const db = openDatabase(":memory:");
  const saved = upsertLead(db, lead({
    contact_path: "connection_request_note",
    invitation_draft: "Hi Alex, your request for Shopify implementation recommendations was specific.",
    first_dm_draft: "I saw the requirements you outlined for the launch. I have built Shopify experiences and can share one relevant example.",
    follow_up_draft: "I had one additional thought about the launch requirements you shared."
  }), { now: "2026-11-15T09:00:00.000Z" });
  assert.equal(saved.status, "drafted");
  assert.equal(saved.contact_path, "connection_request_note");
  assert.match(saved.invitation_draft, /Shopify/);
  assert.match(saved.first_dm_draft, /launch/);
  assert.match(saved.follow_up_draft, /additional thought/);
  closeDatabase(db);
});

test("does not turn an undated signal into a current buying signal", () => {
  const db = openDatabase(":memory:");
  const input = lead();
  delete input.signal_date;
  const saved = upsertLead(db, input, { now: "2026-11-15T09:00:00.000Z" });
  assert.equal(saved.qualification_status, "needs_review");
  assert.ok(saved.qualification_reasons.some((reason) => reason.includes("date")));
  closeDatabase(db);
});

test("does not record an invitation for an unqualified prospect", () => {
  const db = openDatabase(":memory:");
  const saved = upsertLead(db, lead({ signal_type: "profile_only", signal_summary: "Founder profile describes the company but contains no buying request." }), {
    now: "2026-11-15T09:00:00.000Z"
  });
  assert.equal(saved.qualification_status, "needs_review");
  assert.throws(() => setLeadStatus(db, saved.linkedin_url, "invitation_sent", {
    manualConfirmed: true,
    now: "2026-11-15T09:10:00.000Z"
  }), /qualified prospect/i);
  closeDatabase(db);
});

test("requires an actual due date before a prospect enters the follow-up queue", () => {
  const db = openDatabase(":memory:");
  const saved = upsertLead(db, lead(), { now: "2026-11-15T09:00:00.000Z" });
  setLeadStatus(db, saved.linkedin_url, "invitation_sent", {
    manualConfirmed: true,
    now: "2026-11-15T09:05:00.000Z"
  });
  setLeadStatus(db, saved.linkedin_url, "connected", {
    manualConfirmed: true,
    now: "2026-11-15T09:07:00.000Z"
  });
  setLeadStatus(db, saved.linkedin_url, "dm_sent", {
    manualConfirmed: true,
    now: "2026-11-15T09:08:00.000Z"
  });
  assert.throws(() => setLeadStatus(db, saved.linkedin_url, "follow_up_due", {
    now: "2026-11-15T09:10:00.000Z"
  }), /follow-up date/i);
  closeDatabase(db);
});

test("refuses to store outreach drafts for a prospect that failed qualification", () => {
  const db = openDatabase(":memory:");
  assert.throws(() => upsertLead(db, lead({
    signal_type: "profile_only",
    signal_summary: "The profile describes the company but contains no current buying signal.",
    invitation_draft: "A generic invitation should not be stored.",
    first_dm_draft: "A generic first message should not be stored."
  }), { now: "2026-11-15T09:00:00.000Z" }), /only qualified prospects/i);
  closeDatabase(db);
});

test("a not-now reply schedules only the date the prospect actually gave", () => {
  const db = openDatabase(":memory:");
  const saved = upsertLead(db, lead(), { now: "2026-11-15T09:00:00.000Z" });
  setLeadStatus(db, saved.linkedin_url, "invitation_sent", {
    manualConfirmed: true,
    now: "2026-11-15T09:05:00.000Z"
  });
  const updated = recordReply(db, saved.linkedin_url, {
    text: "We are revisiting this in December.",
    classification: "not_now",
    next_follow_up_at: "2026-12-02T10:00:00.000Z"
  }, { now: "2026-11-15T10:00:00.000Z" });
  assert.equal(updated.status, "follow_up_due");
  assert.equal(updated.next_follow_up_at, "2026-12-02T10:00:00.000Z");
  closeDatabase(db);
});

test("daily target counts use the Mac's local calendar day rather than UTC midnight", () => {
  const originalTimeZone = process.env.TZ;
  process.env.TZ = "Asia/Karachi";
  const db = openDatabase(":memory:");
  try {
    upsertLead(db, lead({
      linkedin_url: "https://www.linkedin.com/in/previous-local-day/"
    }), { now: "2026-11-14T18:00:00.000Z" });
    upsertLead(db, lead({
      linkedin_url: "https://www.linkedin.com/in/current-local-day/",
      invitation_draft: "A source-specific invitation for the current local day."
    }), { now: "2026-11-14T20:00:00.000Z" });

    const summary = getSummary(db, { now: "2026-11-14T20:30:00.000Z" });
    assert.equal(summary.qualified_today, 1);
    assert.equal(summary.drafted_today, 1);
  } finally {
    closeDatabase(db);
    if (originalTimeZone === undefined) delete process.env.TZ;
    else process.env.TZ = originalTimeZone;
  }
});


test("persists an editable LinkedIn sequence and keeps a current draft version", () => {
  const db = openDatabase(":memory:");
  const saved = upsertLead(db, lead(), { now: "2026-11-15T09:00:00.000Z" });
  const drafted = saveDrafts(db, saved.linkedin_url, {
    invitation: "Hi Alex, saw the specific Shopify build request you posted.",
    first_dm: "I can share one relevant build if useful.",
    follow_up: "One quick follow-up on the Shopify launch question."
  }, { now: "2026-11-15T09:05:00.000Z" });
  const steps = getOutreachSteps(db, drafted.linkedin_url);
  assert.deepEqual(steps.map((step) => step.step_type), ["connection", "first_dm", "follow_up"]);
  assert.equal(steps[0].draft, drafted.invitation_draft);
  assert.equal(steps[2].draft, drafted.follow_up_draft);

  const updated = saveDrafts(db, drafted.linkedin_url, {
    follow_up: "One additional thought on the launch timing you mentioned."
  }, { now: "2026-11-15T09:10:00.000Z" });
  const updatedSteps = getOutreachSteps(db, updated.linkedin_url);
  assert.equal(updatedSteps[2].draft, "One additional thought on the launch timing you mentioned.");
  assert.equal(updatedSteps[2].draft_version, 2);
  closeDatabase(db);
});

test("completing a due LinkedIn follow-up clears the old reminder instead of leaving it overdue", () => {
  const db = openDatabase(":memory:");
  const saved = upsertLead(db, lead(), { now: "2026-11-15T09:00:00.000Z" });
  saveDrafts(db, saved.linkedin_url, {
    invitation: "Invitation draft",
    first_dm: "First DM draft",
    follow_up: "Follow-up draft"
  }, { now: "2026-11-15T09:05:00.000Z" });
  setLeadStatus(db, saved.linkedin_url, "invitation_sent", {
    manualConfirmed: true,
    now: "2026-11-15T09:10:00.000Z"
  });
  setLeadStatus(db, saved.linkedin_url, "connected", {
    manualConfirmed: true,
    now: "2026-11-15T09:11:00.000Z"
  });
  setLeadStatus(db, saved.linkedin_url, "dm_sent", {
    manualConfirmed: true,
    now: "2026-11-15T09:12:00.000Z"
  });
  const due = setLeadStatus(db, saved.linkedin_url, "follow_up_due", {
    next_follow_up_at: "2026-11-20T09:00:00.000Z",
    now: "2026-11-15T09:13:00.000Z"
  });
  assert.equal(due.next_follow_up_at, "2026-11-20T09:00:00.000Z");
  const sent = setLeadStatus(db, saved.linkedin_url, "dm_sent", {
    manualConfirmed: true,
    now: "2026-11-20T09:05:00.000Z"
  });
  assert.equal(sent.next_follow_up_at, null);
  const steps = getOutreachSteps(db, saved.linkedin_url);
  assert.equal(steps.find((step) => step.step_type === "follow_up").status, "completed");
  const summary = getSummary(db, { now: "2026-11-21T12:00:00.000Z", date: "2026-11-15" });
  assert.equal(summary.followups_due, 0);
  closeDatabase(db);
});

test("records manual LinkedIn engagement separately from outbound messages", () => {
  const db = openDatabase(":memory:");
  const saved = upsertLead(db, lead(), { now: "2026-11-15T09:00:00.000Z" });
  recordActivity(db, saved.linkedin_url, "followed", "Followed the prospect before connecting.", { now: "2026-11-15T09:20:00.000Z" });
  recordActivity(db, saved.linkedin_url, "commented", "Commented on a relevant product post.", { now: "2026-11-15T09:30:00.000Z" });
  const report = getReport(db, { start: "2026-11-15T00:00:00.000Z", end: "2026-11-16T00:00:00.000Z" });
  assert.equal(report.activities.followed, 1);
  assert.equal(report.activities.commented, 1);
  closeDatabase(db);
});

test("reporting summarizes the funnel without inventing missing metrics", () => {
  const db = openDatabase(":memory:");
  const saved = upsertLead(db, lead(), { now: "2026-11-15T09:00:00.000Z" });
  saveDrafts(db, saved.linkedin_url, {
    invitation: "Invitation",
    first_dm: "DM",
    follow_up: "Follow-up"
  }, { now: "2026-11-15T09:05:00.000Z" });
  setLeadStatus(db, saved.linkedin_url, "invitation_sent", {
    manualConfirmed: true,
    now: "2026-11-15T09:10:00.000Z"
  });
  setLeadStatus(db, saved.linkedin_url, "connected", {
    manualConfirmed: true,
    now: "2026-11-15T09:20:00.000Z"
  });
  setLeadStatus(db, saved.linkedin_url, "dm_sent", {
    manualConfirmed: true,
    now: "2026-11-15T09:30:00.000Z"
  });
  recordReply(db, saved.linkedin_url, {
    text: "Yes, send examples.",
    classification: "interested",
    draft: "Absolutely, here are two relevant examples."
  }, { now: "2026-11-15T10:00:00.000Z" });
  const report = getReport(db, { start: "2026-11-15T00:00:00.000Z", end: "2026-11-16T00:00:00.000Z" });
  assert.equal(report.leads.qualified, 1);
  assert.equal(report.leads.replied, 1);
  assert.equal(report.activities.invitation_sent, 1);
  assert.equal(report.activities.connected, 1);
  assert.equal(report.activities.dm_sent, 1);
  assert.equal(report.replies.total, 1);
  assert.equal(report.replies.by_type.interested, 1);
  assert.equal(report.rates.acceptance_rate, 100);
  assert.equal(report.rates.reply_rate, 100);
  closeDatabase(db);
});

test("research queue keeps uncertain prospects organized without qualifying them", () => {
  const db = openDatabase(":memory:");
  const queued = upsertLead(db, lead({
    linkedin_url: "https://www.linkedin.com/in/queued-prospect/",
    signal_date: "",
    evidence_status: "needs_review"
  }), { now: "2026-11-15T09:00:00.000Z" });
  assert.equal(queued.qualification_status, "needs_review");
  const queue = getResearchQueue(db);
  assert.equal(queue.length, 1);
  assert.equal(queue[0].linkedin_url, queued.linkedin_url);
  closeDatabase(db);
});
