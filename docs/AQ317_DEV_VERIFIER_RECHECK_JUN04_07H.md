# AQ-317 Dev verifier recheck, 4 juin 2026 07h UTC

Recheck fait depuis `/root/baycast-dev` sur `origin/main` synchronisé.

Commit vérifié avant ajout de cette note: `7133d0bdf2a7053e785e6081a9f017f4a3ea7c71`.

`npm ci` a été nécessaire car `node_modules` était absent. Installation terminée, avec les avertissements npm déjà remontés sur paquets dépréciés et audit.

`git diff --check` est passé sans sortie.

`npm run verify:public-bcp` est passé. Surfaces publiques contrôlées sur `https://baycast-p.vercel.app`: `/`, `/questions`, `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`, `/leaderboard`, `/activity`. Résultat: `Public BCP surface verification passed.`

`npm run verify:first-settlement-evidence` est passé. Résultat `ok: true`, mode `readonly`, table `questions`, contrôle à `2026-06-04T07:01:54.968Z`. Candidat confirmé: `Will Apple announce a new Mac Pro at WWDC 2026?`, statut `open`, fermeture `2026-06-13T00:00:00+00:00`.

Le vérificateur first-settlement est en lecture seule. Il lit la table `questions`, pas la table `forecasts`.
