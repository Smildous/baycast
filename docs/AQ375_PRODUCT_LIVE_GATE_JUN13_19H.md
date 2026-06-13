# AQ-375 product live gate, Jun 13 19h UTC

Run effectué le 2026-06-13 à 19:06 UTC, après fast-forward de `/root/baycast-product` sur `origin/main`.

J'ai vérifié le live avec le navigateur sur `https://baycast-p.vercel.app`, pas seulement avec le code local.

Routes vues:

- `/`
- `/questions`
- `/questions?status=resolved`
- `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`
- `/leaderboard`
- `/activity`

La home charge proprement. Elle affiche 43 questions live, les cartes ouvertes restent en mode forecast indépendant, et je n'ai pas vu de probabilité de consensus, de compteur exact de forecasters, de copie de pari, ni de fuite BCP.

La page `/questions` charge avec `Questions(43 open)`. Les questions ouvertes restent propres: catégorie, temps restant, titre, puis le texte blind-call. Aucun `aggregate_probability`, aucun `forecasters_count`, aucune activité publique de question ouverte, aucun vocabulaire gambling.

La vue résolue de `/questions` montre maintenant la question Apple Mac Pro comme première question résolue. Sur le live actuel, j'ai trouvé un petit défaut UX: la carte résolue gardait encore le texte `Lock your call before the crowd can shape it`. Ce n'est pas une fuite de données, mais ce n'est pas propre pour une première surface résolue. J'ai corrigé le composant local pour afficher `Resolved. Scores now count against the final outcome` quand `status === 'resolved'`.

La page Apple Mac Pro résolue répond bien sur `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`. Elle affiche `Technology`, `Resolved`, le titre attendu, l'outcome `No`, la date `Jun 13, 2026`, la phrase de score, et la source Apple WWDC plus Apple Newsroom. Je n'ai pas vu de `settled_by`, `evidence_doc`, `aggregate_probability`, `forecasters_count`, BCP, odds, wager, payout ou autre copie de pari dans le texte rendu. J'ai aussi corrigé un deuxième petit défaut local sur cette page: la rangée publique `Community signal locked` et `Closes` restait affichée sous le bloc resolved. Elle est maintenant masquée pour les questions résolues, pour laisser le bloc outcome et score porter la page.

La page `/leaderboard` montre le premier score public proprement: `S Simba`, Brier `0.2500`, `2` predictions et la colonne `Resolved`. Rien de brut ou sensible n'est visible. Pas de `settled_by`, pas de `evidence_doc`, pas de champs agrégés bruts, pas de gambling copy.

La page `/activity` montre seulement l'activité après résolution: `Simba forecasted 50% on Will Apple announce a new Mac Pro at WWDC 2026?`, avec `Showing recent resolved-question forecasts`. C'est conforme au gate post-score: l'activité publique porte sur une question résolue, pas sur des questions ouvertes. Pas de champs bruts, pas de BCP leak, pas de copie de pari.

Conclusion: le live est sain côté données sensibles et premier score public. Deux petits défauts de présentation résolue ont été corrigés dans `/root/baycast-product`: la carte résolue ne parle plus comme une carte ouverte, et la page détail résolue ne garde plus le bloc `Community signal locked` / `Closes`.

Validations locales après correction:

- `npm run lint`: pass
- `npm test`: pass, 12 fichiers, 110 tests
- `npm run build`: pass

Fichiers modifiés pour AQ-375:

- `docs/AQ375_PRODUCT_LIVE_GATE_JUN13_19H.md`
- `components/QuestionCard.tsx`
- `app/questions/[id]/page.tsx`

Aucun document AQ-374 n'a été modifié.
