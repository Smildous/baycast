# AQ-549, Jul 4 morning outbound hold and blocker downgrade

Verdict: NO SEND.

Nothing was sent. No email, no X post, no DM, no test send, no public comment.

## Current flatline

Pre-run metrics for this pass:

- users: 6
- questions: 44
- forecasts: 12
- active/open questions: 35
- new signups: 0
- forecasts today: 0
- last 7 snapshots: flat
- public URL: HTTP 200

This is not a launch moment. The product is reachable, but there is no fresh demand signal to amplify today.

## Gate audit, no send

Checked from `/root/baycast-marketing` after fast-forwarding `main` from `origin/main`.

Public and product gates:

- `npm run verify:distribution-gate`: PASS
  - `/settlements/apple-mac-pro-wwdc-2026`
  - `/questions?status=resolved`
  - `/`
- `npm run verify:public-bcp`: PASS
  - `/`
  - `/questions`
  - `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`
  - `/leaderboard`
  - `/activity`
- `https://baycast-p.vercel.app/`: HTTP 200

Channel status:

- Himalaya email is usable locally. `himalaya account list` returned ok.
- X is not authenticated. `x-cli auth status` failed.
- GitHub Issues were not used.

Private warm target audit, redacted:

| Private file | Data rows | Non-empty rows | Complete sendable rows |
| --- | ---: | ---: | ---: |
| `warm_targets.example.csv` | 0 | 0 | 0 |
| `warm_targets_jun14_19h.csv` | 2 | 2 | 0 |
| Total | 2 | 2 | 0 |

I did not copy private target values, addresses, handles, notes, sources, or secrets into this repo.

## Why outbound remains NO SEND

Outbound remains blocked for concrete reasons:

1. Private warm targets have 0 complete sendable rows.
2. X is not authenticated, so no X post or DM is cleared.
3. AQ-546 has not passed the live AI forecaster `dry_run` gate. The last recorded state is still a production endpoint auth block, not a clean live dry run.
4. Metrics are flat: 6 users, 44 questions, 12 forecasts, 0 new signups, 0 forecasts today.
5. AQ-233 still needs both an authenticated outbound channel and a safe human target list.

Email being technically available is not enough. A channel without a complete, permissioned target row creates fake readiness. Hold.

## Minimum warm target row schema

A warm target row is complete only if all fields below are present and non-empty. This is the minimum needed before one human email can be personalized and reviewed.

| Field | Required content |
| --- | --- |
| `first_name` | Human first name for greeting. |
| `email` | Direct email address for the intended recipient. No aliases unless the relationship is explicit. |
| `relationship` | How we know the person, for example friend, former coworker, founder peer, forecasting contact. |
| `permission_basis` | Why it is acceptable to contact them now, for example prior opt-in, active conversation, explicit request, warm intro. |
| `personal_context` | One specific recent or durable context line that proves this is not cold spam. |
| `fit_reason` | Why Baycast is relevant to this person specifically. |
| `suggested_channel` | `email` for the first cleared send. Use `x` only after X auth is proven. |
| `last_reviewed_utc` | ISO timestamp or date for the last human review of the row. |
| `owner` | Person responsible for the row and final send approval. |

Optional but useful fields: `target_id`, `company_or_project`, `role`, `source_url`, `do_not_contact`, `notes`, `copy_variant`, `status`.

Current private CSV headers do not match this minimum schema. They have useful older fields like `handle_or_email`, `why_relevant`, `last_context`, `opt_in_status`, and `personal_note`, but the minimum row for send approval should be explicit and boring. Do not infer missing permission or personalization from notes.

## Copy snippets, parked until AQ-546 passes

Use only after all of this is true: AQ-546 live `dry_run` passes, endpoint auth is fixed, warm targets have at least one complete row, and the chosen channel is authenticated.

### Email snippet A

Subject: Quick Baycast sanity check

Hi [first_name],

I am working on Baycast, a small prediction polling product.

The loop is simple: people forecast before the outcome is known, then the result is settled and scored later. It is for calibration and decision feedback. It is not betting and not a market.

It is still tiny: 6 users, 44 questions, 12 forecasts, and growth is flat. That is why I would rather ask for a sharp read than pretend this is a launch.

Could you take five minutes and tell me if the forecast, settlement, and score flow is clear?

Baycast: https://baycast-p.vercel.app/
Resolved questions: https://baycast-p.vercel.app/questions?status=resolved

Thanks,
[signature]

### Email snippet B

Subject: Can I get your read on Baycast?

Hi [first_name],

I would value your read on Baycast.

It is prediction polling: make a forecast before the outcome is known, then compare against the settled result later. The point is calibration, not gambling, trading, or financial speculation.

The honest status is early and flat: 6 users, 44 questions, 12 forecasts, 0 new signups today. If the concept is not legible to a careful reader now, more posting will not fix that.

If you have a few minutes, I would appreciate feedback on the flow.

Baycast: https://baycast-p.vercel.app/questions

Thanks,
[signature]

### X snippet, only after X auth is fixed

Baycast is a small prediction polling project.

6 users, 44 questions, 12 forecasts. Early and flat, but the loop is there: forecast before the outcome, settle later, score calibration.

Not gambling. Not a market.

https://baycast-p.vercel.app/

### Short human follow-up

Thanks for looking. The main thing I need is not praise. I need to know where the flow is unclear: question, forecast, blind period, settlement, or score.

## AQ-110 blocker downgrade recommendation

Recommendation: downgrade AQ-110 from HIGH active blocker to LOW/ARCHIVE.

Reason: AQ-110 is a stale launch-monitoring task for HN, Reddit, Product Hunt, and similar comment threads. There is no active launch channel right now. No outbound channel is running. X is not authenticated. Warm targets have 0 complete rows. AQ-546 is still gated. AQ-233 is still blocked.

Keeping AQ-110 as a HIGH active blocker makes the board noisier without protecting anything. There are no live comments to monitor and no public launch thread to answer.

Suggested status:

- priority: LOW
- state: ARCHIVE, or inactive until a launch channel is actually opened
- reopen condition: a real launch or outbound post goes live, with a named owner and channel list

Do not spend Jul 4 monitoring empty launch surfaces. Spend the next slot on the real blockers: AQ-546 auth dry run, one complete permissioned warm target row, and authenticated channel readiness.
