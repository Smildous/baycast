# AQ-355 product live gate recheck, Jun 10 13h UTC

Run time: 2026-06-10T13:02:41Z  
Surface: https://baycast-p.vercel.app  
Question checked: Will Apple announce a new Mac Pro at WWDC 2026?  
Question URL observed: https://baycast-p.vercel.app/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248

I did not query Supabase and did not read `forecasts`.

## Checks performed

I refreshed the local repo first with `git fetch origin` and `git pull --ff-only origin main`, then checked the live public product with the browser.

Home `/` showed the normal public entry points, live question cards, and the Apple Mac Pro card. The card says to lock the call before the crowd can shape it. I did not see a public consensus probability, exact forecaster counts, open-question forecast activity, gambling wording, or any settlement control.

Questions `/questions` showed `Questions(44 open)` and the Apple Mac Pro question in the closing soon list with `3d left`. The page kept the blind framing. I did not see public consensus, counts of forecasters on the question, open-question activity, market odds, betting language, or settlement controls.

Apple Mac Pro detail opened from the questions page. The page shows:

`Will Apple announce a new Mac Pro at WWDC 2026?`

It remains open on the public product. The detail shows `3d left`, `Community signal locked`, and `Closes Jun 13, 2026`. Public users can see a forecast input and sign-up path, but no public settlement button or admin resolution control. Since the configured close is `2026-06-13T00:00:00+00:00`, this question is not settleable yet.

Resolution text is specific enough for first settlement review:

`Resolves Yes if Apple announces a new Mac Pro model during WWDC 2026 or in an Apple Newsroom post dated from 2026-06-08 through 2026-06-12. A spec bump to Mac Studio, MacBook, iMac, or Mac mini does not count. A Mac Pro with any new Apple silicon generation counts, whether it ships immediately or later. If no new Mac Pro is announced in that window, resolves No.`

Context links are relevant and official:

- Apple WWDC, official Apple Worldwide Developers Conference updates and event information
- Apple Newsroom, official product, software, services, and company announcements

Leaderboard `/leaderboard` showed only post-resolution scoring language: scores appear after questions resolve. It did not expose open-question consensus, open-question activity, exact forecaster counts, or Apple Mac Pro specific data.

Activity `/activity` showed that public forecasting activity appears after questions resolve and that open-question forecasts stay hidden until resolution. This is consistent with Blind Consensus.

## Verdict

Settlement verdict: NO-GO.

Reason: the Apple Mac Pro question is still open and should not be settled before `2026-06-13T00:00:00+00:00`. The public product also does not expose a settlement control.

Product gate verdict for Blind Consensus: GO.

Reason: the checked public surfaces preserve blind consensus for open questions. I did not see public consensus probability, exact forecaster counts, open-question activity, betting or gambling framing, or public resolution controls.

## BCP notes

The product still presents Baycast as prediction polling and scoring against reality, not as a market. The open Apple question keeps the community signal locked. Forecasting is framed as a blind first call before seeing the crowd. The only public aggregate I saw was the site-level open question count, not a question-level consensus or forecaster count.

No AQ353 docs were edited.
