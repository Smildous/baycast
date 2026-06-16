# AQ-400, gate de déployabilité 19h, 16 juin

Run fait le 2026-06-16 à 19:02 UTC sur `main`.

- Repo: `/root/baycast-dev`
- Base sync: `origin/main`
- Commit vérifié au départ: `6fa5c37`
- Node: `v22.22.2`
- npm: `10.9.7`

## Résultats

| Commande | Résultat | Notes |
| --- | --- | --- |
| `git fetch origin main && git checkout main && git pull --ff-only origin main` | PASS | Branche `main` déjà alignée sur `origin/main`, HEAD `6fa5c37`. |
| `git diff --check` | PASS | Aucune sortie, pas d'erreur whitespace. |
| `npm run verify:next-settlement-watch` | PASS | 3 checks OK: FIFA opening match, OpenAI public video generation model, Microsoft first-party Xbox handheld. |
| `npm run verify:distribution-gate` | PASS | `https://baycast-p.vercel.app`, OK sur `/settlements/apple-mac-pro-wwdc-2026`, `/questions?status=resolved`, `/`. |
| `npm run verify:public-bcp` | PASS | `https://baycast-p.vercel.app`, OK sur `/`, `/questions`, `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`, `/leaderboard`, `/activity`. |
| `npm test` | PASS | Vitest: 12 fichiers passés, 110 tests passés, durée 13.60s. |
| `rm -rf .next && npm run build` | PASS | Next.js 14.2.16, compilation OK, types OK, 27 pages statiques générées. |

## Sorties utiles

### `npm run verify:next-settlement-watch`

```text
next settlement watch: PASS
PASS FIFA opening match at least three goals: ok
  5745e845-94e9-4802-bbeb-850c982e1276 | open | 2026-06-30T23:59:59+00:00 | Will the 2026 FIFA World Cup opening match have at least three total goals?
PASS OpenAI public video generation model before July 1 2026: ok
  d3338e47-11ec-4568-942e-42bb19be0f5e | open | 2026-06-30T23:59:59+00:00 | Will OpenAI release a new public video generation model before July 1, 2026?
PASS Microsoft first-party Xbox handheld before Aug 1 2026: ok
  5cc9fe74-5306-49d9-bec3-251ad276a779 | open | 2026-07-31T23:59:59+00:00 | Will Microsoft announce a new first-party Xbox handheld before August 1, 2026?
```

### `npm run verify:distribution-gate`

```text
Verifying distribution gate at https://baycast-p.vercel.app
ok /settlements/apple-mac-pro-wwdc-2026
ok /questions?status=resolved
ok /
Distribution gate verification passed.
```

### `npm run verify:public-bcp`

```text
Verifying public BCP surfaces at https://baycast-p.vercel.app
ok /
ok /questions
ok /questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248
ok /leaderboard
ok /activity
Public BCP surface verification passed.
```

### `npm test`

```text
Test Files  12 passed (12)
Tests       110 passed (110)
Duration    13.60s
```

### `rm -rf .next && npm run build`

```text
Next.js 14.2.16
Compiled successfully
Linting and checking validity of types: OK
Generating static pages: 27/27
Build completed successfully
```

## Conclusion

Gate AQ-400 validé. Aucun bug trouvé, aucun changement produit requis. Node 22 a passé les vérifications, donc pas de retry Node 20.
