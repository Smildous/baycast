# AQ-359 product live gate recheck, Jun 11 07H UTC

Checked production at `https://baycast-p.vercel.app` on 2026-06-11T07:02:39Z. I used the browser against the live site. I did not query Supabase, did not inspect the forecasts table, and did not read any forecast records.

Verdict: pass for first-settlement gate. The first settlement can remain blocked until the Apple Mac Pro question closes. The public product surface still protects the BCP constraints: no public consensus probability, no exact forecaster count, no open-question activity, and no gambling framing.

## Live pages checked

Homepage `/`

The homepage loaded with the public navigation and the hero text "How well can you predict the future?". The live questions section showed Apple Mac Pro first with "Technology", "2d left", and "Lock your call before the crowd can shape it". It also showed general product copy such as "Free to use", "Free forever", "No payment required", and "Free to play". I did not see odds, wagers, stakes, betting language, or payout framing.

The homepage does show "44 Questions live now". That is an open-question count, not a forecaster count. I did not see exact forecaster counts.

Questions `/questions`

The questions page loaded with `Questions(44 open)`, search, category filters, state filters, and sort links. The closing-soon list had the Apple Mac Pro question first with "2d left" and the blind-call copy "Lock your call before the crowd can shape it".

I did not see public consensus percentages, community probability values, exact forecaster counts, or open-question activity rows. The page exposes discovery and status, not forecast data.

Apple Mac Pro detail `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`

The detail page loaded with title "Will Apple announce a new Mac Pro at WWDC 2026?". It is still open from the public UI: the page shows "2d left", an "Add your forecast" section, probability input controls, and sign-up or log-in calls to save a forecast.

Closure evidence is good. The visible page shows "Jun 13, 2026" under "Closes". The production page script contains the exact close timestamp `2026-06-13T00:00:00+00:00`. I checked only the page payload for this question route, not forecast data.

Resolution context is constrained to Apple WWDC and Apple Newsroom. The visible criteria say:

> Resolves Yes if Apple announces a new Mac Pro model during WWDC 2026 or in an Apple Newsroom post dated from 2026-06-08 through 2026-06-12. A spec bump to Mac Studio, MacBook, iMac, or Mac mini does not count. A Mac Pro with any new Apple silicon generation counts, whether it ships immediately or later. If no new Mac Pro is announced in that window, resolves No.

The visible context links are only "Apple WWDC" and "Apple Newsroom". The page also says "Static reference links that may help frame the question. No live news feed is loaded here." The resolution source line is:

> Resolution source: Apple WWDC and Apple Newsroom: https://developer.apple.com/wwdc26/ and https://www.apple.com/newsroom/

Public BCP surfaces are still locked on this detail page. The community signal area shows a dash, "Community signal", another dash, and "Community signal locked". There is no displayed public consensus probability before a user makes a forecast. There is no exact forecaster count. There is no public open-question activity. I also did not see any public settlement control or admin resolution action.

Leaderboard `/leaderboard`

The leaderboard loaded with "Leaderboard", period links, and the message "Scores appear after questions resolve". This is the expected empty pre-settlement state. I did not see user rankings based on open questions, open-question activity, exact forecaster counts, or consensus probabilities.

Activity `/activity`

The activity page loaded with "Activity Feed" and "Activity appears after questions resolve". This is the expected empty pre-settlement state. It does not expose open-question forecast activity.

## Gate notes

The Apple Mac Pro question remains the first settlement gate. It is still open and closes at `2026-06-13T00:00:00+00:00`. The allowed resolution context remains Apple WWDC plus Apple Newsroom only. Production does not show public settlement controls.

The only surface that could look numerically sensitive is the public open-question count, `44 open` or `44 Questions live now`. That is not a BCP leak because it is a question inventory count, not a probability, forecast count, or activity feed.

## Final verdict

AQ-359 live product gate recheck passes at 07H UTC on Jun 11. Keep first settlement gated until the Apple Mac Pro question closes on 2026-06-13T00:00:00+00:00, then resolve strictly against Apple WWDC and Apple Newsroom.
