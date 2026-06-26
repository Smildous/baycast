# AQ-485 Morning deployability gate, Jun 26

Run at 2026-06-26 07:02 UTC from `/root/baycast-dev` on `origin/main` starting at `d7be052dac51a9567275096eafd4e5a6285d224e`.

Node: `v22.22.2`  
npm: `10.9.7`

## Result

Deployability gate passed. No code fix was needed.

## Checks

| Command | Result | Notes |
| --- | --- | --- |
| `git diff --check` | PASS | Clean before the gate document was added. |
| `npm run verify:next-settlement-watch` | PASS | Three watched questions present and open. |
| `npm run verify:distribution-gate` | PASS | Verified `/settlements/apple-mac-pro-wwdc-2026`, `/questions?status=resolved`, and `/` on the production URL. |
| `npm run verify:public-bcp` | PASS | Verified `/`, `/questions`, `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`, `/leaderboard`, and `/activity` on the production URL. |
| `npm test` | PASS | Vitest: 12 files passed, 112 tests passed. |
| `rm -rf .next && npm run build` | PASS | Next.js 14.2.16 production build completed. 27 static pages generated, dynamic routes listed by Next. |

## External auth

No external auth failure occurred during this gate.
