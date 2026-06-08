# AQ-341 product live gate recheck, Jun 08 07h

I checked the live public product at `https://baycast-p.vercel.app` with browser tools only. The routes checked were `/`, `/questions`, `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`, `/leaderboard`, and `/activity`.

The Apple Mac Pro detail route was discoverable from the Questions page and from the Home page. The question shown there was: "Will Apple announce a new Mac Pro at WWDC 2026?" The page showed the resolution text, context links to Apple WWDC and Apple Newsroom, a forecast input for the signed-out user, and the locked community signal state.

BCP safety held on the checked routes. I did not see a consensus probability for any open question. I did not see exact forecaster counts or forecast counts for open questions. The Apple detail page showed "Community signal locked" instead of a public crowd probability or count. The Activity page stated that public forecasting activity appears after questions resolve, and it did not show open-question activity. The Leaderboard page stated that scores appear after questions resolve. The product copy stayed in prediction-polling framing, with language like forecasting, crowd predictions, scored by reality, and free to play. I did not see gambling framing.

The first-settlement candidate still does not support a No resolution before `2026-06-13T00:00:00+00:00`. The Apple Mac Pro rule uses the 2026-06-08 through 2026-06-12 announcement window and the live page shows the close date as Jun 13, 2026. Until that window has fully passed, absence of an announcement is not enough to settle the negative outcome.

Forecast data read: none. I did not query Supabase, did not read the forecasts table, and did not read any forecast rows. The check used only public browser-visible pages.

Verdict: pass for this live product gate recheck. The public routes checked kept open-question crowd signal hidden and did not expose BCP-sensitive forecast data.
