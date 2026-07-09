# AQ-595 Jul 9 13h product BCP and Xbox watch

## Scope

Production product gate for `https://baycast-p.vercel.app` at 13h UTC.

I checked the public Baycast routes for Blind Consensus Protocol leaks and checked the Microsoft Xbox handheld question as the next settlement watch. I did not read the `forecasts` table. The only database lookup used the public Supabase config and selected `id,title,status,closes_at` from `questions`.

No live issue was found, so this commit adds only this AQ-595 doc.

## Commands and checks run

```text
cd /root/baycast-product
git fetch origin && git pull --ff-only origin main
npm run verify:public-bcp
npm run verify:next-settlement-watch
node production route and leak-marker check using fetch
node production public Supabase questions-only check for the Xbox question
```

Results:

- `git fetch origin && git pull --ff-only origin main`: already up to date.
- `npm run verify:public-bcp`: PASS. It checked `/`, `/questions`, `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`, `/leaderboard`, and `/activity`, then reported `Public BCP surface verification passed.`
- `npm run verify:next-settlement-watch`: environment-limited FAIL before any live data read. It stopped with `Supabase env unavailable: Missing SUPABASE_URL/NEXT_PUBLIC_SUPABASE_URL or SUPABASE_ANON_KEY/NEXT_PUBLIC_SUPABASE_ANON_KEY`.
- Production route and leak-marker check: PASS for all requested public routes and the Xbox detail route.
- Production questions-only check: PASS for the Xbox watch row. Query selected only `id,title,status,closes_at` from `questions`.

## Production public routes

The script fetched each route as HTML from production with a read-only request.

| Route | HTTP | Title | Result |
| --- | ---: | --- | --- |
| `/` | 200 | `Baycast - Predict Real Events` | PASS |
| `/questions` | 200 | `Browse Prediction Questions - Baycast` | PASS |
| `/questions?status=resolved` | 200 | `Browse Prediction Questions - Baycast` | PASS |
| `/leaderboard` | 200 | `Forecaster Leaderboard - Baycast` | PASS |
| `/activity` | 200 | `Recent Forecasting Activity - Baycast` | PASS |
| `/questions/5cc9fe74-5306-49d9-bec3-251ad276a779` | 200 | `Will Microsoft announce a new first-party Xbox handheld before August 1, 2026? - Baycast` | PASS |

Public browser check on `/` showed the Xbox question in the live questions section with `Lock your call before the crowd can shape it`.

## BCP leak check

Leak markers checked on `/`, `/questions`, `/questions?status=resolved`, `/leaderboard`, `/activity`, and the Xbox detail route:

```text
aggregate_probability
forecasters_count
settled_by
evidence_doc
raw JSON field payloads for those names
```

Result: no matches found. The pages returned `text/html; charset=utf-8`; the scan found no raw JSON payload exposing those field names. The public copy stayed in blind-first mode on open question surfaces.

## Xbox handheld watch

Question route:

```text
/questions/5cc9fe74-5306-49d9-bec3-251ad276a779
```

Question title:

```text
Will Microsoft announce a new first-party Xbox handheld before August 1, 2026?
```

Questions-only production check:

```text
Supabase host: cyrkqlxoclwlnsnbynml.supabase.co
Table: questions
Select: id,title,status,closes_at
HTTP: 200
Rows: 1
id: 5cc9fe74-5306-49d9-bec3-251ad276a779
status: open
closes_at: 2026-07-31T23:59:59+00:00
```

This confirms the Xbox handheld question remains open and closes on 2026-07-31. No settlement action is due in this run.

## Decision

Production public BCP is clean for the checked routes. The next settlement watch remains the Microsoft Xbox handheld question, status `open`, closing `2026-07-31T23:59:59+00:00`.

No application patch was needed. No live data was written. No AQ-592 doc was modified. Forecasts table read: no.
