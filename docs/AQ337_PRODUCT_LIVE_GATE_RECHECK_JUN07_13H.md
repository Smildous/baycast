# AQ-337 product live gate recheck, 7 juin 2026, 13h UTC

Contrôle fait en production le 2026-06-07T13:02:32Z. Je n’ai pas lu la table Supabase `forecasts` et je n’ai pas utilisé de données privées de prévision. Le contrôle porte sur les pages publiques Baycast et sur le comportement visible côté produit.

Verdict settlement timing : NO-GO maintenant. La question Apple Mac Pro est encore ouverte en production, affichée avec `6d left`, et la date visible de clôture est `Jun 13, 2026`. Le premier moment acceptable pour préparer un règlement reste 2026-06-13T00:00:00+00:00. Avant cette date, aucun settlement ne doit partir.

Pages contrôlées :

https://baycast-p.vercel.app/
La home affiche Baycast comme un produit de prédiction et de score, pas comme du pari. Le bloc live montre la carte `Will Apple announce a new Mac Pro at WWDC 2026?` avec `Technology`, `6d left` et `Lock your call before the crowd can shape it`. Aucun pourcentage de consensus n’est visible sur la carte. Aucun nombre exact de forecasters n’est visible. Les termes de type pari, mise, odds, payout, wager ou gambling ne sont pas visibles. Le mot consensus apparaît seulement dans une phrase de principe : `You answer before seeing the crowd, so your forecast adds a real signal instead of copying consensus.`

https://baycast-p.vercel.app/questions
La liste Questions affiche `Questions(44 open)` et classe la question Apple Mac Pro en tête de `Closing Soon`. La carte visible est `Technology`, `6d left`, `Will Apple announce a new Mac Pro at WWDC 2026?`, `Lock your call before the crowd can shape it`. Le lien découvert depuis la liste pointe vers https://baycast-p.vercel.app/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248. Aucun consensus chiffré n’est affiché. Aucun nombre de forecasters n’est affiché sur la question. Aucun framing gambling n’est visible.

https://baycast-p.vercel.app/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248
La page détail confirme la question `Will Apple announce a new Mac Pro at WWDC 2026?`. Le texte de résolution visible dit que le Yes dépend d’une annonce Apple pendant WWDC 2026 ou d’un Apple Newsroom post daté du 2026-06-08 au 2026-06-12, et que l’absence d’annonce dans cette fenêtre résout No. Les liens de contexte sont Apple WWDC et Apple Newsroom. La zone signal communautaire reste verrouillée : deux tirets sont affichés autour de `Community signal`, puis `Community signal locked`. La date visible de fermeture est `Jun 13, 2026`. Aucun consensus probability n’est visible, aucun exact forecaster count n’est visible, et aucun historique public de forecasts ouverts n’est visible. La page permet seulement une intention utilisateur non connectée via `Add your forecast`, un slider par défaut à 50%, des boutons 5%, 10%, 25%, 50%, 75%, 90%, 95%, puis `Sign up to forecast` et `Log in`. C’est cohérent avec du polling aveugle, mais ça confirme aussi que la question n’est pas close.

https://baycast-p.vercel.app/leaderboard
La page Leaderboard affiche `Scores appear after questions resolve`. Le texte dit que les forecasts sont live maintenant, mais que les scores commencent seulement quand une question a un outcome final. Aucun classement actif, aucun nombre exact de forecasters par question, aucun consensus et aucun élément gambling ne sont visibles.

https://baycast-p.vercel.app/activity
La page Activity affiche `Public forecasting activity appears after questions resolve` et `Open-question forecasts stay hidden until resolution so every forecaster starts blind.` C’est le point BCP le plus important du recheck : pas d’activité de forecast ouverte exposée publiquement. Aucun consensus, aucun compte exact de forecasters, aucun odds, aucune mise et aucun payout ne sont visibles.

Conclusion directe : le gate produit tient pour la sécurité BCP publique. Les signaux de foule restent verrouillés, l’activité ouverte reste cachée, et le ton produit reste prediction polling / scoring. En revanche, le règlement AQ-337 ne doit pas être lancé maintenant. Recheck settlement uniquement à partir de 2026-06-13T00:00:00+00:00, avec les sources Apple prévues, sans lecture des forecasts pour la préparation.
