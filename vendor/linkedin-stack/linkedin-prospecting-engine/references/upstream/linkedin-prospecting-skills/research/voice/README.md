# Voice: how to capture the way one person writes

Research behind the linkedin-voice skill. Written 2026-10-29. Every claim carries a tag:

- **[DATA]** a study with a stated method and sample.
- **[PRACTICE]** a recognised practitioner or style guide: experience, not measurement.
- **[VENDOR]** a seller's own numbers about its own product.
- **[LOCAL]** measured inside BeReach on its own customers or its own writer.
- **[FOLKLORE]** repeated everywhere, traced to nothing.

Sources with links: `sources.md`. The numbers that decide the skill, with their exact settings: `evidence.md`.

## What was studied

1. Stylometry and authorship attribution: what features identify a writer and how much text that needs.
2. LLM style imitation: the 2025 large study of models imitating everyday authors, low-resource authorship
   style transfer, and instruction-only style transfer.
3. Tone-of-voice frameworks: Nielsen Norman Group's four dimensions, Mailchimp's content style guide.
4. Forms of address (tu/vous and the other T/V languages): Brown and Gilman, Clyne, Norrby and Warren.
5. Practitioner voice capture: ghostwriters and brand voice practitioners.

## Findings

### 1. Voice is constant, tone changes per message. Keep both apart from the offer.

- Mailchimp's guide states it plainly: "You have the same voice all the time, but your tone changes" and tone
  also changes with "the emotional state of the person you're addressing" **[PRACTICE]**.
- Correction: the split is often credited to Nielsen Norman Group. The NN/g article (Moran, 2016)
  treats "tone of voice" as one concept and does not make the voice/tone split. Credit Mailchimp.
- Practical split for a voice card: **voice** (how this person always writes), **tone** (per message type:
  invitation note, first message, follow-up), **offer** (what they sell, which changes per campaign and lives
  elsewhere), **house hygiene** (rules nobody may break). A voice card that carries the offer cannot be reused
  across campaigns.

### 2. What carries a voice is countable

Three traditions land on almost the same list:

| Tradition | What it names |
|---|---|
| Stylometry (Biber; Eder; Pennebaker) **[DATA]** | sentence length, punctuation habits, function words (pronouns, articles, prepositions), vocabulary richness |
| NN/g, Moran 2016 **[DATA]** | four dimensions: formal/casual, serious/funny, respectful/irreverent, matter-of-fact/enthusiastic |
| Practitioners **[PRACTICE]** | vocabulary, cadence, signature phrases, what they never say |

The NN/g study: 37 website tone words clustered to four dimensions, then paired samples rated by 50 US
respondents; differences were significant (p < 0.05) but small, about 0.5 to 1 point on a 5-point scale
**[DATA]**. Useful as a vocabulary for the card, weak as proof that tone moves results.

Pennebaker's work shows style lives in function words, not topic words **[DATA]**, which is why a voice card
must describe *how* someone writes (pronouns, contractions, length) and never *what* they talk about.

What the card therefore records, every item countable:
- length per message and per sentence;
- opening and sign-off (greets or not, how; signs or not, how);
- punctuation habits (exclamation marks, question at the end, emoji, line breaks);
- formality markers (contractions; tu/vous; first name or full name);
- signature phrases (their own, verbatim);
- a never list.

### 3. A few hundred words is enough. More samples buy almost nothing.

- Wang et al. 2025 (EMNLP Findings): 400+ real authors, four genres, over 40,000 generations per model, six
  models. Main runs use 5 samples; tests at 2, 4, 6, 8 and 10 samples change the metrics "very little" **[DATA]**.
- Email is the good genre: authorship verification about 96% with 5 samples on every model, against 17 to 21%
  for blogs **[DATA]**. Short business messages are close to email.
- Patel, Andrews, Callison-Burch: low-resource style transfer from 16 posts, about 500 words per author;
  in-context learning was the strongest method, and still not mastery **[DATA]**.
- Classical stylometry needs far more text to *identify* a writer (Eder: about 5,000 words, later lowered to
  under 2,000, varying from 1,500 to more than 20,000 by author) **[DATA]**. Identifying is harder than imitating;
  this is why "5 messages" is enough to write like someone but not to prove who wrote something.

Rule for the skill: 3 to 5 real messages, varied; around 500 words in total is the most any study used (no
source sets a lower bound). Going from 2 to 10 examples changed results very little in the largest study,
measured on a test subset with three models in a continuation task; that holds for that range only.

### 4. Two instincts that make imitation worse

- **Picking samples on the same topic as the target lowers the match.** Authorship verification on email fell
  from 95.4% to 81.3% when examples were selected for topical similarity instead of at random **[DATA]**.
  Choose samples for variety.
- **Learning a voice from text the tool generated** amplifies the tool's house voice and calls it the user's
  **[LOCAL]**. Only messages the person wrote, or clearly rewrote, count.

### 5. Keep the samples verbatim: they are what the writer imitates from

Every imitation study above works from real examples of the author's text given to the model (Wang et al.
use 5) **[DATA]**, and Anthropic's own guidance favours "diverse, canonical examples" over rule lists
**[PRACTICE]**. So the card keeps 3 to 5 messages word for word.
Correction: an earlier draft of this note read Wang's "+Snippet" result (email 36.8% to 46.5% judged human) as
"verbatim fragments beat descriptions". It does not show that. The snippet is the opening 50 words (or 20%) of
the very text the model must write, added on top of the 5 examples, with no style instructions; Table 6
compares it only against plain 5-shot. The paper has no description condition, so nothing here shows that
samples plus a description beat either alone.

### 6. Messages that got replies are the best corpus, but read the selection bias

Choosing samples from messages that got replies is a practitioner habit **[PRACTICE]**, not a tested lever:
no study found compares "replied" samples against "any" samples. It is still the right choice for a voice card,
for a different reason: it guarantees the samples are real, sent, and acceptable to that audience. Do not read
it as "these words caused the reply"; the person and the timing did most of that.

### 7. Ask for writing, not adjectives; show it back

Ghostwriting practice converges: the client is never asked to define their voice, they are asked to recognise
it. Collect writing, extract a profile, write one real message in it at once, and let them react
**[PRACTICE]**.

### 8. Forms of address (tu/vous, Sie/du, usted/tu)

- Brown and Gilman (1960) named the T/V distinction: power (non-reciprocal use) against solidarity (reciprocal)
  **[DATA]**, with solidarity gaining ground.
- Clyne, Norrby and Warren (2009, French, German, Swedish, English): in French workplaces vous is the default
  with strangers and in hierarchical relations, tu spreads with informality, and the hard question is when to
  switch **[DATA]**.
- No study found measures reply rate by tu against vous in prospecting. Vendor advice says vous by default, tu
  for young, creative or start-up audiences **[VENDOR]**.

Rule for the skill: copy what the person already does in their own messages. When the samples do not decide it,
default to the formal form for a first contact, and mirror the prospect once they answer. Record it on the card
as one field (tu / vous / none), per language.

### 9. Checking a draft: count, do not ask a model

- BeReach measured that a model judge, shown two drafts from the same prompt and model, called them different
  in 70 of 72 pairs **[LOCAL]**: it over-calls difference. That is one task; it does not test telling a draft
from the user's own writing, and no study is cited. Counting is the reliable check.

Rule for the skill: the check is a checklist of countable items against the card (length within the samples'
median, sentence length, contractions, same greeting and sign-off, same punctuation habits, no never-list
word, address form), then one human
question: "would you have sent this?"

### 10. AI tells, counted after drafting (round 2, 2026-10-30)

- Russell, Karpinska and Iyyer (2025, ACL): people who often write with LLMs detected AI text at 92.7% with about
  3 to 4% false positives; nonexperts sat near chance **[DATA]**. The cues they used: AI vocabulary (crucial,
  testament, delve, seamless, elevate, robust, pivotal, foster, navigate), "not X but Y", "not only X but also
  Y", lists of three, uniform sentence length, no contractions, a uniformly positive tone, summary closings.
  Nonexperts wrongly flagged rare words and errors. Dashes were not a cue in that data (the em dash ban stays as
  a house rule). Limits: 300 news-style articles, not DMs; English only.
- Kobak et al. (2025) measured about 900 excess words in 14M+ abstracts **[DATA]**; the Wikipedia editors' guide
  lists similar signs and says they are not proof **[PRACTICE]**.

Rule for the skill: never give these as upfront writing instructions (more rules up front made drafts worse in
the blind tests). Count them in Step 5, after drafting, and keep them only when the user's own samples do not use
them. A blind test (`../method/README.md` section 7) scored the check 7.83 against 5.50. The word list is English
only; a French list needs its own measurement.

## Evidenced vs folklore

| Claim | Status |
|---|---|
| 3 to 5 samples are enough to imitate a business writer | Evidenced **[DATA]** |
| Samples on the same topic help | False: they hurt **[DATA]** |
| Verbatim samples beat descriptions | Not tested: the paper's snippet is the opening of the target text, and it has no description condition |
| A model can judge whether a draft sounds like someone | Not supported **[LOCAL]** |
| "Consistent brand voice raises revenue 23%" | **[FOLKLORE]**: a brand-manager survey by a vendor; the same vendor published 33%, its successor 10 to 20% |
| "Personalisation multiplies replies N times" | **[VENDOR]** correlations, no controlled study found |
| AI output is undetectable with good samples | False: most outputs are still flagged by detectors in most genres **[DATA]** |
| Tu performs better than vous (or the reverse) | Unknown: no measurement found |
| Using messages that got replies makes the voice "convert" | Unproven; use them because they are real |

