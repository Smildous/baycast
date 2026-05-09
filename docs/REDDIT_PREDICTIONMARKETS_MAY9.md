# Title
```
Baycast: Blind prediction polling with Brier scoring — open source, no money, EU-based
```

# Body
```
Hi r/predictionmarkets,

I launched a prediction platform today and I think the methodology might interest this community — or at least generate some productive debate about what "prediction markets" should actually optimize for.

## What Baycast Is

Baycast is a scored prediction polling platform. You forecast real-world events and we track your accuracy using Brier scores. No money involved. No crypto. EU-based.

The prototype is live at baycast-p.vercel.app and the code is open source (github.com/Smildous/baycast).

## The Methodology: Why Blind Consensus Matters

The core design decision is what I'm calling the **Blind Consensus Protocol (BCP)**, and it's the part I most want feedback on from this sub.

**The problem it solves:** On every major prediction platform — Polymarket, Metaculus, Manifold, Kalshi — you see the crowd's aggregate before you make your prediction. You see the price, the median, or the market probability. Research on the anchoring effect consistently shows that exposure to a group estimate shifts your answer by 10-20% toward the consensus.

The "wisdom of crowds" effect requires independent judgment. When you can see the market before you trade, you're not adding signal — you're adding an echo. The aggregate price isn't a pure reflection of distributed knowledge; it's a reflection of sequential herding.

**How BCP works:**

1. You predict WITHOUT seeing the crowd's aggregate
2. After you commit, the aggregate is revealed
3. You can optionally revise your prediction with full context
4. Both your blind prediction and revised prediction are scored independently

This is essentially the Delphi method (RAND Corporation, 1950s) adapted for a web platform. The key insight is that your *first* answer — made without social influence — is often more informationally valuable than your *revised* answer, even though the revised one has more context.

## The Scoring System

We use **Brier scores** for a few specific reasons I'd love to discuss:

**Why Brier over log score:**
- Brier scores are decomposable: you can break them into calibration, discrimination, and uncertainty components. This means we can tell a user not just "you're wrong" but "you're overconfident" or "you're well-calibrated but not discriminating enough."
- Brier is bounded [0, 2], which makes it more intuitive for non-technical users
- Brier penalizes both overconfidence AND underconfidence symmetrically

**What we track:**
- Per-question Brier score
- Running average Brier score (lifetime accuracy)
- Calibration curve (are you well-calibrated across confidence levels?)
- Blind vs. revised score comparison (does seeing the crowd actually help you or hurt you?)

The last metric is the one I'm most excited about from a research perspective. If the herding hypothesis is correct, we should see users' blind predictions outperform their revised predictions in aggregate — or at least that the blind aggregate is more accurate than the revised aggregate.

**Open questions I'd love input on:**

1. Should we weight recent predictions more heavily than older ones in the lifetime score? The current approach is a simple average, but decay weighting might better reflect current forecasting ability.

2. Has anyone implemented relative Brier scoring (score relative to the crowd) vs. absolute Brier scoring? Relative scoring would show "you beat the crowd by X" but might incentivize contrarianism.

3. For multi-outcome questions (>2 options), should we use the decomposed Brier score (sum of squared errors across all outcomes) or the reduced form (just the predicted probability for the outcome that occurred)? We're currently using the decomposed form.

4. What's the right minimum sample size before a user's Brier score becomes meaningful? We're not showing percentile rankings until a user has at least 10 resolved predictions, but I'm not sure that's the right threshold.

## What We're Not

- Not a prediction market (no trading, no prices)
- Not crypto (no tokens, no wallets)
- Not gambling (no financial risk, no deposits)
- Not trying to compete with Polymarket on volume or liquidity

We're a polling platform that takes scoring seriously. Think Goodreads for forecasting — your track record is the product, not your portfolio.

## Where We Are

Early prototype. ~10 live questions across tech, geopolitics, and science. Small community. The scoring pipeline works end-to-end. We need more questions, more users, and more resolved predictions to start validating the methodology empirically.

If you're interested in the scoring methodology, the blind consensus approach, or just want a non-financial place to track your forecasting accuracy, give it a try. I'd particularly value feedback from anyone here who has experience with proper scoring rules, calibration research, or the Delphi method.

baycast-p.vercel.app | github.com/Smildous/baycast | @baycast_ on Twitter
```
