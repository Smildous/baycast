# AQ-335 dev verifier recheck, Jun 07 07h

Recheck lancé depuis `/root/baycast-dev` après fetch puis fast-forward sur `origin/main`. Le dépôt était déjà à jour.

Je n'ai pas lu de forecasts. J'ai relu `scripts/first-settlement-evidence.mjs` avant le lancement: le script annonce un mode read-only, interroge seulement `questions` via `client.from('questions').select(...)`, ne contient pas de requête `forecasts`, et ne contient pas d'appel write comme `insert`, `update`, `delete`, `upsert` ou `rpc`.

Commandes et résultats:

| Commande | Résultat | Sortie utile |
| --- | --- | --- |
| `git diff --check` | PASS | Aucune sortie, aucun whitespace error. |
| `npm run verify:public-bcp` | PASS | `Verifying public BCP surfaces at https://baycast-p.vercel.app`; OK pour `/`, `/questions`, `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`, `/leaderboard`, `/activity`; `Public BCP surface verification passed.` |
| `npm run verify:first-settlement-evidence` | PASS | JSON `ok: true`, `mode: readonly`, `table: questions`, `checked_at: 2026-06-07T07:01:55.159Z`, candidate exact match `Will Apple announce a new Mac Pro at WWDC 2026?`, status `open`, close `2026-06-13T00:00:00+00:00`, source publique Apple WWDC et Apple Newsroom. |

Conclusion: les gates demandés passent à 07h. Le verifier first-settlement est resté en lecture seule, sur `questions`, sans lecture de forecasts.
