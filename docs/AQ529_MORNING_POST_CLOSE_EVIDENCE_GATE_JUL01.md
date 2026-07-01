# AQ-529 morning post-close evidence gate, July 1

Date checked: 2026-07-01 UTC.

Forecasts read: no. I did not query or inspect the forecasts table, forecast rows, score rows, aggregate probabilities, forecaster counts, or private settlement fields. This is public evidence only.

## Public evidence checked

For the World Cup opener, I checked the FIFA public API used by FIFA match surfaces:

`https://api.fifa.com/api/v3/calendar/matches?language=en&count=100&from=2026-06-10&to=2026-06-12`

The returned FIFA record for `FIFA World Cup™` on `2026-06-11T19:00:00Z` shows Mexico vs South Africa at Mexico City Stadium, `IdMatch: 400021443`, with `HomeTeamScore: 2` and `AwayTeamScore: 0`. Total regulation score: 2 goals.

I also opened FIFA's tournament match-centre page in the browser. It loaded FIFA navigation but returned the visible error text, `Come on referee, you weren't supposed to see this!`, behind the public site shell. Because the direct public API returned the match and score, I treated the API result as the usable official FIFA source for this gate.

For OpenAI, I checked the official OpenAI News RSS feed:

`https://openai.com/news/rss.xml`

The feed includes these relevant OpenAI items:

`Sora 2 is here`, dated `Tue, 30 Sep 2025 00:00:00 GMT`, link `https://openai.com/index/sora-2`, with the description: `Our latest video generation model is more physically accurate, realistic, and controllable than prior systems. It also features synchronized dialogue and sound effects. Create with it in the new Sora app.`

`Sora 2 System Card`, dated `Tue, 30 Sep 2025 00:00:00 GMT`, link `https://openai.com/index/sora-2-system-card`, with the description: `Sora 2 is our new state of the art video and audio generation model...`

`Creating with Sora Safely`, dated `Mon, 23 Mar 2026 00:00:00 GMT`, link `https://openai.com/index/creating-with-sora-safely`, with the description saying OpenAI built `Sora 2 and the Sora app` with safety protections.

The OpenAI website and Help Center article pages were also tried in the browser. Both showed Cloudflare challenge pages, so I relied on the official OpenAI RSS feed, which was accessible and carried the public announcement metadata.

## Candidate outcomes

World Cup opening match question: `Will the 2026 FIFA World Cup opening match have at least three total goals?`

The FIFA public API shows Mexico 2, South Africa 0. That is two total goals, below the three-goal threshold. Candidate outcome: No. Settle-ready: yes, from official FIFA public API evidence.

OpenAI video model question: `Will OpenAI release a new public video generation model before July 1, 2026?`

OpenAI's official RSS says `Sora 2 is here` was published on September 30, 2025, calls it OpenAI's latest video generation model, and says users can create with it in the Sora app. This is before 2026-07-01 00:00 UTC. Candidate outcome: Yes. Settle-ready: yes, from official OpenAI public RSS evidence.

## Baycast public BCP check

I checked these public Baycast surfaces on `baycast-p.vercel.app` in the browser: home, `/questions`, `/questions?sort=closing-soon`, `/questions?status=resolved`, `/leaderboard`, `/activity`, and the two discovered detail URLs:

`/questions/5745e845-94e9-4802-bbeb-850c982e1276`

`/questions/d3338e47-11ec-4568-942e-42bb19be0f5e`

Visible pages kept the blind-first behavior on open questions. The two candidate detail pages showed `Community signal locked` and did not show a public aggregate or forecaster count before a user forecast. The resolved listing showed the two existing resolved questions without exposing settlement internals.

For each checked surface, I inspected both visible text and `document.documentElement.outerHTML` for these raw field names: `aggregate_probability`, `forecasters_count`, `settled_by`, `evidence_doc`. Result: no matches in visible text and no matches in the DOM/HTML on all checked pages.

BCP result: pass for the requested public surfaces. No open forecast consensus, count leak, settlement user field, or evidence doc field was visible in the checked public pages.

## Gate result

Both Jun 30 candidates are settle-ready on public evidence. No live settlement was performed.
