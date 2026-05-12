-- ══════════════════════════════════════════════════════════════
-- Baycast Prediction Questions — Batch May 26 – Jun 15, 2026
-- Created: 2026-05-12
-- 15 questions · Resolution window: May 26 – June 15, 2026
-- Categories: Tech(2), Geopolitics(2), Economy(2), Science(2),
--             Sports(3), Culture(2), Crypto(2)
-- Languages: ~70% English, ~30% French
-- All questions pass the 9-criteria Baycast checklist:
--   clarity, uniqueness, testable, temporal, exhaustive,
--   non-trivial, collective-interest, resolution-source, edge-cases
-- ══════════════════════════════════════════════════════════════

INSERT INTO questions (title, description, category, status, resolution_date, resolution_source, options, created_at) VALUES

-- ═══════════════════════════════════════════
-- TECH (2 questions)
-- ═══════════════════════════════════════════

(
  'Will Apple announce a new agentic Siri capable of multi-step autonomous task execution at WWDC 2026 (June 8–12)?',
  'Apple WWDC 2026 runs June 8–12, 2026. This resolves YES if, during the WWDC keynote (expected June 8) or via an official Apple press release published during WWDC week, Apple announces a substantially upgraded Siri that can autonomously execute multi-step tasks across multiple apps without requiring confirmation at each step. The capability must go beyond the current "Apple Intelligence" feature set as of May 2026 and must be described as a new agentic capability. Minor UI tweaks, faster responses, or integration into one additional app do NOT count. The announcement must come from an official Apple channel (keynote livestream, apple.com newsroom, or developer.apple.com). If Apple pre-announces a feature shipping later in 2026, that still counts as YES. If WWDC keynote is delayed beyond June 15, the resolution extends to the actual date.',
  'tech',
  'open',
  '2026-06-13',
  'https://developer.apple.com/wwdc26/; https://www.apple.com/newsroom/; The Verge, TechCrunch WWDC coverage',
  '["Yes","No"]'::jsonb,
  NOW()
),

(
  'Will the EU AI Act enforcement result in at least one formal penalty against any company before June 15, 2026?',
  'The EU AI Act''s prohibited practices took effect February 2, 2025, and GPAI obligations August 2, 2025. This resolves YES if any EU national competent authority or the European Commission publicly announces a formal penalty, fine, or binding enforcement action against any company for non-compliance with the EU AI Act before June 15, 2026 23:59 UTC. Formal investigations or preliminary findings do NOT count — only a publicly announced penalty or fine. Warning letters, voluntary compliance agreements, and informal settlements do NOT count. The penalty must be reported by Reuters, Euronews, or an official EU press release (ec.europa.eu). If penalties are announced but immediately appealed, they still count as YES. Penalties for non-AI-Act violations (e.g., GDPR) do NOT count.',
  'tech',
  'open',
  '2026-06-15',
  'https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai; Reuters, Euronews, EU press releases',
  '["Yes","No"]'::jsonb,
  NOW()
),

-- ═══════════════════════════════════════════
-- GEOPOLITICS (2 questions)
-- ═══════════════════════════════════════════

(
  'Will Russia and Ukraine agree to a formal ceasefire or peace deal before June 15, 2026?',
  'This resolves YES if, before June 15, 2026 23:59 UTC, Russia and Ukraine (or their authorized representatives) formally agree to and publicly announce a ceasefire, armistice, truce, or peace agreement confirmed by both governments. The agreement must be reported by at least two of: Reuters, AP, BBC, Al Jazeera. A temporary humanitarian pause under 72 hours, prisoner exchange, or unilateral ceasefire by one side does NOT count. Both sides must publicly commit to the ceasefire/peace terms. Back-channel negotiations, leaked drafts, or "readiness to negotiate" statements do NOT count. If a ceasefire is announced but collapses within 48 hours, it still counts as YES. A UN-brokered or third-party-mediated agreement counts if both parties sign.',
  'geopolitics',
  'open',
  '2026-06-15',
  'https://www.reuters.com/; https://www.bbc.com/news; https://www.aljazeera.com/; AP News',
  '["Yes","No"]'::jsonb,
  NOW()
),

(
  'La Chine mènera-t-elle des exercices militaires majeurs autour de Taïwan avant le 15 juin 2026 ?',
  'Cette question se résout par OUI si, avant le 15 juin 2026 à 23h59 UTC, les forces armées chinoises (PLA) lancent des exercices militaires impliquant au moins deux branches de l''armée (marine + aviation, fusées + marine, etc.) dans la zone d''identification de défense aérienne de Taïwan (ADIZ) ou à moins de 50 km des côtes taïwanaises. Les exercices doivent être officiellement annoncés par le ministère chinois de la Défense nationale ou le commandement du théâtre oriental, et durer au moins 24 heures. Des incursions ponctuelles d''avions ou des passages navals isolés ne comptent PAS. La résolution se base sur les rapports du ministère taïwanais de la Défense nationale (mnd.gov.tw), de Reuters ou de l''AFP.',
  'geopolitics',
  'open',
  '2026-06-15',
  'https://www.mnd.gov.tw/; Reuters; AFP; ministère chinois de la Défense nationale (mod.gov.cn)',
  '["Oui","Non"]'::jsonb,
  NOW()
),

-- ═══════════════════════════════════════════
-- ECONOMY (2 questions)
-- ═══════════════════════════════════════════

(
  'Will the Federal Reserve cut the federal funds rate at its June 16–17, 2026 FOMC meeting?',
  'The FOMC meets June 16–17, 2026. This resolves YES if the Federal Reserve announces a reduction in the target range for the federal funds rate in the post-meeting press release expected June 17, 2026. A cut of any size (25 bps or more) counts. If the Fed holds rates unchanged or raises rates, resolves NO. An emergency inter-meeting rate cut before June 16 does NOT count for this question — only the scheduled June FOMC decision matters. If the meeting is postponed beyond June 30, 2026, the question resolves NO. Resolution based on the official FOMC statement published at federalreserve.gov and confirmed by Bloomberg, Reuters, or CNBC.',
  'economy',
  'open',
  '2026-06-18',
  'https://www.federalreserve.gov/monetarypolicy/fomccalendars.htm; https://www.federalreserve.gov/newsevents/pressreleases.htm',
  '["Yes","No"]'::jsonb,
  NOW()
),

(
  'Le taux de chômage américain (U-3) pour mai 2026 sera-t-il publié en dessous de 4,0 % ?',
  'Le rapport sur l''emploi américain (Employment Situation) pour mai 2026 sera publié par le Bureau of Labor Statistics (BLS) le 5 juin 2026 (premier vendredi de juin). Cette question se résout par OUI si le taux de chômage U-3 pour mai 2026 est strictement inférieur à 4,0 % (ex. : 3,9 % ou moins). Un taux exactement égal à 4,0 % se résout par NON. La première estimation publiée est utilisée (pas les révisions ultérieures). Si la publication est retardée au-delà du 15 juin pour cause exceptionnelle, la résolution attend la publication effective. Si le rapport est définitivement annulé, la question se résout par NON. Source : rapport officiel du BLS.',
  'economy',
  'open',
  '2026-06-07',
  'https://www.bls.gov/news.release/empsit.toc.htm; Bureau of Labor Statistics',
  '["Oui","Non"]'::jsonb,
  NOW()
),

-- ═══════════════════════════════════════════
-- SCIENCE (2 questions)
-- ═══════════════════════════════════════════

(
  'Will SpaceX successfully land a Starship booster via "chopstick catch" AND reach orbit in the same flight before June 15, 2026?',
  'SpaceX has been conducting iterative Starship flight tests with varying success on booster catches. This resolves YES if SpaceX completes a Starship integrated flight test before June 15, 2026 23:59 UTC in which: (a) the Super Heavy booster is successfully caught by the Mechazilla launch tower arms ("chopstick catch"), AND (b) the Starship upper stage reaches orbital velocity and completes a controlled flight of at least one orbital-duration period. Both conditions must be met in the SAME flight test. A partial success (booster caught but ship fails, or ship succeeds but booster not caught) resolves NO. The flight test must be confirmed by SpaceX on x.com/@SpaceX, spacex.com, or major aerospace media (NASASpaceflight, Ars Technica, Space News). A flight ending in RUD before achieving both objectives resolves NO.',
  'science',
  'open',
  '2026-06-15',
  'https://x.com/SpaceX; https://www.spacex.com/; NASASpaceflight.com, Ars Technica',
  '["Yes","No"]'::jsonb,
  NOW()
),

(
  'Will a major AI lab claim a new state-of-the-art result on the MLE-bench or SWE-bench Verified benchmark before June 15, 2026?',
  'MLE-bench and SWE-bench Verified are leading benchmarks for evaluating AI agents on real-world software engineering tasks. This resolves YES if, before June 15, 2026 23:59 UTC, a major AI lab (OpenAI, Anthropic, Google DeepMind, Meta AI, xAI, or comparable organization) publishes a paper, blog post, or technical report claiming a new all-time state-of-the-art (SOTA) score on either MLE-bench or SWE-bench Verified. The claim must be reported by at least one of: arXiv preprint, the lab''s official blog, or a major tech publication (TechCrunch, The Verge, MIT Technology Review). Incremental improvements of less than 1 percentage point over an existing SOTA do NOT count. The result must represent a meaningful leap. Internal-only results that are not publicly disclosed do NOT count.',
  'science',
  'open',
  '2026-06-15',
  'https://arxiv.org/; https://www.swebench.com/; https://openai.com/; https://www.anthropic.com/',
  '["Yes","No"]'::jsonb,
  NOW()
),

-- ═══════════════════════════════════════════
-- SPORTS (3 questions)
-- ═══════════════════════════════════════════

(
  'Which club will win the 2026 UEFA Champions League Final on May 30 in Budapest?',
  'The 2025–26 UEFA Champions League Final will be played on May 30, 2026 at Puskás Aréna, Budapest. This resolves as the winning club as officially declared by UEFA. If the match goes to extra time or penalties, the winner after the final whistle/penalty shootout counts. If the match is abandoned and replayed, the replayed match result is used. If postponed beyond May 31, resolution occurs when a winner is declared. "Other" wins if the winner is not one of the listed clubs. Based on official UEFA result at uefa.com. The list represents historically strong UCL contenders — as of mid-May, the quarter-finals and semi-finals will determine who reaches the final.',
  'sports',
  'open',
  '2026-05-31',
  'https://www.uefa.com/uefachampionsleague/; UEFA official result',
  '["Real Madrid","Arsenal","Barcelona","Inter Milan","Bayern Munich","Paris Saint-Germain","Manchester City","Liverpool","Other"]'::jsonb,
  NOW()
),

(
  'Which driver will win the 2026 Spanish Grand Prix on the new Madrid street circuit?',
  'The 2026 Spanish Grand Prix is scheduled for early June 2026 (exact date TBD) on a new street circuit in Madrid (the Madring at IFEMA). This resolves as the driver classified as the race winner by the FIA. If the race is shortened, red-flagged, or restarted, the official FIA classification stands. If the race is cancelled entirely, resolves as "Cancelled". Sprint race results do NOT count. Based on official FIA classification at formula1.com and fia.com. The 2026 F1 season features major regulatory changes and Cadillac as the 11th team, making outcomes highly uncertain.',
  'sports',
  'open',
  '2026-06-05',
  'https://www.formula1.com/; https://www.fia.com/',
  '["Max Verstappen","Lando Norris","Charles Leclerc","Lewis Hamilton","Oscar Piastri","George Russell","Kimi Antonelli","Carlos Sainz","Other","Cancelled"]'::jsonb,
  NOW()
),

(
  'Quel joueur remportera le simple messieurs à Roland-Garros 2026 (fin prévue le 7 juin) ?',
  'Les Internationaux de France de tennis 2026 se déroulent de fin mai au 7 juin 2026 à Paris. Cette question se résout en fonction du vainqueur du simple messieurs tel que déclaré par la FFT (Fédération Française de Tennis) sur rolandgarros.com. Le vainqueur du match final (après tie-break éventuel du 5e set) est le résultat. Si le tournoi est interrompu et reprend avant le 15 juin, le résultat final compte. Si le tournoi est annulé définitivement, se résout en "Annulé". Rafael Nadal retraité, Djokovic à 39 ans, l''ère est ouverte pour Alcaraz, Sinner et la nouvelle génération.',
  'sports',
  'open',
  '2026-06-08',
  'https://www.rolandgarros.com/; https://www.fft.fr/; Eurosport, ESPN',
  '["Carlos Alcaraz","Jannik Sinner","Novak Djokovic","Daniil Medvedev","Alexander Zverev","Casper Ruud","Stefanos Tsitsipas","Holger Rune","Autre","Annulé"]'::jsonb,
  NOW()
),

-- ═══════════════════════════════════════════
-- CULTURE (2 questions)
-- ═══════════════════════════════════════════

(
  'Will any film released in May–June 2026 gross over $500 million worldwide by June 15?',
  'This resolves YES if any single film with a theatrical release between May 1 and June 15, 2026 reaches a cumulative worldwide gross of $500 million or more by June 15, 2026 23:59 UTC, as reported by Box Office Mojo (boxofficemojo.com). The gross includes all worldwide box office from all release territories and all days since the film''s initial theatrical release. Films released before May 1 that continue earning in May–June count only if their cumulative total first crosses $500M during the window. Streaming-only releases do NOT count. If Box Office Mojo is unavailable, The Numbers or Deadline gross figures are used.',
  'culture',
  'open',
  '2026-06-15',
  'https://www.boxofficemojo.com/; https://www.the-numbers.com/; Deadline Hollywood',
  '["Yes","No"]'::jsonb,
  NOW()
),

(
  'Will a new album released in May or June 2026 reach #1 on the US Billboard 200 chart for at least one week before June 15?',
  'This resolves YES if any album first released (physical or digital) between May 1 and June 14, 2026 reaches the #1 position on the Billboard 200 chart for at least one chart week before the chart dated June 15, 2026 (or the nearest Saturday chart date). The Billboard 200 chart is published weekly by Billboard magazine. Compilation albums, re-releases of previously charted albums, and greatest-hits packages do NOT count unless they contain at least 50% new material. Movie soundtracks and cast recordings do count. Resolution based on official Billboard charts at billboard.com. If Billboard changes methodology, the most directly comparable chart is used.',
  'culture',
  'open',
  '2026-06-15',
  'https://www.billboard.com/charts/billboard-200/; Billboard official charts',
  '["Yes","No"]'::jsonb,
  NOW()
),

-- ═══════════════════════════════════════════
-- CRYPTO (2 questions)
-- ═══════════════════════════════════════════

(
  'Will Bitcoin (BTC) close a weekly candle below $85,000 before June 15, 2026?',
  'This resolves YES if the Bitcoin (BTC/USD) weekly closing price on any weekly candle (closing Sunday 23:59 UTC) is below $85,000 at any point before June 15, 2026. The weekly close is determined by CoinGecko''s BTC price at weekly close or TradingView (BTCUSDT on Binance, weekly timeframe). A flash crash that recovers within the same candle but closes above $85K does NOT count — only the weekly closing price matters. If BTC never closes a weekly candle below $85K before June 15, resolves NO. Intraday or hourly prices are irrelevant. A close of exactly $85,000 resolves NO (must be strictly below).',
  'crypto',
  'open',
  '2026-06-15',
  'https://www.coingecko.com/; https://www.tradingview.com/symbols/BTCUSDT/',
  '["Yes","No"]'::jsonb,
  NOW()
),

(
  'Le prix de l''Ethereum (ETH) dépassera-t-il 3 000 $ avant le 15 juin 2026 ?',
  'Cette question se résout par OUI si le prix spot de l''Ethereum (ETH/USD) atteint ou dépasse 3 000 $ à n''importe quel moment avant le 15 juin 2026 à 23h59 UTC, selon CoinGecko (prix en temps réel) ou Binance (ETHUSDT). Un seul trade à 3 000 $ ou plus suffit, même si le prix redescend immédiatement après. Le prix spot (pas les futures) est utilisé. Si le prix atteint exactement 3 000,00 $, cela compte comme OUI. Les erreurs de prix dues à des bugs d''oracle (corrigées dans les 24h) ne comptent pas. En cas de divergence entre les sources, CoinGecko prévaut. Contexte : le réseau Ethereum a reçu la mise à jour Pectra en mai 2025, et l''écosystème DeFi continue de croître.',
  'crypto',
  'open',
  '2026-06-15',
  'https://www.coingecko.com/; https://www.binance.com/fr/trade/ETH_USDT',
  '["Oui","Non"]'::jsonb,
  NOW()
);
