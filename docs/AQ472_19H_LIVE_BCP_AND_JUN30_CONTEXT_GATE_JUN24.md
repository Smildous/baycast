# AQ-472 19h live BCP et contexte Jun 30, 2026-06-24

Contrôle fait le 2026-06-24T19:03:05Z depuis `/root/baycast-product`, après `git fetch origin && git pull --ff-only origin main`. Le dépôt était déjà à jour.

Je n'ai pas lu la table `forecasts` et je n'ai pas interrogé d'API privée de forecast. Les vérifications Supabase lancées ici sont restées indisponibles faute de variables publiques Supabase dans ce clone, donc les URL Jun 30 ont été retrouvées depuis le HTML public de `/questions`.

## Méthode

J'ai utilisé les scripts existants puis un fetch HTML public ciblé sur `https://baycast-p.vercel.app`.

`npm run verify:public-bcp` passe sur `/`, `/questions`, `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`, `/leaderboard` et `/activity`.

`npm run verify:distribution-gate` passe sur `/settlements/apple-mac-pro-wwdc-2026`, `/questions?status=resolved` et `/`.

`npm run verify:next-settlement-watch` ne passe pas dans ce clone parce que `SUPABASE_URL/NEXT_PUBLIC_SUPABASE_URL` et `SUPABASE_ANON_KEY/NEXT_PUBLIC_SUPABASE_ANON_KEY` ne sont pas présents. Je ne l'ai pas remplacé par une requête forecasts.

Ensuite j'ai fetché le HTML et le texte visible de ces pages publiques:

- `https://baycast-p.vercel.app/`
- `https://baycast-p.vercel.app/questions`
- `https://baycast-p.vercel.app/questions?status=resolved`
- `https://baycast-p.vercel.app/leaderboard`
- `https://baycast-p.vercel.app/activity`
- `https://baycast-p.vercel.app/settlements/apple-mac-pro-wwdc-2026`
- `https://baycast-p.vercel.app/questions/5745e845-94e9-4802-bbeb-850c982e1276`
- `https://baycast-p.vercel.app/questions/d3338e47-11ec-4568-942e-42bb19be0f5e`

Les deux dernières URL viennent de `/questions`. Les titres visibles sont:

- FIFA: `Will the 2026 FIFA World Cup opening match have at least three total goals?`
- OpenAI: `Will OpenAI release a new public video generation model before July 1, 2026?`

## Surfaces publiques BCP

La home charge avec le texte public attendu: `Crowd predictions. Scored by reality.`, `Make your call first, then see what the crowd and AI predicted.` Je n'ai pas vu de consensus ouvert, de compteur exact de participants, ni de champ brut dans le HTML.

`/questions` affiche `Questions ( 42 open )` et les cartes ouvertes. Les deux questions Jun 30 sont visibles avec `7 d left` et `Lock your call before the crowd can shape it`. Le scan HTML n'a pas trouvé `aggregate_probability`, `forecasters_count`, `forecastCount`, `fcCount`, `settled_by`, `evidence_doc`, JSON brut de résolution, ni copie de type `N forecasters`.

`/questions?status=resolved` affiche seulement les cartes résolues, dont Apple Mac Pro et la saison d'ouragans Atlantique. C'est cohérent avec une surface post-résolution. Pas de fuite open-question trouvée dans le HTML.

`/leaderboard` affiche un classement public post-résolution: `# Forecaster Brier Log Score Predictions Resolved`, avec une ligne publique pour `S Simba`, un Brier à `0.2500` et `2` questions résolues. Le mot `Forecaster` existe dans le titre et les libellés de la page, pas comme compteur exact sur une question ouverte. Pas de champ BCP interdit trouvé.

`/activity` affiche de l'activité liée à une question résolue: `Public forecasting activity appears after questions resolve.` et `S Simba forecasted 50 % on Will Apple announce a new Mac Pro at WWDC 2026?`. Ce pourcentage est post-résolution et lié à Apple, pas à une question ouverte. Pas de fuite Jun 30.

`/settlements/apple-mac-pro-wwdc-2026` affiche la note de settlement Apple en texte lisible: `Apple Mac Pro at WWDC 2026 resolved No`, `Outcome No`, `Settled June 13, 2026`. Je n'ai pas vu `settled_by`, `evidence_doc` ou JSON brut de résolution dans le HTML public.

## Détail FIFA Jun 30

URL vérifiée: `https://baycast-p.vercel.app/questions/5745e845-94e9-4802-bbeb-850c982e1276`.

La page est ouverte et dit `Community signal locked`, `Lock your forecast before the crowd can shape it`, puis montre le formulaire public avec les valeurs de saisie `5 %`, `10 %`, `25 %`, `50 %`, `75 %`, `90 %`, `95 %`. Ces pourcentages sont les boutons de saisie, pas un consensus.

Le scan visible et HTML ne trouve pas `aggregate_probability`, `forecasters_count`, `forecastCount`, `fcCount`, `settled_by`, `evidence_doc`, raw resolution JSON, `early consensus`, `community probability`, ni compteur exact de forecasters.

Côté contexte, la page montre uniquement une référence officielle: `FIFA World Cup 2026`, décrite comme `FIFA Official tournament hub for fixtures, match centre links, and final scores`. Le seul lien externe trouvé est `https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026`. La page dit aussi `No live news feed is loaded here`. Je n'ai pas vu de contexte générique type actualités larges, Wikipédia, ESPN ou flux non officiel.

## Détail OpenAI Jun 30

URL vérifiée: `https://baycast-p.vercel.app/questions/d3338e47-11ec-4568-942e-42bb19be0f5e`.

La page est ouverte et garde le même verrou BCP: `Community signal locked`, `Lock your forecast before the crowd can shape it`. Le formulaire public affiche les mêmes boutons de saisie `5 %`, `10 %`, `25 %`, `50 %`, `75 %`, `90 %`, `95 %`. Là aussi, ce sont des choix utilisateur, pas une probabilité collective.

Le scan visible et HTML ne trouve pas `aggregate_probability`, `forecasters_count`, `forecastCount`, `fcCount`, `settled_by`, `evidence_doc`, raw resolution JSON, `early consensus`, `community probability`, ni compteur exact de forecasters.

Côté contexte, les liens sont officiels et pertinents:

- `https://openai.com/news/`
- `https://help.openai.com/en/articles/6825453-chatgpt-release-notes`

Le texte visible dit `OpenAI news and research updates` et `OpenAI ChatGPT release notes`. La page indique `No live news feed is loaded here`. Je n'ai pas vu de source générique ou non officielle sur ce détail.

## Verdict

Gate vert pour ce passage 19h. Les surfaces publiques vérifiées ne montrent pas de consensus ouvert, pas de compteur exact de forecasters sur questions ouvertes, pas de champs internes BCP et pas de JSON brut de résolution. Les surfaces résolues affichent bien des éléments post-résolution, ce qui est attendu.

Les pages Jun 30 restent propres: FIFA pointe vers FIFA seulement, sans contexte générique, et OpenAI pointe vers des sources OpenAI officielles. Aucun AQ469 existant n'a été modifié.
