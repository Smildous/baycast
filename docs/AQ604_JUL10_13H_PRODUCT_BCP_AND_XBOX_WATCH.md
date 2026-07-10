# AQ-604 Jul 10 13h product BCP and Xbox watch

Timestamp: 2026-07-10T13:02:58Z

Production surface checked: `https://baycast-p.vercel.app`

I did not read `forecasts`. The Xbox check used the public production bundle to find the anon Supabase config, then read only `questions` with `select=id,title,status,closes_at`.

## Commands and results

```bash
cd /root/baycast-product
git fetch origin && git pull --ff-only origin main
```

Result: already up to date.

```bash
npm run verify:public-bcp
```

Result: PASS.

```text
Verifying public BCP surfaces at https://baycast-p.vercel.app
ok /
ok /questions
ok /questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248
ok /leaderboard
ok /activity
Public BCP surface verification passed.
```

```bash
npm run verify:next-settlement-watch
```

Result: environment-limited fail before data access because this checkout has no Supabase env.

```text
next settlement watch: FAIL
Supabase env unavailable: Missing SUPABASE_URL/NEXT_PUBLIC_SUPABASE_URL or SUPABASE_ANON_KEY/NEXT_PUBLIC_SUPABASE_ANON_KEY
```

The script itself is questions-only: `scripts/verify-next-settlement-watch.mjs` says it reads `questions` only, never `forecasts`, and its query is `.from('questions').select('id,title,status,closes_at')`.

## Public route check

I checked these production routes directly:

| Route | HTTP | Leak markers found | Exact forecaster count copy | Useful public copy seen |
| --- | ---: | --- | --- | --- |
| `/` | 200 | none | no | `Lock your call before the crowd can shape it` |
| `/questions` | 200 | none | no | `Lock your call before the crowd can shape it` |
| `/questions?status=resolved` | 200 | none | no | `Resolved. Scores now count against the final outcome` |
| `/questions?sort=closing-soon` | 200 | none | no | none needed |
| `/questions/5cc9fe74-5306-49d9-bec3-251ad276a779` | 200 | none | no | Xbox detail page loaded, close date visible |

Leak markers checked on every route above: `aggregate_probability`, `forecasters_count`, `settled_by`, `evidence_doc`, `raw JSON`, `raw json`, `raw resolution JSON`, `raw resolution json`, `forecastCount`, `fcCount`, plus exact copy like `12 forecasters`.

Route check output:

```json
{"route":"/","status":200,"contentType":"text/html; charset=utf-8","title":"Baycast - Predict Real Events","foundMarkers":[],"exactForecaster":false}
{"route":"/questions","status":200,"contentType":"text/html; charset=utf-8","title":"Browse Prediction Questions — Baycast","foundMarkers":[],"exactForecaster":false}
{"route":"/questions?status=resolved","status":200,"contentType":"text/html; charset=utf-8","title":"Browse Prediction Questions — Baycast","foundMarkers":[],"exactForecaster":false}
{"route":"/questions?sort=closing-soon","status":200,"contentType":"text/html; charset=utf-8","title":"Browse Prediction Questions — Baycast","foundMarkers":[],"exactForecaster":false}
{"route":"/questions/5cc9fe74-5306-49d9-bec3-251ad276a779","status":200,"contentType":"text/html; charset=utf-8","title":"Will Microsoft announce a new first-party Xbox handheld before August 1, 2026? - Baycast","foundMarkers":[],"exactForecaster":false}
```

## Xbox handheld watch

Safe questions-only read:

```json
{
  "supabaseHost": "cyrkqlxoclwlnsnbynml.supabase.co",
  "status": 200,
  "statusText": "OK",
  "select": "questions(id,title,status,closes_at)",
  "rows": [
    {
      "id": "5cc9fe74-5306-49d9-bec3-251ad276a779",
      "title": "Will Microsoft announce a new first-party Xbox handheld before August 1, 2026?",
      "status": "open",
      "closes_at": "2026-07-31T23:59:59+00:00"
    }
  ]
}
```

Verdict for Xbox: still open. It closes on `2026-07-31T23:59:59+00:00`. No settlement action is due.

## Verdict

Public BCP passes for the checked production surfaces. I found no public leak of aggregate probability, participation counts, settlement internals, evidence document fields, or raw resolution JSON. The Microsoft Xbox handheld question remains open with the expected July 31 close time.
