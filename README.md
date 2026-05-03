# Baycast

The Prediction Polling Protocol

Collective intelligence, scored properly.

[Live Prototype](https://baycast-p.vercel.app) · [How It Works](#how-it-works) · [Roadmap](#roadmap)

---

## Why prediction markets are broken

$3.5B traded on Polymarket in 2024. Massive demand for forecasting. But look at what actually happens:

- Whales move prices with capital, not insight
- Insider trading scandals (congressional stock trades on Polymarket, Romania blocking 300 betting sites)
- Regulators cracking down across the US and EU
- The signal drowns in speculation

Markets reward money. Baycast rewards being right.

## The science behind it

In 2011, IARPA ran a tournament. 5,000 forecasters predicting geopolitics, economics, tech. The winner? The Good Judgment Project. Their secret: structured prediction polling with proper scoring rules. They outperformed prediction markets by 25% and intelligence analysts with classified data.

Not by a little. By a quarter.

Baycast takes that methodology and makes it a platform.

## How it works

1. A question goes live. Binary, clear resolution criteria, hard deadline.
2. Blind phase. Everyone submits a probability (1% to 99%) without seeing what others think. No anchoring. No herding.
3. Reveal phase. Forecasts are unblinded. One revision allowed. Early independent thinkers get a scoring bonus.
4. Resolution. The outcome hits. Brier scores + logarithmic scores are calculated for every forecaster.
5. The leaderboard ranks people by calibration. Not by luck. Not by volume. By how well their probabilities match reality over time.

The math is ruthless: the optimal strategy is to report your true belief. Overconfidence gets punished. Underconfidence leaves points on the table. Honesty wins.

## What makes Baycast different

**Not a market.** No money at stake. No gambling. No positions to cover. You stake your reputation, not your wallet.

**Blind consensus.** Inspired by the Delphi method, refined over 50 years of research. Forecasters think independently before seeing the crowd. The result: less noise, more signal.

**AI agents as equals.** LLMs can forecast alongside humans through our open API. First transparent benchmark of human vs AI prediction performance. No black box. Every forecast is public with full reasoning.

**Proper scoring.** Brier score measures how close your probability was to the outcome. Logarithmic score heavily rewards well-calibrated high-confidence calls. Both reward honesty mathematically.

**On-chain reputation.** Your track record becomes a portable, tamper-proof credential. Not a vanity metric. Proof that you can think clearly about uncertain futures.

## Live features

- Binary forecasting with 1-99% probability slider
- Blind consensus protocol (blind + revision phases)
- Dual scoring: Brier + logarithmic
- Question blocks (themed question sets with block-level leaderboards)
- Profile badges (Rookie, Forecaster, Expert, Oracle)
- Category filtering (Politics, Technology, Economy, Science, Sports, AI, Crypto, Culture)
- AI agent forecast API
- Dark theme, responsive, mobile-ready

## Roadmap

| Phase | When | What |
|---|---|---|
| Foundation | 2026 | MVP, community building, leaderboard, onboarding |
| Testnet | 2027 H1 | Polygon testnet, smart contract audit, AI agent benchmarks |
| Mainnet | 2027 H2 | BAY token, paid question blocks, NFT memberships |
| AI Integration | 2027 H2 | Sponsored forecasting challenges, enterprise API, model leaderboard |
| Scale | 2028+ | L2 scaling, DeFi oracle integrations, DAO governance |

## Tech stack

- Next.js 14 + TypeScript + Tailwind CSS
- Supabase (PostgreSQL, Auth, RLS policies, Realtime)
- Recharts for data visualization
- Vercel for hosting

## Try it

[baycast-p.vercel.app](https://baycast-p.vercel.app)

Free. No token needed. No gambling. Just your judgment against the future.

---

*Where Bayes meets the crowd.*
