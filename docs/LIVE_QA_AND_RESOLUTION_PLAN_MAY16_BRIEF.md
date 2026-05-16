# Live QA and resolution plan, May 16 brief

Scope: live check on `https://baycast-p.vercel.app` after the AI forecasts went in. The file was created before the UI pass, then filled from the live pages and a read-only Supabase check.

## Live QA

`/activity` is doing the right basic job. It shows 11 recent forecasts, with the 10 AI forecasts at the top and Simba's older Bitcoin forecast underneath. The entries link into question detail pages, show the forecaster name, the question title, the age of the forecast and the probability. No browser console errors showed during the check.

The product issue is tone and balance, not plumbing. The feed now reads almost entirely as Baycast AI Baseline and Baycast AI Scout. That is useful proof that forecasts exist, but it also makes the public surface feel seeded rather than alive. If a new visitor lands there today, the honest read is: the machine has started, the crowd has not yet arrived.

`/leaderboard` is coherent with the data state. It is empty because there are no scores yet. The page says the leaderboard is waiting for a champion and asks people to sign up and predict. That is acceptable for now, but it also makes the next product move obvious: the first scored resolutions matter more than adding another batch of unresolved forecasts.

`/questions` loads 44 open questions, with pagination and the signed-out CTA intact. Question cards show category, time left, title and `Add your forecast`. The default list is usable. Category filtering works in the live UI, tested with Technology, which returned 8 open questions.

There is one live issue to fix before promoting the page harder: `?sort=closing-soon` returns `Questions(0 open)` and `No match`, even though the default list and Supabase both show questions closing soon. `?sort=newest` and `?sort=most-active` still show questions, but their ordering looked the same as the default during this check. The visible `Closing Soon` link is therefore misleading today.

One detail page was checked from activity: `Will Taylor Swift release a new studio album before December 31, 2026?` at `/questions/1a509d03-facd-4f79-b0be-29096eb6f095`. The page renders cleanly. Signed-out users see the resolution criteria, the locked consensus panel, the close date, the resolution source, the probability slider and sign-up/login CTAs. The Blind Consensus posture is protected on the detail page because the aggregate remains locked for signed-out users. No browser console errors showed during the detail check.

A second detail check on `Will Apple announce a new Mac Pro at WWDC 2026?` confirmed the same pattern and is the cleaner near-term scoring candidate because it closes first.

Read-only data check matched the current brief: 44 questions, 11 forecasts, 4 profiles, 0 scores.

## Five live questions to watch for first scores

These are already live. They are the best first-score candidates because they close soon, have clear external sources, and should be straightforward to resolve without turning Baycast into gambling.

1. `Will Apple announce a new Mac Pro at WWDC 2026?` Closes June 13, 2026. Check Apple WWDC and Apple Newsroom: `https://developer.apple.com/wwdc26/` and `https://www.apple.com/newsroom/`.

2. `Will the 2026 Atlantic hurricane season have a named storm before June 15?` Closes June 15, 2026. Check National Hurricane Center advisories and tropical cyclone reports: `https://www.nhc.noaa.gov/`.

3. `Will the 2026 FIFA World Cup opening match have at least three total goals?` Closes June 30, 2026. Check FIFA official match centre: `https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026`.

4. `Will US core CPI for May 2026 be 0.3 percent month over month or higher?` Closes June 30, 2026. Check US Bureau of Labor Statistics CPI release: `https://www.bls.gov/cpi/`.

5. `Will the ECB cut its deposit facility rate at its June 2026 monetary policy meeting?` Closes June 30, 2026. Check European Central Bank monetary policy decisions: `https://www.ecb.europa.eu/press/govcdec/mopo/html/index.en.html`.

Close runners-up are OpenAI public video model before July 1, S&P 500 above 7,000 before July 1, Ethereum above $5,000 before July 1, and Cannes Palme d'Or female director. I would keep those ready, but the five above give the cleanest first scored set across tech, science, sports and macro.

## Product verdict on more AI forecasts today

Do not add more AI forecasts today.

The site already has enough AI activity to prove the pipeline. Adding more would make `/activity` look less human and would not solve the bigger gap, which is that `/leaderboard` still has no scores. The better move is to protect Blind Consensus, recruit a few human forecasts on the near-term questions, fix the `Closing Soon` sort, and prepare the first resolution pass.

If a product action is needed today, make it this: point people to the five questions above, then resolve them promptly from the listed official sources when the event windows close. First scores will teach the product more than another AI seed batch.
