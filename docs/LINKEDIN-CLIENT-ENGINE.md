# LinkedIn Client Engine

## Purpose

This is the user's LinkedIn-only client-acquisition workspace. It is designed for ten evidence-qualified prospects per day, not mass invitations. It reuses the existing LinkedIn Skills workflow and adds a persistent local registry, LinkedIn-native search desk, evidence gates, a local review dashboard, and one reusable Agent Skill.

## Architecture

| Layer | Implementation | Responsibility |
|---|---|---|
| Discovery | Agent Skill instructions + LinkedIn People/Posts search links | Find public LinkedIn profiles and posts; no bulk scraping |
| Qualification | Evidence-gated 1,000-point rubric | Verify need, service fit, authority, timing, reachability and capacity |
| Message writing | Existing LinkedIn Outreach Copilot / Draft Outreach skills | Individual invitation, post-acceptance DM and one follow-up |
| Persistence | Node 24 built-in SQLite | One database for leads, evidence, editable drafts, draft versions, outreach steps, status, replies, manual activity and follow-ups |
| Review UI | Node HTTP server + vanilla HTML | Local dashboard with Research Queue, Drafts, Follow-ups, Replies, Reports, search desk, import, draft editing, manual activity and export |
| Distribution | Standalone Agent Skill ZIP | Installed locally for Codex-compatible use; ChatGPT can operate the Mac database through the existing connector; not a hosted @ app |

No paid lead provider, email enrichment, external LLM API, Docker, new Chrome extension, or browser automation is required.

## Setup

Requirements: Node.js 24 or newer. The project uses Node's built-in SQLite module and has no npm dependencies.

From the project root:

~~~bash
node scripts/client-engine/cli.js init
node scripts/client-engine/cli.js searches
node scripts/client-engine/cli.js summary
node scripts/client-engine/cli.js brief
node scripts/client-engine/cli.js serve
~~~

Open the dashboard manually at http://127.0.0.1:4177. The server binds to loopback only and rejects cross-origin writes. It uses no npm dependencies or local model weights. Research evidence is restricted to LinkedIn URLs so the acquisition workflow does not silently leave LinkedIn.

## Daily workflow

1. In a ChatGPT conversation with the existing Remote Desktop Commander connector, run `node scripts/client-engine/cli.js brief` from the project root to load the existing registry, due follow-ups, review queue, and native LinkedIn search links.
2. Research public LinkedIn posts and profiles, check prior records, research each candidate, and apply the 800/1000 evidence gate.
3. It returns ten qualified prospects or an honest shortfall. It does not pad the list.
4. It creates an import-ready JSON batch with each prospect's profile URL, source URL, dated buying signal, score breakdown, fit reason, outreach angle, contact path, research risk, next question, relevant proof point, invitation, first DM, and follow-up.
5. In ChatGPT, import the JSON directly through the existing Mac connector using `node scripts/client-engine/cli.js import-json -` and stdin. Re-run `brief` to verify the result.
6. Review the source and drafts. Copy the invitation or DM and send it yourself in LinkedIn. The dashboard is optional for visual review, but it is the canonical local review surface for drafts, reminders, replies and reports.
7. Only after sending, click the corresponding Mark button to record the action.
8. When a reply arrives, paste it into the prospect card, choose the classification, and record it. Not-interested replies clear future follow-ups.
9. Use the dashboard's follow-up filter and due-date counter to continue where you stopped.

## Search desk

The dashboard creates native LinkedIn search URLs for People and Posts. They are search links, not scraping endpoints. Use them in the user's normal LinkedIn session and manually review results. The ChatGPT skill can also search publicly indexed LinkedIn content through available web research.

## Qualification

A lead is qualified only when:
- It has a valid LinkedIn person-profile URL.
- It has a real HTTPS source URL.
- The evidence summary states the actual observed business need.
- The signal has a date and is normally no older than 30 days.
- Evidence is marked verified.
- All six score components are within their limits.
- Total score is at least 800.
- No hard disqualifier applies.

Score dimensions: need 300, service fit 250, authority 150, timing 150, reachability 100, capacity 50. See the ChatGPT skill's qualification-scorecard reference.

## Unified operating queues

### Research Queue

Needs Review candidates stay separate from qualified outreach. The queue preserves:

- specific fit
- evidence link
- qualification risk
- next question
- relevant proof point
- research status
- service lane
- segment
- buyer persona

This lets the research layer continue improving a prospect without prematurely creating a message.

### Drafts

The current invitation, first DM and follow-up are stored directly on the lead. Each save also records a lightweight version so a stronger draft can replace the current text without destroying the previous wording.

### Follow-ups

The active LinkedIn default is bounded:

1. Connection.
2. First DM after acceptance or a verified direct-message route.
3. One follow-up reminder, normally about two business days later.

The reminder is only a reminder. The user manually sends the message and then records it. When a due follow-up is marked sent, the old due date is cleared so it cannot remain overdue.

### Replies

Every recorded reply is stored as history. The lead card shows the latest reply and response draft, while the history remains available to reporting.

### Reporting

Daily and weekly reports are calculated from the stored activity history. They cover qualification, drafts, invitations, connection acceptance, DMs, replies, bookings and manual social activity. A rate is reported as unavailable when there is no denominator.

### Manual LinkedIn activity

The dashboard/API can record user-confirmed or observed follows, follow-backs, likes, comments, profile views, saved posts and shared posts. These records never trigger LinkedIn actions.

## CLI

~~~bash
# Initialize the one persistent database
node scripts/client-engine/cli.js init

# Print native LinkedIn People and Posts searches
node scripts/client-engine/cli.js searches

# Import a ChatGPT JSON batch
node scripts/client-engine/cli.js import-json /path/to/linkedin-leads.json

# Import directly from ChatGPT through the existing Mac connector
node scripts/client-engine/cli.js import-json - <<'JSON'
{"leads": []}
JSON

# Review summary and records
node scripts/client-engine/cli.js summary
node scripts/client-engine/cli.js brief
node scripts/client-engine/cli.js list
node scripts/client-engine/cli.js list drafted

# Export the registry and drafts
node scripts/client-engine/cli.js export-csv output/linkedin-prospects.csv

# Build the Agent Skill ZIP
node scripts/client-engine/cli.js package-skill

# Start local dashboard
node scripts/client-engine/cli.js serve
~~~

## Storage and cleanup

- One SQLite database: state/linkedin-client-engine.sqlite3.
- SQLite WAL files remain beside the database while the server is active; all are Git-ignored.
- Real prospect data, drafts, status history, and evidence never enter Git.
- No daily CSV folders are created automatically.
- Export only when needed; the CSV path is ignored by Git.
- Back up the database while the server is stopped, or use SQLite's online backup command.
- No external API keys or local model weights are stored.

## Agent Skill versus ChatGPT plugin

The ZIP is a standalone Agent Skill package installed in the local agent skill directory for Codex-compatible use. It is not loaded as a native ChatGPT skill and is not a hosted ChatGPT @ app.

In ChatGPT conversations where the existing Remote Desktop Commander connector is available, ChatGPT can operate the local CLI and SQLite registry directly using `brief` and stdin import. A separate custom ChatGPT MCP app requires a hosted or securely tunneled endpoint and an eligible Business or Enterprise/Edu workspace; Plus cannot connect a custom MCP server as an @ app. This implementation intentionally does not expose the local database to the public internet.

## LinkedIn safety

The system never logs into LinkedIn, scrapes profiles, uses private Voyager endpoints, paginates profile lists, sends invitations, or sends messages. The dashboard only records actions the user confirms they performed.


## Opportunity Inbox

The dashboard provides a compact Opportunity Inbox with:

- Service Requests: direct and premium/matched
- Replies
- Follow-ups
- Meetings

Each record can retain the LinkedIn profile URL so the dashboard can open the exact LinkedIn context.

The Service Request table is intentionally local. LinkedIn's public developer access is not treated as a general-purpose personal inbox feed, so the engine never claims real-time synchronization that it cannot verify.
