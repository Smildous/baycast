# AQ-276 product live gate recheck, May 28 13h

Timestamp: 2026-05-28 13h UTC.

Verdict: GO for first-settlement readiness.

I checked the live public site at https://baycast-p.vercel.app with the browser. I stayed on public BCP surfaces only. I did not read the Supabase `forecasts` table, I did not inspect open forecast data, and I did not use any private forecast source.

Routes checked: `/`, `/questions`, `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`, `/leaderboard`, `/activity`.

Home is clean. It shows Baycast as prediction polling and forecasting, with live question cards and the Apple Mac Pro card visible. I did not see a consensus probability, an exact forecaster count, public open-forecast activity, or gambling framing. The visible numbers are product counters such as `44 Questions live now`, not participation counts for a question.

`/questions` is clean. It loads `Questions(44 open)`, filters, sorting, pagination and the question cards. The Apple Mac Pro question is visible. Cards show category, days left, title and `Lock your call before the crowd can shape it`. I did not see consensus probability, exact forecaster count, public activity from open forecasts, or betting copy.

The Apple Mac Pro page is reachable at `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`. It shows the WWDC 2026 question, open state, `16d left`, the signed-out forecast form, `Community signal locked`, placeholders where the crowd signal would be, and `Jun 13, 2026` as the close date. The public copy does not reveal consensus or exact participation before a forecast. The structured metadata is also clean: the answer text says `Forecast before the crowd can shape your call.` and `dateModified` is `2026-06-13T00:00:00+00:00`.

Apple Mac Pro context is correct. The detail page uses Apple WWDC and Apple Newsroom only. The resolution source line is `Apple WWDC and Apple Newsroom: https://developer.apple.com/wwdc26/ and https://www.apple.com/newsroom/`. I did not see NIST, OpenAI, or generic unrelated context on that page.

`/leaderboard` is clean. It says `Scores appear after questions resolve`. There is no premature ranking table, no open forecast activity, no consensus probability, no exact forecaster count, and no gambling framing.

`/activity` is clean. It says `Activity appears after questions resolve`. It does not expose activity from open forecasts, consensus probability, exact forecaster count, or gambling framing.

BCP passes this live check. First-settlement readiness is GO for the public product gates checked here. No settlement result is visible, open-question forecasts stay hidden, and the Apple Mac Pro settlement gate remains anchored to 2026-06-13T00:00:00+00:00 or later.
