# AQ-445, live BCP et préparation preuves Jun 30, 21 juin 19h

Passage fait depuis `/root/baycast-product`, après synchro `origin/main`. Je n'ai pas lu la table `forecasts`. Les contrôles ci-dessous viennent de fetchs publics sur `https://baycast-p.vercel.app` et des scripts publics du repo quand ils ne demandent pas de secret.

Verdict court: GO pour le gate BCP public. NO-GO pour tout settlement Jun 30 tant qu'une preuve publique datée et archivée n'a pas été lue avant de résoudre.

## Surfaces publiques vérifiées

Commande lancée:

```bash
python3 - <<'PY'
import requests,re
base='https://baycast-p.vercel.app'
paths=['/','/questions','/questions?status=resolved','/leaderboard','/activity','/settlements/apple-mac-pro-wwdc-2026']
needles=['aggregate_probability','forecasters_count','forecastCount','fcCount','settled_by','evidence_doc','raw JSON','raw json','exact forecaster','early consensus']
for p in paths:
    r=requests.get(base+p,timeout=20,headers={'User-Agent':'AQ445-public-check'})
    print(base+p, r.status_code, len(r.text), [n for n in needles if n.lower() in r.text.lower()])
PY
```

Résultats concrets, tous avec statut 200:

- `https://baycast-p.vercel.app/`: Home Baycast, navigation, `42 Questions live now`, promesse blind-first. Aucun des termes sensibles cherchés.
- `https://baycast-p.vercel.app/questions`: `Questions (42 open)`, cartes ouvertes, FIFA et OpenAI Jun 30 en haut, copie `Lock your call before the crowd can shape it`. Aucun des termes sensibles cherchés.
- `https://baycast-p.vercel.app/questions?status=resolved`: liste résolue avec Apple Mac Pro et Atlantic hurricane, copie de scoring post-résolution. Aucun des termes sensibles cherchés.
- `https://baycast-p.vercel.app/leaderboard`: leaderboard public, colonnes Brier, Log Score, Predictions, Resolved, une ligne publique résolue. Aucun des termes sensibles cherchés.
- `https://baycast-p.vercel.app/activity`: activity publique limitée aux questions résolues, Apple visible. Aucun des termes sensibles cherchés.
- `https://baycast-p.vercel.app/settlements/apple-mac-pro-wwdc-2026`: note publique Apple Mac Pro settled No, source Apple WWDC et Newsroom, outcome No. Aucun des termes sensibles cherchés.

Termes cherchés dans le HTML complet, pas seulement dans le texte visible: `aggregate_probability`, `forecasters_count`, `forecastCount`, `fcCount`, `settled_by`, `evidence_doc`, `raw JSON`, `raw json`, `exact forecaster`, `early consensus`.

Je n'ai pas vu de JSON brut exposé, pas de compteur exact de forecasters pour les questions ouvertes, pas de probabilité agrégée publique pour les questions ouvertes, pas de champ interne de settlement dans la page.

## Scripts repo

Commande lancée:

```bash
npm run verify:public-bcp
```

Résultat: PASS.

Routes validées par le script:

```text
ok /
ok /questions
ok /questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248
ok /leaderboard
ok /activity
Public BCP surface verification passed.
```

Commande lancée:

```bash
npm run verify:next-settlement-watch
```

Résultat local: FAIL non produit, à cause de l'environnement sans Supabase:

```text
Supabase env unavailable: Missing SUPABASE_URL/NEXT_PUBLIC_SUPABASE_URL or SUPABASE_ANON_KEY/NEXT_PUBLIC_SUPABASE_ANON_KEY
```

Je ne l'ai pas contourné avec une lecture de table privée. Pour AQ-445, le watch Jun 30 est donc vérifié depuis `/questions` et les détails publics seulement.

## Jun 30 watch vu depuis `/questions` seulement

Fetch public lancé:

```bash
python3 - <<'PY'
import requests,re,html
text=requests.get('https://baycast-p.vercel.app/questions',timeout=20,headers={'User-Agent':'AQ445-public-link-check'}).text
for m in re.finditer(r'<a[^>]+href="(/questions/[^"]+)"[^>]*>(.*?)</a>', text, re.S):
    href=m.group(1)
    body=re.sub(r'<[^>]+>',' ',m.group(2))
    body=re.sub(r'\s+',' ',html.unescape(body)).strip()
    if 'World Cup opening match' in body or 'OpenAI release' in body:
        print(href, body)
PY
```

Résultat:

```text
/questions/5745e845-94e9-4802-bbeb-850c982e1276 Sports 10 d left Will the 2026 FIFA World Cup opening match have at least three total goals? Lock your call before the crowd can shape it
/questions/d3338e47-11ec-4568-942e-42bb19be0f5e Technology 10 d left Will OpenAI release a new public video generation model before July 1, 2026? Lock your call before the crowd can shape it
```

J'ai ensuite ouvert les deux détails publics, sans lecture de `forecasts`.

### FIFA World Cup opening match

URL publique: `https://baycast-p.vercel.app/questions/5745e845-94e9-4802-bbeb-850c982e1276`

Visible sur la page:

```text
Will the 2026 FIFA World Cup opening match have at least three total goals?
Resolves Yes if the official final score of the opening match of the 2026 FIFA World Cup includes three or more total goals by the end of regulation plus stoppage time. Extra time and penalty shootout goals do not count if FIFA classifies the opening match as a knockout match for any reason. Own goals count. If the match is abandoned and not completed by 2026-06-30, resolves No.
Community signal locked
Jun 30, 2026 Closes
Resolution source: FIFA official match centre: https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026
```

Checklist evidence prep:

1. Source à surveiller: `https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026`.
2. Close time visible dans Baycast: Jun 30, 2026.
3. Ne pas lire `forecasts` avant settlement.
4. Avant de résoudre, capturer la preuve publique: score final officiel, statut du match, date de consultation, URL source. Si le match n'est pas complété au 2026-06-30, appliquer la règle No prévue dans la question.

### OpenAI video generation model

URL publique: `https://baycast-p.vercel.app/questions/d3338e47-11ec-4568-942e-42bb19be0f5e`

Visible sur la page:

```text
Will OpenAI release a new public video generation model before July 1, 2026?
Resolves Yes if OpenAI publicly releases a new or materially upgraded video generation model to ChatGPT users, API users, or another public paid tier before 2026-07-01 00:00 UTC. A research demo, waitlist-only preview, safety note, pricing change, or minor UI update does not count. The model must generate video from text, image, or video prompts. Otherwise resolves No.
Community signal locked
Jun 30, 2026 Closes
Resolution source: OpenAI News and product release notes: https://openai.com/news/ and https://help.openai.com/en/articles/6825453-chatgpt-release-notes
```

Checklist evidence prep:

1. Sources à surveiller: `https://openai.com/news/` et `https://help.openai.com/en/articles/6825453-chatgpt-release-notes`.
2. Close time visible dans Baycast: Jun 30, 2026, avec critère avant `2026-07-01 00:00 UTC`.
3. Ne pas lire `forecasts` avant settlement.
4. Avant de résoudre, capturer la preuve publique: annonce ou release note, disponibilité publique concernée, capacité vidéo, horodatage ou date de publication, URL source. Si la preuve est seulement demo, waitlist, safety note, pricing ou UI mineure, ne pas compter Yes.

## Décision

GO: les surfaces BCP publiques vérifiées ne montrent pas les champs internes demandés, ne montrent pas de consensus ouvert et gardent le signal communautaire verrouillé sur les questions ouvertes.

NO-GO: aucune résolution Jun 30 ne doit être faite sans preuve publique fraîche, consultée et notée avant l'action de settlement. Le script Supabase local ne passe pas faute d'env, donc je ne déclare pas un PASS Supabase.