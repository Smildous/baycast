# Live QA et questions court terme, 14 mai exec5

Test fait le 14 mai 2026 sur https://baycast-p.vercel.app.

## Live QA: fuite du nombre de participations BCP

J'ai contrôlé la home, la liste `/questions`, le tri `/questions?sort=most-active`, deux pages question et les pages auth. Le dernier déploiement est bien visible côté interface principale pour les cartes et le corps des questions: le nombre exact de participants n'est plus exposé dans ces vues. Il reste par contre exposé dans les métadonnées SEO et sociales des pages question.

Sur la home, les cartes de questions affichent la catégorie, le temps restant, le titre et un appel à l'action. Les questions sans forecast affichent `Be the first to forecast`. Je n'ai pas vu de `0 forecasters`, `1 forecaster`, ni chiffre de participation sur les cartes visibles.

Sur `/questions`, le H1 affiche `Questions(44 open)`. Les cartes visibles gardent le même format: catégorie, jours restants, titre, puis `Be the first to forecast`. Aucun compteur exact de participation n'est visible sur ces cartes. Sur `/questions?sort=most-active`, la question Bitcoin, qui a le forecast existant, affiche `Join the forecast` au lieu de `1 forecaster`. C'est mieux pour la logique BCP: l'utilisateur comprend qu'il peut participer sans recevoir le nombre exact avant sa propre prévision.

Sur la page détail sans forecast testée, `Will Apple announce a new Mac Pro at WWDC 2026?`, le corps visible ne montre pas de nombre de participants. Il affiche `Sign in to forecast and see the community consensus`, puis `Consensus`, `No forecasts yet`, la date de clôture et la source de résolution. Le texte `No forecasts yet` reste une information de participation, mais pas un compteur numérique précis. C'est probablement acceptable si le but est de supprimer la fuite du count, pas de cacher totalement le fait qu'une question est vide.

Sur la page détail avec forecast testée, `Will Bitcoin exceed $200,000 before 2027?`, le corps visible ne montre pas `1 forecaster`. Il affiche `Growing community`. C'est le bon comportement produit: assez de signal pour donner vie à la page, pas assez pour ancrer l'utilisateur sur un volume exact.

Point important: les métadonnées de page détail exposent encore le compteur. Pour la question Mac Pro, la meta description et `og:description` contiennent `tech · Open · 0 forecasters`. Pour la question Bitcoin, la meta description, `og:description` et `twitter:description` contiennent `economy · Open · 1 forecaster`. Ces valeurs sont inspectables dans le DOM et seront reprises par les aperçus sociaux. Si le critère BCP inclut les bots, les crawlers, les partages ou le HTML public, la fuite n'est pas complètement corrigée.

Le title navigateur des pages question est propre: `Will Apple announce a new Mac Pro at WWDC 2026? - Baycast` et `Will Bitcoin exceed $200,000 before 2027? - Baycast`. Pas de compteur dans le title.

Les données structurées existent sur les pages question en `application/ld+json`. Elles ne montrent pas de compteur exact, mais leur `acceptedAnswer.text` vaut `No forecasts yet`, y compris sur la question Bitcoin qui a pourtant un forecast et affiche `Growing community` dans le corps. Ce n'est pas une fuite de count, mais c'est incohérent avec l'état live et ça peut donner un aperçu social ou SEO faux.

La page liste `/questions` a des métas propres: title `Browse Prediction Questions, Baycast`, description `Browse open forecasting questions. Submit your probability estimates and get scored on accuracy.`, OG et Twitter alignés. Pas de compteur de participation dans ces métas. Elle affiche seulement le total produit `44 open`, ce qui n'est pas le même problème que le count par question.

Côté signup et login, le parcours est court et clair. Depuis une page question, `Sign up to forecast` et `Log in` sont visibles sans chercher. La page signup propose Google, username, email, password, et rappelle `No gambling. Just forecasts and scores.` La page login propose Google, email, password et forgot password. Les validations inline fonctionnent sur soumission vide: `Enter a valid email` et `Password must be at least 6 characters`. Friction notable: sur signup, une modale onboarding s'ouvre après la soumission vide en même temps que les erreurs de formulaire. Elle masque une partie de la page et donne une sensation de surprise. Je la déclencherais plutôt après création de compte ou après un vrai login.

Verdict: l'interface visible respecte presque partout l'esprit BCP sur le count exact. Le correctif n'est pas complet tant que les meta descriptions OG/Twitter des pages question gardent `0 forecasters` ou `1 forecaster`. À corriger aussi: le JSON-LD `acceptedAnswer` qui dit `No forecasts yet` sur une question avec forecast.

## 5 questions court terme à ajouter

### 1. Apple publiera-t-il une Release Candidate publique d'iOS 26 avant le 28 mai 2026 ?

Catégorie: Technology.

Clôture: 27 mai 2026, 23:59 UTC.

Source de résolution: Apple Developer releases, Apple Beta Software Program, notes de version Apple officielles.

Critères exacts: résout Oui si Apple rend disponible une build explicitement nommée `iOS 26 Release Candidate`, `iOS 26 RC` ou équivalent public pour développeurs ou beta testeurs avant la clôture. Résout Non si seule une beta numérotée sort, si la RC concerne seulement iPadOS, macOS, watchOS ou visionOS, ou si aucune RC iOS 26 n'est publiée à temps.

Cas limites: une annonce sans téléchargement disponible ne suffit pas. Une build retirée après publication compte si Apple l'a bien rendue disponible avant la clôture. Si Apple change le nom marketing et publie une version finale d'iOS 26 avant la RC, la question résout Oui.

Probabilité de départ: 22%.

### 2. Le prix spot de l'or clôturera-t-il au-dessus de 2 500 dollars l'once avant le 31 mai 2026 ?

Catégorie: Economy.

Clôture: 30 mai 2026, 23:59 UTC.

Source de résolution: LBMA Gold Price PM, ICE Benchmark Administration, MarketWatch XAUUSD historical data si une source de marché secondaire est nécessaire.

Critères exacts: résout Oui si le fixing PM LBMA ou, à défaut, la clôture spot XAUUSD reconnue pour une journée de marché entre le 15 mai et le 30 mai 2026 inclus est strictement supérieure à 2 500,00 USD par once troy. Résout Non si aucune clôture admissible ne dépasse ce seuil.

Cas limites: un pic intraday ne compte pas. Une valeur exactement égale à 2 500,00 ne compte pas. Si le marché est fermé certains jours, seuls les jours de cotation disponibles comptent. LBMA prime sur les agrégateurs.

Probabilité de départ: 68%.

### 3. La FDA américaine autorisera-t-elle un nouveau vaccin Covid mis à jour avant le 4 juin 2026 ?

Catégorie: Science.

Clôture: 3 juin 2026, 23:59 UTC.

Source de résolution: FDA press announcements, FDA vaccines page, EUA letters and approvals database.

Critères exacts: résout Oui si la FDA approuve, autorise en EUA, ou met formellement à jour l'autorisation d'au moins un vaccin Covid avec une composition de souche nouvelle pour la saison 2026 avant la clôture. Résout Non si la FDA ne publie qu'une réunion, une recommandation de comité, ou une orientation sans autorisation de produit.

Cas limites: une décision du CDC seule ne compte pas. Une autorisation hors États-Unis ne compte pas. Une extension d'âge pour une formulation déjà autorisée ne compte pas sauf si la composition vaccinale est aussi mise à jour.

Probabilité de départ: 35%.

### 4. Une équipe NBA gagnera-t-elle un match de finales de conférence 2026 par au moins 25 points avant le 2 juin 2026 ?

Catégorie: Sports.

Clôture: 1 juin 2026, 23:59 UTC.

Source de résolution: NBA.com scores, ESPN scoreboard, Basketball Reference playoff game logs.

Critères exacts: résout Oui si un match officiel des finales de conférence NBA 2026 joué avant la clôture se termine avec une marge de victoire de 25 points ou plus. Résout Non si aucun match admissible n'atteint cette marge.

Cas limites: les demi-finales de conférence ne comptent pas. Un match commencé avant la clôture et terminé après compte seulement si le score final est publié et que le coup d'envoi a eu lieu avant la clôture. Une victoire par exactement 25 points compte.

Probabilité de départ: 41%.

### 5. Le Royaume-Uni publiera-t-il une inflation CPI annuelle d'au moins 3,0% pour avril 2026 ?

Catégorie: Politics.

Clôture: 21 mai 2026, 23:59 UTC.

Source de résolution: UK Office for National Statistics CPI release, ONS time series, Reuters or Bloomberg uniquement pour confirmer le chiffre si le site ONS est indisponible.

Critères exacts: résout Oui si la première publication ONS du CPI annuel britannique pour avril 2026 est de 3,0% ou plus. Résout Non si la première publication est inférieure à 3,0% ou si elle n'est pas publiée avant la clôture.

Cas limites: les révisions ultérieures ne changent pas la résolution. CPIH ne compte pas, sauf si l'ONS cesse de publier le CPI classique avant la date et désigne CPIH comme série principale de remplacement. Un chiffre arrondi à 3,0% par l'ONS compte comme Oui.

Probabilité de départ: 47%.
