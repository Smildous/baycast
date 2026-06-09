# AQ-347 product live gate recheck, Jun 09 07h

Checked in production at `2026-06-09T07:02:06Z` on `https://baycast-p.vercel.app`.

Scope was deliberately narrow: public browser QA only on `/`, `/questions`, the Apple Mac Pro detail reached from the list, `/leaderboard`, and `/activity`. I did not read the forecasts table, did not query forecast rows, and did not use forecast data.

## What I saw

Home loads with the public product framing intact. It says Baycast is for crowd predictions, independent first calls, scoring by reality, and free forecasting. I did not see betting, wagering, odds, staking, payout, trading, casino, or gambling language. The live question cards show the Apple Mac Pro question and ask the user to lock a call before the crowd can shape it. I did not see a consensus probability or an exact forecaster count on the home page.

`/questions` loads and shows `Questions(44 open)`. The Apple Mac Pro question is the first closing-soon card, marked Technology, `4d left`, with the same blind call language. The list exposes no consensus probability and no exact forecaster count. The Apple detail page is reachable from this card.

The Apple Mac Pro detail page loads at production and shows the question as open, with `4d left` and `Closes Jun 13, 2026`. The detail copy says it resolves Yes only for a Mac Pro announcement during WWDC 2026 or an Apple Newsroom post dated from `2026-06-08` through `2026-06-12`. The public community section is locked: it shows `Community signal locked` and no probability. There is no exact forecaster count. There is no settlement control visible to a public user, and no resolved or closed state is presented. This supports the first-settlement gate: Apple Mac Pro is still open and not publicly settleable before `2026-06-13T00:00:00+00:00`.

`/leaderboard` loads with an empty-state message: `Scores appear after questions resolve`. No open-question activity, consensus probability, or exact forecaster count is exposed there.

`/activity` loads with the message `Public forecasting activity appears after questions resolve` and explains that open-question forecasts stay hidden until resolution. This is the clearest public BCP check: activity from open questions is not shown.

Browser console on `/activity` had no console messages and no JavaScript errors at the end of the pass.

## Gate result

Public BCP is holding. I found no public consensus probability, no exact forecaster count, no open-question activity feed, and no gambling framing in the checked production pages.

The first-settlement gate is also holding. Apple Mac Pro remains open, closes on Jun 13, 2026, keeps the community signal locked, and exposes no public settlement path before `2026-06-13T00:00:00+00:00`.

Final decision: GO.
