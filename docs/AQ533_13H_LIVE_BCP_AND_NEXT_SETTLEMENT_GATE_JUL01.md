# AQ-533 13h live BCP and next settlement gate, Jul 1

Date: 2026-07-01 13:04 UTC.

Forecasts read: no. I did not query the forecasts table, forecast rows, aggregate probabilities, forecaster counts, score rows, private settlement fields, or forecast exports. The checks below use public Baycast pages, repo docs, and the repo verifier that only fetches public HTML.

## Exact commands run

```bash
git fetch origin && git checkout main && git pull --ff-only origin main
npm run verify:public-bcp
date -u +'%Y-%m-%d %H:%M:%S UTC'
```

Command results:

`git fetch origin && git checkout main && git pull --ff-only origin main` left `main` already up to date with `origin/main`.

`npm run verify:public-bcp` passed:

```text
Verifying public BCP surfaces at https://baycast-p.vercel.app
ok /
ok /questions
ok /questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248
ok /leaderboard
ok /activity
Public BCP surface verification passed.
```

`date -u +'%Y-%m-%d %H:%M:%S UTC'` returned `2026-07-01 13:04:32 UTC`.

## Public routes checked in browser

Base: `https://baycast-p.vercel.app`.

`/`

Result: 200 in browser. Homepage shows `40 Questions live now`, public navigation, and live question cards. The first visible live cards are CPI, ECB, S&P 500, Ethereum, and Cannes with `Closes today` and `Lock your call before the crowd can shape it`. DOM scan found no `aggregate_probability`, `forecasters_count`, `forecastCount`, `fcCount`, `settled_by`, or `evidence_doc`. No exact `N forecasters` copy was visible.

`/questions`

Result: 200 in browser. Page shows `Questions(40 open)`. Open cards keep category, time label, title, and blind-first copy. First page includes CPI, ECB, and S&P 500 as `Closes today`. DOM scan found no leak fields and no exact forecaster-count copy.

`/questions?status=resolved`

Result: 200 in browser. Page shows `Questions(4 resolved)`. The resolved list contains Apple Mac Pro, FIFA opener, Atlantic hurricane, and OpenAI video model. The two Jul 1 settlements are visible as resolved cards. DOM scan found no `aggregate_probability`, `forecasters_count`, `forecastCount`, `fcCount`, `settled_by`, or `evidence_doc`, and no exact forecaster-count copy.

`/leaderboard`

Result: 200 in browser. Leaderboard is public and still clean. It shows one ranked forecaster, `Simba`, with Brier `0.2500` and `2` predictions. DOM scan found none of the leak fields and no exact forecaster-count copy.

`/activity`

Result: 200 in browser. Activity feed shows public resolved-question activity only: `Simba forecasted 50% on Will Apple announce a new Mac Pro at WWDC 2026?`, plus the note that public forecasting activity appears after questions resolve. The new Jul 1 settlements add no visible activity, consistent with the prior settlement note that both had 0 forecasts. DOM scan found none of the leak fields and no exact forecaster-count copy.

`/questions?sort=closing-soon`

Result: 200 in browser. The page shows `Questions(0 closing soon)` and `No questions closing in the next 14 days`. This does not match the default list labels that show several questions as `Closes today`. I treated this as a product follow-up, not a BCP failure, because it did not leak consensus or forecast counts.

## Recently resolved Jul 1 question pages

The two pages were discoverable from prior repo docs and confirmed again from `/questions?status=resolved`.

`/questions/5745e845-94e9-4802-bbeb-850c982e1276`

Title: `Will the 2026 FIFA World Cup opening match have at least three total goals?`

Result: 200 in browser. Page shows `Sports`, `Resolved`, status `Resolved`, outcome `No`, resolved date `Jul 1, 2026`, and resolution source `FIFA official match centre: https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026`. DOM scan found no `aggregate_probability`, `forecasters_count`, `forecastCount`, `fcCount`, `settled_by`, or `evidence_doc`, and no exact forecaster-count copy.

`/questions/d3338e47-11ec-4568-942e-42bb19be0f5e`

Title: `Will OpenAI release a new public video generation model before July 1, 2026?`

Result: 200 in browser. Page shows `Technology`, `Resolved`, status `Resolved`, outcome `Yes`, resolved date `Jul 1, 2026`, and resolution source `OpenAI News and product release notes: https://openai.com/news/ and https://help.openai.com/en/articles/6825453-chatgpt-release-notes`. DOM scan found no `aggregate_probability`, `forecasters_count`, `forecastCount`, `fcCount`, `settled_by`, or `evidence_doc`, and no exact forecaster-count copy.

## Next settlement watch, public/read-only only

I used only public route text and public question detail data. No forecasts were read.

The next visible settlement candidates are the open questions marked `Closes today` in public Baycast UI:

- `/questions/cff593cd-e4f7-424f-b468-c8412edc3c6c`: `Will US core CPI for May 2026 be 0.3 percent month over month or higher?`
- `/questions/9beb8cd0-474d-4ab4-b52c-e2c83820350b`: `Will the ECB cut its deposit facility rate at its June 2026 monetary policy meeting?`
- `/questions/54f7e8b0-0dd6-4052-a5f3-2752c133083c`: `Will the S&P 500 close above 7,000 on any trading day before July 1, 2026?`
- `/questions/3682dcd2-3680-4a58-bf06-4762f26b4541`: `Will Ethereum close above $5,000 on Coinbase before July 1, 2026?`
- `/questions/9df06e86-a3f4-4550-8381-c6be33ea48a7`: `Will the 2026 Cannes Palme d'Or go to a film from a female director?`

Detail spot-check on CPI shows public close label `Jun 30, 2026`, resolution source `US Bureau of Labor Statistics CPI release: https://www.bls.gov/cpi/`, and `Community signal locked`. It also still shows the unauthenticated forecast UI even though the card says `Closes today`; this is worth checking before any next settlement run, but it is not a public BCP leak by itself.

The watch verdict is READY FOR PUBLIC EVIDENCE GATE, not ready for settlement from this run alone. The next run should collect official public evidence first, then only read forecasts after the evidence gate and after any resolution writes.

## Verdict

Live public BCP after the Jul 1 settlements: PASS.

Resolved-question display after settlement: PASS.

Next settlement watch: PASS with one product follow-up. Public listings expose five `Closes today` candidates, while `/questions?sort=closing-soon` says zero closing soon. That needs product attention, but no consensus, count, forecast row, private settlement field, or evidence doc leaked on the checked surfaces.
