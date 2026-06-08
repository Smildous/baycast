# AQ-341 dev verifier recheck, Jun 08 07h

Recheck lancé depuis `/root/baycast-dev` après fast-forward de `main` sur `origin/main`. Résultat git: `Already up to date.`

Aucune donnée de forecast n'a été lue. Je n'ai pas interrogé Supabase forecasts. Les commandes exécutées se limitent aux vérifications demandées et au flux git.

Premier settlement candidat: Apple Mac Pro. Close timestamp confirmé: `2026-06-13T00:00:00+00:00`.

## Commandes et sorties

### `git diff --check`

Pass.

```text
```

### `npm run verify:public-bcp`

Pass.

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

### `npm run verify:first-settlement-evidence`

Pass.

```json
{
  "ok": true,
  "mode": "readonly",
  "table": "questions",
  "checked_at": "2026-06-08T07:02:19.244Z",
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
