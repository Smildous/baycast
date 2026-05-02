-- ============================================================
-- Baycast — Seed Questions — Product Batch (10 questions)
--
-- Mix: AI (3), Tech, Crypto, Geopolitics, Science, Sports, Entertainment
-- Closing dates: June 2026 – December 2026
-- Controversial, realistic resolution criteria, specific thresholds
-- ============================================================

INSERT INTO public.questions (id, title, description, category, question_type, options, resolution_source, opens_at, closes_at, blind_until, status, created_by)
VALUES
  -- ── AI (1–3) ───────────────────────────────────────────────

  -- 1. Claude 5 / Anthropic next-gen model
  (
    gen_random_uuid(),
    'Anthropic will release Claude 5 (or equivalent next-gen model) before Oct 2026',
    'Resolution: YES if Anthropic officially announces and makes available a model designated as "Claude 5" or a next-generation successor to Claude 4 (e.g. Claude Opus 5, Claude 5 Pro) via API or product before October 15, 2026, 23:59 UTC. The model must be publicly accessible to developers or end-users (not just a research paper or internal benchmark). A major rebrand (e.g. entirely new name) that is clearly marketed as Anthropic''s flagship model successor also counts.',
    'AI',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.anthropic.com/news',
    '2026-05-02T00:00:00Z',
    '2026-10-15T23:59:59Z',
    '2026-05-09T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- 2. AI model achieves silver on IOI 2026
  (
    gen_random_uuid(),
    'An AI system will win a silver medal or higher at IOI 2026',
    'Resolution: YES if any AI system (defined as a computer program that is not predominantly human-guided during the contest) scores enough points at the International Olympiad in Informatics (IOI) 2026 to earn a medal equivalent to silver or higher (i.e., ≥ approximately top 25% of human gold+silver thresholds). The AI system must compete under standard IOI rules (5 hours, 3 tasks, no internet). If IOI 2026 is cancelled, this question resolves as N/A. Source: official IOI 2026 results page.',
    'AI',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://ioi2026.org/',
    '2026-05-02T00:00:00Z',
    '2026-09-30T23:59:59Z',
    '2026-05-09T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- 3. US federal AI regulation bill signed into law
  (
    gen_random_uuid(),
    'A comprehensive US federal AI regulation bill will be signed into law by Dec 2026',
    'Resolution: YES if the US President signs into law a bill that (a) specifically targets AI systems as its primary regulatory subject, (b) establishes a new federal regulatory body or assigns AI regulatory authority to an existing agency, and (c) includes enforceable compliance requirements (not just reporting or voluntary guidelines) before December 31, 2026, 23:59 UTC. Executive orders, agency guidance documents, or defense/national-security-only AI bills do not count. Must be a public law enacted through standard legislative process.',
    'AI',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.congress.gov/',
    '2026-05-02T00:00:00Z',
    '2026-12-31T23:59:59Z',
    '2026-05-09T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- ── Tech (4) ───────────────────────────────────────────────

  -- 4. Apple Vision Pro 2 launch
  (
    gen_random_uuid(),
    'Apple will announce Vision Pro 2 before Dec 2026',
    'Resolution: YES if Apple officially announces a second-generation Vision Pro headset (marketed as "Vision Pro 2" or equivalent successor) at a public event or via press release before December 31, 2026, 23:59 UTC. The device must be a distinct new model (not just a firmware update or accessory). A lower-cost variant (e.g. "Vision Air") does not count — it must be positioned as the Pro successor.',
    'Technology',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.apple.com/newsroom/',
    '2026-05-02T00:00:00Z',
    '2026-12-31T23:59:59Z',
    '2026-05-09T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- ── Crypto (5) ─────────────────────────────────────────────

  -- 5. Ethereum exceeds $6,000
  (
    gen_random_uuid(),
    'Ethereum will exceed $6,000 at any point by Dec 2026',
    'Resolution: YES if ETH/USD spot price reaches ≥$6,000 on a major exchange (Coinbase, Binance, Kraken) before December 31, 2026, 23:59 UTC. Flash spikes on low-liquidity exchanges do not count; the price must be sustained for at least 1 minute on a top-10 exchange by 24h volume.',
    'Crypto',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.coingecko.com/en/coins/ethereum',
    '2026-05-02T00:00:00Z',
    '2026-12-31T23:59:59Z',
    '2026-05-09T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- ── Geopolitics (6) ────────────────────────────────────────

  -- 6. NATO member exits or suspends membership
  (
    gen_random_uuid(),
    'A NATO member state will announce withdrawal or suspension from the alliance by Dec 2026',
    'Resolution: YES if any current NATO member state''s head of government or parliament officially announces intent to withdraw from NATO, initiates the Article 13 withdrawal process, or votes to suspend its membership before December 31, 2026, 23:59 UTC. Campaign promises, opinion polls, or non-binding parliamentary resolutions do not count. The announcement must come from an official government source.',
    'Politics',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.nato.int/cps/en/natohq/news.htm',
    '2026-05-02T00:00:00Z',
    '2026-12-31T23:59:59Z',
    '2026-05-09T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- ── Science (7) ────────────────────────────────────────────

  -- 7. New COVID variant triggers WHO PHEIC
  (
    gen_random_uuid(),
    'WHO will declare a PHEIC for a new COVID variant by Dec 2026',
    'Resolution: YES if the World Health Organization declares a Public Health Emergency of International Concern (PHEIC) specifically citing a new SARS-CoV-2 variant as the primary reason before December 31, 2026, 23:59 UTC. The declaration must be for a newly designated variant (not an existing VOI/VOC from before May 2026). Source: WHO official announcements.',
    'Science',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.who.int/emergencies',
    '2026-05-02T00:00:00Z',
    '2026-12-31T23:59:59Z',
    '2026-05-09T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- ── Sports (8) ─────────────────────────────────────────────

  -- 8. 2026 FIFA World Cup winner
  (
    gen_random_uuid(),
    'A European team will win the 2026 FIFA World Cup',
    'Resolution: YES if the winner of the 2026 FIFA World Cup final is a national team from UEFA (Union of European Football Associations). The tournament runs June 11 – July 19, 2026, in USA/Canada/Mexico. If the tournament is cancelled or indefinitely postponed, this question resolves as N/A.',
    'Sports',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.fifa.com/fifaplus/en/tournaments/mens/worldcup/canadamexicousa2026',
    '2026-05-02T00:00:00Z',
    '2026-07-19T23:59:59Z',
    '2026-05-09T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- ── Entertainment (9) ──────────────────────────────────────

  -- 9. Avatar 3 box office
  (
    gen_random_uuid(),
    'Avatar 3: Fire and Ash will gross over $2 billion worldwide',
    'Resolution: YES if Avatar 3: Fire and Ash (directed by James Cameron, scheduled for December 19, 2026) earns more than $2,000,000,000 (USD) in worldwide cumulative gross at the theatrical box office before December 31, 2026, 23:59 UTC. Source: Box Office Mojo, The Numbers, or comScore. If the film''s release is delayed beyond December 31, 2026, this question resolves as N/A.',
    'Entertainment',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.boxofficemojo.com/',
    '2026-05-02T00:00:00Z',
    '2026-12-31T23:59:59Z',
    '2026-05-09T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- ── Science / Tech crossover (10) ──────────────────────────

  -- 10. Quantum computer advantage on real-world problem
  (
    gen_random_uuid(),
    'A quantum computer will demonstrate practical advantage over classical supercomputers by Dec 2026',
    'Resolution: YES if a peer-reviewed paper published in a major journal (Nature, Science, Physical Review Letters, or equivalent) demonstrates a quantum computer solving a commercially or scientifically relevant problem (not a contrived benchmark like random circuit sampling) with provable advantage over the best known classical algorithms running on the most powerful available supercomputers. The paper must be published before December 31, 2026, 23:59 UTC. Google''s "Willow" and similar advances count only if they demonstrate advantage on a practical/useful problem, not just quantum supremacy benchmarks.',
    'Science',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.nature.com/subjects/quantum-information',
    '2026-05-02T00:00:00Z',
    '2026-12-31T23:59:59Z',
    '2026-05-09T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  );
