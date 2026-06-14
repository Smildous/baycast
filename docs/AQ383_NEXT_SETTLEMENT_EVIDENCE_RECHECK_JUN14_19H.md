# AQ-383 next settlement evidence recheck, Jun 14 19h UTC

Prepared at 2026-06-14T19:04:51Z.

Scope: recheck the next AQ-379 settlement candidates from the live public question pages and public evidence sources only. I did not open forecasts, scores, consensus, user rows, activity-derived participation, admin tables, or forecast docs.

This is an evidence-prep note. It is not a settlement packet and it does not decide any result before close.

## Decision

Order for the next settlement watch:

1. FIFA opening match goals.
2. OpenAI public video generation model.
3. Microsoft first-party Xbox handheld.

Verdict: GO for evidence preparation, WAIT for settlement.

Reason: all three live public question pages are reachable and still open. FIFA and OpenAI both close at `2026-06-30T23:59:59Z`, so they are the next settlement window. FIFA should be checked first because the deciding source is a final match score. OpenAI is second because the question needs a full cutoff check through `2026-07-01T00:00:00Z`. Microsoft closes later at `2026-07-31T23:59:59Z`, so it stays queued after the June 30 pair.

No operator should resolve from this file. Settle only after the close time has passed, the public product no longer accepts forecasts, the evidence packet is complete, and the BCP check is clean.

## Live public question recheck

### 1. FIFA opening match goals

Public Baycast URL: `https://baycast-p.vercel.app/questions/5745e845-94e9-4802-bbeb-850c982e1276`

Live title: `Will the 2026 FIFA World Cup opening match have at least three total goals?`

Live status seen from the public product: open.

Exact close time: `2026-06-30T23:59:59Z`.

Live criterion seen on the public question page: resolves Yes if the official final score of the opening match includes three or more total goals by the end of regulation plus stoppage time. Extra time and penalty shootout goals do not count if FIFA classifies the opening match as a knockout match for any reason. Own goals count. If the match is abandoned and not completed by 2026-06-30, resolves No.

Public evidence URLs to watch:

- `https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026`
- `https://www.fifa.com/en/tournaments/mens/worldcup`
- The final FIFA match centre URL for the opening match, once the page exposes the specific match record.
- A stable secondary match report from a major sports outlet only as a cross-check, not as the deciding source.

Command-line source check at 19:04 UTC: the two FIFA tournament URLs returned HTTP 200.

Settlement mapping after close: Yes for 3 or more total official goals in regulation plus stoppage time. No for 0, 1, or 2 total official goals, or for the explicit abandonment case in the question text. If FIFA pages contradict each other or the match record is not final, wait.

### 2. OpenAI public video generation model

Public Baycast URL: `https://baycast-p.vercel.app/questions/d3338e47-11ec-4568-942e-42bb19be0f5e`

Live title: `Will OpenAI release a new public video generation model before July 1, 2026?`

Live status seen from the public product: open.

Exact close time: `2026-06-30T23:59:59Z`.

Live criterion seen on the public question page: resolves Yes if OpenAI publicly releases a new or materially upgraded video generation model to ChatGPT users, API users, or another public paid tier before `2026-07-01T00:00:00Z`. A research demo, waitlist-only preview, safety note, pricing change, or minor UI update does not count. The model must generate video from text, image, or video prompts. Otherwise resolves No.

Public evidence URLs to watch:

- `https://openai.com/news/`
- `https://help.openai.com/en/articles/6825453-chatgpt-release-notes`
- `https://platform.openai.com/docs/models`, which redirected to `https://developers.openai.com/api/docs/models` in the 19:04 UTC command-line check.
- Any official OpenAI product, model, or API documentation page that names the new video model and its public availability.

Command-line source check at 19:04 UTC: OpenAI News and the ChatGPT release notes returned HTTP 403 to the script, so keep them as manual browser watch URLs. The OpenAI models docs redirect returned HTTP 200.

Settlement mapping after close: Yes only with official OpenAI evidence that a new or materially upgraded public video generation model was released before `2026-07-01T00:00:00Z`. No if no such official source is found after the cutoff. Wait if the only evidence is a demo, waitlist, private preview, secondary article, ambiguous brand language, or access that is not public under the question text.

### 3. Microsoft first-party Xbox handheld

Public Baycast URL: `https://baycast-p.vercel.app/questions/5cc9fe74-5306-49d9-bec3-251ad276a779`

Live title: `Will Microsoft announce a new first-party Xbox handheld before August 1, 2026?`

Live status seen from the public product: open.

Exact close time: `2026-07-31T23:59:59Z`.

Live criterion seen on the public question page: resolves Yes if Microsoft or Xbox publicly announces a Microsoft-branded handheld gaming device before `2026-08-01T00:00:00Z`. A third-party Windows handheld, cloud-only app, controller accessory, or rumor does not count. A device co-branded with another manufacturer counts only if Microsoft presents it as first-party Xbox hardware. Otherwise resolves No.

Public evidence URLs to watch:

- `https://news.xbox.com/`
- `https://blogs.microsoft.com/`
- `https://www.microsoft.com/en-us/store/b/xbox`
- Any official Microsoft, Xbox, or Microsoft Store product page that names the handheld and makes the first-party status clear.

Command-line source check at 19:04 UTC: Xbox Wire, Microsoft Blogs, and Microsoft Store Xbox returned HTTP 200.

Settlement mapping after close: Yes only if Microsoft or Xbox publicly announces first-party Xbox handheld hardware before `2026-08-01T00:00:00Z`. No for partner Windows handhelds, cloud-only apps, accessories, rumors, or co-branded devices unless Microsoft presents the device as first-party Xbox hardware. Wait if the announcement language leaves first-party status unclear.

## No-forecast-read checklist

Passed for this note:

- I read `docs/AQ379_NEXT_RESOLUTION_GATE_JUN14_13H.md` and settlement runbook material.
- I did not read open-question forecast docs, forecast scores, forecast probabilities, or shortlist forecast writeups.
- I did not query Supabase.
- I used the public `/questions` listing and the three public question pages only for title, status, close time, question wording, and source text.
- I did not open admin screens.
- I did not open forecast rows, prediction payloads, consensus, exact forecast counts, user lists, unresolved leaderboard rows, or activity-derived participation.
- I did not use product activity, user demand, sentiment, traffic, or participation to choose the order.
- If a later operator sees forecast data during settlement prep, stop the run and restart from a clean evidence path.

## BCP risk checklist

Main risks before the June 30 pair:

- Public pages include forecast entry UI. Operators should capture only title, wording, close time, status, and resolution source. Do not capture slider defaults as evidence.
- OpenAI evidence may be blocked to command-line checks. Use a normal browser and save the final official page, but do not replace official OpenAI evidence with secondary coverage.
- FIFA may expose several tournament pages before the final match centre URL is stable. Capture the final FIFA match record, not a search result or tournament landing page alone.
- Microsoft hardware wording is tight. A partner Windows handheld is not enough unless the official Microsoft or Xbox language presents it as first-party Xbox hardware.
- Baycast is prediction polling, not gambling. Settlement notes should cite public facts only and avoid stakes, winnings, betting language, user lean, or participation pressure.
- Do not write Supabase during evidence capture. Do not run a resolve action until the evidence packet, no-leak check, and approval are complete.
- Resolve once. If a write fails or the product state looks inconsistent, stop and escalate instead of retrying blindly.

## Close-time gate

FIFA and OpenAI: first settlement review may start after `2026-06-30T23:59:59Z`, practically at or after `2026-07-01T00:00:00Z` once the public product is no longer accepting forecasts.

Microsoft: first settlement review may start after `2026-07-31T23:59:59Z`, practically at or after `2026-08-01T00:00:00Z` once the public product is no longer accepting forecasts.

Final answer for AQ-383: GO for preparation now. WAIT for settlement.