# AQ-227 blind_until rollout gate, May 19

Baycast is a prediction polling protocol, not gambling. The point of this gate is simple: protect Blind Consensus before letting AI agents write live forecasts again. If a user or an agent can see consensus or participation before forecasting, the protocol is broken.

Current live facts at 2026-05-19 07:00 UTC:

- 44 open questions
- 11 forecasts
- 4 profiles
- the live `questions.blind_until` column is missing
- AI forecast writes are paused
- the migration file exists at `sql/migration_006_aq226_blind_until_live_safety.sql`

## Gate decision

Do not unblock AI forecast writes yet.

Apply `sql/migration_006_aq226_blind_until_live_safety.sql` first, from the Supabase SQL Editor, after reading the full script in place. The gate passes only when the live database proves that every open question eligible for AI forecasting has a valid active blind phase.

A question is eligible for the first AI dry run only if all of this is true:

- `status = 'open'`
- `blind_until` exists
- `blind_until is not null`
- `blind_until > now()`
- `blind_until < closes_at`
- no public API, page, card, leaderboard, profile, activity feed, notification, cache, or agent prompt exposes consensus, forecast count, participant count, or individual forecast data before the submitted forecast is stored

If any one of those checks fails, keep AI writes paused. Manual human forecasts can continue only through the normal blind UI.

## Verification checklist after migration

Run these checks immediately after the migration. Save the results with the rollout notes.

1. Confirm the column exists.

```sql
select column_name, data_type, is_nullable
from information_schema.columns
where table_schema = 'public'
  and table_name = 'questions'
  and column_name = 'blind_until';
```

Expected result: one row, `blind_until`, `timestamp with time zone`, nullable allowed.

2. Confirm the index exists.

```sql
select indexname, indexdef
from pg_indexes
where schemaname = 'public'
  and tablename = 'questions'
  and indexname = 'idx_questions_blind_until';
```

Expected result: one row for `idx_questions_blind_until`.

3. Count open questions and classify blind safety.

```sql
select
  count(*) filter (where status = 'open') as open_questions,
  count(*) filter (
    where status = 'open'
      and blind_until is not null
      and blind_until > now()
      and blind_until < closes_at
  ) as open_with_active_blind_phase,
  count(*) filter (
    where status = 'open'
      and (blind_until is null or blind_until <= now() or blind_until >= closes_at)
  ) as open_unsafe_for_ai
from public.questions;
```

Expected result: `open_questions = 44`. The gate passes only if `open_unsafe_for_ai = 0`, or if every unsafe row is explicitly excluded from the AI dry run by question id.

4. Inspect unsafe rows, if any.

```sql
select id, title, status, closes_at, blind_until
from public.questions
where status = 'open'
  and (blind_until is null or blind_until <= now() or blind_until >= closes_at)
order by closes_at asc;
```

Expected result: zero rows for a full unblock. If rows appear, AI writes stay paused for those ids.

5. Confirm existing forecasts were not changed.

```sql
select count(*) as forecasts from public.forecasts;
```

Expected result: `forecasts = 11` before and after the migration.

6. Confirm profiles were not changed.

```sql
select count(*) as profiles from public.profiles;
```

Expected result: `profiles = 4` before and after the migration.

7. Check that the public question read path includes `blind_until` but does not leak the crowd during an active blind phase.

Use an anonymous session and an account with no forecast on a selected active blind question. Open the question page and the questions list. Before forecasting, the UI must show the question, criteria, close date, and the forecast control. It must not show consensus, forecast count, participant count, distribution, individual forecasts, or profile evidence that lets someone infer participation.

8. Submit one controlled human forecast on a safe question.

After submit, the forecast must store once, the user may see the allowed post-forecast view, and no other open blind question should reveal its crowd state.

9. Run one AI dry-run write with logging on and a hard cap of five questions.

The agent must reject any question whose `blind_until` is missing, expired, or after `closes_at`. The log should include the question id, `blind_until`, `closes_at`, and the allow or reject decision. It should not log secrets.

10. Recheck counts after the dry run.

```sql
select count(*) as forecasts from public.forecasts;
select count(*) as profiles from public.profiles;
```

Expected result: forecasts increase only by the number of accepted dry-run writes. Profiles stay at 4 unless a known test profile was intentionally created.

## First dry-run AI forecast candidates

Pick five from open questions that pass the active blind check. These are good first candidates because they have clear resolution sources and do not depend on Baycast internal state.

1. Will Microsoft announce cumulative AI infrastructure spending of $100 billion or more for fiscal year 2026?

2. Will the European Commission issue a fine of €5 billion or more to a single company for violating the Digital Services Act before September 30, 2026?

3. Will a Level 4 autonomous vehicle service be commercially available to the general public in at least 3 US cities before September 30, 2026?

4. Will Germany enter a technical recession at any point before September 30, 2026?

5. Will the Reserve Bank of Australia cut the cash rate at any board meeting before September 30, 2026?

Do not use any of them if the post-migration check says the blind phase is invalid. The candidate list is not an override.

## BCP risks

The main BCP risk is a false unblock: AI forecasts resume while one or more open questions still expose consensus or participation. That would contaminate the comparison between human and AI forecasting and make the blind data hard to trust.

The second risk is a partial schema rollout. If app code expects `blind_until` but one environment lacks it, question pages or agent writes can fail in production. Keep the pause switch available until the live schema, read paths, and write paths are all checked.

The third risk is cache leakage. Even with the column in place, cached cards, API responses, activity rows, profile pages, or logs could reveal that a question already has forecasts. Treat participation count as sensitive during the blind phase.

The fourth risk is backfill timing. The migration gives existing open questions a short blind window only when there is enough time before close. Questions too close to close may remain unsafe. They should be excluded, not forced.

The fifth risk is category or wording drift. Baycast should keep saying prediction polling, not gambling. The dry run should produce probability forecasts and reasoning for scoring, not betting language, odds touting, or market framing.

## Rollout call

Run the migration, verify the checklist, then unblock only a capped dry run. If all five dry-run writes pass without leaks or rejected safety checks, AI forecast writes can move from paused to limited live mode. Keep the cap until a second review confirms that active blind phases are holding across new questions too.
