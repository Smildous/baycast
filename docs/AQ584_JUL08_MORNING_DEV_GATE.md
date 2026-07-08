# AQ-584 Jul 8 morning Development deployability gate

Date: 2026-07-08 07:03 UTC
Repo: `/root/baycast-dev`
Base: `origin/main`

## Résultat

Pass.

La branche locale était déjà à jour avec `origin/main`. Les contrôles demandés passent. Aucun live AI forecast n'a été inséré. Le seul probe d'endpoint effectué par le verifier agent secret était un `dry_run` non authentifié, attendu en 401.

## Forecast count

| Moment | Count |
| --- | ---: |
| Avant endpoint probe | 12 |
| Après endpoint probe | 12 |

Le count est resté stable à 12. Pas d'écriture dans `forecasts`.

## Commandes lancées

### Sync

Commande:

```bash
git fetch origin main && git checkout main && git pull --ff-only origin main
```

Résumé:

```text
Already on 'main'
Your branch is up to date with 'origin/main'.
Already up to date.
```

Statut: pass.

### git diff check

Commande:

```bash
git diff --check
```

Résumé:

```text
No output.
```

Statut: pass.

### Agent secret gate

Commande:

```bash
npm run verify:agent-secret-gate
```

Résumé:

```text
AQ-548 agent secret gate verifier for https://baycast-p.vercel.app/api/agent/forecast
local_env: {"env_local_exists":true,"agent_endpoint_secret_present":false}
vercel: {"cli_available":false,"token_present":false,"authenticated":false,"detail":"vercel CLI not installed"}
supabase: {"available":true,"mode":"anon_readonly"}
forecast_count_before: {"count":12}
probe_question: {"available":true,"source":"first open future question"}
unauthorized_probe: {"status":401,"ok":false}
authorized_dry_run_probe: {"skipped":true,"reason":"AGENT_ENDPOINT_SECRET missing from local .env.local"}
forecast_count_after: {"count":12}
AQ-548 verifier passed without printing secret values.
```

Statut: pass.

Secret gate status: fermé côté public. Le probe sans secret retourne 401 comme attendu. Le probe autorisé a été sauté car `AGENT_ENDPOINT_SECRET` n'est pas présent dans `.env.local`. C'est cohérent avec le blocker connu de prod tant que `AGENT_ENDPOINT_SECRET` et l'env Vercel ne sont pas alignés.

### Public BCP

Commande:

```bash
npm run verify:public-bcp
```

Résumé:

```text
Verifying public BCP surfaces at https://baycast-p.vercel.app
ok /
ok /questions
ok /questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248
ok /leaderboard
ok /activity
Public BCP surface verification passed.
```

Statut: pass.

### Tests

Commande:

```bash
npm test
```

Résumé:

```text
Test Files  14 passed (14)
Tests       119 passed (119)
```

Statut: pass. Node local `v22.22.2` n'a pas déclenché l'erreur Vitest/Rolldown `styleText`, donc je n'ai pas relancé sous Node 20.

### Build

Commande:

```bash
rm -rf .next && npm run build
```

Résumé:

```text
Next.js 14.2.16
Compiled successfully
Linting and checking validity of types ...
Generating static pages (27/27)
Route output generated successfully.
```

Statut: pass. Node local `v22.22.2` n'a pas déclenché l'erreur Vitest/Rolldown `styleText`, donc je n'ai pas relancé sous Node 20.

## Notes

- `npm ci` a été lancé avant les verifiers car `node_modules` n'était pas présent.
- `npm ci` signale 10 vulnérabilités npm dans l'arbre de dépendances, sans bloquer les contrôles demandés.
- Vercel CLI n'est pas installé localement, et `VERCEL_TOKEN` n'est pas présent. Le verifier le reporte sans échec.
- Aucun correctif applicatif n'a été nécessaire.
