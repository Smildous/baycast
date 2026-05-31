# AQ-296 product live gate recheck, 31 mai 19h UTC

J’ai créé ce fichier avant le test, puis j’ai testé le site public en navigateur à 2026-05-31T19:02:06Z. Je suis resté dans le parcours public de `https://baycast-p.vercel.app/`. Je n’ai pas lu la table `forecasts` et je n’ai consulté aucune donnée privée de forecast.

## Parcours testé

La page d’accueil charge correctement. Elle présente Baycast comme un outil de prévision collective, avec le message clé attendu: faire son appel avant de voir le crowd signal. Les cartes de questions ouvertes ne montrent pas de probabilité de consensus, seulement l’appel à verrouiller sa réponse avant l’influence du groupe. Je n’ai pas vu de langage de pari, de mise, d’odds, de payout ou de récompense financière. La page contient encore la formule `Free to play`, à surveiller côté ton produit, mais elle est accompagnée de `Free forever` et `No payment required`, sans cadrage gambling.

Sur `/questions`, la liste charge avec `Questions (44 open)` et la question Apple Mac Pro est découvrable en premier dans `Closing Soon`. Les cartes affichent la catégorie, le temps restant et le texte `Lock your call before the crowd can shape it`. Je n’ai pas vu de probabilité de consensus avant forecast ni de nombre exact de forecasters sur la liste. Le lien Apple découvert depuis la liste est `https://baycast-p.vercel.app/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`.

Sur la page détail Apple Mac Pro, la question reste ouverte. Le header affiche `13d left`, le bloc forecast est actif, et le crowd signal public reste verrouillé: `Community signal` puis `Community signal locked`, sans pourcentage public. Aucun nombre exact de forecasters n’est visible. La page affiche bien `Jun 13, 2026` comme date de clôture visible, ce qui est cohérent avec l’interdiction de settlement avant `2026-06-13T00:00:00+00:00`. Aucun état de résolution ou de settlement anticipé n’est affiché.

Le libellé de résolution Apple est clair: `Resolves Yes if Apple announces a new Mac Pro model during WWDC 2026 or in an Apple Newsroom post dated from 2026-06-08 through 2026-06-12`. Les seuls liens de contexte visibles dans le contenu principal sont `Apple WWDC` vers `https://developer.apple.com/wwdc26/` et `Apple Newsroom` vers `https://www.apple.com/newsroom/`. Les autres liens de la page sont seulement des liens d’authentification ou de navigation du site. La source de résolution reprend les deux mêmes sources officielles Apple.

Sur `/leaderboard`, aucun classement prématuré n’est publié. La page indique que les scores apparaissent après résolution: `Scores appear after questions resolve`. C’est conforme au gate public: pas de scores issus de questions encore ouvertes et pas de données de forecast exposées.

Sur `/activity`, aucun row d’activité pour question ouverte n’est visible. La page indique `Public forecasting activity appears after questions resolve` puis `Open-question forecasts stay hidden until resolution so every forecaster starts blind`. Ce point valide le comportement BCP public attendu pour le feed.

## Verdict

Gate produit AQ-296 validé sur le site live à 19h UTC. Le Blind Consensus est respecté sur les pages publiques testées: pas de probabilité de consensus avant forecast, pas de nombres exacts de forecasters et pas d’activité publique pour questions ouvertes. La question Apple Mac Pro reste ouverte, limitée aux sources Apple WWDC et Apple Newsroom, sans settlement visible avant `2026-06-13T00:00:00+00:00`.

Point mineur à garder en tête: `Free to play` apparaît sur l’accueil. Je ne le considère pas bloquant dans ce test, car il n’y a pas de vocabulaire de pari ou d’argent autour, mais le wording pourrait être remplacé plus tard si l’équipe veut un ton encore plus net côté prediction polling.
