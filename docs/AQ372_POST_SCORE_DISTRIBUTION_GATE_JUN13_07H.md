# AQ-372 post-score distribution gate, Jun 13 07h

Recheck fait le 2026-06-13T07:03:04Z depuis `/root/baycast`. Rien n'a été envoyé. Je n'ai pas lu `forecasts`, ni une API de forecast, ni une table de forecast.

Verdict: NO-SEND.

Le gate reste fermé. Après la tentative de settlement Apple, il manque encore les deux preuves qui rendraient une distribution propre: une note publique de settlement et des scores visibles en production. Sans ça, envoyer ferait partir les gens vers une page qui dit encore d'attendre la résolution.

Côté note publique, je n'ai pas trouvé de lien stable. Dans les docs, les mentions de settlement que j'ai vues restent des rechecks, des scripts de vérification ou des plans. En production, les routes publiques évidentes sur `https://baycast-p.vercel.app` ne donnent pas de note publiable: `/settlement`, `/settlements`, `/resolution`, `/resolutions`, `/notes`, `/blog`, `/updates`, `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248/settlement` et `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248/resolved` répondent 404.

Côté produit visible, il n'y a toujours pas de score exploitable. `/leaderboard` répond 200, mais affiche `Scores appear after questions resolve`. `/activity` répond 200, mais affiche `Activity appears after questions resolve`. `/questions?status=resolved` répond 200, mais garde `Questions(44 open)` et `No match`. La page Apple Mac Pro répond 200, mais elle est encore présentée comme ouverte côté public: `Closes today`, `Community signal locked`, formulaire `Add your forecast`, signup et login. Je ne vois ni utilisateur classé, ni Brier réel, ni Log Score réel, ni activité post-résolution.

Côté canal sortant, email est prêt mais seul. `himalaya account doctor` passe en OK pour TOML, IMAP et SMTP. `x-cli` existe aussi, mais je n'ai trouvé aucune variable d'environnement `X_` ou `TWITTER_` dans ce run. Je n'ai lancé aucune commande d'envoi.

Côté warm target list privée, je n'ai pas trouvé de liste hors git. La recherche par noms de fichiers sous `/root`, en évitant `.git`, `node_modules`, caches et builds, ne remonte que des docs dans des clones Baycast ou des fichiers sans rapport. Les anciennes sendlists dans `docs/` ne remplacent pas une liste privée validée hors repo.

Conclusion simple: ne rien distribuer maintenant. Le premier envoi peut attendre que le settlement soit public, que `/leaderboard` ou `/activity` montre au moins un vrai score post-résolution, et qu'une warm target list privée soit disponible. L'email authentifié ne suffit pas à ouvrir le gate.
