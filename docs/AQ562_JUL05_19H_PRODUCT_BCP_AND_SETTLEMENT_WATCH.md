# AQ562 Jul 5 19h product gate

Gate run at 2026-07-05 19h UTC for the public BCP and settlement watch path.

Verdict: pass for the public prototype surfaces checked. I did not read the forecasts table.

Repo sync and verification:

`git fetch origin && git pull --ff-only origin main` completed cleanly, already up to date.

`npm run verify:public-bcp` ran because dependencies were present. It passed against `https://baycast-p.vercel.app` and reported ok for `/`, `/questions`, `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`, `/leaderboard`, and `/activity`.

Manual public route checks:

I checked `https://baycast-p.vercel.app/`, `/questions`, `/questions?status=resolved`, `/leaderboard`, `/activity`, and the Microsoft Xbox handheld route found from the public questions page: `/questions/5cc9fe74-5306-49d9-bec3-251ad276a779`.

The checked pages returned HTTP 200. I searched the visible HTML and serialized Next payloads for `aggregate_probability`, `forecasters_count`, `settled_by`, and `evidence_doc`. None were present on the checked routes. I also searched for exact open-question forecast count phrases such as `N forecasts`, `N forecasters`, `forecasts: N`, and `forecasters: N`. None were present on the checked open surfaces.

The Microsoft Xbox handheld page loaded with the expected title, `Will Microsoft announce a new first-party Xbox handheld before August 1, 2026?`. It did not expose consensus, aggregate probability, participation metadata, settlement actor metadata, evidence document fields, raw JSON blocks, or exact forecast counts in the checked response.

Settlement watch:

No local runtime env with Supabase access was available in `/root/baycast-product`, only `.env.example` with public key names. I therefore did not query the questions table. Fallback to the canonical pre-run status: Microsoft Xbox handheld closes 2026-07-31.

Notes:

Public BCP still looks clean on the checked routes. The pages do serialize normal public question fields such as id, title, category, close time, and status, but not the blocked BCP fields or exact participation counts checked above.
