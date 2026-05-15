# AI forecaster launch QA, May 15

This is the activation shortlist, not a market report. I queried live Supabase from `/root/baycast` with the service role path in `scripts/supabase-admin.mjs` and a read-only Supabase JS query. Live state at check time: 44 open questions, 1 forecast, 2 profiles.

## Shortlist for first AI agent forecasts

Selection rule: prefer binary questions with a public resolution source, a near enough close date to create feedback, clear thresholds, and enough outside base-rate context for an agent to justify a probability without pretending to know private information.

1. Will US core CPI for May 2026 be 0.3 percent month over month or higher?
   Category: economy. closes_at: 2026-06-30T23:59:59+00:00.
   Why: clean BLS release, one numeric threshold, no subjective judgment. Agents can use recent inflation trend, nowcasts, rates context, and base rates.
   Conservative range: 35 to 55 percent.

2. Will the ECB cut its deposit facility rate at its June 2026 monetary policy meeting?
   Category: economy. closes_at: 2026-06-30T23:59:59+00:00.
   Why: a single official ECB decision resolves it. Central bank questions are good early tests because agents can cite current guidance and market-implied odds.
   Conservative range: 30 to 55 percent.

3. Will the 2026 Atlantic hurricane season have a named storm before June 15?
   Category: science. closes_at: 2026-06-15T00:00:00+00:00.
   Why: objective NHC source, short horizon, strong climatology. Good for calibration because early-season named storm frequency is estimable.
   Conservative range: 25 to 45 percent.

4. Will the 2026 FIFA World Cup opening match have at least three total goals?
   Category: sports. closes_at: 2026-06-30T23:59:59+00:00.
   Why: official final score, binary threshold, rich historical base rates for opening matches and international football totals.
   Conservative range: 35 to 50 percent.

5. Will OpenAI release a new public video generation model before July 1, 2026?
   Category: tech. closes_at: 2026-06-30T23:59:59+00:00.
   Why: public release criterion is tight. Agents can reason from product cadence, release-note history, and whether demos count.
   Conservative range: 20 to 40 percent.

6. Will the S&P 500 close above 7,000 on any trading day before July 1, 2026?
   Category: economy. closes_at: 2026-06-30T23:59:59+00:00.
   Why: objective market close and threshold. Agents can use current index level, required return, volatility, and time remaining.
   Conservative range: 20 to 45 percent.

7. Will Ethereum close above $5,000 on Coinbase before July 1, 2026?
   Category: economy. closes_at: 2026-06-30T23:59:59+00:00.
   Why: clear exchange, close-only rule, short horizon. Volatile enough to be interesting, but still resolvable without ambiguity.
   Conservative range: 15 to 35 percent.

8. Will US nonfarm payrolls for June 2026 be below 100,000?
   Category: economy. closes_at: 2026-07-31T23:59:59+00:00.
   Why: first BLS headline number is binding. Agents can use labor trend, claims, surveys, and base-rate distribution.
   Conservative range: 20 to 40 percent.

9. Will the Bank of Japan raise its policy rate before August 1, 2026?
   Category: economy. closes_at: 2026-07-31T23:59:59+00:00.
   Why: official BoJ decision, defined action, two-month window. Good test for macro reasoning without resolution ambiguity.
   Conservative range: 25 to 50 percent.

10. Will Microsoft announce a new first-party Xbox handheld before August 1, 2026?
    Category: tech. closes_at: 2026-07-31T23:59:59+00:00.
    Why: official announcement source, specific product boundary, enough public rumor and strategy context for an agent forecast.
    Conservative range: 15 to 35 percent.

I would not use the older broad questions for the first AI batch, even if some are interesting. Items like commercial fusion by 2030, China and Taiwan before 2028, or Fed cuts before Q3 2027 are too long-dated for an activation push. They do not create quick feedback, and they make the site feel static.

## BCP safety checklist for AI forecasts

BCP here means Baycast Compliance and Product safety. The goal is simple: AI agents should make forecasts, not place bets, move markets, or create fake consensus.

Before any AI forecast is inserted:

1. Confirm the question is objectively resolvable from a named public source.
2. Confirm the question is binary and open.
3. Confirm the AI account is clearly labeled as an AI agent in profile, activity, and any public forecast card.
4. Keep Blind Consensus intact. The agent must not read the current Baycast consensus before forecasting.
5. Do not let one AI account forecast multiple times on the same question unless the product explicitly supports forecast updates and shows them as updates.
6. Use probability only, no staking, no odds, no payoff language.
7. Store a short rationale internally or publicly, but avoid advice language like “buy”, “sell”, “trade”, or “bet”.
8. Avoid questions where an AI forecast could be mistaken for medical, legal, financial, or emergency guidance.
9. Avoid private-information framing. The rationale should cite public evidence and base rates.
10. Use conservative ranges and avoid false precision. A single point forecast can be inserted later, but launch QA should sanity-check it against a range.
11. Rate-limit initial inserts. Better to seed 10 good forecasts from 2 or 3 labeled agents than flood all 44 questions at once.
12. Check the UI after insertion: question page, activity feed, leaderboard, profile, and any aggregate display.
13. Keep an audit trail: question_id, agent user_id, probability, model or agent name, prompt version, created_at.
14. Do not call Baycast gambling, trading, markets, wagers, or odds in AI forecast copy.
15. If a forecast display bug appears, stop inserts until the bug is fixed.

## Live UX check on baycast-p.vercel.app

Checked with browser against production.

What works:

- Home page loads cleanly and says “44 Questions live now”.
- Questions page shows “Questions(44 open)” and gives a usable list with pagination.
- Question detail page preserves Blind Consensus for signed-out users. It says “Sign in to forecast and see the community consensus” and locks the community signal.
- The forecast control is understandable for a signed-out user, with a slider and quick probability buttons, then a sign-up CTA.
- No browser console errors showed during the checked question page.

Ghost town signals after one forecast:

- `/activity` shows exactly one item: Simba forecasted on “Will Bitcoin exceed $200,000 before 2027?”, 12 days ago. That makes the product feel inactive, not newly alive.
- `/leaderboard` is empty and says the leaderboard is waiting for its champion, even though one forecast exists. This is a strong ghost town signal.
- The question page for the one forecasted question still shows a locked consensus placeholder to signed-out users, which is correct for Blind Consensus, but it also means a visitor cannot see proof that forecasting activity exists there.
- The activity feed displays that lone forecast as 100%, while the live Supabase row for that forecast has `prediction.probability` equal to 4. That mismatch needs investigation before AI forecasts are inserted.
- On `/questions`, “Most Active” is present as a sort option, but the first page does not visibly prove activity or forecast counts. With one forecast, the site still reads like a catalog, not a live forecasting product.

Net UX read: Baycast has the right activation surface, but one forecast is worse than zero in some places because it exposes staleness. The next insert should look intentional: labeled AI agents, several fresh forecasts, and activity copy that makes clear this is a scored forecasting poll, not a market.

## Decision

Wait. Do not insert AI forecasts yet.

Reason: the product is close, but the live UX has two problems that can make a launch batch look sloppy: the empty leaderboard despite one forecast, and the activity probability mismatch. If AI forecasts go in now, the activity feed will become the main proof of life, and any display bug there will be amplified.

Recommended launch gate:

- Fix or explain why the leaderboard excludes the existing forecast.
- Fix the activity percentage mapping before adding agent forecasts.
- Add visible AI labeling in activity and profile views.
- Insert a small batch after that: 10 forecasts across the shortlist above, ideally from 2 or 3 labeled AI agents, not one anonymous-looking user.

Once those gates pass, I would insert the first AI batch immediately. The questions are good enough. The blocker is presentation and trust, not question quality.
