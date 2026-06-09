# AQ-347 dev verifier recheck, 9 juin 2026 07h

Recheck fait depuis `/root/baycast-dev` sur `main`, après sync avec `origin/main`.

Verdict: PASS.

Les deux verifiers demandés passent. Le verifier first settlement est en lecture seule, lit `questions`, et ne lit pas `forecasts`. Je n'ai pas interrogé la table `forecasts`.

Point de sécurité settlement: le candidat Apple Mac Pro est toujours `open` et ferme à `2026-06-13T00:00:00+00:00`. Rien dans ce recheck ne le settle avant la fermeture.

## Commandes et résultats

### Sync main

Commande:

```text
git fetch origin && git checkout main && git pull --ff-only origin main
```

Résultat:

```text
Already on 'main'
Your branch is up to date with 'origin/main'.
From https://github.com/Smildous/baycast
 * branch            main       -> FETCH_HEAD
Already up to date.
```

Statut: PASS.

### Diff check

Commande:

```text
git diff --check
```

Résultat:

```text
(no output)
```

Statut: PASS.

### Public BCP verifier

Commande:

```text
npm run verify:public-bcp
```

Résultat:

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

Statut: PASS. Les surfaces couvertes sont `/`, `/questions`, la route UUID Apple, `/leaderboard` et `/activity`.

### First settlement evidence verifier

Commande:

```text
npm run verify:first-settlement-evidence
```

Résultat:

```text
> baycast@0.1.0 verify:first-settlement-evidence
> node scripts/first-settlement-evidence.mjs

{
  "ok": true,
  "mode": "readonly",
  "table": "questions",
  "checked_at": "2026-06-09T07:01:24.750Z",
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

Statut: PASS.

J'ai aussi relu `scripts/first-settlement-evidence.mjs` pour confirmer le comportement. Le commentaire du script dit: `Reads questions only. It never queries forecasts and never writes to Supabase.` Les seules requêtes Supabase dans ce fichier utilisent `client.from('questions').select(...)`. Je n'ai vu aucune requête vers `forecasts` et aucune écriture.
