# AQ393 Morning live BCP and next settlement gate, Jun 16

Checked at 2026-06-16 07:02 UTC.

Verdict: GO for continued public monitoring, WAIT for settlement.

The live public product is reachable. The next settlement pair remains FIFA and OpenAI. Both public question pages show a Jun 30, 2026 close date and are not settleable now.

No operator should resolve either question from this note. Settle only after the close window has passed, the public product no longer accepts forecasts for the question, the public evidence is complete, and the BCP check is still clean.

## Scope

Repository prep was completed first with the required fetch and fast-forward pull. Result: already up to date.

Public pages checked:

- Home, https://baycast-p.vercel.app/: HTTP 200, BCP-sensitive strings absent in HTML.
- Questions, https://baycast-p.vercel.app/questions: HTTP 200, BCP-sensitive strings absent in HTML.
- Resolved questions, https://baycast-p.vercel.app/questions?status=resolved: HTTP 200, BCP-sensitive strings absent in HTML.
- Leaderboard, https://baycast-p.vercel.app/leaderboard: HTTP 200, BCP-sensitive strings absent in HTML.
- Activity, https://baycast-p.vercel.app/activity: HTTP 200, BCP-sensitive strings absent in HTML.
- Apple settlement, https://baycast-p.vercel.app/settlements/apple-mac-pro-wwdc-2026: HTTP 200, BCP-sensitive strings absent in HTML.
- FIFA question, https://baycast-p.vercel.app/questions/5745e845-94e9-4802-bbeb-850c982e1276: HTTP 200, BCP-sensitive strings absent in HTML.
- OpenAI question, https://baycast-p.vercel.app/questions/d3338e47-11ec-4568-942e-42bb19be0f5e: HTTP 200, BCP-sensitive strings absent in HTML.

Strings checked on every page above:

- `aggregate_probability`
- `forecasters_count`
- `settled_by`
- `evidence_doc`

Browser DOM checks on the two next-settlement question pages also found those strings absent.

## Blind Consensus preservation

The public question pages still present Blind Consensus behavior. They show the locked community signal copy before a visitor forecasts. I did not read forecasts, open-question scores, consensus values, activity-derived participation, private data, Supabase rows, or admin tables.

The HTTP pass was limited to page reachability, public titles, close dates, resolution text, and absence of BCP-sensitive field names in public HTML. The browser DOM pass was limited to the two next-settlement public question pages and the same BCP-safe checks.

## Next settlement gate

### 1. FIFA opening match goals

Public Baycast URL: https://baycast-p.vercel.app/questions/5745e845-94e9-4802-bbeb-850c982e1276

Live public title: `Will the 2026 FIFA World Cup opening match have at least three total goals?`

Public status from the page: open question with forecast controls visible to signed-out users.

Public close date from the page: `Jun 30, 2026`.

Public resolution source from the page: FIFA official match centre, `https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026`.

Settlement status: not settleable now. The page still has an open forecast state and the close date is Jun 30, 2026. Keep this first in the settlement watch order, but wait until after close and final public evidence.

### 2. OpenAI public video generation model

Public Baycast URL: https://baycast-p.vercel.app/questions/d3338e47-11ec-4568-942e-42bb19be0f5e

Live public title: `Will OpenAI release a new public video generation model before July 1, 2026?`

Public status from the page: open question with forecast controls visible to signed-out users.

Public close date from the page: `Jun 30, 2026`.

Public resolution source from the page: OpenAI News and product release notes, `https://openai.com/news/` and `https://help.openai.com/en/articles/6825453-chatgpt-release-notes`.

Settlement status: not settleable now. The page still has an open forecast state and the close date is Jun 30, 2026. Keep this second in the settlement watch order and do not resolve before the cutoff.

## Operational note

This remains prediction polling, not gambling. The report preserves Blind Consensus by checking only public reachability, public settlement metadata, and absence of BCP-sensitive strings. No money, trading, odds, private forecast data, or admin information was used.
