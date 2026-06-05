# AQ-327 product live gate recheck, 2026-06-05 19h UTC

Verdict: GO for first settlement readiness. The public product surfaces still protect Blind Consensus, and the Apple Mac Pro candidate remains open with no visible settlement path before `2026-06-13T00:00:00+00:00`.

Recheck fait sur `baycast-p.vercel.app` pour le créneau `2026-06-05 19h UTC`. Je n'ai pas lu la table `forecasts`, je n'ai pas appelé d'API de forecast, et je n'ai pas ouvert de surface privée. Les constats viennent uniquement des pages publiques rendues dans le navigateur.

Pages vérifiées:

- `https://baycast-p.vercel.app/`
- `https://baycast-p.vercel.app/questions`
- `https://baycast-p.vercel.app/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`
- `https://baycast-p.vercel.app/leaderboard`
- `https://baycast-p.vercel.app/activity`

BCP tient sur les pages testées. Je n'ai vu aucune probabilité de consensus, aucun pourcentage de crowd, aucun nombre exact de forecasters, et aucune activité liée à une question ouverte. Les cartes visibles restent sur `Lock your call before the crowd can shape it` ou `Lock your forecast before the crowd can shape it`, ce qui garde l'appel initial indépendant.

La home affiche le framing général Baycast, les questions live et le parcours forecast. Elle ne montre pas de consensus ni de compte de forecasters. La page `/questions` affiche `Questions(44 open)`, les filtres publics, et la carte Apple Mac Pro en premier dans `Closing Soon` avec `8d left`. Ce compteur est un nombre de questions ouvertes, pas un compte de forecasters.

La route détail Apple Mac Pro découverte depuis l'UI est:

`https://baycast-p.vercel.app/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`

Elle affiche `Technology`, `8d left`, `Will Apple announce a new Mac Pro at WWDC 2026?`, `Community signal locked`, `Jun 13, 2026` comme clôture, et un formulaire `Add your forecast` avec inscription ou login requis pour sauvegarder. Je n'ai vu aucun état resolved, aucun résultat, aucun bouton de settlement, et aucun signe de règlement avant `2026-06-13T00:00:00+00:00`. Le statut produit visible reste donc open.

Les liens de contexte visibles sur la page Apple sont pertinents pour la résolution:

- Apple WWDC, `https://developer.apple.com/wwdc26/`
- Apple Newsroom, `https://www.apple.com/newsroom/`

La page `/leaderboard` affiche `Scores appear after questions resolve`. Elle ne révèle pas de ranking exploitable avant résolution, pas de consensus, et pas de compte exact lié aux questions ouvertes.

La page `/activity` affiche `Activity appears after questions resolve`. Elle ne montre aucun flux d'activité pour des questions ouvertes.

Côté framing, les surfaces publiques restent sur prediction polling, forecast, score, Brier score, crowd signal et collective intelligence. Je n'ai pas vu de vocabulaire de pari comme bet, wager, odds, stake, cashout, payout, bookmaker, casino ou gambling. La home dit `Free to play`, sans argent, mise, cote ou promesse de gain. Le cadrage reste prediction polling, pas gambling.

Aucun bug live petit et sûr à corriger n'a été trouvé pendant ce passage. Aucun fichier AQ325 ou AQ326 n'a été modifié.
