# AQ-319 Dev verifier recheck, Jun 04 13h

Recheck fait dans `/root/baycast-dev` après remise à niveau sur `origin/main`.

Commandes lancées :

```bash
git fetch origin && git reset --hard origin/main
git diff --check
npm run verify:public-bcp
npm run verify:first-settlement-evidence
```

Résultat : tout passe.

`git diff --check` ne signale aucune erreur de whitespace.

`npm run verify:public-bcp` passe sur les surfaces publiques BCP : `/`, `/questions`, la question publique `13aa9f2f-3226-4213-a04f-0cc2b87ad248`, `/leaderboard`, `/activity`.

`npm run verify:first-settlement-evidence` passe avec `ok: true`. Le mode annoncé est `readonly`, la table lue est `questions`, et le contrôle a été fait à `2026-06-04T13:01:07.218Z`.

Candidat AQ-319 trouvé : `Will Apple announce a new Mac Pro at WWDC 2026?`

Statut du candidat : `open`

Candidate close timestamp : `2026-06-13T00:00:00+00:00`

Source publique de résolution présente : Apple WWDC et Apple Newsroom, `https://developer.apple.com/wwdc26/` et `https://www.apple.com/newsroom/`.

J’ai aussi inspecté `scripts/first-settlement-evidence.mjs` assez pour confirmer le périmètre. Le script se déclare read-only, lit `questions`, vérifie les champs de preuve publique `resolution_source` et `resolution_url`, puis sort une checklist d’évidence. Il ne fait aucune requête vers `forecasts` et ne contient aucune écriture Supabase.

No-forecast-read statement : aucune prévision n’a été consultée, lue ou requêtée pendant cette recheck.
