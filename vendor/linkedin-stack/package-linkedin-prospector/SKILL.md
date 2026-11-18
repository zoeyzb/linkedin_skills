---
name: linkedin-prospector
description: "Find, research, qualify, score and prioritize LinkedIn prospects and target companies for the user's web development, full-stack applications, Shopify, QA/testing, integrations and AI automation services. Use for client discovery, Sales Navigator search design, decision-maker mapping, buying-signal research, lead lists and prospect qualification. Uses ChatGPT's available web research and targeted manual profile review. No local server, paid MCP, bulk scraping or automated outreach."
license: MIT; see THIRD_PARTY_NOTICES.md for upstream acknowledgements.
metadata:
  author: "ChatGPT-native adaptation"
  version: "1.0.0"
---

# LinkedIn Prospector — discovery, account research and qualification

## Mission

Turn a service offer and target market into a shortlist of real companies and decision-makers worth contacting. The objective is **up to 10 genuinely qualified prospects per requested daily batch**, not a padded list of names.

This is a ChatGPT-native instruction skill. It uses available web search, user-provided files and authorized one-at-a-time browser review. It does not need OpenGTM, a local database, Docker, a Python/Node service, a paid enrichment API or an MCP server.

## Activation boundaries

Use this skill for:
- finding companies, founders, owners, CTOs, VPs, engineering leaders, product leaders, QA leaders, e-commerce leaders or operations buyers;
- building or refining LinkedIn Sales Navigator searches;
- account research, buying signals, hiring signals and decision-maker mapping;
- ICP qualification, prospect scoring, prioritization and lead-list creation;
- preparing evidence-backed leads for a separate outreach workflow.

Do not use this skill to:
- draft or answer a LinkedIn conversation when the user primarily asks for message copy; hand off to the LinkedIn Outreach Copilot skill;
- send connection requests, messages, InMails, comments or invitations;
- scrape LinkedIn, crawl profiles in loops, paginate search results automatically, export hidden profile data or bypass restrictions;
- invent email addresses, budgets, company size, hiring intent, revenue, technical stack or personal details;
- use private personal-life details or sensitive traits to qualify or personalize.

If the user only wants an existing list converted to CSV/XLSX, use LinkedIn Lead Exporter instead of repeating prospect research.

## Use the user's existing business context

Do not ask the user to repeat known service information. Select one campaign lane and keep it separate from the others.

### Lane A — Orange Cat Group / technical services

Potential offers:
- custom websites, landing pages and full-stack web applications;
- React/Next.js product development and internal dashboards;
- Shopify storefronts and e-commerce improvements;
- API, CRM, payment and third-party integrations;
- QA, browser testing, regression testing and integration testing;
- AI agents, voice workflows and business-process automation.

Likely buyer roles depend on the wedge:
- websites, landing pages and full-stack builds: Founder, Owner, CEO, COO, Head of Product;
- engineering capacity, integrations and QA: CTO, VP Engineering, Head of Engineering, Engineering Manager, QA Lead, Director of Product;
- Shopify/e-commerce: Founder, E-commerce Director, Head of E-commerce, Growth Lead, Store Owner;
- AI and workflow automation: COO, Head of Operations, RevOps Lead, CTO, Operations Director.

Default geography for this lane: United States, unless the user specifies another market. Start with founder-led and small/midsize businesses, but do not impose a rigid employee cutoff if the project signal points to a larger buyer.

### Lane B — Recover Revenue

Use only when the user explicitly asks for Recover Revenue, home-service businesses or that specific offer.

The inspected Recover Revenue repository describes a website-first offer for service businesses:
- Business & Website Audit: $297 one time;
- Custom Growth Website: $1,497 one time;
- Website + Growth System: $2,297 one time;
- Website Care: $97/month.

These are repository snapshot prices, not a guarantee that the current public offer is unchanged. Verify current pricing before quoting it.

Relevant businesses can include HVAC, plumbing, roofing, electrical, remodeling and other home-service operators. Likely buyers are the owner, founder, general manager, marketing director or operations leader. Look for evidence about website quality, lead capture, missed inquiries, local visibility, booking and follow-up. Do not assume that every business has a revenue leak.

Never mix Lane A and Lane B in one prospect list unless the user explicitly asks for a combined campaign.

## Connection and source gate

Before every research run:

1. Reuse the service lane, target geography, buyer roles, exclusions and prior decisions already present in the conversation or user-provided files.
2. If one essential detail is missing and cannot be safely inferred, ask one concise question. Otherwise state the assumption and continue.
3. Use current public web search for company discovery and time-sensitive signals. Cite sources in the answer.
4. Prefer first-party evidence: company websites, official careers pages, product announcements, leadership pages, public company posts and official press releases.
5. Use credible industry sources and public professional profiles as corroboration. Record the source URL and the date checked.
6. If LinkedIn profile access is unavailable, mark the person or profile as unverified. Do not pretend to have opened it.

### LinkedIn account safety

LinkedIn's User Agreement prohibits unauthorized scraping and automated account activity. Use Sales Navigator's own filters and saved-search features, and inspect individual profiles only when needed. Never automate sign-in, search-result pagination, profile crawling, contact export, connection requests or messages. Never bypass CAPTCHA, login walls, rate limits or anti-bot controls. Do not use the user's session cookies or active LinkedIn tab as a scraping surface.

Use the user's existing authorized browser connection only for a specifically identified profile or page, preferably in an inactive managed tab. Do not switch tabs, disturb the active window or modify the active tab without permission. A browser view is for targeted human-style review, not bulk extraction.

## The prospecting workflow

### Stage 1 — Define the ICP and the service wedge

Write a one-paragraph ICP and a pass/fail checklist before searching. It should include:
- company type and industry;
- geography;
- approximate maturity or size, when relevant;
- the buyer role and seniority;
- the specific service wedge;
- the pain or business outcome the service addresses;
- hard exclusions.

Choose one wedge per prospect. Do not pitch "websites, AI, QA, apps and everything else" to the same company. A good wedge is specific, for example:
- a product company hiring engineers but with a visible QA bottleneck;
- a Shopify store with a demonstrable mobile or checkout friction point;
- a service business with a weak lead-capture path;
- a team publicly discussing a manual process or integration gap.

### Stage 2 — Build the candidate pool

For a requested batch of 10 qualified prospects, research roughly 20–30 candidate accounts first. This is a research pool, not a scraping quota. Return fewer than 10 if the evidence bar is not met. Do not lower the bar to fill the table.

Useful public search patterns:
- industry + geography + founder/owner;
- company type + current hiring signal + target function;
- official careers page + QA, software, Shopify, integration or automation roles;
- company launch, expansion, migration or platform change + decision-maker;
- public founder or leadership statement describing a relevant operational problem.

Use at least two independent sources for a high-confidence company claim where practical. Search snippets alone are not sufficient for a strong buying-signal claim.

### Stage 3 — Design the Sales Navigator search

Build a filter recipe the user can apply in Sales Navigator. Use the current filter names shown in LinkedIn's UI, because LinkedIn changes its search layout and plan availability.

Useful lead filters include:
- Current company;
- Current job title;
- Function and seniority level;
- Geography;
- Industry;
- Company headcount and company headquarters;
- Years in current position/company when relevant;
- Changed jobs in the last 90 days;
- Posted on LinkedIn in the last 30 days;
- Viewed your profile recently;
- Account has buyer intent, when available on the user's plan;
- Connections of, TeamLink and shared experiences when available.

Useful account filters include:
- Industry, headquarters and company headcount;
- Annual revenue and headcount growth;
- Department headcount and department growth;
- Job opportunities;
- Recent account activity;
- Buyer intent and saved account lists, when available.

Start with one to three high-value filters, review the result set, then refine. Use Include/Exclude deliberately. Do not assume every filter is available on every Sales Navigator plan. Give the user the exact filter values and explain why each is useful.

### Stage 4 — Verify each account

For every candidate:
1. Confirm the business is real and currently operating.
2. Confirm the domain and the actual business, not a similarly named shell or unrelated company.
3. Read the relevant product/service, careers, about or contact page.
4. Identify one concrete reason the user's service could be relevant.
5. Find a current trigger, if one exists: relevant hiring, product launch, expansion, platform change, public pain statement or observable website friction.
6. Separate direct evidence from inference. A hiring post is a timing clue, not proof that a company will hire a freelancer.
7. Record the source URL and checked date.

If the only evidence is generic company growth or an old job posting, do not label the account Hot.

### Stage 5 — Find the decision-maker

For each qualified company, identify the most relevant buyer or influencer. Prefer the person who owns the problem, not merely the most senior title.

Capture only professional details:
- name;
- current title;
- company;
- public LinkedIn profile URL, if verified;
- relevant public professional activity or role change;
- why this person is the right buyer.

Use the company's official team page, public professional profile, public interview or other reliable source. If there are several plausible people, list the candidates and explain the role difference. Do not guess.

If the profile cannot be verified, keep the account in the list only if the account evidence is strong and mark the contact as "not verified". Do not describe the company as a person-level lead until a buyer is identified.

### Stage 6 — Score and prioritize

Use the rubric in references/scoring-and-evidence.md. Keep the score explainable and do not manufacture precision.

A lead must have:
- a real company and confirmed domain;
- one specific service wedge;
- at least one relevant evidence source;
- a plausible buyer role;
- no hard disqualifier.

A prospect with strong company fit but no current need signal is a nurture candidate, not a Hot lead.

### Stage 7 — Produce the shortlist

Default output is a table of up to 10 qualified prospects, ordered by priority.

Columns:
1. Rank and tier;
2. Company and domain;
3. Buyer name and title;
4. LinkedIn profile URL and verification status;
5. Service wedge;
6. Observed need or trigger;
7. Why now;
8. Fit score and confidence;
9. Evidence links and checked dates;
10. Recommended next action.

Then provide:
- Search criteria used;
- number of candidate accounts researched;
- number verified, qualified, held for review and excluded;
- the top three accounts to contact first;
- any missing information that would improve the next batch.

If the user requests a CSV/XLSX, hand off to LinkedIn Lead Exporter or create the file directly if file-generation tools are available.

## Quality and stop rules

- Never pad a list. Quality beats count, but aim for the user's requested 10 when enough evidence exists.
- No top-priority lead without a concrete service wedge and source-backed reason.
- No "Hot" label without a current, relevant signal.
- No invented revenue, budget, employee count, technology stack, hiring need or purchase intent.
- Do not infer that a company has money to spend from funding or company size alone.
- Do not include personal-life information, sensitive traits, private contact details or unrelated personal data.
- Do not use a stale signal as current. Date every time-sensitive observation.
- Do not mark an email as verified unless a real verification result exists. This skill does not guess email patterns.
- Do not spend paid-provider credits or send records to a third-party enrichment service without approval.
- Do not send any outreach. Drafting belongs to LinkedIn Outreach Copilot.

## Handoffs

- Message copy, follow-ups, replies and objections → LinkedIn Outreach Copilot.
- CSV/XLSX cleanup, deduplication and evidence export → LinkedIn Lead Exporter.
- A website audit for a specific prospect → SiteProbe or SquirrelScan only if the relevant runtime is actually available and the user authorizes the audit.
- A live OpenGTM database operation → only if an OpenGTM connector is actually connected. Do not assume the OpenGTM skill upload connected a backend.

## Upstream references

This ChatGPT adapter is an original, tool-independent adaptation informed by:
- gvelasquez85/linkedin-prospector (MIT): free web discovery, one-at-a-time profile research and drafts, never auto-send;
- coreyhaines31/marketingskills prospecting (MIT): ICP branches, evidence-led qualification, account research and compliance;
- explorium-ai/gtm-skills (MIT): list building, account fit, decision-maker mapping and signal scoring patterns;
- LinkedIn's official Sales Navigator filter documentation and User Agreement.

See references/ for the adapted workflow, scoring rubric and current LinkedIn filter guidance.
