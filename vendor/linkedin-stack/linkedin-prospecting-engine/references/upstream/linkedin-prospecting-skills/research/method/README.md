# The outreach method, and how to measure it honestly

Research behind the `linkedin-outreach-method` skill. Written 2026-10-29. Tags as in `../voice/README.md`:
**[DATA]** study with method and sample, **[PRACTICE]** recognised practitioner, **[VENDOR]** a seller's
numbers about its own users, **[LOCAL]** measured inside BeReach, **[FOLKLORE]** traced to nothing.

Sources: `sources.md`. Exact numbers and the worked statistics: `evidence.md`.

The skill is judged by one thing: acceptance rate and reply rate go up. Everything below serves that.

## What was studied

1. Outbound frameworks: Predictable Revenue (Ross and Tyler), Winning by Design's bowtie data model.
2. LinkedIn outreach data: vendor datasets on acceptance, notes, time to accept, time to reply.
3. Experiment design: Evan Miller (sample size, peeking), the two-proportion test and its small-sample limits,
   Kohavi, Tang and Xu (A/A tests, novelty effect), cohort analysis.
4. Personalization evidence for cold outreach.
5. Advanced formats: voice notes, voice cloning, images.
6. BeReach's own measure: `connections.trend` in `bereach_status`.

## 1. The loop, and why it is ordered this way

ICP search, then split by persona, then a persona card, then the voice, then a framework per message type, then
ONE template per persona sent to everyone, with the personal line from each brief when it holds one, then measure.

- **Specialize and measure each stage.** Predictable Revenue's core is role specialization and tracking the
  numbers of each stage, with short emails that ask for the right person **[PRACTICE]**. Winning by Design
  measures every stage of the customer journey on three numbers: volume, conversion rate, time **[PRACTICE]**.
  For LinkedIn outreach that is: invitations sent (volume), accepted within 7 days and answered within 7 days
  (conversion), days to accept and to reply (time).
- **One template per persona first, because you cannot learn from a moving target.** If every message is
  different, no rate says anything about the words. A fixed template per persona is the control; every later
  change is measured against it. This is standard experiment logic (one change at a time, against a baseline)
  **[DATA, Kohavi et al.]**, not a sales opinion.
- **Personalization is not proven to lift replies.** No controlled study found shows that personalization
  lifts B2B replies; the large multipliers are vendor correlations where the people who personalize also build
  tighter lists **[VENDOR]**. The one tidy field experiment found (first name in a subject line) moved opens in
  one company and nothing in a 2023 follow-up **[DATA]**. So the template is the control the measured
  changes run against, and the personal line from the brief is the default, never a test arm.
- **Persona before message.** A template written for "everyone" averages two audiences; a mixed list also makes
  two templates impossible to compare (Simpson's paradox: a template can win in each persona and lose overall
  if the persona mix differs) **[DATA, textbook statistics]**. Compare templates inside one persona.

## 2. The 7-day rule: compare cohorts at the same age

- Acceptance arrives over days. Of 16,492 invitations, 21% of acceptances came within an hour, 63% within a
  day, 88% within 7 days, 99% within 30 days **[VENDOR]**. Over 152,636 contacts, median 1 day to accept, 91%
  of eventual connections within 14 days; median 5 days from invitation to reply, 60% of replies in the first
  week **[VENDOR]**.
- So "accepted / sent" for this week always looks worse than last week.
- The fix used by `connections.trend`: each period counts what went out in it and what of that was accepted or
  answered within 7 days, so every period is read at the same age. A period younger than that is marked
  `counting` and is not compared. No rate under 10 sent. **[LOCAL]**
- Count sends from a log that never forgets: when a withdrawn or expired invitation loses its sent date, old
  weeks look better than they were.

**Why a fixed size, not a fixed number of weeks:** a week of 50 invitations cannot tell 30% from 40% (see
section 3). When both arms go out on the same days, calendar effects (holidays, month end) hit both equally, so
the floor is volume: reach the planned size per arm, read both arms at 7 days old. "Two weeks minimum" is a
practice rule with no study behind it for this design. (Kohavi et al.'s novelty effect is about users reacting
to a new product feature, not about a sender's care, and does not apply here.)

## 3. Comparing two templates with small numbers

**Design**

- Same persona, same week, random split: shuffle the list, then alternate down it (alternating an ordered
  list is a fixed rule, not random). Running A this week and B next week
  mixes the template with the week.
- Decide the size before looking (Evan Miller, "How Not To Run an A/B Test"): in his worked example (a test
  after every observation, up to 150, 50% base rate), peeking after every result and
  stopping at the first "significant" gap made a test with no real effect come out significant 26.1% of the
  time instead of 5% **[DATA]**.
- Only read cohorts older than 7 days.

**How many people you need** (two-sided 5%, 80% power, per arm; computed with the standard two-proportion
formula, cross-checked against Miller's rule n = 16 p(1-p) / gap squared):

| Baseline | You hope to see | People per arm |
|---|---|---|
| 30% acceptance | 40% | about 360 |
| 30% acceptance | 45% | about 165 |
| 30% acceptance | 35% | about 1,400 |
| 10% replies | 20% | about 200 |
| 10% replies | 15% | about 690 |
| 5% replies | 10% | about 440 |

Plain conclusion: with LinkedIn volumes, only large differences can be proven. Small tweaks (one word, one
emoji) are not testable at this scale; test big changes (different angle, note against no note, short against
long).

**Noise band** (a gap smaller than this, in percentage points, is noise at 95%; per arm, at that baseline):

| Sent per arm | 10% base | 20% | 30% | 40% |
|---|---|---|---|---|
| 50 | 12 | 16 | 18 | 19 |
| 100 | 8 | 11 | 13 | 14 |
| 200 | 6 | 8 | 9 | 10 |
| 400 | 4 | 6 | 6 | 7 |

**The check itself** (two-proportion z-test): pooled rate p = (wins A + wins B) / (sent A + sent B);
SE = sqrt(p (1 - p) (1/nA + 1/nB)); z = (rate B - rate A) / SE; |z| above 1.96 means the gap is unlikely to be
chance. Valid when each arm has at least 10 wins and 10 non-wins; below that, use Fisher's exact test or wait
**[DATA, standard statistics]**. Worked examples in `evidence.md`.

**Rules of thumb that survive the maths**

- Fewer than 100 sent per arm: no verdict, only a direction.
- Want a verdict at 100 per arm: the gap must be about 13 points on acceptance near 30%, 8 points on replies
  near 10%.
- A result you did not plan to test (found by slicing afterwards) is a new hypothesis, not a finding.
- Repeat a win once before you rewrite everything around it.
- An A/A check is cheap: split one template in two halves. At a 95% band, about 1 honest split in 20 crosses
  it by chance; a crossing that repeats points to a biased split **[DATA, Kohavi et al.]**.

## 4. Note or no note

- Belkins data (20M+ attempts, as reported): acceptance 26.42% with a note, 26.37% without; replies 9.36% with
  a note against 5.44% without **[VENDOR]**.
- One team's split test, about 450 per arm, same warm-up: acceptance 37.3% without against 34.6% with (noise
  at that size), response 2.6% against 19.2% **[VENDOR]**. Caveat they state: a warm, signal-based list; and a
  reply to the note itself counts as a response, which a bare invitation cannot get.
- Another platform's 16,492 invitations: blank requests accepted more often, no rates given, no matching of
  audiences **[VENDOR]**.
- Expandi's 13.2M requests: average acceptance 28.5%; replies to notes fell from 3.5% to 2.2% in a year
  **[VENDOR]**.

Reading: the note barely moves acceptance and may move replies; nobody has published a matched, independent
test. It is exactly the kind of question to answer on one's own audience. BeReach makes it simple:
`bereach_connect` takes one note per call (so the note has no blanks), so one call with a note and one without for the two halves of a
persona is a clean split, and `connections.trend` already reports `withNote` and `withoutNote` per period.

**Note limits by account.** Third-party 2026 guides agree a free account's note is capped at 200 characters
(Premium 300) and that a free account gets only a few notes a month (figures range from 3 to 10; no official
page found) **[PRACTICE]**. So the skill keeps notes under 200 and sizes the
note arm to what the account can send.

## 5. Advanced formats: what is known

| Idea | What is known | What is not |
|---|---|---|
| Voice notes | Vendors selling voice tools claim 1.5x to 3x replies; small case studies higher **[VENDOR]** | No independent controlled test; most report any reply, not positive replies or meetings; hard to scale |
| Cloned voice (AI voice of the sender) | Vendor claims of doubled replies **[VENDOR]**. In the EU, the AI Act's transparency duty for deployers of generated or manipulated audio that qualifies as a deepfake applies from 2 August 2026 (as read in legal commentary; check the text) | Whether recipients react badly when they learn a voice was synthetic; no data |
| Personalized images | No data found, not even a sourced vendor figure | Everything |

Treat each as an optional test on one persona after the text baseline exists, measured on the same 7-day rule.
The person decides how much Claude does; nothing here is a default.

## 6. Evidenced vs folklore

| Claim | Status |
|---|---|
| Compare weeks at the same age (7 days) | Evidenced: acceptance timing data **[VENDOR]** |
| One week tells you which template wins | False at normal volumes (section 3) |
| Peeking and stopping early is fine | False: 26% false positives in Miller's example **[DATA]** |
| Notes lower acceptance | Unclear; largest dataset says no difference **[VENDOR]** |
| Notes raise replies | Plausible, vendor-only **[VENDOR]** |
| Personalization multiplies replies | Vendor correlation, no controlled study **[VENDOR]** |
| Voice notes double replies | Vendor claims **[VENDOR]** |
| Run every test at least two weeks | Practice rule; with same-day arms, volume is what matters |
| "Industry average reply rate is X%" | Depends on the sender's list and definition; do not import a benchmark, beat your own baseline |
| Predictable Revenue's 8 to 12% response benchmark | Second-hand; set in an older inbox climate **[PRACTICE]** |

## 7. Research round 2: tests and decisions (2026-10-30)

A complete new pass on expert knowledge covering Pierre Herubel,
with the rule "not more, what is needed and well used". Findings: `../practitioners/`.

**How it was tested.** Four candidates from the shortlist, each against the current pack. One writer produced
two reps per arm on fixed cases (three sellers, five leads, nothing invented beyond them); arms were labelled A
and B in a random order per candidate; three judges scored blind from 0 to 10. A gap under about 0.5 is noise.

| Candidate | Current pack | With the change | Gap | Decision |
|---|---|---|---|---|
| C1. Write to the colleague a lead names ("not me, ask X") | 4.17 | 8.00 | +3.83 | In the pack |
| C2. "Not now" and "send me info" are a deferral, not a yes | 4.50 | 7.00 | +2.50 | In the pack (wording fixed) |
| C3. Counted check for AI tells, after drafting | 5.50 | 7.83 | +2.33 | In the pack (trimmed) |
| C4. A comment on the user's own post comes first | 5.33 | 7.17 | +1.83 | Reverted after the re-test |


**What changed from the candidate wording.**
- C2: the candidate text contradicted its own test case; the version every judge preferred was kept ("send me
  info" gets one question on what they want it for, or the named offer).
- C3: the word list is English only; "not X but Y" and the list of three apply in every language. Merged into
  the existing "Never word" checkbox.

**Decided against** (reasons in `../practitioners/README.md`): directness set by signal strength, a weekly
nurture list, a 2-day cadence for cold follow-ups, a CPF "for whom" clause, Voss labels, Pre-Suasion priming,
reading-grade or word targets, engage-before-messaging, the Agoge 15-touch sequence, voice notes, Herubel's
content strategy.

**Re-test with isolated writers.** Each arm then got its own writers that never saw the other arm (OLD = the
pack before, NEW = the pack with the change), 2 writers per arm, 3 blind judges, 12 scores per arm. C1 5.6 to
7.8 (+2.2, kept), C2 5.6 to 6.4 (+0.8, kept), C3 6.5 to 7.1 (+0.6, kept), C4 7.7 to 5.5 (-2.2, reverted:
Step 3 of linkedin-messages and part 1 of `first-dm.md` are back to the old fact order). The first round's
gaps were inflated by the writer knowing the arms: every gap shrank and C4 flipped.

**Next on one account, before any rule.** Engagers of a post under a week old against older ones; dormant
threads and never-messaged first-degree connections as a source; a French AI-tell list.

