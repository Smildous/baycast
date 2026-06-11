# AQ-361 product live gate recheck, Jun 11 13H UTC

Checked production at `https://baycast-p.vercel.app` on 2026-06-11T13:03:34Z with the browser. I used `/root/baycast-product`, synced with `origin/main` before the check. I did not read the forecasts table, did not call a forecast API, and did not inspect forecast records. The only app data I used for the Apple detail link came from the public `/questions` page and the public page payload for that same question route.

## Verdict

Pass. The live product still holds the BCP public boundary and the first-settlement gate is still closed. Apple Mac Pro remains an open question. Nothing on the checked public pages gives a signed-out user the crowd probability, a precise forecaster count, open forecast activity, gambling framing, or settlement controls.

## Routes tested

I checked `/`, `/questions`, `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`, `/leaderboard`, and `/activity`.

The homepage loaded normally. It showed the public hero, general Baycast copy, and the live questions strip. Apple Mac Pro appeared first with `Technology`, `2d left`, and `Lock your call before the crowd can shape it`. The page also showed `44 Questions live now`, which is an inventory count, not a forecaster count.

The questions page loaded normally. It showed `Questions(44 open)`, filters, sort links, and the closing-soon list. Apple Mac Pro was the first visible question and linked to `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`. I did not use the `Most Active` view to infer activity. I only confirmed that the default public listing does not expose forecast data.

The Apple Mac Pro detail page loaded with the expected title, the resolution criteria, the two context links, the locked community signal area, the visible close date `Jun 13, 2026`, and the signed-out forecast form. The public page metadata now says `tech · Open · Forecast before the crowd can shape your call`, without a forecaster count. The page body also avoids a public count.

The leaderboard loaded with `Scores appear after questions resolve`. It did not show rankings or open-question results.

The activity page loaded with `Activity appears after questions resolve` and the explanation that open-question forecasts stay hidden until resolution. This is the right pre-settlement state.

## BCP checks

No consensus probability was visible on any checked route. The Apple detail page shows a dash in the community signal slot and the text `Community signal locked`. The only percentages visible there are the user's own unsigned forecast controls, not crowd data.

No exact forecaster count was visible. The old metadata leak noted in earlier checks is not present on the Apple page I inspected. `44 open` and `44 Questions live now` are question inventory counts, not forecaster counts.

No open forecast activity was visible. `/activity` explicitly defers public activity until after resolution, and `/leaderboard` defers scores until questions resolve.

No gambling framing was visible. I saw free-use and scoring language, not odds, bets, stakes, wagers, payouts, or money-risk copy.

No public settlement controls were visible. The Apple detail page has share, forecast, signup, and login controls only. I saw no resolve button, admin action, settlement selector, or public control that could settle the question.

## Settlement gate

Apple Mac Pro is still open on the public site. The public UI shows `2d left`, `Add your forecast`, and `Sign up to forecast`, which is consistent with an open question and no settlement yet.

The close remains `2026-06-13T00:00:00+00:00`. The visible UI shows `Jun 13, 2026`, and the public route payload for the Apple detail page contains the same close date as `2026-06-13T00:00:00+00:00` in the page data. I did not query Supabase for this.

The sources remain Apple WWDC and Apple Newsroom. The visible context links are `Apple WWDC` and `Apple Newsroom`; the resolution source line is `Apple WWDC and Apple Newsroom: https://developer.apple.com/wwdc26/ and https://www.apple.com/newsroom/`. The criteria still limit the Yes window to WWDC 2026 or an Apple Newsroom post dated from 2026-06-08 through 2026-06-12.

There should be no settlement before the close. The live public state gives no reason to resolve early, and I saw no public settlement path.

## No-forecast-read statement

I did not read `forecasts`, did not query any forecast API, did not open a consensus endpoint, and did not inspect protected Blind Consensus data. The browser check stayed on public signed-out pages. A local helper script that reads `questions` only was attempted, but it did not run because the Supabase environment variables were absent; it returned before any Supabase read.

## Issues found

No AQ-361 blocker found.

Two small product notes remain non-blocking. First, `/` and `/questions` publish the open-question inventory count. That is acceptable for BCP because it is not a forecaster count. Second, the Apple detail route exposes the close as a date in the visible UI rather than the full ISO timestamp. The exact gate timestamp is still present in the public page payload and matches the expected close.

## Decision

AQ-361 can stay green for product live gate at 13H UTC. Keep first settlement blocked until `2026-06-13T00:00:00+00:00`, then resolve only from Apple WWDC and Apple Newsroom evidence.
