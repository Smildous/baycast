# AQ-351 Product live gate recheck, 2026-06-09 19h UTC

I checked the live production site at https://baycast-p.vercel.app with the browser only. I did not read Supabase forecasts, forecast rows, or any database forecast data.

Verdict: pass for the AQ-351 Product gate. The live public pages I checked do not expose consensus probability, do not show an exact forecaster count, do not publish open-question activity rows, do not use gambling framing, and do not expose public settlement controls. The Apple Mac Pro question is still open on the public product surface and shows a close date of Jun 13, 2026, so it is not presented as settlable before 2026-06-13T00:00:00+00:00.

Checked pages and evidence:

Home page, /

The page showed the hero text "How well can you predict the future?" and "Live now: predictions from the crowd". The stats area showed "44 Questions live now", "AI vs Human Forecasting", and "100% Free to play". The live questions section showed Apple Mac Pro with "4d left" and the card copy "Lock your call before the crowd can shape it". I did not see a consensus probability, an exact forecaster count, forecast rows, odds, bets, wagers, deposits, prizes, or settlement controls.

Questions page, /questions

The page title was "Questions(44 open)". The first visible list item was "Will Apple announce a new Mac Pro at WWDC 2026?" under Technology with "4d left" and "Lock your call before the crowd can shape it". Other visible cards used the same blind-call framing. Filters for All, category, Open, Closed, Resolved, Closing Soon, Newest, and Most Active were visible. I did not see consensus probability, exact forecaster count, public open-question activity rows, gambling language, or settlement controls.

Apple Mac Pro question detail page

Discovered from /questions at https://baycast-p.vercel.app/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248.

The detail page heading was "Will Apple announce a new Mac Pro at WWDC 2026?". The visible status was Technology and "4d left". The resolution text says the question resolves Yes if Apple announces a new Mac Pro model during WWDC 2026 or in an Apple Newsroom post dated from 2026-06-08 through 2026-06-12, and resolves No if no new Mac Pro is announced in that window. The page showed static context links for Apple WWDC and Apple Newsroom.

The BCP surface was locked: the page showed "Lock your forecast before the crowd can shape it", "Community signal locked", and "Jun 13, 2026" under Closes. The forecast form was a public, unauthenticated input with a probability slider and preset buttons from 5 percent to 95 percent, followed by "Sign up to lock this forecast" and "Log in". I did not see any public settlement button, admin resolver, final outcome picker, consensus probability, exact participant count, or open-question activity rows. This supports that the Apple Mac Pro question remains open and not publicly settlable before 2026-06-13T00:00:00+00:00.

Leaderboard page, /leaderboard

The page showed "Leaderboard" and explained that ranking is by calibration and Brier score. The main empty state said "Scores appear after questions resolve" and "Forecasts are live now, but leaderboard scores start once a question has a final outcome." It exposed no open-question forecast rows, no consensus probability, no exact count of forecasters, no gambling framing, and no settlement controls.

Activity page, /activity

The page showed "Activity Feed" and the empty state "Activity appears after questions resolve". The body copy said "Public forecasting activity appears after questions resolve" and "Open-question forecasts stay hidden until resolution so every forecaster starts blind." This directly matches the BCP requirement. I did not see open-question activity rows, consensus probability, exact forecaster counts, gambling framing, or settlement controls.

BCP and product language check

The public language is prediction polling and forecasting language: forecast, probability, scored accuracy, Brier score, crowd signal, calibration, and questions. I did not see gambling language such as bet, wager, odds, payout, stake, casino, sportsbook, winnings, or cash prize on the checked pages.

Final claim

AQ-351 is acceptable on the checked live surfaces at 2026-06-09 19h UTC. The checked production pages keep the blind consensus surfaces closed for open questions, and the Apple Mac Pro question remains open with the close date shown as Jun 13, 2026.