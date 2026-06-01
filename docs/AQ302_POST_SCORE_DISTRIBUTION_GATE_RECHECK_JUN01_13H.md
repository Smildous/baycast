# AQ-302, recheck distribution post-score, 1 juin 13h UTC

Verdict: NO-SEND.

Contrôle fait à 13:02 UTC depuis `/root/baycast-marketing`, après fetch et rebase sur `origin/main`. Aucun message n'a été envoyé. Pas d'email, pas de DM, pas de post X, pas de test sortant.

Le gate reste fermé. Il manque encore les preuves publiques et la liste privée. Un canal email utilisable existe, mais email auth seul ne suffit pas.

## Preuves vérifiées

Note publique de settlement: non. Les surfaces publiques `https://baycast-p.vercel.app/`, `/questions`, `/leaderboard` et `/activity` répondent en 200, mais les routes évidentes pour une note ou une résolution publique, `/settlements`, `/settlement`, `/resolutions`, `/notes`, `/blog` et `/updates`, répondent en 404. Je n'ai pas trouvé de lien public stable à distribuer pour un premier settlement.

Scores visibles: non. `/questions` affiche encore `44 open`. Le filtre résolu sur `/questions?status=resolved` affiche `No match`. `/leaderboard` affiche `Scores appear after questions resolve`. `/activity` affiche `Activity appears after questions resolve`. Le site parle bien de score et de Brier, mais je n'ai pas vu de score post-résolution visible.

Warm target list privée hors git: non. J'ai contrôlé les chemins sous `/root` par noms de fichiers seulement, sans ouvrir ni imprimer de contenu privé. Les recherches ciblées sur `target`, `warm`, `outreach`, `distribution`, `contacts`, `lead`, `prospect` et `recipient` ne montrent pas de liste Baycast privée exploitable hors git. Les résultats utiles sont soit des clones git Baycast, soit du bruit technique sans rapport.

Canal outbound: partiel, utilisable côté email seulement. `himalaya` est installé. `himalaya account list` voit le compte `gmail` par défaut avec IMAP et SMTP. `himalaya account doctor` passe TOML, IMAP et SMTP en OK. `x-cli` est installé, mais je n'ai pas trouvé de commande d'état auth exploitable: `x-cli auth status` n'existe pas et `x-cli me` affiche seulement l'aide des commandes. Slack, Discord et Telegram ne sont pas disponibles comme CLI locaux.

## Décision

NO-SEND.

La prochaine condition de déblocage est simple: une note publique de settlement doit exister, un score post-résolution doit être visible en production, et une warm target list approuvée doit exister hors git. Quand ces trois points sont vrais au même moment, le canal email déjà authentifié peut être repris pour un dernier contrôle avant envoi. Tant qu'un seul de ces points manque, la distribution reste bloquée.
