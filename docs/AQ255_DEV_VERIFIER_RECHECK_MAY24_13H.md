# AQ-255 dev verifier recheck, May 24 13h

Recheck fait depuis `/root/baycast-dev` après remise propre sur `origin/main`.

Commande: `git fetch origin && git reset --hard origin/main`
Résultat: succès. HEAD remis sur `1baae1f docs(AQ-253): add dev verifier recheck at 07h`.

Commande: `npm run verify:public-bcp`
Résultat: succès.

Sortie utile:

```text
Verifying public BCP surfaces at https://baycast-p.vercel.app
ok /
ok /questions
ok /questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248
ok /leaderboard
ok /activity
Public BCP surface verification passed.
```

Commande: `npm run verify:first-settlement-evidence`
Résultat: échec attendu dans cet environnement, avant lecture Supabase, faute de variables Supabase.

Sortie utile:

```json
{
  "ok": false,
  "error": "Missing SUPABASE_URL/NEXT_PUBLIC_SUPABASE_URL or SUPABASE_ANON_KEY/NEXT_PUBLIC_SUPABASE_ANON_KEY"
}
```

Commande: `git diff --check`
Résultat: succès, aucune sortie.

Inspection source: `scripts/first-settlement-evidence.mjs` annonce en commentaire qu'il lit seulement `questions`, ne lit jamais `forecasts`, et le code confirme que les appels Supabase utilisent `client.from('questions')` pour les probes de colonnes et la recherche June 2026. Aucun appel `client.from('forecasts')` n'est présent dans ce vérificateur.

Conclusion: le gate public BCP passe. Le gate first-settlement n'a pas pu interroger Supabase ici car les variables d'environnement manquent, mais le vérificateur est bien limité à `questions` et ne requête pas `forecasts`.
