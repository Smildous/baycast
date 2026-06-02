# AQ-305 dev verifier recheck, Jun 02 07h

Repo: `/root/baycast-dev`
Base after fetch and rebase: `a54f384`

## Scope

Recheck done from the dev clone. I did not inspect Supabase `forecasts` data.

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

```text
From https://github.com/Smildous/baycast
   1de2667..a54f384  main       -> origin/main
Successfully rebased and updated refs/heads/main.
```

### `git diff --check`

Passed. No whitespace errors reported.

### `npm run verify:public-bcp`

Passed.

```text
Verifying public BCP surfaces at https://baycast-p.vercel.app
ok /
ok /questions
ok /questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248
ok /leaderboard
ok /activity
Public BCP surface verification passed.
```

### `npm run verify:first-settlement-evidence`

Passed from `/root/baycast-dev`.

```json
{
  "ok": true,
  "mode": "readonly",
  "table": "questions",
  "checked_at": "2026-06-02T07:02:13.562Z",
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

The first-settlement verifier is read-only and reads from `questions` only. Its header says it reads questions only, never queries forecasts, and never writes to Supabase. The code uses `client.from('questions')` for schema probes and for the June candidate lookup. I found no `client.from('forecasts')` access in `scripts/first-settlement-evidence.mjs`.

## Final note

No code bug appeared during this recheck. No code changes were made.
