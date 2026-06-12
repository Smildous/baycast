# AQ-365 product live gate recheck, 12 juin 2026, 07h UTC

Résultat: conforme pour le gate produit AQ-365.

J'ai contrôlé la production sur `https://baycast-p.vercel.app/` à partir du navigateur, sans lire de donnée de forecast côté base. Je n'ai lu aucune ligne de prévision et je n'ai pas lu la table `forecasts`.

Routes vues:

- `/`
- `/questions`
- `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`, trouvée depuis la page publique des questions
- `/leaderboard`
- `/activity`

Ce que j'ai constaté:

La page d'accueil montre Baycast comme un produit de prediction polling. Les textes visibles parlent de forecasts, de questions, de crowd predictions et de score par la réalité. Je n'ai pas vu de cadrage gambling, pas de mise, pas de cote, pas de payout.

La liste `/questions` affiche `Questions (44 open)` et la question Apple Mac Pro en premier dans `Closing Soon`. La carte dit `1d left` et `Lock your call before the crowd can shape it`. Elle ne montre pas de probabilité de consensus publique et ne donne pas de nombre exact de forecasters.

La page Apple Mac Pro est ouverte au public et reste forecastable. Le titre vu est `Will Apple announce a new Mac Pro at WWDC 2026?`. La page affiche `Lock your forecast before the crowd can shape it`, `Community signal locked` et la date visible `Jun 13, 2026` pour la clôture. Le payload de la page chargée en production contient bien la clôture exacte `2026-06-13T00:00:00+00:00`.

Sur cette page de détail, je n'ai pas vu de consensus probability publique. Le bloc community signal est verrouillé. Je n'ai pas vu de nombre exact de forecasters. Je n'ai pas vu de contrôle public de settlement, seulement les actions anonymes attendues pour forecast, signup et login.

`/leaderboard` affiche `Scores appear after questions resolve`. Rien n'y expose de signal d'une question ouverte, pas de probabilité agrégée et pas de compte exact de forecasters.

`/activity` affiche `Activity appears after questions resolve`. Je n'ai pas vu d'activité publique sur question ouverte.

Conclusion: à 07h UTC, le gate reste bon. La question Apple Mac Pro n'est pas réglée publiquement, elle reste ouverte jusqu'à `2026-06-13T00:00:00+00:00`, et les surfaces publiques contrôlées ne publient ni consensus, ni compte exact de forecasters, ni activité d'open question, ni contrôle de settlement public.
