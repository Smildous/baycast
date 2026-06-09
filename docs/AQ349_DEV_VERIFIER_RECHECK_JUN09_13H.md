# AQ-349 dev verifier recheck, 09 juin 13h

Recheck fait depuis `/root/baycast-dev` sur `main` à jour avec `origin/main`.

Commande de remise à jour initiale:

```bash
git fetch origin && git checkout main && git pull --ff-only origin main
```

Résultat: pass. La branche locale a fast-forward vers `c2bc515`.

J'ai ensuite lancé les vérifications demandées.

```bash
git diff --check
```

Résultat: pass. Aucune erreur whitespace signalée.

```bash
npm run verify:public-bcp
```

Résultat: pass.

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

```bash
npm run verify:first-settlement-evidence
```

Résultat: pass.

Sortie utile:

```json
{
  "ok": true,
  "mode": "readonly",
  "table": "questions",
  "checked_at": "2026-06-09T13:01:35.887Z",
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

Le verifier first-settlement est resté read-only. La sortie annonce `mode: readonly` et `table: questions`. J'ai aussi contrôlé `scripts/first-settlement-evidence.mjs`: l'en-tête dit qu'il lit seulement `questions`, ne requête jamais `forecasts` et n'écrit pas dans Supabase. Le code utilise `client.from('questions')` pour les probes de colonnes et pour la sélection des candidates de juin. Aucun accès à `forecasts` n'est présent.

Conclusion: AQ-349 est recheck côté dev, avec public BCP pass et first-settlement evidence pass, sans lecture de `forecasts`.
