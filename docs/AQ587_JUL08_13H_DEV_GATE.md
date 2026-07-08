# AQ-587 Jul 8 13h dev gate

Gate lancé depuis `/root/baycast-dev` le 8 juillet à 13h. Le but était simple: vérifier que la branche est déployable, que le point d'entrée AI reste protégé, et qu'aucun secret ne sort dans les logs.

## Synchronisation

`git fetch origin && git pull --ff-only origin main`

Résultat: OK. La branche était déjà à jour avec `origin/main`.

`git diff --check`

Résultat: OK. Aucun problème de whitespace détecté.

## Gate AI et secret

`npm run verify:agent-secret-gate`

Résultat: OK.

Le script a ciblé `https://baycast-p.vercel.app/api/agent/forecast`. L'environnement local contient `.env.local`, mais `AGENT_ENDPOINT_SECRET` n'est pas présent localement. Le CLI Vercel n'est pas installé dans cet environnement, donc aucune lecture distante de secret n'a été faite. Supabase était disponible en lecture anon.

Comptage forecasts avant: 12.
Comptage forecasts après: 12.

Le comptage est resté stable. Le probe non autorisé a répondu `401`, ce qui est le comportement attendu. Le probe autorisé en dry run a été sauté parce que le secret local est absent. Aucun secret n'a été imprimé dans la sortie du script.

Verdict endpoint AI: protégé côté public, pas de forecast injecté, pas de fuite de secret. Le point bloquant connu reste inchangé: AQ-546, `AGENT_ENDPOINT_SECRET` production renvoie encore 401 pour le flux attendu. AQ-542 dépend toujours de ce déblocage. Je n'ai pas inséré de live AI forecast.

## Surfaces publiques BCP

`npm run verify:public-bcp`

Résultat: OK.

Les routes vérifiées ont toutes répondu correctement:

`/`
`/questions`
`/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`
`/leaderboard`
`/activity`

## Tests

`npm test`

Résultat: OK avec Node `v22.22.2` et npm `10.9.7`.

Vitest a passé 14 fichiers de tests, 119 tests au total. Le total reste aligné avec le comptage du matin: 119.

## Build propre

`rm -rf .next && npm run build`

Résultat: OK avec Node `v22.22.2`.

Next.js `14.2.16` a compilé, linté, vérifié les types, généré 27 pages statiques et finalisé les traces de build. Le warning webpack sur la sérialisation de grosses chaînes est informatif, pas bloquant.

Je n'ai pas eu besoin de relancer via Node 20. Vitest et le build sont passés avec la version Node présente.

## Statut deployabilité

Déployable côté application pour cette passe. Les tests passent, le build propre passe, les surfaces publiques BCP passent, et le gate secret ne modifie pas le nombre de forecasts.

Blockers restants: AQ-546 reste le sujet à régler pour le secret production de l'endpoint agent. AQ-542 reste dépendant de ce point. Aucun changement de code applicatif n'a été fait pendant cette passe.
