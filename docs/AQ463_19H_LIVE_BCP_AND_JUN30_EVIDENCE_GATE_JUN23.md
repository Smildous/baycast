# AQ-463 19h live BCP and Jun 30 evidence gate, Jun 23

Checked at 2026-06-23 19:03 UTC from the live proto: https://baycast-p.vercel.app.

Verdict: NO SEND.

The Blind Consensus Protocol surface is clean on the pages checked. I did not read the forecasts table and did not inspect any open forecast data. The blocker is Jun 30 settlement readiness: the OpenAI official sources named on the live question are still not usable from this run. Both OpenAI News and the ChatGPT release notes hit Cloudflare in browser and returned 403 from a direct HTTP check. FIFA is usable. OpenAI needs a reliable public evidence path before this goes out.

## URLs checked

Baycast pages:

- https://baycast-p.vercel.app/
- https://baycast-p.vercel.app/questions
- https://baycast-p.vercel.app/questions?status=resolved
- https://baycast-p.vercel.app/leaderboard
- https://baycast-p.vercel.app/activity
- https://baycast-p.vercel.app/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248
- https://baycast-p.vercel.app/questions/5745e845-94e9-4802-bbeb-850c982e1276
- https://baycast-p.vercel.app/questions/d3338e47-11ec-4568-942e-42bb19be0f5e

External evidence sources:

- https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026
- https://openai.com/news/
- https://help.openai.com/en/articles/6825453-chatgpt-release-notes

## BCP safety

Pass.

I checked visible text and DOM/HTML for these leak strings on the required Baycast pages: `aggregate_probability`, `forecasters_count`, `forecastCount`, `fcCount`, `settled_by`, `evidence_doc`, and `resolution_payload`. None appeared in the live DOM on the pages checked.

I also checked for visible exact forecaster counts, early consensus probability, and raw JSON resolution payloads. None appeared on open question surfaces. Open questions showed the expected lock copy:

- `Lock your forecast before the crowd can shape it`
- `Community signal locked`
- `Sign up to save your probability, unlock the comparison after your call, and start building a streak and profile score.`

The open detail pages do show the forecast input default at 50% with quick buttons 5%, 10%, 25%, 50%, 75%, 90%, and 95%. That is user input UI, not community consensus. The page labels the community signal as locked.

The activity page shows one resolved-question forecast:

- `Simba forecasted 50% on Will Apple announce a new Mac Pro at WWDC 2026?`
- Page copy says public forecasting activity appears after questions resolve.

That is acceptable for BCP because it is resolved-question activity, not an open consensus leak.

## Page notes

Home, https://baycast-p.vercel.app/

Pass. Shows 42 live questions, blind-first prediction polling copy, and live question cards. No aggregate probability, no forecaster count, no raw JSON, no resolution payload.

Questions index, https://baycast-p.vercel.app/questions

Pass. Shows `Questions(42 open)`, category filters, status filters, and open cards. Cards use `Lock your call before the crowd can shape it`. No aggregate probability, no exact counts, no early consensus, no raw JSON.

Resolved filter, https://baycast-p.vercel.app/questions?status=resolved

Pass. Shows two resolved questions:

- Apple Mac Pro at WWDC 2026
- 2026 Atlantic hurricane season named storm before June 15

No hidden aggregate fields or raw resolution JSON appeared in the DOM.

Leaderboard, https://baycast-p.vercel.app/leaderboard

Pass for open BCP. It shows calibration fields and a row for Simba with Brier 0.2500 and 2 predictions. It does not expose open consensus, exact open forecaster counts, or aggregate probability.

Activity, https://baycast-p.vercel.app/activity

Pass for open BCP. It only showed resolved-question public activity. No open question forecast values were exposed.

Resolved Apple detail, https://baycast-p.vercel.app/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248

Pass. The page shows:

- Status: Resolved
- Outcome: No
- Resolved date: Jun 13, 2026
- Resolution source: Apple WWDC and Apple Newsroom: https://developer.apple.com/wwdc26/ and https://www.apple.com/newsroom/

No `settled_by`, `evidence_doc`, raw JSON resolution payload, forecaster count, or aggregate probability appeared.

## Jun 30 settlement readiness

FIFA detail, https://baycast-p.vercel.app/questions/5745e845-94e9-4802-bbeb-850c982e1276

BCP pass. It shows the close date as Jun 30, 2026 and keeps the community signal locked. No aggregate probability, exact forecaster count, or raw JSON appeared.

Settlement source is usable enough. The page names:

- `Resolution source: FIFA official match centre: https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026`

Browser loaded the FIFA tournament page successfully. A direct HTTP check also returned 200 with text/html. The FIFA page exposes tournament navigation including Matches, so it is a workable source for the official final score.

Issue to clean up before final polish: the live context links on the FIFA page are odd. They show AI.gov, The Athletic, and ESPN, while the resolution source is FIFA. This is not a BCP leak, but it is noisy for settlement prep.

OpenAI detail, https://baycast-p.vercel.app/questions/d3338e47-11ec-4568-942e-42bb19be0f5e

BCP pass. It shows the close date as Jun 30, 2026 and keeps the community signal locked. No aggregate probability, exact forecaster count, or raw JSON appeared.

Settlement source is not usable enough from this run. The page names:

- `Resolution source: OpenAI News and product release notes: https://openai.com/news/ and https://help.openai.com/en/articles/6825453-chatgpt-release-notes`

Both official OpenAI URLs loaded as `Just a moment...` Cloudflare challenge pages in browser. A direct HTTP check returned 403 for both URLs. That means the evidence path is not reliable for automated settlement prep at this gate.

Issue to clean up before final polish: the OpenAI context links include NIST, OpenAI News, and NASA. NIST and NASA are unrelated to this settlement question. They do not leak BCP data, but they make the evidence section look weak.

## Final call

NO SEND.

Ship readiness is close on BCP safety. I would not send this gate until the OpenAI Jun 30 evidence path is fixed or documented with a reliable public fallback, and the unrelated context links on the FIFA and OpenAI question pages are cleaned up. The open-question consensus guard itself held during this run.
