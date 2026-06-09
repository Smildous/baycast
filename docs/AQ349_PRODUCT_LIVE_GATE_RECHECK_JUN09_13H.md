# AQ-349 product live gate recheck, Jun 09 13h

Checked in production at `2026-06-09T13:02:15Z` on `https://baycast-p.vercel.app`.

Scope was public browser QA only: `/`, `/questions`, the Apple Mac Pro detail page, `/leaderboard`, and `/activity`. I did not read or query the `forecasts` table. I used the public site as a logged-out visitor and kept the check limited to BCP surfaces.

## Evidence

Home loaded cleanly. The page framed Baycast as crowd predictions, independent first calls, scoring by reality, and free forecasting. The live cards included `Will Apple announce a new Mac Pro at WWDC 2026?` with `4d left` and `Lock your call before the crowd can shape it`. I did not see a public consensus probability, an exact forecaster count, open-question forecast activity, or gambling language. I also did not see betting, wagering, odds, staking, payouts, casino, or trading framing.

`/questions` loaded with `Questions(44 open)`. The Apple Mac Pro question was the first closing-soon card, marked Technology and `4d left`. The card used the same blind-call language: `Lock your call before the crowd can shape it`. The list did not expose a consensus probability or an exact count of forecasters. The Apple detail page was reachable from that public card.

The Apple Mac Pro detail page loaded at `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`. It showed the question as open, `4d left`, with `Closes Jun 13, 2026`. The resolution text matched the gate context: Yes only if Apple announces a new Mac Pro during WWDC 2026 or in an Apple Newsroom post dated from `2026-06-08` through `2026-06-12`; Mac Studio, MacBook, iMac, or Mac mini spec bumps do not count. The public community area stayed locked. It showed `Community signal locked`, with no probability and no exact forecaster count. I saw no public settlement control and no resolved state.

`/leaderboard` loaded with the empty-state message `Scores appear after questions resolve`. The page said forecasts are live now, but leaderboard scores start once a question has a final outcome. It did not show open-question activity, a consensus probability, or an exact forecaster count.

`/activity` loaded with `Public forecasting activity appears after questions resolve`. The page also said `Open-question forecasts stay hidden until resolution so every forecaster starts blind`. That is the clearest BCP surface check in this pass. Open-question forecast activity was not public.

The browser console at the end of the pass showed no console messages and no JavaScript errors.

## Result and decision

Public BCP is holding on the checked production pages. I found no public consensus probability, no exact forecaster count, no open-question forecast activity, and no gambling framing.

The first-settlement gate is holding too. Apple Mac Pro is still open, closes on Jun 13, 2026, keeps the community signal locked, and exposes no public settlement path before `2026-06-13T00:00:00+00:00`.

Final decision: GO.
