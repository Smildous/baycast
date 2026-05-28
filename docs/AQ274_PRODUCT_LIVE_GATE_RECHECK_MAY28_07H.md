# AQ-274 product live gate recheck, May 28 07h

Verdict: PASS.

Checked live at 2026-05-28T07:02:23Z on https://baycast-p.vercel.app. I used the public browser surface only. I did not read the Supabase forecasts table and I did not touch code.

## What I checked

Home loads cleanly and shows the main navigation, the Baycast positioning, the live question cards and the Apple Mac Pro card. The public copy stays in prediction polling language. I saw no consensus probability, no exact forecaster count and no betting or gambling pitch.

`/questions` loads cleanly with `Questions(44 open)`, category filters, status filters, sorting and pagination. The Apple Mac Pro question is visible. Cards show category, days left, title and `Lock your call before the crowd can shape it`. The `44 open` value is a question count, not a forecaster count. I saw no public consensus probability and no exact forecaster count.

The Apple Mac Pro detail page is reachable at `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`. It shows the expected title, category, `16d left`, the resolution criteria, Apple WWDC and Apple Newsroom context links, `Community signal locked`, `Jun 13, 2026` as close date, and the signed-out forecast form. The visible community signal value is locked with placeholders, not a probability. I saw no exact forecaster count.

The Apple Mac Pro page metadata is also clean on the BCP point. The meta description, OpenGraph description, Twitter description and JSON-LD answer say `Forecast before the crowd can shape your call.` They do not expose `0 forecasters`, `1 forecaster`, a consensus probability, or any exact participation count.

`/leaderboard` loads and says `Scores appear after questions resolve`. There is no premature score table, no open forecast activity, no consensus probability, no exact forecaster count and no gambling copy.

`/activity` loads and says public forecasting activity appears after questions resolve. Open-question forecasts stay hidden. There is no public open forecast feed, no consensus probability, no exact forecaster count and no gambling copy.

## Apple Mac Pro guardrails

The Apple Mac Pro detail page is on topic. The context links are only Apple WWDC and Apple Newsroom. I did not see NIST, OpenAI or unrelated technology context on that page.

The settlement gate passes. The page is still open, shows `16d left`, keeps the add-forecast path visible, and shows `Jun 13, 2026` as the close date. The structured metadata carries `dateModified: 2026-06-13T00:00:00+00:00`. I saw no resolved state, no settlement result and no public activity before `2026-06-13T00:00:00+00:00`.

The source context passes. The resolution text says Yes only if Apple announces a new Mac Pro during WWDC 2026 or in an Apple Newsroom post dated 2026-06-08 through 2026-06-12. The page lists only `https://developer.apple.com/wwdc26/` and `https://www.apple.com/newsroom/` as resolution source context.

## BCP check

Public BCP passes on this recheck. The public pages keep the community signal locked before a signed-in forecast. They do not show a consensus probability, do not show exact forecaster counts, and do not expose open-question forecast activity. The language stays around forecasting, polling, calibration, Brier scoring and crowd intelligence. I did not see betting or gambling copy on the checked surfaces, apart from the product's allowed comparison framing in navigation.
