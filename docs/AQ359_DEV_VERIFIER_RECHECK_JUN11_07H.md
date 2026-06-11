# AQ-359 dev verifier recheck, 11 juin 07h UTC

Recheck fait dans `/root/baycast-dev` sur `main`, après synchro avec `origin/main`.

## Commandes lancées

```bash
git fetch origin && git checkout main && git pull --ff-only origin main
git status --short
git diff --check
npm run verify:public-bcp
npm run verify:first-settlement-evidence
```

## Résultats

`git fetch origin && git checkout main && git pull --ff-only origin main` : OK. Branche `main` déjà à jour avec `origin/main`.

`git status --short` avant création de ce fichier : aucun fichier modifié.

`git diff --check` : OK, aucune erreur de whitespace.

`npm run verify:public-bcp` : OK.

Surfaces publiques vérifiées sur `https://baycast-p.vercel.app` :

```text
ok /
ok /questions
ok /questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248
ok /leaderboard
ok /activity
Public BCP surface verification passed.
```

`npm run verify:first-settlement-evidence` : OK.

```json
{
  "ok": true,
  "mode": "readonly",
  "table": "questions",
  "checked_at": "2026-06-11T07:01:44.810Z",
  "candidate_reason": "Apple Mac Pro exact match",
  "candidate": {
    "title": "Will Apple announce a new Mac Pro at WWDC 2026?",
    "status": "open",
    "closes_at": "2026-06-13T00:00:00+00:00",
    "resolution_source": "Apple WWDC and Apple Newsroom: https://developer.apple.com/wwdc26/ and https://www.apple.com/newsroom/",
    "resolution_url": null
  }
}
```

Le candidat de premier settlement est bien la question Apple Mac Pro, clôture `2026-06-13T00:00:00+00:00`.

## Vérification lecture forecasts

Script inspecté : `scripts/first-settlement-evidence.mjs`.

Constat : le vérificateur est read-only et ne lit pas `forecasts`.

Lignes utiles :

```text
3  * Read-only first-settlement evidence verifier.
6  * Reads questions only. It never queries forecasts and never writes to Supabase.
25 async function hasColumn(client, column) {
26   const { error } = await client.from('questions').select(column).limit(1)
60   const { data, error } = await client
61     .from('questions')
62     .select(selectColumns)
63     .gte('closes_at', JUNE_FROM)
64     .lte('closes_at', JUNE_UNTIL)
65     .order('closes_at', { ascending: true })
85   const report = {
86     ok: true,
87     mode: 'readonly',
88     table: 'questions',
```

Il y a deux accès Supabase, tous les deux sur `questions`, avec `.select(...)`. Aucun `.from('forecasts')`, aucun write, aucun appel RPC.
