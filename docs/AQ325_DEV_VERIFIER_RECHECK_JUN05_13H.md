# AQ-325 dev verifier recheck, 05 juin 2026 13h

HEAD vérifié: `b862c8195e3961ad74a25621b391c624bd4571d4`

J'ai repris `origin/main` avant les checks. Le dépôt était déjà à jour.

## Résultat

PASS. Les trois commandes demandées passent.

## Commandes et preuves

`git fetch origin && git pull --rebase --ff-only origin main || git pull --rebase origin main`

```text
From https://github.com/Smildous/baycast
 * branch            main       -> FETCH_HEAD
Already up to date.
```

`git diff --check`

```text
PASS, aucune sortie.
```

`npm run verify:public-bcp`

```text
> baycast@0.1.0 verify:public-bcp
> node scripts/verify-public-bcp-surfaces.mjs

Verifying public BCP surfaces at https://baycast-p.vercel.app
ok /
ok /questions
ok /questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248
ok /leaderboard
ok /activity
Public BCP surface verification passed.
```

`npm run verify:first-settlement-evidence`

```json
{
  "ok": true,
  "mode": "readonly",
  "table": "questions",
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

## Lecture Supabase

Je n'ai pas lu la table `forecasts`.

Le vérifieur `scripts/first-settlement-evidence.mjs` est en lecture seule pour ce recheck. Les preuves utiles dans le fichier:

```text
line 6: Reads questions only. It never queries forecasts and never writes to Supabase.
line 26: client.from('questions').select(column).limit(1)
line 61: .from('questions')
line 87: mode: 'readonly'
```

Je n'ai trouvé aucun appel d'écriture dans ce script pendant la revue ciblée: pas de `insert`, `update`, `upsert` ou `delete`.
