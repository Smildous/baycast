# AQ-305 Product live gate recheck, 02 Jun 2026 07h UTC

Created first at 2026-06-02T07:01:32Z, before live browser QA.

Scope: public product pages only. I did not read the forecasts table and did not query consensus data.

Target: https://baycast-p.vercel.app/

Result: pass for the gates checked in this run.

I checked the home page, `/questions`, the Apple Mac Pro detail page reached from the questions list, `/leaderboard`, and `/activity` in a live browser session.

Home page

The page loaded with HTTP 200 behavior in the browser. The live question cards show category, time left, title, and the locked call prompt. I did not see a consensus probability, exact forecaster counts, open-question activity, or gambling framing. The page shows `44 Questions live now` and `100% Free to play`; I treated those as product counters and free access copy, not forecaster counts or consensus.

Questions list

`/questions` loaded and showed `Questions(44 open)`. The Apple Mac Pro question was the first closing-soon card and was reachable from the list. The visible open question cards showed no consensus probability and no exact forecaster counts. The list includes a `Most Active` sort link, but I did not see open-question activity rows or activity details on the page.

Apple Mac Pro detail page

Reached URL: `https://baycast-p.vercel.app/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`.

The question remains open and forecastable. The page showed `11d left`, `Add your forecast`, a probability slider, preset forecast buttons, and signup or login prompts for saving a forecast. The community signal stayed locked and showed no visible consensus probability. I did not see an exact forecaster count.

Visible context links were only:

- Apple WWDC, `https://developer.apple.com/wwdc26/`
- Apple Newsroom, `https://www.apple.com/newsroom/`

The visible close date was `Jun 13, 2026`, which is not before `2026-06-13T00:00:00+00:00`. Resolution source text also referenced Apple WWDC and Apple Newsroom only.

Leaderboard

`/leaderboard` loaded. It showed `Scores appear after questions resolve`. I did not see open-question activity, consensus probability, exact forecaster counts, or gambling framing.

Activity

`/activity` loaded. It showed `Activity appears after questions resolve`. I did not see open-question activity, consensus probability, exact forecaster counts, or gambling framing.

Notes

No code was changed. Only this document was created for the deliverable.
