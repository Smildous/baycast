# AQ-263 Product live gate recheck, 25 mai 2026 19h

Décision: PASS.

J'ai vérifié la production publique sur `https://baycast-p.vercel.app` uniquement via le navigateur. Pas de requête Supabase. Pas de lecture de table `forecasts`.

Pages vues: `/`, `/questions`, `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`, `/leaderboard`, `/activity`.

Sur `/`, la page charge correctement avec les liens principaux et les cartes de questions. La carte Apple Mac Pro est visible avec `19d left` et le texte `Lock your call before the crowd can shape it`. Je n'ai pas vu de probabilité de consensus avant forecast, pas de nombre exact de forecasters, pas de copie gambling.

Sur `/questions`, la liste affiche `Questions(44 open)` et la question `Will Apple announce a new Mac Pro at WWDC 2026?`. Les cartes restent en mode blind, avec `Lock your call before the crowd can shape it`. Aucun score de consensus, aucun nombre de forecasters, aucune activité de forecast ouverte n'est exposée. Le seul nombre global visible est le nombre de questions ouvertes, pas un compteur de forecasters.

La page directe Apple Mac Pro est bien disponible: `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`. Elle affiche `Technology`, `19d left`, le titre attendu, les critères de résolution, les liens de contexte et le bloc `Add your forecast`. Le signal public reste fermé: `Community signal locked`, avec des tirets à la place de la valeur. Le CTA dit `Sign up to save your probability, unlock the comparison after your call, and start building a streak and profile score.` La question est encore ouverte, avec `Jun 13, 2026` comme date de clôture. Je n'ai vu aucun état settled, resolved ou fermé avant `2026-06-13T00:00:00+00:00`.

Sur `/leaderboard`, la page affiche `Scores appear after questions resolve`. C'est cohérent avec le gate public: pas de score prématuré, pas de leaderboard rempli avant résolution, pas de compteur de forecasters exposé.

Sur `/activity`, la page affiche `Activity appears after questions resolve` et précise que les forecasts sur questions ouvertes restent cachés jusqu'à résolution. Je n'ai pas vu de fuite d'activité liée à des forecasts ouverts.

Copie sensible: pas de `bet`, `betting`, `gambling`, `wager`, `odds`, `payout`, `stake` ou `casino` vu dans les textes publics vérifiés.

Conclusion: PASS pour le live gate public BCP à 19h. Le consensus reste caché avant forecast, l'activité ouverte reste cachée, les counts de forecasters ne sont pas exposés, la copie ne pousse pas vers le gambling, et Apple Mac Pro est encore ouverte avec clôture au 13 juin 2026.
