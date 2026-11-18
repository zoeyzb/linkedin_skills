# Sales and outreach frameworks: what each one says, what it is worth, and what it means for a LinkedIn message

Research pass of 2026-10-29 for the BeReach skill pack. Scope: the sales and prospecting frameworks that shape a
first message and a sequence: SPIN, Challenger, Sandler, Gap Selling, NEPQ, ValueSelling, Command of the Message,
Josh Braun, Sam McKenna, Jason Bay, 30 Minutes to President's Club, Lavender, Becc Holland, signal and trigger
based selling, warm outbound and social selling, multi-channel cadences, and the breakup message.

This folder does not repeat what the sibling folders already hold. Message length, the invitation note, the
personalization types and the CTA data are in `../linkedin-messages/`; cold email rules and deliverability in
`../cold-email/`; who to write to in `../personas/`. Where a number here comes from those folders, it says so.

Files: `evidence.md` (every claim, its source, its rating), `sources.md` (every URL, read in full or only a
summary). Ratings used everywhere here:

| Rating | Means |
|---|---|
| Measured | A study or a large dataset with a stated method. Observational vendor data with a stated sample and method is marked "Measured (vendor, observational)": use the direction, treat the size as a hint. |
| Survey | A stated sample answered questions about themselves. |
| Practice | A named, experienced practitioner's documented method. Nobody measured it. |
| Vendor | A seller's own claim about its own product or method, with no published method. |
| Untraced | Repeated widely; no primary source found, or the source does not say it. |

---

## 0. Summary table

| Framework | Who | The core move | For a LinkedIn first message | Evidence | BeReach tools |
|---|---|---|---|---|---|
| SPIN | Neil Rackham, Huthwaite (1988) | Situation, Problem, Implication, Need-payoff questions; in big sales, closing techniques and product advantages (not benefits tied to a stated need) hurt | One problem the role has, asked as a question; never a pitch, never a meeting ask in message 1 | Measured (35,000 observed calls, 1970s to 80s, by the author's own firm; meeting calls, not messages) | `bereach_brief` for the situation so you never ask it |
| Challenger | Dixon and Adamson, CEB (2011) | Teach something new about their business, tailor it, take control | One insight about their world they may not have, not a compliment | Survey (managers rated reps); peer-reviewed critiques | `bereach_find_signals`, `bereach_find_posts` for the insight |
| Sandler | David Sandler (1967 on) | Up-front contract, pain funnel from broad to personal | A permission line and one pain question; never free consulting in a DM | Practice | `bereach_brief` (history) before every reply |
| Gap Selling | Keenan (2018) | Current state, future state, the gap; the problem identification chart | Name a current-state problem you can see from outside | Practice | `bereach_find_signals` (hiring, raise) as visible current state |
| NEPQ | Jeremy Miner, 7th Level | Neutral tone questions; "safe no" asks ("Would you be opposed to...") | A no-oriented ask with an easy out | Practice; vendor claims only | `bereach_draft_dm` CTA wording |
| ValueSelling | Lloyd Sappington 1991, Julie Thomas | Business issue, problem, value, power, plan | Lead with a business issue the role owns | Vendor (case numbers without method) | `bereach_plan_searches` roles that own the issue |
| Command of the Message | Force Management | Before scenario, negative consequences, after scenario, positive business outcomes, required capabilities, metrics | Write the "before scenario" of the persona in their words | Practice / vendor | persona card, `bereach_draft_dm` |
| Josh Braun | Braun | Poke the bear: a neutral question on the cost of the status quo; permission; detach | One neutral question, no pitch, an easy no | Practice | `bereach_brief`, `bereach_draft_dm` |
| Show Me You Know Me | Sam McKenna | An opening that only this reader would understand | The first line makes sense to nobody else | Practice; her 43% open, 20% reply is self-reported | `bereach_brief` (posts, comments) |
| Jason Bay | Outbound Squad | Relevance over personalization; trigger, problem, proof, ask (REPLY method) | Problem of the role, tied to a trigger | Practice; co-author of the 85M email report (Measured, vendor) | `bereach_add_signals`, `bereach_find_signals` |
| 30MPC | Nick Cegelski, Armand Farrokh | Earn the next 60 seconds; permission or "heard the name" call openers; problem, one-line solution, interest ask | Context first, own that it is cold, one interest ask | Measured (vendor, Gong call data) for calls; Practice for messages | `bereach_find_signals` for the context line |
| Lavender | Will Allred | Observation, connection (insight), credibility, interest question; short, mobile, low grade | 25 to 50 words, observation tied to a problem | Measured (vendor, partly unpublished) | `bereach_brief` for the observation |
| Premise first | Becc Holland | Premise (why you, why now), value mapped on it, short ask; one premise reused across the sequence | Premise is the longest line; never fake one | Practice | `bereach_brief`, `bereach_add_signals` |
| Signal / trigger selling | Craig Elias (trigger events), tool vendors | Write when something changed; be first in the "window of dissatisfaction" | The dated event is the reason to write now | Measured (vendor) for activity premises; Elias's 74% untraced | `bereach_find_signals`, `bereach_add_signals` |
| Warm outbound, social selling | LinkedIn SSI, Morgan Ingram and others | Engage with their content before connecting; build the brand | Reference the thing they wrote or reacted to | Vendor (LinkedIn's own blog, January 2015, no method); Measured (vendor) warm vs cold reply | `bereach_find_posts`, `bereach_collect_engagers` |
| Multi-channel cadences | Holland, 30MPC, tool vendors | Several touches across channels, each with new value | On LinkedIn alone: note or no note, then 3 messages total | Measured (vendor) for LinkedIn sequence length; touch counts untraced | `bereach_connect`, `bereach_status` |
| Breakup message | Braun ("detach"), Voss, 85M report | A last message that makes "no" easy | One or two lines, closes the loop | Measured (vendor, email) | `bereach_send_dm` (follow-up) |

---

## 1. The seven findings that matter most for LinkedIn messages that get answers

1. **Every framework that has data behind it agrees on one move: talk about their problem, not your product.**
   Rackham saw it in observed calls (in large sales, product "advantages" raised objections and closing
   techniques lowered success). The 85M cold email report saw it in replies (pitching cut replies by up to 57%;
   leading with their priorities and problems lifted them 20%). Braun, Keenan, Sandler, NEPQ and Command of the
   Message are all built on it. For a first LinkedIn message: one problem the role has, in their words, and no
   product line, or one at most.

2. **The reason to write is the strongest line, and a dated event or their own activity is the strongest reason.**
   Activity-based personalization replied 24% against 2% for none in the 85M report (vendor, observational, from
   `../linkedin-messages/`); warm messages after engaging with someone's post 13.1% against 3.1% cold (vendor);
   invitation openers that name an existing tie about 2.1 to 2.7x baseline acceptance (Expandi, vendor; the people who
   already follow you or joined your group are self-selected, so part of that is who they are, not the words). Holland's
   premise, McKenna's "show me you know me", Bay's trigger and the signal-selling vendors all describe the same
   thing. In BeReach this is `whyNow` from `bereach_add_signals`, the posts and comments in `bereach_brief`, and
   the dated events of `bereach_find_signals`.

3. **Ask for interest, never for a meeting, in the first message; leave an easy no.** Braun's interest CTAs,
   NEPQ's "Would you be opposed to...", 30MPC's interest-based close, Sandler's permission and Lavender's
   "call to conversation" agree. Measured support is from email: interest CTA about 2x meetings against a time
   ask (Gong, 304K emails), meeting ask -44%, offer +28% (85M report). The permission opener measured 11.18%
   success on cold calls against 2.15% for "Did I catch you at a bad time?" (Gong, 300M calls, vendor). Note the
   one counterpoint: the 85M report found asking about their problem as the CTA itself scored -29%, so a
   poke-the-bear question works as the body, and the ask should still be an easy interest question.

4. **Relevance beats personalization when there is nothing real to personalize.** Holland and Bay draw the line:
   personalization is about the person, relevance is about the role and its situation. Gartner's survey of 632
   B2B buyers: 73% actively avoid suppliers who send irrelevant outreach (Survey). A role-level problem written
   well is better than a fake personal line. Never invent a premise.

5. **Three messages, each with something new, then stop with a breakup.** LinkedIn sequences of three messages
   replied best (9.8%) against 5+ (5.0%) in 2,966 campaigns (Expandi, vendor, observational). Breakup language in
   a late follow-up lifted replies 89% (85M report, email). Holland: reuse one premise but vary the value per
   touch. The often quoted "guilt lines raise replies but cut meetings 14%" (attributed to Gong) was not found at
   any source: drop guilt lines on Braun's grounds, not on that number. Caution: Expandi counts the invitation note
   as message 1 in connector campaigns, so "three" likely means the note plus two messages. No framework measured
   touch spacing on LinkedIn; the widely quoted "8 touches" and "80% need 5 follow-ups" trace to nothing.

6. **The famous frameworks are meeting frameworks, not message frameworks.** SPIN, Sandler, Gap Selling, NEPQ,
   ValueSelling and Command of the Message were built for live discovery conversations. None was tested on a
   written first message. What carries over is one question type (Implication / consequence / poke the bear),
   one stance (problem first, no pitch) and one rule (do not ask for commitment before the need is stated). A
   first DM that runs a full SPIN or pain funnel is an interrogation by text.

7. **Most headline numbers in this field are untraced or self-reported; the honest measure is your own.**
   Challenger's profiles came from managers rating their reps (Survey) and drew peer-reviewed criticism; LinkedIn's
   "SSI leaders get 45% more opportunities" is LinkedIn's own claim (blog, January 2015) with no method; Elias's "74% buy from the
   first to add value" has no traceable study; McKenna's 20% reply is her own. `bereach_status` with
   `connections.trend` gives the acceptance rate with and without a note and the first-message answer rate, week
   by week (null under ten sent). That is the only number about this user's own messages.

---

## 2. SPIN Selling (Neil Rackham, Huthwaite)

**Who.** Neil Rackham led Huthwaite's research: about 35,000 sales calls observed, over 12 years, in 20+ countries,
by a team of about 30 researchers with an initial $1M (Wikipedia); the book's introduction reportedly says
10,000 salespeople in 23 countries (seen only through a search summary). Client firms included Xerox, IBM and
Motorola (Huthwaite blog); Wikipedia says he sought their support, not that they funded it. Book: *SPIN Selling*
(1988). Read: Huthwaite's own blog post by Rackham, the Wikipedia page, and secondary summaries; the book itself
was not read, so its percentages below are from summaries.

**The core moves.** Four question types, in roughly this order:
- **Situation**: facts about their current state. Rackham found successful sellers asked fewer of these; they
  bore buyers.
- **Problem**: difficulties, dissatisfactions. These turn into "implied needs".
- **Implication**: the effects and consequences of the problem. More of these in successful large-sale calls.
- **Need-payoff**: the value of solving it, so the buyer states the benefit ("explicit need") themselves.

Findings attributed to the research (summaries; Measured in origin, but by the method's own owner):
- What works in small sales does not carry over to large ones.
- **Closing techniques** helped slightly on cheap goods and hurt on expensive ones (one summary: 72% to 76% on
  cheap goods, 42% to 33% on expensive ones, from a photo-store study). Unverified against the book.
- **Advantages** (what the product can do, offered against implied needs) are linked to more objections in large
  sales; **benefits** (meeting an explicit need the buyer stated) are linked to success. Objection *prevention*
  beats objection handling.
- Open versus closed questions made no difference.
- The "17% higher sales volume for the first thousand trained, against control groups" appears in the Huthwaite
  interview only as what skeptics say he claims; he does not restate the number, and credits the results to the whole coaching
  programme, not "four little questions" (Huthwaite blog).

**Critique.** The research is the author's own firm, decades old, on face-to-face calls; the original data are
not published. The "top performers ask 10x more need-payoff questions" line in summaries has no baseline.

**For a LinkedIn first message.** Do not ask Situation questions: everything a Situation question would ask
(role, team, stack, hiring) is readable before writing. Use one Problem or Implication thought, never a
product claim (an "advantage" sent cold is exactly what Rackham saw raise objections). Never close in message 1.
A Need-payoff question belongs in a reply, once they have said the problem is real.

**BeReach mapping.** `bereach_brief` (profile, company, posts, signals) replaces Situation questions;
`bereach_draft_dm` carries one Problem or Implication line.

---

## 3. The Challenger Sale (Matthew Dixon and Brent Adamson, CEB, now Gartner)

**Who.** *The Challenger Sale* (2011), from CEB's study of about 6,000 reps at about 90 companies; follow-ups
*The Challenger Customer* (2015, Adamson, Dixon, Spenner, Toman) and HBR "The End of Solution Sales" (2012).

**The core moves.** Five rep profiles (Hard Worker, Challenger, Relationship Builder, Lone Wolf, Reactive Problem
Solver). The Challenger **teaches** (a commercial insight: something new about the customer's business that
leads to your strength), **tailors** (to each stakeholder's priorities) and **takes control** (of the
conversation and of money). The widely repeated figures: Challengers were about 40% of high performers,
Relationship Builders 7% (one secondary summary only, untraced; Challengers more dominant in complex sales). The 2015 book shifts to the buyer side: "Mobilizers"
(Go-Getters, Teachers, Skeptics) move buying groups; sellers who target them are "31% more likely to be high
performers" (Challenger Inc., citing CEB; survey of 700 stakeholders, factor analysis).

**Critique (read: abstract of Inks, Avila, Talbert 2019; titles and summaries of others).** The profiles came
from managers rating their own reps on survey attributes, correlational and self-reported. A 2014 paper in the
*Journal of Personal Selling and Sales Management* ("Salespeople as knowledge brokers: a review and critique of
the Challenger sales model", Rapp, Bachrach, Panagopoulos, Ogilvie) reviewed it critically; Noel Capon's
"Revisiting The Challenger Sale: breakthrough built on a flimsy foundation" (2015) attacks the method; Inks et
al. (2019) defend relationship selling against the book's claim that it fails. Practitioners add a misuse risk:
reps confuse challenging with arguing. None of the critiques could be read in full (paywalled or 403).

**For a LinkedIn first message.** The usable part is "teach": one insight the reader may not have, about their
market or role, that leads toward your problem area. "Take control" does not belong in a cold DM. Tailoring
means the persona card, not a separate framework.

**BeReach mapping.** `bereach_find_signals` (what is happening in their market), `bereach_find_posts` (what
peers are publishing on the topic) give the material for one insight; the persona card in `../personas/`
tailors it.

---

## 4. Sandler (the pain funnel and the up-front contract)

**Who.** David Sandler, Sandler Training (from 1967). Read: Gong's guide to the pain funnel, Sandler franchise
blogs via search summaries.

**The core moves.** Seven steps: bonding and rapport, up-front contract (agree the purpose and the possible
outcomes, "no" included, before talking), pain, budget, decision, fulfilment, post-sell. The **pain funnel**
narrows from broad to personal: "Tell me more about that", "Can you be more specific? Give me an example",
"How long has that been a problem?", "What have you tried?", "What is it costing?", "How do you feel about
that?", "Have you given up trying to deal with this?". Recap their words, then ask for commitment to change.

**For a LinkedIn first message.** The up-front contract becomes a permission line with an explicit easy no
("If it is not a priority, just say so and I will not follow up"). The pain funnel is for a reply, one question
at a time; never stack several in a DM. "Have you given up on...?" is a known breakup line.

**Evidence.** Practice. No published outcome data.

**BeReach mapping.** `bereach_brief` (the conversation, both sides) before each reply, so the next question
follows from what they said; `bereach_send_dm` for the reply.

---

## 5. Gap Selling (Keenan, 2018)

**Who.** Keenan (Jim Keenan), A Sales Growth Company. Read: Gong's guide, HubSpot and other summaries.

**The core moves.** Buyers buy change. Map the **current state** (environment, problem, impact, root cause,
emotion), the **future state**, and the **gap** between them; the bigger the gap, the stronger the motive.
"Never sell to need." Before any outreach, build a **problem identification chart**: each problem you solve, its
impact, its root causes.

**For a LinkedIn first message.** The chart is the useful artefact: it is the list of problems the message can
name. On LinkedIn the current state is partly observable before writing (a hiring post, a new role, a
reorganisation), so the first line can name an observed current-state fact and the problem it usually brings.

**Evidence.** Practice. Gong's "46:54 talk-to-listen for top reps" quoted alongside is Gong's own call data
(vendor), about calls, not messages.

**BeReach mapping.** `bereach_find_signals` (a job opening or a new executive is a visible current state);
the persona card holds the problem identification chart.

---

## 6. NEPQ (Jeremy Miner, 7th Level)

**Who.** Jeremy Miner, founder of 7th Level. Read: a secondary guide (11x) and search summaries; no primary
7th Level material was reachable.

**The core moves.** Neuro-Emotional Persuasion Questioning: six stages, Connecting, Situation, Problem
awareness, Solution awareness, Consequence, Commitment. A neutral, curious tone; the buyer talks most; the seller
does not argue with objections but asks about them. "Safe no" phrasing: "Would you be opposed to...?"; soft
close "How do you feel we should proceed?".

**For a LinkedIn first message.** Take the no-oriented ask ("Would you be opposed to me sending the two-line
version?") and the calm tone. The "neuro" claims and the stage machinery are sales-training marketing.

**Evidence.** Practice; outcome claims are vendor claims. The no-oriented ask has a cousin in Chris Voss's
"Is it a ridiculous idea to...?" and in the "but you are free" literature (see `../linkedin-messages/`, where
its effect is contested).

**BeReach mapping.** CTA wording in `bereach_draft_dm`.

---

## 7. ValueSelling Framework (Lloyd Sappington 1991; Julie Thomas, ValueSelling Associates)

**The core moves.** A qualification and conversation model: the **business issue**, the problems behind it,
the buyer's **vision** of a solution, the **value** (measurable impact), **power** (who really decides) and the
**plan**. Summaries disagree on the exact terms of its "Qualified Prospect Formula". Read: the vendor's home page
(stages Engage, Qualify, Advance, Close; outcome claims of 35%, 10x, 63%, 500% with no method) and an official
slide deck via search summary ("What is the measurable impact of...?", "Does anyone else...?").

**For a LinkedIn first message.** Lead with a business issue the role owns, not a feature. Write to the person
whose issue it is (power), which is a targeting question.

**Evidence.** Vendor for outcomes; Practice for the model.

**BeReach mapping.** `bereach_plan_searches` with the role that owns the issue; `bereach_find_employees` for the
other people in the decision.

---

## 8. Command of the Message (Force Management)

**The core moves.** A value framework sellers learn by heart: **before scenario** (how the buyer works today, in
their words), **negative consequences**, **after scenario**, **positive business outcomes** (PBOs), **required
capabilities**, **metrics**, then differentiators and proof. It maps onto MEDDICC (PBOs and metrics to Metrics,
required capabilities to Decision criteria). Read: Force Management's own blog (value comprehension, value
offering, value engagement; it does not list the components), secondary summaries for the components (which
disagree on the count, six, seven or nine).

**For a LinkedIn first message.** The before scenario and the negative consequence are exactly what a first line
needs: how the role works today and what that costs. Write the persona's before scenario once, then each message
draws one line from it.

**Evidence.** Practice / vendor. No published outcome data.

**BeReach mapping.** The persona card in `../personas/` (the before scenario per role); `bereach_draft_dm`.

---

## 9. Josh Braun (permission-based, problem-centric outreach)

Already covered in depth in `../linkedin-messages/` (15 principles, read in full there). Read here: "Ditch the
pitch, poke the bear" and "Cold email CTAs" on joshbraun.com.

**The core moves.** **Poke the bear**: find something you know that could hurt them and they may not see, and
ask it as a neutral question ("How do you know you're not being overcharged for shipping?"), never a leading one
("If I could show you how to make more money..."). **Permission**: every ask leaves an easy no. **Detach**: no
chasing, no guilt. The 4T structure (Trigger or Truth, Think, Third-party validation, Talk) is credited to him in
secondary sources; it is not on the two joshbraun.com pages read (Untraced). Bad CTAs are time asks; good ones are questions that make them rethink the status quo.

**For a LinkedIn first message.** One neutral question about the cost of their current way. No pitch. A soft
interest close that can be declined.

**Evidence.** Practice. The one measured caution: the 85M report scored "ask about their problem" as the *CTA*
at -29%; use the poke in the body, and close with interest.

**BeReach mapping.** `bereach_brief` for the "what could hurt them"; `bereach_draft_dm`.

---

## 10. Show Me You Know Me (Sam McKenna, #samsales)

**The core moves.** The subject line and opening only this reader would understand (her test: if it would make
sense to anyone else, it is not personal), built from what they have publicly done (posts, press, earnings,
giving). Then a problem seen in their role, an objection answered in advance, and an availability question
("Do you have time over the next week or two?"), never a booking link. Read: a ContentGrip summary of her Apollo
video, the 30MPC podcast transcript summary; her paid material was not reached.

**For a LinkedIn first message.** The test is the useful part: the first line must fail for any other reader.
LinkedIn has no subject line, so the first line does that job. Her availability ask is a meeting ask; the data
in finding 3 argue for an interest ask in message 1 instead.

**Evidence.** Her 43% open and 20% reply rates are self-reported with no sample (Vendor). Practice otherwise.

**BeReach mapping.** `bereach_brief` (their posts, reactions and comments are exactly what this needs).

---

## 11. Jason Bay (Outbound Squad, formerly Blissful Prospecting)

**The core moves.** Relevance over personalization: the message is about a problem the role has and why it is
likely now, not a compliment. His **REPLY Method** is taught in paid material; one show-notes page expands it as
Results, Empathy, Personalization, Laser focus, You (secondary, unconfirmed). Secondary summaries give his email
shape as reason (trigger), problem, proof, ask. He co-authored the 85M cold email report with Gong and 30MPC,
which is the best measured source in the field (pitching -57%, problem-first +20%, solution with social proof
+41%, offer CTA +28%). The "3x3" research habit often credited to him is Steve Richard's (see
`../linkedin-messages/`). A GTMnow episode names his outbound frame as "identify, engage, create" without detail.

**For a LinkedIn first message.** Reason first (a trigger if there is one), then the problem it usually brings,
then one line of proof only if it fits, then an interest ask.

**Evidence.** Practice for the method; Measured (vendor, observational) for the 85M report.

**BeReach mapping.** `bereach_add_signals` (a dated reason per person in the list, shown as `whyNow`),
`bereach_find_signals` (start from the trigger).

---

## 12. 30 Minutes to President's Club (Nick Cegelski and Armand Farrokh)

**The core moves.**
- **Cold call** (their book *Cold Calling Sucks (and That's Why It Works)*, with Gong data): the first 60
  seconds earn the next 60. Openers measured on Gong's 300M+ calls (vendor, no per-opener sample, no definition
  of success): "Heard the name tossed around?" 11.24%, permission-based opener 11.18%, "How's your day going?"
  7.6%, "Did I catch you at a bad time?" 2.15%. The permission opener: context, own that it is a cold call, ask
  for 30 seconds. Research cap: one trigger and a disqualification check, then call.
- **Cold email**: a personalized problem, a one-sentence solution, an interest CTA; plain text; short;
  trigger, tension, trust. Voicemail pointing to a same-day email: 5.87% reply against 2.73% (summary).
- **Sequences**: email, phone and LinkedIn together, each touch raising a different problem; one short bump in
  the same thread; never "any thoughts?" forever.

**For a LinkedIn first message.** The permission opener translates directly: the context (why them), an honest
"we have not met", one problem, an interest ask. The "heard the name" opener translates as social proof from
their peers ("we work with a few [their category] teams on [problem]"), which is a credibility line, not a pitch.

**Evidence.** Measured (vendor, observational) for call openers, with the 0.06-point gap between the top two
meaningless; Practice for messages.

**BeReach mapping.** `bereach_find_signals` for the context line; `bereach_find_employees` for multi-threading.

---

## 13. Lavender (Will Allred)

Covered in `../linkedin-messages/` and `../cold-email/`. Shape: **observation, connection (the insight drawn
from it), credibility, interest question**; 25 to 50 words; mobile first; low reading level; "too much I, not
enough you". Some summaries add the solution line ("above the line" framework: observation, problem,
credibility, solution, call for conversation). Evidence: Measured (vendor) for length and reading level, the
method of several figures unpublished.

**BeReach mapping.** `bereach_brief` for the observation; the voice rules in `../voice/` for reading level.

---

## 14. Premise first (Becc Holland, Flip the Script)

Covered in depth in `../linkedin-messages/`. **Premise** (why you, why now, the longest line), then the value
mapped onto it, then one short ask. Five premise buckets, strongest first: what they wrote, what they engaged
with, how they describe themselves, company news, then other. One premise is reused across the whole sequence,
each touch varying the value. If there is no real premise, fall back to persona relevance; never fake one.
Practice; her headline numbers are anecdotes.

**BeReach mapping.** `bereach_brief` returns the buckets in her order (posts, reactions and comments, profile,
company, dated signals); `bereach_add_signals` finds a premise for a whole list.

---

## 15. Signal-based and trigger-based selling

**Who.** Craig Elias (*Shift!*, trigger event selling: the "window of dissatisfaction", the period after a
trigger when a buyer knows the current way no longer works but has not started looking); the signal-tool
vendors; Kyle Coleman's signal-tied "micro campaigns"; Bay and Holland's "why now".

**The core moves.** Watch for events (new executive, new role, funding, hiring for a function, a post about the
problem, a reorganisation, a tool change) and write while the event is fresh, naming it. Be first in.

**Evidence.**
- Measured (vendor, observational): activity-based personalization 24% reply against 2% none, company-based 9%
  (85M report, via `../linkedin-messages/`).
- Vendor: signal tools report 6 to 20% replies against 1 to 2% generic, and "18% against 3.4%" (cited third
  hand). No method.
- Untraced: Elias's "74%" slide (attributed to a 2012 Forrester study that does not say what the 74% measures)
  and "10 times more likely to buy" in the window. The idea is sound; the numbers are not citable.
- Caution: the event must be the reader's, recent, and tied to a problem. A funding round named with no "so
  what" is the same failure as a pasted job title (see `../linkedin-messages/` finding 1).

**For a LinkedIn first message.** The dated event is the first line; the problem it usually brings is the
second; the ask the third. Give the date in your head, not necessarily in the text ("saw you are hiring two SDRs"
is enough).

**Round 2 (2026-10-30), more untraced figures.** UserGems "new executives 5 to 10x likelier to evaluate vendors
in their first 90 days" (not found at source), "70% of budget spent in the first 100 days", "job-change outreach
replies 3 to 5x", Gojiberry "15% to 45% with personalisation" and "Tuesday is best", Formula Agents "x100
replies within 5 minutes". The vendors' recommended windows contradict each other (act within 7 days, 14, days
21 to 60, or 30 to 90). A dated signal is a reason to write, never a schedule. Pierre Herubel ranks engaged
signals (a visit, a comment, a download) above external events (a hire, funding), Practice; see
`../practitioners/`.

**BeReach mapping.** `bereach_find_signals` (mode events, then resolve: dated events, then the people to reach
at those companies), `bereach_add_signals` (a dated reason for each person already in a list, as `whyNow`),
`bereach_brief` (signals for one person). Note the connector's own caveat: a very recent job move can be missing,
so check the profile before naming a new role.

---

## 16. Warm outbound and social selling

**Who.** LinkedIn's Social Selling Index (SSI, 2014: four pillars of 25 points each, professional brand, finding
the right people, engaging with insights, building relationships); practitioners such as Morgan Ingram (comment
before you message, wait a few days after the accept).

**Evidence.**
- Vendor: "SSI leaders have 45% more opportunities per quarter and are 51% more likely to hit quota than SSI
  laggards" (LinkedIn's own blog, January 2015, no method or sample). The "78% of social sellers outsell" figure
  circulates without a primary source: Untraced.
- Measured (vendor, observational): messages to people after engaging with their post 13.1% reply against 3.1%
  cold (Fuzzy AI, 10,000 messages, via `../linkedin-messages/`); invitation openers that name an existing tie
  ("thanks for the follow" 81.1%, "thanks for joining my group" 63.6%) against a 30.2% baseline (Expandi, 240
  campaigns; the best rows of a ranking, from people who already follow you or joined your group);
  messages to existing connections 16.86% reply (Expandi H1 2026).
- Vendor / untraced: "a profile view 2 to 5 days before lifts acceptance 21%", "like before DM +39%", "3x
  acceptance after a warm-up" have no method. Expandi itself recommends warm-up steps but publishes no warm-up
  comparison. Its H1 report's "Builder" campaigns (warm-up steps plus outreach) got 22% acceptance against the H2
  platform average of 28.5%: different periods, no matched comparison, so this shows no gain, not a loss.

So: a real existing tie (they follow you, they joined your group, you engaged with their post) is measured to help, observationally;
mechanical warm-ups (a profile visit, a like) are not measured. A people list built from engagement is warm by
construction.

**For a LinkedIn first message.** Start from people who already showed interest in the topic (they reacted to
or commented on a relevant post), and name that ("saw your comment on X's post about Y"). Do not invent
engagement that did not happen.

**Round 2 (2026-10-30).** Pierre Herubel (content creator; he says outbound is not his specialty): the
engagers of your content are the list; the topic they engaged with is the angle, not the fact that they engaged;
ask before sending an asset; one front-end offer; follow-ups reuse the trigger, never "just checking in"
(Practice). MimikFlow measured engagers of posts on the user's topic at 58% acceptance and 47% replies against
31% and 21% from its other sources (vendor, 32 accounts, selection not controlled). Gojiberry names
competitors' and peers' employees' posts as the source (Practice). The pack tested putting a comment on the
user's own post first and reverted it (`../method/README.md` section 7); for someone else's post the topic, not
the reaction, is the premise, never "I saw you liked X's post". No study isolates a comment before outreach as the variable:
the Fuzzy AI "42% vs 9%" has no sample. Full notes: `../practitioners/`.

**BeReach mapping.** `bereach_find_posts` (posts on the topic, by role or company), then
`bereach_collect_engagers` (the people who reacted or commented, with what they wrote) gives a warm list with a
premise per person; `bereach_brief` reads their reactions and comments.

---

## 17. Multi-channel cadences (touch count, spacing)

**What practitioners say.** Holland: 16 touches over about 21 business days across email, phone and social, with
three premises. 30MPC: each touch raises a different problem. Vendors: 5 to 7, 8 to 12, 10 to 14 touches;
3 to 4 days apart; enterprise 18 to 24. All Practice or Vendor.

**What is measured.** On LinkedIn only: three messages replied best, five or more worst (Expandi, 2,966
campaigns, observational, confounded by campaign quality); the second message replies most per send. Email
replies keep coming up to about six emails over 14 to 28 days and then drop below 0.5% (85M report). Expandi counts
the invitation note as message 1 in connector campaigns, so its "three" likely means note plus two messages. The
widely quoted Gong figures "reply rates fall with each extra touch" and "guilt lines lift replies but cut
meetings 14%" are not on the Gong page cited: Untraced. Multi-channel meeting-rate figures
(0.8% email only up to 8.3% with four channels) were not found at the cited vendor page: Untraced.

**For LinkedIn.** Invitation (note or none, see `../linkedin-messages/`), first message after the accept, two
follow-ups each bringing something new (a different angle, a resource, a peer example), the last one a breakup.
Three messages in all, or two after a note if you send one (Expandi's count includes the note). Spacing is unmeasured: practitioners say a few days to a week between messages.

**BeReach mapping.** `bereach_connect` (all invitations in one call, optional note), `bereach_draft_dm` (first
message), `bereach_send_dm` (follow-ups and replies), `bereach_status` (what is going out, `connections.trend`
for the rates).

---

## 18. The breakup message

**The core moves.** A last, short message that gives permission to say no and closes the loop: Braun's
"detach", Voss's "Have you given up on...?", Sandler's "Have you given up trying to deal with this?". It works
because it lowers the cost of answering.

**Evidence.** Breakup language in a late follow-up: +89% reply (85M report, email, Measured vendor). Bumps of one
sentence about 2x five sentences. Case-study language in a bump -47%.

**For LinkedIn.** Message three: one or two lines, no guilt, no "just checking in", an easy no ("If this is not a
priority, no problem, I will leave it here").

---

## 19. Putting it together: one first message, built from what survives

What the frameworks agree on, in the order a LinkedIn first message reads (Practice; each part's measured support
noted):

1. **Reason (one line, the longest).** A dated event or their own activity (Holland, Bay, signals; activity
   24% vs none 2%, vendor). Fails for any other reader (McKenna). Never a title alone.
2. **Problem (one line).** What that event or that role usually brings, in their words (SPIN implication,
   Gap current state, CotM before scenario, Braun's poke as a statement or neutral question; problem-first +20%,
   pitching -57%, vendor).
3. **Credibility (optional, one clause).** Peers who had the same problem (30MPC "heard the name", Lavender
   credibility; social proof +41% when explaining the solution, vendor). Not a case study dump.
4. **Ask (one line).** Interest, with an easy no (Braun, NEPQ, Sandler; interest 2x meetings vs time ask,
   meeting ask -44%, vendor email data).

What to drop from the meeting frameworks: Situation questions (read them instead), stacked pain questions,
product advantages, any close, "take control".

---

## 20. Tool map

| Step | Framework source | BeReach connector tool |
|---|---|---|
| Find people with a reason to talk now | Signals, Elias, Bay, Coleman | `bereach_find_signals` (events, then resolve) |
| Give a whole list a dated reason | Holland premise, Bay trigger | `bereach_add_signals` (`whyNow` on contacts) |
| Find people already warm on the topic | Social selling, warm outbound | `bereach_find_posts`, then `bereach_collect_engagers` |
| Read one person before writing | SPIN situation, Gap current state, McKenna, Holland buckets | `bereach_brief` |
| Invite | Note as filter (see `../linkedin-messages/`) | `bereach_connect` (one call for all; LinkedIn's limit is 200, write to 200) |
| Write the first message | All of section 19 | `bereach_draft_dm`, then `bereach_approve_drafts` |
| Follow up, break up | Braun detach, Holland vary the value, Expandi 3 messages | `bereach_brief` then `bereach_send_dm` |
| Measure | the only honest number | `bereach_status`, `connections.trend` (invitations with and without note, first messages answered, by week and day; rate null under ten sent) |

---

## 21. What was not found, and what is not carried

- Rackham's own percentages were not read in the book; they come from summaries.
- The Challenger critiques (JPSSM 2014, Capon 2015) could not be read past their titles or abstracts.
- NEPQ, ValueSelling and Command of the Message primary materials are paid; descriptions come from secondary
  guides that disagree on details.
- Jason Bay's REPLY Method steps are not public in text.
- Round 2 (2026-10-30): Jed Mahrle's frameworks are paywalled, unread. Pierre Herubel's "LinkedIn Social Selling
  Workflow" is paywalled, unread.
- Round 2, checked and not carried: April Dunford's *Sales Pitch* (2023) orders a meeting pitch (insight,
  alternatives, perfect world, product, proof, ask); in a DM only the insight step fits and the premise line is
  it; her alternatives are the persona card's "Today they use". Sam Nelson's Agoge Sequence (about 6 to 15
  goal-tagged touches across email, call and LinkedIn; its source repeats "80% need five follow-ups"). Voss
  labels and the accusation audit for objection replies: Practice, and the study cited for labels (Lieberman
  2007) measured self-labelling of faces, not labelling another person in text; the measured backing for the
  pack's reply rule is conversational receptiveness (Yeomans et al. 2020, see `../behavioural-science/`).
  Fitzpatrick's *Mom Test* is a discovery rule; its one carry-over is that "send me info" or "maybe later" is not
  a yes (now in the pack).
- Not carried: "78% of social sellers outsell", Elias's "74%", "80% of sales need five follow-ups", "it takes 8
  touches", multi-channel meeting-rate tables, warm-up uplift percentages, McKenna's 20% reply as a benchmark.
