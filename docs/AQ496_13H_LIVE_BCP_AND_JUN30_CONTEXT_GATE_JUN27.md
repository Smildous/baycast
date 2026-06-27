# AQ496 13h UTC live BCP and Jun 30 context gate, Jun 27

Checked at 2026-06-27 13:03 UTC against `https://baycast-p.vercel.app`.

Live surface checked with browser and HTTP spot checks: `/`, `/questions`, `/questions?sort=closing-soon`, `/questions?status=resolved`, `/leaderboard`, `/activity`.

The open question surfaces stayed blind. The home page and question lists showed category, time remaining, title, and the blind-first prompt. I did not see consensus, aggregate probability, forecaster count, forecast count, raw forecast data, `settled_by`, or `evidence_doc` on any public open-question card or list view. The only `consensus` text found on `/` was explanatory copy: users answer before seeing the crowd so they do not copy consensus. It was not an aggregate or question-specific signal.

`/questions?sort=closing-soon` showed the near-term open set without participation hints. The two Jun 30 candidates were present there and remained source-watch only:

- FIFA opening match: `Will the 2026 FIFA World Cup opening match have at least three total goals?`
- OpenAI video model: `Will OpenAI release a new public video generation model before July 1, 2026?`

I did not read forecasts and did not query `forecasts`. The Jun 30 check was limited to public question context and source-watch posture.

`/questions?status=resolved` correctly kept resolved items separate from open BCP concerns, but the page header said `Questions(42 open)` while showing resolved questions. That is a real UX bug. I fixed the header count label so non-open filters report their own visible status count, for example `2 resolved`, while open closing-soon still reports `7 closing soon`.

`/leaderboard` exposed user scoring and prediction totals, not open-question aggregates. `/activity` showed a resolved Apple forecast item, not an open-question consensus leak. No live BCP leak was found on the audited open surfaces.
