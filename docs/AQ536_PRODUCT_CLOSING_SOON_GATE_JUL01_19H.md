# AQ-536 Closing Soon gate, Jul 1 19h

Check fait le 2026-07-01 à 19:02 UTC sur la prod `baycast-p.vercel.app`.

J'ai testé `https://baycast-p.vercel.app/questions?sort=closing-soon`. La page répond et affiche `Questions(0 closing soon)`, puis l'état vide `No questions closing in the next 14 days` avec `Use Newest for the full open set, or come back when the first resolution windows get closer.`

J'ai ensuite testé `https://baycast-p.vercel.app/questions`. La liste publique affiche `Questions(40 open)`. Sur le premier écran, trois cartes ouvertes disent pourtant `Closes today`:

`Will US core CPI for May 2026 be 0.3 percent month over month or higher?`

`Will the ECB cut its deposit facility rate at its June 2026 monetary policy meeting?`

`Will the S&P 500 close above 7,000 on any trading day before July 1, 2026?`

Ces cartes gardent la copie publique attendue: `Lock your call before the crowd can shape it`.

## Règle produit attendue

`Closing Soon` doit être un vrai filtre, pas seulement un tri. Il doit afficher les questions ouvertes actives qui ferment dans une fenêtre courte, actuellement 14 jours. L'état vide `No questions closing in the next 14 days` n'est correct que s'il n'y a vraiment aucune question ouverte active dans cette fenêtre.

Donc une carte visible comme ouverte avec `Closes today` ne peut pas coexister avec `Questions(0 closing soon)` sur le filtre Closing Soon. Il faut choisir une seule vérité produit: soit ces questions sont encore ouvertes et elles doivent apparaître dans `Closing Soon`, soit elles sont expirées et elles ne doivent plus être visibles comme cartes ouvertes `Closes today`.

## Cause probable

Je n'ai pas lu `forecasts`.

Le code local actuel pointe vers un mismatch simple:

`app/questions/page.tsx` filtre `?sort=closing-soon` avec `isClosingSoon(q.closes_at, 14)`.

`lib/utils.ts` définit `isClosingSoon` comme une fenêtre future stricte: `new Date(closesAt).getTime() - Date.now()`, puis `if (diff < 0) return false`.

`components/Countdown.tsx`, lui, affiche `Closes today` quand `daysRemaining(closesAt)` vaut 0. Et `daysRemaining` clamp les dates passées à 0 avec `Math.max(0, ...)`.

Résultat probable après les settlements du 1er juillet: certaines questions sont encore `status = open` mais leur `closes_at` est déjà passé à l'heure du check. Le badge public les rend comme `Closes today`, alors que le filtre Closing Soon les exclut parce que `diff < 0`. Si l'auto-close devait les sortir de l'open set, il ne l'a pas fait sur la surface publique vérifiée.

## Acceptance criteria pour Dev

Après fix, sur prod ou preview reliée aux mêmes données:

1. `https://baycast-p.vercel.app/questions?sort=closing-soon` ne doit plus afficher `Questions(0 closing soon)` si `/questions` montre encore une ou plusieurs cartes ouvertes avec `Closes today`.
2. Si les questions du 1er juillet restent forecastables pendant la journée produit, elles apparaissent dans `Closing Soon`, triées avant les questions à J+1, J+2, etc.
3. Si les questions du 1er juillet sont expirées, `/questions` ne les affiche plus comme cartes ouvertes avec `Closes today`; elles passent en `closed` ou `resolved` selon le flux attendu.
4. L'état vide `No questions closing in the next 14 days` n'apparaît que quand aucune question ouverte active n'a un `closes_at` dans la fenêtre produit de 14 jours.
5. Le compteur du header reste cohérent avec la liste rendue: `N closing soon` doit compter les mêmes questions que les cartes visibles après recherche et filtres catégorie/statut.
6. Ajouter ou ajuster un test sur le cas limite d'une question ouverte dont `closes_at` est le jour courant, y compris quand l'heure exacte est déjà passée mais que le badge public l'affiche encore comme `Closes today`.
7. Garder la garde BCP: les cartes et le HTML public des questions ouvertes ne doivent pas exposer `aggregate_probability`, `forecasters_count`, `forecastCount`, `fcCount`, consensus public, ni métadonnée exacte de participation.

## BCP leak check

Check navigateur sur les deux URLs ci-dessus. Sur `/questions`, le DOM visible contient trois `Closes today`. Sur `/questions?sort=closing-soon`, le DOM visible contient l'état vide. Scan texte et HTML côté navigateur pour `aggregate_probability`, `forecasters_count`, `forecastCount`, `fcCount`, `consensus`, `forecasters`: aucun match sur ces deux pages.

Conclusion: c'est une incohérence produit Closing Soon, pas une fuite BCP observée.
