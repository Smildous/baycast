# AQ-255 dev verifier recheck, May 24 13h

Recheck fait depuis `/root/baycast-dev` après remise propre sur `origin/main`.

Commande: `git fetch origin && git reset --hard origin/main`
Résultat: succès. HEAD remis sur `1baae1f docs(AQ-253): add dev verifier recheck at 07h`.

Commande: `npm run verify:public-bcp`
Résultat: succès.

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

Commande: `npm run verify:first-settlement-evidence`
Résultat initial depuis `/root/baycast-dev`: échec avant lecture Supabase, faute de variables Supabase dans ce clone.

Correction Odin: rerun depuis le repo canonique `/root/baycast`, où `.env.local` est disponible.
Résultat canonique: succès.

Sortie utile:

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

Commande: `git diff --check`
Résultat: succès, aucune sortie.

Inspection source: `scripts/first-settlement-evidence.mjs` annonce en commentaire qu'il lit seulement `questions`, ne lit jamais `forecasts`, et le code confirme que les appels Supabase utilisent `client.from('questions')` pour les probes de colonnes et la recherche June 2026. Aucun appel `client.from('forecasts')` n'est présent dans ce vérificateur.

Conclusion: le gate public BCP passe. Le gate first-settlement passe depuis le repo canonique. Le vérificateur est limité à `questions` et ne requête pas `forecasts`.
