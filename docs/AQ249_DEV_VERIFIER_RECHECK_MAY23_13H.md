# AQ-249 dev verifier recheck, 23 mai 2026 13h

Recheck lancé depuis `/root/baycast` après `git pull origin main`. La branche était déjà à jour avec `origin/main`.

`npm run verify:public-bcp` : pass.

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

`npm run verify:first-settlement-evidence` : pass.

Sortie utile :

```json
{
  "ok": true,
  "mode": "readonly",
  "table": "questions",
  "checked_at": "2026-05-23T13:01:49.094Z",
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

Inspection du script `scripts/first-settlement-evidence.mjs` : conforme. Le fichier annonce en commentaire qu’il lit seulement `questions` et ne requête jamais `forecasts`. Le code effectif utilise `client.from('questions')` pour les probes de colonnes puis pour la recherche des questions de juin. Aucune référence `client.from('forecasts')` ni requête vers `forecasts` n’est présente dans ce script.

Aucune requête Supabase `forecasts` n’a été lancée pendant ce recheck.
