# AQ-221 vérification dev, 17 mai 13h

J’ai vérifié AQ-198 dans le repo canonique `/root/baycast` et j’ai aussi contrôlé les surfaces qui peuvent exposer du consensus hors du détail question.

## Fichiers lus

`lib/news-context.ts` contient uniquement une table statique de liens publics et `getQuestionNewsContext`. La fonction choisit au maximum 3 liens à partir du titre, de la description et de la catégorie. Elle ne lit pas Supabase, ne lit pas les forecasts et ne calcule aucun signal de foule.

`components/NewsContextSection.tsx` rend toujours la section. Si aucun lien sûr n’est trouvé, le fallback s’affiche. Je n’ai pas trouvé de bug de rendu manquant pour AQ-198.

`app/questions/[id]/page.tsx` rend `NewsContextSection` juste après l’en-tête de question. Les données passées sont `title`, `category`, `description`. La page ne transmet aucun champ de consensus au composant. La récupération des forecasts reste derrière `!isBlind && consensusUnlocked`.

`__tests__/news-context.test.ts` couvre les liens statiques, la limite de taille, le fallback vide et l’absence de copie sensible comme `consensus`, `forecaster`, `aggregate probability` dans les liens statiques.

`app/questions/[id]/opengraph-image.tsx` reste neutre. L’image Open Graph affiche `—`, `Forecast first to see consensus` et ne requête pas les forecasts.

`app/questions/page.tsx`, `components/QuestionCard.tsx`, `lib/forecaster-count-visibility.ts` et les tests associés gardent les listes publiques sans probabilité agrégée ni compte exact.

## Recherche repo

Recherche lancée sur ces termes :

`aggregate_probability`, `forecasters_count`, `forecastCount`, `fcCount`, `forecasts.length`, `forecaster`, `consensus`, `prediction`.

Résultat utile :

`app/questions/[id]/page.tsx` contient le calcul de consensus, mais seulement après déverrouillage et hors phase blind.

`app/questions/page.tsx` neutralise `aggregate_probability`, `forecasters_count` et `has_forecasts` avant rendu des cartes.

`app/questions/[id]/opengraph-image.tsx` ne sélectionne pas de champs de consensus.

`app/api/admin/resolve/route.ts` lit les forecasts pour le scoring admin, pas pour une surface publique.

`app/api/agent/forecast/route.ts` retourne le forecast créé par l’agent appelé par l’endpoint. Pas de consensus agrégé exposé.

`app/profile/[username]/page.tsx` était le seul point à corriger. La page demandait `questions(... aggregate_probability ...)` et rendait cette probabilité dans l’historique de forecasts. Comme cette route est consultable par tout utilisateur connecté et ne dépend pas du déverrouillage de la question par le viewer, c’était une fuite BCP possible. Le même écran affichait aussi la probabilité d’un forecast non résolu d’un autre profil.

## Patch appliqué

Dans `app/profile/[username]/page.tsx` :

La jointure Supabase ne sélectionne plus `aggregate_probability`.

La colonne desktop `Aggregate` devient `Crowd` et affiche `—`.

La vue mobile affiche `Crowd: —`.

La probabilité d’un forecast non résolu reste visible pour le propriétaire du profil. Pour un autre viewer, elle est masquée par `Locked`. Les forecasts résolus restent visibles, car ils servent au profil de performance.

## Validation locale

Commandes exécutées depuis `/root/baycast` :

`node -v && npm -v && npm test`

Node `v22.22.2`, npm `10.9.7`. Résultat : 7 fichiers de tests passés, 84 tests passés.

`npx tsc --noEmit --pretty false`

Résultat : OK, aucune erreur TypeScript.

`rm -rf .next && npm run build`

Résultat : build Next.js 14.2.16 OK. Les routes ont été collectées et générées sans erreur.

## Verdict

AQ-198 est bien propagé sur la page détail question et le composant de contexte statique est déployable.

Une fuite BCP hors AQ-198 a été trouvée sur le profil utilisateur. Elle est corrigée. Après patch, je n’ai pas trouvé d’autre surface publique ou non viewer-aware qui expose une probabilité agrégée, un compte exact de participants ou un consensus via metadata, JSON-LD, Open Graph, liste de questions ou section de contexte.
