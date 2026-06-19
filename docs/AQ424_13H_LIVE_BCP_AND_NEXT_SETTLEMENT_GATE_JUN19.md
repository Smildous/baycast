# AQ424 13h live BCP and next settlement gate, Jun 19

Passage fait le 2026-06-19 13:03 UTC sur `https://baycast-p.vercel.app`, depuis `/root/baycast-product`.

J'ai commencé par `git fetch origin && git pull --ff-only origin main`. Le repo était déjà à jour. Les contrôles live ont été faits en HTTP public et au navigateur. Côté Supabase, j'ai lu uniquement `questions` en read-only pour les statuts, titres et dates de fermeture. Je n'ai pas lu `forecasts`.

## Verdict

GO pour le BCP public.

Les surfaces publiques ne montrent pas d'`aggregate_probability`, `forecasters_count`, `settled_by`, `evidence_doc`, raw JSON, copie `consensus probability`, compteur exact de forecasts, `forecastCount` ou `fcCount` dans le corps visible ou le HTML testé.

GO aussi pour la watch settlement. Aucun open question n'est past close à 13h UTC. Les prochains candidats restent le lot du 30 juin, donc pas de nouvelle résolution à traiter aujourd'hui.

## Surfaces publiques

`/` répond 200. La home affiche `42 Questions live now`, le cadrage `Blind-first` et `Prediction polling`, puis des questions ouvertes. Rien ne publie le signal communautaire.

`/questions` répond 200. Le navigateur affiche `Questions(42 open)`, `Closing Soon`, puis FIFA, OpenAI, CPI, Apple foldable, Xbox handheld et les autres cartes. Les cartes gardent `Lock your call before the crowd can shape it`.

`/questions?status=resolved` répond 200. La page montre les deux résolues, Apple Mac Pro et Atlantic hurricane season. Le libellé public reste `Resolved. Scores now count against the final outcome`.

`/leaderboard` répond 200. Il affiche les colonnes publiques `Brier`, `Log Score`, `Predictions`, `Resolved`, avec une ligne visible pour S Simba. Ce sont des scores résolus, pas un consensus d'open question.

`/activity` répond 200. Le flux visible montre une activité sur Apple Mac Pro, question déjà résolue. Pas d'activité ouverte exposée.

`/settlements/apple-mac-pro-wwdc-2026` répond 200. La note affiche `Apple Mac Pro at WWDC 2026 resolved No`, l'outcome `No`, `Settled June 13, 2026`, les sources Apple, et le cadrage prudent du premier score. Pas de champ privé visible.

Page détail ouverte vérifiée sans lire les forecasts: `/questions/5745e845-94e9-4802-bbeb-850c982e1276`. Elle affiche la question FIFA, `Sports`, `12 d left`, `Community signal locked`, `Jun 30, 2026`, la source de résolution FIFA, le slider et les CTA de connexion. Les pourcentages visibles sont les contrôles de saisie utilisateur.

## Commandes et résultats

`npm run verify:public-bcp` passe:

```text
Verifying public BCP surfaces at https://baycast-p.vercel.app
ok /
ok /questions
ok /questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248
ok /leaderboard
ok /activity
Public BCP surface verification passed.
```

`npm run verify:distribution-gate` passe:

```text
Verifying distribution gate at https://baycast-p.vercel.app
ok /settlements/apple-mac-pro-wwdc-2026
ok /questions?status=resolved
ok /
Distribution gate verification passed.
```

`npm run verify:next-settlement-watch` ne peut pas lire Supabase dans ce shell, faute de variables env:

```text
next settlement watch: FAIL
Supabase env unavailable: Missing SUPABASE_URL/NEXT_PUBLIC_SUPABASE_URL or SUPABASE_ANON_KEY/NEXT_PUBLIC_SUPABASE_ANON_KEY
```

J'ai donc fait la lecture REST read-only de `questions` avec la config publique embarquée côté client. Le scan HTTP public des pages demandées a aussi renvoyé 200 partout, avec `leak_terms=none` pour `aggregate_probability`, `forecasters_count`, `settled_by`, `evidence_doc`, `raw JSON`, `consensus probability`, compteur exact de forecasts, `forecastCount` et `fcCount`.

## Supabase questions only

Lecture effectuée: `id,title,status,closes_at,created_at,resolved_at,resolution_source` sur `questions`, ordre `closes_at.asc`.

État lu à 13h UTC:

- total questions: 44
- open: 42
- resolved: 2
- open past close: 0

Résolues:

- `13aa9f2f-3226-4213-a04f-0cc2b87ad248`, close `2026-06-13T00:00:00+00:00`, resolved_at `2026-06-13T07:06:50.32+00:00`, Apple Mac Pro at WWDC 2026
- `9345891c-192a-4915-acad-8bed7c554333`, close `2026-06-15T00:00:00+00:00`, resolved_at `2026-06-17T19:06:47.535+00:00`, 2026 Atlantic hurricane season named storm before June 15

Prochains candidats, tous open et tous close `2026-06-30T23:59:59+00:00`:

- `9df06e86-a3f4-4550-8381-c6be33ea48a7`, Cannes Palme d'Or female director
- `3682dcd2-3680-4a58-bf06-4762f26b4541`, Ethereum above $5,000 before July 1
- `54f7e8b0-0dd6-4052-a5f3-2752c133083c`, S&P 500 above 7,000 before July 1
- `9beb8cd0-474d-4ab4-b52c-e2c83820350b`, ECB deposit facility rate cut in June 2026 meeting
- `d3338e47-11ec-4568-942e-42bb19be0f5e`, OpenAI public video generation model before July 1
- `cff593cd-e4f7-424f-b468-c8412edc3c6c`, US core CPI May 2026 at least 0.3 percent MoM
- `5745e845-94e9-4802-bbeb-850c982e1276`, FIFA opening match at least three total goals

## Décision

Public BCP: GO.

Next settlement watch: GO. Aucun settlement nouveau à préparer ou exécuter aujourd'hui. Continuer à surveiller le lot Jun 30.
