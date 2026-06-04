# AQ-318, recheck distribution post-score, 4 juin 07h UTC

Verdict: NO-SEND.

Contrôle fait à 07:02 UTC depuis `/root/baycast-marketing`, après sync avec `origin/main`. Je n'ai rien envoyé. Pas d'email, pas de post X, pas de DM, pas de test sortant. Je n'ai pas ouvert ni lu de forecasts.

Le gate reste fermé. Les trois conditions d'envoi ne sont pas vraies en même temps.

Note publique de settlement: non trouvée. Les routes publiques testées sur `https://baycast-p.vercel.app` répondent encore en 404 pour `/settlements`, `/settlement`, `/resolutions`, `/notes`, `/blog` et `/updates`. Je n'ai pas trouvé de note publique stable à citer ou à distribuer.

Scores visibles: non. La prod répond, mais elle ne montre toujours pas de score post-résolution. `/questions?status=resolved` répond en 200 avec `Questions (44 open)` puis `No match`. `/leaderboard` répond en 200 avec `Scores appear after questions resolve`. `/activity` répond en 200 avec `Activity appears after questions resolve`. Les colonnes de score existent dans l'interface, mais aucun score public exploitable n'est visible.

Warm target list privée hors git: non prouvée. Je n'ai vérifié que l'existence et les noms de fichiers, sans ouvrir ni copier de contenu privé. Les emplacements candidats `/root/baycast-private`, `/root/private`, `/root/baycast-marketing-private`, `/root/outbound`, `/root/baycast-outbound`, `/root/baycast-targets` et `/root/targets` sont absents. La recherche de noms de fichiers candidats sous `/root`, hors dépôts git, ne montre pas de warm target list Baycast privée et approuvée.

Canaux sortants: ça ne change pas le gate. `himalaya` est installé, le compte `gmail` est présent par défaut, et `himalaya account doctor` passe TOML, IMAP et SMTP en OK. `x-cli` est installé. Aucun essai sortant n'a été fait. L'auth email seule ne suffit pas quand la note publique, les scores visibles et la liste privée manquent.

Conclusion: NO-SEND. Baycast ne doit pas pousser de distribution post-score tant qu'il n'y a pas une note publique de settlement, un score visible en production et une warm target list privée gardée hors git.
