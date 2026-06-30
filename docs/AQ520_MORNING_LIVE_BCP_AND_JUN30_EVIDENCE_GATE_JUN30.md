# AQ-520, gate live BCP et preuves Jun 30, matin Jun 30

Contrôle fait le 2026-06-30 à 07:03 UTC sur `baycast-p.vercel.app`. Je n'ai pas lu la table `forecasts`, je n'ai pas appelé d'endpoint de forecasts, et je n'ai pas modifié le code applicatif. Le contrôle porte sur les surfaces publiques, le HTML livré, le DOM visible, et les sources officielles nécessaires pour la veille après clôture.

## Sync repo

Commande demandée, exécutée avant le contrôle:

```bash
git fetch origin && git pull --ff-only origin main
```

Résultat:

```text
From https://github.com/Smildous/baycast
 * branch            main       -> FETCH_HEAD
Already up to date.
```

## Pages publiques contrôlées

J'ai contrôlé ces surfaces:

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

Les deux pages Jun 30 sont toujours découvrables depuis `/questions` dans le rendu public:

```text
Sports, 1d left, Will the 2026 FIFA World Cup opening match have at least three total goals?
/questions/5745e845-94e9-4802-bbeb-850c982e1276

Technology, 1d left, Will OpenAI release a new public video generation model before July 1, 2026?
/questions/d3338e47-11ec-4568-942e-42bb19be0f5e
```

Commande de contrôle HTTP, HTML et sources:

```bash
python3 - <<'PY'
import urllib.request, urllib.error, re, html
base='https://baycast-p.vercel.app'
urls=[
  base+'/',
  base+'/questions',
  base+'/questions?sort=closing-soon',
  base+'/questions?status=resolved',
  base+'/leaderboard',
  base+'/activity',
  base+'/questions/5745e845-94e9-4802-bbeb-850c982e1276',
  base+'/questions/d3338e47-11ec-4568-942e-42bb19be0f5e',
]
headers={'User-Agent':'Mozilla/5.0 AQ520 live BCP gate'}
def fetch(url):
    req=urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            return r.status, dict(r.headers), r.read().decode('utf-8','replace')
    except urllib.error.HTTPError as e:
        return e.code, dict(e.headers), e.read().decode('utf-8','replace')
needles=['aggregate_probability','forecasters_count','settled_by','evidence_doc']
for url in urls:
    status, headers, raw = fetch(url)
    text = re.sub(r'\s+', ' ', re.sub('<[^>]+>', ' ', html.unescape(raw))).strip()
    print(url, 'status', status, 'bytes', len(raw))
    print('risk', {k: raw.lower().count(k) for k in needles}, 'consensus_text', text.lower().count('consensus'), 'percents', re.findall(r'\b\d{1,3}\s?%', text)[:8])
for url in [
  'https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026',
  'https://openai.com/news/',
  'https://help.openai.com/en/articles/6825453-chatgpt-release-notes',
]:
    status, headers, raw = fetch(url)
    print(url, 'status', status, 'bytes', len(raw), 'server', headers.get('server') or headers.get('Server'))
PY
```

Résultat utile:

```text
/ status 200 bytes 57398
/questions status 200 bytes 56582
/questions?sort=closing-soon status 200 bytes 44713
/questions?status=resolved status 200 bytes 37120
/leaderboard status 200 bytes 45275
/activity status 200 bytes 22674
/questions/5745e845-94e9-4802-bbeb-850c982e1276 status 200 bytes 42260
/questions/d3338e47-11ec-4568-942e-42bb19be0f5e status 200 bytes 43344

aggregate_probability: 0 sur toutes les pages
forecasters_count: 0 sur toutes les pages
settled_by: 0 sur toutes les pages
evidence_doc: 0 sur toutes les pages

consensus_text:
/ = 2
/questions = 0
/questions?sort=closing-soon = 0
/questions?status=resolved = 0
/leaderboard = 0
/activity = 0
page FIFA = 0
page OpenAI = 0

FIFA source: https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026 status 200 bytes 4551
OpenAI news: https://openai.com/news/ status 403 bytes 9673 server cloudflare
OpenAI release notes: https://help.openai.com/en/articles/6825453-chatgpt-release-notes status 403 bytes 9850 server cloudflare
```

J'ai aussi ouvert les pages dans un navigateur et inspecté le DOM visible. `/questions` affiche `Questions(42 open)`, puis les cartes ouvertes avec catégorie, temps restant, titre, et `Lock your call before the crowd can shape it`. La page FIFA affiche `Community signal locked`, la date de clôture Jun 30 2026, la source de résolution FIFA, et le formulaire `Add your forecast`. La page OpenAI affiche le même verrou de signal communauté, les liens OpenAI officiels, et le formulaire de forecast. Les pourcentages visibles sur les pages détail sont les valeurs du slider utilisateur, pas un consensus public.

## Lecture BCP

Le gate BCP passe. Je n'ai trouvé ni `aggregate_probability`, ni `forecasters_count`, ni `settled_by`, ni `evidence_doc` dans le HTML public contrôlé. Je n'ai pas vu de pourcentage de consensus, de count de consensus, de nombre de forecasters par question ouverte, ni de probabilité agrégée sur les questions ouvertes.

Le mot `consensus` apparaît deux fois sur la home dans le texte produit Blind Consensus. Ce n'est pas une fuite: aucun chiffre, aucun count et aucune métadonnée de participation n'accompagne ce texte. Sur les listes de questions, les pages Jun 30, le leaderboard et l'activité, il n'apparaît pas dans le texte visible.

Le leaderboard expose ses colonnes publiques de score, mais je n'ai pas vu de distribution, de forecast, ou de participation par question ouverte. L'activité publique ne rattache rien aux questions Jun 30 ouvertes. Rien ne justifie une modification de code.

## Sources Jun 30

Question FIFA:

```text
Will the 2026 FIFA World Cup opening match have at least three total goals?
Context link visible: FIFA World Cup 2026
Resolution source visible: FIFA official match centre: https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026
Source officielle directe: HTTP 200 pendant ce contrôle
```

Question OpenAI:

```text
Will OpenAI release a new public video generation model before July 1, 2026?
Context links visibles: OpenAI news and research updates, OpenAI ChatGPT release notes
Resolution source visible: OpenAI News and product release notes: https://openai.com/news/ and https://help.openai.com/en/articles/6825453-chatgpt-release-notes
Accès direct automatisé: HTTP 403 Cloudflare sur les deux liens OpenAI pendant ce contrôle
```

Je note donc OpenAI comme prêt côté Baycast, avec liens officiels visibles, mais non lisible directement depuis cette session automatisée à cause de Cloudflare. Ce n'est pas un blocage BCP et ce n'est pas une preuve de résolution.

## Verdict

GO pour la veille de preuves après clôture seulement. Les surfaces publiques contrôlées sont propres pour Blind Consensus, et les deux questions Jun 30 exposent les sources attendues sans fuite de signal communauté.

NO settlement before close. Les questions sont encore ouvertes, affichées à 1 jour restant, avec clôture Jun 30 2026. Aucune résolution ne doit être posée avant la clôture et avant lecture des sources au moment approprié.
