# AQ442 13h live BCP and next settlement gate, Jun 21

Controle fait le 2026-06-21T13:03:34Z depuis `/root/baycast-product`, sur `https://baycast-p.vercel.app`.

Le clone a ete synchronise avant le passage avec fetch origin puis pull fast forward only sur main. Point de depart: `4dacc2299207ecde52fbaeda1098be5b6b4546a8`. Je n'ai pas lu la table `forecasts`. Pour les comptes et les candidates de settlement, j'ai lu `questions` seulement avec la config publique exposee par le bundle live. La cle anon n'est pas reprise dans ce compte rendu.

## Verdict

PASS.

Le BCP public tient sur les surfaces controlees. Les pages publiques repondent 200, restent en HTML, et ne montrent pas de consensus ouvert, pas de probabilite de consensus avant resolution, pas de compte exact de forecasters, pas de champ interne de forecast, pas de `settled_by`, pas de `evidence_doc`, pas de payload JSON brut visible.

La prochaine vague de settlement reste propre a surveiller autour du 30 juin. Le live donne 44 questions, 42 ouvertes, 2 resolues. Les 7 candidates ouvertes datees au `2026-06-30T23:59:59+00:00` sont presentes et encore ouvertes. Le contexte fourni au job mentionne 12 forecasts et 6 profiles, mais je ne l'ai pas recontrole via `forecasts` pendant ce gate.

## Surfaces live vues

Scan HTTP direct du HTML public, avec extraction du texte visible et recherche des termes interdits:

```text
/                                                           200  Baycast - Predict Real Events
/questions                                                  200  Browse Prediction Questions, Baycast
/questions?status=resolved                                  200  Browse Prediction Questions, Baycast
/leaderboard                                                200  Forecaster Leaderboard, Baycast
/activity                                                   200  Recent Forecasting Activity, Baycast
/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248             200  Will Apple announce a new Mac Pro at WWDC 2026? - Baycast
/questions/5745e845-94e9-4802-bbeb-850c982e1276             200  Will the 2026 FIFA World Cup opening match have at least three total goals? - Baycast
```

La question resolue controlee est Apple Mac Pro WWDC 2026, id `13aa9f2f-3226-4213-a04f-0cc2b87ad248`. La question ouverte Jun 30 controlee est FIFA opening match, id `5745e845-94e9-4802-bbeb-850c982e1276`.

Recherche faite sur le HTML et le texte visible:

```text
aggregate_probability
forecasters_count
forecastCount
fcCount
exact forecaster counts, regex \b\d{1,3}(?:,\d{3})*\s+forecasters?\b
premature consensus probability, consensus/community consensus suivi d'un pourcentage
settled_by
evidence_doc
raw JSON payload visible, pre JSON, application/json, payload JSON apparent
```

Resultat: aucun hit sur le perimetre du gate.

## Comptes et watch Jun 30

Lecture read only de `questions` seulement:

```text
total_questions: 44
open_questions: 42
resolved_questions: 2
jun30_open_count: 7
proto_http: 200
```

Candidates ouvertes autour du 30 juin:

```text
9df06e86-a3f4-4550-8381-c6be33ea48a7 | open | other   | 2026-06-30T23:59:59+00:00 | Will the 2026 Cannes Palme d'Or go to a film from a female director?
3682dcd2-3680-4a58-bf06-4762f26b4541 | open | economy | 2026-06-30T23:59:59+00:00 | Will Ethereum close above $5,000 on Coinbase before July 1, 2026?
54f7e8b0-0dd6-4052-a5f3-2752c133083c | open | economy | 2026-06-30T23:59:59+00:00 | Will the S&P 500 close above 7,000 on any trading day before July 1, 2026?
9beb8cd0-474d-4ab4-b52c-e2c83820350b | open | economy | 2026-06-30T23:59:59+00:00 | Will the ECB cut its deposit facility rate at its June 2026 monetary policy meeting?
d3338e47-11ec-4568-942e-42bb19be0f5e | open | tech    | 2026-06-30T23:59:59+00:00 | Will OpenAI release a new public video generation model before July 1, 2026?
cff593cd-e4f7-424f-b468-c8412edc3c6c | open | economy | 2026-06-30T23:59:59+00:00 | Will US core CPI for May 2026 be 0.3 percent month over month or higher?
5745e845-94e9-4802-bbeb-850c982e1276 | open | sports  | 2026-06-30T23:59:59+00:00 | Will the 2026 FIFA World Cup opening match have at least three total goals?
```

## Scripts repo

Les verifs publiques passent:

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

`npm run verify:next-settlement-watch` ne peut pas partir dans ce clone sans env locale:

```text
next settlement watch: FAIL
Supabase env unavailable: Missing SUPABASE_URL/NEXT_PUBLIC_SUPABASE_URL or SUPABASE_ANON_KEY/NEXT_PUBLIC_SUPABASE_ANON_KEY
```

Ce n'est pas un bug live. J'ai donc fait la lecture publique `questions` seulement decrite plus haut.

## Bugs

Aucun bug trouve pendant ce gate.

Decision finale: PASS pour le BCP public. PASS pour le watch de settlement Jun 30, avec la contrainte maintenue de ne pas lire `forecasts` pour ce controle.
