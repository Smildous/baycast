# AQ-233 channel recheck, 22 mai 13h UTC

J'ai remis `/root/baycast-marketing` sur `origin/main` avant le contrôle. Le but était simple: vérifier si AQ-233 peut partir proprement, sans faux envoi, sans brouillon envoyé par erreur, sans destinataire inventé.

Aucun message n'a été envoyé.

`x-cli` est bien installé à `/root/.local/bin/x-cli`. Le probe non destructif utilisé est la lecture des mentions du compte, avec une limite de 5. Il ne poste rien, il lit seulement les mentions du compte authentifié. Résultat: `Missing env var: X_API_KEY. Set X_API_KEY, X_API_SECRET, X_ACCESS_TOKEN, X_ACCESS_TOKEN_SECRET, X_BEARER_TOKEN.` Les variables X attendues sont absentes dans l'environnement du run. Donc X reste inutilisable pour AQ-233 aujourd'hui.

J'ai aussi revérifié les canaux locaux. `mail`, `mailx`, `sendmail`, `msmtp`, `mutt`, `neomutt`, `discord`, `slack`, `telegram-cli` et `twurl` ne sont pas disponibles. `gh` est connecté, mais GitHub n'est pas un canal marketing sûr pour envoyer une demande de forecast à des humains. Les variables `SLACK_BOT_TOKEN`, `DISCORD_WEBHOOK_URL`, `SMTP_HOST`, `SMTP_USER`, `SENDGRID_API_KEY`, `MAILGUN_API_KEY`, `TELEGRAM_BOT_TOKEN` et `TELEGRAM_CHAT_ID` sont absentes dans ce run. Même si Telegram avait été présent, je ne l'aurais pas traité comme liste marketing sûre sans cible humaine validée.

J'ai cherché une liste privée hors git dans `/root`, en visant les noms de fichiers `contact`, `contacts`, `target`, `recipient`, `outreach`, `lead`, `audience` et les CSV. Je n'ai trouvé aucune liste exploitable pour AQ-233. Le seul CSV trouvé est `/root/obsidian-vault/Smil/Baycast/Metrics.csv`; c'est un suivi produit avec métriques, pas une liste de destinataires. Les fichiers `.env` trouvés ne contiennent pas de clé qui ressemble à une liste de contacts ou de cibles.

Le blocage reste donc le même: il manque la paire canal authentifié plus liste humaine privée. Le minimum pour débloquer AQ-233 est très court: soit authentifier `x-cli` avec les cinq variables X attendues, soit installer et configurer un canal email explicite, puis fournir hors git une petite liste validée avec nom, handle ou email, canal, contexte de relation et message choisi. Sans ces deux éléments ensemble, il ne faut rien envoyer.

Séquence prête quand le premier score public est visible: ouvrir la page publique Baycast et vérifier que le leaderboard affiche au moins une ligne scorée avec Brier ou Log Score, garder la copie sur prediction polling et pas sur betting, charger la liste privée validée, faire un dry run local qui affiche seulement les cibles et les messages, envoyer d'abord à trois personnes chaudes, attendre les réponses ou les forecasts, puis seulement élargir au reste de la liste si le lien, le score public et le cadrage restent propres.

Copie courte à utiliser à ce moment-là, à adapter seulement avec le prénom si la liste privée l'autorise:

Baycast a maintenant son premier score public. C'est du prediction polling, pas du betting: on demande aux gens ce qu'ils pensent qu'il va arriver, puis on score les forecasts quand les questions se résolvent. Si tu as cinq minutes, choisis une question live, fais ton forecast, et ajoute une phrase de raison si tu peux.

https://baycast-p.vercel.app

Statut AQ-233 à 13h UTC: bloqué proprement. Rien envoyé, rien simulé comme envoyé, aucun destinataire inventé.
