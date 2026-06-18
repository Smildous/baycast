# AQ418 19h live BCP and next settlement gate, Jun 18

Checked at 2026-06-18T19:03:08Z against `https://baycast-p.vercel.app` from `/root/baycast-product`.

I fast-forwarded `main` from `origin/main` first. The repo was already current. I checked public pages from the deployed site and read only Supabase `questions` metadata: `id`, `title`, `status`, `closes_at`. I did not select from `forecasts`, did not inspect forecast rows, and did not use forecast data for settlement readiness.

## Commands run

```bash
git -C /root/baycast-product status --short
git -C /root/baycast-product fetch origin main
git -C /root/baycast-product merge --ff-only origin/main
node scripts/verify-public-bcp-surfaces.mjs
set -a; . /root/baycast/.env.local; set +a; node /tmp/aq418_live_gate.mjs
set -a; . /root/baycast/.env.local; set +a; node scripts/verify-next-settlement-watch.mjs
date -u +%Y-%m-%dT%H:%M:%SZ
```

`/root/baycast-product` has no local `.env.local`, so I loaded the existing canonical env from `/root/baycast/.env.local` for the read-only Supabase metadata check. Secrets were not printed.

## Public BCP route check

The existing public verifier passed:

```text
Verifying public BCP surfaces at https://baycast-p.vercel.app
ok /
ok /questions
ok /questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248
ok /leaderboard
ok /activity
Public BCP surface verification passed.
```

I also fetched the required live routes directly and scanned both raw HTML and script-stripped page body. The scan looked for:

```text
aggregate_probability
forecasters_count
settled_by
evidence_doc
raw JSON carrying BCP data
exact forecast counts
consensus probability
forecastCount
fcCount
```

Results:

```text
/ | 200 | Baycast - Predict Real Events | html hits none | visible hits none
/questions | 200 | Browse Prediction Questions - Baycast | html hits none | visible hits none
/questions?status=resolved | 200 | Browse Prediction Questions - Baycast | html hits none | visible hits none
/leaderboard | 200 | Forecaster Leaderboard - Baycast | html hits none | visible hits none
/activity | 200 | Recent Forecasting Activity - Baycast | html hits none | visible hits none
/settlements/apple-mac-pro-wwdc-2026 | 200 | Apple Mac Pro at WWDC 2026 settled No - Baycast | html hits none | visible hits none
/questions/5745e845-94e9-4802-bbeb-850c982e1276 | 200 | Will the 2026 FIFA World Cup opening match have at least three total goals? - Baycast | html hits none | visible hits none
```

The Apple settlement note is public at `/settlements/apple-mac-pro-wwdc-2026` and returned 200. The open detail route checked was the FIFA opening match question at `/questions/5745e845-94e9-4802-bbeb-850c982e1276`.

No route exposed the blocked BCP fields, raw BCP JSON, exact forecast counts, consensus probability copy, `forecastCount`, or `fcCount` in HTML or visible body text.

## Question metadata only

The Supabase read selected only `id,title,status,closes_at` from `questions`. It returned:

```json
{
  "checked_at": "2026-06-18T19:02:58.563Z",
  "total_questions": 44,
  "counts": {
    "resolved": 2,
    "open": 42
  },
  "open_past_close_count": 0,
  "open_past_close": [],
  "next_close": "2026-06-30T23:59:59+00:00"
}
```

So no open question is past close at the 19h gate.

Resolved questions from question metadata:

```text
13aa9f2f-3226-4213-a04f-0cc2b87ad248 | resolved | 2026-06-13T00:00:00+00:00 | Will Apple announce a new Mac Pro at WWDC 2026?
9345891c-192a-4915-acad-8bed7c554333 | resolved | 2026-06-15T00:00:00+00:00 | Will the 2026 Atlantic hurricane season have a named storm before June 15?
```

## Next settlement candidates

The next close date among open questions is Jun 30. The candidates at that close are:

```text
9df06e86-a3f4-4550-8381-c6be33ea48a7 | open | 2026-06-30T23:59:59+00:00 | Will the 2026 Cannes Palme d'Or go to a film from a female director?
3682dcd2-3680-4a58-bf06-4762f26b4541 | open | 2026-06-30T23:59:59+00:00 | Will Ethereum close above $5,000 on Coinbase before July 1, 2026?
54f7e8b0-0dd6-4052-a5f3-2752c133083c | open | 2026-06-30T23:59:59+00:00 | Will the S&P 500 close above 7,000 on any trading day before July 1, 2026?
9beb8cd0-474d-4ab4-b52c-e2c83820350b | open | 2026-06-30T23:59:59+00:00 | Will the ECB cut its deposit facility rate at its June 2026 monetary policy meeting?
d3338e47-11ec-4568-942e-42bb19be0f5e | open | 2026-06-30T23:59:59+00:00 | Will OpenAI release a new public video generation model before July 1, 2026?
cff593cd-e4f7-424f-b468-c8412edc3c6c | open | 2026-06-30T23:59:59+00:00 | Will US core CPI for May 2026 be 0.3 percent month over month or higher?
5745e845-94e9-4802-bbeb-850c982e1276 | open | 2026-06-30T23:59:59+00:00 | Will the 2026 FIFA World Cup opening match have at least three total goals?
```

The existing next-settlement watcher also passed on the named watch items:

```text
next settlement watch: PASS
PASS FIFA opening match at least three goals: ok
  5745e845-94e9-4802-bbeb-850c982e1276 | open | 2026-06-30T23:59:59+00:00 | Will the 2026 FIFA World Cup opening match have at least three total goals?
PASS OpenAI public video generation model before July 1 2026: ok
  d3338e47-11ec-4568-942e-42bb19be0f5e | open | 2026-06-30T23:59:59+00:00 | Will OpenAI release a new public video generation model before July 1, 2026?
PASS Microsoft first-party Xbox handheld before Aug 1 2026: ok
  5cc9fe74-5306-49d9-bec3-251ad276a779 | open | 2026-07-31T23:59:59+00:00 | Will Microsoft announce a new first-party Xbox handheld before August 1, 2026?
```

## Verdict

GO for the 19h live BCP gate.

GO for next settlement readiness. The public surfaces checked clean. Supabase has 44 questions, with 42 open and 2 resolved. No open question is past close. The next settlement batch is Jun 30, led by the seven open Jun 30 candidates listed above.

No-forecast-read statement: this run did not read forecast rows or open-question forecast values. Settlement timing and candidate checks came from `questions` metadata only.
