-- ============================================================
-- Baycast — Prediction Questions Batch (May 6, 2026)
--
-- 15 questions, medium-horizon (Jul 2026 – Jan 2027).
-- Fresh topics, distinct from the May 5 launch batch.
-- Run via Supabase SQL Editor or Management API.
-- ============================================================

INSERT INTO public.questions (id, title, description, category, question_type, options, resolution_source, opens_at, closes_at, blind_until, status, created_by)
VALUES

  -- ── Geopolitics (1–2) ──────────────────────────────────────

  -- 1. US-Iran formal peace agreement
  (
    gen_random_uuid(),
    'Will a formal peace agreement ending the US-Iran conflict be signed before September 1, 2026?',
    'Resolution: YES if the United States and Iran sign a document officially designated as a peace agreement, ceasefire agreement, or armistice that both governments publicly acknowledge as ending the current military conflict before September 1, 2026 23:59 UTC. The document must be announced by both governments or a recognized mediator. Temporary ceasefires, humanitarian pauses, or framework agreements without formal signing do not count.',
    'Geopolitics',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.reuters.com/world/',
    '2026-05-06T00:00:00Z',
    '2026-09-01T23:59:59Z',
    '2026-05-13T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- 2. Russia-Ukraine 60-day ceasefire
  (
    gen_random_uuid(),
    'Will Russia and Ukraine agree to a formal ceasefire lasting at least 60 days before October 1, 2026?',
    'Resolution: YES if both Russia and Ukraine publicly announce and implement a ceasefire that lasts at least 60 consecutive calendar days before October 1, 2026 23:59 UTC. The ceasefire must cover all active combat zones and be officially acknowledged by both governments. Brief local violations (under 48 hours) that do not lead to the official collapse of the ceasefire do not break the streak. Prisoner exchanges, humanitarian corridors, or partial truces limited to specific regions do not count.',
    'Geopolitics',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.reuters.com/world/europe/',
    '2026-05-06T00:00:00Z',
    '2026-10-01T23:59:59Z',
    '2026-05-13T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- ── Economics (3–4) ────────────────────────────────────────

  -- 3. ECB rate cut at July meeting
  (
    gen_random_uuid(),
    'Will the European Central Bank cut its deposit facility rate at the July 2026 meeting?',
    'Resolution: YES if the ECB Governing Council lowers the deposit facility rate at its July 16, 2026 monetary policy meeting. A cut of any size counts. Maintaining or raising the rate counts as NO. If the July meeting is cancelled, resolution is based on the next scheduled ECB rate decision before September 1, 2026.',
    'Economics',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.ecb.europa.eu/press/html/index.en.html',
    '2026-05-06T00:00:00Z',
    '2026-07-17T23:59:59Z',
    '2026-05-13T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- 4. Brent crude below $60/barrel
  (
    gen_random_uuid(),
    'Will Brent crude oil price drop below $60 per barrel at any point before August 1, 2026?',
    'Resolution: YES if the spot price of Brent crude oil falls below $60.00 per barrel on at least one trading day before August 1, 2026 23:59 UTC as reported by the EIA or ICE Brent futures front-month settlement. Flash wicks in intraday trading that do not appear in the daily settlement price do not count.',
    'Economics',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.eia.gov/',
    '2026-05-06T00:00:00Z',
    '2026-08-01T23:59:59Z',
    '2026-05-13T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- ── Technology (5–6, 15) ───────────────────────────────────

  -- 5. Anthropic >90% on SWE-bench Verified
  (
    gen_random_uuid(),
    'Will Anthropic release a model that scores above 90% on the SWE-bench Verified benchmark before October 1, 2026?',
    'Resolution: YES if Anthropic publishes an official blog post or paper claiming their model achieves >90% on the SWE-bench Verified benchmark, and the result appears on the official SWE-bench leaderboard before October 1, 2026 23:59 UTC. The result must be achieved without prohibited aids (e.g., unmodified codebase, no human edits). Independent verification is not required but the submission must be listed on the official leaderboard.',
    'Technology',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.swebench.com/',
    '2026-05-06T00:00:00Z',
    '2026-10-01T23:59:59Z',
    '2026-05-13T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- 6. Apple foldable device ships
  (
    gen_random_uuid(),
    'Will Apple ship a foldable iPhone or iPad device to consumers before December 31, 2026?',
    'Resolution: YES if Apple officially announces and begins shipping a consumer device with a foldable display (phone or tablet) bearing the iPhone or iPad brand before December 31, 2026 23:59 UTC. The device must be available for purchase by the general public, not limited to a prototype, developer-only device, or internal testing. Concept devices, patents, or supply-chain rumors without an official product launch do not count.',
    'Technology',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.apple.com/newsroom/',
    '2026-05-06T00:00:00Z',
    '2026-12-31T23:59:59Z',
    '2026-05-13T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- ── Science (7–8) ─────────────────────────────────────────

  -- 7. NASA Artemis II crewed launch
  (
    gen_random_uuid(),
    'Will NASA Artemis II crewed mission launch before December 31, 2026?',
    'Resolution: YES if a NASA Artemis II mission with crew launches into orbit before December 31, 2026 23:59 UTC. The vehicle must clear the launch pad (liftoff). Scrubs, aborts, or static fire tests without liftoff do not count. If NASA officially redesignates the mission number but launches the same crew on the same lunar flyby trajectory, it counts.',
    'Science',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.nasa.gov/artemis/',
    '2026-05-06T00:00:00Z',
    '2026-12-31T23:59:59Z',
    '2026-05-13T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- 8. Nobel Physics → quantum computing
  (
    gen_random_uuid(),
    'Will the 2026 Nobel Prize in Physics be awarded for quantum computing or quantum information research?',
    'Resolution: YES if the Royal Swedish Academy of Sciences awards the 2026 Nobel Prize in Physics to one or more individuals for research primarily focused on quantum computing, quantum information theory, quantum entanglement applications in computing, or quantum error correction. The Nobel Committee official motivation/press release is the authoritative source. If awarded for a broader topic that includes quantum computing as a secondary contribution, this counts as YES only if the official citation explicitly mentions quantum computing or quantum information.',
    'Science',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.nobelprize.org/',
    '2026-05-06T00:00:00Z',
    '2026-10-15T23:59:59Z',
    '2026-05-13T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- ── Sports (9–10) ──────────────────────────────────────────

  -- 9. European team wins World Cup
  (
    gen_random_uuid(),
    'Will a European team win the 2026 FIFA World Cup?',
    'Resolution: YES if the winner of the 2026 FIFA World Cup final (played on July 19, 2026) is a national team from UEFA (Europe). All current UEFA member associations qualify as European. Host nations USA (CONCACAF), Mexico (CONCACAF), and Canada (CONCACAF) do not count as European. If the tournament is cancelled, this question resolves as NO.',
    'Sports',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.fifa.com/fifaplus/en/tournaments/mens/worldcup/canadamexicousa2026',
    '2026-05-06T00:00:00Z',
    '2026-07-19T23:59:59Z',
    '2026-05-13T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- 10. NFL QB >5,500 passing yards
  (
    gen_random_uuid(),
    'Will an NFL quarterback throw for over 5,500 passing yards in the 2026 regular season?',
    'Resolution: YES if any NFL quarterback accumulates more than 5,500 passing yards during the 2026 NFL regular season (Weeks 1–18) as recorded in official NFL statistics. The record must be achieved during the regular season only; postseason stats do not count. Source: NFL.com official player statistics.',
    'Sports',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.nfl.com/stats/',
    '2026-05-06T00:00:00Z',
    '2027-01-05T23:59:59Z',
    '2026-05-13T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- ── Crypto (11–12) ─────────────────────────────────────────

  -- 11. ETH exceeds $5,000
  (
    gen_random_uuid(),
    'Will Ethereum price exceed $5,000 at any point before November 1, 2026?',
    'Resolution: YES if ETH/USD spot price reaches ≥$5,000 on at least one major exchange (Coinbase, Binance, Kraken) before November 1, 2026 23:59 UTC. Flash wicks lasting less than 1 minute on a single exchange without corroboration on at least one other major exchange do not count. Price must be visible on CoinGecko aggregated chart.',
    'Crypto',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.coingecko.com/en/coins/ethereum',
    '2026-05-06T00:00:00Z',
    '2026-11-01T23:59:59Z',
    '2026-05-13T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- 12. Stablecoin market cap >$250B
  (
    gen_random_uuid(),
    'Will the total market capitalization of all stablecoins exceed $250 billion before December 31, 2026?',
    'Resolution: YES if the combined market capitalization of all stablecoins (tracked on CoinGecko stablecoins category) reaches or exceeds $250 billion at any point before December 31, 2026 23:59 UTC. Market cap is calculated as circulating supply × price. The measurement must appear on CoinGecko aggregated data.',
    'Crypto',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.coingecko.com/en/categories/stablecoins',
    '2026-05-06T00:00:00Z',
    '2026-12-31T23:59:59Z',
    '2026-05-13T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- ── Entertainment (13–14) ─────────────────────────────────

  -- 13. Marvel Studios $1B film in 2026
  (
    gen_random_uuid(),
    'Will a Marvel Studios film released in 2026 gross over $1 billion worldwide?',
    'Resolution: YES if at least one film distributed by Marvel Studios with a theatrical release date between January 1 and December 31, 2026 reaches ≥$1,000,000,000 in cumulative worldwide theatrical gross by December 31, 2026 23:59 UTC. The gross figure must include all territories. Source: Box Office Mojo or The Numbers.',
    'Entertainment',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.boxofficemojo.com/',
    '2026-05-06T00:00:00Z',
    '2026-12-31T23:59:59Z',
    '2026-05-13T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- 14. Global box office >$35B in 2026
  (
    gen_random_uuid(),
    'Will the total global box office for all films in 2026 exceed $35 billion?',
    'Resolution: YES if the total worldwide theatrical box office revenue for all films released in calendar year 2026 exceeds $35 billion. The figure includes all territories and all films that generated theatrical revenue in 2026. Source: Comscore annual theatrical market report or Box Office Mojo global annual totals. If no authoritative annual total is published by January 15, 2027, resolution is based on the best available cumulative data from Comscore or Box Office Mojo.',
    'Entertainment',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.comscore.com/Insights/Box-Office',
    '2026-05-06T00:00:00Z',
    '2027-01-15T23:59:59Z',
    '2026-05-13T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- ── Technology (15) ────────────────────────────────────────

  -- 15. US federal AI regulation signed into law
  (
    gen_random_uuid(),
    'Will the US Congress pass comprehensive federal AI regulation legislation signed into law before December 31, 2026?',
    'Resolution: YES if the US Congress passes and the President signs into law a bill that establishes new federal regulatory requirements specifically for artificial intelligence systems before December 31, 2026 23:59 UTC. The law must create binding obligations for AI developers or deployers (e.g., safety testing, model registration, risk assessments, or deployment restrictions). Executive orders, agency guidance documents, voluntary frameworks, defense-only AI legislation, or appropriations bills without binding AI requirements do not count. The law must be published on Congress.gov or the White House official site.',
    'Technology',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.congress.gov/',
    '2026-05-06T00:00:00Z',
    '2026-12-31T23:59:59Z',
    '2026-05-13T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  );
