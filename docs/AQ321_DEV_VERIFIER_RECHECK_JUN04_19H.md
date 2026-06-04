# AQ-321 dev verifier recheck, 4 juin 19h

Recheck fait dans `/root/baycast-dev` après mise à jour sur `origin/main`. Le dépôt était déjà à jour.

## Commandes et résultats

`git diff --check`

Résultat: OK, aucun avertissement whitespace.

`npm run verify:public-bcp`

Résultat: OK. Le vérificateur public BCP a validé les surfaces suivantes sur `https://baycast-p.vercel.app`: `/`, `/questions`, `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`, `/leaderboard`, `/activity`.

`npm run verify:first-settlement-evidence`

Résultat: OK. Sortie utile:

```json
{
  "ok": true,
  "mode": "readonly",
  "table": "questions",
  "checked_at": "2026-06-04T19:01:21.663Z",
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

## Candidat

Le candidat retourné est `Will Apple announce a new Mac Pro at WWDC 2026?`. La raison du choix est `Apple Mac Pro exact match`. Le statut est `open`, avec fermeture le `2026-06-13T00:00:00+00:00`.

Source publique indiquée: Apple WWDC et Apple Newsroom, `https://developer.apple.com/wwdc26/` et `https://www.apple.com/newsroom/`.

## Preuve de lecture de table

J’ai vérifié le script `scripts/first-settlement-evidence.mjs` sans lire `forecasts`.

Le script annonce explicitement: `Reads questions only. It never queries forecasts and never writes to Supabase.`

Les accès Supabase vus dans le script ciblent `questions`:

```js
client.from('questions').select(column).limit(1)
```

et:

```js
client
  .from('questions')
  .select(selectColumns)
  .gte('closes_at', JUNE_FROM)
  .lte('closes_at', JUNE_UNTIL)
  .order('closes_at', { ascending: true })
```

La sortie du vérificateur confirme aussi `mode: readonly` et `table: questions`.

## Verdict

Gate AQ-321 validé côté dev à 19h. Les trois commandes demandées passent. Le vérificateur est en lecture seule, lit `questions`, et ne lit pas `forecasts`.
