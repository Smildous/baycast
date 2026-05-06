# E2E Audit Report — Baycast Proto

**Date:** 2026-05-06 (Afternoon)  
**Environment:** baycast-p.vercel.app  
**Auditor:** Hermes Agent (Automated)  
**Ticket:** AQ-068  
**Last deployed fix:** `9061a2d` (First Forecast Flow + Onboarding modal fix)

---

## Summary

| # | Flow | Status | Details |
|---|------|--------|---------|
| 1 | Landing Page | ✅ PASS | Full hero, CTAs, nav, live questions, footer all render correctly |
| 2 | Auth Signup | ✅ PASS | Google OAuth, username/email/password fields, submit button all present |
| 3 | Onboarding Modal | ✅ PASS | Appears after ~3-5s, Escape dismiss ✅, Skip button ✅, Close button ✅, Got it ✅ |
| 4 | Questions Page | ⚠️ PARTIAL | 10 questions load ✅, category filters PRESENT but BROKEN ❌, no pagination UI visible |
| 5 | Question Detail | ✅ PASS | Title, description, deadline, resolution source, forecast login prompt all correct |
| 6 | Profile (unauth) | ⚠️ PARTIAL | Shows inline login form instead of redirecting to /auth/login |
| 7 | Leaderboard | ✅ PASS | Renders with period filters and proper empty state |
| 8 | Footer | ✅ PASS | Present on all pages with correct links |
| 9 | Mobile Responsive | ✅ PASS | Hamburger menu, slide-out drawer, `md:hidden`/`hidden md:flex` breakpoints correct |

**Score: 7/9 PASS · 2/9 PARTIAL · 0/9 FAIL**

---

## Flow Details

### Flow 1: Landing Page — ✅ PASS

- **HTTP 200:** Page loads successfully with title "Baycast — Collective Intelligence Platform"
- **Hero Section:** Heading "A different kind of intelligence" with descriptive copy ✅
- **CTAs:** "Start forecasting" → `/questions`, "Join the experiment" → `/auth/signup` ✅
- **Navigation:** BAYCAST logo, Home, Questions, Blocks, Leaderboard, Get Started ✅
- **Stats:** "10 Active questions · 2 Forecasters · 1 Predictions made" ✅
- **How it Works:** 4-step flow (01–04) with clear headings ✅
- **Why prediction markets failed:** Section with 3 feature cards ✅
- **Blind Consensus Protocol:** Full explanation section ✅
- **Live Questions:** 5 sample questions with category tags and deadlines ✅
- **Footer CTA:** "Create your account" + "View leaderboard" ✅
- **Note:** CTA click experienced ~30s timeout but navigation ultimately succeeded

### Flow 2: Auth Signup — ✅ PASS

- **Route:** `/auth/signup` loads correctly
- **Form fields:** Username, Email, Password — all with proper placeholder text ✅
- **OAuth:** "Continue with Google" button present ✅
- **Submit:** "Create my account" button ✅
- **Navigation:** "Already a member? Log in" link → `/auth/login` ✅
- **Footer:** Present with all standard links ✅

### Flow 3: Onboarding Modal — ✅ PASS (CRITICAL FIX VERIFIED)

> **Context:** This was the critical bug fixed in `9061a2d`. Modal was previously broken/invisible.

- **Appearance:** Modal appears ~3-5 seconds after page load on both `/` and `/questions` ✅
- **Content:** "Welcome to Baycast" heading, 3 feature cards (🔒 Blind Forecasts, 📊 Scored Accuracy, 🤖 Human + AI) ✅
- **Escape key dismiss:** Tested on landing page — modal closes ✅
- **Skip button:** "Skip onboarding" button dismisses modal on `/questions` ✅
- **Got it button:** Present and clickable ✅
- **Close button:** "Close onboarding" (X) button present ✅
- **Persistence:** Uses localStorage to prevent re-showing after dismiss ✅

### Flow 4: Questions Page — ⚠️ PARTIAL

**What works:**
- 10 questions displayed with correct titles, categories, and deadlines ✅
- 11 category filter buttons: All, Politics, Technology, Economy, Science, Sports, Culture, AI, Crypto, Entertainment, Other ✅
- 3 status filter buttons: Open, Closed, Resolved ✅
- Search text box present ✅
- Footer present ✅

**What's broken:**

#### Bug 1: Category filters return zero results (CRITICAL)
- **Reproduction:** Click any category filter (e.g., "Technology") on `/questions`
- **Expected:** Filter questions by category (e.g., show GPT-5 and EU AI Act questions)
- **Actual:** Shows "No questions match your search" for ALL categories
- **Root cause:** Database category values don't match the filter categories. Smil needs to run `migration_005_normalize_categories.sql`
- **Fix:** Execute the SQL migration to normalize category names in the database:
  ```sql
  -- Run migration_005_normalize_categories.sql
  ```

#### Bug 2: No pagination UI visible
- **Observation:** All 10 questions render in a single list with no pagination controls
- **Impact:** LOW — if questions stay under the page limit, pagination isn't needed
- **Recommendation:** Add pagination controls when questions exceed display threshold (e.g., >12)

### Flow 5: Question Detail — ✅ PASS

- **Route:** `/questions/:id` loads correctly
- **Title:** "Will GPT-5 be released before end of 2026?" ✅
- **Description:** Full resolution criteria ✅
- **Metadata:** Category (Technology), time remaining (239d), close date (Dec 31, 2026) ✅
- **Resolution source:** Link to openai.com ✅
- **Forecast form:** Shows "Log in to add your forecast" for unauthenticated users (expected) ✅
- **Consensus:** "0 Forecasters" (correct for unanswered question) ✅
- **Note:** Slider/submit button not visible when unauthenticated — this is correct behavior. Authenticated flow needs separate testing.

### Flow 6: Profile (Unauthenticated) — ⚠️ PARTIAL

- **Route:** `/profile` loads (does not 404)
- **Expected behavior:** Redirect to `/auth/login`
- **Actual behavior:** Shows inline login form directly on the profile page
  - "Welcome back" heading
  - "Continue with Google" button
  - Email + Password fields
  - "Log in" button
  - "Forgot password?" link
  - "New to Baycast? Join for free" link
- **Impact:** LOW — Access is properly protected (user can't see profile data), but the UX differs from the expected redirect pattern
- **Fix suggestion:** Add a `redirect('/auth/login')` in the profile page loader/middleware for unauthenticated users, OR accept the inline pattern as intentional design

### Flow 7: Leaderboard — ✅ PASS

- **Route:** `/leaderboard` loads with title "Leaderboard"
- **Description:** "Ranked by calibration. A Brier score near 0 means your predictions matched what actually happened." ✅
- **Period filters:** "All time", "This month", "This week" ✅
- **Empty state:** "No forecasters on the leaderboard yet" with 🏆 icon ✅
- **CTA:** "Browse Questions" → `/questions` ✅
- **Footer:** Present ✅
- **Note:** Empty state is expected since no questions have been resolved yet

### Flow 8: Footer — ✅ PASS

- **Present on all tested pages:** `/`, `/questions`, `/auth/signup`, `/auth/login`, `/questions/:id`, `/leaderboard`, `/profile` ✅
- **Links:** Questions, Leaderboard, Blocks, Sign up ✅
- **Branding:** "BAYCAST © 2026" ✅
- **Tagline:** "Not a prediction market. Pure forecasting." ✅

### Flow 9: Mobile Responsive — ✅ PASS

- **Viewport meta:** `<meta name="viewport" content="width=device-width, initial-scale=1">` ✅
- **Hamburger menu:** Button with `md:hidden` class, SVG hamburger icon (3 lines), `aria-label="Open menu"` ✅
- **Mobile drawer:** Fixed slide-out panel (`w-72`, `bg-bg-surface`, `border-l`, `shadow-2xl`) with `transition-transform duration-300 ease-in-out` ✅
- **Desktop nav:** Links wrapped in `hidden md:flex` (hidden on mobile) ✅
- **Desktop CTA:** "Get Started" button has `hidden md:inline-flex` (hidden on mobile) ✅
- **Framework:** Tailwind CSS responsive breakpoints properly configured ✅

---

## Open Issues Summary

| Priority | Bug | Affected Flow | Status |
|----------|-----|---------------|--------|
| 🔴 HIGH | Category filters return 0 results for all categories | Flow 4 | Known — needs `migration_005_normalize_categories.sql` |
| 🟡 LOW | `/profile` shows inline login instead of redirecting to `/auth/login` | Flow 6 | Design decision or minor fix |
| 🟡 LOW | No pagination UI on questions page | Flow 4 | May be intentional (10 questions fit in one page) |

---

## Recommendations

1. **[URGENT] Run migration_005_normalize_categories.sql** — The category filters are completely non-functional. Every category click shows zero results. This is the highest priority fix.
2. **Decide on profile redirect behavior** — Either implement the redirect to `/auth/login` or document the inline login as intentional design.
3. **Add pagination** — Even with 10 questions, add pagination controls for future scalability (suggest 12 per page).
4. **Test authenticated forecast flow** — This audit only tested unauthenticated paths. The slider, probability input, and forecast submission need a separate authenticated E2E test.
5. **Performance note** — CTA clicks experienced ~30s timeouts in the browser automation, which may indicate slow client-side navigation or hydration delays. Worth investigating.

---

## Test Environment

- **Browser:** Chromium (headless)
- **Viewport:** 1280px width (desktop)
- **Auth state:** Unauthenticated for all tests
- **Pages tested:** `/`, `/questions`, `/questions/:id`, `/auth/signup`, `/auth/login`, `/profile`, `/leaderboard`
