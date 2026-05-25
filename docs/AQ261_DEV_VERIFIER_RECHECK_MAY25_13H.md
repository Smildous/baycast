# AQ-261 dev verifier recheck, 25 mai 2026 13h UTC

Recheck fait dans `/root/baycast-dev`, après sync propre sur `origin/main` avec `git fetch origin && git checkout main && git reset --hard origin/main`.

Horodatage du run: `2026-05-25T13:02:19Z`.

`npm run verify:public-bcp`

Résultat: PASS, exit `0`.

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

`npm run verify:first-settlement-evidence`

Résultat: FAIL dans ce clone dev, exit `1`.

Sortie utile:

```json
{
  "ok": false,
  "error": "Missing SUPABASE_URL/NEXT_PUBLIC_SUPABASE_URL or SUPABASE_ANON_KEY/NEXT_PUBLIC_SUPABASE_ANON_KEY"
}
```

Interprétation: `/root/baycast-dev` n'a pas d'env Supabase utilisable pour ce verifier. Le clone contient `.env.example`, pas `.env.local`. Je ne marque donc pas ce gate comme passé depuis ce clone.

Statut Apple Mac Pro: non retourné par le verifier pendant ce run, car il s'arrête avant la lecture Supabase sur l'erreur d'env manquante. Je n'ai donc pas de statut `open` ou `closed` vérifié depuis `/root/baycast-dev` pour la question Apple Mac Pro.

Inspection no forecast read

Je n'ai pas interrogé les forecasts manuellement. Je n'ai pas écrit de live data. La seule inspection source faite pour ce point confirme que `scripts/first-settlement-evidence.mjs` lit `questions`, pas `forecasts`:

```text
scripts/first-settlement-evidence.mjs:6  Reads questions only. It never queries forecasts and never writes to Supabase.
scripts/first-settlement-evidence.mjs:26 client.from('questions').select(column).limit(1)
scripts/first-settlement-evidence.mjs:60-65 client.from('questions').select(selectColumns).gte('closes_at', JUNE_FROM).lte('closes_at', JUNE_UNTIL).order('closes_at')
```

Le script sélectionne `id,title,status,category,closes_at` et les colonnes publiques de source de résolution disponibles sur `questions`. Aucune requête `forecasts` n'est dans le chemin du verifier `verify:first-settlement-evidence`.
