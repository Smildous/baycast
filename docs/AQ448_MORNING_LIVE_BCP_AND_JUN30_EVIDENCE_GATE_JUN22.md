# AQ-448, morning live BCP et gate preuves Jun 30, 22 juin

Passage fait depuis `/root/baycast-product`, après `git fetch origin && git pull --ff-only origin main`. Je n'ai pas lu la table `forecasts`, ni aucune donnée de forecast. Les IDs Jun 30 viennent de la table `questions` via le script repo `verify-next-settlement-watch`, qui lit seulement `id,title,status,closes_at`.

Verdict court: GO pour le gate BCP public. NO-GO pour tout settlement Jun 30 tant qu'une preuve publique fraîche, datée et archivable n'a pas été lue avant résolution.

## Surfaces publiques vérifiées

Commande publique lancée contre `https://baycast-p.vercel.app`:

```bash
python3 - <<'PY'
import requests,re,html,json
base='https://baycast-p.vercel.app'
paths=['/','/questions','/questions?status=resolved','/leaderboard','/activity','/settlements/apple-mac-pro-wwdc-2026','/questions/5745e845-94e9-4802-bbeb-850c982e1276','/questions/d3338e47-11ec-4568-942e-42bb19be0f5e']
needle_patterns=[
 ('aggregate_probability', re.compile(r'aggregate_probability', re.I)),
 ('forecasters_count', re.compile(r'forecasters_count', re.I)),
 ('forecastCount', re.compile(r'forecastCount')),
 ('fcCount', re.compile(r'fcCount')),
 ('exact forecaster counts', re.compile(r'\b\d{1,3}(?:,\d{3})*\s+forecasters?\b', re.I)),
 ('early consensus probability', re.compile(r'early consensus|community consensus|consensus probability|\b\d{1,3}(?:\.\d+)?%\s*(?:yes|no|chance|probability|consensus)', re.I)),
 ('settled_by', re.compile(r'settled_by', re.I)),
 ('evidence_doc', re.compile(r'evidence_doc', re.I)),
 ('raw JSON resolution payload', re.compile(r'resolution_payload|raw json|"resolution"\s*:', re.I)),
]
for p in paths:
    r=requests.get(base+p,timeout=30,headers={'User-Agent':'AQ448-public-bcp-check/1.0','Accept':'text/html,application/xhtml+xml'})
    body=r.text
    text=re.sub(r'<[^>]+>',' ',body)
    text=re.sub(r'\s+',' ',html.unescape(text)).strip()
    found=[name for name,pat in needle_patterns if pat.search(body)]
    print(json.dumps({'path':p,'status':r.status_code,'bytes':len(body),'title_snip':text[:240],'flagged':found},ensure_ascii=False))
PY
```

Résultat: les 8 routes ont répondu 200 et `flagged` était vide partout.

Routes couvertes:

- `/`: home publique Baycast, navigation et surfaces marketing. Aucun champ BCP sensible trouvé.
- `/questions`: liste ouverte publique. Aucun `aggregate_probability`, compteur exact de forecasters ou consensus ouvert trouvé.
- `/questions?status=resolved`: liste résolue publique. Aucun champ interne de settlement trouvé.
- `/leaderboard`: leaderboard public. Aucun champ BCP ouvert trouvé.
- `/activity`: activité publique. Aucun champ BCP ouvert trouvé.
- `/settlements/apple-mac-pro-wwdc-2026`: note publique Apple Mac Pro. Aucun `settled_by`, `evidence_doc` ou payload de résolution brut trouvé dans le HTML public.
- `/questions/5745e845-94e9-4802-bbeb-850c982e1276`: détail FIFA Jun 30. Signal communautaire verrouillé, pas de consensus ouvert.
- `/questions/d3338e47-11ec-4568-942e-42bb19be0f5e`: détail OpenAI Jun 30. Signal communautaire verrouillé, pas de consensus ouvert.

Termes et patterns cherchés dans le HTML complet: `aggregate_probability`, `forecasters_count`, `forecastCount`, `fcCount`, compteur exact de forecasters, early consensus probability, `settled_by`, `evidence_doc`, payload de résolution JSON brut.

## Verif repo BCP

Commande lancée:

```bash
npm run verify:public-bcp
```

Résultat: PASS.

Sortie utile:

```text
Verifying public BCP surfaces at https://baycast-p.vercel.app
ok /
ok /questions
ok /questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248
ok /leaderboard
ok /activity
Public BCP surface verification passed.
```

## Découverte Jun 30 depuis `questions` seulement

Commande lancée depuis `/root/baycast-product`, avec env Supabase chargée depuis l'env local existant. Le script lit uniquement `questions`, colonnes `id,title,status,closes_at`.

```bash
set -a; . /root/baycast/.env.local; set +a; npm run verify:next-settlement-watch
```

Résultat: PASS.

```text
PASS FIFA opening match at least three goals: ok
  5745e845-94e9-4802-bbeb-850c982e1276 | open | 2026-06-30T23:59:59+00:00 | Will the 2026 FIFA World Cup opening match have at least three total goals?
PASS OpenAI public video generation model before July 1 2026: ok
  d3338e47-11ec-4568-942e-42bb19be0f5e | open | 2026-06-30T23:59:59+00:00 | Will OpenAI release a new public video generation model before July 1, 2026?
PASS Microsoft first-party Xbox handheld before Aug 1 2026: ok
  5cc9fe74-5306-49d9-bec3-251ad276a779 | open | 2026-07-31T23:59:59+00:00 | Will Microsoft announce a new first-party Xbox handheld before August 1, 2026?
```

## Jun 30 evidence watch note

### FIFA World Cup opening match

Baycast detail: `https://baycast-p.vercel.app/questions/5745e845-94e9-4802-bbeb-850c982e1276`

Source à vérifier après close: `https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026`.

Critère: Yes si le score final officiel du match d'ouverture de la Coupe du monde 2026 a au moins trois buts au total à la fin du temps réglementaire plus arrêts de jeu. Les buts en prolongation ou tirs au but ne comptent pas si FIFA classe le match comme knockout pour une raison quelconque. Les buts contre son camp comptent. Si le match est abandonné et non complété au 2026-06-30, No.

À capturer avant tout settlement: URL FIFA, score final officiel, statut du match, date de consultation, archive ou capture. Ne pas lire `forecasts` avant de décider.

### OpenAI public video generation model

Baycast detail: `https://baycast-p.vercel.app/questions/d3338e47-11ec-4568-942e-42bb19be0f5e`

Sources à vérifier après close: `https://openai.com/news/` et `https://help.openai.com/en/articles/6825453-chatgpt-release-notes`.

Critère: Yes si OpenAI publie avant `2026-07-01 00:00 UTC` un nouveau modèle de génération vidéo, ou une mise à niveau matérielle, accessible publiquement aux utilisateurs ChatGPT, API ou à un autre tier payant public. Une démo recherche, une preview waitlist-only, une note safety, un changement de prix ou une mise à jour UI mineure ne suffit pas. Le modèle doit générer de la vidéo à partir de prompts texte, image ou vidéo. Sinon No.

À capturer avant tout settlement: URL OpenAI, annonce ou release note, disponibilité publique concernée, capacité vidéo, horodatage ou date de publication, archive ou capture. Ne pas lire `forecasts` avant de décider.

## Décision

GO BCP public: les surfaces vérifiées ne montrent pas les champs internes demandés, ne montrent pas de compteur exact de forecasters et ne montrent pas de probabilité de consensus ouverte.

NO-GO settlement Jun 30 maintenant: FIFA et OpenAI restent ouverts, close `2026-06-30T23:59:59+00:00`. Le settlement ne doit partir qu'après lecture et conservation d'une preuve publique propre, toujours sans lecture de `forecasts`.
