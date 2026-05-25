# AQ-259 product live gate recheck, 25 May 2026 07h UTC

Target file noted first: `/root/baycast-product/docs/AQ259_PRODUCT_LIVE_GATE_RECHECK_MAY25_07H.md`.

Verdict: PASS.

I checked production at `https://baycast-p.vercel.app` with the browser. I did not query Supabase. I did not read the `forecasts` table.

Pages checked

`/`: PASS. Homepage loaded with title `Baycast - Predict Real Events`. The live cards show question category, days left, title, and the prompt `Lock your call before the crowd can shape it`. I saw no consensus probability, no exact forecaster count, no open forecast activity, and no gambling copy.

`/questions`: PASS. Browse page loaded with the Baycast browse title and heading `Questions(44 open)`. Apple Mac Pro is listed as `Technology`, `19d left`, `Will Apple announce a new Mac Pro at WWDC 2026?`. Cards did not expose consensus probability, exact forecaster counts, or open forecast activity.

`/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`: PASS. Direct Apple Mac Pro route loaded from production links with title `Will Apple announce a new Mac Pro at WWDC 2026? - Baycast`. The page shows `19d left`, `Community signal locked`, and `Closes Jun 13, 2026`. The forecast form is still present with `Add your forecast`, a slider, preset buttons, and `Sign up to forecast`. Public signal values are locked and shown as dashes, not as a visible consensus probability.

`/leaderboard`: PASS. Leaderboard loaded with the Baycast leaderboard title and message `Scores appear after questions resolve`. No open forecast activity or exact open forecaster counts were visible.

`/activity`: PASS. Activity feed loaded with the Baycast activity title and message `Activity appears after questions resolve`. No open forecast activity was visible.

Apple Mac Pro settlement gate

PASS. The Apple Mac Pro question remains open on production. It shows `19d left`, has an active forecast entry area, and closes on `Jun 13, 2026`. Based on that close date, no settlement should happen before `2026-06-13T00:00:00+00:00`.

BCP public surface checks

No visible consensus probability before forecast: PASS. Homepage and question lists show only cards and lock copy. The Apple question detail shows `Community signal locked` with dashes instead of a probability.

No exact forecaster counts on public open surfaces: PASS. I saw no exact forecaster counts on the checked open public pages.

No open forecast activity: PASS. `/activity` says activity appears after questions resolve. `/leaderboard` says scores appear after questions resolve.

No gambling copy: PASS. The checked copy uses forecast, prediction, crowd, scored by reality, and free to play wording. I saw no gambling, betting, wager, odds, or payout language.

Notes

The only numeric public totals I saw were product level question counts, such as `44 open` and `Questions live now`. I did not treat those as forecaster counts. No app code was changed.
