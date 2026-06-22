# AQ-449 Morning deployability gate, Jun 22

Base synced from `origin/main` before checks. Starting commit: `45149e4d3ff57db7d037e14148a626072529fbb3`.

## Checks run

| Check | Result | Summary |
| --- | --- | --- |
| `git diff --check` | PASS | No whitespace errors reported. |
| `npm run verify:next-settlement-watch` | PASS | Next settlement watch passed. FIFA opening match, OpenAI public video generation model, and Microsoft Xbox handheld watch items were all open and valid. |
| `npm run verify:distribution-gate` | PASS | Production distribution gate passed for `/settlements/apple-mac-pro-wwdc-2026`, `/questions?status=resolved`, and `/`. |
| `npm run verify:public-bcp` | PASS | Public BCP surfaces passed for `/`, `/questions`, one question detail page, `/leaderboard`, and `/activity`. |
| `npm test` | PASS | Vitest reported 12 test files passed and 110 tests passed. |
| `rm -rf .next && npm run build` | PASS | Next.js 14.2.16 production build compiled, typechecked, generated 27 static pages, and completed successfully. |

## Build verdict

Deployable. All requested AQ-449 morning deployability checks passed without code fixes.

## Code changes

None. This commit only records the deployability gate note.
