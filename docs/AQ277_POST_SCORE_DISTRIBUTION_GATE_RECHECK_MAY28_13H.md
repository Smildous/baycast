# AQ-277 post-score distribution gate recheck, May 28 13h UTC

Verdict: NO-SEND.

Check fait le 2026-05-28 13h UTC depuis `/root/baycast-marketing`, après `git fetch origin && git checkout main && git pull --rebase origin main`. Rien n'a été envoyé: pas de post public, pas d'email, pas de DM, pas de Discord, pas de Slack, pas de Telegram.

J'ai rechargé les surfaces publiques `https://baycast-p.vercel.app/`, `/questions`, `/leaderboard`, `/activity`, et la page Apple Mac Pro `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`. Les pages répondent en 200. `/questions` affiche encore `44 open`. La page Apple Mac Pro est toujours ouverte et affiche `Community signal locked`. Je n'ai pas trouvé de note publique de settlement exploitable. Le mot `Resolved` vu sur `/questions` et `/leaderboard` vient de la navigation ou des en-têtes, pas d'une question réglée avec issue publique.

Les scores ne sont pas visibles. `/leaderboard` affiche toujours `Scores appear after questions resolve`, et `/activity` affiche toujours `Activity appears after questions resolve`. Les mentions de `Brier`, `score` ou `Score` vues dans le HTML sont de la copie produit, des metas SEO ou des en-têtes de tableau, pas des scores post-résolution publiés.

Pour la warm target list privée hors git, j'ai inspecté les noms de fichiers sous `/root` en excluant le repo courant, les `.git`, les dépendances et les caches. Les candidats Baycast trouvés sont dans des clones git ou dans des docs génériques. Je n'ai pas trouvé de liste privée hors git avec des cibles chaudes nommées et une raison de contact.

Côté canaux, `command -v himalaya` renvoie `/root/.local/bin/himalaya`, et `himalaya account doctor` passe avec config TOML, IMAP et SMTP OK. `command -v x` ne renvoie rien. `command -v x-cli` renvoie `/root/.local/bin/x-cli`, mais `x-cli auth status` et `x-cli status` ne sont pas des commandes disponibles, donc je n'ai pas de preuve d'auth X utilisable. `discord`, `discord-cli`, `slack`, `slack-cli`, `telegram`, `telegram-cli`, `tg` et `telega` ne sont pas présents.

La raison exacte du no-send est simple: les gates ne sont pas toutes vraies. Une disponibilité email authentifiée existe, mais il manque une note publique de settlement, des scores visibles, et une warm target list privée hors git. Sans ces trois preuves, envoyer maintenant fabriquerait de la traction au lieu de la constater.
