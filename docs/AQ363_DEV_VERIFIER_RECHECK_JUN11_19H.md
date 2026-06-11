# AQ-363 Dev verifier recheck, 11 juin 19h

Recheck fait depuis `/root/baycast-dev`, après synchro sur `origin/main`. Je n'ai pas consulté de forecasts.

Commande de synchro utilisée avant le recheck:

```sh
git fetch origin main
git checkout main
git pull --rebase origin main
```

Résultat: branche `main` déjà à jour avec `origin/main`.

Contrôle Git:

```sh
git diff --check
```

Résultat: succès, aucune sortie, aucun whitespace error.

Contrôle public BCP:

```sh
npm run verify:public-bcp
```

Résultat: succès.

```text
Verifying public BCP surfaces at https://baycast-p.vercel.app
ok /
ok /questions
ok /questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248
ok /leaderboard
ok /activity
Public BCP surface verification passed.
```

Contrôle first settlement evidence:

```sh
npm run verify:first-settlement-evidence
```

Résultat: succès.

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

Lecture vérifiée côté scripts: `verify-public-bcp` lit uniquement les pages publiques HTML et cherche les fuites de consensus sur les routes publiques. `verify:first-settlement-evidence` est en mode readonly, sélectionne la table `questions`, et le script indique explicitement qu'il ne query jamais `forecasts` et n'écrit pas dans Supabase. La sortie confirme `table: "questions"`.

Échec rencontré: aucun.
