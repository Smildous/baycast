# AQ-298 product live gate recheck, 2026-06-01 07h UTC

Scope: public Baycast production preview at https://baycast-p.vercel.app. I checked the first-settlement readiness path in a logged-out browser session. I did not open, query, inspect, or read the forecasts table, and I did not read any individual forecast data. The only probability values I saw were the public input controls for making a new forecast on the question page, not submitted forecasts or aggregate forecast data.

Overall result: PASS for the AQ-298 public BCP surface gate.

## URLs checked and evidence

Home, https://baycast-p.vercel.app/
Result: PASS. The page loaded with live-question cards. The Apple Mac Pro card was visible. Cards used the blind-call copy, "Lock your call before the crowd can shape it." I saw no consensus probability, no forecaster count, no settlement state, and no betting or gambling copy.

Questions list, https://baycast-p.vercel.app/questions
Result: PASS. The page title showed Questions with 44 open. The Apple Mac Pro question was reachable from the first page of the list. Question cards showed category, days left, title, and blind-call copy only. I did not see exact forecaster counts or consensus probabilities.

Apple Mac Pro detail, https://baycast-p.vercel.app/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248
Result: PASS. The candidate is still open. The page showed Technology, 12d left, and Closes Jun 13, 2026. The community signal was locked and displayed no numeric consensus. No exact forecaster count was shown.

Leaderboard, https://baycast-p.vercel.app/leaderboard
Result: PASS. The page showed "Scores appear after questions resolve." No resolved score rows were present, and there was no open-question activity or forecast leakage.

Activity, https://baycast-p.vercel.app/activity
Result: PASS. The page showed "Activity appears after questions resolve" with a Browse Questions link. No open-question activity appeared.

## Apple Mac Pro settlement gate

The Apple candidate remains a first-settlement candidate, still open, with no public settlement shown before 2026-06-13T00:00:00+00:00. The visible close date was Jun 13, 2026. The detail page did not show a resolved state, a result, a score, or any settlement timestamp.

Apple context stayed inside the intended sources. The detail page described resolution as Yes only if Apple announces a new Mac Pro during WWDC 2026 or in an Apple Newsroom post dated 2026-06-08 through 2026-06-12. The only context links shown were Apple WWDC and Apple Newsroom. The visible resolution source line was: Apple WWDC and Apple Newsroom: https://developer.apple.com/wwdc26/ and https://www.apple.com/newsroom/.

## BCP surface findings

The public surfaces held the blind-consensus posture. I found no public consensus probability, no exact forecaster counts, and no open-question activity feed entries. The Apple detail page kept the community signal locked. The language was forecasting and scoring language, not gambling language. I saw "Free to play," "forecast," "score," "crowd," and "prediction" framing, but no betting, wagering, odds, stake, payout, or casino framing.

Browser console after the live pass had no messages and no JavaScript errors.

Final call: PASS. AQ-298 can use this as the 2026-06-01 07h UTC live public gate recheck evidence, with the explicit constraint that no forecasts table or forecast data was read.
