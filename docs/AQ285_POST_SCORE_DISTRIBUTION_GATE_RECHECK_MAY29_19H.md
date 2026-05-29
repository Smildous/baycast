# AQ-285 post-score distribution gate recheck, 29 mai 19h UTC

Verdict: NO-SEND.

Check fait le 2026-05-29 à 19:02 UTC depuis `/root/baycast-marketing`, après `git fetch origin && git checkout main && git reset --hard origin/main`. Rien n'a été envoyé: pas de post public, pas d'email, pas de DM, pas de Discord, pas de Slack, pas de Telegram. Je n'ai pas lu les forecasts.

J'ai rechargé la production publique sur `https://baycast-p.vercel.app` avec les pages `/`, `/questions`, `/leaderboard`, `/activity`, et la page Apple Mac Pro `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`. Les cinq pages répondent en 200. `/questions` affiche encore `44 open`. `/activity` affiche `Activity appears after questions resolve`. Je n'ai pas trouvé de note publique de settlement exploitable. Les mentions de score ou de Brier visibles restent de la copie produit, de la navigation ou des en-têtes, pas une preuve de score public résolu.

Le gate des scores visibles ne passe donc pas. Le contexte vérifié pour cette décision reste: 44 questions ouvertes, 11 forecasts connus par le brief, aucun score résolu visible dans le produit public. Je n'ai pas ouvert de table forecasts ni copié de contenu de forecast.

Pour la warm target list privée hors git, j'ai cherché seulement des noms de fichiers sous `/root`, sans ouvrir de contenu candidat. Les recherches sur `target`, `warm`, `outreach`, `contact`, `recipient`, `founder`, et `baycast` ne montrent pas de liste privée approuvée hors dépôt. Les résultats utiles sont des clones Baycast, des docs génériques, des dépendances ou des fichiers produit. Rien ne prouve une warm list prête à utiliser.

Côté canaux locaux, `himalaya` existe dans `/root/.local/bin` et `himalaya account doctor` passe la configuration, IMAP et SMTP en OK. Cela prouve seulement que l'email local est configuré. `x-cli` existe aussi dans `/root/.local/bin` et répond à l'aide, mais il n'expose pas de commande `auth status`, `whoami` ou `me get`; je n'ai lancé aucune action sortante. Je n'ai trouvé aucune CLI locale `discord`, `slack`, `telegram`, `telegram-cli` ou `tg`.

Les gates AQ-285 à 19h ne sont pas tous vrais. Public settlement note: false. Visible scores: false. Private warm target list outside git: false. Outbound channel auth usable: partiel seulement, email local OK, X non prouvé, Discord Slack Telegram absents.

Raison exacte: email auth alone is not enough, et il manque encore les trois preuves qui autorisent une distribution post-score: note publique de settlement, score public visible, warm target list privée approuvée hors git. Décision: no-send, gate fermé.
