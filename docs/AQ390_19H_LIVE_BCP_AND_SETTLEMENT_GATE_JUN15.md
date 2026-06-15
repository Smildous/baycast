# AQ-390 19h live gate, Baycast

Checked: 2026-06-15 19:01 UTC
Target: https://baycast-p.vercel.app

I checked the live site in browser, not a local build. I did not open or read forecasts for open questions. The activity page shows one resolved Apple forecast entry, which is tied to the already resolved Mac Pro question.

## URLs checked

https://baycast-p.vercel.app/
Status 200. Home loads. Copy says prediction polling, blind-first, 43 questions live now.

https://baycast-p.vercel.app/questions
Status 200. Questions loads. Header shows 43 open. FIFA and OpenAI are visible as open items with 16d left.

https://baycast-p.vercel.app/questions?status=resolved
Status 200. Resolved filter loads. One resolved Apple Mac Pro question is visible.

https://baycast-p.vercel.app/leaderboard
Status 200. Leaderboard loads. One scored forecaster row is visible.

https://baycast-p.vercel.app/activity
Status 200. Activity feed loads. It only exposes the resolved Apple Mac Pro activity in the visible feed.

https://baycast-p.vercel.app/settlements/apple-mac-pro-wwdc-2026
Status 200. Settlement page loads. Apple Mac Pro is resolved No with sources and scoring explanation.

## BCP leak check

Checked visible copy and fetched HTML/RSC payloads for the six URLs above.

aggregate_probability: visible 0, DOM/RSC 0
forecasters_count: visible 0, DOM/RSC 0
settled_by: visible 0, DOM/RSC 0
evidence_doc: visible 0, DOM/RSC 0

Result: no BCP field-name leak found on the checked live routes.

## Settlement readiness

FIFA opening match: not ready to settle. The live question is still open and shows 16d left. No settlement action should be taken.

OpenAI public video generation model: not ready to settle. The live question is still open and shows 16d left. No settlement action should be taken.

Apple Mac Pro: settled page is live and readable. Outcome is No. The page explains the narrow rule, date window, sources checked, and what the first score means.

## Gate decision

Go for this 19h live gate. The checked routes load, the resolved Apple settlement route is public, and the BCP leak count is zero for the requested fields.

No-go for distribution until the private warm target exists. Baycast is prediction polling, not gambling, and the current public surface should stay in controlled warm-up mode.
