# AQ-253 dev verifier recheck, May 24 07h

J'ai créé ce fichier avant les commandes git, puis j'ai remis `/root/baycast-dev` sur `origin/main`.

Résultat: PASS.

`git fetch origin && git checkout main && git pull --rebase origin main`
PASS. Branche `main` à jour après fast-forward vers `33acdaa`.

`npm run verify:public-bcp`
PASS. Le vérificateur a contrôlé `https://baycast-p.vercel.app` et les surfaces publiques suivantes ont répondu ok: `/`, `/questions`, `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`, `/leaderboard`, `/activity`. Message final: `Public BCP surface verification passed.`

`npm run verify:first-settlement-evidence`
PASS. Exécuté en lecture seule avec l'environnement canonique `/root/baycast/.env.local`, sans afficher de secret. Sortie utile: `ok: true`, `mode: readonly`, `table: questions`, candidat `Will Apple announce a new Mac Pro at WWDC 2026?`, statut `open`, clôture `2026-06-13T00:00:00+00:00`. La checklist rappelle de ne régler qu'après la clôture et après une source publique directe.

Inspection du script `scripts/first-settlement-evidence.mjs`
PASS. Le script déclare qu'il lit seulement `questions`, ne requête jamais `forecasts` et n'écrit pas dans Supabase. Les accès observés sont `client.from('questions')` pour les probes de colonnes et la sélection des candidates de juin. Aucune lecture de la table `forecasts` dans ce vérificateur.

`git diff --check`
PASS. Aucune erreur d'espaces ou de marqueurs de conflit.

Déclaration no-forecast-read: pendant ce recheck, je n'ai pas interrogé Supabase `forecasts`, je n'ai pas lu la table `forecasts`, et le vérificateur first-settlement evidence inspecté lit uniquement `questions`.
