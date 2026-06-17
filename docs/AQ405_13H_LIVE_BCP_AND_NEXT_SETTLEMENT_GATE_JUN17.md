# AQ405 13h live BCP and next settlement gate, Jun 17

Checked at 2026-06-17 13:02 UTC against `https://baycast-p.vercel.app`.

I only used public pages and read-only HTTP/browser checks. I did not read private forecasts, database forecast rows, admin data, or forecast APIs.

## Live pages checked

`/` returned 200. The page showed the live questions module with FIFA and OpenAI in the public open list. The public copy stayed in prediction polling language: "Make your call before seeing the crowd" and "Blind-first Prediction polling". The raw HTML and visible text had no hits for `aggregate_probability`, `forecasters_count`, exact forecast count field names, consensus probability language, `settled_by`, `evidence_doc`, or gambling copy.

`/questions` returned 200. Browser view showed `Questions(43 open)`, then the closing-soon cards. FIFA appeared as `Sports`, `14d left`, `Will the 2026 FIFA World Cup opening match have at least three total goals?`, with `Lock your call before the crowd can shape it`. OpenAI appeared as `Technology`, `14d left`, `Will OpenAI release a new public video generation model before July 1, 2026?`, with the same blind-first copy. The direct links found from this public page were:

- FIFA: `/questions/5745e845-94e9-4802-bbeb-850c982e1276`
- OpenAI: `/questions/d3338e47-11ec-4568-942e-42bb19be0f5e`

`/questions?status=resolved` returned 200. It showed the resolved Apple Mac Pro question only. No BCP leak terms or gambling terms were present in the HTML/text scan.

`/leaderboard` returned 200. It showed public ranking copy: `Ranked by calibration` and table headings including `Brier`, `Log Score`, `Predictions`, `Resolved`. No open-question aggregate probability or consensus details were exposed.

`/activity` returned 200. It showed resolved-question activity for the Apple Mac Pro question and the line `Showing recent resolved-question forecasts`. That is acceptable because the question is resolved. No open-question BCP data was exposed.

`/settlements/apple-mac-pro-wwdc-2026` returned 200. It showed `Apple Mac Pro at WWDC 2026 resolved No` and the prediction polling explanation: `There are no prices to move, no trades to place, and no financial reward attached to this settlement note.` No blocked BCP or gambling terms were present in the HTML/text scan.

## Direct next-settlement checks

FIFA direct page returned 200 at `/questions/5745e845-94e9-4802-bbeb-850c982e1276`. Browser visible text showed:

- `Sports`, `14 d left`
- `Community signal locked`
- `Jun 30, 2026`
- `Closes`
- `Resolution source: FIFA official match centre: https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026`

The page still has the public forecast entry UI and sign-up CTA. It is open until 2026-06-30 and is not settle-ready on 2026-06-17.

OpenAI direct page returned 200 at `/questions/d3338e47-11ec-4568-942e-42bb19be0f5e`. Browser visible text showed:

- `Technology`, `14 d left`
- `Community signal locked`
- `Jun 30, 2026`
- `Closes`
- `Resolution source: OpenAI News and product release notes: https://openai.com/news/ and https://help.openai.com/en/articles/6825453-chatgpt-release-notes`

The page still has the public forecast entry UI and sign-up CTA. It is open until 2026-06-30 and is not settle-ready on 2026-06-17.

## BCP term scan

For `/`, `/questions`, `/questions?status=resolved`, `/leaderboard`, `/activity`, `/settlements/apple-mac-pro-wwdc-2026`, plus the two direct open question pages, the raw HTML plus visible text scan returned no hits for:

- `aggregate_probability`
- `forecasters_count`
- exact forecast count field names checked as `forecast_count` and `forecasts_count`
- `consensus probability` or `consensus_probability`
- `settled_by`
- `evidence_doc`
- gambling terms checked as `gambling`, `betting`, `wager`, `casino`, `odds`, `free-to-play`

The only public percentages visible on the two open question pages were the unauthenticated forecast input presets and the slider value. Those are user input controls, not crowd output.

## Verdict

Pass. The live public surface keeps open-question crowd information blind. The next settlement candidates, FIFA and OpenAI, are still open through Jun 30, 2026 and should not be settled or messaged as settled today.

No-send implication: do not send settlement, score, or resolution copy for FIFA or OpenAI at 13h UTC today. Keep outbound limited to the existing Apple Mac Pro resolved note if anything needs to be cited publicly.
