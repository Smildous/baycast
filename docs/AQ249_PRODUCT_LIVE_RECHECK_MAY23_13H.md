# AQ-249 product live recheck, May 23 13h

Result: PASS.

I checked production in browser at `https://baycast-p.vercel.app`. The site loaded live over HTTPS, and the checked routes returned usable pages in the browser. I did not read forecast data, did not query the forecasts table, and did not write to Supabase.

Routes checked: `/`, `/questions`, `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`, `/leaderboard`, `/activity`.

The homepage `/` shows live question cards and the Apple Mac Pro card. It does not show a consensus probability, exact forecaster counts, gambling copy, or open-question activity. Visible evidence: `Live questions`, `Make your call before seeing the crowd`, `Will Apple announce a new Mac Pro at WWDC 2026?`, and `Lock your call before the crowd can shape it`.

The questions list `/questions` shows `Questions(44 open)` and question cards with category and time left. It does not show a consensus probability, exact forecaster counts, gambling copy, or activity counts for open questions. The Apple Mac Pro route was discoverable from this page and from the homepage as `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`.

The Apple Mac Pro detail route `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248` remains open. Visible evidence: `21d left`, `Jun 13, 2026`, `Closes`, `Add your forecast`, and `Sign up to forecast`. The community signal is locked, with no visible consensus probability or exact forecaster count. I saw forecast input controls for a user to make a call, but no public crowd result.

The leaderboard `/leaderboard` is clean for open questions. It says `Scores appear after questions resolve` and does not expose open-question activity, consensus probability, exact forecaster counts, or gambling copy.

The activity page `/activity` is also clean. It says `Public forecasting activity appears after questions resolve` and `Open-question forecasts stay hidden until resolution so every forecaster starts blind`. No open-question activity entries were visible.

Notes: the public copy still uses prediction language such as forecast, crowd signal, scored by reality, and free to play. I did not see betting, wagering, odds, casino, payout, or stake language in the visible pages checked.
