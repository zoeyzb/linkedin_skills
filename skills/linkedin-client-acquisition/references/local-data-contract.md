# Local LinkedIn Client Engine Data Contract

The local engine stores one canonical record per LinkedIn person profile. Import the JSON batch produced by this skill through the CLI or the optional local dashboard. In ChatGPT conversations with the existing Remote Desktop Commander connector, use stdin import directly; no temporary file or dashboard interaction is required.

## Batch envelope

~~~json
{
  "schema_version": "1.0",
  "generated_at": "2026-11-15T10:00:00.000Z",
  "daily_target": 10,
  "qualified_count": 1,
  "shortfall": 9,
  "leads": []
}
~~~

The leads array contains only qualified, message-ready prospects. Keep Needs Review candidates in a separate section in the report; do not silently mix them into the qualified import batch.

## Lead fields

| Field | Required | Meaning |
|---|---|---|
| name | Yes | Verified professional name |
| title | Yes | Current professional title |
| company | Yes | Current company |
| linkedin_url | Yes | Canonical person profile URL, https://www.linkedin.com/in/slug/ |
| company_website | No | Official company website |
| location | No | Public professional location only |
| industry | No | Verified company industry |
| source_url | Yes | HTTPS LinkedIn URL supporting the buying signal |
| source_type | Yes | linkedin_post, linkedin_profile, company_website, or public_announcement |
| signal_type | Yes | explicit_request, hiring_need, launch, expansion, website_gap, integration_need, agency_overflow, or other; funding/growth are context only and never qualify on their own |
| signal_strength | Yes | explicit, strong, moderate, or weak; only explicit/strong can qualify |
| external_support_signal | Required for hiring_need | true only when the source explicitly supports contractor, agency, or implementation-partner demand |
| signal_summary | Yes | Concrete description of the observed evidence |
| signal_date | Yes | YYYY-MM-DD date of the signal or current verification date for a newly observed website issue |
| evidence_status | Yes | verified only when the source was actually inspected |
| score_breakdown | Yes | Six integer scores: need, service_fit, authority, timing, reachability, capacity |
| score_evidence | Yes | One source-grounded evidence note for every non-zero score component |
| fit_reason | Yes | Why this specific prospect fits one of the user's services |
| outreach_angle | Yes | Specific opening angle grounded in the evidence |
| contact_path | Yes | connection_request_note, first_degree_dm, open_profile_dm, inmail, or unavailable |
| invitation_draft | Yes | Personalized connection note; keep within the UI's displayed character limit |
| first_dm_draft | Yes | Message for after acceptance or a visibly available direct-message route |
| follow_up_draft | Yes | One contextual follow-up draft |
| checked_at | Recommended | ISO timestamp of research verification |

## Score breakdown limits

- need: 0–300
- service_fit: 0–250
- authority: 0–150
- timing: 0–150
- reachability: 0–100
- capacity: 0–50

The six values must sum to at least 800 for a qualified record. The need score must be at least 180, service fit at least 150, and reachability at least 25. Signal strength must be explicit or strong, and contact_path must be a verified LinkedIn route. A hiring_need signal additionally requires external_support_signal=true. Funding and growth are context signals, not qualifying signal types; ordinary internal hiring alone is not sufficient. The local engine independently checks the score and evidence gate. Missing or invalid evidence produces Needs Review, even if the supplied numeric score is high.

## Example lead

~~~json
{
  "name": "Alex Rivera",
  "title": "Founder",
  "company": "Northstar Commerce",
  "linkedin_url": "https://www.linkedin.com/in/alex-rivera/",
  "company_website": "https://northstar.example",
  "source_url": "https://www.linkedin.com/posts/example-public-post/",
  "source_type": "linkedin_post",
  "signal_type": "explicit_request",
  "signal_strength": "explicit",
  "external_support_signal": false,
  "signal_summary": "The founder publicly asked for recommendations for a Shopify developer for a new store launch.",
  "signal_date": "2026-11-14",
  "evidence_status": "verified",
  "score_breakdown": {
    "need": 290,
    "service_fit": 240,
    "authority": 145,
    "timing": 140,
    "reachability": 90,
    "capacity": 45
  },
  "score_evidence": {
    "need": "The founder explicitly requested Shopify developer recommendations.",
    "service_fit": "The request maps directly to Shopify development services.",
    "authority": "The LinkedIn profile identifies this person as the founder.",
    "timing": "The request was published three days before research.",
    "reachability": "The profile displays an available connection request route.",
    "capacity": "The company has an active store and product catalogue."
  },
  "fit_reason": "The founder is actively seeking Shopify implementation support.",
  "outreach_angle": "Respond to the specific request and refer to one relevant Shopify build.",
  "contact_path": "connection_request_note",
  "invitation_draft": "A specific, individualized connection note.",
  "first_dm_draft": "A post-acceptance DM grounded in the request.",
  "follow_up_draft": "One useful follow-up if the first DM receives no reply.",
  "checked_at": "2026-11-15T10:00:00.000Z"
}
~~~

The example is illustrative and must not be presented as a real prospect.

## Persistence and privacy

- The database canonicalizes LinkedIn profile URLs and merges duplicates.
- Re-importing a lead preserves existing outreach status, drafts, and activity history.
- The SQLite database lives at state/linkedin-client-engine.sqlite3, which is Git-ignored.
- CSV exports and daily output files must not be committed.
- No email addresses, phone numbers, passwords, cookies, or session tokens are part of this workflow.

## Research dossier and editable-workspace fields

The canonical lead record may also include:

| Field | Meaning |
|---|---|
| research_status | queued, needs_review, or verified |
| research_risk | What could make the opportunity wrong, stale, or unsupported |
| next_question | Best unresolved question before or during the first conversation |
| proof_point | Most relevant user project/capability to support the angle |
| service_lane | full_stack_web, ai_automation, qa_debugging, or shopify_ecommerce |
| segment | Campaign segment for reporting |
| buyer_persona | Verified decision-maker persona |
| last_researched_at | Last research verification timestamp |

These fields are retained on re-import and are not required to qualify a lead unless the qualification gate requires the underlying evidence.

## Persistent draft model

The SQLite engine stores the current invitation, first DM, and follow-up text on the lead for easy editing. It also stores lightweight draft versions and a bounded outreach sequence:

1. connection
2. first_dm
3. follow_up

The default LinkedIn follow-up reminder is approximately two business days after a manually confirmed first DM when the user chooses to schedule it. The engine never sends the reminder or message.

## Reply history

Every recorded reply is stored in the replies table with:

- actual reply text
- classification
- prepared response draft
- optional next follow-up date
- timestamp

The lead record retains the latest reply for quick review.

## Manual LinkedIn activity history

The activities table can record user-confirmed or observed LinkedIn activity such as:

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

These are tracking records only. No activity type is an instruction to automate a LinkedIn account action.

## Reporting contract

getReport() returns evidence-backed funnel metrics for a requested time window. Rates are null when their denominator is zero. This prevents the reporting layer from manufacturing percentages from empty samples.

## Meeting record

A meeting can be recorded only after the LinkedIn lead is marked booked.

Meeting fields:

- status: scheduled, held, cancelled, or no_show
- scheduled_at: ISO timestamp
- meeting_url: optional HTTPS meeting URL
- notes: meeting context
- outcome: result of the call
- next_step: concrete post-call action

The local engine does not book a calendar itself. It records the meeting after the user manually books it.
