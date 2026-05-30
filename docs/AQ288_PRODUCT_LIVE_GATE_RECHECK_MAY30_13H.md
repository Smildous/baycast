# AQ-288 product live gate recheck, May 30 13h

Verdict: PASS.

I created this report first, synced `/root/baycast-product` with `origin/main`, then tested the live public build at `https://baycast-p.vercel.app`. I did not read the forecasts table and did not query open forecast data. Evidence below comes from the browser UI only.

Tested routes: `/`, `/questions`, `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`, `/leaderboard`, and `/activity`.

On the homepage, the page loaded as `Baycast - Predict Real Events`. It showed `44 Questions live now`, the Apple Mac Pro card, and the blind call wording `Lock your call before the crowd can shape it`. I did not see a consensus probability, an exact forecaster count, open-question activity, or gambling language. The visible `100%` was tied to `Free to play`, not to a community probability.

On `/questions`, the page loaded as `Browse Prediction Questions - Baycast` and showed `Questions(44 open)`. The Apple Mac Pro question was visible in the closing-soon list with `14d left`. The list kept the same blind wording and did not expose consensus, exact forecaster counts, or activity from open questions.

From the UI I opened the Apple Mac Pro detail route: `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`. The detail page showed the question title, the closing label `Jun 13, 2026`, `Community signal locked`, and the masked community signal value. The forecast control only showed the user's own input options. I did not see a community probability or exact forecaster count.

The Apple Mac Pro context stayed within the intended sources. The page text said resolution depends on WWDC 2026 or an Apple Newsroom post dated 2026-06-08 through 2026-06-12. The visible context links were only `Apple WWDC` at `https://developer.apple.com/wwdc26/` and `Apple Newsroom` at `https://www.apple.com/newsroom/`. The page also stated that no live news feed is loaded.

The first-settlement gate held in the live UI. The first visible candidate, Apple Mac Pro, closes on `Jun 13, 2026`, matching the canonical first close date of `2026-06-13T00:00:00+00:00`. `/leaderboard` showed `Scores appear after questions resolve`. `/activity` showed `Activity appears after questions resolve` and explained that open-question forecasts stay hidden until resolution. I saw no settled scores, no public open-question activity, and no indication of a settlement before 2026-06-13.

Issues found: none.
