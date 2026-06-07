# AQ-337 dev verifier recheck, 07 juin 13h

Recheck fait depuis `/root/baycast-dev`, après création de ce fichier et mise à jour sur `origin/main`.

`git fetch origin` puis mise à jour vers `origin/main` : OK. Le dépôt était déjà à jour.

`git diff --check` : OK, aucun problème d'espaces ou de marqueurs de conflit détecté.

`npm run verify:public-bcp` : OK. Le script a vérifié `https://baycast-p.vercel.app` et les surfaces publiques `/`, `/questions`, une page question, `/leaderboard` et `/activity`. Résultat final : `Public BCP surface verification passed.`

`npm run verify:first-settlement-evidence` : OK. Le script a retourné `ok: true`, `mode: readonly`, `table: questions`. Le candidat trouvé est `Will Apple announce a new Mac Pro at WWDC 2026?`, raison `Apple Mac Pro exact match`, statut `open`, clôture `2026-06-13T00:00:00+00:00`. La source publique indiquée reste Apple WWDC et Apple Newsroom.

J'ai aussi vérifié l'entrée npm et le script appelé : `verify:first-settlement-evidence` lance `node scripts/first-settlement-evidence.mjs`. Le script se présente comme read-only, utilise seulement `client.from('questions')`, fait des probes de colonnes sur `questions`, lit les colonnes utiles de `questions`, puis affiche un rapport JSON. Il ne fait aucun write Supabase et ne lit pas la table `forecasts`.

Verdict : les gates techniques AQ-337 passent.

Le candidat reste ouvert : oui, le verifier retourne `status: open`. Aucune donnée forecasts n'a été consultée.
