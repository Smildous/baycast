# AQ-329 Product live gate recheck, 06 juin 2026 07h UTC

Contrôle lancé après la synchro Git demandée, dépôt déjà à jour. Recheck fait sur `https://baycast-p.vercel.app` à `2026-06-06T07:03:38Z` avec navigation navigateur et contrôles HTML publics. Je n'ai pas lu la table `forecasts`.

Verdict: PASS.

Les surfaces publiques tiennent la règle BCP. `npm run verify:public-bcp` passe sur `/`, `/questions`, `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`, `/leaderboard` et `/activity`.

Sur `/`, la page montre 44 questions live, explique le fonctionnement par forecast indépendant, puis score contre la réalité. Elle ne publie pas de probabilité de consensus et ne donne pas de nombre exact de forecasters. Le seul pourcentage vu est `100% Free to play`, pas un signal de marché.

Sur `/questions`, la page liste `Questions (44 open)` et la question Apple Mac Pro apparaît en premier dans Closing Soon avec `7d left` et le texte `Lock your call before the crowd can shape it`. Aucune probabilité collective ni compteur exact de forecasters n'est exposé.

La question détail Apple est bien découvrable à `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`. Elle affiche `Technology`, `7d left`, `Community signal locked`, `Jun 13, 2026 Closes`, et le formulaire public invite seulement à poser sa propre probabilité. Les seuls pourcentages visibles sont ceux du sélecteur utilisateur, `5%`, `10%`, `25%`, `50%`, `75%`, `90%`, `95%`. Le HTML public contient aussi l'horodatage `2026-06-13T00:00:00+00:00` pour cette question. La question reste donc ouverte côté public et ne doit pas être réglée avant `2026-06-13T00:00:00+00:00`.

Sur `/leaderboard`, le tableau n'affiche que les en-têtes et l'état vide: les scores apparaissent après résolution. Aucun rang public avec participation exacte n'est visible.

Sur `/activity`, l'état vide dit que l'activité publique apparaît après résolution et que les forecasts de questions ouvertes restent cachés jusqu'à la résolution. Aucune ligne d'activité liée à une question ouverte n'est publiée.

Je n'ai pas trouvé de cadrage gambling sur ces surfaces publiques: pas de betting, wager, odds, payout, stake ou casino dans le texte public contrôlé. La formulation reste celle d'un produit de prediction polling gratuit, avec score de calibration après résolution.

Note: `npm run verify:first-settlement-evidence` a été tenté pour confirmer la donnée `questions` en lecture seule, mais l'environnement local n'a pas les variables Supabase nécessaires. Le contrôle final s'appuie donc sur les surfaces live et le HTML public.