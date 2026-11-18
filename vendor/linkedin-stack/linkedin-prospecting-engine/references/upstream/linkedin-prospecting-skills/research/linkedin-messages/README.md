# LinkedIn prospecting messages: what the experts say and what is proven

Research pass of 2026-10-29 behind the linkedin-messages skill. Scope: the invitation note (and whether to send
one), the first message after acceptance, follow-ups, a five-message sequence, copywriting frameworks applied to
LinkedIn, and personalization that works against personalization that only looks like it.

Why it was done: drafts commonly paste a prospect's title or headline into a sentence with no verb and no
intent ("Ten years in water network maintenance."), followed by a generic template. Everything below
is aimed at one question: what makes a message read like a sensible person who looked at the profile and has
a reason to talk.

Files: `evidence.md` (every claim, its source, its strength), `sources.md` (every URL). Strength words used here:
Measured, Survey, Practice, Untraced, defined in `evidence.md`.

---

## 1. The seven findings that shape the skill

1. **The common failure has a name: a recited fact with no "so what".** Every serious practitioner
   structure puts the observation and its tie to the reader's world together: Becc Holland (premise, then the
   value mapped onto it), Lavender (observation, then connection), Clay ("personalization that has nothing to
   do with the problem is an attention hack"). A title is not a premise. The personal line must be one
   sentence with a verb that links a fact to a reason to talk.
2. **Which facts work is measured, roughly.** Reply by personalization type in 85M emails: activity-based 24%,
   company 9%, individual 6%, industry 6%, none 2% (vendor data, director and above: grade it as such to a customer, never "best supported"). Holland's order agrees:
   what they wrote, then what they engaged with, then how they describe themselves, then company news; hobbies
   only if tied to the problem. Their job title is the weakest premise there is.
3. **A note on the invitation is a filter, not a lever.** Acceptance with a note is 0 to 5 points lower in pooled
   data and not proven lower inside the same sender; the reply after acceptance is higher with a note in every
   dataset that measured it.
   Notes are now capped at 200 characters and free accounts get 3 a month.
4. **Short, but not a one-liner.** Email: 3 to 4 sentences and 51 to 100 words reply best; a single sentence is
   the worst first touch. LinkedIn single messages: 151 to 200 characters best in the one large dataset
   (1 to 50 scored higher on only 9 campaigns), 201 to 300 below baseline; noisy. The one-liner result is email. One-liners belong to bumps.
5. **Ask for interest or offer something; never ask for a meeting first.** Meeting ask -44%, ask about their
   problem -29%, ask for interest +7%, make an offer +28% (85M emails). Gong's older 304K study: interest CTA
   about 2x more meetings than a time ask.
6. **Three messages, then stop; vary the value; end with a breakup.** LinkedIn sequences of 3 messages
   replied best (9.8%), 4 lower (7.9%), 5+ worst (5.0%), counting the note as message 1; observational. Email replies fall below 0.5% after the sixth touch. Breakup language in a late bump
   +89%; case study language in a bump -47%; one-sentence bumps about 2x five-sentence ones.
7. **Nothing about a framework is measured.** AIDA, PAS, BAB and the rest have never been tested against each
   other. What is measured is the parts: a reason about them, their problem rather than your pitch, short, one
   easy ask. Use frameworks to arrange those parts, never as proof.

---

## 2. The invitation note

**Platform facts (LinkedIn Help, read 2026-10-29).** A note is up to 200 characters. A free account can add a
note to 3 invitations a month; Premium is unlimited. The 300 figure seen everywhere
is the older limit. Write to 200.

**Note or no note: the data, best first.**

| Dataset | Size | With note | Without | Reply after |
|---|---|---|---|---|
| Reachium (pooled, matured) | 180,155 | 22.6% | 27.7% | 47.8% vs 25.5% of accepted |
| Reachium (within 3 customers) | 200+ per arm each | 36.3 / 21.5 / 22.3% | 27.6 / 31.4 / 21.5% | note higher in all three |
| Belkins 2026 | 11.5M | 25.3% | 27.6% | 8.2% vs 5.3% of sent |
| Belkins (earlier, via automation campaigns) | 20M+ | 26.42% | 26.37% | "72% higher" |
| Waalaxy (quoted) | ~10M | 26% | 38% | not given, no link |

Reachium is the only one that compares a sender with themselves, and there the acceptance gap goes both ways
(note higher in one customer, lower in one, equal in one).
Every dataset is observational: senders who write notes differ from those who do not.

**What the experts do.** Morgan Ingram engages with a person's content first, connects, waits a few days, then
writes. Openers that name an existing tie (they follow you, a shared group) accept at 1.8 to 2.7x baseline. A
note that pitches is the one thing every source agrees against.

**Rule derived.** Default bare. Add a note only when there is a real tie or a dated reason (they posted on the
subject, a mutual connection, a trigger), under 200 characters, no pitch, no question that needs work. Measure
with `bereach_status` `connections.trend` (withNote vs withoutNote, accepted within 7 days), and judge only once
each side has 10 or more sent (the rate is null below that).

**Connector fact.** `bereach_connect` sends the same note to everyone in one call. A personal note means one call
for that person; bare invitations go in one call together.

---

## 3. The first message after acceptance

The parts, in the order the measured sources and the practitioners agree on:

1. **The personal line (why you, why now).** One sentence linking a fact from their activity, company or own
   words to the reason you write. Holland's premise; Braun's "what drew you to this prospect instead of others";
   McKenna's test: would this line make sense to anyone else? If yes, it is not personal.
2. **The problem in their words.** Braun: use the words customers use, cut jargon ("optimize", "streamline").
   30MPC: priority language +20%, buzzwords -57%, "AI" -36%, "platform" -26%. Top reps use "you" 29% more.
3. **One line of credibility.** Social proof is the one Cialdini lever that replicates well, and +41% in the 85M
   emails. A similar company, not a logo wall.
4. **One easy ask.** An interest question or an offer they keep even if they never buy. No calendar link, no 30
   minutes.

Length: 2 to 4 short sentences, about 150 to 400 characters. Reading level: plain enough for a phone screen
(Lavender's grade 3 to 5 claim is untraced, the direction is shared by every source).
The pack follows the 150 to 400 range, aiming 300 to 450 characters for a full premise plus an offer in complete sentences.

**Fake personalization, the patterns to reject.** Title or headline recited ("As Head of X at Y..."); a fact with
no verb or no link to the reason ("Ten years in water network maintenance."); generic praise ("love what Y is
doing"); "I came across your profile"; a hobby with no tie; company news restated with no consequence; a merge
field the reader can see. These are what a model produces when told "personalize" without being told "tie it to
the reason". Two peer-reviewed results explain why this matters: personalization works through attention
(Sahni et al. 2018), and a reader who suspects a machine wrote it trusts the writer less (Jakesch et al. 2019).
A fake personal line spends the attention and triggers the suspicion.

**When there is nothing personal.** Holland: never invent a premise; fall back to relevance, a line true for the
whole persona ("Teams that run water networks usually..."). A relevant message beats a fake personal one.

---

## 4. Follow-ups and the five-message sequence

- **Count.** LinkedIn campaigns: 3 messages 9.8% total reply, 4: 7.9%, 5+: 5.0% (Expandi, 2,966 campaigns,
  confounded by campaign quality). Email: about 6 touches in 14 to 28 days, then rest. Holland's full sequence
  is 16 steps over 21 business days across email and phone, of which the written ones carry 3 premises.
- **The second message replies most per send** on LinkedIn (8.8%).
- **Each follow-up brings something new**: a different angle, a proof, a resource. Never "just checking in",
  never "did you see my message" (Braun, Holland). Case study language in a bump: -47%; a rephrased ask or
  "thoughts?" works better.
- **Bumps are one or two sentences** (about 2x the reply of five sentences).
- **The breakup.** Braun's "detach" and Voss's one-liners ("Have you given up on this?"). Breakup language in a
  late bump: +89%. It gives permission to say no, and many people answer that.
- **Timing (practice, nothing measured on LinkedIn):** first message 1 to 3 days after acceptance; then about 3,
  5, 7 and 10 days apart. BeReach's line sends an approved first message soon after the accept, so a longer
  wait means approving after the accept. Acceptance itself takes up to a week (88% within 7 days).
- **Voice notes.** One randomized test: as the second touch, replies 30.7% to 33.7% and meetings 4.1% to 5.0%,
  among founders of small firms; worse where a formal register is expected. Big multipliers elsewhere are
  untraced. A voice note is a warm touch, never a cold opener, and is recorded by the person, not written.
- **Copied templates decay.** Justin Michael's own warning: a pattern stops working once everyone uses it. The
  measure, not the template, is the asset.

---

## 5. The experts, one by one

**Josh Braun** (primary source read: his 15 principles PDF and blog). Sell superpowers, not swords; pick an
expensive problem; make it personal (social loafing: a copy-paste message tells the reader their reply does not
matter); use the prospect's words; write for one; cut fluff and "just"; be meaningfully different ("without");
**poke the bear**: a neutral question about the cost of the current way ("How do you know X isn't happening
between Y?"), never a leading one ("If I could show you..."); **slow down**: interest CTAs ("Open to learning
more?", "Worth exploring?", "Feel free to say no if you don't see a fit, but is this of interest?"); **detach**:
no chasing; end on a high note (peak-end rule). Permission-based: every ask leaves an easy no. Practice, widely
copied, no data of his own.

**Becc Holland** (Chorus article reposted, Chorus deck, secondary summaries). Personalization (1:1) is not
relevance (1:many). Four lenses: demographic, technographic, firmographic, psychographic (the underused one).
Five premise buckets in order of strength. Structure: premise (the longest line), the value mapped onto it, one
short ask. Why you and why now; never invent urgency. Follow-ups vary the value; 3 premises across a sequence;
"heavy" and "lite" touches alternate. Leave room to decline. Her numbers (90%+ from execs, 4x overnight) are
anecdotes.

**Jason Bay** (Outbound Squad). Co-author of the 85M cold email report with Gong and 30MPC, which is the best
measured source in this field. His REPLY Method is named but its steps are not public in text. The "3x3"
research habit often credited to him is Steve Richard's (Vorsight): three facts (account, person, industry) in
three minutes. Relevance over hours of research is the shared line.

**Justin Michael (JMM).** Pattern interrupts: very short "spears" (about 3 sentences, pain or fear, solution,
relevance), one or two word bumps ("Thoughts?"), three clusters a few days apart, binary asks, personalization in
30 to 60 seconds. Deliberately "ugly" formatting and dropped greetings are his style, not measured, and he warns
that copied patterns decay. Use the brevity; do not copy the tricks.

**Will Allred / Lavender.** Observation, connection, credibility, question. 25 to 50 words; mobile first;
low reading level; a call to conversation, not a meeting. "Too much I, not enough you" is a mistake he names;
no pronoun ratio is published (the measured one is the 85M report's "you" +29%). Benchmarks from about 50k
inboxes; most figures have no published method.

**Gong Labs.** 304,174 emails: interest CTA about 2x meetings; specific time asks only once a deal is live
(15% vs 37%). 132,000 emails: ROI language -15%. Partner in the 85M report. One blog claim ("longer emails 15x
more effective") contradicts the later data; do not use it.

**Sam Nelson** (Agoge Prospecting School). Corrected in round 2 (2026-10-30): his Agoge Sequence exists, about
six goal-tagged touches (attention grabber, value bomb, a nudge via a comment on their post, call, social proof,
closing touch) across email, LinkedIn and phone, the original said to run about 15 (Practice, one vendor blog).
Not carried: it is multichannel and its source repeats the untraced "80% need five follow-ups". Sam McKenna's
"Show Me You Know Me" is separate: the opening should make sense to nobody but this reader, no calendar links in
cold messages; her full method is paywalled.

**Kyle Coleman** (Clari, then Copy.ai). Publicly an advocate of relevance and short, signal-tied "micro
campaigns" over hand research. His written rules were not reachable (podcast only). Practice, not cited further.

**Morgan Ingram.** Comment on their content before messaging; connect; wait a few days before the first DM; voice
or video as a pattern interrupt in the DM, 45 to 60 seconds, hook 10 s, value 30 s, ask 10 s; low-friction asks
("Would you be opposed to..."). Secondary sources only.

**Florin Tatulea.** Known for SDR prospecting content and a four-sentence cold email; his frameworks are behind
a paid newsletter. Round 2 (2026-10-30): one secondary-sourced anecdote, the only cold email a CEO of a
50,000-person company said he answered: short, opens on a key company initiative, ties the offer to it in
sentence two, interest ask (Practice, via Close). Kyle Coleman has one example of the same shape, an email built
on a quote of the CEO's own interview: "something they said" first.

**Chris Voss.** Calibrated questions: open, "what" and "how", never "why" (accusatory). No-oriented questions
("Is it a bad idea to...?", "Have you given up on this?") make saying no feel safe, which is why they get
answers. Negotiation practice, not measured in outreach.

**Cialdini, and what replicates.** Social proof: the strongest support, and +41% in the 85M emails. Reciprocity:
plausible, no meta-analytic size for messages; in practice it means giving something useful before asking.
Foot-in-the-door and door-in-the-face: real, small (r about .17 and .10). Scarcity and authority as tricks in a
cold message read as manipulation. "But you are free": doubled compliance in a 2013 meta-analysis, no reliable
effect in the low-bias studies of a 2023 preregistered re-analysis; keep the permission line for respect, not
as a lever.

---

## 6. The frameworks, applied to LinkedIn

None has been tested against another. Each is a way to order the measured parts. Examples are in
the linkedin-messages skill, `references/frameworks.md`.

| Framework | Parts | Use it for | Watch out |
|---|---|---|---|
| AIDA (attribution to Lewis 1898 disputed) | Attention, Interest, Desire, Action | Too long for a note; fine as a check on a first DM | Becomes four sentences of pitch |
| PAS | Problem, Agitate, Solution | Problem-aware readers; first DM | "Agitate" in a cold DM reads as fear-mongering: one clause, not a paragraph |
| BAB | Before, After, Bridge | Second or third message, showing a result | Needs a real after, from a real customer |
| 4Ps (Hoke, untraced) | Promise, Picture, Proof, Push | A message carrying a case | Long; cut to Promise and Proof on LinkedIn |
| QVC | Question, Value, Call to action | First DM to a busy reader | Question must be neutral, not leading |
| PPP | Praise, Picture, Push | People who posted something | Praise must be specific and tied, never generic |
| Star-Story-Solution | A person, their story, the fix | Follow-up with a customer story | Story in two lines, not ten |
| Poke the bear (Braun) | A neutral question on the cost of the current way | Unaware or problem-aware readers | Not leading, not a trap |
| Premise first (Holland) | Premise, value mapped on it, one ask | Any first DM with a real premise | Needs a real premise; else use relevance |
| Schwartz awareness | Unaware, problem-aware, solution-aware, product-aware, most aware | Choosing what the opening may say | Most cold readers are unaware or problem-aware: lead with their situation, not your product |

---

## 7. French and English

- **Address form.** French first contact: "vous" by default; "tu" only when the persona and sector make it normal
  (young teams, startups, creative trades) or the person writes "tu" themselves. No data either way; practice in
  every French source. Once they reply in "tu", follow them. The same logic for "Sie"/"du" in German (practice;
  the one voice-note test ran its DACH programmes formally by design, it did not measure address forms).
- **Greeting.** French: "Bonjour Prénom," is the safe opener; "Hello" in French messages reads as startup
  register. English: "Hi Name," or the name alone.
- **French usually runs longer than English** for the same sentence (no measured figure found): the 200-character
  note leaves less room; cut, do not compress into fragments.
- **Typography.** French puts a space before "?" and "!". Never import English idioms literally.
- **The rules on dashes, recited titles and asks are the same in both languages.**

---

## 8. What was corrected in existing material

| Where | Said | Correction |
|---|---|---|
| Common attribution | 3x3 research is Jason Bay's | Steve Richard (Vorsight) |
| Common claim | "A note lowers acceptance" | Pooled 0 to 5 points, not shown within a sender; a note filters toward people who reply |
| Common claim | "Shorter is always better" | A one-sentence first touch replies worst; 3 to 4 sentences best |


## Round 2 additions (2026-10-30)

Full notes: `../practitioners/`. Four changes passed a blind test; three are in the skill:
- **"Not me, ask X" opens a door.** The named colleague gets a first message whose line 1 is the referral in the
  lead's own words: a tie the reader can check (Prospectio test 9: naming a shared colleague, 27.0% to 35.1%
  replies, randomized vendor). Nobody else at that firm.
- **A deferral is not a yes** (Fitzpatrick, *The Mom Test*, Practice): "send me info" or "not now" is answered,
  never counted as interested; no FAB pitch to someone who said later.
- **Tested and reverted: a comment on the user's own post as the top premise** (lost the re-test with isolated
  writers, `../method/README.md` section 7). For someone else's post the topic is the premise, never the
  reaction (Herubel, MimikFlow).
- **AI tells counted after drafting**, in the voice skill (Russell et al. 2025).

Logged, no change: Gong (January 2026) found C-level executives 30.2% less likely to reply to cold email; a
Sales.co analysis claims the opposite. For an executive persona expect fewer replies; never lengthen or add
claims to compensate.
