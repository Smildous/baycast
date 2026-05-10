# Baycast Community Outreach Playbook — Week 2 Acquisition

**Date:** May 12, 2026  
**Status:** READY TO EXECUTE  
**Goal:** 50 registered users by end of Week 2 (May 16)  
**Platform:** baycast-p.vercel.app

---

## Quick Reference: Anti-Spam Rules (READ FIRST)

1. **Read community rules** before posting anything. Every subreddit, Discord, and Slack has them pinned.
2. **Earn credibility before self-promoting.** Spend 2–3 days commenting with value before posting about Baycast.
3. **Never drop a link as the first interaction.** Lead with insight, ask a question, share a resource.
4. **Always disclose affiliation.** "I built this" builds trust. Stealth marketing gets you banned.
5. **Customize every post.** Never copy-paste the same content across communities.
6. **If a post gets downvoted, do not repost.** Analyze why, adjust, try a different angle days later.
7. **Don't ask for upvotes or signups.** Let the content sell itself.

---

## Top 15 Communities to Target

### 1. r/Superforecasters

| Field | Details |
|-------|---------|
| **URL** | https://reddit.com/r/Superforecasters |
| **Size** | ~3K members |
| **Posting Rules** | Self-promotion allowed if labeled and substantive. Be methodical. No low-effort posts. |
| **Best Angle** | Methodology deep dive — BCP as a modernized Delphi method. Ask for protocol design feedback. |
| **Best Time** | Tuesday–Thursday, 9–11 AM ET |

**Sample First Post:**

> **Title:** Implementing the Delphi method for digital forecasting — seeking feedback on my Blind Consensus Protocol design
>
> Hi all — I'm building a prediction polling platform called Baycast and I'd love this community's feedback on the protocol design.
>
> **The core idea:** Before you see the community's aggregate probability estimate, you must commit your own. After commitment, the aggregate is revealed and you can revise.
>
> This is essentially a digitized Delphi method with proper scoring rules. Some design decisions I'm wrestling with:
>
> 1. **Revision mechanics:** Should revisions be unlimited or capped? The Good Judgment Project used 1–2 revision rounds. I'm planning 2 rounds (blind → reveal → revise → final).
> 2. **Scoring:** Brier scores are the obvious choice, but should I weight early predictions more heavily to incentivize independent thinking?
> 3. **Aggregation method:** Simple median? Trimmed mean? Log-odds weighted average?
> 4. **Anti-gaming:** Without money, the main incentive is reputation. How do I prevent Sybil attacks or low-effort predictions?
>
> Prototype: baycast-p.vercel.app | Open source: github.com/Smildous/baycast
>
> I'd especially appreciate feedback from people with experience in structured forecasting tournaments or calibration training. What would make this genuinely useful to you?

---

### 2. r/predictionmarkets

| Field | Details |
|-------|---------|
| **URL** | https://reddit.com/r/predictionmarkets |
| **Size** | ~15K members |
| **Posting Rules** | Self-promo allowed with [Self] tag. Must add value. No spam. |
| **Best Angle** | The herding problem — why showing odds before predicting degrades signal. Position Baycast as the non-gambling alternative. |
| **Best Time** | Tuesday–Thursday, 8–10 AM ET |

**Sample First Post:**

> **Title:** I built a prediction platform where you CAN'T see the crowd before you predict. Here's why that matters. [Self]
>
> Every major prediction platform shows you the current odds before you predict. Polymarket shows the price. Metaculus shows the median. Manifold shows the odds.
>
> Research says this is a problem: when people see the aggregate before predicting, their answers shift 10–20% toward the consensus. That's not wisdom of crowds — that's anchoring. The independent signal that makes crowds smart gets systematically destroyed.
>
> The IARPA-funded Good Judgment Project demonstrated that blind, structured forecasting (where you can't see others' estimates until after committing) outperformed prediction markets by 25%.
>
> So I built a prototype: **Baycast** (baycast-p.vercel.app). It uses a Blind Consensus Protocol inspired by the Delphi method:
> 1. Submit your prediction *without* seeing what others think
> 2. After the blind phase closes, the aggregate is revealed
> 3. You can revise once with full context
>
> No money. No gambling. Brier-scored collective intelligence. Open source: github.com/Smildous/baycast
>
> Does the herding problem resonate with you? Would you use a platform that prevents it? What am I missing?

---

### 3. r/statistics

| Field | Details |
|-------|---------|
| **URL** | https://reddit.com/r/statistics |
| **Size** | ~1.8M members |
| **Posting Rules** | High quality bar. Must include methodology or data. No pure promotion. Use flairs. |
| **Best Angle** | Brier score calibration analysis. Ask about proper scoring rules and aggregation methods. |
| **Best Time** | Monday–Wednesday, 10 AM–12 PM ET |

**Sample First Post:**

> **Title:** [D] How should I aggregate blind probability estimates? Comparing median, trimmed mean, and log-odds for a Delphi-style forecasting platform
>
> I'm building a prediction polling platform where users submit probability estimates *blind* (without seeing the crowd), then the aggregate is revealed and they can revise. Think: digitized Delphi method.
>
> The question: what's the best aggregation method for the blind round?
>
> - **Simple median:** Robust to outliers, but ignores confidence levels
> - **Trimmed mean:** Slightly better calibration, but parameter-sensitive
> - **Log-odds weighted average:** Theoretically optimal for probability aggregation (Satopää et al., 2014), but breaks at 0 and 1
> - **Voting-based:** Treat each estimate as a vote toward a bucket
>
> The platform uses Brier scores. After the blind phase, users see the aggregate and can revise once. I want to compare blind-round vs revised-round calibration.
>
> Would love input from statisticians here. What aggregation method would you trust most? Are there methods I'm missing?
>
> More on the protocol: baycast-p.vercel.app | Code: github.com/Smildous/baycast

---

### 4. r/datascience

| Field | Details |
|-------|---------|
| **URL** | https://reddit.com/r/datascience |
| **Size** | ~2.2M members |
| **Posting Rules** | Career/promotion posts restricted. Must be substantive. Use [D] or [P] flairs. |
| **Best Angle** | Data quality angle — why blind forecasts produce cleaner training data. Frame as a data science problem. |
| **Best Time** | Tuesday–Thursday, 9–11 AM ET |

**Sample First Post:**

> **Title:** [D] Why prediction market data is contaminated by herding — and what blind forecasting data looks like instead
>
> There's growing interest in using prediction market data (Polymarket, Metaculus) for ML models and forecasting benchmarks. But I think there's a fundamental data quality problem: **herding contamination**.
>
> When humans see the current market price or community median before predicting, their estimates shift 10–20% toward the crowd. The training data doesn't reflect independent judgment — it reflects independent judgment + anchoring + social influence.
>
> I built a small platform (Baycast) that implements a Blind Consensus Protocol — users predict before seeing the crowd, similar to the Delphi method. The blind-round data should be "cleaner" as training data for forecasting models.
>
> The question for this community: has anyone compared model performance on herding-contaminated vs. clean probability estimates? Would blind forecasts be a better benchmark for AI forecasting systems?
>
> Prototype: baycast-p.vercel.app | Open source: github.com/Smildous/baycast

---

### 5. r/MachineLearning

| Field | Details |
|-------|---------|
| **URL** | https://reddit.com/r/MachineLearning |
| **Size** | ~3.2M members |
| **Posting Rules** | Very strict. Self-promotion in [P] tag only. Must be novel research. High bar for discussion posts. |
| **Best Angle** | AI forecasting benchmarking — blind human forecasts as evaluation data. Position as a research question, not a product. |
| **Best Time** | Monday–Wednesday, 10 AM–12 PM ET |

**Sample First Post:**

> **Title:** [D] Are blind human probability forecasts better benchmarks for AI prediction systems than prediction market data?
>
> Metaculus recently launched FutureEval for benchmarking AI forecasting systems using prediction market/community data. But I think there's an issue: **prediction data is contaminated by herding**.
>
> When humans see the community median or market price before predicting, their estimates shift 10–20% toward the consensus (anchoring effect). So the training/evaluation data doesn't represent independent human judgment — it's a mix of signal + social influence.
>
> I built a platform that implements blind forecasting (Delphi method): users commit their probability estimate before seeing anyone else's. The resulting data should be cleaner for AI benchmarking purposes.
>
> Question: has anyone in the ML community looked at herding contamination in forecasting data? Are there existing datasets of blind probability estimates? Would this be useful for evaluating AI forecasting agents?
>
> Code: github.com/Smildous/baycast

---

### 6. r/artificial

| Field | Details |
|-------|---------|
| **Size** | ~500K members |
| **Posting Rules** | Quality discussion preferred. Self-promotion tolerated if substantive. |
| **Best Angle** | AI forecasting + human calibration. Why blind human predictions are better training data for AI prediction models. |
| **Best Time** | Monday–Wednesday, 11 AM–1 PM ET |

**Sample First Post:**

> **Title:** Why blind human forecasts might be better training data for AI prediction models
>
> There's been a lot of discussion about using prediction market data to train and evaluate AI forecasting systems. But I think there's a fundamental problem: **the data is contaminated by herding.**
>
> When humans see the current market price or community median before predicting, their estimates shift 10–20% toward the crowd. The training data doesn't reflect genuine independent human judgment — it reflects independent judgment + anchoring + social influence.
>
> For AI benchmarking, you want clean signal. "What would a human predict if they only had the question and their own knowledge?"
>
> I built a platform called Baycast that implements a Blind Consensus Protocol — users predict before seeing the crowd, similar to the Delphi method. The outputs are cleaner human probability estimates without herding contamination.
>
> Would blind human forecasts be a better benchmark for AI forecasting systems? Has anyone looked at this?
>
> Prototype: baycast-p.vercel.app | Open source: github.com/Smildous/baycast

---

### 7. r/Futurology

| Field | Details |
|-------|---------|
| **URL** | https://reddit.com/r/Futurology |
| **Size** | ~17M members |
| **Posting Rules** | No self-promotion without mod approval. Quality content only. Big-picture thinking. |
| **Best Angle** | The future of collective intelligence. Why prediction markets aren't the best tool for understanding what's coming. |
| **Best Time** | Monday–Thursday, 10 AM–12 PM ET |

**Sample First Post:**

> **Title:** Prediction markets are booming — but they may not be the best way to forecast the future. Here's why.
>
> Polymarket is worth $9B. Kalshi is worth $22B. Prediction markets are having their moment. But there's a problem the hype is ignoring: **prediction markets show you the crowd's answer before you commit your own.**
>
> This creates herding. Research shows seeing the aggregate shifts your estimate 10–20% toward the consensus — destroying the independent signal that makes crowds smart. The IARPA-funded Good Judgment Project demonstrated that blind forecasting (no peeking at others' answers) outperformed prediction markets by 25%.
>
> The Delphi method — developed by RAND Corporation in the 1950s — has been used for decades in defense, healthcare, and technology forecasting precisely because it prevents this herding effect.
>
> I built a web platform that modernizes this approach: you predict blind, then see the crowd and can revise. No money, no gambling, no crypto. Just scored collective intelligence using Brier scores.
>
> Is the prediction market boom heading in the wrong direction? I'd love this community's take.
>
> baycast-p.vercel.app

---

### 8. r/technology

| Field | Details |
|-------|---------|
| **URL** | https://reddit.com/r/technology |
| **Size** | ~15M members |
| **Posting Rules** | Very high bar. Must be substantive tech news/discussion. Self-promotion almost always removed. **Approach with extreme caution — build karma first.** |
| **Best Angle** | Regulatory angle — prediction markets under investigation. Baycast as the manipulation-proof alternative. |
| **Best Time** | Tuesday–Thursday, 8–10 AM ET |

**Sample First Post:**

> **Title:** Prediction markets are under investigation for insider trading. I built an alternative that can't be manipulated by design.
>
> Congress is investigating prediction markets. Three congressional candidates were suspended for betting on their own races. A French trader made $85M on election markets. Wisconsin, Massachusetts, and New York have active lawsuits.
>
> The core problem is structural: prediction markets show the aggregate in real-time and money is on the line. This creates incentives for manipulation, insider trading, and herding.
>
> I built an alternative called Baycast that takes a different approach:
> - **No money involved** — not gambling, not a market, not regulated as a financial product
> - **Blind predictions** — you can't see what others think before you commit (prevents herding and manipulation)
> - **Proper scoring** — Brier scores track accuracy over time (same method used by the Good Judgment Project, which outperformed prediction markets by 25%)
> - **Open source** — github.com/Smildous/baycast
>
> Inspired by the Delphi method (RAND Corporation, 1950s) and used by intelligence agencies for decades. We just modernized it for the web.
>
> Is there a better path for collective forecasting than prediction markets? Would love to hear what this community thinks.

---

### 9. r/Economics

| Field | Details |
|-------|---------|
| **URL** | https://reddit.com/r/Economics |
| **Size** | ~3.5M members |
| **Posting Rules** | Academic quality preferred. No low-effort posts. Self-promotion frowned upon. |
| **Best Angle** | Market design / mechanism design angle. The herding problem as a market failure in prediction markets. |
| **Best Time** | Tuesday–Thursday, 9–11 AM ET |

**Sample First Post:**

> **Title:** Prediction markets have a herding problem that no one is fixing — the Delphi method might be the better mechanism
>
> Prediction markets are celebrated for aggregating information, but there's a well-documented flaw: when traders can see the current price before trading, their behavior is influenced by anchoring. Research shows this shifts estimates 10–20% toward the consensus — destroying the independent signal that makes markets informationally efficient.
>
> The IARPA-funded Good Judgment Project (Tetlock et al.) demonstrated that structured forecasting — where predictors commit blind, then see the aggregate and revise — outperformed prediction markets by 25%.
>
> This is essentially the Delphi method, a mechanism from the 1950s that was designed specifically to avoid herding in expert estimation. It's been validated across defense, healthcare, and technology forecasting.
>
> I built a web platform that implements this: Baycast. Blind predictions → reveal → revision → Brier scoring. No money, no market mechanics.
>
> From a mechanism design perspective: is the herding problem in prediction markets a fundamental flaw or a feature? Would love economists' perspectives.
>
> baycast-p.vercel.app | github.com/Smildous/baycast

---

### 10. r/TrueReddit

| Field | Details |
|-------|---------|
| **URL** | https://reddit.com/r/TrueReddit |
| **Size** | ~1.5M members |
| **Posting Rules** | Long-form, thoughtful discussion only. No self-promotion. No short posts. Must stimulate discussion. |
| **Best Angle** | Write a thoughtful long-form post about the philosophy of prediction, herding, and collective intelligence. **Do not mention Baycast in the post.** Mention it in comments only if asked. |
| **Best Time** | Monday–Wednesday, 10 AM–12 PM ET |

**Sample First Post:**

> **Title:** The herding problem: why seeing what the crowd thinks makes crowds less intelligent
>
> We tend to assume that showing people what the crowd thinks helps them make better predictions. Every prediction market, every prediction platform, every odds display operates on this assumption.
>
> But the research tells a different story. When people see the aggregate before forming their own estimate, their predictions shift 10–20% toward the consensus (the anchoring effect). The independent information that makes crowds smart — the unique knowledge, the diverse perspectives — gets systematically destroyed.
>
> This isn't a new insight. The RAND Corporation identified this problem in the 1950s and developed the Delphi method specifically to prevent it: experts submit estimates independently, then see the aggregate and can revise. The blind round captures genuine independent judgment. The revision round captures learning.
>
> The IARPA-funded Good Judgment Project validated this approach at scale: their forecasters (using blind structured methods) outperformed prediction markets by 25%. Philip Tetlock's "Superforecasters" used similar techniques.
>
> So why does every modern prediction platform still show you the crowd before you commit? Is it because herding is good for engagement (you feel smarter agreeing with the majority)? Or is there a genuine information aggregation argument I'm missing?
>
> I'd be curious to hear this community's thoughts on the tradeoff between transparency and independence in collective forecasting.

---

### 11. r/PhilosophyofScience

| Field | Details |
|-------|---------|
| **URL** | https://reddit.com/r/PhilosophyofScience |
| **Size** | ~200K members |
| **Posting Rules** | Academic tone. Must engage with philosophical concepts. Low tolerance for promotion. |
| **Best Angle** | Epistemology of prediction. The Delphi method as a truth-seeking mechanism vs. prediction markets as information aggregation. |
| **Best Time** | Tuesday–Thursday, 10 AM–12 PM ET |

**Sample First Post:**

> **Title:** Prediction without consensus: does the Delphi method offer a better epistemological model for collective forecasting than prediction markets?
>
> Prediction markets are often cited as an example of "the wisdom of crowds" in action — the aggregate price is treated as an approximation of the probability of an event.
>
> But there's an epistemological problem: if traders can see the current price before trading, their beliefs are influenced by the aggregate. This creates a feedback loop where the "wisdom of the crowd" is partly just the crowd following itself. The independent justification for each trader's belief is contaminated by social influence.
>
> The Delphi method takes a different epistemological approach: experts commit to their estimates *before* seeing the aggregate. This preserves the independence of each judgment. The aggregate is then revealed, and experts can revise — but the blind round captures something that prediction markets cannot: genuinely independent probability estimates.
>
> I'm interested in this community's perspective: is there a meaningful epistemological difference between these two approaches? Does the independence of the blind round matter for the truth-tracking properties of the aggregate? Or is the revision round sufficient to correct for herding?

---

### 12. Metaculus Community (Forum/Discord)

| Field | Details |
|-------|---------|
| **URL** | https://www.metaculus.com (Forum) + Discord invite via site |
| **Size** | ~50K+ registered users, active Discord |
| **Posting Rules** | Be respectful. Self-promotion of competing platforms may be moderated. Engage as a community member first. |
| **Best Angle** | Collaboration, not competition. Acknowledge Metaculus as the gold standard. Frame Baycast as exploring the blind-forecasting dimension that Metaculus doesn't cover. |
| **Best Time** | Weekdays, 10 AM–2 PM ET |

**Sample First Post:**

> **Title:** Exploring blind forecasting — would the Metaculus community be interested in a Delphi-style protocol comparison?
>
> Long-time Metaculus admirer here. I've been researching the herding problem in prediction platforms and built a small prototype that implements a Blind Consensus Protocol — essentially a digitized Delphi method where you commit your prediction before seeing the community median.
>
> I'm not trying to compete with Metaculus — you're the gold standard for open forecasting. But I think there's an interesting research question: how do blind-round predictions compare to Metaculus-style open predictions in terms of calibration and Brier scores?
>
> Would anyone here be interested in participating in a small comparison study? Same questions, same resolution, but one round is blind and one is open. The results could be genuinely useful for the forecasting community.
>
> Prototype: baycast-p.vercel.app | github.com/Smildous/baycast

---

### 13. Good Judgment Open / Superforecaster Community

| Field | Details |
|-------|---------|
| **URL** | https://www.gjopen.com + associated Discord/Slack |
| **Size** | ~20K+ active forecasters |
| **Posting Rules** | Be respectful of the platform. Don't poach users. Focus on methodology discussion. |
| **Best Angle** | Methodology enthusiast. Discuss the Delphi method, Brier scoring, and structured forecasting techniques. |
| **Best Time** | Weekdays, varies by question cycle |

**Sample First Post:**

> Hi everyone — I'm a forecasting methodology enthusiast and I built a small platform that implements a Blind Consensus Protocol (digitized Delphi method with Brier scoring). I'd love to get feedback from this community since GJO forecasters are exactly the kind of people who'd notice if the protocol is well-designed.
>
> Key question: how important is the blind-round requirement? I've read the GJP research showing that structured methods outperform markets, but I'm curious about practical experience. Do you find that seeing the community median before predicting changes your estimates? Would a blind-first approach be useful for training calibration?
>
> baycast-p.vercel.app | github.com/Smildous/baycast

---

### 14. ACX / LessWrong Community

| Field | Details |
|-------|---------|
| **URL** | https://www.lesswrong.com + Astral Codex Ten Substack comments |
| **Size** | ~50K+ (LW) + ~100K+ (ACX readers) |
| **Posting Rules** | High intellectual bar. Must be precise, well-reasoned. LW has strict quality norms. |
| **Best Angle** | Rationality angle — the epistemic value of independent prediction. Bayesian reasoning applied to forecasting. |
| **Best Time** | Weekdays, 10 AM–2 PM ET |

**Sample First Post:**

> **Title:** Why I think blind forecasting is epistemically superior to open prediction — and a request for steelmanning
>
> Prediction platforms (Metaculus, Manifold, Polymarket) all show you the community's aggregate before you predict. This seems like a feature — more information! — but I think it's actually a bug.
>
> The argument: when you see the aggregate, your prediction is influenced by it (anchoring bias, ~10–20% shift toward consensus). This destroys the independence of your signal. The aggregate of non-independent estimates is less accurate than the aggregate of independent ones — this is the core insight behind the Delphi method.
>
> The Good Judgment Project validated this: blind structured forecasting outperformed prediction markets by 25% in IARPA tournaments.
>
> I built a platform (Baycast) that implements this: predict blind → see aggregate → revise → Brier scoring.
>
> I'm posting here because I suspect this community will have the strongest counterarguments. So: what am I missing? Is there a reason showing the aggregate first is epistemically better than I think?
>
> baycast-p.vercel.app | github.com/Smildous/baycast

---

### 15. Forecasting / Rationality Discord Servers

| Field | Details |
|-------|---------|
| **URL** | Various — find via Reddit sidebars, LW community links, GJO community |
| **Size** | 100–5K members each |
| **Posting Rules** | Varies by server. Always read #rules first. DM mods before posting about external projects. |
| **Best Angle** | Direct, conversational. Share the prototype and ask for feedback. Be humble. |
| **Best Time** | Evenings and weekends (Discord usage peaks outside work hours) |

**Sample First Post (Discord #general or #projects channel):**

> Hey everyone — I built a prediction polling platform that uses a Blind Consensus Protocol (predict before seeing the crowd, then revise after). It's inspired by the Delphi method and uses Brier scores. No money, no crypto, just scored forecasting.
>
> I'm looking for people who'd be willing to try it and give honest feedback on the UX and protocol design. Is this the right place to share, or is there a better channel?
>
> baycast-p.vercel.app

---

## Engagement Strategy

### Phase 1: Credibility Building (Days 1–3)

Before posting about Baycast in any community:

1. **Find 3–5 active threads** in the target subreddit/community
2. **Write thoughtful comments** that add value — share research, answer questions, offer analysis
3. **Do not mention Baycast** in these initial comments
4. **Goal:** 5–10 substantive comments per community before any self-promotional post

### Phase 2: Value-First Posting (Days 3–7)

1. **Post the sample content above** (customized, never copy-pasted identically)
2. **Stay online for 2 hours** after posting — respond to every comment within 30 minutes
3. **Upvote thoughtful comments** (even critical ones)
4. **Never get defensive** — thank critics, engage substantively, link to research

### Phase 3: Relationship Building (Ongoing)

1. **Follow up on threads** 24 hours later with additional insights
2. **DM active participants** who seem genuinely interested — invite them to test the platform
3. **Cross-reference interesting comments** in future posts
4. **Track referral traffic** from each community using UTM parameters

### Responding to Criticism

| Criticism | Response Approach |
|-----------|-------------------|
| "This is just a poll" | Acknowledge — it IS polling, but with Brier scoring and blind-first mechanism. The Good Judgment Project used similar methods and outperformed markets by 25%. |
| "How is this different from Metaculus?" | Metaculus is our closest cousin. Key difference: Metaculus shows the median before you predict. We don't. Small UX change, big accuracy impact (10–20% anchoring). |
| "How do you make money?" | We don't yet — this is a prototype. Long-term: B2B partnerships, premium features, API access. Core platform stays free and open. |
| "This will never work" | Appreciate the skepticism. Point to the evidence: GJP beat markets by 25%, Delphi method validated across 70+ years of research. The proof will be in the data. |
| "No skin in the game = no signal" | Fair concern. Reputation-based incentives work for Superforecasters. Also: skin in the game creates manipulation incentives (insider trading on Polymarket/Kalshi). Tradeoff exists. |
| "Nobody will use this without money" | Manifold uses play money and has an active community. Stack Overflow runs on reputation. Wikipedia runs on nothing. Intrinsic motivation exists. |

---

## Posting Schedule: Week 2 (May 12–16)

| Day | Community | Action |
|-----|-----------|--------|
| **Mon May 12** | r/MachineLearning, r/artificial | Post AI benchmarking angle |
| **Tue May 13** | r/technology, r/Economics | Post regulatory/market design angle |
| **Wed May 14** | r/Superforecasters, r/predictionmarkets | Post methodology / herding angle |
| **Thu May 15** | r/statistics, r/datascience | Post aggregation/scoring methodology angle |
| **Fri May 16** | Metaculus forum, ACX/LessWrong | Post collaboration/research angle |
| **Ongoing** | Discord servers, Slack groups | DM-based outreach + casual mentions |

**Wait 48+ hours between posts** in different subreddits to avoid spam signals.

---

## Success Metrics

| Metric | Week 2 Target |
|--------|---------------|
| Posts published | 8–10 |
| Upvotes per post (avg) | 20+ |
| Comments per post (avg) | 10+ |
| Prototype visits from communities | 300+ |
| Registered users from communities | 20+ |
| DM conversations started | 10+ |
| Community leader responses (email) | 5+ |
