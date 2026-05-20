# AQ-231 first resolution operating checklist

Prepared May 20, 2026, 13:00 UTC.

Live baseline checked from the Supabase helper today. These are question inventory and source-readiness counts only. They do not include forecast counts, consensus, user activity, or prediction data.

- 44 questions exist, all 44 are open.
- 44 of 44 open questions have a usable `resolution_source` URL.
- No open question closes inside the next 14 days from May 20.
- The live schema uses `closes_at`; `resolution_date` is not present.
- First likely June closers start on June 13.

## Purpose

This is the runbook for the first real settlement pass. The goal is simple: close questions cleanly, resolve only when the public evidence is strong, score forecasts once, and protect Blind Consensus while questions are still live.

Baycast is prediction polling, not gambling. Treat each settlement as an editorial and data integrity action, not as a market operation.

## Before a question closes

Do this 72 hours before `closes_at`, again 24 hours before, and once more on close day.

1. Confirm the question is still open.
   - Query by `id`.
   - Expected: `status = open`.
   - Expected: `closes_at` is in the future for the 72 hour and 24 hour checks.
   - On close day, confirm current UTC time is still before `closes_at`; after `closes_at`, switch to the close-time checklist.

2. Confirm the resolution source is usable.
   - Run `node scripts/supabase-admin.mjs verify-resolution-urls`.
   - Expected: `open_missing_usable_resolution_url = 0`.
   - If this fails, do not wait for close time. Fix the source field before users lose confidence in the criteria.

3. Confirm the question is resolution ready.
   - Run `node scripts/supabase-admin.mjs verify-resolution-readiness`.
   - Expected for any soon closing question: no missing title, description, question type, close date, source, or objective criteria.
   - Today this report is clear because the first close is more than 14 days out. Rerun it inside the 14 day window.

4. Read the exact question text out loud.
   - Write down the event that makes YES true.
   - Write down the event that makes NO true.
   - Write down what does not count.
   - If two reasonable operators could resolve it differently, escalate before close.

5. Check BCP state without leaking it.
   - Only authorized operators may privately confirm the system has forecast rows when needed for settlement readiness.
   - Do not publish or discuss existence, counts, cadence, users, consensus, or distribution while the question is open.
   - Do not use open-question forecast data to decide wording, promotion, or timing.

6. Take a private snapshot for the operator log.
   - `id`, title, `closes_at`, `resolution_source`, current `status`.
   - Do not include forecast counts or consensus in any public note.

## At close time

Close means no more forecasting. It does not always mean resolve immediately.

1. Confirm the deadline has passed in UTC.
   - Use the stored `closes_at` value, not local time.
   - If the deadline has not passed, stop.

2. Confirm the database status is no longer `open`.
   - The code path can auto-close expired open questions when listings render.
   - Expected phase after the deadline: closed, awaiting settlement.
   - If the UI and database disagree, stop and escalate.
   - If the question still appears forecastable after `closes_at`, stop and escalate as a product bug.

3. Freeze the working evidence.
   - Open the source URL in a clean browser session or fetch it from the command line.
   - Save the page URL, retrieval time in UTC, headline or table name, and the exact value or official statement used.
   - If the source is dynamic, save a screenshot or archived copy where allowed.

4. Decide whether the outcome is ready.
   - Resolve YES or NO only when the source answers the criteria directly.
   - Leave closed but unresolved if the source has not published, is contradictory, or requires interpretation beyond the question text.

5. Do not resolve on social chatter.
   - Tweets, blogs, secondary media, and forum posts can help find the source.
   - They do not settle the question unless the question explicitly names them as the source.
   - Do not infer intent from the question title if the criteria and source do not directly answer the outcome.

## Settlement evidence checklist

Before pressing resolve, the operator should have this in the internal note:

- Question `id` and title.
- Final outcome, exactly `yes` or `no`.
- Source URL used.
- UTC time the source was checked.
- Quote, table row, result line, release note, filing value, or official statement that decides the question.
- Why the opposite answer does not fit the criteria.
- Any caveat, delay, amended data issue, or fallback source used.
- Operator name or handle.
- Link to screenshot, archive, downloaded PDF, or saved evidence if the source is mutable.

If one of those items is missing, leave the question closed and unresolved until it is filled.

## Source URL verification

Use the cleaned May 20 `resolution_source` field as the starting point, then verify the actual settlement page.

1. Run the helper before the first June close window.
   - `node scripts/supabase-admin.mjs verify-resolution-urls`
   - Expected today: 44 open, 44 usable URLs, 0 missing.

2. Open every URL named in the relevant question.
   - If there are primary and fallback URLs, check the primary first.
   - Use fallback only when the primary is unavailable, silent, or explicitly not the right source for the criterion.
   - When using fallback evidence, record why the primary source failed, when it was checked, and why the fallback is allowed by the criteria.

3. Confirm the source is authoritative for that question.
   - Apple questions: Apple event pages or Apple Newsroom.
   - Weather questions: National Hurricane Center.
   - CPI: Bureau of Labor Statistics.
   - ECB: ECB monetary policy decisions.
   - Market closes: the named official index, exchange, or data source.
   - Awards and sports: the named organizer.

4. Watch for stale landing pages.
   - A homepage is not evidence by itself.
   - Drill into the dated release, match page, report, data table, or statement.
   - Record the final URL, not just the homepage.

5. If a URL redirects, record both.
   - Original source from the database.
   - Final URL after redirect.
   - HTTP status if checked by command line.

## Brier and log score notes

The admin resolve endpoint stores `resolution = { outcome, value }`, sets `status = resolved`, sets `resolved_at`, then scores all forecasts for that question.

Current scoring behavior:

- Forecast probability is read from `prediction.probability` as a percent.
- YES is `1`, NO is `0`.
- Brier score is `(p - outcome)^2` using `p` from 0 to 1. Lower is better. Perfect is 0.
- Log score uses base 2: `log2(p)` for YES and `log2(1 - p)` for NO.
- Log score clamps probability away from 0 and 1 to avoid `log(0)`. It is usually negative; higher is better, and a perfect prediction approaches 0.
- Scores are upserted on `question_id,user_id`, so a repeated resolve call can overwrite scores. Avoid repeat calls unless this is an intentional correction.

After the first resolution, verify:

- The API response returns `ok: true` and a scored count.
- `questions.status = resolved`.
- `questions.resolution.outcome` matches the decision.
- `questions.resolved_at` is present.
- One score row exists per forecasted user for that question.
- Leaderboard and activity pages show resolved data only after settlement.

Do not publish raw score tables for an open or closed unresolved question.

## BCP no-leak checks

Before, during, and after settlement, keep Blind Consensus clean.

- No consensus percentage while a question is open.
- No exact forecast counts while a question is open.
- No list of active users on a live question.
- No activity feed item that reveals who forecasted what before resolution.
- No screenshots of admin tables that include prediction payloads before resolution.
- No marketing copy like "users are leaning YES" before settlement.
- No operator note in public docs that says a live question is getting unusual activity.

Allowed public language before close:

- The question title.
- The close date.
- The resolution criteria.
- The official source.
- A general reminder to forecast before the deadline.

Allowed public language after resolution:

- Outcome.
- Evidence source.
- Scores and leaderboard effects that the product normally exposes for resolved questions.

## Rollback and escalation

Use this when something goes wrong.

1. Evidence is ambiguous.
   - Do not resolve.
   - Keep status closed.
   - Write an internal note with the ambiguity.
   - Escalate to product and questions owners.

2. Source is missing or down.
   - Wait if the question text expects a later official publication.
   - Use fallback only if it is named or clearly allowed by the criteria.
   - If neither works, escalate. Do not invent a source.

3. Wrong outcome was resolved.
   - Stop public posting.
   - Capture the current database row and score rows.
   - Correct the question resolution and rerun or repair scores only with an explicit owner decision.
   - Add an audit note explaining the correction.

4. Scores failed after the question resolved.
   - Treat HTTP 207 from the resolve endpoint as partial failure.
   - Do not call the endpoint repeatedly without checking current `scores` rows.
   - Repair scores from the existing forecasts and final outcome, then verify one row per forecasted user.

5. BCP leak suspected.
   - Remove the leaked surface first.
   - Preserve a private screenshot and URL for review.
   - Do not add more detail in public changelogs.
   - Escalate to product because trust damage matters more than speed.

6. Rebase or deploy conflict touches files outside this checklist.
   - Accept remote for files not edited by this task.
   - Only keep the new checklist file from this work.

## Earliest likely June questions to watch

Retrieved safely from the live questions table on May 20 with `id`, title, category, close time, and source only. No forecast data was queried.

- 2026-06-13 00:00 UTC, tech: Will Apple announce a new Mac Pro at WWDC 2026? Source to watch: Apple WWDC and Apple Newsroom.
- 2026-06-15 00:00 UTC, science: Will the 2026 Atlantic hurricane season have a named storm before June 15? Source to watch: National Hurricane Center.
- 2026-06-30 23:59:59 UTC, tech: Will OpenAI release a new public video generation model before July 1, 2026? Source to watch: OpenAI News and ChatGPT release notes.
- 2026-06-30 23:59:59 UTC, economy: Will US core CPI for May 2026 be 0.3 percent month over month or higher? Source to watch: Bureau of Labor Statistics CPI release.
- 2026-06-30 23:59:59 UTC, economy: Will the ECB cut its deposit facility rate at its June 2026 monetary policy meeting? Source to watch: ECB monetary policy decisions.
- 2026-06-30 23:59:59 UTC, economy: Will the S&P 500 close above 7,000 on any trading day before July 1, 2026? Source to watch: S&P Dow Jones Indices official S&P 500 data.
- 2026-06-30 23:59:59 UTC, economy: Will Ethereum close above $5,000 on Coinbase before July 1, 2026? Source to watch: Coinbase ETH-USD, CoinGecko fallback.
- 2026-06-30 23:59:59 UTC, other: Will the 2026 Cannes Palme d'Or go to a film from a female director? Source to watch: Festival de Cannes official awards and film pages.
- 2026-06-30 23:59:59 UTC, sports: Will the 2026 FIFA World Cup opening match have at least three total goals? Source to watch: FIFA official match centre.

The first two deserve the earliest manual watch: Apple on June 13, then National Hurricane Center on June 15. For the June 30 cluster, prepare source tabs in advance and resolve only where the official source has already published the deciding evidence.

## First run command set

Use these before the first June close window:

```bash
node scripts/supabase-admin.mjs status
node scripts/supabase-admin.mjs verify-resolution-readiness
node scripts/supabase-admin.mjs verify-resolution-urls
```

Expected May 20 baseline:

```text
questions: 44
questions_open: 44
open_with_usable_resolution_url: 44
open_missing_usable_resolution_url: 0
soon_closing_open_questions within 14 days: 0
```

Inside the actual close window, rerun the same commands and then query the specific question by `id` before making any settlement call.
