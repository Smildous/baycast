# AQ-282 dev verifier recheck, 29 mai 2026 13h UTC

Recheck fait dans `/root/baycast-dev` après `git fetch origin && git reset --hard origin/main`. Le dépôt est revenu sur `origin/main` à `c66718c`.

`git diff --check` est passé. Sortie vide, aucun problème d'espace ou de conflit détecté.

`npm run verify:public-bcp` est passé. Le vérificateur a contrôlé les surfaces publiques sur `https://baycast-p.vercel.app` : `/`, `/questions`, la question publique `13aa9f2f-3226-4213-a04f-0cc2b87ad248`, `/leaderboard` et `/activity`. Sortie finale : `Public BCP surface verification passed.`

`npm run verify:first-settlement-evidence` est passé après chargement sûr des variables Supabase, sans afficher de secret. Résultat utile : `ok: true`, mode `readonly`, table `questions`, horodatage `2026-05-29T13:01:58.067Z`. Le candidat trouvé est `Will Apple announce a new Mac Pro at WWDC 2026?`, statut `open`, fermeture `2026-06-13T00:00:00+00:00`. La source publique configurée est `Apple WWDC and Apple Newsroom: https://developer.apple.com/wwdc26/ and https://www.apple.com/newsroom/`.

Contrôle lecture seule et absence de lecture forecasts : confirmé dans `package.json` et `scripts/first-settlement-evidence.mjs`. La commande `verify:first-settlement-evidence` lance `node scripts/first-settlement-evidence.mjs`. Le script se décrit comme `Read-only first-settlement evidence verifier`, lit uniquement la table `questions`, sélectionne `id`, `title`, `status`, `category`, `closes_at`, `resolution_source` et `resolution_url`, puis écrit seulement un rapport JSON sur stdout. Il ne contient pas de requête vers `forecasts` et aucun appel d'écriture Supabase.

Verdict : les deux gates demandées passent, et le vérificateur first-settlement reste bien limité à une lecture publique de preuve sur `questions`, sans lecture de forecasts.
