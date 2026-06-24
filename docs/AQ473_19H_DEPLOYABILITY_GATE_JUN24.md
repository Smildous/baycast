# AQ473 19h deployability gate, Jun 24

Run time: 2026-06-24 19:03 UTC
Repo: `/root/baycast-dev`
Base commit before doc: `206f35d8a8b19c0a50e238c8e4933fccb8ca86e2`

## Versions

- Node: `v22.22.2`
- npm: `10.9.7`
- app: `baycast@0.1.0`
- Next.js: `14.2.16`
- Vitest: `^4.1.5`
- React: `^18`
- TypeScript: `^5`

## Sync

Command:

```bash
git fetch origin && git pull --ff-only origin main
```

Result: PASS

Output summary:

```text
From https://github.com/Smildous/baycast
 * branch            main       -> FETCH_HEAD
Already up to date.
```

## Checks

| Command | Result | Notes |
| --- | --- | --- |
| `git diff --check` | PASS | No whitespace errors. |
| `npm run verify:next-settlement-watch` | PASS | FIFA opening match, OpenAI public video model, and Microsoft first-party Xbox handheld checks all passed. |
| `npm run verify:distribution-gate` | PASS | Verified `/settlements/apple-mac-pro-wwdc-2026`, `/questions?status=resolved`, and `/` on `https://baycast-p.vercel.app`. |
| `npm run verify:public-bcp` | PASS | Verified `/`, `/questions`, `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`, `/leaderboard`, and `/activity` on `https://baycast-p.vercel.app`. |
| `npm test` | PASS | 12 test files passed. 112 tests passed. Node 22 passed, no Node 20 retry needed. |

Vitest result:

```text
Test Files  12 passed (12)
Tests       112 passed (112)
Duration    12.88s
```

## Clean Next build

Command:

```bash
rm -rf .next && npm run build
```

Result: PASS

Build result:

```text
Next.js 14.2.16
Compiled successfully
Linting and checking validity of types passed
Generated static pages: 27/27
Build traces collected
```

Note: the build read `.env.local`, but this file was not modified or committed.

## Fixes

No product fix was needed. The gate only adds this document.

## Verdict

PASS. The 2026-06-24 19h deployability gate is clean with 112 tests passing and a successful clean Next build.
