# AQ-579, Jul 7 13h UTC, no-send activation hold

Timestamp: 2026-07-07 13h UTC

Verdict: NO SEND.

Nothing was sent. No email, no X post, no DM, no test send.

Reason: the outbound gate is not fully green. Public BCP and distribution checks pass. Himalaya email is usable. X is not authenticated, and the private warm target files still have zero complete rows. The pack below stays held behind gate.

## Frame to keep

Baycast is a prediction polling protocol, not gambling.

Use this angle if the gate turns green later:

- Forecasting, not betting.
- Blind Consensus keeps the crowd signal hidden while questions are open.
- Brier-style scoring turns forecasts into a track record after resolution.

## Public URL status

Checked from `/root/baycast-marketing`.

`https://baycast-p.vercel.app/` returned HTTP 200 with `text/html; charset=utf-8`.

Page title seen: `Baycast - Predict Real Events`.

Status: public URL is live.

## Public BCP status

`npm run verify:public-bcp` is present and passed.

Routes checked by the script:

- `/`
- `/questions`
- `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`
- `/leaderboard`
- `/activity`

Result: `Public BCP surface verification passed.`

Status: green.

## Distribution gate status

`npm run verify:distribution-gate` is present and passed.

Routes checked by the script:

- `/settlements/apple-mac-pro-wwdc-2026`
- `/questions?status=resolved`
- `/`

Result: `Distribution gate verification passed.`

Status: green.

This does not open outbound by itself. Channel and target gates still matter.

## Channel status

Redacted local checks only. No post, no send.

- `himalaya`: present at `/root/.local/bin/himalaya`
- `himalaya account list`: one default Gmail account with IMAP and SMTP
- `himalaya account doctor`: TOML config OK, IMAP OK, SMTP OK
- `twurl`: absent
- `t`: absent
- `twitter`: absent
- `x`: absent
- X auth files checked: `~/.twurlrc`, `~/.config/t`, `~/.config/twitter`, `~/.config/x`, `~/.config/twurl`, all absent
- Relevant env names seen: `EMAIL_ALLOWED_USERS`, `EMAIL_IMAP_PORT`, `EMAIL_POLL_INTERVAL`, `EMAIL_SMTP_PORT`

Status:

- Email channel: usable through Himalaya.
- X channel: not authenticated.
- Channel gate: partial, held behind gate.

## Private warm target status

Checked only row counts and completeness under `/root/baycast-private/outreach`. No private target value, address, handle, note, source, or secret was copied here.

Files found:

- `/root/baycast-private/outreach/warm_targets.example.csv`: rows 0, columns 15, complete rows 0
- `/root/baycast-private/outreach/warm_targets_jun14_19h.csv`: rows 2, columns 15, complete rows 0

Status: zero complete private warm target rows.

Target gate: red, held behind gate.

## Final gate

Outbound requires both at the same time:

1. A real authenticated outbound channel for the chosen send path.
2. A complete private warm target list.

Current state:

- Public URL: green.
- Public BCP: green.
- Distribution gate: green.
- Himalaya email: usable.
- X: not authenticated.
- Private warm targets: zero complete rows.

Final status: NO SEND. Activation copy is held behind gate.

## Email variant 1, held behind gate

Subject: Forecasting without the betting frame

Hi,

Baycast is a small prediction polling protocol. The point is not gambling. The point is to write down what you think will happen, keep the crowd signal hidden while the question is open, then score the result after resolution.

If you like calibration, this is a clean first loop: pick a few live questions, make your call, add a short reason, and come back later to see the track record.

Link, held behind gate: https://baycast-p.vercel.app

Best,
Baycast

Send status: held behind gate.

## Email variant 2, held behind gate

Subject: A quick Baycast ask

Hi,

Quick ask. Baycast is testing prediction polling without a betting angle: blind crowd signal while questions are open, public resolution later, Brier-style scoring after the fact.

If this is your kind of tool, the useful action is simple. Forecast on a few questions where you have a real view and write one sentence on why.

Link, held behind gate: https://baycast-p.vercel.app

Best,
Baycast

Send status: held behind gate.

## X variant 1, held behind gate

Baycast is prediction polling, not gambling.

Forecast first. Keep the crowd signal blind while the question is open. Resolve later. Score calibration after the fact.

Built for people who want a track record, not vibes.

https://baycast-p.vercel.app

Post status: held behind gate.

## X variant 2, held behind gate

The useful Baycast loop is simple:

make a forecast
ignore the crowd while the question is open
come back after resolution
check your calibration

No betting frame. Just prediction polling and a public record.

https://baycast-p.vercel.app

Post status: held behind gate.

## Close

This is a concrete activation pack, not live distribution. It stays held behind gate until the chosen outbound channel is authenticated for the send path and the private warm target list has complete rows.
