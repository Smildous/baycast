# AQ-221, QA live production, 17 mai 13h

Verdict: AQ-198 est bien propagé en production pour les pages question testées. La section `Context links` est visible sur les deux détails ouverts depuis `https://baycast-p.vercel.app/questions`.

J'ai aussi trouvé un petit problème de copy BCP sur la prod actuelle: plusieurs textes publics utilisent encore `consensus` avant que le visiteur ait forecasté. Il n'y a pas de probabilité agrégée, pas de nombre exact de forecasters, et pas de langage de pari, mais le mot `consensus` apparaît dans la liste, les metas, le JSON-LD et le panneau verrouillé. J'ai corrigé ce point dans le code pour remplacer cette copy pré-forecast par `the crowd can shape your call` ou `Community signal` selon le contexte.

## URLs vérifiées

Page liste:
https://baycast-p.vercel.app/questions

Détails ouverts au navigateur:
https://baycast-p.vercel.app/questions/4db2190d-8bf0-44e7-87ae-9e9b7e26a557
https://baycast-p.vercel.app/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248

## Preuves visibles

Sur la liste, les cards affichent le titre, la catégorie, le temps restant et la copy `Lock your call before consensus` sur la prod actuelle. Aucun pourcentage agrégé, aucun nombre exact de forecasters, aucun mot de pari vu dans le rendu visible.

Sur le détail Apple foldable iPhone, la section apparaît bien:

`Context links`
`Static reference links that may help frame the question. No live news feed is loaded here.`
Liens vus: `NIST AI Resource Center`, `OpenAI news and research updates`, `Apple Newsroom`.

Sur le détail Apple Mac Pro WWDC 2026, même constat:

`Context links`
`Static reference links that may help frame the question. No live news feed is loaded here.`
Liens vus: `NIST AI Resource Center`, `OpenAI news and research updates`, `Apple Newsroom`.

Les deux pages affichent le formulaire unauth avec slider local à 50%. Ce 50% est l'état du contrôle utilisateur, pas une probabilité communautaire. Le bloc signal affiche `—`, donc pas de probabilité agrégée exposée.

## Title, meta, OG, Twitter, JSON-LD

Question Apple foldable:

Title: `Will Apple announce a foldable iPhone before September 30, 2026? - Baycast`
Meta description prod actuelle: `tech · Open · Forecast before seeing the community consensus. Resolves Yes if Apple publicly announces an iPhone model with a foldable display before 2026-10-01 00:00 UTC...`
OG title: identique au title.
OG description: identique à la meta description.
Twitter title: identique au title.
Twitter description: identique à la meta description.
JSON-LD vu dans le DOM navigateur: `@type: Question`, `name` et `text` corrects, `acceptedAnswer.text: Forecast before seeing the community consensus.`

Question Apple Mac Pro:

Title: `Will Apple announce a new Mac Pro at WWDC 2026? - Baycast`
Meta description prod actuelle: `tech · Open · Forecast before seeing the community consensus. Resolves Yes if Apple announces a new Mac Pro model during WWDC 2026...`
OG title: identique au title.
OG description: identique à la meta description.
Twitter title: identique au title.
Twitter description: identique à la meta description.
JSON-LD vu dans le DOM navigateur: `@type: Question`, `name` et `text` corrects, `acceptedAnswer.text: Forecast before seeing the community consensus.`

## HTML accessible par requête

Requête directe sur la liste:
status 200, 58 633 bytes.
Title: `Browse Prediction Questions — Baycast`.
Description: `Browse open forecasting questions. Submit your probability estimates and get scored on accuracy.`
Pas de `Context links` attendu sur la liste.
Pas de pourcentage agrégé trouvé, pas de nombre exact de forecasters trouvé. Les occurrences `Questions` et `Crowd predictions` sont du texte de navigation/footer, pas des counts.
Pas de langage de pari trouvé.

Requête directe sur Apple foldable:
status 200, 43 928 bytes.
`Context links` présent dans le HTML.
Pas de pourcentage agrégé trouvé.
Pas de nombre exact de forecasters trouvé.
Occurrences de `probability`: copy produit `save your probability` et `Set your probability`, pas une valeur communautaire.
Pas de langage de pari trouvé.

Requête directe sur Apple Mac Pro:
status 200, 43 724 bytes.
`Context links` présent dans le HTML.
Pas de pourcentage agrégé trouvé.
Pas de nombre exact de forecasters trouvé.
Occurrences de `probability`: copy produit `save your probability` et `Set your probability`, pas une valeur communautaire.
Pas de langage de pari trouvé.

## Bug corrigé dans cette passe

Le problème était petit et localisé. Avant correction, la prod montre `consensus` avant forecast dans:

`components/QuestionCard.tsx`: `Lock your call before consensus`
`app/questions/[id]/page.tsx`: `Forecast before seeing the community consensus.`, `Lock your forecast before consensus`, label verrouillé `Consensus`
`lib/forecaster-count-visibility.ts`: meta description publique avec `community consensus`

Correction appliquée:

Cards: `Lock your call before the crowd can shape it`
Meta et JSON-LD locked: `Forecast before the crowd can shape your call.`
Panneau unauth détail: `Lock your forecast before the crowd can shape it`
Label verrouillé de la stat: `Community signal`
Le libellé `Consensus` reste seulement quand le signal est réellement déverrouillé.

## Vérification locale après correction

`npm test`: 7 fichiers passés, 84 tests passés.
`npm run build`: build Next.js réussi.

## Verdict final

Pass pour AQ-198 sur la propagation `Context links` en production.
Pass pour absence de fuite chiffrée BCP: pas de probabilité agrégée, pas de count exact de forecasters, pas de langage de pari.
Bug copy BCP trouvé et corrigé: la prod actuelle disait encore `consensus` avant forecast dans plusieurs surfaces publiques. Le correctif est prêt dans ce commit et sera vérifiable après déploiement Vercel.
