# AQ-590 Jul 8 19h dev gate

Passe lancée depuis `/root/baycast-dev` le 8 juillet 2026 à 19:02 UTC. J'ai d'abord remis `main` au niveau de `origin/main`, puis j'ai lancé le gate demandé sans modifier le code applicatif et sans insérer de forecast.

## Synchronisation

`git fetch origin main && git checkout main && git pull --ff-only origin main`

Résultat: PASS. La branche `main` était déjà à jour avec `origin/main`.

`git diff --check`

Résultat: PASS. Aucun problème de whitespace détecté.

## Gate secret agent

`npm run verify:agent-secret-gate`

Résultat: PASS.

Le vérificateur a ciblé `https://baycast-p.vercel.app/api/agent/forecast`. `.env.local` existe, mais `AGENT_ENDPOINT_SECRET` n'est pas présent localement. Le CLI Vercel n'est pas installé et aucun token Vercel n'était disponible, donc aucune lecture distante de secret n'a été faite. Supabase était disponible en lecture anon.

Forecasts avant: 12. Forecasts après: 12. Le comptage n'a pas bougé.

Le probe non autorisé a répondu `401`, comme attendu. Le probe autorisé en dry run a été sauté parce que le secret local est absent. Le script a terminé avec `AQ-548 verifier passed without printing secret values.` Aucun secret n'a été imprimé.

Conclusion côté AI: endpoint public toujours protégé, aucun live AI insert pendant cette passe. Le blocage connu AQ-546 reste inchangé tant que `AGENT_ENDPOINT_SECRET` production n'est pas aligné.

## Surfaces publiques BCP

`npm run verify:public-bcp`

Résultat: PASS.

Le script a vérifié `https://baycast-p.vercel.app` et les routes `/`, `/questions`, `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`, `/leaderboard`, `/activity`. Toutes ont répondu `ok`, puis `Public BCP surface verification passed.`

## Tests

`npm test`

Résultat: PASS avec Node `v22.22.2` et npm `10.9.7`.

Vitest a passé 14 fichiers de tests et 119 tests au total. Durée reportée: 14.90s. Aucun retry Node 20 n'a été nécessaire, le souci `styleText` de `node:util` ne s'est pas présenté.

## Build propre

`rm -rf .next && npm run build`

Résultat: PASS avec Node `v22.22.2`.

Next.js `14.2.16` a compilé, linté, vérifié les types, généré 27 pages statiques, finalisé l'optimisation et collecté les traces de build. Le warning webpack sur la sérialisation de grosses chaînes reste informatif et non bloquant.

## Statut

Cette passe est déployable côté application. Les gates demandés passent, le nombre de forecasts reste à 12 avant et après, et aucun forecast live AI n'a été inséré. Seul le document de gate AQ-590 a été ajouté.
