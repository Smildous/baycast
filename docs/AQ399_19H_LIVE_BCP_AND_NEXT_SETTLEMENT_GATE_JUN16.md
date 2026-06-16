# AQ399 19h live BCP and next settlement gate, Jun 16

Run fait le 2026-06-16T19:07:03Z depuis `/root/baycast-product`, sur `main` après synchronisation avec `origin/main`.

Verdict: GO.

La prod répond, les surfaces publiques contrôlées ne sortent pas les champs ou copies qui casseraient le Blind Consensus, et les deux prochains sujets à surveiller restent ouverts jusqu'au 2026-06-30. Je n'ai pas lu la table des forecasts et je n'ai lancé aucune action de settlement.

## Synchronisation repo

Commande lancée:

```bash
git fetch origin main && git merge --ff-only origin/main
```

Sortie utile:

```text
From https://github.com/Smildous/baycast
 * branch            main       -> FETCH_HEAD
Already up to date.
```

Commit de départ vérifié:

```bash
git status --short && git rev-parse HEAD && git remote -v
```

Sortie utile:

```text
6fa5c37a3f7fa81879e428e5a3d39f9262600283
origin  https://github.com/Smildous/baycast.git (fetch)
origin  https://github.com/Smildous/baycast.git (push)
```

## Contrôle HTTP prod

Base contrôlée: `https://baycast-p.vercel.app`.

Commande lancée:

```bash
python3 - <<'PY'
import requests,re
base='https://baycast-p.vercel.app'
paths=['/','/questions','/questions?status=resolved','/leaderboard','/activity','/settlements/apple-mac-pro-wwdc-2026']
terms=['aggregate_probability','forecasters_count','forecastCount','fcCount','settled_by','evidence_doc','Community consensus','community consensus']
for p in paths:
    r=requests.get(base+p,headers={'User-Agent':'baycast-aq399-gate/1.0'},timeout=20)
    print(p, r.status_code, r.headers.get('content-type',''), len(r.text), r.url)
    found=[t for t in terms if t in r.text]
    print('  forbidden_terms:', found or 'none')
PY
```

Résultat:

```text
/ 200 text/html; charset=utf-8 57400 https://baycast-p.vercel.app/
  forbidden_terms: none
/questions 200 text/html; charset=utf-8 50290 https://baycast-p.vercel.app/questions
  forbidden_terms: none
/questions?status=resolved 200 text/html; charset=utf-8 35541 https://baycast-p.vercel.app/questions?status=resolved
  forbidden_terms: none
/leaderboard 200 text/html; charset=utf-8 45275 https://baycast-p.vercel.app/leaderboard
  forbidden_terms: none
/activity 200 text/html; charset=utf-8 22674 https://baycast-p.vercel.app/activity
  forbidden_terms: none
/settlements/apple-mac-pro-wwdc-2026 200 text/html; charset=utf-8 30531 https://baycast-p.vercel.app/settlements/apple-mac-pro-wwdc-2026
  forbidden_terms: none
```

J'ai aussi relancé le vérificateur repo existant:

```bash
npm run verify:public-bcp
```

Sortie:

```text
Verifying public BCP surfaces at https://baycast-p.vercel.app
ok /
ok /questions
ok /questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248
ok /leaderboard
ok /activity
Public BCP surface verification passed.
```

Le script `npm run verify:next-settlement-watch` n'a pas pu utiliser Supabase dans cet environnement, faute de variables `SUPABASE_URL/NEXT_PUBLIC_SUPABASE_URL` ou `SUPABASE_ANON_KEY/NEXT_PUBLIC_SUPABASE_ANON_KEY`. Je ne le compte donc pas comme preuve métier. J'ai fait le contrôle suivant sur les données publiques rendues par l'app.

## Détail FIFA et OpenAI découverts dans l'app

Depuis `/questions`, les deux URLs de détail visibles sont:

```text
/questions/5745e845-94e9-4802-bbeb-850c982e1276
/questions/d3338e47-11ec-4568-942e-42bb19be0f5e
```

Extrait de la réponse publique `/questions`:

```text
{"id":"5745e845-94e9-4802-bbeb-850c982e1276","title":"Will the 2026 FIFA World Cup opening match have at least three total goals?","category":"sports","closes_at":"2026-06-30T23:59:59+00:00","status":"open"}
{"id":"d3338e47-11ec-4568-942e-42bb19be0f5e","title":"Will OpenAI release a new public video generation model before July 1, 2026?","category":"tech","closes_at":"2026-06-30T23:59:59+00:00","status":"open"}
```

Commande lancée pour les surfaces ouvertes et les deux détails:

```bash
python3 - <<'PY'
import requests,re,json,html
base='https://baycast-p.vercel.app'
routes=['/','/questions','/questions?status=resolved','/leaderboard','/activity','/settlements/apple-mac-pro-wwdc-2026','/questions/5745e845-94e9-4802-bbeb-850c982e1276','/questions/d3338e47-11ec-4568-942e-42bb19be0f5e']
checks={
'aggregate_probability':re.compile(r'aggregate_probability',re.I),
'forecasters_count':re.compile(r'forecasters_count',re.I),
'exact forecast count fields':re.compile(r'forecast(?:s|ers)?[_-]?(?:count|total)|fcCount',re.I),
'exact forecaster count copy':re.compile(r'\b\d{1,3}(?:,\d{3})*\s+(?:forecasters|forecasts|predictions)\b',re.I),
'consensus probability':re.compile(r'\b(?:consensus|aggregate|community consensus)\b.{0,80}\b\d{1,3}(?:\.\d+)?\s?%|\b\d{1,3}(?:\.\d+)?\s?%.{0,80}\b(?:consensus|aggregate|community consensus)\b',re.I|re.S),
'settled_by':re.compile(r'settled_by',re.I),
'evidence_doc':re.compile(r'evidence_doc',re.I),
}
for route in routes:
    r=requests.get(base+route,headers={'User-Agent':'baycast-aq399-gate/1.0'},timeout=25)
    print(f'URL {route} STATUS {r.status_code} TYPE {r.headers.get("content-type","")} BYTES {len(r.content)}')
    bad=[]
    for name,pat in checks.items():
        ms=list(pat.finditer(r.text))
        if ms: bad.append((name,len(ms)))
    print('  BCP_FORBIDDEN', bad or 'none')
PY
```

Résultat utile:

```text
URL / STATUS 200 TYPE text/html; charset=utf-8 BYTES 57454
  BCP_FORBIDDEN none
URL /questions STATUS 200 TYPE text/html; charset=utf-8 BYTES 50318
  BCP_FORBIDDEN none
URL /questions?status=resolved STATUS 200 TYPE text/html; charset=utf-8 BYTES 35561
  BCP_FORBIDDEN none
URL /leaderboard STATUS 200 TYPE text/html; charset=utf-8 BYTES 45305
  BCP_FORBIDDEN none
URL /activity STATUS 200 TYPE text/html; charset=utf-8 BYTES 22694
  BCP_FORBIDDEN none
URL /settlements/apple-mac-pro-wwdc-2026 STATUS 200 TYPE text/html; charset=utf-8 BYTES 30551
  BCP_FORBIDDEN none
URL /questions/5745e845-94e9-4802-bbeb-850c982e1276 STATUS 200 TYPE text/html; charset=utf-8 BYTES 44314
  BCP_FORBIDDEN none
URL /questions/d3338e47-11ec-4568-942e-42bb19be0f5e STATUS 200 TYPE text/html; charset=utf-8 BYTES 48364
  BCP_FORBIDDEN none
```

## Vérification navigateur

Snapshot navigateur sur `/questions`:

```text
Questions(43 open)
Sports 15d left Will the 2026 FIFA World Cup opening match have at least three total goals? Lock your call before the crowd can shape it
Technology 15d left Will OpenAI release a new public video generation model before July 1, 2026? Lock your call before the crowd can shape it
```

Snapshot navigateur sur le détail FIFA:

```text
Will the 2026 FIFA World Cup opening match have at least three total goals?
Lock your forecast before the crowd can shape it
Community signal locked
Jun 30, 2026
Closes
Resolution source: FIFA official match centre: https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026
Add your forecast
```

Snapshot navigateur sur le détail OpenAI:

```text
Will OpenAI release a new public video generation model before July 1, 2026?
Lock your forecast before the crowd can shape it
Community signal locked
Jun 30, 2026
Closes
Resolution source: OpenAI News and product release notes: https://openai.com/news/ and https://help.openai.com/en/articles/6825453-chatgpt-release-notes
Add your forecast
```

Lecture produit: FIFA et OpenAI sont toujours ouverts, fermeture affichée au 2026-06-30. Le signal communauté est verrouillé et aucune probabilité de consensus n'est affichée.

## BCP safety

Sur les routes publiques ouvertes contrôlées, je n'ai pas trouvé:

- `aggregate_probability`
- `forecasters_count`
- champ de count exact de forecasts ou forecasters
- copie de count exact de forecasts, forecasters ou predictions
- probabilité de consensus
- `settled_by`
- `evidence_doc`

Les détails FIFA et OpenAI montrent un slider et les boutons de saisie de l'utilisateur, mais pas de résultat collectif ni de count exact. C'est conforme au Blind Consensus pour des questions encore ouvertes.

## Décision

GO pour le gate 19h.

La prod est accessible sur toutes les routes demandées. La note Apple Mac Pro répond en 200. Les surfaces ouvertes ne divulguent pas les champs ou valeurs BCP sensibles. FIFA et OpenAI restent ouverts avec fermeture au 2026-06-30. Rien ne justifie un settlement ou une lecture de forecasts maintenant.
