# AQ-494 morning deployability gate, Jun 27

Gate run: 2026-06-27 07:01:44 UTC
Repo: `/root/baycast-dev`
Base commit at run start: `ef7fb0f45b61c5ed899e9de4b4e9be48bb7fe84d`
Runtime: Node `v22.22.2`, npm `10.9.7`

Verdict: deployable.

Notes:
- The clone was synced with `origin/main` before checks. It was already up to date.
- No Node 20 fallback was needed.
- No code or build fix was needed.
- Build warning observed: webpack cache warning about serializing a 215 KiB string.

## Sync

```text
$ git fetch origin main && git checkout main && git pull --rebase origin main
From https://github.com/Smildous/baycast
 * branch            main       -> FETCH_HEAD
Already on 'main'
Your branch is up to date with 'origin/main'.
From https://github.com/Smildous/baycast
 * branch            main       -> FETCH_HEAD
Already up to date.
```

```text
$ git rev-parse HEAD && node -v && npm -v && date -u '+%Y-%m-%d %H:%M:%S UTC'
ef7fb0f45b61c5ed899e9de4b4e9be48bb7fe84d
v22.22.2
10.9.7
2026-06-27 07:01:44 UTC
```

## Checks

### git diff --check

```text
$ git diff --check
exit_code=0
```

Result: pass.

### npm run verify:next-settlement-watch

```text
$ npm run verify:next-settlement-watch

> baycast@0.1.0 verify:next-settlement-watch
> node scripts/verify-next-settlement-watch.mjs

next settlement watch: PASS
PASS FIFA opening match at least three goals: ok
  5745e845-94e9-4802-bbeb-850c982e1276 | open | 2026-06-30T23:59:59+00:00 | Will the 2026 FIFA World Cup opening match have at least three total goals?
PASS OpenAI public video generation model before July 1 2026: ok
  d3338e47-11ec-4568-942e-42bb19be0f5e | open | 2026-06-30T23:59:59+00:00 | Will OpenAI release a new public video generation model before July 1, 2026?
PASS Microsoft first-party Xbox handheld before Aug 1 2026: ok
  5cc9fe74-5306-49d9-bec3-251ad276a779 | open | 2026-07-31T23:59:59+00:00 | Will Microsoft announce a new first-party Xbox handheld before August 1, 2026?
exit_code=0
```

Result: pass.

### npm run verify:distribution-gate

```text
$ npm run verify:distribution-gate

> baycast@0.1.0 verify:distribution-gate
> node scripts/verify-distribution-gate.mjs

Verifying distribution gate at https://baycast-p.vercel.app
ok /settlements/apple-mac-pro-wwdc-2026
ok /questions?status=resolved
ok /
Distribution gate verification passed.
exit_code=0
```

Result: pass.

### npm run verify:public-bcp

```text
$ npm run verify:public-bcp

> baycast@0.1.0 verify:public-bcp
> node scripts/verify-public-bcp-surfaces.mjs

Verifying public BCP surfaces at https://baycast-p.vercel.app
ok /
ok /questions
ok /questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248
ok /leaderboard
ok /activity
Public BCP surface verification passed.
exit_code=0
```

Result: pass.

### npm test

```text
$ npm test

> baycast@0.1.0 test
> vitest run

RUN  v4.1.5 /root/baycast-dev

✓ __tests__/supabase-admin.test.ts (13 tests) 108ms
✓ __tests__/agent-forecast-route.test.ts (1 test) 62ms
✓ __tests__/utils.test.ts (37 tests) 77ms
✓ __tests__/badges.test.ts (19 tests) 11ms
✓ __tests__/onboarding.test.ts (16 tests) 14ms
✓ __tests__/ai-forecaster.test.ts (7 tests) 9ms
✓ __tests__/news-context.test.ts (7 tests) 7ms
✓ __tests__/forecaster-count-visibility.test.ts (4 tests) 10ms
✓ __tests__/signup-success.test.ts (3 tests) 5ms
✓ __tests__/resolution.test.ts (2 tests) 4ms
✓ __tests__/activity-copy.test.ts (2 tests) 4ms
✓ __tests__/setup.test.ts (1 test) 3ms

Test Files  12 passed (12)
Tests  112 passed (112)
Start at  07:02:04
Duration  15.60s
exit_code=0
```

Result: pass.

### rm -rf .next && npm run build

```text
$ rm -rf .next && npm run build

> baycast@0.1.0 build
> next build

▲ Next.js 14.2.16
- Environments: .env.local

Creating an optimized production build ...
<w> [webpack.cache.PackFileCacheStrategy] Serializing big strings (215kiB) impacts deserialization performance (consider using Buffer instead and decode when needed)
✓ Compiled successfully
Linting and checking validity of types ...
Collecting page data ...
Generating static pages (0/27) ...
Generating static pages (6/27)
Generating static pages (13/27)
Generating static pages (20/27)
✓ Generating static pages (27/27)
Finalizing page optimization ...
Collecting build traces ...

Route (app)                               Size     First Load JS
ƒ /                                     434 B          94.7 kB
ƒ /activity                             193 B          99.5 kB
ƒ /admin                                194 B          94.4 kB
ƒ /questions                            3.41 kB        97.6 kB
ƒ /questions/[id]                       6.7 kB          261 kB
ƒ /settlements/apple-mac-pro-wwdc-2026  194 B          94.4 kB
+ First Load JS shared by all             87.4 kB
ƒ Middleware                              79.7 kB

exit_code=0
```

Result: pass.

## Final

All required checks passed. The Jun 27 morning gate is green for deployability.
