# AQ-592 Jul 9 morning product BCP and Xbox watch

## Scope

Morning product gate for the production public Baycast surface at `https://baycast-p.vercel.app`.

This run checked that public BCP surfaces do not leak open-question consensus or counts, then checked the Microsoft Xbox handheld question as the next settlement watch. I worked in `/root/baycast-product` and synced `main` from `origin/main` before the checks.

forecasts table read: no

## Commands and checks run

```text
git status --short
git fetch origin main
git checkout main
git pull --rebase origin main
npm run verify:public-bcp
npm run verify:next-settlement-watch
node production route and BCP string check using fetch
node production public Supabase questions-only check for the Xbox question
```

Results:

- `git pull --rebase origin main`: already up to date.
- `npm run verify:public-bcp`: PASS.
- `npm run verify:next-settlement-watch`: did not complete because local Supabase env is absent in this checkout. It exited with `Missing SUPABASE_URL/NEXT_PUBLIC_SUPABASE_URL or SUPABASE_ANON_KEY/NEXT_PUBLIC_SUPABASE_ANON_KEY` before reading data.
- Production route and BCP string check: PASS for the checked routes.
- Production public Supabase questions-only check: PASS for the Xbox watch row. Query selected only `id,title,status,closes_at` from `questions`.

## Production routes checked

All checked production routes returned HTTP 200 with `text/html; charset=utf-8`.

| Route | Page title | Result |
| --- | --- | --- |
| `/` | `Baycast - Predict Real Events` | 200 |
| `/questions` | `Browse Prediction Questions - Baycast` | 200 |
| `/questions?status=resolved` | `Browse Prediction Questions - Baycast` | 200 |
| `/leaderboard` | `Forecaster Leaderboard - Baycast` | 200 |
| `/activity` | `Recent Forecasting Activity - Baycast` | 200 |
| `/questions/5cc9fe74-5306-49d9-bec3-251ad276a779` | `Will Microsoft announce a new first-party Xbox handheld before August 1, 2026? - Baycast` | 200 |

The `/questions` page showed `Questions(35 open)`. The Xbox detail route was discoverable from the public questions page at `/questions/5cc9fe74-5306-49d9-bec3-251ad276a779`.

## BCP DOM and string checks

`npm run verify:public-bcp` checked these production routes:

```text
/
/questions
/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248
/leaderboard
/activity
```

It reported:

```text
Public BCP surface verification passed.
```

The separate production fetch check covered `/`, `/questions`, `/questions?status=resolved`, `/leaderboard`, `/activity`, and the Xbox detail route. It found no matches for these leak markers:

```text
aggregate_probability
forecasters_count
forecastCount
fcCount
exact forecaster count copy
```

Observed public copy stayed blind on open surfaces. `/questions` showed `Lock your call before the crowd can shape it`. The Xbox detail route showed the question, resolution source, and forecast form without consensus fields or public count strings.

## Xbox question status and closes_at

Question:

```text
Will Microsoft announce a new first-party Xbox handheld before August 1, 2026?
```

Production public questions-only check:

```text
id: 5cc9fe74-5306-49d9-bec3-251ad276a779
status: open
closes_at: 2026-07-31T23:59:59+00:00
```

The production detail metadata also showed `Open` and the same question. The route title matched the question.

## Decision

Public product is up for the checked routes. Public BCP checks are clean for the checked DOM and HTML strings. The next settlement watch remains the Microsoft Xbox handheld question, status `open`, closing `2026-07-31T23:59:59+00:00`.

No live writes were performed. No questions were inserted. No existing AQ-589, AQ-590, or AQ-591 docs were modified. Forecasts table read: no.
