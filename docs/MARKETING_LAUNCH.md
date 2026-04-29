# Baycast — Marketing Launch Materials

> *Where blind consensus meets scored intelligence*
> Proto: [baycast-p.vercel.app](https://baycast-p.vercel.app) | Code: [github.com/Smildous/baycast](https://github.com/Smildous/baycast)

---

## 1. Launch Tweet Thread (Smil's Personal Account)

**8 tweets. Post as a thread.**

---

**Tweet 1/8**

I've been thinking about why prediction markets and polling platforms keep getting consensus wrong.

The answer: everyone can see everyone else's answers before they commit.

So I built something different. Introducing Baycast.

🧵👇

---

**Tweet 2/8**

Here's the problem with how we do predictions today:

Polymarket — great liquidity, but it's crypto-gambling. Your edge is capital, not insight.
Metaculus — solid research, but the UI hasn't evolved and it's getting absorbed.
Manifold — fun, but play-money limits seriousness.
Kalshi — US-only, regulated, slow.

None of them solve the fundamental signal problem.

---

**Tweet 3/8**

The signal problem: when you see what others predict *before* you answer, you anchor. Herding is real. The "wisdom of crowds" only works when the crowd is actually independent — which it almost never is on these platforms.

Baycast fixes this with the Blind Consensus Protocol (BCP).

---

**Tweet 4/8**

How BCP works, simply:

**Phase A — Blind Phase:** Everyone submits their prediction privately. No one sees anyone else's answer. Pure, unanchored signal. Think of it as the Delphi method, but actually enforced by the system.

**Phase B — Revision Phase:** After everyone commits, the aggregate is revealed. You can revise *once* — but your original blind answer still counts for scoring.

---

**Tweet 5/8**

This matters because it gives you two data points per person:

1. What they actually think (blind, unanchored)
2. How they react to the crowd (revision)

That revision delta is *incredibly* informative. It tells you who has genuine conviction vs. who herds. No other platform captures this.

---

**Tweet 6/8**

Baycast also does dual scoring. You're evaluated not just on accuracy (Brier score), but on calibration — do your confidence levels match your actual hit rate?

This matters for real-world decision-making. A forecaster who says "70%" and is right 70% of the time is more useful than one who's right 80% of the time but says "90%."

---

**Tweet 7/8**

The vision: a platform where humans and AI agents forecast side by side. Same questions, same scoring, same blind protocol.

Are LLMs actually good at predicting? We'll find out — with real data, not vibes.

Phase 1 is human-only. AI agents come next.

---

**Tweet 8/8**

Baycast is free. No crypto, no gambling, no play money. Just scored predictions with a protocol designed to minimize herding and maximize signal.

The proto is live with 10 questions covering tech, geopolitics, and science.

Try it → [baycast-p.vercel.app](https://baycast-p.vercel.app)

I'd love feedback, especially from forecasters and researchers. DMs open.

---

## 2. Product Hunt Launch Draft

### Tagline (60 chars max)

**Prediction polling with blind consensus scoring**

---

### Description (First Comment, ~300 words)

Baycast is a prediction polling platform built around the Blind Consensus Protocol — a two-phase system designed to reduce herding and capture genuine forecasting signal.

**Why it exists:** Every major prediction platform has a signal problem. When forecasters can see the crowd before committing, they anchor. The "wisdom of crowds" assumes independence, but independence is rarely enforced. Baycast fixes this structurally.

**How it works:**
- **Blind Phase:** All predictions are submitted privately, with no visibility into others' answers. This captures your unanchored, genuine belief.
- **Revision Phase:** After the blind window closes, the aggregate is revealed. You get one optional revision — but your original blind answer is preserved and scored independently.

This gives you two signals per forecaster: what they independently believe, and how they respond to the crowd. The delta between these is deeply informative.

**Scoring:** Dual scoring via Brier accuracy and calibration. We measure not just whether you're right, but whether your confidence levels are well-calibrated. This is the metric that actually matters for real-world decision support.

**What it's not:** Baycast is not a gambling platform. No crypto, no real money, no play money. It's a scored forecasting tool for people who take predictions seriously — researchers, analysts, superforecasters, and curious minds.

**What's next:** AI agent integration (humans and LLMs forecasting side-by-side on the same protocol), community features, tournament modes, and open APIs.

The proto is live now with questions spanning technology, geopolitics, and science. We're looking for our first 50 forecasters to stress-test the protocol and scoring system.

---

### 5 Key Features to Highlight

1. **Blind Consensus Protocol (BCP)** — Two-phase prediction system (blind → revision) that structurally prevents herding and anchoring bias
2. **Dual Scoring** — Brier accuracy score + calibration score, giving a complete picture of forecasting quality
3. **Revision Delta Tracking** — Measures the gap between your independent judgment and your crowd-adjusted answer, surfacing conviction vs. herding behavior
4. **Human + AI Forecasting** — Designed from the ground up for humans and AI agents to compete on equal footing (AI integration launching next)
5. **Free, Open Protocol** — No paywalls, no crypto, no gambling. Pure scored forecasting for research and decision support

---

### Upcoming Features Teaser

- 🤖 AI agent integration — LLMs and custom agents forecasting alongside humans
- 🏆 Tournament and leaderboard modes — ranked competitive forecasting
- 🔌 Open API — build on top of Baycast's scoring and protocol
- 📊 Advanced analytics — calibration curves, revision delta distributions, crowd wisdom metrics
- 🌍 Multi-domain question feeds — curated forecasting tracks (tech, geopolitics, markets, science)

---

### Maker Comment (Smil's First Comment)

Hey everyone, I'm Smil — the builder behind Baycast.

A bit of context: I got interested in why prediction platforms consistently fail to capture genuine independent signal. The research on herding, anchoring, and the Delphi method has been around for decades, but nobody's built it into a consumer-grade platform. So I did.

The Blind Consensus Protocol is the core insight: separate the independent signal from the crowd-adjusted signal, score both, and you get something far more useful than a single probability estimate.

This is early — the proto just went up. I'm looking for forecasters, researchers, and anyone who's thought critically about prediction markets to try it and tell me what's broken. The first 50 users will shape what this becomes.

Happy to answer questions about the protocol, the scoring, or anything else. Thanks for checking it out.

---

## 3. First 20 Target Users / Superforecasters

### Tier 1: Core Forecasting Community

| # | Name / Handle | Platform | Why They'd Be Interested | Suggested Outreach |
|---|---|---|---|---|
| 1 | **Philip Tetlock** (@PTetlock) | X/Twitter, Academic | Literally wrote the book on superforecasting. The BCP is a direct implementation of ideas he's advocated for. | Hi Philip — I've built a prediction platform that enforces the kind of independent blind forecasting you described in Superforecasting. Would love your take on the protocol. Prototype at baycast-p.vercel.app |
| 2 | **Barbara Mellers** | Academic (UPenn, Good Judgment) | Co-lead on the Good Judgment Project. Research on accuracy, calibration, and forecasting tournaments. | Hi Barbara — I'm building a platform with blind consensus scoring inspired by the Good Judgment Project methodology. Would value your feedback on the scoring system. |
| 3 | **Nate Silver** (@NateSilver538) | X/Twitter, Substack | Deeply interested in prediction quality, calibration, and crowds. The BCP directly addresses his critiques of prediction markets. | Hi Nate — Built a prediction platform that separates blind independent forecasts from crowd-anchored revisions. The dual scoring (accuracy + calibration) seems right up your alley. Would love your thoughts. |
| 4 | **Scott Alexander** (@slatestarcodex) | Astral Codex Ten | Writes extensively about prediction markets, forecasting, and epistemics. Large rationalist audience. | Hi Scott — I've launched a prediction polling platform with a blind consensus protocol that structurally prevents herding. Thought you and your readers might find the approach interesting. Happy to write a guest post if there's interest. |
| 5 | **Zvi Mowshowitz** (@ZviMowshowitz) | X/Twitter, Substack | Covers forecasting, prediction markets, and AI extensively. Very technical audience. | Hi Zvi — Launching a prediction platform with blind consensus scoring. The protocol is designed to separate genuine signal from herding — seems like something you'd have opinions on. Prototype: baycast-p.vercel.app |
| 6 | **Gwern Branwen** (@gwern) | Personal site, X | Deep interest in prediction, calibration, and methodology. Technical and rigorous. | Hi Gwern — Built a prediction platform enforcing blind independent forecasts with dual scoring (Brier + calibration). Would appreciate your methodological critique. |
| 7 | **Andrew Gelman** (@AndrewGelman) | Blog, X | Statistician interested in forecasting, calibration, and methodological rigor. | Hi Andrew — I've built a platform that separates blind predictions from crowd-revised ones, with proper calibration scoring. Would value your statistical perspective on the approach. |

### Tier 2: Active Platform Forecasters

| # | Name / Handle | Platform | Why They'd Be Interested | Suggested Outreach |
|---|---|---|---|---|
| 8 | **Metaculus Top Forecasters** (various) | Metaculus | Active community of serious forecasters. Metaculus acquisition creates an opening. | Cross-platform post on Metaculus community. Emphasize: similar rigor, new protocol, fresh start. |
| 9 | **Manifold Markets Top Users** (e.g., @Austin, @NightsDragon) | Manifold | Active prediction community, play-money ecosystem. Some want something more serious. | Hey — I'm building a scored prediction platform (no play money, serious scoring) with a blind consensus protocol. Thought a top Manifold forecaster would be a great early tester. |
| 10 | **Linch** (@linchzhang) | X/Twitter, EA Forum | Active forecaster, EA community, interested in forecasting methodology. | Hi Linch — Building a blind consensus prediction platform with dual scoring. The protocol captures both independent judgment and herding behavior. Would love your take as an active forecaster. |
| 11 | **Nuño Sempere** (@NunoSempere) | X/Twitter, Metaculus, EA Forum | Metaculus contributor, forecasting researcher, quantified predictions advocate. | Hi Nuño — Built a platform with blind consensus scoring inspired by the Delphi method. Your work on quantified predictions and forecasting methodology is directly relevant. Would appreciate your feedback. |
| 12 | **Holden Karnofsky** (@holdenkarnofsky) | X/Twitter, Cold Takes | Former Open Philanthropy, writes about forecasting and AI risk. | Hi Holden — Launching a prediction platform with blind consensus protocol and AI agent integration planned. Thought it might be relevant to your forecasting and AI interests. |
| 13 | **Elizabeth Garbee** (@elizabethgarbee) | X/Twitter | Community builder in forecasting/superforecasting space. Good amplification vector. | Hi Elizabeth — Building a prediction platform focused on methodology (blind consensus) over speculation. Would love your input on community-building approach for the forecasting space. |
| 14 | **Jamie Kirby** (Good Judgment / former) | Various | Professional superforecaster, now independent. Interested in forecasting tools. | Hi Jamie — I've built a prediction platform that enforces blind independent forecasting with proper Brier/calibration scoring. Would love a professional superforecaster's assessment. |

### Tier 3: Researchers & Amplifiers

| # | Name / Handle | Platform | Why They'd Be Interested | Suggested Outreach |
|---|---|---|---|---|
| 15 | **Robin Hanson** (@robinhanson) | X/Twitter, Overcoming Bias | Invented prediction markets concept. Academic interest in mechanism design for information aggregation. | Hi Robin — Built a prediction platform that enforces information independence through blind consensus. The mechanism design is directly informed by your work on prediction markets and information aggregation. |
| 16 | **Alex Tabarrok** (@atabarrok) | X/Twitter, Marginal Revolution | Economist, covers prediction markets. Academic audience. | Hi Alex — Launching a prediction platform with blind consensus protocol — essentially a structured mechanism for independent information aggregation. Thought it might interest you and your readers. |
| 17 | **Rohit Krishnan** (@rohitkri) | X/Twitter, Strange Loop Canon | Writes about complex systems, predictions, tech. Large tech audience. | Hi Rohit — Built a prediction platform that uses a two-phase blind consensus protocol to reduce herding in crowd predictions. Thought you'd find the mechanism interesting. |
| 18 | **Eli Dourado** (@elidourado) | X/Twitter | Tech, forecasting, prediction markets. Good signal amplifier. | Hi Eli — Built a blind consensus prediction platform with proper scoring. The approach is specifically designed to fix the herding problem in existing prediction markets. |
| 19 | **Samotsvety** (forecasting group) | Metaculus, EA Forum | Top-performing forecasting team. Serious about methodology. | Hi — I'm building a prediction platform with blind consensus scoring. The protocol captures independent signal separately from crowd-adjusted signal. Would love your team's assessment of the methodology. |
| 20 | **Alexey Turchin** (@AlexeyTurchin) | EA Forum, X | Active forecaster, covers existential risk, AI. | Hi Alexey — Building a blind consensus prediction platform. The protocol is designed to improve signal quality for questions like the ones you forecast on regularly. Would value your early feedback. |

---

### Outreach Notes

- **Timing:** Reach out 3-5 days before public launch to seed early users
- **Personalization:** Each message should reference something specific the person has written about or worked on
- **Low-pressure framing:** "Prototype," "early," "feedback" — not "join my startup"
- **Follow-up:** One follow-up after 5 days if no response. No more.
- **Track:** Use a simple spreadsheet to track outreach, responses, and conversions

---

## 4. Reddit Post Drafts

### Post A: r/predictionmarket

**Title:**

I built a prediction platform that enforces blind forecasting to eliminate herding — here's the protocol

**Body (~350 words):**

I've been frustrated with prediction platforms for a while. Not because of the questions they ask, but because of a structural problem: everyone can see what everyone else predicts before they commit.

This means the "wisdom of crowds" assumption — that forecasters are independent — is violated on basically every platform. You see the Polymarket odds before you bet. You see the Metaculus community median before you predict. You anchor, whether you mean to or not. The research on this is clear: even when you *try* to be independent, exposure to the crowd shifts your estimates by 10-20% on average.

So I built something different: **Baycast**, a prediction polling platform with a **Blind Consensus Protocol (BCP)**.

Here's how it works:

**Phase A (Blind):** You submit your prediction privately. You can't see anyone else's answer. This captures your unanchored, genuine belief.

**Phase B (Revision):** After the blind window closes, the aggregate is revealed. You get one optional revision — but your original blind answer is preserved and scored independently.

Why this matters: you get two data points per forecaster. Their independent judgment *and* their crowd-adjusted answer. The gap between these two is incredibly informative — it tells you who has genuine conviction vs. who herds.

The scoring is dual: Brier accuracy + calibration. Not just "are you right?" but "do your confidence levels match your actual hit rate?"

What it's not: no crypto, no gambling, no play money. Just scored predictions.

The proto is live with 10 questions covering tech, geopolitics, and science: [baycast-p.vercel.app](https://baycast-p.vercel.app)

I'm looking for serious forecasters to stress-test the protocol and scoring system. If you've used Polymarket, Metaculus, Manifold, or Kalshi, I'd genuinely love your feedback on whether the blind consensus approach feels like a real improvement.

Happy to answer questions about the protocol, scoring methodology, or anything else.

---

### Post B: r/superforecasters

**Title:**

A prediction platform with blind forecasts + dual scoring (Brier + calibration) — looking for early forecasters

**Body (~300 words):**

Cross-posting here because this community cares about the *methodology* of forecasting, not just the outcomes.

I'm building **Baycast**, a prediction polling platform that tries to fix what I see as the core problem with existing platforms: they don't enforce forecast independence.

The **Blind Consensus Protocol (BCP)** is a two-phase system:

1. **Blind phase:** You predict without seeing anyone else's answer. Pure independent signal.
2. **Revision phase:** Aggregate is revealed, you can revise once. Your blind answer is still scored separately.

This gives you two scores per forecaster: your independent accuracy and your crowd-adjusted accuracy. The revision delta is a direct measure of herding vs. conviction.

On scoring: the platform uses both **Brier scores** (accuracy) and **calibration scoring** (does your confidence match your hit rate?). Calibration is the metric that actually matters for real-world decision support, and it's under-emphasized on most platforms.

Current state: proto is live with 10 questions (tech, geopolitics, science). Free to use. No crypto, no gambling.

What's planned next: AI agent integration (humans vs. LLMs on the same protocol), tournament modes, open API.

I'm specifically looking for feedback from people who take forecasting seriously — whether you come from Good Judgment, Metaculus, academic research, or just practice it independently. The protocol is novel (as far as I know, nobody's built a consumer platform around blind consensus), and I want to make sure it actually improves signal quality before scaling.

Proto: [baycast-p.vercel.app](https://baycast-p.vercel.app)
Code: [github.com/Smildous/baycast](https://github.com/Smildous/baycast)

What do you think — does blind consensus sound like an improvement over standard crowd forecasting?

---

## 5. Blog Post Outline

### "Why Blind Consensus Beats the Wisdom of Crowds"

**Target: 1,500 words | Audience: Technical, forecasting-curious**

---

#### Section 1: The Independence Assumption (250 words)

- The "wisdom of crowds" (Surowiecki, 2004) rests on four conditions: diversity, independence, decentralization, aggregation
- Independence is the most frequently violated — and the most important
- Every major prediction platform today violates it: Polymarket shows odds, Metaculus shows medians, Manifold shows market prices
- Research: anchoring effects shift estimates 10-20% even when participants are warned about bias (Tversky & Kahneman; numerous replications)
- Thesis: you cannot get true crowd wisdom without enforced independence

#### Section 2: The Herding Problem in Prediction Markets (300 words)

- Information cascades: when early signalers establish a trend, later participants rationally follow even if their private signal disagrees
- In prediction markets specifically: price = information. Seeing the price *is* seeing the crowd's aggregate belief
- Empirical evidence from Polymarket, Metaculus: forecast distributions cluster around the existing median far more than they should
- The revision pattern: when platforms allow revisions (Metaculus, Manifold), the dominant direction is *toward* the crowd, not away — even for top forecasters
- This isn't irrational — it's Bayesian. But it means the final aggregate reflects social information more than independent judgment

#### Section 3: The Blind Consensus Protocol (350 words)

- Core mechanism: separate the independent signal from the social signal
- **Phase A (Blind):** All predictions submitted in isolation. No visibility into others' answers. This is the unanchored signal — what each forecaster actually believes before social influence.
- **Phase B (Revision):** Aggregate revealed. One optional revision allowed. The blind answer is preserved and scored independently.
- Two key outputs per forecaster:
  - Blind prediction → pure independent signal
  - Revised prediction → crowd-adjusted signal
  - **Revision delta** → direct measure of herding tendency and conviction strength
- Why "inspired by Delphi": The Delphi method (Dalkey & Helmer, 1963) used iterative anonymous forecasting to reduce groupthink. BCP is the same insight, but with structural enforcement and a scoring system.
- Why one revision, not unlimited: Prevents gaming. The constraint forces meaningful choice rather than gradual anchoring.

#### Section 4: Dual Scoring — Accuracy Meets Calibration (250 words)

- **Brier score:** Standard accuracy metric. Punishes both wrong predictions and overconfidence. Range [0, 2], lower is better.
- **Calibration score:** Do your "70%" predictions resolve correctly ~70% of the time? This is the metric that matters for decision support.
- Why calibration matters more than raw accuracy: A forecaster who's right 80% of the time but says "95%" every time is *worse* than someone who's right 70% but says "70%." The latter is usable for decision-making; the former is not.
- Reliability diagrams: Visual representation of calibration (bins of confidence vs. actual resolution rate)
- Blind vs. revised calibration comparison: Hypothesis that blind predictions will be *better calibrated* than revised ones (revisions introduce overconfidence from false social consensus)

#### Section 5: Implications and What We're Testing (200 words)

- The Baycast hypothesis: blind consensus aggregates will be as accurate as (or better than) open platforms, *and* better calibrated
- The revision delta as a forecaster quality metric: forecasters with small deltas have high conviction; large deltas suggest they rely on social cues
- AI agent comparison: When we add AI agents, the blind phase eliminates the advantage of "reading the room" — testing genuine predictive capability
- Open questions for the community:
  - Should the blind window be time-based or participation-threshold-based?
  - How should the blind and revised scores be weighted in a composite?
  - Is one revision the right constraint, or should it vary by question complexity?

#### Section 6: Try It / Join the Experiment (150 words)

- Proto live at baycast-p.vercel.app
- 10 questions spanning tech, geopolitics, science
- Free, no account friction
- Looking for first 50 forecasters to generate baseline data
- Open source: github.com/Smildous/baycast
- The goal: build the first prediction platform where we can *prove* that enforcing independence improves aggregate accuracy
- CTA: Try it, share it with forecaster friends, tell us what's broken

---

### SEO / Distribution Notes

- Target keywords: "blind consensus protocol," "prediction polling," "forecasting calibration," "herding in prediction markets"
- Cross-post to: Hacker News (Show HN), LessWrong, EA Forum, relevant Subreddits
- Internal linking: reference from future blog posts on scoring methodology, AI agent results, etc.
- Format: code blocks for scoring formulas, a diagram of the two-phase flow (create separately)

---

## Appendix: Quick Reference

| Item | Status | Link |
|------|--------|------|
| Prototype | Live | baycast-p.vercel.app |
| GitHub | Public | github.com/Smildous/baycast |
| Whitepaper | TBD | — |
| Twitter/X | Smil's personal | — |
| Product Hunt | Draft ready | — |

---

*Prepared for Baycast launch planning. Questions or feedback → Smil.*
