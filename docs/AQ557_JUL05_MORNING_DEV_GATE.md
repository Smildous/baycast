# AQ-557 Jul 5 morning Development gate

Development gate run from `/root/baycast-dev` after syncing `main` to `origin/main`.

Verdict: no live AI insert while production endpoint secret remains unaligned. The agent secret gate reached the production endpoint, the unauthorized probe returned `401`, local `.env.local` has no `AGENT_ENDPOINT_SECRET`, and the dry-run authorized probe was skipped. Forecast count stayed at 12 before and after the verifier.

All requested Development gates passed. No code patch was needed.

## Command results

### git diff --check

```text
$ git diff --check
EXIT:0
```

### npm run verify:agent-secret-gate

```text
$ npm run verify:agent-secret-gate

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
EXIT:0
```

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
EXIT:0
```

### npm test

```text
$ npm test

> baycast@0.1.0 test
> vitest run


 RUN  v4.1.5 /root/baycast-dev

 ✓ __tests__/supabase-admin.test.ts (13 tests) 98ms
 ✓ __tests__/agent-forecast-route.test.ts (3 tests) 135ms
 ✓ __tests__/utils.test.ts (37 tests) 27ms
 ✓ __tests__/onboarding.test.ts (16 tests) 10ms
 ✓ __tests__/ai-forecaster.test.ts (7 tests) 9ms
 ✓ __tests__/badges.test.ts (19 tests) 11ms
 ✓ __tests__/news-context.test.ts (7 tests) 8ms
 ✓ __tests__/forecaster-count-visibility.test.ts (4 tests) 5ms
 ✓ __tests__/signup-success.test.ts (3 tests) 5ms
 ✓ __tests__/resolution.test.ts (2 tests) 4ms
 ✓ __tests__/activity-copy.test.ts (2 tests) 5ms
 ✓ __tests__/closing-soon-consistency.test.ts (2 tests) 8ms
 ✓ __tests__/public-score-surfaces-bcp.test.ts (3 tests) 5ms
 ✓ __tests__/setup.test.ts (1 test) 5ms

 Test Files  14 passed (14)
      Tests  119 passed (119)
   Start at  07:01:37
   Duration  14.82s (transform 346ms, setup 809ms, import 364ms, tests 335ms, environment 11.15s)

EXIT:0
```

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

EXIT:0
```
