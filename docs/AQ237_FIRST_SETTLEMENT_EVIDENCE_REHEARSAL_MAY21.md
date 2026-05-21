# AQ-237 first settlement evidence rehearsal, May 21

Prepared May 21, 2026.

This rehearsal is for the first June closer only. It is a source capture and settlement note drill, not a live settlement. I did not read open forecast rows and this flow does not require any live write. The product framing stays simple: Baycast is prediction polling, not gambling.

Use AQ-231 for the full first resolution checklist and AQ-235 for the wider June dry run. This file is the concrete operator pass for the first expected close.

## Candidate question

Question: Will Apple announce a new Mac Pro at WWDC 2026?

Question id: `13aa9f2f-3226-4213-a04f-0cc2b87ad248`

Close date: `2026-06-13T00:00:00+00:00`

Candidate outcome test: YES only if Apple announces a new Mac Pro at WWDC 2026. A Mac Studio, MacBook, chip family, developer tool, OS feature, rumor, analyst note, or general Mac update is not enough unless the Apple source clearly names a new Mac Pro.

## Evidence sources to check

Start with the stored `resolution_source` on the question, but do not treat a generic landing page as evidence. The deciding record has to be an Apple page or Apple published material that can be cited cleanly.

Check these sources in this order:

1. Apple Newsroom
   URL to open: `https://www.apple.com/newsroom/`
   What to capture: a WWDC 2026 press release or product announcement page that names Mac Pro, including the final article URL, headline, publication date, and the exact sentence that decides the question.

2. Apple Events
   URL to open: `https://www.apple.com/apple-events/`
   What to capture: the WWDC 2026 event page or replay page, including the final page URL, retrieval time, section title, and the line or timestamp that names a new Mac Pro if present.

3. Apple Developer WWDC page
   URL to open: `https://developer.apple.com/wwdc/`
   What to capture: only official WWDC program or announcement material from Apple. Use this to support the WWDC context, not to replace a product announcement if it does not name Mac Pro.

4. Apple Mac Pro product page
   URL to open: `https://www.apple.com/mac-pro/`
   What to capture: only if the page itself shows a newly announced Mac Pro tied to WWDC 2026. Save the retrieval time and the visible claim. A changed product page without an announcement trail is not enough on its own.

Secondary media, live blogs, social posts, YouTube recaps, forum posts, and analyst notes are navigation aids only. They can point the operator to an Apple page, but they do not settle this question.

## Capture checklist

Before writing the settlement note, capture the evidence in a private operator folder or ticket. Keep it boring and complete.

- Question id and title.
- Stored close date in UTC.
- Confirmation that the check happened after `2026-06-13T00:00:00+00:00`.
- Stored `resolution_source` value and the final Apple URL used.
- Retrieval time in UTC for each Apple page checked.
- HTTP status or browser confirmation for each source when practical.
- Headline, page title, table label, transcript timestamp, or section heading.
- Exact deciding quote, copied as text.
- Screenshot, PDF print, web archive link, or saved HTML for any page likely to change.
- Operator name or handle.
- One sentence explaining why the opposite outcome does not fit the criteria.

If the likely result is NO, capture the negative record with care: which Apple sources were checked, when they were checked, what WWDC material existed, and why none of it names a new Mac Pro. Do not use silence from a homepage alone. Check the dated WWDC and Newsroom material.

## Settlement note skeleton

Use this shape for the internal settlement note. Fill it only after close and only from official source checks.

```text
Question id: 13aa9f2f-3226-4213-a04f-0cc2b87ad248
Title: Will Apple announce a new Mac Pro at WWDC 2026?
Close date: 2026-06-13T00:00:00+00:00
Operator:
Evidence capture time UTC:

Decision: YES or NO

Primary source checked:
Final source URL:
Source retrieval time UTC:
Headline or page title:
Deciding quote or record:
Saved evidence link:

Other Apple sources checked:
1.
2.
3.

Why YES fits or does not fit:
Why NO fits or does not fit:

BCP check:
No open forecast rows read.
No consensus, counts, active users, or prediction payloads included.
No public copy drafted from participation data.

Write action:
No write during rehearsal.
For live settlement, resolve only after owner approval and only if the evidence above is complete.
```

## BCP no-leak checks

This rehearsal must not expose Blind Consensus state. The operator can verify question readiness and source readiness, but must not read or share live forecast detail while the question is open.

Do not read:

- open forecast rows
- prediction payloads
- consensus percentages
- exact forecast counts for the live question
- active forecaster names
- activity patterns that imply demand or sentiment

Do not write or publish:

- any sentence like users are leaning YES or NO
- screenshots of admin tables with forecasts
- a public note that says how many people forecasted
- promotion timed from forecast activity
- a settlement note before the close date

Allowed before close: title, close date, criteria, official source, and a plain reminder to forecast before the deadline.

Allowed after resolution: outcome, evidence source, and normal resolved-question score surfaces exposed by the product.

## Rollback and non-action criteria

Stop the run and leave the question closed but unresolved if any of these are true:

- Current UTC time is before `2026-06-13T00:00:00+00:00`.
- The UI still accepts forecasts after the close date.
- The database status, UI status, and close date do not agree.
- The source is a homepage, recap, rumor, secondary article, or social post without an Apple deciding page.
- Apple material is missing, delayed, contradictory, or too vague to answer the Mac Pro criterion.
- The available evidence names another Mac product but not Mac Pro.
- Any required capture item is missing.
- Any open forecast, consensus, count, user list, or prediction payload was read by mistake.
- A proposed action would write to production during this rehearsal.

If a BCP leak happens, remove the exposed surface first, preserve a private screenshot and URL for review, and escalate to product. Do not add more detail in public changelogs.

If the live settlement later resolves the wrong outcome, stop public posting, capture the current question row and score state, and correct only with explicit owner approval and an audit note.

## Operator sequence

Run this from a clean, synced `main` checkout. The command is read-only for the rehearsal.

```bash
npm run verify:first-resolution-readiness
```

Expected operator readout for this rehearsal:

- The first June closer is the Apple Mac Pro at WWDC 2026 question.
- The close date is `2026-06-13T00:00:00+00:00`.
- The readiness command does not require reading open forecasts.
- No live write is made.

I ran the command during this rehearsal using the existing local Supabase env from the fallback clone. It passed at `2026-05-21T13:03:41Z`: 44 open questions, 44 usable resolution URLs, 9 June questions in the readiness set, 9 ready, 0 not ready. The first returned closer was `13aa9f2f-3226-4213-a04f-0cc2b87ad248`, Apple Mac Pro at WWDC 2026, closing `2026-06-13T00:00:00+00:00`. The output listed question fields only and did not include forecast rows, counts, consensus, users, or prediction payloads.

After the command passes, open the Apple sources listed above in a clean browser session. Capture only source facts. Do not open forecast tables, user activity tied to the question, or admin views that show prediction payloads.

Rehearsal end state: a complete settlement note draft can be filled from official source evidence after June 13, but no production resolution is attempted today.
