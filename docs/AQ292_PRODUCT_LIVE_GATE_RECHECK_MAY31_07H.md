# AQ-292 product live gate recheck, 2026-05-31 07h UTC

Run done from `/root/baycast-product` after a clean reset to `origin/main` at `a6e0f92`. I did not read the `forecasts` table and did not inspect any open forecast data.

Production checked: `https://baycast-p.vercel.app`.

I checked `/`, `/questions`, the Apple Mac Pro question detail found from the questions list, `/leaderboard`, and `/activity`.

The Apple Mac Pro detail URL found from the live list is:

`/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`

Findings:

The public BCP surface is still holding. The home page and questions list show the Apple Mac Pro question as open and use the locked-call language: “Lock your call before the crowd can shape it.” I did not see a consensus probability, an exact forecaster count, or any public open-question activity row on the checked surfaces.

The Apple Mac Pro detail page keeps the community signal locked. It shows “Community signal locked” instead of a public crowd number. The forecast control is still present, with the “Add your forecast” section, a probability slider, and the sign-up path to forecast. That means the candidate is still forecastable from the public product surface.

The close timestamp in the page data is `2026-06-13T00:00:00+00:00`. That is not before the required gate of `2026-06-13T00:00:00+00:00`. The visible close label is “Jun 13, 2026”. There is no settlement action visible today on the product surface.

The Apple Mac Pro context links remain the expected Apple sources:

- Apple WWDC: `https://developer.apple.com/wwdc26/`
- Apple Newsroom: `https://www.apple.com/newsroom/`

`/leaderboard` is gated until resolutions, with “Scores appear after questions resolve”. `/activity` is also gated until resolutions, with “Activity appears after questions resolve”. This is the expected posture before first settlement and it avoids open-question activity leakage.

I did not see gambling framing on the checked pages. The product language stays in prediction polling and scoring language: forecast, questions, crowd predictions, scored by reality, free to play.

Decision: pass for the 07h product live gate recheck. No settlement action should happen today. AQ-292 remains open, forecastable, BCP-safe, and eligible to stay in the first-settlement gate queue.
