/**
 * Baycast — Short-horizon seed questions (1-4 week resolution)
 *
 * Run via Supabase SQL Editor or Management API:
 *   npx supabase db execute --project-ref jlfohoqtdwtgfsgslsbr -f sql/seed_questions.sql
 *
 * Requires migration_002 to be applied first (blind_until column).
 *
 * NOTE: This file is idempotent-safe for fresh DBs. If questions already exist,
 * consider running sql/migration_005_normalize_categories.sql instead.
 */

-- ============================================================
-- Seed questions with dates relative to NOW()
-- Some have blind_until set to test the Blind Consensus Protocol
-- Covers all categories: Technology, Economy, Science, Sports,
--   Politics, Culture, AI, Crypto, Entertainment, Other
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
    NOW() + INTERVAL '14 days',
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
    NOW() + INTERVAL '21 days',
    NOW() + INTERVAL '5 days',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- 3. Science — SpaceX launch (3 weeks, no blind phase)
  (
    gen_random_uuid(),
    'Will SpaceX successfully launch Starship on an orbital test flight by May 25, 2026?',
    'Resolution: YES if SpaceX completes a Starship orbital test flight that reaches space (100+ km altitude) before May 25, 2026, 23:59 UTC. The vehicle does not need to survive reentry or landing.',
    'Science',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.spacex.com/launches/',
    NOW(),
    NOW() + INTERVAL '28 days',
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
    NOW() + INTERVAL '35 days',
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
    'Will CERN announce any new particle discovery by May 25, 2026?',
    'Resolution: YES if CERN or the LHC collaborations officially announce the discovery of a new particle (beyond the Standard Model or a new hadron state) before May 25, 2026. Pre-prints or conference talks count.',
    'Science',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://home.cern/news',
    NOW(),
    NOW() + INTERVAL '28 days',
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
  ),

  -- 9. AI — Claude/Gemini capability (2 weeks, no blind phase)
  (
    gen_random_uuid(),
    'Will Anthropic release Claude 4 before June 1, 2026?',
    'Resolution: YES if Anthropic officially releases Claude 4 (or a similarly branded next-generation model) before June 1, 2026, 23:59 UTC. Blog posts, press releases, or API availability all count.',
    'AI',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.anthropic.com/news',
    NOW(),
    NOW() + INTERVAL '21 days',
    NULL,
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- 10. AI — Autonomous coding agent (3 weeks, with blind phase)
  (
    gen_random_uuid(),
    'Will a major AI lab demo an autonomous software engineer that passes a real SWE-bench benchmark?',
    'Resolution: YES if any major AI lab (OpenAI, Anthropic, Google DeepMind, Meta) publicly demonstrates an autonomous coding agent that scores above 50% on SWE-bench Verified before June 1, 2026.',
    'AI',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.swebench.com/',
    NOW(),
    NOW() + INTERVAL '28 days',
    NOW() + INTERVAL '5 days',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- 11. Crypto — Ethereum ETF approval (2 weeks, no blind phase)
  (
    gen_random_uuid(),
    'Will spot Ethereum ETFs see net inflows exceeding $500M in a single week before June 1, 2026?',
    'Resolution: YES if the combined weekly net inflows of all US spot Ethereum ETFs exceed $500M in any calendar week before June 1, 2026. Source: Bloomberg ETF data.',
    'Crypto',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.bloomberg.com/markets/etf',
    NOW(),
    NOW() + INTERVAL '21 days',
    NULL,
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- 12. Crypto — Solana milestone (2 weeks, with blind phase)
  (
    gen_random_uuid(),
    'Will Solana exceed $200 by May 20, 2026?',
    'Resolution: YES if Solana''s price exceeds $200 on any major exchange (CoinGecko median) before May 20, 2026, 23:59 UTC.',
    'Crypto',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.coingecko.com/en/coins/solana',
    NOW(),
    NOW() + INTERVAL '18 days',
    NOW() + INTERVAL '4 days',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- 13. Entertainment — Box office (2 weeks, no blind phase)
  (
    gen_random_uuid(),
    'Will any movie released in May 2026 have a domestic opening weekend above $150M?',
    'Resolution: YES if any wide-release film (2,000+ theaters) opening in the US between May 1-31, 2026 earns more than $150M domestically in its opening weekend. Source: Box Office Mojo.',
    'Entertainment',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.boxofficemojo.com/',
    NOW(),
    NOW() + INTERVAL '28 days',
    NULL,
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- 14. Entertainment — Streaming (3 weeks, with blind phase)
  (
    gen_random_uuid(),
    'Will Netflix announce 300M+ global subscribers in their Q2 2026 earnings report?',
    'Resolution: YES if Netflix reports 300 million or more global paid subscribers in their Q2 2026 earnings release (expected July 2026).',
    'Entertainment',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://ir.netflix.net/',
    NOW(),
    NOW() + INTERVAL '35 days',
    NOW() + INTERVAL '7 days',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- 15. Politics — US executive order (1 week, no blind phase)
  (
    gen_random_uuid(),
    'Will the US administration sign a new executive order related to AI regulation before May 15, 2026?',
    'Resolution: YES if the White House publishes a new executive order specifically addressing AI governance, safety, or regulation before May 15, 2026. Updates to existing orders do not count.',
    'Politics',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.whitehouse.gov/briefing-room/presidential-actions/',
    NOW(),
    NOW() + INTERVAL '14 days',
    NULL,
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- 16. Politics — EU regulation (3 weeks, with blind phase)
  (
    gen_random_uuid(),
    'Will the EU announce formal enforcement action under the AI Act before June 1, 2026?',
    'Resolution: YES if the European Commission or a national authority announces a formal investigation or enforcement action under the EU AI Act before June 1, 2026.',
    'Politics',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai',
    NOW(),
    NOW() + INTERVAL '28 days',
    NOW() + INTERVAL '5 days',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- 17. Culture — Nobel Prize (3 weeks, no blind phase)
  (
    gen_random_uuid(),
    'Will a novel published in 2025 or 2026 win the 2026 Nobel Prize in Literature?',
    'Resolution: YES if the 2026 Nobel Prize in Literature is awarded to an author primarily for a work published in 2025 or 2026. Announced October 2026.',
    'Culture',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.nobelprize.org/prizes/literature/',
    NOW(),
    NOW() + INTERVAL '35 days',
    NULL,
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- 18. Culture — Video game (2 weeks, with blind phase)
  (
    gen_random_uuid(),
    'Will GTA VI release before September 2026?',
    'Resolution: YES if Rockstar Games releases GTA VI (on any platform) before September 1, 2026. The release must be a full commercial launch, not a trailer or pre-order announcement.',
    'Culture',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.rockstargames.com/',
    NOW(),
    NOW() + INTERVAL '28 days',
    NOW() + INTERVAL '6 days',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- 19. Science — Artemis moon mission (3 weeks, no blind phase)
  (
    gen_random_uuid(),
    'Will NASA launch the Artemis III crewed lunar mission before 2027?',
    'Resolution: YES if NASA launches Artemis III with crew aboard before January 1, 2027. The launch must occur; a scheduled date is not sufficient.',
    'Science',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.nasa.gov/artemis/',
    NOW(),
    NOW() + INTERVAL '35 days',
    NULL,
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- 20. Technology — Self-driving (2 weeks, with blind phase)
  (
    gen_random_uuid(),
    'Will Waymo expand robotaxi service to 5+ new US cities by end of 2026?',
    'Resolution: YES if Waymo (or its parent Alphabet) announces commercial robotaxi service in at least 5 new US cities (beyond San Francisco, Phoenix, LA, Austin) by December 31, 2026.',
    'Technology',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://waymo.com/',
    NOW(),
    NOW() + INTERVAL '28 days',
    NOW() + INTERVAL '4 days',
    'open',
    '00000000-0000-0000-0000-000000000001'
  );
