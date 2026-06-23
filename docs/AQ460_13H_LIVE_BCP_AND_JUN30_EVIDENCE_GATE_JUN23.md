# AQ-460, gate live BCP et preuves Jun 30, 23 juin 13h UTC

Passage fait dans `/root/baycast-product`, après `git pull --ff-only origin main`. Je n'ai pas lu la table `forecasts`. Les IDs Jun 30 viennent de `/questions` public, puis les détails ont été ouverts côté public.

Verdict: GO pour les surfaces BCP publiques. NO-GO pour tout send ou settlement Jun 30 sans preuve publique fraîche, datée, archivable et relue juste avant l'action.

## Commandes lancées

```bash
git -C /root/baycast-product status --short
git -C /root/baycast-product rev-parse --abbrev-ref HEAD
git -C /root/baycast-product pull --ff-only origin main
```

Résultat utile: branche `main`, `Already up to date`.

```bash
python3 - <<'PY'
import requests,re,html
base='https://baycast-p.vercel.app'
routes=['/','/questions','/questions?status=resolved','/leaderboard','/activity','/settlements/apple-mac-pro-wwdc-2026','/questions/5745e845-94e9-4802-bbeb-850c982e1276','/questions/d3338e47-11ec-4568-942e-42bb19be0f5e']
needles=['aggregate_probability','forecasters_count','forecastCount','fcCount','settled_by','evidence_doc','raw resolution JSON','raw JSON','early consensus']
for route in routes:
    r=requests.get(base+route,timeout=20,headers={'User-Agent':'Mozilla/5.0 AQ460 gate'})
    text=re.sub(r'<[^>]+>',' ',r.text)
    text=html.unescape(re.sub(r'\s+',' ',text)).strip()
    regex_hits=re.findall(r'\b\d+\s+(?:forecasters?|forecasts?|predictions?)\b',text,re.I)
    pct_consensus=re.findall(r'\b\d{1,3}%\s+(?:consensus|probability|chance)\b',text,re.I)
    hits=[n for n in needles if n.lower() in r.text.lower()]
    print(f'{route} status={r.status_code} bytes={len(r.text)} hits={hits} count_copy={regex_hits[:5]} pct_consensus={pct_consensus[:5]}')
PY
```

Résultat:

```text
/ status=200 bytes=57428 hits=[] count_copy=[] pct_consensus=[]
/questions status=200 bytes=56607 hits=[] count_copy=[] pct_consensus=[]
/questions?status=resolved status=200 bytes=37114 hits=[] count_copy=[] pct_consensus=[]
/leaderboard status=200 bytes=45275 hits=[] count_copy=[] pct_consensus=[]
/activity status=200 bytes=22674 hits=[] count_copy=[] pct_consensus=[]
/settlements/apple-mac-pro-wwdc-2026 status=200 bytes=30531 hits=[] count_copy=[] pct_consensus=[]
/questions/5745e845-94e9-4802-bbeb-850c982e1276 status=200 bytes=48385 hits=[] count_copy=[] pct_consensus=[]
/questions/d3338e47-11ec-4568-942e-42bb19be0f5e status=200 bytes=44241 hits=[] count_copy=[] pct_consensus=[]
```

```bash
npm run verify:public-bcp
```

Résultat:

```text
Verifying public BCP surfaces at https://baycast-p.vercel.app
ok /
ok /questions
ok /questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248
ok /leaderboard
ok /activity
Public BCP surface verification passed.
```

```bash
python3 - <<'PY'
import requests
urls=[
'https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026',
'https://openai.com/news/',
'https://help.openai.com/en/articles/6825453-chatgpt-release-notes'
]
for url in urls:
    r=requests.get(url,timeout=25,allow_redirects=True,headers={'User-Agent':'Mozilla/5.0 AQ460 gate'})
    print(url, r.status_code, r.url, len(r.text), r.headers.get('server'), r.headers.get('cf-ray'))
PY
```

Résultat utile:

```text
https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026 200 https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026 4536 None None
https://openai.com/news/ 403 https://openai.com/news/ 9674 cloudflare a103afb7a9f1c783-HEL
https://help.openai.com/en/articles/6825453-chatgpt-release-notes 403 https://help.openai.com/en/articles/6825453-chatgpt-release-notes 9872 cloudflare a103afb7fd919596-HEL
```

## Surfaces BCP publiques

Les six routes demandées répondent en 200: home, questions ouvertes, questions résolues, leaderboard, activity et settlement Apple Mac Pro.

Sur le HTML public complet, je n'ai pas trouvé `aggregate_probability`, `forecasters_count`, `forecastCount`, `fcCount`, `settled_by`, `evidence_doc`, `raw resolution JSON`, `raw JSON`, ni `early consensus`. J'ai aussi cherché une copie de compteur du type `12 forecasters`, `12 forecasts`, `12 predictions`: rien sur ces surfaces. Même résultat pour une copie du type `65% consensus`, `65% probability`, `65% chance`.

Le leaderboard contient bien du vocabulaire de scoring public, mais pas les champs internes ciblés et pas un signal BCP ouvert. La page Apple settlement montre le résultat public, pas les champs internes `settled_by`, `evidence_doc` ou un JSON de résolution brut.

## Questions Jun 30 trouvées sans lecture de forecasts

Depuis `/questions`, les deux liens publics visibles sont:

```text
/questions/5745e845-94e9-4802-bbeb-850c982e1276 Sports 8 d left Will the 2026 FIFA World Cup opening match have at least three total goals? Lock your call before the crowd can shape it
/questions/d3338e47-11ec-4568-942e-42bb19be0f5e Technology 8 d left Will OpenAI release a new public video generation model before July 1, 2026? Lock your call before the crowd can shape it
```

### FIFA World Cup opening match

URL publique: `https://baycast-p.vercel.app/questions/5745e845-94e9-4802-bbeb-850c982e1276`

DOM rendu vu dans le navigateur:

```text
Will the 2026 FIFA World Cup opening match have at least three total goals?
Resolves Yes if the official final score of the opening match of the 2026 FIFA World Cup includes three or more total goals by the end of regulation plus stoppage time. Extra time and penalty shootout goals do not count if FIFA classifies the opening match as a knockout match for any reason. Own goals count. If the match is abandoned and not completed by 2026-06-30, resolves No.
Community signal locked
Jun 30, 2026
Closes
Resolution source: FIFA official match centre: https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026
```

Le DOM rendu ne contient pas les champs internes ciblés, pas `forecasters`, pas `consensus`, pas de JSON brut. La source FIFA répond en 200 depuis ce run. Elle est donc utilisable comme point de départ, mais il faudra encore capturer le score officiel ou l'absence de match complété au moment du settlement.

### OpenAI public video generation model

URL publique: `https://baycast-p.vercel.app/questions/d3338e47-11ec-4568-942e-42bb19be0f5e`

DOM rendu vu dans le navigateur:

```text
Will OpenAI release a new public video generation model before July 1, 2026?
Resolves Yes if OpenAI publicly releases a new or materially upgraded video generation model to ChatGPT users, API users, or another public paid tier before 2026-07-01 00:00 UTC. A research demo, waitlist-only preview, safety note, pricing change, or minor UI update does not count. The model must generate video from text, image, or video prompts. Otherwise resolves No.
Community signal locked
Jun 30, 2026
Closes
Resolution source: OpenAI News and product release notes: https://openai.com/news/ and https://help.openai.com/en/articles/6825453-chatgpt-release-notes
```

Le DOM rendu ne contient pas les champs internes ciblés, pas `forecasters`, pas `consensus`, pas de JSON brut. Les deux sources OpenAI ont répondu 403 Cloudflare pendant ce run. Je le note comme blocage de collecte directe depuis cet environnement, pas comme preuve No. Pour résoudre, il faudra une source OpenAI accessible, une archive, ou une capture fiable consultable qui établit clairement release publique, niveau d'accès, capacité vidéo et date.

## Gate et no-send

GO BCP public: les surfaces live ne révèlent pas les agrégats ou compteurs demandés avant forecast. La promesse visible reste blind-first: l'utilisateur voit `Community signal locked` et doit poser sa probabilité avant comparaison.

NO-GO settlement Jun 30 aujourd'hui: les pages sont prêtes côté critères, mais la preuve de résolution n'est pas encore suffisante. Ne pas envoyer de settlement, ne pas annoncer de résultat, ne pas lire `forecasts` avant d'avoir la preuve publique finale. Pour FIFA, vérifier la source officielle au moment exact. Pour OpenAI, traiter le 403 Cloudflare séparément et obtenir une preuve publique accessible avant toute décision.
