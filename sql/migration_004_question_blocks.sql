-- ============================================================
-- BAYCAST — Migration 004: Question Blocks v1
-- Groups related questions under themed blocks with block-level
-- scoring and per-block leaderboards.
-- ============================================================

-- 1. Create blocks table
create table if not exists public.blocks (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  description text,
  category    text not null,
  created_by  uuid references public.profiles(id),
  created_at  timestamptz default now()
);

comment on table public.blocks is
  'Themed collections of 5-10 related prediction questions for block-level competition.';

-- 2. Create block_questions join table
create table if not exists public.block_questions (
  block_id     uuid references public.blocks(id) on delete cascade,
  question_id  uuid references public.questions(id) on delete cascade,
  sort_order   int default 0,
  primary key (block_id, question_id)
);

comment on table public.block_questions is
  'Many-to-many join linking blocks to their constituent questions.';

-- 3. Enable RLS
alter table public.blocks enable row level security;
alter table public.block_questions enable row level security;

-- 4. RLS policies — blocks are readable by everyone, writable by admins only
create policy "Blocks are readable by all"
  on public.blocks for select
  to authenticated, anon
  using (true);

create policy "Blocks are insertable by admins"
  on public.blocks for insert
  to authenticated
  with check (
    exists (select 1 from public.profiles where id = auth.uid() and is_admin = true)
  );

create policy "Block questions are readable by all"
  on public.block_questions for select
  to authenticated, anon
  using (true);

create policy "Block questions are insertable by admins"
  on public.block_questions for insert
  to authenticated
  with check (
    exists (select 1 from public.profiles where id = auth.uid() and is_admin = true)
  );

-- 5. Index for fast lookups
create index idx_block_questions_block_id on public.block_questions(block_id);
create index idx_block_questions_question_id on public.block_questions(question_id);
