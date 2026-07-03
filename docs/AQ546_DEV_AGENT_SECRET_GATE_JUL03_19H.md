# AQ-546, gate secret agent production, 03 juillet 19h

But: aligner ou diagnostiquer `AGENT_ENDPOINT_SECRET` en production, puis relancer le gate live `/api/agent/forecast` en `dry_run` sur une question ouverte. Aucun secret affiché, aucun forecast live inséré.

## Sync repo

Depuis `/root/baycast-dev`:

```bash
git fetch origin main
git pull --ff-only origin main
```

Résultat: `Already up to date.`

## État env local et Vercel

Contrôle local, sans afficher de valeur:

```bash
node - <<'NODE'
const fs=require('fs');
const path='.env.local';
if(!fs.existsSync(path)){console.log('env_local=false'); process.exit(0)}
const text=fs.readFileSync(path,'utf8');
const keys=[];
for(const line of text.split(/\r?\n/)){
  const m=line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=/);
  if(m) keys.push(m[1]);
}
console.log(JSON.stringify({
  env_local:true,
  keys,
  has_agent_secret:keys.includes('AGENT_ENDPOINT_SECRET'),
  has_supabase_service_role:keys.includes('SUPABASE_SERVICE_ROLE_KEY')||keys.includes('SUPABASE_SERVICE_ROLE')
}, null, 2));
NODE
```

Résultat utile:

```json
{
  "env_local": true,
  "has_agent_secret": false,
  "has_supabase_service_role": false
}
```

Les noms de variables publiques Supabase sont présents localement. `AGENT_ENDPOINT_SECRET` n'est pas présent dans `.env.local`, donc je n'avais pas de secret local fiable à comparer ou à pousser.

Contrôle Vercel CLI:

```bash
command -v vercel >/dev/null 2>&1 && vercel --version || echo 'vercel cli missing'
npx --yes vercel@latest whoami
```

Résultats:

```text
vercel cli missing
Vercel CLI 54.20.0 (Node.js 22.22.2)
Error: No existing credentials found. Please run `vercel login` or pass "--token"
```

Conclusion: je ne peux pas vérifier ni modifier l'env production Vercel depuis ce clone sans authentification. Je n'ai pas tenté de créer ou remplacer une variable Vercel à l'aveugle.

## Question live utilisée

Lecture read-only via Supabase anon, sans secret:

```bash
node <script read-only questions open>
```

Question ouverte retenue:

```json
{
  "id": "5cc9fe74-5306-49d9-bec3-251ad276a779",
  "title": "Will Microsoft announce a new first-party Xbox handheld before August 1, 2026?",
  "status": "open",
  "closes_at": "2026-07-31T23:59:59+00:00"
}
```

## Compte forecasts avant

```bash
node scripts/supabase-admin.mjs status
```

Résultat utile:

```json
{
  "ok": true,
  "counts": [
    { "table": "questions", "count": 44 },
    { "table": "questions_open", "count": 35 },
    { "table": "forecasts", "count": 12 },
    { "table": "profiles", "count": 6 }
  ],
  "latest_error": null
}
```

## Gate live dry_run

Commande lancée sans secret, puisque le secret local est absent et Vercel n'est pas authentifié:

```bash
python3 - <<'PY'
import json, urllib.request, urllib.error
url='https://baycast-p.vercel.app/api/agent/forecast'
payload=json.dumps({
  'question_id':'5cc9fe74-5306-49d9-bec3-251ad276a779',
  'agent_id':'baycast-gpt',
  'dry_run':True
}).encode()
req=urllib.request.Request(url,data=payload,headers={
  'Content-Type':'application/json',
  'User-Agent':'AQ546-dry-run-gate'
},method='POST')
try:
    with urllib.request.urlopen(req, timeout=30) as r:
        body=r.read(1000).decode('utf-8','replace')
        print(json.dumps({'status':r.status,'body':body}, indent=2))
except urllib.error.HTTPError as e:
    body=e.read(1000).decode('utf-8','replace')
    print(json.dumps({'status':e.code,'body':body}, indent=2))
PY
```

Résultat:

```json
{
  "status": 401,
  "body": "{\"ok\":false,\"error\":\"Unauthorized agent endpoint\"}"
}
```

Diagnostic: le gate reste bloqué au niveau auth endpoint. Le handler refuse avant lecture de body utile, avant appel modèle, avant insertion. Ce résultat est cohérent avec l'absence de `AGENT_ENDPOINT_SECRET` local exploitable et l'impossibilité de corriger Vercel sans credentials.

## Compte forecasts après

```bash
node scripts/supabase-admin.mjs status
```

Résultat utile:

```json
{
  "ok": true,
  "mode": "service_role",
  "counts": [
    { "table": "questions", "count": 44 },
    { "table": "questions_open", "count": 35 },
    { "table": "forecasts", "count": 12 },
    { "table": "profiles", "count": 6 }
  ],
  "latest_error": null
}
```

Forecasts avant: 12. Forecasts après: 12. Inchangé.

## Tests

Aucun code touché, seulement ce document. Je n'ai donc pas lancé les tests de route.

## Statut

Non corrigé côté production. Cause concrète: Vercel CLI non installé globalement, `npx vercel whoami` non authentifié, aucun token Vercel disponible, et aucun `AGENT_ENDPOINT_SECRET` présent dans l'env local de ce clone. Le gate live `dry_run` a été relancé en lecture seule et échoue toujours en `401 Unauthorized agent endpoint`, sans écriture Supabase.
