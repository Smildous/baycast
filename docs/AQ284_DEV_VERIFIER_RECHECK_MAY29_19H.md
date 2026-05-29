# AQ-284 dev verifier recheck, 29 mai 19h

Recheck fait depuis `/root/baycast-dev` après sync propre sur `origin/main`.

Sync utilisé:

```bash
git fetch origin && git checkout main && git reset --hard origin/main
```

Résultat: PASS. La branche `main` pointe sur `origin/main`, commit `b869345`.

Contrôles lancés:

```bash
git diff --check
```

Résultat: PASS. Aucune erreur whitespace.

```bash
npm run verify:public-bcp
```

Résultat: PASS. Les surfaces publiques BCP vérifiées sur `https://baycast-p.vercel.app` masquent bien les champs protégés attendus. Pages passées: `/`, `/questions`, `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`, `/leaderboard`, `/activity`.

```bash
npm run verify:first-settlement-evidence
```

Résultat: FAIL dans cet environnement dev, avant toute lecture distante. Cause exacte: variables Supabase manquantes, `SUPABASE_URL/NEXT_PUBLIC_SUPABASE_URL` ou `SUPABASE_ANON_KEY/NEXT_PUBLIC_SUPABASE_ANON_KEY`. `.env.local` n'existe pas dans ce checkout, donc aucun secret n'a été chargé ni affiché.

Contrôle code du verifier first settlement:

Le verifier `scripts/first-settlement-evidence.mjs` est readonly. Il utilise seulement `.from('questions').select(...)` pour sonder `resolution_source`, `resolution_url`, puis relire les questions de juin 2026 triées par `closes_at`. Il ne contient aucun write Supabase.

No forecast read: the first-settlement verifier is read-only, reads the `questions` table only, and does not query the `forecasts` table.

Candidat attendu pour AQ-284: Apple Mac Pro, close `2026-06-13T00:00:00+00:00`.
