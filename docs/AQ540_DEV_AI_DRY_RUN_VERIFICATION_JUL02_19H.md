# AQ-540 AI dry-run verification, Jul 02 19H

Base commit: `908d6cb`

## Scope checked

- `app/api/agent/forecast/route.ts`
- `__tests__/agent-forecast-route.test.ts`

## Result

The dry-run path is already read-only after the required canonical question fetch and model call.

What the route does now:

- authenticates the endpoint secret before work starts
- reads only `question_id`, `context`, and `dry_run` from the request for forecast execution
- fetches canonical question data from `questions` by `question_id`
- selects only `id,title,description,category,status,question_type,resolution_source,blind_until,closes_at`
- validates the fetched question with `validateQuestionForAgent`
- calls the model using the canonical question object
- returns immediately for `dry_run` with `user_id: dry-run:<agent id>`
- does not call `ensureAgentProfile` during dry-run
- does not list auth users during dry-run
- does not create auth users during dry-run
- does not upsert profiles during dry-run
- does not query `forecasts` during dry-run
- does not insert rows during dry-run

The focused regression test already covers the AQ-540 gates:

- dry-run only touches the `questions` table
- dry-run does not list or create auth users
- canonical question fields are fetched by `question_id`
- client-supplied `question_text` is ignored by the LLM prompt

## Command evidence

```text
$ npm test -- __tests__/agent-forecast-route.test.ts
> baycast@0.1.0 test
> vitest run __tests__/agent-forecast-route.test.ts

 RUN  v4.1.5 /root/baycast-dev

 ✓ __tests__/agent-forecast-route.test.ts (1 test) 76ms

 Test Files  1 passed (1)
      Tests  1 passed (1)
```

```text
$ git diff --check
# passed with no output
```

```text
$ npm test
> baycast@0.1.0 test
> vitest run

 RUN  v4.1.5 /root/baycast-dev

 ✓ __tests__/supabase-admin.test.ts (13 tests) 115ms
 ✓ __tests__/agent-forecast-route.test.ts (1 test) 80ms
 ✓ __tests__/utils.test.ts (37 tests) 38ms
 ✓ __tests__/ai-forecaster.test.ts (7 tests) 9ms
 ✓ __tests__/badges.test.ts (19 tests) 12ms
 ✓ __tests__/onboarding.test.ts (16 tests) 11ms
 ✓ __tests__/news-context.test.ts (7 tests) 10ms
 ✓ __tests__/forecaster-count-visibility.test.ts (4 tests) 7ms
 ✓ __tests__/public-score-surfaces-bcp.test.ts (3 tests) 4ms
 ✓ __tests__/closing-soon-consistency.test.ts (2 tests) 5ms
 ✓ __tests__/signup-success.test.ts (3 tests) 6ms
 ✓ __tests__/resolution.test.ts (2 tests) 4ms
 ✓ __tests__/setup.test.ts (1 test) 4ms
 ✓ __tests__/activity-copy.test.ts (2 tests) 6ms

 Test Files  14 passed (14)
      Tests  117 passed (117)
```

```text
$ rm -rf .next && npm run build
> baycast@0.1.0 build
> next build

  ▲ Next.js 14.2.16
  - Environments: .env.local

 ✓ Compiled successfully
   Linting and checking validity of types ...
   Collecting page data ...
 ✓ Generating static pages (27/27)
   Finalizing page optimization ...
   Collecting build traces ...

Route (app)                               Size     First Load JS
├ ƒ /api/agent/forecast                   0 B                0 B

ƒ Middleware                              79.7 kB
```
