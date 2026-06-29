# AQ-511, contrôle live BCP et evidence gate du 29 juin matin

Verdict: OK pour la surface publique et pour les deux questions qui ferment le 30 juin. La page publique garde le consensus aveugle avant forecast, et les liens de contexte restent officiels.

Je n'ai pas consulté la table `forecasts`, je n'ai pas ouvert de route privée, et je n'ai pas utilisé de scores pour ce contrôle. Les vérifications ci-dessous sont limitées aux pages publiques et aux scripts read-only disponibles.

## Commandes lancées

```bash
git fetch origin && git pull --ff-only origin main
npm run verify:public-bcp && npm run verify:next-settlement-watch
```

Résultat git: fast-forward de `469f572` vers `a3dd8e0`.

Résultat verifier BCP:

```text
Verifying public BCP surfaces at https://baycast-p.vercel.app
ok /
ok /questions
ok /questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248
ok /leaderboard
ok /activity
Public BCP surface verification passed.
```

Résultat settlement watch:

```text
next settlement watch: FAIL
Supabase env unavailable: Missing SUPABASE_URL/NEXT_PUBLIC_SUPABASE_URL or SUPABASE_ANON_KEY/NEXT_PUBLIC_SUPABASE_ANON_KEY
```

Ce bloc n'est pas un échec produit. Le script est read-only, mais l'environnement local n'a pas les variables Supabase nécessaires. J'ai donc complété avec le contrôle live public sur `https://baycast-p.vercel.app`.

## Routes publiques contrôlées

Pages demandées:

```text
/                                                  200
/questions                                          200
/questions?sort=closing-soon                       200
/questions?status=resolved                         200
/leaderboard                                       200
/activity                                          200
/questions/5745e845-94e9-4802-bbeb-850c982e1276    200
/questions/d3338e47-11ec-4568-942e-42bb19be0f5e    200
```

Les deux pages Jun 30 ont été trouvées depuis la home et `/questions`:

```text
5745e845-94e9-4802-bbeb-850c982e1276 | Will the 2026 FIFA World Cup opening match have at least three total goals?
d3338e47-11ec-4568-942e-42bb19be0f5e | Will OpenAI release a new public video generation model before July 1, 2026?
```

Scan HTML live lancé sur ces huit routes:

```text
forbidden_hits none sur chaque route
community_consensus_count 0 sur chaque route
exact_forecaster_count_copy none sur chaque route
```

Champs explicitement cherchés et absents:

```text
aggregate_probability
forecasters_count
forecastCount
fcCount
settled_by
evidence_doc
```

Je n'ai pas vu de fuite de consensus public, pas de nombre de forecasters exposé, pas de sérialisation `aggregate_probability`, `forecasters_count`, `settled_by` ou `evidence_doc` dans le HTML public contrôlé.

## Lecture navigateur

Home et listings: les questions ouvertes affichent le libellé attendu, la catégorie, le temps restant et la copie `Lock your call before the crowd can shape it`. Pas de pourcentage de foule ni de nombre de forecasts affiché.

`/questions?sort=closing-soon`: les deux questions Jun 30 apparaissent en tête avec les autres closers du 30 juin. Même comportement BCP, pas de consensus public.

`/questions?status=resolved`: la route resolved répond bien et montre seulement des questions déjà résolues. Aucun champ interne `settled_by` ou `evidence_doc` n'est sérialisé dans le HTML.

`/activity`: la route répond. Elle expose de l'activité publique sur une question résolue, pas un consensus d'une question ouverte Jun 30.

`/leaderboard`: la route répond. Je l'ai utilisée seulement comme surface publique à scanner pour les fuites BCP demandées.

## Evidence readiness, Jun 30

### FIFA opening match

Page: `/questions/5745e845-94e9-4802-bbeb-850c982e1276`

Clôture affichée: `Jun 30, 2026`.

Résolution affichée: le critère dépend du score final officiel du match d'ouverture de la Coupe du monde 2026, avec trois buts ou plus en temps réglementaire plus arrêts de jeu. Prolongation et tirs au but exclus si applicables, buts contre son camp inclus, abandon non complété avant le 30 juin résout No.

Lien contexte:

```text
FIFA World Cup 2026 => https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026
```

Source de résolution affichée:

```text
FIFA official match centre: https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026
```

Verdict source: officiel uniquement.

### OpenAI video generation model

Page: `/questions/d3338e47-11ec-4568-942e-42bb19be0f5e`

Clôture affichée: `Jun 30, 2026`.

Résolution affichée: Yes si OpenAI publie avant `2026-07-01 00:00 UTC` un modèle vidéo nouveau ou matériellement amélioré pour ChatGPT, API, ou autre tier public payant. Démo de recherche, waitlist-only preview, note de sécurité, changement tarifaire ou update UI mineure exclus.

Liens contexte:

```text
OpenAI news and research updates => https://openai.com/news/
OpenAI ChatGPT release notes => https://help.openai.com/en/articles/6825453-chatgpt-release-notes
```

Source de résolution affichée:

```text
OpenAI News and product release notes: https://openai.com/news/ and https://help.openai.com/en/articles/6825453-chatgpt-release-notes
```

Verdict source: officiel uniquement. Le second lien passe par le Help Center OpenAI, c'est bien une propriété OpenAI et non une source externe.

## Verdict final

Gate AQ-511: pass.

La surface publique live respecte le Blind Consensus Protocol sur les routes vérifiées. Les deux questions du 30 juin sont trouvables, ouvertes, avec une clôture publique cohérente et des sources de résolution officielles. La seule réserve opérationnelle est locale: `verify:next-settlement-watch` n'a pas pu lire Supabase faute d'env, donc son état exact côté base n'a pas été confirmé par script dans ce clone.
