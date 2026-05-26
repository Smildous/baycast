# AQ-265 dev verifier recheck, 26 mai 2026 07h UTC

Recheck fait depuis `/root/baycast-dev`, après remise propre sur `origin/main`.

Commande de départ:

```sh
git fetch origin && git reset --hard origin/main
```

Résultat: clone aligné sur `origin/main` à `71cf297`.

Gate public BCP:

```sh
npm run verify:public-bcp
```

Résultat: pass.

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

Gate first settlement evidence:

```sh
npm run verify:first-settlement-evidence
```

Résultat: non exécutable dans ce clone dev, faute de variables Supabase.

Sortie utile:

```json
{
  "ok": false,
  "error": "Missing SUPABASE_URL/NEXT_PUBLIC_SUPABASE_URL or SUPABASE_ANON_KEY/NEXT_PUBLIC_SUPABASE_ANON_KEY"
}
```

Je n'ai pas contourné l'environnement et je n'ai lancé aucune requête contre `forecasts`.

Lecture source du vérificateur first settlement: `scripts/first-settlement-evidence.mjs`.

Le script indique son mode read-only et le code confirme le périmètre:

```text
ligne 6: Reads questions only. It never queries forecasts and never writes to Supabase.
ligne 26: client.from('questions').select(column).limit(1)
lignes 60 à 65: client.from('questions').select(selectColumns).gte('closes_at', JUNE_FROM).lte('closes_at', JUNE_UNTIL).order('closes_at')
```

Le verifier sonde seulement les colonnes `resolution_source` et `resolution_url` sur `questions`, puis lit les questions de juin 2026 avec `id`, `title`, `status`, `category`, `closes_at` et les colonnes de source disponibles. Il ne contient pas d'appel `client.from('forecasts')`.

Contrôle whitespace:

```sh
git diff --check
```

Résultat: pass, aucune erreur signalée.

Conclusion: le gate public passe. Le gate first settlement est bloqué ici par l'absence de secrets Supabase dans `/root/baycast-dev`, mais le script inspecté lit seulement `questions` et ne requête pas `forecasts`.
