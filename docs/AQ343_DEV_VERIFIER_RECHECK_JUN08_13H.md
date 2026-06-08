# AQ-343 dev verifier recheck, Jun 08 13h

Repo: `/root/baycast-dev`

## Scope

Recheck done from `main` after:

```sh
git fetch origin && git checkout main && git pull --ff-only origin main
```

Result:

```text
Already on 'main'
Your branch is up to date with 'origin/main'.
From https://github.com/Smildous/baycast
 * branch            main       -> FETCH_HEAD
Already up to date.
```

No `forecasts` table was queried or read for this recheck.

## Command results

### `git diff --check`

Exit code: 0

```text
```

### `npm run verify:public-bcp`

Exit code: 0

```text
> baycast@0.1.0 verify:public-bcp
> node scripts/verify-public-bcp-surfaces.mjs

Verifying public BCP surfaces at https://baycast-p.vercel.app
ok /
ok /questions
ok /questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248
ok /leaderboard
ok /activity
Public BCP surface verification passed.
```

### `npm run verify:first-settlement-evidence`

Exit code: 0

```json
{
  "ok": true,
  "mode": "readonly",
  "table": "questions",
  "checked_at": "2026-06-08T13:01:45.048Z",
  "candidate_reason": "Apple Mac Pro exact match",
  "candidate": {
    "title": "Will Apple announce a new Mac Pro at WWDC 2026?",
    "status": "open",
    "closes_at": "2026-06-13T00:00:00+00:00",
    "resolution_source": "Apple WWDC and Apple Newsroom: https://developer.apple.com/wwdc26/ and https://www.apple.com/newsroom/",
    "resolution_url": null
  },
  "checklist": [
    "Confirm the candidate title matches the intended first settlement.",
    "Open the public source URL before settlement.",
    "Capture source title, publisher, URL, and retrieval timestamp.",
    "Save public evidence only. Do not inspect protected Blind Consensus data for open questions.",
    "Settle only after close time and after the source directly answers the question."
  ]
}
```

## First-settlement verifier table use

The verifier reads only `questions`.

Evidence from `scripts/first-settlement-evidence.mjs`:

- Header says: `Reads questions only. It never queries forecasts and never writes to Supabase.`
- Column probes use `client.from('questions')`.
- Candidate lookup uses `client.from('questions').select(...)`.
- The verifier output reports `"mode": "readonly"` and `"table": "questions"`.

## Apple Mac Pro candidate

Status from verifier output: `open`

Close timestamp from verifier output: `2026-06-13T00:00:00+00:00`

Candidate reason: `Apple Mac Pro exact match`
