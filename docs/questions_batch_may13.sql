-- ============================================================
-- Baycast — Prediction Questions Batch (May 13, 2026)
--
-- 15 questions with medium-horizon resolutions (June–August 2026).
-- All fresh topics, distinct from the May 5–12 batches.
-- Run via Supabase SQL Editor or Management API.
-- ============================================================

INSERT INTO public.questions (id, title, description, category, question_type, options, resolution_source, opens_at, closes_at, blind_until, status, created_by)
VALUES

  -- ── Technology (1–3) ──────────────────────────────────────

  -- 1. EU AI Act omnibus adoption
  (
    gen_random_uuid(),
    'Will the European Parliament formally adopt the EU AI Act omnibus simplification package before August 31, 2026?',
    'Resolution: YES if the European Parliament holds a plenary vote and formally adopts the EU AI Act omnibus legislation (aimed at simplifying compliance obligations for high-risk AI systems, reducing reporting requirements, and aligning with the Machinery Regulation) before August 31, 2026 23:59 UTC. The adoption requires a majority vote in plenary. If the package is substantially amended (removing key simplification measures) but still adopted under the same legislative procedure, it counts as YES. If the package is withdrawn by the Commission or rejected by Parliament, this resolves as NO. Informal political agreements without a formal plenary vote do not count.',
    'Technology',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.europarl.europa.eu/plenary/en/votes.html',
    '2026-05-13T00:00:00Z',
    '2026-08-31T23:59:59Z',
    '2026-05-20T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- 2. Musk-OpenAI trial: Musk entitled to ownership
  (
    gen_random_uuid(),
    'Will a US federal court rule that Elon Musk is entitled to any ownership interest in OpenAI before August 31, 2026?',
    'Resolution: YES if a US federal court issues a ruling (summary judgment, bench trial verdict, or jury verdict) that grants Elon Musk any form of ownership interest, equity stake, or fiduciary rights in OpenAI or its affiliates before August 31, 2026 23:59 UTC. The ruling must be a final judgment on the merits, not an interim order or procedural ruling. If the case is settled out of court with Musk receiving equity or ownership as part of the settlement, this resolves as YES. If the court dismisses the case entirely, rules Musk has no ownership claim, or the case is stayed indefinitely, this resolves as NO. If the court orders a remedy that is not ownership (e.g., damages, injunction), this resolves as NO.',
    'Technology',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.reuters.com/legal/',
    '2026-05-13T00:00:00Z',
    '2026-08-31T23:59:59Z',
    '2026-05-20T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- 3. Meta Threads surpasses 300M MAU
  (
    gen_random_uuid(),
    'Will Meta''s Threads app surpass 300 million monthly active users (MAU) before August 31, 2026?',
    'Resolution: YES if Meta publicly reports (in an earnings call, earnings release, SEC filing, or official press release) that Threads has reached or exceeded 300 million monthly active users at any point before August 31, 2026 23:59 UTC. Meta defines MAU by its standard internal methodology. If Meta reports a different metric (e.g., "signups" or "installed users") without specifying MAU, the question resolves based on the closest available metric as reported by Meta. If Meta does not disclose Threads user metrics by the deadline, this resolves as NO. Third-party estimates (e.g., Sensor Tower, data.ai) are not authoritative.',
    'Technology',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://investor.meta.com/',
    '2026-05-13T00:00:00Z',
    '2026-08-31T23:59:59Z',
    '2026-05-20T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- ── Geopolitics (4–6) ──────────────────────────────────────

  -- 4. Putin-Zelenskyy face-to-face summit
  (
    gen_random_uuid(),
    'Will Vladimir Putin and Volodymyr Zelenskyy hold a face-to-face meeting for direct peace negotiations before August 31, 2026?',
    'Resolution: YES if Vladimir Putin and Volodymyr Zelenskyy are physically present in the same location at the same time for the purpose of direct peace negotiations regarding the Russia-Ukraine conflict before August 31, 2026 23:59 UTC. The meeting must be confirmed by official government sources from at least one side (Kremlin, Presidential Office of Ukraine) or reported by at least two major international news wires (Reuters, AP, AFP). Virtual meetings (video calls) do not count. Meetings at multilateral summits (e.g., G20) where both are present but do not hold a dedicated bilateral meeting on Ukraine do not count. The meeting does not need to result in an agreement — the question is about whether the meeting takes place.',
    'Geopolitics',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.reuters.com/world/europe/',
    '2026-05-13T00:00:00Z',
    '2026-08-31T23:59:59Z',
    '2026-05-20T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- 5. Israel-Hezbollah formal ceasefire
  (
    gen_random_uuid(),
    'Will Israel and Hezbollah sign a formal ceasefire agreement lasting at least 30 days before July 31, 2026?',
    'Resolution: YES if the State of Israel and Hezbollah (or the Lebanese government on Hezbollah''s behalf) sign a formal ceasefire agreement that both parties publicly commit to for a minimum duration of 30 consecutive days before July 31, 2026 23:59 UTC. The agreement must be announced by an official source from both parties (or their mediators) and reported by at least one major international news wire (Reuters, AP, or AFP). Existing ceasefire understandings (such as the November 2024 ceasefire) do not count — this must be a new formal agreement. Temporary humanitarian pauses under 30 days or unilateral ceasefires do not count. If the ceasefire is signed but violated by either side within 48 hours, the signing itself still counts as YES for this question.',
    'Geopolitics',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.reuters.com/world/middle-east/',
    '2026-05-13T00:00:00Z',
    '2026-07-31T23:59:59Z',
    '2026-05-20T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- 6. UK Labour loses Commons majority via by-elections
  (
    gen_random_uuid(),
    'Will the UK Labour Party lose its overall majority in the House of Commons through by-election defeats before August 31, 2026?',
    'Resolution: YES if, as a direct result of by-election defeats (not defections, suspensions, or resignations), the number of Labour MPs sitting in the House of Commons falls to or below the number required for an overall majority (326 out of 650 seats) at any point before August 31, 2026 23:59 UTC. The count is based on the official House of Commons composition as published by parliament.uk. MPs who defect from Labour, are suspended from the party whip, or resign the whip do not count as "by-election defeats" for this question — the loss must occur through an actual by-election where a Labour-held seat is won by another party. If Labour already lacks an overall majority as of May 13, 2026 (due to previous by-elections), this resolves as YES immediately upon opening.',
    'Geopolitics',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://commonslibrary.parliament.uk/',
    '2026-05-13T00:00:00Z',
    '2026-08-31T23:59:59Z',
    '2026-05-20T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- ── Economics (7–8) ──────────────────────────────────────

  -- 7. Eurozone HICP inflation falls below 1.5%
  (
    gen_random_uuid(),
    'Will the Eurozone headline HICP inflation rate (year-over-year) fall below 1.5% in any Eurostat flash estimate published before August 31, 2026?',
    'Resolution: YES if Eurostat publishes a flash estimate for Eurozone headline HICP (Harmonised Index of Consumer Prices) showing year-over-year inflation below 1.5% for any reference month, published before August 31, 2026 23:59 UTC. The relevant flash estimates would cover data through May, June, or July 2026. The figure used is the headline all-items HICP YoY rate as published in the Eurostat flash estimate press release. Core HICP is not used for resolution. If Eurostat delays or skips a flash estimate publication, the final estimate is used instead. If Eurostat changes its methodology during the period, the new methodology applies.',
    'Economics',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://ec.europa.eu/eurostat/databrowser/view/PRC_HICP_MSTR/default/table',
    '2026-05-13T00:00:00Z',
    '2026-08-31T23:59:59Z',
    '2026-05-20T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- 8. Canadian dollar closes below 0.68 USD
  (
    gen_random_uuid(),
    'Will the Canadian dollar (CAD/USD) close below 0.68 at any point before August 31, 2026?',
    'Resolution: YES if the CAD/USD exchange rate closes below 0.6800 at the end of any trading day (17:00 ET / 21:00 UTC) as reported by the Bank of Canada, Bloomberg, or the Federal Reserve before August 31, 2026 23:59 UTC. The rate is the nominal spot exchange rate (CAD per 1 USD, inverted — i.e., the question resolves YES when 1 CAD is worth less than $0.68 USD). If the Bank of Canada or another authoritative source reports a daily close below 0.6800, this resolves as YES. Intraday dips below 0.68 that recover by the close do not count.',
    'Economics',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.bankofcanada.ca/rates/exchange-daily/',
    '2026-05-13T00:00:00Z',
    '2026-08-31T23:59:59Z',
    '2026-05-20T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- ── Science (9–10) ──────────────────────────────────────

  -- 9. SpaceX Starship V3 first booster catch
  (
    gen_random_uuid(),
    'Will SpaceX successfully catch a Starship V3 Super Heavy booster with the Mechazilla tower arms on its first orbital launch attempt before August 31, 2026?',
    'Resolution: YES if SpaceX launches a Starship V3 (the upgraded, larger version of Super Heavy) on its first orbital test flight attempt and successfully catches the Super Heavy booster using the launch tower''s mechanical arms (colloquially known as "chopstick catch" or "Mechazilla") during the boostback/landing phase before August 31, 2026 23:59 UTC. The catch must be confirmed by SpaceX via official webcast, social media, or press release. A soft landing on a drone ship or ground pad does not count — the catch must be by the tower arms. If V3''s first orbital attempt fails to launch (scrub, abort, or pre-launch explosion), subsequent attempts of V3 still count as long as it is still the first successful orbital attempt for V3. Booster catches on V2 (or earlier) vehicles do not count.',
    'Science',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.spacex.com/launches/',
    '2026-05-13T00:00:00Z',
    '2026-08-31T23:59:59Z',
    '2026-05-20T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- 10. Private lunar lander soft-landing
  (
    gen_random_uuid(),
    'Will a privately developed spacecraft successfully soft-land on the Moon before August 31, 2026?',
    'Resolution: YES if a spacecraft developed by a private company (not a government space agency, though the mission may be funded in part by NASA CLPS or similar contracts) successfully performs a soft landing on the lunar surface — defined as touching down with controlled deceleration and remaining operational (transmitting data or images) for at least 1 hour after landing — before August 31, 2026 23:59 UTC. The landing must be confirmed by the company or by NASA. Intuitive Machines, Astrobotic, Firefly Aerospace, and ispace are among the eligible companies. Hard landings (crashes), landings on the wrong celestial body, or landings where the spacecraft is immediately declared non-operational do not count. If the same company had a previous successful landing, a second successful landing by the same or a different company still counts as YES.',
    'Science',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.nasa.gov/mission/clps/',
    '2026-05-13T00:00:00Z',
    '2026-08-31T23:59:59Z',
    '2026-05-20T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- ── Sports (11–12) ──────────────────────────────────────

  -- 11. 2026 NBA Finals goes to Game 7
  (
    gen_random_uuid(),
    'Will the 2026 NBA Finals go to a Game 7?',
    'Resolution: YES if the 2026 NBA Finals best-of-seven series reaches a seventh game (Game 7 is scheduled to be played). The 2026 NBA Finals are expected to begin in early June 2026. Game 7 being scheduled and played (regardless of outcome) counts as YES. If Game 7 is scheduled but postponed and not played before August 31, 2026, this resolves as NO. If the series ends in fewer than 7 games (4-0, 4-1, 4-2, or 4-3), the question resolves based on whether a Game 7 was played: a 4-3 series means YES (Game 7 was played), while 4-0, 4-1, or 4-2 means NO.',
    'Sports',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.nba.com/playoffs/',
    '2026-05-13T00:00:00Z',
    '2026-08-31T23:59:59Z',
    '2026-05-20T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- 12. Tour de France 2026: French winner
  (
    gen_random_uuid(),
    'Will a French rider win the 2026 Tour de France general classification?',
    'Resolution: YES if the rider who wins the yellow jersey (general classification) of the 2026 Tour de France (June 27 – July 19, 2026) holds French nationality at the time of the victory. The official results as published by ASO (Amaury Sport Organisation) on the Tour de France website are authoritative. If the winner is later disqualified for doping or other reasons and a French rider is elevated to first place, the final standings after all appeals are exhausted determine the resolution. If the Tour is cancelled, shortened to fewer than 10 stages, or postponed beyond August 31, this resolves as NO.',
    'Sports',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.letour.fr/en/',
    '2026-05-13T00:00:00Z',
    '2026-07-31T23:59:59Z',
    '2026-05-20T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- ── Culture (13–14) ──────────────────────────────────────

  -- 13. Eurovision 2026: first-time winner country
  (
    gen_random_uuid(),
    'Will a country that has never previously won the Eurovision Song Contest win the 2026 edition (Grand Final: May 16, 2026)?',
    'Resolution: YES if the country that receives the highest combined score (jury + public televote) in the Eurovision 2026 Grand Final on May 16, 2026 has never won the Eurovision Song Contest in any previous edition since the contest began in 1956. Countries that have won before include: Switzerland (1956, 1988, 2024), Netherlands, Luxembourg, France, Italy, United Kingdom, Monaco, Spain, Ireland, Israel, Norway, Sweden, Denmark, Belgium, Germany, Austria, Greece, Turkey, Serbia, Russia, Azerbaijan, Ukraine, Portugal, Italy, and any other past winner. The official EBU results for Eurovision 2026 are authoritative. If two or more countries tie for first place and at least one is a first-time winner, this resolves as YES (a first-time winner is declared). If the contest is cancelled, this resolves as NO.',
    'Culture',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://eurovision.tv/',
    '2026-05-13T00:00:00Z',
    '2026-05-17T23:59:59Z',
    '2026-05-20T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- 14. Summer 2026 blockbuster grosses $1B+ worldwide
  (
    gen_random_uuid(),
    'Will any individual film released between June 1 and August 31, 2026 gross over $1 billion worldwide at the theatrical box office?',
    'Resolution: YES if any single film with a wide theatrical release date (in any market) between June 1 and August 31, 2026 reaches cumulative worldwide gross box office revenue exceeding $1,000,000,000 (one billion USD) as reported by Box Office Mojo (boxofficemojo.com) or The Numbers (the-numbers.com) before August 31, 2026 23:59 UTC. The film must have its initial wide release during the June–August 2026 window; films released earlier that cross $1B during the summer do not count. Re-releases, anniversary editions, or expanded re-releases of older films do not count. The gross figure is the total worldwide theatrical gross (not adjusted for inflation). If no single film reaches $1B but multiple films together exceed $1B, this resolves as NO — the question is about a single film.',
    'Culture',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.boxofficemojo.com/',
    '2026-05-13T00:00:00Z',
    '2026-08-31T23:59:59Z',
    '2026-05-20T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  ),

  -- ── Crypto (15) ──────────────────────────────────────

  -- 15. US Senate passes CLARITY Act crypto bill
  (
    gen_random_uuid(),
    'Will the US Senate pass the CLARITY Act (or equivalent comprehensive cryptocurrency regulation bill) and send it to the President before July 31, 2026?',
    'Resolution: YES if the US Senate passes the CLARITY Act (S.2398 or successor legislation providing comprehensive regulation of digital assets, defining which tokens are securities vs commodities, and establishing a regulatory framework for crypto exchanges) by a simple majority vote and the bill is sent to the President''s desk for signature before July 31, 2026 23:59 UTC. The bill must receive an affirmative Senate floor vote (not just committee approval). If the bill is substantially amended in the Senate (e.g., merged with other legislation) but still addresses comprehensive crypto regulation, it counts. If the bill passes the House but not the Senate, or passes the Senate but is not sent to the President before the deadline, this resolves as NO. If an entirely different but equivalent comprehensive crypto regulation bill passes both chambers and is sent to the President, this resolves as YES. Congress.gov is the authoritative source for legislative status.',
    'Crypto',
    'binary',
    '{"yes_label": "Yes", "no_label": "No"}',
    'https://www.congress.gov/',
    '2026-05-13T00:00:00Z',
    '2026-07-31T23:59:59Z',
    '2026-05-20T00:00:00Z',
    'open',
    '00000000-0000-0000-0000-000000000001'
  );
