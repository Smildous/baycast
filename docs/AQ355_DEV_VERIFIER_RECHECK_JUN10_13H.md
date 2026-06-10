# AQ-355 Dev verifier recheck, 10 juin 2026 à 13h

Recheck fait dans `/root/baycast-dev` après fetch origin et pull fast-forward sur `main`. Le dépôt était déjà à jour.

`git diff --check` est passé sans sortie et avec code 0.

`npm run verify:public-bcp` est passé avec code 0. Résultat relevé :

```text
Verifying public BCP surfaces at https://baycast-p.vercel.app
ok /
ok /questions
ok /questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248
ok /leaderboard
ok /activity
Public BCP surface verification passed.
```

`npm run verify:first-settlement-evidence` est passé avec code 0. Résultat utile :

```json
{
  "ok": true,
  "mode": "readonly",
  "table": "questions",
  "checked_at": "2026-06-10T13:02:03.047Z",
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

J'ai vérifié la commande dans `package.json` : elle lance `node scripts/first-settlement-evidence.mjs`. Dans ce script, les seuls accès Supabase sont sur `questions` : un probe de colonnes avec `client.from('questions').select(column).limit(1)`, puis la lecture des questions de juin avec `client.from('questions').select(selectColumns)`. Le commentaire d'en-tête indique aussi que le script lit seulement `questions`, ne query pas `forecasts` et n'écrit pas dans Supabase. Je n'ai pas lu la table `forecasts`.

Statut candidat : `open`, fermeture prévue le `2026-06-13T00:00:00+00:00`. Aucun règlement avant cette date.

Verdict : gates verts côté dev. Le verifier first-settlement est read-only, ne lit pas `forecasts`, et le candidat public est bien identifié avec source publique Apple WWDC et Apple Newsroom.
