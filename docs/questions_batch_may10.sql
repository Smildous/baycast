-- ============================================================
-- Baycast — Prediction Questions Batch (May 10, 2026)
--
-- 15 questions with short-horizon resolutions (May 20–31, 2026).
-- All resolve by May 31, 2026. Diverse categories.
-- Fresh topics, distinct from the May 5–9 batches.
-- Run via Supabase SQL Editor or Management API.
-- ============================================================

INSERT INTO public.questions (id, title, description, category, question_type, options, resolution_source, opens_at, closes_at, blind_until, status, created_by)
VALUES

  -- ── Technology (1–3) ──────────────────────────────────────

  -- 1. Google I/O: new AI agent product
  (
    gen_random_uuid(),
    'Will Google announce a new consumer-facing AI agent product (distinct from the Gemini chatbot) at Google I/O 2026 (May 20–21)?',
    'Resolution: YES if Google announces a new consumer-facing AI agent product at Google I/O 2026 (May 20–21) that is positioned as a distinct product from the Gemini chatbot interface. The product must be described as capable of autonomously completing multi-step tasks on behalf of the user (e.g., booking appointments, making purchases, managing workflows). Updates to Gemini''s existing capabilities, API-only products, or enterprise-only tools without a consumer-facing component do not count. The announcement must come from an official Google source (I/O keynote, blog post, or press release).',
    'Technology',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://blog.google/technology/ai/',
    '2026-05-10T00:00:00Z',
    '2026-05-22T23:59:59Z',
    '2026-05-17T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- 2. Meta releases open-weight model ≥400B params
  (
    gen_random_uuid(),
    'Will Meta release an open-weight AI model with 400 billion or more total parameters before May 31, 2026?',
    'Resolution: YES if Meta publicly releases an open-weight (or open-source licensed) AI model with 400 billion or more total parameters before May 31, 2026 23:59 UTC. The model must be downloadable by the public via Hugging Face, GitHub, or a similar platform. The parameter count must be stated by Meta in the model card, release announcement, or accompanying paper. Mixture-of-experts models count their total parameters (not just active parameters). A model already released before May 10, 2026 does not count — must be a new release.',
    'Technology',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://ai.meta.com/blog/',
    '2026-05-10T00:00:00Z',
    '2026-05-31T23:59:59Z',
    '2026-05-17T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- 3. Amazon announces next-gen Alexa with new LLM
  (
    gen_random_uuid(),
    'Will Amazon announce a next-generation Alexa powered by a new proprietary large language model before May 31, 2026?',
    'Resolution: YES if Amazon publicly announces a major overhaul of Alexa that is powered by a new proprietary large language model (LLM) developed in-house by Amazon, not relying primarily on Anthropic''s Claude or another third-party model. The announcement must specify that a new Amazon-developed LLM is the primary intelligence behind Alexa. The announcement can come via press release, blog post, or an Amazon-hosted event. Minor feature updates, new skills, or integrations with existing models do not count.',
    'Technology',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.aboutamazon.com/news/',
    '2026-05-10T00:00:00Z',
    '2026-05-31T23:59:59Z',
    '2026-05-17T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- ── Geopolitics (4–5) ──────────────────────────────────────

  -- 4. EU adopts new Russia sanctions package
  (
    gen_random_uuid(),
    'Will the European Council formally adopt a new sanctions package against Russia before May 31, 2026?',
    'Resolution: YES if the European Council (or Council of the EU, acting on behalf of member states) formally adopts a new legal act imposing additional sanctions on Russia beyond what was already in force as of May 10, 2026. The sanctions must be adopted via the official EU decision-making process and published in the Official Journal of the European Union. Expansions of existing sanctions packages (adding new entities or persons to sanctions lists) that are adopted as part of a formal Council decision count. Individual member state actions without EU-level adoption do not count.',
    'Geopolitics',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.consilium.europa.eu/en/policies/sanctions/',
    '2026-05-10T00:00:00Z',
    '2026-05-31T23:59:59Z',
    '2026-05-17T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- 5. Philippines reports South China Sea confrontation
  (
    gen_random_uuid(),
    'Will the Philippines government publicly report a new confrontation with Chinese vessels in the South China Sea before May 31, 2026?',
    'Resolution: YES if the Philippine government (via the Department of Foreign Affairs, Coast Guard, or Armed Forces) publicly reports a new confrontation, incident, or dangerous encounter with Chinese vessels in the South China Sea before May 31, 2026 23:59 UTC. The report must be issued through official channels (press statement, social media account of the relevant agency, or official press conference). The incident must involve Chinese vessels and Philippine vessels or personnel. Routine surveillance reports or freedom of navigation operations without a confrontation do not count. Incidents reported by media without official Philippine government confirmation do not count.',
    'Geopolitics',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.dfa.gov.ph/',
    '2026-05-10T00:00:00Z',
    '2026-05-31T23:59:59Z',
    '2026-05-17T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- ── Economics (6–8) ──────────────────────────────────────

  -- 6. 10-year US Treasury yield >5%
  (
    gen_random_uuid(),
    'Will the 10-year US Treasury yield close above 5.0% on any trading day before May 31, 2026?',
    'Resolution: YES if the yield on the 10-year US Treasury note closes above 5.00% (as reported by the US Department of the Treasury or the Federal Reserve Bank of New York) on any trading day between May 10 and May 31, 2026 (inclusive). The closing yield is the daily benchmark rate published at the end of the trading session. Intraday spikes that close at or below 5.00% do not count. If the Treasury does not publish a yield for a given day (e.g., holiday), that day is excluded.',
    'Economics',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://home.treasury.gov/policy-issues/financing-the-government/interest-rate-statistics',
    '2026-05-10T00:00:00Z',
    '2026-05-31T23:59:59Z',
    '2026-05-17T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- 7. US Dollar Index (DXY) closes below 100
  (
    gen_random_uuid(),
    'Will the US Dollar Index (DXY) close below 100.00 on any trading day before May 31, 2026?',
    'Resolution: YES if the ICE US Dollar Index (DXY) closes below 100.00 on any trading day between May 10 and May 31, 2026 (inclusive). The resolution uses the official DXY daily settlement close published by Intercontinental Exchange (ICE). Intraday dips that recover to close at or above 100.00 do not count. Non-trading days (weekends, holidays) are excluded.',
    'Economics',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.ice.com/market-data/data-products/dollar-index',
    '2026-05-10T00:00:00Z',
    '2026-05-31T23:59:59Z',
    '2026-05-17T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- 8. WTI crude closes above $80/barrel
  (
    gen_random_uuid(),
    'Will WTI crude oil close above $80.00 per barrel on any trading day before May 31, 2026?',
    'Resolution: YES if the front-month WTI (West Texas Intermediate) crude oil futures contract closes above $80.00 per barrel on the NYMEX on any trading day between May 10 and May 31, 2026 (inclusive). The settlement price published by CME Group is the authoritative source. If the front-month contract rolls during this period, the new front-month contract price is used. Intraday spikes that do not appear in the daily settlement do not count.',
    'Economics',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.eia.gov/dnav/pet/pet_pri_fut_s1_d.htm',
    '2026-05-10T00:00:00Z',
    '2026-05-31T23:59:59Z',
    '2026-05-17T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- ── Sports (9–11) ──────────────────────────────────────

  -- 9. NBA #1 seed eliminated in conference semifinals
  (
    gen_random_uuid(),
    'Will a #1 seeded team in either NBA conference be eliminated in the conference semifinals (second round) of the 2026 NBA Playoffs?',
    'Resolution: YES if at least one of the two #1 seeded teams (Eastern Conference and Western Conference) loses their conference semifinals series. The #1 seed is determined by the official NBA regular season standings. If a #1 seed wins their first-round series but loses in the conference semifinals, this resolves as YES. If both #1 seeds advance to the conference finals, this resolves as NO. If a #1 seed is upset in the first round, this question resolves as NO (the question specifically asks about elimination in the conference semifinals). Series must conclude by May 20 for this resolution; if a series extends beyond May 20, it still counts.',
    'Sports',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.nba.com/playoffs',
    '2026-05-10T00:00:00Z',
    '2026-05-20T23:59:59Z',
    '2026-05-17T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- 10. Monaco Grand Prix red flag
  (
    gen_random_uuid(),
    'Will the 2026 Monaco Grand Prix (May 24) feature a red flag period?',
    'Resolution: YES if the 2026 Monaco Grand Prix is interrupted by a red flag at any point during the race (from the formation lap to the checkered flag). A red flag is defined as the official display of the red flag signal that suspends the race. The red flag must be officially recorded in the FIA race director''s report or the official Formula 1 race classification. A red flag during a practice session or qualifying does not count — only during the race itself. If the race is cancelled before it begins, this resolves as NO.',
    'Sports',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.formula1.com/en/results.html',
    '2026-05-10T00:00:00Z',
    '2026-05-24T23:59:59Z',
    '2026-05-17T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- 11. French Open men's singles: 5+ Americans in top 32 seeds
  (
    gen_random_uuid(),
    'Will the 2026 French Open men''s singles draw include 5 or more American players among the top 32 seeds?',
    'Resolution: YES if the official 2026 French Open men''s singles seedings (published by Roland Garros / FFT before the main draw) include at least 5 players representing the United States seeded 32nd or higher. The seeding is based on the official Roland Garros seedings list, which may differ slightly from the ATP rankings. Players who withdraw after the seedings are published but before the draw are still counted based on the original seeding list. If the tournament is cancelled, this resolves as NO.',
    'Sports',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.rolandgarros.com/en-us/',
    '2026-05-10T00:00:00Z',
    '2026-05-23T23:59:59Z',
    '2026-05-17T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- ── Science (12–13) ──────────────────────────────────────

  -- 12. NASA press conference: new JWST discovery
  (
    gen_random_uuid(),
    'Will NASA hold a dedicated press conference announcing a new James Webb Space Telescope discovery before May 31, 2026?',
    'Resolution: YES if NASA holds a dedicated press conference (not a routine image release or social media post) specifically to announce a new scientific discovery or finding from the James Webb Space Telescope before May 31, 2026 23:59 UTC. The press conference must be announced in advance on NASA''s official media advisory page and must include NASA scientists or officials presenting new findings. Routine image releases, data pipeline updates, or mentions of JWST within broader NASA events do not count. The press conference must be about a new discovery, not a previously announced finding.',
    'Science',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.nasa.gov/news/media-webcasts/',
    '2026-05-10T00:00:00Z',
    '2026-05-31T23:59:59Z',
    '2026-05-17T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- 13. FDA approves new obesity treatment drug
  (
    gen_random_uuid(),
    'Will the FDA approve a new molecular entity for the treatment of obesity before May 31, 2026?',
    'Resolution: YES if the US Food and Drug Administration (FDA) issues a new drug approval for a novel molecular entity (NME) specifically indicated for the treatment of obesity or weight management before May 31, 2026 23:59 UTC. The drug must be a new chemical or biological entity not previously approved by the FDA for any indication. New formulations, dosage forms, or additional indications for already-approved drugs (e.g., new semaglutide formulations, tirzepatide for obesity) do not count — must be a new molecular entity. The approval must be published on the FDA''s Drugs@FDA database or announced via FDA press release.',
    'Science',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.fda.gov/drugs/drug-approvals-and-databases',
    '2026-05-10T00:00:00Z',
    '2026-05-31T23:59:59Z',
    '2026-05-17T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- ── Crypto (14–15) ──────────────────────────────────────

  -- 14. Bitcoin dominance falls below 55%
  (
    gen_random_uuid(),
    'Will Bitcoin''s share of total cryptocurrency market capitalization fall below 55% at any point before May 31, 2026?',
    'Resolution: YES if Bitcoin''s dominance (BTC market cap / total cryptocurrency market cap × 100) falls below 55.0% at any single measurement point before May 31, 2026 23:59 UTC. The measurement uses CoinGecko''s real-time market dominance data (displayed on CoinGecko''s homepage or global charts page). If CoinGecko is temporarily unavailable, CoinMarketCap''s equivalent BTC dominance figure serves as fallback. The figure must appear on the aggregator''s snapshot — manual calculation is not required. Brief dips below 55% that appear on the chart count.',
    'Crypto',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.coingecko.com/en/global-charts',
    '2026-05-10T00:00:00Z',
    '2026-05-31T23:59:59Z',
    '2026-05-17T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- 15. XRP reaches $3.00
  (
    gen_random_uuid(),
    'Will Ripple (XRP) reach or exceed $3.00 at any point before May 31, 2026?',
    'Resolution: YES if XRP/USD spot price reaches ≥$3.00 on at least two major exchanges (from: Binance, Coinbase, Kraken, OKX) before May 31, 2026 23:59 UTC. Flash wicks lasting less than 1 minute on a single exchange without corroboration on at least one other major exchange do not count. Price must be visible on CoinGecko''s aggregated chart. Futures, perpetual swap, or derivative prices do not count.',
    'Crypto',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.coingecko.com/en/coins/ripple',
    '2026-05-10T00:00:00Z',
    '2026-05-31T23:59:59Z',
    '2026-05-17T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  );
