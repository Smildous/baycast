# Why Prediction Polls Will Outperform Prediction Markets

**Or: The case for epistemically honest forecasting without financial incentives**

---

Prediction markets have been the darling of the rationalist community for nearly two decades. From InTrade to PredictIt to Polymarket, the idea is elegant: aggregate beliefs through real-money stakes, and the market price becomes a probability estimate. "Put your money where your mouth is" has an intuitive appeal that's hard to argue with.

But there's a growing body of evidence—and theoretical reasoning—that prediction *polls* without financial incentives can actually produce *better* calibrated forecasts. Here's why, and why it matters for anyone serious about understanding the future.

## The Manipulation Problem Markets Can't Solve

Prediction markets create financial incentives, and financial incentives attract capital. That sounds great in theory, but in practice, it means markets are vulnerable to actors who aren't trying to be accurate—they're trying to *move the price*.

When a crypto whale drops $500,000 on a "Will Trump win X?" contract, they may not have any special information. They might be signaling, hedging, narrative-building, or simply gambling. The market price reflects capital *weight*, not information quality. This is a feature when capital is well-correlated with knowledge. It's a bug when capital is correlated with wealth, risk appetite, or agenda.

Contrast this with a prediction poll where every participant has equal weight. A domain expert and a retail trader get one vote each. The signal isn't drowned out by whoever has the deepest pockets. There's no profitable manipulation strategy when there's nothing to manipulate *for*.

The 2024 US election cycle provided a natural experiment: Polymarket prices frequently diverged from polling aggregates, not because markets had "better information," but because capital flows reflected partisan betting patterns. A Bloomberg analysis found that a significant share of Polymarket's election volume came from a small number of large accounts—exactly the kind of concentration that distorts rather than enlightens.

## Brier Scores Reward What Markets Can't

Prediction markets optimize for expected value: you bet when you think the market is wrong *and* the expected profit exceeds the cost of capital and transaction fees. This means markets systematically underweight "boring" questions where edge is small, even if those questions are socially important.

Prediction polls, scored by Brier scores (or similar proper scoring rules), create a different incentive: *be as accurate as possible across all questions*. A forecaster who assigns 0.52 probability to a coin flip and 0.80 probability to an event that resolves NO gets penalized on both. There's no option to "sit out" a question you find unprofitable—you're incentivized to think carefully about everything in your portfolio.

This matters because the whole point of forecasting platforms isn't to identify profitable trades. It's to build accurate models of the world. Brier scores are *proper* scoring rules—they're mathematically maximized when you report your true belief. Markets can approximate this, but only when liquidity is deep and transaction costs are negligible—which, for most questions on most platforms, they aren't.

## Blind Consensus Prevents Herding

One of the most pernicious failures in prediction markets is *anchoring*. When you see that a contract is trading at 72 cents, your prior belief gets pulled toward that number regardless of your private information. Behavioral economists call this "social proof." Market designers call it "price discovery." Forecasters call it a problem.

Baycast's approach—showing only the *blind* aggregate (your estimate versus the hidden community median until the reveal period)—directly addresses this. You form your judgment independently, then learn how your view compares to the crowd. This is closer to the Delphi method used in scientific consensus-building, and it's been shown in replicated studies to produce more accurate estimates than processes where participants see others' judgments in real time.

Cowgill and Zitzewitz's work on prediction market dynamics shows that late movers in markets systematically anchor on existing prices, reducing the information content of their trades. A blind poll structure eliminates this entirely.

## Accessibility: The Uncomfortable Democracy Question

Here's the thing prediction market advocates don't like to acknowledge: requiring users to deposit crypto, navigate wallets, and manage on-chain transactions creates a massive selection filter. The population of prediction market users skews heavily toward young, male, crypto-literate, English-speaking, relatively affluent participants in a handful of countries.

A prediction poll requires an email address and an opinion. That's it.

This isn't just an equity concern—it's an *accuracy* concern. If you're forecasting the outcome of elections in India, agricultural yields in Brazil, or regulatory actions in the EU, do you want predictions from a globally representative sample of informed participants, or from a cohort of crypto traders in Brooklyn and Berlin?

Diversity of participants correlates with diversity of information. Scott Page's work on cognitive diversity and collective intelligence demonstrates that diverse groups systematically outperform homogeneous groups of "experts" on complex prediction tasks, even when the experts are individually more accurate.

## The Empirical Track Record

The Good Judgment Project (now Good Judgment Inc.) demonstrated that properly structured prediction tournaments—without financial incentives—consistently outperformed prediction markets on geopolitical questions. Superforecasters, trained in calibration and updating, achieved Brier scores 30-50% better than untrained participants and competitive with intelligence analysts with access to classified information.

Critically, these tournaments used *scoring*, not *markets*. Participants weren't betting against each other; they were trying to minimize their Brier score. The incentive structure rewarded accuracy, not trading savvy.

Philip Tetlock's research across decades of forecasting tournaments found that the best forecasters shared a common trait: they updated their beliefs incrementally based on evidence, not based on what others were doing. That's exactly the behavior a blind poll incentivizes and a transparent market discourages.

## When Markets Win (And Why That's Fine)

This isn't an argument that prediction markets are *useless*. Markets excel at:

- **Price discovery for liquid events** (elections with massive volume, major sports)
- **Incentivizing rapid information incorporation** when insiders have genuine alpha
- **Creating public, auditable probability estimates** that are hard to fake

The argument is that for *most* questions—especially medium-horizon, moderate-uncertainty questions about technology, science, geopolitics, and economics—polls produce equal or better forecasts without the noise introduced by financial speculation.

## What This Means for the Forecasting Ecosystem

The future of forecasting isn't markets *or* polls—it's understanding which mechanism is appropriate for which question type. For binary, highly liquid questions with deep markets, prices are probably your best single estimate. For everything else—and that's the vast majority of interesting forecasting questions—a well-designed prediction poll with proper scoring, blind consensus, and broad participation will give you a better answer.

Prediction markets solved the incentive problem by adding money. Prediction polls solve a different set of problems by deliberately *removing* it. Sometimes the best way to find the truth is to ask people what they actually think, without giving them a reason to lie.

---

*This post originally appeared on the [Baycast blog](https://baycast.ai). Baycast is a prediction polling platform using blind consensus and Brier scoring to build the most accurate forecasts from the widest possible set of participants.*
