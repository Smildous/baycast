# AQ-493 morning live BCP and Jun 30 context gate, Jun 27

Contrôle fait le 2026-06-27 à 07:03 UTC depuis `/root/baycast-product`. J'ai d'abord synchronisé la copie locale avec `origin/main`. HEAD avant rédaction: `ef7fb0f45b61c5ed899e9de4b4e9be48bb7fe84d`.

## Scope

J'ai vérifié les surfaces publiques de `https://baycast-p.vercel.app` qui peuvent montrer des questions ouvertes, des questions résolues, de l'activité, le leaderboard ou les deux questions Jun 30. Je n'ai pas ouvert Supabase, je n'ai pas lu la table `forecasts`, et je n'ai pas utilisé d'endpoint privé.

URLs contrôlées:

```text
https://baycast-p.vercel.app/
https://baycast-p.vercel.app/questions
https://baycast-p.vercel.app/questions?sort=closing-soon
https://baycast-p.vercel.app/questions?status=resolved
https://baycast-p.vercel.app/leaderboard
https://baycast-p.vercel.app/activity
https://baycast-p.vercel.app/questions/5745e845-94e9-4802-bbeb-850c982e1276
https://baycast-p.vercel.app/questions/d3338e47-11ec-4568-942e-42bb19be0f5e
```

Les deux pages de détail Jun 30 ont été reprises depuis les liens publics visibles sur la home et `/questions`: FIFA World Cup opening match et OpenAI video generation.

## Commandes lancées

Synchronisation:

```bash
git fetch origin main
git pull --rebase origin main
git status --short
git rev-parse HEAD
```

Fetch public HTML et scan de termes sensibles:

```bash
python3 - <<'PY'
import requests,re,html
from html.parser import HTMLParser
base='https://baycast-p.vercel.app'
paths=['/','/questions','/questions?sort=closing-soon','/questions?status=resolved','/leaderboard','/activity','/questions/5745e845-94e9-4802-bbeb-850c982e1276','/questions/d3338e47-11ec-4568-942e-42bb19be0f5e']
terms=['aggregate_probability','forecasters_count','settled_by','evidence_doc','raw JSON','raw json','consensus','forecasters','gambling','betting','wager','odds','casino']
# requests.get sur chaque URL, status/bytes/title, scan HTML complet,
# extraction des tokens pourcent visibles, des comptes forecasters/predictions/forecasts,
# et des liens externes sur les deux détails Jun 30.
PY
```

Rendu navigateur:

```js
// Sur home, /questions, /activity, /leaderboard et les deux détails Jun 30:
const html = document.documentElement.outerHTML
const text = document.body.innerText
const links = [...document.links].map(a => ({ text: a.innerText, href: a.href }))
// Scan: aggregate_probability, forecasters_count, settled_by, evidence_doc,
// raw JSON/raw json, consensus, forecasters, gambling, betting, wager, odds, casino.
```

## Résultat court

Gate OK.

Aucune fuite BCP exploitable trouvée sur les questions ouvertes. Les pages ouvertes montrent le verrou attendu: `Lock your call before the crowd can shape it` sur les cartes et `Community signal locked` sur les détails. Aucun agrégat de foule, aucun pourcentage de consensus, aucun compte exact de forecasters par question ouverte, et aucun champ interne sensible n'est visible dans le HTML public ou le DOM rendu.

## Détails BCP

Termes cherchés dans le HTML public et le DOM rendu: `aggregate_probability`, `forecasters_count`, `settled_by`, `evidence_doc`, `raw JSON`, `raw json`, `consensus`, `forecasters`, `gambling`, `betting`, `wager`, `odds`, `casino`.

Résultat par surface:

```text
/                                      200, aucun champ interne. `consensus` apparaît seulement dans la copie marketing BCP.
/questions                              200, aucun champ interne, aucun pourcentage visible sur les cartes ouvertes.
/questions?sort=closing-soon            200, aucun champ interne, aucun pourcentage visible sur les cartes ouvertes.
/questions?status=resolved              200, deux questions résolues, pas de signal ouvert exposé.
/leaderboard                            200, score public par utilisateur. `Forecaster` est un libellé de table, pas un compte de question ouverte.
/activity                               200, une activité publique résolue/ancienne avec `50%` sur Mac Pro WWDC 2026. Pas un consensus d'une question ouverte.
/questions/5745e845-94e9-4802-bbeb-850c982e1276  200, BCP verrouillée, pas de champ interne.
/questions/d3338e47-11ec-4568-942e-42bb19be0f5e  200, BCP verrouillée, pas de champ interne.
```

La home contient la phrase `You answer before seeing the crowd, so your forecast adds a real signal instead of copying consensus.` C'est du texte produit, pas une probabilité, pas un agrégat et pas un signal communautaire lié à une question.

Les pourcentages visibles sur les deux détails Jun 30 sont les boutons locaux du formulaire de forecast: `5%`, `10%`, `25%`, `50%`, `75%`, `90%`, `95%`, plus la valeur par défaut du slider. Ils ne sont pas présentés comme consensus et ne dépendent pas de la foule.

Le HTML Next contient les scripts de bootstrapping habituels, mais le scan n'a pas trouvé de payload brut exposant `aggregate_probability`, `forecasters_count`, `settled_by`, `evidence_doc`, des comptes exacts de forecasters ou un consensus d'une question ouverte.

## Jun 30 context links

FIFA opening match:

```text
Question: https://baycast-p.vercel.app/questions/5745e845-94e9-4802-bbeb-850c982e1276
Lien contexte visible: https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026
Source de résolution visible: FIFA official match centre: https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026
```

Le lien contexte reste officiel-only sur `www.fifa.com`. Le critère visible est borné: total de buts du match d'ouverture, temps réglementaire plus arrêts de jeu, tirs au but exclus, own goals inclus, abandon non complété avant le 2026-06-30 résout No.

OpenAI video model:

```text
Question: https://baycast-p.vercel.app/questions/d3338e47-11ec-4568-942e-42bb19be0f5e
Liens contexte visibles:
https://openai.com/news/
https://help.openai.com/en/articles/6825453-chatgpt-release-notes
Source de résolution visible: OpenAI News and product release notes: https://openai.com/news/ and https://help.openai.com/en/articles/6825453-chatgpt-release-notes
```

Les liens contexte restent official-only sur `openai.com` et `help.openai.com`. Le critère visible est borné: release publique d'un nouveau modèle vidéo ou upgrade matériel pour ChatGPT, API ou autre tier public payant avant `2026-07-01 00:00 UTC`. Les démos recherche, waitlist-only previews, notes safety, changements de prix et petites mises à jour UI sont exclus.

## Forecasts read

No. Le contrôle est limité aux pages publiques demandées et à leur HTML/DOM. Pas de lecture de forecast rows, pas de requête Supabase, pas de scraping d'API privée.

## Verdict

AQ-493 passe. BCP reste intacte sur les questions ouvertes et les deux surfaces Jun 30 gardent des liens de contexte officiels uniquement.
