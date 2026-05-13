-- ============================================================
-- Baycast — Ultra-Short-Term Prediction Questions Batch
--
-- 10 FRESH questions resolving within 1-7 days (May 14-20, 2026).
-- Created May 13, 2026. Distinct from the existing shortterm batch.
--
-- Categories: 2 Geopolitics, 2 Tech, 3 Sports, 2 Crypto, 1 Economics
--
-- Topics: UK Labour leadership, Trump-Xi Taiwan, Solana Alpenglow,
--         NBA/NHL playoffs, BTC/ETH price levels, Clarity Act,
--         Fed rate signals, FA Cup Final
--
-- Run via Supabase SQL Editor or Management API.
-- ============================================================

INSERT INTO public.questions (id, title, description, category, question_type, options, resolution_source, opens_at, closes_at, blind_until, status, created_by)
VALUES

  -- ── Geopolitics (1–2) ──────────────────────────────────────

  -- 1. Wes Streeting Labour leadership challenge
  (
    gen_random_uuid(),
    'Will Wes Streeting formally declare a Labour leadership challenge against Keir Starmer by May 15, 2026?',
    'Resolution: YES if UK Health Secretary Wes Streeting publicly announces he is running for Labour Party leader, submits a formal letter of intent to the Labour Party, or his office confirms he has informed the Parliamentary Labour Party (PLP) of his intention to stand before May 15, 2026 23:59 UTC. Must be confirmed by BBC News, Reuters, or The Guardian. Vague statements like "considering my options" or backbench speculation from allies do NOT count — there must be a clear, formal declaration of candidacy. If Streeting denies he will challenge, or if no formal announcement is made by the deadline, this resolves as NO. If another MP challenges Starmer but Streeting does not, this resolves as NO.',
    'Politics',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.bbc.com/news/uk/politics',
    NOW(),
    '2026-05-15T23:59:59Z',
    '2026-05-15T23:59:59Z',
    'open',
    'system'
  ),

  -- 2. Trump-Xi joint statement mentions Taiwan
  (
    gen_random_uuid(),
    'Will the Trump-Xi summit produce a joint statement that explicitly mentions Taiwan?',
    'Resolution: YES if an official joint statement, communique, or bilateral readout following the Trump-Xi summit in Beijing (May 14-15, 2026) contains the word "Taiwan" in any context (e.g., "Taiwan Strait," "Taiwan question," "Taiwan issue"). The document must be jointly released or endorsed by both the White House and China''s Ministry of Foreign Affairs, confirmed by Reuters, AP, or BBC before May 16, 2026 23:59 UTC. If Taiwan is only mentioned in unilateral statements by one side (e.g., Trump mentions Taiwan in a solo press conference), this resolves as NO. If no joint statement is issued, this resolves as NO. Vague references to "regional stability" or "cross-strait peace" without the word "Taiwan" do NOT count.',
    'Politics',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.reuters.com/world/china/',
    NOW(),
    '2026-05-16T23:59:59Z',
    '2026-05-16T23:59:59Z',
    'open',
    'system'
  ),

  -- ── Tech (3–4) ──────────────────────────────────────

  -- 3. Solana Alpenglow mainnet activation
  (
    gen_random_uuid(),
    'Will the Solana Alpenglow consensus upgrade be activated on mainnet-beta by May 20, 2026?',
    'Resolution: YES if the Alpenglow consensus mechanism is live and processing blocks on Solana''s mainnet-beta cluster (not just devnet or testnet) before May 20, 2026 23:59 UTC. Must be confirmed by the Solana Foundation, Anza development team blog, or Solana''s official status page (status.solana.com). A feature-gate activation or mainnet-beta deployment with Alpenglow consensus blocks counts. If it remains only on testnet/devnet, or if the upgrade is announced but not yet activated, this resolves as NO. If activation begins but is rolled back within 24 hours, it still counts as YES.',
    'Technology',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://status.solana.com/',
    NOW(),
    '2026-05-20T23:59:59Z',
    '2026-05-20T23:59:59Z',
    'open',
    'system'
  ),

  -- 4. US Senate holds Clarity Act hearing
  (
    gen_random_uuid(),
    'Will a US Senate committee hold a hearing on the Clarity Act (crypto market structure bill) before May 20, 2026?',
    'Resolution: YES if any US Senate committee (Banking, Agriculture, or Commerce) schedules and holds a hearing where the Clarity Act is formally on the agenda or is the primary subject of discussion before May 20, 2026 23:59 UTC. Must be confirmed by the Senate committee''s official website, C-SPAN coverage, or major news outlets (Reuters, Politico, The Block). A hearing where the Clarity Act is merely mentioned in passing but is not on the agenda does NOT count. If a hearing is announced but postponed or cancelled before the deadline, this resolves as NO.',
    'Technology',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.banking.senate.gov/',
    NOW(),
    '2026-05-20T23:59:59Z',
    '2026-05-20T23:59:59Z',
    'open',
    'system'
  ),

  -- ── Sports (5–7) ──────────────────────────────────────

  -- 5. Cleveland Cavaliers win NBA Game 5
  (
    gen_random_uuid(),
    'Will the Cleveland Cavaliers defeat the Detroit Pistons in Game 5 of their NBA playoff series on May 14, 2026?',
    'Resolution: YES if the Cleveland Cavaliers are declared the winner of Game 5 against the Detroit Pistons by the NBA, as reported by ESPN (espn.com), NBA.com, or BBC Sport before May 15, 2026 23:59 UTC. The series is currently tied 2-2. If the game is postponed and not played by May 15, this resolves as NO. If the game goes to overtime, the final result after all overtime periods counts. If the game is abandoned before completion and rescheduled beyond May 15, this resolves as NO.',
    'Sports',
    'binary',
    '{"yes_label": "Cavaliers win", "no_label": "Pistons win or postponed"}',
    'https://www.espn.com/nba/game/_/gameId/401871337/cavaliers-pistons',
    NOW(),
    '2026-05-14T23:59:59Z',
    '2026-05-14T23:59:59Z',
    'open',
    'system'
  ),

  -- 6. Colorado Avalanche eliminate Minnesota Wild
  (
    gen_random_uuid(),
    'Will the Colorado Avalanche eliminate the Minnesota Wild by winning Game 5 of their NHL playoff series on May 14, 2026?',
    'Resolution: YES if the Colorado Avalanche defeat the Minnesota Wild in Game 5 as reported by ESPN, NHL.com, or BBC Sport before May 15, 2026 23:59 UTC, thereby winning the best-of-7 series 4-1. The Avalanche currently lead the series 3-1. If the Avalanche lose Game 5 (series extends to Game 6), this resolves as NO. If the game is postponed beyond May 15, this resolves as NO. The final score after any overtime periods determines the winner. A shootout does not apply in NHL playoffs.',
    'Sports',
    'binary',
    '{"yes_label": "Avalanche win Game 5", "no_label": "Wild win or postponed"}',
    'https://www.espn.com/nhl/game/_/gameId/401871420/wild-avalanche',
    NOW(),
    '2026-05-14T23:59:59Z',
    '2026-05-14T23:59:59Z',
    'open',
    'system'
  ),

  -- 7. FA Cup Final goes to extra time
  (
    gen_random_uuid(),
    'Will the 2025-26 FA Cup Final between Chelsea and Manchester City go to extra time?',
    'Resolution: YES if the 2025-26 FA Cup Final between Chelsea and Manchester City (scheduled for May 17, 2026 at Wembley Stadium) is level at the end of 90 minutes of regular time (plus any stoppage time), resulting in the referee signaling for extra time. Confirmed by BBC Sport, ESPN, or the official FA website (thefa.com) before May 19, 2026 23:59 UTC. If either team wins in regular time, this resolves as NO. If the match goes to extra time and then penalties, it still resolves as YES (the condition is extra time being played). If the match is postponed beyond May 20, 2026 and has not been played, this resolves as NO. If the match is abandoned before 90 minutes, this resolves as NO.',
    'Sports',
    'binary',
    '{"yes_label": "Goes to extra time", "no_label": "Decided in regular time or postponed"}',
    'https://www.bbc.com/sport/football/fa-cup',
    NOW(),
    '2026-05-18T23:59:59Z',
    '2026-05-18T23:59:59Z',
    'open',
    'system'
  ),

  -- ── Crypto (8–9) ──────────────────────────────────────

  -- 8. Bitcoin drops below $76,000
  (
    gen_random_uuid(),
    'Will the price of Bitcoin (BTC) drop below $76,000 on any major exchange before May 17, 2026?',
    'Resolution: YES if the BTC/USD price on any of the following exchanges — Binance, Coinbase, Kraken, or Bitstamp — trades at or below $76,000.00 at any point before May 16, 2026 23:59 UTC. The price must be verifiable via CoinGecko, CoinMarketCap, or the exchange''s own public API/trading history. Momentary wicks (flash crashes/spikes) count if verifiable via trading candle data. If Bitcoin stays above $76,000 on all listed exchanges throughout the entire period, this resolves as NO. As of May 13, 2026, Bitcoin is trading around $79,500.',
    'Crypto',
    'binary',
    '{"yes_label": "Yes, drops below $76K", "no_label": "No, stays above $76K"}',
    'https://www.coingecko.com/en/coins/bitcoin',
    NOW(),
    '2026-05-16T23:59:59Z',
    '2026-05-16T23:59:59Z',
    'open',
    'system'
  ),

  -- 9. Ethereum (ETH) trades above $2,400
  (
    gen_random_uuid(),
    'Will the price of Ethereum (ETH) reach $2,400 on any major exchange before May 17, 2026?',
    'Resolution: YES if the ETH/USD price on Binance, Coinbase, Kraken, or Bitstamp reaches or exceeds $2,400.00 at any point before May 16, 2026 23:59 UTC. Must be verifiable via CoinGecko, CoinMarketCap, or the exchange''s public data. Momentary price wicks count if verifiable. If ETH does not reach $2,400 on any of these exchanges, this resolves as NO. As of May 13, 2026, ETH is trading around $2,257 — approximately 6.3% below the target.',
    'Crypto',
    'binary',
    '{"yes_label": "Yes, reaches $2,400+", "no_label": "No, stays below $2,400"}',
    'https://www.coingecko.com/en/coins/ethereum',
    NOW(),
    '2026-05-16T23:59:59Z',
    '2026-05-16T23:59:59Z',
    'open',
    'system'
  ),

  -- ── Economics (10) ──────────────────────────────────────

  -- 10. Fed official mentions possible rate increase
  (
    gen_random_uuid(),
    'Will any Federal Reserve official publicly mention the possibility of a rate increase before May 17, 2026?',
    'Resolution: YES if any current member of the Federal Reserve Board of Governors or any regional Federal Reserve Bank president uses language in a public communication (speech, interview, congressional testimony, or published statement on federalreserve.gov) before May 17, 2026 23:59 UTC that explicitly references the possibility of raising interest rates, a rate hike, or increasing the federal funds rate target. This includes conditional language (e.g., "if inflation persists, we may need to consider raising rates"). Must be reported by Reuters, Bloomberg, CNBC, or the Fed''s official website. If officials only discuss holding rates steady, cutting rates, or use language like "maintaining restrictive policy" without mentioning rate increases, this resolves as NO.',
    'Economics',
    'binary',
    '{"yes_label": "Yes, rate hike mentioned", "no_label": "No rate hike mention"}',
    'https://www.federalreserve.gov/newsevents/speeches.htm',
    NOW(),
    '2026-05-17T23:59:59Z',
    '2026-05-17T23:59:59Z',
    'open',
    'system'
  );
