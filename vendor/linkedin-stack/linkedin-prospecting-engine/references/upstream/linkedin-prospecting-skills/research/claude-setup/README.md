# Claude setup: memory, projects, instructions, skills, connectors

Research behind the bereach-setup skill. Written 2026-10-29. Every product fact below was read on
Anthropic's own pages that day (links in `sources.md`). Anthropic changes its menus often: when a label
differs in the app, trust the app and update this file.

Tags: **[DOC]** Anthropic documentation or help center, **[DATA]** a study, **[PRACTICE]** advice.

## 1. The five places that steer Claude, and their scope

| Place | Who writes it | Scope | Loaded when | Where (claude.ai, current layout) |
|---|---|---|---|---|
| Instructions for Claude (profile) | You | Every chat | Always | Settings > Your Claude > Instructions **[DOC]** |
| Memory | Claude, and you on request | Account, plus one memory per project | Always (topics) | Settings > Your Claude > Manage next to "Your memory" (older layout: Settings > Memory) **[DOC]** |
| Project instructions and knowledge | You | Chats inside that project | Always inside the project | Project page > "Set project instructions"; files via "+" **[DOC]** |
| Skills | You (upload) | Every chat where the skill is on | Name and description always; body only when the task matches | Customize > Skills **[DOC]** |
| Connectors (MCP) | The service | Chats where toggled on | Tool list when on | Customize > Connectors; per chat "+" > Connectors **[DOC]** |

Claude Code has the same layers on disk: `CLAUDE.md` (user, project, local), auto memory in
`~/.claude/projects/<project>/memory/` (first 200 lines or 25KB of `MEMORY.md` loaded every session), skills
in `~/.claude/skills/` or `.claude/skills/`, MCP servers registered per user or per project **[DOC]**.

## 2. Why piled-up memory makes output worse

- **Contradictions are resolved at random.** Claude Code's memory page: "if two instructions contradict each
  other, Claude may pick one arbitrarily", and the same between a user rule and a project rule **[DOC]**.
- **Length lowers adherence.** "Longer files consume more context and reduce adherence"; target under 200
  lines per instruction file **[DOC]**. Memory and instructions are context, "not enforced configuration"; "the
  more specific and concise your instructions, the more consistently Claude follows them" **[DOC]**.
- **More instructions, fewer followed.** IFScale (2025, 20 models): at 500 simultaneous instructions the best
  models followed 68%, with a bias toward earlier instructions **[DATA]**.
- **Conflicts are rarely flagged.** ConInstruct (AAAI 2026): models often detect conflicting constraints but
  rarely tell the user or ask **[DATA]**. A user with ten old memory rules about tone will not be warned that
  two of them disagree.
- **Context rot.** Recall becomes less reliable as input grows, worse when distractors are close to the real
  target (Chroma, 2025) **[DATA]**; Anthropic's own guidance: "the smallest possible set of high-signal tokens",
  and do not "stuff a laundry list of edge cases into a prompt" **[DOC]**.
- **Memory is written as you chat.** Current claude.ai memory saves individual topics during conversations
  **[DOC]**. A one-off remark ("make this one shorter") can become a standing rule nobody reviewed.
- **Deleting a chat does not delete what it taught.** Memories generated from a chat must be deleted one by one
  **[DOC]**.

Practical consequence: outreach rules should live in exactly one reviewed place. For BeReach users that is the
skills (how to work) plus one playbook saved in BeReach (how this person writes), read by the connector.
Anything about tone, message length or prospecting in memory, profile instructions or project instructions is
a second, unreviewed copy that will drift.

## 3. Memory controls (claude.ai) **[DOC]**

- Toggles: "Memory from chats", "Search and reference chats" (paid plans), "Include sensitive topics in memory".
- "Pause memory": keeps existing memory but neither uses nor makes new memories.
- "Reset memory": permanently deletes all memories including project memories. Cannot be undone.
- Manage > Topics: open each topic, edit or Delete. Or tell Claude to forget something.
- Per chat: the "+" menu Memory toggle, set before the first message. Incognito (ghost icon) is not saved.
- Each project has its own memory; turning off "Use account memory" on a project keeps it fully separate.
- Memory is on by default on Free, Pro and Max; on Team and Enterprise an owner enables it.
- Moving memories in from another assistant, or out of Claude, exists and is marked experimental.

## 4. Projects **[DOC]**

- Knowledge (files added with "+") is used in every chat of the project; chats do not share each other's
  conversation unless it is added to knowledge.
- "Set project instructions" applies to every chat in the project.
- Free plans: up to five projects. Paid plans switch to retrieval when knowledge nears the context limit.
- Good use for outreach: one project "Outreach" with no tone rules in its instructions (the skills and playbook
  carry them), optionally with its own memory separated from the account.

## 5. Skills **[DOC]**

Format:
- A folder named exactly like the skill, containing `SKILL.md` with YAML frontmatter `name` and `description`.
- `name`: lowercase letters, numbers, hyphens, at most 64 characters, no "anthropic" or "claude", must match
  the folder name.
- `description`: what it does and when to use it, third person. The platform docs and the Agent Skills
  specification allow 1,024 characters; one claude.ai help article says 200. Kept under 200 in this pack so
  every surface accepts it. In Claude Code, description plus `when_to_use` is cut at 1,536 characters.
- Body under 500 lines; details in files one level deep, loaded only when read. About 100 tokens per skill
  sit in context until it triggers; the body is meant to stay under 5k tokens.
- "Skills can't explicitly reference each other, but Claude can use multiple skills together automatically."
  So skills in this pack name each other by skill name, never by path alone.

Install:
- claude.ai and Claude Desktop (same account set): enable Settings > Capabilities > "Code execution and file
  creation" (labelled "Create and edit files" in the updated layout), then Customize > Skills > "+" >
  "+ Create skill" > "Upload a skill", one ZIP per skill whose top level is the skill folder. Available on Free,
  Pro, Max, Team and Enterprise. Team and Enterprise: owners enable Skills under Organization settings >
  Plugins & skills.
- Claude Code: copy the folder to `~/.claude/skills/<name>/` (all projects) or `.claude/skills/<name>/` (one
  repository); picked up live. Skills enabled on claude.ai also sync down to Claude Code (v2.1.273 or later),
  one way only.
- API: separate upload; not synced with claude.ai.
- Security: install skills only from sources you trust; read every file first.


## 6. Connectors **[DOC]**

- Custom connectors (remote MCP) work on claude.ai, Claude Desktop and Cowork, on every plan; Free is limited
  to one custom connector.
- Team and Enterprise: an Owner adds a custom connector for the organization; each member then connects it.
- No edit: remove and add again. "Allow always" only for tools you trust to run unsupervised.
- BeReach gives none of these steps itself: its one setup, on every surface, is the line
  `set up bereach - https://bereach.ai/llms.txt` given to the agent, and `llms.txt` holds each client's steps.

## 7. Artifacts **[DOC]**

Artifacts are standalone documents, pages, dashboards or small tools Claude makes beside the chat. They need the
same code execution capability, are kept in the Artifacts section of the sidebar, start private, and can be
shared. This is where the pack's deliverables live (search plan, persona cards, voice card, templates, drafts,
results): one artifact per step, reopened from the sidebar.

## Evidenced vs folklore

| Claim | Status |
|---|---|
| Contradicting instructions make Claude pick one at random | Stated by Anthropic for Claude Code **[DOC]** |
| Long instruction files lower adherence | Stated by Anthropic **[DOC]**; consistent with IFScale **[DATA]** |
| "More memory makes Claude know you better, so always better" | Not supported: more context is not more adherence |
| Skills cost nothing until used | Mostly true: about 100 tokens each for name and description **[DOC]** |
| Deleting old chats cleans memory | False **[DOC]** |
| Skills sync everywhere | Partly: claude.ai and Desktop share; Claude Code pulls one way; API separate **[DOC]** |
