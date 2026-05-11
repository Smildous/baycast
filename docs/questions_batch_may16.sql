-- Baycast Questions Batch: May 16, 2026
-- 15 questions across 7 categories
-- Resolution window: May 16 2026 – July 31 2026
-- Topics informed by current events: Iran war, FIFA World Cup 2026, Eurovision 2026,
-- Colombian elections, Women's T20 World Cup, Fed rate decisions, Artemis II success,
-- crypto markets, AI regulation, SpaceX, Le Mans

INSERT INTO questions (title, description, category, options, resolution_date, resolution_source, status, created_by) VALUES
('Will a formal Iran-US ceasefire agreement be signed before July 31, 2026?',
 'A publicly announced, formally signed ceasefire or peace agreement between the United States (or its coalition partners) and Iran must be in effect before July 31, 2026. Unilateral declarations, temporary humanitarian pauses, or informal understandings without a formal signed document do not count.',
 'Geopolitics', '["Yes","No"]', '2026-07-31', 'https://www.state.gov; https://reuters.com', 'active', 'baycast-system'),

('Will the 2026 Colombian presidential election require a runoff (second round)?',
 'If no presidential candidate receives more than 50% of the valid votes in the first round on May 31, 2026, a runoff will be held. This question resolves Yes if a runoff is required (no majority winner in round 1), and No if a candidate wins outright in the first round.',
 'Geopolitics', '["Yes","No"]', '2026-06-01', 'https://www.registraduria.gov.co; https://eltiempo.com', 'active', 'baycast-system'),

('Will the Strait of Hormuz be fully open to commercial shipping without military restrictions by July 31, 2026?',
 'The Strait of Hormuz must be confirmed as open to all commercial maritime traffic without any naval blockade, closure, or significant military-imposed restrictions by July 31, 2026, as reported by major shipping or government sources. If the strait is partially restricted (e.g., war-risk insurance only), this still resolves Yes as long as commercial vessels are not physically blocked.',
 'Geopolitics', '["Yes","No"]', '2026-07-31', 'https://www.reuters.com; https://www.bbc.com; https://www.imarest.org', 'active', 'baycast-system'),

('Will the US Federal Reserve hold the federal funds rate steady at the June 2026 FOMC meeting?',
 'The FOMC meeting scheduled for June 16-17, 2026 must result in no change to the target federal funds rate range. If the meeting is rescheduled, the next scheduled FOMC meeting in June applies. If the meeting is canceled, the question resolves No.',
 'Economics', '["Yes","No"]', '2026-06-18', 'https://www.federalreserve.gov/monetarypolicy/fomccalendars.htm', 'active', 'baycast-system'),

('Will the S&P 500 close above 6,000 on or before July 31, 2026?',
 'The S&P 500 index must close at or above 6,000.00 points at the end of any regular trading session on or before July 31, 2026, as reported by official market data sources.',
 'Economics', '["Yes","No"]', '2026-07-31', 'https://www.google.com/finance/quote/.INX:INDEXSP; https://www.bloomberg.com/markets', 'active', 'baycast-system'),

('Will the US CPI annual inflation rate fall below 2.5% in any report before July 31, 2026?',
 'The Bureau of Labor Statistics seasonally adjusted year-over-year CPI for All Urban Consumers (CPI-U) must be reported below 2.5% in any monthly CPI report released before July 31, 2026.',
 'Economics', '["Yes","No"]', '2026-07-31', 'https://www.bls.gov/news.release/cpi.nr0.htm', 'active', 'baycast-system'),

('Will OpenAI release a new flagship AI model (GPT-5 or equivalent) before July 31, 2026?',
 'OpenAI must officially announce and make available a new flagship frontier model (branded as GPT-5, o-series next-gen, or equivalent) to the public or enterprise customers before July 31, 2026. A limited research preview or API-only access to existing models does not count. The model must be demonstrably more capable than the current flagship.',
 'Tech', '["Yes","No"]', '2026-07-31', 'https://openai.com/blog; https://openai.com/index/', 'active', 'baycast-system'),

('Will Apple announce AI-powered Siri with third-party app integration at WWDC 2026?',
 'At Apple WWDC 2026 (expected June 9-13, 2026), Apple must announce a significant upgrade to Siri that includes the ability to perform tasks within third-party applications (not just Apple apps) using AI. A demo of the capability on stage or in a press release counts.',
 'Tech', '["Yes","No"]', '2026-06-14', 'https://www.apple.com/newsroom/; https://developer.apple.com/wwdc/', 'active', 'baycast-system'),

('Will the EU AI Act high-risk system obligations take effect before July 31, 2026?',
 'The European Commission must officially confirm that the high-risk AI system obligations under the EU AI Act (Article 6, Chapter III) have entered into application (become enforceable) before July 31, 2026. The phased implementation timeline published by the Commission determines the effective date.',
 'Tech', '["Yes","No"]', '2026-07-31', 'https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai; https://eur-lex.europa.eu', 'active', 'baycast-system'),

('Will Bitcoin (BTC) reach or exceed $120,000 USD at any point before July 31, 2026?',
 'The Bitcoin (BTC/USD) price must reach or exceed $120,000 at any time before July 31, 2026, as measured by the CoinGecko BTC daily high or any major exchange spot price. The resolution uses CoinGecko data as the authoritative source.',
 'Crypto', '["Yes","No"]', '2026-07-31', 'https://www.coingecko.com/en/coins/bitcoin', 'active', 'baycast-system'),

('Will the total Ethereum staked exceed 35 million ETH before July 31, 2026?',
 'The total amount of ETH staked on the Ethereum Beacon Chain must exceed 35 million ETH at any point before July 31, 2026, as reported by an authoritative on-chain data source.',
 'Crypto', '["Yes","No"]', '2026-07-31', 'https://beaconcha.in/; https://www.defillama.com/protocol/Lido', 'active', 'baycast-system'),

('Will the host nation (United States) reach the knockout stage of the 2026 FIFA World Cup?',
 'The United States men''s national soccer team must finish in the top two of their group (Group A) to advance to the Round of 16 at the 2026 FIFA World Cup. If the tournament format changes or the US is re-grouped, advancing to the first knockout round by any means counts.',
 'Sport', '["Yes","No"]', '2026-07-19', 'https://www.fifa.com/fifaplus/en/tournaments/mens/worldcup/2026', 'active', 'baycast-system'),

('Will a European team win the 2026 Women''s T20 World Cup?',
 'A national team from a European cricket board (ICC Europe member) must win the 2026 ICC Women''s T20 World Cup final scheduled for July 5, 2026. Eligible European teams include England, Ireland, Scotland, and the Netherlands. The winner is determined by the official ICC match result.',
 'Sport', '["Yes","No"]', '2026-07-06', 'https://www.icc-cricket.com; https://t20worldcup.com', 'active', 'baycast-system'),

('Will SpaceX Starship successfully complete an orbital flight with booster catch before July 31, 2026?',
 'SpaceX Starship must complete a full orbital trajectory and the Super Heavy booster must successfully be caught by the chopstick arms at the launch tower in a single integrated mission before July 31, 2026. A booster catch on a separate sub-orbital test does not count; both the orbital flight and booster catch must occur in the same mission.',
 'Science', '["Yes","No"]', '2026-07-31', 'https://www.spacex.com/launches/; https://x.com/SpaceX', 'active', 'baycast-system'),

('Will the Nancy Grace Roman Space Telescope be launched before July 31, 2026?',
 'NASA''s Nancy Grace Roman Space Telescope must be successfully launched (not just scheduled or on the pad) before July 31, 2026. NASA''s official confirmation of a successful launch and separation from the launch vehicle is required. If the launch occurs but the spacecraft is lost, this still resolves Yes (the launch itself succeeded).',
 'Science', '["Yes","No"]', '2026-07-31', 'https://roman.gsfc.nasa.gov/; https://www.nasa.gov/missions/', 'active', 'baycast-system');
