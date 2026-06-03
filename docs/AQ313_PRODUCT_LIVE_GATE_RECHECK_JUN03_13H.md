# AQ-313, recheck product live gate, 3 juin 13h UTC

Verdict settlement aujourd'hui: NO-GO.

Contrôle fait à 13:03 UTC sur `https://baycast-p.vercel.app` après sync de `/root/baycast-product` sur `origin/main`. Je n'ai pas lu la table `forecasts`.

Le candidat first-settlement reste Apple Mac Pro: `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`, titre `Will Apple announce a new Mac Pro at WWDC 2026?`. La home et `/questions` le montrent en premier dans les questions live, catégorie Technology, `10d left`, avec le texte `Lock your call before the crowd can shape it`. `/questions` affiche `Questions(44 open)`. La page détail affiche encore le formulaire `Add your forecast`, le lien `Sign up to forecast`, le statut public `Community signal locked` et la date `Jun 13, 2026` sous `Closes`. Le JSON structuré de la page donne `dateModified: 2026-06-13T00:00:00+00:00`. Donc pas de règlement avant `2026-06-13T00:00:00+00:00`.

BCP côté produit: conforme sur les surfaces testées. Je n'ai vu aucune probabilité de consensus publiée, aucun nombre exact de forecasters, et aucune activité publique liée à des forecasts ouverts. La page détail remplace le signal par `Community signal locked`. `/activity` dit `Public forecasting activity appears after questions resolve` et `Open-question forecasts stay hidden until resolution so every forecaster starts blind`. `/leaderboard` dit `Scores appear after questions resolve` et précise que les scores démarrent quand une question a un outcome final.

Les pages visitées répondent et restent dans le cadrage prediction polling: home, `/questions`, le détail Apple Mac Pro, `/leaderboard`, `/activity`. Les textes visibles parlent de forecasts, crowd, accuracy, scored by reality, free to play. Je n'ai pas trouvé de framing gambling sur ces surfaces: pas de bet, betting, wager, stake, payout, odds, casino ou book dans les textes inspectés.

Issue trouvée: aucune issue bloquante pour le gate BCP. Petite limite produit à noter seulement: la page détail rend la clôture en date courte `Jun 13, 2026`; l'horodatage exact UTC est présent dans la donnée structurée, pas dans le libellé visible. Ça ne change pas le verdict.

Conclusion directe: ne pas régler aujourd'hui. Le premier candidat est toujours ouvert, l'interface garde les forecasts aveugles, et le gate reste fermé jusqu'à la clôture Apple Mac Pro au plus tôt le 13 juin 2026 à 00:00 UTC.
