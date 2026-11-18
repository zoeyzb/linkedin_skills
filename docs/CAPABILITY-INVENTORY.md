# Unified LinkedIn Outreach Capability Inventory

This file records the LinkedIn/outreach capabilities recovered from the user's local projects and earlier ChatGPT work. It is the map for the canonical local system.

## Canonical runtime

Repository: linkedin-client-engine-worktree

Core runtime:

- Node 24 built-in SQLite
- local-only HTTP dashboard on 127.0.0.1
- JSON import/export contract
- existing Remote Desktop Commander connection for ChatGPT-to-Mac operation
- existing Chrome Default profile / existing LinkedIn session when manual browser review is needed

No second browser, no second Chrome profile, no new browser bridge, no paid enrichment provider, no public database endpoint.

## Recovered workflow

The unified flow is:

1. Discover companies and buyers.
2. Research public LinkedIn evidence.
3. Verify the decision-maker and current role.
4. Identify a concrete buying signal.
5. Score need, service fit, authority, timing, reachability and capacity.
6. Segment by buyer/service lane.
7. Store the research dossier and evidence.
8. Prepare connection note, first DM and follow-up drafts.
9. Keep drafts editable and versioned.
10. Manually execute approved LinkedIn actions.
11. Record invitations, connections, DMs and social engagement.
12. Capture and classify replies.
13. Prepare the next response.
14. Track reminders and next actions.
15. Report daily/weekly funnel performance.
16. Preserve history and prevent duplicate outreach.

## Recovered GTM stages

The local GTM prospecting system contains the following source workflow areas:

- ICP definition
- audience discovery
- targeted search
- customer patterns
- buying signals
- contact enrichment
- lead scoring
- lead prioritization
- lead qualification
- segmentation
- personalization
- LinkedIn outreach
- follow-ups
- reply classification
- account notes
- pipeline review
- lookalike research
- follower-scrape research
- prospecting system orchestration
- audience filtering

These source skills are preserved under vendor/linkedin-stack/gtm-prospecting-system/skills.

## Recovered LinkedIn specialist sources

Exact source packages preserved under vendor/linkedin-stack:

- package-linkedin-prospector
- package-linkedin-outreach
- linkedin-lead-exporter
- linkedin-prospecting-engine
- linkedin-client-acquisition-router

Only LinkedIn acquisition sources are vendored. Profile optimization, content publishing, email, phone enrichment, CRM connectors, paid lead providers and the historical OpenOutreach package are deliberately outside this repository.

## Research-log fields recovered from earlier prospect work

The research log explicitly used:

- specific fit
- evidence link
- qualification risk
- next question
- connection note
- relevant proof point

The local engine now has direct fields for these concepts so research is not thrown away after a draft is generated.

## Recovered workflow automation concepts

Earlier workflow diagrams and files showed these capabilities:

### Lead Ops

LinkedIn discovery → research → qualify → score → personalized outreach → follow-up → reply check → meeting booking → meeting outcome → reporting → error handling.

### Revenue OS

LinkedIn discovery → research → qualify → score → outreach → follow-up → replies → meetings → report.

### Follow-up logic

The historical automation included:

- wait/check reply
- reminder after no reply
- bounded multi-step follow-up
- stop/close after the sequence
- nurture for lower-priority records

The active LinkedIn default is intentionally bounded to one follow-up reminder, with additional steps available only when a campaign explicitly enables them.

### Reporting

Historical workflows called for daily/weekly KPI reporting and pipeline summaries. The local engine now calculates reports from persisted activity instead of relying on screenshots or manually maintained counts.

## Meeting and booking workflow recovered

The canonical engine now covers the post-reply handoff through local meeting tracking:

- booked conversation
- scheduled meeting
- optional meeting URL
- meeting notes
- held / cancelled / no-show state
- outcome
- next step

No paid scheduler or calendar integration is required.

## Manual LinkedIn activity recovered

Earlier prospecting work explicitly tracked or considered:

- connection requests
- connection acceptance
- following
- follow-back
- likes
- comments
- profile inspection
- saved/relevant posts
- DMs
- replies

The canonical engine records these activities but does not execute them.

## Current browser integration

The Mac already has the existing Chrome bridge and an inactive LinkedIn automation tab. The bridge uses the normal Chrome Default profile.

Safety boundary:

- never touch the active tab
- never launch another Chrome
- never switch profiles
- never randomly click
- never send an invitation/DM/follow/like/comment without explicit approval
- use the bridge for ordinary web inspection only
- physical mouse/hover/native-dialog actions require separate approval

The browser bridge itself is not copied into this repository because it is an OS/browser integration, not prospect data or outreach business logic. The repo documents the integration boundary instead of duplicating the working bridge.

## Vendored source size

The selected LinkedIn source material is approximately 1.7 MB. No local runtime database or browser profile data is vendored.

## Related projects intentionally not duplicated

The following local projects were inspected as adjacent systems:

- gtm-prospecting-system
- revenueos-saas
- revenueos-qa
- recover-about-check
- linkedin-prospector
- linkedin-background-browser
- chatgpt-chrome-bridge

Their relevant capabilities are either vendored as exact source skills or represented in this inventory. Full application/runtime copies are intentionally not duplicated inside the canonical repo because that would create storage and maintenance duplication.

## Storage policy

Keep in Git:

- source skills
- orchestration instructions
- code
- tests
- documentation
- configuration templates

Keep out of Git:

- SQLite database
- prospect records
- drafts containing real prospect information
- exported CSVs
- browser data
- cookies/session tokens
- generated daily reports
- screenshots
- runtime logs
- caches

The goal is a single lightweight source of truth without turning the Mac into a second copy of every connected application.
