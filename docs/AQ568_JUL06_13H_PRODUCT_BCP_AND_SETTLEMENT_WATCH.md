# AQ-568 Jul 6 13h Product / Questions gate

Production BCP is clean at this check. I fast-forwarded `main` from `origin/main`; it was already current. I checked the public product surface at `https://baycast-p.vercel.app` for `/`, `/questions`, `/questions?status=resolved`, `/leaderboard`, `/activity`, and the Microsoft Xbox handheld detail page at `/questions/5cc9fe74-5306-49d9-bec3-251ad276a779`.

`npm run verify:public-bcp` is present and passed. It returned HTTP 200 coverage for `/`, `/questions`, a public question detail route, `/leaderboard`, and `/activity`, then reported `Public BCP surface verification passed.`

I also ran a read-only HTML check against the required routes and the Xbox handheld detail page. Every route returned HTTP 200 with `text/html; charset=utf-8`. The scan found no `aggregate_probability`, `forecasters_count`, `settled_by`, or `evidence_doc`. It found no exact public forecaster count copy and no raw JSON response on those public URLs.

Browser checks matched the script results. `/questions` shows the normal public list with open-question cards and the blind copy. The Microsoft Xbox handheld question is identifiable from the public list. Its detail page is live, still open to forecasting, and shows `Jul 31, 2026` as the close date with `Community signal locked`. It does not expose consensus, forecast payloads, settlement internals, or participation totals.

I tried the safest settlement-watch repo script, `npm run verify:next-settlement-watch`. It reads questions only and does not query forecasts, but it could not run in this shell because Supabase environment variables are absent: `Missing SUPABASE_URL/NEXT_PUBLIC_SUPABASE_URL or SUPABASE_ANON_KEY/NEXT_PUBLIC_SUPABASE_ANON_KEY`. I did not use an admin query and I did not read the `forecasts` table.

Decision: no product change from this gate. Keep BCP as-is. The next named settlement watch remains `Will Microsoft announce a new first-party Xbox handheld before August 1, 2026?`, closing 2026-07-31, because the public route confirms the question and no live public check contradicted that watch.
