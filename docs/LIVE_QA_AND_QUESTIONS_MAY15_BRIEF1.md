# Live QA AQ-214 et questions court terme, 15 mai brief1

Contrôle fait le 15 mai 2026 sur la prod `https://baycast-p.vercel.app`, au navigateur, sans session connectée. J'ai créé ce fichier avant le test live, puis je l'ai complété avec les preuves relevées dans la page.

## Live QA AQ-214

Page testée: `https://baycast-p.vercel.app/questions/4db2190d-8bf0-44e7-87ae-9e9b7e26a557`

C'est la première page visible en tri `Newest` sur `/questions` au moment du contrôle. Titre de la question: `Will Apple announce a foldable iPhone before September 30, 2026?`

Dans le corps visible, je n'ai pas vu de compteur exact du type `0 forecasters`, `1 forecaster` ou `2 forecasters` avant forecast ou unlock. La page montre bien que le consensus reste verrouillé: `Sign in to forecast and see the community consensus`, puis `Join Baycast to submit your prediction and unlock the aggregate probability.` La zone consensus affiche encore `No forecasts yet`. Ce n'est pas une fuite de nombre exact avec le mot `forecaster`, mais ça révèle quand même qu'il n'y a pas encore de participation sur cette question.

Extrait corps visible: `Technology 139d left`, `Will Apple announce a foldable iPhone before September 30, 2026?`, `Sign in to forecast and see the community consensus`, `Consensus`, `No forecasts yet`, `Resolution source: Apple Newsroom and Apple Events pages`.

`document.title` est propre: `Will Apple announce a foldable iPhone before September 30, 2026? - Baycast`. Pas de compteur, pas de consensus, pas de nombre de participants.

La meta description est propre sur le point AQ-214. Elle dit: `tech · Open · Forecast before seeing the community consensus. Resolves Yes if Apple publicly announces an iPhone model with a foldable display before 2026-10-01 00:00 UTC...` Je n'ai trouvé aucun `forecaster` ni compteur exact dedans.

`og:description` reprend la même formulation: `tech · Open · Forecast before seeing the community consensus. Resolves Yes if Apple publicly announces an iPhone model with a foldable display before 2026-10-01 00:00 UTC...` Pas de fuite de count.

`twitter:description` reprend aussi la même formulation: `tech · Open · Forecast before seeing the community consensus. Resolves Yes if Apple publicly announces an iPhone model with a foldable display before 2026-10-01 00:00 UTC...` Pas de fuite de count.

Le JSON-LD présent en `application/ld+json` ne contient pas de nombre exact de forecasters. Extrait: `{"@context":"https://schema.org","@type":"Question","name":"Will Apple announce a foldable iPhone before September 30, 2026?","acceptedAnswer":{"@type":"Answer","text":"No forecasts yet"}}`. Même remarque que pour le corps visible: `No forecasts yet` n'est pas un count exact, mais c'est un signal d'absence de participation.

Recherche exacte faite dans le DOM live: `bodyForecasterMatches: []` et `htmlForecasterMatches: []` pour la regex `\b\d+\s+forecasters?\b`. Je n'ai donc pas retrouvé la fuite précédente du style `1 forecaster` dans le visible, les metas, le JSON-LD ou le HTML chargé.

## Verdict

PASS pour AQ-214 sur la fuite demandée: la page détail question la plus récente ne publie plus de compteur exact `forecaster` avant forecast ou unlock, y compris dans `document.title`, meta description, Open Graph, Twitter et JSON-LD.

Point produit à garder en tête: `No forecasts yet` reste visible dans le corps et dans le JSON-LD. Si la règle BCP devient plus stricte et veut cacher tout signal de volume avant forecast, il faudra remplacer ce texte par une formule neutre. Pour le ticket tel que formulé, je le compte comme non bloquant parce qu'il ne s'agit pas d'un exact `forecaster` count leak.

## 5 questions court terme à ajouter

### 1. Le Royaume-Uni publiera-t-il une inflation CPI annuelle d'au moins 3,0% pour avril 2026 ?

Catégorie: Economy.

Clôture: 20 mai 2026, 23:59 UTC.

Source de résolution: Office for National Statistics, publication CPI d'avril 2026. Reuters ou Bloomberg peuvent servir de miroir si le site ONS est indisponible au moment de la résolution.

Critères: résout Oui si la première publication ONS du CPI annuel britannique pour avril 2026 est de 3,0% ou plus. Résout Non si la première publication est inférieure à 3,0%, ou si aucun chiffre officiel n'est publié avant la clôture.

Cas limites: les révisions ultérieures ne changent pas le résultat. CPIH ne compte pas si le CPI classique est publié. Un chiffre arrondi par l'ONS à exactement 3,0% compte comme Oui.

Estimation de départ: 46%.

### 2. Nvidia clôturera-t-il au-dessus de 1 000 dollars après ses résultats trimestriels de mai 2026 ?

Catégorie: Economy.

Clôture: 29 mai 2026, 23:59 UTC.

Source de résolution: Nasdaq official close pour NVDA, complété par Yahoo Finance ou Nasdaq historical data si besoin.

Critères: résout Oui si l'action Nvidia `NVDA` clôture strictement au-dessus de 1 000,00 USD au moins une fois entre le 15 mai et le 29 mai 2026 inclus. Résout Non si aucune clôture officielle sur cette fenêtre ne dépasse ce seuil.

Cas limites: le prix intraday ne compte pas. Une clôture exactement à 1 000,00 USD ne compte pas. Si un split entre en vigueur avant la clôture, le seuil est ajusté dans le même ratio pour rester économiquement équivalent.

Estimation de départ: 38%.

### 3. SpaceX lancera-t-il un vol Starship orbital ou suborbital avant le 5 juin 2026 ?

Catégorie: Science.

Clôture: 4 juin 2026, 23:59 UTC.

Source de résolution: SpaceX mission updates, FAA launch operations notices, livestream SpaceX, Spaceflight Now comme source secondaire.

Critères: résout Oui si un véhicule Starship avec Super Heavy décolle de Starbase ou d'un autre site avant la clôture, même si le vol échoue après le décollage. Résout Non si SpaceX ne fait qu'un static fire, un wet dress rehearsal, une annonce de date ou un report.

Cas limites: le décollage doit avoir lieu, pas seulement le démarrage des moteurs. Un scrub après allumage mais sans liftoff ne compte pas. Un vol d'essai partiel compte si Starship quitte clairement le pas de tir.

Estimation de départ: 32%.

### 4. Le Real Madrid annoncera-t-il officiellement une recrue senior avant le 1er juin 2026 ?

Catégorie: Sports.

Clôture: 31 mai 2026, 23:59 UTC.

Source de résolution: site officiel du Real Madrid, communiqué du club, comptes sociaux officiels du club si le communiqué web arrive avec retard.

Critères: résout Oui si le Real Madrid annonce officiellement la signature ou l'accord définitif pour un joueur destiné à l'équipe masculine senior avant la clôture. Résout Non si seuls des médias, agents ou clubs vendeurs annoncent l'accord sans confirmation du Real Madrid.

Cas limites: un prêt entrant compte. Une prolongation de contrat ne compte pas. Une signature pour Castilla ou une équipe de jeunes ne compte pas sauf si le communiqué l'intègre clairement à l'équipe première.

Estimation de départ: 27%.

### 5. OpenAI lancera-t-il une nouvelle fonctionnalité ChatGPT payante ou grand public avant le 5 juin 2026 ?

Catégorie: Technology.

Clôture: 4 juin 2026, 23:59 UTC.

Source de résolution: OpenAI News, notes de release ChatGPT, annonce officielle sur le compte OpenAI ou dans l'interface produit documentée publiquement.

Critères: résout Oui si OpenAI rend disponible une nouvelle fonctionnalité ChatGPT à des utilisateurs Plus, Pro, Team, Enterprise ou gratuits avant la clôture. La fonctionnalité doit être utilisable par un groupe réel d'utilisateurs, pas seulement annoncée comme à venir.

Cas limites: un simple changement de prix ne compte pas. Une API seule ne compte pas si elle n'apparaît pas dans ChatGPT. Un rollout limité compte si OpenAI dit clairement qu'il est disponible pour une population d'utilisateurs, même progressive.

Estimation de départ: 55%.
