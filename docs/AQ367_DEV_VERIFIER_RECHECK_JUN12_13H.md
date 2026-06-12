# AQ-367 Dev verifier recheck, 12 juin 13h

Recheck fait depuis `/root/baycast-dev`, après reset propre sur `origin/main`. Je n'ai pas consulté `forecasts`.

Synchro initiale:

```sh
git fetch origin main && git checkout main && git reset --hard origin/main && git status --short
```

Résultat: succès. Le dépôt était sur `main`, aligné avec `origin/main`, puis replacé sur `25997a3 docs(AQ-366): add post-score distribution gate recheck at 07h`. `git status --short` n'a rien imprimé.

## Vérifications lancées

```sh
git diff --check
```

Succès. Aucune sortie, donc aucun whitespace error détecté.

```sh
npm run verify:public-bcp
```

Succès. Le verifier a contrôlé les surfaces publiques sur `https://baycast-p.vercel.app`: `/`, `/questions`, `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`, `/leaderboard`, `/activity`. La sortie se termine par `Public BCP surface verification passed.`

```sh
npm run verify:first-settlement-evidence
```

Succès. La sortie utile:

```json
{
  "ok": true,
  "mode": "readonly",
  "table": "questions",
  "checked_at": "2026-06-12T13:01:43.216Z",
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

Le point important est explicite dans la sortie: `mode` vaut `readonly` et `table` vaut `questions`. Ce recheck confirme donc que le verifier first settlement est en lecture seule et s'appuie sur `questions`, pas sur `forecasts`.

Le candidat de première résolution reste `Will Apple announce a new Mac Pro at WWDC 2026?`, encore `open` au moment du check. Timestamp de close candidat: `2026-06-13T00:00:00+00:00`.

```sh
npm run verify:aq231-june-resolution-hygiene
```

Succès. La sortie confirme `ok: true`, `mode: readonly`, `table: questions`, `open_questions: 44`, `soon_closing_open_questions: 9`, `ready_soon_closing_open_questions: 9`, `not_ready_soon_closing_open_questions: 0`. Les colonnes disponibles listées sont `id`, `title`, `description`, `status`, `category`, `question_type`, `options`, `resolution_source`, `closes_at`; `resolution_date` reste absente.

## Notes de risque

Risque principal: le candidat Mac Pro ferme le 13 juin à 00:00 UTC, mais il ne faut pas régler avant le close effectif et avant lecture de la source publique Apple. Le verifier donne la checklist attendue: confirmer le titre, ouvrir la source publique, capturer titre, publisher, URL et timestamp de récupération, garder uniquement des preuves publiques, puis régler seulement si la source répond directement à la question.

BCP public est vert sur les routes testées. L'hygiène de résolution de juin est verte pour les questions proches de la fermeture, avec zéro question proche non prête dans la fenêtre vérifiée.

Aucun correctif applicatif n'a été fait. Aucun problème rencontré pendant ce recheck.
