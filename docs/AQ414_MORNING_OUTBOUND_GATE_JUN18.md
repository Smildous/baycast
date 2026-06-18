# AQ-414 morning outbound gate, Jun 18

Contrôle fait le 2026-06-18 à 07:02 UTC depuis `/root/baycast-marketing`.

Verdict: NO SEND.

Aucun message n'a été envoyé. Pas d'email, pas de post X, pas de DM, pas de réponse. J'ai contrôlé les outils locaux et les fichiers privés sous `/root/baycast-private` sans afficher ni copier de contact, d'adresse, de handle ou de contexte privé dans ce dépôt.

## Ce qui est ouvert

La surface publique est propre pour ce passage.

`npm run verify:public-bcp` passe sur `https://baycast-p.vercel.app` avec `/`, `/questions`, la question Apple Mac Pro, `/leaderboard` et `/activity`.

`npm run verify:distribution-gate` passe aussi avec `/settlements/apple-mac-pro-wwdc-2026`, `/questions?status=resolved` et `/`.

Le settlement public Apple Mac Pro reste donc utilisable comme preuve publique. Rien dans ce contrôle ne donne le droit d'inventer de la traction ou de parler de pari. Le cadrage reste simple: Baycast est du prediction polling, de la prévision lisible, pas du gambling.

## Canaux locaux

Email: utilisable côté outil. `himalaya account list` sort en code 0 et voit une configuration locale. Je n'ai pas lancé de brouillon ni de commande d'envoi.

X: pas utilisable pour ce gate. `x-cli` est installé, mais `x-cli auth status` échoue car cette version n'a pas de commande `auth`. Le probe de lecture `x-cli -j me mentions --max 5` échoue aussi car les variables d'environnement X attendues ne sont pas présentes. Aucune commande d'écriture X n'a été lancée.

## Targets privées, comptage redacted

Dossier contrôlé hors git: `/root/baycast-private/outreach`.

Fichiers CSV vus, noms seulement:

- `warm_targets.example.csv`
- `warm_targets_jun14_19h.csv`

Comptage sans contenu privé:

| fichier | lignes cibles | colonnes requises présentes | lignes complètes envoyables |
| --- | ---: | --- | ---: |
| `warm_targets.example.csv` | 0 | non | 0 |
| `warm_targets_jun14_19h.csv` | 2 | non | 0 |
| total | 2 | n/a | 0 |

Une ligne envoyable doit avoir `contact`, `channel`, `context` et `next_action` remplis. À 07:02 UTC, aucun CSV privé vu sur cette machine n'a une ligne complète selon cette règle.

## Intake à utiliser pour débloquer

Le fichier privé, non committé, doit rester sous `/root/baycast-private`, par exemple `/root/baycast-private/outreach/warm_targets_jun18.csv`.

Format minimal:

```csv
contact,channel,context,next_action,owner,status,notes
[privé],email,[pourquoi cette personne maintenant],[demander un avis sur le settlement public],baycast,ready,[privé]
```

Règle de gate: pas d'outbound tant qu'il n'y a pas au moins une ligne privée complète et que les checks publics ne passent pas. Si une ligne est ajoutée, elle doit être relue sans recopier ses valeurs dans git. Si le canal est X, il faut aussi un auth check réel, pas seulement la présence de `x-cli`.

## Snippet prêt pour le premier email, à garder en attente

Objet: Avis rapide sur un premier settlement Baycast

Bonjour [prénom],

Je construis Baycast, un produit de prediction polling: on pose une question vérifiable, les réponses restent indépendantes, puis le score public permet de comparer la prévision au résultat réel.

On a maintenant un premier settlement public autour du Mac Pro à la WWDC 2026: https://baycast-p.vercel.app/settlements/apple-mac-pro-wwdc-2026

Si tu as 3 minutes, j'aimerais ton avis sur deux choses: est-ce que la page rend le résultat assez clair, et est-ce que ce format te paraît utile pour suivre des questions tech avant qu'elles soient résolues ?

Merci,
[signature]

## Décision

NO SEND.

La partie publique est clean et l'email local semble prêt, mais la condition privée bloque: zéro ligne complète avec contact, channel, context et next_action. Le gate reste fermé jusqu'à ajout d'une target privée complète, hors git, puis nouveau contrôle avant tout envoi.
