# AQ-547 Jul 4 morning product settlement and BCP gate

Checked 2026-07-04 07:02 UTC from `/root/baycast-product`, after fast-forwarding `main` from `origin/main`.

Verdict: hold on new live questions. Baycast production is up, the public BCP surfaces are clean, and the next settlement action is the Microsoft Xbox handheld watch for July 31. The database context for this run says active questions are already 35 and forecasts are flat at 12, so inserting more live questions now would add supply without evidence of new demand.

Forecast-read statement: I did not read the `forecasts` table. The only forecast number used here is the pre-run context supplied to the job, `forecasts=12`. The next-settlement script was inspected before running it and its header plus query show it reads `questions` only. It could not complete because this clone has no Supabase env.

## Evidence

Production answered cleanly:

```text
HTTP 200 text/html; charset=utf-8
```

Public open-question surfaces are clean. The browser showed `Questions(35 open)` on `/questions`. The first page included the Microsoft Xbox handheld question at `28d left` and used blind copy, `Lock your call before the crowd can shape it`. No aggregate result, consensus percentage, `aggregate_probability`, or `forecasters_count` appeared in the public page evidence.

Resolved public surfaces are clean. The browser showed `Questions(9 resolved)` on `/questions?status=resolved` with normal resolved copy, `Scores now count against the final outcome`. A raw HTML scan of `/questions?status=resolved` and `/settlements/apple-mac-pro-wwdc-2026` found none of `settled_by`, `evidence_doc`, `raw json`, or raw-field leakage.

The public verifiers passed:

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
npm run verify:distribution-gate

Verifying distribution gate at https://baycast-p.vercel.app
ok /settlements/apple-mac-pro-wwdc-2026
ok /questions?status=resolved
ok /
Distribution gate verification passed.
```

The next-settlement verifier could not use Supabase from this clone:

```text
npm run verify:next-settlement-watch

next settlement watch: FAIL
Supabase env unavailable: Missing SUPABASE_URL/NEXT_PUBLIC_SUPABASE_URL or SUPABASE_ANON_KEY/NEXT_PUBLIC_SUPABASE_ANON_KEY
```

Fallback public evidence still points to the same next action. `/questions` shows:

```text
Technology 28d left Will Microsoft announce a new first-party Xbox handheld before August 1, 2026?
```

That makes the next settlement watch Microsoft Xbox handheld, with the operational watch date July 31.

Direct leak scan:

```text
https://baycast-p.vercel.app/questions -> HTTP 200, 49937 bytes, leak_terms=[]
https://baycast-p.vercel.app/questions?status=resolved -> HTTP 200, 46276 bytes, leak_terms=[]
https://baycast-p.vercel.app/settlements/apple-mac-pro-wwdc-2026 -> HTTP 200, 30551 bytes, leak_terms=[]
```

## Commands run

```text
git -C /root/baycast-product fetch origin main
git -C /root/baycast-product checkout main
git -C /root/baycast-product merge --ff-only origin/main
curl -sS -o /tmp/baycast_home.html -w '%{http_code} %{content_type}\n' https://baycast-p.vercel.app/
npm run verify:public-bcp
npm run verify:distribution-gate
npm run verify:next-settlement-watch
curl -sS -L -o /tmp/... https://baycast-p.vercel.app/questions
curl -sS -L -o /tmp/... 'https://baycast-p.vercel.app/questions?status=resolved'
curl -sS -L -o /tmp/... https://baycast-p.vercel.app/settlements/apple-mac-pro-wwdc-2026
grep -Eio 'aggregate_probability|forecasters_count|settled_by|evidence_doc|raw json|"raw"' /tmp/...
```

## Product decision

Do not insert new live questions this morning. Keep the active set at 35. Keep BCP intact: no consensus or participant-count leak before resolution, and no settlement internals on public resolved surfaces.

Next action: watch the Microsoft first-party Xbox handheld question through July 31, then settle only from public evidence and the normal settlement path.
