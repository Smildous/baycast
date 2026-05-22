# AQ-243 public BCP recheck, May 22, 13h UTC

## Scope

Production BCP surface recheck for Baycast public pages, plus the direct Apple question route:

`/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`

The direct route was added to `scripts/verify-public-bcp-surfaces.mjs` so this check stays covered by the normal verifier.

## Commands and results

### Reset

Command:

```sh
git fetch origin && git reset --hard origin/main
```

Result:

```text
HEAD is now at e996c6a feat(AQ-241): add public BCP surface verifier
```

### Existing public BCP verifier before the route change

Command:

```sh
npm run verify:public-bcp
```

Result:

```text
Verifying public BCP surfaces at https://baycast-p.vercel.app
ok /
ok /questions
ok /leaderboard
ok /activity
Public BCP surface verification passed.
```

Finding: the direct question route was not covered yet.

### Direct production HTML check

Route checked:

```text
https://baycast-p.vercel.app/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248
```

Result:

```text
status 200 OK
content-type text/html; charset=utf-8
bytes 43757
aggregate_probability: 0
forecasters_count: 0
forecastCount: 0
fcCount: 0
forecaster: 0
consensus: 0
bet: 12
odds: 0
wager: 0
exact forecaster count patterns: none
```

The `bet` hits were false positives inside layout text and class names like `between`. No betting or wager copy was found.

### Verifier after adding the direct route

Command:

```sh
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

### Tests

Command:

```sh
npm test
```

Result:

```text
Test Files  11 passed (11)
Tests  107 passed (107)
```

### TypeScript

Command:

```sh
npx tsc --noEmit --pretty false
```

Result: passed with exit code 0.

## Conclusion

Production is clean for the checked public BCP fields and copy on the direct Apple question route. The public verifier now includes that route and also checks `forecastCount` and `fcCount` field names. This keeps the direct route in the recurring BCP QA path instead of relying on a one-off manual check.
