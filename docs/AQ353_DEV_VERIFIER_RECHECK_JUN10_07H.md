# AQ-353 Dev verifier recheck, Jun 10 07h

Repo synced with `origin/main` before running the checks. I did not query Supabase `forecasts` data.

## Commands and results

`git diff --check`

Exit status: 0

Output summary: no whitespace or patch errors were reported.

`npm run verify:public-bcp`

Exit status: 0

Output summary:

```text
Verifying public BCP surfaces at https://baycast-p.vercel.app
ok /
ok /questions
ok /questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248
ok /leaderboard
ok /activity
Public BCP surface verification passed.
```

`npm run verify:first-settlement-evidence`

Exit status: 0

Output summary:

```json
{
  "ok": true,
  "mode": "readonly",
  "table": "questions",
  "candidate_reason": "Apple Mac Pro exact match",
  "candidate": {
    "title": "Will Apple announce a new Mac Pro at WWDC 2026?",
    "status": "open",
    "closes_at": "2026-06-13T00:00:00+00:00",
    "resolution_source": "Apple WWDC and Apple Newsroom: https://developer.apple.com/wwdc26/ and https://www.apple.com/newsroom/",
    "resolution_url": null
  }
}
```

## Script evidence

`package.json` maps `verify:first-settlement-evidence` to `node scripts/first-settlement-evidence.mjs` and `verify:public-bcp` to `node scripts/verify-public-bcp-surfaces.mjs`.

`scripts/first-settlement-evidence.mjs` states in its header that it is read-only, reads questions only, never queries forecasts, and never writes to Supabase. The implementation matches that: schema probes use `client.from('questions').select(column).limit(1)`, the candidate lookup uses `client.from('questions').select(...).gte(...).lte(...).order(...)`, and the emitted report includes `mode: 'readonly'` and `table: 'questions'`. I found no `.from('forecasts')`, insert, update, upsert, delete, or RPC call in that verifier.

`scripts/verify-public-bcp-surfaces.mjs` covers the required public surfaces: `/`, `/questions`, the Apple direct question route `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`, `/leaderboard`, and `/activity`.

## Verdict

Pass. The public BCP verifier passed, the first-settlement evidence verifier stayed read-only, and its database reads are scoped to `questions`, not `forecasts`.
