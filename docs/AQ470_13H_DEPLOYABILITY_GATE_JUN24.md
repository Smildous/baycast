# AQ-470 13h deployability gate, Jun 24

Run from `/root/baycast-dev` after a fast-forward check against `origin/main`.

Head at the start: `a446cd41f10ff13b25d838ffafd50405626b4f78`.
Node used: `v22.22.2`.
npm used: `10.9.7`.

Result: deployable. All requested gates passed. No code fix was needed. No Node 20 retry was needed because Vitest passed on Node 22.

## Fast-forward

Command:

```bash
git status --short && git branch --show-current && git fetch origin main && git merge --ff-only origin/main
```

Result:

```text
main
From https://github.com/Smildous/baycast
 * branch            main       -> FETCH_HEAD
Already up to date.
```

`git status --short` had no output, so the tree was clean before the run.

## git diff check

Command:

```bash
git diff --check
```

Result: no output, exit 0.

## next settlement watch

Command:

```bash
npm run verify:next-settlement-watch
```

Result:

```text
next settlement watch: PASS
PASS FIFA opening match at least three goals: ok
  5745e845-94e9-4802-bbeb-850c982e1276 | open | 2026-06-30T23:59:59+00:00 | Will the 2026 FIFA World Cup opening match have at least three total goals?
PASS OpenAI public video generation model before July 1 2026: ok
  d3338e47-11ec-4568-942e-42bb19be0f5e | open | 2026-06-30T23:59:59+00:00 | Will OpenAI release a new public video generation model before July 1, 2026?
PASS Microsoft first-party Xbox handheld before Aug 1 2026: ok
  5cc9fe74-5306-49d9-bec3-251ad276a779 | open | 2026-07-31T23:59:59+00:00 | Will Microsoft announce a new first-party Xbox handheld before August 1, 2026?
```

## distribution gate

Command:

```bash
npm run verify:distribution-gate
```

Result:

```text
Verifying distribution gate at https://baycast-p.vercel.app
ok /settlements/apple-mac-pro-wwdc-2026
ok /questions?status=resolved
ok /
Distribution gate verification passed.
```

## public BCP surfaces

Command:

```bash
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

## test suite

Command:

```bash
npm test
```

Result:

```text
Test Files  12 passed (12)
Tests       112 passed (112)
Duration    13.26s
```

## clean Next build

Command:

```bash
rm -rf .next && npm run build
```

Result:

```text
Next.js 14.2.16
Compiled successfully
Linting and checking validity of types passed
Generated static pages: 27/27
Build completed with exit 0
```

The build printed the known webpack cache warning about serializing a 215 KiB string. It did not fail the build.
