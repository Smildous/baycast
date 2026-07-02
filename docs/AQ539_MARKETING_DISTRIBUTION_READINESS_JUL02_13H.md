# AQ-539 marketing distribution readiness, Jul 2 13h

Check time: 2026-07-02 13:02 UTC.

Verdict: NO SEND.

Nothing was sent. No email, no X post, no DM, no test send.

I did not print or copy private warm target data. I only counted local rows and readiness fields under `/root/baycast-private/outreach`.

## Short decision

Public distribution is ready. Email tooling is ready. The outbound gate is still blocked.

Blockers:

1. Private warm targets: 0 complete sendable rows.
2. X: installed, but authentication is not proven.

Because the private warm target list is not complete, no outbound should happen even though the public URL, public BCP gate and email channel are green.

## Public checks

Repository checked: `/root/baycast-marketing`.

HEAD at check time: `90e83b82a1f56a7e30657b444d8c35a83ed39546`.

Public URL availability: PASS.

- `https://baycast-p.vercel.app/` returned HTTP 200.
- `https://baycast-p.vercel.app/settlements/apple-mac-pro-wwdc-2026` returned HTTP 200.
- `https://baycast-p.vercel.app/questions?status=resolved` returned HTTP 200.
- `https://baycast-p.vercel.app/leaderboard` returned HTTP 200.
- `https://baycast-p.vercel.app/activity` returned HTTP 200.
- `https://baycast-p.vercel.app/questions?sort=closing-soon` returned HTTP 200.

Distribution gate: PASS.

`npm run verify:distribution-gate` exited 0 and checked:

- `/settlements/apple-mac-pro-wwdc-2026`
- `/questions?status=resolved`
- `/`

Public BCP gate: PASS.

`npm run verify:public-bcp` exited 0 and checked:

- `/`
- `/questions`
- `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`
- `/leaderboard`
- `/activity`

## Channel checks

Himalaya email: usable.

- `/root/.local/bin/himalaya` exists.
- `himalaya account list` exited 0.
- `himalaya account doctor` exited 0.
- No email was sent.

X: not authenticated.

- `/root/.local/bin/x-cli` exists.
- `x-cli auth status` exited 2.
- `x-cli whoami` exited 2.
- `x-cli account` exited 2.
- `x-cli me` exited 2.
- `x-cli env` exited 2.
- `X_*` and `TWITTER_*` environment variable count in this shell: 0.
- No X action was sent.

## Private warm targets, redacted

Private folder checked: `/root/baycast-private/outreach`.

Only counts were recorded. No names, emails, handles, notes, relationship details, sources, row values or secrets were copied into this repo.

Redacted counts:

- private folder exists: yes.
- CSV files checked: 2.
- `warm_targets.example.csv`: 0 data rows, 0 non-empty rows, 0 complete sendable rows.
- `warm_targets_jun14_19h.csv`: 2 data rows, 2 non-empty rows, 0 complete sendable rows.
- Total: 2 data rows, 2 non-empty rows, 0 complete sendable rows.

A row was treated as sendable only if it had identity, contact, platform, relationship, relevance, last context, opt-in status, personal note, owner, next action and no blocking status.

## Gate result

NO SEND.

Send-ready requires all of this at the same time:

- public URL stable.
- distribution gate green.
- public BCP gate green.
- selected channel authenticated and healthy.
- at least one complete private warm target row.
- copy matched to that private target.

This run clears the public side and email tooling, but does not clear private warm targets or X authentication. Keep outbound parked.

## Outbound pack for later use

Use this only after a later gate shows at least one complete private warm target and a ready channel. Keep the wording targeted to prediction polling and calibration. Do not frame Baycast as betting, gambling or a market.

### First-score email

Subject: Baycast has its first scoring proof

Hi [first name],

Baycast now has its first public scoring proof live.

The point is simple: ask forecast questions before outcomes are known, keep responses blind until close, then score the forecasts after settlement. It is prediction polling with calibration, not a market and not betting.

The current public run is still small: 6 users, 44 questions, 12 forecasts and 35 open questions. AQ-538 added five new resolutions plus one Brier-only score from Cannes, so the product now has more visible evidence that forecasts can move from question to outcome to score.

If you are interested, I would value a quick read on whether this feels useful for teams that want calibrated judgment without turning it into a trading product.

Public site: https://baycast-p.vercel.app/
Resolved questions: https://baycast-p.vercel.app/questions?status=resolved
First settlement page: https://baycast-p.vercel.app/settlements/apple-mac-pro-wwdc-2026

Thanks,
[signature]

### First-score X post

Baycast now has public scoring proof: forecast question, blind response window, settlement, then calibration.

Small sample so far: 6 users, 44 questions, 12 forecasts, 35 open. AQ-538 added five new resolutions and one Brier-only score.

Prediction polling, not betting.

https://baycast-p.vercel.app/questions?status=resolved

### Post-settlement email

Subject: Post-settlement calibration check on Baycast

Hi [first name],

Baycast has started to show its post-settlement loop in public.

The product is built around a narrow idea: collect predictions while the answer is still unknown, hide aggregate influence during the forecast window, then score the result after settlement. The useful output is calibration, not a trade.

After AQ-538, there are five more resolved questions and one Cannes item with a Brier-only score. The numbers are still early, but the loop is now visible enough for a sharper critique.

Would you be open to looking at the resolved questions page and telling me whether this feels legible as a prediction polling protocol for non-financial decisions?

Resolved questions: https://baycast-p.vercel.app/questions?status=resolved
Public site: https://baycast-p.vercel.app/

Thanks,
[signature]

### Post-settlement X post

New Baycast check after settlement: more resolved questions, more scoring evidence, same product line.

Forecast first. Hide aggregate influence during the window. Settle later. Score calibration.

Prediction polling, not a market.

https://baycast-p.vercel.app/questions?status=resolved
