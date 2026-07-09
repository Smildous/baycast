# AQ-599, gate dev du 9 juillet à 19h

J’ai remis `/root/baycast-dev` à jour depuis `origin/main` avant de lancer les contrôles. La mise à jour initiale a répondu `Already up to date` après `git fetch origin && git pull --ff-only origin main`.

`git diff --check` est passé sans sortie et avec un code 0. Je l’ai relancé après création de ce document, même résultat.

`npm run verify:agent-secret-gate` est passé avec un code 0. Le vérificateur a ciblé `https://baycast-p.vercel.app/api/agent/forecast`. Il indique que `.env.local` existe, que `AGENT_ENDPOINT_SECRET` n’est pas présent en local, que la CLI Vercel n’est pas installée et que Supabase est disponible en lecture anonyme. Le compteur de forecasts était à 12 avant le probe et à 12 après. Le probe non autorisé a bien reçu `401`. Le probe autorisé en dry run a été sauté parce que `AGENT_ENDPOINT_SECRET` manque dans `.env.local`. Aucun forecast IA n’a été inséré.

`npm run verify:public-bcp` est passé avec un code 0. Les surfaces publiques vérifiées sur `https://baycast-p.vercel.app` sont `/`, `/questions`, `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`, `/leaderboard` et `/activity`. Le script termine par `Public BCP surface verification passed.`

`npm test` est passé avec un code 0. Vitest a exécuté 14 fichiers de test, 119 tests passés, durée 14.99 s.

`rm -rf .next && npm run build` est passé avec un code 0. Next.js 14.2.16 a compilé correctement, les types et le lint sont passés, 27 pages statiques ont été générées, puis l’optimisation finale et les build traces ont terminé sans erreur. Le build signale seulement l’avertissement webpack connu sur la sérialisation de grosses chaînes.

Conclusion courte: gate dev propre. Le blocage attendu reste le secret `AGENT_ENDPOINT_SECRET` absent côté local pour le probe autorisé, donc pas de tentative live et pas d’insertion de forecast IA.
