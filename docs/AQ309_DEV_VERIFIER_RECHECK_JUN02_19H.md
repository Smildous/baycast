# AQ-309 dev verifier recheck, 2026-06-02 19h UTC

## Scope

Recheck done from `/root/baycast-dev` after syncing `main` to `origin/main`.

Goal: repeat the AQ-309 public BCP and first-settlement evidence gates without reading Supabase `forecasts`.

## Commands run

```bash
git fetch origin main
git checkout main
git reset --hard origin/main
git diff --check
npm run verify:public-bcp
npm run verify:first-settlement-evidence
```

## Output summary

### `git diff --check`

Passed. No whitespace errors reported.

### `npm run verify:public-bcp`

Passed against `https://baycast-p.vercel.app`.

Checked surfaces:

- `/`
- `/questions`
- `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`
- `/leaderboard`
- `/activity`

Result: `Public BCP surface verification passed.`

### `npm run verify:first-settlement-evidence`

Passed.

Key output:

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

## Forecast read check

Confirmed by inspecting `scripts/first-settlement-evidence.mjs` before running the verifier.

The script states it reads questions only and never queries forecasts. The actual Supabase calls use `client.from('questions')` for schema probes and the June candidate lookup. There is no `client.from('forecasts')` call and no forecasts table access in the script.

The command output also reports:

```json
"mode": "readonly",
"table": "questions"
```

No Supabase forecasts were read during this recheck.

## Verdict

AQ-309 dev verifier recheck passed.

- Public BCP gate: passed.
- First-settlement evidence gate: passed.
- Settlement verifier table scope: `questions` only.
- Forecasts: not read.

## Remediation

None needed.
