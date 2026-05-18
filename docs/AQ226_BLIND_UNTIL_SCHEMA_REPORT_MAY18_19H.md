# AQ-226 blind_until schema report, May 18 19H

## Summary

Live DB is not safe for AI forecast live writes yet.

The live `public.questions` table does not expose `questions.blind_until` through Supabase PostgREST. A service-role select that included `blind_until` failed with Postgres error `42703: column questions.blind_until does not exist`.

Because the column is absent, recent question rows cannot have usable `blind_until` values. AI forecast live writes should remain paused until the schema is migrated and open rows are backfilled with active blind-phase timestamps.

## Exact query method

Working directory: `/root/baycast`.

Environment source: existing `.env.local`, using `SUPABASE_URL` or `NEXT_PUBLIC_SUPABASE_URL` plus `SUPABASE_SERVICE_ROLE_KEY`. Secrets were not printed.

Node method:

```js
const { createClient } = require('@supabase/supabase-js')
const supabase = createClient(url, serviceRoleKey, {
  auth: { persistSession: false, autoRefreshToken: false },
})

await supabase
  .from('questions')
  .select('id,created_at,status,opens_at,closes_at,blind_until,title')
  .order('created_at', { ascending: false })
  .limit(10)
```

Result:

```json
{
  "ok": false,
  "phase": "probe",
  "code": "42703",
  "message": "column questions.blind_until does not exist",
  "details": null
}
```

A second read-only query omitted `blind_until` to verify live row counts and recent rows:

```js
await supabase.from('questions').select('id', { count: 'exact', head: true })
await supabase.from('questions').select('id', { count: 'exact', head: true }).eq('status', 'open')
await supabase.from('forecasts').select('id', { count: 'exact', head: true })
await supabase.from('profiles').select('id', { count: 'exact', head: true })
await supabase
  .from('questions')
  .select('id,created_at,status,opens_at,closes_at,title')
  .order('created_at', { ascending: false })
  .limit(10)
```

Counts:

```json
{
  "total_questions": 44,
  "open_questions": 44,
  "forecasts": 11,
  "profiles": 4
}
```

Recent rows checked were all open and created at `2026-05-14T17:55:38.310068+00:00`. Since `blind_until` is absent, none can be considered usable for AI live forecast safety.

Recent row titles checked:

1. Will Meta release open weights for a new Llama model with at least 400 billion parameters before September 1, 2026?
2. Will US nonfarm payrolls for June 2026 be below 100,000?
3. Will Microsoft announce a new first-party Xbox handheld before August 1, 2026?
4. Will OpenAI release a new public video generation model before July 1, 2026?
5. Will Google DeepMind announce a gold-medal level result at IMO 2026?
6. Will US core CPI for May 2026 be 0.3 percent month over month or higher?
7. Will Apple announce a foldable iPhone before September 30, 2026?
8. Will Apple announce a new Mac Pro at WWDC 2026?
9. Will the 2026 FIFA World Cup opening match have at least three total goals?
10. Will the ECB cut its deposit facility rate at its June 2026 monetary policy meeting?

## Safety patch created

Created `sql/migration_006_aq226_blind_until_live_safety.sql` but did not execute it against live DB.

The migration:

- Adds `public.questions.blind_until` if missing.
- Adds the `idx_questions_blind_until` index if missing.
- Backfills existing open questions that have enough time before close with a short active blind phase.
- Returns any open rows that remain unsafe after backfill.

Code was also tightened so `/api/agent/forecast` selects `blind_until` and refuses to forecast unless the question has an active, valid blind phase before `closes_at`. This keeps AI live writes blocked on the current live schema instead of silently writing to questions without a usable blind phase.

## Conclusion

AQ-226 live schema result: `questions.blind_until` does not exist in the live database. Recent rows therefore do not have usable `blind_until` values. It is not safe to resume AI forecast live writes until the migration is reviewed, applied, and verified with the same service-role probe.
