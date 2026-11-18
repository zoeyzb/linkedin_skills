# LinkedIn Client Acquisition

An Agent Skill that coordinates your existing LinkedIn Prospector, LinkedIn Outreach Copilot, LinkedIn Lead Exporter, and installed GTM/LinkedIn specialist skills.

## What it does

- Searches public LinkedIn people profiles and posts using ChatGPT's available web research.
- Targets ten qualified prospects per day, with a hard evidence gate and no padding.
- Scores prospects out of 1,000 using six disclosed dimensions.
- Writes an individualized connection note, post-acceptance DM, and one follow-up.
- Exports a JSON batch for the local LinkedIn Client Engine registry.
- In ChatGPT chats with the existing Remote Desktop Commander connector, reads and updates that registry directly through the CLI; no temporary JSON handoff or dashboard operation is required.

## What it does not do

It does not scrape LinkedIn, use private LinkedIn endpoints, send invitations, or send messages. It is a standalone Agent Skill, not a hosted ChatGPT web app/plugin.

## Install

The package contains only this new orchestration skill and its own references. It is installed locally for Codex-compatible use. In ChatGPT, the existing Remote Desktop Commander connection can operate the local engine directly, but the Agent Skill ZIP is not loaded as a native ChatGPT skill or @ app. A custom ChatGPT MCP app requires an eligible Business or Enterprise/Edu workspace and a hosted or securely tunneled MCP endpoint. It does not duplicate or redistribute the separately installed upstream skills.

## Local persistence

Start the local dashboard from the project root:

~~~bash
node scripts/client-engine/cli.js init
node scripts/client-engine/cli.js brief
node scripts/client-engine/cli.js serve
~~~

Open http://127.0.0.1:4177 for optional visual review. In ChatGPT conversations with the existing Remote Desktop Commander connector, use `node scripts/client-engine/cli.js brief` and import research directly with `node scripts/client-engine/cli.js import-json -` plus stdin. The local SQLite database stores prospects, evidence, drafts, activity, status, replies, and follow-up dates.

## Daily target

Ten qualified prospects is the target. If fewer than ten pass the evidence gate, the skill reports the real shortfall rather than lowering the standard.
