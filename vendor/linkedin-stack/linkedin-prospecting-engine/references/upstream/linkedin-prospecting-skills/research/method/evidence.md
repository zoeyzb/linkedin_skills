# Method: numbers and worked statistics

## Sample size per arm (two-sided 5%, power 80%)

Standard two-proportion formula; Miller's shortcut n = 16 p(1-p) / d^2 (p the average rate, d the gap) gives
within 3% of it.

| From | To | Exact | Miller shortcut |
|---|---|---|---|
| 30% | 40% | 356 | 364 |
| 30% | 45% | 163 | 167 |
| 30% | 35% | 1,377 | 1,405 |
| 20% | 30% | 294 | 301 |
| 25% | 35% | 329 | 337 |
| 15% | 25% | 250 | 256 |
| 10% | 15% | 686 | 701 |
| 10% | 20% | 199 | 204 |
| 5% | 10% | 435 | 445 |

## Noise band (95%), percentage points, equal arms

Gap below which two arms are indistinguishable: 1.96 x sqrt(2 p (1-p) / n).

| n per arm | 5% | 10% | 20% | 30% | 40% |
|---|---|---|---|---|---|
| 50 | 8.5 | 11.8 | 15.7 | 18.0 | 19.2 |
| 100 | 6.0 | 8.3 | 11.1 | 12.7 | 13.6 |
| 200 | 4.3 | 5.9 | 7.8 | 9.0 | 9.6 |
| 300 | 3.5 | 4.8 | 6.4 | 7.3 | 7.8 |
| 400 | 3.0 | 4.2 | 5.5 | 6.4 | 6.8 |

## Worked two-proportion checks

| A won / sent | B won / sent | Rates | z | p | Verdict |
|---|---|---|---|---|---|
| 30 / 100 | 40 / 100 | 30% vs 40% | 1.48 | 0.14 | Not proven |
| 60 / 200 | 80 / 200 | 30% vs 40% | 2.10 | 0.036 | B wins |
| 10 / 100 | 18 / 100 | 10% vs 18% | 1.63 | 0.10 | Not proven |
| 150 / 500 | 190 / 500 | 30% vs 38% | 2.67 | 0.008 | B wins |

The same 10-point gap is noise at 100 per arm and real at 200.

## Peeking (Miller)

No real effect, checked after every observation up to 150, stop at first p < 5%: 26.1% false positives.
To keep a real 5% after k planned looks, each look needs about: 1 look 2.9%, 2 looks 2.2%, 3 looks 1.8%,
5 looks 1.4%, 10 looks 1.0%.

## Time to accept and reply (vendor datasets)

| Source | Size | Finding |
|---|---|---|
| Botdog | 16,492 invitations | acceptances: 21% in 1 h, 63% in 24 h, 88% in 7 days, 99% in 30 days |
| Belkins | 152,636 contacts, 53 projects, Mar 2025 to Feb 2026 | median 1 day to accept, mean 4.3; 91% within 14 days; invite to reply median 5 days, 60% of replies in week one |


## What `connections.trend` returns

- `withinDays: 7`, `weeks` (6, Monday start, UTC), `days` (14).
- Each period: `start`, `counting` (younger than its end plus 7 days), `invitations` {sent, won, rate,
  `withNote`, `withoutNote`}, `firstMessages` {sent, won, rate}.
- `rate` is a whole percent, omitted under 10 sent.
- Covers all of the user's connected accounts together; not split by persona or template. Persona or template
  splits are read from tagged contacts (`bereach_contacts` by tag).
