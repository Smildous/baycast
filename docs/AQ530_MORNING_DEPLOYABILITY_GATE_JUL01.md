# AQ-530 morning deployability gate, Jul 1

Gate run in `/root/baycast-dev` after `git fetch origin main` and `git merge --ff-only origin/main`.

Node: `v22.22.2`
Branch: `main`
Head at gate run: `035aff62e3d77ec5037c3b8d65fce7c55980683f`
forecasts read: no

The repo was already up to date with `origin/main` before the checks. No deterministic bug appeared during the gate run.

## Command results

`git diff --check`: passed. No whitespace errors.

`npm run verify:next-settlement-watch`: passed.

Result:

```text
next settlement watch: PASS
PASS FIFA opening match at least three goals: ok
PASS OpenAI public video generation model before July 1 2026: ok
PASS Microsoft first-party Xbox handheld before Aug 1 2026: ok
```

`npm run verify:distribution-gate`: passed.

Result:

```text
Verifying distribution gate at https://baycast-p.vercel.app
ok /settlements/apple-mac-pro-wwdc-2026
ok /questions?status=resolved
ok /
Distribution gate verification passed.
```

`npm run verify:public-bcp`: passed.

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

`npm test`: passed.

Result:

```text
Test Files  12 passed (12)
Tests       112 passed (112)
```

`rm -rf .next && npm run build`: passed.

Result:

```text
Next.js 14.2.16
Compiled successfully
Linting and checking validity of types passed
Generated static pages: 27/27
Build completed successfully
```
