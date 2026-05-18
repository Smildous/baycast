-- ============================================================
-- BAYCAST AQ-226: live blind_until safety repair
--
-- Do not run blindly. Review in Supabase SQL Editor first.
-- This migration makes the AI forecaster gate usable by ensuring the
-- live questions table has public.questions.blind_until, then assigning
-- a short active blind phase to existing open questions that can still
-- support one before close.
-- ============================================================

alter table public.questions
  add column if not exists blind_until timestamptz;

comment on column public.questions.blind_until is
  'End of blind phase. Before this timestamp, individual forecasts are hidden. Null means no blind phase.';

create index if not exists idx_questions_blind_until
  on public.questions(blind_until);

-- Existing open rows are unsafe for AI live forecasts while blind_until
-- is absent or null. This backfills only rows with enough time before
-- close to preserve at least one hour after the blind phase.
update public.questions
set blind_until = least(now() + interval '72 hours', closes_at - interval '1 hour')
where status = 'open'
  and blind_until is null
  and closes_at > now() + interval '2 hours';

-- Rows returned here remain unsafe and should not receive AI forecasts.
select id, title, status, closes_at, blind_until
from public.questions
where status = 'open'
  and (blind_until is null or blind_until <= now() or blind_until >= closes_at)
order by closes_at asc;
