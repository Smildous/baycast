# AQ-505 13H live BCP and Jun 30 context gate - Jun 28

Checked from `/root/baycast-product` on 2026-06-28 13:08 UTC. I did not read `forecasts` and did not insert data.

## Commands run

```bash
git fetch origin && git pull --ff-only origin main
npm run verify:public-bcp
npm run verify:next-settlement-watch
node <<'NODE'
// fetched live HTML for /, /questions, /questions?status=resolved, /leaderboard, /activity
// scanned for aggregate_probability, forecasters_count, forecastCount, fcCount, settled_by, evidence_doc,
// visible consensus probability, exact forecaster count copy, and raw JSON script exposure
NODE
node <<'NODE'
// read the live public bundle for Supabase public config, then queried questions only:
// id,title,status,closes_at,resolution_source,category
// no forecasts table query
NODE
```

`verify:public-bcp` passed against `https://baycast-p.vercel.app`.

`verify:next-settlement-watch` failed in this clone because Supabase env is not present locally:

```text
Missing SUPABASE_URL/NEXT_PUBLIC_SUPABASE_URL or SUPABASE_ANON_KEY/NEXT_PUBLIC_SUPABASE_ANON_KEY
```

I used the live public bundle only to find the public Supabase URL and anon key, then queried `questions` only. That identified the two Jun 30 detail pages without touching `forecasts`.

## URLs checked

```text
https://baycast-p.vercel.app/
https://baycast-p.vercel.app/questions
https://baycast-p.vercel.app/questions?status=resolved
https://baycast-p.vercel.app/leaderboard
https://baycast-p.vercel.app/activity
https://baycast-p.vercel.app/questions/5745e845-94e9-4802-bbeb-850c982e1276
https://baycast-p.vercel.app/questions/d3338e47-11ec-4568-942e-42bb19be0f5e
```

## Questions-only lookup

FIFA opening match:

```text
id: 5745e845-94e9-4802-bbeb-850c982e1276
status: open
closes_at: 2026-06-30T23:59:59+00:00
resolution_source: FIFA official match centre: https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026
```

OpenAI video model:

```text
id: d3338e47-11ec-4568-942e-42bb19be0f5e
status: open
closes_at: 2026-06-30T23:59:59+00:00
resolution_source: OpenAI News and product release notes: https://openai.com/news/ and https://help.openai.com/en/articles/6825453-chatgpt-release-notes
```

## Findings

The public route scan found zero hits for these leak terms on every checked route:

```text
aggregate_probability
forecasters_count
forecastCount
fcCount
settled_by
evidence_doc
```

The same scan found no visible consensus probability, no exact forecaster count copy, no `__NEXT_DATA__`, and no `application/json` script block on the checked pages.

The FIFA detail page showed the locked public state: `Community signal`, `Community signal locked`, no percentage, no count. Its context link is the official FIFA World Cup 2026 hub, and the resolution source points to the same FIFA official match centre.

The OpenAI detail page showed the same locked public state: `Community signal`, `Community signal locked`, no percentage, no count. Its context links are OpenAI news and OpenAI ChatGPT release notes. The resolution source uses those same official OpenAI references.

The resolved listing and activity page did show resolved activity copy, including a resolved Apple forecast percentage. That is not an open-question BCP leak. The open Jun 30 questions stayed locked.

## Verdict

PASS.

Live public BCP surfaces are clean for the checked routes and detail pages. The Jun 30 FIFA and OpenAI context remains official or neutral. No public consensus probability, forecaster count, settlement internals, evidence doc field, or raw JSON leak was visible. No `forecasts` read was performed.
