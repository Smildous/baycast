# AQ-303 dev verifier recheck, Jun 01 19h

Repo: `/root/baycast-dev`
Base after fetch and rebase: `d7321d7`

## Scope

Recheck done from a clean dev clone. I did not inspect Supabase `forecasts` data.

## Commands run

```bash
git fetch origin
git rebase origin/main
git diff --check
npm run verify:public-bcp
npm run verify:first-settlement-evidence
```

## Results

### `git fetch origin` and `git rebase origin/main`

Fetched `origin/main` and rebased local `main` successfully.

Summary output:

```text
From https://github.com/Smildous/baycast
   d1ab274..d7321d7  main       -> origin/main
Successfully rebased and updated refs/heads/main.
```

### `git diff --check`

Passed. No whitespace errors reported.

### `npm run verify:public-bcp`

Passed.

Summary output:

```text
Verifying public BCP surfaces at https://baycast-p.vercel.app
ok /
ok /questions
ok /questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248
ok /leaderboard
ok /activity
Public BCP surface verification passed.
```

BCP verdict: public BCP surfaces are reachable and the verifier passed.

### `npm run verify:first-settlement-evidence`

Passed.

Summary output:

```json
{
  "ok": true,
  "mode": "readonly",
  "table": "questions",
  "candidate_reason": "Apple Mac Pro exact match",
  "candidate": {
    "title": "Will Apple announce a new Mac Pro at WWDC 2026?",
    "status": "open",
    "closes_at": "2026-06-13T00:00:00+00:00",
    "resolution_source": "Apple WWDC and Apple Newsroom: https://developer.apple.com/wwdc26/ and https://www.apple.com/newsroom/",
    "resolution_url": null
  }
}
```

Candidate status: `open`.

Candidate close: `2026-06-13T00:00:00+00:00`.

## Forecast access check

The first-settlement verifier is readonly and reads from `questions` only. The script header states it reads questions only, never queries forecasts, and never writes to Supabase. The code uses `client.from('questions')` for schema probes and the June candidate lookup. I found no `client.from('forecasts')` access in `scripts/first-settlement-evidence.mjs`.

## Final note

No code bug appeared during this recheck. No code changes were made.
