# AQ-263 dev verifier recheck, 25 mai 2026 19h

Recheck fait dans `/root/baycast-dev` après remise propre sur `origin/main`.

Commande de départ :

```bash
git fetch origin && git reset --hard origin/main
```

Résultat : HEAD remis sur `7233127 docs(AQ-261): add product live recheck at 13h`.

## Vérification public BCP

Commande :

```bash
npm run verify:public-bcp
```

Résultat : OK.

Sortie utile :

```text
Verifying public BCP surfaces at https://baycast-p.vercel.app
ok /
ok /questions
ok /questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248
ok /leaderboard
ok /activity
Public BCP surface verification passed.
```

## Vérification first settlement evidence

Commande :

```bash
npm run verify:first-settlement-evidence
```

Résultat : échec d'environnement, pas un échec métier du verifier.

Sortie :

```json
{
  "ok": false,
  "error": "Missing SUPABASE_URL/NEXT_PUBLIC_SUPABASE_URL or SUPABASE_ANON_KEY/NEXT_PUBLIC_SUPABASE_ANON_KEY"
}
```

Le clone dev n'a pas les variables Supabase nécessaires. Je n'ai pas interrogé Supabase et je n'ai pas interrogé `forecasts`.

## Contrôle du verifier

Source inspectée : `scripts/first-settlement-evidence.mjs`.

Le script annonce lui-même son périmètre en commentaire : il lit `questions` seulement, ne requête jamais `forecasts` et n'écrit pas dans Supabase. Le code confirme ça :

```text
line 6: Reads questions only. It never queries forecasts and never writes to Supabase.
line 26: client.from('questions').select(column).limit(1)
line 60-65: client.from('questions').select(...).gte(...).lte(...).order(...)
line 88: table: 'questions'
```

Aucune référence à `forecasts` dans ce verifier.

## Apple Mac Pro et blocage settlement

Le verifier cible bien le titre `Will Apple announce a new Mac Pro at WWDC 2026?` et la close time `2026-06-13T00:00:00.000Z` dans son code.

Statut Apple Mac Pro : non disponible depuis ce clone, car la vérification Supabase s'arrête avant lecture des données faute d'env.

Settlement : toujours bloqué jusqu'à la close. Même avec une source publique disponible, le checklist du verifier demande de ne régler qu'après la close time et après lecture d'une source publique qui répond directement à la question.

Horodatage du recheck : `2026-05-25 19:01:28 UTC`.
