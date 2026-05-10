-- ============================================================
-- Baycast — Prediction Questions Batch (May 12, 2026)
--
-- 14 questions with medium-horizon resolutions (June–August 2026).
-- All fresh topics, distinct from the May 5–11 batches.
-- Run via Supabase SQL Editor or Management API.
-- ============================================================

INSERT INTO public.questions (id, title, description, category, question_type, options, resolution_source, opens_at, closes_at, blind_until, status, created_by)
VALUES

  -- ── Technology (1–3) ──────────────────────────────────────

  -- 1. Claude achieves #1 on Chatbot Arena
  (
    gen_random_uuid(),
    'Will an Anthropic model (Claude) achieve the #1 ranking on the LMSYS Chatbot Arena leaderboard before August 31, 2026?',
    'Resolution: YES if any Anthropic model (including Claude 4, Claude Opus, or any future Anthropic model) ranks #1 overall on the LMSYS Chatbot Arena Elo leaderboard (https://chat.lmsys.org) at any point before August 31, 2026 23:59 UTC. The ranking is determined by the official "Overall" leaderboard on the LMSYS website. A tie for #1 with another model counts as YES. Temporary leaderboard positions during leaderboard maintenance or data resets do not count. If the leaderboard changes its format (e.g., from Elo to a different scoring system), the new #1 position by the updated methodology counts.',
    'Technology',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://chat.lmsys.org/?leaderboard',
    '2026-05-12T00:00:00Z',
    '2026-08-31T23:59:59Z',
    '2026-05-19T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- 2. EU Digital Identity Wallet regulation enforcement begins
  (
    gen_random_uuid(),
    'Will at least 3 EU member states launch a national digital identity wallet under the EU Digital Identity Framework before August 31, 2026?',
    'Resolution: YES if at least 3 EU member states publicly launch (i.e., make available to citizens for download and use) a national digital identity wallet application that complies with the EU Digital Identity Framework (eIDAS 2.0 / European Digital Identity Wallet) before August 31, 2026 23:59 UTC. The launch must be announced by the national government and the wallet must be functional for at least one use case (e.g., identity verification, document storage). Pilot programs limited to specific municipalities or populations under 10,000 do not count. Each country must make a distinct launch announcement; simultaneous EU-wide launches count for all participating states.',
    'Technology',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://digital-strategy.ec.europa.eu/en/policies/eidas-regulation',
    '2026-05-12T00:00:00Z',
    '2026-08-31T23:59:59Z',
    '2026-05-19T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- 3. Samsung announces mass production of solid-state batteries
  (
    gen_random_uuid(),
    'Will Samsung SDI announce the start of mass production of solid-state batteries for commercial use before August 31, 2026?',
    'Resolution: YES if Samsung SDI publicly announces that it has begun mass production of solid-state batteries intended for commercial applications (electric vehicles, consumer electronics, or energy storage) before August 31, 2026 23:59 UTC. The announcement must come from an official Samsung SDI source (press release, earnings call, or corporate presentation). Pilot line production, prototype production, or sample production for automakers does not count — must be declared as "mass production." If Samsung SDI is merged, renamed, or restructured, the successor entity''s announcement counts.',
    'Technology',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.samsungsdi.com/press-room/press-release.html',
    '2026-05-12T00:00:00Z',
    '2026-08-31T23:59:59Z',
    '2026-05-19T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- ── Geopolitics (4–5) ──────────────────────────────────────

  -- 4. Japan snaps election after LDP leadership change
  (
    gen_random_uuid(),
    'Will Japan hold a snap general election for the House of Representatives before August 31, 2026?',
    'Resolution: YES if the Japanese Prime Minister dissolves the House of Representatives and a general election is held (voting day) before August 31, 2026 23:59 UTC. The dissolution and election date must be officially announced. The current House of Representatives term expires in October 2025, so any election held before the natural term expiry would be considered a snap election. If the House was already dissolved before May 12, 2026, the upcoming scheduled election does not count as a "snap" election and this resolves as NO.',
    'Geopolitics',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.kantei.go.jp/foreign/',
    '2026-05-12T00:00:00Z',
    '2026-08-31T23:59:59Z',
    '2026-05-19T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- 5. Sudan ceasefire agreement signed
  (
    gen_random_uuid(),
    'Will the warring parties in Sudan (SAF and RSF) sign a formal ceasefire agreement lasting at least 30 days before August 31, 2026?',
    'Resolution: YES if the Sudanese Armed Forces (SAF) and the Rapid Support Forces (RSF) sign a formal ceasefire agreement that both parties publicly commit to for a minimum duration of 30 consecutive days before August 31, 2026 23:59 UTC. The agreement must be signed by authorized representatives of both parties, ideally with international mediation (UN, AU, IGAD, or Saudi/US mediation). Local temporary truces, humanitarian pauses under 30 days, or unilateral declarations do not count. The signing must be reported by a major international news wire (Reuters, AP, AFP).',
    'Geopolitics',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.reuters.com/world/africa/',
    '2026-05-12T00:00:00Z',
    '2026-08-31T23:59:59Z',
    '2026-05-19T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- ── Economics (6–8) ──────────────────────────────────────

  -- 6. Bank of Japan raises rates to 1.00%+
  (
    gen_random_uuid(),
    'Will the Bank of Japan raise its short-term policy interest rate to 1.00% or higher at any meeting before August 31, 2026?',
    'Resolution: YES if the Bank of Japan''s Policy Board raises the uncollateralized overnight call rate target to 1.00% or higher at any scheduled or emergency monetary policy meeting before August 31, 2026 23:59 UTC. The resolution is based on the official BOJ policy rate decision announced after the meeting. If the BOJ raises the rate in increments (e.g., to 0.75% then later to 1.00%), the question resolves as YES when the rate first reaches or exceeds 1.00%. The BOJ''s official press release is the authoritative source.',
    'Economics',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.boj.or.jp/en/',
    '2026-05-12T00:00:00Z',
    '2026-08-31T23:59:59Z',
    '2026-05-19T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- 7. Bitcoin ETF net weekly outflow exceeds $2B
  (
    gen_random_uuid(),
    'Will US spot Bitcoin ETFs record a single week of net outflows exceeding $2 billion before August 31, 2026?',
    'Resolution: YES if the aggregate net outflows from all US spot Bitcoin ETFs (including IBIT, FBTC, GBTC, ARKB, BITB, BRRR, EZBC, BTCO, and any others) exceed $2.0 billion in a single calendar week (Monday through Friday US trading days) before August 31, 2026 23:59 UTC. Net outflows are calculated as total redemptions minus total creations for the week. The data source is Bloomberg Terminal ETF flow data or the official fund issuer websites. If a fund delists or liquidates during the period, its final redemption is included in the week it occurs.',
    'Economics',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.bloomberg.com/markets/etfs',
    '2026-05-12T00:00:00Z',
    '2026-08-31T23:59:59Z',
    '2026-05-19T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- 8. US CPI prints below 2.0% year-over-year
  (
    gen_random_uuid(),
    'Will the US Consumer Price Index (CPI) year-over-year inflation rate fall below 2.0% in any BLS report published before August 31, 2026?',
    'Resolution: YES if the Bureau of Labor Statistics publishes a CPI report showing year-over-year (12-month) inflation below 2.0% for the headline CPI-U (all items, not seasonally adjusted or seasonally adjusted — both are acceptable as long as the YoY figure is below 2.0%). The report must be published by the BLS before August 31, 2026 23:59 UTC. The relevant reports would cover data through June or July 2026. Core CPI is not used for resolution — only the headline CPI-U YoY figure.',
    'Economics',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.bls.gov/news.release/cpi.nr0.htm',
    '2026-05-12T00:00:00Z',
    '2026-08-31T23:59:59Z',
    '2026-05-19T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- ── Sports (9–10) ──────────────────────────────────────

  -- 9. 2026 FIFA World Cup qualifying: CONCACAF — USMNT finishes top 3
  (
    gen_random_uuid(),
    'Will the United States men''s national team finish in the top 3 of the final CONCACAF 2026 World Cup qualifying standings?',
    'Resolution: YES if the US men''s national team finishes in positions 1, 2, or 3 of the final CONCACAF 2026 FIFA World Cup qualifying standings (hexagonal or octagonal final round). The USMNT already qualifies as co-host, but this question is about their finishing position. The final standings are published by CONCACAF after all qualifying matches are completed. If the qualifying format changes, "top 3" refers to the number of automatic qualifying spots available. If qualifying is cancelled or the format is fundamentally altered, this resolves as NO.',
    'Sports',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.concacaf.com/en/world-cup-qualifying-men/',
    '2026-05-12T00:00:00Z',
    '2026-08-31T23:59:59Z',
    '2026-05-19T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- 10. Wimbledon men's singles: Djokovic or Alcaraz wins
  (
    gen_random_uuid(),
    'Will Novak Djokovic or Carlos Alcaraz win the 2026 Wimbledon men''s singles title?',
    'Resolution: YES if either Novak Djokovic or Carlos Alcaraz is the official winner of the 2026 Wimbledon gentlemen''s singles tournament (June 29 – July 12, 2026). The winner is determined by the official All England Lawn Tennis Association (AELTC) results. If either player withdraws before the tournament begins, they are not eligible to win, but the question resolves based on who actually wins. If the tournament is cancelled or postponed beyond August 31, this resolves as NO.',
    'Sports',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.wimbledon.com/en_GB/results/index.html',
    '2026-05-12T00:00:00Z',
    '2026-07-12T23:59:59Z',
    '2026-05-19T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- ── Science (11–12) ──────────────────────────────────────

  -- 11. DeepMind publishes AGI benchmark突破
  (
    gen_random_uuid(),
    'Will Google DeepMind publish a paper claiming a model achieves above-human-expert performance on ARC-AGI-2 before August 31, 2026?',
    'Resolution: YES if Google DeepMind publishes a peer-reviewed paper or official blog post claiming one of their AI models achieves a score on the ARC-AGI-2 benchmark (https://arcprize.org) that exceeds the average score of human expert annotators, as defined by the benchmark authors, before August 31, 2026 23:59 UTC. The result must be reproducible and the methodology must be publicly described. Pre-prints on arXiv count as "published." Claims without publicly verifiable scores do not count. If the ARC-AGI-2 benchmark is replaced or deprecated before the deadline, this resolves as NO.',
    'Science',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://arcprize.org/leaderboard',
    '2026-05-12T00:00:00Z',
    '2026-08-31T23:59:59Z',
    '2026-05-19T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- 12. China completes Tiangong space station expansion module
  (
    gen_random_uuid(),
    'Will China launch and successfully dock an additional major module to the Tiangong space station before August 31, 2026?',
    'Resolution: YES if China successfully launches and docks a new major module (pressurized section ≥10 tonnes) to the Tiangong space station before August 31, 2026 23:59 UTC. The module must be a new addition beyond the existing core module (Tianhe), lab modules (Wentian, Mengtian), and the Xuntian space telescope (if launched separately). The docking must be confirmed by the China Manned Space Agency (CMSA) or reported by a major news wire. Successful docking requires automated or manual rendezvous and connection. If the module fails to dock after launch, this resolves as NO.',
    'Science',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.cmse.gov.cn/english/',
    '2026-05-12T00:00:00Z',
    '2026-08-31T23:59:59Z',
    '2026-05-19T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- ── Crypto (13) ──────────────────────────────────────

  -- 13. Ethereum ETF total AUM exceeds $100B
  (
    gen_random_uuid(),
    'Will the total assets under management (AUM) of all US spot Ethereum ETFs exceed $100 billion at any point before August 31, 2026?',
    'Resolution: YES if the combined net assets (AUM) of all US spot Ethereum ETFs (including ETHE, FETH, ETHA, EZET, CETH, and any others launched by the deadline) exceed $100 billion (USD) at the close of any US trading day before August 31, 2026 23:59 UTC. The AUM figure is based on official fund data as reported by the issuers or as aggregated by Bloomberg, SoSoValue, or CoinDesk. Both price appreciation and net inflows contribute to AUM growth. If the SEC approves additional spot ETH ETFs before the deadline, they are included from their launch date.',
    'Crypto',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.sosovalue.xyz/asset/eth-etf',
    '2026-05-12T00:00:00Z',
    '2026-08-31T23:59:59Z',
    '2026-05-19T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- ── Culture (14) ──────────────────────────────────────

  -- 14. 2026 FIFA Club World Cup total attendance exceeds 2 million
  (
    gen_random_uuid(),
    'Will total attendance at the 2026 FIFA Club World Cup (June 15 – July 13) exceed 2 million spectators?',
    'Resolution: YES if the cumulative official attendance across all matches of the 2026 FIFA Club World Cup (32-team expanded format, hosted in the United States, June 15 – July 13, 2026) exceeds 2,000,000 (two million) as reported by FIFA in their official tournament statistics. The attendance figure is based on turnstile count (tickets scanned), not tickets sold. FIFA typically publishes attendance data within 48 hours of the final. If the tournament is cancelled, significantly shortened (fewer than 48 matches), or relocated, this resolves as NO.',
    'Culture',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.fifa.com/fifaplus/en/tournaments/mens/club-world-cup',
    '2026-05-12T00:00:00Z',
    '2026-07-31T23:59:59Z',
    '2026-05-19T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  );
