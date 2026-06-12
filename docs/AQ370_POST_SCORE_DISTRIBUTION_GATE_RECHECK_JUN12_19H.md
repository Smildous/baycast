# AQ-370 post-score distribution gate recheck, Jun 12 19h

Contrôle fait le 2026-06-12 à 19:02 UTC depuis `/root/baycast-marketing`, après fetch origin puis pull fast-forward sur `origin main`. Rien n'a été envoyé. Pas d'email, pas de DM, pas de tweet, pas de post social. Je n'ai pas lu Supabase `forecasts`.

Verdict: NO-SEND.

Le gate reste fermé parce que les preuves de distribution ne sont pas réunies en même temps. Il faut une note publique de settlement, des scores publics visibles, une warm target list privée hors git, et un canal sortant authentifié. À ce recheck, email passe, mais ce n'est pas suffisant.

Note publique de settlement: absente. J'ai testé les routes publiques probables sur `https://baycast-p.vercel.app`: `/settlement`, `/settlements`, `/resolved`, `/resolutions`, `/notes`, `/blog`, `/updates`, `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248/settlement` et `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248/resolved`. Elles répondent 404. `/questions?status=resolved` répond 200, mais le rendu dit `No match` et garde `44 open`. Je n'ai donc pas de note publique stable à citer.

Scores publics visibles: absents. `/leaderboard` répond 200 avec `Forecaster Leaderboard, Baycast`, mais le rendu affiche encore `Scores appear after questions resolve`. Je ne vois aucun utilisateur classé, aucun Brier réel, aucun Log Score réel. `/activity` répond 200 avec `Recent Forecasting Activity, Baycast`, mais le rendu affiche `Public forecasting activity appears after questions resolve` et `Activity appears after questions resolve`. Rien de post-score n'est visible pour une distribution.

Warm target list privée hors git: absente. J'ai cherché sous `/root` sans lire de contenu sensible et en excluant les dépôts, `.git`, `node_modules`, les caches et les répertoires de build. Aucun fichier hors git ne correspond à une liste Baycast exploitable par nom, avec des termes comme `warm`, `target`, `outreach`, `contacts`, `distribution`, `send-list` ou `prospect`.

Canaux sortants: partiels. `himalaya` existe dans `/root/.local/bin/himalaya` et `himalaya account doctor` passe TOML, IMAP et SMTP en OK pour le compte par défaut. Côté X, `x-cli` existe dans `/root/.local/bin/x-cli` et expose des commandes authentifiées comme `me`, `tweet`, `like` et `retweet`, mais aucune variable d'environnement `X_*` ou `TWITTER_*` n'est présente dans ce run. Je n'ai lancé aucune commande d'envoi.

Conclusion: garder NO-SEND. Ne rien distribuer tant qu'une note publique de settlement n'existe pas, qu'un score réel n'est pas visible sur `/leaderboard` ou `/activity`, et qu'une warm target list privée hors git n'est pas disponible. L'auth email seule ne débloque rien.
