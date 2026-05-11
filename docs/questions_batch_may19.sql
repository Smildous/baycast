-- Baycast Questions Batch: May 19, 2026
-- 15 questions across 7 categories
-- Resolution window: May 19 2026 – September 30 2026
-- Topics: Microsoft $100B AI capex, EU DSA fine €5B+, Level 4 AV in 3+ cities,
-- G20 AI governance, Ethiopia-Fano peace, Korea-Japan security deal,
-- Germany recession, Australia RBA rate cut, ESA JUICE Jupiter orbit,
-- Arctic sea ice minimum, FIFA World Cup zero red cards, Tour de France first-time winner,
-- Avatar 3 opening $200M+, Lightning Network 6000 BTC, Avalanche subnets $10B TVL

INSERT INTO questions (title, description, category, options, resolution_date, resolution_source, status, created_by) VALUES

('Will Microsoft announce cumulative AI infrastructure spending of $100 billion or more for fiscal year 2026?',
 'Microsoft must report (in its FY2026 annual report, 10-K filing, or official earnings call) that total capital expenditure for FY2026 was $100 billion or more. If Microsoft reports only "AI infrastructure spending" as a subcomponent exceeding $100B while total capex is lower, resolves as Yes if AI infrastructure exceeds $100B. If Microsoft does not break out AI infrastructure separately, total capex is used.',
 'Tech', '["Yes","No"]', '2026-08-31', 'https://microsoft.com/investor; https://www.sec.gov/cgi-bin/browse-edgar?company=microsoft&CIK=789019', 'active', 'baycast-system'),

('Will the European Commission issue a fine of €5 billion or more to a single company for violating the Digital Services Act (DSA) before September 30, 2026?',
 'The European Commission must officially announce a DSA fine (adopted decision under Article 74 DSA) of €5,000,000,000 or more against a single company. The fine must be formally adopted by the Commission, not merely proposed. Fines under other legislation (GDPR, DMA) do not count — only DSA-specific fines. If multiple companies are fined simultaneously, each must be individually ≥€5B.',
 'Tech', '["Yes","No"]', '2026-09-30', 'https://digital-strategy.ec.europa.eu/en/policies/digital-services-act-package', 'active', 'baycast-system'),

('Will a Level 4 autonomous vehicle service be commercially available to the general public in at least 3 US cities before September 30, 2026?',
 'At least one company operating Level 4 autonomous vehicles (no human safety driver) must offer a commercial ride-hailing service available to the general public (no waitlist, no invite-only) in at least 3 distinct continental US cities simultaneously. Each city must have the service actively accepting ride requests from any member of the public. Must use SAE Level 4 automation. Airport shuttles, fixed-route, or delivery-only services do not count.',
 'Tech', '["Yes","No"]', '2026-09-30', 'https://waymo.com; https://www.nhtsa.gov', 'active', 'baycast-system'),

('Will the G20 leaders issue a joint communiqué or declaration that includes binding commitments on AI governance before September 30, 2026?',
 'G20 leaders must issue an official joint communiqué, declaration, or statement (published on the G20 official website or hosting country government site) that includes a commitment described as "binding," "legally binding," "mandatory," or equivalent regarding AI governance, AI safety standards, or AI development rules. Voluntary commitments, principles, or "we encourage" language without binding force resolves as No.',
 'Geopolitics', '["Yes","No"]', '2026-09-30', 'https://www.g20.org; https://www.mea.gov.in', 'active', 'baycast-system'),

('Will the Ethiopian federal government and the Fano militia sign a formal peace agreement before September 30, 2026?',
 'The Ethiopian federal government (represented by an official minister or PM''s office) and a recognized Fano militia leadership representative must sign a formal document publicly described as a "peace agreement," "ceasefire agreement," or "peace accord." The document must be publicly available or officially announced by both parties. Informal talks, prisoner exchanges, or local truces without a signed agreement do not count.',
 'Geopolitics', '["Yes","No"]', '2026-09-30', 'https://mfa.gov.et; https://reuters.com; https://apnews.com', 'active', 'baycast-system'),

('Will South Korea and Japan sign a new bilateral security or intelligence-sharing agreement before September 30, 2026?',
 'South Korea and Japan must sign a new bilateral agreement specifically related to security cooperation, defense, or intelligence-sharing that goes beyond the existing GSOMIA framework. Must be signed by officials of ministerial rank or higher and publicly announced. GSOMIA extension/renewal without new provisions resolves as No. An MOU without binding commitments resolves as No.',
 'Geopolitics', '["Yes","No"]', '2026-09-30', 'https://www.mofa.go.jp; https://www.mofa.go.kr; https://reuters.com', 'active', 'baycast-system'),

('Will Germany enter a technical recession (two consecutive quarters of negative real GDP growth) at any point before September 30, 2026?',
 'Destatis (German Federal Statistical Office) must report negative quarter-over-quarter real GDP growth for two consecutive quarters, with the second quarter ending on or before June 30, 2026 (Q4 2025/Q1 2026 or Q1 2026/Q2 2026). Uses seasonally and calendar-adjusted preliminary estimates. Revised figures are used if they change the sign. Exactly 0.0% resolves as No.',
 'Economics', '["Yes","No"]', '2026-09-30', 'https://www.destatis.de/EN/Themes/Economy/National-Accounts', 'active', 'baycast-system'),

('Will the Reserve Bank of Australia (RBA) cut the cash rate at any board meeting before September 30, 2026?',
 'The RBA board must announce a reduction in the cash rate target at any scheduled or emergency board meeting before September 30, 2026. A cut of any size counts. Maintaining or raising the rate resolves as No. Must come via the official RBA monetary policy decision statement.',
 'Economics', '["Yes","No"]', '2026-09-30', 'https://www.rba.gov.au/monetary-policy', 'active', 'baycast-system'),

('Will ESA''s JUICE spacecraft successfully enter orbit around Jupiter before September 30, 2026?',
 'ESA must officially confirm that the JUICE spacecraft has successfully performed its Jupiter Orbit Insertion (JOI) maneuver and is in stable orbit around Jupiter before September 30, 2026. Given the planned 2031 arrival, this is intentionally low-probability in case of a trajectory shortcut or mission reprogramming. Gravity assists without Jupiter orbit insertion do not count.',
 'Science', '["Yes","No"]', '2026-09-30', 'https://www.esa.int/Science_Exploration/Space_Science/Juice; https://sci.esa.int', 'active', 'baycast-system'),

('Will the September 2026 Arctic sea ice minimum extent fall below 3.5 million square kilometers?',
 'The National Snow and Ice Data Center (NSIDC) must report that the 2026 Arctic sea ice minimum extent (typically reached in mid-September) is below 3.50 million square kilometers in their official monthly summary. NSIDC''s "Sea Ice Index" daily extent data is authoritative. The minimum is the lowest daily extent value during September 2026. If NSIDC has not published by October 15, resolution extends to November 1.',
 'Science', '["Yes","No"]', '2026-10-15', 'https://nsidc.org/arcticseaicenews; https://nsidc.org/data/seaice_index', 'active', 'baycast-system'),

('Will the 2026 FIFA World Cup be completed without a single red card being shown in any match?',
 'No player must receive a red card (straight red or second yellow resulting in dismissal) in any of the 64 matches of the 2026 FIFA World Cup (June 11 – July 19), as recorded in official FIFA match reports. Red cards after the final whistle, to coaches/staff, or in abandoned matches replayed later do not count. If a red card is rescinded on appeal, the original on-field decision stands for resolution.',
 'Sport', '["Yes","No"]', '2026-07-19', 'https://www.fifa.com/fifaplus/en/tournaments/mens/worldcup/2026', 'active', 'baycast-system'),

('Will a first-time Tour de France winner take the 2026 general classification?',
 'The rider who wins the 2026 Tour de France general classification (yellow jersey) must have never previously won the Tour de France in any year. A rider who has won the Giro d''Italia or Vuelta a España but not the Tour counts as first-time. If the winner is later disqualified, the final official winner after all appeals is used. If the Tour is cancelled, resolves as No.',
 'Sport', '["Yes","No"]', '2026-07-27', 'https://www.letour.fr/en; https://www.procyclingstats.com', 'active', 'baycast-system'),

('Will Avatar: Fire and Ash (Avatar 3) open to $200 million or more in its domestic (US/Canada) opening weekend?',
 'Avatar: Fire and Ash must earn $200,000,000 or more in its domestic (US/Canada) opening weekend box office, as reported by Box Office Mojo or Comscore. Opening weekend is Friday-Sunday (or Wednesday-Sunday for Wednesday release). If the film is delayed past September 30, 2026, resolution is based on actual opening (whenever it occurs). If cancelled, resolves as No.',
 'Culture', '["Yes","No"]', '2026-09-30', 'https://www.boxofficemojo.com; https://www.comscore.com', 'active', 'baycast-system'),

('Will the Bitcoin Lightning Network''s total channel capacity exceed 6,000 BTC before September 30, 2026?',
 'The total Bitcoin Lightning Network channel capacity (as reported by Bitcoin Visuals at bitcoinvisuals.com or 1ml.com) must reach or exceed 6,000 BTC at any single measurement point before September 30, 2026. Bitcoin Visuals is the primary source. The measurement must be a point-in-time snapshot, not a projection.',
 'Crypto', '["Yes","No"]', '2026-09-30', 'https://bitcoinvisuals.com/lightning; https://1ml.com', 'active', 'baycast-system'),

('Will Avalanche (AVAX) subnets collectively reach $10 billion or more in total value locked before September 30, 2026?',
 'The total value locked across all Avalanche subnets (as reported by DefiLlama''s Avalanche ecosystem page or avalanche.network official metrics) must reach or exceed $10,000,000,000 at any single measurement point before September 30, 2026. DefiLlama is the primary source. Enterprise subnets that do not publicly report TVL cannot be counted. If DefiLlama does not track subnet TVL separately, overall Avalanche chain TVL exceeding $10B counts.',
 'Crypto', '["Yes","No"]', '2026-09-30', 'https://defillama.com/chain/Avalanche; https://www.avax.network', 'active', 'baycast-system');
