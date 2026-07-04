# AQ-550 Jul 4 13h product gate: BCP and Xbox watch

Checked at 2026-07-04T13:02:47Z from `/root/baycast-product`, after `git fetch origin && git pull --ff-only origin main`. Base production surface: `https://baycast-p.vercel.app`.

Verdict: production is up for the public paths checked. The BCP public surface guard passed. The next settlement watch remains the Microsoft first-party Xbox handheld question, closing 2026-07-31 at 23:59:59 UTC. No settlement action is due from this gate.

Production spot-check

The home page loaded as `Baycast - Predict Real Events`. It showed the main navigation, `35` live questions, and live question cards, including `Will Microsoft announce a new first-party Xbox handheld before August 1, 2026?`.

`/questions` loaded with `Questions(35 open)`. The Microsoft Xbox handheld card was visible as Technology with `28d left` and the blind prompt `Lock your call before the crowd can shape it`.

`/questions/5cc9fe74-5306-49d9-bec3-251ad276a779` loaded as the Microsoft Xbox handheld question. The page showed the resolution rule, static context links, `Community signal locked`, `Jul 31, 2026` as the close date, and sign-up or login entry points for forecasting. It did not show a crowd probability or forecaster count.

`/leaderboard` loaded with the leaderboard table. It showed Brier score and predictions columns for resolved scoring context. `Log Score` still showed blank dash values, which matches the known AQ-373 DDL blocker.

`/activity` loaded with recent activity entries. The page did not block the public read path.

BCP leak check

`npm run verify:public-bcp` passed against production. It checked `/`, `/questions`, `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`, `/leaderboard`, and `/activity` for public BCP leaks. No `aggregate_probability`, `forecasters_count`, `forecastCount`, `fcCount`, exact forecaster-count copy, or open-question community-consensus leak was found by the verifier.

Exact command output:

```text
> baycast@0.1.0 verify:public-bcp
> node scripts/verify-public-bcp-surfaces.mjs

Verifying public BCP surfaces at https://baycast-p.vercel.app
ok /
ok /questions
ok /questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248
ok /leaderboard
ok /activity
Public BCP surface verification passed.
```

The browser fallback matched the verifier: open-question public pages exposed the blind copy and close date, not consensus or participant counts. I did not see `consensus`, `aggregate_probability`, `forecasters_count`, `settled_by`, `evidence_doc`, or raw JSON on the checked public pages.

Next settlement watch

`npm run verify:next-settlement-watch` could not complete in this clone because Supabase environment variables are not present. The script itself states it reads `questions` only and selects `id,title,status,closes_at`; it does not query `forecasts` and does not write to Supabase.

Exact command output:

```text
> baycast@0.1.0 verify:next-settlement-watch
> node scripts/verify-next-settlement-watch.mjs

next settlement watch: FAIL
Supabase env unavailable: Missing SUPABASE_URL/NEXT_PUBLIC_SUPABASE_URL or SUPABASE_ANON_KEY/NEXT_PUBLIC_SUPABASE_ANON_KEY
```

Fallback from production browser: the Microsoft question is public at `/questions/5cc9fe74-5306-49d9-bec3-251ad276a779`, is still open to forecasting, shows `28d left`, and shows `Jul 31, 2026` as the close date. The resolution rule says Yes only if Microsoft or Xbox publicly announces a Microsoft-branded handheld gaming device before 2026-08-01 00:00 UTC, with Xbox Wire and Microsoft official announcements as resolution sources. That keeps the next settlement watch on 2026-07-31T23:59:59Z.

Forecasts table statement

The `forecasts` table was not read for this gate. I used the supplied pre-run context for counts where needed, the public browser surfaces, and repo verifiers. I did not query Supabase forecasts and did not inspect forecast rows.

Open blockers carried forward

AQ-546 production `AGENT_ENDPOINT_SECRET` still has a 401 blocker. AQ-227 `blind_until` DDL remains open. AQ-373 `log_score` DDL remains open, visible on the public leaderboard as blank dash log-score values.
