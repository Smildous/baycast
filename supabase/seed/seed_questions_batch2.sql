-- ============================================================
-- Baycast — Seed Questions Batch 2 (Long-horizon, Dec 2026)
--
-- 15 questions from docs/SPECS.md §2 "15 New Seed Questions"
-- Run via Supabase SQL Editor or Management API.
-- ============================================================

INSERT INTO public.questions (id, title, description, category, question_type, options, resolution_source, opens_at, closes_at, blind_until, status, created_by)
VALUES
  -- ── Tech (1–5) ──────────────────────────────────────────

  -- 1. GPT-5 release
  (
    gen_random_uuid(),
    'GPT-5 will be released by Dec 2026',
    'Resolution: YES if OpenAI officially announces and makes GPT-5 available via API or product before December 31, 2026, 23:59 UTC. Blog posts, press releases, or public demos by OpenAI leadership all count. Rumors or leaks alone do not.',
    'Technology',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://openai.com/blog',
    '2026-05-02T00:00:00Z',
    '2026-12-31T23:59:59Z',
    '2026-05-09T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- 2. Apple AI hardware device
  (
    gen_random_uuid(),
    'Apple will launch a dedicated AI hardware device by Dec 2026',
    'Resolution: YES if Apple announces and ships a new hardware product marketed primarily as an AI device before December 31, 2026, 23:59 UTC. The device must be distinct from existing product lines (Mac, iPad, iPhone, Vision Pro, Apple Watch, AirPods).',
    'Technology',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.apple.com/newsroom/',
    '2026-05-02T00:00:00Z',
    '2026-12-31T23:59:59Z',
    '2026-05-09T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- 3. Bitcoin exceeds $150,000
  (
    gen_random_uuid(),
    'Bitcoin will exceed $150,000 at any point by Dec 2026',
    'Resolution: YES if BTC/USD spot price reaches ≥$150,000 on a major exchange (Coinbase, Binance, Kraken) before December 31, 2026, 23:59 UTC. Flash crashes or wicks on low-liquidity exchanges do not count; the price must be sustained for at least 1 minute.',
    'Technology',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.coingecko.com/en/coins/bitcoin',
    '2026-05-02T00:00:00Z',
    '2026-12-31T23:59:59Z',
    '2026-05-09T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- 4. Tesla robotaxi service
  (
    gen_random_uuid(),
    'Tesla will launch commercial robotaxi service by Dec 2026',
    'Resolution: YES if Tesla operates a paid, public-facing autonomous ride-hail service in at least one US city before December 31, 2026, 23:59 UTC. The service must be available to the general public (not just employees or beta testers) and charge fares.',
    'Technology',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.tesla.com',
    '2026-05-02T00:00:00Z',
    '2026-12-31T23:59:59Z',
    '2026-05-09T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- 5. OpenAI IPO
  (
    gen_random_uuid(),
    'OpenAI will complete an IPO by Dec 2026',
    'Resolution: YES if OpenAI publicly files and prices an IPO on a major stock exchange (NYSE, NASDAQ, or equivalent) before December 31, 2026, 23:59 UTC. A direct listing or SPAC merger also counts. Private funding rounds do not count.',
    'Technology',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.sec.gov',
    '2026-05-02T00:00:00Z',
    '2026-12-31T23:59:59Z',
    '2026-05-09T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- ── Geopolitics (6–10) ──────────────────────────────────

  -- 6. Ukraine-Russia ceasefire
  (
    gen_random_uuid(),
    'Ukraine-Russia ceasefire agreement by Dec 2026',
    'Resolution: YES if both Ukraine and Russia formally agree to a sustained ceasefire (minimum 30 consecutive days without major military operations) before December 31, 2026, 23:59 UTC. The agreement must be announced by both governments or by a recognized international mediator (UN, NATO, etc.).',
    'Politics',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.un.org/news/',
    '2026-05-02T00:00:00Z',
    '2026-12-31T23:59:59Z',
    '2026-05-09T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- 7. Taiwan Strait military confrontation
  (
    gen_random_uuid(),
    'Taiwan Strait crisis escalation to military confrontation by Dec 2026',
    'Resolution: YES if an armed military clash occurs between China and Taiwan/US forces in the Taiwan Strait before December 31, 2026, 23:59 UTC. This includes live-fire exchanges, boarding of vessels, or missile strikes. Routine naval transits or verbal warnings do not count.',
    'Politics',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.reuters.com/world/asia-pacific/',
    '2026-05-02T00:00:00Z',
    '2026-12-31T23:59:59Z',
    '2026-05-09T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- 8. EU AI Act enforcement fines
  (
    gen_random_uuid(),
    'EU AI Act enforcement fines issued by Dec 2026',
    'Resolution: YES if at least one company is publicly fined under the EU AI Act before December 31, 2026, 23:59 UTC. The fine must be officially announced by the European Commission or a national supervisory authority. Warning letters or compliance orders without monetary penalties do not count.',
    'Politics',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai',
    '2026-05-02T00:00:00Z',
    '2026-12-31T23:59:59Z',
    '2026-05-09T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- 9. India GDP growth exceeds 7%
  (
    gen_random_uuid(),
    'India GDP growth exceeds 7% in FY 2026',
    'Resolution: YES if official Indian government GDP figures (Ministry of Statistics and Programme Implementation or RBI) show real GDP growth exceeding 7.0% for fiscal year 2026-27 (April 2026 – March 2027) before December 31, 2026. First advance estimates, second advance estimates, or provisional estimates all count.',
    'Politics',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://mospi.gov.in/',
    '2026-05-02T00:00:00Z',
    '2026-12-31T23:59:59Z',
    '2026-05-09T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- 10. BRICS common currency
  (
    gen_random_uuid(),
    'BRICS announces a common currency by Dec 2026',
    'Resolution: YES if the BRICS bloc formally announces the creation of a shared reserve currency, trade settlement currency, or central bank digital currency for use among member states before December 31, 2026, 23:59 UTC. The announcement must come from an official BRICS summit or joint ministerial statement.',
    'Politics',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.brics2025.ru/',
    '2026-05-02T00:00:00Z',
    '2026-12-31T23:59:59Z',
    '2026-05-09T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- ── Science & Economics (11–15) ─────────────────────────

  -- 11. US recession in 2026
  (
    gen_random_uuid(),
    'US recession declared in 2026',
    'Resolution: YES if the NBER Business Cycle Dating Committee officially declares a US recession starting at any point in calendar year 2026 before December 31, 2026, 23:59 UTC. The declaration date (not the start date) must be in 2026.',
    'Economy',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.nber.org/cycles.html',
    '2026-05-02T00:00:00Z',
    '2026-12-31T23:59:59Z',
    '2026-05-09T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- 12. Fed funds rate below 3%
  (
    gen_random_uuid(),
    'Fed funds rate below 3% by Dec 2026',
    'Resolution: YES if the Federal Reserve target federal funds rate drops below 3.00% at any point before December 31, 2026, 23:59 UTC. This refers to the target range upper bound. Source: Federal Reserve press releases.',
    'Economy',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.federalreserve.gov/newsevents/pressreleases.htm',
    '2026-05-02T00:00:00Z',
    '2026-12-31T23:59:59Z',
    '2026-05-09T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- 13. Nobel Prize in Physics for AI research
  (
    gen_random_uuid(),
    'Nobel Prize in Physics awarded for AI research by 2026',
    'Resolution: YES if the Nobel Prize in Physics is awarded for work primarily in artificial intelligence or machine learning in the 2026 Nobel Prize announcements (typically October) before December 31, 2026, 23:59 UTC. The Nobel Committee''s official citation must reference AI/ML as the primary contribution.',
    'Science',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.nobelprize.org/prizes/physics/',
    '2026-05-02T00:00:00Z',
    '2026-12-31T23:59:59Z',
    '2026-05-09T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- 14. SpaceX Starship crewed Moon landing
  (
    gen_random_uuid(),
    'SpaceX Starship achieves crewed Moon landing by Dec 2026',
    'Resolution: YES if a SpaceX Starship vehicle successfully lands humans on the lunar surface before December 31, 2026, 23:59 UTC. The crew must survive the landing. Uncrewed landings do not count.',
    'Science',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.nasa.gov/humans-in-space/',
    '2026-05-02T00:00:00Z',
    '2026-12-31T23:59:59Z',
    '2026-05-09T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- 15. Global EV sales exceed 30%
  (
    gen_random_uuid(),
    'Global EV sales exceed 30% market share by Dec 2026',
    'Resolution: YES if battery electric vehicles (BEVs) account for more than 30% of new passenger vehicle sales worldwide for any full quarter (Q1-Q4) in 2026 before December 31, 2026, 23:59 UTC. Source: IEA Global EV Data Explorer, EV-Volumes, or equivalent authoritative source. Plug-in hybrids (PHEVs) are not included.',
    'Science',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.iea.org/data-and-statistics/data-tools/global-ev-data-explorer',
    '2026-05-02T00:00:00Z',
    '2026-12-31T23:59:59Z',
    '2026-05-09T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  );
