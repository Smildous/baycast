# AQ-495 morning outbound gate, 27 juin

Check fait le 2026-06-27 à 07:01 UTC. Rien n'a été envoyé.

## Verdict

NO SEND.

L'URL publique répond et les deux vérifications produit passent. Himalaya est utilisable pour l'email local, sans envoi. X n'est pas authentifié dans ce run, et la liste privée ne contient aucune cible complète et envoyable. La règle du gate demande tout à la fois: URL publique OK, BCP OK, auth canal OK, et au moins une warm target privée complète. Ce matin, les deux derniers points ne passent pas ensemble.

## Recheck

Le repo a d'abord été synchronisé avec `origin/main` par fetch puis pull rebase. Le HEAD de départ du check était `ef7fb0f`.

`https://baycast-p.vercel.app/` répond en HTTP 200 avec `curl -L`, sans aucune action d'envoi.

`npm run verify:distribution-gate` passe. Les routes vérifiées sont `/settlements/apple-mac-pro-wwdc-2026`, `/questions?status=resolved` et `/`.

`npm run verify:public-bcp` passe. Les surfaces vérifiées sont `/`, `/questions`, la question publique Apple Mac Pro, `/leaderboard` et `/activity`.

Himalaya est présent à `/root/.local/bin/himalaya`. `himalaya account list` et `himalaya account doctor` sortent en code 0, avec IMAP et SMTP utilisables. Aucun email n'a été envoyé.

`x-cli` est présent à `/root/.local/bin/x-cli` et son aide répond. Le probe lecture seule `x-cli me bookmarks --max 1` échoue parce que les variables X attendues ne sont pas disponibles dans l'environnement: `X_API_KEY`, `X_API_SECRET`, `X_ACCESS_TOKEN`, `X_ACCESS_TOKEN_SECRET`, `X_BEARER_TOKEN`. Aucun post X n'a été lancé.

## Warm targets privés

Dossier vérifié: `/root/baycast-private/outreach`. Les détails privés ne sont pas imprimés ici.

| Fichier | Lignes non vides | Lignes complètes envoyables |
|---|---:|---:|
| `warm_targets.example.csv` | 0 | 0 |
| `warm_targets_jun14_19h.csv` | 2 | 0 |

Critère utilisé: une ligne doit avoir une identité, un contact, une plateforme, une relation, une raison, un contexte récent, un opt-in exploitable, une note personnelle, un owner, une next action, et un statut prêt ou approuvé. Total actuel: 0 cible privée complète.

## Décision

Pas d'outbound ce matin.

Aucun message public ou privé n'a été envoyé pendant ce gate.
