# AQ408 19h live BCP and next settlement gate, Jun 17

Checked at 2026-06-17 19:02 UTC against `https://baycast-p.vercel.app`.

I used public HTML fetches, public browser-equivalent page text, and one read-only Supabase REST read against the `questions` table. I did not query `forecasts`, did not read private forecast rows, and did not write to Supabase.

## Commands run

```bash
git fetch origin main
git checkout main
git pull --rebase origin main

node scripts/supabase-admin.mjs verify-resolution-readiness --from 2026-06-01T00:00:00.000Z --until 2026-06-30T23:59:59.999Z
```

The Supabase command was run with the public app Supabase URL and anon key extracted from the live public app bundle. It returned `mode: readonly`, `table: questions`, `open_questions: 43`, `soon_closing_open_questions: 8`, `ready_soon_closing_open_questions: 8`, `not_ready_soon_closing_open_questions: 0`. The available columns were `id`, `title`, `description`, `status`, `category`, `question_type`, `options`, `resolution_source`, `closes_at`; `resolution_date` was absent. I did not ask for any forecast columns.

## Public routes checked

`/` returned 200. The home page still showed public prediction polling copy. The live list included the overdue Atlantic hurricane question, FIFA, OpenAI, US core CPI, and ECB. I found no visible or raw HTML hit for `aggregate_probability`, `forecasters_count`, `forecast_count`, `forecasts_count`, `forecastCount`, `fcCount`, `consensus probability`, `consensus_probability`, `Community consensus`, `settled_by`, `evidence_doc`, or gambling copy.

`/questions` returned 200. It showed `Questions (43 open)`. The closing-soon list included FIFA and OpenAI as `14 d left`, both with `Lock your call before the crowd can shape it`. No blocked BCP terms or exact forecast counts were present in the raw HTML or visible text.

`/questions?status=resolved` returned 200. It showed the resolved Apple Mac Pro question and the line `Resolved. Scores now count against the final outcome`. I found no blocked BCP serialization and no gambling copy.

`/leaderboard` returned 200. It showed public scoring columns: `Forecaster`, `Brier`, `Log Score`, `Predictions`, `Resolved`. It did not expose open-question aggregate probability, consensus probability, exact forecast counts, `settled_by`, or `evidence_doc`.

`/activity` returned 200. It showed resolved-question activity only, including `Public forecasting activity appears after questions resolve` and `Showing recent resolved-question forecasts`. This is acceptable for resolved activity. No open-question BCP data was exposed.

`/settlements/apple-mac-pro-wwdc-2026` returned 200. It showed `Apple Mac Pro at WWDC 2026 resolved No`, `Outcome No`, and `Settled June 13, 2026`. The page also kept the guardrail copy: `There are no prices to move, no trades to place, and no financial reward attached to this settlement note.` No blocked BCP fields or gambling terms were found.

## Next settlement candidates from `questions` only

The read-only `questions` scan found 44 total questions, 43 open, and 1 resolved. The next open candidate by `closes_at` is:

`/questions/9345891c-192a-4915-acad-8bed7c554333` returned 200. Title: `Will the 2026 Atlantic hurricane season have a named storm before June 15?`. Supabase status is `open`, category `science`, `closes_at` is `2026-06-15T00:00:00+00:00`, and `resolution_source` is `National Hurricane Center advisories and tropical cyclone reports: https://www.nhc.noaa.gov/`. The page showed `Closes today`, `Community signal locked`, `Jun 15, 2026`, and the same sign-up forecast UI. The readiness script marked it `ready: true` with no missing fields. This is the only open candidate already past its close time at the 19h UTC gate.

The other June candidates returned 200 on their question pages and all remained open with a public close date of Jun 30, 2026. The readiness script marked each as metadata-ready because the source fields are present, but they are not settlement-ready today because their close time has not arrived:

- `/questions/54f7e8b0-0dd6-4052-a5f3-2752c133083c`, S&P 500 above 7,000, open, closes `2026-06-30T23:59:59+00:00`.
- `/questions/9df06e86-a3f4-4550-8381-c6be33ea48a7`, Cannes Palme d'Or female director, open, closes `2026-06-30T23:59:59+00:00`.
- `/questions/cff593cd-e4f7-424f-b468-c8412edc3c6c`, US core CPI for May 2026, open, closes `2026-06-30T23:59:59+00:00`.
- `/questions/9beb8cd0-474d-4ab4-b52c-e2c83820350b`, ECB deposit facility rate cut, open, closes `2026-06-30T23:59:59+00:00`.
- `/questions/3682dcd2-3680-4a58-bf06-4762f26b4541`, Ethereum above $5,000, open, closes `2026-06-30T23:59:59+00:00`.
- `/questions/d3338e47-11ec-4568-942e-42bb19be0f5e`, OpenAI video model, open, closes `2026-06-30T23:59:59+00:00`.
- `/questions/5745e845-94e9-4802-bbeb-850c982e1276`, FIFA opening match goals, open, closes `2026-06-30T23:59:59+00:00`.

The raw HTML and visible text scan on these eight question pages found no public serialization of `aggregate_probability`, `forecasters_count`, consensus probability, exact forecast count field names, `settled_by`, or `evidence_doc`. The only visible percentages on open pages were forecast input presets and the current unauthenticated slider value.

## FIFA and OpenAI gate

FIFA direct page: `https://baycast-p.vercel.app/questions/5745e845-94e9-4802-bbeb-850c982e1276`. Supabase status is `open`, `closes_at` is `2026-06-30T23:59:59+00:00`, and the public page showed `14 d left`, `Community signal locked`, `Jun 30, 2026`, `Closes`, and the FIFA official match centre as resolution source. It is not settlement-ready at the Jun 17 19h gate.

OpenAI direct page: `https://baycast-p.vercel.app/questions/d3338e47-11ec-4568-942e-42bb19be0f5e`. Supabase status is `open`, `closes_at` is `2026-06-30T23:59:59+00:00`, and the public page showed `14 d left`, `Community signal locked`, `Jun 30, 2026`, `Closes`, and OpenAI News plus ChatGPT release notes as resolution sources. It is not settlement-ready at the Jun 17 19h gate.

## Verdict

Pass for public BCP. The live public app keeps open-question crowd data blind on the checked public surfaces. I found no visible or raw public leak of aggregate probability, forecaster count, consensus probability, exact forecast counts, `settled_by`, or `evidence_doc`.

Settlement gate is narrow. The Atlantic hurricane question is the only open question already past close and metadata-ready from the public `questions` table. FIFA and OpenAI remain open until Jun 30 and should not be settled or messaged as settlement-ready today.
