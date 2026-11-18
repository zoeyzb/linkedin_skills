# The LinkedIn channel: what is known, what is sold, and what is measured

Research pass of 2026-10-29. Scope: LinkedIn itself as a prospecting channel. The platform's own rules in
2026, what LinkedIn publishes (Sales Solutions, Talent Solutions InMail data, the B2B Institute, SSI, the
State of Sales surveys), acceptance and reply benchmarks and who measured them, profile effects, engaging
before connecting, voice and video, timing, message length, the note on the invitation, and follow-up count.

This folder sits beside `../linkedin-messages/` (how to write the note, the first message and the follow-ups,
the experts and the frameworks). That folder is the "what to say"; this one is the "how the channel behaves".
Where the two overlap (the note, the length, the follow-up count) this folder adds the datasets the other one
did not have and does not repeat its reasoning.

Files: `evidence.md` (every claim, its source, its rating), `sources.md` (every URL, read in full or summary).

**Ratings used in this folder** (the other folders use a close cousin):

- **measured**: a study or a large dataset with a stated method, not run by someone selling the thing measured.
  Only one source here qualifies fully: the LinkedOut field experiment (QJE 2025).
- **vendor**: a seller's own data. Split in the tables into *vendor, method stated* (sample, period, definitions
  given) and *vendor, no method*. LinkedIn's own numbers are vendor too: LinkedIn sells InMail, Premium and
  Sales Navigator.
- **survey**: people asked what they do or prefer.
- **practice**: what experienced practitioners do and recommend; nobody measured it.
- **untraced**: repeated widely, no source found, or the source does not say it.

Every rate in this field is observational unless a row says "randomized". Senders who do X differ from senders
who do not, so a gap is a hint about direction, never a size you can promise.

---

## Summary table

| Question | Best evidence | What it says | Rating |
|---|---|---|---|
| Note length and allowance | LinkedIn Help 46662 | 200 characters; 3 notes a month on a free account (an older billing page says 5); Premium unlimited | platform rule |
| Typical acceptance | Expandi 13.2M, HeyReach 96k campaigns, Belkins, Waalaxy 21M, LinkedOut 20k | 20% to 30% for cold requests. The one academic experiment: 23% to 26% for a fictitious recent graduate writing to people LinkedIn recommended to them | measured (one) + vendor |
| Typical reply | Expandi, HeyReach, Belkins | About 10% of messages sent; about 18% of accepted people reply (HeyReach median); note replies about 2% to 3% and falling | vendor, method stated |
| Note or no note | Belkins 11.5M, Reachium 180k, AISDR 900 (split), Waalaxy 21M | Acceptance 2 to 5 points lower with a note in all four traceable datasets. Replies higher with a note in Belkins, Reachium and AISDR; lower in Waalaxy. Contested | vendor |
| Profile photo, headline, banner | LinkedOut (QJE), LinkedIn 2017 claim | People read the photo: the same profile with a different face changed acceptance by 3 points. "21x views, 9x requests" has no method. Headline and banner effects: nothing measured | measured (one) + untraced |
| Engaging before connecting | Waalaxy 21M, Expandi Builder | A profile visit before the request: 32.9% vs 34.2% without (slightly worse). Warm-up campaigns accept at 22% vs 29.6% for plain requests. A REAL tie (they followed you, joined your group) accepts at 1.8x to 2.7x | vendor |
| Voice notes | Prospectio (randomized, 5,915), Waalaxy | As a follow-up: reply 30.7% to 33.7%, meetings 4.1% to 5.0%. Waalaxy: replies flat, "interested" replies 4.4% to 6.8% | vendor, one randomized |
| Video | Prospectio test 8 (randomized, channel not stated) | Video first touch: reply 28.8% to 40.4%, meetings 4.1% to 6.4% | vendor, one randomized |
| Day and hour | LinkedIn InMail data, Expandi, Belkins, Waalaxy | Reply barely moves by day (under 1 point in Belkins); weekends slightly worse; hour does not move reply. Morning sends accept better (32% to 37% vs 23% to 24% evening) in one sampled dataset | vendor |
| Message length | LinkedIn InMail 2022, Expandi 458 campaigns, Waalaxy | Under about 400 characters reply best; over 1,000 to 1,200 reply worst. 151 to 200 characters peaked in Expandi | vendor, method stated |
| Follow-up count | Expandi 2,966 campaigns, Waalaxy, Prospectio | 2 to 3 messages after the invitation reply best; 5 or more worst | vendor |
| SSI | LinkedIn 2014 to 2015 | "45% more opportunities, 51% more likely to hit quota" is a correlation with no published method; LinkedIn itself now says SSI "no longer accurately reflects the modern sales environment" | vendor, no method |
| Warm intro vs cold | LinkedIn 2014 survey (1,500 buyers) | 17% engage with reps who reach out cold, 88% with someone in their network | survey |

---

## 1. LinkedIn's own rules in 2026 (LinkedIn Help, read 2026-10-29)

**The invitation note.** Help 46662 ("Personalize invitations to connect", updated about 6 months ago):
a note is up to **200 characters**; a standard (free) account can add a note to **up to three invitations a
month**; Premium is unlimited, "though connection request limits may still apply". Invitations sent from
"People You May Know" on the mobile app cannot carry a note. The recipient can reply to the note without
accepting. Help a550555 ("Invitation limit reached", updated about a year ago) still says **five** a month for
free members: the two LinkedIn pages disagree, and the newer one says three. Plan on three. The 300-character
figure all over the web is the older limit.

**The weekly cap.** LinkedIn publishes no number.
A withdrawn invitation
cannot be sent again to the same person for three weeks, and 30,000 first-degree connections is the ceiling
(Help 4800). Numbers quoted elsewhere (80 to 100, 100 to 200, "up to 300") are vendor estimates; none traces
to LinkedIn.


**InMail.** Help 57013: Sales Navigator (Core, Advanced, Advanced Plus) gets **50 InMail credits a month**,
up to 150 banked, unused credits expire after 90 days. A credit comes back for every InMail answered within 90
days, a "not interested" included. Help a541643 and vendor summaries give Premium Business 15 and Premium
Career 5 a month (summary only).

**Voice messages.** LinkedIn's launch announcement (2020, via press): up to **one minute**, recorded in the
iOS or Android app, sent only to **first-degree connections**, playable on mobile and web. Not available in
InMail. No native video message feature was found; a video can be sent as an attachment or a link.

**LinkedIn's own guidance on invitations** (Help 4800): send to people you know, add a message explaining how
you know them or why you want to connect, keep a recognisable profile with a photo. This is advice, not data.

---

## 2. What LinkedIn itself publishes as evidence

### 2.1 InMail response data (Talent Solutions, the best data LinkedIn has released)

Two releases, both on **recruiter InMails** (job offers to candidates), not sales prospecting. A job offer is a
gift; a sales message is an ask. Use the direction, not the levels.

- **2022 release** (tens of millions of InMails, May 2021 to April 2022, 30-day response window):
  under 400 characters: **22% above average** response; up to 800: 5% above; 800 to 1,200: 6% below;
  over 1,200: **11% below**. Only 10% of InMails were under 400 characters, 46% over 800. Individually sent
  InMails about **15% higher** than bulk. Monday best but only slightly; Sunday to Thursday within about 1% of
  average; Friday 4% below; Saturday 8% below. **65% of responses arrive within 24 hours, 90% within a week.**
  "Open to Work" members respond 37% more.
- **2021 release** (April 2020 to February 2021): 201 to 400 characters 16% above average; under 400
  characters 41% better than over 1,400; personalized about 20% better than bulk.
- **2016 analysis** (San Francisco InMails for timing, February 2016 for length): **no best hour and no best
  day**; "candidates respond only when it's convenient for them". Shorter bodies and shorter subject lines did
  better.

Rating: vendor, sample stated, method thin (no confidence intervals, "average" never defined).

### 2.2 Sales Solutions pages

- **InMail checklist (current page, "Source: LinkedIn data, April 2026")**: "aim for 50 to 75 words" (the same
  page also says 50 to 70); personalize "beyond name and job title"; a new hire is better written to in week
  three or four of the role than on day one. "Sales Navigator helps customers generate 48% more open pipeline":
  no sample. Practice plus vendor claim.
- **"From SSI to AI" page** (undated; footer 2025): "Sales Navigator sellers with at least four connections at a target account are 16% more
  likely to close", "Personalized InMails can raise acceptance rates by 40%". No method. Vendor, no method.
- **"6 key findings about sales outreach emails"** (2019): presented on LinkedIn's site, but the data is a
  Backlinko and Pitchbox study of 12 million emails, not LinkedIn data. One follow-up up to +65.8% response;
  personalized body +32.7%; Wednesday slightly best. Email, vendor.

### 2.3 The Social Selling Index and its claimed effects

- The figures everyone repeats come from LinkedIn's 2014 to 2015 material: "SSI leaders create **45% more
  opportunities**" per quarter than laggards, are "**51% more likely** to exceed quota", are promoted "17 months
  faster". The 2014 post that carries them (Dan Lurie, 5 Nov 2014) gives no method for any of them; its own
  survey of "over 100,000 professionals" backs only a correlation with an "Inspiration Index". The author
  writes, of a separate claim (that brand and relationship work builds a foundation for later quarters): "While I
  don't have the specific data to support this statement, it stands to reason..."
- The "78% of salespeople using social media outsell their peers" figure is not LinkedIn's: it is Jim Keenan's
  2012 "Social Media and Sales Quota" survey (A Sales Guy), reported by Forbes. Survey, self-reported.
- In 2025 LinkedIn's own SSI page says the score "**no longer accurately reflects the modern sales
  environment**" and points to Sales Navigator AI tools. The score still appears at linkedin.com/sales/ssi.
- Verdict: SSI measures activity on LinkedIn; the sales effect is a correlation published by the seller of
  the activity, with a reverse-causation problem (good sellers are active). Do not use SSI as a target or
  promise a lift from it.

### 2.4 State of Sales surveys

- **2014** (1,500 B2B buyers, director and above, on LinkedIn): **88%** engage with someone in their existing
  network, **17%** with reps who reach out cold. Survey; old; a seller's survey of its own members.
- **2022** (US and Canada edition, 750 buyers and 750 sellers): only 21% of buyers prefer cold calls; 48% will
  not buy from sellers who give misleading information. The global 2022 edition (about 15,000 people): 71% of
  top performers "always" research before reaching out against 50% of others (APAC page). No 2024 or 2025
  edition was found.
- Repeated LinkedIn blog lines without method: buyers "5x more likely to engage" via a mutual connection;
  "71% more likely to engage" when the rep mentions something relevant to their job. Vendor, no method.

### 2.5 The B2B Institute and the 95:5 rule

Peter Weinberg and Jon Lombardo (LinkedIn's B2B Institute) with John Dawes (Ehrenberg-Bass), 2021: at any
moment only about **5%** of B2B buyers are in market; 95% are not. Derived from purchase-cycle arithmetic
(a firm that changes bank every five years is in market about 1% of any two-week window), not from a sample
of buyers. The source article (Marketing Week, 2 Sep 2021) gives its bank figures as estimates ("~1%"); treat 95 as
an order of magnitude, not a measurement. A later LinkedIn executive is reported to have said "99:1" (summary only,
the page returned 403 on re-check). Rating:
practice built on arithmetic.

What it means for a LinkedIn message: most people a seller writes to are not buying this quarter. A message
that only works for someone ready to buy now (a meeting ask, a demo) fails 95 times in 100 by construction.
A message that is worth reading to someone NOT in market (a useful observation, an interest question, an offer
they can keep) is the one that compounds. This agrees with the measured CTA findings in
`../linkedin-messages/` (meeting ask -44%, interest ask +7%, offer +28%, email data).

### 2.6 The profile photo claim

"A profile photo gives up to 21x more profile views and 9x more connection requests": attributed to LinkedIn
data, earliest mention found: Social Media Today, John Nemo, 7 April 2017, an article on profile photos whose
figures link on to an earlier Social Media Today infographic on LinkedIn's photo filters (not read). No
sample, no method, no comparison group; the "up to" usually drops in repetition. Untraced as a size. The
direction is plausible and LinkedIn's Help repeats it as advice.

---

## 3. Acceptance and reply benchmarks: who measured what

| Dataset | Who | Size and period | Acceptance | Reply | Notes |
|---|---|---|---|---|---|
| LinkedOut field experiment | Evsyukova, Rusche, Mill (QJE 2025) | 400+ fictitious recent-graduate profiles in pairs differing only by the face, requests to about 20,000 US users LinkedIn recommended to them (similar place, industry or school) | 26% (white) vs 23% (Black) profiles, same CV | not measured as sales replies; a later job-advice ask was answered by 21% | The only non-vendor rate. A plausible peer, not a seller: about 1 in 4 accepts; recipients sharing an employer or school accepted about twice as often (almost 40%), per the discussant. Absolute rates from Zoe Cullen's NBER discussant slides (July 2023), the 13% relative gap from the ZEW release |
| Expandi benchmarks 2026 | automation vendor | 13,218,869 requests, 6,730,447 messages, 13,302 accounts, May 2025 to Apr 2026 | 28.5% | 10.4% of messages; note reply 3.0% (3.5% to 2.2% over the year) | Definitions given. Sender-side: industry of the SENDER |
| Expandi H1 2026 | same | 70,130 campaigns | 29.61% (Connector) | 10.3% | Little method |
| HeyReach | automation vendor | 96,051 campaigns, 12 months to Sep 2026 | median 20.75%, mean 23.85% | 22.22% of started conversations; **18.10% of accepted** | Per campaign. "Weak" below 13% acceptance, below 9.6% reply per accepted |
| Belkins | outreach agency | 14,077 own contacts (34 projects, 2025) + 15.1M Expandi touchpoints | 18.7% own funnel; 26% Expandi | 17.6% of connected; 1.3% of connected book a meeting | Title says 2026, data 2025. Two numbers never reconciled |
| Belkins response time | agency | 152,636 contacts, Mar 2025 to Feb 2026 | median 1 day to connect; 62% within 24 h | reply median 5 days; 60% in week 1; 91.8% by day 30 | The best timing data on replies |
| Waalaxy e-book 2025 | automation vendor | 64M messages claimed; about 21M invitations split by note and by visit | 32% to 36% | about 15% to 18% overall, 4% to 6% "interested" | Reply defined loosely; levels high |
| Reachium | vendor | 180,155 invitations, matured cohort | 22.6% note, 27.7% none | 47.8% vs 25.5% of accepted | Only within-sender check (see `../linkedin-messages/`) |
| Botdog | vendor | 16,492 requests | 37% | not given | 21% of acceptances within an hour, 63% in 24 h, 88% in a week, 99% in 30 days |
| Prospectio | agency | 15 randomized tests, 389,890 prospects, 2018 to 2026 | not given | 10% to 52% depending on arm | Levels 3x to 4x every other source; see section 10 |

**Sane baselines for BeReach's own judgment**: acceptance 20% to 30% for cold requests; below about 13%
means the list or the profile is wrong (HeyReach's line); reply per accepted person about 18%; below 10% means
the message is wrong. Judge acceptance after 7 days (88% are in) and replies after 14 to 30 days (78.5% of
replies by day 14, 91.8% by day 30, Belkins).

**Bias to keep in mind**: every vendor dataset comes from people who bought an automation tool, sending in
volume. A person writing by hand to a short, chosen list is not that population. The seniority of the sender
moves acceptance within about 3 points (Expandi: C-level 29.4%, junior 26.3%); the industry of the sender moves
it from 17.5% to 40.1%, but both ends rest on 14 to 16 accounts. Among high-volume industries, staffing and
recruiting accept best (36.5%).

---

## 4. Profile effects (photo, headline, banner, the sender)

What is measured:

- **The photo is read.** LinkedOut: identical CVs, only the AI-generated face changed, acceptance moved by
  about 3 points (13% relative). This is about discrimination, not optimisation, but it proves recipients look
  at the face before accepting. Measured.
- **Who the sender is.** Waalaxy (about 14M men's and 6.5M women's invitations): women senders accept 36.2% vs
  33.0% for men, reply 18.1% vs 15.6%. Non-Premium senders reply 17.2% vs 14.9% for Premium (15M messages).
  Senders with under 500 connections got more replies (about 18% to 19%) than those with 500+ (16%). Recruiters
  get the most replies (25.6%), marketers the fewest (14.5%). Vendor, observational, unadjusted.
- **Posting.** Expandi: accounts with 1,000+ followers and 3+ posts each with 10+ likes accepted at 30.5% vs
  27% to 29% (only 38 accounts). Prospectio test 11: posting twice a week during a campaign, reply 29.5% to
  36.0%, meetings 3.8% to 5.1% (5,550 prospects; how posting was randomized is not said). Vendor.

What is not measured: the headline, the banner, the "About" section, the featured section. Every figure found
(a headline with "who you help" at 29.58% vs a sales title at 25.81%; a new headshot taking one account from 11%
to 34%) is a single case or a number no page carries. Untraced.

Practice consensus (and LinkedIn's own Help): a real face, a headline that says who you help rather than a
sales title, a profile that answers "why would this person write to me" in the five seconds a recipient spends
on it. Cheap to do; do not promise a number.

---

## 5. Engaging before connecting (views, likes, comments)

This is the most over-claimed practice on the channel. The datasets, best first:

| Source | Size | What it compared | Result | Rating |
|---|---|---|---|---|
| Waalaxy e-book 2025 | 5,264,107 requests in 7,389 campaigns with a visit; 15,707,168 in 27,181 without | profile visit before the request, or not | **32.9% with a visit vs 34.2% without** | vendor, sample stated, observational |
| Expandi H1 2026 | 70,130 campaigns | "Builder" warm-up campaigns (likes, views, follows, endorsements before connecting) vs plain Connector | **22% vs 29.61% acceptance**; reply 7.22% vs an 8.62% template average; in Belkins' copy of Expandi data, Builder 5.4% vs Connector 7.9% total reply | vendor, confounded (warm-up may be used on colder lists) |
| AISDR | about 450 per arm | both arms got a like on a recent post first | so it does not test the like | vendor |
| La Growth Machine | not given | liking posts first | 32% to 40% | vendor, no method |
| Zeliq | one rep, not given | two profile visits 24 h apart, then request | 67% vs 23% | vendor, anecdote |
| Belkins (via Overloop) | not given | message plus profile visit vs message alone | 11.87% vs 4.88% reply | untraced (not on the Belkins page read) |

The two largest datasets point the same way: **a passive touch (a view, a like, a follow) does not raise
acceptance, and may lower it slightly.** Waalaxy's reading: a visit with no message "feels like passive
lurking without clear intent".

What does work is a **real, two-way tie** the recipient already knows about:

- Expandi H2 2026 (240 single-request campaigns): baseline 30.2% acceptance; "thanks for the follow" (they
  followed YOU) 81.1% on 435 people; "thanks for joining my group" 63.6% on 2,106. Vendor, small.
- Expandi H1: messaging people who viewed your profile replies at 13.4%; event attendees 14.2%; vs 8.6% for
  templates. Vendor.
- Prospectio test 9 (randomized, 7,340): naming a shared colleague, reply 27.0% to 35.1%, meetings 3.5% to 5.1%.
- A comment that adds something on their post, then a message that refers to it, is the practitioner pattern
  (Morgan Ingram, see `../linkedin-messages/`). One reported creator dataset (8,423 conversations): a message
  sent right after the person engaged with her post converted 36.4% vs 11.4% for a cold pitch (secondary,
  practice).

Rule that follows: **the warm-up that counts is one the prospect started or noticed** (they engaged with you,
you share a group, a colleague, an event). Manufacturing a view or a like is not a tie and is not measured to
help. Write the tie in the message; do not count on the notification.

---

**Round 2 (2026-10-30).** Still no test isolates a COMMENT before outreach. The Fuzzy AI "42% vs 9% reply" and
"acceptance 45% to 60%" are unsampled vendor claims; the Belkins 2026 study (Expandi data) puts warm-up
"Builder" campaigns at 5.4% total reply against 7.9% for "Connector". The rule stands: the warm-up that counts is
one the prospect started or noticed. Engagers of a post are a different thing (a list, not a warm-up): see
`../practitioners/`.

## 6. Voice notes and video

Platform: voice up to 60 seconds, mobile app only, first-degree connections only.

- **Prospectio test 12, randomized within each client's list** (5,915 founders and COOs at 10 to 50 person
  firms, 11 weeks in 2026): a voice note as the **second touch** vs a text follow-up: reply 30.7% to **33.7%**,
  meetings 4.1% to **5.0%**. Worse in DACH, where the programmes ran a formal register. Not tested on
  enterprise. Vendor, randomized, one segment.
- **Waalaxy** (13,790 messages with a voice note in 335 campaigns vs 5.6M without): overall reply 16.2% vs
  15.8% (no difference), "interested" reply **6.8% vs 4.4%**. Observational, small voice arm. Their advice:
  voice as a follow-up, never as the first message.
- **Video, Prospectio test 8, randomized** (8,385 IT directors and CTOs, 50 to 200 person firms, 2025):
  personalised video first touch vs text: reply 28.8% to **40.4%**, meetings 4.1% to **6.4%**. The channel is
  not stated (may be email). Vendor.
- **Vidyard** (video in email): "up to 4x" or "5x more replies" in its own case studies; no method. Vendor, no
  method. **Amplemarket** "voice messages increase reply rates by 150%" from "50,000 responses": no method.

Reading: the only two randomized results agree that a human voice or face lifts meetings by about 20% to 55%
relative, in small-company, founder-led segments, as a follow-up or a deliberate first touch. Big multipliers
elsewhere are untraced. A voice note cannot be written by a model: it is recorded by the person. In a
formal-register market, keep it text.

---

## 7. Timing (day, hour, delay)

| Source | Finding | Rating |
|---|---|---|
| LinkedIn InMail 2016 | no best hour, no best day: people answer when convenient | vendor, sample stated |
| LinkedIn InMail 2022 | Monday slightly best; Friday -4%, Saturday -8%; 65% of responses in 24 h | vendor, sample stated |
| Expandi H2 2026 (about 36,500 messages, 17,900 request sends, Jan to May 2026, Amsterdam time, sampled) | requests sent 7 to 11 am accept at about 32% to 37%, evening 23% to 24%; **reply flat across the day**; reply by weekday 8.3% to 9.1%, "too small to act on" | vendor, sampled |
| Belkins (15M Expandi contacts) | reply by weekday: whole range under one point (Thu and Mon 7.4%, Fri and Sat 6.9%); April best month, September worst | vendor |
| Waalaxy | midweek (Tue to Thu) best, about 18% to 19%; weekend worst, about 14% | vendor, chart read |
| Expandi H1 | January: acceptance 21.45% (lowest), reply 6.47% (lowest), most campaigns launched | vendor |

Reading: **day and hour barely move replies**; avoid weekends; morning sends may help acceptance (one sampled
dataset, possibly the recipient's notification pile being smaller). Seasonality (January low, spring high)
is larger than weekday effects. What does matter is **patience in the judgment**: connections come in a median
of 1 day but replies in a median of 5, and a fifth of replies arrive after day 14 (Belkins). A sequence judged
after three days is judged on a third of its answers.

---

## 8. Message length on LinkedIn

| Source | Unit | Best | Worst | Rating |
|---|---|---|---|---|
| LinkedIn InMail 2022 | characters | under 400: +22% vs average | over 1,200: -11% | vendor, sample stated (recruiter) |
| LinkedIn Sales checklist 2026 | words | 50 to 75 words | | practice from the platform |
| Expandi H2 (458 single-message campaigns) | characters | **151 to 200: 8.5%** (1 to 50 at 15.7% on only 9 campaigns) | 51 to 100: 5.1%; 201 to 300: 5.9%; 500+: 5.8% | vendor, noisy |
| Waalaxy (5.4M messages by language) | characters | 1 to 300: about 17.5% (English) | 1,001+: about 10% | vendor |
| Prospectio test 15 (sample not given) | characters | 240 to 420: 38.6% | over 700: 11.2%; under 150: 21.4% | vendor, no sample |
| Prospectio test 4 (randomized, 7,990) | sentences | 2.5 question-led sentences: 44.5% reply, 6.2% meetings | long message with solution detail: 18.6%, 2.3% | vendor, randomized |

Reading: every dataset agrees that **over about 500 characters loses**, and that the best band is somewhere
between 150 and 420 characters (2 to 4 short sentences, 30 to 75 words). The exact peak differs by dataset;
the curve is flat inside the band. One-liners do not win as a first message (Prospectio under 150 below 240 to
420); they belong to bumps. This matches `../linkedin-messages/` section 1, finding 4.

---

## 9. The note on the invitation: every dataset

| Dataset | Size | Acceptance with note | Without | Reply after | Rating |
|---|---|---|---|---|---|
| Waalaxy e-book 2025 | 5,120,461 requests with note (8,021 campaigns); 15,839,784 without (26,465 campaigns) | 32.3% | 34.3% | **lower with a note**: about 15% vs 20% overall, 4.2% vs 6% "interested" | vendor, sample stated |
| Belkins 2025 data | 11.5M requests (source not named) | 25.3% | 27.6% | **higher with a note**: 8.2% vs 5.3% of messages | vendor |
| "Belkins" via Overloop | 20M+ outreach attempts | 26.42% | 26.37% | higher: 9.36% vs 5.44% | untraced (not on the Belkins page) |
| Reachium | 180,155 | 22.6% | 27.7% (within sender: both ways) | higher: 47.8% vs 25.5% of accepted | vendor, method stated |
| AISDR (split evenly, same warm-up and follow-ups) | about 450 per arm | 34.6% | 37.3% | **higher: 19.2% vs 2.6% of all leads** (about 55% vs 7% of accepted); positive 7.7% vs 0.7% | vendor, closest to a test, audience already active on the topic |
| Waalaxy (older, quoted) | about 10M | 26% | 38% | | untraced |
| Expandi H2 | 13.2M | not compared | | the note itself gets a reply 3.0% of the time, falling | vendor |

Reading:

1. **Acceptance**: a note costs 2 to 5 points in all four traceable datasets (Waalaxy 2.0, Belkins 2.3, AISDR 2.7,
   Reachium 5.1). Small and consistent.
2. **Reply**: three datasets (Belkins, Reachium, AISDR) say a note brings more replies,
   one big dataset (Waalaxy) says fewer. The two camps likely measure different notes: Waalaxy's own
   explanation is "too long, too salesy, or too generic" notes from volume senders; AISDR's notes were tied to a
   topic the person had just posted about. **The note's value depends on whether it carries a real reason.**
3. The free account has 3 notes a month anyway. The rule in `../linkedin-messages/` stands and is now better
   supported: default bare; a note only when there is a real tie or a dated reason, under 200 characters, no
   pitch. Measure it on the account's own numbers.

---

## 10. Follow-up count on LinkedIn

| Source | Size | Finding | Rating |
|---|---|---|---|
| Expandi H2 2026 | 2,966 campaigns, 50+ contacts each | total reply by number of messages (note counted as 1): 1: 6.3%, 2: 6.8%, **3: 9.8%**, 4: 7.9%, 5+: 5.0%. Per send, message 2 best (8.8%) | vendor, observational |
| Expandi H1 2026 | Connector, Messenger, Open InMail campaigns | first follow-up -0.6% vs none, second +4.05%, later at most +1% (units not stated) | vendor, no method |
| Waalaxy | campaigns by touchpoints | 2 touchpoints best (about 20.7% reply), falling to about 4% at 6; their ideal: bare invite + first message + one follow-up + a breakup | vendor, chart read |
| Prospectio test 14 | 38 accounts, sample not given | meetings per prospect by sequence duration: 2 weeks 1.9%, 4 weeks 3.4%, **6 to 8 weeks 5.3% to 5.4%**, 10 weeks 4.6% | vendor |
| Belkins response time | 152,636 contacts | 78.5% of eventual replies by day 14, 91.8% by day 30, 97.5% by day 60 | vendor, method stated |

Reading: **two or three messages after acceptance, spaced so the whole thing spans two to six weeks, then
stop.** More messages lowered reply in every dataset that has a count; a longer span (not more messages)
raised meetings in the one that has a duration.

---

## 11. Other LinkedIn-specific findings worth keeping

- **No link, no attachment, no hard CTA in the first message** (Waalaxy, millions of messages each): a URL CTA
  about 11.7% vs 18.9% without (chart read); an attachment 9.6% vs 16.2%; a phone or email CTA about 1 point
  lower; a GIF alone 3.6% vs 15.8%. A calendar link in the REPLY (after they answered) made no difference
  (Prospectio test 13, randomized, 6,655: 33.1% vs 33.4%). Vendor.
- **"We" costs, "I" once is fine** (Waalaxy, English, about 2.9M messages): 0 "we" 16.3% reply, 6 to 10 "we"
  9.5%; 1 to 2 "I" best. Agrees with "you" language +29% in the 85M emails (see `../cold-email/`). Vendor.
- **Connection then message beats InMail** (Prospectio test 2, randomized, 4,330 CTOs and product leaders, 2023):
  reply 37.0% vs 3.7%, meetings 5.1% vs 0.4%. Vendor. LinkedIn's own InMail averages are higher (recruiter data
  and credit-back incentives), but every source agrees a first-degree message outperforms a cold InMail.
- **Human-written vs AI-written** (Expandi H2, same 73 accounts, 118 campaigns): within the same accounts,
  human-written requests accept about 12% better (relative), reply the same. The cross-account comparison
  (AI looks better) is selection bias, the report says. Belkins: AI-assisted 7.3% vs 7.0% total reply, no test.
  Vendor.
- **LinkedIn plus email** (Prospectio test 10, 9,020): reply 23.3% to 31.5%, reach 69% to 90%. Vendor.
- **Sales Navigator lists vs CSV lists**: 19.8% vs 18.5% acceptance, same reply (Expandi, 11,000 campaigns).

**A warning on Prospectio's levels.** Its reply rates (10% to 52%) are three to four times every other source.
Its tests are randomized within each client's list with at least 2,000 per arm, which makes the DIFFERENCES
the best-designed in this folder; but the levels suggest curated, small, high-fit lists or a generous reply
definition, and some tests do not state channel or sample. Use its relative gaps, never its levels, and only
from the tests that state a sample.

---

## 12. What this changes for BeReach's skills

1. **Write to 200 characters for a note, and assume 3 notes a month on a free account.** Bare is the default.
2. **Do not recommend views, likes or follows as a warm-up.** The largest dataset shows none to slight harm.
   Recommend naming a real tie the person knows about (they engaged with you, a shared group, colleague or
   event), in the message itself.
3. **First message 150 to 400 characters, 2 to 4 sentences, no link, no attachment, no meeting ask.**
4. **Two or three messages after acceptance, spread over two to six weeks, then stop.** Read results after 14
   days at the earliest, 30 for the full picture.
5. **Do not schedule by hour or day** beyond avoiding weekends; it is noise next to the list and the message.
6. **A voice note is the person's choice for message two**, in informal-register markets; never written by
   the model, never in a formal-register market by default.
7. **Benchmarks to show a user**: acceptance 20% to 30% is normal, under 13% means targeting or profile;
   about 1 in 5 accepted people replying is normal, under 1 in 10 means the message.
8. **Never quote SSI, "21x views" or "5x via a mutual connection" as facts.** They have no method.

---

## 13. Gaps (nothing citable found)

- Any randomized test of the headline, the banner, or the "About" section on acceptance.
- Any independent (non-vendor) measurement of reply rates on LinkedIn.
- The share of replies that are positive, by note or length, outside one small test (AISDR).
- The official weekly invitation number (LinkedIn does not publish it).
- A LinkedIn-specific randomized test of video in the DM.
- Hour of day in the RECIPIENT's time zone (Expandi's is the sender platform's time).
