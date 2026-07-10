# AQ-605 Jul 10 13h Dev Gate

Run time: 2026-07-10 13:03:12 UTC
Repository: `/root/baycast-dev`
Branch: `main`
Node: `v22.22.2`
npm: `10.9.7`

## Verdict

PASS. Les gates demandées passent sur le runtime Node courant. Pas de retry Node 20 nécessaire.

Pas de live AI insert observé. Le dry run de production autorisé n'a pas tourné car `AGENT_ENDPOINT_SECRET` est absent du `.env.local` local. Le probe non autorisé retourne 401. Le payload synthétique n'a donc pas été produit par un dry run de production.

Forecast count avant agent secret gate: 12. Forecast count après: 12.

## Sync

Command:

```text
git fetch origin && git pull --ff-only origin main
```

Output:

```text
From https://github.com/Smildous/baycast
 * branch            main       -> FETCH_HEAD
Already up to date.
```

Result: PASS

## Gate 1: diff hygiene

Command:

```text
git diff --check
```

Output:

```text
```

Result: PASS

## Gate 2: agent secret gate

Command:

```text
npm run verify:agent-secret-gate
```

Output:

```text
> baycast@0.1.0 verify:agent-secret-gate
> node scripts/verify-agent-secret-gate.mjs

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

Result: PASS

## Gate 3: public BCP

Command:

```text
npm run verify:public-bcp
```

Output:

```text
> baycast@0.1.0 verify:public-bcp
> node scripts/verify-public-bcp-surfaces.mjs

Verifying public BCP surfaces at https://baycast-p.vercel.app
ok /
ok /questions
ok /questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248
ok /leaderboard
ok /activity
Public BCP surface verification passed.
```

Result: PASS

## Gate 4: tests

Command:

```text
npm test
```

Output:

```text
> baycast@0.1.0 test
> vitest run

 RUN  v4.1.5 /root/baycast-dev

 ✓ __tests__/agent-forecast-route.test.ts (3 tests) 70ms
 ✓ __tests__/supabase-admin.test.ts (13 tests) 118ms
 ✓ __tests__/utils.test.ts (37 tests) 30ms
 ✓ __tests__/onboarding.test.ts (16 tests) 10ms
 ✓ __tests__/ai-forecaster.test.ts (7 tests) 9ms
 ✓ __tests__/news-context.test.ts (7 tests) 7ms
 ✓ __tests__/badges.test.ts (19 tests) 10ms
 ✓ __tests__/public-score-surfaces-bcp.test.ts (3 tests) 5ms
 ✓ __tests__/closing-soon-consistency.test.ts (2 tests) 5ms
 ✓ __tests__/forecaster-count-visibility.test.ts (4 tests) 5ms
 ✓ __tests__/signup-success.test.ts (3 tests) 5ms
 ✓ __tests__/setup.test.ts (1 test) 5ms
 ✓ __tests__/activity-copy.test.ts (2 tests) 4ms
 ✓ __tests__/resolution.test.ts (2 tests) 4ms

 Test Files  14 passed (14)
      Tests  119 passed (119)
   Start at  13:02:03
   Duration  14.76s (transform 318ms, setup 841ms, import 348ms, tests 287ms, environment 11.15s)
```

Result: PASS

## Gate 5: clean build

Command:

```text
rm -rf .next && npm run build
```

Output:

```text
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
┌ ƒ /                                     434 B          94.7 kB
├ ƒ /_not-found                           165 B          87.6 kB
├ ƒ /activity                             193 B          99.5 kB
├ ƒ /admin                                194 B          94.4 kB
├ ƒ /admin/questions/[id]                 2.87 kB         152 kB
├ ƒ /admin/questions/new                  2.42 kB         151 kB
├ ƒ /api/admin/resolve                    0 B                0 B
├ ƒ /api/agent/forecast                   0 B                0 B
├ ƒ /api/notifications                    0 B                0 B
├ ƒ /api/notifications/[id]/read          0 B                0 B
├ ƒ /api/notifications/mark-all-read      0 B                0 B
├ ƒ /api/notifications/unread-count       0 B                0 B
├ ƒ /auth/callback                        0 B                0 B
├ ƒ /auth/login                           2.43 kB         158 kB
├ ƒ /auth/reset-password                  1.49 kB         157 kB
├ ƒ /auth/signup                          2.43 kB         158 kB
├ ƒ /blocks                               194 B          94.4 kB
├ ƒ /blocks/[id]                          194 B          94.4 kB
├ ƒ /compare                              194 B          94.4 kB
├ ƒ /how-it-works                         434 B          94.7 kB
├ ƒ /leaderboard                          193 B          99.5 kB
├ ƒ /notifications                        2.69 kB        96.9 kB
├ ○ /opengraph-image                      0 B                0 B
├ ƒ /profile                              1.18 kB         150 kB
├ ƒ /profile/[username]                   3.59 kB         202 kB
├ ƒ /questions                            3.42 kB        97.6 kB
├ ƒ /questions/[id]                       6.7 kB          261 kB
├ ƒ /questions/[id]/opengraph-image       0 B                0 B
├ ○ /robots.txt                           0 B                0 B
├ ƒ /settings                             1.4 kB          150 kB
├ ƒ /settlements/apple-mac-pro-wwdc-2026  194 B          94.4 kB
└ ƒ /sitemap.xml                          0 B                0 B
+ First Load JS shared by all             87.4 kB
  ├ chunks/2117-444f2bc9bcb87095.js       31.8 kB
  ├ chunks/fd9d1056-e53a609668c70a95.js   53.6 kB
  └ other shared chunks (total)           2 kB

ƒ Middleware                              79.7 kB

○  (Static)   prerendered as static content
ƒ  (Dynamic)  server-rendered on demand
```

Result: PASS

## Notes

No app code changed. Only this evidence file was added.
