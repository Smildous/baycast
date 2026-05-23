# AQ-247 dev verifier recheck, 23 mai 07h

Fichier créé avant le pull, puis dépôt tiré depuis `/root/baycast`. Le pull a répondu `Already up to date.`

J’ai relancé les deux vérifications demandées depuis `/root/baycast`.

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
  "checked_at": "2026-05-23T07:02:04.448Z",
  "candidate_reason": "Apple Mac Pro exact match",
  "candidate": {
    "title": "Will Apple announce a new Mac Pro at WWDC 2026?",
    "status": "open",
    "closes_at": "2026-06-13T00:00:00+00:00",
    "resolution_source": "Apple WWDC and Apple Newsroom: https://developer.apple.com/wwdc26/ and https://www.apple.com/newsroom/",
    "resolution_url": null
  },
  "checklist": [
    "Confirm the candidate title matches the intended first settlement.",
    "Open the public source URL before settlement.",
    "Capture source title, publisher, URL, and retrieval timestamp.",
    "Save public evidence only. Do not inspect protected Blind Consensus data for open questions.",
    "Settle only after close time and after the source directly answers the question."
  ]
}
```

Inspection rapide du code.

Dans `scripts/first-settlement-evidence.mjs`, le commentaire d’en-tête dit explicitement que le script lit seulement `questions`, ne requête jamais `forecasts` et n’écrit pas dans Supabase. Le code confirme ça: les probes de colonnes font `client.from('questions').select(column).limit(1)`, puis la requête principale fait aussi `client.from('questions').select(selectColumns)` avec des filtres sur `closes_at`. Je n’ai vu aucun accès à une table de forecasts, ni aucun appel d’écriture.

Dans `scripts/verify-public-bcp-surfaces.mjs`, `ROUTES` contient la route directe de la question Apple: `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`. Le verifier fetch chaque route publique de cette liste et cherche les champs ou copies qui pourraient exposer le consensus BCP sur les pages publiques. Le run ci-dessus confirme que cette route directe passe.

`git diff --check` n’a produit aucune sortie et a terminé avec le code 0.
