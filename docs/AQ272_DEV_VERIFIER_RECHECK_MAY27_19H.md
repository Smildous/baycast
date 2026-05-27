# AQ-272 dev verifier recheck, May 27 19h

HEAD avant le commit de doc: `703d552f41e23926aa67be65e3c873b90d120581`

J'ai resynchronisé `/root/baycast-dev` avec `origin/main` avant les vérifications.

## Commandes et résultats

`git fetch origin main && git checkout main && git pull --ff-only origin main && git rev-parse HEAD`

Résultat: OK, fast-forward de `06a28ee` vers `703d552`. HEAD obtenu: `703d552f41e23926aa67be65e3c873b90d120581`.

`git diff --check`

Résultat: OK, aucune erreur d'espace ou de diff.

`npm run verify:public-bcp`

Résultat: OK.

Routes vérifiées sur `https://baycast-p.vercel.app`:

- `/`
- `/questions`
- `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`
- `/leaderboard`
- `/activity`

Sortie utile: `Public BCP surface verification passed.`

`npm run verify:first-settlement-evidence`

Premier passage sans variables Supabase dans `/root/baycast-dev`: échec attendu de configuration, `Missing SUPABASE_URL/NEXT_PUBLIC_SUPABASE_URL or SUPABASE_ANON_KEY/NEXT_PUBLIC_SUPABASE_ANON_KEY`.

Relance avec l'environnement local existant chargé depuis `/root/baycast/.env.local`, sans afficher les secrets:

`set -a; . /root/baycast/.env.local; set +a; npm run verify:first-settlement-evidence`

Résultat: OK.

Sortie utile:

```json
{
  "ok": true,
  "mode": "readonly",
  "table": "questions",
  "candidate_reason": "Apple Mac Pro exact match",
  "candidate": {
    "title": "Will Apple announce a new Mac Pro at WWDC 2026?",
    "status": "open",
    "closes_at": "2026-06-13T00:00:00+00:00",
    "resolution_source": "Apple WWDC and Apple Newsroom: https://developer.apple.com/wwdc26/ and https://www.apple.com/newsroom/",
    "resolution_url": null
  }
}
```

Avertissement vu pendant cette commande: Node.js 18 est déprécié côté `@supabase/supabase-js`. La vérification passe quand même.

## Confirmation sans lecture de forecasts

Je n'ai pas interrogé la table `forecasts`. La vérification a été faite par lecture statique des scripts.

Commande statique utilisée:

`grep -n "forecasts\|from('forecasts')\|from(\"forecasts\")\|\.from\|select(" scripts/first-settlement-evidence.mjs scripts/supabase-admin.mjs scripts/verify-public-bcp-surfaces.mjs | cat`

Constat:

- `scripts/first-settlement-evidence.mjs` lit seulement `questions` avec `client.from('questions')` aux lignes 26 et 61.
- `scripts/verify-public-bcp-surfaces.mjs` ne contient aucun accès Supabase, aucun `.from(...)`, aucun `select(...)`, et ne mentionne pas `forecasts`.
- `scripts/first-settlement-evidence.mjs` importe `getClient` depuis `scripts/supabase-admin.mjs`.
- Dans `scripts/supabase-admin.mjs`, `getClient` crée seulement le client Supabase. La mention `countRows(client, 'forecasts')` est dans la commande CLI `status()`, protégée par le bloc `if (isCli)`. Elle n'est pas appelée par `verify:first-settlement-evidence`.

Conclusion: le verifier `verify:first-settlement-evidence` est read-only et ne lit que `questions`. Il ne query pas `forecasts`.
