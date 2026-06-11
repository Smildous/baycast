# AQ-361 recheck verifier dev, 11 juin 13h

J'ai travaillé dans `/root/baycast-dev`, après resynchronisation sur `origin/main`. Je n'ai pas utilisé `/root/baycast`.

## Commandes lancées

```bash
git status --short
git fetch origin main
git checkout main
git reset --hard origin/main
git diff --check
npm run verify:public-bcp
npm run verify:first-settlement-evidence
```

## Résultat court

| Contrôle | Résultat | Sortie utile |
| --- | --- | --- |
| Sync `origin/main` | PASS | `Already on 'main'`, branche à jour, puis `HEAD is now at 0cdde8e docs(AQ-360): add post-score distribution gate recheck at 07h`. |
| `git diff --check` | PASS | Aucune sortie. Aucun problème whitespace. |
| `npm run verify:public-bcp` | PASS | Vérification de `https://baycast-p.vercel.app`: `ok /`, `ok /questions`, `ok /questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`, `ok /leaderboard`, `ok /activity`, puis `Public BCP surface verification passed.` |
| `npm run verify:first-settlement-evidence` | PASS | JSON avec `"ok": true`, `"mode": "readonly"`, `"table": "questions"`, `"candidate_reason": "Apple Mac Pro exact match"`. |

## Table access

Le script lancé par `verify:first-settlement-evidence` est `node scripts/first-settlement-evidence.mjs`, vu dans `package.json`.

J'ai relu `scripts/first-settlement-evidence.mjs`. L'en-tête dit explicitement: `Reads questions only. It never queries forecasts and never writes to Supabase.` Le code utilise `client.from('questions').select(...)` pour sonder `resolution_source` et `resolution_url`, puis relire les questions de juin. Le rapport imprimé confirme `mode: readonly` et `table: questions`.

Je n'ai pas interrogé la table `forecasts`.

## First settlement gate

Le verifier a trouvé la candidate exacte: `Will Apple announce a new Mac Pro at WWDC 2026?`.

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

Gate settlement: bloqué avant `2026-06-13T00:00:00+00:00`. Le checklist du verifier demande d'ouvrir la source publique avant règlement, de capturer titre, éditeur, URL et horodatage, de sauvegarder seulement de l'évidence publique, et de régler seulement après clôture si la source répond directement à la question.

## Décision

AQ-361 est bon côté preuve verifier dev à 13h. Le BCP public passe. Le verifier first settlement passe, reste read-only, lit `questions`, ne lit pas `forecasts`, et maintient la porte de règlement fermée avant la clôture Apple Mac Pro.
