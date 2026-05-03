-- ============================================================
-- Migration: Leaderboard view & Scores table
-- Run this in Supabase SQL Editor if the tables/views don't exist.
-- ============================================================

-- 1. Scores table (stores Brier scores per user per resolved question)
create table if not exists public.scores (
  id uuid default gen_random_uuid() primary key,
  question_id uuid references public.questions(id) on delete cascade not null,
  user_id uuid references public.profiles(id) on delete cascade not null,
  brier_score double precision not null,
  log_score double precision,
  created_at timestamptz default now(),
  unique(question_id, user_id)
);

alter table public.scores enable row level security;

create policy "Scores are viewable by everyone"
  on public.scores for select using (true);

create policy "Admins can insert scores"
  on public.scores for insert
  with check (
    exists (select 1 from public.profiles where id = auth.uid() and is_admin = true)
  );

create index if not exists idx_scores_user_id on public.scores(user_id);
create index if not exists idx_scores_created_at on public.scores(created_at);

-- 2. Leaderboard view (aggregated Brier scores + forecast counts)
create or replace view public.leaderboard as
select
  s.user_id,
  p.display_name,
  p.avatar_url,
  round(avg(s.brier_score)::numeric, 6) as avg_brier_score,
  round(avg(s.log_score)::numeric, 6) as avg_log_score,
  count(distinct f.question_id) as total_forecasts,
  count(distinct s.question_id) as resolved_forecasts
from public.scores s
join public.profiles p on p.id = s.user_id
left join public.forecasts f on f.user_id = s.user_id
group by s.user_id, p.display_name, p.avatar_url;

-- 3. Ensure the view is accessible via PostgREST (Supabase API)
alter view public.leaderboard set (security_barrier = true);
grant select on public.leaderboard to anon, authenticated;
