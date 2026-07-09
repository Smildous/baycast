# AQ-596 July 09 13h Dev Gate

Run time: 2026-07-09 13h UTC
Branch: main
Scope: deployability and safety gate from canonical code

## Summary

The deployability and safety gate passed from the current main branch. No live AI forecasts were inserted. No application code changes were needed.

## Checks

### Sync

Command: `git fetch origin && git pull --ff-only origin main`

Result: passed

Output:

```text
From https://github.com/Smildous/baycast
 * branch            main       -> FETCH_HEAD
Already up to date.
```

### Diff whitespace

Command: `git diff --check`

Result: passed

Output: no output

### Agent secret gate

Command: `npm run verify:agent-secret-gate`

Result: passed

Forecast count before: 12
Forecast count after: 12

Output:

```text
AQ-548 agent secret gate verifier for https://baycast-p.vercel.app/api/agent/forecast
local_env: {"env_local_exists":true,"agent_endpoint_secret_present":false}
vercel: {"cli_available":false,"token_present":false,"authenticated":false,"detail":"vercel CLI not installed"}
supabase: {"available":true,"mode":"anon_readonly"}
forecast_count_before: {"count":12}
probe_question: {"available":true,"source":"first open future question"}
unauthorized_probe: {"status":401,"ok":false}
authorized_dry_run_probe: {"skipped":true,"reason":"AGENT_ENDPOINT_SECRET missing from local .env.local"}
forecast_count_after: {"count":12}
AQ-548 verifier passed without printing secret values.
```

### Public BCP

Command: `npm run verify:public-bcp`

Result: passed

Output:

```text
Verifying public BCP surfaces at https://baycast-p.vercel.app
ok /
ok /questions
ok /questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248
ok /leaderboard
ok /activity
Public BCP surface verification passed.
```

### Tests

Command: `npm test`

Result: passed

Output:

```text
Test Files  14 passed (14)
Tests  119 passed (119)
Duration  18.27s
```

Node 20 retry was not needed.

### Build

Command: `rm -rf .next && npm run build`

Result: passed

Output:

```text
Next.js 14.2.16
Compiled successfully
Linting and checking validity of types passed
Generating static pages (27/27) passed
Route generation completed
```

## Notes

Known blockers remain outside this dev gate:

- AQ-546 production AGENT_ENDPOINT_SECRET is not aligned in this local run, so authorized dry-run was skipped.
- AQ-227 blind_until DDL is still a production follow-up.
- AQ-373 scores.log_score DDL is still a production follow-up.

No live AI forecast insertion was attempted.
