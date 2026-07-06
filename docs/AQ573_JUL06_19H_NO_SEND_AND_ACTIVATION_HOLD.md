# AQ-573, Jul 6 19h, no-send and activation hold

## Verdict

NOTHING SENT.

The Jul 6 19h activation stays held behind gate. Public Baycast surfaces are live and the two local checks passed, but outbound is not open from this machine. X is not authenticated in the local session, and the private warm target files do not contain complete sendable rows.

No email, X post, DM, Reddit post, Discord message, Telegram message or other outbound message was sent.

It is retained behind gate until the activation inputs are real: complete warm targets plus an authenticated channel, or an AI dry_run that passes.

## Current Baycast state

Baycast positioning stays tight: prediction polling, from betting to forecasting. No gambling language.

Current metrics for this hold: 6 users, 44 questions, 35 open, 12 forecasts, 0 new forecasts today.

## Checks completed without sending

Repo sync was done first in `/root/baycast-marketing`. The branch was already up to date with `origin/main`.

`npm run verify:distribution-gate` passed against `https://baycast-p.vercel.app`. It checked `/settlements/apple-mac-pro-wwdc-2026`, `/questions?status=resolved` and `/`.

`npm run verify:public-bcp` passed against `https://baycast-p.vercel.app`. It checked `/`, `/questions`, one public question page, `/leaderboard` and `/activity`.

Himalaya is usable locally. `himalaya` is present at `/root/.local/bin/himalaya`, version `v1.2.0`. `himalaya account list` shows one default `gmail` account with IMAP and SMTP. `himalaya account doctor gmail` returned OK for TOML config, IMAP and SMTP. No email was sent.

X tooling is present but not authenticated enough to open the channel. `x-cli` exists at `/root/.local/bin/x-cli` and exposes authenticated command groups. No relevant `TWITTER_*` or `X_*` credential keys are visible in the session, and no safe account status command returned an authenticated user. X stays closed.

Private outreach files were checked only by file names, headers and counts. Nothing private was copied into this repo. `/root/baycast-private/outreach/warm_targets.csv` is not present. Related files are present: `warm_targets.example.csv` and `warm_targets_jun14_19h.csv`. The example file has 0 rows. The Jun 14 file has 2 rows, 1 contact-like column, 1 name-like column and 0 complete sendable rows.

## Held copy behind gate

### Email draft 1

Subject: Baycast turns arguments into forecasts

Hi,

Baycast is prediction polling for real-world questions. People make a forecast, see the crowd view, then come back when the outcome is resolved.

It is not a market and it is not gambling. The point is to move from hot takes to tracked probabilities.

A good first stop is the resolved questions page:
https://baycast-p.vercel.app/questions?status=resolved

Hold this copy behind gate. Do not send while the target list has 0 complete sendable rows or the channel is not authenticated.

### Email draft 2

Subject: A simple way to track calls on real events

Hi,

Baycast helps people write down what they think will happen before the result is known.

Each question becomes a small public forecasting loop: make the call, compare with the crowd, then check the resolved outcome later. Prediction polling, not gambling.

Start here:
https://baycast-p.vercel.app/

Hold this copy behind gate until warm targets are complete and the selected channel is authenticated, or an AI dry_run passes.

### X draft 1

Baycast is prediction polling for real events.

Make a forecast, compare with the crowd, then check the resolved outcome later.

Not a market. Not gambling.

https://baycast-p.vercel.app/questions?status=resolved

Do not post. X is not authenticated here.

### X draft 2

Most arguments about the future never get scored.

Baycast turns them into forecasts you can revisit after the outcome is known.

Prediction polling, not gambling.

https://baycast-p.vercel.app/

Do not post. Retain behind gate.

## Unblockers

Outbound can reopen only when one of these paths is true:

1. Complete private warm targets exist and the selected outbound channel is authenticated.
2. AI dry_run passes with no live send.

Until then, the status for AQ-573 remains NOTHING SENT, held behind gate.
