# AQ-282 Product live gate recheck, 29 mai 2026 13h UTC

Recheck fait sur `https://baycast-p.vercel.app` à 2026-05-29T13:02:19Z, depuis le navigateur public, sans session connectée. Je n'ai pas interrogé ni lu la table `forecasts`.

Verdict: GO pour la préparation du premier settlement.

La page d'accueil reste propre pour le Blind Consensus Protocol. Elle montre les questions ouvertes, dont Apple Mac Pro, avec le message "Lock your call before the crowd can shape it". Je n'ai vu ni probabilité de consensus, ni nombre exact de forecasters, ni ligne de forecast ouverte, ni vocabulaire de marché, pari ou gambling. Le texte parle de forecasts, de crowd signal après contribution, et de scoring par la réalité.

Sur `/questions`, la liste affiche `Questions (44 open)` et les cartes ouvertes. La question Apple Mac Pro est présente avec `15d left`. La liste ne donne pas de probabilité agrégée, pas de compteur précis par question, pas d'activité de forecasts ouverts. Les filtres `Open`, `Closed`, `Resolved`, `Closing Soon`, `Newest` et `Most Active` sont visibles, sans fuite de signal BCP sur les cartes.

La fiche Apple Mac Pro est accessible à `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`. Elle affiche la question "Will Apple announce a new Mac Pro at WWDC 2026?", la catégorie Technology, `15d left`, le formulaire public "Add your forecast" et le CTA "Sign up to forecast". Le bloc public garde le signal verrouillé: "Lock your forecast before the crowd can shape it" et "Community signal locked". La clôture affichée est `Jun 13, 2026`. Aucun résultat de settlement, aucun état resolved, aucune décision Yes ou No, aucune probabilité collective et aucun compteur exact ne sont visibles. Cela confirme que le candidat reste ouvert et qu'il n'y a pas de settlement public avant 2026-06-13T00:00:00+00:00.

Sur `/leaderboard`, la page indique "Scores appear after questions resolve". Elle ne publie pas de classement prématuré, pas de compte exact de participants, pas de détail de forecast ouvert.

Sur `/activity`, la page indique "Activity appears after questions resolve" et précise que les forecasts des questions ouvertes restent cachés jusqu'à la résolution. Aucune activité ouverte n'est exposée.

Point d'attention mineur: le détail Apple affiche deux séparateurs visuels autour de "Community signal". Ce n'est pas une fuite BCP, seulement un rendu de placeholder. Rien ne bloque le premier settlement.

Conclusion: les surfaces publiques testées respectent BCP pour ce gate. Apple Mac Pro reste le candidat de premier settlement, ouvert, avec clôture au 13 juin 2026 UTC et sans settlement visible à 13h UTC le 29 mai 2026.
