# AQ-247 product live gate recheck, May 23 07h

Live check done on `https://baycast-p.vercel.app` and the direct AQ-247 route:
`https://baycast-p.vercel.app/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`

I created this file before opening the live product check.

## Result

PASS. The public page keeps the Blind Consensus path closed before a user forecast, and the Apple Mac Pro first settlement gate is still open.

## Evidence from production

PASS | Public BCP does not show a consensus probability.
The direct page shows `Community signal` with locked placeholders, then `Community signal locked`. The only visible percentages are the forecast input presets and the slider labels: 5%, 10%, 25%, 50%, 75%, 90%, 95%. I did not see a public crowd probability or resolved consensus value.

PASS | No exact forecaster count is exposed on the question page.
The direct AQ-247 page does not show a count of forecasters, votes, predictions, users, or participants. The questions index shows `44 open`, which is an open question count, not a forecaster count.

PASS | No gambling copy was visible.
The checked pages use forecast language: `Lock your forecast before the crowd can shape it`, `Sign up to lock this forecast`, `Crowd predictions. Scored by reality.` I did not see betting, wager, odds, payout, stake, casino, or gambling copy.

PASS | No activity leak was visible in the checked AQ-247 public path.
The AQ-247 page has an `Activity` navigation link in the shell, but the page content did not expose recent forecasts, latest calls, identities, timestamps, or public forecast activity. I did not open any flow that would read forecasts.

PASS | First settlement gate remains open.
The direct route title is `Will Apple announce a new Mac Pro at WWDC 2026?`. The page shows `21d left`, includes `Add your forecast`, and offers `Sign up to forecast`. That is consistent with an open question.

PASS | Close date is correct.
The direct page shows `Jun 13, 2026` next to `Closes`, matching the requested close date `2026-06-13`.

## Guardrail note

No forecast was submitted. No forecast endpoint was queried. I only used the public UI text on the home page, the questions index, and the direct AQ-247 route.
