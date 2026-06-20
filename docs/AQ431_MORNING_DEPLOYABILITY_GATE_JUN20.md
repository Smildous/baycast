# AQ-431 morning deployability gate, Jun 20

Morning gate run from `/root/baycast-dev` after syncing `main`.

## Sync

Command:

```bash
git fetch origin && git pull --ff-only origin main
```

Result: pass. Clone was already up to date with `origin/main`.

## Gates

| Gate | Command | Result |
| --- | --- | --- |
| Working tree whitespace check | `git diff --check` | Pass. No output. |
| Next settlement watch | `npm run verify:next-settlement-watch` | Pass. All three watched questions returned ok. |
| Distribution gate | `npm run verify:distribution-gate` | Pass. `/settlements/apple-mac-pro-wwdc-2026`, `/questions?status=resolved`, and `/` returned ok from `https://baycast-p.vercel.app`. |
| Public BCP surfaces | `npm run verify:public-bcp` | Pass. `/`, `/questions`, `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`, `/leaderboard`, and `/activity` returned ok from `https://baycast-p.vercel.app`. |
| Unit and integration tests | `npm test` | Pass. 12 test files passed. 110 tests passed. |
| Clean Next build | `rm -rf .next && npm run build` | Pass. Production build compiled, type checks completed, 27 static pages generated. |

## Test count

`npm test` reported:

```text
Test Files  12 passed (12)
Tests       110 passed (110)
```

## Build status

Clean build passed with `rm -rf .next && npm run build`.

Build output reported:

```text
Compiled successfully
Linting and checking validity of types ...
Generating static pages (27/27)
Finalizing page optimization ...
Collecting build traces ...
```

## Non-blocking warning

The build emitted one webpack cache performance warning:

```text
[webpack.cache.PackFileCacheStrategy] Serializing big strings (215kiB) impacts deserialization performance (consider using Buffer instead and decode when needed)
```

This did not block the build.

## Deployability call

Deployable from these gates. No code or test fix was needed.
