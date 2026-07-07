# AQ-577 Jul 7 13h Product / Questions gate

J'ai d'abord synchronisé `/root/baycast-product` avec `origin/main`. Ce contrôle porte sur la surface publique de production `https://baycast-p.vercel.app` et sur la watch de settlement. Je n'ai pas lu la table `forecasts`.

Les routes publiques demandées répondent correctement en HTML. `/` retourne 200 et affiche `How well can you predict the future?`. `/questions` retourne 200 et affiche `Questions(35 open)`. `/questions?status=resolved` retourne 200 et affiche `Questions(9 resolved)`. `/leaderboard` retourne 200 et affiche `Leaderboard`. `/activity` retourne 200 et affiche `Activity Feed`.

La question Xbox handheld a été identifiée sur la surface publique et vérifiée ici : `/questions/5cc9fe74-5306-49d9-bec3-251ad276a779`. La page retourne 200 et affiche `Will Microsoft announce a new first-party Xbox handheld before August 1, 2026?`.

Le contrôle BCP public est propre. Les chaînes surveillées sont absentes sur les routes inspectées : `aggregate_probability`, `forecasters_count`, `forecastCount`, `fcCount`, copie de type nombre exact de forecasters, et `community consensus` dans un contexte de question ouverte. La page Xbox ne montre pas non plus ces champs de fuite.

`npm run verify:public-bcp` a été exécuté depuis `/root/baycast-product` et a réussi. Le script a vérifié `/`, `/questions`, `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`, `/leaderboard`, et `/activity`, puis a fini par `Public BCP surface verification passed.`

`/root/baycast-product` n'a pas de `.env.local`, donc `npm run verify:next-settlement-watch` a été exécuté depuis `/root/baycast`, le clone qui a l'environnement local disponible. Le résultat est `next settlement watch: PASS`. Les candidats attendus sont cohérents, dont la question Microsoft Xbox handheld : status `open`, clôture `2026-07-31T23:59:59+00:00`.

Forecast table read: no.

Verdict: gate Product / Questions AQ-577 passé. La surface publique de production ne fuit pas les champs de consensus surveillés, la page Xbox est accessible, et la next settlement watch est verte.
