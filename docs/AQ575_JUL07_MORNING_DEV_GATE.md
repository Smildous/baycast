# AQ-575 Jul 7 morning dev gate

Run repo: `/root/baycast-dev`
Branch: `main`
Run time: `2026-07-07 07:03:09 UTC`
Node: `v22.22.2`

## Sync

Command run:

```bash
git fetch origin && git pull --ff-only origin main
```

Result: passed. `origin/main` was fetched and `main` was already up to date.

## Supabase count before

Command run:

```bash
node scripts/supabase-admin.mjs status
```

Result: passed, without printing secrets.

Counts before the gate checks:

```text
questions: 44
questions_open: 35
forecasts: 12
profiles: 6
mode: anon_readonly
```

Forecast count before: 12.

## Gate checks

Command run:

```bash
git diff --check
```

Result: passed, exit 0.

Command run:

```bash
npm run verify:agent-secret-gate
```

Result: passed, exit 0. The verifier used anon readonly Supabase access, confirmed the unauthorized probe returned `401`, skipped the authorized dry run because `AGENT_ENDPOINT_SECRET` is not present in local `.env.local`, and kept the forecast count at 12.

Command run:

```bash
npm run verify:public-bcp
```

Result: passed, exit 0. Public BCP checks passed for `/`, `/questions`, `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`, `/leaderboard`, and `/activity`.

Command run:

```bash
npm test
```

Result: passed on Node `v22.22.2`. No `styleText` Vitest break happened, so the Node 20 retry was not needed.

```text
Test Files  14 passed (14)
Tests       119 passed (119)
```

Command run:

```bash
rm -rf .next && npm run build
```

Result: passed. The clean Next.js production build completed after removing `.next`.

## Supabase count after

Command run:

```bash
node scripts/supabase-admin.mjs status
```

Result: passed, without printing secrets.

Counts after the gate checks:

```text
questions: 44
questions_open: 35
forecasts: 12
profiles: 6
mode: anon_readonly
```

Forecast count after: 12.

No live AI insert happened during this gate. The forecast count stayed stable: 12 before, 12 after.
