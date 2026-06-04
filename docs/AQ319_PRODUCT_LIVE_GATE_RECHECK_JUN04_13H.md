# AQ-319 product live gate recheck, Jun 04 13h UTC

Checked live on https://baycast-p.vercel.app at 2026-06-04T13:02:05Z with the browser, after resetting the product repo to origin/main.

Routes checked: home, /questions, the Apple Mac Pro question reached from /questions, /leaderboard, and /activity.

Evidence seen on the public surface:

Home showed Baycast as crowd prediction polling: live questions, free to play, AI vs Human forecasting, and question cards asking users to lock their call before the crowd can shape it. I did not see betting, wagering, stake, odds, payout, or trading language.

/questions showed 44 open questions and the Apple Mac Pro question in Closing Soon with 9d left. The list did not expose consensus probability, aggregate probability, exact forecast counts, exact forecaster counts, or open-question activity rows.

Apple Mac Pro detail page was reachable at /questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248. It was still open on the public page: 9d left, Add your forecast, sign up to forecast, and no resolved outcome. The visible close display was Jun 13, 2026. The page data exposed the close timestamp as 2026-06-13T00:00:00+00:00. Context links visible on the page were Apple WWDC and Apple Newsroom. The resolution source line was Apple WWDC and Apple Newsroom with https://developer.apple.com/wwdc26/ and https://www.apple.com/newsroom/. The public community signal remained locked and did not show a consensus probability.

/leaderboard showed that scores appear after questions resolve. It did not show exact participation counts or open-question forecast rows.

/activity showed that public forecasting activity appears after questions resolve and that open-question forecasts stay hidden until resolution. No open-question activity rows were visible.

Verdict for settlement now: NO-GO. The Apple Mac Pro question is still open, and its first settlement close remains 2026-06-13T00:00:00+00:00. Do not settle before that close.

No-forecast-read statement: I did not read the forecasts table, did not query forecast rows, and did not use any forecast data. This check used only the live public BCP pages in the browser.