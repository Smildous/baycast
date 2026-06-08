# AQ-343 product live gate recheck, Jun 08 13h UTC

Checked live site at 2026-06-08T13:02:16Z.

Repo used: `/root/baycast-product`.
Site checked: `https://baycast-p.vercel.app`.
No Supabase forecast tables or forecast rows were read.

Visited pages:

- `/`
- `/questions`
- `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`
- `/leaderboard`
- `/activity`

Findings:

The home page and questions page show the Apple Mac Pro question as open, with `5d left`. The question card says `Lock your call before the crowd can shape it`. It does not show a crowd probability, a consensus value, an exact forecaster count, or recent forecast activity.

The Apple Mac Pro detail page is reachable from `/questions`. It shows the question as Technology, open, and closing on `Jun 13, 2026`. The copy says `Community signal locked`. The community signal value is hidden. I saw no crowd probability, no exact forecaster count, no public open-question activity, and no resolve or settle control on the public page.

The detail page still has the forecast input and sign-up prompt. That matches an open question before the first settlement time. The first settlement gate is intact: Apple Mac Pro remains open and is not publicly settleable before `2026-06-13T00:00:00+00:00`.

The leaderboard page says scores appear after questions resolve. It does not list open-question participation metadata.

The activity page says public forecasting activity appears after questions resolve, and open-question forecasts stay hidden until resolution. It does not expose open-question forecast activity.

I saw no gambling framing on these public pages. No bet, wager, odds, payout, buy, sell, or market language was present in the checked public copy.

Result: AQ-343 public BCP gate passes on the checked live pages. The first-settlement gate also passes for the Apple Mac Pro question.
