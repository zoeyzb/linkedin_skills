const test = require("node:test");
const assert = require("node:assert/strict");
const { parseMessagingPage, parseServiceRequestsPage, parseSearchResultsPage } = require("../../scripts/client-engine/browser-sync");

test("parses inbound messaging snippets without sending anything", () => {
  const rows = parseMessagingPage([
    { name: "Taylor", snippet: "Taylor: Yes, interested in the website.", observed_at: "2026-11-18T12:00:00.000Z" },
    { name: "Jordan", snippet: "You: Following up on this.", observed_at: "2026-11-18T12:01:00.000Z" },
    { name: "Mo", snippet: "Mo: I saw this via Services Page.", marker: "Via Services Page", observed_at: "2026-11-18T12:02:00.000Z" }
  ]);
  assert.equal(rows[0].direction, "inbound");
  assert.equal(rows[1].direction, "outbound");
  assert.equal(rows[2].service_page, true);
});

test("parses Premium/Matched and Direct service requests", () => {
  const rows = parseServiceRequestsPage([
    { request_type: "premium", name: "Taylor", service: "Web Development", text: "Premium request", source_url: "https://www.linkedin.com/my-items/projects/" },
    { request_type: "direct", name: "Jordan", service: "SEO", text: "Direct request", source_url: "https://www.linkedin.com/my-items/projects/" }
  ]);
  assert.equal(rows[0].request_type, "premium");
  assert.equal(rows[1].request_type, "direct");
});

test("search discovery accepts only LinkedIn search evidence and does not qualify candidates", () => {
  const source = "https://www.linkedin.com/search/results/content/?keywords=web";
  const rows = parseSearchResultsPage([
    { name: "Taylor", profile_url: "https://www.linkedin.com/in/taylor/", text: "Looking for a web developer" },
    { name: "Bad", profile_url: "https://example.com/bad", text: "bad" }
  ], source);
  assert.equal(rows.length, 1);
  assert.equal(rows[0].source_url, source);
  assert.equal(rows[0].source_type, "linkedin_search_result");
  assert.throws(() => parseSearchResultsPage([], "https://example.com/search"), /LinkedIn search/);
});
