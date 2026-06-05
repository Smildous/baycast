# AQ-323 dev verifier recheck, Jun 05 07h

Clone used: `/root/baycast-dev`.

Sync command run before checks:

```text
git fetch origin && git reset --hard origin/main
HEAD is now at 829e2c3 docs(AQ-321): add product live recheck at 19h
```

Result: verifiers passed. No code changes were made.

Forecast data: not read. The first-settlement verifier output is `mode: "readonly"` and `table: "questions"`. It does not report any read from `forecasts`.

## git diff --check

Command:

```text
git diff --check
```

Output:

```text
```

Exit code: 0

## npm run verify:public-bcp

Command:

```text
npm run verify:public-bcp
```

Output:

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

Exit code: 0

## npm run verify:first-settlement-evidence

Command:

```text
npm run verify:first-settlement-evidence
```

Output:

```text
> baycast@0.1.0 verify:first-settlement-evidence
> node scripts/first-settlement-evidence.mjs

{
  "ok": true,
  "mode": "readonly",
  "table": "questions",
  "checked_at": "2026-06-05T07:01:36.374Z",
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

Exit code: 0
