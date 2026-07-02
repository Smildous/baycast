# AQ-538 past-close evidence gate, Jul 2 07h UTC

Run time: 2026-07-02T07:02Z. Repo `/root/baycast` was already fast-forwarded to `origin/main` before this note. I did not read `forecasts`, and I did not write live data. The only Supabase read for candidate discovery was `questions` with `id,title,status,category,closes_at,resolution_source,description`.

## Production propagation check for AQ-536

Browser check on `https://baycast-p.vercel.app/questions` loaded successfully. The page shows `Questions(40 open)`. The visible past-deadline cards show `Closed`, not stale `Closes today` copy. Examples in the browser snapshot:

`Will US core CPI for May 2026 be 0.3 percent month over month or higher?` showed `Economy Closed`.

`Will the ECB cut its deposit facility rate at its June 2026 monetary policy meeting?` showed `Economy Closed`.

`Will the S&P 500 close above 7,000 on any trading day before July 1, 2026?` showed `Economy Closed`.

Browser check on `https://baycast-p.vercel.app/questions?sort=closing-soon` loaded successfully. It shows `Questions(0 closing soon)` and `No questions closing in the next 14 days`. I did not see `Closes today` on that route.

Read-only verifier output:

```text
npm run verify:public-bcp
Verifying public BCP surfaces at https://baycast-p.vercel.app
ok /
ok /questions
ok /questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248
ok /leaderboard
ok /activity
Public BCP surface verification passed.
```

```text
npm run verify:next-settlement-watch
next settlement watch: PASS
PASS FIFA opening match at least three goals: ok
  5745e845-94e9-4802-bbeb-850c982e1276 | resolved | 2026-06-30T23:59:59+00:00 | Will the 2026 FIFA World Cup opening match have at least three total goals?
PASS OpenAI public video generation model before July 1 2026: ok
  d3338e47-11ec-4568-942e-42bb19be0f5e | resolved | 2026-06-30T23:59:59+00:00 | Will OpenAI release a new public video generation model before July 1, 2026?
PASS Microsoft first-party Xbox handheld before Aug 1 2026: ok
  5cc9fe74-5306-49d9-bec3-251ad276a779 | open | 2026-07-31T23:59:59+00:00 | Will Microsoft announce a new first-party Xbox handheld before August 1, 2026?
```

## Five open questions found from `questions` only

The live `questions` read returned exactly these five open rows with `closes_at <= 2026-06-30T23:59:59Z`:

1. `cff593cd-e4f7-424f-b468-c8412edc3c6c`, economy, `2026-06-30T23:59:59+00:00`, `Will US core CPI for May 2026 be 0.3 percent month over month or higher?`
2. `9beb8cd0-474d-4ab4-b52c-e2c83820350b`, economy, `2026-06-30T23:59:59+00:00`, `Will the ECB cut its deposit facility rate at its June 2026 monetary policy meeting?`
3. `54f7e8b0-0dd6-4052-a5f3-2752c133083c`, economy, `2026-06-30T23:59:59+00:00`, `Will the S&P 500 close above 7,000 on any trading day before July 1, 2026?`
4. `3682dcd2-3680-4a58-bf06-4762f26b4541`, economy, `2026-06-30T23:59:59+00:00`, `Will Ethereum close above $5,000 on Coinbase before July 1, 2026?`
5. `9df06e86-a3f4-4550-8381-c6be33ea48a7`, other, `2026-06-30T23:59:59+00:00`, `Will the 2026 Cannes Palme d'Or go to a film from a female director?`

## Evidence and settlement call

### US core CPI for May 2026

Question rule: Yes if the first BLS May 2026 CPI release shows core CPI, all items less food and energy, up 0.3 percent or more month over month, seasonally adjusted. No if 0.2 percent or lower.

Source: BLS Public Data API, `https://api.bls.gov/publicAPI/v2/timeseries/data/CUSR0000SA0L1E?startyear=2026&endyear=2026`

Evidence quote:

```text
"seriesID":"CUSR0000SA0L1E"
"year":"2026","period":"M05","periodName":"May","latest":"true","value":"336.121"
"year":"2026","period":"M04","periodName":"April","value":"335.423"
```

Calculation: `(336.121 / 335.423 - 1) * 100 = 0.20809544962627768%`. Rounded to one decimal, this is 0.2 percent, below the 0.3 percent threshold.

Outcome: No.

Confidence: High. Official BLS API source, direct series values, straightforward month-over-month calculation.

### ECB deposit facility rate at June 2026 monetary policy meeting

Question rule: Yes if the ECB announces a lower deposit facility rate in the June 2026 monetary policy decision. No if unchanged or raised.

Sources:

`https://www.ecb.europa.eu/press/press_conference/html/index.en.html`

`https://www.ecb.europa.eu/stats/policy_and_exchange_rates/key_ecb_interest_rates/html/index.en.html`

Evidence quote from the ECB press conference page:

```text
Press conference
PREVIOUS
30 April 2026
11 June 2026
Monetary policy decisions
Here is what the Governing Council decided about the ECB’s interest rates and instruments at its latest meeting.
Key ECB interest rates
With effect from: 17 June 2026
Deposit facility
2.25 %
```

Evidence quote from the ECB key rates page:

```text
Date (with effect from)
Deposit facility
Main refinancing operations
Marginal lending facility
2026
17 Jun.
2.25
2.40
-
2.65
2025
11 Jun.
2.00
2.15
-
2.40
```

The June 2026 decision did not lower the deposit facility rate. The official rate shown for 17 June 2026 is 2.25 percent, not a cut versus the prior listed 2.00 percent row.

Outcome: No.

Confidence: High. Official ECB pages, direct rate table and June 2026 decision page.

### S&P 500 close above 7,000 before July 1, 2026

Question rule: Yes if the S&P 500 official daily close is strictly above 7,000.00 on any trading day from 2026-05-15 through 2026-06-30 inclusive.

Source used: Yahoo Finance chart API for `^GSPC`, `https://query1.finance.yahoo.com/v8/finance/chart/%5EGSPC?period1=1778803200&period2=1782864000&interval=1d`

Evidence quote from the returned data check:

```text
31 daily rows from 2026-05-15 through 2026-06-30
first row: 2026-05-15 close 7408.5
max row: 2026-06-02 close 7609.77978515625
last row: 2026-06-30 close 7499.35986328125
```

This crosses the threshold on the first day of the window and again later. The 2026-06-02 close is strictly above 7,000.

Outcome: Yes.

Confidence: Medium-high. The source is reliable market data, but it is not the official S&P Dow Jones Indices file. The evidence is still objective and far from the threshold.

### Ethereum close above $5,000 on Coinbase before July 1, 2026

Question rule: Yes if ETH-USD on Coinbase has an official daily close strictly above $5,000.00 on any UTC day from 2026-05-15 through 2026-06-30. Intraday trades do not count.

Source: Coinbase Exchange candles API, `https://api.exchange.coinbase.com/products/ETH-USD/candles?start=2026-05-15T00%3A00%3A00Z&end=2026-07-01T00%3A00%3A00Z&granularity=86400`

Evidence quote from the returned data check:

```text
48 daily candle rows returned
Coinbase candle format: [time, low, high, open, close, volume]
2026-05-15 close 2223
2026-06-29 close 1610.62
2026-06-30 close 1569.45
max close in the queried window: 2026-05-15 close 2223
```

No daily close in the window is above $5,000.

Outcome: No.

Confidence: High. Coinbase is the specified source, and the maximum close found is far below the threshold.

### 2026 Cannes Palme d'Or to a film from a female director

Question rule: Yes if the 2026 Palme d'Or film is directed or co-directed by at least one woman, per official Cannes listing. If shared, Yes if at least one winning film qualifies. If the prize is not awarded by 2026-06-30, No.

Official source attempted: `https://www.festival-cannes.com/en/press/press-releases/the-79th-festival-de-cannes-winners-list/`. The page exists in search and the press listing, but direct access hit Cloudflare bot verification in browser and HTTP 403 from scripted fetch, so I did not rely on an inaccessible official quote.

Reliable public source used: Deadline, `https://deadline.com/2026/05/cannes-2026-winners-live-updating-1236919837/`

Evidence quote:

```text
Full Cannes 2026 Winners List: ‘Fjord’ Wins Palme D’Or
Cristian Mungiu’s drama Fjord, starring Sebastian Stan and Renate Reinsve, has won the Palme d’Or at the 79th Cannes Film Festival. The Romanian director, who previously scooped the festival’s prize with 4 Months, 3 Weeks and 2 Days, is the tenth director to win the coveted award twice.
Palme d’Or
Fjord, Cristian Mungiu
```

The cited winner is `Fjord`, directed by Cristian Mungiu. I found no co-director in the cited winner listing. This does not satisfy the female director condition.

Outcome: No.

Confidence: Medium-high. Official Cannes access was blocked in this environment, but the reliable public report is direct, names the Palme d'Or winner, and names the director.

## Gate result

AQ-536 propagation looks live: stale `Closes today` is gone from `/questions` and `/questions?sort=closing-soon` in the browser check. Public BCP verifier passed. The five past-close open questions have public evidence captured above. No live settlement writes were performed.