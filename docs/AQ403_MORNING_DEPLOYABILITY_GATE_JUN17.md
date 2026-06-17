# AQ-403, gate de déployabilité du 17 juin matin

Passage fait le 2026-06-17 à 07:04 UTC sur `/root/baycast-dev`.

Base vérifiée : `ac387db0935c25e251febdfbbb87e9f6cc241385`.
Branche : `main`.
Synchronisation initiale : `git fetch origin main && git merge --ff-only origin/main`, dépôt déjà à jour.
Runtime local : Node `v22.22.2`, npm `10.9.7`. Pas de bascule Node 20, le build n'a pas rencontré l'échec styleText ou Rolldown.

## Résultats

`git diff --check`

Résultat : OK, aucune erreur de whitespace.

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

Le gate AQ-403 du matin est vert. Aucun bug test ou build à corriger dans ce passage. Aucun changement applicatif ajouté, seulement ce rapport.
