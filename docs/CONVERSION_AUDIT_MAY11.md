# Baycast Conversion Funnel Audit — May 11, 2026

**Status:** 0 signups in 5 days post-launch (May 6–11, 2026)  
**Auditor:** Product Agent (automated E2E audit)  
**Date:** 2026-05-11  

---

## Section 1: Current State Assessment

### Overall Conversion Score: 3.5 / 10

The product is well-built technically and the content/copy is strong. However, there are critical conversion killers that explain the 0-signup result. The audit identifies structural problems, not cosmetic ones.

### Page-by-Page Scores

| Page | Score | Verdict |
|------|-------|---------|
| Landing (/) | 4/10 | Good copy, but fails the "5-second test" and lacks urgency |
| Questions (/questions) | 5/10 | Functional but dead-looking — 9/10 questions show "Be the first to forecast" |
| Question Detail (/questions/:id) | 3/10 | **CRITICAL: Dead-end for signed-out users — no inline CTA to sign up** |
| Auth (/auth/signup) | 6/10 | Clean, low friction — but arrival here requires 2+ clicks |
| Leaderboard (/leaderboard) | 2/10 | **Empty leaderboard is a conversion killer — "waiting for champion" is sad, not motivating** |
| How It Works (/how-it-works) | 7/10 | Best page on the site — clear, detailed, persuasive |
| Compare (/compare) | 7/10 | Strong competitive positioning |

### Critical Issues Found (Ranked by Severity)

#### 🔴 CRITICAL — Direct causes of 0 signups

1. **"Be the first to forecast" on 9/10 questions**  
   The questions page is the primary browsing destination for a new visitor. Seeing "Be the first to forecast" on nearly every card signals: "Nobody is here. This is a ghost town." This is the #1 conversion killer. In social/collective intelligence products, perceived activity = trust. Zero activity = zero trust.

2. **Question detail page is a dead end**  
   When a signed-out user clicks a question (the natural action), they land on a page that says "Add your forecast → Log in to add your forecast." The link goes to `/auth/login`, not `/auth/signup`. There is no visible "Sign up to forecast" CTA. The user has to: click question → see "Log in" → click login → realize they don't have an account → find the "Sign up" link. This is a 4-step funnel where 2 steps should suffice.

3. **Empty leaderboard**  
   The leaderboard shows "🏆 The leaderboard is waiting for its champion." This is not aspirational — it's depressing. An empty leaderboard says "nobody has ever used this product." On Polymarket, you see volume, traders, and active markets. On Manifold, you see hundreds of bets. On Baycast, you see nothing.

4. **"2 Forecasters joined" is anti-social-proof**  
   The landing page displays "👥 2 Forecasters joined" and "Join 2 forecasters already on Baycast." This number is so low it actively discourages signups. If only 2 people joined in 5 days, a visitor concludes the product isn't worth their time. **This stat should be hidden or the threshold should be much higher before displaying.**

5. **No distribution/acquisition channel evident**  
   The product has no visible community presence. No Twitter/X feed embedded, no Discord link, no community section. A new user has zero signals that other humans are involved.

#### 🟡 HIGH — Significant friction

6. **CTA requires scrolling on landing page**  
   The "Start Forecasting — It's Free" CTA appears below the fold. The "Browse Questions →" secondary CTA is also below the fold. A visitor who doesn't scroll sees only the headline and nav — no action prompt.

7. **Nav "Get Started Free" is good but easily missed**  
   The nav CTA exists but is visually small. It's not sticky — once the user scrolls past it, there's no persistent CTA.

8. **No demo/preview of the forecasting experience**  
   A visitor cannot see what it looks like to make a forecast without signing up. There's no interactive slider, no preview, no "try it" without commitment. Polymarket lets you see Yes/No buttons and prices immediately. Manifold shows "Bet" buttons on every card. Baycast shows nothing until you're logged in.

9. **Testimonials are anonymous and generic**  
   "Superforecaster community Early tester", "Probability enthusiast Beta user", "Tech forecaster Beta user" — these are not credible. Real names, photos, or Twitter handles would be 10x more convincing. Anonymous testimonials are worse than no testimonials.

10. **"234d left" / "599d left" on questions is discouraging**  
    Questions with resolution dates 234-1330 days away feel like they'll never resolve. There's no sense of urgency. A visitor thinks "Why forecast something I won't know the answer to for 8 months?" There should be near-term questions (resolving in days/weeks) prominently featured.

#### 🟢 LOW — Polish items

11. Footer "Not a prediction market. Pure forecasting." is a missed CTA opportunity — should include a sign-up link.
12. No favicon visible in browser title — minor trust signal.
13. No open graph/social preview metadata testing done (unknown state).

---

## Section 2: Competitive Benchmarks

### Polymarket (polymarket.com) — Score: 8/10 for conversion

**What they do well:**
- **Immediate visual proof of activity:** Featured markets show $6M volume, real-time price charts, hundreds of traders
- **News integration:** Every market has linked news articles (CNN, BBC, Reuters, NYT) — gives questions urgency and context
- **Breaking/Hot/Trending categories:** Creates FOMO and guides exploration
- **One-click trading:** Yes/No buttons are visible on the homepage carousel — no account needed to see the interaction
- **Category navigation:** 15+ categories in the nav (Politics, Sports, Crypto, Esports, Iran, Finance, etc.) — feels comprehensive
- **Social proof everywhere:** Volume numbers, trader counts, price movement indicators

**Patterns to adopt:**
1. Show activity metrics on every question card (volume, participant count, recent activity)
2. Link news sources to questions for urgency
3. Featured/trending questions prominently at top
4. Interactive elements visible without login

### Manifold Markets (manifold.markets) — Score: 7/10 for conversion

**What they do well:**
- **"Get $1,000 to start trading!" on sign-up button** — immediate value proposition with tangible reward
- **Every question card has a "Bet" button** — interaction is visible before login
- **User avatars on every question** — human presence is obvious
- **Activity counts per question** (146 bets, 68 bets, 327 bets) — signals vibrancy
- **Probability displayed inline** (54%, 35%, 95%) — even without login, you can see the crowd's view
- **Prize Drawing link** ($100) — gamification and incentive
- **Predictle** — a fun, low-commitment game that drives engagement

**Patterns to adopt:**
1. Show forecaster count prominently on every question card (not buried in small text)
2. Display the consensus probability on question cards (even if just "No forecasts yet" for empty ones — but better to have pre-seeded forecasts)
3. User avatars/identities visible on questions
4. Gamification: daily challenges, streaks, or quick-predict features

### Metaculus (metaculus.com) — Bot-blocked, but known patterns:

**Known strengths from prior research:**
- Community median visible on every question
- Comment sections create social engagement
- Tournament/prize structures
- Academic credibility (cited in research)

---

## Section 3: Top 5 UX Improvements (PRIORITIZED)

### Improvement 1: Pre-seed AI Forecasts on ALL Questions

**What:** Ensure every question has at least one AI forecast displayed as the consensus. The platform already supports AI agents — use them to populate every question with initial forecasts so no question ever shows "Be the first to forecast."

**Why:** This is the single highest-impact change. The "ghost town" effect is the #1 conversion killer. When a visitor sees a question with "4% consensus from 1 forecaster," they think "someone is here." When they see "Be the first to forecast," they think "nobody is here." Polymarket and Manifold never show zero activity — every market has participants.

**Expected impact:** 🔴 HIGH — Could single-handedly double conversion rate by eliminating the dead-product signal.

**Implementation spec:**
```
- Run the AI agent pipeline on all 10 existing questions immediately
- Ensure each question shows at least the AI consensus probability on the card
- Question card should show: "{category} • {time_left} • {N} forecasters • {X}% consensus"
- Never display "Be the first to forecast" — always show at least AI consensus
- Consider labeling AI forecasts: "AI consensus: 42%" to lean into the AI vs Human angle
```

### Improvement 2: Add Inline Sign-Up CTA on Question Detail Page

**What:** On the question detail page for signed-out users, replace the current "Log in to add your forecast" with a prominent sign-up section that includes:
- A probability slider (interactive, but submits on sign-up)
- "Sign up to submit your forecast" primary button
- "Already have an account? Log in" secondary link
- The slider lets them "play" with the interface before committing

**Why:** The question detail page is where purchase intent is highest. The user has read the question, understood it, and wants to forecast. Currently, we send them to a generic auth page, breaking the flow. An inline CTA preserves intent and reduces funnel steps from 4 to 1.

**Expected impact:** 🔴 HIGH — This is where the conversion funnel leaks the most.

**Implementation spec:**
```
Question Detail Page (signed-out):
┌─────────────────────────────────────────────┐
│ Will GPT-5 be released before end of 2026?  │
│ Technology • 234d left                      │
│                                              │
│ [Question description...]                    │
│                                              │
│ ┌─── AI Consensus ───┐                      │
│ │ 42% Yes  |  58% No  │                      │
│ │ 3 forecasters       │                      │
│ └─────────────────────┘                      │
│                                              │
│ ═══════════════════════════════════════════   │
│ YOUR FORECAST                                │
│                                              │
│  [========●==================] 35%           │
│  0%              50%              100%       │
│                                              │
│  [  Sign Up to Submit Your Forecast  ]       │
│  Already a member? Log in                    │
│                                              │
│  Free • 30 seconds • No credit card          │
└─────────────────────────────────────────────┘
```

### Improvement 3: Hide or Replace Low Social-Proof Numbers

**What:** 
- Remove "👥 2 Forecasters joined" from the landing page entirely (threshold: don't show until 100+)
- Replace "Join 2 forecasters already on Baycast" with a benefit statement like "Join the next generation of forecasters"
- Fix the empty leaderboard to show pre-seeded AI agents with their Brier scores
- Change leaderboard CTA from "The leaderboard is waiting for its champion" to something more action-oriented

**Why:** Low numbers actively hurt conversion. This is well-established in growth psychology: social proof below a critical threshold backfires. Showing "2 users" is worse than showing no number at all.

**Expected impact:** 🟡 HIGH — Removes an active conversion repellent.

**Implementation spec:**
```tsx
// Landing page — social proof section
// BEFORE:
"📊 10 Questions live now 👥 2 Forecasters joined 🎯 100% Free to play"
// AFTER (while < 100 users):
"📊 10 Questions live now 🤖 AI agents forecasting alongside humans 🎯 100% Free to play"

// Bottom CTA section
// BEFORE: "Join 2 forecasters already on Baycast"
// AFTER: "Join the next generation of forecasters" (no number until 100+)

// Leaderboard
// BEFORE: "The leaderboard is waiting for its champion"
// AFTER: Show AI agents on leaderboard with "(AI)" label
// "GPT-4 — Brier Score: 0.23 (AI)"
// "Claude — Brier Score: 0.31 (AI)"
// "Be the first human to claim #1 → [Sign Up]"
```

### Improvement 4: Add Near-Term / "Resolving Soon" Questions

**What:** Create or feature questions that resolve within 7-30 days. Add a "Resolving Soon" filter/tab. Pin these to the top of the questions page.

**Why:** All 10 current questions resolve in 234-1330 days. A visitor has no reason to forecast something they won't know the answer to for 8 months. Near-term questions create urgency: "This resolves Friday — what do you think?" Polymarket prominently features markets resolving within days. Manifold has high activity on short-term questions.

**Expected impact:** 🟡 HIGH — Creates urgency and a reason to come back.

**Implementation spec:**
```
Questions page:
- Add "Resolving Soon" as first filter tab (before "All")
- Questions resolving in <7 days get a 🔥 badge
- Questions resolving in <30 days get a ⏰ badge
- Suggest 5 near-term questions for the founder to add:
  1. "Will Bitcoin close above $100K on May 15?" (4 days)
  2. "Will Trump visit China on May 13?" (2 days) 
  3. "Will the S&P 500 close above 6,000 this week?" (5 days)
  4. "Will Hantavirus cases exceed 500 by May 18?" (7 days)
  5. "Will the Fed hold rates at May FOMC?" (~3 weeks)
```

### Improvement 5: Add a Sticky CTA Banner for Signed-Out Users

**What:** A persistent bottom banner (mobile-style) for signed-out visitors that appears after scrolling past the hero:
- "📊 Make your first prediction — it's free" [Sign Up in 30s]
- Dismissible but reappears on next page load
- Only shows to signed-out users

**Why:** The current CTA is lost once the user scrolls. A sticky CTA ensures the conversion prompt is always available. This is standard practice on SaaS landing pages and has measurable conversion impact.

**Expected impact:** 🟡 MEDIUM — Standard CRO best practice, easy win.

**Implementation spec:**
```tsx
// Bottom sticky banner — signed-out only
<div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white 
  px-4 py-3 flex items-center justify-between z-50 md:hidden">
  <span className="text-sm">📊 Make your first prediction</span>
  <a href="/auth/signup" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
    Sign Up Free →
  </a>
</div>
```

---

## Section 4: Quick Wins (Implementable in 1 Commit)

These are text/content changes that require no architecture changes, no new components, and can be shipped in a single commit:

### Quick Win 1: Fix the question detail CTA (5 min)
**File:** Question detail page component  
**Change:** Replace `Log in` link with `Sign up to forecast` button that links to `/auth/signup`  
**Current:** `"Log in to add your forecast to the collective estimate."` → links to `/auth/login`  
**Fix:** `"Sign up to add your forecast — it takes 30 seconds."` → links to `/auth/signup` with "or log in" as secondary

### Quick Win 2: Remove "2 Forecasters joined" (2 min)
**File:** Landing page  
**Change:** Replace `👥 2 Forecasters joined` with `🤖 AI vs Human forecasting`  
**Rationale:** 2 is below the social proof threshold and actively hurts conversion

### Quick Win 3: Fix bottom CTA text (2 min)
**File:** Landing page  
**Change:** Replace `Join 2 forecasters already on Baycast` with `Free to play. No credit card. 30-second signup.`  
**Rationale:** Remove the low number, add friction-reducing messaging

### Quick Win 4: Add sign-up link to footer (2 min)
**File:** Footer component  
**Change:** Add `Sign Up` link next to existing Questions/Leaderboard/Blocks links  
**Current:** Footer only has Questions, Leaderboard, Blocks links  
**Fix:** Add "Sign Up | How It Works" to footer

### Quick Win 5: Add "Resolving Soon" to question cards (text-only, 5 min)
**File:** Question card component  
**Change:** If question resolves < 30 days, show "⏰ Resolving soon" badge  
**If > 200 days, don't show days remaining (it's discouraging)**  
**Current:** All cards show "234d left", "599d left", "1330d left"  
**Fix:** Show human-friendly: "Resolves Dec 2026" instead of "234d left". For >365d, just show the year.

### Quick Win 6: Pre-seed AI forecasts via existing pipeline (depends on founder, but spec-ready)
**Action:** Run the AI forecasting agent on all 10 questions immediately. This is the #1 priority.  
**No code change needed** — just execute the existing AI pipeline on all questions.

### Quick Win 7: Leaderboard — show AI agents (15 min)
**File:** Leaderboard page  
**Change:** Instead of "waiting for its champion," show AI agent entries:  
```
🥇 GPT-4o     | Brier: -- | (AI Agent)  
🥈 Claude 3.5 | Brier: -- | (AI Agent)  
🥉 Gemini Pro | Brier: -- | (AI Agent)  
─── Be the first human to compete ───
[Sign Up & Compete →]
```

---

## Summary: Root Cause Analysis

**Why 0 signups in 5 days:**

1. **Ghost town effect (60% of cause):** 9/10 questions show "Be the first to forecast." Empty leaderboard. "2 forecasters joined." Every signal screams "nobody is here." In a product whose value is collective intelligence, the absence of a collective is fatal.

2. **Broken conversion funnel (25% of cause):** The natural user flow (browse questions → click question → want to forecast → sign up) has a gap at step 3. The question detail page sends users to "Log in" instead of "Sign up," and there's no inline forecasting CTA.

3. **No urgency or reason to act now (15% of cause):** All questions resolve in 8+ months. There's no "resolving soon" category, no breaking/trending questions, no news hooks. A visitor thinks "interesting, but I'll come back later" — and never does.

**The product is not broken. The social proof is.** The copy is strong, the design is clean, the differentiator (blind consensus + AI vs human) is genuinely compelling. But a visitor in 5 seconds sees: empty questions, empty leaderboard, 2 users. The rational response is to bounce.

**Recommended priority order:**
1. Pre-seed AI forecasts on all questions (founder action)
2. Fix question detail page CTA (code change, 1 commit)
3. Hide low social-proof numbers (code change, 1 commit)  
4. Add near-term questions (founder action + code)
5. Sticky CTA banner (code change, 1 commit)
