# AQ-267 product live gate recheck, 26 mai 2026 13h UTC

Run fait en lecture seule sur `https://baycast-p.vercel.app`, depuis le navigateur. Je n'ai pas interrogé Supabase, je n'ai pas lu la table `forecasts`, et je n'ai rien écrit côté produit.

Pages vues: `/`, `/questions`, `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`, `/leaderboard`, `/activity`.

La home charge correctement. Elle affiche 44 questions live, les liens principaux, le bloc de fonctionnement, et la carte Apple Mac Pro en premier écran avec `18d left`. La carte dit `Lock your call before the crowd can shape it`. Je n'ai pas vu de probabilité de consensus publique, pas de compteur exact de forecasters, pas d'activité de forecasts ouverts, pas de copie gambling. Les textes restent dans le vocabulaire de forecast, crowd, scoring et comparaison humain plus IA.

`/questions` charge avec `Questions(44 open)`. La liste affiche Apple Mac Pro, le temps restant, la catégorie et le même message blind. Le lien direct trouvé depuis cette page est `https://baycast-p.vercel.app/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`. Là aussi, pas de consensus chiffré, pas de nombre exact de forecasters, pas de fuite d'activité ouverte. Le HTML de la page contient `2026-06-13T00:00:00+00:00`, ce qui correspond à la clôture attendue.

La page directe Apple Mac Pro est ouverte et exploitable. Elle affiche `Will Apple announce a new Mac Pro at WWDC 2026?`, `18d left`, le statut de signal public verrouillé, le bloc `Add your forecast`, le slider à 50 par défaut, les boutons 5, 10, 25, 50, 75, 90, 95, puis les CTA `Sign up to forecast` et `Log in`. Le consensus reste remplacé par des tirets et le texte `Community signal locked`. La date visible est `Jun 13, 2026`, et le JSON-LD contient bien `dateModified: 2026-06-13T00:00:00+00:00`. Je n'ai vu aucun label de résolution, aucune note de settlement, aucun résultat avant clôture.

Point à noter sur cette page: les liens de contexte affichent encore `NIST AI Resource Center` et `OpenAI news and research updates` avant `Apple Newsroom`. Ce n'est pas un blocage pour AQ-267, car la source de résolution visible dit bien `Apple WWDC and Apple Newsroom: https://developer.apple.com/wwdc26/ and https://www.apple.com/newsroom/`. Mais les deux premiers liens sont hors sujet pour une question Mac Pro.

`/leaderboard` charge et affiche clairement `Scores appear after questions resolve`. C'est le bon état pour le gate actuel: pas de scores publics avant résolution, pas de rang prématuré, pas de consensus ou count caché qui ressort dans le corps visible.

`/activity` charge en état post-résolution seulement. La page dit `Public forecasting activity appears after questions resolve` puis `Activity appears after questions resolve`. Elle précise que les forecasts de questions ouvertes restent cachés jusqu'à résolution. Je n'ai pas vu d'activité de forecast ouvert.

Recherche de copie sensible sur les surfaces vues: pas de `bet`, `betting`, `gambling`, `wager`, `odds`, `payout`, `stake` ou `casino` dans le texte visible des pages testées. La seule zone proche du sujet est la comparaison humain plus IA, qui reste contrôlée et orientée scoring.

Conclusion: PASS pour le gate public AQ-267 à 13h. Les surfaces publiques gardent le consensus blind, ne publient pas de probabilité collective, ne donnent pas de compteur exact de forecasters, gardent l'activité pour l'après résolution, et le leaderboard dit bien que les scores apparaissent après résolution. Apple Mac Pro reste ouverte jusqu'à `2026-06-13T00:00:00+00:00`.