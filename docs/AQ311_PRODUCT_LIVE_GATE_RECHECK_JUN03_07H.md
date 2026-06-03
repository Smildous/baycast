# AQ-311 product live gate recheck, Jun 03 07h UTC

Run at 2026-06-03T07:02:44Z against https://baycast-p.vercel.app from the browser.

Verdict: GO for the product and questions gate. The public BCP posture is still intact. I did not read the forecasts table, and I did not inspect forecast rows or private forecast values.

## What I checked

I opened the homepage, `/questions`, the Apple Mac Pro detail page discovered from the Questions list, `/leaderboard`, and `/activity`.

The homepage loaded normally. The Apple Mac Pro card was visible under Live questions with `Technology`, `10d left`, the title `Will Apple announce a new Mac Pro at WWDC 2026?`, and the prompt `Lock your call before the crowd can shape it`. I did not see a consensus probability, an exact forecaster count, open-question forecast activity, gambling copy, odds, stakes, wagers, or betting language. The only count I saw on the home page was `44 Questions live now`, which is a question inventory count, not participation metadata.

`/questions` loaded normally with the Apple Mac Pro question as the first Closing Soon card. The page showed `Questions(44 open)`, category filters, status filters, sorting, cards, and pagination. Cards showed category, time left, title, and the same blind prompt. I did not see public consensus probability, exact forecaster counts, forecast rows, or activity rows for open questions. The `Most Active` sort label is visible, but the page did not expose activity counts or participation data in the checked state.

The Apple Mac Pro detail page remained open and forecastable. It showed `Technology`, `10 d left`, the title, `Community signal locked`, and the close label `Jun 13, 2026`. The signed-out forecast UI was present through `Add your forecast`, the probability slider, preset buttons, and the `Sign up to forecast` call to action. That is forecast entry UI, not a public consensus readout.

The Apple Mac Pro context stayed clean. I saw exactly two context links: `Apple WWDC` and `Apple Newsroom`. The resolution source text also named only Apple WWDC and Apple Newsroom, with `https://developer.apple.com/wwdc26/` and `https://www.apple.com/newsroom/`. I did not see third-party Apple rumor links, live news links, or off-topic Apple context links.

`/leaderboard` loaded with `Scores appear after questions resolve`. It did not show open-question activity, exact forecaster counts, consensus probability, or gambling framing.

`/activity` loaded with `Activity appears after questions resolve`. It did not show open-question forecast rows or any public activity leak for unresolved questions.

The browser console was clean during the last checked route: no console messages and no JavaScript errors.

## Issues

No public bug found that was both safe and worth changing in this pass.

One note remains non-blocking: the product uses `Free to play` on the homepage. I did not see gambling framing around it, no odds, wager, stake, casino, payment, or betting copy. I would not treat that phrase alone as a gate failure.

## Result

GO. Baycast remains ready for the Apple Mac Pro first-settlement gate from the public product side.
