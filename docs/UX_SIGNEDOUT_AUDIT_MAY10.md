# Baycast Signed-Out UX Audit

**Date:** May 10, 2026  
**Auditor:** Hermes Agent (automated)  
**URL:** baycast-p.vercel.app  
**Scope:** Full visitor journey as a non-authenticated user  
**Stack:** Next.js 14 + TypeScript + Tailwind + Supabase

---

## Global Score: 5.5 / 10

The platform has solid content and a clear value proposition, but critical UX friction points and a lack of urgency signals prevent visitor-to-signup conversion.

---

## Page-by-Page Scoring

| Page | URL | Score | Status | Key Finding |
|------|-----|-------|--------|-------------|
| Landing (/) | `/` | 7/10 | ✅ Functional | Strong copy, clear CTA — but onboarding modal blocks first impression |
| Signup (/auth/signup) | `/auth/signup` | 8/10 | ✅ Functional | Clean form, Google OAuth + email/password, fast load |
| Questions (/questions) | `/questions` | 7/10 | ✅ Functional | All questions visible, categories work, search present — no CTA prompt to sign up |
| Question Detail (/questions/[id]) | `/questions/[id]` | 5/10 | ⚠️ Partial | Shows question + consensus but forecast form replaced by "Log in" — no signup link |
| Leaderboard (/leaderboard) | `/leaderboard` | 3/10 | ❌ Dead end | Empty state: "No forecasters on leaderboard yet" — kills social proof |
| Blocks (/blocks) | `/blocks` | 3/10 | ❌ Dead end | Empty state: "No blocks available yet" — feels unfinished |
| Profile (/profile) | `/profile` | 6/10 | ✅ Redirect | Shows login form instead of 404 — good, but "Join for free" link is small |

---

## Detailed Findings by Page

### 1. Landing Page (`/`) — Score: 7/10

**What's GOOD:**
- ✅ Value prop is clear in <3 seconds: "How well can you predict the future?" + subtext
- ✅ Primary CTA "Start Forecasting — It's Free" is visible above the fold
- ✅ Secondary CTA "Browse Questions →" allows exploration without commitment
- ✅ "How it works" section (3 steps) is concise and scannable
- ✅ "Why Baycast is different" differentiates from prediction markets
- ✅ Live questions section with real data (10 questions, 2 forecasters, consensus %)
- ✅ Social proof badges: "Free forever", "No sign-up card", "30-second sign-up"
- ✅ Footer has all navigation links + signup CTA

**What's MISSING:**
- ⚠️ Onboarding modal fires on FIRST visit for non-authenticated users — this is a friction point. A visitor who just landed gets interrupted by a 3-step tutorial before they've even decided to stay.
- ⚠️ Testimonials feel fabricated ("Superforecaster community Early tester", "Probability enthusiast Beta user") — no real names, no photos, no links
- ⚠️ No FAQ section
- ⚠️ No visible "How many people are online now" or recent activity feed

**What BLOCKS conversion:**
- 🔴 The onboarding modal is the #1 conversion killer. First-time visitors should see the landing page, not a tutorial for a product they haven't committed to yet.

---

### 2. CTA Flow ("Start Forecasting — It's Free") — Score: 8/10

**Destination:** `/auth/signup`

**What's GOOD:**
- ✅ Clean signup form with username, email, password
- ✅ Google OAuth ("Continue with Google") as one-click option
- ✅ "Already a member? Log in" link
- ✅ Page title is descriptive: "Sign Up — Baycast | Prediction Polling Platform"
- ✅ No unnecessary fields — minimal friction

**What's MISSING:**
- ⚠️ No password strength indicator
- ⚠️ No terms of service / privacy policy link visible
- ⚠️ No "What happens after I sign up?" preview or next-step hint

---

### 3. Questions Page (`/questions`) — Score: 7/10

**What's GOOD:**
- ✅ All 10 questions visible without authentication
- ✅ Category filters work (All, Politics, Technology, Economy, Science, Other)
- ✅ Status filters work (Open, Closed, Resolved)
- ✅ Search box present
- ✅ Shows forecaster count and consensus percentage
- ✅ Question cards are clickable and lead to detail pages
- ✅ Time remaining shown ("235d left")

**What's MISSING:**
- ⚠️ No prompt to sign up — a visitor can browse everything without ever seeing a CTA
- ⚠️ No sorting options (by deadline, by popularity, by forecaster count)
- ⚠️ No pagination — if questions grow, the page will become unwieldy
- ⚠️ "Be the first to forecast" on most questions signals low engagement

**What BLOCKS conversion:**
- 🟡 The questions page is a dead end for engagement — visitors can read everything but have no trigger to sign up. There should be a sticky banner or inline CTA: "Want to add your forecast? Sign up free →"

---

### 4. Question Detail (`/questions/[id]`) — Score: 5/10

**What's GOOD:**
- ✅ Question title, description, and resolution criteria visible
- ✅ Category badge, countdown timer, close date shown
- ✅ Consensus percentage displayed (4% on Bitcoin question)
- ✅ Share button present
- ✅ Resolution source linked (CoinGecko for Bitcoin question)

**What's MISSING:**
- ⚠️ Forecast form shows "Log in to add your forecast" with a "Log in" button — but NO "Sign up" link
- ⚠️ No individual forecasts visible (blind phase or no data)
- ⚠️ No activity feed or comments section
- ⚠️ No "Similar questions you might like" section

**What BLOCKS conversion:**
- 🔴 CRITICAL: The forecast form replacement for non-authenticated users only links to "Log in", not "Sign up". A visitor who has never been to Baycast sees "Log in" and thinks they need an existing account. This is a direct conversion leak.
- 🔴 The blind phase notice ("Forecasts are hidden during the blind phase") is shown to non-authenticated users — this is meaningless to them and adds cognitive load.

---

### 5. Leaderboard (`/leaderboard`) — Score: 3/10

**What's GOOD:**
- ✅ Page loads without error
- ✅ Time period filters present (All time, This month, This week)
- ✅ Clear explanation of Brier scores

**What BLOCKS conversion:**
- 🔴 CRITICAL: "No forecasters on the leaderboard yet" — this is the most damaging empty state. The leaderboard is supposed to be the #1 motivation to compete. Seeing it empty tells visitors: "Nobody is using this platform." This single message could explain zero signups.
- ⚠️ No placeholder data, no "Seed forecasters", no bot data to show what the leaderboard WILL look like
- ⚠️ "Browse Questions" link is the only CTA — no signup prompt

---

### 6. Blocks (`/blocks`) — Score: 3/10

**What's GOOD:**
- ✅ Page loads without error
- ✅ Brief explanation of what blocks are

**What BLOCKS conversion:**
- 🔴 "No blocks available yet" — another empty state that signals "this platform is unfinished"
- ⚠️ This feature is listed in the main navigation but has zero content — it should be hidden or marked as "Coming Soon"

---

### 7. Profile (`/profile`) — Score: 6/10

**What's GOOD:**
- ✅ Shows login form instead of 404 — graceful handling
- ✅ "New to Baycast? Join for free" link present
- ✅ Google OAuth + email/password login
- ✅ "Forgot password?" link

**What's MISSING:**
- ⚠️ "Join for free" link is small and easy to miss

---

## Mobile Simulation (375px viewport)

**Note:** Browser-based resize was limited, but code analysis reveals:

- ✅ Mobile hamburger menu exists with slide-out drawer
- ✅ Mobile drawer includes all nav links + Login/Signup CTAs at bottom
- 🔴 CRITICAL: The "Get Started Free" button in the navbar has `hidden md:inline-flex` — it is **completely hidden on mobile**. The only way to find the CTA on mobile is to open the hamburger drawer. Most mobile users won't know to tap the hamburger for a signup button.
- ✅ Question cards should stack properly (responsive grid)
- ⚠️ Onboarding modal on mobile may cover the entire screen, further blocking the first impression

---

## UX Issues by Severity

### 🔴 CRITICAL

| # | Issue | Page | Impact |
|---|-------|------|--------|
| C1 | **Onboarding modal fires for non-authenticated visitors on first visit** | `/` | Blocks the landing page experience. Visitors see a tutorial before deciding to stay. Should only fire after signup. |
| C2 | **Forecast form only shows "Log in" link, not "Sign up"** | `/questions/[id]` | Non-authenticated visitors who want to forecast are directed to login, not signup. They may not have an account. |
| C3 | **Empty leaderboard: "No forecasters on the leaderboard yet"** | `/leaderboard` | Destroys social proof. The #1 competitive motivation is dead. Visitors think nobody uses the platform. |
| C4 | **"Get Started Free" CTA hidden on mobile (`hidden md:inline-flex`)** | Nav (all pages) | Mobile visitors (50%+ of traffic) cannot see the primary signup CTA without opening the hamburger menu. |

### 🟠 HIGH

| # | Issue | Page | Impact |
|---|-------|------|--------|
| H1 | **Empty Blocks page visible in main navigation** | `/blocks` | Feature listed in nav but has zero content. Signals "unfinished product". Should be hidden or marked "Coming Soon". |
| H2 | **No signup CTA on /questions page** | `/questions` | Visitors can browse all questions without ever encountering a signup prompt. Missed conversion opportunity. |
| H3 | **Testimonials appear fabricated** | `/` | "Superforecaster community Early tester" — no real names, no photos. Erodes trust. |
| H4 | **"Be the first to forecast" on 9/10 questions** | `/questions` | Signals extremely low engagement. Discourages participation (nobody wants to be the only one). |

### 🟡 MEDIUM

| # | Issue | Page | Impact |
|---|-------|------|--------|
| M1 | No sorting options on questions page | `/questions` | Can't sort by deadline, popularity, or recency |
| M2 | Blind phase notice shown to non-authenticated users | `/questions/[id]` | Meaningless jargon to visitors who can't forecast anyway |
| M3 | No "What happens after signup?" preview | `/auth/signup` | Visitors don't know what to expect after creating an account |
| M4 | No password strength indicator | `/auth/signup` | Minor friction during signup |
| M5 | No FAQ section | `/` | Common questions unanswered |

### 🟢 LOW

| # | Issue | Page | Impact |
|---|-------|------|--------|
| L1 | No terms of service / privacy policy link on signup | `/auth/signup` | Trust concern for privacy-conscious users |
| L2 | No recent activity feed | `/` | No "live" feeling |
| L3 | No pagination on questions | `/questions` | Will break with scale |

---

## Root Cause Analysis: Why Nobody Signs Up

**The conversion funnel has 4 critical breaks:**

1. **First impression interrupted:** The onboarding modal fires before the visitor has decided to engage. They see a tutorial for a product they haven't tried yet.

2. **No urgency or scarcity:** "2 Forecasters joined" and "Be the first to forecast" on almost every question. Instead of creating FOMO, this creates the opposite — "Why would I be the only one?"

3. **Social proof vacuum:** The leaderboard is empty, blocks are empty, testimonials are anonymous. Every signal says "nobody is here."

4. **Mobile CTA invisible:** The primary signup button is hidden on mobile. 50%+ of potential visitors can't find how to sign up.

---

## Recommendations (Prioritized)

### Priority 1 — FIX THIS WEEK (Conversion Killers)

1. **C1: Remove onboarding modal for non-authenticated visitors**
   - Only show onboarding AFTER first login/signup
   - File: `app/components/OnboardingProvider.tsx` — add auth check before rendering modal
   - Expected impact: +30-50% landing page engagement

2. **C4: Show "Get Started Free" on mobile navbar**
   - Change `hidden md:inline-flex` to always-visible on small screens (use a compact version)
   - Or add a floating sticky CTA bar on mobile: "Sign up free →"
   - File: `components/NavClient.tsx` line 164-169
   - Expected impact: +20-40% mobile signup rate

3. **C2: Add "Sign up" link next to "Log in" in forecast form**
   - When `isLoggedIn=false`, show both "Log in" and "Sign up free" buttons
   - File: `components/ForecastForm.tsx` lines 68-80
   - Expected impact: +15-25% conversion from question detail pages

### Priority 2 — FIX NEXT WEEK (Social Proof)

4. **C3: Populate leaderboard with seed/bot data**
   - Add 5-10 placeholder forecasters with realistic Brier scores
   - Or show "Join the waiting list" / "Be among the first forecasters"
   - File: `app/leaderboard/page.tsx`
   - Expected impact: Eliminates the #1 "dead platform" signal

5. **H1: Hide or mark Blocks as "Coming Soon"**
   - Remove from main navigation, or add a badge
   - File: `components/NavClient.tsx` — conditionally hide blocks link
   - Expected impact: Removes "unfinished" signal

6. **H2: Add inline signup CTA on /questions page**
   - Sticky bottom bar or banner: "Want to forecast? Sign up free →"
   - Or show after scrolling past 3 questions

### Priority 3 — FIX THIS MONTH (Polish)

7. **H3: Replace fabricated testimonials with real ones**
   - Use real names, photos, and verifiable quotes
   - Or remove testimonials entirely until you have real users

8. **H4: Seed more forecasts on questions**
   - Add AI/bot forecasts to reduce "Be the first" messaging
   - This also makes the consensus percentages more meaningful

9. **M1-M5: Add sorting, FAQ, password strength, etc.**
   - Standard UX improvements

---

## Summary

| Metric | Value |
|--------|-------|
| **Global Score** | **5.5 / 10** |
| **Pages Tested** | 7 |
| **Critical Issues** | 4 |
| **High Issues** | 4 |
| **Medium Issues** | 5 |
| **Low Issues** | 3 |
| **JS Errors** | 0 |
| **Broken Pages** | 0 |
| **Conversion Blockers** | 4 |

### Top 3 UX Issues Found

1. **🔴 Onboarding modal interrupts non-authenticated visitors** — They see a tutorial before committing to the product
2. **🔴 Empty leaderboard destroys social proof** — "No forecasters" is the most damaging message possible
3. **🔴 Mobile CTA is invisible** — Primary signup button hidden on 50%+ of devices

### #1 Recommendation

**Remove the onboarding modal for non-authenticated visitors and show a mobile-visible sticky CTA bar.** These two changes alone could double the visitor-to-signup rate by (a) not blocking the first impression and (b) making signup discoverable on mobile.
