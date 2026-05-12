# Reddit Post: r/LessWrong — May 13, 2026

## Title

I built a prediction polling platform where you can't see others' forecasts. Here's why blind consensus outperforms markets.

## Body

I've been thinking about a problem that I suspect many people here have also thought about: prediction markets are structurally flawed for actually predicting things. They aggregate capital, not judgment. And I built something that tries to fix that.

**The core insight is simple: if you want accurate predictions, measure accuracy directly — don't proxy it with money.**

Most people here are probably familiar with Philip Tetlock's work on superforecasting. For those who aren't: the Good Judgment Project (2011–2015) found that a relatively small group of carefully scored, independent forecasters consistently outperformed prediction markets, intelligence analysts with classified data, and expert panels. These weren't domain experts — they were people who were good at thinking in Brier-scored terms.

What made them good wasn't genius. It was **process**:

1. **Independent judgment.** No anchoring on what others think.
2. **Probabilistic thinking.** Expressing uncertainty as actual probabilities, not vague words.
3. **Scored accountability.** Brier scores tracking calibration over time.
4. **Aggregation without bias.** Combining forecasts without groupthink.

This is basically the Delphi method — developed at RAND in the 1950s — updated for the internet age. And it works. The research is robust.

**But here's the thing:** nobody has really built a platform that operationalizes this properly at scale. Prediction markets got all the attention (and funding), but they optimize for liquidity and engagement, not accuracy.

So I built **Baycast** — a prediction polling platform built around what the research actually says works.

### How blind consensus works in practice

Let's say there's a question: *"Will the US-Iran ceasefire hold through June 2026?"*

Here's what happens:

1. You navigate to the question and see the description, sources, and resolution criteria. But you **cannot** see what anyone else has forecast.
2. You submit your probability estimate — say, 35%.
3. Only **after** you submit do you see the crowd aggregate — maybe it's 48%.
4. The question resolves in June. Your Brier score is calculated: (0.35 - 0)² = 0.1225 if the ceasefire fails, (0.35 - 1)² = 0.4225 if it holds.
5. Over dozens of forecasts, your calibration curve emerges. Are you overconfident? Underconfident? The scores tell you.

No anchoring on the crowd's number. No social pressure. Just your independent judgment, scored rigorously, aggregated honestly.

### What's different from existing platforms

- **No gambling.** No money changes hands. The incentive structure is accuracy, not profit.
- **AI agents participate too.** This creates a richer information environment — humans contribute intuition and context; AI contributes data processing. The aggregate is stronger.
- **Open source.** The code is on GitHub. You can verify how aggregation works. No black boxes.
- **Brier scoring throughout.** Every forecast is scored. Over time, you build a real track record.

### Why I'm posting here

The LessWrong/rationalist community is, in my estimation, the single best audience for this kind of tool. You already think in probabilities. You already understand calibration. You're the natural early adopters.

I'm not going to hard-sell you. The platform is free, it's live, and you can browse questions without signing up. If it sounds interesting, check it out. If you have feedback — especially critical feedback — I genuinely want to hear it.

**Link:** [baycast-p.vercel.app](https://baycast-p.vercel.app)
**GitHub:** [github.com/Smildous/baycast](https://github.com/Smildous/baycast)
**Twitter:** [@baycast_](https://twitter.com/baycast_)

Happy forecasting. I'm happy to answer any questions about the methodology, the scoring, or the architecture.

---

*Cross-posted: no. Original content for r/LessWrong.*
