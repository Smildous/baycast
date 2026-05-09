-- ============================================================
-- Baycast — Prediction Questions Batch (May 11, 2026)
--
-- 12 questions with short-to-medium horizon resolutions (May–July 2026).
-- All fresh topics, distinct from the May 6–10 batches.
-- Run via Supabase SQL Editor or Management API.
-- ============================================================

INSERT INTO public.questions (id, title, description, category, question_type, options, resolution_source, opens_at, closes_at, blind_until, status, created_by)
VALUES

  -- ── Technology (1–2) ──────────────────────────────────────

  -- 1. Apple announces on-device AI model for Siri
  (
    gen_random_uuid(),
    'Will Apple announce a new on-device large language model powering Siri at WWDC 2026 (June 9–13)?',
    'Resolution: YES if Apple announces at WWDC 2026 (June 9–13, 2026) that Siri is powered by a new Apple-developed large language model (LLM) that runs entirely or primarily on-device (on the iPhone, iPad, or Mac), as opposed to relying on cloud-based processing via a third-party provider. The announcement must specify that the model runs locally on the device for core Siri functionality. The model must be new (not the existing Apple Intelligence foundation model already deployed in iOS 18/macOS 15). The announcement must come from an official Apple source (keynote, press release, or developer documentation). Minor feature updates, new Siri voices, or expanded shortcuts do not count.',
    'Technology',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.apple.com/newsroom/',
    '2026-05-11T00:00:00Z',
    '2026-06-13T23:59:59Z',
    '2026-05-18T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- 2. Microsoft closes acquisition of a major AI startup (> $2B)
  (
    gen_random_uuid(),
    'Will Microsoft announce the completion of an acquisition of an AI company valued at over $2 billion before July 31, 2026?',
    'Resolution: YES if Microsoft publicly announces the closing (not just the intent) of an acquisition of a company whose primary business is artificial intelligence, with a deal value exceeding $2 billion, before July 31, 2026 23:59 UTC. The announcement must be published on Microsoft''s official blog, press site, or SEC filing (8-K). The target company must be primarily an AI company (e.g., model builder, AI infrastructure, AI-powered SaaS). Investments, minority stakes, licensing deals, or acqui-hires without a full acquisition do not count. Deals announced but not closed by the deadline do not count.',
    'Technology',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://blogs.microsoft.com/blog',
    '2026-05-11T00:00:00Z',
    '2026-07-31T23:59:59Z',
    '2026-05-18T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- ── Geopolitics (3–4) ──────────────────────────────────────

  -- 3. India-Pakistan ceasefire or de-escalation agreement
  (
    gen_random_uuid(),
    'Will India and Pakistan announce a formal ceasefire or mutual de-escalation agreement before June 30, 2026?',
    'Resolution: YES if the governments of India and Pakistan jointly announce (or confirm through their respective foreign ministries or defense ministries) a formal ceasefire, cessation of hostilities, or mutual de-escalation agreement specifically addressing military tensions between the two countries before June 30, 2026 23:59 UTC. The announcement must come from official government channels of both countries (or from a jointly issued statement). Third-party mediated statements (e.g., via the UN or a third country) count only if both India and Pakistan publicly endorse the agreement. Unilateral declarations, back-channel understandings without public confirmation, or temporary local pauses in firing without a broader agreement do not count.',
    'Geopolitics',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.mea.gov.in/',
    '2026-05-11T00:00:00Z',
    '2026-06-30T23:59:59Z',
    '2026-05-18T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- 4. Turkey officially applies to join BRICS+
  (
    gen_random_uuid(),
    'Will Turkey officially submit an application to join BRICS+ (or formally become a member) before July 31, 2026?',
    'Resolution: YES if Turkey''s government officially submits a formal application for membership in BRICS+ (the expanded BRICS bloc), or if Turkey is formally admitted as a new BRICS+ member, before July 31, 2026 23:59 UTC. The application or admission must be confirmed by an official Turkish government source (Ministry of Foreign Affairs, presidential statement) AND acknowledged by the current BRICS chair nation or the BRICS secretariat. Participation as an invited guest or observer at a BRICS meeting does not count. The membership must be for full BRICS+ status, not a partnership or dialogue format.',
    'Geopolitics',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.mfa.gov.tr/',
    '2026-05-11T00:00:00Z',
    '2026-07-31T23:59:59Z',
    '2026-05-18T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- ── Economics (5–6) ──────────────────────────────────────

  -- 5. ECB holds rates steady at June meeting
  (
    gen_random_uuid(),
    'Will the European Central Bank keep its main refinancing rate unchanged at its June 2026 monetary policy meeting?',
    'Resolution: YES if the ECB''s Governing Council, at its June 2026 monetary policy meeting (expected June 4), decides to keep the main refinancing interest rate at the same level as the previous meeting. The resolution is based on the official ECB press release published after the meeting. If the meeting is rescheduled, the rescheduled June meeting counts. If no meeting is held in June 2026, this resolves as NO.',
    'Economics',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.ecb.europa.eu/press/pressconf/html/index.en.html',
    '2026-05-11T00:00:00Z',
    '2026-06-30T23:59:59Z',
    '2026-05-18T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- 6. Silver closes above $40/oz
  (
    gen_random_uuid(),
    'Will silver (XAG/USD) close above $40.00 per troy ounce on any trading day before July 31, 2026?',
    'Resolution: YES if the LBMA Silver Price PM Fix exceeds $40.00 per troy ounce on any London business day between May 11 and July 31, 2026 (inclusive). If the LBMA PM Fix is unavailable on any day, the ICE futures settlement price for silver (COMEX) will be used as fallback. Flash spikes in aftermarket or electronic trading that do not correspond to the daily benchmark fix do not count. The closing benchmark fix is the authoritative price.',
    'Economics',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.lbma.org.uk/silver-price',
    '2026-05-11T00:00:00Z',
    '2026-07-31T23:59:59Z',
    '2026-05-18T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- ── Sports (7–8) ──────────────────────────────────────

  -- 7. French Open women's singles: Iga Świątek wins
  (
    gen_random_uuid(),
    'Will Iga Świątek win the 2026 French Open women''s singles title?',
    'Resolution: YES if Iga Świątek is the official winner of the 2026 French Open women''s singles tournament as published by Roland Garros''s official results. The tournament main draw runs May 25 – June 7, 2026. If Świątek is later disqualified (within 7 days of the final), the disqualification overrides the initial result. If Świątek withdraws before the tournament begins, this resolves as NO. The winner is the player who wins the final match, subject to any post-match penalties.',
    'Sports',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.rolandgarros.com/en-us/',
    '2026-05-11T00:00:00Z',
    '2026-06-07T23:59:59Z',
    '2026-05-18T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- 8. FIFA Club World Cup 2025: European team wins
  (
    gen_random_uuid(),
    'Will a European club win the 2026 FIFA Club World Cup (June 15 – July 13)?',
    'Resolution: YES if the winner of the 2026 FIFA Club World Cup (expanded 32-team format, hosted in the United States, June 15 – July 13, 2026) is a club affiliated with UEFA (European football confederation). The winner is determined by the official FIFA match result after the final. If the final goes to penalties, the penalty shootout winner counts. If the tournament is cancelled, postponed beyond July 31, or declared void, this resolves as NO.',
    'Sports',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.fifa.com/fifaplus/en/tournaments/mens/club-world-cup',
    '2026-05-11T00:00:00Z',
    '2026-07-13T23:59:59Z',
    '2026-05-18T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- ── Science (9–10) ──────────────────────────────────────

  -- 9. SpaceX Starship completes full orbital flight
  (
    gen_random_uuid(),
    'Will SpaceX Starship complete a full orbital flight (launch to orbit and successful re-entry/landing) before July 31, 2026?',
    'Resolution: YES if SpaceX''s Starship vehicle (Super Heavy booster + Starship upper stage) completes a full orbital flight profile that includes: (1) successful launch, (2) reaching orbital velocity/altitude (defined as completing at least one full orbit of Earth, or reaching an apogee above 200 km with sufficient velocity for orbit insertion), AND (3) controlled re-entry and landing (either intact on the ground or on a landing pad/ship, or a controlled ocean splashdown that SpaceX declares successful). The flight must be an integrated test of both stages. Suborbital hops or upper-stage-only tests do not count. The resolution is based on SpaceX''s official confirmation (webcast, press release, or social media).',
    'Science',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.spacex.com/launches/',
    '2026-05-11T00:00:00Z',
    '2026-07-31T23:59:59Z',
    '2026-05-18T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- 10. WHO declares end of a Public Health Emergency
  (
    gen_random_uuid(),
    'Will the WHO declare the end of any current Public Health Emergency of International Concern (PHEIC) before July 31, 2026?',
    'Resolution: YES if the World Health Organization (WHO) Director-General officially declares the end of any currently active Public Health Emergency of International Concern (PHEIC) before July 31, 2026 23:59 UTC. As of May 2026, the active PHEIC is mpox (declared August 2024). The declaration must be made via official WHO statement or press conference. The declaration of a NEW PHEIC does not count — only the termination of an existing one. If no PHEIC is active at the time of the question opening, this resolves as NO.',
    'Science',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.who.int/emergencies/emergency-committees',
    '2026-05-11T00:00:00Z',
    '2026-07-31T23:59:59Z',
    '2026-05-18T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- ── Crypto (11) ──────────────────────────────────────

  -- 11. Solana (SOL) reaches $300
  (
    gen_random_uuid(),
    'Will Solana (SOL) reach or exceed $300.00 at any point before July 31, 2026?',
    'Resolution: YES if SOL/USD spot price reaches ≥$300.00 on at least two major exchanges (from: Binance, Coinbase, Kraken, OKX) before July 31, 2026 23:59 UTC. Flash wicks lasting less than 1 minute on a single exchange without corroboration on at least one other major exchange do not count. Price must be visible on CoinGecko''s aggregated chart. Futures, perpetual swap, or derivative prices do not count.',
    'Crypto',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.coingecko.com/en/coins/solana',
    '2026-05-11T00:00:00Z',
    '2026-07-31T23:59:59Z',
    '2026-05-18T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- ── Culture (12) ──────────────────────────────────────

  -- 12. Cannes Palme d'Or goes to a first-time feature director
  (
    gen_random_uuid(),
    'Will the 2026 Cannes Film Festival Palme d''Or be awarded to a director making their feature-length narrative debut?',
    'Resolution: YES if the Palme d''Or at the 2026 Cannes Film Festival (awarded May 24, 2026) is awarded to a director who has not previously directed a feature-length narrative film (fiction, ≥60 minutes) that received a theatrical release or major festival premiere before 2026. Debut directors who have only made short films, documentaries, or TV episodes count as first-time feature directors. Co-directors count if both are first-time feature directors; if one co-director is experienced, this resolves as NO. The resolution is based on the official Cannes awards ceremony and the director''s filmography on IMDb or the festival''s official materials.',
    'Culture',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.festival-cannes.com/en/awards/palme-dor',
    '2026-05-11T00:00:00Z',
    '2026-05-24T23:59:59Z',
    '2026-05-18T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  );
