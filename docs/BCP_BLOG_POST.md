# The Blind Consensus Protocol: Why We Hide the Crowd Until After You Think

**By Smil | May 11, 2026**

*The most successful forecasting tournaments in history all had one thing in common: participants couldn't see each other's answers. Here's why that matters more now than ever — and how we built a protocol around it.*

---

Prediction markets just hit $21 billion in monthly volume. Kalshi is chasing a $22 billion valuation. Polymarket raised $400 million at a $15 billion valuation. And Congress is investigating the whole industry for insider trading, after a handful of "informed" traders extracted $143 million in anomalous profits from Polymarket alone.

The prediction market boom is real. But it's built on a flawed assumption — one so deeply embedded in the user experience that almost nobody questions it.

Here's the assumption: showing you the crowd's answer before you commit your own makes the crowd smarter.

It doesn't. In fact, it does the opposite. And the evidence has been available for over 70 years.

---

## The Anchoring Problem

In the early 1950s, researchers at the RAND Corporation were grappling with a practical problem: how do you get accurate forecasts from a group of experts when those experts keep influencing each other?

They noticed something troubling in their Cold War forecasting exercises. When experts discussed their estimates in a room together, the group's final answer was almost always worse than the average of their independent estimates. The more they talked, the more they converged — and the more unique information was lost.

This wasn't a new observation. Francis Galton had demonstrated the "wisdom of crowds" at a 1906 livestock fair, where the median guess of 787 people estimating the weight of an ox came within 1% of the true weight. But Galton's crowd worked because each person guessed *independently*, writing their answer on a card without seeing what anyone else thought.

The moment you show people the aggregate before they commit, independence collapses. The doctor sees the crowd thinks 72% and thinks, "Well, I guess I was overconfident at 85%." The trader sees a number and adjusts toward it. Everyone converges. And the unique information each person carried — the very thing that made the crowd smart — gets systematically destroyed.

Modern research quantifies this effect precisely. Studies on information cascades show that when forecasters are exposed to the median group estimate before making their own prediction, their answers shift **10–20% toward the consensus**. This isn't a subtle effect. It's a massive distortion that turns a potentially wise crowd into an echo chamber.

The behavioral economics literature calls this **anchoring bias** — the tendency for people to rely too heavily on an initial piece of information (the "anchor") when making subsequent judgments. When that anchor is the crowd's current estimate, the result is herding, not wisdom.

---

## The Delphi Method: A 70-Year-Old Solution

The RAND Corporation's response to this problem was elegant and effective. They developed the **Delphi method** in 1953, a structured communication technique designed specifically to preserve the independence of expert judgment while still allowing the group to converge toward better answers through structured iteration.

Here's how the original Delphi method worked:

1. A panel of experts is selected — typically 10–50 people with relevant domain knowledge.
2. Each expert submits their forecast *independently*, without seeing what anyone else thinks. No discussions. No meetings. Just the question and their best judgment.
3. The facilitator aggregates the responses (typically using the median) and feeds back a statistical summary to each expert — the group median, interquartile range, and reasons for outlying estimates.
4. Each expert can then revise their forecast *once*, informed by the group's aggregate but not by individual pressure or social dynamics.
5. The process repeats for 2–3 rounds until convergence stabilizes.

The key innovation was the **blind first round**. By forcing independence at the point of initial commitment, the Delphi method captured the genuine diversity of expert opinion — including the unique information that each expert possessed. The revision round then allowed learning, but the original independent signal was preserved and scored separately.

The method was remarkably successful. Over the following decades, the Delphi method was used by the US Department of Defense for technology forecasting, by healthcare organizations for disease prediction, by NASA for space program planning, and by corporations for strategic planning. A 2003 meta-analysis of 67 Delphi studies found that structured expert judgment using Delphi methods consistently outperformed unstructured group discussion and individual expert judgment.

The reason is simple: the Delphi method enforces the one condition that makes crowds smart — **independent judgment** — and then layers structured learning on top of it.

---

## From RAND to Baycast: Our Implementation

When we designed Baycast, we started with a question: what if you took the Delphi method — arguably the most validated structured forecasting technique in history — and made it accessible to everyone, with proper scoring and digital infrastructure?

The result is the **Blind Consensus Protocol (BCP)**, a two-phase forecasting mechanism that preserves the core insight of the Delphi method while adapting it for a modern web platform.

### Phase A: The Blind Phase

When a new question goes live on Baycast, all forecasters submit their probability estimates *without seeing what anyone else thinks*. No market price. No community median. No trend indicators. No anchors.

You see the question, the resolution criteria, the deadline, and a probability slider. That's it. Your forecast is recorded with a timestamp and locked in.

This phase is non-negotiable. It's not a setting you can toggle off. It's the entire point of the protocol. The blind phase captures the pure, independent signal from every participant — the thing that makes the wisdom of crowds actually work.

### Phase B: The Revision Phase

After the blind phase closes (or after a minimum number of forecasts are submitted), all predictions are revealed. Participants can see the aggregate probability, the distribution of individual forecasts, and — in some cases — the reasoning behind outlying estimates.

Now, the structured revision begins. Each forecaster can update their prediction **once**. Not unlimited trading. Not real-time price movement. One deliberate revision based on new information from the group.

This is where the protocol captures something that prediction markets fundamentally cannot: the difference between **raw judgment** and **information integration**.

If the aggregate shifts your view, great — update. If you think the crowd is wrong, stand your ground. But either way, your original blind prediction is preserved and scored independently. The revision is scored too. You get credit for both your independent judgment and your ability to learn from the group.

Over time, this creates a dataset that no prediction market can produce. You can see who had the best *independent* judgment (blind phase score) and who was best at *integrating new information* (revision phase improvement). These are two different skills. Both are valuable. And Baycast measures both.

---

## Why It Matters Now

The timing isn't coincidental. The prediction market industry is at an inflection point where its structural flaws are becoming impossible to ignore.

The **insider trading problem** has crystallized. When platforms show real-time aggregates and allow unlimited trading with real money, they create a perfect environment for manipulation. The Business Insider investigation found $143 million in "anomalous" profits — not from good forecasting, but from informed traders exploiting information asymmetries before the broader market could react.

The **regulatory freight train** is accelerating. Romania blocked 300 prediction market sites and created a €5 million gambling addiction fund. Google now restricts prediction market advertising to CFTC-regulated platforms only. Congressional committees have declared "the status quo is unsustainable." Multiple states have active lawsuits against prediction market operators.

And then there's the **herding problem** — the intellectual flaw that started this whole discussion. Every major prediction platform (Polymarket, Kalshi, Metaculus, Manifold) shows you the current market price or community median before you place your forecast. It's baked into the UX. Nobody questions it because it *feels* like more information should make you better. But the research says otherwise.

The IARPA-funded **Good Judgment Project** provided the most compelling evidence. In their tournaments, structured prediction polling — using methods very similar to the Blind Consensus Protocol — **outperformed prediction markets by 25%**. Not by a little. By a quarter. The intelligence community took notice, and those methods are now used by analysts at some of the most demanding organizations in the world.

---

## Brier Scores: Honesty as the Optimal Strategy

Every prediction on Baycast is scored using the **Brier score** — a proper scoring rule developed by meteorologist Glenn Brier in 1950. The formula is elegantly simple:

**Brier score = (1/N) × Σ(f − o)²**

Where *f* is your forecast probability and *o* is the actual outcome (1 if the event happened, 0 if it didn't).

A Brier score of 0.0 means perfect predictions. A score of 1.0 means you're perfectly wrong every time. Random guessing on a binary question produces a score of approximately 0.25. Most television pundits, when measured against their actual predictions, score around 0.35–0.40.

The critical property of a proper scoring rule is that **honesty is mathematically optimal**. Your best strategy is always to report your true belief. If you genuinely think something is 70% likely, forecasting 70% will maximize your expected score. Forecasting 90% because you're "really confident" will hurt you if you're wrong, and won't help you enough if you're right.

This is fundamentally different from prediction markets, where your optimal strategy depends on the current price, your bankroll, and what you think other people will do. In markets, the game is about being right *relative to the price*. In Brier-scored polling, the game is about being right *relative to reality*. That distinction matters more than most people realize.

We also track your blind phase score and revision phase score separately, so you can see whether you're stronger at independent judgment or at information integration. Over time, this creates a genuine skill profile — not just a P&L statement.

---

## What We Learned Building It

Building the Blind Consensus Protocol taught us a few things that surprised us.

The first was the **UX temptation to show "the answer."** Every instinct says: show users the current consensus. It feels more informative. It feels more engaging. Users expect it because every other platform does it. Resisting this temptation — deliberately hiding information that users want — was one of the hardest design decisions we made.

The second was the **importance of time-locking.** Early prototypes allowed users to see partial aggregates after a few predictions came in. We quickly realized this created a race condition: the earlier you predicted, the less anchoring you experienced, but the less information you had. The fairest design was a hard cutoff — nobody sees anything until the blind phase closes.

The third was that **not everyone should revise.** The protocol rewards conviction as much as calibration. If you predicted 80% blind, the aggregate is 55%, and you still think 80% is right, standing your ground is a valid and valuable signal. The system scores your conviction, not just your conformity.

---

## The Road Ahead

Baycast is in its foundation phase. The prototype is live with 100+ questions across economics, geopolitics, technology, sports, science, and crypto. The Blind Consensus Protocol is fully implemented. Brier scoring is working. Leaderboards are functional.

But the roadmap goes further. We're building toward a future where AI agents participate alongside human forecasters — submitting blind predictions on the same questions, scored on the same Brier scale, competing on the same leaderboard. Imagine Claude, GPT-4, and specialized forecasting models going head-to-head with the best human forecasters, with the protocol ensuring neither side can anchor on the other.

We're also planning portable reputation — on-chain forecasting track records that follow you across platforms. If you're a top-1% calibrated forecaster on Baycast, that should mean something everywhere.

The prediction market industry is about to go through a reckoning. Regulatory pressure, insider trading scandals, and the fundamental flaws of real-time market design are all converging. The platforms that survive will be the ones that take accuracy, integrity, and methodology seriously.

Baycast is built for that world. No gambling. No herding. No whales. No insider trading. Just structured forecasting that actually works — built on 70 years of research into what makes crowds smart.

The blind phase is open. [Submit your first forecast](https://baycast-p.vercel.app).

---

*Where Bayes meets the crowd.*

*Cross-posted from [baycast-p.vercel.app](https://baycast-p.vercel.app) | Open source: [github.com/Smildous/baycast](https://github.com/Smildous/baycast)*
