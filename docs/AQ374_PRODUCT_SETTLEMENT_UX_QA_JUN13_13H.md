# AQ-374 product settlement UX QA, Jun 13 13h

Run time: 2026-06-13 13:01 UTC
Surface: https://baycast-p.vercel.app
Scope: first public settlement surface for “Will Apple announce a new Mac Pro at WWDC 2026?” plus the public home, questions, leaderboard, and activity pages.

I used the live Vercel site in a browser. I did not read private forecast tables or any admin surface.

## Result

The first settlement is visible publicly and the core result is understandable: the Apple Mac Pro WWDC 2026 question is marked Resolved and the resolution value is No. Leaderboard scoring is also live: one forecaster row shows a Brier score of 0.2500.

The main product issue is still on the resolved question page. The page exposes the raw settlement JSON payload directly to users:

`Resolution: {"value":0,"outcome":"no","settled_at":"2026-06-13T07:06:50.320Z","settled_by":"odin","evidence_doc":"docs/AQ371_PRODUCT_EVIDENCE_GATE_JUN13_07H.md"}`

That is not a good public settlement treatment. It leaks implementation language, an internal actor name, and an internal doc path. It also makes the actual No outcome harder to read than it should be.

There is also some confusing settlement layout copy on the resolved page. After the raw payload, the page shows “On Jun 13, 2026”, then “Community signal”, “Community signal locked”, and “Jun 13, 2026 Closes”. For a resolved question, the user needs a clean resolved state first: outcome, settled date, source, and short evidence note. The current mix of resolved, community signal, and closes labels feels like an open-question card that has not been fully adapted after settlement.

## Pages checked

Home: https://baycast-p.vercel.app

The home page loads and presents Baycast as crowd prediction and forecasting. It shows “43 Questions live now”, “AI vs Human Forecasting”, and “100% Free to play”. The live question cards say “Lock your call before the crowd can shape it”. I did not see open-question consensus percentages, exact forecaster counts per open question, or gambling framing.

Questions: https://baycast-p.vercel.app/questions

The questions page loads with “Questions(43 open)” and open cards. The open cards show category, time left, title, and “Lock your call before the crowd can shape it”. I did not see open-question consensus values or exact open forecaster counts on the cards. The page does expose the total number of open questions, which is not the protected forecaster count.

Resolved filter: https://baycast-p.vercel.app/questions?status=resolved, reached through the Resolved tab

The resolved Apple Mac Pro question is findable from the public Questions page. It appears as Technology, Resolved, “Will Apple announce a new Mac Pro at WWDC 2026?” The card still says “Lock your call before the crowd can shape it”, which is stale for a resolved question.

Resolved Apple page: https://baycast-p.vercel.app/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248

The page shows the title, resolution criteria, context links, “Question resolved”, and the source text: “Apple WWDC and Apple Newsroom: https://developer.apple.com/wwdc26/ and https://www.apple.com/newsroom/”. It also exposes the raw JSON settlement payload. This should be replaced with plain copy such as “Resolved No on Jun 13, 2026” and a short evidence/source block.

Leaderboard: https://baycast-p.vercel.app/leaderboard

The leaderboard loads with a clear scoring explanation: “Ranked by calibration. A Brier score near 0 means your predictions matched what actually happened.” One row is visible: S Simba, Brier 0.2500, Log Score blank, Predictions 2. This is consistent with the first settlement being scored. I did not see gambling language.

Activity: https://baycast-p.vercel.app/activity

The activity feed loads and shows a forecast event for the now-resolved Apple Mac Pro question: “S Simba forecasted 50% on Will Apple announce a new Mac Pro at WWDC 2026? 13d ago 50%”. This is a resolved question, so showing the old forecast is not a Blind Consensus leak for an open question. I did not see activity for open-question consensus or exact live counts in this pass.

## BCP safety check

Open-question consensus: pass in this browser pass. Open question pages and cards show locked community signal language, not a crowd percentage.

Exact open forecaster counts: pass for question-level counts. I did not see exact open forecaster counts on open question cards or the sampled open question page. The site does show “43 open” questions, which is a product inventory count, not a forecaster count.

Gambling framing: pass. I saw forecasting, prediction, calibration, Brier score, score, and free-to-play language. I did not see betting, odds, wager, payout, win money, or gambling calls to action.

Resolved payload UX: fail. The Apple page still exposes raw JSON and internal settlement fields. This is the clearest follow-up for AQ-374.

Resolved card copy: needs cleanup. The resolved listing still uses “Lock your call before the crowd can shape it”, which should not appear after settlement.

## Product recommendation

Keep the settlement public, but replace the raw payload block before this surface gets wider traffic. The minimum public copy should be:

“Resolved No on Jun 13, 2026.”

Then show the resolution source and evidence note in plain language. Keep internal fields like `settled_by`, `evidence_doc`, raw timestamps, and JSON out of the public page.

Also update resolved cards so they say the outcome, not the open-question lock prompt.
