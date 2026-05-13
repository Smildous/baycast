-- ============================================================
-- Baycast — Ultra-Short-Term Prediction Questions Batch
--
-- 10 questions resolving within 1-7 days (May 14-20, 2026).
-- Created May 13, 2026 to address AQ-195: users need rapid
-- feedback loops since all current questions resolve in 232+ days.
--
-- Categories: 2 Technology, 2 Economics, 2 Sports,
--             2 Politics/Geopolitics, 2 Other (Entertainment, Crypto)
--
-- Run via Supabase SQL Editor or Management API.
-- ============================================================

INSERT INTO public.questions (id, title, description, category, question_type, options, resolution_source, opens_at, closes_at, blind_until, status, created_by)
VALUES

  -- ── Politics/Geopolitics (1–2) ──────────────────────────────

  -- 1. Trump-Xi joint statement on tariff reduction
  (
    gen_random_uuid(),
    'Will Trump and Xi announce a tariff reduction agreement during the May 13-14 Beijing summit?',
    'Resolution: YES if, following the Trump-Xi summit in Beijing (May 13-14, 2026), the United States and China jointly announce any reduction, rollback, or suspension of bilateral tariffs before May 16, 2026 00:00 UTC. The announcement must come from an official source (White House, China''s Ministry of Foreign Affairs, or a joint communique) and be confirmed by at least one major news wire (Reuters, AP, or AFP). An agreement in principle or memorandum of understanding counts. If only one side announces unilateral tariff changes without a bilateral agreement, this resolves as NO. If no tariff-related announcement is made, this resolves as NO. Vague statements about "constructive talks" or "progress" without a specific tariff action do not count.',
    'Politics',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.reuters.com/world/china/',
    NOW(),
    '2026-05-16T00:00:00Z',
    '2026-05-16T00:00:00Z',
    'open',
    'system'
  ),

  -- 2. Trump-Xi joint statement referencing Iran ceasefire or de-escalation
  (
    gen_random_uuid(),
    'Will the Trump-Xi Beijing summit produce a joint statement mentioning Iran ceasefire or de-escalation before May 16, 2026?',
    'Resolution: YES if the US and China issue a joint statement, communique, or bilateral agreement following their May 13-14, 2026 summit that explicitly mentions a ceasefire, de-escalation, or peaceful resolution of the Iran conflict before May 16, 2026 00:00 UTC. The language must appear in an official document or readout from either the White House or China''s Ministry of Foreign Affairs, confirmed by Reuters, AP, or AFP. References must go beyond generic expressions of "concern about regional stability" — they must specifically reference Iran and either ceasefire, de-escalation, peace talks, or diplomatic resolution. If the topic is only discussed privately with no public mention, this resolves as NO.',
    'Politics',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.reuters.com/world/middle-east/',
    NOW(),
    '2026-05-16T00:00:00Z',
    '2026-05-16T00:00:00Z',
    'open',
    'system'
  ),

  -- ── Economics (3–4) ──────────────────────────────────────

  -- 3. US retail sales (April 2026) exceed consensus estimate
  (
    gen_random_uuid(),
    'Will US retail sales (month-over-month, April 2026) come in above the consensus economist estimate when reported on May 15, 2026?',
    'Resolution: YES if the US Census Bureau reports April 2026 retail sales (advance estimate) with a month-over-month percentage change that exceeds the Reuters/Consensus economist forecast published before the release. The data is scheduled for release at 8:30 AM ET on May 15, 2026. Both the headline "Retail and Food Services Sales" month-over-month figure will be used. If the reported figure beats the consensus forecast (e.g., consensus is +0.3% and actual is +0.4%), this resolves as YES. If it misses (below consensus) or is exactly equal, this resolves as NO. If the release is delayed beyond May 16, 2026, this resolves as NO. Source: Census Bureau report at census.gov/retail plus consensus figure from Reuters Econoday or Bloomberg consensus.',
    'Economics',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.census.gov/retail/',
    NOW(),
    '2026-05-16T00:00:00Z',
    '2026-05-16T00:00:00Z',
    'open',
    'system'
  ),

  -- 4. S&P 500 closes above 5,600 by end of week (May 15)
  (
    gen_random_uuid(),
    'Will the S&P 500 index close above 5,600 on Thursday May 15, 2026?',
    'Resolution: YES if the S&P 500 index (ticker: SPX) officially closes above 5,600.00 on Thursday, May 15, 2026, as reported by any major financial data provider (Bloomberg, Yahoo Finance, Google Finance, or Reuters). The official closing price at 4:00 PM ET will be used. If markets are closed on that date due to a holiday or extraordinary event, the next available trading day close before May 20, 2026 will be used. If markets are suspended and do not reopen before May 20, 2026, this resolves as NO.',
    'Economics',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://finance.yahoo.com/quote/%5EGSPC/',
    NOW(),
    '2026-05-16T00:00:00Z',
    '2026-05-16T00:00:00Z',
    'open',
    'system'
  ),

  -- ── Sports (5–6) ──────────────────────────────────────

  -- 5. Iga Swiatek wins 2026 Italian Open (Rome) women's singles title
  (
    gen_random_uuid(),
    'Will Iga Swiatek win the 2026 Italian Open (Internazionali BNL d''Italia) women''s singles title?',
    'Resolution: YES if Iga Swiatek is declared the winner of the 2026 Italian Open women''s singles tournament (final expected May 17-18, 2026) as reported by the official WTA website (wtatennis.com) or BBC Sport. If Swiatek reaches the final but loses, this resolves as NO. If Swiatek withdraws or is eliminated before the final, this resolves as NO. If the tournament final is postponed beyond May 20, 2026 and Swiatek has not yet won, this resolves as NO. If Swiatek wins on a walkover (opponent withdraws from final), this still counts as YES.',
    'Sports',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.wtatennis.com/tournament/rome',
    NOW(),
    '2026-05-19T23:59:59Z',
    '2026-05-19T23:59:59Z',
    'open',
    'system'
  ),

  -- 6. Chelsea win the 2025-26 FA Cup Final
  (
    gen_random_uuid(),
    'Will Chelsea win the 2025-26 FA Cup Final against Manchester City?',
    'Resolution: YES if Chelsea defeat Manchester City in the 2025-26 FA Cup Final (expected to be played May 17, 2026 at Wembley Stadium) as reported by BBC Sport or the official FA website (thefa.com). The result after extra time or penalties counts. If the match is postponed beyond May 20, 2026 and has not been played, this resolves as NO. If the match is abandoned before completion and replayed after May 20, 2026, this resolves as NO. If Chelsea win on penalties, this resolves as YES.',
    'Sports',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.bbc.com/sport/football/fa-cup',
    NOW(),
    '2026-05-18T23:59:59Z',
    '2026-05-18T23:59:59Z',
    'open',
    'system'
  ),

  -- ── Technology (7–8) ──────────────────────────────────────

  -- 7. Elon Musk announces Tesla China expansion deal during Trump visit week
  (
    gen_random_uuid(),
    'Will Elon Musk announce a new Tesla manufacturing or expansion deal in China before May 20, 2026?',
    'Resolution: YES if Elon Musk, during or after his visit to China as part of the Trump delegation (May 13-14, 2026), publicly announces a new Tesla deal in China involving factory expansion, new manufacturing capacity, a joint venture, or a significant investment commitment before May 20, 2026 23:59 UTC. The announcement must be reported by at least one major news outlet (Reuters, AP, Bloomberg, or BBC). Routine statements about existing operations, vague expressions of confidence, or reiteration of previous commitments do not count. A new Memorandum of Understanding (MOU) or letter of intent counts only if it specifies concrete investment figures or factory plans. If Musk makes no China-specific Tesla announcement, this resolves as NO.',
    'Technology',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.reuters.com/business/autos-transportation/',
    NOW(),
    '2026-05-20T23:59:59Z',
    '2026-05-20T23:59:59Z',
    'open',
    'system'
  ),

  -- 8. Nvidia announces China-specific AI chip deal or export approval before May 20
  (
    gen_random_uuid(),
    'Will Nvidia announce a new China-specific AI chip deal, export license approval, or product launch during the Trump-Xi summit week (before May 20, 2026)?',
    'Resolution: YES if Nvidia (or its CEO Jensen Huang, who is part of the Trump delegation visiting China May 13-14, 2026) announces a new China-specific AI chip product, export license approval, sales deal, or partnership with a Chinese entity before May 20, 2026 23:59 UTC. The announcement must be reported by at least one major news outlet (Reuters, AP, Bloomberg, or tech outlets like The Verge, TechCrunch). Reiteration of existing product lines or vague statements about "commitment to the China market" do not count. The announcement must represent a new development — a new chip model, a new export license, or a new partnership. If no Nvidia China-specific announcement is made, this resolves as NO.',
    'Technology',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.reuters.com/technology/',
    NOW(),
    '2026-05-20T23:59:59Z',
    '2026-05-20T23:59:59Z',
    'open',
    'system'
  ),

  -- ── Crypto (9) ──────────────────────────────────────

  -- 9. Bitcoin price exceeds $85,000 before May 20, 2026
  (
    gen_random_uuid(),
    'Will the price of Bitcoin (BTC) exceed $85,000 on any major exchange before May 20, 2026?',
    'Resolution: YES if the price of Bitcoin (BTC/USD) reaches or exceeds $85,000.00 on any of the following exchanges — Binance, Coinbase, Kraken, or Bitstamp — at any point before May 20, 2026 23:59 UTC. The price must be verifiable via CoinGecko, CoinMarketCap, or the exchange''s own public API. A momentary wick (flash crash/spike under 1 second) counts if verifiable via trading data. If Bitcoin has not reached $85,000 on any of these exchanges by the deadline, this resolves as NO. As of May 13, 2026, Bitcoin is trading around $81,000.',
    'Crypto',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.coindesk.com/price/bitcoin/',
    NOW(),
    '2026-05-20T23:59:59Z',
    '2026-05-20T23:59:59Z',
    'open',
    'system'
  ),

  -- ── Entertainment (10) ──────────────────────────────────────

  -- 10. Eurovision 2026 Grand Final winner from Western Europe
  (
    gen_random_uuid(),
    'Will the winner of the Eurovision Song Contest 2026 Grand Final (May 16, 2026) be a Western European country?',
    'Resolution: YES if the winning country of the Eurovision Song Contest 2026 Grand Final (held May 16, 2026) is classified as Western Europe per the United Nations geoscheme. Western European countries for this question include: Austria, Belgium, France, Germany, Liechtenstein, Luxembourg, Monaco, Netherlands, Switzerland. Also included: United Kingdom, Ireland, Portugal, Spain, Italy, San Marino, Andorra. Countries that do NOT count as Western Europe: Sweden, Norway, Denmark, Finland, Iceland (these are Northern Europe); Poland, Czech Republic, Hungary, etc. (Eastern/Central Europe); Greece, Cyprus, Malta (Southern Europe); Israel, Australia, or any other non-European participant. If the contest is cancelled, disrupted before a winner is declared, or no winner is announced by May 17, 2026 23:59 UTC, this resolves as NO. Source: Official Eurovision results at eurovision.tv or BBC.',
    'Entertainment',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://eurovision.tv/',
    NOW(),
    '2026-05-17T23:59:59Z',
    '2026-05-17T23:59:59Z',
    'open',
    'system'
  );
