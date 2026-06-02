# AQ-307 Product live gate recheck, 02 Jun 2026 13h UTC

Created at 2026-06-02T13:02:51Z.

Scope: public product pages only. No Supabase tables were read. No `forecasts` data was opened or queried.

Target: https://baycast-p.vercel.app/

Verdict: pass for the public BCP gates checked in this run.

Routes checked: `/`, `/questions`, `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`, `/leaderboard`, and `/activity`.

Home page

The home page loaded in the browser. The visible live cards showed category, days left, question title, and the prompt to lock a call before the crowd can shape it. I did not see a consensus probability, exact forecaster counts, open-question activity, or gambling framing. The page showed `44 Questions live now` and `100% Free to play`; neither exposes forecaster counts or consensus.

Questions list

`/questions` loaded with `Questions(44 open)`. The Apple Mac Pro question was the first closing-soon card, visible as `Will Apple announce a new Mac Pro at WWDC 2026?`, and it was reachable from the list. The list cards showed category, days left, title, and the locked-call prompt. I did not see consensus probability, exact forecaster counts, open-question activity, or gambling framing. The page has a `Most Active` sort link, but no open-question activity rows were shown.

Apple Mac Pro detail page

Reached URL: `https://baycast-p.vercel.app/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`.

The first-settlement candidate remains open and forecastable. Evidence on the page: `11d left`, `Add your forecast`, a probability slider, preset probability buttons, and signup or login prompts to save the forecast. The community section stayed locked and did not reveal consensus probability. I did not see an exact forecaster count.

The visible close date was `Jun 13, 2026`, which is not before `2026-06-13T00:00:00+00:00`.

The visible context links were Apple-only:

- Apple WWDC, `https://developer.apple.com/wwdc26/`
- Apple Newsroom, `https://www.apple.com/newsroom/`

The resolution source text also referenced Apple WWDC and Apple Newsroom only. The resolution criteria stayed limited to a new Mac Pro announcement during WWDC 2026 or in an Apple Newsroom post dated 2026-06-08 through 2026-06-12.

Leaderboard

`/leaderboard` loaded. It showed `Scores appear after questions resolve` and explained that forecasts are live now while leaderboard scores start after a final outcome. I did not see open-question activity, consensus probability, exact forecaster counts, or gambling framing.

Activity

`/activity` loaded. It showed `Activity appears after questions resolve` and stated that open-question forecasts stay hidden until resolution. I did not see open-question activity, consensus probability, exact forecaster counts, or gambling framing.

Final note

No product code changed. This file is the only deliverable for this check.
