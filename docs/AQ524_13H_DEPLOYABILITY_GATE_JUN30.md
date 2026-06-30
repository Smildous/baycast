# AQ-524 13h deployability gate, Jun 30

Run in `/root/baycast-dev` after a fast-forward to `origin/main`.

Commit checked before the gate: `4c330bf test(AQ-521): add Jun 30 morning deployability gate`.

Forecast rows read: no.

Code changes: none.

Node used: `v22.22.2` with npm `10.9.7`. No Rolldown/styleText issue appeared, so no Node 20 retry was needed.

Commands run and result:

`git fetch origin && git checkout main && git reset --hard origin/main && git status --short --branch`

Passed. Branch was `main`, hard reset to `origin/main`, status clean.

`node -v && npm -v && git diff --check && npm run verify:next-settlement-watch && npm run verify:distribution-gate && npm run verify:public-bcp && npm test && rm -rf .next && npm run build`

Passed.

`git diff --check` returned clean.

`npm run verify:next-settlement-watch` passed:

- FIFA opening match at least three goals: open, close time `2026-06-30T23:59:59+00:00`
- OpenAI public video generation model before July 1 2026: open, close time `2026-06-30T23:59:59+00:00`
- Microsoft first-party Xbox handheld before Aug 1 2026: open, close time `2026-07-31T23:59:59+00:00`

`npm run verify:distribution-gate` passed against `https://baycast-p.vercel.app`:

- `/settlements/apple-mac-pro-wwdc-2026`
- `/questions?status=resolved`
- `/`

`npm run verify:public-bcp` passed against `https://baycast-p.vercel.app`:

- `/`
- `/questions`
- `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`
- `/leaderboard`
- `/activity`

`npm test` passed. Vitest reported 12 test files passed and 112 tests passed.

`rm -rf .next && npm run build` passed. Next.js 14.2.16 compiled successfully, type checks passed, page data collected, and 27 static pages generated.

Result: deployability and protocol gates are green for AQ-524 at 13h. No forecast rows were read and no code fix was needed.
