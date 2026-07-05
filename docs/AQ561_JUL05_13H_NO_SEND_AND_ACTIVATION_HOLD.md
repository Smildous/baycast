# AQ-561, Jul 5 13h UTC, no-send activation hold

Timestamp: 2026-07-05 13h UTC

Verdict: NO SEND.

Reason: the gate is not fully green. Email is authenticated through Himalaya, but X is not authenticated and the private warm target list has zero complete rows. The rule for this pack is strict: send only if a real authenticated channel and a complete private warm target list are both proven. That is not proven here.

Nothing was sent. No email, no X post, no DM, no test send.

## Current context

Baycast framing for any later outbound:

- Prediction polling protocol, not gambling.
- Shift the frame from betting to forecasting.
- Use calibration, Brier scores, and Blind Consensus as the proof points.

Pre-run metrics carried into this hold:

- users: 6
- questions: 44
- forecasts: 12
- active: 35

These numbers are flat, so the pack below stays held behind gate.

## Public URL status

Checked from `/root/baycast-marketing`.

`npm run verify:public-bcp` passed on `https://baycast-p.vercel.app`:

- `/`
- `/questions`
- `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`
- `/leaderboard`
- `/activity`

Status: public BCP surfaces are live and healthy.

## Distribution gate status

Checked from `/root/baycast-marketing`.

`npm run verify:distribution-gate` passed on `https://baycast-p.vercel.app`:

- `/settlements/apple-mac-pro-wwdc-2026`
- `/questions?status=resolved`
- `/`

Status: distribution gate check passed.

This does not override the outbound rule. Public and distribution checks are green, but outbound stays blocked until channel and target gates are also green.

## Channel status from CLI and env checks

Redacted CLI and env check results:

- `himalaya`: present at `/root/.local/bin/himalaya`
- `himalaya account list`: one default Gmail account with IMAP and SMTP
- `himalaya account doctor`: TOML config OK, IMAP OK, SMTP OK
- `twurl`: absent
- `t`: absent
- `twitter`: absent
- `x`: absent
- X auth files checked: `~/.twurlrc`, `~/.config/t`, `~/.config/twitter`, `~/.config/x`, all absent
- env names present: `EMAIL_ALLOWED_USERS`, `EMAIL_IMAP_PORT`, `EMAIL_POLL_INTERVAL`, `EMAIL_SMTP_PORT`

Status:

- Email channel: usable through Himalaya.
- X channel: not authenticated.
- Overall channel gate: partial only, held behind gate.

## Private warm target status

Checked only counts under `/root/baycast-private/outreach`. No private target values were copied into this repo.

Files found:

- `/root/baycast-private/outreach/warm_targets.example.csv`: rows 0, complete rows 0
- `/root/baycast-private/outreach/warm_targets_jun14_19h.csv`: rows 2, complete rows 0, columns 15

Status: zero complete private warm target rows.

Target gate: red, held behind gate.

## Distribution gate

Outbound stays blocked unless both are true at the same time:

1. At least one real authenticated outbound channel is proven.
2. A complete private warm target list is proven.

Current state:

- Authenticated email: yes.
- Authenticated X: no.
- Complete private warm target list: no.

Final gate: NO SEND.

## Email draft 1, held behind gate

Subject: Baycast is for forecasting, not betting

Hi,

Baycast is a small prediction polling protocol built around calibration, not gambling.

The point is simple: people make forecasts, the crowd stays blind while forecasts are open, and the result is scored later with Brier-style accuracy. That keeps the focus on judgment quality instead of hype.

There are 44 live questions right now. If this is your kind of thing, the useful action is to forecast a few and then come back after resolution to see how calibrated you were.

Link, held behind gate: https://baycast-p.vercel.app

Best,
Baycast

Send status: held behind gate.

## Email draft 2, held behind gate

Subject: A quick calibration check

Hi,

I am keeping this short.

Baycast is testing a cleaner way to do public prediction polling: no betting frame, no crowd probability leak before resolution, just forecasts, calibration, Brier scores, and a public record.

The current board has 44 questions across tech, markets, AI, and public events. The best first use is to answer a handful, ignore the crowd, and check your calibration later.

Link, held behind gate: https://baycast-p.vercel.app

Best,
Baycast

Send status: held behind gate.

## X post draft 1, held behind gate

Baycast is prediction polling, not gambling.

The useful loop is forecast, stay blind to the crowd, resolve, score calibration.

44 live questions are up now. Good for anyone who wants to test judgment instead of chase vibes.

https://baycast-p.vercel.app

Post status: held behind gate.

## X post draft 2, held behind gate

From betting to forecasting:

Baycast keeps the crowd signal blind while questions are open, then makes calibration visible after resolution with Brier-style scoring.

Small protocol, 44 live questions, built for people who want a track record.

https://baycast-p.vercel.app

Post status: held behind gate.

## Final note

This pack is concrete, but it is not live distribution. It is held behind gate until the private warm targets have complete rows and the selected outbound channel is authenticated for the specific send path.
