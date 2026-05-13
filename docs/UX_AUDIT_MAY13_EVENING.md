# Baycast Live E2E UX Audit — May 13, 2026 (Evening)

**Auditor**: Product Agent (automated live audit)  
**URL**: https://baycast-p.vercel.app  
**Date**: May 13, 2026, ~19:05 UTC  
**Methodology**: Live browser-based E2E testing of all major pages and flows  
**Context**: Day 10 post-launch, 0 signups, BCP recently fixed to be fully blind

---

## Overall Score: 5.5/10

The product has strong bones — clear value prop, good content pages, proper BCP implementation — but has **critical conversion blockers** that would prevent any cold visitor from becoming a user. The site feels like a well-written brochure, not an addictive forecasting tool.

---

## Critical Issues (MUST FIX Before Marketing Push)

### 🔴 CRITICAL-1: Signup Page Featured Questions Are Fake/Placeholder
- **Page**: `/auth/signup`
- **Issue**: The "Featured Questions" section at the bottom of the signup page shows 3 questions that **do not exist** in the live question database:
  1. "Will there be a ceasefire agreement in the Ukraine-Russia conflict before September 2026?" (labeled "Geopolitics" — no such category in the actual system)
  2. "Will OpenAI release GPT-5 with demonstrated agentic capabilities before Q4 2026?" (different wording from the actual GPT-5 question)
  3. "Will a new drug receive FDA breakthrough therapy designation for Alzheimer's in 2026?" (no Alzheimer's question exists)
- **Impact**: This is a **trust killer**. Users who click "View all →" will see completely different questions. It signals the site is unfinished or misleading.
- **Severity**: HIGH
- **Fix**: Replace with actual live questions from the database, or remove the section entirely. Hardcoding 3 fake questions is worse than having none.

### 🔴 CRITICAL-2: Category Filter Doesn't Work on "Closing Soon" Section
- **Page**: `/questions?category=Politics` (and any category filter)
- **Issue**: When filtering by category (e.g., Politics), the "⚡ Closing Soon" section still shows questions from ALL categories (Technology, Other, etc.). Only the main list below respects the filter. The heading also always shows "Questions(10 open)" regardless of active filter.
- **Impact**: Users think filtering is broken. The "Closing Soon" section dominates the page visually, so the filter appears to do nothing.
- **Severity**: HIGH
- **Fix**: Apply category filter to the "Closing Soon" section, or hide the section when a category filter is active. Update the count in the heading to reflect filtered results.

### 🔴 CRITICAL-3: Zero Social Proof / Ghost Town Effect
- **Page**: Multiple (`/leaderboard`, `/activity`, question detail pages)
- **Issue**: 
  - Leaderboard is empty ("The leaderboard is waiting for its champion")
  - Activity feed shows only 1 forecast from 10 days ago ("Simba forecasted 100% on Will Bitcoin exceed $200,000")
  - 9 out of 10 questions show "Be the first to forecast"
  - Only 1 question has any engagement (Bitcoin question, "Join the forecast")
- **Impact**: The site feels abandoned. Cold visitors see no evidence anyone uses it. This is the #1 conversion blocker for a social product.
- **Severity**: HIGH
- **Fix**: 
  1. Seed AI agent forecasts on every question (you advertise "AI vs Human" — show it!)
  2. Create 5-10 test accounts with forecasts to populate the leaderboard
  3. Consider hiding the Activity page until there's meaningful content
  4. Add "Early adopter" framing: "Be among the first forecasters" instead of "Be the first"

### 🔴 CRITICAL-4: Question Cards Hint at Forecast Counts (BCP-Adjacent Leak)
- **Page**: `/questions` (landing page cards)
- **Issue**: The Bitcoin question card says "Join the forecast" while all others say "Be the first to forecast". This subtly leaks that the Bitcoin question has existing forecasts, which could influence user behavior before they even click through.
- **Impact**: Minor BCP-adjacent information leak. Users can infer forecast counts from card text before visiting the question detail.
- **Severity**: MEDIUM
- **Fix**: Standardize all question cards to show the same CTA text regardless of forecast count. Use something like "Forecast now →" for all cards.

---

## Significant Issues (Should Fix)

### 🟡 ISSUE-5: Compare Page Table Has Empty Rows
- **Page**: `/compare`
- **Issue**: The full feature comparison table has 4 rows where only the feature name shows, with no values for any platform:
  - "Blind consensus" — all cells show only icon `<img>` tags (likely checkmarks/crosses) with no alt text
  - "Calibration tracking" — all cells show only icons
  - "Leaderboard" — all cells show only icons
  - "Multi-choice / numeric" — all cells show only icons
- **Impact**: The comparison table looks broken/incomplete to visual users and is completely inaccessible to screen readers.
- **Severity**: MEDIUM
- **Fix**: Either add visible text values (✅/❌ or "Yes"/"No") to these cells, or ensure the icon images have proper alt text. The visual rendering may be fine, but the accessibility tree shows empty cells.

### 🟡 ISSUE-6: Onboarding Modal Reappears on Every Visit
- **Page**: `/` (home page)
- **Issue**: The onboarding modal ("Welcome to Baycast") appeared immediately on first visit. While there's a "Skip onboarding" button, it's unclear if this preference persists across sessions or just for the current page.
- **Impact**: Annoying for returning visitors. Could be especially problematic if the user has already signed up.
- **Severity**: LOW
- **Fix**: Ensure onboarding dismissal is stored in localStorage/cookie and persists across sessions and pages.

### 🟡 ISSUE-7: Login Page Has No Value Proposition
- **Page**: `/auth/login`
- **Issue**: The login page is bare-bones — just email, password, and "Log in" button. No reminder of why they signed up, no featured content, no "Welcome back — here's what's new" messaging.
- **Severity**: LOW  
- **Fix**: Add a sidebar or subtle reminder of active questions or recent activity to re-engage returning users.

### 🟡 ISSUE-8: Search Box Placement on Questions Page
- **Page**: `/questions`
- **Issue**: The search box ("Search questions...") is positioned below the "Closing Soon" section and above the filtered results. This is an unusual placement — users expect search at the top of the page.
- **Severity**: LOW
- **Fix**: Move search to the top of the page, near the category filters.

### 🟡 ISSUE-9: Questions Closing in 232+ Days Listed as "Closing Soon"
- **Page**: `/questions`
- **Issue**: The "⚡ Closing Soon" section shows questions with 232+ days remaining. For a platform with questions spanning 232-1328 days, 232 days is not "soon." This makes the section meaningless.
- **Severity**: MEDIUM
- **Fix**: Only show questions with <30 days remaining in "Closing Soon", or rename to "Recently Added" / "Featured Questions" when nothing is actually closing soon.

---

## Nice-to-Have Improvements

### 💡 IMPROVE-1: No Loading States Visible
- All pages loaded quickly (good!), but there are no visible skeleton loaders or loading spinners. If the API ever slows down, users will see blank pages.
- **Fix**: Add skeleton loading states for question cards and leaderboard.

### 💡 IMPROVE-2: Question Detail Page — Interactive Slider Without Auth
- **Page**: Question detail pages (e.g., `/questions/d451ce46-...`)
- **Issue**: The probability slider is interactive even when not signed in, but the submit button says "Sign up to submit your forecast." This is actually GOOD UX — lets users play with it before committing. But consider adding a micro-interaction: when they slide, show a tooltip saying "Create a free account to lock in your forecast!"
- **Severity**: LOW (enhancement)

### 💡 IMPROVE-3: Footer "Join Baycast — Start Forecasting" Link
- The footer has a large CTA link "Join Baycast — Start Forecasting" that goes to `/auth/signup`. This is fine but could be more contextual — e.g., "Start forecasting in 30 seconds →"

### 💡 IMPROVE-4: No Terms of Service / Privacy Policy Links
- The footer has no links to Terms of Service, Privacy Policy, or Contact. This is a trust issue for signup conversion.
- **Fix**: Add at minimum a Privacy Policy link in the footer.

### 💡 IMPROVE-5: Activity Feed Shows Forecast Values for Blind Protocol
- **Page**: `/activity`
- **Issue**: The activity feed shows "Simba forecasted 100% on Will Bitcoin exceed $200,000 before 2027?" — revealing the exact forecast value. While this is from the reveal phase (10 days ago), the activity feed design could leak information about individual forecasts for questions still in blind phase.
- **Severity**: LOW (verify this only shows for questions in Phase B)

### 💡 IMPROVE-6: "Free forever" / "No sign-up card" Trust Badges Need Context
- **Page**: `/` (landing page)
- **Issue**: The badges "Free forever" and "No sign-up card" (likely meaning "No credit card required") are small and lack context. "No sign-up card" is ambiguous.
- **Fix**: Change to "No credit card required" — clearer.

---

## What's Working Well

1. **BCP Implementation** ✅ — Blind phase is properly enforced. Consensus is hidden behind auth wall. Question detail pages show "🔒 Submit your forecast to see the community consensus" and "No forecasts yet" (or "Growing community" for the one question with data). No aggregate probability leaks.

2. **SEO / Meta Tags** ✅ — Every page has proper title, meta description, og:image, and og:title. URLs are clean and semantic.

3. **Content Pages** ✅ — `/how-it-works` and `/compare` are exceptionally well-written. The Brier score explanation, the comparison table (minus the empty rows), and the FAQ section are all excellent. These are genuinely persuasive pages.

4. **404 Handling** ✅ — Custom 404 page with "Back to Home" link. Clean and functional.

5. **Form Validation** ✅ — Signup form shows proper inline validation errors ("Enter a valid email", "Password must be at least 6 characters").

6. **Navigation** ✅ — Consistent nav across all pages. All links work (no 404s). Footer has relevant links.

7. **Onboarding Modal** ✅ — Clear 3-step explanation of Baycast (Blind Forecasts, Scored Accuracy, Human + AI). Good for first-time visitors.

8. **Password Reset Flow** ✅ — Clean `/auth/reset-password` page with email input and link back to login.

---

## Competitive Comparison Notes

### What Polymarket Does That We Don't:
- **Real-money stakes create urgency** — people check daily because they have skin in the game
- **Price charts create visual engagement** — seeing a line move is addictive
- **Volume/liquidity metrics** — social proof baked into every question
- **Twitter embeds/news integration** — questions feel connected to real events

### What Metaculus Does That We Don't:
- **Community discussion** — comment threads on every question
- **Track record profiles** — public forecaster profiles with calibration charts
- **Question resolution history** — shows resolved questions with actual outcomes
- **Time-series forecasts** — can update predictions over time

### What Manifold Does That We Don't:
- **Instant feedback** — see market price move when you bet
- **Play money still feels real** — Mana has psychological weight
- **Social features** — follow other forecasters, notifications
- **Create your own questions** — user-generated content

### What Baycast Should Prioritize to Differentiate:
1. **AI agent leaderboard** — You advertise "AI vs Human" but there are no visible AI forecasts. This is your unique differentiator. Ship it.
2. **Calibration charts** — Show users how well-calibrated they are over time (graph, not just Brier score number)
3. **Question resolution pipeline** — You have 10 questions, 0 resolved. Need to show the full lifecycle (forecast → resolve → score)
4. **Discussion/comments** — Even minimal commenting would increase engagement and time-on-page
5. **Mobile push notifications** — "A question you forecasted is closing in 24 hours" would drive retention

---

## Page-by-Page Summary

| Page | URL | Status | Key Issue |
|------|-----|--------|-----------|
| Home | `/` | ✅ Good | Solid landing page, onboarding modal, clear CTA |
| Questions | `/questions` | ⚠️ Bugs | Category filter broken for "Closing Soon", count not filtered |
| Question Detail | `/questions/[id]` | ✅ Good | BCP properly enforced, clean UI |
| Signup | `/auth/signup` | 🔴 Critical | Fake featured questions, needs trust elements |
| Login | `/auth/login` | ✅ OK | Bare but functional |
| Reset Password | `/auth/reset-password` | ✅ OK | Clean |
| Leaderboard | `/leaderboard` | ⚠️ Empty | No users — shows "waiting for champion" |
| Activity | `/activity` | ⚠️ Sparse | Only 1 forecast, 10 days old |
| How It Works | `/how-it-works` | ✅ Excellent | Best page on the site |
| Compare | `/compare` | ⚠️ Partial | Great content, 4 empty table rows |
| 404 | `/nonexistent-page` | ✅ Good | Custom 404 with home link |

---

## Recommended Priority Actions (This Week)

1. **🔴 Fix signup page featured questions** — Replace fake questions with actual live questions or remove the section (1 hour)
2. **🔴 Seed AI agent forecasts** — Your biggest differentiator ("AI vs Human") is invisible. Get AI forecasts on every question (2 hours)
3. **🔴 Fix category filter bug** — Apply filter to "Closing Soon" section and update count (2 hours)
4. **🟡 Standardize question card CTAs** — Stop leaking forecast count via "Be the first" vs "Join the forecast" (30 min)
5. **🟡 Rename "Closing Soon" section** — Nothing is closing soon; rename to "Featured" or "Recently Added" (15 min)
6. **🟡 Fix compare table empty rows** — Add text values to 4 empty rows (1 hour)
7. **💡 Add Privacy Policy link** — Trust signal for conversion (30 min)
8. **💡 Add "No credit card required"** — Replace ambiguous "No sign-up card" badge (15 min)

---

*End of audit. Generated May 13, 2026 by automated Product Agent.*
