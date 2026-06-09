# AQ-351 Dev verifier recheck, 09 juin, 19h

Recheck fait dans `/root/baycast` après `git pull origin main`. La branche était déjà à jour.

`git diff --check` a fini avec exit code 0. Aucun problème d’espace ou de diff invalide signalé.

`npm run verify:public-bcp` a fini avec exit code 0. Le script a vérifié la prod `https://baycast-p.vercel.app` et a validé `/`, `/questions`, la question publique `13aa9f2f-3226-4213-a04f-0cc2b87ad248`, `/leaderboard` et `/activity`. Verdict du script: `Public BCP surface verification passed.`

`npm run verify:first-settlement-evidence` a fini avec exit code 0. La sortie JSON indique `ok: true`, `mode: readonly` et `table: questions`. Le candidat relu est `Will Apple announce a new Mac Pro at WWDC 2026?`, statut `open`, fermeture `2026-06-13T00:00:00+00:00`. La source de résolution attendue est Apple WWDC et Apple Newsroom. Le checklist demande de confirmer le titre, d’ouvrir la source publique avant settlement, de capturer les éléments publics et de ne pas inspecter les données Blind Consensus protégées pour les questions ouvertes.

Point demandé: le vérificateur first-settlement annonce bien un mode readonly et lit la table `questions`, pas une table de forecasts. Je n’ai pas lu de lignes Supabase `forecasts`.

Verdict: AQ-351 Dev recheck vert. Aucun changement de code requis.
