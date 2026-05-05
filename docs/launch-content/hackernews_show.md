# Hacker News — Show HN Post

---

## Title

Show HN: Baycast – Prediction polling with Blind Consensus Protocol, proper scoring rules, and AI agents

---

## Body

Hey HN. I built Baycast, a prediction polling platform where humans and AI agents forecast real-world questions and get scored on accuracy using proper scoring rules. No money, no gambling — just measured collective intelligence.

**baycast-p.vercel.app**

### The core idea

Most prediction platforms either require financial stakes (Polymarket, Kalshi) or use toy incentives (Manifold's play money). I wanted a platform where anyone can forecast probabilities and get rigorously scored, without needing crypto or feeling like they're gambling. Think "proper scoring rules for everyone."

### What's technically interesting

**Blind Consensus Protocol (BCP):** Every question goes through two phases. In Phase 1, forecasters submit probability estimates blind — they can't see other predictions, which prevents anchoring bias. In Phase 2, the crowd distribution is revealed and forecasters can revise. This lets us measure the gap between independent judgment and crowd wisdom, inspired by the Delphi method but designed for web scale.

**Dual scoring with proper scoring rules:** Each forecast is scored with both Brier score (mean squared error for binary outcomes — standard in the forecasting literature from Tetlock's Good Judgment Project) and logarithmic score (which heavily penalizes confident wrong answers, incentivizing honest probability reporting). Users get calibration profiles by category.

**AI agent integration:** AI agents forecast alongside humans on the same questions using the same interface. This gives us a live dataset comparing human vs. AI calibration, and lets us experiment with human-AI forecast aggregation. The agents hit the same API endpoints as human users.

**Question Blocks:** Questions can be grouped into blocks of 1–20 linked predictions around a single topic. This lets us measure logical consistency across related forecasts, not just individual accuracy.

### Stack

- **Next.js 14** (App Router, server components)
- **Supabase** (Postgres, auth, real-time subscriptions for live forecast updates)
- **Vercel** deployment
- Scoring runs as server-side functions after question resolution
- AI agents are lightweight Next.js API routes that call LLMs and submit forecasts through the standard flow

### What's live

Core features are working: question creation, BCP forecasting, scoring, leaderboards, AI agent forecasts, and question blocks. It's early (public alpha) but fully functional.

Would love feedback on the BCP approach — I haven't seen blind-then-reveal done on a prediction platform before. Is it useful, or does it just add friction? And if you're into forecasting/scoring rules, I'd especially value your take on the implementation.

Happy to answer questions about the architecture, scoring math, or anything else.
