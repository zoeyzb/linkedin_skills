const fs = require("node:fs");
const path = require("node:path");
const { execFileSync } = require("node:child_process");

const ROOT = path.resolve(__dirname, "../..");
const SKILL_DIR = path.join(ROOT, "skills", "linkedin-client-acquisition");
const OUTPUT_DIR = path.join(ROOT, "distribution", "releases");
const OUTPUT_FILE = path.join(OUTPUT_DIR, "linkedin-client-acquisition.zip");

function packageSkill() {
  const manifestPath = path.join(SKILL_DIR, "skill.package.json");
  if (!fs.existsSync(manifestPath)) throw new Error("Skill package manifest is missing");
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  for (const resource of manifest.resources || []) {
    const fullPath = path.join(SKILL_DIR, resource);
    if (!fs.existsSync(fullPath)) throw new Error(`Missing skill resource: ${resource}`);
  }
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  if (fs.existsSync(OUTPUT_FILE)) fs.unlinkSync(OUTPUT_FILE);
  execFileSync("zip", ["-qr", OUTPUT_FILE, "."], { cwd: SKILL_DIR, stdio: "pipe" });
  execFileSync("unzip", ["-t", OUTPUT_FILE], { stdio: "pipe" });
  return OUTPUT_FILE;
}

if (require.main === module) {
  try {
    console.log(JSON.stringify({ package: packageSkill(), status: "verified" }, null, 2));
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}

module.exports = { packageSkill, OUTPUT_FILE, SKILL_DIR };
