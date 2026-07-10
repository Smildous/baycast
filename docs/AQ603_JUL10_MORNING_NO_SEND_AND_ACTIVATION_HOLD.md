# AQ-603 Jul 10 morning no-send activation hold

Checked from `/root/baycast-marketing` on 2026-07-10 07:02 UTC after syncing with `origin/main`. Nothing was sent. No email, no X post, no DM, no queue, no test send.

Verdict: NOTHING SENT. Outbound stays held behind gate.

Baycast positioning for this pack: prediction polling, not gambling. The useful frame is moving from betting to forecasting: make an independent probability call first, then compare and score when the outcome resolves.

Current metrics remain flat: 6 users, 44 questions, 12 forecasts, 35 active, 0 forecasts today. Flat metrics are a reason to keep the activation pack tight, not a reason to bypass the outbound gate.

## Gate read

Public URL: PASS. `https://baycast-p.vercel.app/` returned HTTP 200 with HTML.

Distribution gate: PASS. `npm run verify:distribution-gate` checked:

- `/settlements/apple-mac-pro-wwdc-2026`
- `/questions?status=resolved`
- `/`

Public BCP: PASS. `npm run verify:public-bcp` checked:

- `/`
- `/questions`
- `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`
- `/leaderboard`
- `/activity`

Email channel: usable, but unused. Himalaya is installed at `/root/.local/bin/himalaya`. `himalaya account list` found the default Gmail account with IMAP and SMTP. `himalaya account doctor gmail` returned TOML, IMAP, and SMTP OK.

X channel: not authenticated for outbound in this run. `x-cli` is installed at `/root/.local/bin/x-cli`, but `x-cli auth status` and `x-cli whoami` are not available commands here. The read-only environment check found `X_API_KEY`, `X_API_SECRET`, `X_ACCESS_TOKEN`, `X_ACCESS_TOKEN_SECRET`, and `X_BEARER_TOKEN` missing.

Private warm targets: incomplete. Redacted count only: 2 CSV files, 2 data rows, 2 non-empty rows, 0 complete sendable rows. No private names, emails, handles, notes, sources, row contents, or target details are copied into this file.

Gate result: closed. Public surfaces pass and email is usable, but outbound still lacks a complete private warm target row. X is also not authenticated. Distribution stays held behind gate.

## Required unblockers

1. Add at least one complete private warm target row outside the public repo with identity, contact, platform, relationship, relevance, last context, opt-in status, personal note, owner, next action, and no blocking status.
2. Keep Himalaya passing account list and doctor in the same send run if email is used.
3. Authenticate X in the same run before any X post is considered.
4. Re-run public URL, distribution gate, public BCP, channel checks, and redacted warm target counts before any outbound action.
5. If any required check fails, keep every draft held behind gate.

## Held email drafts

### Email 1, forecaster friend

Subject: Baycast and blind prediction polling

```text
Hi [first name],

I am holding a short Baycast note for people who care about forecasting quality.

Baycast asks for your probability before showing the crowd view. The point is independent judgment first, then scoring after the outcome resolves.

If the gate opens, I would send you the questions page and ask for one forecast plus a blunt read on whether the flow is clear.

Link held behind gate: https://baycast-p.vercel.app/questions
```

### Email 2, product builder

Subject: Quick look at Baycast prediction polling

```text
Hi [first name],

Baycast is a small prediction polling prototype. It is not a betting product. The flow is built around taking a position before seeing what everyone else thinks.

I am holding this note until the outbound gate opens. If it opens, the ask is simple: try one public question and tell me where the first-time user flow feels slow, vague, or overexplained.

Link held behind gate: https://baycast-p.vercel.app
```

### Email 3, forecasting operator

Subject: Baycast, from betting language to forecasting

```text
Hi [first name],

I am testing whether Baycast can make public forecasting feel more like a clean poll and less like a gambling market.

The core mechanic is blind prediction polling: make your probability call first, compare after, then get scored when the question resolves.

If the gate opens, I would send this with one ask: forecast on one question and tell me if the positioning lands.

Link held behind gate: https://baycast-p.vercel.app/questions
```

## Held X posts

### X post 1

```text
Baycast is prediction polling, not gambling.

Make your probability call before seeing the crowd view. Compare after. Get scored when the outcome resolves.

Held behind gate: https://baycast-p.vercel.app
```

### X post 2

```text
Most public prediction products feel like markets first.

Baycast is testing a simpler frame: blind polling for forecasts. Independent call first, crowd context second.

Held behind gate.
```

### X post 3

```text
Baycast update: the product is reachable and public checks pass, but outbound remains held behind gate.

No complete warm target row, no authenticated X channel, no send.
```

## No-send checklist

- Public URL returned HTTP 200 before any draft was written.
- Distribution gate passed in the repo before this document was committed.
- Public BCP passed in the repo before this document was committed.
- Himalaya account list and doctor passed, with no email sent.
- X auth was checked without posting and was not proven.
- Private warm target check used redacted counts only.
- Complete sendable warm target rows stayed at 0.
- No private target data was copied into git.
- Three email drafts are held behind gate.
- Three X posts are held behind gate.
- Outbound remains blocked until the same run has an authenticated channel and at least one complete private warm target row.
