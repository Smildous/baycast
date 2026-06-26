# AQ-490 19h live BCP and Jun 30 context gate, Jun 26

Contrôle fait le 2026-06-26 à 19:02 UTC depuis `/root/baycast-product`, après `git fetch origin main`, `git checkout main`, puis `git pull --ff-only origin main`. La copie locale était déjà alignée avec `origin/main` avant la vérification.

## Scope

J'ai vérifié les surfaces publiques Baycast qui peuvent exposer une question ouverte, une question résolue, un signal communautaire ou un lien de contexte Jun 30. Je n'ai pas ouvert Supabase et je n'ai pas lu la table `forecasts`.

Surfaces contrôlées sur `https://baycast-p.vercel.app`:

- `/`
- `/questions`
- `/questions?sort=closing-soon`
- `/questions?status=resolved`
- `/leaderboard`
- `/activity`
- `/questions/5745e845-94e9-4802-bbeb-850c982e1276`
- `/questions/d3338e47-11ec-4568-942e-42bb19be0f5e`

Les deux pages de détail ont été découvertes depuis les liens publics de la home et de `/questions`: FIFA World Cup opening match et OpenAI video generation.

## Commandes et URLs vérifiées

Commande de synchro:

```bash
git fetch origin main
git checkout main
git pull --ff-only origin main
git status --short
```

Fetch public HTML, scan texte et HTML sérialisé:

```bash
python3 - <<'PY'
import requests, re
from html.parser import HTMLParser
# fetch de /, /questions, /questions?sort=closing-soon,
# /questions?status=resolved, /leaderboard, /activity
# extraction des liens /questions/<id>
# scan: aggregate_probability, forecasters_count, settled_by,
# evidence_doc, raw JSON, consensus, gambling, betting, wager, odds, casino
PY
```

Fetch des deux pages de détail:

```bash
python3 - <<'PY'
import requests, re
from html.parser import HTMLParser
# fetch des deux questions Jun 30 découvertes publiquement
# extraction des liens de contexte et scan des mêmes termes sensibles
PY
```

Rendu navigateur vérifié aussi sur les deux détails Jun 30, avec lecture de `document.body.innerText`, des liens publics et de `document.documentElement.innerHTML` pour confirmer l'absence des champs sensibles côté page hydratée.

Liens officiels de contexte testés depuis le script:

```text
https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026
https://openai.com/news/
https://help.openai.com/en/articles/6825453-chatgpt-release-notes
```

Résultat réseau: FIFA répond 200. Les deux URLs OpenAI répondent 403 au fetch automatisé, probablement protection anti-bot, mais les liens publics Baycast restent strictement sur domaines officiels OpenAI et OpenAI Help.

## Résultat

Gate OK.

Aucune fuite visible ou sérialisée trouvée sur les surfaces ouvertes pour `aggregate_probability`, `forecasters_count`, `settled_by`, `evidence_doc`, `raw JSON`, compte exact de forecasters, signal communautaire avant forecast, ou copie gambling. Les mots `gambling`, `betting`, `wager`, `odds` et `casino` ne sont pas apparus dans les surfaces contrôlées.

Le mot `consensus` apparaît sur la home dans une phrase marketing de BCP: `You answer before seeing the crowd, so your forecast adds a real signal instead of copying consensus.` Ce n'est pas une valeur de consensus, pas un agrégat, pas un signal de question, et pas une exposition avant forecast.

## BCP findings

La BCP est en place sur les questions ouvertes. Les cartes publiques disent `Lock your call before the crowd can shape it`. Les détails des questions affichent `Community signal locked` et ne montrent pas de probabilité agrégée avant une action utilisateur. Les pages FIFA et OpenAI affichent le slider local par défaut et les boutons de saisie, mais pas de crowd signal lisible.

`/questions?status=resolved`, `/leaderboard` et `/activity` restent post-résolution dans leur logique publique. Je n'ai pas trouvé de signal communautaire ouvert réutilisable sur une question non résolue.

## Jun 30 settlement readiness

FIFA opening match:

Page publique: `https://baycast-p.vercel.app/questions/5745e845-94e9-4802-bbeb-850c982e1276`.

Le critère de résolution est lisible et borné: total de buts du match d'ouverture, temps réglementaire plus arrêts de jeu, tirs au but exclus, abandon non complété avant le 2026-06-30 résout No. Le lien de contexte public est officiel uniquement: FIFA World Cup 2026 sur `www.fifa.com`. La source de résolution affichée est la même source officielle FIFA.

OpenAI video generation:

Page publique: `https://baycast-p.vercel.app/questions/d3338e47-11ec-4568-942e-42bb19be0f5e`.

Le critère de résolution est lisible et borné: sortie publique d'un nouveau modèle vidéo ou d'une amélioration matérielle avant `2026-07-01 00:00 UTC`, avec exclusions explicites pour demo de recherche, waitlist-only preview, note safety, changement de prix ou mise à jour UI mineure. Les liens de contexte publics sont officiels uniquement: `openai.com/news/` et l'article officiel OpenAI Help Center des release notes ChatGPT. Le fetch automatisé reçoit 403 sur ces deux URLs, donc je marque seulement l'accès script comme bloqué, pas un échec de source. Les domaines et libellés visibles restent officiels.

## Forecasts read

No. Pas de lecture Supabase, pas de requête à la table `forecasts`, pas d'ouverture d'endpoint privé. Les contrôles sont limités aux pages publiques demandées et à leur HTML rendu ou sérialisé.
