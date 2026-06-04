# AQ-321 live product gate recheck, 4 juin 2026, 19h UTC

Recheck fait sur `origin/main` à jour, sur le site live `https://baycast-p.vercel.app`. Je n'ai pas lu la table `forecasts` ni de donnée de forecast. Les seules preuves utilisées sont les pages publiques et la métadonnée publique de la page question.

`/` répond en 200 avec `Baycast - Predict Real Events`. La home affiche les questions live et met Apple Mac Pro en carte publique. Elle pousse le geste attendu: faire son appel avant que le crowd signal influence la réponse. Pas de probabilité de consensus, pas de compte exact de forecasters, pas de framing pari, odds, mise, payout ou gambling.

`/questions` répond en 200 avec `Browse Prediction Questions — Baycast` et `Questions(44 open)`. Apple Mac Pro est découvrable en premier dans `Closing Soon`, lien public trouvé: `https://baycast-p.vercel.app/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`. La carte montre catégorie, temps restant et `Lock your call before the crowd can shape it`. Rien vu qui expose une probabilité de consensus ou un nombre exact de forecasters.

La route détail Apple répond en 200 avec `Will Apple announce a new Mac Pro at WWDC 2026? - Baycast`. La page montre la question, les critères de résolution, les liens Apple WWDC et Apple Newsroom, puis `Community signal locked`. La métadonnée publique HTML contient `tech · Open ·` et l'horodatage `2026-06-13T00:00:00+00:00`. Verdict question: toujours ouverte, close attendu le `2026-06-13T00:00:00+00:00`.

`/leaderboard` répond en 200 avec `Forecaster Leaderboard — Baycast` et `Scores appear after questions resolve`. Aucun classement prématuré vu, aucun score issu de questions ouvertes.

`/activity` répond en 200 avec `Recent Forecasting Activity — Baycast` et `Activity appears after questions resolve`. Aucun événement d'activité pour question ouverte vu.

Contrôle automatisé lancé: `node scripts/verify-public-bcp-surfaces.mjs`. Résultat: `ok /`, `ok /questions`, `ok /questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`, `ok /leaderboard`, `ok /activity`, puis `Public BCP surface verification passed.` Un second contrôle Node en lecture HTML publique a confirmé zéro hit sur les champs ou copies de fuite BCP ciblés, zéro hit sur les termes de gambling ciblés, `hasExactClose: true` et `hasOpenMeta: true` sur la route Apple.

Verdict: gate produit AQ-321 validé à 19h UTC. Le Blind Consensus reste propre sur les surfaces publiques testées: pas de consensus probability, pas de compte exact de forecasters, pas d'activité open-question, pas de framing gambling. Aucun settlement à faire maintenant.