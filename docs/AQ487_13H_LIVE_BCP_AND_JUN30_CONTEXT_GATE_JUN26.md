# AQ-487 13h live BCP plus Jun 30 context gate, Jun 26

Check fait le 2026-06-26 à 13:04 UTC sur `https://baycast-p.vercel.app`, depuis `/root/baycast-product` après fast-forward de `origin/main`.

Je n'ai pas lu la table `forecasts`. Les contrôles ont utilisé les pages publiques live, le DOM navigateur, les scripts publics du repo, et un scan HTML public. Le script Supabase `verify:next-settlement-watch` a bien été lancé pour confirmer qu'il est limité à `questions`, mais il n'a pas pu interroger la base depuis ce runner faute de variables Supabase.

## Verdict

Gate OK. Pas de fuite BCP publique trouvée sur `/`, `/questions`, `/questions?sort=closing-soon`, `/questions?status=resolved`, `/leaderboard` ou `/activity`.

Le scan HTML et DOM n'a trouvé aucun `aggregate_probability`, `forecasters_count`, `settled_by`, `evidence_doc`, `forecastCount` ni `fcCount` sur ces surfaces. Il n'a pas trouvé de compte visible du type `N forecasters` ou `N predictors`. La seule occurrence visible de `consensus` sur la home est du texte produit général: `your forecast adds a real signal instead of copying consensus`. Ce n'est pas une valeur de consensus ni une donnée de foule.

`/questions?sort=closing-soon` est propre: le navigateur affiche `Questions(7 closing soon)` et les cartes Jun 30 avec `5d left`, sans probabilité communautaire ni compteur. `/questions?status=resolved` affiche seulement les deux questions résolues avec `Resolved. Scores now count against the final outcome`, sans champs privés de settlement dans le DOM.

Les candidats Jun 30 gardent des liens de contexte official-only et utiles. La page FIFA (`/questions/5745e845-94e9-4802-bbeb-850c982e1276`) affiche un lien de contexte vers FIFA uniquement, plus la source de résolution FIFA officielle. La page OpenAI (`/questions/d3338e47-11ec-4568-942e-42bb19be0f5e`) affiche seulement OpenAI News et les release notes ChatGPT. Les pages OpenAI renvoient une challenge Cloudflare au navigateur automatisé, mais les URLs restent les surfaces officielles correctes et la page Baycast ne pointe pas vers des sources tierces.

Aucun bug produit n'a été trouvé, donc je n'ai pas modifié le code.

## Preuves live

`npm run verify:public-bcp` passe sur `https://baycast-p.vercel.app` pour `/`, `/questions`, une page question ouverte, `/leaderboard` et `/activity`.

`npm run verify:distribution-gate` passe sur `/settlements/apple-mac-pro-wwdc-2026`, `/questions?status=resolved` et `/`.

Scan public complémentaire fait sur les routes demandées:

| Route | HTTP | Termes privés | Counts visibles | Consensus visible | Note |
| --- | ---: | --- | --- | --- | --- |
| `/` | 200 | aucun | aucun | texte général seulement | pas de BCP leak |
| `/questions` | 200 | aucun | aucun | aucun | cartes open blind-first |
| `/questions?sort=closing-soon` | 200 | aucun | aucun | aucun | `7 closing soon`, Jun 30 en haut |
| `/questions?status=resolved` | 200 | aucun | aucun | aucun | resolved propre |
| `/leaderboard` | 200 | aucun | aucun | aucun | scores post-résolution seulement |
| `/activity` | 200 | aucun | aucun | aucun | pas d'activité open exposée |

Le HTML Next contient `self.__next_f.push`, attendu pour l'App Router. Le scan n'a pas trouvé de raw JSON contenant les champs sensibles listés.

Navigateur:

- `/questions?sort=closing-soon`: `Questions(7 closing soon)`, FIFA, OpenAI, CPI et autres cartes à `5d left`, copie `Lock your call before the crowd can shape it`.
- `/questions?status=resolved`: Apple Mac Pro et Atlantic hurricane season, tous deux marqués `Resolved`.
- FIFA: `Community signal locked`, `Jun 30, 2026 Closes`, lien externe `https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026`.
- OpenAI: `Community signal locked`, `Jun 30, 2026 Closes`, liens externes `https://openai.com/news/` et `https://help.openai.com/en/articles/6825453-chatgpt-release-notes`.
- FIFA officiel charge dans le navigateur après rejet du bandeau cookies. OpenAI officiel et Help chargent une challenge Cloudflare dans l'automate, sans remettre en cause la source affichée côté Baycast.

`npm test -- __tests__/news-context.test.ts __tests__/utils.test.ts` est passé: 44 tests.

## Commandes exécutées

```bash
git -C /root/baycast-product status --short
git -C /root/baycast-product remote -v
git -C /root/baycast-product fetch origin
git -C /root/baycast-product checkout main
git -C /root/baycast-product pull --ff-only origin main
node -e "const p=require('./package.json'); console.log(p.scripts)"
npm run verify:public-bcp
npm run verify:distribution-gate
node <<'NODE'
// scan HTML public AQ-487, routes demandées plus les deux pages Jun 30
NODE
npm test -- __tests__/news-context.test.ts __tests__/utils.test.ts
npm run verify:next-settlement-watch
date -u '+%Y-%m-%d %H:%M:%S UTC'
```
