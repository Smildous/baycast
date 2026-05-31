# AQ-292 verifier recheck, May 31 07h UTC

Recheck fait depuis `/root/baycast-dev`, après remise exacte sur `origin/main`.

Je n'ai pas lu la table `forecasts`. Le contrôle du script montre que `scripts/first-settlement-evidence.mjs` annonce un mode read-only, utilise `.from('questions')`, sort `table: 'questions'`, et ne contient pas d'appel à `.from('forecasts')`.

`git fetch origin && git reset --hard origin/main`: PASS. HEAD remis sur `origin/main`, commit `a6e0f92`.

`git diff --check`: PASS. Aucune erreur whitespace.

`npm run verify:public-bcp`: PASS. Production OK sur `/`, `/questions`, `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`, `/leaderboard`, `/activity`.

`npm run verify:first-settlement-evidence`: NON LANCÉ. `.env.local` est absent dans `/root/baycast-dev`. Odin doit lancer ce contrôle depuis le repo canonique `/root/baycast`, avec les variables Supabase disponibles.

Env manquante: oui, `.env.local` absent dans ce clone dev.

Lecture verifier: `questions` seulement. Je n'ai pas lu `forecasts`, et ce recheck ne valide pas la preuve de settlement en dev faute d'env locale.
