# AQ-306, recheck distribution post-score, 2 juin 07h UTC

Verdict: NO-SEND.

Contrôle fait à 07:01 UTC depuis `/root/baycast-marketing`. Aucun message n'a été envoyé. Pas d'email, pas de post X, pas de DM, pas de test sortant.

Le gate reste fermé. Les conditions d'envoi ne sont pas toutes vraies. L'email est authentifié, mais ça ne suffit pas. Il manque encore une note publique de settlement, des scores publics réels et une warm target list privée gardée hors git.

## Ce que j'ai vérifié

Note publique de settlement: non. Les routes publiques évidentes `https://baycast-p.vercel.app/settlements`, `/settlement`, `/resolutions`, `/notes`, `/blog` et `/updates` répondent encore en 404. Je n'ai pas trouvé de note publique stable à citer.

Scores visibles publiquement: non. `/questions` répond en 200 et affiche toujours `44 open`. `/questions?status=resolved` répond en 200, mais affiche `No match`. `/leaderboard` répond en 200 avec `Scores appear after questions resolve`. `/activity` répond en 200 avec `Activity appears after questions resolve`. Il y a les libellés Brier, Log Score et Resolved dans l'interface, mais pas de score post-résolution visible.

Warm target list privée hors git: non. J'ai scanné les noms de fichiers sous `/root` sans ouvrir ni imprimer de contenu privé. Les candidats hors git trouvés sont seulement des fichiers techniques ou créatifs sans rapport avec Baycast. Les autres mentions de target, warm, outreach, distribution, contacts, leads ou recipients sont dans des clones suivis par git ou dans du bruit technique. Je ne vois pas de liste privée approuvée pour un envoi.

Canal outbound authentifié: partiel. `himalaya` est présent. `himalaya account list` voit le compte `gmail` par défaut avec IMAP et SMTP. `himalaya account doctor` passe TOML, IMAP et SMTP en OK. `x-cli` est présent, mais les commandes d'état testées ne donnent pas de statut auth exploitable: `x-cli auth status`, `x-cli account` et `x-cli whoami` n'existent pas, et `x-cli me` affiche seulement l'aide. Je ne traite donc pas X comme prêt.

## Décision

NO-SEND.

Pour ouvrir le gate, il faut les quatre preuves en même temps: une note publique de settlement, un score visible en production, une warm target list privée hors git, puis un canal d'envoi authentifié. Aujourd'hui ce n'est pas le cas. Marketing ne distribue rien.
