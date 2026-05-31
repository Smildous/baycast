# AQ-294 dev verifier recheck, 31 mai 2026 13h UTC

Recheck lancé dans `/root/baycast-dev` après remise à zéro sur `origin/main`.

Commit de base: `c7ae2d1`
Horodatage: `2026-05-31T13:02:54Z`

## Commandes et verdict

`git fetch origin && git reset --hard origin/main && git clean -fd && git stash clear`

Résultat: OK. Le clone est revenu sur `origin/main`.

Sortie utile:

```text
HEAD is now at c7ae2d1 docs(AQ-292): add product live recheck at 07h
```

`git diff --check`

Résultat: OK. Aucune erreur whitespace.

Sortie utile: aucune.

`npm run verify:public-bcp`

Résultat: OK.

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

Résultat: bloqué par configuration locale manquante pour Supabase. Je ne marque pas ce gate comme passé.

Sortie utile:

```json
{
  "ok": false,
  "error": "Missing SUPABASE_URL/NEXT_PUBLIC_SUPABASE_URL or SUPABASE_ANON_KEY/NEXT_PUBLIC_SUPABASE_ANON_KEY"
}
```

Note: `.env.local` existe dans le clone, mais les variables Supabase nécessaires ne sont pas disponibles pour cette commande dans l'environnement d'exécution. Le blocage touche seulement `verify:first-settlement-evidence`. `verify:public-bcp` passe sans ces variables.

## Lecture forecasts et readonly

Le script `scripts/first-settlement-evidence.mjs` est readonly côté code exécuté:

- il appelle `getClient()` sans option d'écriture
- il interroge uniquement `questions`
- il utilise `select`, `gte`, `lte`, `order` et des probes de colonnes en `select(...).limit(1)`
- aucune opération `insert`, `update`, `delete`, `upsert` ou `rpc` n'apparaît dans ce script
- aucune requête vers `forecasts` n'apparaît dans ce script

Le rapport produit par le script, quand l'environnement Supabase est présent, déclare aussi `mode: "readonly"` et `table: "questions"`.

## Verdict

`git diff --check`: OK.

`verify:public-bcp`: OK.

`verify:first-settlement-evidence`: non exécuté jusqu'au bout, bloqué par variables Supabase manquantes. Pas de succès simulé.

Aucun correctif de code n'a été appliqué, car l'échec observé vient de la configuration locale du verifier Supabase, pas d'une erreur de code détectée pendant ce recheck.
