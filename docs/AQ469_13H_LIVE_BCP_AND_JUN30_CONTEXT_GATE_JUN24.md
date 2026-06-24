# AQ-469 13h live BCP and Jun 30 context gate, Jun 24

Checked 2026-06-24 13:01 UTC from `/root/baycast-product` at `a446cd41f10ff13b25d838ffafd50405626b4f78`, `docs: add AQ-467 deployability gate`.

Verdict: SEND for Product/Questions.

I kept this gate public. I did not query Supabase, did not read `forecasts`, and did not use any private table output. The checks were done against `https://baycast-p.vercel.app` through the existing public BCP verifier, a small public HTML fetch script in `/tmp`, and browser DOM inspection on the two Jun 30 question details.

## Commands run

`git -C /root/baycast-product fetch origin main && git -C /root/baycast-product merge --ff-only origin/main`

Result: already up to date on `origin/main`.

`npm run verify:public-bcp`

Result: pass. The verifier checked `/`, `/questions`, `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`, `/leaderboard`, and `/activity`.

`node /tmp/aq469_live_check.mjs`

Result: pass. The script fetched only public production pages and inspected returned HTML and public text.

Browser DOM checks were run on:

`https://baycast-p.vercel.app/questions/5745e845-94e9-4802-bbeb-850c982e1276`

`https://baycast-p.vercel.app/questions/d3338e47-11ec-4568-942e-42bb19be0f5e`

Result: pass. The DOM matched the public HTML result and showed no private BCP fields or raw resolution payloads.

## Public surfaces checked

The live pages returned 200:

`/`, title `Baycast - Predict Real Events`.

`/questions`, title `Browse Prediction Questions — Baycast`.

`/questions?status=resolved`, title `Browse Prediction Questions — Baycast`.

`/leaderboard`, title `Forecaster Leaderboard — Baycast`.

`/activity`, title `Recent Forecasting Activity — Baycast`.

`/settlements/apple-mac-pro-wwdc-2026`, title `Apple Mac Pro at WWDC 2026 settled No — Baycast`.

`/questions/5745e845-94e9-4802-bbeb-850c982e1276`, title `Will the 2026 FIFA World Cup opening match have at least three total goals? - Baycast`.

`/questions/d3338e47-11ec-4568-942e-42bb19be0f5e`, title `Will OpenAI release a new public video generation model before July 1, 2026? - Baycast`.

The questions page still links to both Jun 30 details. The Apple settlement route is a human public note for the Apple Mac Pro question, outcome No. It is not a raw JSON dump.

## BCP leakage check

Across the checked production HTML, public text, and browser DOM, I found no occurrence of these internal names:

`aggregate_probability`, `forecasters_count`, `forecastCount`, `fcCount`, `settled_by`, `evidence_doc`.

I also checked visible text for exact open forecaster-count copy, early consensus probability copy, and raw resolution JSON patterns. No hits. The open details keep the intended blind copy: `Lock your forecast before the crowd can shape it`, `Community signal`, and `Community signal locked`.

The forecast slider default at 50 percent and quick buttons at 5, 10, 25, 50, 75, 90, and 95 percent are visible on open detail pages. That is the user input UI. It is not displayed as community probability, consensus, or public crowd data.

Resolved surfaces remain acceptable for this gate. The resolved list, leaderboard, activity page, and Apple settlement note expose settled public information only. I did not see `settled_by`, `evidence_doc`, or raw resolution JSON on those pages.

## Jun 30 context

FIFA detail: `https://baycast-p.vercel.app/questions/5745e845-94e9-4802-bbeb-850c982e1276`.

The page shows the close date `Jun 30, 2026`. The resolution source is `FIFA official match centre: https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026`.

The context section has one visible context link: `FIFA World Cup 2026`, provider `FIFA`, pointing to `https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026`. I did not see generic or non-official context links such as ESPN, The Athletic, AI.gov, Wikipedia, Reuters, or AP News on this detail.

OpenAI detail: `https://baycast-p.vercel.app/questions/d3338e47-11ec-4568-942e-42bb19be0f5e`.

The page shows the close date `Jun 30, 2026` and the cutoff text `2026-07-01 00:00 UTC`. The resolution source is `OpenAI News and product release notes: https://openai.com/news/ and https://help.openai.com/en/articles/6825453-chatgpt-release-notes`.

The context section has two visible context links: `OpenAI news and research updates`, provider `OPENAI`, pointing to `https://openai.com/news/`, and `OpenAI ChatGPT release notes`, provider `OPENAI HELP CENTER`, pointing to `https://help.openai.com/en/articles/6825453-chatgpt-release-notes`. I did not see unrelated context links such as NIST, NASA, Reuters, AP News, or Wikipedia on this detail.

## Final call

SEND.

The live public BCP surfaces checked at 13h UTC did not expose aggregate probability, exact open forecaster counts, early consensus, internal settlement fields, or raw resolution JSON. The Jun 30 FIFA context is official FIFA only. The Jun 30 OpenAI context is official OpenAI and OpenAI Help Center only. No private forecast data was read for this gate.
