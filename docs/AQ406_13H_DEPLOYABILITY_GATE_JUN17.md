# AQ-406, gate de déployabilité du 17 juin à 13h

Passage fait le 2026-06-17 à 13:01 UTC sur `/root/baycast-dev`.

Base vérifiée : `3d945f03fac196ab6023d84b11b2849141c73f38`.
Branche : `main`.
Synchronisation initiale : `git fetch origin main && git checkout main && git pull --ff-only origin main`, dépôt déjà à jour.
Runtime local : Node `v22.22.2`, npm `10.9.7`. Pas de bascule Node 20, les tests et le build passent avec le runtime local.

## Résultats

`git diff --check`

Résultat : OK, aucune erreur de whitespace avant changement.

`npm run verify:next-settlement-watch`

Résultat : OK.

Détails notables :

- FIFA opening match at least three goals : ouvert, deadline 2026-06-30T23:59:59+00:00
- OpenAI public video generation model before July 1 2026 : ouvert, deadline 2026-06-30T23:59:59+00:00
- Microsoft first-party Xbox handheld before Aug 1 2026 : ouvert, deadline 2026-07-31T23:59:59+00:00

`npm run verify:distribution-gate`

Résultat : OK sur `https://baycast-p.vercel.app`.

Surfaces vérifiées :

- `/settlements/apple-mac-pro-wwdc-2026`
- `/questions?status=resolved`
- `/`

`npm run verify:public-bcp`

Résultat : OK sur `https://baycast-p.vercel.app`.

Surfaces vérifiées :

- `/`
- `/questions`
- `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`
- `/leaderboard`
- `/activity`

`npm test`

Résultat : OK.

Vitest : 12 fichiers passés, 110 tests passés.

`rm -rf .next && npm run build`

Résultat : OK.

Next.js 14.2.16 a compilé, validé les types, généré 27 pages statiques et finalisé les traces de build. Un avertissement webpack sur la sérialisation de grandes chaînes est apparu, sans échec de build.

## Conclusion

Le gate AQ-406 de 13h est vert. Aucun bug test ou build à corriger dans ce passage. Aucun changement applicatif ajouté, seulement ce rapport.
