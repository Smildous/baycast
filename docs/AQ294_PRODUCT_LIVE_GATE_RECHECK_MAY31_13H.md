# AQ-294 product live gate recheck, May 31 13h UTC

Recheck fait le 2026-05-31 à 13:02 UTC sur `https://baycast-p.vercel.app`. Je n'ai pas lu la table `forecasts` ni de données de forecast côté base.

La home charge correctement. Elle présente Baycast comme un produit de prédiction et de scoring, avec des cartes de questions publiques. La carte Apple Mac Pro est visible dans le bloc live questions. Je n'ai pas vu de probabilité de consensus, de compteur précis de forecasters, d'activité de forecast ouvert, ni de vocabulaire de pari.

`/questions` charge correctement avec la liste, les filtres, la pagination et Apple Mac Pro en première page. Les cartes montrent catégorie, temps restant, titre et le message `Lock your call before the crowd can shape it`. Le filtre `Most Active` reste visible, mais il n'affiche pas de métrique d'activité ouverte dans l'état observé. Pas de consensus public, pas de compteur exact de forecasters, pas de framing gambling.

La route Apple Mac Pro découverte depuis la liste est `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`. Elle affiche la question, les critères de résolution, la fermeture au 13 juin 2026, le module de forecast et le bloc `Community signal locked`. Les liens de contexte sont pertinents pour Apple, avec `Apple WWDC` et `Apple Newsroom`. Aucun signal communautaire chiffré n'est visible avant le forecast.

`/leaderboard` charge avec l'état attendu: les scores apparaissent après résolution. Je n'ai pas vu de scores prématurés ni de signal sur des questions ouvertes.

`/activity` charge avec l'état attendu: l'activité apparaît après résolution. Je n'ai pas vu d'activité de forecasts ouverts.

Conclusion: gate BCP OK pour la première candidate Apple Mac Pro. Aucun bug produit bloquant évident à corriger dans cette passe. Je n'ai modifié que ce rapport.
