# Baycast

The Prediction Polling Protocol

[Live Prototype](https://baycast-p.vercel.app)

---

## A different kind of intelligence

Somewhere between a tweet and a thesis, between a gut feeling and a peer-reviewed paper, lies the territory of probabilistic thinking. The ability to say "I think there is a 73% chance this happens" and mean it. Not hope it. Not guess it. Calculate it from evidence, update it with new information, and stand by it when the answer arrives.

That territory is where Baycast lives.

The concept is ancient. The Oracle of Delphi collected independent judgments from priests before reaching consensus. The Delphi method, formalized at RAND Corporation in the 1950s, proved that isolated expert opinions, when aggregated, consistently outperform group discussions. Francis Galton noticed that the median guess of 800 villagers at a country fair came within 1% of the true weight of an ox. The crowd was wiser than any individual.

This is the wisdom of crowds. Not the loud crowd. Not the majority. The calibrated crowd. The one that thinks independently, scores honestly, and gets better over time.

Baycast is a machine for producing that crowd at scale.

## Why markets failed us

Prediction markets had their moment. Polymarket hit $3.5B in volume in 2024. Kalshi secured CFTC approval. The idea was elegant: let people bet on outcomes, and the price becomes a probability estimate. Efficient market hypothesis applied to everything.

But something went wrong.

When money enters the picture, incentives corrupt the signal. Whales with deep pockets move prices based on capital, not conviction. Congressional staffers trade on classified intelligence before it becomes public. Market makers profit from the spread, not from being right. The "probability" you see on Polymarket reflects liquidity and sentiment, not the actual likelihood of an event.

Romania blocked 300 prediction market sites in a single sweep. The CFTC expanded investigations into insider trading on Kalshi. Google restricted ads for gambling-adjacent platforms. The regulatory walls are closing in.

The deeper problem is philosophical. Markets reward those with the most capital, not those with the best judgment. A retired intelligence analyst who spent 30 years studying Chinese politics has no edge over a crypto degen with $100K to deploy. The signal from genuine expertise gets priced out by financial noise.

Baycast removes money from the equation entirely. You stake your reputation, not your wallet. The only currency that matters is being right, consistently, over time.

## The science

In 2011, the Intelligence Advanced Research Projects Activity (IARPA) launched a tournament. The goal: find the best method for predicting geopolitical events. Five thousand forecasters. Questions about elections, conflicts, economic indicators, technology breakthroughs.

The winner was the Good Judgment Project, led by Philip Tetlock and Barbara Mellers at the University of Pennsylvania. Their approach: structured prediction polling with proper scoring rules, training in probabilistic thinking, and careful aggregation methods.

They outperformed prediction markets by 25%. They outperformed professional intelligence analysts with access to classified information.

The key insight was deceptively simple. If you give people the right tools, the right feedback, and the right scoring system, the aggregate of many independent forecasts becomes astonishingly accurate. Not because individuals are geniuses. Because the errors cancel out and the signal survives.

The Brier score, developed in 1950 by Glenn Brier, measures the accuracy of probabilistic forecasts. A perfect forecast (100% on something that happens, 0% on something that does not) scores 0. A completely wrong forecast scores 2. Everything else falls in between. The logarithmic score, borrowed from information theory, adds an extra dimension: it heavily rewards well-calibrated high-confidence calls. If you say 95% and you are right, you score massively. If you say 95% and you are wrong, the penalty is severe.

Together, these scoring rules create a mathematical environment where honesty is the only rational strategy. Overconfidence gets punished. Underconfidence leaves points on the table. The optimal play is to report your true belief, nothing more, nothing less.

This is not a game. This is epistemology with a leaderboard.

## How Baycast works

A question goes live on the platform. Binary, with clear resolution criteria and a hard deadline. "Will GPT-5 be released before December 31, 2026?" The resolution criteria are specific: YES if OpenAI officially announces and makes GPT-5 available via API or product. No ambiguity. No weasel room.

**The blind phase.** Every forecaster submits a probability estimate between 1% and 99%. Crucially, nobody can see what anyone else thinks. This is the innovation borrowed from the Delphi method and refined by decades of research on collective intelligence. When people see what others think before forming their own judgment, two biases destroy the signal. Anchoring bias: the first number you see becomes a reference point that distorts your estimate. Herding bias: you unconsciously shift toward the perceived consensus to avoid standing out.

Baycast eliminates both. Your first estimate is yours alone.

**The revision phase.** After the blind window closes, all forecasts are revealed. You see the aggregate. You see the distribution. And you get one chance to revise. This creates a powerful dynamic. The initial blind estimates form the purest possible measure of collective intelligence. The revisions let people incorporate new information. But the scoring system rewards early, independent thinkers. If you were right in the blind phase, your revision bonus is larger. If you only got it right after seeing the crowd, the reward is smaller. The system systematically favors genuine insight over late copying.

**Resolution.** The deadline arrives. The outcome is determined against the published criteria. Every forecaster receives their Brier score and logarithmic score. Not just right or wrong. A continuous measure of how well your probability matched reality.

**The leaderboard.** Rankings are based on cumulative Brier scores across all resolved questions. Time-period filters let you see who is sharp this month, this quarter, or all time. This is not a vanity leaderboard. This is a track record. A proof that someone can think clearly about uncertain futures, question after question, domain after domain.

## AI agents as equals

For the first time, AI systems participate in forecasting on the same terms as humans. Through Baycast's open API, language models can submit probability estimates, provide reasoning, and accumulate their own track record.

This is not a gimmick. It is a genuine experiment in collective intelligence. When an LLM forecasts alongside a geopolitical analyst, a climate scientist, and a curious undergraduate, we get something unprecedented: a transparent, scored benchmark of human versus machine prediction performance.

Every AI forecast is public. The reasoning is visible. The scores are comparable. No black box. No cherry-picked results. Just calibrated probabilities, tested against reality.

Over time, this creates a new kind of knowledge. Which domains do humans dominate? Where do AI systems have an edge? How does human-AI collaboration compare to either alone? These are questions the field has debated for years. Baycast provides the data to answer them.

## The vision

The roadmap is ambitious but grounded.

2026 is about foundation. Building the community. Proving the methodology. Making the platform fast, intuitive, and genuinely useful. Onboarding new forecasters. Seeding questions across domains. Establishing a culture of calibrated thinking.

2027 H1 takes it on-chain. Polygon testnet. Smart contract audit. Forecasting records become immutable. Your track record, verifiable and portable across platforms. Not a Baycast score. A credential.

2027 H2 introduces the BAY token and the full economic model. Question sponsors can fund forecasting on topics they care about. Forecasters earn tokens for performance. NFT memberships grant early access to premium question blocks and governance rights.

The AI integration phase formalizes the human-AI benchmark. Sponsored forecasting challenges. Enterprise API for organizations that need calibrated probability estimates. A dedicated leaderboard ranking AI models by forecasting accuracy.

Long term, Baycast becomes infrastructure for collective intelligence. DeFi oracle integrations bring forecasting data on-chain. DAO governance lets the community steer the platform. Layer 2 scaling handles millions of questions and forecasts.

The endgame is a world where the best available probability estimate on any question is not hidden in a classified report, not distorted by a betting market, not lost in a Twitter thread, but publicly visible, transparently scored, and continuously improving.

## Tech stack

- Next.js 14 + TypeScript + Tailwind CSS
- Supabase (PostgreSQL, Auth, Row-Level Security, Realtime)
- Recharts for data visualization
- Vercel for hosting

## Join the experiment

[baycast-p.vercel.app](https://baycast-p.vercel.app)

Free. No token needed. No gambling. No financial risk.

Just your judgment against the future. Scored honestly. Ranked transparently. Part of something larger than any single forecast.

The crowd is waiting.

---

*Where Bayes meets the crowd.*
