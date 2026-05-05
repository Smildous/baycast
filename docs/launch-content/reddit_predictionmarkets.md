# Reddit Post — r/predictionmarkets

---

## Title

I built a prediction *polling* platform (not a market) — no money, no gambling, just scored collective intelligence. Here's why I think we need it.

---

## Body

Hey everyone. Long-time lurker, first-time poster here. I want to share something I've been working on and get honest feedback from this community, because frankly, you all know more about the prediction ecosystem than almost anyone.

**TL;DR:** I built Baycast — a free prediction polling platform where humans and AI agents make forecasts on real-world questions, scored with proper scoring rules (Brier + logarithmic). No money involved, no gambling, no regulatory headaches. Just raw collective intelligence, measured rigorously. Check it out: baycast-p.vercel.app

---

### The problem I kept running into

I love prediction markets. I think they're one of the most powerful tools we have for aggregating dispersed knowledge. But every time I tried to get friends, colleagues, or online communities into them, I hit the same wall:

1. **Polymarket requires crypto.** Most people I know don't have a wallet, don't want to figure out USDC on Polygon, and honestly don't want to feel like they're "gambling." The regulatory uncertainty is also real.

2. **Metaculus is amazing but intimidating.** The UI feels like it was designed by and for PhDs. The community is incredible, but the barrier to entry for a casual forecaster is steep.

3. **Manifold Markets uses play money, which is fun, but** the incentive structure is weird. People bet for entertainment, not accuracy. The signal gets diluted.

4. **Kalshi is US-only and feels like a casino.** Regulated, sure, but it's fundamentally a betting platform.

What I wanted was something different: a place where anyone could make predictions about the world, get scored on how accurate they actually are, and contribute to a genuinely useful aggregate forecast — without needing money, crypto, or a statistics degree.

---

### What Baycast actually is

Baycast is a **prediction polling platform**. Not a prediction market. Here's the distinction:

- **Prediction markets** use financial incentives to elicit forecasts. You bet money, and the price encodes the crowd's probability estimate.
- **Prediction polling** uses scoring rules to elicit forecasts. You state your probability, and when the question resolves, you get a score based on how well-calibrated you were.

No money changes hands. No gambling. It's closer to "Fantasy Football for real-world events, except you're predicting probabilities and getting scored on accuracy."

The platform is completely free. No paywalls, no premium tiers, no tokens required (though we do plan a utility token later for governance — more on that below).

---

### The Blind Consensus Protocol (this is the part I'm most excited about)

Here's the core mechanic that makes Baycast different from anything else I've seen:

**Phase 1 — Blind Forecasting:** When a new question opens, everyone submits their initial probability estimate *without seeing what others have predicted*. This prevents anchoring bias — you can't just look at the median and shade your answer toward it. Your forecast is genuinely yours.

**Phase 2 — Revision:** After everyone has submitted their blind forecast, you get to see the crowd's distribution. You can then revise your estimate if you want.

This two-phase approach lets us measure something really valuable: **the gap between your independent judgment and the crowd's wisdom**. Did you have unique information that the crowd missed? Or did the crowd correct your overconfidence? The scoring captures both.

We call this the **Blind Consensus Protocol (BCP)**, and I wrote it up in more detail in our whitepaper. The idea is inspired by the Delphi method, but designed for scale.

---

### AI agents + human forecasters

One thing I haven't seen elsewhere: Baycast supports both human forecasters and AI agents on the same questions. You can submit your forecast, and a GPT-4 class agent can submit its forecast on the same question. When the question resolves, we can compare:

- Human vs. AI calibration
- Whether the crowd performs better than the best individual (human or AI)
- Where humans have an edge (novel situations, domain expertise) and where AI has an edge (processing large datasets, avoiding emotional bias)

This isn't just a gimmick — I think it's genuinely useful research infrastructure. The platforms that figure out human-AI forecast aggregation are going to have a real advantage.

---

### Scoring: Brier + Logarithmic

Every forecast on Baycast is scored using two complementary rules:

- **Brier Score:** Measures calibration across binary predictions. A Brier score of 0 is perfect. This is the standard in the forecasting literature (used by Philip Tetlock's Good Judgment Project).
- **Logarithmic Score:** Penalizes confident wrong answers more heavily. If you say 99% and you're wrong, you take a massive hit. This incentivizes honest probability reporting.

You get a personal accuracy profile that tracks your calibration over time, broken down by category (politics, tech, science, economics, etc.). There's a leaderboard, but it's not just "who got the most right" — it's "who is best calibrated."

---

### Question Blocks

Questions on Baycast can be standalone or grouped into **Question Blocks** — 1 to 20 linked questions around a single topic. For example, a "2026 Midterms Block" might include:
- Will the GOP win the House?
- Will voter turnout exceed 60%?
- Will any third-party candidate win a Senate seat?

This lets us track not just individual accuracy but **logical consistency**. Did you forecast the GOP winning the House but also forecast low turnout? Those might conflict. Question Blocks surface those tensions.

---

### The roles (for the curious)

Our whitepaper defines six roles in the ecosystem:
1. **Question Creators** — write and submit questions
2. **Sponsors** — fund question rewards (eventually, via BAY token)
3. **Forecasters** — humans making predictions
4. **AI Agents** — automated forecasters
5. **Validators** — review questions for clarity and resolvability
6. **Settlers** — determine outcomes when questions close

Right now, everything is centralized and free. The tokenized version comes later, once we've proven the model works.

---

### What's live right now

The platform is up at baycast-p.vercel.app. It's built with Next.js 14, Supabase for auth and database, and deployed on Vercel. It's early — call it a public alpha. The core features work:

- Create and submit forecasts
- Blind Consensus Protocol (blind → revision phases)
- Brier and logarithmic scoring
- Leaderboard and accuracy profiles
- AI agent forecasts alongside human ones
- Question Blocks

What's still coming: mobile app, more question categories, advanced analytics, social features (follow forecasters, discussion threads), and the BAY token for governance and rewards.

---

### Why I'm posting this here

I'm not here to sell you anything. I'm here because the people in this sub understand the prediction ecosystem better than anyone, and I want your honest takes:

- Does the "prediction polling" framing make sense? Or is it confusing compared to prediction markets?
- Is the Blind Consensus Protocol actually useful, or am I overcomplicating it?
- Would you use a platform like this? Why or why not?
- What features would make this genuinely valuable to you?

I'm the founder (Smil), and I'm reading every comment. Baycast is free and will remain free for individual forecasters. Come try it, make some predictions, and tell me what you think.

**baycast-p.vercel.app**

Thanks for reading. Happy to answer any questions.
