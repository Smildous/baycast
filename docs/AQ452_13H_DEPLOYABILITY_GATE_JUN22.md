# AQ-452 13h deployability gate, Jun 22

Point de départ: `c47f4be00cb1a2435839e4ae01a5eac295e326fd` sur `origin/main` après `git fetch origin main` puis `git merge --ff-only origin/main`. Le clone utilisé est `/root/baycast-dev`.

Environnement: Node `v22.22.2`, npm `10.9.7`.

## Résultat

Verdict: prêt pour déploiement.

Les contrôles demandés passent. Aucun changement de code n'a été fait. La seule modification volontaire est ce document.

## Commandes exécutées

`git diff --check`

Résultat: PASS. Aucune erreur d'espace ou de diff signalée.

`npm run verify:next-settlement-watch`

Résultat: PASS. Le script confirme les trois marchés surveillés:

- FIFA opening match at least three goals
- OpenAI public video generation model before July 1 2026
- Microsoft first-party Xbox handheld before Aug 1 2026

`npm run verify:distribution-gate`

Résultat: PASS. Vérification faite sur `https://baycast-p.vercel.app` avec succès pour `/settlements/apple-mac-pro-wwdc-2026`, `/questions?status=resolved` et `/`.

`npm run verify:public-bcp`

Résultat: PASS. Vérification faite sur `https://baycast-p.vercel.app` avec succès pour `/`, `/questions`, `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`, `/leaderboard` et `/activity`.

`npm test`

Résultat: PASS. Vitest a passé 12 fichiers de test et 110 tests.

`rm -rf .next && npm run build`

Résultat: PASS. `next build` a compilé l'application, vérifié les types, généré 27 pages statiques et terminé sans échec.

## Échecs et contournements

Aucun échec rencontré. Pas besoin de relancer sous Node 20, aucun problème `node:util/styleText` ni Rolldown observé.
