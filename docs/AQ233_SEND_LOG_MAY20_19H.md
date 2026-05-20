# AQ-233 send log, May 20 19h

J'ai inspecté le pack courant `docs/AQ230_CURRENT_FORECAST_PUSH_MAY20.md` avant toute action. Le lien Baycast charge dans le navigateur et montre des questions live. Je n'ai repris aucun chiffre de traction dans la copie.

## Canaux vérifiés

| Canal | État sur ce VPS | Résultat |
|---|---|---|
| X / `x-cli` | Binaire présent: `/root/.local/bin/x-cli`. Fichier env présent, mais `x-cli me mentions` répond que les variables X API manquent. | Pas authentifié pour X. Aucun tweet, DM, reply ou post envoyé. |
| Email CLI | `mail`, `mailx`, `mutt`, `msmtp`, `sendmail`, `swaks` absents. Des variables email existent dans l'env chargé par le VPS, mais je n'ai pas trouvé de CLI d'envoi configurée ni de liste de destinataires. | Aucun email envoyé. |
| Discord | Aucun `discord` ou `discord-cli` disponible. Pas de webhook ou cible humaine trouvée dans le repo. | Aucun message Discord envoyé. |
| Slack | Aucun `slack` ou `slack-cli` disponible. Pas de workspace ou cible humaine trouvée. | Aucun message Slack envoyé. |
| Telegram | Variables Telegram présentes dans l'env du VPS, mais pas de CLI dédiée ni de liste de cibles humaines Baycast. Le canal home ressemble à un canal système, pas à une liste marketing validée. | Aucun message Telegram envoyé. |
| GitHub CLI | `gh` est connecté pour Git, mais ce n'est pas un canal sûr pour envoyer ce push à dix humains. | Aucun message GitHub envoyé. |

## Envois

Aucun envoi n'a eu lieu.

La raison est simple: j'ai trouvé un binaire X, mais pas d'auth X valide. J'ai trouvé des indices email et Telegram dans l'environnement, mais pas de CLI d'envoi utilisable avec une liste de destinataires humains. Je n'ai trouvé aucun fichier contacts, targets ou liste de personnes à contacter dans `/root/baycast` ou `/root`.

Je n'ai pas inventé de noms, de handles, d'emails, de réponses ou de résultats.

## Messages sélectionnés

Ces dix DMs du pack AQ-230 sont les messages propres à utiliser dès qu'un canal authentifié et une liste humaine sûre existent. Ils ne contiennent pas de chiffres, pas de traction, pas de promesse AI active, et pas de copie sensible BCP.

**DM 1**

Hey, quick ask. Baycast has live questions ready and I need more human forecasts today. Can you pick one question, make your forecast, and add a short reason if you can?

https://baycast-p.vercel.app

**DM 2**

I am asking a few thoughtful people for one Baycast forecast today. Pick any live question where you have a real view. No need to sound certain. Just say what you think happens and why.

https://baycast-p.vercel.app

**DM 3**

Small favor. Can you try Baycast for five minutes and forecast one live question? The source links are usable now, so I am trying to get real human reads in before adding anything else.

https://baycast-p.vercel.app

**DM 4**

Would value your judgment on Baycast today. Open a question, make the forecast you would stand by later, and add one sentence of reasoning if you have time.

https://baycast-p.vercel.app

**DM 5**

Baycast needs human forecasts more than commentary today. If you have five minutes, pick one live question and give the clearest read you can.

https://baycast-p.vercel.app

**DM 6**

Can I get one forecast from you today? Choose a question on Baycast, answer what you think will happen, and write the reason you would tell a friend.

https://baycast-p.vercel.app

**DM 7**

I am doing a focused Baycast push today. The useful thing is not a like or a reply. It is one forecast on a live question, with a short reason if possible.

https://baycast-p.vercel.app

**DM 8**

If a Baycast question catches your eye today, can you forecast it before reading around too much? I am trying to collect independent human judgment, not polished takes.

https://baycast-p.vercel.app

**DM 9**

You are exactly the kind of person I would trust to be clear when uncertain. Can you make one Baycast forecast today and add a quick reason?

https://baycast-p.vercel.app

**DM 10**

Quick Baycast request: one live question, one forecast, one reason. Five minutes is enough. If something feels confusing, tell me that too.

https://baycast-p.vercel.app

## Critères de cible

Cible sûre pour ce push: une personne humaine déjà connue, qui peut donner une prévision réfléchie sans long pitch. Priorité aux fondateurs, builders produit, personnes AI safety ou evals, journalistes, policy people, civic tech, chercheurs, forecasters, et amis assez directs pour signaler une question confuse.

À éviter: comptes de marque, listes froides, communautés où le post serait hors sujet, personnes qui attendent une annonce produit, et toute cible où le message devrait ajouter des chiffres, de la traction, une lecture de groupe ou des détails internes.

## Résultats

| Cible | Canal | Message | Statut | Réponse |
|---|---|---|---|---|
| Aucune cible validée trouvée | Aucun | Aucun | Non envoyé | Aucune |

## Bloqueurs

Le blocage principal est l'absence de paire canal authentifié plus liste humaine sûre. `x-cli` existe mais n'a pas les variables X nécessaires. Les outils email et Discord ne sont pas installés. Les variables Telegram et email présentes dans l'environnement ne suffisent pas: sans CLI claire et sans liste de personnes, envoyer serait risqué.

## Prochaine action sûre

Configurer un canal explicite et une petite liste validée avant de relancer AQ-233. Le plus propre: ajouter un fichier privé non commité avec jusqu'à dix cibles humaines chaudes, leur canal, et le DM choisi, puis vérifier que le canal d'envoi est bien authentifié. Ensuite envoyer les DMs 1, 2, 4, 6, 10 d'abord, attendre les premiers retours, puis seulement continuer si les réponses restent orientées forecast.
