# AQ-223 Activity empty state spec

Date: May 18, 2026

## What I checked

I checked the current production page at `https://baycast-p.vercel.app/activity` and the repo file `app/activity/page.tsx`.

Production currently loads the Activity page, shows the nav, then shows an empty state:

Title: `Activity will appear here`

Body: `Browse open questions and add your forecast to Baycast.`

CTA: `Browse Questions`

The code now queries `forecasts` only when the joined question has `questions.status = 'resolved'`. That matches the resolved-only BCP fix. With no resolved forecast rows available, production shows an empty feed even though people may have forecasted on open questions.

The current empty copy is too easy to read as “nobody has forecasted yet.” It also points people back to open questions without explaining why the activity feed is quiet.

## Spec copy

Use this copy for the `/activity` empty state after the resolved-only activity fix:

Title: `Activity appears after questions resolve`

Body: `Forecasts on open questions stay hidden so everyone can make their own call first. Once a question is resolved, eligible forecast activity can appear here.`

CTA: `Browse Questions`

This keeps the page honest without exposing hidden activity. It explains the quiet state as a product rule, not a lack of participation.

## BCP guardrails

The empty state must not include forecast counts.

It must not include consensus, average probability, crowd probability, range, confidence, or any other aggregate signal.

It must not show open-question forecast rows, including individual user names, percentages, timestamps, avatars tied to those forecasts, or “someone forecasted” style metadata for open questions.

It must not imply whether any open question has one forecast, many forecasts, or none.

Safe framing is: activity appears after resolution because open forecasts stay hidden until users have made their own call.

## Production QA checklist

Open `https://baycast-p.vercel.app/activity` signed out. If there are no resolved activity rows, the page should show the new title and body above with the existing Browse Questions CTA.

Confirm the page does not show forecast percentages, forecaster names, forecast timestamps, forecast counts, or consensus language for open questions.

Confirm open questions with known forecasts still do not create rows on `/activity` while their status is open or closed but unresolved.

After a question is resolved, confirm resolved forecast rows can appear and link to the resolved question detail page.

Check mobile width once. The copy should wrap cleanly and the CTA should remain visible without horizontal scroll.

Check the browser console. No new client error should appear while loading the empty state.
