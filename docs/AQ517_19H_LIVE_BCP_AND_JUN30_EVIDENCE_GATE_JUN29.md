# AQ-517, gate live BCP et preuves Jun 30, Jun 29 19h

Contrôle fait le 2026-06-29 à 19:02 UTC sur `baycast-p.vercel.app`, sans lire de prévisions et sans appeler d'endpoint de forecasts. Le but était simple: vérifier que les surfaces publiques gardent Blind Consensus propre, et que les deux questions Jun 30 montrent des sources officielles utilisables pour la résolution.

## Commandes et pages contrôlées

Mise à jour repo avant travail:

```bash
git -C /root/baycast-product fetch origin main
git -C /root/baycast-product checkout main
git -C /root/baycast-product pull --ff-only origin main
```

Pages publiques ouvertes ou récupérées:

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

Les deux pages détail ont été découvertes depuis `/questions` dans le rendu public:

```text
Sports, 2d left, Will the 2026 FIFA World Cup opening match have at least three total goals?
/questions/5745e845-94e9-4802-bbeb-850c982e1276

Technology, 2d left, Will OpenAI release a new public video generation model before July 1, 2026?
/questions/d3338e47-11ec-4568-942e-42bb19be0f5e
```

Contrôle HTML public, avec recherche directe des champs et termes à risque:

```bash
python3 - <<'PY'
import urllib.request, re, html
urls = [
  'https://baycast-p.vercel.app/',
  'https://baycast-p.vercel.app/questions',
  'https://baycast-p.vercel.app/questions?sort=closing-soon',
  'https://baycast-p.vercel.app/questions?status=resolved',
  'https://baycast-p.vercel.app/leaderboard',
  'https://baycast-p.vercel.app/activity',
  'https://baycast-p.vercel.app/questions/5745e845-94e9-4802-bbeb-850c982e1276',
  'https://baycast-p.vercel.app/questions/d3338e47-11ec-4568-942e-42bb19be0f5e',
]
for u in urls:
    raw = urllib.request.urlopen(u, timeout=25).read().decode('utf-8', 'replace')
    text = re.sub(r'\s+', ' ', re.sub('<[^>]+>', ' ', html.unescape(raw))).strip()
    print(u, len(raw), {k: raw.lower().count(k) for k in [
        'aggregate_probability', 'forecasters_count', 'settled_by', 'evidence_doc'
    ]}, 'consensus_text=', text.lower().count('consensus'))
PY
```

## Résultats BCP

Les huit surfaces répondent en HTTP 200. Aucun des champs internes suivants n'est présent dans le HTML public contrôlé:

```text
aggregate_probability: 0 partout
forecasters_count: 0 partout
settled_by: 0 partout
evidence_doc: 0 partout
```

Je n'ai pas vu de probabilité agrégée publiée sur les questions ouvertes. Les cartes questions affichent la catégorie, le temps restant, le titre et le texte de garde `Lock your call before the crowd can shape it`. Les pages détail Jun 30 affichent `Community signal locked` et le bloc de saisie de forecast, mais pas de chiffre de communauté, pas de total de participants, pas de count de forecasters, pas de consensus chiffré.

Le mot `consensus` apparaît sur la home dans le texte marketing Blind Consensus. Je ne le classe pas comme fuite: il ne contient ni valeur, ni count, ni métadonnée de participation. Sur les pages questions, closing soon, resolved, leaderboard, activity et les deux détails Jun 30, la recherche texte n'a pas trouvé de consensus publié.

Le leaderboard est public par nature et affiche ses colonnes de score, dont `Forecaster`, `Brier`, `Log Score`, `Predictions`, `Resolved`. Je n'ai pas vu de rattachement à une question ouverte Jun 30, ni de distribution, ni de participation par question ouverte. L'activité publique annonce que l'activité apparaît après résolution. Cela reste compatible avec Blind Consensus pour les questions ouvertes.

## Preuves et sources Jun 30 visibles publiquement

Question FIFA:

```text
Will the 2026 FIFA World Cup opening match have at least three total goals?
Context link: FIFA World Cup 2026
Resolution source: FIFA official match centre: https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026
```

La source FIFA est présente sur la page détail publique et le lien officiel a répondu HTTP 200 depuis le contrôle scripté.

Question OpenAI:

```text
Will OpenAI release a new public video generation model before July 1, 2026?
Context links: OpenAI news and research updates, OpenAI ChatGPT release notes
Resolution source: OpenAI News and product release notes: https://openai.com/news/ and https://help.openai.com/en/articles/6825453-chatgpt-release-notes
```

Les deux sources OpenAI sont visibles sur la page détail publique. Le contrôle automatisé externe a atteint une page Cloudflare `Just a moment` avec HTTP 403 côté script et navigateur, donc je ne marque pas ces sources comme lues. Je marque seulement que Baycast expose les bons liens officiels publics pour la résolution. Ce contrôle respecte la contrainte: pas de lecture de forecasts.

## Verdict

Gate BCP: passe. Les surfaces publiques contrôlées ne publient pas les champs internes demandés, ne montrent pas de probabilité agrégée et ne montrent pas de participation par question ouverte. Les deux questions Jun 30 sont découvrables depuis `/questions` et leurs pages détail gardent le signal communauté verrouillé.

Gate sources Jun 30: passe pour la présence des sources officielles dans Baycast. FIFA est aussi accessible en HTTP 200 depuis le contrôle. OpenAI est présent dans Baycast mais bloqué par Cloudflare pour cette session automatisée, sans impact observé sur le BCP.
