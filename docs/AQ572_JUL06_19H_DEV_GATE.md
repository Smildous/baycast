# AQ-572 Jul 6 19h dev gate

Run repo: `/root/baycast-dev`
Branch: `main`

## Sync

Passed.

Commands:

```bash
git fetch origin
git checkout main
git pull --ff-only origin main
```

Result: already up to date with `origin/main` before the gate checks.

## Checks

| Check | Result | Notes |
| --- | --- | --- |
| `git diff --check` | PASS | exit 0 |
| `npm run verify:agent-secret-gate` | PASS | exit 0 |
| `npm run verify:public-bcp` | PASS | exit 0 |
| `npm test` | PASS | 14 files passed, 119 tests passed |
| `rm -rf .next && npm run build` | PASS | Next.js build completed |

## Agent secret verifier

The verifier ran against `https://baycast-p.vercel.app/api/agent/forecast`.

Recorded output, without secret values:

```text
local_env: env_local_exists true, agent_endpoint_secret_present false
vercel: cli_available false, token_present false, authenticated false, detail vercel CLI not installed
supabase: available true, mode anon_readonly
forecast_count_before: 12
unauthorized_probe: status 401, ok false
authorized_dry_run_probe: skipped, AGENT_ENDPOINT_SECRET missing from local .env.local
forecast_count_after: 12
```

Forecast count before: 12
Forecast count after: 12

No live AI insert happened. The authorized dry run was skipped because the local agent endpoint secret is not present, and the count stayed unchanged.

## Public BCP

Passed for:

```text
/
/questions
/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248
/leaderboard
/activity
```

## Test and build summary

Tests: 119 passed.
Build: completed cleanly after removing `.next`.

## Commands run for this gate

```bash
git fetch origin
git checkout main
git pull --ff-only origin main
git diff --check
npm run verify:agent-secret-gate
npm run verify:public-bcp
npm test
rm -rf .next && npm run build
```
