-- ============================================================
-- BAYCAST — Migration 002: Blind Consensus Protocol
-- Adds blind_until column to questions table.
-- During Phase A (now → blind_until), forecasts are hidden from other users.
-- Phase B (blind_until → closes_at) allows revision with full visibility.
-- ============================================================

alter table public.questions
  add column if not exists blind_until timestamptz;

comment on column public.questions.blind_until is
  'End of blind phase. Before this timestamp, individual forecasts are hidden (Phase A). After, forecasts become visible for revision (Phase B). Null means no blind phase.';

create index if not exists idx_questions_blind_until
  on public.questions(blind_until);
