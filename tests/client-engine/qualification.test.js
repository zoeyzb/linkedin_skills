const test = require("node:test");
const assert = require("node:assert/strict");
const { evaluateLead, SCORE_WEIGHTS } = require("../../scripts/client-engine/qualification");

function strongLead(overrides = {}) {
  return {
    linkedin_url: "https://www.linkedin.com/in/alex-founder/",
    source_url: "https://www.linkedin.com/posts/alex-founder_shopify-developer-activity-123/",
    signal_type: "explicit_request",
    signal_strength: "explicit",
    external_support_signal: false,
    contact_path: "connection_request_note",
    signal_summary: "Founder publicly asked for recommendations for a Shopify developer for a new store launch.",
    signal_date: "2026-11-12",
    evidence_status: "verified",
    score_breakdown: {
      need: 290,
      service_fit: 240,
      authority: 145,
      timing: 140,
      reachability: 90,
      capacity: 45
    },
    score_evidence: {
      need: "The founder explicitly requested Shopify developer recommendations.",
      service_fit: "The requested work directly matches Shopify development services.",
      authority: "The LinkedIn profile identifies this person as the company founder.",
      timing: "The request was published three days before this research run.",
      reachability: "The profile displays an available connection request route.",
      capacity: "The company has an active store and current product catalogue."
    },
    ...overrides
  };
}

test("score weights total exactly 1000", () => {
  assert.equal(Object.values(SCORE_WEIGHTS).reduce((a, b) => a + b, 0), 1000);
});

test("qualifies only a verified, recent, explicit buying signal with score at least 800", () => {
  const result = evaluateLead(strongLead(), { now: "2026-11-15T12:00:00.000Z" });
  assert.equal(result.score, 950);
  assert.equal(result.qualification_status, "qualified");
  assert.equal(result.reasons.length, 0);
});

test("does not qualify a high score without source-backed evidence", () => {
  const result = evaluateLead(strongLead({ source_url: "", evidence_status: "needs_review" }), {
    now: "2026-11-15T12:00:00.000Z"
  });
  assert.notEqual(result.qualification_status, "qualified");
  assert.ok(result.reasons.some((reason) => reason.includes("evidence")));
});

test("does not qualify generic profile-only research even when the numeric score is high", () => {
  const result = evaluateLead(strongLead({ signal_type: "profile_only" }), {
    now: "2026-11-15T12:00:00.000Z"
  });
  assert.notEqual(result.qualification_status, "qualified");
  assert.ok(result.reasons.some((reason) => reason.includes("buying signal")));
});

test("does not qualify a stale signal older than the configured window", () => {
  const result = evaluateLead(strongLead({ signal_date: "2026-06-01" }), {
    now: "2026-11-15T12:00:00.000Z",
    maxSignalAgeDays: 30
  });
  assert.notEqual(result.qualification_status, "qualified");
  assert.ok(result.reasons.some((reason) => reason.includes("stale")));
});

test("uses a 30-day default signal freshness window", () => {
  const result = evaluateLead(strongLead({ signal_date: "2026-10-01" }), {
    now: "2026-11-15T12:00:00.000Z"
  });
  assert.notEqual(result.qualification_status, "qualified");
  assert.ok(result.reasons.some((reason) => reason.includes("stale")));
});

test("hard disqualifiers override a high score", () => {
  const result = evaluateLead(strongLead({ hard_disqualifier: true }), {
    now: "2026-11-15T12:00:00.000Z"
  });
  assert.equal(result.qualification_status, "rejected");
});

test("funding or growth announcements never qualify without a separate service-specific buying signal", () => {
  for (const signalType of ["funding", "growth"]) {
    const result = evaluateLead(strongLead({
      signal_type: signalType,
      signal_strength: "strong",
      signal_summary: "Company announced funding and growth but did not describe an external development need."
    }), { now: "2026-11-15T12:00:00.000Z" });
    assert.notEqual(result.qualification_status, "qualified", signalType);
    assert.ok(result.reasons.some((reason) => reason.includes("concrete buying signal")), signalType);
  }
});

test("hiring alone does not qualify without evidence of external development support", () => {
  const result = evaluateLead(strongLead({
    signal_type: "hiring_need",
    signal_strength: "strong",
    external_support_signal: false,
    signal_summary: "Company is hiring an internal full-stack engineer; no contractor or agency need is stated."
  }), { now: "2026-11-15T12:00:00.000Z" });
  assert.notEqual(result.qualification_status, "qualified");
  assert.ok(result.reasons.some((reason) => reason.includes("external development support")));
});

test("requires minimum evidence scores for need and service fit", () => {
  const result = evaluateLead(strongLead({
    score_breakdown: { need: 100, service_fit: 240, authority: 150, timing: 150, reachability: 100, capacity: 50 }
  }), { now: "2026-11-15T12:00:00.000Z" });
  assert.notEqual(result.qualification_status, "qualified");
  assert.ok(result.reasons.some((reason) => reason.includes("need evidence")));
});

test("requires a verified LinkedIn contact path", () => {
  const result = evaluateLead(strongLead({ contact_path: "unavailable" }), {
    now: "2026-11-15T12:00:00.000Z"
  });
  assert.notEqual(result.qualification_status, "qualified");
  assert.ok(result.reasons.some((reason) => reason.includes("contact path")));
});

test("requires evidence notes for every scored dimension", () => {
  const result = evaluateLead(strongLead({ score_evidence: {} }), {
    now: "2026-11-15T12:00:00.000Z"
  });
  assert.notEqual(result.qualification_status, "qualified");
  assert.ok(result.reasons.some((reason) => reason.includes("score evidence")));
});
