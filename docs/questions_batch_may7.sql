-- ============================================================
-- Baycast — Prediction Questions Batch (May 7, 2026)
--
-- 15 questions, short-horizon (May–July 2026).
-- All resolve by July 31, 2026. Diverse categories.
-- Fresh topics, distinct from the May 5 and May 6 batches.
-- Run via Supabase SQL Editor or Management API.
-- ============================================================

INSERT INTO public.questions (id, title, description, category, question_type, options, resolution_source, opens_at, closes_at, blind_until, status, created_by)
VALUES

  -- ── Sports (1–3) ──────────────────────────────────────────

  -- 1. FIFA World Cup: Brazil reaches semifinals
  (
    gen_random_uuid(),
    'Will Brazil reach the semifinals of the 2026 FIFA World Cup?',
    'Resolution: YES if Brazil wins their quarterfinal match at the 2026 FIFA World Cup (or advances via penalty shootout), thereby qualifying for the semifinal round. If Brazil is eliminated in the group stage or round of 16, this resolves as NO. If Brazil advances directly to the semifinal via a walkover or opponent disqualification, this counts as YES.',
    'Sports',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.fifa.com/fifaplus/en/tournaments/mens/worldcup/canadamexicousa2026',
    '2026-05-07T00:00:00Z',
    '2026-07-15T23:59:59Z',
    '2026-05-14T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- 2. Wimbledon: a player from USA wins singles title
  (
    gen_random_uuid(),
    'Will an American player win a Wimbledon 2026 singles title (men''s or women''s)?',
    'Resolution: YES if any player representing the United States wins either the men''s singles or women''s singles final at the 2026 Wimbledon Championships (June 29 – July 12, 2026). If a player with dual citizenship representing the US wins, this counts. The title must be won in the main draw, not in junior, wheelchair, or invitational events.',
    'Sports',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.wimbledon.com/en_GB/scores/index.html',
    '2026-05-07T00:00:00Z',
    '2026-07-12T23:59:59Z',
    '2026-05-14T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- 3. French Open: non-top-10 seed wins men's title
  (
    gen_random_uuid(),
    'Will a player seeded outside the top 10 win the 2026 French Open men''s singles title?',
    'Resolution: YES if the winner of the 2026 French Open men''s singles (Roland Garros, May 24 – June 7, 2026) was seeded 11th or lower, or was unseeded, in the tournament draw. The seed number is determined by the official Roland Garros draw published before the tournament begins. If a top-10 seeded player withdraws after the draw and is replaced by a lucky loser or alternate who goes on to win, the replacement player''s actual seeding at the time of the draw is used. Seed numbers 1–10 count as "top 10."',
    'Sports',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.rolandgarros.com/en-us/',
    '2026-05-07T00:00:00Z',
    '2026-06-07T23:59:59Z',
    '2026-05-14T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- ── Geopolitics (4–5) ──────────────────────────────────────

  -- 4. Colombia presidential election: Petro-allied candidate wins
  (
    gen_random_uuid(),
    'Will a candidate from the Historic Pact coalition or directly endorsed by Gustavo Petro win the 2026 Colombian presidential election?',
    'Resolution: YES if the winner of the 2026 Colombian presidential election (first round May 31, 2026; possible second round June 20, 2026) is a member of or directly endorsed by the Historic Pact coalition (Pacto Histórico), the coalition founded by outgoing President Gustavo Petro. If the candidate runs under a different party banner but has a formal endorsement from Petro or the Historic Pact leadership, this counts as YES. Independent candidates without Historic Pact affiliation count as NO.',
    'Geopolitics',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.reuters.com/world/americas/',
    '2026-05-07T00:00:00Z',
    '2026-06-20T23:59:59Z',
    '2026-05-14T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- 5. US-South Korea tariff deal reached
  (
    gen_random_uuid(),
    'Will the United States and South Korea announce a new bilateral trade agreement or tariff reduction deal before July 31, 2026?',
    'Resolution: YES if the US and South Korean governments publicly announce a bilateral trade agreement, tariff reduction deal, or formal framework to reduce tariffs between the two countries before July 31, 2026 23:59 UTC. The announcement must come from an official government source (e.g., USTR, South Korean Ministry of Trade). A memorandum of understanding, framework agreement, or executive order explicitly addressing US-SK tariffs counts. Informal talks, "exploratory discussions," or statements of intent without a concrete agreement do not count.',
    'Geopolitics',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.reuters.com/world/asia-pacific/',
    '2026-05-07T00:00:00Z',
    '2026-07-31T23:59:59Z',
    '2026-05-14T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- ── Economics (6–7) ────────────────────────────────────────

  -- 6. US Fed cuts rate at July meeting
  (
    gen_random_uuid(),
    'Will the US Federal Reserve cut the federal funds rate at the July 2026 FOMC meeting?',
    'Resolution: YES if the Federal Open Market Committee lowers the target range for the federal funds rate at its July 28–29, 2026 meeting. A cut of any size (e.g., 25 bps) counts. Maintaining or raising the rate counts as NO. If the July meeting is cancelled or the rate decision is deferred, the next scheduled FOMC rate decision before September 30, 2026 is used instead.',
    'Economics',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.federalreserve.gov/newsevents/pressreleases.htm',
    '2026-05-07T00:00:00Z',
    '2026-07-30T23:59:59Z',
    '2026-05-14T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- 7. Bitcoin above $150,000 at any point
  (
    gen_random_uuid(),
    'Will Bitcoin (BTC) reach or exceed $150,000 at any point before July 31, 2026?',
    'Resolution: YES if the price of Bitcoin (BTC/USD) reaches or exceeds $150,000.00 on at least one occasion before July 31, 2026 23:59 UTC. The price is measured by the CoinGecko BTC/USD composite price (or Binance spot price if CoinGecko is unavailable). Intraday spikes that appear in the spot price count. Futures prices do not count.',
    'Crypto',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.coingecko.com/en/coins/bitcoin',
    '2026-05-07T00:00:00Z',
    '2026-07-31T23:59:59Z',
    '2026-05-14T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- ── Technology (8–10) ──────────────────────────────────────

  -- 8. GPT-5 class model scores >90% on GPQA Diamond
  (
    gen_random_uuid(),
    'Will any publicly released AI model score above 90% on GPQA Diamond before July 31, 2026?',
    'Resolution: YES if any AI model available to the public (API or open-weight) achieves a score above 90.0% on the GPQA Diamond benchmark (Graduate-Level Google-Proof Q&A) as reported on the official leaderboard or in a peer-reviewed paper before July 31, 2026 23:59 UTC. The score must be achieved with standard evaluation (no prohibited tools unless allowed by the benchmark protocol). Chain-of-thought and multi-turn setups allowed if benchmark permits. The model must be released by a recognized AI lab (e.g., OpenAI, Anthropic, Google DeepMind, Meta, xAI, or similar).',
    'Technology',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://arxiv.org/list/cs.AI/recent',
    '2026-05-07T00:00:00Z',
    '2026-07-31T23:59:59Z',
    '2026-05-14T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- 9. Apple announces AI hardware device at WWDC
  (
    gen_random_uuid(),
    'Will Apple announce a dedicated AI hardware device (not a Mac, iPhone, or iPad) at WWDC 2026?',
    'Resolution: YES if Apple announces a new hardware product category specifically positioned as an AI device (e.g., smart glasses, AI pin, home hub with dedicated AI chip, robot, or similar) at WWDC 2026 (expected June 9–13, 2026). The product must be a distinct new hardware category — updated Macs, iPhones, iPads, Apple Watches, or AirPods with AI features do not count. The announcement must include a name and description; a concept or teaser without product details does not count.',
    'Technology',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.apple.com/newsroom/',
    '2026-05-07T00:00:00Z',
    '2026-06-14T23:59:59Z',
    '2026-05-14T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- 10. SpaceX Starship completes full orbital flight
  (
    gen_random_uuid(),
    'Will SpaceX Starship complete a full orbital flight and successful reentry/landing before July 31, 2026?',
    'Resolution: YES if a SpaceX Starship vehicle (Super Heavy booster + Starship upper stage) completes a full orbital trajectory and the upper stage successfully performs reentry and landing (or splashdown in a controlled manner) before July 31, 2026 23:59 UTC. The upper stage must survive reentry and reach its intended landing/splashdown zone. A test that achieves orbit but results in loss of vehicle during reentry does not count. Both the launch and landing must be confirmed by SpaceX or official tracking sources.',
    'Technology',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.spacex.com/launches/',
    '2026-05-07T00:00:00Z',
    '2026-07-31T23:59:59Z',
    '2026-05-14T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- ── Science (11–12) ────────────────────────────────────────

  -- 11. WHO declares end of mpox PHEIC
  (
    gen_random_uuid(),
    'Will the WHO declare an end to the mpox (clade Ib) Public Health Emergency of International Concern before July 31, 2026?',
    'Resolution: YES if the World Health Organization Director-General officially declares the end of the current mpox Public Health Emergency of International Concern (PHEIC) before July 31, 2026 23:59 UTC. The declaration must be a formal WHO announcement. If a new PHEIC is declared for a different clade while the current one is still active, this question resolves based on the original clade Ib PHEIC status only.',
    'Science',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.who.int/emergencies/emergency-events',
    '2026-05-07T00:00:00Z',
    '2026-07-31T23:59:59Z',
    '2026-05-14T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- 12. Space Launch: first crewed flight of Boeing Starliner after return to flight
  (
    gen_random_uuid(),
    'Will Boeing Starliner conduct a crewed flight mission before July 31, 2026?',
    'Resolution: YES if Boeing Starliner launches with at least one NASA astronaut aboard on an operational or test mission to the International Space Station before July 31, 2026 23:59 UTC. Liftoff must occur. A launch that results in an abort after ignition but before significant altitude counts if NASA classifies it as a launch attempt. If the vehicle reaches orbit without crew (cargo only), this does not count.',
    'Science',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.nasa.gov/mission/crew-flight-test/',
    '2026-05-07T00:00:00Z',
    '2026-07-31T23:59:59Z',
    '2026-05-14T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- ── Culture (13–14) ────────────────────────────────────────

  -- 13. A non-English-language film wins the Palme d'Or at Cannes 2026
  (
    gen_random_uuid(),
    'Will a film not primarily in English win the Palme d''Or at the 2026 Cannes Film Festival?',
    'Resolution: YES if the Palme d''Or winner at the 2026 Cannes Film Festival (May 13–24, 2026) is a film whose primary language is not English. If the film is in multiple languages, English must not be the dominant language (>50% of dialogue). Co-productions where English is one of several languages count based on the dominant language. Silent films (no dialogue) count as NO (neither English nor non-English).',
    'Culture',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.festival-cannes.com/en/',
    '2026-05-07T00:00:00Z',
    '2026-05-24T23:59:59Z',
    '2026-05-14T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- 14. The Super Mario Galaxy Movie crosses $2 billion worldwide
  (
    gen_random_uuid(),
    'Will "The Super Mario Galaxy Movie" gross over $2 billion worldwide at the box office by July 31, 2026?',
    'Resolution: YES if "The Super Mario Galaxy Movie" (Universal Pictures, released April 2026) has a cumulative worldwide theatrical box office gross exceeding $2,000,000,000 (USD) by July 31, 2026 23:59 UTC. Source: Box Office Mojo or The Numbers. Re-releases, IMAX re-releases, and special screenings that contribute to the official total are included. Home video, streaming, and merchandising revenue do not count.',
    'Culture',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.boxofficemojo.com/',
    '2026-05-07T00:00:00Z',
    '2026-07-31T23:59:59Z',
    '2026-05-14T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- ── Crypto (15) ────────────────────────────────────────────

  -- 15. Ethereum L2 total TVL exceeds Ethereum L1 TVL
  (
    gen_random_uuid(),
    'Will the total TVL (Total Value Locked) across all Ethereum Layer 2 networks exceed the TVL on Ethereum Layer 1 before July 31, 2026?',
    'Resolution: YES if the combined TVL of all Ethereum Layer 2 networks (as listed on L2Beat) exceeds the Ethereum Layer 1 staking + DeFi TVL (as listed on DefiLlama under the "Ethereum" chain) at any single measurement point before July 31, 2026 23:59 UTC. The comparison uses USD-denominated TVL. Both L2Beat and DefiLlama must independently show the crossover. If one source is unavailable, the other suffices. Temporary spikes count.',
    'Crypto',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://l2beat.com/',
    '2026-05-07T00:00:00Z',
    '2026-07-31T23:59:59Z',
    '2026-05-14T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  );
