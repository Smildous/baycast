# AQ-255 product live gate recheck, May 24 13h

Checked live Baycast at 2026-05-24 13:02 UTC.

Verdict: PASS.

I checked the public site only. I did not query Supabase and did not read forecasts.

Pages checked:

- https://baycast-p.vercel.app/
- https://baycast-p.vercel.app/questions
- https://baycast-p.vercel.app/questions/will-apple-announce-a-new-mac-pro-at-wwdc-2026, which returned 404
- https://baycast-p.vercel.app/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248, found from the Questions page
- https://baycast-p.vercel.app/leaderboard
- https://baycast-p.vercel.app/activity

Evidence:

Home and Questions show the Apple Mac Pro question as open. The Questions page lists it with Technology, 20d left, and the copy "Lock your call before the crowd can shape it". I did not see a consensus probability or an exact forecaster count there.

The expected slug for the Apple Mac Pro question returned 404, so I used the live Questions link. The working public URL is `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`.

On the Apple Mac Pro detail page, the question is still open: Technology, 20d left, closes Jun 13, 2026. The resolution text says Yes only if Apple announces a new Mac Pro during WWDC 2026 or in an Apple Newsroom post dated 2026-06-08 through 2026-06-12. Publicly, it is not resolved and there is no settlement affordance shown before close. The community signal is locked. The only percentages visible are the user's own forecast slider and preset buttons under "Add your forecast", not a public consensus.

Leaderboard shows "Scores appear after questions resolve" and no open-question forecast activity. Activity shows "Activity appears after questions resolve" and no public open-forecast activity.

I did not see gambling copy on the checked public pages. The product language stays in prediction polling terms: forecast, crowd, scored by reality, free to play.

BCP check: pass. No public consensus probability leak, no exact forecaster count leak, no public open-forecast activity, and no gambling framing found on the checked surfaces.
