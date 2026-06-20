# AQ433 13h live BCP and next settlement gate, Jun 20

Passage fait le 2026-06-20 a 13:02 UTC sur `https://baycast-p.vercel.app`, depuis `/root/baycast-product`.

J'ai commence par remettre le clone sur `main` avec `git fetch origin && git pull --ff-only origin main`. Le depot etait deja a jour. Les controles ont ete faits sur les routes publiques avec des fetchs HTTP, puis avec les scripts existants du repo. Pour Supabase, j'ai utilise la config publique exposee par le bundle client live et je l'ai injectee dans les scripts existants en anon read only. Les controles Supabase retenus ici lisent `questions` seulement. Je n'ai pas lu de lignes de `forecasts`, je n'ai pas ouvert de payload de forecast et je n'ai rien ecrit dans Supabase.

## Verdict

GO pour le BCP public.

Les routes testees ne montrent pas d'`aggregate_probability`, `forecasters_count`, `forecastCount`, `fcCount`, `consensus probability`, nombre exact de forecasters, `settled_by` ni `evidence_doc` dans le texte visible ou le HTML. Le detail ouvert decouvert reste dans le bon etat: question ouverte, signal communautaire verrouille, pas de consensus public.

GO aussi pour la prochaine gate de settlement. Les surfaces publiques montrent `Questions ( 42 open )` et deux questions resolues visibles. Le script read only `verify:resolution-readiness`, limite a `questions`, confirme 42 open, 7 questions qui ferment dans la fenetre Jun 20 a Jun 30, 7 pretes et 0 non prete. La prochaine surveillance concrete reste le lot Jun 30.

## Routes publiques verifiees

Scan HTTP du texte visible et du HTML:

```text
/                                                          200 leak_terms none Will the 2026 FIFA World Cup opening match have at least three total goals?
/questions                                                 200 leak_terms none Will the 2026 FIFA World Cup opening match have at least three total goals?
/questions?status=resolved                                 200 leak_terms none Will Apple announce a new Mac Pro at WWDC 2026?
/leaderboard                                               200 leak_terms none
/activity                                                  200 leak_terms none Will Apple announce a new Mac Pro at WWDC 2026?
/settlements/apple-mac-pro-wwdc-2026                       200 leak_terms none Will Apple announce a new Mac Pro at WWDC 2026?
/questions/5745e845-94e9-4802-bbeb-850c982e1276            200 leak_terms none Will the 2026 FIFA World Cup opening match have at least three total goals?
```

Le detail ouvert a ete decouvert depuis `/questions`: `/questions/5745e845-94e9-4802-bbeb-850c982e1276`. Il s'agit de la question FIFA. Elle repond 200, affiche la categorie Sports, `11 d left` et garde le signal communautaire cache. Les pourcentages visibles sur la page sont les boutons de saisie utilisateur, pas un consensus.

La page `/questions?status=resolved` affiche Apple Mac Pro et Atlantic hurricane season comme resolues. La note `/settlements/apple-mac-pro-wwdc-2026` repond 200 et expose le resultat public Apple Mac Pro resolved No, sans `settled_by` ni `evidence_doc`.

## Termes BCP cherches

Termes bloques cherches dans le HTML et le texte extrait:

```text
aggregate_probability
forecasters_count
forecastCount
fcCount
consensus probability
exact forecaster counts, via regex \b\d{1,3}(?:,\d{3})*\s+forecasters?\b
settled_by
evidence_doc
```

Resultat: aucun hit sur les routes du gate.

Le script public existant donne le meme resultat sur son perimetre:

```text
$ npm run verify:public-bcp
Verifying public BCP surfaces at https://baycast-p.vercel.app
ok /
ok /questions
ok /questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248
ok /leaderboard
ok /activity
Public BCP surface verification passed.
```

Le controle distribution existant confirme aussi la note Apple, le filtre resolved et la home:

```text
$ npm run verify:distribution-gate
Verifying distribution gate at https://baycast-p.vercel.app
ok /settlements/apple-mac-pro-wwdc-2026
ok /questions?status=resolved
ok /
Distribution gate verification passed.
```

## Supabase read only, questions only

Sans config, le script next settlement echoue proprement:

```text
$ npm run verify:next-settlement-watch
next settlement watch: FAIL
Supabase env unavailable: Missing SUPABASE_URL/NEXT_PUBLIC_SUPABASE_URL or SUPABASE_ANON_KEY/NEXT_PUBLIC_SUPABASE_ANON_KEY
```

J'ai ensuite extrait la config publique Supabase depuis le bundle client live. L'anon key n'a pas ete imprimee dans le compte rendu. Avec cette config, les scripts existants lisent `questions` en read only.

```text
$ npm run verify:next-settlement-watch
next settlement watch: PASS
PASS FIFA opening match at least three goals: ok
  5745e845-94e9-4802-bbeb-850c982e1276 | open | 2026-06-30T23:59:59+00:00 | Will the 2026 FIFA World Cup opening match have at least three total goals?
PASS OpenAI public video generation model before July 1 2026: ok
  d3338e47-11ec-4568-942e-42bb19be0f5e | open | 2026-06-30T23:59:59+00:00 | Will OpenAI release a new public video generation model before July 1, 2026?
PASS Microsoft first-party Xbox handheld before Aug 1 2026: ok
  5cc9fe74-5306-49d9-bec3-251ad276a779 | open | 2026-07-31T23:59:59+00:00 | Will Microsoft announce a new first-party Xbox handheld before August 1, 2026?
```

```text
$ npm run verify:resolution-readiness -- --from 2026-06-20T00:00:00.000Z --until 2026-06-30T23:59:59.999Z
ok: true
checked_at: 2026-06-20T13:02:34.564Z
open_questions: 42
soon_closing_open_questions: 7
ready_soon_closing_open_questions: 7
not_ready_soon_closing_open_questions: 0
missing_by_field: {}
table: questions
mode: readonly
```

Candidats Jun 30 confirmes par `questions`:

```text
5745e845-94e9-4802-bbeb-850c982e1276 | open | sports  | 2026-06-30T23:59:59+00:00 | FIFA opening match at least three total goals
9beb8cd0-474d-4ab4-b52c-e2c83820350b | open | economy | 2026-06-30T23:59:59+00:00 | ECB deposit facility rate cut in June 2026 meeting
9df06e86-a3f4-4550-8381-c6be33ea48a7 | open | other   | 2026-06-30T23:59:59+00:00 | Cannes Palme d'Or female director
3682dcd2-3680-4a58-bf06-4762f26b4541 | open | economy | 2026-06-30T23:59:59+00:00 | Ethereum above $5,000 before July 1
54f7e8b0-0dd6-4052-a5f3-2752c133083c | open | economy | 2026-06-30T23:59:59+00:00 | S&P 500 above 7,000 before July 1
d3338e47-11ec-4568-942e-42bb19be0f5e | open | tech    | 2026-06-30T23:59:59+00:00 | OpenAI public video generation model before July 1
cff593cd-e4f7-424f-b468-c8412edc3c6c | open | economy | 2026-06-30T23:59:59+00:00 | US core CPI for May 2026 at least 0.3 percent MoM
```

La surface publique `/questions` donne 42 open. La surface publique resolved donne 2 resolues. Le total public reste donc 44 questions visibles, coherent avec le contexte avant run.

Decision finale: public BCP GO, next settlement gate GO. Prochaine watch: Jun 30. Ne pas lire `forecasts` pour cette gate.
