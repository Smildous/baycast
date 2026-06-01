# AQ-301 product live gate recheck, 1 juin 2026 13h UTC

Contrôle fait sur la production `baycast-p.vercel.app` le 2026-06-01 à 13:02 UTC. Je n'ai pas consulté la table `forecasts`, ni de donnée brute de forecast. Ce recheck est limité aux surfaces publiques vues dans le navigateur.

## Décision

Pass.

La question Apple Mac Pro est encore ouverte côté public. La page annonce une fermeture au 13 juin 2026 et ne montre pas de résolution, de résultat, ni de signal communautaire lisible avant la contribution utilisateur. Je ne vois pas de consensus en probabilité, pas de nombre exact de forecasters, pas d'activité liée à des questions ouvertes, pas de cadrage gambling. Le contexte Apple reste borné à WWDC et Apple Newsroom.

## URLs vérifiées

Homepage: `https://baycast-p.vercel.app/`, pass.

Questions: `https://baycast-p.vercel.app/questions`, pass.

Question Apple Mac Pro: `https://baycast-p.vercel.app/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`, pass.

Leaderboard: `https://baycast-p.vercel.app/leaderboard`, pass.

Activity: `https://baycast-p.vercel.app/activity`, pass.

## Evidence relevée

La homepage affiche la question `Will Apple announce a new Mac Pro at WWDC 2026?` dans les questions live. La carte indique `12d left` et `Lock your call before the crowd can shape it`. Elle ne montre pas de probabilité de consensus, pas de total de participants et pas de résultat.

La page `/questions` affiche `Questions(44 open)`. La question Apple apparaît en tête de `Closing Soon`, avec `Technology`, `12d left` et le même message de verrouillage avant le crowd. Le tri `Most Active` existe comme lien de navigation, mais la liste publique observée ne donne pas d'activité ouverte, pas de compte exact de forecasters et pas de signal probabiliste.

La route Apple Mac Pro découverte depuis l'UI est `https://baycast-p.vercel.app/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`. La page montre le titre, le statut `12d left`, `Community signal locked`, `Jun 13, 2026` comme clôture, et le formulaire `Add your forecast`. Elle ne montre ni consensus, ni nombre exact de forecasters, ni résolution. Le texte de résolution dit que le Yes dépend d'une annonce Apple pendant WWDC 2026 ou d'un post Apple Newsroom daté du 2026-06-08 au 2026-06-12. Les liens de contexte présents sont seulement `Apple WWDC` et `Apple Newsroom`, avec la note que ce sont des liens statiques et qu'aucun live news feed n'est chargé.

La page `/leaderboard` affiche `Scores appear after questions resolve`. Elle ne publie pas de score lié à la question ouverte et ne donne pas de signal d'activité ouverte.

La page `/activity` affiche `Activity appears after questions resolve`. Elle ne montre pas de forecast récent, pas de nom, pas de compte, pas d'événement d'une question ouverte.

## BCP public surfaces

Pas de probabilité de consensus publique: pass. La page Apple masque le signal derrière `Community signal locked`.

Pas de nombre exact de forecasters: pass. Aucun compte exact vu sur les surfaces testées.

Pas d'activité de question ouverte: pass. Activity et leaderboard attendent les questions résolues.

Pas de cadrage gambling: pass. Le vocabulaire observé parle de forecast, prediction polling, scoring, free to use. Pas de pari, cote, mise ou payout vu.

Contexte Apple borné: pass. Les seules sources Apple vues sont WWDC et Apple Newsroom.

## Gate de premier settlement

Pass.

La candidate reste ouverte en production. La preuve publique est `12d left`, `Add your forecast`, `Community signal locked` et `Jun 13, 2026` comme date de clôture. Rien sur les pages testées ne montre un settlement, une résolution Yes ou No, ni un score pour cette question.

Décision AQ-301 à 13h UTC: garder le gate fermé au settlement. Aucun settlement avant `2026-06-13T00:00:00+00:00`.