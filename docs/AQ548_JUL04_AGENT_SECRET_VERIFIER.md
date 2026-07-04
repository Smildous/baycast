# AQ-548 agent secret gate verifier

## But

Ajouter un contrôle autonome pour `/api/agent/forecast`, sans afficher de secret.

Le script vérifie:

- si `.env.local` existe
- si `.env.local` contient `AGENT_ENDPOINT_SECRET`, sans afficher sa valeur
- si le CLI Vercel est disponible et authentifié, ou si `VERCEL_TOKEN` existe
- si Supabase est disponible pour compter les lignes de `forecasts`
- si un appel `dry_run` sans secret est refusé en production
- si un appel `dry_run` avec le secret local passe, seulement quand `AGENT_ENDPOINT_SECRET` est présent
- si le nombre de forecasts reste stable avant et après le probe

Le probe `dry_run` reste en lecture seule côté endpoint. Le script échoue si un appel non authentifié ne renvoie pas 401, si le `dry_run` autorisé échoue quand un secret local est disponible, ou si le nombre de forecasts change.

## Usage

```bash
npm run verify:agent-secret-gate
```

Variables optionnelles:

```bash
BAYCAST_AGENT_BASE_URL=https://baycast-p.vercel.app
BAYCAST_AGENT_PROBE_QUESTION_ID=<uuid>
```

Si `BAYCAST_AGENT_PROBE_QUESTION_ID` n'est pas fourni, le script prend la première question ouverte future via Supabase. Si Supabase n'est pas configuré, il saute le comptage et le probe, puis signale le manque de contexte sans imprimer de secrets.

## Résultat actuel

Contrôle lancé depuis `/root/baycast-dev` le 2026-07-04 après fast-forward sur `origin/main`.

Résultat:

- `.env.local` existe
- `AGENT_ENDPOINT_SECRET` est absent de `.env.local`
- Vercel CLI n'est pas installé dans cet environnement
- `VERCEL_TOKEN` est absent
- Supabase est disponible en mode `anon_readonly`
- forecast count avant probe: 12
- probe `dry_run` sans secret en production: 401
- probe `dry_run` avec secret local: sauté, car le secret local est absent
- forecast count après probe: 12

Verdict: pass. Le gate production refuse le probe sans secret et aucun forecast n'a été écrit.
