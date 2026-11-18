# LinkedIn Client Acquisition Engine Implementation Plan

> **For agentic workers:** Use the host's available task-by-task implementation workflow. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the existing LinkedIn Skills workspace into a persistent, LinkedIn-only daily prospecting desk that produces ten evidence-qualified prospects and personalized drafts without scraping or sending through LinkedIn automation.

**Architecture:** Keep the existing six-skill workflow and JavaScript conventions. Add a Node 24 standard-library SQLite store, a LinkedIn-native search-query pack, a local-only dashboard, and a portable Agent Skill that coordinates the already-installed LinkedIn Prospector, Outreach Copilot, and Lead Exporter skills. In ChatGPT chats with the existing Remote Desktop Commander connector, operate the local CLI directly; do not claim the Agent Skill ZIP is a native ChatGPT app.

**Tech Stack:** Node.js 24, node:sqlite, node:test, vanilla HTML/CSS/JS, portable Agent Skill package.

## Global Constraints

- Preserve the original workspace and upstream branch; develop only in the isolated feature worktree.
- No paid lead provider, email enrichment, external LLM API, email channel, or new browser extension.
- No LinkedIn login automation, private Voyager endpoints, scraping, automated invitations, or automated messages.
- Every qualified lead needs a LinkedIn profile URL, source URL, dated evidence, a concrete buying signal, and a complete score breakdown.
- Target ten qualified prospects per day; never lower the evidence threshold to fill the target.
- Persist leads, evidence, drafts, status changes, replies and follow-up dates in one SQLite database.
- Keep real prospect data, drafts, local database files and exports out of Git.
- Agent Skill package contains only newly authored orchestration instructions and references; do not redistribute third-party skill code or content.
- The Agent Skill ZIP is not a native ChatGPT web skill or @ app. ChatGPT Plus cannot connect a custom MCP server as an @ app; use the existing Remote Desktop Commander connector for direct local CLI access in connected chats.

---

### Task 1: Evidence-gated qualification and search pack

**Files:**
- Create: `scripts/client-engine/qualification.js`
- Create: `scripts/client-engine/searches.js`
- Create: `tests/client-engine/qualification.test.js`
- Create: `tests/client-engine/searches.test.js`

**Interfaces:**
- `evaluateLead(lead, options) -> { score, qualification_status, reasons, score_breakdown }`
- `buildLinkedInSearches(profile) -> SearchQuery[]`
- SearchQuery: `{ id, category, surface, query, url, purpose }`

- [ ] **Step 1: Add focused failing tests**

Test direct, dated buying signal + verified evidence + 800+ score qualifies; missing evidence, generic profile-only signal, stale signal, and hard disqualifier do not qualify. Test every search URL points to LinkedIn people/content search and encodes its query.

- [ ] **Step 2: Verify red**

Run: `node --test tests/client-engine/qualification.test.js tests/client-engine/searches.test.js`

Expected: module-not-found failures because the behavior does not exist.

- [ ] **Step 3: Implement minimum behavior**

Use six score dimensions: need (0–300), service fit (0–250), authority (0–150), timing (0–150), reachability (0–100), capacity (0–50). Require verified source URL, evidence summary, date, LinkedIn profile URL, and non-generic buying signal. Default qualification threshold is 800 and maximum signal age is 90 days. Generate native LinkedIn People and Posts search URLs for the user's web development, Shopify, custom systems and agency-partner ICP.

- [ ] **Step 4: Verify green**

Run the same focused test command. Expected: all qualification and query tests pass.

- [ ] **Step 5: Run integration check**

Run: `bash scripts/validate.sh`. Expected: existing 21 skills remain valid.

- [ ] **Step 6: Commit**

Commit only Task 1 files with message `feat: add evidence-gated LinkedIn qualification`.

---

### Task 2: Persistent SQLite prospect registry

**Files:**
- Create: `scripts/client-engine/database.js`
- Create: `tests/client-engine/database.test.js`
- Modify: `.gitignore`

**Interfaces:**
- `openDatabase(path) -> DatabaseSync`
- `upsertLead(db, lead, options) -> Lead`
- `saveDrafts(db, profileUrl, drafts) -> Lead`
- `setLeadStatus(db, profileUrl, status, details) -> Lead`
- `recordReply(db, profileUrl, reply) -> Activity`
- `getSummary(db, options) -> Summary`
- `listLeads(db, filters) -> Lead[]`

- [ ] **Step 1: Add failing tests**

Test canonical LinkedIn URL deduplication, preserving sent/replied state on re-import, evidence history, draft persistence across database reopen, valid/invalid status transitions, and daily target counts.

- [ ] **Step 2: Verify red**

Run: `node --test tests/client-engine/database.test.js`. Expected: missing module failure.

- [ ] **Step 3: Implement**

Create one SQLite database under ignored `state/linkedin-client-engine.sqlite3`; use leads, evidence and activities tables. Preserve existing activity/status when duplicate research is re-imported. No personal data is committed.

- [ ] **Step 4: Verify green**

Run the focused database tests. Expected: all persistence and dedupe assertions pass.

- [ ] **Step 5: Run integration check**

Run: `node --test tests/client-engine/*.test.js`. Expected: all current tests pass.

- [ ] **Step 6: Commit**

Commit only Task 2 files with message `feat: persist LinkedIn prospect pipeline in SQLite`.

---

### Task 3: CLI import, queue, export and local dashboard

**Files:**
- Create: `scripts/client-engine/cli.js`
- Create: `scripts/client-engine/server.js`
- Create: `public/linkedin-client-engine.html`
- Create: `tests/client-engine/http.test.js`
- Modify: `scripts/package.json`
- Modify: `README.md`

**Interfaces:**
- CLI: `init | searches | import-json <file|-> | summary | brief | list | export-csv <file>`
- HTTP: `GET /api/summary`, `GET /api/leads`, `GET /api/searches`, `POST /api/leads/import`, `POST /api/leads/:id/drafts`, `POST /api/leads/:id/status`, `POST /api/leads/:id/reply`, `GET /api/export.csv`

- [ ] **Step 1: Add failing HTTP tests**

Test localhost-only bind configuration, JSON import, duplicate handling, summary target=10, draft save, status update and CSV export. Reject malformed JSON and unknown status values.

- [ ] **Step 2: Verify red**

Run: `node --test tests/client-engine/http.test.js`. Expected: missing server module failure.

- [ ] **Step 3: Implement**

Build a dependency-free dashboard. Show daily target of ten, qualified prospects, draft queue, follow-ups due and persistent statuses. Display native LinkedIn search links. Import JSON research batches from ChatGPT. Provide editable draft fields and manual status buttons. Bind only to 127.0.0.1 and never send LinkedIn actions.

- [ ] **Step 4: Verify green**

Run the focused HTTP tests. Expected: API and data-flow assertions pass.

- [ ] **Step 5: Run integration checks**

Run: `node --test tests/client-engine/*.test.js` and `bash scripts/validate.sh`. Expected: all tests pass and existing skills remain valid.

- [ ] **Step 6: Commit**

Commit only Task 3 files with message `feat: add local LinkedIn acquisition dashboard`.

---

### Task 4: Agent Skill and distribution package

**Files:**
- Create: `skills/linkedin-client-acquisition/SKILL.md`
- Create: `skills/linkedin-client-acquisition/skill.package.json`
- Create: `skills/linkedin-client-acquisition/README.md`
- Create: `skills/linkedin-client-acquisition/agents/openai.yaml`
- Create: `skills/linkedin-client-acquisition/references/qualification-scorecard.md`
- Create: `skills/linkedin-client-acquisition/references/research-and-writing-standard.md`
- Create: `skills/linkedin-client-acquisition/references/local-data-contract.md`
- Create: `skills/linkedin-client-acquisition/evals/scenarios.json`
- Create: `scripts/client-engine/package-skill.js`
- Create: `tests/client-engine/skill-package.test.js`

**Interfaces:**
- Agent Skill coordinates existing installed capabilities: LinkedIn Prospector, LinkedIn Outreach Copilot, LinkedIn Lead Exporter, and relevant installed GTM/LinkedIn specialist skills.
- Skill output is an importable JSON batch matching the SQLite import contract.
- In ChatGPT chats with the existing Remote Desktop Commander connector, use `brief` and `import-json -` to read/write the local registry directly.
- Package output: `distribution/releases/linkedin-client-acquisition.zip`; installed locally under `~/.agents/skills/linkedin-client-acquisition` for Codex-compatible use.

- [ ] **Step 1: Add failing packaging tests**

Test required skill frontmatter, OpenAI interface metadata, six semantically distinct eval families, required references, ZIP structure and absence of third-party skill source code.

- [ ] **Step 2: Verify red**

Run: `node --test tests/client-engine/skill-package.test.js`. Expected: package files/module absent.

- [ ] **Step 3: Implement**

Author one orchestration skill that performs public LinkedIn research, verifies each candidate, qualifies to 800+, targets ten per day without padding, writes individualized messages, handles follow-ups/replies, and exports JSON. The skill must explicitly distinguish a skill package from a hosted ChatGPT plugin. Do not copy upstream skills into this package.

- [ ] **Step 4: Verify green**

Run the focused packaging tests. Expected: valid package and ZIP.

- [ ] **Step 5: Run full verification**

Run: `node --test tests/client-engine/*.test.js`, `bash scripts/validate.sh`, and `node scripts/check-system.js` if the script is non-interactive. Expected: all tests and existing skill checks pass.

- [ ] **Step 6: Commit**

Commit only Task 4 files with message `feat: package LinkedIn client acquisition Agent Skill`.

---

### Task 5: Operator documentation and final audit

**Files:**
- Create: `docs/LINKEDIN-CLIENT-ENGINE.md`
- Create: `docs/IMPLEMENTATION-VERIFICATION.md`
- Modify: `README.md`

- [ ] **Step 1: Document actual commands**

Document setup, daily research, JSON import, dashboard start, draft review, manual LinkedIn send, reply logging, follow-up review, export, backup and cleanup.

- [ ] **Step 2: Run all checks**

Run all tests, skill validation, sample run validation and ZIP integrity checks.

- [ ] **Step 3: Audit Git diff and privacy**

Confirm no credentials, real prospect data, database files, private voice samples, generated daily outputs or third-party skill source copies are staged.

- [ ] **Step 4: Commit**

Commit only documentation and verification report with message `docs: document LinkedIn client acquisition workflow`.

---

## Acceptance criteria

- One persistent local database; duplicate LinkedIn profile URLs do not create duplicate leads.
- Ten is the daily qualified-prospect target; fewer than ten is reported honestly.
- No prospect is qualified without dated, source-backed buying evidence and an 800+ validated score.
- All outreach is individualized and saved as drafts.
- No automated LinkedIn scraping, invitations or messages.
- Agent Skill ZIP is portable and installed locally for Codex-compatible use; ChatGPT web operates the local engine through the existing connector and does not claim a native @ app/plugin.
- Local dashboard is dependency-free and binds only to loopback.
- All new tests, existing skill validation, sample-run checks and ZIP integrity checks pass.
