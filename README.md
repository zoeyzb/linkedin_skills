# LinkedIn Outreach System

A local, LinkedIn-only client acquisition system for finding high-fit prospects, researching them on LinkedIn, qualifying them, drafting outreach, managing replies and follow-ups, tracking meetings, and reporting outcomes.

## What it is

The system is designed to replace a bloated paid outreach stack with a small local workflow:

LinkedIn search → LinkedIn research → qualification → personalized draft → manual send → connection/DM tracking → reply preparation → follow-up → meeting booking → meeting outcome → reporting

The system does **not** send LinkedIn actions automatically. LinkedIn inbox and Service Page request data are not treated as a real-time push feed; the local database is updated when a LinkedIn browser-assisted check/import is performed.

### Free-by-design

- No paid lead database.
- No Apollo.
- No email or phone enrichment.
- No paid LLM API.
- No hosted CRM.
- No Docker.
- No external calendar API.
- No new browser extension.
- No second Chrome profile.
- No subscription required for the local engine.
- Uses Node.js built-ins and SQLite.
- Uses the existing Mac connection and existing Chrome Default profile when ChatGPT needs to inspect LinkedIn manually.

GitHub hosting is separate from the runtime. GitHub Free supports unlimited public and private repositories for personal accounts. The repository itself does not require a paid GitHub plan.

## The actual workflow

### 1. Find

Search LinkedIn for specific buyer groups and buying-intent posts.

Current target:

- U.S. founders and owners
- CEOs, CTOs, technical leaders and agency owners
- SaaS and software companies
- Ecommerce and Shopify businesses
- Digital agencies needing delivery support
- Service businesses with an evidenced web or systems need

Primary service lanes:

1. Full-stack web and product development
2. AI automation, agents and integrations
3. Debugging, QA and reliability
4. Shopify and ecommerce

The system maintains targeted LinkedIn People and Posts searches instead of creating a giant undifferentiated lead list.

### 2. Research

Research stays on LinkedIn.

Each prospect keeps:

- LinkedIn profile
- LinkedIn evidence URL
- dated buying signal
- signal summary
- specific fit
- qualification risk
- next question
- relevant proof point
- contact path
- service lane
- buyer persona
- segment

External websites are not required for qualification.

### 3. Qualify

Prospects are scored from 0–1000.

A prospect normally needs:

- 800+ score
- concrete current buying signal
- strong signal strength
- verified LinkedIn contact path
- recent signal, normally within 30 days
- minimum need/service-fit/reachability evidence
- evidence notes for the score

Uncertain prospects stay in **Research Queue** instead of being pushed into outreach.

The normal operating target is **10 genuinely qualified prospects per day**, not 10 random messages.

### 4. Draft

Every qualified prospect can have three editable drafts:

1. Connection invitation
2. First DM
3. Follow-up

Drafts are persistent in SQLite and versioned, so improving the wording does not destroy the previous version.

The writing standard is:

- specific
- human
- signal-first
- short
- one question at most
- no fake familiarity
- no generic compliments
- no premature pitch

### 5. Send manually

The system never assumes that a draft was sent.

You manually send the approved LinkedIn action, then record it:

- invitation sent
- connected
- DM sent
- follow-up sent

This keeps the account-action boundary explicit.

LinkedIn itself warns that excessive invitations or prohibited automation can lead to restrictions, so this system intentionally keeps state-changing LinkedIn actions human-approved.

### 6. Replies

When a prospect replies, the system stores:

- exact reply
- classification
- response draft
- next follow-up date
- reply history

Supported reply states include:

- interested
- question
- objection
- not now
- not interested
- booked
- needs review

A negative reply cancels future follow-ups.

### 7. Follow-ups

The default LinkedIn sequence is deliberately bounded:

connection → first DM → one follow-up

The normal reminder is about two business days after a manually confirmed DM.

Completed follow-ups clear their old due date so they cannot remain falsely overdue.

### 8. Meetings

When a prospect agrees to a meeting:

1. Mark the LinkedIn conversation as booked.
2. Record the meeting locally.
3. Store date/time and optional meeting URL.
4. Record notes, outcome and next step.
5. Track scheduled, held, cancelled and no-show states.

There is no paid scheduler or calendar API in the core system. You can use whatever free/manual calendar or meeting link you already use and simply record it here.

### 9. Reporting

The local report covers the full funnel:

- researched
- qualified
- drafted
- invitations
- accepted connections
- DMs
- replies
- positive replies
- booked
- meetings held
- follow/follow-back/like/comment activity
- acceptance rate
- reply rate
- positive reply rate
- booking rate

If a denominator is zero, the system reports the rate as unavailable instead of inventing a percentage.

## Local dashboard

Start it with:

~~~bash
cd ~/Projects/linkedin-client-engine-worktree
node scripts/client-engine/cli.js init
node scripts/client-engine/cli.js serve
~~~

Then open:

http://127.0.0.1:4177

The dashboard contains:

- Opportunity Inbox with four lanes: Service Requests, Replies, Follow-ups, Meetings
- Premium/Matched vs Direct service-request tracking
- Open LinkedIn links on opportunity rows
- LinkedIn search desk
- Research Queue
- Drafts
- Follow-ups
- Replies
- Meetings
- Reports
- Prospect Queue
- manual activity recording
- JSON import/export

Everything is local.

## ChatGPT + Mac

When ChatGPT is connected to the existing Remote Desktop Commander connection, the workflow can operate the local engine directly.

The intended sequence is:

1. Inspect the current LinkedIn acquisition state.
2. Search LinkedIn through the existing Chrome Default profile when research is needed.
3. Build a small candidate batch.
4. Research each candidate on LinkedIn.
5. Score and deduplicate.
6. Save only qualified prospects for outreach.
7. Prepare editable drafts.
8. Review follow-ups and replies.
9. Track meetings.
10. Report what actually happened.

No second Chrome, profile, browser bridge or external database is required.

## Repository layout

~~~text
config/                         operating configuration
context/                        voice and positioning
contracts/                      data contracts
docs/                           architecture, capability map, verification
public/                         local dashboard
scripts/client-engine/          SQLite engine + HTTP API + CLI
skills/linkedin-client-acquisition/
                                orchestration skill
vendor/linkedin-stack/          selected LinkedIn source skills only
tests/client-engine/            behavioral and HTTP tests
state/                          local SQLite state (gitignored)
~~~

## Vendored source policy

Only LinkedIn acquisition source material is kept under vendor/linkedin-stack.

Included:

- LinkedIn prospecting
- LinkedIn outreach
- LinkedIn lead export
- LinkedIn prospecting engine
- LinkedIn client acquisition routing
- curated LinkedIn-relevant prospecting skills

Excluded:

- OpenOutreach
- cold email
- phone enrichment
- CRM integrations
- paid lead providers
- profile/content publishing packages
- browser sessions and cookies
- real prospect exports
- local databases

The selected source material is approximately 1.7 MB.

## Data safety

The repository does not commit:

- SQLite databases
- real lead CSVs
- browser cookies
- LinkedIn sessions
- credentials
- API keys
- screenshots
- runtime logs
- generated reports

The existing .gitignore keeps runtime and personal data local.

## Verification

Run:

~~~bash
cd ~/Projects/linkedin-client-engine-worktree/scripts
npm run client-engine:test
npm run client-engine:package-skill
~~~

The repository also contains:

- docs/IMPLEMENTATION-VERIFICATION.md
- docs/CAPABILITY-INVENTORY.md
- docs/LINKEDIN-CLIENT-ENGINE.md

These document the architecture, recovered capabilities and verification evidence.

## One source of truth

This repository is the canonical source for the LinkedIn outreach system.

When adding or changing functionality, update the repository rather than creating another disconnected outreach project.
