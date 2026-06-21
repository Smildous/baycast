# AQ439 morning live BCP and next settlement gate, Jun 21

Controle fait le 2026-06-21T07:03:31Z depuis `/root/baycast-product`, sur `https://baycast-p.vercel.app`.

Le clone etait deja aligne avec `origin/main` au depart, commit `fd610b380eddc8a2b96ac498a842aab4094d1133`. Je n'ai pas lu la table `forecasts`. Les checks Supabase faits pendant ce passage ont lu `questions` seulement avec la config publique du bundle live. La cle anon n'est pas reprise ici.

## Verdict

GO pour le BCP public.

Les pages publiques controlees repondent 200 et ne montrent pas de consensus ouvert, pas de probabilite de consensus, pas de compte exact de forecasters, pas de champ interne de forecast, pas de `settled_by`, pas de `evidence_doc`, pas de payload JSON brut visible.

GO pour la prochaine preparation de settlement.

Le live donne 44 questions dont 42 ouvertes via lecture `questions` seulement. Les 7 candidates ouvertes du 30 juin sont presentes, ouvertes, datees au `2026-06-30T23:59:59+00:00` et pretes sur les champs publics de question verifies. Le chiffre `12 forecasts` et `6 profiles` reste le contexte fourni au job, pas une lecture faite pendant ce run.

## Routes vues sur le live

Scan HTML leger, avec extraction du texte visible et recherche de fuites:

```text
/                                                          200 leak_terms none  Baycast - Predict Real Events
/questions                                                 200 leak_terms none  Browse Prediction Questions
/questions?status=resolved                                 200 leak_terms none  Browse Prediction Questions
/leaderboard                                               200 leak_terms none  Forecaster Leaderboard
/activity                                                  200 leak_terms none  Recent Forecasting Activity
/settlements/apple-mac-pro-wwdc-2026                       200 leak_terms none  Apple Mac Pro at WWDC 2026 settled No
/questions/5745e845-94e9-4802-bbeb-850c982e1276            200 leak_terms none  FIFA opening match at least three total goals
```

La page settlement Apple Mac Pro repond 200 et porte bien la note publique. Elle ne sort pas `settled_by` ni `evidence_doc`.

Le detail ouvert verifie est la question FIFA Jun 30, `/questions/5745e845-94e9-4802-bbeb-850c982e1276`. La page affiche la question ouverte et le contexte de resolution, sans publier de consensus ni de participation.

Termes et motifs cherches dans les routes ci dessus:

```text
aggregate_probability
forecasters_count
forecastCount
fcCount
exact forecaster counts, regex \b\d{1,3}(?:,\d{3})*\s+forecasters?\b
consensus probability, regex consensus/community consensus suivi d'un pourcentage
settled_by
evidence_doc
raw JSON payload visible, pre JSON, application/json, __NEXT_DATA__
```

Resultat: aucun hit sur le perimetre du gate.

## Scripts repo lances

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

`npm run verify:next-settlement-watch` echoue dans ce clone sans env locale, avant toute lecture live:

```text
next settlement watch: FAIL
Supabase env unavailable: Missing SUPABASE_URL/NEXT_PUBLIC_SUPABASE_URL or SUPABASE_ANON_KEY/NEXT_PUBLIC_SUPABASE_ANON_KEY
```

J'ai donc repris la meme approche publique que les gates precedents: extraction de la config publique Supabase depuis le bundle client live, puis lecture read only de `questions` seulement. Aucune requete vers `forecasts`.

## Seven Jun 30 candidates

Lecture `questions` seulement:

```text
total_questions: 44
open_questions: 42
jun30_open_count: 7
jun30_ready_count: 7
jun30_not_ready_count: 0
proto_http: 200
```

Candidates Jun 30 verifiees:

```text
9df06e86-a3f4-4550-8381-c6be33ea48a7 | open | other   | 2026-06-30T23:59:59+00:00 | Will the 2026 Cannes Palme d'Or go to a film from a female director?
3682dcd2-3680-4a58-bf06-4762f26b4541 | open | economy | 2026-06-30T23:59:59+00:00 | Will Ethereum close above $5,000 on Coinbase before July 1, 2026?
54f7e8b0-0dd6-4052-a5f3-2752c133083c | open | economy | 2026-06-30T23:59:59+00:00 | Will the S&P 500 close above 7,000 on any trading day before July 1, 2026?
9beb8cd0-474d-4ab4-b52c-e2c83820350b | open | economy | 2026-06-30T23:59:59+00:00 | Will the ECB cut its deposit facility rate at its June 2026 monetary policy meeting?
d3338e47-11ec-4568-942e-42bb19be0f5e | open | tech    | 2026-06-30T23:59:59+00:00 | Will OpenAI release a new public video generation model before July 1, 2026?
cff593cd-e4f7-424f-b468-c8412edc3c6c | open | economy | 2026-06-30T23:59:59+00:00 | Will US core CPI for May 2026 be 0.3 percent month over month or higher?
5745e845-94e9-4802-bbeb-850c982e1276 | open | sports  | 2026-06-30T23:59:59+00:00 | Will the 2026 FIFA World Cup opening match have at least three total goals?
```

Decision finale: BCP public GO. Next settlement readiness GO, avec la contrainte maintenue de ne lire que `questions` jusqu'au besoin de settlement.