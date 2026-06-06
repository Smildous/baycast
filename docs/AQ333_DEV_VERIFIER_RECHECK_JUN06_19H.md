# AQ-333 dev verifier recheck, 6 juin 2026 19h

Recheck fait depuis `/root/baycast-dev` sur `main`, après `git fetch origin`, `git checkout main` et `git pull --ff-only origin main`.

## Résultat

Verdict: PASS.

Les deux verifiers demandés passent. Le verifier first settlement annonce lui-même `mode: readonly` et `table: questions` dans sa sortie JSON.

Statement exact no-forecast-read: `npm run verify:first-settlement-evidence` ran in readonly mode and read the `questions` table, not `forecasts`. I did not query `forecasts`.

## Commandes lancées

### Sync main

Commande: `git fetch origin && git checkout main && git pull --ff-only origin main`

Sortie résumée:

```text
Already on 'main'
Your branch is up to date with 'origin/main'.
From https://github.com/Smildous/baycast
 * branch            main       -> FETCH_HEAD
Already up to date.
```

Résultat: PASS.

### Diff check

Commande: `git diff --check`

Sortie résumée:

```text
(no output)
```

Résultat: PASS.

### Public BCP verifier

Commande: `npm run verify:public-bcp`

Sortie résumée:

```text
Verifying public BCP surfaces at https://baycast-p.vercel.app
ok /
ok /questions
ok /questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248
ok /leaderboard
ok /activity
Public BCP surface verification passed.
```

Résultat: PASS.

### First settlement evidence verifier

Commande: `npm run verify:first-settlement-evidence`

Sortie résumée:

```json
{
  "ok": true,
  "mode": "readonly",
  "table": "questions",
  "checked_at": "2026-06-06T19:01:38.816Z",
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

Résultat: PASS.

Le point important pour AQ-333 est clair dans la sortie: le mode est `readonly`, la table lue est `questions`, pas `forecasts`.
