# AQ-327 dev verifier recheck, 2026-06-05 19h UTC

Timestamp: 2026-06-05 19h UTC.

I synced `main` first with:

```bash
git fetch origin
git checkout main
git pull --ff-only origin main
```

The branch fast-forwarded to `b504960` before this check. I did not modify the existing AQ325 or AQ326 files.

Commands run from `/root/baycast-dev`:

```bash
git diff --check
npm run verify:public-bcp
npm run verify:first-settlement-evidence
```

Result summary:

`git diff --check` passed with no whitespace errors.

`npm run verify:public-bcp` passed against `https://baycast-p.vercel.app`:

```text
ok /
ok /questions
ok /questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248
ok /leaderboard
ok /activity
Public BCP surface verification passed.
```

`npm run verify:first-settlement-evidence` passed:

```json
{
  "ok": true,
  "mode": "readonly",
  "table": "questions",
  "checked_at": "2026-06-05T19:01:16.390Z",
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

I checked `scripts/first-settlement-evidence.mjs` for the read path. It declares that it reads questions only and never queries forecasts or writes to Supabase. The actual Supabase calls are `client.from('questions').select(...)` for column checks and candidate lookup. No `forecasts` table read happened.

Settlement timing rule: the first settlement candidate is `Will Apple announce a new Mac Pro at WWDC 2026?`, closing at `2026-06-13T00:00:00+00:00`. No settlement before close. Settle only after the close time and after the public source directly answers the question. Evidence prep must stay public and must not inspect protected Blind Consensus data or forecasts for open questions.
