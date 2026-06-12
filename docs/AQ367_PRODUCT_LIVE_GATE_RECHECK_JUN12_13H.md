# AQ-367 product live gate recheck, Jun 12 13h UTC

Timestamp du contrôle: 2026-06-12T13:02:13Z.

Contrôle fait en navigateur live sur `https://baycast-p.vercel.app`. Je n'ai pas lu ni interrogé la table `forecasts`.

Routes vérifiées:

- `/`
- `/questions`
- `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`, découverte depuis la liste des questions
- `/leaderboard`
- `/activity`

## Ce que j'ai vu

Sur `/`, la page répond et affiche les questions live. La question Apple Mac Pro est visible avec `1d left` et le libellé `Lock your call before the crowd can shape it`. Je n'ai pas vu de probabilité de consensus, pas de nombre exact de forecasters, pas d'activité publique liée à une question ouverte. La copie reste dans le registre prediction polling: `Free to use`, `No payment required`, `Make your forecast`, `Get scored`. Je n'ai pas vu de copie de type bet, betting, gambling, wager, odds, payout, prize ou cash.

Sur `/questions`, la question `Will Apple announce a new Mac Pro at WWDC 2026?` est listée en premier dans `Closing Soon`, encore ouverte avec `1d left`. Les cartes de questions ne montrent pas de probabilité de consensus et ne montrent pas de compte exact de forecasters. Le texte pousse à verrouiller son appel avant de voir la foule: `Lock your call before the crowd can shape it`.

Sur le détail Apple Mac Pro, l'URL découverte est `https://baycast-p.vercel.app/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`. La question est encore ouverte côté public. La page affiche `Community signal locked`, puis `Jun 13, 2026` comme date de clôture. Il n'y a pas de bouton ou de chemin public de settlement visible. Avant `2026-06-13T00:00:00+00:00`, elle ne doit donc pas être settleable. Le module de forecast public reste limité à la saisie utilisateur, avec slider et presets, puis sign up ou login. Le signal collectif est masqué.

Les liens de contexte sur le détail Apple sont bien pertinents et statiques:

- `Apple WWDC`, vers `https://developer.apple.com/wwdc26/`, décrit comme les updates et infos officielles WWDC.
- `Apple Newsroom`, vers `https://www.apple.com/newsroom/`, décrit comme les annonces officielles produit, software, services et company.

La règle de résolution visible est cohérente avec ces sources: Yes si Apple annonce un nouveau Mac Pro pendant WWDC 2026 ou dans un post Apple Newsroom daté du 2026-06-08 au 2026-06-12. No si aucun nouveau Mac Pro n'est annoncé dans cette fenêtre.

Sur `/leaderboard`, aucun score individuel ni ranking public de forecasts ouverts n'est affiché. La page dit `Scores appear after questions resolve` et `Forecasts are live now, but leaderboard scores start once a question has a final outcome`.

Sur `/activity`, aucune activité publique d'open forecast n'est affichée. La page dit `Public forecasting activity appears after questions resolve` et `Open-question forecasts stay hidden until resolution so every forecaster starts blind`.

## Verdict

GO pour la gate AQ-367 côté produit live.

Le site public respecte le blind consensus attendu sur les routes vérifiées: pas de consensus probability visible sur les questions ouvertes, pas de compte exact de forecasters, pas d'activité publique avant résolution, pas de copie gambling observée. La question Apple Mac Pro reste ouverte et non settleable côté public avant `2026-06-13T00:00:00+00:00`. Les liens de contexte pointent vers Apple WWDC et Apple Newsroom, ce qui correspond aux sources de résolution affichées.
