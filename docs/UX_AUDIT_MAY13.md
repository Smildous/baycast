# Baycast UX Audit — May 13, 2026

**Auditor:** Hermes Agent (Automated First-Time User Walkthrough)
**URL:** https://baycast-p.vercel.app
**Date:** Wednesday, May 13, 2026

---

## 1. Landing Page (/)

### First Impression
- **Strong value proposition:** "How well can you predict the future?" is clear and compelling
- **Good messaging hierarchy:** Hook → Explanation → CTA → Social proof → How it works → Live questions
- **Trust signals present:** "Free forever", "No sign-up card", "30-second sign-up" badges
- **AI vs Human hook** is prominent and differentiating

### Positives ✅
- Clear 3-step "How Baycast Works" explanation (Make Forecast → Blind Consensus → Get Scored)
- Live questions preview gives users immediate content to engage with
- "Why Baycast is different" section effectively communicates differentiation from prediction markets
- Dual CTAs: "Start Forecasting — It's Free" (primary) and "Browse Questions →" (secondary)

### Issues Found 🐛
- **"Live now — AI vs Human forecasting" banner** is subtle text, doesn't stand out enough for a key differentiator
- **"10 Questions live now"** — static number; unclear if it updates dynamically
- **Multiple questions show "Be the first to forecast"** — signals low engagement/activity
- **"Other" category tag** appears on 3/5 preview questions (COVID, Brent crude, temperature) — these deserve proper categories
- **No social proof / testimonials** — no user quotes, activity numbers, or community size indicators
- **No mobile hamburger menu visible** in the snapshot — need to verify mobile nav

---

## 2. Questions Page (/questions)

### Overview
- Heading: "Questions (10 open)" with descriptive subtitle
- Category filters: All, Politics, Technology, Economy, Science, Other
- Status filters: Open, Closed, Resolved
- Sort: Closing Soon, Newest, Most Active
- Search bar present mid-page

### Positives ✅
- Good filter/sort system with multiple dimensions
- "⚡ Closing Soon" section highlights urgency
- Question cards show category, time remaining, and consensus/forecast status
- Search functionality available

### Issues Found 🐛
- **"Closing Soon" section is misleading** — the closest question closes in 232 days. Nothing is actually closing soon. This undermines the urgency signal.
- **Very long time horizons** (232–1328 days) — most questions won't resolve for 7+ months to 3+ years. This reduces engagement because users can't see results quickly.
- **Only 10 questions total** — low content volume makes the site feel empty
- **Search bar is mid-page** — should be at the top as a primary interaction element
- **"Other" category is a catch-all** — COVID (Health), Brent crude (Energy/Commodities), global temperature (Climate/Environment) should have proper categories
- **No question thumbnails or visual differentiation** — all cards look identical
- **No question author/creator attribution** shown
- **"Be the first to forecast"** on 9/10 questions confirms near-zero user engagement

### Recommendations
1. Add short-term questions (resolving in 1–30 days) to drive engagement
2. Rename "Other" to specific categories or add: Health, Energy, Climate, Sports, Crypto
3. Add question creator attribution for community building
4. Move search bar to top of the list

---

## 3. Question Detail Page (/questions/[id])

### Tested With
- "Will Bitcoin exceed $200,000 before 2027?" (has 1 forecast)
- Observed: Consensus display, slider, quick-select buttons, resolution source

### Positives ✅
- **Clear resolution criteria:** "Will Bitcoin trade above $200,000 USD on any major exchange (Binance, Coinbase, Kraken) before January 1, 2027?" — unambiguous
- **Resolution source listed** (CoinGecko) — good transparency
- **Probability slider with quick-select buttons** (5%, 10%, 25%, 50%, 75%, 90%, 95%) — intuitive UX
- **Consensus display** shows current community estimate (4% Yes / 96% No)
- **Share button** available for social sharing

### Critical Issues 🚨
- **Blind Consensus Protocol contradiction:** Users can see the current consensus (4%) BEFORE submitting their forecast. This directly contradicts the core "blind consensus" value proposition described on /how-it-works. If I can see 4% before forecasting, I'm anchored to that number — this is exactly what the protocol claims to prevent.
- **No guest/test mode** — must sign up to even try the slider. The friction of signup before interaction will lose users.
- **Slider defaults to 50%** — this could create an anchoring bias toward 50

### Minor Issues 🐛
- **"Growing community" text** next to a single forecast feels aspirational rather than factual
- **No comment/discussion section** — prediction platforms benefit from user debate
- **No question edit history or updates** shown
- **No related questions** or "You might also forecast" recommendations

### Recommendations
1. **CRITICAL:** Either hide consensus until after forecasting (true blind protocol) or change the messaging to not claim blind consensus
2. Allow unauthenticated users to interact with the slider as a demo, then gate submission
3. Add a comment/discussion section for each question

---

## 4. Signup Flow (/auth/signup)

### Flow
- Two options: Google OAuth or email/password
- Fields: Username, Email, Password
- Single CTA: "Create my account"

### Positives ✅
- Clean, uncluttered signup form
- Google OAuth available for frictionless signup
- "Why forecasters choose Baycast" section reinforces value prop during signup
- Featured questions preview gives a taste of content
- Link to login page for existing users

### Issues Found 🐛
- **No visible error on empty submit** — Clicking "Create my account" with all fields empty shows no inline validation error. An alert element appears in the DOM but has no visible text.
- **No password strength indicator** — Users have no guidance on password requirements
- **No Terms of Service / Privacy Policy checkbox** — Legal concern for user acquisition
- **No email verification mentioned** — Unclear if email verification is required post-signup
- **Featured questions have STALE 2025 dates:**
  - "Will there be a ceasefire agreement in the Ukraine-Russia conflict before September 2025?" — This date has passed!
  - "Will OpenAI release GPT-5 with demonstrated agentic capabilities before Q4 2025?" — This date has passed!
  - "Will a new drug receive FDA breakthrough therapy designation for Alzheimer's in 2025?" — This date has passed!
  - These are hardcoded/outdated and should be updated immediately.
- **Category mismatch:** Featured questions use "Geopolitics" and "Science" labels, but the actual site categories are "Politics" and "Other"

### Recommendations
1. Fix stale featured questions immediately — they undermine credibility
2. Add inline validation on the signup form
3. Add password requirements/strength meter
4. Add ToS/Privacy checkbox

---

## 5. Login Page (/auth/login)

### Positives ✅
- Clean, simple design matching signup page
- "Forgot password?" link present
- Google OAuth option available
- "New to Baycast? Join for free" link

### Issues Found 🐛
- No "Remember me" checkbox
- No captcha or bot protection visible

---

## 6. Activity Feed (/activity)

### Issues Found 🐛
- **Only 1 forecast visible** — "Showing 1 most recent forecasts" — signals very low engagement
- **Activity is 9 days old** — a single forecast from "Simba" on Bitcoin at 100%, 9 days ago
- **Claims "Real-time"** in subtitle but nothing is real-time about 1 entry in 9 days
- **Single user forecasted 100% on Bitcoin >$200K** — This is public information that contradicts the blind consensus protocol. Other users can see this before forecasting.

### Recommendations
1. Either hide individual forecasts until the blind phase ends, or rename this section
2. Populate with AI agent forecasts to create activity and demonstrate the "AI vs Human" feature

---

## 7. Leaderboard (/leaderboard)

### Issues Found 🐛
- **Empty leaderboard** — "The leaderboard is waiting for its champion"
- **No AI agents visible** — Despite "AI vs Human" being a key differentiator, no AI agents are shown anywhere
- **No data to display** — No resolved questions = no Brier scores = empty leaderboard

### Recommendations
1. Add placeholder/demo data to show what a populated leaderboard looks like
2. Show AI agent entries even if just for demonstration

---

## 8. Blocks (/blocks)

### Issues Found 🐛
- **Entirely empty** — "No blocks available yet"
- **Top-level navigation item** leads to a dead end
- **No timeline** for when blocks will be available

### Recommendation
- Either hide the nav item until content exists, or populate with at least 1-2 blocks immediately

---

## 9. How It Works (/how-it-works)

### Positives ✅
- Comprehensive explanation of the Blind Consensus Protocol
- Clear 3-phase lifecycle (Blind Forecast → Reveal & Aggregate → Score & Resolve)
- Brier score explanation with concrete examples (0.00, 0.25, 1.00)
- Comparison table vs prediction markets (Polymarket, Manifold)
- FAQ section with relevant questions

### Issues Found 🐛
- Very text-heavy — could benefit from diagrams or animated illustrations
- Comparison table is somewhat one-sided (marketing copy vs balanced comparison)
- No interactive demo

---

## 10. Compare Page (/compare)

### Positives ✅
- Detailed 5-platform comparison table (Baycast, Polymarket, Metaculus, Manifold, Kalshi)
- Honest about some competitor features (e.g., Metaculus has "None" for money)
- "Five Key Differentiators" section is effective

### Issues Found 🐛
- Extremely long page — could overwhelm users
- Some comparison cells appear empty in the snapshot (Calibration tracking, Leaderboard, Multi-choice/numeric rows)
- Marketing-heavy tone may reduce credibility with sophisticated users

---

## Cross-Cutting Issues

### 🔴 Critical
1. **Blind Consensus Protocol is NOT actually blind** — Users can see consensus and individual forecasts before submitting their own. This is the #1 product contradiction.
2. **Stale featured questions** on signup page reference 2025 dates — undermines credibility
3. **Near-zero user engagement** — 10 questions, 1 forecast total in 9 days

### 🟡 Important
4. **Empty sections in top navigation** — Blocks and Leaderboard are dead ends
5. **No short-term questions** — Everything resolves in 7+ months. Users need faster feedback loops.
6. **"Other" category is too vague** — Climate, energy, health questions need proper categories
7. **AI agents are invisible** — "AI vs Human" is a key differentiator but no AI activity is shown
8. **No onboarding flow** — First-time users land on homepage and are expected to self-navigate

### 🟢 Nice to Have
9. **No social features** — Comments, discussions, user profiles
10. **No notification system** visible
11. **No dark mode** option
12. **No footer social links** (Twitter, Discord, GitHub)

---

## Summary Score

| Dimension | Rating (1-5) | Notes |
|-----------|-------------|-------|
| First Impression | ⭐⭐⭐⭐ | Strong value prop, clean design, clear messaging |
| Navigation & IA | ⭐⭐⭐ | Good nav structure but empty pages (Blocks, Leaderboard) |
| Content Quality | ⭐⭐⭐ | Good resolution criteria but only 10 questions, all long-term |
| Forecasting UX | ⭐⭐⭐ | Slider is intuitive but blind protocol is broken |
| Signup Flow | ⭐⭐⭐ | Clean but no validation, stale featured questions |
| Engagement Signals | ⭐ | 1 forecast in 9 days, empty leaderboard, empty activity |
| Differentiation | ⭐⭐⭐⭐ | Clear positioning vs prediction markets, unique BCP concept |
| Technical Health | ⭐⭐⭐⭐ | No broken links, fast loading, clean URLs |
| Mobile (untested) | — | Not tested in this audit |

**Overall: 3.0/5** — Strong concept and messaging, but the product needs more content, real engagement, and the core blind consensus protocol needs to actually work as described.
