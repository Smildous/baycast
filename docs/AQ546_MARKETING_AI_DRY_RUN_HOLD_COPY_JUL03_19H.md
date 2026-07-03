# AQ-546 marketing hold copy for AI dry_run gate, Jul 3 19h

Check time: 2026-07-03 19:00 UTC.

Verdict: NO SEND.

Nothing was sent. No email, no X post, no DM, no test send.

This pack is parked for the AI forecaster `dry_run` gate. Use it only after the live gate passes with the production `AGENT_ENDPOINT_SECRET` aligned, no 401, and complete warm targets.

## Gate notes

Current Baycast metrics used in this copy:

- 6 users
- 44 questions
- 35 open questions
- 12 forecasts
- growth is flat

Distribution gate check: PASS.

`npm run verify:distribution-gate` exited 0 and checked:

- `/settlements/apple-mac-pro-wwdc-2026`
- `/questions?status=resolved`
- `/`

Known outbound blockers from the current distribution context:

- X is not authenticated.
- Private warm targets have 0 complete rows.
- AQ-546 still needs the live AI forecaster `dry_run` gate to pass after production secret alignment.

## Firm no-send verdict

NO SEND if any of these stay true:

1. The AI forecaster endpoint returns 401.
2. Production `AGENT_ENDPOINT_SECRET` is not aligned.
3. The live AI forecaster run has not passed in `dry_run` mode.
4. Private warm targets still have 0 complete rows.
5. X is still unauthenticated for any X post.

Do not work around this with a softer channel. Do not send a test email to a warm target. Do not post from a personal account. The copy below is hold copy only.

Baycast should be described as prediction polling and calibration. Do not describe it as gambling, betting, a market, trading, or a wager.

## Internal status blurb 1

AQ-546 marketing is ready, but parked.

The short copy pack is prepared for the AI forecaster `dry_run` gate. We should not send or publish until the production endpoint stops returning 401, the live `dry_run` passes, and the warm target list has at least one complete sendable row.

Current public product state is still early: 6 users, 44 questions, 35 open, 12 forecasts, flat growth. The message should stay modest: Baycast is prediction polling with calibration, not gambling.

## Internal status blurb 2

No-send remains the right call.

The distribution gate passed, but outbound is not cleared while X auth is missing and private warm targets have 0 complete rows. AQ-546 should only unlock copy after the live AI forecaster `dry_run` gate passes with the production secret aligned.

If the endpoint is still 401, we hold. If warm targets are incomplete, we hold. No exceptions.

## User-facing email draft 1, use only after dry_run passes

Subject: A quick Baycast calibration check

Hi [first name],

I am working on Baycast, a small prediction polling product.

The idea is simple: ask a question before the outcome is known, collect forecasts, then score the result after settlement. It is meant for calibration and decision feedback. It is not betting and not a market.

The current product is still early: 6 users, 44 questions, 12 forecasts, and 35 open questions. That is part of why I am reaching out now. I would rather get sharp feedback before pretending the sample is bigger than it is.

Would you be open to taking a look and telling me if the flow is clear?

Baycast: https://baycast-p.vercel.app/
Resolved questions: https://baycast-p.vercel.app/questions?status=resolved

Thanks,
[signature]

## User-facing email draft 2, use only after dry_run passes

Subject: Can I get your read on Baycast?

Hi [first name],

I would value your read on Baycast.

It is prediction polling: people make forecasts before an outcome is known, then the product shows settlement and scoring after the fact. The goal is better calibration, not gambling, trading, or financial speculation.

Right now the product is intentionally small: 6 users, 44 questions, 12 forecasts, and 35 questions still open. Growth is flat, so the useful thing is not a launch push. It is honest feedback from people who can tell whether the concept is legible.

If you have five minutes, I would appreciate a look.

Baycast: https://baycast-p.vercel.app/
Open questions: https://baycast-p.vercel.app/questions

Thanks,
[signature]

## X post 1, use only after dry_run passes and X auth is confirmed

Baycast is a small prediction polling project.

6 users, 44 questions, 12 forecasts, 35 still open. Early and flat, but the loop is visible: forecast before the outcome, settle later, score calibration.

Not gambling. Not a market.

https://baycast-p.vercel.app/

## X post 2, use only after dry_run passes and X auth is confirmed

Testing Baycast as prediction polling for real-world questions.

The product is still tiny: 6 users, 44 questions, 12 forecasts. That is fine for now. The next useful step is feedback on whether the question, forecast, settlement, and score flow is clear.

https://baycast-p.vercel.app/questions

## Send checklist for later

Send only when all of this is true:

- Live AI forecaster `dry_run` passed.
- Endpoint is not returning 401.
- Production `AGENT_ENDPOINT_SECRET` is aligned.
- Distribution gate is green.
- Warm targets have at least one complete sendable row.
- Chosen channel is authenticated.
- Copy is matched to the actual recipient context.

Until then: NO SEND.
