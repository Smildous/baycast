# AQ-352, recheck distribution post-score, 9 juin 19h UTC

Verdict: NO-SEND.

Contrôle fait à 2026-06-09 19:03 UTC depuis `/root/baycast`. Rien n'a été envoyé. Pas d'email, pas de DM, pas de tweet, pas de message Slack, Discord ou Telegram. Je n'ai pas ouvert ni lu de forecasts.

Le gate reste fermé. Il manque toujours les éléments publics qui rendraient une distribution honnête: une note de settlement publique, des scores visibles, une surface resolved ou settlement utilisable, et une warm target list privée hors git. Avoir un outil email qui répond ne suffit pas.

Sur `https://baycast-p.vercel.app/leaderboard`, la page charge et affiche encore `Scores appear after questions resolve`. Aucun score public n'est visible. Sur `https://baycast-p.vercel.app/activity`, la page charge et affiche encore `Activity appears after questions resolve`. Aucune activité post-résolution n'est visible.

Je n'ai pas trouvé de note publique de settlement. Le sitemap public ne liste que `/`, `/questions`, `/blocks`, `/leaderboard`, `/how-it-works`, `/compare`, `/auth/login` et `/auth/signup`. Les routes testées `/settlement`, `/settlements`, `/resolved`, `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248/settlement` et `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248/resolved` répondent en 404. Le filtre `https://baycast-p.vercel.app/questions?status=resolved` charge, mais il affiche `Questions(44 open)` puis `No match`. Ce n'est pas une route de résolution exploitable.

J'ai refait le contrôle de warm target list hors git sous `/root`, sans imprimer de contenu privé. Le scan par noms de fichiers et le scan texte à bas bruit trouvent surtout des docs, des clones, des notes de travail, des dépendances ou du bruit technique. Je n'ai pas trouvé de liste Baycast privée, approuvée, disponible hors git et prête pour un envoi.

Côté canaux sortants, `himalaya` est présent. `himalaya account list` montre le compte par défaut `gmail` avec IMAP et SMTP, et `himalaya account doctor` passe en OK. Email paraît donc authentifié localement, mais email seul ne débloque pas le gate.

`x-cli` est présent, mais pas authentifié pour un usage réel dans cet environnement. Il n'a pas de commande `auth` ou `status`, et le contrôle read-only `x-cli me mentions` échoue avec les variables manquantes `X_API_KEY`, `X_API_SECRET`, `X_ACCESS_TOKEN`, `X_ACCESS_TOKEN_SECRET` et `X_BEARER_TOKEN`. Je n'ai lancé aucune commande de publication.

Les CLIs `discord`, `slack`, `telegram`, `telegram-cli` et `tg` ne sont pas installées sur cette machine.

Décision: NO-SEND.

La raison est simple: pas de settlement public, pas de scores visibles, pas de route publique resolved ou settlement utilisable, pas de warm target list privée hors git. Même avec Gmail opérationnel, tous les gates ne sont pas vrais ensemble. Donc aucune distribution ne doit partir.
