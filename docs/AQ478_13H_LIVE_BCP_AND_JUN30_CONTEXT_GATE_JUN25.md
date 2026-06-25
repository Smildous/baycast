# AQ-478, live BCP et contexte Jun 30, 25 juin 13h

Controle fait le 2026-06-25T13:02:39Z depuis `/root/baycast-product`, apres `git pull --ff-only origin main`.

Verdict: PASS. Je n'ai pas lu la table `forecasts` et je n'ai pas utilise de donnees Supabase privees. Le controle porte sur le public live de `https://baycast-p.vercel.app`, le HTML public, puis le DOM public charge par navigateur.

Les surfaces demandees repondent en 200:

| Route | Etat |
| --- | --- |
| `/` | 200, pas de fuite BCP trouvee |
| `/questions` | 200, affiche `Questions(42 open)`, pas de fuite BCP trouvee |
| `/questions?sort=closing-soon` | 200, les deux questions Jun 30 restent en tete, pas de fuite BCP trouvee |
| `/questions?status=resolved` | 200, pas de fuite BCP trouvee |
| `/leaderboard` | 200, leaderboard public sans donnees BCP ouvertes |
| `/activity` | 200, activite publique sans compte exact ni consensus ouvert |
| `/settlements/apple-mac-pro-wwdc-2026` | 200, note publique de settlement Apple propre |
| `/questions/5745e845-94e9-4802-bbeb-850c982e1276` | 200, question FIFA Jun 30 propre |
| `/questions/d3338e47-11ec-4568-942e-42bb19be0f5e` | 200, question OpenAI Jun 30 propre |

Les deux pages Jun 30 ont ete retrouvees depuis `/questions`, sans requete privee:

- FIFA: `Will the 2026 FIFA World Cup opening match have at least three total goals?`
- OpenAI: `Will OpenAI release a new public video generation model before July 1, 2026?`

J'ai cherche dans le HTML public et dans le DOM public les termes sensibles suivants: `aggregate_probability`, `forecasters_count`, `forecastCount`, `fcCount`, comptes visibles du type `12 forecasters`, `early consensus`, `settled_by`, `evidence_doc`, `resolution_json`, `resolutionJson`, `raw_resolution`, `rawResolution`, `resolution_payload`, `resolutionPayload`, `raw resolution`, `resolution JSON`.

Resultat: aucun hit sur les neuf routes controlees. Rien n'expose un consensus precoce, un nombre exact de forecasters, un champ de settlement interne, un document d'evidence interne ou un JSON brut de resolution.

Extrait du controle HTML public:

```text
BASE https://baycast-p.vercel.app
DISCOVERED ["/questions/5745e845-94e9-4802-bbeb-850c982e1276", "/questions/d3338e47-11ec-4568-942e-42bb19be0f5e"]
RESULTS
{"route": "/", "status": 200, "bytes": 57518, "hits": [], "forecaster_count_strings": [], "labels": ["FIFA opening match", "OpenAI video model"]}
{"route": "/questions", "status": 200, "bytes": 56678, "hits": [], "forecaster_count_strings": [], "labels": ["FIFA opening match", "OpenAI video model"]}
{"route": "/questions?sort=closing-soon", "status": 200, "bytes": 44797, "hits": [], "forecaster_count_strings": [], "labels": ["FIFA opening match", "OpenAI video model"]}
{"route": "/questions?status=resolved", "status": 200, "bytes": 37114, "hits": [], "forecaster_count_strings": [], "labels": []}
{"route": "/leaderboard", "status": 200, "bytes": 45275, "hits": [], "forecaster_count_strings": [], "labels": []}
{"route": "/activity", "status": 200, "bytes": 22674, "hits": [], "forecaster_count_strings": [], "labels": []}
{"route": "/settlements/apple-mac-pro-wwdc-2026", "status": 200, "bytes": 30531, "hits": [], "forecaster_count_strings": [], "labels": []}
{"route": "/questions/5745e845-94e9-4802-bbeb-850c982e1276", "status": 200, "bytes": 42284, "hits": [], "forecaster_count_strings": [], "labels": ["FIFA opening match"], "official_context_sources": ["https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026"]}
{"route": "/questions/d3338e47-11ec-4568-942e-42bb19be0f5e", "status": 200, "bytes": 43368, "hits": [], "forecaster_count_strings": [], "labels": ["OpenAI video model"], "official_context_sources": ["https://help.openai.com/en/articles/6825453-chatgpt-release-notes", "https://openai.com/news/"]}
```

Controle navigateur: `/questions` affiche bien `Questions(42 open)`, les cartes Jun 30, et la copie `Lock your call before the crowd can shape it`. Une passe `fetch` same-origin plus `DOMParser` sur les memes routes retourne `hits: []` et aucun compte `forecasters` numerique.

Contexte Jun 30: FIFA reste limite a la source officielle `https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026`. OpenAI reste limite aux sources officielles `https://openai.com/news/` et `https://help.openai.com/en/articles/6825453-chatgpt-release-notes`. Aucune source non officielle n'apparait comme contexte public sur ces deux pages.

Test repo utile:

```text
npm test -- __tests__/news-context.test.ts
✓ __tests__/news-context.test.ts (7 tests)
Test Files  1 passed
Tests  7 passed
```

Decision: gate AQ-478 valide. Les surfaces publiques restent propres pour BCP. Les pages Jun 30 restent des questions ouvertes avec contexte officiel seulement, pas des pages de resolution.
