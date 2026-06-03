# AQ-314, recheck distribution post-score, 3 juin 13h UTC

Verdict: NO-SEND.

Contrôle fait depuis `/root/baycast-marketing` après `git fetch origin && git checkout main && git pull --rebase origin main`. Je n'ai rien envoyé. Pas d'email, pas de post X, pas de DM, pas de test sortant. Je n'ai pas lu les forecasts.

Le gate reste fermé parce que les trois preuves obligatoires ne sont pas réunies en même temps.

Note publique de settlement: absente. La recherche dans `docs/` retrouve des runbooks et des rechecks, pas une note publique stable de settlement à distribuer. Les routes publiques évidentes sur `https://baycast-p.vercel.app` restent fermées: `/settlements`, `/settlement`, `/resolutions`, `/notes`, `/blog` et `/updates` répondent en 404.

Scores visibles: non. La prod répond, mais elle ne montre pas de score post-résolution. `/questions` répond en 200 avec `44 open`. `/questions?status=resolved` répond en 200 avec `44 open` et `No match`. `/leaderboard` répond en 200 avec `Scores appear after questions resolve`. `/activity` répond en 200 avec `Activity appears after questions resolve`. Les mots Brier, Log Score et Resolved existent dans l'interface, mais pas comme score public lié à une question réglée.

Warm target list privée hors git: non prouvée. Je n'ai vérifié que l'existence et les noms de fichiers, sans ouvrir ni copier de contenu privé. `/root/baycast-private`, `/root/private`, `/root/baycast-marketing-private` et `/root/outbound` sont absents. La recherche de fichiers candidats sous `/root`, hors `.git` et hors `node_modules`, ne trouve pas de warm target list privée approuvée. Elle remonte surtout des docs de recheck et des fichiers sans rapport.

Canaux locaux: l'email est utilisable techniquement, mais ça ne suffit pas. `himalaya` est installé, voit un compte `gmail` par défaut avec IMAP et SMTP, et `himalaya account doctor` passe TOML, IMAP et SMTP en OK. `x-cli` est installé et des variables d'auth locales existent, mais je n'ai pas envoyé et je ne compte pas l'auth comme preuve de target list ou de score visible.

Conclusion simple: Baycast est encore pré-premier settlement côté preuve publique. Tant qu'il n'y a pas une note publique de settlement, au moins un score visible en production, et une warm target list privée hors git, le message post-score ne part pas.
