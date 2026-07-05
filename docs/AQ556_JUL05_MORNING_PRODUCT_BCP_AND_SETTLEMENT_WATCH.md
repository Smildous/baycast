# AQ-556 Jul 5 morning Product / Questions gate

Production public BCP is healthy. I ran `npm run verify:public-bcp` against `https://baycast-p.vercel.app`, and the public surfaces passed for `/`, `/questions`, a public question detail page, `/leaderboard`, and `/activity`. The site is still presenting Baycast as prediction polling, not gambling, and the public question surfaces stay inside the Blind Consensus Protocol guardrail by not exposing crowd probabilities before resolution.

Supabase environment variables were not present in the local shell, so I did not use a service role key. I used the production public Supabase config already shipped to the browser and made safe read-only count checks through the public REST API. The counts are flat versus the pre-run numbers: 6 profiles, 44 questions, and 35 open questions. The `/questions` page also shows `35 open`, which matches the read-only count.

I did not read the `forecasts` table. No open forecast rows, forecast payloads, or live consensus data were queried for this gate.

The next settlement watch remains the Microsoft Xbox handheld question, closing 2026-07-31. That is the next product watch item to keep visible, with no settlement action needed this morning.

Decision: do not add new questions now. Metrics are flat, production BCP is passing, and 35 open questions is enough supply for the current product state. Adding more questions today would create noise without a clear product need.
