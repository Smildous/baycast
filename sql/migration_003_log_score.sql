-- ============================================================
-- BAYCAST — Migration 003: Add log_score column to scores table
-- Activates dual scoring (Brier + Logarithmic) as mandated by the whitepaper.
-- ============================================================

-- 1. Add log_score column to scores table
alter table public.scores
  add column if not exists log_score double precision;

comment on column public.scores.log_score is
  'Logarithmic score (base 2). Higher is better; 0 = perfect prediction, -∞ = worst. Clamped to avoid log(0).';

-- 2. Update leaderboard view to include average log score
create or replace view public.leaderboard as
select
  s.user_id,
  p.display_name,
  p.avatar_url,
  avg(s.brier_score) as avg_brier_score,
  avg(s.log_score) as avg_log_score,
  count(distinct f.question_id) as total_forecasts,
  count(distinct s.question_id) as resolved_forecasts
from public.scores s
join public.profiles p on p.id = s.user_id
left join public.forecasts f on f.user_id = s.user_id
group by s.user_id, p.display_name, p.avatar_url
order by avg_brier_score asc;
