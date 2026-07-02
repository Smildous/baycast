# AQ-539 dev deployability and score gate, Jul 02 13H

Run time: 2026-07-02 13:04:44 UTC
Branch: main
Base commit before AQ-539 evidence commit: 90e83b82a1f56a7e30657b444d8c35a83ed39546
Workspace: /root/baycast-dev

## Gate result

Pass after adding the missing score surface BCP regression test.

## Repository prep

- Created this evidence file first, as requested.
- `git pull --ff-only origin main`: already up to date.
- Status after fast-forward had only the new AQ-539 evidence file, then later the new regression test.

## Commands run

- `git diff --check`: pass.
- `npm run verify:next-settlement-watch`: pass.
  - FIFA opening match at least three goals: resolved.
  - OpenAI public video generation model before July 1 2026: resolved.
  - Microsoft first-party Xbox handheld before Aug 1 2026: open.
- `npm run verify:distribution-gate`: pass.
  - Checked `/settlements/apple-mac-pro-wwdc-2026`, `/questions?status=resolved`, and `/` on `https://baycast-p.vercel.app`.
- `npm run verify:public-bcp`: pass.
  - Checked `/`, `/questions`, `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`, `/leaderboard`, and `/activity` on `https://baycast-p.vercel.app`.
- `npm test`: pass before the regression addition.
  - 13 files passed, 114 tests passed.
- `npm run build`: pass before the regression addition.
- After adding the regression test, reran `git diff --check && npm test && npm run build`: pass.
  - 14 files passed, 117 tests passed.
  - Next 14.2.16 production build compiled, type checked, generated 27 static pages, and completed successfully.

## Score surface BCP test inspection

I inspected the public score surfaces and tests for resolved activity and leaderboard BCP payload safety.

Findings:

- `app/activity/page.tsx` already uses an inner questions join and filters with `.eq('questions.status', 'resolved')` before exposing forecast probabilities.
- `app/leaderboard/page.tsx` builds all-time ranking from `leaderboard` and filtered period ranking from `scores`, not from raw `forecasts` payloads.
- Existing tests covered activity copy and public BCP route HTML, but there was no deterministic source-level regression test pinning activity to resolved questions and leaderboard to score surfaces.

Fix:

- Added `__tests__/public-score-surfaces-bcp.test.ts`.
- The new test asserts activity stays scoped to resolved questions before showing forecast payloads.
- The new test asserts activity does not expose open-question consensus payload fields.
- The new test asserts leaderboard uses `leaderboard` and `scores`, not raw `forecasts`, and does not query forecast prediction payloads.

## Known blockers

No gate failure was caused by the known blockers in this run. The known blockers remain contextual only:

- GitHub API 401.
- `scores.log_score` live DDL missing.
- `blind_until` DDL missing.
