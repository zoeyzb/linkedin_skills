const test = require("node:test");
const assert = require("node:assert/strict");
const vm = require("node:vm");
const { createAppServer } = require("../../scripts/client-engine/server");

function validLead() {
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
    fit_reason: "The founder explicitly needs Shopify development support."
  };
}

test("local API imports, deduplicates, drafts, tracks manual actions and exports prospects", async (t) => {
  const app = createAppServer({ dbPath: ":memory:", host: "127.0.0.1", port: 0 });
  t.after(async () => app.close());
  const address = await app.listen();
  const base = `http://127.0.0.1:${address.port}`;

  const page = await fetch(base + "/");
  assert.equal(page.status, 200);
  const html = await page.text();
  assert.match(html, /LinkedIn Client Engine/);
  assert.match(html, /signal_strength/);
  assert.match(html, /contact_path/);
  assert.match(html, /score_evidence/);
  assert.match(html, /Read-only LinkedIn browser sync/);
  assert.match(html, /Research Queue/);
  assert.match(html, /Drafts/);
  assert.match(html, /Follow-ups/);
  assert.match(html, /Replies/);
  assert.match(html, /Opportunity Inbox/);
  assert.match(html, /PREMIUM \/ MATCHED/);
  assert.match(html, /DIRECT/);
  assert.match(html, /Reports/);
  assert.match(html, /Record follow/);
  const inlineScript = html.split("<script>")[1]?.split("</script>")[0];
  assert.ok(inlineScript, "dashboard script exists");
  assert.doesNotThrow(() => new vm.Script(inlineScript), "dashboard JavaScript parses");
  const head = await fetch(base + "/", { method: "HEAD" });
  assert.equal(head.status, 200);

  const searches = await fetch(base + "/api/searches");
  const searchRows = await searches.json();
  assert.ok(searchRows.length >= 10);
  assert.ok(searchRows.every((item) => item.url.startsWith("https://www.linkedin.com/")));

  const imported = await fetch(base + "/api/leads/import", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ leads: [validLead(), validLead()] })
  });
  assert.equal(imported.status, 200);
  const importResult = await imported.json();
  assert.equal(importResult.imported, 1);
  assert.equal(importResult.duplicates, 1);

  const summary = await (await fetch(base + "/api/summary")).json();
  assert.equal(summary.daily_target, 10);
  assert.equal(summary.qualified_today, 1);
  assert.equal(summary.remaining_to_target, 9);

  const savedDraft = await fetch(base + "/api/drafts", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      linkedin_url: validLead().linkedin_url,
      drafts: { invitation: "Hi Alex, saw your request for Shopify implementation recommendations.", first_dm: "I saw the requirements you mentioned and had one specific question about the launch." }
    })
  });
  assert.equal(savedDraft.status, 200);

  const blockedSendRecord = await fetch(base + "/api/status", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ linkedin_url: validLead().linkedin_url, status: "invitation_sent" })
  });
  assert.equal(blockedSendRecord.status, 400);

  const manualSendRecord = await fetch(base + "/api/status", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ linkedin_url: validLead().linkedin_url, status: "invitation_sent", manual_confirmed: true })
  });
  assert.equal(manualSendRecord.status, 200);

  const sequence = await fetch(base + "/api/sequence?linkedin_url=" + encodeURIComponent(validLead().linkedin_url));
  assert.equal(sequence.status, 200);
  const sequenceRows = await sequence.json();
  assert.equal(sequenceRows.length, 3);
  assert.equal(sequenceRows[0].step_type, "connection");

  const activity = await fetch(base + "/api/activity", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      linkedin_url: validLead().linkedin_url,
      activity_type: "followed",
      note: "Followed before connecting."
    })
  });
  assert.equal(activity.status, 200);

  const serviceRequest = await fetch(base + "/api/service-requests", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      request_type: "premium",
      linkedin_url: "https://www.linkedin.com/in/taylor-premium/",
      name: "Taylor Premium",
      company: "Premium Labs",
      service: "SaaS Development",
      scope: "Ongoing",
      timeline: "Within one month",
      source_url: "https://www.linkedin.com/services/page/000/admin/",
      received_at: "2026-11-18T10:00:00.000Z"
    })
  });
  assert.equal(serviceRequest.status, 201);
  const serviceRequestData = await serviceRequest.json();
  assert.equal(serviceRequestData.request_type, "premium");

  const serviceRequests = await fetch(base + "/api/service-requests?request_type=premium");
  assert.equal(serviceRequests.status, 200);
  const serviceRows = await serviceRequests.json();
  assert.equal(serviceRows.length, 1);
  assert.equal(serviceRows[0].name, "Taylor Premium");

  const report = await fetch(base + "/api/report?start=2026-11-01T00:00:00.000Z&end=2026-12-01T00:00:00.000Z");
  assert.equal(report.status, 200);
  const reportData = await report.json();
  assert.equal(reportData.activities.invitation_sent, 1);
  assert.equal(reportData.activities.followed, 1);

  const researchQueue = await fetch(base + "/api/research-queue?limit=10");
  assert.equal(researchQueue.status, 200);
  assert.deepEqual(await researchQueue.json(), []);

  const csv = await fetch(base + "/api/export.csv");
  assert.equal(csv.status, 200);
  assert.match(await csv.text(), /Alex Rivera/);
});

test("local API rejects malformed JSON and cross-origin requests", async (t) => {
  const app = createAppServer({ dbPath: ":memory:", host: "127.0.0.1", port: 0 });
  t.after(async () => app.close());
  const address = await app.listen();
  const base = `http://127.0.0.1:${address.port}`;

  const malformed = await fetch(base + "/api/leads/import", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: "{"
  });
  assert.equal(malformed.status, 400);

  const wrongOrigin = await fetch(base + "/api/summary", { headers: { origin: "https://evil.example" } });
  assert.equal(wrongOrigin.status, 200); // GET requests are read-only; same-origin writes are guarded below.
  const blockedOrigin = await fetch(base + "/api/leads/import", { method: "POST", headers: { "content-type": "application/json", origin: "https://evil.example" }, body: JSON.stringify({ leads: [] }) });
  assert.equal(blockedOrigin.status, 403);
});
