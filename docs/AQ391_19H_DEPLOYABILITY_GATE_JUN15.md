# AQ-391 19h deployability gate, Jun 15

Scope: deployability and public verifier gate for Baycast main at 19h.
Repo: `/root/baycast-dev`.
Base commit before checks: `7700758c37f867349964805c1eae34bc58ff382a`.

I did not read forecasts. The next-settlement verifier reads `questions` only, as shown by the script inspection.

## Scripts inspected

From `package.json`:

- `verify:next-settlement-watch`: `node scripts/verify-next-settlement-watch.mjs`
- `verify:distribution-gate`: `node scripts/verify-distribution-gate.mjs`
- `verify:public-bcp`: `node scripts/verify-public-bcp-surfaces.mjs`
- `test`: `vitest run`
- `build`: `next build`

Verifier files inspected:

- `scripts/verify-next-settlement-watch.mjs`
- `scripts/verify-distribution-gate.mjs`
- `scripts/verify-public-bcp-surfaces.mjs`

## Results

| Command | Result | Notes |
| --- | --- | --- |
| `npm run verify:next-settlement-watch` | PASS | Three watched open questions matched expected status and close timestamps. |
| `npm run verify:distribution-gate` | PASS | Apple settlement, resolved questions page, and homepage passed. |
| `npm run verify:public-bcp` | PASS | Public BCP routes passed with no consensus or forecaster count leak flagged. |
| `npm test` | PASS | 12 test files passed, 110 tests passed. |
| `rm -rf .next && npm run build` | PASS | Next.js production build completed. 27 static pages generated. |

## Command output summaries

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

- `5745e845-94e9-4802-bbeb-850c982e1276`, open, `2026-06-30T23:59:59+00:00`
- `d3338e47-11ec-4568-942e-42bb19be0f5e`, open, `2026-06-30T23:59:59+00:00`
- `5cc9fe74-5306-49d9-bec3-251ad276a779`, open, `2026-07-31T23:59:59+00:00`

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
Duration  13.45s
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

Build note:

```text
[webpack.cache.PackFileCacheStrategy] Serializing big strings (215kiB) impacts deserialization performance
```

This was a warning only. The build passed.

## Fixes applied

No code fix was required. All requested gates passed on the first run.
