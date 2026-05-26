# AQ-270 product live gate recheck, May 26 19h UTC

Run started at 2026-05-26T19:01:30Z against `https://baycast-p.vercel.app`.

This was a live public browser pass only. I did not query Supabase forecasts and did not read the forecasts table. Existing AQ267 docs were left untouched.

The Apple Mac Pro route was discoverable from prior repo docs and from the live home and questions pages: `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`.

## Result

Pass for the public BCP gate checked here.

The public surface keeps the crowd signal blind before a forecast. I did not see a consensus probability, an exact forecaster count, open forecast activity, betting copy, wager copy, odds copy, or gambling copy on `/`, `/questions`, the Apple Mac Pro detail page, `/leaderboard`, or `/activity`.

Apple Mac Pro is still open. The detail page shows `18d left`, `Community signal locked`, the sign-up and login forecast path, and the close date `Jun 13, 2026`. The page metadata still carries `dateModified: 2026-06-13T00:00:00+00:00`. That close time is after the run time.

Leaderboard is in the right state. It says `Scores appear after questions resolve`, so public scores are waiting for resolved questions.

Activity is in the right state. It says `Activity appears after questions resolve`, with the extra line that open-question forecasts stay hidden until resolution. That keeps activity post-resolution.

## Page notes

`/` loaded with the Apple Mac Pro card visible in Live questions. The card says `Lock your call before the crowd can shape it`. No public consensus probability or exact forecaster count was shown.

`/questions` loaded with `Questions(44 open)`. The Apple Mac Pro card was visible and linked to the direct route. Question cards showed category, days left, title, and the locked-call copy. No public consensus probability or exact forecaster count was shown.

`/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248` loaded as `Will Apple announce a new Mac Pro at WWDC 2026? - Baycast`. It showed the resolution criteria, Apple WWDC and Apple Newsroom as the resolution source, `Community signal locked`, `Jun 13, 2026`, and an unsigned forecast flow. The visible slider shows the user's trial probability before sign-up, not a community consensus. Metadata descriptions say `tech · Open · Forecast before the crowd can shape your call`, with no forecaster count.

`/leaderboard` loaded and held scores back until resolution. No open-question result table was exposed.

`/activity` loaded and held activity back until resolution. No open-question forecast feed was exposed.

Browser console after the last page had no console messages and no JavaScript errors.
