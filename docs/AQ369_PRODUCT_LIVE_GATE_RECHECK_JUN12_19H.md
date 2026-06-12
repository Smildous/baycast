# AQ-369 product live gate recheck, 12 juin 2026, 19h UTC

J'ai repris le site public de production sur https://baycast-p.vercel.app/ après mise à jour locale de main. Je n'ai pas lu Supabase `forecasts` et je n'ai pas interrogé de lignes de prévision.

Sur la home, le site charge normalement. Les cartes de questions montrent le titre, la catégorie et le temps restant. La question Apple Mac Pro est visible dans les questions live avec `1d left`. Je n'ai pas vu de probabilité de consensus, de nombre exact de forecasters, de vocabulaire de pari, ni de contrôle public de règlement.

Sur `/questions`, la liste affiche `Questions(44 open)` et la question `Will Apple announce a new Mac Pro at WWDC 2026?` en première position dans `Closing Soon`. Le lien public mène à `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`. La carte dit encore `Lock your call before the crowd can shape it`; elle ne publie ni BCP, ni count de forecasters.

Sur le détail Apple Mac Pro, la page montre la règle de résolution et les sources Apple WWDC et Apple Newsroom. Le bloc public reste verrouillé: `Community signal locked`, avec des tirets à la place du signal. Le slider à 50% est l'entrée de prévision locale proposée au visiteur signé out, pas un consensus public. Aucun bouton de settlement ou d'admin n'est exposé. La page affiche `Jun 13, 2026` comme clôture et le JSON-LD public de la page contient `2026-06-13T00:00:00+00:00`, ce qui garde la question ouverte jusqu'à cette heure.

Sur `/leaderboard`, l'état public est `Scores appear after questions resolve`. Aucun score exploitable, aucune probabilité collective et aucun count exact ne sont affichés.

Sur `/activity`, l'état public est `Activity appears after questions resolve`. Je n'ai pas vu d'activité sur questions ouvertes. C'est le comportement attendu pour éviter une fuite de signal avant forecast.

Verdict: NO-GO pour settlement avant la clôture. Les garde-fous publics observés sont bons pour AQ-369, mais la question Apple Mac Pro est encore ouverte jusqu'à `2026-06-13T00:00:00+00:00`. Il faut attendre la clôture avant tout règlement. Après clôture, le passage au premier settlement peut être repris avec les sources de résolution, sans exposition publique du consensus ni des counts.