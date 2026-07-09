# AQ-597 Jul 09 13h no-send activation hold

Verdict: NO SEND.

The activation pack is held behind gate. Nothing was sent, posted, queued, or staged for delivery.

## Gate recheck

Public URL: PASS. `https://baycast-p.vercel.app/` returned HTTP 200.

Distribution gate: PASS. `npm run verify:distribution-gate` passed for settlement, resolved questions, and home.

Public BCP: PASS. `npm run verify:public-bcp` passed for home, questions, question detail, leaderboard, and activity.

Email channel: Himalaya is installed at `/root/.local/bin/himalaya`. `himalaya account list` and `himalaya account doctor` exited 0.

X channel: `x-cli` is installed at `/root/.local/bin/x-cli`, but X auth is not proven. `x-cli me` exited 2. `X_*` and `TWITTER_*` env count is 0.

Private warm targets: `/root/baycast-private/outreach` has 2 CSV files, 2 total data rows, 2 non-empty rows, and 0 complete sendable rows. No private target content was copied here.

Unblockers are authenticated channel plus complete private warm targets or AI dry_run passed.

## Email variant 1, held behind gate

Subject: Baycast for blind prediction polling

Hi [Name],

Baycast is live for prediction polling without showing the crowd before someone makes a call. The point is simple: collect independent forecasts first, then score the signal after the outcome is known.

If you are tracking forecasting tools, I would like to show you the current public loop and get your take on whether this format is useful for teams that care about calibrated judgment.

Held behind gate until the unblockers are real.

## Email variant 2, held behind gate

Subject: Quick look at Baycast?

Hi [Name],

I am holding a short Baycast note for people who care about forecasting quality. Baycast asks for a probability before showing the crowd, which keeps the first read cleaner than a normal prediction feed.

The live site is here once the gate opens: https://baycast-p.vercel.app/

Held behind gate until the unblockers are real.

## X draft 1, held behind gate

Baycast is prediction polling with the crowd hidden until after you make your call. Less herding, cleaner forecasts, simple scoring after outcomes resolve.

Held behind gate.

## X draft 2, held behind gate

Most forecasting feeds show you the crowd first. Baycast asks for your probability first, then scores the result after resolution.

Built for independent judgment, not gambling.

Held behind gate.

## Hold line

Keep AQ-597 held behind gate. Unblockers are authenticated channel plus complete private warm targets or AI dry_run passed.
