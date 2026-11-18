const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { execFileSync } = require("node:child_process");
const { packageSkill, OUTPUT_FILE, SKILL_DIR } = require("../../scripts/client-engine/package-skill");

test("master skill has valid metadata, deep references and diverse eval scenarios", () => {
  const skill = fs.readFileSync(path.join(SKILL_DIR, "SKILL.md"), "utf8");
  assert.match(skill, /^---\nname: linkedin-client-acquisition\n/);
  assert.ok(skill.split("\n").length < 500);
  assert.match(skill, /10 qualified prospects per day/);
  assert.match(skill, /does not send/);
  assert.match(skill, /ChatGPT web @-invocation requires a separately hosted/);
  assert.match(skill, /node scripts\/client-engine\/cli\.js brief/);
  assert.match(skill, /node scripts\/client-engine\/cli\.js import-json -/);
  assert.match(skill, /Remote Desktop Commander connector/);

  const manifest = JSON.parse(fs.readFileSync(path.join(SKILL_DIR, "skill.package.json"), "utf8"));
  for (const resource of manifest.resources) {
    assert.ok(fs.existsSync(path.join(SKILL_DIR, resource)), `missing resource ${resource}`);
  }
  for (const ref of ["qualification-scorecard.md", "research-and-writing-standard.md", "local-data-contract.md"]) {
    const size = fs.statSync(path.join(SKILL_DIR, "references", ref)).size;
    assert.ok(size >= 1000, `${ref} is too shallow: ${size} bytes`);
  }

  const scenarios = JSON.parse(fs.readFileSync(path.join(SKILL_DIR, "evals", "scenarios.json"), "utf8"));
  assert.ok(scenarios.length >= 6);
  for (const scenario of scenarios) {
    assert.ok(scenario.given && scenario.expected && scenario.forbidden);
  }
});

test("skill ZIP is valid and contains only the new orchestration skill", () => {
  const output = packageSkill();
  assert.equal(output, OUTPUT_FILE);
  assert.ok(fs.existsSync(output));
  const listing = execFileSync("unzip", ["-Z1", output], { encoding: "utf8" }).trim().split("\n");
  assert.ok(listing.includes("SKILL.md"));
  assert.ok(listing.includes("agents/openai.yaml"));
  assert.ok(listing.includes("evals/scenarios.json"));
  assert.ok(!listing.some((name) => /linkedin_skills|gtm-prospecting-system|node_modules|\.env/.test(name)));
});
