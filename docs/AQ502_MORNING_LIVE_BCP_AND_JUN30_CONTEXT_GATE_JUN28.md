# AQ-502 Morning live BCP and Jun 30 context gate - Jun 28

Odin recovery note: the Product sub-agent timed out. Odin completed the gate directly from the Product clone and canonical verifier.

## Scope

Checked public Baycast surfaces that can leak Blind Consensus data before a forecast:

- `/`
- `/questions`
- `/questions?sort=closing-soon`
- `/questions?status=resolved`
- `/leaderboard`
- `/activity`
- FIFA Jun 30 detail page
- OpenAI Jun 30 detail page

No forecast table was read.

## Commands

Product clone:

```bash
npm run verify:public-bcp
npm run verify:next-settlement-watch
```

Result:

- `verify:public-bcp`: PASS.
- `verify:next-settlement-watch`: blocked in Product clone because Supabase env is unavailable there.

Canonical clone cross-check:

```bash
cd /root/baycast
npm run verify:next-settlement-watch
```

Result: PASS.

Candidates confirmed by canonical verifier:

- FIFA opening match at least three goals: open, closes 2026-06-30T23:59:59+00:00.
- OpenAI public video generation model before July 1 2026: open, closes 2026-06-30T23:59:59+00:00.
- Microsoft first-party Xbox handheld before Aug 1 2026: open, closes 2026-07-31T23:59:59+00:00.

## Browser checks

FIFA detail page:

- Title: `Will the 2026 FIFA World Cup opening match have at least three total goals? - Baycast`.
- Context link: `FIFA World Cup 2026`.
- Visible state: community signal locked, no consensus percentage, no forecaster count.
- DOM check: `aggregate_probability=0`, forecast count leak terms `0`, `settled_by=false`, `evidence_doc=false`.

OpenAI detail page:

- Title: `Will OpenAI release a new public video generation model before July 1, 2026? - Baycast`.
- Context links: `OpenAI news and research updates`, `OpenAI ChatGPT release notes`.
- Visible state: community signal locked, no consensus percentage, no forecaster count.
- DOM check: `aggregate_probability=0`, forecast count leak terms `0`, `settled_by=false`, `evidence_doc=false`.

## Verdict

PASS.

Public BCP surfaces stayed clean. Jun 30 context links remain official-only and relevant. The Product clone still lacks Supabase env for the next-settlement verifier, but the canonical clone passed the same read-only gate. No forecasts were read.
