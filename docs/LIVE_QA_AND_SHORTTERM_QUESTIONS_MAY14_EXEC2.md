# Live QA et questions court terme, 14 mai exec2

Créé le 14 mai 2026 à 13:02 UTC. Cible testée: https://baycast-p.vercel.app.

## Verdict live AQ-209

La correction closing-soon de `ff9abce` est visible en production sur la route demandée.

Sur `/questions?category=Technology&sort=closing-soon`, le tri explicite `closing-soon` ne montre aucune question avec 231d, 412d, ni autre date longue. La page affiche le titre `Questions(2 open)`, les filtres Technology et Closing Soon actifs dans l'URL, puis l'état vide `No questions match your search`. Donc le bug des questions très lointaines n'est pas visible sur cette route en production.

Point à surveiller: le compteur dit `2 open` alors que la liste Technology en closing-soon est vide. Ce n'est pas le bug 231d/412d, mais l'écart peut troubler un utilisateur.

## Evidence QA live

`/auth/signup`

La page charge correctement. Titre navigateur: `Sign Up, Baycast | Prediction Polling Platform`. Le contenu visible contient `Join Baycast`, le bouton `Continue with Google`, les champs username, email et password, puis `Create my account`. Les liens de navigation sont présents, dont Questions, Activity, Leaderboard, How It Works et Compare.

`/compare`

La page charge correctement. Titre navigateur: `Baycast vs Polymarket vs Metaculus vs Manifold, Platform Comparison`. Le H1 visible est `Prediction Polls vs Prediction Markets`. Le tableau comparatif s'affiche avec Baycast, Polymarket, Metaculus, Manifold et Kalshi. Aucun blocage de rendu constaté dans la vue chargée.

`/questions?category=Technology&sort=closing-soon`

La page charge correctement. Titre navigateur: `Browse Prediction Questions, Baycast`. L'URL conserve `category=Technology&sort=closing-soon`. Les filtres visibles incluent Technology, Open, Closed, Resolved, Closing Soon, Newest et Most Active. La zone de résultats affiche `No questions match your search`. Console navigateur: aucun message et aucune erreur JavaScript au moment du contrôle. Verdict précis: aucun élément long-range visible, aucun 231d, aucun 412d.

## 5 questions court terme à ajouter

### 1. OpenAI annoncera-t-il officiellement une nouvelle version majeure de ChatGPT avant le 22 mai 2026 ?

Clôture: 21 mai 2026, 23:59 UTC.

Source de résolution: OpenAI News, blog officiel OpenAI, compte X officiel @OpenAI si le billet officiel y est lié.

Résolution Oui: OpenAI annonce publiquement une nouvelle version majeure nommée de ChatGPT, par exemple une version clairement présentée comme nouvelle génération ou nouveau modèle principal intégré à ChatGPT.

Résolution Non: aucune annonce officielle admissible avant la clôture de résolution.

Cas limites: une simple mise à jour de voix, d'interface ou de disponibilité régionale ne suffit pas. Une rumeur média ne suffit pas. Une annonce développeur compte seulement si elle dit clairement que ChatGPT reçoit une nouvelle version majeure accessible aux utilisateurs.

### 2. Apple publiera-t-il iOS 18.6.1 ou une version iOS supérieure au public avant le 31 mai 2026 ?

Clôture: 30 mai 2026, 23:59 UTC.

Source de résolution: page Apple Security Releases, notes de version Apple, IPSW public signé par Apple.

Résolution Oui: Apple rend disponible publiquement iOS 18.6.1 ou une version numériquement supérieure avant la date limite.

Résolution Non: aucune version iOS admissible n'est disponible publiquement avant la date limite.

Cas limites: une beta développeur ou public beta ne compte pas. Une mise à jour iPadOS seule ne compte pas. Une réédition avec le même numéro de version ne compte que si Apple la distingue comme build public remplaçant une version précédente et si le numéro demandé est atteint.

### 3. SpaceX lancera-t-il au moins une mission Falcon 9 orbitale entre le 15 mai et le 25 mai 2026 inclus ?

Clôture: 24 mai 2026, 23:59 UTC.

Source de résolution: SpaceX, FAA launch operations, Spaceflight Now launch schedule, NASASpaceflight si les sources officielles sont lentes à mettre à jour.

Résolution Oui: une Falcon 9 décolle et la mission atteint une trajectoire orbitale ou déploie une charge utile prévue pendant la fenêtre.

Résolution Non: aucun lancement orbital Falcon 9 ne se produit dans la fenêtre.

Cas limites: un scrub ou un static fire ne compte pas. Un lancement Falcon Heavy ne compte pas. Si le décollage a lieu avant la fin de fenêtre mais que le déploiement est confirmé après, la question se résout Oui si la mission était orbitale et nominale.

### 4. NVIDIA annoncera-t-il une division d'actions avant le 4 juin 2026 ?

Clôture: 3 juin 2026, 23:59 UTC.

Source de résolution: NVIDIA Investor Relations, communiqué SEC 8-K, communiqué officiel de résultats ou assemblée actionnaires.

Résolution Oui: NVIDIA annonce officiellement un split ou reverse split de son action ordinaire avant la date limite.

Résolution Non: aucune annonce officielle de division d'actions n'est publiée avant la date limite.

Cas limites: une discussion d'analyste ou une prédiction de presse ne compte pas. Une autorisation générale de conseil sans ratio ni intention annoncée ne suffit pas. Un changement d'ADR ou de ticker sans division économique de l'action ne compte pas.

### 5. L'indice US Dollar Index DXY clôturera-t-il sous 100,00 au moins une fois avant le 28 mai 2026 ?

Clôture: 27 mai 2026, 23:59 UTC.

Source de résolution: ICE US Dollar Index, MarketWatch DXY historical data, TradingView avec cotation ICE si la page ICE n'est pas facilement accessible.

Résolution Oui: une clôture journalière officielle de DXY est strictement inférieure à 100,00 entre le 15 mai et le 27 mai 2026 inclus.

Résolution Non: toutes les clôtures journalières de la période sont à 100,00 ou au-dessus.

Cas limites: un niveau intraday sous 100,00 ne compte pas sans clôture sous 100,00. Une valeur arrondie à 100,0 ne suffit pas, il faut la donnée non arrondie si disponible. Si deux sources divergent, ICE prime, puis une source de marché reconnue avec historique daté.
