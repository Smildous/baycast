# AQ-523, gate live BCP et preuves Jun 30, 13h UTC

Run effectué le 2026-06-30T13:03:23Z sur le clone produit `/root/baycast-product`, après `git fetch origin`, `git checkout main`, puis `git pull --ff-only origin main`.

Forectasts lus: non. Je n'ai pas ouvert la table `forecasts` et je n'ai pas interrogé de lignes de forecast.

## Surfaces publiques vérifiées

Base publique: https://baycast-p.vercel.app

Commandes utilisées, sans accès base de données:

```bash
git fetch origin && git checkout main && git pull --ff-only origin main
python3 <script requests public HTML>
python3 <script official-source reachability>
date -u +'%Y-%m-%dT%H:%M:%SZ'
```

Pages contrôlées:

- `/`: 200, titre `Baycast - Predict Real Events`
- `/questions`: 200, titre `Browse Prediction Questions — Baycast`
- `/questions?sort=closing-soon`: 200, titre `Browse Prediction Questions — Baycast`
- `/questions?status=resolved`: 200, titre `Browse Prediction Questions — Baycast`
- `/leaderboard`: 200, titre `Forecaster Leaderboard — Baycast`
- `/activity`: 200, titre `Recent Forecasting Activity — Baycast`

Les deux questions Jun 30 ont été retrouvées depuis `/questions` et `closing-soon`:

- FIFA: https://baycast-p.vercel.app/questions/5745e845-94e9-4802-bbeb-850c982e1276
- OpenAI: https://baycast-p.vercel.app/questions/d3338e47-11ec-4568-942e-42bb19be0f5e

## BCP public

Termes cherchés dans le HTML public et dans le DOM navigateur: `aggregate_probability`, `forecasters_count`, `settled_by`, `evidence_doc`, `consensus`, plus des formulations de type nombre exact de forecasters, predictions ou votes.

Résultat:

- Pas de `aggregate_probability`.
- Pas de `forecasters_count`.
- Pas de `settled_by`.
- Pas de `evidence_doc`.
- `consensus` apparaît seulement sur la home, dans du texte marketing, pas comme champ BCP ou donnée de question.
- Aucun libellé public du type `N forecasters`, `N predictions` ou `N votes` trouvé sur les surfaces listées ni sur les deux pages candidates.

Les pages question affichent bien le mode verrouillé avant forecast: `Community signal locked` et `Lock your forecast before the crowd can shape it`. Le signal communautaire n'est pas exposé avant l'appel utilisateur.

## État des candidats Jun 30

FIFA, page question navigateur:

- Titre visible: `Will the 2026 FIFA World Cup opening match have at least three total goals?`
- État visible: `1d left`, `Jun 30, 2026`, `Closes`.
- Le DOM ne montre pas d'état `settled` ou `resolved`.
- Source de résolution affichée: `FIFA official match centre: https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026`.

OpenAI, page question navigateur:

- Titre visible: `Will OpenAI release a new public video generation model before July 1, 2026?`
- État visible: `1d left`, `Jun 30, 2026`, `Closes`.
- Le DOM ne montre pas d'état `settled` ou `resolved`.
- Source de résolution affichée: `OpenAI News and product release notes: https://openai.com/news/ and https://help.openai.com/en/articles/6825453-chatgpt-release-notes`.

Conclusion sur ce point: les deux candidats Jun 30 sont toujours ouverts côté public au moment du contrôle 13h UTC, avant la clôture canonique 2026-06-30T23:59:59Z.

## Préparation sources officielles

Contrôles HTTP directs avec user-agent navigateur:

- FIFA official tournament hub, `https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026`: 200, HTML reçu. Source officielle atteignable.
- OpenAI news, `https://openai.com/news/`: 403, HTML de blocage ou vérification reçu. La page officielle existe mais le fetch serveur est bloqué.
- OpenAI Help Center release notes, `https://help.openai.com/en/articles/6825453-chatgpt-release-notes`: 403, HTML de blocage ou vérification reçu. La page officielle existe mais le fetch serveur est bloqué.

## Verdict

Gate OK.

Les surfaces publiques répondent, les deux questions Jun 30 sont découvrables et non réglées publiquement, le BCP reste verrouillé avant forecast, aucun compte exact de forecasters n'est exposé, et les sources officielles sont identifiées. FIFA est accessible depuis ce run. OpenAI bloque le fetch serveur avec 403, donc il faudra vérifier via navigateur humain ou autre point de sortie au moment de la résolution si le blocage persiste.
