# AQ-323 product live gate recheck, Jun 05 07h

Check fait le 2026-06-05T07:02:32Z sur `https://baycast-p.vercel.app`, depuis le clone `/root/baycast-product` remis sur `origin/main` avant le fichier.

Je n'ai lu aucune table `forecasts`, aucun export de forecasts, aucune donnée Supabase et aucune API de prévisions. Les preuves viennent seulement du rendu public dans le navigateur et du DOM public de ces pages.

Routes vérifiées: `/`, `/questions`, `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`, `/leaderboard`, `/activity`.

Résultat: gate OK pour AQ-323 côté produit.

Sur `/`, la carte Apple Mac Pro est visible dans les questions live avec le libellé `Will Apple announce a new Mac Pro at WWDC 2026?`, catégorie Technology, `8d left`, et le texte `Lock your call before the crowd can shape it`. Je n'ai vu ni probabilité de consensus, ni nombre exact de forecasters, ni activité de forecast ouverte, ni vocabulaire de pari ou de gambling.

Sur `/questions`, la question Apple Mac Pro est en tête de `Closing Soon`, toujours `Technology`, `8d left`, avec le même texte de verrouillage avant influence de la foule. La page affiche `Questions(44 open)`, qui est un total de questions ouvertes, pas un nombre de forecasters. Aucun consensus, aucun pourcentage communautaire, aucun compte de participants ou de forecasts ouvert n'était visible.

La route détail découverte depuis le site est `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`. La question est ouverte côté produit: le rendu affiche `Add your forecast`, un slider local à 50%, les boutons 5%, 10%, 25%, 50%, 75%, 90%, 95%, puis `Sign up to forecast` et `Log in`. Le signal public reste masqué avec `— Community signal — Community signal locked`. La page affiche `Jun 13, 2026` comme clôture, et le JSON-LD public de la page indique `dateModified: 2026-06-13T00:00:00+00:00`, ce qui confirme la clôture attendue `2026-06-13T00:00:00+00:00`. Je n'ai vu aucune probabilité de consensus, aucun nombre de forecasters et aucune activité ouverte.

Les liens de contexte visibles sur le détail sont uniquement `Apple WWDC` vers `https://developer.apple.com/wwdc26/` et `Apple Newsroom` vers `https://www.apple.com/newsroom/`. Le texte précise aussi: `Static reference links that may help frame the question. No live news feed is loaded here.` La source de résolution visible reste `Apple WWDC and Apple Newsroom` avec ces deux URL.

Sur `/leaderboard`, la page affiche `Scores appear after questions resolve`. Aucun classement, aucune probabilité, aucun compte de forecasters et aucune activité liée à une question ouverte n'était visible.

Sur `/activity`, la page affiche `Public forecasting activity appears after questions resolve` et `Open-question forecasts stay hidden until resolution so every forecaster starts blind. Check back after the first outcomes are settled.` C'est conforme au blind consensus: aucune activité de forecast ouverte n'était visible.

Conclusion: AQ-323 reste ouverte, clôture le `2026-06-13T00:00:00+00:00`, ne montre pas de consensus ou de participation avant forecast/résolution, ne montre pas d'activité ouverte, et garde un framing prediction polling plutôt que gambling.
