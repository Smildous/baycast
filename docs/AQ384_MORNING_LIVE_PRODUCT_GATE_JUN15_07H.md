# AQ-384 morning live product gate, Jun 15 07h UTC

Prepared at 2026-06-15T07:03:03Z.

Scope: live public product check for Baycast production at `https://baycast-p.vercel.app`. I used public pages only. I did not open Supabase, admin screens, forecast rows, forecast docs, consensus data, user lists, or any open-question forecast detail.

## Verdict

GO for public product health. WAIT for settlement.

The live site is reachable on the checked surfaces. The public copy is aligned with prediction polling, not gambling. The resolved list and the Apple Mac Pro settlement page did not expose `aggregate_probability`, `forecasters_count`, `settled_by`, or `evidence_doc` in the public HTML I checked.

The next resolution candidates from AQ-383 remain the right watch order: FIFA opening match goals, OpenAI public video generation model, then Microsoft first-party Xbox handheld. FIFA and OpenAI close at the June 30 cutoff. Microsoft stays queued for the July 31 cutoff. No settlement should run before the relevant close time has passed and public evidence is complete.

## Live pages checked

At 07:03 UTC, browser and same-origin fetch checks returned HTTP 200 for:

- `/`, title `Baycast - Predict Real Events`
- `/questions`, title `Browse Prediction Questions — Baycast`
- `/questions?status=resolved`, title `Browse Prediction Questions — Baycast`
- `/leaderboard`, title `Forecaster Leaderboard — Baycast`
- `/activity`, title `Recent Forecasting Activity — Baycast`
- `/settlements/apple-mac-pro-wwdc-2026`, title `Apple Mac Pro at WWDC 2026 settled No — Baycast`

Visible checks matched the expected public product shape. The homepage shows `Blind-first` and `Prediction polling`. The questions page shows 43 open questions and the open cards use `Lock your call before the crowd can shape it`. The resolved filter shows the Apple Mac Pro resolved question with scoring copy, not consensus or crowd-count copy. The leaderboard renders calibration columns. The activity feed only showed resolved Apple Mac Pro activity during this pass. The settlement page says: `Baycast is prediction polling. A person makes a probability estimate, the question resolves against public evidence, and the forecast receives a score. There are no prices to move, no trades to place, and no financial reward attached to this settlement note.`

## BCP public-surface scan

I scanned the public HTML for the resolved list and the Apple Mac Pro settlement URL.

`/questions?status=resolved`: no hits for `aggregate_probability`, `forecasters_count`, `settled_by`, or `evidence_doc`. Also no hits for `free-to-play`, `gambling`, `betting`, `wager`, or `casino`.

`/settlements/apple-mac-pro-wwdc-2026`: no hits for `aggregate_probability`, `forecasters_count`, `settled_by`, or `evidence_doc`. Also no hits for `free-to-play`, `gambling`, `betting`, `wager`, or `casino`. The settlement page contains `prediction polling` copy.

This is clean for the BCP guardrail checked here: no public consensus/count leaks before forecast, and no gambling framing on the reviewed public pages.

## AQ-383 candidate recheck

I rechecked only the public question pages and visible listing text.

FIFA opening match goals: `https://baycast-p.vercel.app/questions/5745e845-94e9-4802-bbeb-850c982e1276` returned HTTP 200. The public page is open and shown as 16 days left. The title and resolution text still match AQ-383: Yes requires at least three total official goals by the end of regulation plus stoppage time, with extra time and penalties excluded under the stated condition.

OpenAI public video generation model: `https://baycast-p.vercel.app/questions/d3338e47-11ec-4568-942e-42bb19be0f5e` returned HTTP 200. The public page is open and shown as 16 days left. The title and resolution text still match AQ-383: Yes requires a new or materially upgraded public video generation model before `2026-07-01 00:00 UTC`; demos, waitlists, safety notes, pricing changes, and minor UI updates do not count.

Microsoft first-party Xbox handheld: `https://baycast-p.vercel.app/questions/5cc9fe74-5306-49d9-bec3-251ad276a779` returned HTTP 200. The public page is open and shown as 47 days left. The title and resolution text still match AQ-383: Yes requires Microsoft or Xbox to publicly announce a Microsoft-branded handheld gaming device before `2026-08-01 00:00 UTC`; third-party Windows handhelds, cloud-only apps, accessories, and rumors do not count.

No forecasts were read. The candidate order remains evidence-prep only, not a settlement decision.
