/**
 * Baycast — Short-horizon seed questions (1-4 week resolution)
 *
 * Run via Supabase SQL Editor or Management API:
 *   npx supabase db execute --project-ref jlfohoqtdwtgfsgslsbr -f sql/seed_questions.sql
 *
 * Requires migration_002 to be applied first (blind_until column).
 */

-- ============================================================
-- Seed questions with dates relative to NOW()
-- Some have blind_until set to test the Blind Consensus Protocol
-- ============================================================

INSERT INTO public.questions (id, title, description, category, question_type, options, resolution_source, opens_at, closes_at, blind_until, status, created_by)
VALUES
  -- 1. Technology — AI milestone (1 week, with blind phase)
  (
    gen_random_uuid(),
    'Will OpenAI announce GPT-5 before May 15, 2026?',
    'Resolution: YES if OpenAI officially announces or releases GPT-5 (or a similarly branded next-generation model) before May 15, 2026, 23:59 UTC. Blog posts, press releases, or public demos by OpenAI leadership all count. Rumors or leaks do not.',
    'Technology',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://openai.com/blog',
    NOW(),
    NOW() + INTERVAL '7 days',
    NOW() + INTERVAL '3 days',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- 2. Economy — Fed decision (2 weeks, with blind phase)
  (
    gen_random_uuid(),
    'Will the Federal Reserve hold rates steady at the May 2026 FOMC meeting?',
    'Resolution: YES if the Fed funds target rate remains unchanged after the May 2026 FOMC meeting. Source: Federal Reserve press release.',
    'Economy',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.federalreserve.gov/newsevents/pressreleases.htm',
    NOW(),
    NOW() + INTERVAL '14 days',
    NOW() + INTERVAL '5 days',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- 3. Science — SpaceX launch (3 weeks, no blind phase)
  (
    gen_random_uuid(),
    'Will SpaceX successfully launch Starship on an orbital test flight by May 20, 2026?',
    'Resolution: YES if SpaceX completes a Starship orbital test flight that reaches space (100+ km altitude) before May 20, 2026, 23:59 UTC. The vehicle does not need to survive reentry or landing.',
    'Science',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.spacex.com/launches/',
    NOW(),
    NOW() + INTERVAL '21 days',
    NULL,
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- 4. Sports — NBA playoffs (2 weeks, with blind phase)
  (
    gen_random_uuid(),
    'Will any NBA team sweep a first-round playoff series 4-0 in the 2026 playoffs?',
    'Resolution: YES if any first-round NBA playoff series in 2026 ends 4-0 before May 10, 2026. Source: official NBA results.',
    'Sports',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.nba.com/playoffs',
    NOW(),
    NOW() + INTERVAL '14 days',
    NOW() + INTERVAL '4 days',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- 5. Technology — Apple event (4 weeks, no blind phase)
  (
    gen_random_uuid(),
    'Will Apple announce a new hardware product at WWDC 2026?',
    'Resolution: YES if Apple announces a new hardware device (not just software) at WWDC 2026. Updated versions of existing products count. Accessories and color variants do not.',
    'Technology',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.apple.com/newsroom/',
    NOW(),
    NOW() + INTERVAL '28 days',
    NULL,
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- 6. Economy — Bitcoin price (2 weeks, no blind phase)
  (
    gen_random_uuid(),
    'Will Bitcoin close above $100,000 on any day before May 15, 2026?',
    'Resolution: YES if Bitcoin''s daily closing price (UTC) exceeds $100,000 on any day before May 15, 2026. Source: CoinGecko or Binance.',
    'Economy',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.coingecko.com/en/coins/bitcoin',
    NOW(),
    NOW() + INTERVAL '18 days',
    NULL,
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- 7. Science — CERN announcement (3 weeks, with blind phase)
  (
    gen_random_uuid(),
    'Will CERN announce any new particle discovery by May 20, 2026?',
    'Resolution: YES if CERN or the LHC collaborations officially announce the discovery of a new particle (beyond the Standard Model or a new hadron state) before May 20, 2026. Pre-prints or conference talks count.',
    'Science',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://home.cern/news',
    NOW(),
    NOW() + INTERVAL '21 days',
    NOW() + INTERVAL '7 days',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- 8. Sports — Champions League (1 week, no blind phase)
  (
    gen_random_uuid(),
    'Will the first leg of the Champions League semi-final feature 3+ total goals?',
    'Resolution: YES if the first Champions League semi-final first leg in 2025/26 has 3 or more total goals combined. Source: UEFA official results.',
    'Sports',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.uefa.com/uefachampionsleague/',
    NOW(),
    NOW() + INTERVAL '10 days',
    NULL,
    'open',
    '00000000-0000-0000-0000-000000000001'
  );
