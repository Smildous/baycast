# AQ-585 Jul 8 morning no-send and activation hold

Timestamp: 2026-07-08 morning UTC

Verdict: NO SEND.

Nothing was sent. No email, no X post, no DM, no test send.

Metrics are still flat: 6 users, 44 questions, 35 open, 12 forecasts, 0 today forecasts. That is enough to hold distribution until the gate opens. The public product checks pass, but the private warm target list still has 0 complete rows. Email exists locally. X is not authenticated locally. That combination keeps outbound blocked.

## Public URL

Checked from `/root/baycast-marketing`.

`https://baycast-p.vercel.app` returned HTTP 200.

Status: live.

## Public BCP gate

Command run:

```sh
npm run verify:public-bcp
```

Result: pass.

The script checked `/`, `/questions`, the public question detail route, `/leaderboard`, and `/activity` on `https://baycast-p.vercel.app`.

Public BCP status: green.

## Distribution gate

Command run:

```sh
npm run verify:distribution-gate
```

Result: pass.

The script checked `/settlements/apple-mac-pro-wwdc-2026`, `/questions?status=resolved`, and `/` on `https://baycast-p.vercel.app`.

Distribution gate status: green on public surfaces, still NO SEND overall because the private activation gate is not open.

## Channel status

Local checks only. No send command was run.

- Email: Himalaya is installed. `himalaya account list` exits 0. `himalaya account doctor` exits 0 and reports TOML, IMAP, and SMTP checks. Email channel status: usable locally, but not enough without complete warm targets.
- X: `x-cli` is installed. `x-cli auth status` is not a supported command. `x-cli me` exits non-zero with an auth or credential failure. X channel status: not authenticated locally.
- Private warm targets: checked under `/root` and `/root/baycast` private paths by count only. No private target value is copied here.

## Warm target completeness

Private warm target files found: 1 real CSV, excluding examples.

Rows total: 2.

Complete rows: 0.

Status: not usable for outbound.

## Send decision

NO SEND.

The public checks are clean, but distribution remains held behind gate. Email alone does not open it. X is not authenticated. The private warm target list has 0 complete rows.

Final status: held behind gate, NOTHING SENT.

## Activation copy held behind gate

Use only if AQ-546 opens the AI dry run path, or if a complete private warm target list plus authenticated sender exists. Do not send before that.

### Email, short

Subject: Baycast prediction polling

Hi,

Baycast is a small prediction polling product. You make a forecast, add a short reason, and the crowd result stays hidden while the question is open. After resolution, the public record shows what happened and how forecasts scored.

If the gate opens later, the ask is simple: try one live question and tell us where the flow feels unclear.

Link, held behind gate: https://baycast-p.vercel.app/

Best,
Baycast

Send status: NOTHING SENT.

### Email, even shorter

Subject: Quick Baycast ask

Hi,

Baycast is testing blind prediction polling. Make a call, add why, and see the crowd result only after resolution.

If the gate opens later, one useful test is to answer a live question and send back the rough edge that stood out.

Link, held behind gate: https://baycast-p.vercel.app/

Best,
Baycast

Send status: NOTHING SENT.

### X post

Baycast is prediction polling with the crowd signal hidden while questions are open. Make a call, add a reason, and check the track record after resolution.

Held behind gate: https://baycast-p.vercel.app/

Post status: NOTHING SENT.

### X reply

Baycast is not a wager flow. It keeps consensus blind until resolution, then scores the forecast record after the fact.

Held behind gate: https://baycast-p.vercel.app/

Post status: NOTHING SENT.

## Exact unblockers

Outbound can open only if one of these is true:

1. AQ-546 opens the AI dry run path and the AI dry run gate passes.
2. A private warm target CSV has at least one complete sendable row, and the selected outbound channel is authenticated.

For email, Himalaya is already usable locally, so the missing piece is at least one complete private warm target row.

For X, two pieces are missing: local X authentication through `x-cli`, and a compliant target or posting path allowed by the gate.

GitHub API 401 is not a blocker for this decision.
