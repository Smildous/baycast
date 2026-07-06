# AQ-565 Jul 6 morning Product / Questions gate

Production BCP is clean this morning. I checked `https://baycast-p.vercel.app` at `/`, `/questions`, `/questions?status=resolved`, `/leaderboard`, and `/activity`. Each route returned HTTP 200 and stayed inside the public product surface.

I also checked the Microsoft Xbox handheld question because it is discoverable on `/questions`: `Will Microsoft announce a new first-party Xbox handheld before August 1, 2026?` at `/questions/5cc9fe74-5306-49d9-bec3-251ad276a779`. The detail route returned HTTP 200. It remains open and closes 2026-07-31.

I scanned the public HTML for fields and labels that should not leak before resolution. I did not find `aggregate_probability`, `forecasters_count`, `settled_by`, `evidence_doc`, raw JSON labels, or exact public participation counts on `/`, `/questions`, `/questions?status=resolved`, `/leaderboard`, `/activity`, or the Xbox handheld detail route. The pages show normal public question metadata such as title, category, status, and close date. They do not expose live consensus, forecast payloads, settlement internals, or participation totals.

`npm run verify:public-bcp` was available because dependencies are present. It passed against production for `/`, `/questions`, a public question detail route, `/leaderboard`, and `/activity`.

Supabase environment variables are missing in this shell. I did not query Supabase with an admin key, and I did not read the `forecasts` table. For this gate I used the canonical pre-run metrics: 6 users, 44 questions, 35 open questions, and 12 forecasts.

No product change is needed from this gate. Keep the current stance: no AI insert, no outbound, and no new questions unless the gates change. The next known settlement watch is the Microsoft Xbox handheld question closing 2026-07-31.
