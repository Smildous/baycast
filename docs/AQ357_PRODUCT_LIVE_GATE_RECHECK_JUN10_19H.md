# AQ-357 product live gate recheck, 10 juin 19h

Routes vérifiées sur `https://baycast-p.vercel.app` : `/`, `/questions`, le détail public Apple Mac Pro découvert depuis `/questions`, `/leaderboard`, `/activity`.

Verdict : gate public BCP encore bon pour la mise en prod contrôlée. Les pages publiques ne montrent pas de probabilité de consensus, pas de nombre exact de forecasters, pas d’activité liée aux questions ouvertes, pas de cadrage pari ou gambling, et aucun contrôle public de settlement.

Évidence relevée en live :

`/` affiche `44 Questions live now`, `100% Free to play`, puis des cartes avec `Lock your call before the crowd can shape it`. Aucun pourcentage de foule et aucun compteur de forecasters visibles.

`/questions` affiche `Questions(44 open)` et la carte `Will Apple announce a new Mac Pro at WWDC 2026?`, marquée `3d left`, avec le même texte `Lock your call before the crowd can shape it`. Les filtres publics restent classiques : `Open`, `Closed`, `Resolved`, `Closing Soon`, `Newest`, `Most Active`.

Le détail Apple Mac Pro reste ouvert. La page affiche `3 d left`, `Community signal locked`, `Jun 13, 2026` comme clôture, et le texte de résolution : `Resolves Yes if Apple announces a new Mac Pro model during WWDC 2026 or in an Apple Newsroom post dated from 2026-06-08 through 2026-06-12`. Il n’y a pas de bouton de résolution, pas de contrôle admin, pas de settlement public. La clôture confirmée correspond à 2026-06-13T00:00:00+00:00, donc pas de settlement avant cette date.

`/leaderboard` affiche `Scores appear after questions resolve`. Rien ne révèle les calls ouverts.

`/activity` affiche `Activity appears after questions resolve`. Rien ne publie l’activité des questions ouvertes.

Je n’ai pas lu la table `forecasts`, ni aucune donnée de forecast. La vérification a été faite uniquement via les routes publiques au navigateur.

Next gate : refaire le contrôle à la clôture Apple Mac Pro, pas avant 2026-06-13T00:00:00+00:00, puis vérifier que le settlement et les surfaces publiques ne s’ouvrent qu’après la fermeture attendue.
