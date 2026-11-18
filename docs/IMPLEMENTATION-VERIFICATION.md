# LinkedIn Client Engine Verification

Verified on the connected Mac after the unified LinkedIn outreach consolidation.

## Automated test suite

Command:

npm run client-engine:test

Result:

- 40 tests
- 40 passed
- 0 failed
- 0 skipped

Coverage includes:

- LinkedIn URL deduplication
- evidence-gated qualification
- 800/1000 scoring
- 30-day signal freshness
- draft persistence
- draft version history
- bounded outreach sequence
- follow-up reminder lifecycle
- stale-reminder cleanup after a manually confirmed follow-up
- reply history
- not-interested follow-up cancellation
- manual follow/follow-back/comment activity
- reporting and denominator-safe rates
- research queue
- CLI import/brief behavior
- localhost HTTP API
- dashboard JavaScript parsing
- skill package integrity

## Skill validation

Command:

bash scripts/validate.sh

Result:

21 skills valid.

## GTM sample-run verification

Commands:

python3 scripts/check_run.py --selftest
python3 scripts/check_run.py examples/sample-run

Result:

- selftest ok
- sample run completed within the configured cost cap
- no fabricated success was introduced

## Agent Skill packaging

Command:

npm run client-engine:package-skill

Result:

- ZIP created at distribution/releases/linkedin-client-acquisition.zip
- ZIP integrity verified
- package contains the orchestration skill only

## Live dashboard smoke test

Started the local server on 127.0.0.1:4177 and verified:

- GET / returned HTTP 200
- /api/summary returned an empty 10-prospect daily target correctly
- /api/research-queue returned []
- /api/report returned zero counts and null rates where denominators were empty
- server bound to loopback only
- /api/meetings returned an empty meeting queue correctly

The smoke-test server was stopped after verification.

## Storage audit

The canonical runtime keeps:

- one local SQLite database under state/
- no prospect data in Git
- no browser cookies/session tokens in Git
- no generated daily exports in Git
- no new browser bridge
- no external model weights
- vendored source skill material only under vendor/linkedin-stack/

The vendored source material is approximately 4.7 MB.

## Manual-action boundary

The system was not used to send any LinkedIn invitation, DM, follow, like, comment, or post.

The dashboard records these actions only after user confirmation.

## Known design boundary

The active LinkedIn cadence is intentionally bounded to connection → first DM → one follow-up reminder by default. Broader multi-step sequences from historical email/GTM workflows are preserved as source capabilities and can be enabled deliberately without changing the LinkedIn-only channel boundary.
