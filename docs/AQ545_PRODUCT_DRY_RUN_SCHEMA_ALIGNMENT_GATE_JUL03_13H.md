# AQ-545 Product dry_run schema alignment gate, Jul 03 13h

Repository synced with `origin/main` before this document was written. This gate is for the AI forecast `dry_run` workaround after the live REST schema rejected `questions.blind_until`.

I did not read forecasts. I did not insert a forecast. I ran only a public BCP verifier that fetches public HTML and does not query the `forecasts` table.

## Decision

NO live AI forecast insert until both conditions are true:

1. `dry_run` on a live open binary question returns a 200 response with a synthetic forecast payload.
2. Product BCP checks pass with no read of forecasts, consensus, counts, activity, leaderboard, profiles, or other user prediction data.

A workaround that makes the route write before proving those two points is not acceptable.

## Product acceptance criteria

The workaround passes only if all items below are true.

1. The route can load the canonical question from live data without selecting a missing column.
2. The route uses question-owned fields only for `dry_run` prompt construction and validation.
3. The route does not accept client-provided question text as the source of truth.
4. The route returns a synthetic payload for `dry_run`, including the proposed probability, rationale, question id, and a dry-run user marker.
5. `dry_run` does not create auth users.
6. `dry_run` does not upsert profiles.
7. `dry_run` does not check duplicate user forecasts.
8. `dry_run` does not insert into `forecasts`.
9. `dry_run` does not update any table.
10. The BCP screen remains intact: no consensus, vote counts, aggregate probabilities, activity feed signal, leaderboard signal, profile signal, or user forecast signal is available to the AI before it forecasts.
11. Error handling must show the real schema problem clearly enough for operators to distinguish a missing question from a schema mismatch.
12. The first live insert can happen only after this gate is re-run and recorded as pass.

## Exact allowed data reads

For the `dry_run` workaround, these are the only allowed live data reads:

- Table: `questions`.
- Filter: one specific `question_id` supplied to the route.
- Required status check: `status = open` or equivalent route-side validation that rejects non-open questions.
- Allowed columns:
  - `id`
  - `title`
  - `description`
  - `category`
  - `status`
  - `question_type`
  - `resolution_source`
  - `closes_at`
  - `blind_until` only if it exists in the live REST schema
  - a schema-aligned replacement for blind phase timing only if it is a canonical question column and is documented in the same code change

If the workaround needs to avoid `blind_until` because the live REST schema does not expose it, it may use only a canonical question field that already exists on `questions`. It must not derive blind status from forecast, consensus, activity, or user data.

Public browser verification may read public HTML from these routes only:

- `/`
- `/questions`
- one public question detail route used by the verifier
- `/leaderboard`
- `/activity`

Those browser reads are for BCP leak checks only. They do not authorize the AI route to use leaderboard or activity data.

## Exact forbidden reads

The `dry_run` workaround must not read any of these sources before the AI forecast is generated:

- `forecasts`
- forecast prediction payloads
- aggregate or consensus probability fields
- forecast counts
- exact forecaster counts
- user vote counts
- `activity`
- activity feed rows or activity API payloads
- `leaderboard`
- `scores`
- `profiles`
- auth admin user lists
- profile display names
- profile handles
- historical user accuracy
- prior forecasts by the same user
- prior forecasts by any user
- resolved forecast distributions used as peer signal
- any RPC, view, edge function, or API endpoint that wraps one of the forbidden sources
- any client supplied consensus, count, profile, leaderboard, activity, or forecast value

Resolved public settlement pages may exist for normal users, but they are not allowed inputs to this AI `dry_run` gate unless a separate product gate explicitly approves that use.

## Live browser and API verification that must pass

Before a live AI forecast insert is allowed, verification must prove the points below.

Browser checks:

1. Public BCP pages load successfully.
2. Open question surfaces do not expose `aggregate_probability`, `forecasters_count`, `forecastCount`, `fcCount`, exact forecaster count copy, or open-question community consensus copy.
3. The browser does not reveal raw JSON or hidden markup that gives the AI consensus, counts, or user forecast signal before its own forecast.

API checks:

1. A live `dry_run` request with `{ "question_id": "<live open binary question>", "dry_run": true }` returns HTTP 200.
2. The response body is synthetic and marked as dry run.
3. The response body contains no live consensus, no counts, no peer forecasts, no activity data, no leaderboard data, and no profile data.
4. Instrumentation or request logs show exactly one canonical question read, or the minimum equivalent question-only read needed by the implementation.
5. Instrumentation or request logs show zero reads from all forbidden sources listed above.
6. Instrumentation or request logs show zero writes to auth, profiles, forecasts, questions, scores, leaderboard, activity, or any other table.
7. The API path fails closed if the question is not open, not binary, closed by time, or outside the accepted blind phase.
8. The API path reports schema mismatch as a schema problem, not as a silent product pass.

The live API proof must use a dry-run request. It must not use a real insert as the test.

## Verifier run in this pass

Command run from `/root/baycast-product`:

```text
npm run verify:public-bcp
```

Result:

```text
Verifying public BCP surfaces at https://baycast-p.vercel.app
ok /
ok /questions
ok /questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248
ok /leaderboard
ok /activity
Public BCP surface verification passed.
```

Why this verifier was allowed: `scripts/verify-public-bcp-surfaces.mjs` fetches public HTML and checks for BCP leak strings. It does not query Supabase tables and does not read forecasts.

I did not run a live dry_run probe in this pass because this task is a product gate document and explicitly says commit docs only. The required live API proof is defined above for the implementation gate.

## Final gate

Current status: NO-GO for live AI forecast insert.

The next acceptable implementation step is schema alignment for the canonical question read, followed by a live `dry_run` that returns a synthetic payload and passes the BCP checks above. Only after that may the team consider a real live AI forecast insert.
