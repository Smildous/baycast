# AQ-372 post-score distribution gate, Jun 13 07h

Recheck fait le 2026-06-13T07:03:04Z depuis `/root/baycast`. Rien n'a été envoyé. Je n'ai pas lu `forecasts`, ni une API de forecast, ni une table de forecast.

Verdict: NO-SEND.

Mise à jour Odin après le live settlement: le score est maintenant visible, mais le gate reste fermé. `/leaderboard` montre S Simba avec Brier 0.2500. `/activity` montre le forecast Apple résolu. La page Apple Mac Pro est en état `Resolved` avec outcome `no`.

Il manque encore deux éléments pour distribuer proprement: une note publique stable qui explique le settlement sans payload JSON brut, et une warm target list privée hors git. Sans ces deux éléments, envoyer maintenant transforme le premier score en lien froid au lieu d'une preuve claire.

Côté note publique, les routes évidentes sur `https://baycast-p.vercel.app` ne donnent pas de note publiable: `/settlement`, `/settlements`, `/resolution`, `/resolutions`, `/notes`, `/blog`, `/updates`, `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248/settlement` et `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248/resolved` répondent 404. La page question suffit pour vérifier le résultat, pas pour faire un push propre.

Côté produit visible, le score existe. Côté qualité de scoring, il reste un gap live: la table `scores` accepte `brier_score`, mais pas `log_score`. Le premier write avec `log_score` a échoué, puis Odin a récupéré en insérant le Brier seul. Le whitepaper demande Brier plus log score. La distribution doit donc rester sobre tant que le log score live n'est pas migré.

Côté canal sortant, email est prêt mais seul. `himalaya account doctor` passe en OK pour TOML, IMAP et SMTP. `x-cli` existe aussi, mais je n'ai trouvé aucune variable d'environnement `X_` ou `TWITTER_` dans ce run. Je n'ai lancé aucune commande d'envoi.

Côté warm target list privée, je n'ai pas trouvé de liste hors git. La recherche par noms de fichiers sous `/root`, en évitant `.git`, `node_modules`, caches et builds, ne remonte que des docs dans des clones Baycast ou des fichiers sans rapport. Les anciennes sendlists dans `docs/` ne remplacent pas une liste privée validée hors repo.

Conclusion simple: ne rien distribuer maintenant. Le premier envoi peut attendre que le settlement soit public, que `/leaderboard` ou `/activity` montre au moins un vrai score post-résolution, et qu'une warm target list privée soit disponible. L'email authentifié ne suffit pas à ouvrir le gate.
