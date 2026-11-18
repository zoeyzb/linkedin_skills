# Method: sources

Read 2026-10-29. One line each.

## Experiment design and statistics

- Evan Miller, "How Not To Run an A/B Test". https://www.evanmiller.org/how-not-to-run-an-ab-test.html. Peeking inflates false positives (26.1% in his example); fix the size in advance; n = 16 sigma^2 / delta^2.
- Evan Miller, Sample Size Calculator. https://www.evanmiller.org/ab-testing/sample-size.html. Inputs: baseline, minimum detectable effect, power, significance; output per variation.
- Evan Miller, Chi-Squared Test (two rates). https://www.evanmiller.org/ab-testing/chi-squared.html. Free tool to check two success rates; recommend it to users who want a calculator.
- Penn State STAT 200, hypothesis testing for two proportions. https://online.stat.psu.edu/stat200/lesson/9/9.1/9.1.2. At least 10 successes and 10 failures per group for the normal approximation; else Fisher's exact test.
- Minitab blog, two p-values for a 2-proportions test. https://blog.minitab.com/en/quality-data-analysis-and-statistics/two-p-values-for-a-2-proportions-test-am-i-seeing-double. Fisher exact is reliable at any size; z-test inaccurate under 5 events.
- Kohavi, Tang, Xu, "Trustworthy Online Controlled Experiments", Cambridge University Press, 2020 (index: https://assets.cambridge.org/97811087/24265/index/9781108724265_index.pdf). A/A tests (about 5% of honest A/A splits come out significant at 95%), sample ratio mismatch, novelty effect (users reacting to a new feature).

## Outbound frameworks

- Ross and Tyler, "Predictable Revenue" (2011), summaries: https://forentrepreneurs.com/predictable-revenue and https://grahammann.net/book-notes/predictable-revenue-aaron-ross-marylou-tyler. Role specialization, short emails, tracking each stage. Benchmarks are second-hand.
- Winning by Design, bowtie model press release (2023). https://winningbydesign.com/press/winning-by-design-releases-updated-bowtie-model-and-benchmarks-to-provide-go-to-market-teams-with-a-standardized-customer-journey-and-data-model/. One data model of the customer journey; volume, conversion, time per stage.

## LinkedIn outreach data (all vendor-published)

- Expandi, "LinkedIn Outreach Benchmarks 2026", 13.2M requests. https://expandi.io/blog/linkedin-outreach-benchmarks-2026/. Acceptance 28.5%; note replies 3.5% to 2.2% in a year; sender-side, vendor data.
- Expandi, connection message templates (reports the Belkins note figures). https://expandi.io/blog/linkedin-connection-message-templates/. 26.42% with note against 26.37% without; replies 9.36% against 5.44%. Not verified at the original source.
- AiSDR, note against no-note split test (Aug 2026). https://aisdr.com/?p=24384. About 450 per arm: acceptance 37.3% against 34.6%; response 2.6% against 19.2%.
- Botdog, LinkedIn acceptance rates, 16,492 invitations. https://www.botdog.co/blog-posts/linkedin-acceptance-rates. Time to accept: 63% in a day, 88% in 7 days, 99% in 30; blank invitations accepted more, no rates.
- Belkins, LinkedIn response time study, 152,636 contacts. https://belkins.io/blog/linkedin-response-time-study. Median 1 day to accept, 91% within 14 days; median 5 days invite to reply, 60% of replies in week one.

## Invitation note limits (third-party guides, no official page found)

- Hublead, LinkedIn character limits 2026. https://www.hublead.io/linkedin-character-limit. Free note 200 characters, Premium 300; a few notes a month on free; trust the count in the editor.
- lemlist help, connection request limits. https://help.lemlist.com/en/articles/8514157-linkedin-connection-requests-limits-best-practices-avoiding-restrictions. Free accounts: about 3 notes a month, then blocked until the monthly reset.
- Taplio, connection request limit. https://taplio.com/blog/linkedin-connection-request-limit. Around five notes a month on free.

## Personalization and advanced formats

- Rework, "Personalization at Scale: What Moves Cold Email Replies and What Is Decoration". https://resources.rework.com/libraries/outbound-prospecting/personalization-at-scale. Summarises vendor correlations and the first-name field experiment and its null follow-up.
- Drift, "What 290 Cold Emails Teach Us" (2019). https://www.drift.com/blog/cold-email-study/. Self-selected sample; targeting and personalization move together.
- Amplemarket, Duo Voice. https://amplemarket.com/blog/duo-now-talks-on-linkedin-meet-the-first-linkedin-voice-ai-to-double-your-replies. Vendor claim: voice messages +150% replies.
- ElevenLabs on lemlist voice notes. https://elevenlabs.io/blog/lemlist. Vendor claim: 2x replies from AI voice notes.
- EU AI Act Article 50 guide. https://artificialintelligenceact.eu/?p=6131 and McCann FitzGerald on deployer obligations https://www.mccannfitzgerald.com/knowledge/data-privacy-and-cyber-risk/ai-transparency-european-commissions-guidelines-on-article-50-part-2-deployer-obligations. Deepfake disclosure duty for deployers from 2 August 2026. Legal commentary; check the Official Journal text.

