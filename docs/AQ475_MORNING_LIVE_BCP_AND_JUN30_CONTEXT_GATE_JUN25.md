# AQ-475, morning live BCP et contexte Jun 30, 25 juin

Controle fait le 2026-06-25T07:02:43Z depuis `/root/baycast-product`, apres `git fetch origin && git pull --ff-only origin main`.

Verdict: PASS. Je n'ai pas lu la table `forecasts`. Les controles viennent du HTML public live sur `https://baycast-p.vercel.app` et du DOM public charge par navigateur. Aucun correctif app n'est necessaire.

## Ce qui a ete verifie

Les routes demandees repondent en 200 et ne publient pas de consensus ouvert ni de participation exacte:

| Route | Resultat |
| --- | --- |
| `/` | 200, aucun terme sensible trouve |
| `/questions` | 200, 42 questions ouvertes visibles, aucun terme sensible trouve |
| `/questions?status=resolved` | 200, aucun terme sensible trouve |
| `/leaderboard` | 200, leaderboard public sans fuite BCP ouverte |
| `/activity` | 200, aucun terme sensible trouve |
| `/settlements/apple-mac-pro-wwdc-2026` | 200, note publique de settlement sans JSON brut ni champs internes |
| `/questions/5745e845-94e9-4802-bbeb-850c982e1276` | 200, question FIFA Jun 30, aucun terme sensible trouve |
| `/questions/d3338e47-11ec-4568-942e-42bb19be0f5e` | 200, question OpenAI Jun 30, aucun terme sensible trouve |

Les deux pages Jun 30 ont ete decouvertes depuis `/questions`, sans requete privee et sans table `forecasts`:

- FIFA: `/questions/5745e845-94e9-4802-bbeb-850c982e1276`, `Will the 2026 FIFA World Cup opening match have at least three total goals?`
- OpenAI: `/questions/d3338e47-11ec-4568-942e-42bb19be0f5e`, `Will OpenAI release a new public video generation model before July 1, 2026?`

Termes cherches dans le HTML public et dans le DOM public charge par navigateur:

- `aggregate_probability`
- `forecasters_count`
- `forecastCount`
- `fcCount`
- copie de type `12 forecasters`
- `early consensus`
- `settled_by`
- `evidence_doc`
- cles de JSON brut de resolution: `resolution_json`, `resolutionJson`, `raw_resolution`, `rawResolution`, `resolution_payload`, `resolutionPayload`

Resultat: aucun hit sur les huit routes.

## Extrait du controle HTML public

Commande executee avec `urllib`, user agent `AQ475-public-html-gate/1.0`, accept `text/html,application/xhtml+xml`:

```text
BASE https://baycast-p.vercel.app
ROUTES
/
/questions
/questions?status=resolved
/leaderboard
/activity
/settlements/apple-mac-pro-wwdc-2026
/questions/5745e845-94e9-4802-bbeb-850c982e1276
/questions/d3338e47-11ec-4568-942e-42bb19be0f5e
RESULTS
{"route": "/", "status": 200, "bytes": 57518, "hits": [], "labels": ["FIFA opening match", "OpenAI video model"], "sources": []}
{"route": "/questions", "status": 200, "bytes": 56678, "hits": [], "labels": ["FIFA opening match", "OpenAI video model"], "sources": []}
{"route": "/questions?status=resolved", "status": 200, "bytes": 37114, "hits": [], "labels": [], "sources": []}
{"route": "/leaderboard", "status": 200, "bytes": 45275, "hits": [], "labels": [], "sources": []}
{"route": "/activity", "status": 200, "bytes": 22674, "hits": [], "labels": [], "sources": []}
{"route": "/settlements/apple-mac-pro-wwdc-2026", "status": 200, "bytes": 30531, "hits": [], "labels": [], "sources": []}
{"route": "/questions/5745e845-94e9-4802-bbeb-850c982e1276", "status": 200, "bytes": 46381, "hits": [], "labels": ["FIFA opening match"], "sources": ["https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026"]}
{"route": "/questions/d3338e47-11ec-4568-942e-42bb19be0f5e", "status": 200, "bytes": 43368, "hits": [], "labels": ["OpenAI video model"], "sources": ["https://openai.com/news/", "https://help.openai.com/en/articles/6825453-chatgpt-release-notes"]}
```

## DOM public navigateur

Le navigateur a charge `/questions` et confirme l'etat public attendu: `Questions(42 open)`, les cartes Jun 30 en tete, et la copie `Lock your call before the crowd can shape it`. Ensuite, une verification DOM par `fetch` same-origin et `DOMParser` a relu les huit routes ci-dessus. Resultat: `hits: []` partout pour les memes termes sensibles.

## Contexte Jun 30

FIFA reste official-only. La page publique Baycast de la question contient uniquement la source officielle:

`https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026`

OpenAI reste borne a des liens officiels OpenAI. La page publique Baycast de la question contient:

`https://openai.com/news/`

`https://help.openai.com/en/articles/6825453-chatgpt-release-notes`

Ces deux questions restent des gates de contexte, pas des settlements. Rien dans ce run ne justifie une resolution Jun 30.

## Test repo utile

Le test de contexte public passe:

```text
npm test -- __tests__/news-context.test.ts
✓ __tests__/news-context.test.ts (7 tests)
Test Files  1 passed (1)
Tests  7 passed (7)
```

J'ai d'abord lance une variante Jest `--runTestsByPath`, rejetee par Vitest comme option inconnue. Elle n'a rien modifie. La commande Vitest correcte ci-dessus passe.

## Decision

PASS pour AQ-475. Pas de fuite observee sur les surfaces publiques controlees. Pas de lecture de `forecasts`. Pas de changement applicatif.
