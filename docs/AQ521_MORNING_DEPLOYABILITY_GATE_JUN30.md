# AQ-521 morning deployability gate, 30 juin

Run fait le 2026-06-30 07:03:23 UTC sur le commit `d56032e`.

## Environnement

- Node: `v22.22.2`
- Repo: `/root/baycast-dev`
- Forecasts lus: non. Aucun forecast n'a été ouvert ni consulté pour ce gate.

## Commandes et résultats exacts

### Sync

```bash
git fetch origin && git pull --ff-only origin main
```

Résultat:

```text
From https://github.com/Smildous/baycast
 * branch            main       -> FETCH_HEAD
Already up to date.
```

Verdict: PASS, exit 0.

### Node

```bash
node -v
```

Résultat:

```text
v22.22.2
```

Verdict: PASS, exit 0.

### Working tree avant gate

```bash
git status --short
```

Résultat: sortie vide.

Verdict: PASS, exit 0.

### Diff whitespace

```bash
git diff --check
```

Résultat: sortie vide.

Verdict: PASS, exit 0.

### Next settlement watch

```bash
npm run verify:next-settlement-watch
```

Résultat:

```text
> baycast@0.1.0 verify:next-settlement-watch
> node scripts/verify-next-settlement-watch.mjs

next settlement watch: PASS
PASS FIFA opening match at least three goals: ok
  5745e845-94e9-4802-bbeb-850c982e1276 | open | 2026-06-30T23:59:59+00:00 | Will the 2026 FIFA World Cup opening match have at least three total goals?
PASS OpenAI public video generation model before July 1 2026: ok
  d3338e47-11ec-4568-942e-42bb19be0f5e | open | 2026-06-30T23:59:59+00:00 | Will OpenAI release a new public video generation model before July 1, 2026?
PASS Microsoft first-party Xbox handheld before Aug 1 2026: ok
  5cc9fe74-5306-49d9-bec3-251ad276a779 | open | 2026-07-31T23:59:59+00:00 | Will Microsoft announce a new first-party Xbox handheld before August 1, 2026?
```

Verdict: PASS, exit 0.

### Distribution gate

```bash
npm run verify:distribution-gate
```

Résultat:

```text
> baycast@0.1.0 verify:distribution-gate
> node scripts/verify-distribution-gate.mjs

Verifying distribution gate at https://baycast-p.vercel.app
ok /settlements/apple-mac-pro-wwdc-2026
ok /questions?status=resolved
ok /
Distribution gate verification passed.
```

Verdict: PASS, exit 0.

### Public BCP

```bash
npm run verify:public-bcp
```

Résultat:

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

Verdict: PASS, exit 0.

### Tests

```bash
npm test
```

Résultat:

```text
> baycast@0.1.0 test
> vitest run

 RUN  v4.1.5 /root/baycast-dev

 ✓ __tests__/supabase-admin.test.ts (13 tests) 88ms
 ✓ __tests__/agent-forecast-route.test.ts (1 test) 67ms
 ✓ __tests__/utils.test.ts (37 tests) 26ms
 ✓ __tests__/badges.test.ts (19 tests) 10ms
 ✓ __tests__/ai-forecaster.test.ts (7 tests) 12ms
 ✓ __tests__/news-context.test.ts (7 tests) 8ms
 ✓ __tests__/onboarding.test.ts (16 tests) 10ms
 ✓ __tests__/forecaster-count-visibility.test.ts (4 tests) 5ms
 ✓ __tests__/signup-success.test.ts (3 tests) 6ms
 ✓ __tests__/resolution.test.ts (2 tests) 4ms
 ✓ __tests__/activity-copy.test.ts (2 tests) 4ms
 ✓ __tests__/setup.test.ts (1 test) 4ms

 Test Files  12 passed (12)
      Tests  112 passed (112)
   Start at  07:02:19
   Duration  12.10s (transform 252ms, setup 661ms, import 281ms, tests 244ms, environment 9.18s)
```

Test count visible: 112 passed.

Verdict: PASS, exit 0.

### Build

```bash
rm -rf .next && npm run build
```

Résultat:

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
├ ƒ /questions                            3.41 kB        97.6 kB
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

Build verdict: PASS, exit 0. Le warning webpack cache est non bloquant.

## Verdict final

Gate déployabilité Jun 30 matin: PASS.

Aucun correctif code nécessaire. Seul ce document a été ajouté.
