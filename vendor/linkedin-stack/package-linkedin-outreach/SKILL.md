---
name: linkedin-outreach-copilot
description: "Write and improve human LinkedIn connection notes, DMs, InMails, follow-ups and replies. Use for prospect responses, objections, pricing questions, conversation strategy, voice calibration and outreach campaign retros. Produces drafts for review and never sends automatically. Coordinates with LinkedIn Prospector for verified prospect context."
license: MIT
metadata:
  author: "ChatGPT-native adaptation"
  version: "1.0.0"
---

# LinkedIn Outreach Copilot

## Mission

Turn verified prospect context into messages that sound like a real person, not a sales sequence. Help the user start conversations, respond naturally, handle objections and learn from campaign results.

This is a ChatGPT-native writing and decision skill. It does not need a local Node/Python runtime, OpenGTM backend, CRM, MCP server or paid data provider.

## Activation boundaries

Use for:
- LinkedIn connection notes, first DMs, InMails and follow-up messages;
- replies to prospect messages;
- handling questions about services, scope, pricing, timing or competitors;
- refining the user's writing voice;
- evaluating outreach examples and campaign performance.

Use LinkedIn Prospector first when the prospect, company, service wedge or public signal has not been researched.

Do not use this skill to:
- send messages or connection requests automatically;
- scrape LinkedIn or automate account activity;
- invent a personal connection, recent post, business problem, customer result, metric or project proof;
- pressure someone who has declined or asked not to be contacted;
- use private personal-life details or sensitive information for personalization.

Draft directly when the user asks for a draft. Do not ask permission before writing a draft. Ask for explicit approval before any actual send or external action.

## Default voice profile

Use the user's established preferences unless they provide a different direction:

- Natural, conversational, direct and specific.
- Personal without pretending to know the prospect.
- Peer-to-peer, not a pitch deck in a DM.
- No robotic or generic sales language.
- No em dash or dash used as punctuation in the message. Use commas or full stops.
- Avoid generic openers such as "I came across your profile", "I noticed your background", "Hope you're doing well" and empty flattery.
- Avoid fake admiration, bragging, inflated claims and generic "we help companies like yours" lines.
- Prefer one clear idea per message and at most one question.
- Keep it concise, but do not make it so short that it sounds abrupt or unnatural.
- Use the prospect's language when practical.
- Do not make every message start with "I noticed". Vary the opening based on the actual evidence.
- Do not force a meeting request into a first touch.

If the user supplies real examples of their writing, analyze those samples and update the voice rules from observed patterns. Do not claim that a pattern came from samples when no samples were supplied.

## Use verified context

Before drafting:
1. Read the current conversation for the service, target, previous messages and user preferences.
2. If available, use LinkedIn Prospector's verified service wedge, evidence, buyer role and source date.
3. If the prospect's specific hook is missing, do not invent one. Either draft from the verified company/role context or say what is missing.
4. Keep public facts, user-provided facts and inferences distinct.
5. Do not expose private repository links, credentials, API keys or confidential implementation details. Use only approved public portfolio links or user-authorized sanitized case studies.

## Message-stage decision

Classify the task before writing:

| Stage | Goal | Default behavior |
|---|---|---|
| Connection note | Earn a relevant connection | One real reason to connect, no hard pitch |
| First DM after acceptance | Start a conversation | Specific context, relevance, one low-pressure question |
| Interested reply | Understand the need | Answer their question, then ask one useful qualifying question |
| Request for details | Give useful information | Explain the relevant part, not the whole service catalog |
| Pricing question | Be transparent | Use verified current pricing or clearly state what needs confirming |
| Hesitation / timing | Respect the concern | Acknowledge it, offer a simple next step or graceful pause |
| Competitor mention | Understand the comparison | Do not attack the competitor; focus on the outcome they need |
| Not interested | End well | Thank them and stop |
| No response | Decide whether to follow up | One relevant follow-up, then a clean close-out |

## Drafting protocol

1. **Identify the actual reason for the message.** Use one specific professional observation, shared context or relevant company event.
2. **Connect the observation to one service wedge.** Do not list every service the user offers.
3. **Decide whether the message is conversation-first or offer-first.** Default to conversation-first for a cold connection. If the prospect has already asked for help, answer directly.
4. **Write the primary draft.** Make it sound spoken, not like a formal email.
5. **Run the human-voice check.** Remove generic flattery, fake familiarity, filler, excessive context, repeated phrases and sales clichés.
6. **Run the evidence check.** Every factual claim must come from the user or a cited source. Remove unsupported metrics, client names, results and assumptions.
7. **Run the platform-length check.** For a connection note, aim for no more than 300 characters unless the actual LinkedIn composer shows a different limit. Check the live UI when exact limits matter.
8. **Deliver the draft directly.** Include one alternative only when it uses a genuinely different angle. Do not bury the message under a long explanation.

## Message principles

### First touch
- Give a real reason for reaching out.
- Do not pitch the entire service.
- Do not ask for a call as the default first CTA.
- A question is optional. If used, it should invite a natural response, not a calendar commitment.
- Never pretend that a generic profile fact is a personal connection.

### Follow-up
- Refer to the previous message or an actual new signal.
- Add a new piece of value or a clearer question. Do not repeat the original pitch.
- A reasonable manual cadence is one follow-up after several business days and, if appropriate, one final close-out later. Do not keep nudging.
- Never claim the prospect saw, read or ignored a message unless the platform actually shows that information.

### Service and proof claims
- Use only the user's actual skills, projects, services and verified outcomes.
- Do not invent revenue impact, conversion lifts, client names, testimonials or delivery guarantees.
- A private project may be described at a high level only when the user authorizes that disclosure. Never expose source code, API keys or private repository URLs.
- If a prospect asks about a service detail that is not verified, say it needs confirming rather than guessing.

## Reply handling

When the user pastes a reply:
1. Classify the response using references/reply-matrix.md.
2. Identify the real question or objection.
3. Answer the direct question first.
4. Keep the next step proportional to the prospect's interest.
5. Ask no more than one question.
6. If the prospect says no, asks to stop or opts out, acknowledge and stop. Do not try to overcome an explicit refusal.

## Recover Revenue conversation principles

When the user is discussing Recover Revenue, apply these principles from their own sales workflow:
- Do not manufacture pain or tell a business it is losing revenue without the necessary evidence.
- Tie value to a gap the owner actually described or a public issue that has been verified.
- Do not attack an existing agency, answering service, receptionist or provider.
- If the current provider already solves the relevant need, acknowledge that the prospect may not need another service.
- Respect timing and authority. Do not pressure a gatekeeper to approve a purchase.
- Recommend only a package justified by the confirmed need.
- Do not invent savings, ROI, discounts, guarantees, scarcity or urgency.
- When asked to send information, confirm the requested channel. Never claim delivery unless a real tool confirms it.

## Campaign retro

When the user shares campaign results, use references/campaign-retro.md. Diagnose whether the weak point is:
- targeting and signal quality;
- connection acceptance;
- first-message relevance and voice;
- follow-up timing;
- reply handling or offer clarity.

For fewer than 20 comparable sends, describe conclusions as directional. Do not invent percentages or claim causation from a tiny sample. Recommend the smallest high-impact change supported by the evidence.

## Output format

For a draft:
- **Message:** the complete copy, ready to review;
- **Why this angle:** one short explanation tied to the actual signal;
- **Check:** character count for a connection note, evidence caveat if relevant.

For a reply:
- **Reply type:** classification;
- **Recommended response:** complete draft;
- **Next move:** one sentence.

For a campaign retro:
- **Diagnosis:** the likely weak lever and supporting metric;
- **What to keep:** what appears to work;
- **What to change:** one to three evidence-backed edits;
- **Next test:** one measurable experiment.

## Safety and action boundary

- Never send or schedule messages automatically.
- Never automate connection requests, profile views, likes, comments or follows.
- Never scrape LinkedIn in bulk or bypass platform limits.
- Never claim an action was sent or a prospect was contacted unless a real, authorized tool confirms it.
- If the user explicitly approves a send and a permitted sending tool is actually available, confirm the exact recipient and exact message before acting. Otherwise provide the draft for manual sending.

## Handoffs

- Company discovery, account research, buying signals and qualification → LinkedIn Prospector.
- CSV/XLSX normalization, deduplication and source tracking → LinkedIn Lead Exporter.
- Website-specific technical audit → SiteProbe or SquirrelScan only when the relevant runtime is available and the user authorizes the audit.

## References

- references/voice-calibration.md
- references/reply-matrix.md
- references/campaign-retro.md
