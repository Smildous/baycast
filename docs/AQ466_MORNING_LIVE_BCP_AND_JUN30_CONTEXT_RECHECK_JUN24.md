# AQ-466 morning live BCP and Jun 30 context recheck, Jun 24

Checked 2026-06-24 07:02 UTC against https://baycast-p.vercel.app from `/root/baycast-product` at `d06f5992bd63fd04d45c01bd5036633f689c0e98`, `fix(AQ-463): tighten Jun 30 context links`.

Verdict: SEND for the Product/Questions gate.

I used a public HTML script check only. I did not query private data, did not read the forecasts table, and did not call forecast APIs. The live pages now reflect the Jun 30 context-link cleanup from `d06f599`: the FIFA detail shows the FIFA official tournament hub only, and the OpenAI detail shows OpenAI News plus the ChatGPT release notes. I did not see the older generic FIFA links before the official FIFA source, and I did not see unrelated OpenAI context links on the OpenAI Jun 30 detail.

## Public routes checked

The script fetched these live pages with a normal HTTP GET and inspected the returned HTML and public text:

- `https://baycast-p.vercel.app/`, 200, title `Baycast - Predict Real Events`
- `https://baycast-p.vercel.app/questions`, 200, title `Browse Prediction Questions, Baycast`
- `https://baycast-p.vercel.app/questions?status=resolved`, 200, title `Browse Prediction Questions, Baycast`
- `https://baycast-p.vercel.app/leaderboard`, 200, title `Forecaster Leaderboard, Baycast`
- `https://baycast-p.vercel.app/activity`, 200, title `Recent Forecasting Activity, Baycast`
- `https://baycast-p.vercel.app/settlements/apple-mac-pro-wwdc-2026`, 200, title `Apple Mac Pro at WWDC 2026 settled No, Baycast`
- `https://baycast-p.vercel.app/questions/5745e845-94e9-4802-bbeb-850c982e1276`, 200, FIFA Jun 30 detail
- `https://baycast-p.vercel.app/questions/d3338e47-11ec-4568-942e-42bb19be0f5e`, 200, OpenAI Jun 30 detail

The home page and questions index both exposed the two Jun 30 detail links above, so the FIFA and OpenAI details were discoverable from the public questions surface.

## BCP surface result

Pass.

Across the checked public HTML and DOM text, the script found no hits for these leak strings:

- `aggregate_probability`
- `forecasters_count`
- `forecastCount`
- `fcCount`
- `settled_by`
- `evidence_doc`
- raw resolution JSON patterns

I also checked for visible exact forecaster-count wording and early consensus probability wording. No checked open-question page showed an exact forecaster count, an aggregate probability, or an early community probability. The open details still show the expected blind copy: `Community signal locked` and `Lock your forecast before the crowd can shape it`.

The forecast input default and quick buttons are visible on open detail pages, including 50 percent and the quick values 5, 10, 25, 50, 75, 90, and 95 percent. That is the user's input UI, not public consensus. The page labels the community signal as locked next to it.

The resolved surfaces are acceptable for this gate. The resolved filter lists resolved questions. The activity page exposes resolved-question activity only. The Apple settlement note is a readable public settlement page, not a raw payload. I found no `settled_by`, no `evidence_doc`, and no raw JSON on the settlement route.

## Page notes

Home loads cleanly. It links to live questions and did not expose aggregate probability, exact forecaster counts, raw resolution JSON, or the forbidden field names.

Questions index loads cleanly. It links to the FIFA and OpenAI Jun 30 details and did not expose aggregate probability, exact forecaster counts, early consensus, raw resolution JSON, or the forbidden field names.

Resolved filter loads cleanly. It linked to the resolved Apple Mac Pro question and the hurricane-season resolved question. No raw resolution object or hidden resolution fields appeared in the checked HTML.

Leaderboard loads cleanly. It is a scored/resolved public surface and did not expose open-question consensus or open-question forecaster counts.

Activity loads cleanly. It points to resolved-question activity only. I did not use it to inspect open forecasts.

Apple settlement route loads cleanly at `/settlements/apple-mac-pro-wwdc-2026`. It shows a human settlement note for Apple Mac Pro at WWDC 2026, outcome No, settled June 13, 2026, and a plain explanation. It did not expose raw resolution JSON or the forbidden internal field names.

## Jun 30 context-link check

FIFA detail: `https://baycast-p.vercel.app/questions/5745e845-94e9-4802-bbeb-850c982e1276`.

The live page shows the Jun 30 close date, keeps `Community signal locked`, and names the resolution source as `FIFA official match centre: https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026`.

The context section is now targeted. The visible context link is `FIFA World Cup 2026`, provider `FIFA`, described as the official tournament hub for fixtures, match centre links, and final scores. The page HTML contained the FIFA URL. I did not see the older generic links, such as AI.gov, The Athletic, or ESPN, before the official FIFA source.

OpenAI detail: `https://baycast-p.vercel.app/questions/d3338e47-11ec-4568-942e-42bb19be0f5e`.

The live page shows the Jun 30 close date, keeps `Community signal locked`, and names the resolution source as `OpenAI News and product release notes: https://openai.com/news/ and https://help.openai.com/en/articles/6825453-chatgpt-release-notes`.

The context section is now targeted. The visible context links are `OpenAI news and research updates`, provider `OpenAI`, and `OpenAI ChatGPT release notes`, provider `OpenAI Help Center`. I did not see NIST, NASA, or other unrelated generic OpenAI-context links on this Jun 30 detail.

## External source reachability

The FIFA tournament URL returned 200 from the script check:

`https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026`

The two OpenAI official URLs are still Cloudflare-blocked for this script run:

- `https://openai.com/news/`, 403, body starts `Enable JavaScript and cookies to continue`
- `https://help.openai.com/en/articles/6825453-chatgpt-release-notes`, 403, body starts `Enable JavaScript and cookies to continue`

That is not production staleness in Baycast. The Baycast live question now points at the right OpenAI sources. It does mean an automated settlement checker may still need a browser-capable path or fallback handling for OpenAI's Cloudflare challenge.

## Final call

SEND for AQ-466.

The live public BCP surfaces checked this morning did not leak aggregate probability, exact open forecaster counts, early consensus, internal settlement fields, or raw resolution JSON. The Jun 30 context links are no longer stale on production. The only remaining note is external reachability for OpenAI's own site from a plain script client, not a Baycast page issue.
