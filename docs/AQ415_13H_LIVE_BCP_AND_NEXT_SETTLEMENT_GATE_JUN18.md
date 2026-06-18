# AQ415 13h live BCP and next settlement gate, Jun 18

Checked at 2026-06-18 13:02 UTC against `https://baycast-p.vercel.app` from `/root/baycast-product`.

I synced `main` with `origin/main` first. I used public HTML fetches, the existing public BCP verifier, and Supabase question metadata reads through existing helpers. I did not read forecast rows. I did not read forecasts for any open question. I did not write to Supabase.

## Commands run

```bash
git status --short
git fetch origin main
git checkout main
git pull --ff-only origin main
node scripts/verify-public-bcp-surfaces.mjs
set -a; . /root/baycast/.env.local; set +a; node scripts/supabase-admin.mjs status
set -a; . /root/baycast/.env.local; set +a; node scripts/verify-next-settlement-watch.mjs
set -a; . /root/baycast/.env.local; set +a; node scripts/supabase-admin.mjs verify-resolution-readiness --from 2026-06-01T00:00:00.000Z --until 2026-06-30T23:59:59.999Z
set -a; . /root/baycast/.env.local; set +a; node questions-only-counts-and-open-past-close-check
node public-route-html-and-visible-text-scan
```

The first Supabase attempt in `/root/baycast-product` had no local `.env.local`, so I loaded the existing canonical env from `/root/baycast/.env.local` for read-only checks. Secrets were not printed.

## Public BCP routes checked

The existing verifier passed:

```text
Verifying public BCP surfaces at https://baycast-p.vercel.app
ok /
ok /questions
ok /questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248
ok /leaderboard
ok /activity
Public BCP surface verification passed.
```

I then scanned the required routes and the resolved detail pages discoverable from `/questions?status=resolved`:

```text
/ | 200 | Baycast - Predict Real Events | html hits none | visible hits none
/questions | 200 | Browse Prediction Questions - Baycast | BCP hits none | visible hits none
/questions?status=resolved | 200 | Browse Prediction Questions - Baycast | BCP hits none | visible hits none
/leaderboard | 200 | Forecaster Leaderboard - Baycast | html hits none | visible hits none
/activity | 200 | Recent Forecasting Activity - Baycast | html hits none | visible hits none
/settlements/apple-mac-pro-wwdc-2026 | 200 | Apple Mac Pro at WWDC 2026 settled No - Baycast | html hits none | visible hits none
/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248 | 200 | Will Apple announce a new Mac Pro at WWDC 2026? - Baycast | html hits none | visible hits none
/questions/9345891c-192a-4915-acad-8bed7c554333 | 200 | Will the 2026 Atlantic hurricane season have a named storm before June 15? - Baycast | html hits none | visible hits none
```

The scan looked for these leak terms in raw HTML and in script-stripped visible text:

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

Result: no public BCP leak found. The `/questions` and `/questions?status=resolved` HTML contain normal Next.js RSC and metadata script fragments, but I found no BCP raw data JSON, no forecast rows, no open-question aggregate fields, and no listed forbidden field names or consensus/count copy in visible text or HTML.

Resolved pages identified without reading forecasts:

```text
/questions?status=resolved links to /questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248
/questions?status=resolved links to /questions/9345891c-192a-4915-acad-8bed7c554333
/activity links to /questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248
/settlements/apple-mac-pro-wwdc-2026 links to /questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248
```

## Supabase question metadata

`node scripts/supabase-admin.mjs status` returned:

```json
{
  "ok": true,
  "mode": "service_role",
  "counts": [
    { "table": "questions", "count": 44 },
    { "table": "questions_open", "count": 42 },
    { "table": "forecasts", "count": 12 },
    { "table": "profiles", "count": 6 }
  ]
}
```

That command counts the `forecasts` table with a head count only. I did not select or read forecast records.

The questions-only read selected only `id,title,status,closes_at` from `questions`. It returned:

```json
{
  "checked_at": "2026-06-18T13:00:00.000Z",
  "total_questions": 44,
  "counts": {
    "resolved": 2,
    "open": 42
  },
  "open_past_close_count": 0,
  "open_past_close": []
}
```

So there is no open question past close at the 13h gate.

## Next settlement candidates

`node scripts/verify-next-settlement-watch.mjs` passed:

```text
next settlement watch: PASS
PASS FIFA opening match at least three goals: ok
  5745e845-94e9-4802-bbeb-850c982e1276 | open | 2026-06-30T23:59:59+00:00 | Will the 2026 FIFA World Cup opening match have at least three total goals?
PASS OpenAI public video generation model before July 1 2026: ok
  d3338e47-11ec-4568-942e-42bb19be0f5e | open | 2026-06-30T23:59:59+00:00 | Will OpenAI release a new public video generation model before July 1, 2026?
PASS Microsoft first-party Xbox handheld before Aug 1 2026: ok
  5cc9fe74-5306-49d9-bec3-251ad276a779 | open | 2026-07-31T23:59:59+00:00 | Will Microsoft announce a new first-party Xbox handheld before August 1, 2026?
```

The June resolution hygiene command also passed. It found 7 open questions closing in the June window, all ready, with no missing fields:

```text
open_questions: 42
soon_closing_open_questions: 7
ready_soon_closing_open_questions: 7
not_ready_soon_closing_open_questions: 0
missing_by_field: {}
```

The next open candidates from question metadata are all Jun 30:

```text
9df06e86-a3f4-4550-8381-c6be33ea48a7 | open | 2026-06-30T23:59:59+00:00 | Will the 2026 Cannes Palme d'Or go to a film from a female director?
3682dcd2-3680-4a58-bf06-4762f26b4541 | open | 2026-06-30T23:59:59+00:00 | Will Ethereum close above $5,000 on Coinbase before July 1, 2026?
54f7e8b0-0dd6-4052-a5f3-2752c133083c | open | 2026-06-30T23:59:59+00:00 | Will the S&P 500 close above 7,000 on any trading day before July 1, 2026?
9beb8cd0-474d-4ab4-b52c-e2c83820350b | open | 2026-06-30T23:59:59+00:00 | Will the ECB cut its deposit facility rate at its June 2026 monetary policy meeting?
d3338e47-11ec-4568-942e-42bb19be0f5e | open | 2026-06-30T23:59:59+00:00 | Will OpenAI release a new public video generation model before July 1, 2026?
cff593cd-e4f7-424f-b468-c8412edc3c6c | open | 2026-06-30T23:59:59+00:00 | Will US core CPI for May 2026 be 0.3 percent month over month or higher?
5745e845-94e9-4802-bbeb-850c982e1276 | open | 2026-06-30T23:59:59+00:00 | Will the 2026 FIFA World Cup opening match have at least three total goals?
```

Resolved questions from question metadata:

```text
13aa9f2f-3226-4213-a04f-0cc2b87ad248 | resolved | 2026-06-13T00:00:00+00:00 | Will Apple announce a new Mac Pro at WWDC 2026?
9345891c-192a-4915-acad-8bed7c554333 | resolved | 2026-06-15T00:00:00+00:00 | Will the 2026 Atlantic hurricane season have a named storm before June 15?
```

## Verdict

Pass for the 13h live BCP gate. The checked public surfaces do not expose open-question consensus, aggregate probability, forecaster count, exact forecast count, `settled_by`, `evidence_doc`, `forecastCount`, `fcCount`, or BCP raw JSON.

Pass for the next settlement gate. Supabase has 44 questions, 42 open, 2 resolved, 12 forecast rows by count only, and 6 profiles. No open question is past close. The next settlement watch remains Jun 30, with FIFA and OpenAI explicitly confirmed by the existing helper, plus the other Jun 30 open candidates listed above.

No-forecast-read statement: this run did not select from or inspect forecast rows. It did not read forecasts for open questions. All settlement timing and candidate checks came from `questions` metadata only.
