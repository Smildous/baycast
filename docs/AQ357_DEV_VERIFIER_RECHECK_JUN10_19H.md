# AQ-357 dev verifier recheck, 10 juin 19h

Recheck lancé depuis `/root/baycast-dev` après synchro de `main` avec `origin/main`.

`git diff --check` ne retourne aucune sortie et sort avec le code 0.

`npm run verify:public-bcp` passe. Le vérificateur lit les surfaces publiques BCP sur `https://baycast-p.vercel.app` uniquement, avec succès sur `/`, `/questions`, `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`, `/leaderboard` et `/activity`.

`npm run verify:first-settlement-evidence` passe en mode `readonly` sur la table `questions`. Le candidat trouvé est l’exact match Apple Mac Pro, titre `Will Apple announce a new Mac Pro at WWDC 2026?`, statut `open`.

Timestamp imprimé pour le contrôle: `checked_at` `2026-06-10T19:02:13.659Z`.

Close timestamp Apple Mac Pro imprimé: `2026-06-13T00:00:00+00:00`.

Portée lue par le verifier settlement: métadonnées publiques nécessaires dans `questions`, sans inspection de données Blind Consensus protégées pour une question ouverte. La checklist imprimée demande aussi d’ouvrir les sources publiques avant settlement et de ne sauvegarder que de l’évidence publique.

Verdict: PASS.

Blocker: aucun.
