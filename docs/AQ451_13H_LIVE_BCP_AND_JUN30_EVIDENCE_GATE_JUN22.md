# AQ-451, 13h live BCP et gate preuves Jun 30, 22 juin

Run fait le `2026-06-22T13:03:36Z` depuis `/root/baycast-product`.

Verdict: GO pour les surfaces publiques BCP. NO SEND. NO SETTLEMENT sur les deux questions Jun 30 tant que la preuve publique finale n'a pas été relue, capturée et citée juste avant l'action.

Je n'ai pas lu la table `forecasts`. La découverte des deux pages Jun 30 est faite via `questions` Supabase en anon public, avec un `select` limité à `id,title,description,status,closes_at,resolution_source,category`.

## Synchro repo

Commande:

```bash
git -C /root/baycast-product status --short && \
git -C /root/baycast-product fetch origin main && \
git -C /root/baycast-product pull --ff-only origin main
```

Résultat:

```text
From https://github.com/Smildous/baycast
 * branch            main       -> FETCH_HEAD
From https://github.com/Smildous/baycast
 * branch            main       -> FETCH_HEAD
Already up to date.
```

HEAD avant doc: `c47f4be00cb1a2435839e4ae01a5eac295e326fd`.

## Script public BCP du repo

Commande:

```bash
npm run verify:public-bcp
```

Résultat:

```text
> baycast@0.1.0 verify:public-bcp
> node scripts/verify-public-bcp-surfaces.mjs

Verifying public BCP surfaces at https://baycast-p.vercel.app
ok /
ok /questions
ok /questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248
ok /leaderboard
ok /activity
Public BCP surface verification passed.
```

## Check live demandé, sans lecture de forecasts

Commande lancée sur les pages publiques:

```bash
python3 - <<'PY'
import requests,re,html,json
base='https://baycast-p.vercel.app'
paths=['/','/questions','/questions?status=resolved','/leaderboard','/activity','/settlements/apple-mac-pro-wwdc-2026','/questions/5745e845-94e9-4802-bbeb-850c982e1276','/questions/d3338e47-11ec-4568-942e-42bb19be0f5e']
needles=['aggregate_probability','forecasters_count','forecastCount','fcCount','settled_by','evidence_doc','raw resolution JSON','raw resolution json','raw JSON','raw json','exact forecaster','early consensus probability','early consensus']
for p in paths:
    r=requests.get(base+p,timeout=25,headers={'User-Agent':'AQ451-13h-public-bcp'})
    txt=r.text
    visible=re.sub(r'<script.*?</script>|<style.*?</style>',' ',txt,flags=re.S)
    visible=re.sub(r'<[^>]+>',' ',visible)
    visible=re.sub(r'\s+',' ',html.unescape(visible)).strip()
    hits=[n for n in needles if n.lower() in txt.lower()]
    print(json.dumps({'path':p,'status':r.status_code,'bytes':len(txt),'hits':hits,'visible_start':visible[:220]},ensure_ascii=False))
PY
```

Résultat concret:

```text
{"path": "/", "status": 200, "bytes": 57428, "hits": [], "visible_start": "Baycast - Predict Real Events BAYCAST Home Questions Activity Leaderboard How It Works Compare Sign Up Get Started Free Menu Home Questions Activity Leaderboard How It Works Compare Log in Get Started Free Loading... BAY"}
{"path": "/questions", "status": 200, "bytes": 56607, "hits": [], "visible_start": "Browse Prediction Questions - Baycast BAYCAST Home Questions Activity Leaderboard How It Works Compare Sign Up Get Started Free Menu Home Questions Activity Leaderboard How It Works Compare Log in Get Started Free BAYCAS"}
{"path": "/questions?status=resolved", "status": 200, "bytes": 37114, "hits": [], "visible_start": "Browse Prediction Questions - Baycast BAYCAST Home Questions Activity Leaderboard How It Works Compare Sign Up Get Started Free Menu Home Questions Activity Leaderboard How It Works Compare Log in Get Started Free BAYCAS"}
{"path": "/leaderboard", "status": 200, "bytes": 45275, "hits": [], "visible_start": "Forecaster Leaderboard - Baycast BAYCAST Home Questions Activity Leaderboard How It Works Compare Sign Up Get Started Free Menu Home Questions Activity Leaderboard How It Works Compare Log in Get Started Free # Forecaste"}
{"path": "/activity", "status": 200, "bytes": 22674, "hits": [], "visible_start": "Recent Forecasting Activity - Baycast BAYCAST Home Questions Activity Leaderboard How It Works Compare Sign Up Get Started Free Menu Home Questions Activity Leaderboard How It Works Compare Log in Get Started Free Loadin"}
{"path": "/settlements/apple-mac-pro-wwdc-2026", "status": 200, "bytes": 30531, "hits": [], "visible_start": "Apple Mac Pro at WWDC 2026 settled No - Baycast BAYCAST Home Questions Activity Leaderboard How It Works Compare Sign Up Get Started Free Menu Home Questions Activity Leaderboard How It Works Compare Log in Get Started F"}
{"path": "/questions/5745e845-94e9-4802-bbeb-850c982e1276", "status": 200, "bytes": 44288, "hits": [], "visible_start": "Will the 2026 FIFA World Cup opening match have at least three total goals? - Baycast BAYCAST Home Questions Activity Leaderboard How It Works Compare Sign Up Get Started Free Menu Home Questions Activity Leaderboard How"}
{"path": "/questions/d3338e47-11ec-4568-942e-42bb19be0f5e", "status": 200, "bytes": 44241, "hits": [], "visible_start": "Will OpenAI release a new public video generation model before July 1, 2026? - Baycast BAYCAST Home Questions Activity Leaderboard Ho"}
```

Les chaînes sensibles demandées sont absentes du HTML complet sur les huit surfaces:

`aggregate_probability`, `forecasters_count`, `forecastCount`, `fcCount`, copie de compteur exact de forecasters, `early consensus probability`, `settled_by`, `evidence_doc`, JSON brut de résolution.

Le point à retenir: les pages ouvertes gardent le signal communautaire verrouillé. Je ne vois pas de probabilité agrégée publique, pas de compteur exact, pas de champ interne de résolution, pas de JSON de résolution brut.

## Découverte Jun 30 par Supabase questions seulement

Commande, sans `forecasts`:

```bash
python3 - <<'PY'
import requests,re,json
base='https://baycast-p.vercel.app'
html=requests.get(base+'/questions',timeout=20).text
url=key=None
for path in re.findall(r'src="([^"]+\.js[^"]*)"', html):
    t=requests.get(base+path,timeout=20).text
    if not url:
        m=re.search(r'https://[a-z0-9]+\.supabase\.co',t)
        if m: url=m.group(0)
    if not key:
        m=re.search(r'eyJhbG[^"\']+',t)
        if m and m.group(0).count('.')>=2: key=m.group(0)
headers={'apikey':key,'Authorization':'Bearer '+key}
select='id,title,description,status,closes_at,resolution_source,category'
params={'select':select,'or':'(title.ilike.*World Cup opening match*,title.ilike.*OpenAI*video*generation*model*)','order':'closes_at.asc','limit':'10'}
r=requests.get(url+'/rest/v1/questions',headers=headers,params=params,timeout=20)
print('status',r.status_code)
for q in r.json():
 print(json.dumps(q,ensure_ascii=False,indent=2))
PY
```

Résultat:

```text
status 200
{
  "id": "5745e845-94e9-4802-bbeb-850c982e1276",
  "title": "Will the 2026 FIFA World Cup opening match have at least three total goals?",
  "description": "Resolves Yes if the official final score of the opening match of the 2026 FIFA World Cup includes three or more total goals by the end of regulation plus stoppage time. Extra time and penalty shootout goals do not count if FIFA classifies the opening match as a knockout match for any reason. Own goals count. If the match is abandoned and not completed by 2026-06-30, resolves No.",
  "status": "open",
  "closes_at": "2026-06-30T23:59:59+00:00",
  "resolution_source": "FIFA official match centre: https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026",
  "category": "sports"
}
{
  "id": "d3338e47-11ec-4568-942e-42bb19be0f5e",
  "title": "Will OpenAI release a new public video generation model before July 1, 2026?",
  "description": "Resolves Yes if OpenAI publicly releases a new or materially upgraded video generation model to ChatGPT users, API users, or another public paid tier before 2026-07-01 00:00 UTC. A research demo, waitlist-only preview, safety note, pricing change, or minor UI update does not count. The model must generate video from text, image, or video prompts. Otherwise resolves No.",
  "status": "open",
  "closes_at": "2026-06-30T23:59:59+00:00",
  "resolution_source": "OpenAI News and product release notes: https://openai.com/news/ and https://help.openai.com/en/articles/6825453-chatgpt-release-notes",
  "category": "tech"
}
```

Pages publiques vérifiées ensuite:

`https://baycast-p.vercel.app/questions/5745e845-94e9-4802-bbeb-850c982e1276`

`https://baycast-p.vercel.app/questions/d3338e47-11ec-4568-942e-42bb19be0f5e`

Les deux répondent 200, sans les champs sensibles listés plus haut.

## Watch preuves Jun 30

Commande sur les sources publiques déclarées par les questions:

```bash
python3 - <<'PY'
import requests,re,html,json
sources=['https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026','https://openai.com/news/','https://help.openai.com/en/articles/6825453-chatgpt-release-notes']
for u in sources:
    r=requests.get(u,timeout=25,headers={'User-Agent':'Mozilla/5.0 AQ451-public-evidence-watch','Accept':'text/html,application/xhtml+xml'})
    title=(re.search(r'<title[^>]*>(.*?)</title>',r.text,re.S|re.I) or ['',''])[1]
    title=re.sub(r'\s+',' ',html.unescape(title)).strip()
    text=re.sub(r'<script.*?</script>|<style.*?</style>',' ',r.text,flags=re.S|re.I)
    text=re.sub(r'<[^>]+>',' ',text)
    text=re.sub(r'\s+',' ',html.unescape(text)).strip()
    print(json.dumps({'url':u,'status':r.status_code,'final':r.url,'bytes':len(r.text),'title':title[:160],'text_start':text[:160]},ensure_ascii=False))
PY
```

Résultat observé:

```text
{"url": "https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026", "status": 200, "final": "https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026", "bytes": 4534, "title": "", "text_start": ""}
{"url": "https://openai.com/news/", "status": 403, "final": "https://openai.com/news/", "bytes": 9716, "title": "", "text_start": "Enable JavaScript and cookies to continue"}
{"url": "https://help.openai.com/en/articles/6825453-chatgpt-release-notes", "status": 403, "final": "https://help.openai.com/en/articles/6825453-chatgpt-release-notes", "bytes": 9935, "title": "", "text_start": "Enable JavaScript and cookies to continue"}
```

FIFA: source officielle joignable en HTTP 200 depuis ce run, mais la réponse exploitable côté texte est vide car la page est rendue côté client. Pour résoudre le 30 juin, il faut capturer le score officiel final depuis la page FIFA ou une page officielle FIFA plus précise si elle est publiée, avec score, statut final, date de consultation et URL. Si le match n'est pas complété avant la date de règle, la règle Baycast dit No.

OpenAI: les deux sources déclarées bloquent ce runtime avec Cloudflare 403. Le browser a donné le même blocage sur `https://openai.com/news/` avec titre `Just a moment...`. Ce n'est pas une preuve de No, c'est seulement une preuve que ce runtime ne peut pas lire la source maintenant. Pour résoudre, il faudra une lecture publique non bloquée des pages OpenAI News ou release notes, ou une archive publique fiable de ces pages, avant toute écriture. Le critère Yes demande une release publique d'un modèle vidéo nouveau ou matériellement amélioré avant `2026-07-01 00:00 UTC`; demo de recherche, waitlist-only, safety note, pricing change ou UI mineure ne suffit pas.

## Implications no-send et no-settlement

Aucun outbound ne part de ce gate. Les surfaces BCP sont propres, mais ce document n'autorise pas un envoi marketing ni une résolution anticipée.

Aucun settlement Jun 30 ne doit être écrit depuis ce run. Les deux questions sont encore `open`, ferment à `2026-06-30T23:59:59+00:00`, et la preuve finale n'est pas encore capturée. La table `forecasts` reste hors périmètre jusqu'après verrouillage public et evidence capture.

## Décision

GO BCP public: les surfaces demandées répondent et ne montrent pas de fuite BCP.

NO SEND: rien à envoyer depuis ce gate.

NO SETTLEMENT Jun 30: attendre la preuve publique finale, puis seulement ensuite résoudre selon les règles de chaque question.
