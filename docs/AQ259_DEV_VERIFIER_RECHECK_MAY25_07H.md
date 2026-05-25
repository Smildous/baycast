# AQ-259 dev verifier recheck, 25 mai 2026 07h UTC

Recheck fait dans `/root/baycast-dev`, après `git fetch origin main` puis `git rebase origin/main`. La branche `main` était déjà à jour.

Horodatage du run: `2026-05-25T07:02:23Z`.

`npm run verify:public-bcp`

Résultat: exit `0`.

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

Source de preuve: HTML public récupéré par `scripts/verify-public-bcp-surfaces.mjs` avec `fetch`, sur les routes listées dans le script. Le script ne crée pas de client Supabase et ne lit aucune table.

`npm run verify:first-settlement-evidence`

Résultat: exit `1`.

Sortie utile:

```json
{
  "ok": false,
  "error": "Missing SUPABASE_URL/NEXT_PUBLIC_SUPABASE_URL or SUPABASE_ANON_KEY/NEXT_PUBLIC_SUPABASE_ANON_KEY"
}
```

Interprétation: ce clone dev n'a pas de `.env.local`, seulement `.env.example`. Je ne marque donc pas ce gate comme passé. La vérification Supabase doit être relancée depuis le clone canonique qui a l'env service_role.

Source de preuve attendue si l'env existe: table `questions` uniquement. `scripts/first-settlement-evidence.mjs` appelle `getClient()`, sonde `questions.resolution_source` et `questions.resolution_url`, puis lit `questions` avec `id,title,status,category,closes_at` et les colonnes de source publiques disponibles. Il filtre les questions de juin 2026 et choisit le candidat Apple Mac Pro ou le plus proche de la date cible.

Inspection no forecast read

Je n'ai pas interrogé Supabase forecasts et je n'ai pas lu la table `forecasts`.

Preuve source:

```text
scripts/first-settlement-evidence.mjs:6  Reads questions only. It never queries forecasts and never writes to Supabase.
scripts/first-settlement-evidence.mjs:25-29  hasColumn(client, column) -> client.from('questions').select(column).limit(1)
scripts/first-settlement-evidence.mjs:60-65  client.from('questions').select(selectColumns).gte('closes_at', JUNE_FROM).lte('closes_at', JUNE_UNTIL).order('closes_at')
scripts/verify-public-bcp-surfaces.mjs:104-123  fetchRoute(route) uses fetch(url) for public HTML, no Supabase client
```

Le mot `forecasts` existe dans d'autres scripts du repo, par exemple des helpers admin et seeders, mais pas dans le chemin exécuté par `verify:first-settlement-evidence` hors commentaire de garantie. Le script importé `scripts/supabase-admin.mjs` contient des fonctions qui peuvent lire `forecasts` quand elles sont appelées par d'autres commandes, mais `first-settlement-evidence.mjs` n'appelle que `getClient()`. `getClient()` charge `.env.local` si présent et construit le client, sans requête table.

Statut Apple Mac Pro et settlement

Dans ce clone, le gate evidence n'a pas pu accéder à Supabase à cause de l'env manquante. Je ne peux donc pas confirmer depuis `/root/baycast-dev` que Apple Mac Pro reste open jusqu'au close. Aucun settlement n'a été fait, aucune écriture Supabase n'a été lancée, et aucune lecture `forecasts` n'a été faite.
