# AQ-315, recheck product live gate, 3 juin 19h UTC

Verdict settlement aujourd'hui: NO-GO.

Contrôle fait à 19:02 UTC sur `https://baycast-p.vercel.app` après `git fetch origin && git reset --hard origin/main` dans `/root/baycast-product`. Je n'ai pas lu ni interrogé la table `forecasts`.

Le candidat first-settlement reste Apple Mac Pro: `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`, titre `Will Apple announce a new Mac Pro at WWDC 2026?`. La home le montre dans `Live questions` avec `Technology`, `10d left` et `Lock your call before the crowd can shape it`. `/questions` répond avec `Questions(44 open)` et place aussi cette question en tête de `Closing Soon` avec le même statut `10d left`.

La page détail est atteignable et la question est encore ouverte côté produit. Elle affiche `Add your forecast`, le slider de forecast, `Sign up to forecast`, `Community signal locked`, `Jun 13, 2026` sous `Closes`, et le texte de résolution: `Resolves Yes if Apple announces a new Mac Pro model during WWDC 2026 or in an Apple Newsroom post dated from 2026-06-08 through 2026-06-12`. La donnée structurée visible dans la page contient `dateModified: 2026-06-13T00:00:00+00:00`. Donc elle ne doit pas être settleable avant `2026-06-13T00:00:00+00:00`.

BCP public: conforme sur les surfaces vérifiées. Je n'ai vu aucune probabilité de consensus avant forecast, aucun nombre exact de forecasters, et aucune activité publique pour des questions ouvertes. Le détail remplace le signal par `Community signal locked`. `/activity` dit `Public forecasting activity appears after questions resolve` puis `Open-question forecasts stay hidden until resolution so every forecaster starts blind`. `/leaderboard` dit `Scores appear after questions resolve` et précise que les scores démarrent seulement quand une question a un outcome final.

Contexte Apple: les seuls liens de contexte visibles sur le détail Apple Mac Pro sont `Apple WWDC` vers `https://developer.apple.com/wwdc26/` et `Apple Newsroom` vers `https://www.apple.com/newsroom/`. Le texte de source de résolution reprend uniquement ces deux sources.

Cadrage produit: les pages `/`, `/questions`, le détail Apple Mac Pro, `/leaderboard` et `/activity` parlent de predictions, forecasts, crowd signal, accuracy, scored by reality, free to play. Je n'ai pas vu de framing gambling dans les textes inspectés: pas de bet, betting, wager, stake, payout, odds, casino ou book.

Issue trouvée: aucune issue bloquante pour le gate. La date exacte UTC de clôture est dans la donnée structurée, tandis que l'UI visible affiche la date courte `Jun 13, 2026`. Ça ne change pas le verdict.

Conclusion directe: ne pas régler aujourd'hui. Apple Mac Pro reste ouvert, la foule reste masquée avant le premier forecast, l'activité ouverte reste cachée, et le gate settlement reste fermé jusqu'au 13 juin 2026 à 00:00 UTC au plus tôt.
