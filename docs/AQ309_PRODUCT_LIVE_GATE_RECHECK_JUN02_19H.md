# AQ-309 product live gate recheck, Jun 02 19h UTC

Recheck run at 2026-06-02T19:03:07Z against https://baycast-p.vercel.app with browser tools.

Verdict: GO for first-settlement readiness. The Apple Mac Pro question is still open and forecastable, the public Blind Consensus view is still locked, and the live page data still contains the required close value, `2026-06-13T00:00:00+00:00`.

No Supabase `forecasts` table was read. I did not query forecast rows or private participation data.

## Routes checked

I checked `/`, `/questions`, the Apple Mac Pro detail route reachable from the Questions UI at `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`, `/leaderboard`, and `/activity`.

## Evidence

Home loaded with the Apple Mac Pro card visible under Live questions. The card showed `Technology`, `11d left`, the title `Will Apple announce a new Mac Pro at WWDC 2026?`, and the blind prompt `Lock your call before the crowd can shape it`. I saw no consensus probability, no exact forecaster count, no open forecast activity, and no betting, wager, odds, stake, casino, or gambling wording.

Questions loaded with `Questions(44 open)`. The Apple Mac Pro question was the first Closing Soon card and again showed `Technology`, `11d left`, and `Lock your call before the crowd can shape it`. The `44 open` number is an open question count, not a forecaster count. I did not see exact participation metadata, consensus probability, or activity rows for open forecasts.

The Apple Mac Pro detail page loaded from the UI. Visible evidence was direct: title `Will Apple announce a new Mac Pro at WWDC 2026?`, category `Technology`, `11 d left`, `Community signal locked`, and close label `Jun 13, 2026`. The page remained forecastable for a signed-out visitor through the `Add your forecast` control, the probability slider, preset buttons from 5% through 95%, and the `Sign up to forecast` CTA. That is forecast entry UI, not public consensus.

The detail page kept the BCP lock intact. It showed `Lock your forecast before the crowd can shape it`, `Sign up to save your probability, unlock the comparison after your call`, and `Community signal locked`. I saw no public consensus probability and no exact forecaster count before forecast.

The live page data still contains `2026-06-13T00:00:00+00:00`. The visible close label is `Jun 13, 2026`, and the page data contains the exact ISO value required for the gate.

Context links on the Apple Mac Pro detail page were limited to two public Apple links: `Apple WWDC` at `https://developer.apple.com/wwdc26/` and `Apple Newsroom` at `https://www.apple.com/newsroom/`. The resolution source text also names Apple WWDC and Apple Newsroom only: `https://developer.apple.com/wwdc26/` and `https://www.apple.com/newsroom/`. I did not see any extra live news feed or third-party context link on that page.

Leaderboard loaded with `Scores appear after questions resolve` and the explanation that forecasts are live now, but scores start once a question has a final outcome. I saw no consensus probability, exact forecaster counts, open forecast activity, or gambling framing.

Activity loaded with `Public forecasting activity appears after questions resolve` and `Open-question forecasts stay hidden until resolution so every forecaster starts blind`. This is the right public posture for BCP. I saw no activity rows exposing open-question forecasts.

## Issues

No blocking issue found.

One small product note: the home page still says `Free to play`. It did not appear with gambling terms, payments, odds, wagers, or stakes, so I am not treating it as a gate failure. The rest of the checked copy uses forecasting, prediction polling, scoring, and collective intelligence language.

## Result

GO. Baycast is still ready for the Apple Mac Pro first-settlement gate from the public product and questions side.
