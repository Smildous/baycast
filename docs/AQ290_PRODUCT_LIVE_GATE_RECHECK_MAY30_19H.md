# AQ-290 product live gate recheck, May 30 19h UTC

Checked live on 2026-05-30 at 19:02 UTC against `https://baycast-p.vercel.app`, after syncing `main` to `cac8075`. I did not read the `forecasts` table and did not write to Supabase.

Verdict: pass. The public BCP surfaces still keep the crowd signal gated before a visitor makes a call. I found no consensus probability, no exact forecaster count, no open-question activity feed, and no betting or gambling framing on the checked pages.

No settlement before: `2026-06-13T00:00:00+00:00`.

## Evidence

Homepage loaded with title `Baycast - Predict Real Events`. It showed `44` questions live now, `AI vs Human Forecasting`, `100% Free to play`, and the live question cards. The Apple Mac Pro card was visible as `Technology`, `14d left`, `Will Apple announce a new Mac Pro at WWDC 2026?`, with the copy `Lock your call before the crowd can shape it`. I did not see a probability, a forecaster total, an activity count, or any gambling language.

`/questions` loaded with title `Browse Prediction Questions, Baycast` and the header `Questions(44 open)`. The list exposed the Apple Mac Pro question at the top under `Closing Soon`, again with `14d left` and the same locked-call language. Public sorting and filters were visible, including `Open`, `Closed`, `Resolved`, `Closing Soon`, `Newest`, and `Most Active`. The cards did not expose consensus probability or exact forecaster count.

The Apple question was reachable from the public list at `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`. The detail page showed `Technology`, `14 d left`, the title `Will Apple announce a new Mac Pro at WWDC 2026?`, and the resolution text covering WWDC 2026 or Apple Newsroom posts dated 2026-06-08 through 2026-06-12. It showed `Community signal locked` with placeholder dashes instead of a public probability, and `Closes Jun 13, 2026`. The page remained forecastable for a logged-out visitor: the `Add your forecast` section had a 50 percent slider plus 5, 10, 25, 50, 75, 90, and 95 percent buttons, followed by sign-up and login prompts.

Visible context links on the Apple detail were only `Apple WWDC` and `Apple Newsroom`. The resolution source line named only those two sources: `Apple WWDC and Apple Newsroom: https://developer.apple.com/wwdc26/ and https://www.apple.com/newsroom/`.

`/leaderboard` loaded with title `Forecaster Leaderboard, Baycast`. It showed the empty-state message `Scores appear after questions resolve` and a sign-up link. I did not see open-question activity, forecaster counts, or probabilities.

`/activity` loaded with title `Recent Forecasting Activity, Baycast`. It showed `Activity Feed` and `Activity appears after questions resolve`, with a link back to questions. That confirms open-question activity is not public on this surface.

I also checked page language while navigating. The public copy stayed around forecasting, scoring, comparison after your call, and free play. I did not see words or framing such as odds, bets, wagering, staking, markets, shares, cashout, or trading.

## Gate note

The first-settlement guard is intact for this check. The Apple Mac Pro question is still open, forecastable, and publicly framed around a close date of Jun 13, 2026. Treat `2026-06-13T00:00:00+00:00` as the no-settlement-before boundary for AQ-290.