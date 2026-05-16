# AQ-220 live QA closing soon

Timestamp: 2026-05-16T13:01:29Z

Tested URL: https://baycast-p.vercel.app/questions?sort=closing-soon

Observed copy:

Heading: No questions closing in the next 14 days

Body: Use Newest for the full open set, or come back when the first resolution windows get closer.

Verdict: production shows the updated empty state. The stale No match copy was not observed on this run.

Next QA checks for short-term resolution readiness:

1. Check that a question with a resolution date inside the next 14 days appears in Closing Soon, with the right ordering.
2. Check that Newest still shows the full open set when Closing Soon is empty.
3. Check the transition from open to closed to resolved on a short-window question, including list visibility and detail page copy.
