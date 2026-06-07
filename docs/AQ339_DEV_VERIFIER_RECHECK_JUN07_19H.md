# AQ-339 dev verifier recheck, 07 juin 2026, 19h UTC

Recheck fait dans `/root/baycast-dev` après synchronisation avec `origin/main`. Je n'ai pas inspecté de lignes de `forecasts`.

## Synchronisation

Commande:

```bash
git fetch origin && git pull --rebase origin main
```

Sortie:

```text
From https://github.com/Smildous/baycast
 * branch            main       -> FETCH_HEAD
Already up to date.
```

## Contrôle whitespace

Commande:

```bash
git diff --check
```

Sortie:

```text
```

Verdict: OK, aucune erreur remontée.

## Public BCP

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

Verdict: OK, les surfaces publiques BCP répondent comme attendu.

## First settlement evidence

Commande:

```bash
npm run verify:first-settlement-evidence
```

Sortie:

```text
> baycast@0.1.0 verify:first-settlement-evidence
> node scripts/first-settlement-evidence.mjs

{
  "ok": true,
  "mode": "readonly",
  "table": "questions",
  "checked_at": "2026-06-07T19:01:33.054Z",
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

Verdict: OK.

Le script `scripts/first-settlement-evidence.mjs` se présente comme un vérificateur read-only. Les accès Supabase lus dans le fichier passent par `client.from('questions')` pour les probes de colonnes et pour la sélection du candidat de juin. Le rapport émis contient `"mode": "readonly"` et `"table": "questions"`. La recherche dans le script ne montre aucun accès à `forecasts`, et je n'ai pas lu de données de cette table.

## Verdict final

Recheck AQ-339 OK à 19h UTC. `git diff --check`, `verify:public-bcp` et `verify:first-settlement-evidence` passent. Le candidat Apple Mac Pro reste ouvert avec clôture `2026-06-13T00:00:00+00:00`, et le verifier reste limité à `questions` sans lecture de `forecasts`.
