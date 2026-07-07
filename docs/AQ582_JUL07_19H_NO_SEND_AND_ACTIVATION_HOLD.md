# AQ-582, Jul 7 19h UTC, no-send activation hold

Timestamp: 2026-07-07 19h UTC

Verdict: NO SEND.

Nothing was sent. No email, no X post, no DM, no test send.

The public product checks are green, but outbound is still held behind gate. X is not authenticated, and the local private warm target files do not contain a complete target row. Himalaya email is usable, but it is not enough on its own without a complete private warm target list.

Baycast stays framed as prediction polling. The comparison to avoid is simple: not gambling, not a wager flow. The copy below is only for later use if the operational gates open.

## Public URL

Checked from `/root/baycast-marketing`.

`https://baycast-p.vercel.app/` returned HTTP 200 on HEAD and GET with `text/html; charset=utf-8`.

Page title seen: `Baycast - Predict Real Events`.

Status: live.

## Public BCP

`npm run verify:public-bcp` passed.

The script checked `/`, `/questions`, the public question route, `/leaderboard`, and `/activity`.

Result: `Public BCP surface verification passed.`

Status: green.

## Distribution gate

`npm run verify:distribution-gate` passed.

The script checked the Apple settlement page, resolved questions, and the home page.

Result: `Distribution gate verification passed.`

Status: green.

## Channels

Local checks only. No message was sent.

Himalaya is present at `/root/.local/bin/himalaya`. `himalaya account list` shows one default Gmail account with IMAP and SMTP. `himalaya account doctor` reports TOML config OK, IMAP OK, and SMTP OK.

No X sender is ready locally. `twurl`, `t`, `twitter`, and `x` were not found on PATH. The checked X auth files are absent: `~/.twurlrc`, `~/.config/t`, `~/.config/twitter`, `~/.config/x`, and `~/.config/twurl`.

Relevant env names seen: `EMAIL_ALLOWED_USERS`, `EMAIL_IMAP_PORT`, `EMAIL_POLL_INTERVAL`, `EMAIL_SMTP_PORT`.

Status: email usable, X not authenticated, outbound still held behind gate.

## Private warm targets

Checked row counts and completeness only under `/root/baycast-private/outreach`. No private target value, address, handle, note, source, or secret is copied here.

`warm_targets.example.csv`: rows 0, columns 15, complete rows 0.

`warm_targets_jun14_19h.csv`: rows 2, columns 15, complete rows 0.

Status: zero complete private warm target rows. Target readiness is held behind gate.

## Send decision

NO SEND.

The public checks can support a later activation, but outbound needs both a usable sender for the chosen channel and a complete private warm target list. That is not true right now.

Final status: held behind gate.

## Email copy, held behind gate

Subject: Baycast prediction polling

Hi,

Baycast is a small prediction polling protocol. People make a forecast, add a short reason, and the crowd signal stays hidden while the question is open. After resolution, the result becomes part of a public track record.

If the gate opens later, the first ask is simple: try one live question and see if the blind consensus format feels useful.

Link, held behind gate: https://baycast-p.vercel.app/

Best,
Baycast

Send status: held behind gate.

## Shorter email copy, held behind gate

Subject: Quick Baycast ask

Hi,

Baycast is testing prediction polling with the crowd signal hidden until resolution. It is built for clear calls, short reasoning, and a score after the fact.

If the gate opens later, the ask is to try one question and send back the rough edge that stood out.

Link, held behind gate: https://baycast-p.vercel.app/

Best,
Baycast

Send status: held behind gate.

## X copy, held behind gate

Baycast is prediction polling with the crowd signal hidden while questions are open. Make a call, add a reason, and see the track record after resolution.

Held behind gate: https://baycast-p.vercel.app/

Post status: held behind gate.

## X reply copy, held behind gate

The point is not a hype loop. Baycast keeps the consensus blind until resolution, then scores forecasts after the fact.

Held behind gate: https://baycast-p.vercel.app/

Post status: held behind gate.
