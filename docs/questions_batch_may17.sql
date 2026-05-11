-- Baycast Questions Batch: May 17, 2026
-- 14 questions across 7 categories
-- Resolution window: May 17 2026 – September 30 2026
-- Topics: Netflix gaming, GitHub Copilot, Meta smart glasses, BRICS expansion,
-- India-China border, US Q2 GDP, Bank of England rate, Blue Origin New Glenn,
-- global temperature record, FIFA World Cup high-scoring match, MLB no-hitter,
-- Nintendo Switch 2 sales, Tether market cap, Bitcoin mining difficulty

INSERT INTO questions (title, description, category, options, resolution_date, resolution_source, status, created_by) VALUES

('Will Netflix launch a self-published AAA game on any platform before September 30, 2026?',
 'Netflix must publish (under the Netflix Games label or a subsidiary) a game rated T or M by the ESRB with a reported development budget exceeding $50 million, available on at least one major platform (PC, console, or mobile). Ports of existing games, licensed titles, or casual/mobile-only games do not count. The game must be playable by the general public, not announced-only.',
 'Tech', '["Yes","No"]', '2026-09-30', 'https://www.netflix.com/games; https://www.theverge.com', 'active', 'baycast-system'),

('Will GitHub Copilot reach 20 million paid subscribers before September 30, 2026?',
 'Microsoft or GitHub must officially announce (in an earnings call, press release, blog post, or conference keynote) that GitHub Copilot has reached or exceeded 20 million paid subscribers (individual, business, or enterprise) at any point before September 30, 2026. Free-tier users, trial users, and students using free education plans do not count toward the paid subscriber total.',
 'Tech', '["Yes","No"]', '2026-09-30', 'https://github.blog; https://microsoft.com/investor', 'active', 'baycast-system'),

('Will Meta announce or release a third generation of Ray-Ban Meta Smart Glasses before September 30, 2026?',
 'Meta must officially announce a third-generation Ray-Ban Meta Smart Glasses product (distinct from Gen 2 in hardware specifications) via press release, keynote, or product page before September 30, 2026. A limited-availability developer edition counts if publicly announced. Software-only updates to existing Gen 2 hardware, new colorways, or prescription lens options without hardware changes do not count.',
 'Tech', '["Yes","No"]', '2026-09-30', 'https://www.meta.com; https://about.fb.com/news', 'active', 'baycast-system'),

('Will a new country be formally admitted as a BRICS member before September 30, 2026?',
 'The BRICS group must formally announce (via official summit declaration, joint statement, or foreign ministry announcement from a current BRICS member) the admission of at least one new country as a member state. The new member must be named. Partner status, observer status, or invited-to-join without formal admission does not count. If a country was admitted at the 2024 summit but the formal accession process completes in 2026, that counts as Yes.',
 'Geopolitics', '["Yes","No"]', '2026-09-30', 'https://www.brics-official.org; https://reuters.com', 'active', 'baycast-system'),

('Will an armed military clash occur between Indian and Chinese forces along their disputed border before September 30, 2026?',
 'Either the Indian Ministry of Defence or China''s Ministry of National Defence must officially report an armed clash (involving gunfire, explosives, or physical combat resulting in injuries or fatalities) between Indian and Chinese military personnel along their disputed border (LAC or McMohan Line). Unarmed pushing/punching scuffles without weapons do not count. Both governments must acknowledge or the incident must be confirmed by a third government (e.g., US State Department). Media reports without official government confirmation do not count.',
 'Geopolitics', '["Yes","No"]', '2026-09-30', 'https://mod.gov.in; https://eng.mod.gov.cn; https://reuters.com', 'active', 'baycast-system'),

('Will the US advance estimate of Q2 2026 real GDP show annualized growth exceeding 2.0%?',
 'The Bureau of Economic Analysis (BEA) advance estimate of real GDP growth for Q2 2026 (annualized quarter-over-quarter rate) must exceed 2.0%. The figure must be above 2.0% — exactly 2.0% resolves as No. If the advance estimate is delayed, the first published estimate applies. The "third estimate" or revisions do not affect resolution.',
 'Economics', '["Yes","No"]', '2026-08-05', 'https://www.bea.gov/data/gdp', 'active', 'baycast-system'),

('Will the Bank of England cut its Bank Rate to 4.00% or lower at any MPC meeting before September 30, 2026?',
 'The Bank of England''s Monetary Policy Committee must announce a Bank Rate of 4.00% or lower at any scheduled or emergency MPC meeting before September 30, 2026. Any size cut that brings the rate to 4.00% or below counts. If no MPC meeting occurs before the deadline (extremely unlikely), the question resolves as No.',
 'Economics', '["Yes","No"]', '2026-09-30', 'https://www.bankofengland.co.uk/monetary-policy', 'active', 'baycast-system'),

('Will Blue Origin''s New Glenn rocket complete a successful orbital launch with a first-stage booster landing before September 30, 2026?',
 'Blue Origin''s New Glenn must complete a full orbital launch (payload reaches intended orbit) AND the first-stage booster must successfully land on the recovery vessel (Jacklyn) or a landing pad. Both the orbital insertion and booster landing must occur in the same mission. If the booster lands but the payload fails to reach orbit, resolves as No. If the payload reaches orbit but the booster landing fails, resolves as No.',
 'Science', '["Yes","No"]', '2026-09-30', 'https://www.blueorigin.com/launches; https://www.spaceflightnow.com', 'active', 'baycast-system'),

('Will June 2026 be confirmed as the hottest June on record globally (by combined land-surface and sea-surface temperature)?',
 'Either the EU Copernicus Climate Change Service (Copernicus/ECMWF) or NOAA''s NCEI must confirm that global mean surface temperature for June 2026 is the highest for any June in their respective datasets (ERA5 for Copernicus, GHCN for NOAA). The dataset must extend back to at least 1940. If the two agencies disagree, Copernicus ERA5 is the authoritative source. If neither agency publishes June 2026 data by July 25, resolution extends to August 15.',
 'Science', '["Yes","No"]', '2026-07-25', 'https://climate.copernicus.eu; https://www.ncei.noaa.gov', 'active', 'baycast-system'),

('Will any match at the 2026 FIFA World Cup have 8 or more total goals (combined)?',
 'Any match at the 2026 FIFA World Cup (June 11 – July 19, including group stage, knockout stage, and the third-place match) must end regulation time with a combined score of 8 or more goals. Extra-time goals do NOT count toward the total — only the score at the end of regulation (90 minutes). If a match is abandoned and declared official with 8+ combined goals, it counts.',
 'Sport', '["Yes","No"]', '2026-07-19', 'https://www.fifa.com/fifaplus/en/tournaments/mens/worldcup/2026', 'active', 'baycast-system'),

('Will a MLB pitcher throw a no-hitter during the 2026 regular season before August 1, 2026?',
 'An MLB pitcher (or combination of pitchers in a single game) must throw a complete no-hitter (no hits allowed by the opposing team over 9 innings) in any MLB regular-season game completed before August 1, 2026. Combined no-hitters (multiple pitchers) count. Games shortened by rain (fewer than 9 innings) do not count. If a no-hitter is later overturned due to scoring changes, the revised determination applies.',
 'Sport', '["Yes","No"]', '2026-08-01', 'https://www.mlb.com; https://www.baseball-reference.com', 'active', 'baycast-system'),

('Will the Nintendo Switch 2 sell more than 5 million units worldwide in its first 30 days of availability?',
 'Nintendo or a credible industry tracking firm (NPD/Circana for US, Famitsu for Japan, GfK for Europe) must report cumulative worldwide sales of the Nintendo Switch 2 hardware exceeding 5 million units within 30 calendar days of the official launch date in the first launch market. The launch date is defined as the first date the console is commercially available for purchase. If Nintendo does not publish 30-day figures by September 30, the most recent official cumulative sales figure is used.',
 'Culture', '["Yes","No"]', '2026-09-30', 'https://www.nintendo.com; https://www.nintendo.co.jp/ir', 'active', 'baycast-system'),

('Will Tether (USDT) total market capitalization exceed $200 billion at any point before September 30, 2026?',
 'The circulating market capitalization of Tether (USDT) across all chains (as reported by CoinGecko''s Tether page or Tether''s own transparency page) must reach or exceed $200,000,000,000 at any single measurement point before September 30, 2026. CoinGecko is the primary source. Brief spikes count.',
 'Crypto', '["Yes","No"]', '2026-09-30', 'https://www.coingecko.com/en/coins/tether; https://tether.to/en/transparency', 'active', 'baycast-system'),

('Will Bitcoin''s mining difficulty increase by 20% or more in a single adjustment before September 30, 2026?',
 'Any single Bitcoin mining difficulty adjustment (as recorded by BTC.com, CoinWarz, or Blockchain.com) must show an increase of 20.0% or greater from the previous difficulty period. The percentage is calculated as (new difficulty − old difficulty) / old difficulty × 100. Exactly 20.0% resolves as Yes. Negative adjustments or increases below 20.0% resolve as No.',
 'Crypto', '["Yes","No"]', '2026-09-30', 'https://btc.com/stats/difficulty; https://www.coinwarz.com/mining/bitcoin/difficulty-chart', 'active', 'baycast-system');
