# AQ436 19h live BCP and next settlement gate, Jun 20

Passage fait le 2026-06-20 a 19h UTC sur `https://baycast-p.vercel.app`, depuis `/root/baycast-product`.

J'ai d'abord remis le clone sur `main` avec un fetch puis un pull fast forward only depuis `origin main`. Le depot etait deja a jour. Les controles qui suivent sont publics ou read only. Je n'ai pas lu la table `forecasts`, je n'ai pas ouvert de payload de forecast et je n'ai rien ecrit sur le live.

## Verdict

GO pour le BCP public.

Les surfaces publiques controlees ne montrent pas de consensus ouvert, pas de compte exact de forecasters, pas de champ interne de forecast, pas de copie gambling ou betting. Le detail Jun 30 ouvert que j'ai verifie est la question FIFA. Elle garde le signal communautaire verrouille et n'expose pas de consensus public.

GO pour la prochaine gate de settlement.

Le script read only `verify:next-settlement-watch` passe avec la config publique Supabase extraite du bundle live. Le script lit `questions` seulement. Les trois candidats suivis sont bien en etat attendu: FIFA Jun 30 ouvert, OpenAI video model Jun 30 ouvert, Microsoft Xbox handheld Jul 31 ouvert. Le controle readiness Jun 20 a Jun 30 lit aussi `questions` seulement et donne 42 questions ouvertes, 7 questions ouvertes dans la fenetre, 7 pretes, 0 non prete.

## Routes publiques vues

Scan HTTP du texte visible et du HTML:

```text
/                                                          200 leak_terms none  Will the 2026 FIFA World Cup opening match have at least three total goals?
/questions                                                 200 leak_terms none  Questions ( 42 open ) Will the 2026 FIFA World Cup opening match have at least three total goals?
/questions?status=resolved                                 200 leak_terms none  Will Apple announce a new Mac Pro at WWDC 2026?
/leaderboard                                               200 leak_terms none
/activity                                                  200 leak_terms none  Will Apple announce a new Mac Pro at WWDC 2026?
/settlements/apple-mac-pro-wwdc-2026                       200 leak_terms none  Will Apple announce a new Mac Pro at WWDC 2026?
/questions/5745e845-94e9-4802-bbeb-850c982e1276            200 leak_terms none  Will the 2026 FIFA World Cup opening match have at least three total goals?
```

La route Apple settlement existe et repond 200. Elle affiche `Apple Mac Pro at WWDC 2026 resolved No` avec une note publique de settlement, sans fuite de `settled_by` ni `evidence_doc`.

La route resolved affiche Apple Mac Pro et Atlantic hurricane season comme resolues. La page garde la navigation publique normale et ne montre pas de donnees de forecast ouvert.

Le detail ouvert Jun 30 verifie est `/questions/5745e845-94e9-4802-bbeb-850c982e1276`. La page affiche Sports, `11 d left`, la resolution source FIFA officielle et `Community signal locked`. Les pourcentages visibles servent a saisir une prevision utilisateur, pas a publier un consensus.

## Termes cherches

J'ai cherche ces termes dans le HTML et le texte extrait des routes ci dessus:

```text
aggregate_probability
forecasters_count
forecastCount
fcCount
consensus probability
exact forecaster counts, via regex \b\d{1,3}(?:,\d{3})*\s+forecasters?\b
settled_by
evidence_doc
gambling
betting
wager
```

Resultat: aucun hit sur les routes du gate.

Les scripts publics du repo passent sur leur perimetre:

```text
$ npm run verify:public-bcp
Verifying public BCP surfaces at https://baycast-p.vercel.app
ok /
ok /questions
ok /questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248
ok /leaderboard
ok /activity
Public BCP surface verification passed.

$ npm run verify:distribution-gate
Verifying distribution gate at https://baycast-p.vercel.app
ok /settlements/apple-mac-pro-wwdc-2026
ok /questions?status=resolved
ok /
Distribution gate verification passed.
```

## Next settlement watch

Sans env locale, le script echoue proprement, comme attendu:

```text
$ npm run verify:next-settlement-watch
next settlement watch: FAIL
Supabase env unavailable: Missing SUPABASE_URL/NEXT_PUBLIC_SUPABASE_URL or SUPABASE_ANON_KEY/NEXT_PUBLIC_SUPABASE_ANON_KEY
```

J'ai ensuite extrait la config publique Supabase depuis le bundle client live. Je n'ai pas imprime l'anon key dans le compte rendu. Avec cette config publique, le script read only passe:

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

Readiness Jun 20 a Jun 30, `questions` seulement:

```text
$ npm run verify:resolution-readiness with window 2026-06-20T00:00:00.000Z to 2026-06-30T23:59:59.999Z
ok: true
checked_at: 2026-06-20T19:02:48.913Z
open_questions: 42
soon_closing_open_questions: 7
ready_soon_closing_open_questions: 7
not_ready_soon_closing_open_questions: 0
missing_by_field: {}
table: questions
mode: readonly
missing_columns: resolution_date
```

Candidats Jun 30 lus dans `questions` par le script readiness:

```text
5745e845-94e9-4802-bbeb-850c982e1276 | open | sports  | 2026-06-30T23:59:59+00:00 | FIFA opening match at least three total goals
9beb8cd0-474d-4ab4-b52c-e2c83820350b | open | economy | 2026-06-30T23:59:59+00:00 | ECB deposit facility rate cut in June 2026 meeting
9df06e86-a3f4-4550-8381-c6be33ea48a7 | open | other   | 2026-06-30T23:59:59+00:00 | Cannes Palme d'Or female director
3682dcd2-3680-4a58-bf06-4762f26b4541 | open | economy | 2026-06-30T23:59:59+00:00 | Ethereum above $5,000 before July 1
54f7e8b0-0dd6-4052-a5f3-2752c133083c | open | economy | 2026-06-30T23:59:59+00:00 | S&P 500 above 7,000 before July 1
d3338e47-11ec-4568-942e-42bb19be0f5e | open | tech    | 2026-06-30T23:59:59+00:00 | OpenAI public video generation model before July 1
cff593cd-e4f7-424f-b468-c8412edc3c6c | open | economy | 2026-06-30T23:59:59+00:00 | US core CPI for May 2026 at least 0.3 percent MoM
```

Counts utilises: le contexte pre run donne 44 questions, 42 open, 12 forecasts, 6 profiles. Pendant ce gate, je n'ai recontrole que `questions` en read only: 42 open et 7 open Jun 30 ready. Les 12 forecasts restent une donnee pre run, pas une lecture faite pendant cette execution.

Decision finale: public BCP GO, settlement readiness GO. Prochaine watch concrete: Jun 30, avec lecture `questions` seulement jusqu'au moment de settlement.
