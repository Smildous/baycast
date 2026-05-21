# AQ-239 Product live QA, 21 mai 19h

QA faite sur `https://baycast-p.vercel.app` après reset local sur `origin/main`.

## Verdict

GO pour les routes d’outreach directes.

La route question Apple Mac Pro est utilisable en public. Elle garde le signal communautaire fermé, ne montre pas de probabilité agrégée, ne montre pas de consensus avant forecast, ne montre pas de nombre exact de forecasters, et ne pousse pas un angle gambling.

Point à corriger hors blocage: ` /questions?sort=closing-soon ` affiche `Questions(0 open)` alors que la page explique seulement qu’aucune question ne ferme dans les 14 jours. Ce n’est pas une fuite BCP, mais le compteur peut être mal lu comme zéro question ouverte.

## Routes vérifiées

### `/`

PASS.

Titre document: `Baycast - Predict Real Events`.
Meta description: `Make predictions on real events and see independent judgments become collective intelligence. Baycast uses wisdom of the crowds to compare humans, AI models, and experts. Free to use.`

Éléments visibles relevés:

- `How well can you predict the future?`
- `A crowd can sometimes spot what one person, one expert, or one model might miss.`
- `Make your call first, then see what the crowd and AI predicted.`
- `44 Questions live now`
- `100% Free to play`
- cartes live questions avec `Lock your call before the crowd can shape it`

BCP: pas de consensus pré-forecast, pas de probabilité agrégée, pas de compte exact de forecasters. Le wording reste prediction polling et scoring. Rien ne parle de mise, odds, casino, pari, payout, trading ou rendement.

Note: `Free to play` est du wording produit gamifié. Je ne le classerais pas comme gambling, car il est accompagné de `No payment required`, `Free forever`, `scored by reality`, et aucune promesse financière.

### `/questions`

PASS.

Éléments visibles relevés:

- `Questions(44 open)`
- `Every forecast you add sharpens the collective estimate.`
- filtres `All`, `Politics`, `Technology`, `Economy`, `Science`, `Sports`, `Other`, `Open`, `Closed`, `Resolved`
- tris `Closing Soon`, `Newest`, `Most Active`
- cartes question avec catégorie, temps restant, titre, puis `Lock your call before the crowd can shape it`

BCP: pas de consensus, pas de probabilité agrégée, pas de compte exact de forecasters. Le tri `Most Active` est visible, mais les cartes ne publient pas de volume de forecasts.

### `/questions?sort=closing-soon`

PASS BCP, issue produit mineure.

Éléments visibles relevés:

- `Questions(0 open)`
- `No questions closing in the next 14 days`
- `Use Newest for the full open set, or come back when the first resolution windows get closer.`

BCP: aucune fuite. Aucun forecast, consensus, pourcentage communautaire, activité de forecasters ou count exact.

Issue: le header `Questions(0 open)` est ambigu. Il devrait probablement dire `0 closing soon`, ou garder `44 open` avec un état vide pour le filtre closing soon.

### `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`

PASS.

Titre document: `Will Apple announce a new Mac Pro at WWDC 2026? - Baycast`.
Meta description: `tech · Open · Forecast before the crowd can shape your call. Resolves Yes if Apple announces a new Mac Pro model during WWDC 2026 or in an Apple Newsroom post dated from 2026-06-08 through 2026-06-12. A spec bump to Mac Studio, MacBook, iMac, or Mac mini does not count. A Mac Pro with any new Apple silicon generation counts, whether it ships immediately or later. If no new Mac Pro is announced in that window, resolves No.`

Éléments visibles relevés:

- `Will Apple announce a new Mac Pro at WWDC 2026?`
- `Resolves Yes if Apple announces a new Mac Pro model during WWDC 2026...`
- `Context links`
- `Static reference links that may help frame the question. No live news feed is loaded here.`
- `Lock your forecast before the crowd can shape it`
- `Community signal locked`
- `Add your forecast`
- slider local à `50%` avec raccourcis `5%`, `10%`, `25%`, `50%`, `75%`, `90%`, `95%`
- `Sign up to forecast`
- `Log in`

BCP: la route directe est propre. Le `50%` affiché est le slider utilisateur par défaut, pas une probabilité communautaire. La page montre `Community signal locked` et ne révèle pas le signal, pas de consensus, pas de count de forecasters, pas d’activité publique avant résolution.

### `/leaderboard`

PASS.

Éléments visibles relevés:

- `Leaderboard`
- `Ranked by calibration. A Brier score near 0 means your predictions matched what actually happened.`
- table avec colonnes `#`, `Forecaster`, `Brier`, `Log Score`, `Predictions`, `Resolved`
- `Scores appear after questions resolve`
- `Forecasts are live now, but leaderboard scores start once a question has a final outcome.`

BCP: pas de données personnelles ou activité ouverte visible. Les colonnes existent, mais aucun row ne publie de counts ou scores avant résolution.

### `/activity`

PASS.

Éléments visibles relevés:

- `Activity Feed`
- `Public forecasting activity appears after questions resolve.`
- `Activity appears after questions resolve`
- `Open-question forecasts stay hidden until resolution so every forecaster starts blind.`
- `Browse Questions`

BCP: conforme. L’activité publique est explicitement différée après résolution.

## Synthèse BCP

Aucune route vérifiée ne montre de probabilité agrégée, de consensus pré-forecast, de nombre exact de forecasters sur une surface publique open-question, ou de positionnement gambling. La route outreach Apple Mac Pro garde le bon modèle: forecast d’abord, comparaison ensuite.

## Issues

1. Non bloquant: `/questions?sort=closing-soon` affiche `Questions(0 open)` alors que le produit annonce 44 questions ouvertes ailleurs. Recommandation: renommer le compteur filtré ou afficher un libellé de filtre.
2. Non bloquant: l’onboarding peut apparaître dans le body text sur certaines routes (`Welcome to Baycast`, `Blind Forecasts`, `Scored Accuracy`, `Human + AI`). Le contenu est conforme BCP, mais il ajoute du bruit dans les pages publiques.

## Décision

GO pour outreach routes.

La route directe Apple Mac Pro peut être partagée. Le seul point produit vu pendant cette passe est une ambiguïté de compteur sur le tri closing soon, sans impact BCP.