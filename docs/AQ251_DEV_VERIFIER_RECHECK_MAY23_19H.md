# AQ-251 dev verifier recheck, 23 mai 2026 19h

Recheck lancé depuis `/root/baycast-dev`, synchronisé sur `origin/main` à `333d68f` avant les gates. `npm install` était déjà à jour.

Commande de synchro utilisée: `git fetch origin main && git reset --hard origin/main && npm install`.

`npm run verify:public-bcp` : pass.

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

`npm run verify:first-settlement-evidence` : premier lancement bloqué par l'absence de variables Supabase dans `/root/baycast-dev`. Relance faite depuis le même clone avec les variables déjà présentes dans `/root/baycast/.env.local`, sans requête manuelle et sans écriture Supabase.

Commande relancée: `set -a; . /root/baycast/.env.local; set +a; npm run verify:first-settlement-evidence`.

Sortie utile:

```json
{
  "ok": true,
  "mode": "readonly",
  "table": "questions",
  "checked_at": "2026-05-23T19:02:55.079Z",
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

Le candidat Apple Mac Pro reste ouvert. Le gate retourne `status: open` pour `Will Apple announce a new Mac Pro at WWDC 2026?`, fermeture le 13 juin 2026 à 00:00 UTC.

Inspection de `scripts/first-settlement-evidence.mjs`: conforme. Le script lit `questions` uniquement. Les probes de colonnes font `client.from('questions')`, puis la recherche de juin fait aussi `client.from('questions')`. La seule occurrence du mot `forecasts` est dans le commentaire de garde qui dit que le script ne le requête jamais. Aucune requête vers `forecasts` n'a été lancée pendant ce recheck.
