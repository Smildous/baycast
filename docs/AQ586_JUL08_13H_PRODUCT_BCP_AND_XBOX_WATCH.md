# AQ-586, gate produit questions, 8 juillet 13h

Verdict: PASS.

La prod publique ne montre pas de fuite BCP sur les surfaces vérifiées. Le prochain point de surveillance reste la question Microsoft Xbox handheld, ouverte, avec clôture au 2026-07-31T23:59:59+00:00. Aucune lecture de la table `forecasts` n'a été faite pour ce gate.

## Commandes lancées

Depuis `/root/baycast-product`:

```bash
git fetch origin && git pull --ff-only origin main
npm run verify:public-bcp
npm run verify:next-settlement-watch
```

Le contrôle `verify:next-settlement-watch` a échoué dans ce clone parce que l'environnement Supabase n'y est pas disponible:

```text
next settlement watch: FAIL
Supabase env unavailable: Missing SUPABASE_URL/NEXT_PUBLIC_SUPABASE_URL or SUPABASE_ANON_KEY/NEXT_PUBLIC_SUPABASE_ANON_KEY
```

J'ai donc relancé uniquement ce vérificateur depuis `/root/baycast`, qui a l'environnement local attendu:

```bash
npm run verify:next-settlement-watch
```

Spot-check HTTP depuis `/root/baycast-product`:

```bash
python3 - <<'PY'
import urllib.request
urls=['https://baycast-p.vercel.app/questions','https://baycast-p.vercel.app/questions/5cc9fe74-5306-49d9-bec3-251ad276a779']
for u in urls:
    req=urllib.request.Request(u,headers={'User-Agent':'Mozilla/5.0 gate-check'})
    with urllib.request.urlopen(req,timeout=30) as r:
        body=r.read().decode('utf-8','replace')
        print(u, r.status, len(body), 'Xbox' in body, 'first-party Xbox handheld' in body)
PY
```

## BCP public

`npm run verify:public-bcp` est passé sur `https://baycast-p.vercel.app`.

Routes vérifiées par le script:

```text
/
/questions
/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248
/leaderboard
/activity
```

Termes et copies BCP recherchés par le vérificateur:

```text
aggregate_probability
forecasters_count
forecastCount
fcCount
copie de compteur exact du type "12 forecasters"
"community consensus" dans un contexte de question ouverte, blind phase, forecast privé, consensus caché
```

Résultat exact du script:

```text
Verifying public BCP surfaces at https://baycast-p.vercel.app
ok /
ok /questions
ok /questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248
ok /leaderboard
ok /activity
Public BCP surface verification passed.
```

Le spot-check HTTP de `/questions` et de la page Xbox n'a trouvé aucun des termes suivants dans le HTML récupéré:

```text
consensus
aggregate_probability
forecasters_count
forecast_count
forecasts
raw
```

## Prochain settlement watch

Le vérificateur `verify:next-settlement-watch` lit seulement `questions` avec les champs `id,title,status,closes_at`. Il ne requête pas `forecasts`.

Résultat depuis `/root/baycast`:

```text
next settlement watch: PASS
PASS FIFA opening match at least three goals: ok
  5745e845-94e9-4802-bbeb-850c982e1276 | resolved | 2026-06-30T23:59:59+00:00 | Will the 2026 FIFA World Cup opening match have at least three total goals?
PASS OpenAI public video generation model before July 1 2026: ok
  d3338e47-11ec-4568-942e-42bb19be0f5e | resolved | 2026-06-30T23:59:59+00:00 | Will OpenAI release a new public video generation model before July 1, 2026?
PASS Microsoft first-party Xbox handheld before Aug 1 2026: ok
  5cc9fe74-5306-49d9-bec3-251ad276a779 | open | 2026-07-31T23:59:59+00:00 | Will Microsoft announce a new first-party Xbox handheld before August 1, 2026?
```

Le prochain watch reste donc:

```text
5cc9fe74-5306-49d9-bec3-251ad276a779
open
2026-07-31T23:59:59+00:00
Will Microsoft announce a new first-party Xbox handheld before August 1, 2026?
```

## Spot-check prod

`https://baycast-p.vercel.app/questions` répond HTTP 200. Le HTML contient la question Xbox avec l'id `5cc9fe74-5306-49d9-bec3-251ad276a779`, le titre attendu, le statut `open` et la clôture `2026-07-31T23:59:59+00:00`.

`https://baycast-p.vercel.app/questions/5cc9fe74-5306-49d9-bec3-251ad276a779` répond HTTP 200. La page contient le titre `Will Microsoft announce a new first-party Xbox handheld before August 1, 2026?`.

## Lecture forecasts

Non. Je n'ai pas lu la table `forecasts`. Le script settlement watch confirme dans son code qu'il lit uniquement `questions` et sélectionne `id,title,status,closes_at`.

## Blockers

Aucun blocker produit.

Note opérationnelle: `/root/baycast-product` n'a pas les variables Supabase nécessaires pour `verify:next-settlement-watch`. Le fallback depuis `/root/baycast` a été utilisé et a passé.
