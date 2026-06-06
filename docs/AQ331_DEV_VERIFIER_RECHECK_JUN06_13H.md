# AQ-331 dev verifier recheck, 06 juin 2026 13h

Recheck fait dans `/root/baycast-dev` après fast-forward depuis `origin/main`.

Je n'ai pas lu ni interrogé la table `forecasts`. Le signal utile vient de la sortie du vérificateur first-settlement: `"mode": "readonly"` et `"table": "questions"`.

## Commandes et résultats exacts

### `git fetch origin main && git merge --ff-only origin/main`

```text
From https://github.com/Smildous/baycast
 * branch            main       -> FETCH_HEAD
Already up to date.
```

Résultat: exit code 0.

### `git diff --check`

```text
```

Résultat: exit code 0.

### `npm run verify:public-bcp`

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

Résultat: exit code 0.

### `npm run verify:first-settlement-evidence`

```text
> baycast@0.1.0 verify:first-settlement-evidence
> node scripts/first-settlement-evidence.mjs

{
  "ok": true,
  "mode": "readonly",
  "table": "questions",
  "checked_at": "2026-06-06T13:02:00.563Z",
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

Résultat: exit code 0.

## Verdict

AQ-331 est vert côté dev à 13h. Les surfaces publiques BCP répondent correctement. Le vérificateur first-settlement est en lecture seule, pointe sur `questions`, et garde la question Apple Mac Pro ouverte jusqu'au `2026-06-13T00:00:00+00:00`. Aucun accès à `forecasts` n'a été fait pour ce recheck.
