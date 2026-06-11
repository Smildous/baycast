# AQ-360, recheck distribution post-score, 11 juin 07h UTC

Verdict: NO-SEND.

Contrôle fait à 2026-06-11 07:02 UTC depuis `/root/baycast-marketing`, après `git fetch origin`, checkout de `main`, puis pull fast-forward sur `origin/main`. Rien n'a été envoyé. Pas d'email, pas de DM, pas de tweet, pas de post social. Je n'ai pas ouvert ni lu de forecasts.

Le gate reste fermé. Les trois preuves de départ ne sont pas réunies au même moment: note publique de settlement, scores visibles, warm target list privée hors git. L'email local passe, mais l'auth d'un canal ne remplace pas les preuves produit et liste.

Sur `/leaderboard`, la page publique répond 200 avec le titre `Forecaster Leaderboard, Baycast`. Le rendu visible montre encore `Scores appear after questions resolve`. Je ne vois pas de ligne de classement, pas de score utilisateur, pas de Brier réel et pas de Log Score réel. Le score n'est donc pas visible.

Sur `/activity`, la page publique répond 200 avec le titre `Recent Forecasting Activity, Baycast`. Le rendu visible dit `Public forecasting activity appears after questions resolve` puis `Activity appears after questions resolve`. Je ne vois pas d'activité post-résolution exploitable. Les scores ou événements publics ne sont pas visibles là non plus.

Côté settlement, les routes publiques testées ne donnent pas de note publique utilisable. `/settlement`, `/settlements`, `/resolved`, `/resolutions`, `/notes`, `/blog`, `/updates`, `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248/settlement` et `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248/resolved` renvoient 404. `/questions?status=resolved` répond 200, mais le rendu ne montre pas de résultat résolu. Je ne trouve donc pas de note publique de settlement à citer.

J'ai contrôlé la warm target list privée hors git sans imprimer de contenu privé. Les chemins sûrs probables regardés sont `/root/private`, `/root/.private`, `/root/baycast-marketing/private`, `/root/baycast-marketing/.private`, `/root/baycast-marketing/secrets`, `/root/baycast-marketing/.secrets`, `/root/baycast-marketing/data/private`, `/root/baycast-marketing/outreach/private` et `/root/baycast-marketing/docs/private`. Aucun de ces emplacements n'existe avec une liste cible candidate. Résultat: `candidate_count=0`.

État des canaux sortants, sans envoi. `himalaya` existe dans `/root/.local/bin/himalaya` et `himalaya account doctor` passe TOML, IMAP et SMTP en OK pour le compte par défaut. L'email est donc authentifié localement. `x-cli` existe dans `/root/.local/bin/x-cli` et expose `like`, `me`, `retweet`, `tweet` et `user`, mais ce run ne voit aucune variable `X_API_KEY`, `X_API_SECRET`, `X_ACCESS_TOKEN`, `X_ACCESS_TOKEN_SECRET`, `X_BEARER_TOKEN`, ni les variantes `TWITTER_*`. Je n'ai lancé aucune commande de publication.

Décision AQ-360: NO-SEND maintenu.

Réouverture seulement quand une note publique de settlement existe, qu'un score réel est visible sur `/leaderboard` ou `/activity`, qu'une warm target list privée existe hors git, et qu'un canal sortant est authentifié dans le même run. Tant que ces points ne sont pas vrais ensemble, ne rien envoyer.
