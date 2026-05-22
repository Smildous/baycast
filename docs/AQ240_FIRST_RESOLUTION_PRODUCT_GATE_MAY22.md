# AQ-240 first resolution product gate, May 22

Prepared May 22, 2026 at 07:02 UTC.

This is the product gate for the first June settlement cycle. It is not a general status report. It names the first settlement candidate, the public evidence checks, the blind data rules, and the exact stop points before any live resolution.

Baycast stays prediction polling. No betting language, no market language, no public hint about live participation.

## Gate scope

This gate covers the first expected June closer only.

Selected first settlement candidate: Apple Mac Pro at WWDC 2026.

Candidate id: `13aa9f2f-3226-4213-a04f-0cc2b87ad248`

Close time: `2026-06-13T00:00:00+00:00`

Settlement window: first operator pass after the close time, once the question is no longer forecastable and official Apple material can be checked.

Outcome test: YES only if Apple officially announces a new Mac Pro at WWDC 2026. A Mac Studio, MacBook, chip family, developer tool, operating system feature, rumor, analyst note, recap, or generic Mac update does not count unless Apple material clearly names a new Mac Pro.

## Public source checks

Use public Apple sources only for the settlement evidence. Start from the stored source on the question, then capture the final public URL that actually decides the outcome.

Check in this order.

1. Apple Newsroom
   - Open `https://www.apple.com/newsroom/`.
   - Find any dated WWDC 2026 release or product announcement.
   - Capture the final article URL, headline, publication date, retrieval time in UTC, and the exact sentence that names a new Mac Pro if present.
   - If no release names a new Mac Pro, record the pages checked and the retrieval time.

2. Apple Events
   - Open `https://www.apple.com/apple-events/`.
   - Find the WWDC 2026 event page, recap page, replay page, or transcript if Apple publishes one.
   - Capture the final URL, page title, retrieval time in UTC, and the exact line or timestamp that names a new Mac Pro if present.
   - If the page only names other products or software, record that plainly.

3. Apple Developer WWDC page
   - Open `https://developer.apple.com/wwdc/`.
   - Use this to confirm the WWDC context and any official Apple program material.
   - Capture the final URL, page title, retrieval time in UTC, and any Apple text that is relevant to the Mac Pro criterion.
   - Do not use this page as a substitute for a product announcement unless it directly names a new Mac Pro.

4. Apple Mac Pro product page
   - Open `https://www.apple.com/mac-pro/`.
   - Use this only as supporting evidence if the page itself shows a newly announced Mac Pro tied to WWDC 2026.
   - Capture the final URL, retrieval time in UTC, visible claim, screenshot, and any link back to a dated Apple announcement.
   - A changed product page without a dated announcement trail is not enough on its own.

Secondary media, live blogs, social posts, video recaps, forums, and analyst notes are navigation only. They can help find an Apple page. They cannot settle this candidate.

## Evidence packet required before resolution

The operator packet must be complete before any resolution action.

Required fields:

- Candidate id.
- Candidate label.
- Close time in UTC.
- Confirmation that the current UTC time is after `2026-06-13T00:00:00+00:00`.
- Confirmation that the product no longer accepts new forecasts for this candidate.
- Stored public source value from the question record.
- Every final Apple URL checked.
- Retrieval time in UTC for each source.
- HTTP status or browser confirmation where practical.
- Headline, page title, transcript timestamp, section heading, or release label.
- Exact deciding quote copied from Apple material, or a clear note that no Apple source names a new Mac Pro.
- Screenshot, saved HTML, PDF print, or archive link for any page likely to change.
- Final outcome, exactly YES or NO.
- One plain sentence explaining why the opposite outcome does not fit the criterion.
- Operator name or handle.

If any required field is missing, the gate stays closed. Leave the candidate unresolved.

## BCP no-leak checklist

Blind Consensus is still protected until settlement is complete. The settlement decision must come from public source evidence, not from live participation data.

Before resolution, confirm all of this is true:

- No open forecast rows were read.
- No prediction payloads were opened.
- No consensus percentage was read.
- No aggregate probability was read.
- No exact forecast count was read for this live candidate.
- No active user list was read.
- No activity feed was used to infer demand, timing, or sentiment.
- No leaderboard state was read to prepare the settlement decision.
- No admin screenshot with prediction data was created or shared.
- No public copy says or implies that users lean YES or NO.
- No promotion, reminder, or settlement urgency was based on participation.

Allowed before close:

- Candidate label.
- Close time.
- Resolution criterion.
- Official public source.
- A plain reminder to forecast before the deadline.

Allowed after resolution:

- Final outcome.
- Public evidence source.
- Normal resolved score surfaces in the product.
- Normal leaderboard effects that only appear after the blind period has ended.

## Must not be read before settlement

Do not open or query these items before the candidate is resolved:

- Forecast rows for the candidate.
- Prediction payloads.
- Consensus fields.
- `aggregate_probability`.
- Exact forecast counts.
- User names tied to live forecasts.
- Live activity tied to this candidate.
- Leaderboard rows that reveal unresolved scoring or participation.
- Any internal view that combines source readiness with forecast data.

If any of these are read by mistake, stop the run, do not resolve, preserve only the minimum private audit note, and escalate to product.

## Go criteria

Proceed with resolution only when every item below is true.

- Current UTC time is after `2026-06-13T00:00:00+00:00`.
- The candidate is no longer forecastable in the product.
- The candidate text, close time, and source fields match the operator packet.
- Public Apple evidence has been checked in the order above.
- The evidence directly supports YES or directly supports NO under the Mac Pro criterion.
- The evidence packet is complete.
- BCP no-leak checklist is clean.
- Product owner or assigned operator gives the live settlement approval.
- The planned public note uses only outcome and public source evidence.

## No-go criteria

Do not resolve if any item below is true.

- The close time has not passed in UTC.
- The product still accepts forecasts for the candidate.
- Apple sources are missing, late, contradictory, or too vague.
- The only evidence is a homepage, recap, rumor, secondary article, social post, or analyst note.
- Apple names another Mac product but does not name a new Mac Pro.
- The evidence requires guessing what Apple meant.
- Any required evidence packet field is missing.
- Any BCP protected data was read.
- A public note would reveal participation, consensus, or user behavior.
- The operator is trying to test scoring by repeating the resolution action.

No-go means leave the candidate closed and unresolved, then write a short private operator note with the blocker.

## Settlement day sequence

1. Confirm UTC time is past the close time.
2. Confirm the candidate is no longer forecastable.
3. Open the Apple sources in the order listed above.
4. Save the evidence packet.
5. Run the BCP no-leak checklist.
6. Decide YES or NO only from Apple evidence.
7. Get the live settlement approval.
8. Resolve once.
9. Confirm the product shows the resolved outcome and only then exposes scores through normal resolved surfaces.
10. Publish a short outcome note with the public Apple source.

## User-facing explanation for scores after resolution

Scores appear only after a question resolves because Baycast keeps predictions blind while the question is live. Before resolution, we do not show consensus, counts, or who is leaning where. After the official outcome is checked, the product can score forecasts and update resolved leaderboards without giving anyone a live signal during the prediction window.

## Gate decision for May 22

Gate status: ready to stage, not ready to execute.

Reason: the first June candidate is selected and the public source path is clear. Execution must wait until after `2026-06-13T00:00:00+00:00`, must use only public Apple evidence, and must pass the BCP no-leak checklist before any resolution action.
