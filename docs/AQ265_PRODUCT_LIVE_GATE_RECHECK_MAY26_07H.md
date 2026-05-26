# AQ-265 product live gate recheck, 26 mai 2026 07h

J'ai refait le passage public sur `https://baycast-p.vercel.app` depuis le navigateur, après remise du clone sur `origin/main`. Je n'ai pas lu Supabase, je n'ai pas ouvert la table `forecasts`, et je n'ai inséré aucune donnée.

Pages vues: `/`, `/questions`, `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`, `/leaderboard`, `/activity`.

La home charge correctement. Elle affiche les liens principaux, les chiffres globaux de produit, et les cartes de questions live. Apple Mac Pro est visible dès le premier écran avec `18d left` et `Lock your call before the crowd can shape it`. Je n'ai pas vu de probabilité de consensus, pas de nombre exact de forecasters, pas de ligne d'activité sur question ouverte, et pas de copie de pari ou de gambling. Les mentions sensibles restent `Free to use` et `Free to play`, pas du vocabulaire de mise.

`/questions` charge avec `Questions(44 open)`. Apple Mac Pro est visible dans la liste avec `18d left`. Les cartes restent blind: elles poussent à faire son appel avant de voir la foule, sans afficher de consensus public et sans compteur exact de forecasters. Les filtres Open, Closed, Resolved, Closing Soon, Newest et Most Active sont visibles. Le nombre `44 open` est un nombre de questions ouvertes, pas un count de participation.

La route Apple Mac Pro est bien disponible: `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`. Elle affiche `Technology`, `18d left`, le titre attendu, les critères de résolution, les liens de contexte, `Community signal locked`, `Jun 13, 2026`, et le bloc `Add your forecast`. Le JSON-LD public garde `dateModified: 2026-06-13T00:00:00+00:00`. Je n'ai vu aucun état resolved, aucun résultat, aucun settlement, et aucun texte qui fermerait la question avant sa clôture prévue.

`/leaderboard` charge et affiche `Scores appear after questions resolve`. C'est le comportement attendu pour ce gate: pas de score public prématuré, pas de classement rempli avant résolution, pas de forecast de question ouverte exposé.

`/activity` charge et affiche `Activity appears after questions resolve`. Le texte dit explicitement que les forecasts de questions ouvertes restent cachés jusqu'à la résolution. C'est le point clé du BCP sur ce passage: l'activité publique ne fuit pas les appels ouverts.

Conclusion: PASS pour le live gate public AQ-265 à 07h. Le consensus reste caché avant forecast, les exact forecaster counts ne sont pas exposés, la copie ne bascule pas dans le gambling, l'activité publique n'apparaît qu'après résolution, et Apple Mac Pro reste ouverte avec clôture au `2026-06-13T00:00:00+00:00`.