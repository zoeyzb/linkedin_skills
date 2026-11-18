const test = require("node:test");
const assert = require("node:assert/strict");
const { buildCloudSnapshot, connectorStatus, validateSyncPayload, validateAction } = require("../../scripts/client-engine/cloud-state");

test("builds one compact read model with every operational surface", () => {
  const snapshot = buildCloudSnapshot({
    summary: { total: 1, daily_target: 10, qualified_today: 1 },
    leads: [{ name: "Taylor", title: "Founder", company: "Example Labs", linkedin_url: "https://www.linkedin.com/in/taylor/", score: 910, qualification_status: "qualified", status: "drafted", first_dm_draft: "Hi Taylor", follow_up_draft: "Following up", last_reply_text: "Interested", last_reply_draft: "Great", next_follow_up_at: "2026-11-20T12:00:00.000Z", buyer_persona: "founder" }],
    service_requests: [{ request_type: "premium", name: "Taylor", service: "Web Development", source_url: "https://www.linkedin.com/my-items/projects/" }],
    replies: [{ name: "Taylor", linkedin_url: "https://www.linkedin.com/in/taylor/", reply_text: "Interested" }],
    followups: [{ name: "Taylor", linkedin_url: "https://www.linkedin.com/in/taylor/", next_follow_up_at: "2026-11-20T12:00:00.000Z" }],
    meetings: [{ name: "Taylor", linkedin_url: "https://www.linkedin.com/in/taylor/", scheduled_at: "2026-11-21T12:00:00.000Z", status: "scheduled" }],
    searches: [{ id: "post-web-dev-need", url: "https://www.linkedin.com/search/results/content/?keywords=web" }]
  }, { syncedAt: "2026-11-18T12:00:00.000Z" });
  assert.ok(snapshot.leads);
  assert.ok(snapshot.service_requests);
  assert.ok(snapshot.replies);
  assert.ok(snapshot.followups);
  assert.ok(snapshot.meetings);
  assert.ok(snapshot.searches);
  assert.equal(snapshot.connector.last_successful_sync_at, "2026-11-18T12:00:00.000Z");
});

test("connector becomes offline after the freshness window", () => {
  assert.equal(connectorStatus("2026-11-18T12:00:00.000Z", "2026-11-18T12:02:00.000Z", 180), "online");
  assert.equal(connectorStatus("2026-11-18T11:55:00.000Z", "2026-11-18T12:00:00.000Z", 180), "offline");
});

test("sync payload rejects oversized or malformed payloads", () => {
  assert.throws(() => validateSyncPayload(null), /snapshot/);
  assert.throws(() => validateSyncPayload({ snapshot: "bad" }), /snapshot/);
  assert.throws(() => validateSyncPayload({ snapshot: {}, bytes: 2000001 }), /1 MB/);
});

test("manual actions are record-only and never accept send commands", () => {
  assert.equal(validateAction({ action_type: "copy_draft", payload: { lead_id: "x" }}).action_type, "copy_draft");
  assert.equal(validateAction({ action_type: "mark_dm_sent", payload: { linkedin_url: "https://www.linkedin.com/in/x/" }}).action_type, "mark_dm_sent");
  assert.throws(() => validateAction({ action_type: "send_message", payload: {} }), /not allowed/);
  assert.throws(() => validateAction({ action_type: "connect", payload: {} }), /not allowed/);
});
