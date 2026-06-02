# AQ-307, recheck dev des verifiers, 2 juin 13h

Clone dev resynchronise avant controle avec `git fetch origin && git checkout main && git reset --hard origin/main`. La copie locale est repartie de `origin/main` sur `c0f4b64`.

`git diff --check` ne signale rien.

`npm run verify:public-bcp` passe sur `https://baycast-p.vercel.app`. Les surfaces publiques verifiees sont `/`, `/questions`, `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`, `/leaderboard` et `/activity`. Le verifier termine avec `Public BCP surface verification passed.`

`npm run verify:first-settlement-evidence` passe en lecture seule. La sortie indique bien `"table": "questions"`, sans lecture de `forecasts`. Le candidat reste l'Apple Mac Pro, titre `Will Apple announce a new Mac Pro at WWDC 2026?`, statut `open`, avec `closes_at` a `2026-06-13T00:00:00+00:00`.

Verdict: gates publics AQ-307 au vert a 13h. Rien a corriger cote verifier. Le candidat de premier settlement reste ouvert et sa date de cloture est conforme, au 13 juin 2026 a 00:00 UTC.
