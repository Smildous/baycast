# AQ-484 Morning live BCP plus Jun 30 context gate, Jun 26

Check fait le 2026-06-26 à 07:02 UTC sur `https://baycast-p.vercel.app`, depuis `/root/baycast-product` après fast-forward sur `origin/main`.

Je n'ai pas lu la table `forecasts`. Le seul script Supabase tenté pour ce gate est `verify:next-settlement-watch`; son code annonce et montre une lecture `questions` uniquement, puis il a stoppé avant toute requête car les variables Supabase ne sont pas présentes dans cet environnement.

## Verdict

Les surfaces publiques restent propres pour le BCP. Les routes vérifiées ne publient pas `aggregate_probability`, `forecasters_count`, `forecastCount`, `fcCount`, de copie exacte du type `N forecasters`, ni de consensus communautaire sur une question ouverte. Les cartes ouvertes gardent la posture blind-first: catégorie, temps restant, titre et `Lock your call before the crowd can shape it`.

`Closing Soon` se comporte encore comme attendu. La page `/questions` affiche `42 open`, une section `Closing Soon`, puis FIFA, OpenAI et CPI avec `5d left`. Le code de `app/questions/page.tsx` garde la fenêtre à 14 jours, filtre avec `isClosingSoon(q.closes_at, CLOSING_SOON_WINDOW_DAYS)`, trie par `closes_at`, limite le bloc à 3 cartes, et le tri `?sort=closing-soon` ne garde que les questions réellement near-term.

Les surfaces resolved ne fuient pas de champs privés. `/questions?status=resolved` affiche Apple Mac Pro et Atlantic hurricane season avec `Resolved. Scores now count against the final outcome`. Le scan DOM navigateur n'a trouvé aucun `settled_by`, `evidence_doc`, `aggregate_probability`, `forecasters_count`, `forecastCount` ni `fcCount`. `npm run verify:distribution-gate` confirme aussi `/settlements/apple-mac-pro-wwdc-2026`, `/questions?status=resolved` et `/`.

Les liens de contexte Jun 30 restent official-only lorsqu'ils sont visibles. La page FIFA (`/questions/5745e845-94e9-4802-bbeb-850c982e1276`) affiche `Community signal locked`, `Jun 30, 2026 Closes`, et un seul lien externe: `https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026`. La page OpenAI (`/questions/d3338e47-11ec-4568-942e-42bb19be0f5e`) affiche `Community signal locked`, `Jun 30, 2026 Closes`, et seulement `https://openai.com/news/` plus `https://help.openai.com/en/articles/6825453-chatgpt-release-notes`. Le code de `lib/news-context.ts` force ces ensembles via `FIFA_CONTEXT_URLS` et `OPENAI_CONTEXT_URLS` avant le fallback général.

Les pourcentages visibles sur les pages détail sont les presets du contrôle utilisateur non connecté. Ils ne sont pas un consensus public.

## Preuves live

`npm run verify:public-bcp` est passé sur `/`, `/questions`, `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`, `/leaderboard` et `/activity`.

Navigateur sur `/questions`: 200, `Questions(42 open)`, `Closing Soon`, FIFA et OpenAI en haut, pas de consensus affiché.

Navigateur sur FIFA: 200, contexte FIFA officiel seulement, signal communautaire verrouillé, fermeture Jun 30.

Navigateur sur OpenAI: 200, contexte OpenAI officiel seulement, signal communautaire verrouillé, fermeture Jun 30.

Navigateur sur `/questions?status=resolved`: 200, resolved public propre, pas de champs privés dans le DOM.

`npm run verify:distribution-gate` est passé.

`npm test -- __tests__/news-context.test.ts __tests__/utils.test.ts` est passé: 44 tests, dont les règles de liens contexte et les helpers de closing soon.

`npm run verify:next-settlement-watch` existe et a été lancé, mais n'a pas pu vérifier la base live depuis ce runner: `Supabase env unavailable: Missing SUPABASE_URL/NEXT_PUBLIC_SUPABASE_URL or SUPABASE_ANON_KEY/NEXT_PUBLIC_SUPABASE_ANON_KEY`. Ce n'est pas un échec produit observé, seulement une limite d'environnement. Le script est read-only et sélectionne `id,title,status,closes_at` depuis `questions`.

## Commandes exécutées

```bash
git -C /root/baycast-product status --short
git -C /root/baycast-product remote -v
git -C /root/baycast-product fetch origin
git -C /root/baycast-product checkout main
git -C /root/baycast-product pull --ff-only origin main
npm run verify:public-bcp
npm run verify:next-settlement-watch
npm run verify:distribution-gate
npm test -- __tests__/news-context.test.ts __tests__/utils.test.ts
date -u '+%Y-%m-%d %H:%M:%S UTC'
```
