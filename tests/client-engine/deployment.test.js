const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "../..");

test("Vercel routes the root to the hosted dashboard", () => {
  const config = JSON.parse(fs.readFileSync(path.join(root, "vercel.json"), "utf8"));
  assert.equal(config.rewrites[0].source, "/");
  assert.equal(config.rewrites[0].destination, "/linkedin-client-engine.html");
});

test("hosted API modules load without the local SQLite database", () => {
  for (const file of ["api/state.js", "api/sync.js", "api/actions.js", "api/health.js", "api/[...path].js"]) {
    assert.doesNotThrow(() => require(path.join(root, file)));
  }
});

test("LaunchAgent is read-only sync and runs through the existing CLI", () => {
  const plist = fs.readFileSync(path.join(root, "scripts/client-engine/com.zoeyzb.linkedin-client-engine-sync.plist"), "utf8");
  assert.match(plist, /scripts\/client-engine\/cli\.js/);
  assert.match(plist, />sync</);
  assert.doesNotMatch(plist, />send/);
  assert.doesNotMatch(plist, /Connect/);
});

test("install script only bootstraps the read-only sync agent", () => {
  const script = fs.readFileSync(path.join(root, "scripts/client-engine/install-sync-agent.sh"), "utf8");
  assert.match(script, /launchctl bootstrap/);
  assert.match(script, /com\.zoeyzb\.linkedin-client-engine-sync/);
  assert.match(script, /com\.zoeyzb\.linkedin-client-engine-sync\.plist/);
});
