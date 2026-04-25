-- ============================================================
-- BAYCAST — Supabase Schema
-- Run this in Supabase SQL Editor (Dashboard → SQL Editor → New Query)
-- ============================================================

-- 1. Profiles (auto-created via trigger on auth.users)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  display_name text unique not null,
  avatar_url text,
  bio text,
  is_admin boolean default false,
  created_at timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "Profiles are viewable by everyone"
  on public.profiles for select using (true);

create policy "Users can update their own profile"
  on public.profiles for update using (auth.uid() = id);

-- Trigger: auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, display_name, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data->>'avatar_url', null)
  );
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 2. Questions
create table if not exists public.questions (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  category text not null default 'Other',
  question_type text not null default 'binary',
  options jsonb default '{}'::jsonb,
  resolution_source text,
  opens_at timestamptz not null default now(),
  closes_at timestamptz not null,
  blind_until timestamptz,
  resolved_at timestamptz,
  resolution jsonb,
  status text not null default 'open' check (status in ('draft', 'open', 'closed', 'resolved')),
  created_by uuid references public.profiles(id),
  created_at timestamptz default now()
);

alter table public.questions enable row level security;

create policy "Questions are viewable by everyone"
  on public.questions for select using (true);

create policy "Admins can insert questions"
  on public.questions for insert
  with check (
    exists (select 1 from public.profiles where id = auth.uid() and is_admin = true)
  );

create policy "Admins can update questions"
  on public.questions for update
  using (
    exists (select 1 from public.profiles where id = auth.uid() and is_admin = true)
  );

-- 3. Forecasts
create table if not exists public.forecasts (
  id uuid default gen_random_uuid() primary key,
  question_id uuid references public.questions(id) on delete cascade not null,
  user_id uuid references public.profiles(id) on delete cascade not null,
  prediction jsonb not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(question_id, user_id)
);

alter table public.forecasts enable row level security;

-- Blind Consensus Protocol: during blind phase, users can only see their own forecasts.
-- After blind phase (or if no blind phase), all forecasts are visible.
create policy "Users can see forecasts outside blind phase or their own during blind phase"
  on public.forecasts for select
  using (
    auth.uid() = user_id
    or
    not exists (
      select 1 from public.questions q
      where q.id = forecasts.question_id
        and q.blind_until is not null
        and q.blind_until > now()
        and q.status = 'open'
    )
  );

create policy "Authenticated users can insert forecasts"
  on public.forecasts for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own forecasts"
  on public.forecasts for update
  using (auth.uid() = user_id);

-- 4. Scores
create table if not exists public.scores (
  id uuid default gen_random_uuid() primary key,
  question_id uuid references public.questions(id) on delete cascade not null,
  user_id uuid references public.profiles(id) on delete cascade not null,
  brier_score double precision not null,
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

-- 5. Leaderboard (materialized view)
create or replace view public.leaderboard as
select
  s.user_id,
  p.display_name,
  p.avatar_url,
  avg(s.brier_score) as avg_brier_score,
  count(distinct f.question_id) as total_forecasts,
  count(distinct s.question_id) as resolved_forecasts
from public.scores s
join public.profiles p on p.id = s.user_id
left join public.forecasts f on f.user_id = s.user_id
group by s.user_id, p.display_name, p.avatar_url
order by avg_brier_score asc;

-- 6. Useful indexes
create index if not exists idx_questions_status on public.questions(status);
create index if not exists idx_questions_category on public.questions(category);
create index if not exists idx_questions_closes_at on public.questions(closes_at);
create index if not exists idx_questions_blind_until on public.questions(blind_until);
create index if not exists idx_questions_created_by on public.questions(created_by);
create index if not exists idx_forecasts_question_id on public.forecasts(question_id);
create index if not exists idx_forecasts_user_id on public.forecasts(user_id);
create index if not exists idx_forecasts_created_at on public.forecasts(created_at);
create index if not exists idx_scores_user_id on public.scores(user_id);
create index if not exists idx_scores_created_at on public.scores(created_at);
create index if not exists idx_profiles_display_name on public.profiles(display_name);

-- 7. Admin audit log
create table if not exists public.admin_audit_log (
  id          uuid        default gen_random_uuid() primary key,
  action      text        not null,
  admin_id    uuid        references public.profiles(id) on delete set null,
  question_id uuid        references public.questions(id) on delete set null,
  details     jsonb,
  created_at  timestamptz default now()
);

alter table public.admin_audit_log enable row level security;

create policy "Admins can view audit log"
  on public.admin_audit_log for select
  using (
    exists (select 1 from public.profiles where id = auth.uid() and is_admin = true)
  );

create policy "Admins can insert audit log"
  on public.admin_audit_log for insert
  with check (
    exists (select 1 from public.profiles where id = auth.uid() and is_admin = true)
  );

create index if not exists idx_audit_log_created_at on public.admin_audit_log(created_at desc);
create index if not exists idx_audit_log_question_id on public.admin_audit_log(question_id);
