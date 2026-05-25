# AQ-261 product live gate recheck, 25 mai 2026 13h

Check fait le 2026-05-25 à 13:02 UTC sur le prototype public `https://baycast-p.vercel.app`. Je suis resté en lecture seule côté navigateur public. Je n'ai pas lu Supabase, je n'ai pas ouvert ni interrogé la table `forecasts`, je n'ai pas écrit de donnée live, et je n'ai pas tenté de settlement.

Verdict: pass produit pour AQ-261. La surface publique garde le Blind Consensus propre et reste prête pour le premier settlement quand une question sera réellement éligible.

Pages vérifiées:

| URL | Evidence |
| --- | --- |
| `https://baycast-p.vercel.app/` | Home OK. Les liens principaux chargent. La section live affiche 44 questions, dont `Will Apple announce a new Mac Pro at WWDC 2026?` avec `19d left` et `Lock your call before the crowd can shape it`. Je n'ai pas vu de probabilité de consensus, pas de compteur exact de forecasters, pas de ligne d'activité sur une question ouverte. Pas de copie gambling vue. Le seul wording proche du jeu reste `Free to play`, déjà connu, sans promesse de gain ni pari. |
| `https://baycast-p.vercel.app/questions` | Index OK avec `Questions(44 open)`. Apple Mac Pro est visible en première page avec `19d left`. Les cartes restent sur catégorie, temps restant, titre et appel à forecast. Pas de consensus probability publique, pas de nombre exact de forecasters, pas d'activité ouverte exposée, pas de vocabulaire betting ou gambling. |
| `https://baycast-p.vercel.app/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248` | Route Apple Mac Pro découverte depuis la home et confirmée par les docs précédentes. La page affiche le titre attendu, les critères de résolution, `Community signal locked`, `Jun 13, 2026`, la source `Apple WWDC and Apple Newsroom`, le slider de forecast et les liens sign up/log in. Le JSON-LD public contient `dateModified: 2026-06-13T00:00:00+00:00` et `acceptedAnswer.text: Forecast before the crowd can shape your call.` Les métadonnées disent `tech · Open · Forecast before the crowd can shape your call.` Pas de statut resolved, pas de résultat, pas de settlement avant close. |
| `https://baycast-p.vercel.app/leaderboard` | Page OK. Le message public est `Scores appear after questions resolve`. Le texte précise que les forecasts sont live, mais que les scores de leaderboard démarrent seulement après final outcome. C'est safe pour le score pending: pas de score prématuré, pas de consensus, pas de count exact. |
| `https://baycast-p.vercel.app/activity` | Page OK. Le feed dit `Public forecasting activity appears after questions resolve` et `Open-question forecasts stay hidden until resolution so every forecaster starts blind.` L'activité publique est donc resolved-only au moment du check. Rien ne liste des forecasts de questions ouvertes. |

Points AQ-261:

- Public BCP: pass. Les pages vues ne montrent pas de consensus probability, ne donnent pas de forecaster count exact, et ne publient pas d'activité de questions ouvertes.
- Readiness premier settlement: pass côté produit. Les pages resolution-ready sont en place, les sources sont visibles, et l'Apple Mac Pro a des critères de résolution exploitables. Rien ne force un settlement avant l'heure.
- Apple Mac Pro: open. La question reste ouverte, forecastable pour un utilisateur non connecté via CTA, close affichée au 13 juin 2026. Elle n'est pas éligible au settlement avant cette clôture.
- Activity: pass. Resolved-only, avec copie explicite sur le masquage des forecasts ouverts.
- Leaderboard: pass. La copie pending-score est prudente: les scores apparaissent après résolution et outcome final.
- Gambling copy: pass sur ce passage. Je n'ai pas vu de `bet`, `wager`, `odds`, promesse de gain, argent réel ou incitation de pari. À garder en watchlist: `Free to play`, acceptable ici mais à éviter si on veut une séparation encore plus nette.

Aucune erreur console JavaScript n'a été relevée pendant le dernier relevé navigateur. Le check n'a pas consulté les forecasts et n'a effectué aucune écriture live.
