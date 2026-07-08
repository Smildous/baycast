# AQ-583 Jul 8 morning product BCP and settlement watch

Run time: 2026-07-08T07:03:36Z
Repo: `/root/baycast-product`
Target: `https://baycast-p.vercel.app`
Forecasts read: no
Live writes: no

## Result

PASS for the public Product and Questions gate.

The public prototype is reachable on the checked routes, the public BCP guardrail is clean, and the Microsoft Xbox handheld question is still an open public question with close date `2026-07-31T23:59:59+00:00`.

No table named `forecasts` was read. The only Supabase verifier attempted for settlement watch is documented in the repo as reading `questions` only, and it did not run here because `/root/baycast-product` has no Supabase env.

## Commands run

```bash
git fetch origin main
git merge --ff-only origin/main
npm run verify:public-bcp
npm run verify:next-settlement-watch
node public-route-scan via fetch for /, /questions, /questions?status=resolved, /leaderboard, /activity, /questions/5cc9fe74-5306-49d9-bec3-251ad276a779
browser_navigate https://baycast-p.vercel.app/questions/5cc9fe74-5306-49d9-bec3-251ad276a779
```

## Repo sync

`/root/baycast-product` was present already. It was fast-forward checked against `origin/main` before the gate work.

Result:

```text
From https://github.com/Smildous/baycast
 * branch            main       -> FETCH_HEAD
Already up to date.
## main...origin/main
```

## Repo verifier evidence

`npm run verify:public-bcp` passed.

```text
Verifying public BCP surfaces at https://baycast-p.vercel.app
ok /
ok /questions
ok /questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248
ok /leaderboard
ok /activity
Public BCP surface verification passed.
```

`npm run verify:next-settlement-watch` was attempted and failed on missing local env, not on product state.

```text
next settlement watch: FAIL
Supabase env unavailable: Missing SUPABASE_URL/NEXT_PUBLIC_SUPABASE_URL or SUPABASE_ANON_KEY/NEXT_PUBLIC_SUPABASE_ANON_KEY
```

I checked the script before running it. Header and query scope:

```text
Reads questions only. It never queries forecasts or writes to Supabase.
.select('id,title,status,closes_at')
```

## Public HTTP route evidence

Checked routes:

| Route | HTTP | BCP leak tokens | Consensus percentage | Exact forecaster count |
| --- | ---: | --- | --- | --- |
| `/` | 200 | none | none | none |
| `/questions` | 200 | none | none | none |
| `/questions?status=resolved` | 200 | none | none | none |
| `/leaderboard` | 200 | none | none | none |
| `/activity` | 200 | none | none | none |
| `/questions/5cc9fe74-5306-49d9-bec3-251ad276a779` | 200 | none | none | none |

Tokens scanned in public HTML:

```text
aggregate_probability
forecasters_count
forecastCount
fcCount
settled_by
evidence_doc
raw json
```

Additional scans looked for consensus percentages and exact forecaster count copy such as `NN% consensus`, `NN% community signal`, `N forecasters`, `N forecasts submitted`, `N predictions`, and `N participants`. None appeared on the checked public routes.

`/leaderboard` contains the generic word `forecasters`, which is acceptable leaderboard copy. It did not expose exact forecaster counts for open questions.

`/` contains generic consensus language, but no open-question consensus percentage or aggregate probability. This is acceptable product copy and not a BCP leak.

Resolved surface check: `/questions?status=resolved` returned 200 and did not expose `settled_by`, `evidence_doc`, the watched forecast count fields, or raw internal JSON markers in the scanned public HTML.

## Xbox handheld question

Discovered from `/questions`:

```text
id: 5cc9fe74-5306-49d9-bec3-251ad276a779
title: Will Microsoft announce a new first-party Xbox handheld before August 1, 2026?
category: tech
closes_at: 2026-07-31T23:59:59+00:00
status: open
href: /questions/5cc9fe74-5306-49d9-bec3-251ad276a779
```

Browser check on the detail route showed:

```text
Technology
24 d left
Will Microsoft announce a new first-party Xbox handheld before August 1, 2026?
Community signal locked
Jul 31, 2026 Closes
Resolution source: Xbox Wire and Microsoft official announcements: https://news.xbox.com/ and https://blogs.microsoft.com/
```

The detail page does not show aggregate probability, consensus percentage, exact forecaster count, or internal settlement fields. The public product state keeps the question open and closing on `2026-07-31`.

I also tried public search against the official source domains. Direct searches for Xbox Wire and Microsoft blogs returned 403 from their search pages in this environment, so I did not claim a full external evidence sweep. The checked Baycast public state and available public route evidence show no proof that would override the open status.

## Decision

Keep the gate green.

No public open-question leak found for:

```text
aggregate_probability
forecasters_count
forecastCount
fcCount
consensus percentages
exact forecaster counts
settled_by
evidence_doc
raw JSON on resolved surfaces
```

Xbox handheld remains on watch as open, closing `2026-07-31T23:59:59+00:00`, unless later official public evidence changes the settlement state.
