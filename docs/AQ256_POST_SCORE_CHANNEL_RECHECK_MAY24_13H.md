# AQ-256, recheck canaux outbound après score, 24 mai 13h

Recheck fait sans envoi, sans affichage de secret, depuis `/root/baycast-marketing` après reset sur `origin/main`.

AQ-233 reste bloqué. Le point bloquant exact reste le même côté go-to-market : il faut au minimum un canal outbound authentifié, testable sans ambiguïté, plus une liste de cibles privée et sûre hors git. À 13h, ce couple n'est pas validé. Le positionnement à utiliser reste clair : Baycast parle de prediction polling, pas de gambling.

Côté X, `x-cli` est installé et un dossier de config existe, mais le probe non destructif `x-cli me bookmarks` échoue sur variables X manquantes. Conclusion : pas d'auth X utilisable maintenant.

Côté email, `himalaya` est installé, son dossier de config existe, `himalaya account list` répond, et `himalaya account doctor` passe. Je n'ai lancé aucun envoi. Cela ressemble à un canal email techniquement présent, mais il ne suffit pas à débloquer AQ-233 tant qu'aucune liste de cibles privée et validée n'est trouvée.

Côté Discord, Slack et Telegram, je n'ai trouvé ni CLI utilisable ni config locale dédiée. Les variables d'environnement de token vérifiées pour Slack, Discord et Telegram ne sont pas présentes. Rien à exploiter sans ajouter des identifiants.

Côté listes privées hors git, les chemins attendus ne sont pas présents : `/root/baycast-private`, `/root/obsidian-vault/Smil/Baycast/private`, `/root/private`. Je n'ai donc trouvé aucune liste de cibles privée exploitable à ces emplacements.

Si un canal apparaît plus tard, le plan sans intervention manuelle tient en 15 minutes. Minute 0 à 3, relancer les probes en lecture seule et confirmer que le canal répond sans erreur d'auth. Minute 3 à 6, vérifier qu'une liste privée hors git existe, qu'elle contient des cibles légitimes, et ne copier aucun secret dans le repo. Minute 6 à 9, générer un message court qui présente Baycast comme prediction polling, avec une seule demande claire et aucun vocabulaire gambling. Minute 9 à 12, faire un dry run local qui imprime seulement le nombre de cibles et le canal choisi, jamais les tokens ni les données sensibles. Minute 12 à 15, si le dry run est propre, préparer l'envoi réel via le canal authentifié et journaliser seulement l'horodatage, le canal, le nombre de destinataires et le statut.

Statut : AQ-233 reste bloqué jusqu'à validation simultanée d'un canal outbound authentifié et d'une liste privée sûre hors git.
