---
name: linkedin-client-acquisition
description: Run a quality-first, LinkedIn-only client acquisition workflow: discover relevant founders and business decision-makers, verify buying signals, qualify and rank prospects, write genuinely individualized connection notes and DMs, manage replies and follow-ups, and export a persistent lead batch. Trigger when the user asks to find clients on LinkedIn, build a daily prospect list, qualify LinkedIn leads, write LinkedIn outreach, or manage LinkedIn conversations.
version: 1.0.0
pack: intelligence
inputs:
  - service_profile
  - ideal_customer_profile
  - daily_target
  - prior_prospect_registry
  - public_linkedin_evidence
requires:
  - public_web_research_or_user_provided_linkedin_material
produces:
  - evidence_qualified_linkedin_prospects
  - individualized_linkedin_message_drafts
  - import_ready_json_batch
gates:
  - source_backed_buying_evidence
  - score_at_least_800
  - duplicate_and_contact_history_check
  - human_approval_before_linkedin_actions
fallback: linkedin-prospector
mutatesWorkspace: false
parallelSafe: false
---

# LinkedIn Client Acquisition

Operate one quality-first LinkedIn client-acquisition workflow. The daily target is **10 qualified, researched prospects with individual message drafts**, not a quota of generic invitations.

## Own this workflow

Coordinate discovery, evidence review, qualification, message writing, conversation handling, and handoff to the local prospect registry. Reuse installed specialist skills when available instead of duplicating their work:

- **LinkedIn Prospector**: public LinkedIn discovery, company and decision-maker research, buying signals, ICP fit, and lead scoring.
- **LinkedIn Outreach Copilot**: connection notes, DMs, InMails, follow-ups, reply handling, objections, and campaign retrospectives.
- **LinkedIn Lead Exporter**: source-backed field normalization, deduplication, review flags, and CSV/XLSX export.
- **Existing GTM skills**: ICP Definition, Buying Signals, Lead Scoring, Lead Prioritization, Personalization, Follow-ups, Reply Classification, Account Notes, and Pipeline Review.
- **Existing LinkedIn skills**: Calibrate Voice, Draft Outreach, Reply Handler, and Campaign Retro.

Use a specialist only when its capability is needed. Do not run all skills mechanically or repeat research already completed.

## When to use

- The user wants to find potential clients specifically through LinkedIn.
- The user wants a daily or weekly batch of qualified founders, owners, agency leaders, or technical decision-makers.
- The user wants a specific prospect researched and qualified before contacting them.
- The user wants a personalized LinkedIn invitation, first DM, follow-up, or reply.
- The user wants to continue a previous prospecting run without repeating leads.

## When not to use

- Email prospecting or cold-email sending.
- Recruiting candidates for employment.
- Generic social-media growth or content writing without a prospecting goal.
- Automated LinkedIn scraping, profile crawling, connection invitations, messaging, likes, follows, or account actions.
- Any request to bypass LinkedIn access controls, rate limits, CAPTCHAs, or anti-bot systems.

If the user asks for another channel, hand off to the appropriate channel-specific workflow. Do not silently switch channels.

## Default service context

Use the user's established development services as the starting offer, then narrow to the active campaign:

- Full-stack websites and web applications.
- Shopify and ecommerce experiences.
- Custom dashboards, CRMs, lead-management systems, and internal tools.
- API integrations and workflow automation.
- AI-enabled business workflows and voice-agent integrations.
- Development support for agencies, including implementation overflow and white-label delivery.

Relevant proof may include the user's Shopify work, Marlin Hotel website, Recover Revenue, Next Role, and custom business systems. Select only the one or two projects that directly support the prospect's observed need. Never invent client names, revenue, performance metrics, outcomes, or public case studies.

Default prospect groups are U.S. founders/owners, SaaS/startup founders, digital agency owners, technical decision-makers, and established service businesses with an evidenced website or systems need. The active acquisition geography is the United States.

## Situation classification

Before acting, classify the request:

| Situation | Required behavior |
|---|---|
| Daily discovery | Search public LinkedIn material, check the existing registry, qualify to the ten-prospect target, draft messages, export JSON. |
| Single prospect | Research that person and company, verify the reason to approach, score, and draft only if qualified. |
| Message-only request | Use the supplied prospect context; do not invent new research or re-run discovery. |
| Reply handling | Read the whole thread supplied, classify the reply, draft a contextual response, and update status only when the user confirms the outcome. |
| Follow-up review | Query stored follow-up dates and history; draft only for prospects who remain eligible. |
| Missing or restricted evidence | Mark Needs Review, use permitted alternative public sources, or provide LinkedIn-native search links for manual review. Never claim the profile was verified. |

## Execution protocol

### 1. Load context and prevent repetition

1. Reuse the user's current offer, ICP, geography, excluded accounts, preferred writing style, and previous decisions from the current conversation and available saved context.
2. If the local LinkedIn Client Engine is available, inspect its existing SQLite registry before discovery. Use the existing local project and database; do not create a second CRM or a new data folder.
3. If the registry is not accessible, ask for the existing prospect export only when needed. State the deduplication scope honestly. Never claim a global duplicate check when only the current batch was checked.
4. Exclude prospects already contacted, rejected, booked, archived, or marked not interested unless the user explicitly asks to reopen that record.
5. Use a maximum research pool of 100 candidates as a search ceiling, not as a required output count.

### 2. Discover through LinkedIn

1. Use available public web search to find publicly indexed LinkedIn people profiles and posts. Search for the prospect's actual business need, not merely a title.
2. Prefer LinkedIn posts where a person explicitly asks for a developer, describes a technical problem, requests a recommendation, announces a relevant launch, or discusses a concrete implementation need.
3. Also search LinkedIn people results for decision-makers at companies whose public websites show a relevant, verifiable opportunity.
4. Use LinkedIn-native People and Posts search URLs as a fallback when public indexing is incomplete. Provide the search link and let the user inspect results in their normal LinkedIn session.
5. Company websites and official public announcements may corroborate the business need. LinkedIn remains the only outreach channel.
6. Use the search query pack in the research-and-writing reference. Vary queries across ecommerce, agencies, SaaS, custom software, integrations, and website projects.
7. Search recent signals first. Prioritize the latest 24 hours to 7 days when possible. Use the latest 30 days as the normal qualification window and never treat an older signal as current without a new verification.
8. Never bulk-scrape LinkedIn, automate pagination, use private Voyager endpoints, collect hidden data, or ask for login cookies or passwords.

### 3. Research each candidate

For every candidate that might qualify, establish:

- Real person and current professional title.
- Company and official website, if available.
- LinkedIn person-profile URL.
- Decision-making authority or credible influence over the project.
- A concrete business need or buying signal.
- Source URL, source type, publication date, and date checked.
- Why the need maps to one of the user's actual services.
- Whether a LinkedIn connection request, first-degree DM, Open Profile DM, or InMail is actually available.

Separate observed facts from interpretation. If a profile is inaccessible, do not claim it was opened. If the evidence is contradictory, preserve the conflict and mark Needs Review.

### 4. Qualify and rank

Read the qualification scorecard before scoring.

Use this 1,000-point model:

- Need: 300.
- Service fit: 250.
- Decision-maker authority: 150.
- Timing and recency: 150.
- LinkedIn reachability: 100.
- Evidence of business capacity: 50.

A lead is **Qualified** only when all of these are true:

1. The LinkedIn person-profile URL is valid.
2. At least one real HTTPS source supports the business need.
3. The evidence summary describes the specific observed need.
4. The buying signal is concrete, dated, and no older than 90 days.
5. Evidence is marked verified, not inferred from a title alone.
6. Every non-zero score component has a specific, source-grounded score_evidence note.
7. Signal strength is explicit or strong; funding, growth, a founder title, or an ordinary internal job posting alone is not sufficient.
8. A hiring signal qualifies only when the source explicitly supports external contractor, agency, or implementation-partner demand.
9. A real LinkedIn contact path is verified: connection request, first-degree DM, Open Profile DM, or available InMail.
10. Need score is at least 180/300, service fit at least 150/250, reachability at least 25/100, and all six score components are valid integers within their ranges.
11. The total is at least 800/1000.
12. No hard disqualifier applies.

Otherwise use **Needs Review** or **Rejected**. A high numeric score never overrides missing evidence. Do not inflate scores to reach ten.

### 5. Prepare individualized LinkedIn outreach

Read the research-and-writing reference and use the user's calibrated voice when available.

For each qualified prospect, prepare:

- invitation_draft: a concise connection note suitable for the character limit displayed in LinkedIn's current UI.
- first_dm_draft: a message for after connection acceptance, or for Open Profile/InMail only when that route is actually available.
- follow_up_draft: one contextual follow-up that adds a new observation or useful point.

Do not write a message if there is no genuine, evidence-backed angle. Do not use generic openers, generic compliments, fake familiarity, empty networking language, or a meeting ask that has not been earned.

Avoid these default phrases and patterns:
- "I came across your profile."
- "Thought it would be nice to connect."
- "Open to a quick chat?" as a generic ending.
- "I noticed your impressive background."
- "We help businesses like yours..."
- A list of all the user's services or portfolio projects.

Do not use a fixed template with the prospect's name inserted. The message must be written from the actual research. If a message could be sent unchanged to 100 other people, rewrite it or mark the prospect as not ready.

The first touch should normally begin a relevant conversation, not dump a service pitch. Exception: when the prospect explicitly asks for a developer or service recommendation, respond directly to that request and explain the relevant capability briefly.

Do not claim the user has completed a project, achieved a metric, or worked with a company unless that fact is supported by available context.

### 6. Respect the LinkedIn contact path

Choose one accurate contact_path:

- connection_request_note: not connected; prepare an invitation note.
- first_degree_dm: already connected.
- open_profile_dm: Open Profile messaging is visibly available.
- inmail: the user has an available InMail route and chooses to use it.
- unavailable: no permitted direct route is currently available.

Do not draft a DM as though it can be sent to a stranger when only a connection request is available. Keep the post-acceptance DM as a clearly labelled next-stage draft.

### 7. Follow-up and reply handling

- Stop all follow-ups when the prospect says no, asks not to be contacted, or indicates the service is irrelevant.
- If the prospect says "not now", record their stated timing and only schedule a follow-up consistent with it.
- If a sent LinkedIn message receives no reply, the default reminder is one follow-up after about two business days. It must add something new and must not merely say "checking in". Additional steps may be stored only when the active campaign explicitly enables them.
- If the prospect replies, classify the response as interested, question, objection, referral, not now, not interested, or booked.
- Use the installed LinkedIn Outreach Copilot / Reply Handler methodology when available.
- Draft the response; never send it.
- Record an external event such as invitation sent, connection accepted, or DM sent only after the user confirms it actually happened.

### 8. Research log and editable workspace

Every researched prospect should retain the research dossier, not just the final message. Keep these fields editable in the local record:

- specific_fit: the concrete reason the prospect fits.
- evidence_link: the source supporting the buying signal.
- qualification_risk: what could make the lead wrong, stale or unsupported.
- next_question: the single best question to resolve remaining uncertainty.
- relevant_proof_point: the user's most relevant project or capability.
- connection_note: the current invitation draft.
- research_status: queued, needs_review, or verified.
- service_lane: full_stack_web, ai_automation, qa_debugging, or shopify_ecommerce.
- segment: the campaign segment used for reporting.
- buyer_persona: founder, owner, technical leader, agency owner, operations leader, or other verified persona.

Drafts are persistent working text. Re-saving a draft updates the current version and records a lightweight version history so the wording can be improved without losing the previous draft.

### 9. Follow-up reminders and reply preparation

The local engine maintains a bounded LinkedIn sequence:

1. Connection invitation.
2. First DM after acceptance or when a verified direct-message path exists.
3. One follow-up draft, normally due about two business days later.

The system can store additional steps if a campaign explicitly requires them, but it never sends them. When a follow-up is marked sent, the completed reminder is cleared so it cannot remain falsely overdue.

Replies are stored as a history, not just a single mutable field. The latest response draft remains editable and the full reply history is available for reporting.

### 10. Manual LinkedIn activity tracking

The engine may record manual account actions after the user confirms them:

- invitation_sent
- connected
- dm_sent
- followed
- follow_back
- liked
- commented
- profile_viewed
- saved_post
- post_shared

These are records of actions or observations, not automated LinkedIn actions.

### 11. Reporting

Daily and weekly reports are calculated from the persistent activity history. Reported metrics include:

- qualified prospects
- drafts prepared
- invitations confirmed sent
- connection acceptances
- DMs confirmed sent
- replies and reply classifications
- booked conversations
- follow / follow-back / like / comment activity
- acceptance rate
- reply rate
- positive reply rate
- booking rate

When a denominator is zero, report the metric as unavailable rather than inventing a percentage.

### 12. Produce exactly the useful daily output

The target is **10 qualified prospects per day**. Search enough candidates to try to reach ten. Return the ten highest-quality qualified prospects, or the real shortfall.

Never pad the list with weak leads. If only six pass the evidence gate, report six qualified and explain why the remaining candidates failed. Keep Needs Review candidates separate from the qualified list.

For every qualified prospect, show:
- Name, title, company, LinkedIn URL.
- Score and six-part breakdown.
- Specific buying signal and source.
- Why the user is relevant.
- Contact path.
- One invitation draft, one post-acceptance/available DM draft, and one follow-up draft.
- Next action.

### 13. Export and persist

Produce one JSON batch matching the local-data-contract reference.

If the authorized local project tools are available and the user has asked to store the run, import the JSON into the existing local SQLite database. Otherwise provide the JSON as an importable artifact or a code block. Never create a second database or duplicate daily CSV folders.

Local CLI from the LinkedIn Client Engine project root:

~~~bash
node scripts/client-engine/cli.js init
node scripts/client-engine/cli.js brief
node scripts/client-engine/cli.js import-json -
node scripts/client-engine/cli.js summary
node scripts/client-engine/cli.js serve
~~~

The dashboard runs on http://127.0.0.1:4177. It is local-only. It stores evidence, drafts, statuses, replies, and follow-up dates. Importing a batch does not send any LinkedIn action.

### Direct ChatGPT operation through the existing Mac connector

When this workflow is used in a ChatGPT conversation that has the user's existing Remote Desktop Commander connector:

1. Use the already-connected Mac device; do not install another browser bridge, launch another Chrome, or create a second project/database.
2. From the existing project root at `/Users/zainabhassnain/Projects/linkedin-client-engine-worktree`, run `node scripts/client-engine/cli.js brief` before research. This returns the current daily target, qualified prospects ready for outreach, due follow-ups, Needs Review records, and all 19 native LinkedIn searches.
3. Research and score candidates using the rules above. Do not add prospects already in the registry.
4. Import the completed JSON batch directly through stdin with `node scripts/client-engine/cli.js import-json -` and a JSON heredoc. Do not ask the user to create or move a temporary JSON file, and do not require them to operate the dashboard.
5. Run `node scripts/client-engine/cli.js brief` again and verify the imported count, qualification status, and duplicate handling before reporting the result.

The local connector makes this workflow operable in a connected ChatGPT chat; it does not turn the Agent Skill ZIP into a ChatGPT web plugin or make the local database available in chats without that connector.

## Tool and account safety

- No LinkedIn login automation, scraping, private endpoints, profile pagination, invitations, messages, likes, follows, or comments.
- Never store credentials, cookies, session tokens, personal email addresses, or phone numbers.
- Do not connect paid enrichment providers or external LLM APIs by default.
- Use ChatGPT's available public research capabilities; if unavailable, give the user targeted LinkedIn search URLs and request the relevant results.
- Never open or change the user's active LinkedIn tab. If inspecting a specific profile through an authorized browser, use a managed inactive tab and inspect only the requested page.
- Human approval is required before every LinkedIn action. The local app's "Mark sent" controls only record an action the user says they performed.

## Failure taxonomy

| Failure | Observable condition | Correct response |
|---|---|---|
| Discovery shortage | Public search returns too few relevant LinkedIn pages | Expand query angles and use native LinkedIn search links; report actual count. |
| Evidence failure | Profile/post is inaccessible, source missing, or claim cannot be verified | Mark Needs Review; do not score as qualified. |
| Fit failure | Business is real but no service need is supported | Reject or retain as low-priority research; do not invent a project. |
| Contact-path failure | Not connected and no InMail/Open Profile route | Prepare only the connection request; do not imply a DM can be sent. |
| Duplicate failure | Same normalized LinkedIn profile already exists | Merge new evidence; preserve outreach status and history. |
| Persistence failure | Local database or CLI is unavailable | Provide the JSON batch and state that it has not been imported. |
| Messaging failure | Draft sounds generic, salesy, flattering, or unsupported | Rewrite from source evidence or withhold the draft. |

## Completion criteria

A run is complete only when:

- The actual number of qualified prospects is reported.
- Every qualified lead has source-backed evidence and a score breakdown.
- The ten-prospect target is met or the shortfall is explicit.
- Each message is individualized and uses a real contact path.
- Existing contacted/rejected records are not repeated.
- The JSON batch validates against the local import contract.
- No LinkedIn action has been sent or claimed.

## Package boundary

This is a standalone **Agent Skill**, not a hosted ChatGPT web app/plugin. It uses the host agent's available research and writing capabilities and exports data for the local dashboard. It is installed locally for Codex-compatible use; ChatGPT web @-invocation requires a separately hosted and authorized plugin/MCP wrapper. The existing Remote Desktop Commander connector can access the Mac's local CLI in chats where it is connected, but the skill package itself does not automatically connect ChatGPT web to SQLite. Do not claim a hosted plugin exists.

## Handoff

Return:
1. Qualified count / 10.
2. Needs Review count and why.
3. Duplicate count.
4. Best prospects with evidence and drafts.
5. JSON batch path or import instructions.
6. Any blocked research or contact-path limitations.
