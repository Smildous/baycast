# AQ-358, recheck distribution post-score, 10 juin 19h UTC

Verdict: NO-SEND.

Contrôle fait à 2026-06-10 19:02 UTC depuis `/root/baycast-marketing`, après `git fetch origin`, checkout de `main`, puis pull fast-forward sur `origin/main`. Rien n'a été envoyé. Pas d'email, pas de DM, pas de tweet, pas de post social. Je n'ai pas ouvert ni lu de forecasts.

Le gate reste fermé. Les conditions demandées ne sont pas réunies au même moment: pas de note publique de settlement, pas de score visible, pas de warm target list privée prouvée hors git. Le canal email semble prêt localement, mais ça ne suffit pas pour lancer une distribution post-score.

Sur les surfaces publiques, `/leaderboard` répond 200 avec le titre `Forecaster Leaderboard, Baycast`, mais affiche encore `Scores appear after questions resolve`. Je ne vois pas de ligne scorée, pas de score utilisateur, pas de profil avec Brier ou Log Score réel. `/activity` répond 200 avec le titre `Recent Forecasting Activity, Baycast`, mais affiche `Activity appears after questions resolve` et rappelle que les forecasts de questions ouvertes restent cachés jusqu'à résolution. Ce n'est pas une preuve post-résolution.

Côté settlement et resolved, rien de public et utilisable à citer. `/settlement`, `/settlements`, `/resolved`, `/resolutions`, `/notes`, `/blog`, `/updates`, `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248/settlement` et `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248/resolved` renvoient une page 404. `/questions?status=resolved` répond 200, mais affiche `Questions (44 open)` et `No match`. Je ne trouve donc pas de note publique de settlement ni de route publique resolved exploitable.

J'ai refait le contrôle de warm target list privée hors git sous `/root`, en regardant seulement les noms de fichiers et sans imprimer de contenu privé. Le scan hors dépôts git, hors caches et hors dossiers techniques donne `non_git_candidate_count=0`. À 19h, la liste privée n'existe pas ou n'est pas prouvée localement.

État des canaux, sans envoi: `himalaya` est installé dans `/root/.local/bin/himalaya`, et `himalaya account doctor` passe TOML, IMAP et SMTP en OK pour le compte par défaut. L'email est donc authentifié localement. `x-cli` est installé dans `/root/.local/bin/x-cli` et expose les commandes `like`, `me`, `retweet`, `tweet` et `user`, mais ce run ne voit aucune variable `X_API_KEY`, `X_API_SECRET`, `X_ACCESS_TOKEN`, `X_ACCESS_TOKEN_SECRET` ou `X_BEARER_TOKEN`. Je n'ai lancé aucune commande de publication.

Décision AQ-358: NO-SEND maintenu.

Prochain trigger: rouvrir le gate seulement quand la note publique de settlement existe, qu'un score réel est visible sur `/leaderboard` ou `/activity`, que la warm target list privée existe hors git, et qu'un canal sortant est authentifié dans le même run. Tant que ce n'est pas vrai, ne rien envoyer.
