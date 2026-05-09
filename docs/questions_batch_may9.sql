-- ============================================================
-- Baycast — Prediction Questions Batch (May 9, 2026)
--
-- 12 questions with short-horizon resolutions (May 9–30, 2026).
-- All fresh topics, distinct from the May 5–8 batches.
-- Run via Supabase SQL Editor or Management API.
-- ============================================================

INSERT INTO public.questions (id, title, description, category, question_type, options, resolution_source, opens_at, closes_at, blind_until, status, created_by)
VALUES

  -- ── Technology (1–2) ──────────────────────────────────────

  -- 1. OpenAI GPT-5 / next-gen model release
  (
    gen_random_uuid(),
    'Will OpenAI publicly release GPT-5 or a next-generation flagship AI model before May 30, 2026?',
    'Resolution: YES if OpenAI publicly releases a model explicitly branded as "GPT-5" or a next-generation flagship model that succeeds GPT-4o/o3/o4-mini before May 30, 2026 23:59 UTC. The release must be available via API, chat.openai.com, or product integration. The announcement must come from an official OpenAI source (blog, press release, or public event). Research papers without a public release, internal-only models, or minor updates to existing models (e.g., o3-pro, GPT-4o updates) do not count.',
    'Technology',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://openai.com/blog',
    '2026-05-09T00:00:00Z',
    '2026-05-30T23:59:59Z',
    '2026-05-16T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- 2. NVIDIA quarterly revenue >$40B
  (
    gen_random_uuid(),
    'Will NVIDIA report quarterly revenue exceeding $40 billion in its next earnings report released before May 30, 2026?',
    'Resolution: YES if NVIDIA publishes its next quarterly earnings press release (expected Q1 FY2027, typically released late May) before May 30, 2026 23:59 UTC and the reported GAAP revenue figure exceeds $40.0 billion. The revenue figure must be the total revenue reported in the earnings press release. If NVIDIA does not release earnings before May 30, this question resolves as NO. Non-GAAP revenue does not count; the resolution is based on GAAP revenue.',
    'Technology',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://investor.nvidia.com/financial-info/quarterly-results',
    '2026-05-09T00:00:00Z',
    '2026-05-30T23:59:59Z',
    '2026-05-16T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- ── Geopolitics (3–4) ──────────────────────────────────────

  -- 3. UN Security Council adopts US-Iran resolution
  (
    gen_random_uuid(),
    'Will the UN Security Council adopt a resolution specifically addressing the US-Iran conflict before May 30, 2026?',
    'Resolution: YES if the UN Security Council votes to adopt a resolution that specifically mentions the ongoing US-Iran military conflict (or uses language clearly referring to it, such as "Persian Gulf hostilities" or "US-Iran tensions") before May 30, 2026 23:59 UTC. The resolution must be formally adopted (not merely proposed or vetoed). Vetoed draft resolutions that do not pass do not count. Press statements or presidential statements by the Security Council president do not count — must be a formal resolution.',
    'Geopolitics',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.un.org/securitycouncil/content/unsc-resolutions',
    '2026-05-09T00:00:00Z',
    '2026-05-30T23:59:59Z',
    '2026-05-16T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- 4. China announces new tariffs on US exports
  (
    gen_random_uuid(),
    'Will China announce new tariffs specifically targeting US exports (beyond existing measures as of May 9, 2026) before May 30, 2026?',
    'Resolution: YES if China''s Ministry of Commerce (MOFCOM), State Council, or General Administration of Customs publicly announces new retaliatory tariffs, additional duties, or expanded tariff coverage specifically targeting US goods or services, beyond any measures already in effect as of May 9, 2026. The announcement must specify the US as the target. Measures targeting multiple countries including the US count only if the US is explicitly named. Anti-dumping duties initiated before May 9 that result in final rulings do not count as "new" tariffs for this question.',
    'Geopolitics',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.mofcom.gov.cn/',
    '2026-05-09T00:00:00Z',
    '2026-05-30T23:59:59Z',
    '2026-05-16T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- ── Economics (5–6) ──────────────────────────────────────

  -- 5. Gold closes above $3,500/oz
  (
    gen_random_uuid(),
    'Will gold (XAU/USD) close above $3,500 per troy ounce on any trading day before May 30, 2026?',
    'Resolution: YES if the LBMA Gold Price PM Fix exceeds $3,500.00 per troy ounce on any London business day between May 9 and May 30, 2026 (inclusive). If the LBMA PM Fix is unavailable on any day, the Federal Reserve Bank of New York gold reference price or the ICE spot gold close will be used as fallback. Flash spikes in aftermarket or electronic trading that do not correspond to the daily benchmark fix do not count.',
    'Economics',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.lbma.org.uk/gold-price',
    '2026-05-09T00:00:00Z',
    '2026-05-30T23:59:59Z',
    '2026-05-16T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- 6. VIX closes at or above 30
  (
    gen_random_uuid(),
    'Will the CBOE Volatility Index (VIX) close at or above 30 on any trading day between May 9 and May 30, 2026?',
    'Resolution: YES if the official CBOE VIX closing value is ≥30.00 on any trading day between May 9, 2026 and May 30, 2026 (inclusive). The resolution uses the standard VIX daily close published by CBOE. Intraday spikes that close below 30 do not count. If there are no trading days in this period (extremely unlikely), the question resolves as NO.',
    'Economics',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.cboe.com/tradable_products/vix/',
    '2026-05-09T00:00:00Z',
    '2026-05-30T23:59:59Z',
    '2026-05-16T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- ── Sports (7–8) ──────────────────────────────────────

  -- 7. NBA conference semifinals Game 7
  (
    gen_random_uuid(),
    'Will the 2026 NBA Playoffs conference semifinals feature at least one Game 7?',
    'Resolution: YES if at least one of the eight NBA conference semifinals series (4 Western Conference + 4 Eastern Conference) reaches a Game 7. The series must be officially scheduled as a Game 7 by the NBA. If a Game 7 is scheduled but postponed and then played after May 18, it still counts. If all eight series end in 4, 5, or 6 games, this resolves as NO. Any series that is 3-3 and heading to Game 7 counts regardless of whether the Game 7 has been played by the resolution date (as long as the NBA has officially scheduled it).',
    'Sports',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.nba.com/playoffs',
    '2026-05-09T00:00:00Z',
    '2026-05-18T23:59:59Z',
    '2026-05-16T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- 8. Verstappen wins Monaco Grand Prix
  (
    gen_random_uuid(),
    'Will Max Verstappen win the 2026 Monaco Grand Prix (May 24)?',
    'Resolution: YES if Max Verstappen (Red Bull Racing) is the official winner of the 2026 Monaco Grand Prix as published by Formula 1''s official results. If Verstappen is later disqualified (within 7 days of the race), the disqualification overrides the initial result. If the race is cancelled, postponed beyond May 30, or declared a non-championship event, this resolves as NO. The winner is the driver who crosses the finish line first after taking the checkered flag, subject to any post-race penalties.',
    'Sports',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.formula1.com/en/results.html',
    '2026-05-09T00:00:00Z',
    '2026-05-24T23:59:59Z',
    '2026-05-16T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- ── Science (9) ──────────────────────────────────────

  -- 9. NASA/ESA announces habitable zone exoplanet discovery
  (
    gen_random_uuid(),
    'Will NASA or ESA announce the discovery of an exoplanet in the habitable zone of its host star before May 30, 2026?',
    'Resolution: YES if NASA or ESA officially announces (via press release or peer-reviewed paper with agency co-authorship) the discovery of a new exoplanet confirmed to orbit within the habitable zone of its host star before May 30, 2026 23:59 UTC. The announcement must be made by NASA or ESA directly, not merely reported by media. Re-announcements of previously discovered planets, unconfirmed candidates, or theoretical models without observational confirmation do not count. The planet must have a confirmed orbital radius placing it within the star''s habitable zone as defined by the announcing agency.',
    'Science',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://exoplanets.nasa.gov/news/',
    '2026-05-09T00:00:00Z',
    '2026-05-30T23:59:59Z',
    '2026-05-16T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- ── Crypto (10–11) ──────────────────────────────────────

  -- 10. DOGE ≥ $0.50
  (
    gen_random_uuid(),
    'Will Dogecoin (DOGE) reach or exceed $0.50 at any point before May 30, 2026?',
    'Resolution: YES if DOGE/USD spot price reaches ≥$0.50 on at least two major exchanges (from: Binance, Coinbase, Kraken, OKX) before May 30, 2026 23:59 UTC. Flash wicks lasting less than 1 minute on a single exchange without corroboration on at least one other major exchange do not count. Price must be visible on CoinGecko''s aggregated chart. Futures, perpetual swap, or derivative prices do not count.',
    'Crypto',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.coingecko.com/en/coins/dogecoin',
    '2026-05-09T00:00:00Z',
    '2026-05-30T23:59:59Z',
    '2026-05-16T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- 11. Altcoin market cap >$1T (excl. BTC+ETH)
  (
    gen_random_uuid(),
    'Will the combined market capitalization of all cryptocurrencies excluding Bitcoin and Ethereum exceed $1 trillion before May 30, 2026?',
    'Resolution: YES if the total market capitalization of all cryptocurrencies (CoinGecko global market cap) minus the market capitalization of Bitcoin and Ethereum exceeds $1 trillion (i.e., Total Global Market Cap − BTC Market Cap − ETH Market Cap > $1,000,000,000,000) at any single measurement point before May 30, 2026 23:59 UTC. The measurement uses CoinGecko''s real-time data. If CoinGecko is temporarily unavailable, CoinMarketCap''s equivalent data serves as fallback. The figure must appear on the aggregator''s snapshot, not require manual calculation.',
    'Crypto',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.coingecko.com/en/global-charts',
    '2026-05-09T00:00:00Z',
    '2026-05-30T23:59:59Z',
    '2026-05-16T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- ── Culture (12) ──────────────────────────────────────

  -- 12. South Korean film wins Cannes top-3 award
  (
    gen_random_uuid(),
    'Will a film from South Korea win any of the top three competition awards (Palme d''Or, Grand Prix, or Jury Prize) at the 2026 Cannes Film Festival?',
    'Resolution: YES if a film directed by a South Korean national (or a co-production where the primary director is South Korean) wins the Palme d''Or, Grand Prix, or Jury Prize at the 2026 Cannes Film Festival (May 13–24). The award must be one of these three specifically. Awards in other categories (Best Director, Best Screenplay, acting awards, Caméra d''Or, etc.) do not count. Co-directed films count only if at least one director is South Korean and the film is entered/attributed to South Korea. Resolves based on the official Cannes awards ceremony announcement.',
    'Culture',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.festival-cannes.com/en/selection',
    '2026-05-09T00:00:00Z',
    '2026-05-24T23:59:59Z',
    '2026-05-16T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  );
