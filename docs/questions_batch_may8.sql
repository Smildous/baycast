-- ============================================================
-- Baycast — Prediction Questions Batch (May 8, 2026)
--
-- 18 questions for launch day (May 9, 2026).
-- All fresh topics, distinct from the May 5, May 6, and May 7 batches.
-- Run via Supabase SQL Editor or Management API.
-- ============================================================

INSERT INTO public.questions (id, title, description, category, question_type, options, resolution_source, opens_at, closes_at, blind_until, status, created_by)
VALUES

  -- ── Technology (1–3) ──────────────────────────────────────

  -- 1. Google Gemini 5 release
  (
    gen_random_uuid(),
    'Will Google announce and release Gemini 5 (or equivalent next-gen model) before July 31, 2026?',
    'Resolution: YES if Google publicly announces and makes available (via API or product integration) a model explicitly branded as "Gemini 5" or a next-generation flagship model that succeeds Gemini 2.5, before July 31, 2026 23:59 UTC. The announcement must come from an official Google source (blog, press release, or I/O keynote). A research paper alone without a public release does not count. Internal-only models or model updates to Gemini 2.5 (e.g., 2.5 Pro v2) do not count.',
    'Technology',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://blog.google/technology/ai/',
    '2026-05-09T00:00:00Z',
    '2026-07-31T23:59:59Z',
    '2026-05-16T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- 2. EU AI Act first enforcement action
  (
    gen_random_uuid(),
    'Will the European Commission issue its first enforcement action under the EU AI Act before September 1, 2026?',
    'Resolution: YES if the European Commission publicly announces a formal enforcement action (fine, compliance order, or prohibition) against a company for violating the EU AI Act''s prohibited practices or high-risk obligations before September 1, 2026 23:59 UTC. Preliminary investigations, guidance documents, or codes of practice without enforcement do not count. The action must be publicly named and attributed to the EU AI Act.',
    'Technology',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai',
    '2026-05-09T00:00:00Z',
    '2026-09-01T23:59:59Z',
    '2026-05-16T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- 3. Tesla commercial robotaxi launch
  (
    gen_random_uuid(),
    'Will Tesla launch a commercial robotaxi service in at least one US city before September 1, 2026?',
    'Resolution: YES if Tesla publicly launches a commercial robotaxi ride-hailing service available to the general public in at least one US city before September 1, 2026 23:59 UTC. The service must allow non-Tesla-employee riders to request and complete rides in fully autonomous (no human safety driver) Tesla vehicles. A limited beta or employee-only program does not count. The launch must be confirmed by Tesla via official channels.',
    'Technology',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://ir.tesla.com/',
    '2026-05-09T00:00:00Z',
    '2026-09-01T23:59:59Z',
    '2026-05-16T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- ── Geopolitics (4–6) ──────────────────────────────────────

  -- 4. UK snap election called
  (
    gen_random_uuid(),
    'Will Keir Starmer call a UK general election before August 1, 2026?',
    'Resolution: YES if the UK Prime Minister requests the dissolution of Parliament for a general election before August 1, 2026 23:59 UTC. The formal announcement must be made via official channels (Prime Minister''s Office, 10 Downing Street). Speculation, media reports, or opposition calls for election without a Prime Ministerial announcement do not count.',
    'Geopolitics',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://commonslibrary.parliament.uk/research-briefings/cbp-8757/',
    '2026-05-09T00:00:00Z',
    '2026-08-01T23:59:59Z',
    '2026-05-16T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- 5. North Korea ICBM test
  (
    gen_random_uuid(),
    'Will North Korea conduct a full-range ICBM test (launch range >5,500 km) before July 31, 2026?',
    'Resolution: YES if North Korea conducts a missile launch that is assessed by South Korean or Japanese defense authorities (or US Indo-Pacific Command) as an ICBM-class test with a range exceeding 5,500 km before July 31, 2026 23:59 UTC. The assessment must come from an official government source. Shorter-range ballistic missile tests, satellite launches, or failed launches that do not achieve ICBM-range trajectory do not count.',
    'Geopolitics',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.reuters.com/world/asia-pacific/',
    '2026-05-09T00:00:00Z',
    '2026-07-31T23:59:59Z',
    '2026-05-16T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- 6. ASEAN Iran economic cooperation agreement
  (
    gen_random_uuid(),
    'Will ASEAN announce a formal trade or economic cooperation agreement specifically addressing the Iran conflict''s impact before July 31, 2026?',
    'Resolution: YES if ASEAN leaders issue a formal joint statement, declaration, or framework agreement that includes specific economic measures (tariff adjustments, energy cooperation, trade diversification, or supply chain measures) directly addressing economic disruptions caused by the Iran conflict. The document must be published on ASEAN''s official website or announced by the ASEAN Secretariat before July 31, 2026 23:59 UTC. General statements about economic resilience without specific Iran-conflict measures do not count.',
    'Geopolitics',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://asean.org/',
    '2026-05-09T00:00:00Z',
    '2026-07-31T23:59:59Z',
    '2026-05-16T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- ── Economics (7–9) ──────────────────────────────────────

  -- 7. New Fed chair rate cut at first meeting
  (
    gen_random_uuid(),
    'Will the new US Federal Reserve chair cut the federal funds rate at their first FOMC meeting?',
    'Resolution: YES if the newly appointed Federal Reserve chair (whoever holds the position as of their first scheduled FOMC meeting after taking office) presides over a meeting that results in a cut to the target range for the federal funds rate. The cut must occur at the new chair''s first FOMC meeting. A cut of any size counts. If the new chair''s first meeting does not include a rate decision, resolution is based on the first meeting that does. If no new Fed chair is appointed by July 30, 2026, this question resolves as NO.',
    'Economics',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.federalreserve.gov/newsevents/pressreleases.htm',
    '2026-05-09T00:00:00Z',
    '2026-07-30T23:59:59Z',
    '2026-05-16T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- 8. US unemployment exceeds 4.5%
  (
    gen_random_uuid(),
    'Will the US unemployment rate exceed 4.5% in any month (April–June 2026 BLS reports)?',
    'Resolution: YES if the BLS reports a seasonally adjusted U-3 unemployment rate exceeding 4.5% for any single month covering April, May, or June 2026 (published in the May, June, or July Employment Situation reports, respectively). The April report is published ~May 2, May report ~June 5, June report ~July 3. Resolves based on the headline U-3 figure (not U-6). If any report shows >4.5%, resolves as YES.',
    'Economics',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.bls.gov/news.release/empsit.nr0.htm',
    '2026-05-09T00:00:00Z',
    '2026-07-05T23:59:59Z',
    '2026-05-16T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- 9. S&P 500 correction (10%+ decline)
  (
    gen_random_uuid(),
    'Will the S&P 500 experience a correction (decline of 10%+ from an all-time high) before September 1, 2026?',
    'Resolution: YES if the S&P 500 index declines by 10% or more from a closing all-time high reached at any point between May 9, 2026 and September 1, 2026. The decline must be confirmed by a closing price at least 10% below the most recent all-time closing high. Intraday declines that close above the 10% threshold do not count. The all-time high reference point resets whenever a new closing high is achieved.',
    'Economics',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://finance.yahoo.com/quote/%5EGSPC/',
    '2026-05-09T00:00:00Z',
    '2026-09-01T23:59:59Z',
    '2026-05-16T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- ── Crypto (10–11) ──────────────────────────────────────

  -- 10. Solana reaches $300
  (
    gen_random_uuid(),
    'Will Solana (SOL) reach or exceed $300 at any point before July 31, 2026?',
    'Resolution: YES if SOL/USD spot price reaches $300.00 or higher on at least one major exchange (Coinbase, Binance, Kraken) before July 31, 2026 23:59 UTC. Flash wicks lasting less than 1 minute on a single exchange without corroboration on at least one other major exchange do not count. Price must be visible on CoinGecko''s aggregated chart. Futures prices do not count.',
    'Crypto',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.coingecko.com/en/coins/solana',
    '2026-05-09T00:00:00Z',
    '2026-07-31T23:59:59Z',
    '2026-05-16T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- 11. SEC finalizes stablecoin regulations
  (
    gen_random_uuid(),
    'Will the US SEC finalize and publish comprehensive stablecoin regulations before September 1, 2026?',
    'Resolution: YES if the SEC publishes a final rule in the Federal Register establishing new regulatory requirements for stablecoin issuers before September 1, 2026 23:59 UTC. The rule must address reserve requirements, redemption rights, or issuer obligations. Proposed rules, guidance documents, enforcement actions, or congressional testimony without a final published rule do not count. Must be published under SEC authority.',
    'Crypto',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.sec.gov/rules/final.shtml',
    '2026-05-09T00:00:00Z',
    '2026-09-01T23:59:59Z',
    '2026-05-16T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- ── Sports (12–14) ──────────────────────────────────────

  -- 12. NBA MVP: international player
  (
    gen_random_uuid(),
    'Will an international (non-US) player win the 2025-26 NBA MVP award?',
    'Resolution: YES if the NBA''s 2025-26 regular season MVP award is given to a player who was born outside the United States and does not hold US citizenship. Dual citizens born outside the US count. Players born in US territories count as US players. Resolves based on the official NBA announcement, typically in late June.',
    'Sports',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.nba.com/news/awards',
    '2026-05-09T00:00:00Z',
    '2026-06-25T23:59:59Z',
    '2026-05-16T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- 13. Champions League final: extra time or penalties
  (
    gen_random_uuid(),
    'Will the 2026 UEFA Champions League final go to extra time or penalties?',
    'Resolution: YES if the 2026 UEFA Champions League final (May 31, 2026, Munich) is level at the end of regular time (90 minutes), requiring extra time and/or a penalty shootout to determine the winner. If the match is decided within 90 minutes of regular play, this resolves as NO. Abandoned matches are excluded.',
    'Sports',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.uefa.com/uefachampionsleague/',
    '2026-05-09T00:00:00Z',
    '2026-05-31T23:59:59Z',
    '2026-05-16T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- 14. Iga Świątek wins French Open
  (
    gen_random_uuid(),
    'Will Iga Świątek win the 2026 French Open women''s singles title?',
    'Resolution: YES if Iga Świątek wins the women''s singles final at Roland Garros 2026 (May 25 – June 7). If she withdraws due to injury before or during the tournament, this resolves as NO. The tournament must be completed for this question to resolve; if cancelled, it resolves as NO.',
    'Sports',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.rolandgarros.com/en-us/',
    '2026-05-09T00:00:00Z',
    '2026-06-07T23:59:59Z',
    '2026-05-16T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- ── Science (15–16) ──────────────────────────────────────

  -- 15. India Gaganyaan crewed launch
  (
    gen_random_uuid(),
    'Will India''s Gaganyaan mission successfully launch a crewed spacecraft before September 30, 2026?',
    'Resolution: YES if the Indian Space Research Organisation (ISRO) launches a Gaganyaan mission carrying at least one Indian astronaut (vyomnaut) to low Earth orbit before September 30, 2026 23:59 UTC. The vehicle must clear the launch pad (liftoff). Uncrewed test flights do not count. Scrubs, aborts, or pad tests without liftoff do not count. Must be confirmed by ISRO official channels.',
    'Science',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.isro.gov.in/Gaganyaan.html',
    '2026-05-09T00:00:00Z',
    '2026-09-30T23:59:59Z',
    '2026-05-16T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- 16. AI-designed drug enters Phase 2+ trials
  (
    gen_random_uuid(),
    'Will an AI-discovered or AI-designed drug enter Phase 2 or later clinical trials before September 1, 2026, with the AI contribution publicly disclosed?',
    'Resolution: YES if a drug candidate where AI was used for the primary discovery or molecular design (not just auxiliary analysis) enters Phase 2, Phase 2/3, or Phase 3 clinical trials before September 1, 2026 23:59 UTC. The AI contribution must be publicly disclosed by the developing company or in the clinical trial listing on ClinicalTrials.gov. AI-assisted repurposing of existing drugs counts only if AI was used for the novel therapeutic application identification. The trial must be actively recruiting or ongoing.',
    'Science',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://clinicaltrials.gov/',
    '2026-05-09T00:00:00Z',
    '2026-09-01T23:59:59Z',
    '2026-05-16T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- ── Culture (17–18) ──────────────────────────────────────

  -- 17. Cannes Best Director: first-time feature filmmaker
  (
    gen_random_uuid(),
    'Will the Best Director award at the 2026 Cannes Film Festival go to a first-time feature film director?',
    'Resolution: YES if the winner of the Best Director award at the 2026 Cannes Film Festival (May 13–24) has never previously directed a feature-length narrative film (60+ minutes) that received a commercial theatrical release before this award. Directors who have only made short films, documentaries, or television episodes qualify as "first-time feature film directors." Co-directors: if either has prior feature experience, counts as NO. Resolves based on the official Cannes announcement.',
    'Culture',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.festival-cannes.com/en/',
    '2026-05-09T00:00:00Z',
    '2026-05-24T23:59:59Z',
    '2026-05-16T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- 18. Grammys Album of Year: female solo artist
  (
    gen_random_uuid(),
    'Will an album by a female solo artist win Album of the Year at the 2027 Grammy Awards?',
    'Resolution: YES if the Album of the Year winner at the 67th Annual Grammy Awards (2027 ceremony, covering the October 2025 – September 2026 eligibility period) is credited to a female solo artist (one named artist, identified as female). Collaborative albums with a female lead artist and male featured artists count as YES. Groups, bands, or male solo artists count as NO. Non-binary artists are resolved on a case-by-case basis based on public identification.',
    'Culture',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.grammy.com/',
    '2026-05-09T00:00:00Z',
    '2027-02-02T23:59:59Z',
    '2026-05-16T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  );
