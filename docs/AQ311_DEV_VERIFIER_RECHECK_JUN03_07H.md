# AQ-311, recheck dev des verifiers, 3 juin 07h

Clone dev resynchronise sur `origin/main` avant controle. Base locale: `6a4ca32`.

`git diff --check` passe sans sortie.

`npm run verify:public-bcp` passe avec cette sortie canonique:

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

`npm run verify:first-settlement-evidence` passe aussi. La sortie confirme le mode `readonly` et la table `questions`:

```json
{
  "ok": true,
  "mode": "readonly",
  "table": "questions",
  "checked_at": "2026-06-03T07:02:06.702Z",
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

Controle source du verifier premier settlement: `scripts/first-settlement-evidence.mjs` annonce explicitement qu'il lit seulement `questions`, puis ses deux acces Supabase sont `client.from('questions')`. Je n'ai trouve aucune requete vers `forecasts` dans ce verifier et je n'ai pas lu les forecasts.

Verdict: les trois gates demandes sont verts a 07h. Aucun bug code a corriger. Seul ce document est ajoute pour AQ-311.
