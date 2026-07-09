# AQ-594 Jul 9 morning no-send activation hold

Run on Jul 9 after syncing with `origin/main` first. Nothing was sent. No email, no X post, no DM, no webhook, no test send.

## Verdict

Hold activation. The public side is healthy, but outbound remains held behind gate.

Exact gate to lift this hold:

1. Complete private warm targets plus authenticated channel, or
2. AQ-546 AI `dry_run` gate.

Current state: public URL passes, distribution gate passes, public BCP passes, email CLI is authenticated, X auth is not proven, and private warm targets still have 0 complete sendable rows. That combination keeps the hold in place.

## Checks run

- `git fetch origin main` then pull with rebase from `origin main`: up to date before this file was created.
- Public URL `https://baycast-p.vercel.app/`: HTTP 200.
- `npm run verify:distribution-gate`: pass. Checked settlement page, resolved questions, and home.
- `npm run verify:public-bcp`: pass. Checked home, questions, sample question detail, leaderboard, and activity.
- `command -v himalaya`: present at `/root/.local/bin/himalaya`.
- `himalaya account list`: exit 0. Default account found with IMAP and SMTP.
- `himalaya account doctor`: exit 0. TOML, IMAP, and SMTP OK.
- `command -v x-cli`: present at `/root/.local/bin/x-cli`.
- `x-cli auth status`: exit 2. Command not available in this CLI.
- `x-cli whoami`: exit 2. Command not available in this CLI.
- X mentions read-only probe: exit 1. Missing X environment variables.
- Private warm target redacted row check: 2 CSV files checked under `/root/baycast-private/outreach`, 2 rows total, 0 complete sendable rows.

No private target names, emails, handles, notes, sources, or secrets are included in this document.

## Channel verdict

Email: technically usable through Himalaya. Local account checks pass for IMAP and SMTP. This does not unlock a send because the private warm target list is incomplete.

X: not usable for this hold. The CLI exists, but auth is not proven. The read-only probe reports missing `X_API_KEY`, `X_API_SECRET`, `X_ACCESS_TOKEN`, `X_ACCESS_TOKEN_SECRET`, and `X_BEARER_TOKEN`.

Overall channel verdict: partial. Email auth passes, X auth fails, and the private target gate fails. Nothing should be sent.

## Private warm target completeness

Redacted row check only:

- `warm_targets.example.csv`: rows 0, actionable rows 0, complete sendable rows 0.
- `warm_targets_jun14_19h.csv`: rows 2, actionable rows 0, complete sendable rows 0.

Completeness rule used for this hold: identity, contact route, platform, relationship, relevance, last context, opt-in status, personal note, owner, next action, and no blocking status. Current complete sendable rows: 0.

## Copy guardrails

Use clear product language. Keep it about blind forecasting, public questions, scoring, and a request for focused feedback. Do not claim traction. Do not use social proof, crowd metrics, or financial exchange language.

## Ready-to-hold email copy

Status: held behind gate. Do not send until either complete private warm targets plus authenticated channel are both true in the same run, or AQ-546 AI `dry_run` gate passes.

Subject: Quick Baycast feedback ask

Hi [first name],

I am testing Baycast, a blind forecasting app where people make a prediction before seeing the crowd view, then get scored after the outcome is known.

The ask is small: open one public question, make a forecast, and tell me where the flow feels unclear or slow.

Link: https://baycast-p.vercel.app/questions

If you only have a few minutes, the most useful feedback is whether the question page explains what to do before you commit your forecast.

Thanks,
[Sender]

## Ready-to-hold X copy

Status: held behind gate. Do not post until either complete private warm targets plus authenticated channel are both true in the same run, or AQ-546 AI `dry_run` gate passes.

Baycast is a blind forecasting app: make your call before seeing the crowd view, then get scored when the outcome is known.

I am looking for blunt feedback on whether the question flow is clear enough for a first-time user.

Try one public question: https://baycast-p.vercel.app/questions

## Activation hold

No-send remains active for AQ-594.

Lift condition is exact: complete private warm targets plus authenticated channel, or AQ-546 AI `dry_run` gate. Until then, this copy stays parked and no outbound action should run.
