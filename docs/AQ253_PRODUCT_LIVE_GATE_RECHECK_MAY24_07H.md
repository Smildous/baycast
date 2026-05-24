# AQ-253 product live gate recheck, May 24 07h

Verdict: PASS.

I checked production in the browser after syncing `main`. I did not query Supabase, did not call any Supabase API directly, and did not read any forecasts table. This check stayed on public Baycast pages only.

Exact URLs checked:

| Page | Evidence |
| --- | --- |
| https://baycast-p.vercel.app/ | Home loads. Live question cards say "Lock your call before the crowd can shape it". Apple Mac Pro is visible from the home page. No public consensus probability, no forecaster count, no open forecast activity, no gambling copy seen. |
| https://baycast-p.vercel.app/questions | Questions index loads with Apple Mac Pro visible. It shows open questions and time left, but no public consensus probability and no exact forecaster count. No open forecast activity and no gambling copy seen. |
| https://baycast-p.vercel.app/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248 | Direct Apple Mac Pro route discovered from home and questions. Page title is "Will Apple announce a new Mac Pro at WWDC 2026?". It shows "20d left", "Community signal locked", no consensus value, no forecaster count, and an "Add your forecast" form with sign up and log in links. That means the question remains open. The page metadata includes `dateModified: 2026-06-13T00:00:00+00:00`, matching the close time. No settled or resolved state appears before that close time. |
| https://baycast-p.vercel.app/leaderboard | Leaderboard loads and says "Scores appear after questions resolve". No open forecast activity, no forecaster counts, no consensus probability, no gambling copy seen. |
| https://baycast-p.vercel.app/activity | Activity loads and says "Activity appears after questions resolve". No open forecast activity is exposed. No consensus probability, no forecaster count, no gambling copy seen. |

Apple Mac Pro status: open. The direct page still allows a forecast path, shows the close date as Jun 13, 2026, and the embedded metadata carries `2026-06-13T00:00:00+00:00`. I saw no settlement, no resolved label, and no result before close.

BCP public-surface check: pass. Public pages keep the community signal locked, do not expose exact forecaster counts, do not show open forecast activity, and keep the copy in prediction-polling language rather than gambling language.
