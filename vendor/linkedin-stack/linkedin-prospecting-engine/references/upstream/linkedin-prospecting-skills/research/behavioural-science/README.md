# Behavioural science behind outreach messages, and what survived replication

Research pass of 2026-10-29 for the BeReach skill pack. Scope: the persuasion and social psychology effects that
outreach advice leans on (mostly Cialdini's six principles plus a handful of named studies), the original study
behind each, what happened when someone tried to repeat it, and what that leaves for a LinkedIn first message.

Why it was done: `linkedin-messages/` and `cold-email/` cite these effects in a line each ("social proof
replicates well", "name personalisation works through attention"). This folder checks each one against its
replication record, so the skills only lean on effects that still stand, and say so when they do not.

Files: `evidence.md` (every claim, its source, its rating), `sources.md` (every URL, read in full or only a
summary). Ratings used here, same scale as the other folders:

- **Measured**: a study or large dataset with a stated method (peer reviewed experiment, field experiment,
  meta-analysis).
- **Survey**: stated sample, self reported.
- **Practice**: experienced practitioners' method; nobody measured it.
- **Vendor**: a seller's own data.
- **Untraced**: repeated widely, no source found or the source does not say it.

A Measured claim can still be wrong: the replication column is the point of this folder.

---

## 0. The one thing to know before reading any persuasion claim

Published effect sizes in this field are inflated, often by a lot.

- DellaVigna and Linos (2022, Econometrica) compared 126 trials run by two US government nudge units (23 million
  people, every trial reported, published or not) with nudges published in academic journals. The nudge units'
  average effect was 1.4 percentage points (an 8.0% lift); the journals' was 8.7 points (33.4%). About 70% of the
  gap is explained by selective publication plus small samples. Measured.
- Maier et al. (2022, PNAS) re-analysed the largest nudge meta-analysis (Mertens et al., pooled d = 0.43) with
  a correction for publication bias and concluded that no evidence remains that nudges work. The published title
  is unchanged; in their rejoinder the authors only said that, with hindsight, they would have written "no
  overall evidence", since some domains may still work. Measured, contested.

What this means for messages: when a classic study says a word or a trick lifts compliance by 30 to 60%,
expect a few percent in the field, or nothing. No single sentence trick will rescue a message to the wrong
person. Relevance and the reason for writing do the heavy lifting (see `linkedin-messages/`); the effects below
are adjustments, not engines.

---

## 1. Summary table

| Effect | Original study | Replication status | Use in a LinkedIn first message |
|---|---|---|---|
| Reciprocity, the free gift | Regan 1971 (a Coke doubled raffle ticket buying); Falk 2007 (gifts in 10,000 charity letters: +17% small gift, +75% large) | Holds. Field experiments and a Cochrane review of survey mail agree (money with the questionnaire OR 1.87; an incentive sent up front beat one promised on reply, OR 1.61) | Strong, when the gift is useful to them and has no strings. Give first, ask small |
| Commitment, small yes (foot in the door) | Freedman and Fraser 1966 | Real but small (meta-analyses r around .1 to .2); a direct replication found it in Ukraine but not Poland in 2003, and in neither in 2013 (Gamian-Wilk and Dolinski, published 2019) | Weak. A low-effort question is good for reply rates for other reasons; do not build a "yes ladder" |
| "But you are free" | Gueguen and Pascual 2000; Carpenter 2013 meta-analysis (compliance about doubled) | Failed. 2023 preregistered re-analysis of 52 studies: g = 0.44 overall, but g = 0.11 (not significant) in the 7 low-bias studies; strongest face to face | Keep a soft exit for respect and tone, not as a lever |
| Door in the face (big ask, then smaller) | Cialdini et al. 1975 | Works on saying yes; on actual behaviour small at best (r = .126 per the lead author, reported as not reliable in the press release; Feeley et al. 2012) | Do not use. A big first ask in a cold message just ends the thread |
| Curiosity gap | Loewenstein 1994 (a theory and review, not an experiment) | No clean test for messages. Question and forward-reference headlines did not beat plain ones in a news experiment and were rated less credible | Do not tease. Name the specific thing; curiosity comes from a specific, relevant fact |
| Specificity, concreteness | Packard and Berger 2021 (1,000+ service calls, emails: concrete words raised satisfaction and spend) | Observational plus lab experiments in one paper; consistent with older concreteness work; no independent replication found | Strong. Specific nouns and numbers signal you listened |
| Social proof | Goldstein, Cialdini, Griskevicius 2008 (hotel towels: "most guests reuse" beat the green appeal) | Mixed. German replication (928 guests) found no edge over the standard appeal; publication bias inflates the norm literature | One relevant peer, never a crowd. Never say "everyone in your sector struggles with X" |
| Social proof backfire | Cialdini et al. 2006 (Petrified Forest: "many visitors took wood" sign had 7.92% theft, the most of four signs, vs 1.67% for the "please don't remove" sign; no no-sign control); Schultz et al. 2007 (energy boomerang) | Both published field studies; the boomerang has repeated in later norm work | Never normalise the bad thing ("most teams never reply to recruiters either") |
| Authority | Milgram line; Pornpitakpan 2004 review of five decades of source credibility | Credibility usually helps, but not always (interactions in which it hurts) | One line of earned relevance, not titles. Credentials up front read as a pitch |
| Liking, similarity | Burger et al. 2004 (shared birthday or first name raised compliance); Garner 2005 (similar sender name on survey cover letters) | No direct replication found for either; a rare, real similarity works, a common one does not (Burger's own boundary) | Use a real shared ground only if it is rare and true. Never a manufactured one |
| Asking questions, liking | Huang et al. 2017 (more questions, especially follow-ups, raised liking; speed dates) | Several studies in one paper, causal test included; speed dating analysis contested by a 2019 reanalysis; independent replication not found | One genuine question about their work beats a statement about yours |
| Reaching out is welcome | Liu, Rim, Min, Min 2022 (senders underestimate how much a surprise contact is appreciated) | Preregistered series in one paper; friends and acquaintances, not strangers or sales | Write with confidence and cut the apologies; press coverage (not the paper) says the authors advise against adding a favour request |
| Scarcity | Worchel 1975 (cookies from a near empty jar rated better); Lynn 1991 meta-analysis r = .12 | Small, heterogeneous. The separate "scarcity mindset" literature replicated badly (4 of 20 studies, O'Donnell 2021) | Do not use. A fake deadline in a cold message reads as a tactic |
| The "because" effect | Langer, Blank, Chanowitz 1978 (copier: 60% no reason, 93% placebic, 94% real reason, small favour only) | Fragile. For the large favour the placebic reason did nothing (24% vs 24%). Folkes 1985 failed to replicate. No preregistered replication found | Give a real reason. "Because" with no content only works for trivial requests, which a cold message is not |
| Name personalisation | Sahni, Wheeler, Chintagunta 2018 (name in subject: opens +20%, leads +31%) | Not repeated in one small 2023 test: Defau and Zauner found no first name effect on about 3,500 students; the surname lift came from a separate sample of local politicians, so it is not a head to head comparison | A first name is table stakes, not a lever. Personalise with a fact only a reader of their page would know |
| Effort heuristic | Kruger et al. 2004 (more time spent means higher rated quality) | Mixed: Ziano et al. 2023, two preregistered replications (N = 1,405): one study held, one failed | Visible effort reads as respect, but it has to be real effort the reader can see (a detail from their post) |
| Processing fluency | Oppenheimer 2006 (needlessly complex words made writers seem less intelligent); fluency research in general | The general fluency and truth effect holds in meta-analysis; this specific vocabulary study has no replication found. The disfluent font claim (Alter 2007) failed | Short, common words. Write to be read on a phone in five seconds |
| Loss aversion | Kahneman and Tversky 1979 | Prospect theory patterns replicate (Ruggeri 2020, 19 countries, 94% of items). But loss aversion for small stakes is contested, and loss framed messages do not reliably beat gain framed ones (O'Keefe and Jensen meta-analyses) | Do not frame a first message as a threat. Name their goal; the gain frame is no worse and reads friendlier |
| Trust cost of suspected AI writing | Jakesch et al. 2019 (CHI, 527+ people): profiles suspected of AI were trusted less, but only in a mixed world | Holds and extends: Jakesch 2023 (PNAS, 4,600 people) found people cannot detect AI text and use wrong cues; disclosed AI lowers perceived effort and sincerity (Zhu and Molnar 2026, 1,300+ people) | The penalty hits text that looks generic or machine made. Generic is the tell, not the tool |

---

## 2. Reciprocity and the free gift

**Original.** Regan (1971): a confederate brought some participants an unrequested Coke during a break, then
asked them to buy raffle tickets. Those who got the Coke bought about twice as many tickets, worth more than the
drink. Sources disagree on whether liking mattered; the favour worked either way in most accounts. Only
summaries read.

**The best field evidence.** Falk (2007, Econometrica): about 10,000 solicitation letters from a charity, split
three ways at random. No gift, a small gift, a large gift (postcards, as commonly reported; the gift itself was
not confirmed at source). Donations became 17% more frequent with the small gift and 75% more frequent with the
large one, and the gifts paid for themselves. Abstract and summary read.

**The largest pooled evidence.** Edwards et al. (Cochrane review, 2009, 481 postal trials) on survey mail: a
money incentive raised the odds of response (odds ratio 1.87, 95% CI 1.73 to 2.04), and an incentive sent with
the questionnaire, not conditional on replying, beat one promised on return (1.61, 95% CI 1.36 to 1.89). The
1.61 compares two incentives, not a gift against nothing; the comparator was read in citing studies, the
abstract does not state it. That up front beats promised is the purest reciprocity result here. Summary read. This is the closest thing to "a cold request with a gift"
that has been measured at scale, and it holds.

**Replication status.** Holds. Several independent designs (lab, charity field, hundreds of survey trials) point
the same way. The size depends on the gift's value to the reader.

**What it means on LinkedIn.** The gift is something useful to this person, given before any ask, with no
strings: a finding, a short teardown, a list, an introduction. Not a discount, not "a free demo" (that is an
ask dressed as a gift). Keep the ask after a gift tiny: a heavy request turns the gift into a bribe (practice;
see also the Liu et al. note in section 9).

> Saw your post on onboarding drop-off. We ran the same numbers on 40 SaaS trials last quarter and the step that
> lost most people was the invite screen, not the signup. Happy to send the breakdown if useful.

## 3. Commitment and small yes questions

**Original.** Freedman and Fraser (1966): people who first agreed to a small request (a small sign) were far
more likely to accept a large one (a big billboard in the front yard).

**Replication status.** Real but small and fragile. Three meta-analyses (Beaman 1983, Dillard 1984, and others
summarised in Burger 1999) find small effects (around r = .1 to .2 in secondary summaries; the exact figures
could not be read at source). A direct replication of the original (Gamian-Wilk and Dolinski, Psychological
Reports, published 2019) found it in Ukraine but not Poland in 2003, and insignificant in both countries in 2013. The original effect size has never been reached again.

**"But you are free".** Carpenter (2013) found that ending a request with "but you are free to accept or
refuse" about doubled compliance. A preregistered re-analysis of 52 experiments (Fillon et al. 2023, Meta-
Psychology) found g = 0.44 overall, but only 7 studies were at low risk of bias and their pooled effect was
g = 0.11, not significant; the expected discovery rate was 6%. Face to face requests carried most of the effect.
Abstract page read.

**Door in the face.** Feeley, Anker and Aloe (2012, Communication Monographs), a meta-analysis of the studies
since 1975: a significant effect on saying yes; on doing it, the lead author put the correlation at .126, a small
effect, and the university release headlines it as no behavioural compliance. Press release and abstract read.

**What it means on LinkedIn.** The useful part is not the commitment mechanism, it is the low cost of saying
yes. An interest question ("worth a look?") gets more replies than a meeting ask, and that is measured in sales
data (see `linkedin-messages/` section 1, point 5). Do not design a ladder of small yeses, and do not count on a
permission line to lift replies. Keep it because it respects the reader.

> No pressure either way: would a two-line summary be useful, or not your area?

## 4. Curiosity gap

**Original.** Loewenstein (1994) is a review and a theory: curiosity rises when attention falls on a gap between
what someone knows and wants to know, and it fades if the gap is too large or too small. Not an experiment on
messages.

**What was tested.** In a news headline experiment (reported by KQED), plain headlines, forward-reference
headlines ("this one change...") and question headlines did not differ in reading intentions, and question
headlines were rated less credible and more often taken for fake news. Large A/B archives of headlines
(Upworthy, 22,743 tests, Robertson et al. 2023) found negative words, not curiosity, drove clicks. Summaries read.

**Replication status.** The theory is widely cited; no clean, replicated test shows that a curiosity gap lifts
replies to a personal message. Untraced as a message tactic.

**What it means on LinkedIn.** A tease ("I noticed something about your funnel...") reads as a sales hook and
costs credibility, which a cold message cannot afford. The curiosity that works is a specific, true fact the
reader did not know about their own world. Say the thing; the open question is what happens next.

> Your careers page lists 6 SDR roles in Lyon, and none mention French. Is the team selling in English?

## 5. Specificity and concreteness

**Original.** Packard and Berger (2021, Journal of Consumer Research): over 1,000 customer service interactions
at two companies, and an email dataset from a retailer. Agents who used concrete words ("these jeans" rather
than "it") got higher satisfaction and more later purchases, after controlling for 30 other factors; lab
experiments in the same paper point to perceived listening as the cause. Summaries and press read; the figures
of +9% satisfaction and +13% purchase intention come from a secondary write-up.

**Replication status.** No independent replication found. The direction agrees with older work that concrete
statements are judged more true (Hansen and Wanke 2010, not read here) and with every practitioner source in
`linkedin-messages/`.

**What it means on LinkedIn.** Concrete is the proof you looked. Swap every "your company", "your team",
"solutions" for the noun, the number, the place.

> Weak: "I help companies like yours improve their sales process."
> Concrete: "Your three new AE hires in Berlin start in November; the first 60 days is where most ramp time is lost."

## 6. Social proof, and when it backfires

**Original.** Goldstein, Cialdini and Griskevicius (2008): in a US hotel, a card saying most guests reused their
towels raised reuse over the standard environmental card, 35.1% to 44.1% (1,058 instances; figures as reported
by Bohner and Schluter 2014, the original not read at source).

**Replication status.** Mixed. Bohner and Schluter (2014, PLoS ONE), two German hotels, 928 guests (724 and 204): both cards
raised reuse over no card, but the norm card did no better than the standard one. Schultz et al. (2008) in a US
resort: only the general norm worked, not the "same room" norm the original made famous. The wider norm and
nudge literature is inflated by publication bias (section 0). The `linkedin-messages/` claim that social proof
"replicates well" should be softened to "has the most support among Cialdini's levers, with small and uneven
field effects".

**The backfire, read at source.** Cialdini et al. (2006, Social Influence), Petrified Forest National Park, 2,655
visitors; the unit counted was 1,140 marked pieces of wood, of which the share stolen is the measure. Four signs,
no no-sign control. The sign stressing that many past visitors took wood (descriptive norm) produced 7.92% theft,
against 4.00% for the other three signs combined (significant); the sign asking visitors not to remove wood, with
a picture of one person doing it crossed out (injunctive), produced 1.67%. The direct contrast with the positive
descriptive sign ("the vast majority left the wood", 5.00%) was in the expected direction but not significant. Schultz et al. (2007, 290 households): telling low energy users they used less than average made them use
more, unless a smiley approval cue was added.

**What it means on LinkedIn.** One named or described peer like them, with a result, beats a crowd count. Never
normalise the problem you want them to fix ("most CFOs never look at this" tells the reader it is normal not to).

> Weak: "Hundreds of companies trust us."
> Better: "A 40-person logistics firm in Lille cut their quote turnaround from 3 days to 1 with this."

## 7. Authority

**Original.** The obedience work (Milgram) is about orders, not persuasion; the relevant evidence is source
credibility. Pornpitakpan (2004) reviewed five decades: a high credibility source usually persuades more, but a
set of interaction studies shows conditions where it does not or hurts (summary read).

**Replication status.** The main effect is broadly supported; no meta-analytic size for cold messages.

**What it means on LinkedIn.** The credible thing is relevance shown, not status claimed. A title or an award in
a first message reads as a pitch. One line that shows you know their field does the authority work.

> "I ran ops at a 3PL for six years" (one clause, only if it explains why you are writing) beats a signature
> block of credentials.

## 8. Liking and similarity (shared ground)

**Original.** Burger et al. (2004, PSPB, four studies): people who thought they shared a birthday, a first name
or a fingerprint type with the requester complied more. Compliance did not rise when the shared feature was
common. Garner (2005): survey cover letters signed by a name similar to the recipient's were returned more often
(the exact figures differ between secondary sources). Abstracts and summaries read.

**Questions and responsiveness.** Huang et al. (2017, JPSP): people who asked more questions, especially follow
up questions, were liked more, in chats and in speed dating, with an experiment that varied the number of
questions. People did not predict this.

**Replication status.** No direct replication found for Burger 2004 or Garner 2005; a 2013 study (Social
Behavior and Personality) reused Burger's shared birthday manipulation and found more answers to an intimate
survey, a conceptual extension. Huang et al. is several studies in one paper; its speed dating analysis was
challenged by a reanalysis (Kluger and Malloy 2019), the authors replied (Yeomans et al. 2019), and the paper
carries a correction for minor reporting errors. Treat as Measured, unreplicated, Huang contested.

**What it means on LinkedIn.** A shared ground works only if it is rare and real: the same small former
employer, the same niche event, the same uncommon background. "We are both in sales" is common and does
nothing. Invented shared ground is the fastest way to look like a template. A real question about their work is
the most reliable liking move available in text.

> We both did the Lyon logistics meetup in March. Did the panel on cross-border VAT change how you quote?

## 9. Reaching out is welcome (the sender's fear)

**Original.** Liu, Rim, Min and Min (JPSP, online 2022, print 2023; 13 experiments, over 5,900 people per press summaries): senders underestimated how much recipients
appreciated a short, unexpected contact; the gap grew with surprise and social distance. Abstract read.

**Replication status.** Consistent across the paper's own studies; tested with friends and acquaintances, not
cold sales.

**What it means on LinkedIn.** Confidence, not a tactic: a short, genuine message to someone you have not met
is received better than the writer fears, so cut the apologies ("sorry to bother you"). Press coverage of the study
reports the authors advising against adding a favour request to such a contact (not found in the abstract), which
fits section 2: the first message gives, the ask is tiny.

## 10. Scarcity

**Original.** Worchel, Lee and Adewole (1975): cookies from a nearly empty jar were rated more desirable. Lynn
(1991) meta-analysed the commodity theory studies: r = .12 on perceived value, with large unexplained variation
between studies (as reported by later papers).

**Replication status.** Small and uneven. The separate "scarcity mindset" literature (being poor or short of time
changes thinking) replicated badly: 4 of 20 studies significant in O'Donnell et al. (2021, PNAS), six in the
opposite direction.

**What it means on LinkedIn.** Do not use. A first message from a stranger has no credible scarcity, and "only 3
spots left this month" signals a sequence template. The only honest scarcity is a real, external date that
matters to them ("the tender closes on the 15th").

## 11. The "because" effect

**Original.** Langer, Blank and Chanowitz (1978, JPSP), 120 people at a library copier. Small favour (5 pages):
no reason 60%, placebic reason ("because I have to make copies") 93%, real reason ("because I'm in a rush") 94%.
Large favour (20 pages): no reason about 24%, placebic about 24%, real reason about 42%. Figures read in a
secondary source reconstructing Table 1.

**Replication status.** Fragile. The original itself shows the empty "because" works only for a trivial request.
Folkes (1985, JPSP, four studies) failed to replicate the placebic effect and found that the kind of reason
(controllable or not) mattered. One later individual differences study reports replicating it. No preregistered
replication was found. The common sales claim "always say because" has no commercial test behind it.

**What it means on LinkedIn.** A cold first message is never a trivial request for the reader, so a reason must
carry real content. The finding that survives is the large favour column: a real reason nearly doubled
compliance. State why you are writing to this person, now.

> Weak: "Reaching out because I wanted to connect."
> Real reason: "Writing because you just opened a second warehouse, and that is when pick errors usually double."

## 12. Name personalisation

**Original.** Sahni, Wheeler and Chintagunta (2018, Marketing Science): randomised email field experiments,
millions of recipients. The recipient's name in the subject line raised opens from 9.05% to 10.80% (+20%), leads
from 0.39% to 0.51% (+31%), and cut unsubscribes from 1.2% to 1.0%. They attributed it to attention, not
information.

**Replication status.** Not repeated, in one small test. Defau and Zauner (2023, Marketing Letters) found no
indication that a first name in the subject line raised opens or clicks; per a secondary summary that test ran on
about 3,500 university students (56.9% opens with the name, 58.5% without). The surname result (abstract: higher
opens and clicks) comes from a separate sample of about 3,700 local politicians (38.8% against 34.7% opens), so
it does not show that a surname beats a first name. The authors' reading is that the tactic is now everywhere.
Abstract read; sample figures from a secondary summary. One study on two narrow audiences: it weakens Sahni,
it does not overturn it.

**What it means on LinkedIn.** The platform shows the name already, and every automated message uses it. The
first name is politeness, not a lever. The attention effect now comes from what was never templated: a detail
only someone who read their page or post would know. The `linkedin-messages/` claim that the 2018 result
"explains why personalisation matters" holds for the mechanism (novelty grabs attention) but the name itself
has worn out.

## 13. Effort heuristic

**Original.** Kruger, Wirtz, Van Boven and Altermatt (2004): poems and paintings described as taking longer to
make were rated better and worth more.

**Replication status.** Mixed. Ziano et al. (2023, Collabra, two preregistered replications, N = 1,405): one of
the two original experiments replicated, the other did not; a revised version moved liking and quality but not
monetary value. Abstract read.

**What it means on LinkedIn.** Readers infer effort from what they can check: a detail from their post, the name
of their product, a number from their page. Effort they cannot see earns nothing. This is also the reason the
AI penalty (section 16) hits generic text: generic text signals no effort.

## 14. Processing fluency (short, simple words)

**Original.** Oppenheimer (2006, Applied Cognitive Psychology): needlessly complex vocabulary made writers seem
less intelligent. Broader fluency work: easy-to-process statements are judged more true and more likeable.

**Replication status.** The general fluency and truth effect is well supported by meta-analysis (not read here).
No replication of the 2006 vocabulary study was found, positive or negative. A related famous claim, that hard to
read fonts make people think harder (Alter et al. 2007), failed: Meyer et al. (2015) pooled the original with many
replications and found no effect under any condition.

**What it means on LinkedIn.** Short common words, short sentences, one idea each. No jargon ("leverage",
"synergies", "solutions"); the sales data in `linkedin-messages/` agrees (buzzwords lowered reply rates). Do not
make text hard on purpose to look clever or to slow the reader down.

## 15. Loss aversion in B2B

**Original.** Kahneman and Tversky (1979): losses weigh more than equal gains.

**Replication status.** The prospect theory choice patterns replicate well: Ruggeri et al. (2020, Nature Human
Behaviour), 4,098 people in 19 countries, 94% of items and 12 of 13 contrasts replicated, somewhat weaker than
1979. But two cracks matter for messages. First, loss aversion for small, everyday stakes is contested (Gal and
Rucker 2018; Mrkva et al. 2020 say it exists and shrinks with expertise; Zeif and Yechiam 2022 found little when
the task was made symmetric). Second, framing a message as a loss does not reliably persuade more: O'Keefe and
Jensen's meta-analyses (93 studies on prevention, 53 on detection) found at most small differences either way,
mostly none.

**What it means on LinkedIn.** "You are losing X every month" is a threat from a stranger and the evidence does not
say it works better. Mrkva's expertise finding cuts against it too: professionals who know their numbers are less
loss averse on exactly those numbers. Name the outcome they want; keep any loss factual and theirs ("the two
deals that slipped last quarter" only if they said so publicly).

## 16. The trust cost of suspected AI writing

**Original.** Jakesch, French, Ma, Hancock and Naaman (2019, CHI), three experiments on Airbnb style host
profiles, 527 people in the first. When people believed all profiles were AI written, trust did not drop. When
they believed some were and some were not, they distrusted the profiles they suspected were AI: the "Replicant
Effect". Paper read in part.

**Replication status.** The core holds and has been extended.
- Jakesch, Hancock and Naaman (2023, PNAS), six experiments, 4,600 people: people cannot tell AI from human
  self-presentations, and they rely on wrong cues (first person, family, personal anecdotes count as "human";
  odd phrasing counts as "AI"). Summary read.
- Zhu and Molnar (2026, Computers in Human Behavior per the DOI), 1,300+ people, mostly apology messages: with no label, AI written
  personal messages were judged as warmly as human ones; when disclosed as AI, the sender was judged lazy and
  insincere. Summary read.
- Other 2025 to 2026 preprints agree that an AI label lowers perceived effort and sincerity; one finds the label
  weakens positive impressions but not negative ones. Summaries read.

**What it means on LinkedIn.** Readers on LinkedIn now live in a mixed world, exactly the Replicant condition. The
penalty does not fall on the tool, it falls on text the reader suspects: generic praise, symmetrical lists, "I
hope this finds you well", a recited headline, a fact with no reason. Specific, checkable, slightly uneven human
detail is the defence, and it is the same advice as sections 5, 11 and 13.

> Suspect: "I was impressed by your impressive journey and your passion for innovation in logistics."
> Not suspect: "Your post about the Antwerp port strike, the bit about re-routing via Rotterdam in 48 hours: did it hold up?"

**Round 2 (2026-10-30): what the reader spots.** Russell, Karpinska and Iyyer (2025, ACL): five annotators who
often write with LLMs found AI text at 92.7% true positives with about 3 to 4% false positives; nonexperts were
near chance. Their cues: AI vocabulary (crucial, testament, delve, seamless, elevate, robust, pivotal, foster,
navigate), "it's not X, it's Y" and "not only X but also Y", lists of three, uniform sentences, flawless grammar,
no contractions, a uniformly positive tone, summary-style closings. Data: 300 news-style articles, not DMs.
Hohenstein et al. (2023, Scientific Reports): people suspected of using AI replies are judged more negatively.
As buyers use LLMs daily, more readers are the expert kind. The voice skill now counts these tells after
drafting (see `../voice/`).

---

## 17. Corrections to the other folders

| File | Says | Should say |
|---|---|---|
| `linkedin-messages/README.md` (section 3 and Cialdini paragraph) | Social proof "is the one Cialdini lever that replicates well" | Social proof has the most support of the six, but field replications are mixed (Bohner and Schluter 2014 found no edge over a standard appeal) and the norm literature is inflated by publication bias. One relevant peer, never a crowd |
| `linkedin-messages/README.md`, evidence line on Sahni et al. | The name in a subject line lifts opens about 20% | That was 2018; a small 2023 test on students found no first name effect (a surname lift came from a different sample, politicians). The attention mechanism holds; do not count on the first name |
| `linkedin-messages/README.md` | Reciprocity "plausible, no meta-analytic size for messages" | The closest measured case is survey mail: money sent with the questionnaire raises response odds about 1.9 times, and an incentive given up front beats one promised on reply (OR 1.61) (Cochrane, 481 trials); gifts in charity letters raised donation frequency 17 to 75% (Falk 2007). Holds |

**Round 2 additions (2026-10-30).**
- Conversational receptiveness (Yeomans, Minson, Collins, Chen, Gino 2020, OBHDP 160): in written disagreement,
  writers who acknowledge the other view in its own terms, hedge and avoid flat negation are judged more
  persuasive and draw fewer attacks (Wikipedia editors, N = 2,860 in study 1); receptiveness was contagious.
  This is the measured backing for the pack's reply rule "answer exactly what they objected, in their own words".
- Chris Voss's labels ("It seems like...") are Practice. The study cited for them (Lieberman et al. 2007, fMRI)
  had people label the emotion in faces they saw: self-labelling, not labelling another person, and not text.
  Keep this caveat beside every Voss mention.
- Checked, not used: Cialdini's *Pre-Suasion* priming ("do you consider yourself helpful?" before the ask,
  reported 29% to 77%, primary paper not traced, no replication found) and Unity (no effect-size evidence, only a
  2020 susceptibility scale). Tricks shrink to a few points or nothing (section 0).

## 18. What this folder did not cover

Anchoring, the decoy effect, the IKEA effect and ego depletion were left out as not used in first messages.
Many Labs results were not read individually. Several meta-analysis figures (Beaman, Dillard, Lynn subgroups)
are from secondary summaries; see `sources.md` for which.
