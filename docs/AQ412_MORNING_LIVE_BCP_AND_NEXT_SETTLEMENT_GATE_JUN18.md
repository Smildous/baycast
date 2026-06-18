# AQ412 morning live BCP and next settlement gate, Jun 18

Checked at 2026-06-18 07:03 UTC against `https://baycast-p.vercel.app` from `/root/baycast-product`.

I fast-forwarded `main` from `origin/main` first. I used public browser checks, public HTML fetches, `npm run verify:public-bcp`, and one read-only Supabase REST read against `questions` only. I did not read forecasts, did not query the `forecasts` table, did not open forecast admin data, and did not write to Supabase.

## Commands run

```bash
git -C /root/baycast-product fetch origin main
git -C /root/baycast-product merge --ff-only origin/main
npm run verify:public-bcp
npm run verify:next-settlement-watch
node public-route-html-scan
node questions-only-settlement-watch
```

`npm run verify:public-bcp` passed on `/`, `/questions`, the Apple resolved question page, `/leaderboard`, and `/activity`.

`npm run verify:next-settlement-watch` could not run with local env because this clone has no Supabase env loaded: `Missing SUPABASE_URL/NEXT_PUBLIC_SUPABASE_URL or SUPABASE_ANON_KEY/NEXT_PUBLIC_SUPABASE_ANON_KEY`. I treated that as an env miss, not a product failure, then used the public app bundle config for a read-only REST call to `questions` with this select only: `id,title,status,category,closes_at,resolution_source`. No forecast fields were requested.

The questions-only read returned 44 total questions, 42 open, 2 resolved, and no open question with `closes_at` already in the past at the time of the gate.

## Public routes checked

`/` returned 200 in the browser. The home page showed 42 live questions, prediction polling copy, and the current top live cards. FIFA and OpenAI were visible as 13d left. I found no visible or DOM/HTML hit for `aggregate_probability`, `forecasters_count`, `settled_by`, `evidence_doc`, `raw JSON`, exact forecast counts, `consensus probability`, `consensus_probability`, `forecastCount`, or `fcCount`.

`/questions` returned 200 in the browser. It showed `Questions(42 open)`. The closing-soon list included FIFA, OpenAI, CPI, Apple foldable, Microsoft Xbox handheld, Meta Llama, Google DeepMind IMO, payrolls, ECB, S&P 500, Bank of Japan, NATO, and G7. The open cards kept the line `Lock your call before the crowd can shape it`. No blocked BCP terms were present in visible text or HTML.

`/questions?status=resolved` returned 200 in the browser. It showed two resolved questions: Apple Mac Pro and Atlantic hurricane. Both were discoverable from the resolved filter. No blocked BCP terms were present in visible text or HTML.

`/leaderboard` returned 200 in the browser. It showed the public scoring table with `Forecaster`, `Brier`, `Log Score`, `Predictions`, and `Resolved`, plus Simba with Brier `0.2500`. This is resolved-score surface data, not open-question consensus. No blocked BCP field names or raw JSON terms were present in HTML.

`/activity` returned 200 in the browser. It showed resolved-question activity only: Simba forecasted 50% on the Apple Mac Pro question, with the page copy `Public forecasting activity appears after questions resolve` and `Showing recent resolved-question forecasts`. That is acceptable resolved activity. No open-question BCP data was exposed.

`/settlements/apple-mac-pro-wwdc-2026` returned 200 in the browser. The settlement note was present. It showed `Apple Mac Pro at WWDC 2026 resolved No`, outcome `No`, settled `June 13, 2026`, Apple WWDC and Apple Newsroom sources, Brier-score explanation, and the guardrail line that there are no prices, no trades, and no financial reward. No blocked BCP terms were present in visible text or HTML.

`/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`, the Apple Mac Pro question, returned 200 in the HTML scan. No blocked BCP terms were present in raw HTML.

`/questions/9345891c-192a-4915-acad-8bed7c554333`, the Atlantic hurricane question, returned 200 in the browser. It is now resolved, outcome `No`, resolved date `Jun 17, 2026`, with the NHC resolution source shown. The page says scores use the final Yes/No outcome and that open-question consensus stays hidden until the protocol allows it. No blocked BCP terms were present in visible text or HTML.

`/questions/5745e845-94e9-4802-bbeb-850c982e1276`, the FIFA opening match question, returned 200 in the browser. It is open, shows `13d left`, `Community signal locked`, closes `Jun 30, 2026`, and uses the FIFA official match centre as resolution source. No blocked BCP terms were present in visible text or HTML. The only percentages shown were forecast input presets and the unauthenticated slider value.

`/questions/d3338e47-11ec-4568-942e-42bb19be0f5e`, the OpenAI video model question, returned 200 in the browser. It is open, shows `13d left`, `Community signal locked`, closes `Jun 30, 2026`, and uses OpenAI News plus ChatGPT release notes as resolution sources. No blocked BCP terms were present in visible text or HTML. The only percentages shown were forecast input presets and the unauthenticated slider value.

The direct public HTML scan returned 200 and zero blocked-term hits for all checked routes:

```text
/ | 200 | hits none
/questions | 200 | hits none
/questions?status=resolved | 200 | hits none
/leaderboard | 200 | hits none
/activity | 200 | hits none
/settlements/apple-mac-pro-wwdc-2026 | 200 | hits none
/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248 | 200 | hits none
/questions/9345891c-192a-4915-acad-8bed7c554333 | 200 | hits none
/questions/5745e845-94e9-4802-bbeb-850c982e1276 | 200 | hits none
/questions/d3338e47-11ec-4568-942e-42bb19be0f5e | 200 | hits none
```

## Next settlement watch from questions metadata only

FIFA remains a Jun 30 candidate, not a settlement action today:

`5745e845-94e9-4802-bbeb-850c982e1276 | open | sports | 2026-06-30T23:59:59+00:00 | Will the 2026 FIFA World Cup opening match have at least three total goals?`

OpenAI remains a Jun 30 candidate, not a settlement action today:

`d3338e47-11ec-4568-942e-42bb19be0f5e | open | tech | 2026-06-30T23:59:59+00:00 | Will OpenAI release a new public video generation model before July 1, 2026?`

Apple Mac Pro is already resolved:

`13aa9f2f-3226-4213-a04f-0cc2b87ad248 | resolved | tech | 2026-06-13T00:00:00+00:00 | Will Apple announce a new Mac Pro at WWDC 2026?`

Atlantic hurricane is already resolved:

`9345891c-192a-4915-acad-8bed7c554333 | resolved | science | 2026-06-15T00:00:00+00:00 | Will the 2026 Atlantic hurricane season have a named storm before June 15?`

I found no other open question past close from the questions metadata read.

## Verdict

Pass for the morning live BCP gate. The checked public surfaces keep open-question crowd data blind. I found no visible or raw public leak of aggregate probability, forecaster count, consensus probability, exact forecast counts, `settled_by`, `evidence_doc`, or raw JSON terms.

Pass for the next-settlement gate. There is no open question past close right now. FIFA and OpenAI remain open Jun 30 candidates. Apple and Atlantic are resolved and should stay in resolved-only scoring and activity surfaces.

## Next actions

Keep the Jun 30 watch on FIFA and OpenAI using questions metadata only until close. If local Supabase env is expected in this clone, add it outside git so `npm run verify:next-settlement-watch` can run without the public-bundle fallback. Keep checking public HTML and browser-rendered text before any outbound push, because `/activity` and `/leaderboard` are now carrying resolved-score proof and should not drift into open-question consensus.