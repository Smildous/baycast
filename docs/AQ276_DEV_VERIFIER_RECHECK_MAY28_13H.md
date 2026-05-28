# AQ-276 dev verifier recheck, May 28 13h

Verdict: PASS.

Repo: `/root/baycast-dev`
Branch: `main`
Sync: `git fetch origin && git checkout main && git pull --rebase origin main` fast-forwarded to `24a7a3d`.

Je n'ai pas lu la table `forecasts`. Le contrôle settlement a tourné depuis le clone dev, avec l'env Supabase chargé depuis `/root/baycast/.env.local` pour exécuter la commande seulement. Aucune valeur d'env n'est reprise ici.

## Contrôles lancés

`git diff --check`

Résultat: PASS. Exit code 0. Aucun problème d'espaces signalé.

`npm run verify:public-bcp`

Résultat: PASS. Exit code 0.

Résumé de sortie:

```text
Verifying public BCP surfaces at https://baycast-p.vercel.app
ok /
ok /questions
ok /questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248
ok /leaderboard
ok /activity
Public BCP surface verification passed.
```

`npm run verify:first-settlement-evidence`

Premier lancement sans env locale: FAIL d'infra, exit code 1. Le script n'avait pas les variables Supabase dans `/root/baycast-dev`.

```json
{
  "ok": false,
  "error": "Missing SUPABASE_URL/NEXT_PUBLIC_SUPABASE_URL or SUPABASE_ANON_KEY/NEXT_PUBLIC_SUPABASE_ANON_KEY"
}
```

Relance depuis `/root/baycast-dev` avec l'env Supabase chargée: PASS. Exit code 0.

Extrait utile:

```json
{
  "ok": true,
  "mode": "readonly",
  "table": "questions",
  "checked_at": "2026-05-28T13:03:01.807Z",
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

## Confirmation settlement

Le vérifieur settlement lit `questions` seulement. Sa sortie donne `"table": "questions"` et `"mode": "readonly"`.

Candidat confirmé: `Will Apple announce a new Mac Pro at WWDC 2026?`

Statut: `open`

Close: `2026-06-13T00:00:00+00:00`

Aucune lecture manuelle de `forecasts`. Aucun signe de fuite BCP publique dans les surfaces testées.
