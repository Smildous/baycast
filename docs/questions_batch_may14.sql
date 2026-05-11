-- ============================================================
-- Baycast — Prediction Questions Batch (May 14, 2026)
--
-- 14 questions with medium-horizon resolutions (May–July 2026).
-- All fresh topics, distinct from the May 13 batch.
-- Run via Supabase SQL Editor or Management API.
-- ============================================================

INSERT INTO public.questions (id, title, description, category, question_type, options, resolution_source, opens_at, closes_at, blind_until, status, created_by)
VALUES

  -- ── Technology (1–3) ──────────────────────────────────────

  -- 1. Apple announces AI agent framework at WWDC 2026
  (
    gen_random_uuid(),
    'Will Apple announce a dedicated AI agent framework or "agentic AI" product at WWDC 2026?',
    'Resolution: YES if Apple publicly announces a dedicated AI agent framework, agentic AI product, or autonomous AI assistant capability at its WWDC 2026 keynote (expected June 2026) before June 30, 2026 23:59 UTC. The announcement must describe the product as capable of performing multi-step tasks autonomously on behalf of users (beyond simple Siri commands or single-turn requests). Examples that count: a system where an AI agent can book flights, fill out forms, or navigate apps on the user''s behalf across multiple applications. Incremental Siri improvements described as "smarter suggestions" or "better understanding" without explicit agentic capabilities do not count. If WWDC 2026 is cancelled, postponed beyond June 30, or held without a keynote, this resolves as NO.',
    'Technology',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://developer.apple.com/wwdc/',
    '2026-05-14T00:00:00Z',
    '2026-06-30T23:59:59Z',
    '2026-05-21T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- 2. GPT-5 benchmark: MMLU-pro above 90%
  (
    gen_random_uuid(),
    'Will any version of OpenAI''s GPT-5 model achieve a score above 90% on the MMLU-Pro benchmark before July 31, 2026?',
    'Resolution: YES if OpenAI releases a model publicly referred to as "GPT-5" (or "GPT-5.x", "o3-pro", or a direct successor to GPT-4o) that achieves a verified score above 90.0% on the MMLU-Pro benchmark (the extended version with harder questions) before July 31, 2026 23:59 UTC. The score must be reported in a peer-reviewed paper, official OpenAI technical report, or verified by a reputable third-party benchmark organization (e.g., Hugging Face Open LLM Leaderboard, EleutherAI LM Evaluation Harness). The benchmark must use the standard 5-shot or 0-shot evaluation protocol for MMLU-Pro. If OpenAI releases a model under a different name that is widely recognized as GPT-5''s successor (e.g., "GPT-Next"), it counts. If only OpenAI reports the score without independent verification, it still counts.',
    'Technology',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://huggingface.co/spaces/open-llm-leaderboard/open_llm_leaderboard',
    '2026-05-14T00:00:00Z',
    '2026-07-31T23:59:59Z',
    '2026-05-21T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- 3. CME Group launches bitcoin volatility futures
  (
    gen_random_uuid(),
    'Will CME Group launch bitcoin volatility futures before July 31, 2026?',
    'Resolution: YES if CME Group lists and begins trading of a bitcoin volatility futures product (as reported by CoinDesk on May 9, 2026, planned for June 1 pending regulatory approval) before July 31, 2026 23:59 UTC. The product must be officially listed on CME Group''s website and available for trading. A formal announcement of a launch date without actual trading commencing does not count. If the product launches under a different name (e.g., "BTC Vol Index Futures") but serves the same purpose of allowing traders to bet on bitcoin price volatility, it counts. If CME delays the launch beyond July 31 or cancels the product entirely, this resolves as NO.',
    'Technology',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.cmegroup.com/',
    '2026-05-14T00:00:00Z',
    '2026-07-31T23:59:59Z',
    '2026-05-21T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- ── Geopolitics (4–6) ──────────────────────────────────────

  -- 4. US-Iran ceasefire signed
  (
    gen_random_uuid(),
    'Will the United States and Iran sign a formal ceasefire or peace agreement ending the current conflict before July 31, 2026?',
    'Resolution: YES if the United States and the Islamic Republic of Iran sign a formal ceasefire, truce, or peace agreement that both parties publicly commit to, announced before July 31, 2026 23:59 UTC. The agreement must be confirmed by official government sources from both sides (or their mediators) and reported by at least one major international news wire (Reuters, AP, or AFP). The agreement must address the cessation of military hostilities between the two nations. Unilateral ceasefires, temporary humanitarian pauses (under 7 days), or informal understandings without a signed or formally announced agreement do not count. If the conflict ends due to regime change in either country without a formal agreement, this resolves as NO.',
    'Geopolitics',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.reuters.com/world/middle-east/',
    '2026-05-14T00:00:00Z',
    '2026-07-31T23:59:59Z',
    '2026-05-21T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- 5. Trump visits China for summit with Xi Jinping
  (
    gen_random_uuid(),
    'Will Donald Trump visit China for an in-person summit with Xi Jinping before July 31, 2026?',
    'Resolution: YES if US President Donald Trump visits China (mainland) for an in-person meeting with Chinese President Xi Jinping before July 31, 2026 23:59 UTC. The visit must be confirmed by the White House or China''s Ministry of Foreign Affairs and reported by at least one major international news wire (Reuters, AP, or AFP). The meeting must be held on Chinese soil — meetings at third-country locations (e.g., G20 summits) do not count. A phone call, video conference, or delegation visit without Trump himself present does not count. If the visit is announced but cancelled or postponed before occurring, this resolves as NO.',
    'Geopolitics',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.reuters.com/world/china/',
    '2026-05-14T00:00:00Z',
    '2026-07-31T23:59:59Z',
    '2026-05-21T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- 6. India's Vijay survives confidence vote within 60 days of taking office
  (
    gen_random_uuid(),
    'Will Tamil Nadu Chief Minister M.K. Vijay (the actor-turned-politician) win a confidence vote in the state assembly within 60 days of taking office?',
    'Resolution: YES if M.K. Vijay (the Tamil actor-turned-politician who became Chief Minister of Tamil Nadu, as reported on May 10, 2026) faces a formal confidence vote (floor test) in the Tamil Nadu Legislative Assembly within 60 days of assuming office and wins that vote before July 31, 2026 23:59 UTC. The vote must be a formal confidence motion or floor test. If no confidence vote is held within 60 days of taking office (because the government has a clear majority), this resolves as NO — the question is specifically about whether a vote is held and won. If a confidence vote is held and lost, this resolves as NO. If Vijay resigns before any confidence vote is held, this resolves as NO.',
    'Geopolitics',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.reuters.com/world/india/',
    '2026-05-14T00:00:00Z',
    '2026-07-31T23:59:59Z',
    '2026-05-21T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- ── Economics (7–8) ──────────────────────────────────────

  -- 7. Fed holds rates steady at June FOMC
  (
    gen_random_uuid(),
    'Will the US Federal Reserve keep the federal funds rate target range unchanged at the June 16-17, 2026 FOMC meeting?',
    'Resolution: YES if the Federal Open Market Committee (FOMC) announces no change to the target range for the federal funds rate at the conclusion of its June 16-17, 2026 meeting. The current target range (as of the April 28-29, 2026 meeting) is used as the baseline — if the FOMC statement says "the Committee decided to maintain the target range" or equivalent language indicating no rate change, this resolves as YES. If the FOMC raises or lowers the target range by any amount (including a 25 basis point change), this resolves as NO. If the June meeting is cancelled, postponed, or converted to an emergency meeting without a scheduled rate decision, this resolves as NO. The authoritative source is the FOMC statement published on federalreserve.gov.',
    'Economics',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.federalreserve.gov/newsevents/pressreleases/monetary20260617a.htm',
    '2026-05-14T00:00:00Z',
    '2026-06-18T23:59:59Z',
    '2026-05-21T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- 8. US CPI inflation above 3.0% in May 2026 report
  (
    gen_random_uuid(),
    'Will the US CPI inflation rate (year-over-year, all items) exceed 3.0% in the Bureau of Labor Statistics report for May 2026 (published mid-June 2026)?',
    'Resolution: YES if the Bureau of Labor Statistics (BLS) Consumer Price Index (CPI) report for May 2026, expected to be published around June 11, 2026, shows the year-over-year all-items CPI inflation rate (not seasonally adjusted or seasonally adjusted, using the headline "CPI for All Urban Consumers: All Items" index, CPIAUCSL) exceeding 3.0%. If the BLS publishes the headline figure as above 3.0%, this resolves as YES. If the published figure is exactly 3.0%, this resolves as NO (must exceed, not equal). If the BLS delays the publication, the resolution uses the first published figure for May 2026 CPI data. Core CPI is not used — only the all-items headline rate.',
    'Economics',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.bls.gov/cpi/',
    '2026-05-14T00:00:00Z',
    '2026-06-30T23:59:59Z',
    '2026-05-21T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- ── Science (9–10) ──────────────────────────────────────

  -- 9. WHO declares hantavirus outbreak a PHEIC
  (
    gen_random_uuid(),
    'Will the World Health Organization (WHO) declare the hantavirus outbreak (linked to the MV Hondius cruise ship) a Public Health Emergency of International Concern (PHEIC) before July 31, 2026?',
    'Resolution: YES if the WHO Director-General declares the ongoing hantavirus outbreak — associated with the MV Hondius cruise ship and subsequent spread to multiple countries (as reported in May 2026) — a Public Health Emergency of International Concern (PHEIC) under the International Health Regulations (IHR) before July 31, 2026 23:59 UTC. The declaration must be made through an official WHO statement, press conference, or Emergency Committee recommendation. If the WHO declares a PHEIC for a broader disease category that encompasses hantavirus, this resolves as YES. If the WHO issues a lower-level alert (e.g., "Disease Outbreak News" or "epidemiological update") without a formal PHEIC declaration, this resolves as NO. If the outbreak is contained and the WHO determines no PHEIC is needed, this resolves as NO.',
    'Science',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.who.int/emergencies/',
    '2026-05-14T00:00:00Z',
    '2026-07-31T23:59:59Z',
    '2026-05-21T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- 10. SpaceX achieves 10+ orbital launches in a single month
  (
    gen_random_uuid(),
    'Will SpaceX achieve 10 or more successful orbital launches in any calendar month before July 31, 2026?',
    'Resolution: YES if SpaceX successfully completes 10 or more orbital launches (any vehicle — Falcon 9, Falcon Heavy, or Starship) in a single calendar month (based on UTC date) before July 31, 2026 23:59 UTC. A launch counts as successful if the payload reaches its intended orbit (or the mission is declared a success by SpaceX). Launch failures, partial failures, or launches that do not reach orbit do not count toward the total. The count is based on SpaceX''s official launch manifest and public mission updates. Rideshare missions with multiple payloads count as a single launch. The months in scope are May 2026, June 2026, and July 2026.',
    'Science',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.spacex.com/launches/',
    '2026-05-14T00:00:00Z',
    '2026-07-31T23:59:59Z',
    '2026-05-21T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- ── Sports (11–12) ──────────────────────────────────────

  -- 11. 2026 NBA Finals: No. 1 seed from either conference wins
  (
    gen_random_uuid(),
    'Will the number 1 seed from either conference win the 2026 NBA Finals?',
    'Resolution: YES if the team that held the number 1 seed in either the Eastern Conference or Western Conference at the end of the 2025-26 NBA regular season wins the 2026 NBA Finals (scheduled June 3-19, 2026). The Oklahoma City Thunder hold the Western Conference number 1 seed (best record in the NBA). The Eastern Conference number 1 seed is determined at the end of the regular season. The official NBA Finals champion as declared by the NBA is authoritative. If the Finals are cancelled, this resolves as NO.',
    'Sports',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.nba.com/playoffs/',
    '2026-05-14T00:00:00Z',
    '2026-06-30T23:59:59Z',
    '2026-05-21T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- 12. 2026 French Open: Alcaraz defends men's singles title
  (
    gen_random_uuid(),
    'Will Carlos Alcaraz win the 2026 French Open men''s singles title (May 24 – June 7, 2026)?',
    'Resolution: YES if Carlos Alcaraz wins the men''s singles championship at the 2026 French Open (Roland Garros), held May 24 to June 7, 2026. The winner is the player who wins the men''s singles final. The official Roland Garros results (rolandgarros.com) are authoritative. If Alcaraz withdraws before the tournament begins, this resolves as NO. If the tournament is cancelled or significantly shortened (fewer than 4 rounds completed), this resolves as NO. If Alcaraz wins the title but is later disqualified for doping, this resolves based on the final standings after all appeals are exhausted.',
    'Sports',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.rolandgarros.com/en-us/',
    '2026-05-14T00:00:00Z',
    '2026-06-08T23:59:59Z',
    '2026-05-21T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- ── Culture (13) ──────────────────────────────────────

  -- 13. Arsenal wins the 2025-26 Premier League title
  (
    gen_random_uuid(),
    'Will Arsenal win the 2025-26 Premier League title?',
    'Resolution: YES if Arsenal FC is declared the champion of the 2025-26 English Premier League season. The season concludes in late May 2026. As of May 10, 2026, Arsenal are close to winning the title after a victory at West Ham. The official Premier League standings at the conclusion of all 38 matchdays are authoritative. If two or more teams are tied on points at the top, the standard Premier League tiebreaker rules (goal difference, then goals scored, then head-to-head) determine the champion. If the season is abandoned before completion and Arsenal are declared champions by the Premier League, this resolves as YES. If the season is abandoned without a champion declared, this resolves as NO.',
    'Culture',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.premierleague.com/tables',
    '2026-05-14T00:00:00Z',
    '2026-05-31T23:59:59Z',
    '2026-05-21T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- ── Crypto (14) ──────────────────────────────────────

  -- 14. Bitcoin (BTC) price reaches $120,000 before July 31, 2026
  (
    gen_random_uuid(),
    'Will the price of Bitcoin (BTC) reach or exceed $120,000 USD at any point before July 31, 2026?',
    'Resolution: YES if the price of Bitcoin (BTC/USD) reaches or exceeds $120,000.00 at any point before July 31, 2026 23:59 UTC, as reported by CoinGecko (coingecko.com) using the "BTC to USD" price. The price is the spot market price (mid-market rate). A brief spike to $120,000 or above, even for a single second, counts as YES. If CoinGecko is temporarily unavailable, Binance or Coinbase spot price data is used as a backup. The question is about the nominal price — inflation-adjusted values are not considered. If Bitcoin undergoes a stock split, reverse split, or protocol change that affects the unit price, the pre-event equivalent price is used for comparison.',
    'Crypto',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.coingecko.com/en/coins/bitcoin',
    '2026-05-14T00:00:00Z',
    '2026-07-31T23:59:59Z',
    '2026-05-21T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  );
