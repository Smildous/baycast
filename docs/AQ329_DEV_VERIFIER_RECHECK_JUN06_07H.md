# AQ-329, recheck dev verifiers, 6 juin 07h

Recheck fait depuis `/root/baycast-dev` après `git fetch origin && git pull --ff-only origin main`. Le dépôt était déjà à jour.

Je n'ai pas lu de forecasts. Le contrôle first settlement a été lancé avec le script du dépôt et son résultat confirme `mode: "readonly"` et `table: "questions"`.

Commandes exécutées:

| Commande | Résultat | Note |
| --- | --- | --- |
| `git diff --check` | PASS | Aucun whitespace error. |
| `npm run verify:public-bcp` | PASS | Les surfaces publiques passent: `/`, `/questions`, la page Apple Mac Pro, `/leaderboard`, `/activity`. |
| `npm run verify:first-settlement-evidence` | PASS | Candidat Apple Mac Pro trouvé, statut `open`, clôture `2026-06-13T00:00:00+00:00`, source publique Apple WWDC et Apple Newsroom. |

Sortie utile du verifier first settlement:

```json
{
  "ok": true,
  "mode": "readonly",
  "table": "questions",
  "checked_at": "2026-06-06T07:02:17.205Z",
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

Lecture du script `scripts/first-settlement-evidence.mjs`: il annonce en en-tête qu'il est read-only, qu'il lit seulement `questions`, qu'il ne requête jamais `forecasts` et qu'il n'écrit jamais dans Supabase. Les appels Supabase visibles utilisent `client.from('questions').select(...)` pour sonder les colonnes et lire les questions de juin. Je n'ai vu aucun `insert`, `update`, `delete`, `upsert` ou `rpc`.

Conclusion: les trois vérifications demandées passent. Pas de bug à corriger, donc seule cette note a été ajoutée.
