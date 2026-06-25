# AQ-481, gate live BCP et contexte Jun 30, 25 juin 19h

Verdict: GO public BCP. Les surfaces live vues à 19:02 UTC ne publient pas de consensus, pas de volume de forecasters, pas de JSON brut de résolution, et les deux pages Jun 30 gardent des liens de contexte officiels seulement.

Je n'ai pas lu `forecasts`. Le contrôle est limité aux pages publiques de `https://baycast-p.vercel.app`, via HTTP public et DOM rendu dans le navigateur.

## Surfaces vérifiées

`/` répond 200. La home affiche `42 Questions live now`, `Blind-first`, `Prediction polling` et cinq cartes live. Les cartes visibles sont FIFA, OpenAI, CPI, ECB et S&P 500. La copie reste blind-first avec `Lock your call before the crowd can shape it`.

`/questions` répond 200. La page affiche les filtres, `Closing Soon`, les questions ouvertes et les cartes FIFA et OpenAI en haut de liste. Aucun signal communautaire chiffré n'est exposé avant forecast.

`/questions?sort=closing-soon` répond 200. L'ordre commence par FIFA puis OpenAI, avec fermeture à 6 jours. Même constat BCP: les cartes montrent catégorie, temps restant, titre et appel à forecast, pas de consensus.

`/questions?status=resolved` répond 200. La page resolved montre Apple Mac Pro et Atlantic hurricane season comme questions résolues. Elle affiche `Resolved. Scores now count against the final outcome`, sans métadonnées internes de settlement.

`/leaderboard` répond 200. La table publique reste centrée sur ranking, Brier, log score, predictions et resolved. Pas de fuite BCP liée aux questions ouvertes.

`/activity` répond 200. La page charge la surface d'activité publique sans publier de termes interdits dans le HTML ni le DOM inspecté.

`/settlements/apple-mac-pro-wwdc-2026` répond 200. La note publique indique `Apple Mac Pro at WWDC 2026 resolved No` et cite la vérification de sources Apple publiques. Pas de champ interne `settled_by`, pas de `evidence_doc`, pas de JSON brut.

## Pages Jun 30

Les deux pages attendues sont toujours découvrables depuis les docs précédents et visibles dans les cartes publiques:

`/questions/5745e845-94e9-4802-bbeb-850c982e1276` répond 200 pour `Will the 2026 FIFA World Cup opening match have at least three total goals?`. La page affiche `Community signal locked`, `Jun 30, 2026 Closes` et une seule source externe de résolution côté contexte: `https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026`. C'est officiel FIFA, rien d'autre.

`/questions/d3338e47-11ec-4568-942e-42bb19be0f5e` répond 200 pour `Will OpenAI release a new public video generation model before July 1, 2026?`. La page affiche `Community signal locked`, `Jun 30, 2026 Closes` et seulement les sources OpenAI officielles: `https://openai.com/news/` et `https://help.openai.com/en/articles/6825453-chatgpt-release-notes`.

Les pourcentages visibles sur les pages détail sont les presets du contrôle utilisateur non connecté, pas un consensus public.

## Scan anti-fuite

Contrôle effectué sur le HTML public et le DOM navigateur des routes listées ci-dessus. Hits trouvés: zéro pour `aggregate_probability`, `forecasters_count`, `forecastCount`, `fcCount`, copie exacte de count forecaster du type `N forecasters`, `early consensus`, `settled_by`, `evidence_doc`, `raw resolution JSON`.

Aucun élément ne contredit la règle produit: Baycast reste une prediction polling app, pas gambling, et le BCP ne donne pas le consensus ni la participation avant forecast.

## Commandes exécutées

- `git status --short && git fetch origin main && git pull --ff-only origin main`
- `python3 /tmp/aq481_check.py`
- contrôle navigateur sur `https://baycast-p.vercel.app/` avec iframes same-origin pour les neuf routes
- `date -u +'%Y-%m-%d %H:%M:%S UTC' && git rev-parse --short HEAD`

Décision finale: GO. Continuer à garder le gate Jun 30 en lecture publique seulement jusqu'à preuve finale de settlement.
