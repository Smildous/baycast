-- ============================================================
-- Baycast — Seed Questions Batch v2 (May 5, 2026)
--
-- 10 questions for public launch. Resolutions: Jun–Aug 2026.
-- Short-horizon, high-interest, non-trivial probabilities.
-- Run via Supabase SQL Editor or Management API.
-- ============================================================

INSERT INTO public.questions (id, title, description, category, question_type, options, resolution_source, opens_at, closes_at, blind_until, status, created_by)
VALUES
  -- ── Economics (1–2) ───────────────────────────────────────

  -- 1. Fed rate cut at June FOMC
  (
    gen_random_uuid(),
    'Will the Federal Reserve cut the target federal funds rate at the June 2026 FOMC meeting?',
    'Resolution: YES if the Federal Open Market Committee (FOMC) lowers the target range for the federal funds rate at its June 16–17, 2026 meeting. The decision is announced via the FOMC statement released after the meeting (typically Wednesday afternoon ET). A change in the target range (even by 25 basis points) counts as a cut. Maintaining the current rate or raising it counts as NO. If the June FOMC meeting is cancelled or postponed, this question resolves based on the next scheduled FOMC decision meeting before August 1, 2026.',
    'Economics',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.federalreserve.gov/newsevents/pressreleases.htm',
    '2026-05-05T00:00:00Z',
    '2026-06-18T23:59:59Z',
    '2026-05-12T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- 2. US CPI inflation above 3.5% for May 2026
  (
    gen_random_uuid(),
    'Will the US annual CPI inflation rate for May 2026 exceed 3.5%?',
    'Resolution: YES if the US Bureau of Labor Statistics (BLS) reports a seasonally adjusted year-over-year All Items Consumer Price Index (CPI-U) change greater than 3.5% for May 2026. The relevant figure is the headline (All Items) CPI, not Core CPI. The BLS typically releases the May CPI report around June 11, 2026. If the BLS delays the release, this question resolves based on the first official BLS publication of May 2026 CPI data.',
    'Economics',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.bls.gov/cpi/',
    '2026-05-05T00:00:00Z',
    '2026-06-30T23:59:59Z',
    '2026-05-12T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- ── Crypto (3) ────────────────────────────────────────────

  -- 3. Bitcoin reaches $100,000
  (
    gen_random_uuid(),
    'Will Bitcoin reach or exceed $100,000 at any point before July 31, 2026?',
    'Resolution: YES if the BTC/USD spot price reaches $100,000 or higher on at least one major exchange (Coinbase, Binance, or Kraken) at any time before July 31, 2026, 23:59 UTC. Flash wicks lasting less than 1 minute on a single exchange with no corroborating trades on another major exchange do not count. The price must be visible on CoinGecko''s aggregated BTC/USD chart or an equivalent reputable price aggregator.',
    'Crypto',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.coingecko.com/en/coins/bitcoin',
    '2026-05-05T00:00:00Z',
    '2026-07-31T23:59:59Z',
    '2026-05-12T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- ── AI (4) ────────────────────────────────────────────────

  -- 4. OpenAI IPO S-1 filing
  (
    gen_random_uuid(),
    'Will OpenAI publicly file an S-1 registration statement with the SEC before August 1, 2026?',
    'Resolution: YES if OpenAI publicly files a Form S-1 registration statement with the US Securities and Exchange Commission (SEC) for an initial public offering before August 1, 2026, 23:59 UTC. The filing must be publicly accessible via the SEC''s EDGAR system (sec.gov). A confidential draft submission that is not publicly visible does not count. An S-1 filing for a different entity (e.g., a subsidiary or SPAC) does not count unless explicitly for OpenAI''s IPO.',
    'AI',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&company=openai&type=S-1',
    '2026-05-05T00:00:00Z',
    '2026-07-31T23:59:59Z',
    '2026-05-12T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- ── Geopolitics (5–6) ────────────────────────────────────

  -- 5. US-Iran ceasefire holds 30 days
  (
    gen_random_uuid(),
    'Will the US-Iran ceasefire hold for 30 consecutive days without major military escalation before August 1, 2026?',
    'Resolution: YES if there are 30 consecutive calendar days (not necessarily starting today) between May 5 and August 1, 2026 during which neither the US nor Iran (or their direct proxies) conducts any of the following: (a) airstrikes or missile attacks on the other''s territory, (b) naval engagements in the Persian Gulf or Strait of Hormuz, or (c) officially declared resumption of hostilities. Minor skirmishes, drone interceptions in international airspace, or cyber attacks do not count as "major military escalation." If a ceasefire has not been formally declared by May 5, 2026, the question resolves based on the longest consecutive no-escalation period observed.',
    'Geopolitics',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.reuters.com/world/middle-east/',
    '2026-05-05T00:00:00Z',
    '2026-07-31T23:59:59Z',
    '2026-05-12T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- 6. Russia-Ukraine formal peace agreement
  (
    gen_random_uuid(),
    'Will Russia and Ukraine sign a formal peace agreement before August 1, 2026?',
    'Resolution: YES if representatives of the Russian Federation and Ukraine sign a document officially designated as a peace treaty, peace agreement, or armistice agreement before August 1, 2026, 23:59 UTC. The signing must be announced by both governments or by a recognized international mediator (UN, US, EU, Turkey, etc.). A temporary ceasefire, humanitarian pause, prisoner exchange agreement, or local truce does not count — the agreement must address the termination of the armed conflict between the two states.',
    'Geopolitics',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.reuters.com/world/europe/',
    '2026-05-05T00:00:00Z',
    '2026-07-31T23:59:59Z',
    '2026-05-12T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- ── Science (7) ──────────────────────────────────────────

  -- 7. SpaceX Starship launch from Florida
  (
    gen_random_uuid(),
    'Will SpaceX launch a Starship vehicle from Kennedy Space Center, Florida before August 1, 2026?',
    'Resolution: YES if a SpaceX Starship vehicle (Super Heavy booster + Starship upper stage, fully integrated) launches from Launch Complex 39A (LC-39A) at NASA''s Kennedy Space Center, Florida before August 1, 2026, 23:59 UTC. The launch must result in the vehicle clearing the pad (liftoff). A scrub, abort, or static fire test without liftoff does not count. Source: SpaceX official announcements, NASA Spaceflight, or FAA launch license records.',
    'Science',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.spacex.com/launches/',
    '2026-05-05T00:00:00Z',
    '2026-07-31T23:59:59Z',
    '2026-05-12T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- ── Sports (8) ────────────────────────────────────────────

  -- 8. World Cup 2026 average goals per game
  (
    gen_random_uuid(),
    'Will the 2026 FIFA World Cup have a higher average goals per game than the 2022 tournament (2.79)?',
    'Resolution: YES if the average goals per game across all 104 matches of the 2026 FIFA World Cup (June 11 – July 19, 2026) exceeds 2.79. The 2022 tournament average of 2.79 goals per game is the reference threshold. The 2026 average is calculated as total goals scored in all matches (including group stage, knockout, and third-place match) divided by 104. If the tournament format changes or matches are cancelled, the denominator adjusts accordingly. Source: FIFA official match statistics.',
    'Sports',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.fifa.com/fifaplus/en/tournaments/mens/worldcup/canadamexicousa2026',
    '2026-05-05T00:00:00Z',
    '2026-07-19T23:59:59Z',
    '2026-05-12T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- ── Technology (9) ────────────────────────────────────────

  -- 9. Apple WWDC: proprietary AI model
  (
    gen_random_uuid(),
    'Will Apple announce a new proprietary large language model (branded as a distinct model) at WWDC 2026?',
    'Resolution: YES if Apple announces a new proprietary large language model (LLM) with a distinct brand name (e.g., "Apple Foundation Model," "Apple Intelligence 2," or equivalent) during its WWDC 2026 keynote or developer sessions (June 8–12, 2026). The announcement must explicitly describe the model as a new or next-generation LLM developed by Apple, not just an update to existing on-device ML features. A partnership announcement with a third-party AI company (OpenAI, Anthropic, Google) for an existing model does not count. Source: Apple Newsroom, WWDC session recordings, or official Apple press releases.',
    'Technology',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.apple.com/newsroom/',
    '2026-05-05T00:00:00Z',
    '2026-06-13T23:59:59Z',
    '2026-05-12T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- ── Entertainment (10) ───────────────────────────────────

  -- 10. Summer 2026 $1B blockbuster
  (
    gen_random_uuid(),
    'Will any film released between May 1 and July 31, 2026 gross over $1 billion worldwide?',
    'Resolution: YES if at least one wide-release film (opening on 2,000+ screens domestically) that premieres in theaters between May 1 and July 31, 2026 (inclusive) reaches $1,000,000,000 or more in cumulative worldwide theatrical box office gross by August 1, 2026, 23:59 UTC. Re-releases, expanded re-releases of older films, and films that premiered before May 1, 2026 do not count. Source: Box Office Mojo or The Numbers.',
    'Entertainment',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.boxofficemojo.com/',
    '2026-05-05T00:00:00Z',
    '2026-07-31T23:59:59Z',
    '2026-05-12T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  );
