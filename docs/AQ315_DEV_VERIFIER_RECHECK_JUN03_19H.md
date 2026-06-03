# AQ-315 dev verifier recheck, Jun 03 19h UTC

Recheck fait depuis `/root/baycast-dev` après remise à zéro sur `origin/main`.

## Remise à zéro

Commande:

```bash
git fetch origin && git reset --hard origin/main
```

Sortie:

```text
From https://github.com/Smildous/baycast
   5a50c39..c95413f  main       -> origin/main
HEAD is now at c95413f docs(AQ-313): add product live recheck at 13h
```

Résultat: pass.

## Vérifications

Commande:

```bash
git diff --check
```

Sortie:

```text

```

Résultat: pass.

Commande:

```bash
npm run verify:public-bcp
```

Sortie:

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

Résultat: pass.

Commande:

```bash
npm run verify:first-settlement-evidence
```

Sortie:

```json
{
  "ok": true,
  "mode": "readonly",
  "table": "questions",
  "checked_at": "2026-06-03T19:02:05.396Z",
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

Résultat: pass.

## Candidat AQ-315

Titre: Will Apple announce a new Mac Pro at WWDC 2026?

Statut: open.

Close time: 2026-06-13T00:00:00+00:00.

Il n'y a donc pas de settlement à faire avant la clôture.

## Lecture du verifier first settlement

J'ai relu `scripts/first-settlement-evidence.mjs`.

Le script se déclare read-only dans son en-tête, puis renvoie `mode: 'readonly'` et `table: 'questions'`. Ses appels Supabase utilisent `client.from('questions').select(...)` pour sonder les colonnes publiques et lire les questions de juin. Je n'ai vu aucun appel write, update, insert, delete ou rpc.

Le verifier lit `questions`, pas `forecasts`. Il ne contient pas de requête vers `forecasts` et l'en-tête indique aussi: "Reads questions only. It never queries forecasts and never writes to Supabase."
