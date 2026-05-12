-- Baycast Prediction Questions — Batch May 22
-- Created: 2026-05-12
-- 10 questions · Resolution window: May 22 – 25, 2026
-- Topics: Microsoft Build AI agents, UN Security Council, Eurozone HICP,
-- NASA Artemis III crew, Monaco Grand Prix, Eurovision Nordic winner,
-- Stablecoin market cap, US 10-year Treasury, xAI Grok release, Indy 500
-- Categories: Tech, Geopolitics, Economy, Science, Sports, Culture, Crypto

INSERT INTO questions (title, description, category, options, resolution_date, resolution_source, status, created_by) VALUES

-- Tech (2)

('Will Microsoft announce a Copilot-branded autonomous AI agent product at Build 2026 (ending May 22)?',
 'Microsoft Build 2026 is expected to run May 19–22, 2026. This resolves YES if Microsoft announces during a Build keynote, session, or official blog post a new Copilot-branded product that functions as an autonomous AI agent — meaning it can execute multi-step tasks independently without requiring step-by-step human confirmation. The product must be named or described using the Copilot brand. Minor Copilot feature updates, UI refreshes, or existing Copilot integrations into new Office apps do not count. The announcement must represent a qualitatively new product tier or capability class. Resolution based on Microsoft''s official Build 2026 announcements as reported by The Verge, TechCrunch, or Microsoft''s official blog.',
 'AI/Technology', '["Yes","No"]', '2026-05-23', 'https://news.microsoft.com/build2026; https://build.microsoft.com', 'active', 'baycast-system'),

('Will xAI release a new Grok model (Grok 4 or equivalent major version) before May 25, 2026?',
 'xAI, Elon Musk''s AI company, has been iterating on the Grok model family. This resolves YES if xAI publicly releases a new major version of Grok (branded as Grok 4, Grok 3.5 if it represents a major capability jump, or equivalent successor) that is available to X Premium subscribers or the general public before May 25, 2026 23:59 UTC. The release must be confirmed by xAI''s official X/Twitter account, the x.ai website, or major tech press (TechCrunch, The Verge). Minor model patches, fine-tunes, or speed improvements to existing Grok versions do not count. The new model must be described as a distinct version release.',
 'AI/Technology', '["Yes","No"]', '2026-05-25', 'https://x.ai; https://x.com/xai', 'active', 'baycast-system'),

-- Geopolitics (1)

('Will the UN Security Council vote on a new binding resolution during the week of May 18–22, 2026?',
 'This resolves YES if the United Nations Security Council holds a formal vote on any new binding resolution (not a procedural vote or resolution renewal) during the calendar week of May 18–22, 2026. The vote must be recorded in the official UNSC meetings record on un.org. Draft resolutions that are vetoed still count as YES if a vote was held. Meetings that adjourn without a vote, informal consultations, or press statements without a formal vote do not count. Resolution must be verifiable via the UN Journal or UNSC official record.',
 'Geopolitics', '["Yes","No"]', '2026-05-23', 'https://www.un.org/securitycouncil/; https://journal.un.org/', 'active', 'baycast-system'),

-- Economy (2)

('Will the flash Eurozone HICP inflation rate for May 2026 be reported below 2.0% year-over-year?',
 'Eurostat publishes the flash estimate for the Eurozone Harmonised Index of Consumer Prices (HICP) approximately on May 22, 2026 (or the nearest business day). This resolves YES if the flash annual inflation rate for May 2026 is reported as strictly less than 2.0% (e.g., 1.9% or lower). A reading of exactly 2.0% resolves as NO. A reading above 2.0% also resolves as NO. The flash estimate (not the final revised figure) is used for resolution. If Eurostat delays publication beyond May 25, the resolution date extends by 3 business days. Based on the official Eurostat news release.',
 'Economics', '["Yes","No"]', '2026-05-23', 'https://ec.europa.eu/eurostat/news/flash-estimates-inflation', 'active', 'baycast-system'),

('Will the US 10-year Treasury yield close above 4.50% on any trading day during the week of May 18–22, 2026?',
 'This resolves YES if the benchmark US 10-year Treasury note yield closes at or above 4.50% on any single trading day between May 18–22, 2026 (inclusive), as reported by the US Treasury Department daily yield curve rates or a major financial data provider (Bloomberg, Reuters, Trading Economics). The closing yield (not intraday high) is used. If May 18 is a weekend/holiday, the effective trading week is May 19–22. If there is a US market holiday during this week, only actual trading days count.',
 'Economics', '["Yes","No"]', '2026-05-23', 'https://home.treasury.gov/policy-issues/financing-the-government/interest-rate-statistics', 'active', 'baycast-system'),

-- Science (1)

('Will NASA officially name the Artemis III crew before May 23, 2026?',
 'NASA''s Artemis III mission aims to return humans to the lunar surface. This resolves YES if NASA issues an official press release, holds a televised crew announcement event, or publishes the named crew on nasa.gov before May 23, 2026 23:59 UTC. The announcement must include at least the commander and at least one other named crew member. Preliminary crew selections, leaked names, or unofficial reports do not count. The announcement must come from an official NASA communication channel. If NASA names only a partial crew (e.g., just the commander), that counts as YES.',
 'Science', '["Yes","No"]', '2026-05-23', 'https://nasa.gov/artemis; https://blogs.nasa.gov', 'active', 'baycast-system'),

-- Sports (2)

('Will the 2026 Monaco Grand Prix (May 24) be won by the driver who started from pole position?',
 'The 2026 Monaco Grand Prix takes place on May 24, 2026. This resolves YES if the driver who qualified in P1 (pole position) is classified as the race winner in the official FIA Formula 1 race classification. If the race is shortened, red-flagged, or restarted, the official FIA classification stands. If qualifying is cancelled and the grid is set by other means (sprint result, championship order), the driver who starts the actual race from P1 is considered the pole-sitter for this question. If the race is cancelled entirely, resolves NO. Based on the official result on formula1.com and fiA.com.',
 'Sports', '["Yes","No"]', '2026-05-25', 'https://formula1.com; https://fia.com', 'active', 'baycast-system'),

('Will a driver from outside the United States win the 2026 Indianapolis 500 on May 25?',
 'The 110th Indianapolis 500 is scheduled for May 25, 2026. This resolves YES if the official winner, as declared by IndyCar/IMS, holds citizenship of any country other than the United States. Based on the driver''s primary nationality as listed on the official IndyCar entry list and the official race result on indy500.com or indycar.com. If the race is postponed but still run before May 31, 2026, the result stands. If a US-licensed driver wins, resolves NO. If the race is cancelled, resolves NO.',
 'Sports', '["Yes","No"]', '2026-05-26', 'https://www.indymotorspeedway.com; https://www.indycar.com', 'active', 'baycast-system'),

-- Culture (1)

('Will a Nordic country win the Eurovision Song Contest 2026 Grand Final (expected May 23)?',
 'The Eurovision Song Contest 2026 Grand Final is expected on May 23, 2026. This resolves YES if the winning country (as announced by the European Broadcasting Union) is one of the five Nordic countries: Sweden, Norway, Denmark, Finland, or Iceland. If a Nordic country participates but does not win, resolves NO. The official EBU result is final, regardless of any subsequent disqualification (unless the EBU officially revises the winner before May 25). Based on the official result published on eurovision.tv.',
 'Culture', '["Yes","No"]', '2026-05-24', 'https://eurovision.tv; https://ebu.ch', 'active', 'baycast-system'),

-- Crypto (1)

('Will the total stablecoin market capitalization exceed $250 billion before May 23, 2026?',
 'This resolves YES if the combined market capitalization of all stablecoins (USDT, USDC, DAI, TUSD, BUSD, PYUSD, FDUSD, and all others) exceeds $250 billion at any point before May 23, 2026 23:59 UTC, as reported by DefiLlama (stablecoins section), CoinGecko, or an equivalent major crypto data aggregator. A screenshot of the DefiLlama stablecoins dashboard page showing a total market cap above $250 billion is sufficient for resolution. Flash values caused by oracle errors or demonstrated data glitches (corrected within 24 hours) do not count.',
 'Crypto/Finance', '["Yes","No"]', '2026-05-23', 'https://defillama.com/stablecoins; https://coingecko.com', 'active', 'baycast-system');
