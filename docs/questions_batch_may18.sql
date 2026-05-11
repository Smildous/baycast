-- Baycast Questions Batch: May 18, 2026
-- 14 questions across 7 categories
-- Resolution window: May 18 2026 – September 30 2026
-- Topics: xAI Grok Chatbot Arena, Google Gemini 500M MAU, Samsung foldable design,
-- Venezuela election contested, Turkey Syria intervention, Japan Yen strength,
-- China RRR cut, WHO mpox PHEIC end, SpaceX Starlink 500+ monthly,
-- Le Mans non-European winner, Wimbledon women's non-top-10 seed,
-- Spotify 300M paid subs, DeFi TVL $200B, Ethereum L2 fees below $0.01

INSERT INTO questions (title, description, category, options, resolution_date, resolution_source, status, created_by) VALUES

('Will an xAI Grok model achieve a top-3 ranking on the LMSYS Chatbot Arena leaderboard before September 30, 2026?',
 'Any model listed as "grok" or "xAI" on the LMSYS Chatbot Arena (chat.lmsys.org) Elo leaderboard must achieve a ranking of 3rd or higher (1st, 2nd, or 3rd place) at any snapshot before September 30, 2026. The ranking must be visible on the public leaderboard. If LMSYS restructures the leaderboard format, the top-3 on the equivalent primary ranking metric is used. If LMSYS is temporarily offline, the most recent cached version is used.',
 'Tech', '["Yes","No"]', '2026-09-30', 'https://chat.lmsys.org; https://huggingface.co/spaces/lmsys/chatbot-arena-leaderboard', 'active', 'baycast-system'),

('Will Google announce that Gemini has surpassed 500 million monthly active users before September 30, 2026?',
 'Alphabet/Google must officially state (in an earnings call, press release, blog post, or I/O keynote) that Gemini has surpassed 500 million monthly active users across all products (Google AI, Gemini app, Search AI Overviews, Workspace AI features, etc.). The metric must be explicitly stated as "monthly active users" or equivalent. If Google reports a different metric without MAU, resolves as No.',
 'Tech', '["Yes","No"]', '2026-09-30', 'https://abc.xyz/investor; https://blog.google/technology/ai', 'active', 'baycast-system'),

('Will Samsung announce the Galaxy Z Fold 8 (or equivalent 2026 foldable) with a significant exterior design change before September 30, 2026?',
 'Samsung must announce a new foldable smartphone (branded Galaxy Z Fold 8 or equivalent) with at least two of the following design changes vs Galaxy Z Fold 7: (a) cover screen width increased 20%+ or aspect ratio changed, (b) overall thickness reduced 15%+ when folded, (c) new hinge mechanism type, (d) triple-fold/multi-fold form factor, or (e) removal of visible crease. Internal spec changes alone do not count. Announcement must come via Samsung Unpacked, press release, or official product page.',
 'Tech', '["Yes","No"]', '2026-09-30', 'https://www.samsung.com; https://news.samsung.com', 'active', 'baycast-system'),

('Will the results of the 2026 Venezuelan presidential election be formally contested by two or more major international organizations before September 30, 2026?',
 'At least two of the following organizations must issue official statements contesting the legitimacy or fairness of the 2026 Venezuelan presidential election results: EU, OAS, UN (Secretary-General or OHCHR), or Carter Center. Statements must explicitly question results'' legitimacy, call for recount/audit, or refuse to recognize the outcome. General "concerns" without contesting results do not count.',
 'Geopolitics', '["Yes","No"]', '2026-09-30', 'https://www.oas.org; https://eeas.europa.eu; https://www.un.org; https://www.cartercenter.org', 'active', 'baycast-system'),

('Will Turkey conduct a direct military intervention (ground troops or confirmed airstrikes) in Syria before September 30, 2026?',
 'The Turkish Armed Forces must conduct a confirmed new military operation in Syrian territory involving either (a) ground troops crossing the border into Syria, or (b) a Turkish airstrike campaign officially acknowledged by Turkey''s Ministry of National Defence targeting locations in Syria. Routine artillery exchanges, drone strikes acknowledged only by Syrian sources, or Turkish military activity in Iraq do not count. Must be confirmed by Turkish government or two major wire services.',
 'Geopolitics', '["Yes","No"]', '2026-09-30', 'https://www.msb.gov.tr; https://reuters.com; https://apnews.com', 'active', 'baycast-system'),

('Will the Japanese Yen strengthen to 135 JPY per USD or stronger at any point before September 30, 2026?',
 'The USD/JPY exchange rate must close at 135.00 or below on any trading day before September 30, 2026, as reported by the Federal Reserve Bank of New York or the Bank of Japan. The closing rate is the official daily fix. Intraday dips that close above 135.00 do not count. Non-trading days are excluded.',
 'Economics', '["Yes","No"]', '2026-09-30', 'https://www.boj.or.jp/en; https://www.newyorkfed.org', 'active', 'baycast-system'),

('Will the People''s Bank of China (PBoC) cut the Reserve Requirement Ratio (RRR) for commercial banks before September 30, 2026?',
 'The PBoC must announce a reduction in the RRR for large commercial banks (or a universal RRR cut) via official statement before September 30, 2026. Targeted RRR cuts for specific banks or sectors count if they apply to large commercial banks. MLF rate cuts, LPR cuts, or reverse repo rate changes without an RRR component do not count.',
 'Economics', '["Yes","No"]', '2026-09-30', 'https://www.pbc.gov.cn/en; https://reuters.com', 'active', 'baycast-system'),

('Will the WHO officially declare the end of the mpox (clade Ib) PHEIC before September 30, 2026?',
 'The WHO Director-General must issue an official statement declaring the end of the current mpox PHEIC (clade Ib). Must come via official WHO press conference, statement, or Disease Outbreak News update. A new PHEIC for a different clade or variant does not affect resolution. If the PHEIC was already ended before May 18, 2026, resolves as No.',
 'Science', '["Yes","No"]', '2026-09-30', 'https://www.who.int/emergencies', 'active', 'baycast-system'),

('Will SpaceX launch 500 or more Starlink satellites in a single calendar month before September 30, 2026?',
 'SpaceX must successfully launch and deploy 500 or more Starlink satellites in a single calendar month (May-September 2026, based on UTC launch date). Satellites must be confirmed deployed into orbit by SpaceX or independent tracking (Space-Track, CelesTrak). Failed deployments or satellites lost during launch do not count. Rideshare missions carrying non-Starlink payloads alongside Starlink satellites still count the Starlink portion.',
 'Science', '["Yes","No"]', '2026-09-30', 'https://www.spacex.com/launches/; https://celestrak.org', 'active', 'baycast-system'),

('Will a non-European manufacturer win the Hypercar class at the 2026 24 Hours of Le Mans?',
 'The overall winner of the 2026 24 Hours of Le Mans (June 13-14) in the Hypercar/LMH class must be entered by a manufacturer headquartered outside of Europe. Toyota (Japan), Cadillac (US), and any other non-European manufacturer entries qualify. European manufacturers (Porsche/Germany, Ferrari/Italy, BMW/Germany, Peugeot/France, Alpine/France) resolve as No. The entry''s manufacturer, not the team name, determines status. If the race is cancelled, resolves as No.',
 'Sport', '["Yes","No"]', '2026-06-14', 'https://www.lemans.org; https://fiawec.com', 'active', 'baycast-system'),

('Will the 2026 Wimbledon women''s singles champion be seeded 10th or lower (or unseeded)?',
 'The women''s singles champion at Wimbledon 2026 must have been seeded 10th or lower, or unseeded, in the official Wimbledon seedings list published before the main draw begins. Seeds 1-9 = No, seeds 10-32 or unseeded = Yes. Lucky losers and qualifiers who were unseeded count as unseeded. If the tournament is cancelled, resolves as No.',
 'Sport', '["Yes","No"]', '2026-07-12', 'https://www.wimbledon.com/en-us/draws', 'active', 'baycast-system'),

('Will Spotify announce 300 million or more paid subscribers worldwide before September 30, 2026?',
 'Spotify must officially announce (in an earnings report, press release, or shareholder communication) that it has reached or exceeded 300 million paid subscribers worldwide at any point before September 30, 2026. Must be explicitly stated as "paid subscribers" or "premium subscribers." Free/ad-supported users do not count. If Spotify reports a range, the lower bound determines resolution.',
 'Culture', '["Yes","No"]', '2026-09-30', 'https://investors.spotify.com; https://newsroom.spotify.com', 'active', 'baycast-system'),

('Will the total value locked (TVL) across all DeFi protocols exceed $200 billion before September 30, 2026?',
 'The total DeFi TVL (as reported by DefiLlama''s "Total Value Locked" global metric at defillama.com) must reach or exceed $200,000,000,000 at any single measurement point before September 30, 2026. DefiLlama is the authoritative source. TVL must include all chains tracked by DefiLlama. Brief spikes count.',
 'Crypto', '["Yes","No"]', '2026-09-30', 'https://defillama.com', 'active', 'baycast-system'),

('Will the average transaction fee on Ethereum Layer 2 networks fall below $0.01 for at least 7 consecutive days before September 30, 2026?',
 'The median transaction fee across the top 4 Ethereum L2 networks (Arbitrum, Optimism, Base, and zkSync Era) — as measured by L2Beat''s "Avg tx fee" metric or DefiLlama''s L2 fees data — must fall below $0.01 USD on each of 7 consecutive calendar days. Each network must individually show a 7-consecutive-day streak below $0.01 within the resolution window.',
 'Crypto', '["Yes","No"]', '2026-09-30', 'https://l2beat.com; https://defillama.com/fees', 'active', 'baycast-system');
