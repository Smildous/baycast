# AQ-286 product live gate recheck, May 30 07h

PASS.

I checked the live public site at https://baycast-p.vercel.app after resetting the repo to origin/main. I did not read the forecasts table and did not query any open-question forecast data.

Routes checked: homepage, /questions, /questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248, /leaderboard, /activity.

The homepage shows the product as forecasting and crowd prediction polling. It links into live questions and uses copy such as "Lock your call before the crowd can shape it". I did not see public consensus probability, exact forecaster counts, open-question activity, or gambling copy.

/questions showed the Apple Mac Pro question in the closing-soon list with 14d left. The public cards still hide the crowd signal and do not expose forecast percentages or forecaster counts.

The Apple Mac Pro detail page is open and forecastable. The public page shows "Community signal locked", not a consensus probability. It shows "Closes" as Jun 13, 2026, so the visible first settlement gate is not before 2026-06-13T00:00:00+00:00. The resolution text is limited to WWDC 2026 and Apple Newsroom dated 2026-06-08 through 2026-06-12. The context links visible on the page are Apple WWDC and Apple Newsroom only.

/leaderboard shows the empty-state copy that scores appear after questions resolve. It does not expose open-question participation counts or forecast values.

/activity shows the empty-state copy that public forecasting activity appears after questions resolve and that open-question forecasts stay hidden until resolution. That matches Blind Consensus.

No fail items found in this recheck.
