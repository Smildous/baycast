# AQ-303 product live gate recheck, Jun 01 19h UTC

Recheck run at 2026-06-01T19:02:21Z against https://baycast-p.vercel.app.

Decision: pass. The live product keeps the Apple Mac Pro question open, keeps the blind public view intact, and shows the first settlement close at 2026-06-13T00:00:00+00:00 in the page data.

## Scope

Routes checked in browser:

- Home: `/`
- Questions: `/questions`
- Apple Mac Pro detail: `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`
- Leaderboard: `/leaderboard`
- Activity: `/activity`

No Supabase forecasts table was read. No forecast values were queried.

## Evidence

Home loads with the Apple Mac Pro card visible in Live questions. The card says `12d left` and `Lock your call before the crowd can shape it`. I did not see a consensus probability, exact forecaster counts, betting language, wagering language, stakes, or odds.

Questions loads with `Questions(44 open)` and the Apple Mac Pro item in the closing soon list. The visible card again says `12d left` and `Lock your call before the crowd can shape it`. This exposes an open question count, not forecaster counts. I did not see a consensus probability, exact forecaster counts, open question activity rows, or gambling framing.

The Apple Mac Pro detail route loads and remains forecastable. Visible evidence:

- Title: `Will Apple announce a new Mac Pro at WWDC 2026?`
- Status copy: `12d left`
- Blind copy: `Lock your forecast before the crowd can shape it`
- Community section: `Community signal locked`
- Close label: `Jun 13, 2026`
- Page data contains `2026-06-13T00:00:00+00:00`
- Context links shown: `Apple WWDC` at `https://developer.apple.com/wwdc26/` and `Apple Newsroom` at `https://www.apple.com/newsroom/`
- Resolution source text names Apple WWDC and Apple Newsroom only

Leaderboard loads with `Scores appear after questions resolve`. I did not see consensus probability, exact forecaster counts, open question activity rows, or gambling framing.

Activity loads with `Public forecasting activity appears after questions resolve` and `Open-question forecasts stay hidden until resolution so every forecaster starts blind`. I did not see open question activity rows, consensus probability, exact forecaster counts, or gambling framing.

## Checks

Public BCP: pass. The public pages keep community signal locked before the visitor forecasts, and the activity page withholds open question forecasts until resolution.

Consensus probability leak: pass. No public consensus percentage was visible on the checked routes.

Exact forecaster count leak: pass. No exact forecaster counts were visible on the checked routes.

Open question activity rows: pass. The activity route shows a resolved-only empty state, not live open question rows.

Gambling or betting framing: pass. The checked copy uses forecasting, prediction polling, scoring, and free play language. I did not see betting, gambling, wager, stake, or odds framing.

Apple Mac Pro first-settlement gate: pass. The question is still open, and the close value found in page data is exactly `2026-06-13T00:00:00+00:00`, so it is not before the required gate. Visible context links are limited to Apple WWDC and Apple Newsroom.

## Result

Ship status stays green for AQ-303 product live gate recheck at 19h UTC.
