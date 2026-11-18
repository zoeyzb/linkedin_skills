# Evidence: LinkedIn prospecting messages

Strength scale (same as the other folders):

- **Measured**: stated sample and method, peer reviewed or with its data shown. A vendor's own platform data
  with a stated sample and method counts here, marked (vendor, observational): the direction can be used, the
  size is a hint.
- **Survey**: stated sample, self-reported.
- **Practice**: a named expert's documented method. Nobody measured it.
- **Untraced**: repeated widely, no source found, or the source does not say it.

Every source is in `sources.md`. Email data is marked as email: it is the best measured cousin of a LinkedIn
message, not the same thing.

## The invitation note

| Claim | Source | Strength |
|---|---|---|
| A note costs little or nothing in acceptance: 26.42% with vs 26.37% without | Belkins (20M+, attributed in Outscore's table) | Measured (vendor, observational) |
| A note costs about 2 points: 25.3% with vs 27.6% without (11.5M invitations) | Belkins 2026 | Measured (vendor, observational) |
| Pooled: 22.6% with vs 27.7% without; but inside the three customers with enough data the gap goes both ways (36.3 vs 27.6, 21.5 vs 31.4, 22.3 vs 21.5). The author calls acceptance inconclusive | Reachium (180,155) | Measured (vendor, observational, the only within-sender check) |
| Blank requests accept "more" | Botdog (16,492) | Untraced size (no figures given) |
| 38% without vs 26% with a full note | Waalaxy (~10M) as quoted by Outscore | Untraced (no link, no method) |
| No note 55 to 68%, generic note 28 to 45% | ReactIn (80K) | Untraced (ranges, inconsistent tables) |
| 48.6% without vs 8.6% with | Linkdify (8,400) | Untraced (gap too large to be the note alone) |
| After acceptance, people who got a note reply more: 8.2% vs 5.3% of sent | Belkins 2026 | Measured (vendor, observational) |
| Reply of accepted: 47.8% with note vs 25.5% without; higher in all three within-customer pairs (by 15 to 28 points) | Reachium | Measured (vendor; confounded with the follow-up sequence) |
| So a note works as a filter: slightly fewer accept, the ones who do are likelier to talk | Belkins' wording ("soft filter"), consistent with Reachium | Practice resting on Measured |
| Replies to the note itself fell from 3.5% to 2.2% in a year | Expandi H2 2026 | Measured (vendor) |
| Openers that name an existing tie (a follow, a shared group) accept at 1.8 to 2.7x baseline | Expandi H2 2026 (240 single-request campaigns) | Measured (vendor, small) |
| A note is up to 200 characters; free accounts can add one to 3 invitations a month; Premium unlimited | LinkedIn Help 46662, read 2026-10-29 | Primary (platform's own rule) |
| 300 characters | Older LinkedIn limit | Outdated |
| Acceptance timing: 63% within 24 h, 88% within 7 days | Botdog | Measured (vendor) |
| Requests sent 7 to 11 am accept at 32 to 37% vs 23 to 24% in the evening | Expandi H2 2026 (sample of 17,900) | Measured (vendor, sampled) |

Per invitation sent, a note gave more replies in both datasets that allow the sum: Belkins 8.2% vs 5.3%;
Reachium 22.6% x 47.8% = about 10.8% vs 27.7% x 25.5% = about 7.1%. Confounded with the follow-ups.

**Verdict on the note.** "A note lowers acceptance" is true in pooled data by 0 to 5 points, not proven
once you compare like with like, and the one big claim (38 vs 26) does not trace. "A note filters who accepts"
is the better reading: the reply after acceptance is higher with a note in every dataset that measured it. The
cause is not isolated (senders who write notes also write better follow-ups). So: test it on your own list,
which `bereach_status` now shows (`connections.trend`, withNote / withoutNote, rate null under ten sent).

## Length

| Claim | Source | Strength |
|---|---|---|
| Email reply by words: under 50: 2.3%, 51 to 100: 2.6%, 101 to 150: 2.0%, 151 to 200: 1.6% | 30MPC + Gong report (85M) | Measured (vendor, chart) |
| Email reply by sentences: 1: 1.9%, 2: 2.3%, 3: 2.9%, 4: 2.7%, 5 or 6: 2.3%. A one-liner is the WORST first touch | Same | Measured (vendor, chart) |
| 25 to 50 words get 65% more replies than 125 words (28.3M emails) | Lavender, via LinkedIn's business blog | Measured (vendor, no method published) |
| 20 to 39 words highest average reply (34M) | Hunter | Measured (vendor) |
| Short cold emails (30 words or less) are 15x LESS effective than longer ones | Gong blog | Untraced (contradicted by Gong's own 85M report) |
| LinkedIn single-message campaigns by characters: 1 to 50: 15.7% (9 campaigns, too thin), 51 to 100: 5.1%, 101 to 150: 6.3%, 151 to 200: 8.5%, 201 to 300: 5.9%, 301 to 500: 7.6%, 500+: 5.8% (baseline 6.8%) | Expandi H2 2026 (458 campaigns) | Measured (vendor; not monotonic, noisy) |
| InMails under 400 characters do best | LinkedIn, as reported 2022 | Survey-grade (platform claim, no method) |
| "Under 400 characters gets 22% more replies" | Many blogs | Untraced |

**Verdict.** Short wins against long; the floor matters too. On LinkedIn, aim for 2 to 4 short sentences, about
150 to 400 characters for a first message. A bare one-liner first touch underperforms; one-liners are for bumps.

## Personalization and relevance

| Claim | Source | Strength |
|---|---|---|
| Personalized vs not: booked meeting 10% vs 2% | 30MPC + Gong | Measured (vendor; who personalizes is not random) |
| By type (director+ reply): activity-based 24%, company 9%, individual 6%, industry 6%, baseline 2% | 30MPC + Gong | Measured (vendor) |
| Executives do not care about alma mater; reference business problems, not fun facts | 30MPC + Gong takeaway | Practice resting on Measured |
| The recipient's name in a subject line lifts opens about 20%, leads about 31%; works by attention, not information | Sahni, Wheeler, Chintagunta 2018 | Measured (peer reviewed, field) |
| Personalization that has nothing to do with the problem you solve is an attention hack | Clay, quoted widely | Practice |
| Premise buckets in order: their own content, content they engaged with, how they describe themselves, hobbies (only if tied), company news | Becc Holland | Practice |
| Personalization (1:1, unique to them) is not relevance (1:many, a cohort's situation); never invent a premise, fall back to relevance | Becc Holland | Practice |
| Warm (you engaged with their post first) 13.1% vs cold 3.1% reply | Fuzzy AI (10,000) | Measured (vendor, observational) |
| "Personalization lifts replies 50 to 250%" | Lavender as quoted | Untraced |
| "Self-authored content gets 90%+ response from execs" | Becc Holland | Practice (anecdote) |
| Human-written beat AI-written on acceptance by about 12% within the same accounts; reply equal | Expandi H2 2026 (118 campaigns, 73 accounts) | Measured (vendor, small) |
| Suspecting a text is AI-written lowers trust in its writer | Jakesch et al. 2019 | Measured (peer reviewed, lab) |

## Words, questions, register

| Claim | Source | Strength |
|---|---|---|
| Pitch words cut reply: buzzwords -57%, "AI" -36%, "platform" -26%, ROI -17%; priority language +20%, social proof +41% | 30MPC + Gong | Measured (vendor) |
| Top reps use "you, your, your team" 29% more often | 30MPC + Gong | Measured (vendor) |
| Grade 3 to 5 reading level gets 67% more replies | Lavender | Untraced (no sample) |
| Zero questions +11% reply vs one; three questions down 21% | Reply.io | Measured (vendor, email) |
| One to three questions get 50% more replies than none | Boomerang 2016 | Measured but warm mail, not cold |
| Use "what" and "how" questions, avoid "why" | Chris Voss | Practice |
| Lowercase subject lines open more | 30MPC + Gong; Overloop | Measured (vendor, email opens) |
| Lowercase or "ugly" body text gets more replies | JMM; folklore | Untraced |
| "But you are free" roughly doubles compliance | Carpenter 2013 (42 studies) | Measured, contested |
| Same, in the 7 low-bias studies: no reliable effect (g = 0.11) | Fillon et al. 2023 | Measured (peer reviewed, preregistered) |
| Social proof is the best supported Cialdini lever; foot-in-the-door and door-in-the-face are real but small (r about .17, .10) | Meta-analyses via secondary reviews | Measured (secondary) |
| Reciprocity, scarcity, authority as message tricks | Cialdini | Practice; no meta-analytic size found for messages |
| France: "vous" at first contact; "tu" only for young, startup or creative targets | Zeliq; Waalaxy | Practice (no data either way) |

## The ask

| Claim | Source | Strength |
|---|---|---|
| Email CTA impact on reply: ask for a meeting -44%, ask about their problem -29%, ask for interest +7%, make an offer +28% | 30MPC + Gong (85M) | Measured (vendor, chart) |
| Interest CTA 2x more likely to book than asking for time (304,174 emails, meeting within 10 days) | Gong blog | Measured (vendor) |
| A specific day and time works later: 15% cold vs 37% in a live deal | Gong blog | Measured (vendor) |
| "Quick chat" wording: -2%, buys nothing | 30MPC + Gong | Measured (vendor) |
| Never ask for 30 minutes in a first touch; ask a yes/no interest question | Josh Braun | Practice |

## Follow-ups and sequences

| Claim | Source | Strength |
|---|---|---|
| Email reply by touch number falls from about 1.9% (1st) to below 0.5% after the 6th; send about 6 across 14 to 28 days, then rest | 30MPC + Gong | Measured (vendor) |
| LinkedIn campaigns: 1 message 6.3%, 2: 6.8%, 3: 9.8%, 4: 7.9%, 5+: 5.0% total reply | Expandi H2 2026 (2,966 campaigns) | Measured (vendor; campaign mix confounds it) |
| Message 2 has the highest per-send reply on LinkedIn (8.8%) | Expandi H2 2026 | Measured (vendor) |
| Bumps of 1 to 2 sentences get about 2x the replies of 5-sentence bumps | 30MPC + Gong | Measured (vendor) |
| In follow-ups: breakup language +89%, explicit CTA +27%, "thoughts?" +9%, quick chat -2%, case study language -47% | 30MPC + Gong | Measured (vendor) |
| Vary the value in each follow-up; never "just checking in" | Becc Holland; Josh Braun | Practice |
| Detach: one-line Voss question ("Have you given up on this?") instead of five chasers | Josh Braun quoting Voss | Practice |
| Wait a few days after acceptance before the first message | Morgan Ingram | Practice (BeReach's line sends soon after the accept) |
| A voice note as the 2nd touch: reply 30.7% to 33.7%, meetings 4.1% to 5.0%; worse in DACH, where the programmes ran a formal register by design (not an address-form test) | Prospectio (5,915, randomized) | Measured (vendor, one segment) |
| Voice notes reply 25 to 40% vs 5 to 15% text; 71% vs 24% | Vendor blogs | Untraced or tiny samples |
| A voice note in a cloned (software-made) voice performs like a recorded one | Vendor pages | None found; not written as a claim |
| A personalized image or video lifts LinkedIn replies | Vendor pages | None found on LinkedIn; in email, images had no meaningful effect (Hunter 2025) |
| A few leads found for the prospect, offered as the gift in the offer ask | BeReach practice | Not measured; the offer ask itself is +28% in email data (30MPC + Gong). Run as a test arm |
| What got replies in the user's own past conversations predicts what will | Practice | Hint only: 20 conversations sit inside the noise band; never overrides a measured test |
| Cold calls double or triple email reply | 30MPC + Gong | Measured (vendor; outside this skill) |

## Framework origins

| Claim | Source | Strength |
|---|---|---|
| AIDA is from E. St. Elmo Lewis, 1898 | Common attribution | Disputed (a historical study finds no evidence; credits Sheldon) |
| 4Ps (Promise, Picture, Proof, Push) from Henry Hoke Sr., 1930s | Secondhand | Untraced |
| PAS, BAB, QVC, PPP, Star-Story-Solution | Sales blogs | Untraced origin; none was ever measured as a framework |
| Five awareness levels | Eugene Schwartz, Breakthrough Advertising, 1966 | Primary (book) |
| 3x3 research (3 facts in 3 minutes) | Steve Richard, Vorsight (often misattributed to Jason Bay) | Practice |

**No framework has been measured against another.** What is measured is the parts: a reason about them, a
problem not a pitch, short, one easy ask. Frameworks are ways to arrange those parts.

## Round 2 (2026-10-30)

| Claim | Source | Strength |
|---|---|---|
| Naming a shared colleague raised replies 27.0% to 35.1% (backs the referral line) | Prospectio test 9, 7,340 | Measured (vendor, randomized) |
| "Send me info", "maybe later" and compliments are not commitment | Fitzpatrick, *The Mom Test* | Practice |
| C-level 30.2% less likely to reply to cold email | Gong Labs, January 2026 | Measured (vendor), email; contradicted by Sales.co (C-level 3.3x managers) |
| Engagers 58%/47% against 31%/21% | MimikFlow, 32 accounts | Measured (vendor, observational) |
| Agoge Sequence | Sam Nelson, via Sybill | Practice |
| CEO-reply anecdote: initiative first, tied in sentence two | Florin Tatulea, via Close | Practice (one anecdote) |
| Email built on a quote of the CEO's own interview | Kyle Coleman, via Close | Practice (one example) |
