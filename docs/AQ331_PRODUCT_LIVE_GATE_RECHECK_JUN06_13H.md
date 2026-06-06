# AQ-331 Product live gate recheck, 06 juin 2026 13h UTC

Recheck fait sur le dépôt produit `/root/baycast-product`, remis à jour depuis `origin/main` avant contrôle. Heure de contrôle: `2026-06-06T13:02:56Z`. Je n'ai pas lu ni interrogé la table `forecasts`.

Verdict: GO.

Le proto public tient la gate BCP sur les pages demandées. `npm run verify:public-bcp` passe sur `/`, `/questions`, `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`, `/leaderboard` et `/activity`.

Sur `/`, la home affiche `44` questions live, présente Baycast comme un produit de prédiction et de scoring gratuit, et explique que l'appel se fait avant de voir la foule. Je n'ai pas vu de probabilité de consensus publiée, ni de nombre exact de forecasters. Le seul pourcentage mis en avant est `100% Free to play`, qui n'est pas un signal de marché.

Sur `/questions`, la liste affiche `Questions(44 open)`. La question Apple Mac Pro est visible en premier dans `Closing Soon` avec `Technology`, `7d left` et `Lock your call before the crowd can shape it`. Là aussi, pas de consensus public, pas de compteur exact de forecasters, pas d'activité ouverte exposée.

La page détail Apple Mac Pro est bien trouvable à `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`. Elle affiche la question `Will Apple announce a new Mac Pro at WWDC 2026?`, la catégorie `Technology`, `7d left`, `Community signal locked`, `Jun 13, 2026 Closes`, et la source de résolution Apple WWDC plus Apple Newsroom. Le texte de résolution couvre la fenêtre du 8 au 12 juin 2026. Les seuls pourcentages visibles sont ceux du sélecteur utilisateur, dont `50%` par défaut et les boutons `5%`, `10%`, `25%`, `50%`, `75%`, `90%`, `95%`. Le HTML public contient l'horodatage `2026-06-13T00:00:00+00:00`. La question reste donc ouverte et ne doit pas être réglée avant `2026-06-13T00:00:00+00:00`.

Sur `/leaderboard`, le texte dit que les scores apparaissent après résolution. Aucun classement actif, aucune participation exacte, aucun détail de forecast ouvert n'est visible.

Sur `/activity`, le texte dit que l'activité publique apparaît après résolution et que les forecasts des questions ouvertes restent cachés jusqu'à la résolution. C'est aligné avec BCP et avec la readiness premier règlement: rien d'ouvert n'est publié avant close.

Je n'ai pas trouvé de cadrage gambling ou betting sur les surfaces contrôlées. Recherche publique sur les pages demandées: pas de `bet`, `betting`, `wager`, `stake`, `odds`, `payout`, `casino` ou `gambling`. Le cadrage reste prediction polling gratuit, calibration, Brier score et comparaison à la réalité.

Commandes et pages contrôlées:

- `git status`, `git fetch origin main`, puis fast-forward depuis `origin/main`: dépôt déjà à jour.
- `npm run verify:public-bcp`: passé.
- `npm run verify:first-settlement-evidence`: tenté en lecture seule sur `questions`, sans lecture `forecasts`; échec attendu car les variables Supabase ne sont pas présentes localement.
- Navigation navigateur live: `/`, `/questions`, détail Apple Mac Pro, `/leaderboard`, `/activity`.
- Contrôle HTML public des mêmes routes pour fuite de consensus, compte exact de forecasters, termes gambling, et close Apple Mac Pro.

Conclusion: GO pour la gate produit AQ-331. Garder Apple Mac Pro ouvert. Ne pas régler avant `2026-06-13T00:00:00+00:00`.