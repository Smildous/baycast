# E2E Audit Report — Baycast (baycast-p.vercel.app)
**Date:** May 5, 2026 — Afternoon  
**Auditor:** Hermes Agent (Automated E2E)  
**Deploy:** baycast-p.vercel.app (Vercel)  
**Branch:** main (commit da03041)  
**Status:** 🔴 NOT LAUNCH READY — Critical bugs block core functionality

---

## Executive Summary

Baycast's landing page, auth pages, and question detail pages are polished and functional. However, **the category filter system is completely broken** — every category filter returns zero results despite questions clearly existing in those categories. This was the #1 issue from the previous audit (0c5ec0c) and commit da03041 was supposed to fix it, but the bug persists in production. Additionally, the profile page fails silently for unauthenticated users, and a resolution source URL is malformed.

**Launch Readiness: ~75%** (down from ~90% estimate due to category filter regression)

---

## Page-by-Page Audit

### 1. Landing Page (`/`)
**Screenshot:** browser_screenshot_d94b0cd583a1444a93550b9121eb5ddd.png

| Status | Finding |
|--------|---------|
| ✅ | Hero section loads with compelling copy |
| ✅ | Navigation bar present with all links (Home, Questions, Blocks, Leaderboard, Get Started) |
| ✅ | "How it works" 4-step section renders correctly |
| ✅ | "Why prediction markets failed" differentiation section |
| ✅ | Live questions section shows 5 questions with category badges, time remaining, forecaster counts |
| ✅ | Stats banner shows "10 Active questions, 2 Forecasters, 1 Predictions made" |
| ✅ | CTA buttons ("Start forecasting" → /questions, "Join the experiment" → /auth/signup) work correctly |
| ✅ | Footer present with links to Questions, Leaderboard, Blocks, Sign up |
| ⚠️ | Onboarding modal appears on first visit — no "Don't show again" persistence (localStorage not used) |
| 💡 | The page is very long — consider adding a "Back to top" button |

---

### 2. Questions Page (`/questions`)
**Screenshot:** N/A (text snapshot captured)

| Status | Finding |
|--------|---------|
| ✅ | All 10 questions display correctly with category badges, titles, forecaster counts, consensus |
| ✅ | Status filters (Open/Closed/Resolved) work — Open shows 10, Closed shows 0, Resolved shows 0 |
| ✅ | Pagination code is implemented (hidden when ≤1 page, correct with 10 items at PAGE_SIZE=10) |
| ✅ | Empty state for no-results has proper message |
| ✅ | Footer present |
| ❌ **CRITICAL** | **ALL category filters are broken** — Technology, Economy, Science, Other, and every other category shows "No questions in this category." despite questions visibly existing in those categories on the "All" view |
| ⚠️ | Category filter "All" link preserves status param correctly (good) but the empty state message says "No questions in this category" even for status-only filters |

---

### 3. Category Filter Deep Dive (`/questions?category=Technology`, `Economy`, `Other`, `Geopolitics`)

| Category | URL | Expected | Actual | Status |
|----------|-----|----------|--------|--------|
| Technology | `/questions?category=Technology` | 2 questions (GPT-5, EU AI Act) | "No questions in this category." | ❌ BROKEN |
| Economy | `/questions?category=Economy` | 2 questions (Bitcoin, Fed) | "No questions in this category." | ❌ BROKEN |
| Science | `/questions?category=Science` | 2 questions (India Moon, Fusion) | "No questions in this category." | ❌ BROKEN (inferred) |
| Other | `/questions?category=Other` | 4 questions (Brent, COVID, Temp, Taiwan) | "No questions in this category." | ❌ BROKEN |
| Geopolitics | `/questions?category=Geopolitics` | Normalized to Other, 0 direct matches | "No questions in this category." | ⚠️ (expected — no Geopolitics category exists) |

**Root Cause Analysis:**
- Code uses `getCategoryVariants()` which generates `['Technology', 'technology', 'tech', 'Tech']` and passes to Supabase `.in('category', variants)`
- The DB question cards show "Technology", "Economy", "Other" etc. (canonical form)
- **The `.in()` query should match but returns 0 results**
- **Hypothesis:** The deployed code may not include commit da03041, OR the Supabase query has a runtime issue (e.g., RLS policy, column type mismatch, or the DB hasn't been updated)
- **Migration migration_005_normalize_categories.sql exists but may not have been run** — if DB has non-standard values not covered by variants, the `.in()` would fail
- **Recommendation:** Run migration_005 in Supabase SQL Editor AND verify the deployment includes da03041

---

### 4. Question Detail Page (`/questions/[id]`)

| Status | Finding |
|--------|---------|
| ✅ | Question title, description, category badge, countdown all render |
| ✅ | Consensus percentage, forecaster count, close date display correctly |
| ✅ | Probability bar (ProbBar) renders for questions with forecasts |
| ✅ | Auth prompt ("Log in to add your forecast") shown for unauthenticated users |
| ✅ | Resolution source link displayed |
| ❌ | **Broken resolution source URL:** Bitcoin question links to `https://coingecko` (missing `.com`) — this is a DB data issue, not a code bug |
| ⚠️ | Blind phase UI not testable (no questions currently in blind phase) |
| ✅ | Footer present |

---

### 5. Leaderboard (`/leaderboard`)

| Status | Finding |
|--------|---------|
| ✅ | Page renders with proper heading and description |
| ✅ | Period filters (All time, This month, This week) present |
| ✅ | Table headers correct: #, Forecaster, Brier, Log Score, Predictions, Resolved |
| ⚠️ | "No data available." — expected since 0 questions are resolved |
| ✅ | Footer present |
| 💡 | Consider showing "Coming soon" or "No resolved questions yet — make predictions to see rankings" message |

---

### 6. Auth Pages (`/auth/login`, `/auth/signup`)

**Login Page:**
| Status | Finding |
|--------|---------|
| ✅ | Clean layout with "Welcome back" heading |
| ✅ | Google OAuth button ("Continue with Google") |
| ✅ | Email/password form fields with proper placeholders |
| ✅ | "Forgot password?" link to `/auth/reset-password` |
| ✅ | "New to Baycast? Join for free" link to signup |
| ✅ | Footer present |

**Signup Page:**
| Status | Finding |
|--------|---------|
| ✅ | "Join Baycast" heading with subtitle |
| ✅ | Google OAuth button |
| ✅ | Username, Email, Password fields |
| ✅ | "Already a member? Log in" link |
| ✅ | Footer present |
| ⚠️ | No password strength indicator |
| ⚠️ | No terms of service / privacy policy acceptance checkbox |

---

### 7. Profile Page (`/profile`)

| Status | Finding |
|--------|---------|
| ❌ **CRITICAL** | **Blank page for unauthenticated users** — code has `redirect('/auth/login')` but it silently fails; renders layout (nav + footer) with no `<main>` content |
| ✅ | Footer present |
| ⚠️ | Code exists for redirect logic (`app/profile/page.tsx` lines 15-17) but doesn't execute properly — possible Supabase client error swallowed by error boundary |

---

### 8. Blocks Page (`/blocks`)

| Status | Finding |
|--------|---------|
| ✅ | Page renders with heading and description |
| ✅ | Proper empty state: "No blocks available yet." |
| ✅ | Footer present |

---

## Cross-Cutting Checks

### Footer Consistency
| Page | Footer Present? |
|------|----------------|
| `/` (Landing) | ✅ |
| `/questions` | ✅ |
| `/questions?category=*` | ✅ |
| `/questions/[id]` | ✅ |
| `/leaderboard` | ✅ |
| `/auth/login` | ✅ |
| `/auth/signup` | ✅ |
| `/profile` | ✅ |
| `/blocks` | ✅ |

**Result: Footer is present on ALL pages ✅**

### Dark Theme Consistency
- Dark theme appears consistent across all pages based on CSS class usage (`bg-bg-surface`, `border-border-dark`, `text-text-primary`, `text-text-secondary`, `text-accent-green`, `text-accent-blue`)
- Accent colors used consistently (green for categories/primary actions, blue for links/secondary)

### Loading States
- ⚠️ No visible loading skeletons or spinners during page transitions (Next.js App Router handles this server-side, so users see blank page during navigation)
- Loading.tsx files exist for profile: `app/profile/[username]/loading.tsx` — good pattern, should be applied to all pages

### Error States
- Question detail has error handling for forecast fetch failures (line 98-106)
- Profile page lacks visible error handling (blank page = silent failure)

### Mobile Responsiveness
- ⚠️ Not explicitly tested (no viewport resize capability), but:
  - Landing page uses responsive-friendly patterns
  - Category filters use `flex-wrap` (good for mobile)
  - Questions grid uses `space-y-3` (single column, mobile-friendly)
  - Auth forms appear to be single-column (good for mobile)

### JavaScript Errors
- ✅ No console errors detected on any page

---

## User Flow Test: Landing → CTA → Auth → Questions → Detail → Forecast

| Step | Action | Expected | Actual | Status |
|------|--------|----------|--------|--------|
| 1 | Land on `/` | See hero + CTA | ✅ Works | ✅ |
| 2 | Click "Join the experiment" | Navigate to `/auth/signup` | ✅ Redirects correctly | ✅ |
| 3 | From signup, click "Log in" | Navigate to `/auth/login` | ✅ Works | ✅ |
| 4 | Navigate to `/questions` | See all 10 questions | ✅ All 10 shown | ✅ |
| 5 | Click Technology filter | See Technology questions only | ❌ "No questions" | ❌ |
| 6 | Click a question card | See question detail | ✅ Works | ✅ |
| 7 | Try to forecast (no auth) | See "Log in" prompt | ✅ Shows auth prompt | ✅ |
| 8 | Navigate to `/profile` (no auth) | Redirect to `/auth/login` | ❌ Blank page | ❌ |

**Flow completion: 6/8 steps passed (75%)**

---

## Critical Bugs (Must Fix Before Launch)

### 🔴 BUG-1: Category Filters Return Zero Results
- **Severity:** P0 — Core feature broken
- **Pages:** `/questions?category=*`
- **Impact:** Users cannot filter questions by category
- **Suspected cause:** DB category values don't match `getCategoryVariants()` output, OR migration_005 hasn't been run
- **Fix:** 
  1. Run `migration_005_normalize_categories.sql` in Supabase SQL Editor
  2. Verify deployed code includes commit da03041
  3. Add logging to verify what variants are being sent to Supabase

### 🔴 BUG-2: Profile Page Blank for Unauthenticated Users
- **Severity:** P1 — Broken redirect
- **Pages:** `/profile`
- **Impact:** Users see blank page instead of being redirected to login
- **Suspected cause:** Supabase client error silently caught, redirect not executing
- **Fix:** Add explicit error handling in profile page.tsx; ensure redirect fires even if Supabase fails

### 🟡 BUG-3: Broken Resolution Source URL
- **Severity:** P2 — Data quality issue
- **Pages:** `/questions/f106f845-82ad-4137-aa11-09b497e92848` (Bitcoin question)
- **Impact:** Resolution source links to `https://coingecko` (404) instead of proper URL
- **Cause:** DB seed data has incorrect URL
- **Fix:** Update the question's `resolution_source` in Supabase to `https://www.coingecko.com/en/coins/bitcoin`

---

## Minor Issues & UX Improvements

| # | Issue | Priority | Page | Suggestion |
|---|-------|----------|------|------------|
| 1 | Onboarding modal re-appears on every new session | P3 | `/` | Add localStorage flag to dismiss permanently |
| 2 | No loading skeletons on page transitions | P3 | All | Add `loading.tsx` to key routes |
| 3 | Leaderboard empty state is generic | P3 | `/leaderboard` | Add contextual message about needing resolved questions |
| 4 | No password strength indicator on signup | P3 | `/auth/signup` | Add zxcvbn-based strength meter |
| 5 | No ToS/privacy checkbox on signup | P3 | `/auth/signup` | Add required checkbox before form submission |
| 6 | Category "All" link text could be clearer | P4 | `/questions` | Consider "All Categories" label |
| 7 | No favicon visible in test (may be browser-specific) | P4 | All | Verify favicon loads correctly |
| 8 | Geopolitics category not in filter list | P4 | `/questions` | Either add as alias or ensure questions use "Politics" |

---

## Recommendations for Launch

1. **BLOCKING:** Fix category filters (BUG-1) — this is the #1 user-facing feature
2. **BLOCKING:** Fix profile page redirect (BUG-2)  
3. **HIGH:** Run migration_005_normalize_categories.sql in production DB
4. **HIGH:** Fix broken resolution source URL in DB
5. **MEDIUM:** Add loading skeletons to key routes
6. **MEDIUM:** Test on actual mobile devices
7. **LOW:** Add password strength indicator
8. **LOW:** Persist onboarding dismissal

---

## Test Environment Notes
- Browser: Headless Chromium (automated)
- All pages tested without authentication (except where noted)
- No JavaScript console errors detected on any page
- 10 questions in DB, 1 forecast, 1 user (Smil)
- Vision/screenshot analysis had provider issues — manual visual review recommended
