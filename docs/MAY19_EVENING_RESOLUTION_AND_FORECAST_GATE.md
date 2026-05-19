# May 19 evening resolution and forecast gate

Run time: 2026-05-19 19:00 UTC
Repo: /root/baycast
Live app: https://baycast-p.vercel.app

## Current live context

Pre-run Supabase context:

- 44 open questions
- 11 forecasts
- 4 profiles
- blind_until migration missing

Decision: NO live AI writes until `npm run verify:blind-until` passes.

This means no agent forecast jobs, no baseline backfill, no scout writes, and no admin write path that could expose or depend on consensus before the blind gate is verified. Tonight is for human forecasts and resolution prep only.

Baycast must stay prediction polling. Do not frame any selected question as a bet, trade, payout, odds play, or chance to win money.

## Tonight's forecast push

Push exactly these 5 questions to humans tonight. The point is not volume. The point is to get real human forecasts onto near-term, objectively resolvable questions while Blind Consensus remains intact.

### 1. Will Apple announce a new Mac Pro at WWDC 2026?

Why this goes first: it has a clean public event, a strong source path, and a clear product hook for technology forecasters.

Human push copy:

Forecast whether Apple announces a new Mac Pro at WWDC 2026. Use Apple WWDC materials and Apple Newsroom as the source trail. Submit your probability before looking for anyone else's view.

BCP-safe QA checks:

- no visible consensus: signed-out and signed-in pre-forecast views must not show an aggregate probability, crowd answer, average forecast, or consensus label.
- no counts: the question card, question page, and submit flow must not show forecast count, forecaster count, vote count, or response count before the user forecasts.
- no activity leak: `/activity`, profile pages, and any recent forecast module must not reveal who forecasted this question, when they forecasted, or what they forecasted before the viewer has submitted their own forecast.
- no metadata leak: page HTML, hydration data, API responses, Open Graph data, and tooltips must not expose aggregate probability, individual forecasts, count fields, forecast timestamps, or hidden consensus fields before forecast submission.

### 2. Will the 2026 Atlantic hurricane season have a named storm before June 15?

Why this goes second: the National Hurricane Center source is authoritative and the resolution window is close enough to make the first scoring cycle feel real.

Human push copy:

Forecast whether the 2026 Atlantic hurricane season has a named storm before June 15. Resolution should follow National Hurricane Center records, not social media reports or model chatter.

BCP-safe QA checks:

- no visible consensus: signed-out and signed-in pre-forecast views must not show an aggregate probability, crowd answer, average forecast, or consensus label.
- no counts: the question card, question page, and submit flow must not show forecast count, forecaster count, vote count, or response count before the user forecasts.
- no activity leak: `/activity`, profile pages, and any recent forecast module must not reveal who forecasted this question, when they forecasted, or what they forecasted before the viewer has submitted their own forecast.
- no metadata leak: page HTML, hydration data, API responses, Open Graph data, and tooltips must not expose aggregate probability, individual forecasts, count fields, forecast timestamps, or hidden consensus fields before forecast submission.

### 3. Will the opening match of the 2026 FIFA World Cup have at least 3 total goals?

Why this goes third: it is easy for non-experts to understand, objectively scored from the official match result, and useful for a broader first human cohort.

Human push copy:

Forecast whether the 2026 FIFA World Cup opening match finishes with at least 3 total goals. Use the official FIFA match result. Regular match scoring rules in the question text control resolution.

BCP-safe QA checks:

- no visible consensus: signed-out and signed-in pre-forecast views must not show an aggregate probability, crowd answer, average forecast, or consensus label.
- no counts: the question card, question page, and submit flow must not show forecast count, forecaster count, vote count, or response count before the user forecasts.
- no activity leak: `/activity`, profile pages, and any recent forecast module must not reveal who forecasted this question, when they forecasted, or what they forecasted before the viewer has submitted their own forecast.
- no metadata leak: page HTML, hydration data, API responses, Open Graph data, and tooltips must not expose aggregate probability, individual forecasts, count fields, forecast timestamps, or hidden consensus fields before forecast submission.

### 4. Will US core CPI for May 2026 be 0.3 percent month over month or higher?

Why this goes fourth: it is a strong calibration question with a government source and a near-term data release.

Human push copy:

Forecast whether US core CPI for May 2026 is 0.3 percent month over month or higher. Resolution should follow the Bureau of Labor Statistics release and the exact threshold in the question.

BCP-safe QA checks:

- no visible consensus: signed-out and signed-in pre-forecast views must not show an aggregate probability, crowd answer, average forecast, or consensus label.
- no counts: the question card, question page, and submit flow must not show forecast count, forecaster count, vote count, or response count before the user forecasts.
- no activity leak: `/activity`, profile pages, and any recent forecast module must not reveal who forecasted this question, when they forecasted, or what they forecasted before the viewer has submitted their own forecast.
- no metadata leak: page HTML, hydration data, API responses, Open Graph data, and tooltips must not expose aggregate probability, individual forecasts, count fields, forecast timestamps, or hidden consensus fields before forecast submission.

### 5. Will the European Central Bank keep its main refinancing rate unchanged at its June 2026 monetary policy meeting?

Why this goes fifth: it has an official source, a crisp yes or no outcome, and pairs well with the CPI question for macro forecasters.

Human push copy:

Forecast whether the ECB keeps its main refinancing rate unchanged at the June 2026 monetary policy meeting. Use the official ECB press release for resolution.

BCP-safe QA checks:

- no visible consensus: signed-out and signed-in pre-forecast views must not show an aggregate probability, crowd answer, average forecast, or consensus label.
- no counts: the question card, question page, and submit flow must not show forecast count, forecaster count, vote count, or response count before the user forecasts.
- no activity leak: `/activity`, profile pages, and any recent forecast module must not reveal who forecasted this question, when they forecasted, or what they forecasted before the viewer has submitted their own forecast.
- no metadata leak: page HTML, hydration data, API responses, Open Graph data, and tooltips must not expose aggregate probability, individual forecasts, count fields, forecast timestamps, or hidden consensus fields before forecast submission.

## Resolution readiness prep

Prepare these 3 questions for resolution readiness next. Do not resolve tonight unless the question is closed, the source is captured, and the admin action has been checked against the current production state.

### A. Will Apple announce a new Mac Pro at WWDC 2026?

Readiness work:

- Confirm the exact close time and resolution text on the live question page.
- Save the Apple WWDC page and Apple Newsroom source URLs in the resolution notes.
- Define what counts as a new Mac Pro announcement before the event starts.
- Define what does not count: rumors, supply-chain reports, non-Apple leaks, or Mac Studio announcements.

BCP-safe QA checks:

- no visible consensus: the resolver prep view must not require viewing aggregate probability before the question closes or before the resolver has a legitimate admin need.
- no counts: readiness notes must not include forecast counts, forecaster counts, vote counts, or response counts.
- no activity leak: readiness notes must not name forecasters, profile handles, forecast times, or forecast values.
- no metadata leak: saved source notes must not copy hidden forecast metadata, aggregate fields, timestamps, or API payload fields unrelated to objective resolution.

### B. Will the 2026 Atlantic hurricane season have a named storm before June 15?

Readiness work:

- Confirm the live question text uses National Hurricane Center records as the resolution source.
- Save the National Hurricane Center tropical cyclone reports and storm archive URLs.
- Define the cutoff as before June 15 under the question's stated time basis.
- Define what counts as a named storm: an official NHC named Atlantic tropical or subtropical storm in the 2026 season.

BCP-safe QA checks:

- no visible consensus: the resolver prep view must not require viewing aggregate probability before the question closes or before the resolver has a legitimate admin need.
- no counts: readiness notes must not include forecast counts, forecaster counts, vote counts, or response counts.
- no activity leak: readiness notes must not name forecasters, profile handles, forecast times, or forecast values.
- no metadata leak: saved source notes must not copy hidden forecast metadata, aggregate fields, timestamps, or API payload fields unrelated to objective resolution.

### C. Will US core CPI for May 2026 be 0.3 percent month over month or higher?

Readiness work:

- Confirm the live question uses core CPI, May 2026, month over month, and the 0.3 percent threshold.
- Save the Bureau of Labor Statistics CPI release calendar and CPI report URL pattern.
- Define the exact series before release day: core CPI means all items less food and energy.
- Define threshold handling: 0.3 percent or higher resolves YES, below 0.3 percent resolves NO, unless the live question text says otherwise.

BCP-safe QA checks:

- no visible consensus: the resolver prep view must not require viewing aggregate probability before the question closes or before the resolver has a legitimate admin need.
- no counts: readiness notes must not include forecast counts, forecaster counts, vote counts, or response counts.
- no activity leak: readiness notes must not name forecasters, profile handles, forecast times, or forecast values.
- no metadata leak: saved source notes must not copy hidden forecast metadata, aggregate fields, timestamps, or API payload fields unrelated to objective resolution.

## Operator sequence for tonight

1. Run `npm run verify:blind-until`.
2. If it fails, stop all AI write paths and continue only with human outreach and read-only QA.
3. If it passes, still do not run live AI writes tonight unless a separate operator explicitly approves the run.
4. Open each selected question signed out and verify the four BCP checks before sharing links.
5. Open each selected question signed in with a fresh account that has not forecasted on it and repeat the four BCP checks.
6. Submit at most one test human forecast only if the operator is using a real human account and intends that forecast to remain live.
7. After submission, confirm the user can see post-forecast consensus only for the question they forecasted, not for the other four.
8. Check `/activity` and profile pages after each human forecast. They must not leak still-blind questions to users who have not forecasted them.
9. Keep a source note for the three readiness questions without copying any forecast metadata.

## Stop conditions

Stop the run if any of these happen:

- `npm run verify:blind-until` fails.
- A pre-forecast page shows consensus, counts, activity details, or hidden forecast metadata.
- A public route frames forecasting as gambling or money-making.
- The selected question's source is missing, ambiguous, or not objective.
- A write path tries to create live AI forecasts before the blind_until verifier passes.

## End state expected tonight

- 5 questions are ready for human forecast outreach.
- 3 questions have clean resolution readiness notes started.
- 0 live AI writes happen unless `npm run verify:blind-until` passes and a separate operator approves them.
- Blind Consensus remains protected: no visible consensus, no counts, no activity leak, no metadata leak.
