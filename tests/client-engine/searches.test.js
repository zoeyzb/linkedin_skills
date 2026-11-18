const test = require("node:test");
const assert = require("node:assert/strict");
const { URL } = require("node:url");
const { buildLinkedInSearches } = require("../../scripts/client-engine/searches");

test("builds a useful LinkedIn-only daily search pack for people and posts", () => {
  const searches = buildLinkedInSearches({
    serviceLines: ["Shopify development", "custom dashboards", "web applications"],
    targetRoles: ["Founder", "Agency Owner"]
  });
  assert.ok(searches.length >= 10);
  assert.ok(searches.some((item) => item.surface === "people"));
  assert.ok(searches.some((item) => item.surface === "content"));
  for (const item of searches) {
    const url = new URL(item.url);
    assert.equal(url.hostname, "www.linkedin.com");
    assert.match(url.pathname, /^\/search\/results\/(people|content)\/$/);
    assert.ok(url.searchParams.get("keywords"));
    assert.ok(item.purpose);
  }
});

test("does not generate non-LinkedIn prospecting destinations", () => {
  const searches = buildLinkedInSearches({});
  assert.ok(searches.length > 0);
  assert.ok(searches.every((item) => item.url.startsWith("https://www.linkedin.com/")));
});
