# AQ-536 Closing Soon fix, Jul 1 19h

## Scope

Fix `/questions?sort=closing-soon` and public card labels so they use the same deadline semantics after settlements.

## Reproduction in code

The inconsistency was in shared date logic:

- `daysRemaining()` clamps past deadlines to `0`, so an open card with an already passed `closes_at` could render `Closes today`.
- `isClosingSoon()` filtered past deadlines out of `/questions?sort=closing-soon`, so the same data could produce a zero closing-soon list.
- `autoCloseExpiredQuestions()` used `< now`, while the app phase logic treats `now >= closes_at` as closed.

## Change

- Added `hasQuestionClosed(closesAt)` in `lib/utils.ts`.
- Reused it in `isClosingSoon()` so deadlines at or before now are not closing soon.
- Reused it in `components/Countdown.tsx` so stale open rows with passed deadlines render `Closed`, not `Closes today`.
- Changed auto-close from `< closes_at` to `<= closes_at` to match `questionPhase()`.
- Added `__tests__/closing-soon-consistency.test.ts` for the zero-state edge case and future same-day case.

No forecasts were read for the fix.

## Commands and result

| Command | Result |
| --- | --- |
| `git fetch origin && git merge --ff-only origin/main` | Already up to date at `f98dbd65ad4cbc24e62dda7796d27e7bd8fef1b0` |
| `npm test -- --run __tests__/closing-soon-consistency.test.ts` | Passed, 2 tests |
| `git diff --check` | Passed |
| `npm test` | Passed, 13 files, 114 tests |
| `npm run verify:public-bcp` | Passed for `/`, `/questions`, sample question, `/leaderboard`, `/activity` |
| `rm -rf .next && npm run build` | Passed |

## Notes

Build emitted the existing webpack cache warning about serializing a large string. No build failure.
