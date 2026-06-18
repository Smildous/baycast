# AQ-413, gate de déployabilité du 18 juin au matin

Passage fait le 2026-06-18 à 07:03 UTC sur `/root/baycast-dev`.

Base vérifiée : `3e97e2b01ebde52572d0509fc7452e49d5967b10`.
Branche : `main`.
Synchronisation initiale : `git fetch origin main && git merge --ff-only origin/main`, dépôt déjà à jour.
Runtime local : Node `v22.22.2`, npm `10.9.7`. Pas de bascule Node 20, Vitest et le build passent avec le runtime local.

## Résultats

`git diff --check`

Résultat : OK, aucune erreur de whitespace avant changement.

`npm run verify:next-settlement-watch`

Résultat : OK.

Sortie résumée :

- `next settlement watch: PASS`
- FIFA opening match at least three goals : ouvert, deadline `2026-06-30T23:59:59+00:00`
- OpenAI public video generation model before July 1 2026 : ouvert, deadline `2026-06-30T23:59:59+00:00`
- Microsoft first-party Xbox handheld before Aug 1 2026 : ouvert, deadline `2026-07-31T23:59:59+00:00`

`npm run verify:distribution-gate`

Résultat : OK sur `https://baycast-p.vercel.app`.

Sortie résumée :

- `ok /settlements/apple-mac-pro-wwdc-2026`
- `ok /questions?status=resolved`
- `ok /`
- `Distribution gate verification passed.`

`npm run verify:public-bcp`

Résultat : OK sur `https://baycast-p.vercel.app`.

Sortie résumée :

- `ok /`
- `ok /questions`
- `ok /questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`
- `ok /leaderboard`
- `ok /activity`
- `Public BCP surface verification passed.`

`npm test`

Résultat : OK.

Sortie résumée : Vitest a passé 12 fichiers de test et 110 tests. Durée annoncée : 14.74s.

`rm -rf .next && npm run build`

Résultat : OK.

Sortie résumée : Next.js 14.2.16 a compilé, validé les types, collecté les données de pages, généré 27 pages statiques et finalisé les traces de build. Un avertissement webpack sur la sérialisation de grandes chaînes est apparu, sans échec de build.

## Conclusion

Le gate AQ-413 du matin est vert. Aucun bug test ou build à corriger dans ce passage. Aucun changement applicatif ajouté, seulement ce rapport.
