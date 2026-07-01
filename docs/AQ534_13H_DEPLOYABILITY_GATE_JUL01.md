# AQ-534 13h deployability gate, Jul 1

Node: `v22.22.2`
npm: `10.9.7`
Base locale après fast-forward: `10f90385b1b382670ce4b82a9634e75ec8f7674a`

Je n'ai pas lu la table `forecasts`. Le seul contrôle live Supabase lancé ici est `verify:next-settlement-watch`, qui lit `questions` seulement.

## Résultat

PASS après correction du watch de settlement.

Deux questions fermées le 30 juin étaient déjà en `resolved` dans `questions`, alors que le script attendait encore `open`. J'ai mis à jour `scripts/verify-next-settlement-watch.mjs` pour attendre `resolved` sur ces deux lignes Jul 1:

- FIFA opening match at least three goals
- OpenAI public video generation model before July 1 2026

La question Microsoft Aug 1 reste attendue en `open`.

## Gates

| Commande | Résultat | Preuve |
| --- | --- | --- |
| `git diff --check` | PASS | aucune sortie, aucun whitespace error |
| `npm run verify:next-settlement-watch` | FAIL initial, PASS après fix | initial: FIFA et OpenAI `status resolved != open`; après fix: `next settlement watch: PASS` |
| `npm run verify:distribution-gate` | PASS | `/settlements/apple-mac-pro-wwdc-2026`, `/questions?status=resolved`, `/` OK sur `https://baycast-p.vercel.app` |
| `npm run verify:public-bcp` | PASS | `/`, `/questions`, `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`, `/leaderboard`, `/activity` OK sur `https://baycast-p.vercel.app` |
| `npm test` | PASS | 12 fichiers, 112 tests passed |
| `rm -rf .next && npm run build` | PASS | Next.js 14.2.16, compile OK, types OK, 27 pages statiques générées |

## Evidence courte

### `npm run verify:next-settlement-watch`

```text
next settlement watch: PASS
PASS FIFA opening match at least three goals: ok
  5745e845-94e9-4802-bbeb-850c982e1276 | resolved | 2026-06-30T23:59:59+00:00 | Will the 2026 FIFA World Cup opening match have at least three total goals?
PASS OpenAI public video generation model before July 1 2026: ok
  d3338e47-11ec-4568-942e-42bb19be0f5e | resolved | 2026-06-30T23:59:59+00:00 | Will OpenAI release a new public video generation model before July 1, 2026?
PASS Microsoft first-party Xbox handheld before Aug 1 2026: ok
  5cc9fe74-5306-49d9-bec3-251ad276a779 | open | 2026-07-31T23:59:59+00:00 | Will Microsoft announce a new first-party Xbox handheld before August 1, 2026?
```

### `npm test`

```text
Test Files  12 passed (12)
Tests  112 passed (112)
```

### `npm run build`

```text
✓ Compiled successfully
Linting and checking validity of types ...
✓ Generating static pages (27/27)
```
