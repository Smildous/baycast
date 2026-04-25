-- ============================================================
-- BAYCAST — Migration 002: Blind Consensus Protocol
-- Adds blind_until column to questions table.
-- During Phase A (now → blind_until), forecasts are hidden from other users.
-- Phase B (blind_until → closes_at) allows revision with full visibility.
-- ============================================================

-- 1. Add blind_until column
alter table public.questions
  add column if not exists blind_until timestamptz;

comment on column public.questions.blind_until is
  'End of blind phase. Before this timestamp, individual forecasts are hidden (Phase A). After, forecasts become visible for revision (Phase B). Null means no blind phase.';

create index if not exists idx_questions_blind_until
  on public.questions(blind_until);

-- 2. Replace the overly permissive "Forecasts are viewable by everyone" policy
--    with a policy that enforces blind phase at the database level.
--    During the blind phase, users can only see their own forecasts.
--    After the blind phase (or if no blind phase exists), all forecasts are visible.

drop policy if exists "Forecasts are viewable by everyone" on public.forecasts;

create policy "Users can see forecasts outside blind phase or their own during blind phase"
  on public.forecasts for select
  using (
    -- User can always see their own forecasts
    auth.uid() = user_id
    or
    -- User can see all forecasts if the question is NOT in blind phase
    not exists (
      select 1 from public.questions q
      where q.id = forecasts.question_id
        and q.blind_until is not null
        and q.blind_until > now()
        and q.status = 'open'
    )
  );

-- 3. Create a helper function to check blind phase status
--    (useful for application-level queries and future policies)
create or replace function public.is_blind_phase(question_id uuid)
returns boolean as $$
  select exists (
    select 1 from public.questions q
    where q.id = is_blind_phase.question_id
      and q.blind_until is not null
      and q.blind_until > now()
      and q.status = 'open'
  );
$$ language sql stable security definer;

comment on function public.is_blind_phase is
  'Returns true if the question is currently in blind phase (forecasts hidden).';
