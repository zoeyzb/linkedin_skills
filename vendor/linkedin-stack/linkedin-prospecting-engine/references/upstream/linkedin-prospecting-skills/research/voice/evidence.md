# Voice: the numbers behind the skill

Exact figures and settings, so nobody has to re-open the papers.

## Wang et al. 2025 (arXiv 2509.14543), 5-shot imitation

Authorship verification (share of generations verified as the target author), 5 examples, Table 3:

| Model | Email (Enron) | Blog |
|---|---|---|
| GPT-4o-mini | 96.64% | 17.93% |
| GPT-4o | 96.15% | 19.37% |
| Gemini-2.0-Flash | 96.44% | 21.25% |
| Gemma-3-27B | 96.17% | 16.72% |
| DeepSeek-V3 | 96.30% | 20.77% |
| Llama-4-Maverick | 95.65% | 17.61% |

Number of examples: tested at 2, 4, 6, 8, 10 (Figure 5); the text says more examples move the metrics
"very little". No exact per-count values are given.

Random against topically similar examples, Table 6 (average of three models, test subset):

| Metric | Random 5-shot | Topically similar |
|---|---|---|
| Email verification | 95.44% | 81.28% |
| Email attribution, top 5 | 69.33% | 36.00% |
| Blog verification | 19.40% | 10.33% |

Adding a snippet, share judged human, Table 6. The snippet is the first 50 words (or 20%) of the very text
to be written, given on top of the 5 examples (a continuation setup), compared only against plain 5-shot. It
is not a kept sample, and the paper has no style-description condition:

| Genre | Without | With snippets |
|---|---|---|
| Email | 36.83% | 46.50% |
| News (CCAT50) | 8.50% | 15.50% |
| Forum (Reddit) | 10.90% | 22.10% |
| Blog | 9.00% | 21.70% |

AI detection (share classified human by one detector, 5-shot), Table 4: from 0% to 54% depending on model and
genre; email highest. The authors note the detector may favour one model family. Zero-shot mostly under 5%.

## Patel, Andrews, Callison-Burch (arXiv 2212.08986)

Target style data limited to 16 posts, about 500 words on average per author. Earlier high-resource methods
needed more than 100,000 words.

## Eder (stylometry, identification not imitation)

About 5,000 words per sample for stable attribution (2013/2015), lowered to under 2,000 (2017); the threshold
varies from about 1,500 to more than 20,000 words by author, and some texts are never attributed correctly.

## Nielsen Norman Group (Moran 2016)

37 website tone words reduced to 4 dimensions. 50 US respondents rated paired samples on 5-point scales;
differences significant at p < 0.05, size about 0.5 to 1 point.

## BeReach writer test

| Measure | Value |
|---|---|
| Model judge calls two same-prompt drafts different | 70 of 72 pairs |


## Round 2 (2026-10-30)

| Claim | Value |
|---|---|
| Expert detectors of AI text (Russell et al. 2025, 5 experts, 300 articles) | 92.7% true positives, about 3 to 4% false positives |
| Nonexpert detectors, same study | about chance (56.7% and 51.7%) |
| Dashes as an AI cue, same study | not a cue |
| Excess words in abstracts (Kobak et al. 2025) | about 900, in 14M+ abstracts |
| Blind test of the counted check (three judges) | 7.83 with, 5.50 without |
