-- Baycast Prediction Questions — Batch May 21
-- Created: 2026-05-12
-- 15 questions · Resolution window: May 21 – June 30, 2026
-- Topics: Apple AI partnership, AI safety review, Waymo expansion,
-- NATO summit accession, Russia-Ukraine ceasefire, US-China tariff deal,
-- ECB rate cut, US payrolls, SpaceX Starship payloads, Rubin Observatory,
-- UCL Final Spain/England, NBA Western Conference, Solana ETF, ETH $4500,
-- Cannes Palme d'Or woman director

INSERT INTO questions (title, description, category, options, resolution_date, resolution_source, status, created_by) VALUES

-- AI/Technology (3)

('Will Apple announce a partnership with Google, Anthropic, or OpenAI to power on-device AI in iOS 20 at WWDC 2026?',
 'Apple is rumored to be exploring external AI partnerships. This resolves YES if Apple announces during the WWDC 2026 keynote (expected June 8-12, 2026) that iOS 20 will integrate AI models from Google (Gemini), Anthropic (Claude), or OpenAI (ChatGPT) as a primary on-device or on-system AI engine. The partnership must go beyond the existing ChatGPT integration in Siri — it must involve a newly announced, named AI model powering system-level features. Apple Intelligence built solely on Apple''s own models does not count.',
 'AI/Technology', '["Yes","No"]', '2026-06-13', 'https://apple.com/newsroom; https://developer.apple.com', 'active', 'baycast-system'),

('Will a major AI company (OpenAI, Google, Anthropic, or Meta) voluntarily submit a frontier model for US government safety review before its public release, before June 30, 2026?',
 'The US AI Safety Institute (AISI) has been establishing voluntary review frameworks. This resolves YES if any of OpenAI, Google DeepMind, Anthropic, or Meta publicly announces that it has submitted a frontier AI model (not a minor update) to the US AISI or a designated federal agency for formal safety evaluation before the model''s public release, before June 30, 2026. Pre-deployment testing agreements or MoUs already signed before May 12, 2026 do not count — this must be a new, specific model submission event.',
 'AI/Technology', '["Yes","No"]', '2026-06-30', 'https://nist.gov/aisi; https://www.commerce.gov', 'active', 'baycast-system'),

('Will Waymo expand its commercial robotaxi service to at least one new US city before June 30, 2026?',
 'Waymo currently operates commercial robotaxi services in select US cities. This resolves YES if Waymo officially launches a commercial, publicly available Level 4 autonomous ride-hailing service in at least one US city where it did not previously offer commercial service, with the launch date on or before June 30, 2026. Testing-only operations, geofenced employee pilots, or invite-only beta programs do not count. The new city must be announced via official Waymo communications and accepting rides from the general public.',
 'AI/Technology', '["Yes","No"]', '2026-06-30', 'https://waymo.com', 'active', 'baycast-system'),

-- Geopolitics (3)

('Will NATO announce the accession of at least one new member state at the June 2026 NATO Summit in The Hague?',
 'The NATO Summit is scheduled for June 24-25, 2026 in The Hague, Netherlands. This resolves YES if NATO officially announces at or around the summit that at least one new country has been formally invited to begin accession proceedings or has completed accession, as reported in the summit communiqué or official NATO press release. Countries already in the accession process that complete accession before the summit count. Partnership agreements, enhanced cooperation frameworks, or membership action plans without actual accession or invitation do not count.',
 'Geopolitics', '["Yes","No"]', '2026-06-26', 'https://nato.int', 'active', 'baycast-system'),

('Will Russia and Ukraine sign a formal ceasefire agreement before June 30, 2026?',
 'This resolves YES if Russia and Ukraine sign a formal, mutually acknowledged ceasefire agreement or armistice that is publicly announced by both governments and confirmed by the UN, Reuters, or AP before June 30, 2026. The agreement must be described as a ceasefire, armistice, or peace agreement by both parties. Temporary humanitarian pauses lasting less than 72 hours, unilateral ceasefires, prisoner exchanges, or grain deal extensions without a broader ceasefire do not count. A signed document or joint announcement by both foreign ministries is required.',
 'Geopolitics', '["Yes","No"]', '2026-06-30', 'https://reuters.com; https://un.org; https://mfa.gov.ua', 'active', 'baycast-system'),

('Will the US and China announce a bilateral agreement to reduce tariffs on each other''s goods before June 30, 2026?',
 'This resolves YES if the US and Chinese governments jointly announce, or separately confirm within 48 hours of each other, a formal agreement to reduce or suspend tariffs on bilateral trade. The agreement must be confirmed by both the White House or USTR and China''s Ministry of Commerce or State Council. Verbal commitments, framework agreements without specific tariff schedule changes, or extensions of existing exemptions without new reductions do not count. The announcement must reference specific tariff reductions or suspensions.',
 'Geopolitics', '["Yes","No"]', '2026-06-30', 'https://whitehouse.gov; https://ustr.gov; https://mofcom.gov.cn', 'active', 'baycast-system'),

-- Economics (2)

('Will the ECB lower its deposit facility rate at its June 4, 2026 monetary policy meeting?',
 'The ECB Governing Council meets on June 4, 2026 to set monetary policy. This resolves YES if the ECB announces a decrease in the deposit facility rate from its level immediately prior to the meeting, as stated in the official ECB monetary policy press release. A rate hold or increase resolves as NO. Forward guidance about future rate changes does not count — only the actual rate decision announced on June 4, 2026 matters.',
 'Economics', '["Yes","No"]', '2026-06-05', 'https://ecb.europa.eu/press/html/index.en.html', 'active', 'baycast-system'),

('Will US non-farm payroll growth for May 2026 be below 100,000 jobs?',
 'The US Bureau of Labor Statistics releases the May 2026 Employment Situation report on approximately June 5, 2026. This resolves YES if the seasonally adjusted month-over-month change in total non-farm payrolls for May 2026 is reported as less than 100,000 jobs (including zero or negative growth). The initial preliminary estimate published in the headline Employment Situation Summary (news release) is used for resolution. Subsequent revisions in later months do not change the resolution. If the BLS delays publication, the resolution date extends to 7 days after the actual release.',
 'Economics', '["Yes","No"]', '2026-06-07', 'https://bls.gov/news.release/empsit.toc.htm', 'active', 'baycast-system'),

-- Science (2)

('Will SpaceX successfully launch a Starship vehicle that deploys operational satellites into orbit before June 30, 2026?',
 'This resolves YES if SpaceX launches a Starship vehicle (any variant) that successfully deploys at least one operational satellite into its intended orbit before June 30, 2026, as confirmed by SpaceX official communications or verified tracking sources (e.g., Jonathan McDowell''s space tracking). The satellite must separate from the vehicle and be confirmed in its intended orbit. Test flights without satellite deployment, suborbital flights, or launches where the payload fails to deploy do not count. Successful booster/ship recovery is not required — only successful satellite deployment.',
 'Science', '["Yes","No"]', '2026-06-30', 'https://spacex.com; https://x.com/spacex', 'active', 'baycast-system'),

('Will the Vera C. Rubin Observatory release its first public science-quality survey images before June 30, 2026?',
 'The Vera C. Rubin Observatory is expected to begin its Legacy Survey of Space and Time (LSST). This resolves YES if the Rubin Observatory publicly releases at least one science-quality image from its main Simonyi Survey Telescope to the scientific community or general public before June 30, 2026, as confirmed by the Rubin Observatory''s official website, an NSF press release, or an AURA announcement. Engineering test images, calibration frames, or commissioning images not designated as science-quality do not count. The release must be described as part of the survey or first-light science release.',
 'Science', '["Yes","No"]', '2026-06-30', 'https://rubinobservatory.org; https://nsf.gov', 'active', 'baycast-system'),

-- Sports (2)

('Will the 2025-26 UEFA Champions League Final feature at least one club from Spain or England?',
 'The 2025-26 UEFA Champions League Final is expected on May 30, 2026. This resolves YES if at least one of the two finalist clubs is registered with either the Royal Spanish Football Federation (RFEF) or the English Football Association (FA) as its national association, as listed on the official UEFA match page. Clubs from Scotland, Wales, or Northern Ireland do not count for England. If both finalists are from countries other than Spain or England, resolves NO. If the final is postponed beyond May 31, 2026, resolution is based on the actual match participants whenever it is played.',
 'Sports', '["Yes","No"]', '2026-05-31', 'https://uefa.com/uefachampionsleague', 'active', 'baycast-system'),

('Will a Western Conference team win the 2025-26 NBA Championship?',
 'This resolves YES if the team declared the winner of the 2025-26 NBA Finals is a member of the NBA''s Western Conference at the time of the Finals. An Eastern Conference winner resolves as NO. Based on the official NBA Finals result published on nba.com. If the NBA Finals are cancelled or the season is abandoned before a champion is declared, the question resolves as NO.',
 'Sports', '["Yes","No"]', '2026-06-30', 'https://nba.com', 'active', 'baycast-system'),

-- Crypto/Finance (2)

('Will the US SEC approve a spot Solana (SOL) ETF before June 30, 2026?',
 'This resolves YES if the US Securities and Exchange Commission issues a formal order (19b-4 approval) approving at least one spot Solana ETF application, enabling the ETF to list and begin trading on a US exchange, before June 30, 2026. The approval must be final — not a proposed rule change open for public comment. Deadline extensions, delays, or additional comment solicitations do not count as approval. The approval must be verifiable via SEC.gov press releases or the Federal Register.',
 'Crypto/Finance', '["Yes","No"]', '2026-06-30', 'https://sec.gov', 'active', 'baycast-system'),

('Will Ethereum (ETH) trade above $4,500 on Coinbase at any point before June 30, 2026?',
 'This resolves YES if the ETH/USD pair on Coinbase (coinbase.com) reaches a price of $4,500.00 or higher at any point, including intraday highs, before June 30, 2026 23:59 UTC. The price must be confirmed by Coinbase''s own historical candlestick/price data. If Coinbase experiences a verified major outage (lasting more than 2 hours) at the time the threshold is allegedly reached, data from Binance (ETH/USDT) or Kraken (ETH/USD) may be used as secondary sources. Wicks on low-liquidity pairs that are later corrected via exchange data adjustment do not count.',
 'Crypto/Finance', '["Yes","No"]', '2026-06-30', 'https://coinbase.com; https://coinmarketcap.com', 'active', 'baycast-system'),

-- Culture (1)

('Will the 2026 Cannes Film Festival Palme d''Or be awarded to a film directed by a woman?',
 'The 2026 Cannes Film Festival is expected to award the Palme d''Or in late May 2026. This resolves YES if the 2026 Palme d''Or is awarded to a film where at least one credited director is a woman, as announced by the official jury at the Cannes closing ceremony. Co-directed films count as YES if at least one director is a woman. If the Palme d''Or is shared ex aequo between two films, it resolves YES if any winning film has a woman director. Based on the official announcement published on festival-cannes.com.',
 'Culture', '["Yes","No"]', '2026-05-26', 'https://festival-cannes.com', 'active', 'baycast-system');
