# AQ-455 19h deployability gate, Jun 22

Verdict: deployable.

Run location: `/root/baycast-dev`
Baseline commit: `17e4382`
Node: `v22.22.2`
npm: `10.9.7`

## Sync

`git fetch origin && git pull --ff-only origin main`

Result: pass. The branch was already up to date with `origin/main`.

## Gates

`git diff --check`

Result: pass. No whitespace errors reported.

`npm run verify:next-settlement-watch`

Result: pass.

Checked open next settlement watch items:

- FIFA opening match at least three goals: ok
- OpenAI public video generation model before July 1 2026: ok
- Microsoft first-party Xbox handheld before Aug 1 2026: ok

`npm run verify:distribution-gate`

Result: pass against `https://baycast-p.vercel.app`.

Checked:

- `/settlements/apple-mac-pro-wwdc-2026`
- `/questions?status=resolved`
- `/`

`npm run verify:public-bcp`

Result: pass against `https://baycast-p.vercel.app`.

Checked:

- `/`
- `/questions`
- `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`
- `/leaderboard`
- `/activity`

`npm test`

Result: pass.

- Test files: 12 passed
- Tests: 110 passed
- Duration: 12.35s

`rm -rf .next && npm run build`

Result: pass.

- Next.js 14.2.16 production build completed
- Compiled successfully
- Type and lint checks passed
- Static page generation completed, 27 of 27 pages
- Build traces collected

## Notes

No code changes were needed. Vitest and the production build both ran successfully on Node `v22.22.2`, so no Node 20 retry was required.
