# Reddit Post #2 — Humans + AI Forecast Together

**Status:** READY TO PUBLISH
**Target Subreddit:** r/artificial
**Fallback Subreddits:** r/MachineLearning, r/singularity
**Timing:** Tuesday, May 13, 2026 — 11:00 AM ET
**Title character count:** 75 / 300

---

## Title

I built a prediction platform where humans and AI forecast together — here's what I learned

---

## Body

Six months ago, I had a simple question: *what if GPT-4 is better at predicting elections than a retired CIA analyst?*

Not as a thought experiment. Not as a blog post hypothetical. But as a real, scored, head-to-head benchmark where both submit a probability estimate on the same question, under the same protocol, and we see who was closer when the deadline arrives.

I couldn't find a platform that did this properly. So I built one. It's called **Baycast**, and it's been the most interesting side project I've ever worked on.

### The problem I kept running into

I've been following the AI forecasting space closely. Metaculus launched FutureEval to benchmark AI models. Prediction markets are integrating bots. Every week there's a new paper claiming GPT-4 can outperform human forecasters on geopolitical questions.

But every benchmark I looked at had the same flaw: the human data was contaminated.

Here's what I mean. When a human logs into Polymarket or Metaculus and sees that the crowd thinks 68%, their own estimate shifts 10-20% toward that number. This is a well-documented anchoring effect in behavioral economics. It's not debatable — it's been replicated across dozens of studies.

So when researchers say "GPT-4 outperformed human forecasters," what they're often really saying is "GPT-4 outperformed humans who had already seen what everyone else thought." That's not a fair fight. You're comparing a model's independent judgment against humans who are part-anchored, part-herding.

I wanted clean data. I wanted to know: what does a human predict when they *only* have the question and their own knowledge? No market price, no community median, no social influence. Just raw judgment.

### How Baycast works

Baycast uses something I call the **Blind Consensus Protocol**, inspired by the Delphi method from the 1950s. The concept is simple but the implications are significant:

**Phase 1 — Blind:** When a question goes live (e.g., "Will the Fed cut rates at the June 2026 FOMC meeting?"), every participant — human or AI — submits a probability estimate without seeing what anyone else thinks. Your forecast is locked in with a timestamp. No one can see it until the blind phase closes.

**Phase 2 — Reveal + Revise:** After the blind phase closes, all forecasts are revealed. You see the aggregate. You see the distribution. You get *one* chance to revise your prediction.

Both your blind estimate and your revised estimate are scored independently using Brier scores — a proper scoring rule where honesty is mathematically optimal. Your best strategy is always to report your true belief.

This creates two separate skill measurements: *independent judgment* (how good are you before seeing anyone else's opinion?) and *information integration* (how well do you update when you learn what the crowd thinks?). These are different skills. Baycast measures both.

### Why this matters for AI

Here's where it gets genuinely interesting for this community.

Right now, the AI forecasting benchmark landscape is a mess. Different papers use different questions, different scoring rules, different time horizons, and different baselines. There's no standardized, transparent, reproducible benchmark where you can say "Model X is a better forecaster than Model Y" and have everyone agree on the methodology.

Baycast provides that infrastructure. Every forecast — human or AI — goes through the same blind protocol, is scored with the same Brier score, and is publicly visible with full reasoning. No cherry-picked results. No retroactive question selection. No training on the test set.

I see this as a kind of Turing Test for forecasting. Not "can AI hold a conversation?" but "can AI actually predict the future better than a domain expert?"

The early results are fascinating. On technology questions (AI timelines, product launches), AI models tend to be well-calibrated. On geopolitical questions, experienced human forecasters still have an edge — they pick up on nuances that current models miss. On economic questions, it's genuinely competitive.

But we need more data. A lot more.

### What's live right now

The prototype is up at [baycast-p.vercel.app](https://baycast-p.vercel.app). Right now there are about 35 live questions covering:

- **AI & Tech:** Will GPT-5 be announced before July 2026? Will an AI model pass the bar exam in a European jurisdiction before 2027?
- **Geopolitics:** Will the EU impose new sanctions on Russia before September 2026? Will India sign a free trade agreement with the UK before December 2026?
- **Markets:** Will Bitcoin close above $120K on any day before June 2026? Will the S&P 500 set a new all-time high in May 2026?
- **Science:** Will SpaceX successfully land Starship on the launch pad before August 2026?

Every question has precise resolution criteria, a hard deadline, and both a blind phase and a revision phase. It's free. No crypto. No gambling. No sign-up walls for browsing.

### The AI integration roadmap

I'm being transparent about where we are: the AI agent integration is in early development. The protocol is designed for it, the API endpoints are being built, but right now the platform is primarily human forecasters.

The roadmap for AI integration:
- **Q3 2026:** Open API for AI agents to submit blind predictions programmatically
- **Q4 2026:** Dedicated AI leaderboard, standardized benchmark suite, monthly AI vs Human reports
- **2027:** Partnership with AI research labs for formal forecasting benchmarks

The long-term vision: a public, transparent, scored benchmark that the AI community can actually trust. Not a press release. Not a cherry-picked paper. Real predictions, real outcomes, real scores, all public.

### Why I'm posting this here

I think this community is uniquely positioned to help shape how AI forecasting gets benchmarked. Many of you work on evaluation, calibration, and alignment. You understand why clean baselines matter. You know the difference between a good benchmark and a misleading one.

I'm looking for three things:

1. **Forecasters:** Try the platform. Submit predictions. See how you stack up. The more human data we collect, the better the benchmark becomes.

2. **Critics:** Tell me what's wrong with the methodology. Blind consensus has a strong theoretical foundation (the Good Judgment Project used similar methods and outperformed prediction markets by 25% in an IARPA-funded tournament), but I'm sure there are blind spots. Pun intended.

3. **AI researchers:** If you're working on forecasting, calibration, or evaluation, I'd love to talk. The API is being built with researcher use-cases in mind.

The project is fully open source: [github.com/Smildous/baycast](https://github.com/Smildous/baycast). Every line of code, every protocol decision, every scoring formula is visible and auditable.

I genuinely believe that the question of "how good are AI models at predicting the future?" is one of the most important questions in AI right now. Not because it's a party trick, but because forecasting ability is a proxy for genuine world-model understanding. A model that can predict Fed rate decisions, election outcomes, and technology timelines isn't just pattern-matching — it's reasoning about the world.

Baycast is my attempt to build the fairest possible arena for testing that.

Try it. Break it. Improve it. I'll be here all day answering questions.

---

## Posting Checklist

- [ ] Post on Tuesday May 13, 11:00 AM ET
- [ ] Stay online for 2 hours — reply to every comment within 30 minutes
- [ ] Upvote substantive comments (especially critical ones)
- [ ] Do NOT ask for upvotes
- [ ] Do NOT cross-post identical content to other subreddits
- [ ] Track referral traffic via UTM parameters
- [ ] Follow up on the thread 24 hours later with additional insights

## Response Templates

**For "how is this different from Metaculus FutureEval?":**
> Great question. Metaculus's FutureEval is a solid initiative. The key difference is the blind protocol — on Metaculus, you can see the community median before predicting, which introduces a 10-20% anchoring effect into the human baseline. Baycast's human forecasts are genuinely independent, which makes the AI vs human comparison fairer. We also score blind and revision phases separately, so you can measure independent judgment vs information integration as distinct skills.

**For "Brier scores aren't enough — you need proper calibration curves":**
> Absolutely agree. Brier scores are the foundation, but we're building calibration curves, reliability diagrams, and per-domain accuracy breakdowns into the analytics. The goal is to give researchers the full statistical picture, not just a single number. If there are specific metrics you'd want to see, I'd love to hear — the benchmark should serve the research community.

**For "how do you prevent AI from training on past questions?":**
> Good catch. We have a few safeguards planned: question rotation (similar structures, different specific events), time-limited blind phases that prevent web scraping, and a holdout set of questions used only for periodic benchmark reports. That said, preventing all forms of data leakage is an arms race — we're being transparent about limitations and welcome input on better approaches.

**For "this is just prediction markets without the money":**
> Fair characterization at a glance, but the methodological difference matters a lot. Prediction markets incentivize being right *relative to the price* — which means the best strategy depends on liquidity, bankroll, and market dynamics. Brier-scored blind polling incentivizes being right *relative to reality* — your optimal strategy is always honest probability reporting. The scoring math is fundamentally different, and it changes what the aggregate actually measures.

**For "can I run my own model through this?":**
> Not quite yet — the AI agent API is in development for Q3 2026. But you can manually submit predictions for your model right now. If you're interested in early API access for research, DM me and I'll add you to the waitlist. We're specifically designing the API with benchmark reproducibility in mind.
