# AQ-571 Jul 6 19h Product / Questions gate

I synced `main` from `origin/main` first, then checked the live product surface at `https://baycast-p.vercel.app` for the 19h run. The route check was done with a read-only HTML fetch using the production app. `/`, `/questions`, `/questions?status=resolved`, `/leaderboard`, `/activity`, and the Microsoft Xbox handheld detail route all returned HTTP 200 with `text/html; charset=utf-8`.

The visible page titles and headers matched the expected product areas: home shows `How well can you predict the future?`, `/questions` shows `Questions(35 open)`, `/questions?status=resolved` shows `Questions(9 resolved)`, `/leaderboard` shows `Leaderboard`, and `/activity` shows `Activity Feed`. The Microsoft Xbox handheld route was discoverable from the public questions page as `/questions/5cc9fe74-5306-49d9-bec3-251ad276a779`. That detail page returned HTTP 200 and the title `Will Microsoft announce a new first-party Xbox handheld before August 1, 2026? - Baycast`.

`npm run verify:public-bcp` is available and passed. It verified `/`, `/questions`, `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`, `/leaderboard`, and `/activity`, then reported `Public BCP surface verification passed.` I also checked the discovered Xbox handheld detail page HTML for the usual leak markers. It did not expose `aggregate_probability`, `forecasters_count`, `forecastCount`, or `fcCount`.

`npm run verify:next-settlement-watch` is available, but it could not complete in this shell because Supabase environment variables were not present. The script failed before any questions lookup with `Missing SUPABASE_URL/NEXT_PUBLIC_SUPABASE_URL or SUPABASE_ANON_KEY/NEXT_PUBLIC_SUPABASE_ANON_KEY`. I used the public production routes as the fallback and did not make an admin database query.

The next settlement watch stays on `Will Microsoft announce a new first-party Xbox handheld before August 1, 2026?`, status open, closing 2026-07-31T23:59:59+00:00. That status and close date were visible in the public `/questions` production payload for the discovered question.

The `forecasts` table was not read. This gate only used public production HTML plus the two npm verifiers described above. No existing docs were edited.
