# AQ-538 deployability gate, Jul 02 07h

Repo: `/root/baycast`
Branch: `main`
Start HEAD after fast-forward: `1741b22f40c2b807f51e58fd2a5886cd73ca9cf0`
Node: `v22.22.2`
NPM: `10.9.7`

No live Supabase writes were performed. Forecasts were not read. The build was clean: `.next` was removed before `npm run build`.

## Fast-forward

Command:

```bash
git status --short && git branch --show-current && git remote -v && git fetch origin main && git merge --ff-only origin/main
```

Exit: 0

Output:

```text
main
origin	https://github.com/Smildous/baycast.git (fetch)
origin	https://github.com/Smildous/baycast.git (push)
From https://github.com/Smildous/baycast
 * branch            main       -> FETCH_HEAD
Already up to date.
```

## Preflight

Command:

```bash
node --version
npm --version
git rev-parse HEAD
git diff --check
```

Exit: 0

Output:

```text
$ node --version
v22.22.2
$ npm --version
10.9.7
$ git rev-parse HEAD
1741b22f40c2b807f51e58fd2a5886cd73ca9cf0
$ git diff --check
```

## npm run verify:next-settlement-watch

Exit: 0

Output:

```text
> baycast@0.1.0 verify:next-settlement-watch
> node scripts/verify-next-settlement-watch.mjs

next settlement watch: PASS
PASS FIFA opening match at least three goals: ok
  5745e845-94e9-4802-bbeb-850c982e1276 | resolved | 2026-06-30T23:59:59+00:00 | Will the 2026 FIFA World Cup opening match have at least three total goals?
PASS OpenAI public video generation model before July 1 2026: ok
  d3338e47-11ec-4568-942e-42bb19be0f5e | resolved | 2026-06-30T23:59:59+00:00 | Will OpenAI release a new public video generation model before July 1, 2026?
PASS Microsoft first-party Xbox handheld before Aug 1 2026: ok
  5cc9fe74-5306-49d9-bec3-251ad276a779 | open | 2026-07-31T23:59:59+00:00 | Will Microsoft announce a new first-party Xbox handheld before August 1, 2026?
```

## npm run verify:distribution-gate

Exit: 0

Output:

```text
> baycast@0.1.0 verify:distribution-gate
> node scripts/verify-distribution-gate.mjs

Verifying distribution gate at https://baycast-p.vercel.app
ok /settlements/apple-mac-pro-wwdc-2026
ok /questions?status=resolved
ok /
Distribution gate verification passed.
```

## npm run verify:public-bcp

Exit: 0

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

## npm test

Exit: 0

Output:

```text
> baycast@0.1.0 test
> vitest run


 RUN  v4.1.5 /root/baycast

 ✓ __tests__/supabase-admin.test.ts (13 tests) 99ms
 ✓ __tests__/agent-forecast-route.test.ts (1 test) 72ms
 ✓ __tests__/utils.test.ts (37 tests) 32ms
 ✓ __tests__/onboarding.test.ts (16 tests) 11ms
 ✓ __tests__/badges.test.ts (19 tests) 11ms
 ✓ __tests__/ai-forecaster.test.ts (7 tests) 10ms
 ✓ __tests__/news-context.test.ts (7 tests) 8ms
 ✓ __tests__/forecaster-count-visibility.test.ts (4 tests) 6ms
 ✓ __tests__/resolution.test.ts (2 tests) 4ms
 ✓ __tests__/activity-copy.test.ts (2 tests) 4ms
 ✓ __tests__/closing-soon-consistency.test.ts (2 tests) 7ms
 ✓ __tests__/signup-success.test.ts (3 tests) 5ms
 ✓ __tests__/setup.test.ts (1 test) 4ms

 Test Files  13 passed (13)
      Tests  114 passed (114)
   Start at  07:02:23
   Duration  14.01s (transform 267ms, setup 773ms, import 301ms, tests 271ms, environment 10.74s)
```

## clean npm run build

Command:

```bash
rm -rf .next
npm run build
```

Exit: 0

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
├ ƒ /admin                                195 B          94.4 kB
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
├ ƒ /blocks                               195 B          94.4 kB
├ ƒ /blocks/[id]                          195 B          94.4 kB
├ ƒ /compare                              195 B          94.4 kB
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
├ ƒ /settlements/apple-mac-pro-wwdc-2026  195 B          94.4 kB
└ ƒ /sitemap.xml                          0 B                0 B
+ First Load JS shared by all             87.4 kB
  ├ chunks/2117-444f2bc9bcb87095.js       31.8 kB
  ├ chunks/fd9d1056-e53a609668c70a95.js   53.6 kB
  └ other shared chunks (total)           2 kB


ƒ Middleware                              79.7 kB

○  (Static)   prerendered as static content
ƒ  (Dynamic)  server-rendered on demand
```

## Result

All requested gates passed on the deployed code. No deterministic bug was found, so no code or test change was needed.
