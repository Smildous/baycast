# AQ-353 product live gate recheck, 2026-06-10 07h UTC

Recheck fait sur https://baycast-p.vercel.app à 2026-06-10T07:02:27Z. Je n'ai pas lu la table `forecasts` ni de donnée de forecast côté base.

Verdict: PASS.

La home charge correctement. Les cartes visibles restent en mode appel indépendant: `Lock your call before the crowd can shape it`. Je n'ai pas vu de probabilité de consensus, de compteur exact de forecasters, d'activité liée aux questions ouvertes, de cadrage gambling, ni de contrôle public de settlement. La page parle de prévisions, de score et d'usage gratuit, pas de pari ni de mise.

Sur `/questions`, la liste affiche `Questions(44 open)` et la question Apple Mac Pro en premier avec `3d left`. C'est un compteur de questions ouvertes, pas un compteur de participation. Les cartes ne montrent pas de consensus public, pas de nombre de forecasters, pas d'activité ouverte.

Sur la page détail Apple Mac Pro, route `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`, la question est encore ouverte: le formulaire `Add your forecast` est visible, avec `Sign up to forecast` et `Log in`. Le signal communautaire reste verrouillé: `Community signal locked`, sans probabilité publiée et sans compteur exact. Aucun bouton ou contrôle public de settlement n'est visible.

La gate first-settlement tient. Le JSON-LD de la page indique `dateModified: 2026-06-13T00:00:00+00:00`, utilisé comme close time public vérifiable. La page affiche `Jun 13, 2026` pour la clôture et les sources de résolution sont publiques: Apple WWDC et Apple Newsroom, avec `https://developer.apple.com/wwdc26/` et `https://www.apple.com/newsroom/`. La règle de résolution couvre les annonces datées du 2026-06-08 au 2026-06-12 et ne permet pas de settlement avant la clôture du 2026-06-13T00:00:00+00:00.

Sur `/leaderboard`, la page dit `Scores appear after questions resolve`. Rien ne révèle l'activité des questions ouvertes, le consensus ou un nombre exact de forecasters.

Sur `/activity`, la page dit `Activity appears after questions resolve`. C'est le comportement attendu: pas d'activité publique pour les questions ouvertes.

Conclusion: la surface publique vérifiée respecte BCP et la première settlement gate. Apple Mac Pro reste ouverte, ses sources sont publiques, et rien dans l'UI testée ne permet une résolution publique avant le close.
