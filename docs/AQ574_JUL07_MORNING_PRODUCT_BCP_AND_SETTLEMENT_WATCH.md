# AQ-574 Jul 7 morning Product / Questions gate

I synced `main` from `origin/main` first, then checked the public product surface on `https://baycast-p.vercel.app`. This is only a Product / Questions gate. I did not insert questions and I did not open or query the `forecasts` table.

The live route check passed. `/`, `/questions`, `/questions?status=resolved`, `/leaderboard`, `/activity`, and `/questions/5cc9fe74-5306-49d9-bec3-251ad276a779` all returned HTTP 200 with `text/html; charset=utf-8`. The page headers matched the expected areas: home shows `How well can you predict the future?`, `/questions` shows `Questions(35 open)`, `/questions?status=resolved` shows `Questions(9 resolved)`, `/leaderboard` shows `Leaderboard`, and `/activity` shows `Activity Feed`. The Xbox handheld detail page is live at `/questions/5cc9fe74-5306-49d9-bec3-251ad276a779` and shows `Will Microsoft announce a new first-party Xbox handheld before August 1, 2026?`.

`npm run verify:public-bcp` passed from `/root/baycast-product`. It checked `/`, `/questions`, `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`, `/leaderboard`, and `/activity`, then reported `Public BCP surface verification passed.` The verifier did not need Supabase credentials, so I did not use the `/root/baycast` fallback. The product clone has no `.env.local`, but that did not affect this verifier.

The BCP leak check stayed clean for the guarded terms used by the public verifier: `aggregate_probability`, `forecasters_count`, `forecastCount`, `fcCount`, exact forecaster-count copy, and open-question `community consensus` copy. I also checked the Microsoft Xbox handheld detail route for the same field-name leaks, and it did not expose `aggregate_probability`, `forecasters_count`, `forecastCount`, or `fcCount`. Generic words such as `probability` can appear in normal product copy, but the guarded consensus fields were not exposed.

The next settlement watch remains `Will Microsoft announce a new first-party Xbox handheld before August 1, 2026?`, status open, closing `2026-07-31T23:59:59+00:00`. That came from the public `/questions` production payload for the discovered question, not from the `forecasts` table.
