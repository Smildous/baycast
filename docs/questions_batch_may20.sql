-- Baycast Prediction Questions — May 20, 2026 Batch
-- 10 questions · All resolve within 7-90 days from May 12
-- Run in Supabase SQL Editor

INSERT INTO questions (id, title, description, category, options, initial_probability, closes_at, resolution_source, resolution_criteria, created_at, status) VALUES

-- Technology (2)
(
  gen_random_uuid(),
  'Will Apple announce a standalone personal AI agent app at WWDC 2026?',
  'Apple is expected to make major AI announcements at WWDC 2026. This question resolves YES if they announce a new standalone AI assistant application (distinct from Siri improvements) during the WWDC keynote or official press releases during WWDC week (June 8-12, 2026). The product must be positioned as an AI agent capable of performing multi-step tasks, not merely a chatbot or search interface. Upgrades to the existing Siri brand do not count.',
  'Technology',
  '["Yes", "No"]',
  0.40,
  '2026-06-15T23:59:59Z',
  'https://www.apple.com/newsroom/',
  'YES if Apple publicly announces a new standalone AI assistant application (distinct from Siri improvements) during the WWDC 2026 keynote or in an official press release during WWDC week (June 8-12, 2026). The product must be positioned as an AI agent capable of performing multi-step tasks, not merely a chatbot or search interface. Upgrades to the existing Siri brand do not count.',
  NOW(),
  'active'
),

(
  gen_random_uuid(),
  'Will OpenAI publicly release GPT-5 before August 1, 2026?',
  'OpenAI has released GPT-4.x and o-series models, but GPT-5 remains unreleased. This question resolves YES if OpenAI releases a model explicitly named "GPT-5" available to at least ChatGPT Plus subscribers or API customers before August 1, 2026. GPT-4.x, o-series models, or interim releases under different branding do not count. The model must be a generally available release, not a research preview limited to fewer than 1,000 testers.',
  'Technology',
  '["Yes", "No"]',
  0.30,
  '2026-07-31T23:59:59Z',
  'https://openai.com/blog',
  'YES if OpenAI releases a model explicitly named "GPT-5" that is available to at least ChatGPT Plus subscribers or API customers before August 1, 2026. GPT-4.x, o-series models, or interim releases under different branding do not count. Must be generally available, not a research preview.',
  NOW(),
  'active'
),

-- Geopolitics (2)
(
  gen_random_uuid(),
  'Will Trump and Xi hold an in-person bilateral meeting before August 1, 2026?',
  'US-China relations remain tense with ongoing trade disputes and geopolitical competition. This question resolves YES if Trump and Xi hold a formal, scheduled in-person bilateral meeting (not a G20/Summit handshake or corridor meeting) before August 1, 2026, confirmed by both US and Chinese official sources.',
  'Geopolitics',
  '["Yes", "No"]',
  0.55,
  '2026-07-31T23:59:59Z',
  'https://www.whitehouse.gov/',
  'YES if Trump and Xi hold a formal, scheduled in-person bilateral meeting before August 1, 2026. Must be confirmed by both US and Chinese official sources. Virtual/phone meetings do not count. Meetings on the sidelines of multilateral summits count only if a dedicated bilateral session is officially confirmed.',
  NOW(),
  'active'
),

(
  gen_random_uuid(),
  'Will the EU open the first negotiation chapter in Ukraine''s accession process before August 1, 2026?',
  'Ukraine began EU accession negotiations in 2024. This question resolves YES if the EU Council formally decides to open the first negotiating chapter (as distinct from the screening process already underway) in Ukraine''s accession negotiations before August 1, 2026. Must be confirmed by an official Council decision or Inter-Governmental Conference announcement.',
  'Geopolitics',
  '["Yes", "No"]',
  0.45,
  '2026-07-31T23:59:59Z',
  'https://www.consilium.europa.eu/',
  'YES if the EU Council formally decides to open the first negotiating chapter in Ukraine''s accession negotiations before August 1, 2026. Must be confirmed by an official Council decision or Inter-Governmental Conference announcement. Screening reports alone do not count.',
  NOW(),
  'active'
),

-- Economy (1)
(
  gen_random_uuid(),
  'Will the Federal Reserve cut rates at the June or July 2026 FOMC meeting?',
  'The Fed has been navigating inflation and growth concerns. This question resolves YES if the FOMC announces a decrease in the federal funds rate target range at either the June 17, 2026 or July 29, 2026 meeting. A hold or increase counts as NO. Forward guidance alone does not count.',
  'Economy',
  '["Yes", "No"]',
  0.35,
  '2026-07-31T23:59:59Z',
  'https://www.federalreserve.gov/monetarypolicy/fomccalendars.htm',
  'YES if the FOMC post-meeting statement on either June 17, 2026 or July 29, 2026 announces a decrease in the target range for the federal funds rate from the level set at the prior meeting. A hold or increase counts as NO.',
  NOW(),
  'active'
),

-- Science (1)
(
  gen_random_uuid(),
  'Will June 2026 rank among the top 3 warmest Junes in the NASA GISS record?',
  'Global temperatures continue to break records. This question resolves YES if NASA GISS ranks June 2026 as #1, #2, or #3 warmest June in the GISTEMP instrumental record (since 1880) when the June 2026 data is first published (typically mid-July 2026). Rankings based on global mean temperature anomaly.',
  'Science',
  '["Yes", "No"]',
  0.60,
  '2026-08-15T23:59:59Z',
  'https://data.giss.nasa.gov/gistemp/',
  'YES if NASA GISS monthly temperature analysis ranks June 2026 as #1, #2, or #3 warmest June in the GISTEMP record when first published. Based on global mean temperature anomaly. If ranking changes in subsequent data revisions, the initial published ranking is used.',
  NOW(),
  'active'
),

-- Sports (2)
(
  gen_random_uuid(),
  'Will the Oklahoma City Thunder win the 2025-26 NBA Championship?',
  'The Thunder have been dominant in the 2025-26 regular season and are strong playoff contenders. This question resolves YES if the Oklahoma City Thunder are declared the winner of the 2025-26 NBA Finals series (best of 7). If the Finals are cancelled or not completed, the question extends until completion or resolves as NO if the season is abandoned.',
  'Sports',
  '["Yes", "No"]',
  0.35,
  '2026-06-30T23:59:59Z',
  'https://www.nba.com/',
  'YES if the Oklahoma City Thunder are declared the winner of the 2025-26 NBA Finals series. If the Finals are cancelled or not completed, the question extends until completion or resolves as NO if the season is abandoned.',
  NOW(),
  'active'
),

(
  gen_random_uuid(),
  'Will an English club win the 2025-26 UEFA Champions League?',
  'English clubs remain competitive in European football. This question resolves YES if the club that wins the 2025-26 UEFA Champions League Final is registered with the English Football Association as its national association. Clubs from Scotland, Wales, or Northern Ireland do not count.',
  'Sports',
  '["Yes", "No"]',
  0.30,
  '2026-05-31T23:59:59Z',
  'https://www.uefa.com/uefachampionsleague/',
  'YES if the winning club of the 2025-26 UEFA Champions League Final is registered with the English FA as its national association. Clubs from Scotland, Wales, or Northern Ireland do not count. If the final is postponed beyond May 31, 2026, the question resolves based on the actual result.',
  NOW(),
  'active'
),

-- Culture (1)
(
  gen_random_uuid(),
  'Will a past Eurovision winner win Eurovision 2026?',
  'Eurovision 2026 is approaching. This question resolves YES if the country that wins the 2026 Grand Final has won the contest at least once in any prior year (1956-2025). First-time winners count as NO. Based on the official combined vote (jury + televote).',
  'Culture',
  '["Yes", "No"]',
  0.70,
  '2026-05-20T23:59:59Z',
  'https://eurovision.tv/',
  'YES if the winning country of Eurovision 2026 Grand Final has won the contest at least once in any prior year (1956-2025). First-time winners count as NO. Based on official combined vote.',
  NOW(),
  'active'
),

-- Crypto (1)
(
  gen_random_uuid(),
  'Will cumulative net inflows into US spot Ethereum ETFs exceed $10 billion before August 1, 2026?',
  'US spot Ethereum ETFs have been accumulating inflows since launch. This question resolves YES if total cumulative net inflows across all US-listed spot Ethereum ETFs (including ETHA, FETH, EZET, ETHV, and any new launches) exceed $10 billion at the close of any trading day before August 1, 2026. Outflows reduce the cumulative total. Based on reported daily flow data (Farside, Bloomberg, or SoSoValue). AUM does not count — net inflows only.',
  'Crypto',
  '["Yes", "No"]',
  0.25,
  '2026-07-31T23:59:59Z',
  'https://www.farside.co.uk/eth/',
  'YES if cumulative net inflows across all US-listed spot Ethereum ETFs exceed $10 billion at close of any trading day before August 1, 2026. Outflows reduce cumulative total. Based on daily flow data from Farside, Bloomberg, or SoSoValue. Net inflows only, not AUM.',
  NOW(),
  'active'
);
