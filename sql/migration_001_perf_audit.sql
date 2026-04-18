-- ============================================================
-- BAYCAST — Migration 001: Performance indexes + Audit log
-- Run this in Supabase SQL Editor (Dashboard → SQL Editor → New Query)
-- ============================================================

-- 1. Performance indexes
-- Speeds up sparkline queries (ordered by time) and leaderboard period filters
create index if not exists idx_forecasts_created_at
  on public.forecasts(created_at);

-- Speeds up admin page query "questions by this user"
create index if not exists idx_questions_created_by
  on public.questions(created_by);

-- Speeds up profile lookup by display_name (used on profile pages, nav, leaderboard links)
create index if not exists idx_profiles_display_name
  on public.profiles(display_name);

-- Speeds up scores period-filtered leaderboard queries
create index if not exists idx_scores_created_at
  on public.scores(created_at);


-- 2. Admin audit log
-- Tracks every admin action (who resolved what, when, with what outcome)
create table if not exists public.admin_audit_log (
  id          uuid        default gen_random_uuid() primary key,
  action      text        not null,                              -- e.g. 'resolve_question'
  admin_id    uuid        references public.profiles(id) on delete set null,
  question_id uuid        references public.questions(id) on delete set null,
  details     jsonb,                                             -- e.g. { outcome: 'yes', scored: 12 }
  created_at  timestamptz default now()
);

alter table public.admin_audit_log enable row level security;

-- Only admins can read the audit log
create policy "Admins can view audit log"
  on public.admin_audit_log for select
  using (
    exists (select 1 from public.profiles where id = auth.uid() and is_admin = true)
  );

-- Only admins can write to the audit log
create policy "Admins can insert audit log"
  on public.admin_audit_log for insert
  with check (
    exists (select 1 from public.profiles where id = auth.uid() and is_admin = true)
  );

create index if not exists idx_audit_log_created_at
  on public.admin_audit_log(created_at desc);

create index if not exists idx_audit_log_question_id
  on public.admin_audit_log(question_id);
