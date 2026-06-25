# AQ-479 13h deployability gate, 25 juin

Run lancé le 2026-06-25 à 13:02 UTC.
Base locale après fast-forward origin/main: `a66be59`.
Node: `v22.22.2`.
npm: `10.9.7`.

## Résultat court

Verdict: PASS.

Tous les gates demandés passent sur Node 22. Pas de retry Node 20 nécessaire. Pas de correction code.

## Commandes exécutées

### Fast-forward depuis origin/main

Commande:

```bash
git fetch origin main && git merge --ff-only origin/main
```

Résultat:

```text
From https://github.com/Smildous/baycast
 * branch            main       -> FETCH_HEAD
Already up to date.
```

### git diff --check

Commande:

```bash
git diff --check
```

Résultat: PASS, aucune sortie.

### verify:next-settlement-watch

Commande:

```bash
npm run verify:next-settlement-watch
```

Résultat:

```text
next settlement watch: PASS
PASS FIFA opening match at least three goals: ok
  5745e845-94e9-4802-bbeb-850c982e1276 | open | 2026-06-30T23:59:59+00:00 | Will the 2026 FIFA World Cup opening match have at least three total goals?
PASS OpenAI public video generation model before July 1 2026: ok
  d3338e47-11ec-4568-942e-42bb19be0f5e | open | 2026-06-30T23:59:59+00:00 | Will OpenAI release a new public video generation model before July 1, 2026?
PASS Microsoft first-party Xbox handheld before Aug 1 2026: ok
  5cc9fe74-5306-49d9-bec3-251ad276a779 | open | 2026-07-31T23:59:59+00:00 | Will Microsoft announce a new first-party Xbox handheld before August 1, 2026?
```

### verify:distribution-gate

Commande:

```bash
npm run verify:distribution-gate
```

Résultat:

```text
Verifying distribution gate at https://baycast-p.vercel.app
ok /settlements/apple-mac-pro-wwdc-2026
ok /questions?status=resolved
ok /
Distribution gate verification passed.
```

### verify:public-bcp

Commande:

```bash
npm run verify:public-bcp
```

Résultat:

```text
Verifying public BCP surfaces at https://baycast-p.vercel.app
ok /
ok /questions
ok /questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248
ok /leaderboard
ok /activity
Public BCP surface verification passed.
```

### npm test

Commande:

```bash
npm test
```

Résultat:

```text
Test Files  12 passed (12)
Tests       112 passed (112)
```

Détail utile:

```text
✓ __tests__/supabase-admin.test.ts (13 tests)
✓ __tests__/agent-forecast-route.test.ts (1 test)
✓ __tests__/utils.test.ts (37 tests)
✓ __tests__/badges.test.ts (19 tests)
✓ __tests__/onboarding.test.ts (16 tests)
✓ __tests__/ai-forecaster.test.ts (7 tests)
✓ __tests__/news-context.test.ts (7 tests)
✓ __tests__/forecaster-count-visibility.test.ts (4 tests)
✓ __tests__/signup-success.test.ts (3 tests)
✓ __tests__/resolution.test.ts (2 tests)
✓ __tests__/activity-copy.test.ts (2 tests)
✓ __tests__/setup.test.ts (1 test)
```

### Build Next

Commande:

```bash
rm -rf .next && npm run build
```

Résultat: PASS.

Détail utile:

```text
Next.js 14.2.16
Compiled successfully
Linting and checking validity of types ...
Generating static pages (27/27)
Finalizing page optimization ...
Collecting build traces ...
```

## Notes

Les scripts `verify:next-settlement-watch`, `verify:distribution-gate` et `verify:public-bcp` sont présents dans `package.json` et ont été exécutés.
Aucun fichier AQ475, AQ476 ou AQ477 n'a été modifié.
