# AQ-287 post-score distribution gate recheck, 30 mai 07h UTC

Verdict: NO-SEND.

Check fait le 2026-05-30 à 07:02 UTC depuis `/root/baycast-marketing`, après `git fetch origin && git reset --hard origin/main`. No messages sent. Aucun post public, aucun email, aucun DM, aucun message Discord, Slack ou Telegram. Je n'ai pas ouvert ni recopié de forecasts.

Le gate reste simple: une distribution post-score ne part que si les trois preuves existent en même temps. Il faut une note publique de settlement, des scores visibles publiquement, et une warm target list privée approuvée hors git. À ce check, les trois manquent.

Côté produit public, `https://baycast-p.vercel.app/`, `/questions`, `/leaderboard`, `/activity`, et la question Apple Mac Pro répondent en 200. `/questions` affiche encore `44 open`. `/activity` dit que l'activité publique apparaît après résolution. Les mentions de Brier, log score, resolved ou leaderboard sont de la copie produit, des en-têtes ou des champs ouverts, pas une preuve d'un score résolu visible. Je n'ai pas trouvé de note publique de settlement exploitable.

Côté liste privée, j'ai vérifié seulement la présence de fichiers candidats hors `/root/baycast-marketing`, sans ouvrir de contenu sensible. Les candidats trouvés sont des docs de clones Baycast, des playbooks, des scripts ou des fichiers de dépendances. Je n'ai pas vu de warm target list privée approuvée et prête à utiliser hors git.

Côté canaux locaux, `himalaya` est présent et `himalaya account doctor` passe la configuration, IMAP et SMTP en OK. Cela prouve seulement que l'email local est configuré. `x-cli` est présent et répond à l'aide, mais il n'a pas de commande sûre `auth status`, `whoami` ou `me get`; aucune action sortante n'a été lancée. Les CLIs `discord`, `slack`, `telegram`, `telegram-cli` et `tg` ne sont pas présentes.

Décision: gate fermé. Email auth alone is not enough. Tant que la note publique de settlement, les scores visibles et la warm target list privée hors git ne sont pas tous vrais, la réponse reste NO-SEND.
