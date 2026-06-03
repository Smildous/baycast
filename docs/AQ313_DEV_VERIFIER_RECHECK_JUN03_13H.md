# AQ-313 recheck dev verifier 13h, 3 juin 2026

Recheck fait dans `/root/baycast-dev` après sync de `main` avec `origin/main`.

Résultat global: pass.

`git fetch origin && git checkout main && git pull --rebase origin main` a terminé sans conflit. La branche locale a avancé de `0a30ef7` à `9720b73`.

`git diff --check` est passé. Aucune erreur whitespace signalée.

`npm run verify:public-bcp` est passé contre `https://baycast-p.vercel.app`.
Pages vérifiées avec succès: `/`, `/questions`, `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`, `/leaderboard`, `/activity`.

`npm run verify:first-settlement-evidence` est passé.
Sortie utile:

```json
{
  "ok": true,
  "mode": "readonly",
  "table": "questions",
  "checked_at": "2026-06-03T13:02:08.477Z",
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

Candidate retenu: Will Apple announce a new Mac Pro at WWDC 2026?

Statut actuel: open.

Clôture: 2026-06-13T00:00:00+00:00.

Settlement: bloqué jusqu'à la clôture. Le verifier rappelle aussi de ne régler qu'après la clôture et seulement si la source publique répond directement à la question.

J'ai contrôlé le script `scripts/first-settlement-evidence.mjs`: il annonce un mode read-only, ne fait que des `select` via Supabase, lit la table `questions`, et ne contient pas d'écriture. Il utilise les colonnes publiques de settlement sur `questions`, avec `resolution_source` et `resolution_url` quand elles existent. Je n'ai pas inspecté la table `forecasts`.
