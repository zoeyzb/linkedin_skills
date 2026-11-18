---
name: linkedin-lead-exporter
description: Turns LinkedIn search results, user-provided profile URLs, and public professional information into a clean, deduplicated CSV or Excel lead sheet. Verifies business-relevant fields against sources, records evidence and confidence, and flags gaps instead of guessing. Uses public web research and targeted manual review, never LinkedIn login automation or bulk scraping. Trigger on "export LinkedIn leads", "turn these profiles into Excel", "make a LinkedIn prospect spreadsheet", "organize LinkedIn search results", or "create a CSV of prospects".
---

# LinkedIn Lead Exporter

## Purpose

Create a reliable, source-backed lead list from LinkedIn-related research. This is a ChatGPT-native adaptation of the open-source Mahitej28/LinkedIn_Bot repository. It preserves the useful output workflow—search, capture core professional fields, deduplicate, and export—without running its unattended Selenium scraper.

This skill is for **research organization and export**, not for automating LinkedIn or sending outreach.

## Intake and context

Before researching, establish only what is still missing:

- The product or service being offered and its value proposition.
- Ideal customer profile: industries, company types, size, and pain points.
- Target decision-maker roles.
- Geography and any location or work-eligibility constraints.
- Excluded companies, existing customers, and desired lead count.

Reuse details already supplied in the current conversation, relevant saved context, or a user-provided business-profile file. Do not ask the user to repeat known information. If the request is simply to format profile URLs or an existing CSV, skip prospecting intake and work from the supplied data.

For the user's established services, relevant categories may include full-stack websites and applications, Shopify/e-commerce, integrations, QA/testing, and AI workflow automation. Do not assume every category is in scope for a particular campaign; match the active offer and ICP.

## Research workflow

1. **Start with supplied material.** Prefer user-provided LinkedIn URLs, search-result exports, company lists, CSVs, or notes. Preserve the original source and any user-provided fields.
2. **Discover public sources.** When new leads are needed, use available public web search and official company websites, team pages, public professional profiles, press releases, and business directories. Search for specific role and company matches, not indiscriminate personal-data collection.
3. **Review specific profiles.** If the user asks to inspect a LinkedIn profile, use the existing authorized browser workflow only for that specific page and only in an inactive managed tab. Do not take over the user's active tab. If the page is unavailable or restricted, use other public evidence or mark the field unverified.
4. **Capture only relevant professional details.** Record name, current professional title, company, professional location, public profile URL, company website, and a concise evidence-based fit reason. Add a personalization hook only when a specific public source supports it.
5. **Qualify transparently.** Use Strong, Possible, or Weak fit with a short explanation. If the user asks for numeric scoring, use a simple disclosed rubric such as role fit (0–2), company fit (0–2), and evidenced buying trigger (0–1). Do not present unsupported precision or infer budgets, authority, intent, or buying signals.
6. **Deduplicate.** Normalize LinkedIn profile URLs by removing tracking/query parameters while preserving the canonical /in/ URL. Deduplicate first by canonical profile URL, then by name + company when no URL is available. Keep the strongest source and preserve conflicting evidence in notes.
7. **Validate.** Check that each displayed field is supported by a source. Distinguish current facts from older or uncertain information. Mark missing or conflicting fields as Needs review; never fill gaps with guesses.
8. **Export.** Create a CSV by default. If an Excel workbook is more useful or requested, create an .xlsx with Leads, Sources, and Needs review sheets. Use available file-generation tools; if file creation is unavailable, provide a properly escaped CSV block.

## Default export schema

Use these columns unless the user requests a different format:

- name
- current_title
- company
- location
- linkedin_profile_url
- company_website
- fit_tier
- fit_reason
- personalization_hook
- evidence_url
- source_type
- checked_at
- confidence
- review_status

Allowed review_status values: Verified, Needs review, Not found, Excluded.

Do not include personal email addresses, phone numbers, family details, or other non-business personal data. Only add a public business contact field if the user explicitly asks and the contact is clearly published by the organization for business inquiries. Never infer an email address.

## Quality standard

- Every lead must have at least one source URL or be clearly marked as user-provided and not independently verified.
- Separate facts from analysis. Put the evidence in evidence_url and the reasoning in fit_reason.
- Include a checked date for researched fields.
- Keep a Needs review section rather than silently dropping incomplete records.
- Do not invent profile details, company affiliation, location, recent activity, or buying intent.
- Prefer a smaller, verified list over a large list with weak evidence.
- State the number of verified, needs-review, excluded, and not-found records in the final summary.

## Non-negotiable boundaries

- Never request, store, or enter the user's LinkedIn password, session cookie, or authentication token.
- Never run the upstream Selenium/ChromeDriver login-and-scrape script as a prospecting method.
- Never automate LinkedIn sign-in, profile crawling, pagination loops, bulk extraction, connection requests, messages, likes, follows, or invitations.
- Never bypass CAPTCHAs, access controls, rate limits, or anti-bot protections; do not use proxies or fake accounts to evade restrictions.
- Do not extract hidden, private, sensitive, or irrelevant personal information.
- Do not claim that a profile was checked if it was not actually opened or verified.
- Do not send outreach. If the user also wants personalized connection notes or follow-ups, coordinate with the separately installed linkedin-prospector skill and leave every message as a draft for the user to review.

## Relationship to other installed skills

- Use LinkedIn Prospector for company discovery, decision-maker research, buying signals and ICP qualification. Use this skill to normalize and export the resulting records.
- Use LinkedIn Outreach Copilot for connection notes, DMs, follow-ups, replies, objections and campaign retros.
- Do not duplicate research or scoring already completed by LinkedIn Prospector.

## Upstream source

The original repository is linked in README.md. Its source implementation and limitations are summarized in references/upstream-review.md. This skill intentionally does not reproduce or execute the repository's unattended LinkedIn scraper.
