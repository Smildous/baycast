# AQ-244 first settlement operator runbook, May 22 19h

Prepared May 22, 2026, 19:00 UTC.

This is the live operator runbook for the first Baycast settlement candidate: Will Apple announce a new Mac Pro at WWDC 2026?

Use it after the candidate closes. Do not use forecasts, consensus, forecast counts, user activity, leaderboard data, or any private prediction payload to decide the result. The decision comes from public Apple evidence only.

Baycast is prediction polling, not gambling. Settle the question as a source-backed editorial and scoring action.

## Candidate

Question: Will Apple announce a new Mac Pro at WWDC 2026?

Candidate id: `13aa9f2f-3226-4213-a04f-0cc2b87ad248`

Close time: `2026-06-13T00:00:00Z`

First operator pass: after the close time, once the product no longer accepts forecasts and the public Apple sources can be checked.

Outcome criterion:

YES means Apple officially announces a new Mac Pro at WWDC 2026.

NO means Apple does not officially announce a new Mac Pro at WWDC 2026.

A Mac Studio, Mac mini, MacBook, iMac, display, chip family, operating system feature, developer tool, availability change, price change, refurbished model, rumor, analyst note, press recap, or generic Mac update is not enough. It only counts if Apple material clearly names a new Mac Pro as newly announced at WWDC 2026.

## Before opening sources

Start with a clean operator session.

Confirm the current UTC time is after `2026-06-13T00:00:00Z`.

Confirm the question is no longer forecastable in the public product. Use the question page or normal product behavior. Do not open admin screens that show prediction rows, consensus, exact forecast counts, user lists, or activity tied to this live candidate.

Confirm the candidate id, title, close time, and resolution source from the question metadata if that view is available without forecast data. If the only available internal view mixes these fields with forecasts or consensus, do not open it. Use the existing operator packet and public question page instead, then escalate after the evidence pass if metadata is still uncertain.

Do not write Supabase during evidence capture. Do not call a resolve endpoint until the evidence packet, no-leak check, and final approval are complete.

## No-forecast-read rule

This rule is absolute until settlement is complete.

Do not read or query:

- Forecast rows for this candidate.
- Prediction payloads.
- Consensus or aggregate probability fields.
- Exact forecast counts for this candidate.
- User names tied to unresolved forecasts.
- Activity feed entries that reveal who forecasted or when.
- Leaderboard rows that could reveal unresolved scoring or participation.
- Admin screenshots that include any of the above.
- Logs or API responses that include prediction values.

Do not infer participation from traffic, reminders, user messages, or timing. Do not mention whether users leaned YES or NO. Do not use demand, sentiment, or activity to decide how fast to resolve.

If protected data is opened by mistake, stop. Do not resolve. Preserve only a short private incident note with what was exposed, where, when, and by whom. Escalate to product before any further action.

## Permitted public sources

Use public Apple sources only. Secondary sources can help locate an Apple page, but they cannot settle the question.

Check in this order.

### 1. Apple Newsroom

Open `https://www.apple.com/newsroom/`.

Look for WWDC 2026 articles, Apple product announcements, press releases, or recap posts published by Apple.

Capture:

- Final URL.
- Headline.
- Publication date shown by Apple.
- Retrieval time in UTC.
- HTTP status if checked by command line, or browser confirmation if checked manually.
- Exact Apple quote that names a new Mac Pro, if present.
- Clear note if no checked Apple Newsroom page names a new Mac Pro.

### 2. Apple Events

Open `https://www.apple.com/apple-events/`.

Look for the WWDC 2026 event page, replay page, recap page, transcript, or product announcement page published by Apple.

Capture:

- Final URL.
- Page title.
- Retrieval time in UTC.
- Replay timestamp or transcript line if Apple names a new Mac Pro.
- Clear note if the page names other products or software but not a new Mac Pro.

### 3. Apple Developer WWDC page

Open `https://developer.apple.com/wwdc/`.

Use it to confirm WWDC context and official Apple program material.

Capture:

- Final URL.
- Page title.
- Retrieval time in UTC.
- Any Apple text relevant to the Mac Pro criterion.

Do not use this page as a substitute for a product announcement unless it directly names a new Mac Pro.

### 4. Apple Mac Pro page

Open `https://www.apple.com/mac-pro/`.

Use it as supporting evidence only if the page itself shows a newly announced Mac Pro tied to WWDC 2026.

Capture:

- Final URL.
- Retrieval time in UTC.
- Visible claim.
- Screenshot or saved page.
- Any link back to a dated Apple announcement.

A changed product page without a dated Apple announcement trail is not enough by itself.

### Not permitted as deciding evidence

Do not settle from:

- Rumors.
- Analyst notes.
- Social posts.
- Live blogs.
- Forums.
- News articles not published by Apple.
- Retail listings.
- Search snippets.
- AI summaries.
- Video commentary not published by Apple.

These can be navigation only. The final evidence must be Apple material.

## Evidence capture steps

Create a private evidence packet before any settlement action.

Use this format.

```text
Candidate id: 13aa9f2f-3226-4213-a04f-0cc2b87ad248
Candidate: Will Apple announce a new Mac Pro at WWDC 2026?
Close time: 2026-06-13T00:00:00Z
Operator UTC check time:
Forecasting disabled confirmed: yes/no
Stored public source from question:
Apple URLs checked:
Evidence files saved:
Deciding quote or no-quote note:
Outcome: YES/NO
Reason opposite outcome does not fit:
BCP no-leak check passed: yes/no
Operator:
Approver:
Settlement action time:
Post-settlement verification:
```

For each Apple URL, save enough evidence for another operator to repeat the decision without reading forecasts.

Minimum capture per source:

- Final URL after redirects.
- Retrieval time in UTC.
- Page title or headline.
- Publication date if visible.
- Exact quoted sentence, transcript line, or timestamp if it decides YES.
- A plain note saying no new Mac Pro was named if it supports NO.
- Screenshot, saved HTML, PDF print, or archive link for pages likely to change.

Name evidence files with UTC time and source, for example `2026-06-13T00-20Z_apple-newsroom_mac-pro-check.pdf`.

Do not include forecast data in the evidence packet. Do not include screenshots of admin tables.

## Exact go criteria

Proceed to settlement only if every line is true.

- Current UTC time is after `2026-06-13T00:00:00Z`.
- The public product no longer accepts forecasts for this candidate.
- Candidate id, title, close time, and criterion match this runbook.
- Apple Newsroom, Apple Events, Apple Developer WWDC, and Apple Mac Pro page were checked as applicable.
- The final evidence comes from public Apple material.
- The evidence directly supports exactly one outcome, YES or NO.
- The evidence packet is complete.
- The BCP no-leak check is clean.
- No forecast rows, payloads, consensus, exact forecast counts, user lists, activity, or unresolved leaderboard data were read.
- The planned public note uses only the outcome and public Apple source.
- One assigned operator and one approver agree on the outcome.
- The settlement action will be performed once.

If all lines pass, resolve according to the evidence.

YES is allowed only when Apple material clearly says Apple announced a new Mac Pro at WWDC 2026.

NO is allowed when Apple material from the WWDC 2026 evidence path has been checked and does not name a new Mac Pro, or when Apple explicitly announces other WWDC items but no new Mac Pro and no official Apple source creates a direct YES.

## Exact no-go criteria

Do not settle if any line is true.

- Current UTC time is before or equal to `2026-06-13T00:00:00Z`.
- The question is still forecastable.
- Candidate metadata is uncertain.
- The Apple source path cannot be checked.
- Apple pages are unavailable, late, contradictory, or too vague.
- Only secondary media supports the result.
- Apple names another Mac product but not a new Mac Pro.
- Apple announces a chip or architecture but not a new Mac Pro.
- Apple updates the Mac Pro page without a dated WWDC 2026 announcement trail.
- The result depends on guessing what Apple meant.
- Any required evidence field is missing.
- Any protected BCP data was read.
- The public note would reveal participation, consensus, forecast count, user behavior, or demand.
- The operator is about to retry a settlement action without an explicit correction approval.

No-go means leave the candidate closed and unresolved. Write a short private operator note with the blocker. Escalate to product and questions owners.

## Edge cases

If Apple announces a Mac Studio with M-series chips but no Mac Pro, settle NO.

If Apple announces a new chip that could be used in a future Mac Pro but does not name a new Mac Pro, settle NO.

If Apple says Mac Pro is coming later, previewed, or teased without announcing a new Mac Pro at WWDC 2026, no-go until the wording is reviewed. Do not force YES.

If Apple updates the Mac Pro product page during WWDC week but there is no Apple Newsroom, Apple Events, or other dated Apple announcement tying it to WWDC 2026, no-go first. Capture the page and escalate. Do not use the product page alone unless the criterion is directly satisfied.

If Apple announces an accessory, display, GPU module, enclosure, or configuration for Mac Pro but not a new Mac Pro model, settle NO unless Apple explicitly calls it a new Mac Pro.

If Apple announces a new Mac Pro before WWDC 2026 but does not announce it at WWDC 2026, settle NO unless Apple material at WWDC clearly re-announces it as a new Mac Pro announcement.

If Apple announces after the close time but in official WWDC 2026 material, it can count. The question closes before settlement, not before all evidence is published. Record the Apple publication time and why it belongs to WWDC 2026.

If Apple publishes contradictory official pages, do not settle. Capture both and escalate.

If Apple removes or edits a page after capture, keep the saved evidence and re-check the live page. If the edit changes the outcome, no-go and escalate.

If the operator cannot confirm forecasting is disabled without opening protected data, stop and escalate. Do not trade BCP protection for speed.

If the settlement action succeeds but scoring or public surfaces look wrong, stop after one action. Do not press resolve again. Capture the response, resolved status, and visible product behavior without opening protected unresolved data.

## BCP no-leak checks

Run this check immediately before settlement and again before any public note.

Confirm all answers are yes.

- I did not open forecast rows for this candidate.
- I did not open prediction payloads.
- I did not read consensus or aggregate probability.
- I did not read exact forecast counts for this candidate.
- I did not read a user list tied to unresolved forecasts.
- I did not use activity feed data to infer demand, timing, or sentiment.
- I did not read unresolved leaderboard data.
- I did not create or share screenshots containing prediction data.
- I did not write public or internal copy that reveals user lean, participation, or activity.
- I did not use any private participation signal to decide YES or NO.
- I did not write Supabase during evidence capture.
- I will perform only one settlement action after approval.

Allowed public language before settlement:

- Question title.
- Close time.
- Criterion.
- Official source path.
- A neutral reminder that the question closes at the deadline.

Allowed public language after settlement:

- Final outcome.
- Public Apple source.
- Short evidence quote.
- Normal resolved score and leaderboard surfaces exposed by the product.

## Settlement note template

Use plain language.

```text
Resolved [YES/NO]. Apple [did/did not] officially announce a new Mac Pro at WWDC 2026.
Evidence: [Apple source title], [URL], checked at [UTC time].
Deciding text: "[quote]"
The opposite outcome does not fit because [one sentence tied to the criterion].
```

For a NO result with no deciding quote, write:

```text
Resolved NO. The checked Apple WWDC 2026 sources did not name a new Mac Pro announcement.
Evidence checked: [URLs], checked at [UTC times].
The opposite outcome does not fit because the question requires Apple to officially announce a new Mac Pro, and the official Apple material checked does not do that.
```

Do not add participation, forecast counts, consensus, user names, or demand commentary.

## Final checklist

Before settlement:

- UTC time is after `2026-06-13T00:00:00Z`.
- Candidate id matches `13aa9f2f-3226-4213-a04f-0cc2b87ad248`.
- Candidate title matches the Mac Pro at WWDC 2026 question.
- Product no longer accepts forecasts.
- Apple Newsroom checked.
- Apple Events checked.
- Apple Developer WWDC checked.
- Apple Mac Pro page checked if needed.
- Final Apple URLs saved.
- Retrieval times recorded in UTC.
- Screenshots, saved pages, PDFs, or archive links saved where needed.
- Deciding quote captured, or no-quote note written for NO.
- Edge cases reviewed.
- Evidence packet complete.
- BCP no-leak check passed.
- Operator and approver agree.
- Public note contains only outcome and public evidence.

During settlement:

- Resolve once.
- Use the outcome exactly as `YES` or `NO` in the operator packet.
- Do not retry on uncertainty.
- If an error appears, capture it and escalate before taking another write action.

After settlement:

- Confirm the question shows resolved status.
- Confirm the visible outcome matches the evidence packet.
- Confirm scores and leaderboard effects appear only through normal resolved product surfaces.
- Publish the short source-backed note.
- Save the final operator packet in the private settlement log.
- If anything looks wrong, stop public follow-up and escalate.
