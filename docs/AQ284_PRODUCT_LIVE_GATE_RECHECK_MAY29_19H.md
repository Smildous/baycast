# AQ-284 Product live gate recheck, 29 mai 2026 19h UTC

Recheck fait sur `https://baycast-p.vercel.app` à 2026-05-29T19:02:55Z, depuis le navigateur public, sans session connectée. Je n'ai pas interrogé ni lu la table `forecasts`, ni aucun payload d'API de forecast.

Verdict: GO pour garder Apple Mac Pro comme premier candidat de settlement.

La homepage reste conforme au Blind Consensus Protocol. Elle affiche les questions live, dont Apple Mac Pro, avec le cadrage "Lock your call before the crowd can shape it". Je n'ai vu ni probabilité de consensus, ni nombre exact de forecasters, ni activité de question ouverte, ni vocabulaire de pari, betting ou gambling. Le produit parle de forecast, d'indépendance du premier call, de crowd signal et de score contre la réalité.

Sur `/questions`, la page affiche `Questions (44 open)`. La question "Will Apple announce a new Mac Pro at WWDC 2026?" est visible avec `15d left`. Les cartes ne montrent pas de probabilité agrégée, pas de compteur précis par question et pas de ligne d'activité ouverte. Le filtre `Most Active` existe, mais il n'expose pas de métrique publique sur les questions ouvertes dans l'état observé.

La fiche Apple Mac Pro est accessible à `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`. Elle affiche la catégorie Technology, `15d left`, la question, les critères de résolution, le formulaire "Add your forecast" et les CTA "Sign up to forecast" et "Log in". Le bloc public indique "Lock your forecast before the crowd can shape it" et "Community signal locked". La clôture visible est `Jun 13, 2026`. Aucun état resolved, aucune décision Yes ou No, aucun settlement, aucune probabilité collective et aucun compteur exact ne sont visibles. Le candidat reste donc ouvert, sans settlement public avant 2026-06-13T00:00:00+00:00.

Sur `/leaderboard`, la page indique "Scores appear after questions resolve". Aucun classement prématuré, aucun détail de forecast ouvert et aucun signal de participation par question ouverte n'apparaissent.

Sur `/activity`, la page indique "Activity appears after questions resolve". Aucune activité de question ouverte n'est publiée.

Point mineur: la fiche Apple garde le placeholder visuel autour de "Community signal" avec le signal verrouillé. Ce n'est pas une fuite BCP.

Conclusion: les surfaces publiques testées respectent le gate BCP à 19h UTC. Apple Mac Pro reste ouvert, ferme le 13 juin 2026 UTC, et rien ne montre un settlement anticipé.
