# AQ-570, Jul 6 13h, no-send activation hold

## Verdict

NOTHING SENT.

The gate stays closed. The public Baycast surfaces are up and both verification scripts passed, but X is not authenticated from this machine. Himalaya is configured and its doctor check is OK, yet email alone does not open outbound. The private warm target list is still incomplete: 2 active rows, 0 complete sendable rows.

No email, X post, DM, Reddit post, Discord message, Telegram message or other outbound message was sent.

## Checks completed without sending

Repo sync was done first in `/root/baycast-marketing`: fetched `origin/main` and fast-forward check returned already up to date.

`npm run verify:distribution-gate` passed against `https://baycast-p.vercel.app`. It checked `/settlements/apple-mac-pro-wwdc-2026`, `/questions?status=resolved` and `/`.

`npm run verify:public-bcp` passed against `https://baycast-p.vercel.app`. It checked `/`, `/questions`, one public question page, `/leaderboard` and `/activity`.

X check stayed safe. `x-cli` exists at `/root/.local/bin/x-cli`, but there are no X or Twitter environment keys visible in the session. `x-cli` exposes command groups for posting and account actions, but no authenticated safe status command returned an account. X stays closed.

Himalaya check stayed safe. `himalaya` exists at `/root/.local/bin/himalaya`. `himalaya account list` shows one default `gmail` account with IMAP and SMTP. `himalaya account doctor gmail` returned OK for TOML config, IMAP and SMTP. No email was sent.

Private warm targets were checked only as counts under `/root/baycast-private/outreach`. Nothing private was copied here. There are 2 CSV files. The active file has 2 rows, 4 contact-like columns, 3 name-like columns and 0 complete sendable rows.

Baycast positioning for any later outbound remains: prediction polling, not a market, not gambling.

## Held copy behind the gate

### Email draft 1

Subject: Baycast turns arguments into forecasts

Hi,

Baycast is a prediction polling product for real-world questions. People make a forecast, see the crowd view, then come back when the outcome is resolved.

It is not a market and it is not gambling. The point is to move from hot takes to tracked probabilities.

A good first stop is the resolved questions page:
https://baycast-p.vercel.app/questions?status=resolved

Do not send while X auth is absent or the warm target list has no complete sendable rows.

### Email draft 2

Subject: A simple way to track calls on real events

Hi,

Baycast helps people write down what they think will happen before the result is known.

Each question becomes a small public forecasting loop: make the call, compare with the crowd, then check the resolved outcome later. Prediction polling, not gambling.

Start here:
https://baycast-p.vercel.app/

Do not send while the distribution gate is closed.

### X draft 1

Baycast is prediction polling for real events.

Make a forecast, compare with the crowd, then check the resolved outcome later.

Not a market. Not gambling.

https://baycast-p.vercel.app/questions?status=resolved

Do not post while X auth is absent or warm targets are incomplete.

### X draft 2

Most arguments about the future never get scored.

Baycast turns them into forecasts you can revisit after the outcome is known.

Prediction polling, not gambling.

https://baycast-p.vercel.app/

Do not post while the gate is closed.

## Operating note

This file is only a no-send pack for the next activation check. Current state is unchanged: public site passes checks, outbound stays closed, NOTHING SENT.
