# AQ-368, recheck distribution post-score, 12 juin 13h UTC

Verdict: NO-SEND.

Le gate reste fermé. À 13h UTC, je n'ai pas les quatre preuves en même temps: note publique de settlement, scores visibles sur `/leaderboard` ou `/activity`, warm target list privée hors git, et canal sortant authentifié. Aucun message n'a été envoyé. Pas d'email, pas de post X, pas de DM, pas de Slack, pas de Discord, pas de Telegram.

Contrôle fait depuis `/root/baycast-marketing`, synchronisé sur `origin/main` avant le recheck. Timestamp du run: `2026-06-12T13:01:48Z`.

Note publique de settlement: absente. Dans `docs/`, je vois des runbooks, des templates et des rechecks qui parlent de settlement, mais pas une note publique stable annonçant un résultat résolu à citer. Côté site, `https://baycast-p.vercel.app/settlement`, `/settlements`, `/resolved`, `/resolutions`, `/notes` et `/blog` répondent encore en 404. `https://baycast-p.vercel.app/questions?status=resolved` répond en 200, mais ne donne pas de note de settlement publique exploitable.

Scores publics: absents. Le navigateur confirme que `https://baycast-p.vercel.app/leaderboard` affiche `Scores appear after questions resolve`, sans ligne de score visible malgré les colonnes `Forecaster`, `Brier`, `Log Score`, `Predictions`, `Resolved`. `https://baycast-p.vercel.app/activity` affiche `Public forecasting activity appears after questions resolve` puis `Activity appears after questions resolve`. Rien ne montre un score résolu, une activité post-résolution ou un Brier public utilisable pour une distribution.

Warm target list privée hors git: absente dans cet environnement. J'ai vérifié les chemins plausibles `/root/private/baycast`, `/root/.private/baycast`, `/root/.baycast`, `/root/baycast-private`, `/root/baycast-marketing-private`, `/root/Documents/baycast`, `/root/contacts`, `/root/.contacts`, `/root/leads` et `/root/.leads`: rien n'existe. Le scan de noms de fichiers sous `/root`, en évitant les dépôts git et les caches évidents, remonte surtout des docs de repos Baycast, des fichiers produit, Obsidian ou Hermes. Ce n'est pas une liste privée de destinataires approuvée. Les docs publiques du repo ne comptent pas comme warm target list privée.

Canaux sortants: `himalaya` est installé et le compte `gmail` est listé comme compte par défaut. Le doctor passe TOML, IMAP et SMTP en OK, avec les adresses masquées dans la sortie. `x-cli` est installé, mais il n'a pas de commande `auth status` ni `status`; le probe de lecture `x-cli -j me mentions` échoue sur variables X manquantes: `X_API_KEY`, `X_API_SECRET`, `X_ACCESS_TOKEN`, `X_ACCESS_TOKEN_SECRET`, `X_BEARER_TOKEN`. Je n'ai pas trouvé de CLI locale Slack, Discord ou Telegram: `slack`, `slack-cli`, `discord`, `discord-cli`, `telegram`, `telegram-cli` et `tg` sont absents.

Décision: NO-SEND maintenu. L'email semble authentifié, mais cela ne suffit pas. Sans settlement public, sans scores visibles, et sans warm target list privée hors git, une distribution post-score serait prématurée. AQ-368 reste bloqué jusqu'à ce que les quatre conditions soient vraies dans le même recheck.
