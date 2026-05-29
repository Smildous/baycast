# AQ-280 product live gate recheck, May 29 07h

Run fait le 2026-05-29 à 07:02 UTC sur `https://baycast-p.vercel.app/`, après `git fetch origin` puis `git reset --hard origin/main` dans `/root/baycast-product`. Je n'ai pas lu la table `forecasts`.

J'ai contrôlé la home, `/questions`, la route Apple Mac Pro découverte depuis les cartes publiques, `/leaderboard` et `/activity` avec le navigateur live.

La home répond et affiche les liens principaux, `44` questions live, puis les cartes publiques. Apple Mac Pro est visible dès la section live questions avec `15d left` et le texte `Lock your call before the crowd can shape it`. Je n'ai pas vu de probabilité de consensus, pas de compteur exact de forecasters, pas de ligne d'activité ouverte, pas de framing gambling. Le libellé `Free to play` est toujours présent dans les métriques de home. Je le note comme wording à surveiller, pas comme bug bloquant sur ce passage.

`/questions` répond avec `Questions(44 open)`. La liste affiche les cartes ouvertes, dont `Will Apple announce a new Mac Pro at WWDC 2026?`. Les cartes restent blind: catégorie, temps restant, titre, puis `Lock your call before the crowd can shape it`. Les métadonnées inspectées restent génériques: elles parlent de questions ouvertes, de probability estimates et de scoring, sans count de forecasters et sans consensus public.

La route Apple Mac Pro est `https://baycast-p.vercel.app/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`. Elle répond avec le bon titre et reste ouverte. Le détail affiche `Community signal locked`, des tirets à la place de la valeur publique, `Jun 13, 2026` comme clôture, puis le bloc `Add your forecast` avec signup et login pour un visiteur non connecté. Je n'ai pas vu de résultat, pas de settlement, pas de libellé resolved, pas de probabilité de consensus avant forecast, pas de count exact de forecasters. Le JSON-LD garde `dateModified: 2026-06-13T00:00:00+00:00`, cohérent avec la clôture connue. Settlement interdit avant cette date, rien ne montre un règlement anticipé.

Les liens de contexte Apple Mac Pro sont propres. La page ne montre que `Apple WWDC` vers `https://developer.apple.com/wwdc26/` et `Apple Newsroom` vers `https://www.apple.com/newsroom/`. La source de résolution visible reprend exactement Apple WWDC et Apple Newsroom. Je n'ai pas vu d'autre lien de contexte sur cette question.

`/leaderboard` répond avec `Scores appear after questions resolve`. Il n'y a pas de rang public exploitable, pas de score issu de questions ouvertes, pas de count de forecasters et pas d'activité ouverte exposée. L'onboarding public parle de blind forecasts et de Brier score, sans framing gambling.

`/activity` répond avec `Activity appears after questions resolve` et précise que les forecasts de questions ouvertes restent cachés jusqu'à résolution. Je n'ai pas vu de feed d'activité sur question ouverte, pas de probabilité, pas de count exact, pas de consensus public.

Conclusion: pass pour le live gate public BCP à 07h. Les surfaces publiques gardent le consensus fermé avant forecast, ne montrent pas de counts exacts, ne publient pas d'activité sur questions ouvertes et ne montrent pas de settlement Apple Mac Pro avant le 2026-06-13T00:00:00+00:00. Aucun petit bug produit dans le scope n'a nécessité de fix code sur ce run.
