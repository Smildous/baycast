# AQ-394 morning deployability gate, Jun 16

Scope: deployability validation for Baycast main on the Jun 16 morning gate.
Repo: `/root/baycast-dev`.
Base commit before checks: `bc70f6e6a60d90eb103ec7a9a140ea75e600e7c5`.
Run time: `2026-06-16 07:02:44 UTC`.

## Result

Deployability gate passed. No code fix was required.

## Commands run

| Command | Result | Notes |
| --- | --- | --- |
| `git fetch origin && git pull --ff-only origin main` | PASS | Local main was already up to date with origin main. |
| `git diff --check` | PASS | No whitespace errors found. |
| `npm run verify:next-settlement-watch` | PASS | Three watched questions matched expected open status and close timestamps. |
| `npm run verify:distribution-gate` | PASS | Distribution gate routes passed on the public deployment. |
| `npm run verify:public-bcp` | PASS | Public BCP routes passed with no blocked leak flagged. |
| `npm test` | PASS | 12 test files passed, 110 tests passed. |
| `rm -rf .next && npm run build` | PASS | Clean Next.js production build completed. 27 static pages generated. |

## Validation details

### `git diff --check`

Result: PASS

No output.

### `npm run verify:next-settlement-watch`

Result: PASS

Key output:

```text
next settlement watch: PASS
PASS FIFA opening match at least three goals: ok
PASS OpenAI public video generation model before July 1 2026: ok
PASS Microsoft first-party Xbox handheld before Aug 1 2026: ok
```

Question rows checked by the verifier:

- `5745e845-94e9-4802-bbeb-850c982e1276`, open, `2026-06-30T23:59:59+00:00`, Will the 2026 FIFA World Cup opening match have at least three total goals?
- `d3338e47-11ec-4568-942e-42bb19be0f5e`, open, `2026-06-30T23:59:59+00:00`, Will OpenAI release a new public video generation model before July 1, 2026?
- `5cc9fe74-5306-49d9-bec3-251ad276a779`, open, `2026-07-31T23:59:59+00:00`, Will Microsoft announce a new first-party Xbox handheld before August 1, 2026?

### `npm run verify:distribution-gate`

Result: PASS

Key output:

```text
Verifying distribution gate at https://baycast-p.vercel.app
ok /settlements/apple-mac-pro-wwdc-2026
ok /questions?status=resolved
ok /
Distribution gate verification passed.
```

### `npm run verify:public-bcp`

Result: PASS

Key output:

```text
Verifying public BCP surfaces at https://baycast-p.vercel.app
ok /
ok /questions
ok /questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248
ok /leaderboard
ok /activity
Public BCP surface verification passed.
```

### `npm test`

Result: PASS

Key output:

```text
Test Files  12 passed (12)
Tests  110 passed (110)
Duration  13.63s
```

### `rm -rf .next && npm run build`

Result: PASS

Key output:

```text
Next.js 14.2.16
Compiled successfully
Linting and checking validity of types ...
Generating static pages (27/27)
Finalizing page optimization ...
Collecting build traces ...
```

Build warning noted:

```text
[webpack.cache.PackFileCacheStrategy] Serializing big strings (215kiB) impacts deserialization performance
```

This was a warning only. The build passed.

## Fixes applied

No code fix was required. All requested validations passed on the first run.
