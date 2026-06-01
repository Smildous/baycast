# AQ-304, recheck distribution post-score, 1 juin 19h UTC

Verdict: NO-SEND.

Contrôle fait à 19:02 UTC depuis `/root/baycast-marketing`, après rebase sur `origin/main`. Aucun message n'a été envoyé. Pas d'email, pas de DM, pas de post X, pas de test sortant.

Le gate reste fermé. Les quatre conditions ne sont pas vraies en même temps. Le canal email est authentifié, mais email auth seul ne suffit pas. Il manque encore la note publique de settlement, les scores visibles et la warm target list privée hors git.

## Preuves vérifiées

Note publique de settlement: non. Les routes publiques évidentes `https://baycast-p.vercel.app/settlements`, `/settlement`, `/resolutions`, `/notes`, `/blog` et `/updates` répondent en 404. Je n'ai pas trouvé de note publique stable à citer pour un premier settlement.

Scores visibles: non. `/questions` répond en 200 et affiche encore `44 open`. `/questions?status=resolved` répond en 200, mais affiche `No match`. `/leaderboard` répond en 200, mais affiche `Scores appear after questions resolve`. `/activity` répond en 200, mais affiche `Activity appears after questions resolve`. Il y a du vocabulaire de score dans l'interface, pas un score réel post-résolution visible.

Warm target list privée hors git: non. J'ai contrôlé les noms de fichiers sous `/root` sans ouvrir ni imprimer de contenu privé. Les recherches `target`, `warm`, `outreach`, `distribution`, `contacts`, `lead`, `prospect` et `recipient` ne montrent pas de liste Baycast privée approuvée hors git. Les résultats vus sont des clones Baycast suivis par git ou du bruit technique sans rapport.

Canal outbound authentifié: partiel. `himalaya` est installé. `himalaya account list` voit `gmail` par défaut avec IMAP et SMTP. `himalaya account doctor` passe TOML, IMAP et SMTP en OK. `x-cli` est installé, mais je n'ai pas trouvé de commande d'état auth exploitable: `x-cli auth status`, `x-cli account` et `x-cli whoami` n'existent pas, et `x-cli me` affiche seulement l'aide. Je ne traite donc pas X comme canal prêt.

## Décision

NO-SEND.

Pour ouvrir le gate, il faut une note publique de settlement, au moins un score post-résolution visible en production, une warm target list approuvée et gardée hors git, puis un dernier contrôle du canal d'envoi. Tant qu'un seul de ces points manque, marketing ne distribue pas.
