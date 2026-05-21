# AQ-235 first resolution dry run, May 21

Prepared May 21, 2026, 07:02 UTC.

This is a dry run for the first June settlements. It uses read-only question checks only. I did not read forecast rows and did not do live writes. Baycast stays framed as prediction polling, not gambling.

## Read-only verifier result

`npm run verify:resolution-urls` passed.

It checked the open questions table in read-only mode at 2026-05-21T07:02:06.504Z. Result: 44 open questions, 44 with usable resolution URLs, 0 missing usable resolution URLs.

`npm run verify:aq231-june-resolution-hygiene` passed.

It checked the June window from 2026-06-01T00:00:00.000Z through 2026-06-30T23:59:59.999Z in read-only mode at 2026-05-21T07:02:07.988Z. Result: 44 open questions, 9 June questions in the readiness set, 9 ready, 0 not ready. No missing fields were reported for those June questions.

One schema note stays important: the live table has `closes_at`; `resolution_date` is not present. Use `closes_at` as the operating deadline.

## First three June settlement candidates

### 1. Apple Mac Pro at WWDC 2026

Question id: `13aa9f2f-3226-4213-a04f-0cc2b87ad248`

Close time: 2026-06-13T00:00:00+00:00

Category: tech

Decision to prepare for: whether Apple announces a new Mac Pro at WWDC 2026.

Evidence to capture:

- The exact Apple source URL used, preferably Apple Newsroom or the WWDC announcement page.
- Retrieval time in UTC.
- The headline, event page section, press release paragraph, or product announcement line that names the new Mac Pro.
- A note on whether the announcement is a new Mac Pro, not just a Mac, Mac Studio, chip, developer tool, or rumor.
- Screenshot or archived copy if the page can change.
- If the answer is NO, the evidence basis for no qualifying announcement by the relevant WWDC close window.

Dry-run operator stance: do not resolve from live blogs, recaps, social posts, or analyst claims unless the question text explicitly allows them. Use them only to find the Apple source.

### 2. Atlantic named storm before June 15

Question id: `9345891c-192a-4915-acad-8bed7c554333`

Close time: 2026-06-15T00:00:00+00:00

Category: science

Decision to prepare for: whether the 2026 Atlantic hurricane season has a named storm before June 15.

Evidence to capture:

- The National Hurricane Center page or archive URL used.
- Retrieval time in UTC.
- The storm name, advisory, basin, and timestamp if a named Atlantic storm exists before the cutoff.
- The exact line or advisory text that shows the system was named before June 15.
- If the answer is NO, a clean record that no qualifying named Atlantic storm was present before the cutoff, with the source checked and time checked.
- Screenshot or downloaded advisory if the live page rolls forward.

Dry-run operator stance: do not use media summaries as the settling evidence. The NHC record has to carry the decision.

### 3. S&P 500 above 7,000 before July 1

Question id: `54f7e8b0-0dd6-4052-a5f3-2752c133083c`

Close time: 2026-06-30T23:59:59+00:00

Category: economy

Decision to prepare for: whether the S&P 500 closes above 7,000 on any trading day before July 1, 2026.

Evidence to capture:

- The official index source or named data source URL used for S&P 500 closes.
- Retrieval time in UTC.
- The trading date and official close value.
- A saved table row, downloaded data file, screenshot, or archive showing the close value.
- If the answer is YES, show at least one close strictly above 7,000 before July 1.
- If the answer is NO, show the highest relevant official close through the final eligible trading day and confirm it did not exceed 7,000.

Dry-run operator stance: intraday prints do not settle this question. Secondary finance pages are fallback navigation, not final evidence, unless the criteria explicitly allow them.

## Close-time checklist

Before touching settlement, confirm the deadline has passed in UTC and the question is no longer forecastable. If the UI still accepts forecasts after `closes_at`, stop and treat it as a product bug.

For each question, the internal evidence note should have the question id, title, final outcome, source URL, retrieval time in UTC, the deciding quote or table row, why the opposite answer does not fit, operator name or handle, and a link to saved evidence when the source can change.

Resolve only when the official source directly answers the criteria. If the source is late, contradictory, missing, or too vague, leave the question closed and unresolved.

## BCP guardrails

Keep Blind Consensus clean while questions are open.

Do not publish consensus, exact forecast counts, active-user names, prediction payloads, participation cadence, or any hint that a live question has unusual activity. Do not use forecast data to tune wording, promotion, timing, or settlement urgency.

Allowed before close: title, close date, criteria, official source, and a plain reminder that people can forecast before the deadline.

Allowed after resolution: outcome, evidence source, and the normal product surfaces for resolved scores and leaderboard effects.

AI forecast writes remain paused until the blind phase is safe. AQ-227 `blind_until` DDL is still blocked, so do not create a workaround in this run.

## Explicit NO-GO items

No live writes during this dry run.

No reading open forecast rows.

No resolving a question before `closes_at` has passed in UTC.

No settlement from social chatter, secondary media, live blogs, or homepages that do not contain the deciding evidence.

No public exact participation metadata.

No repeated resolve call just to see if scoring works. If scoring fails, inspect state first and escalate with an audit note.

No fallback source unless the primary is unavailable, silent, or the criteria clearly allow the fallback. Record why the fallback was used.

No finance or gambling framing in public copy. Baycast is prediction polling.

No rebase cleanup that changes unrelated docs for this task. Preserve this file and accept remote for unrelated conflicts.
