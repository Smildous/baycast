# E2E Verification Report — Baycast Production Audit (Afternoon)

**Date:** 2026-05-05 (Afternoon session)  
**Auditor:** PRODUCT Agent (automated)  
**Environment:** https://baycast-p.vercel.app (production)  
**Deployed Commit:** b9f8bc5 → 6c20155 (latest)  
**Previous Report:** E2E_VERIFY_2026-05-05.md  
**Purpose:** Verify fixes from b9f8bc5 are live; pre-launch audit for remaining issues

---

## Executive Summary

| Area | Status | Notes |
|------|--------|-------|
| Landing Page (/) | ✅ PASS | Loads, stats visible, nav correct, footer present |
| Questions Page (/questions) | ⚠️ PARTIAL | Questions load; **category filters STILL BROKEN** |
| Question Detail | ✅ PASS | Loads with correct data |
| Auth (/auth/login) | ✅ PASS | Google OAuth + email/password present |
| Auth (/auth/signup) | ✅ PASS | Google OAuth + email/password + username present |
| Profile Redirect | ✅ PASS | Redirects to /auth/login when unauthenticated |
| Leaderboard (/leaderboard) | ✅ PASS | Loads, empty (expected — no resolved predictions) |
| Blocks (/blocks) | ✅ PASS | Loads, empty (expected — no blocks created) |
| Mobile Navigation | ✅ PASS | Hamburger menu exists (md:hidden), slide-out panel present |
| Console Errors | ✅ PASS | Zero JS errors across all tested pages |

**Overall:** 1 CRITICAL bug remains (category filters). All other flows pass.

---

## Detailed Test Results

### 1. Landing Page (/)

**Status:** ✅ PASS

| Check | Result |
|-------|--------|
| Page loads | ✅ Title: "Baycast — Collective Intelligence Platform" |
| Stats displayed | ✅ "10 Active questions, 2 Forecasters, 1 Predictions made" |
| Nav links | ✅ Home(/), Questions(/questions), Blocks(/blocks), Leaderboard(/leaderboard), Get Started(/auth/signup) |
| Footer visible | ✅ "BAYCAST © 2026" + footer links (Questions, Leaderboard, Blocks, Sign up) |
| Hero section | ✅ H1: "A different kind of intelligence" |
| Live questions section | ✅ 5 questions shown with categories, time remaining |
| CTA links | ✅ "Start forecasting" → /questions, "Join the experiment" → /auth/signup |
| Onboarding modal | ✅ Appears on first visit with "Close onboarding" button |

### 2. Questions Page (/questions)

**Status:** ⚠️ PARTIAL — Category filters broken

| Check | Result |
|-------|--------|
| Page loads | ✅ Title: "Questions — Baycast" |
| Questions displayed | ✅ 10 questions visible (all open) |
| Category badges | ✅ Correct categories shown: Technology(2), Economy(2), Science(2), Other(4) |
| Status filters | ✅ Open, Closed, Resolved links present |
| Pagination | ⚠️ Not tested (only 10 questions = 1 page) |
| Question detail links | ✅ Each question links to /questions/[id] |

#### Category Filter Test Results — ❌ ALL FAIL

| Category | URL | Expected | Actual | Status |
|----------|-----|----------|--------|--------|
| Technology | /questions?category=Technology | 2 questions | "No questions in this category." | ❌ FAIL |
| Economy | /questions?category=Economy | 2 questions | "No questions in this category." | ❌ FAIL |
| Science | /questions?category=Science | 2 questions | "No questions in this category." | ❌ FAIL |
| Other | /questions?category=Other | 4 questions | "No questions in this category." | ❌ FAIL |
| Sports | /questions?category=Sports | 0 questions | "No questions in this category." | ✅ (expected empty) |
| Politics | /questions?category=Politics | 0 questions | "No questions in this category." | ✅ (expected empty) |
| Culture | /questions?category=Culture | 0 questions | "No questions in this category." | ✅ (expected empty) |
| AI | /questions?category=AI | 0 questions | "No questions in this category." | ✅ (expected empty) |
| Crypto | /questions?category=Crypto | 0 questions | "No questions in this category." | ✅ (expected empty) |
| Entertainment | /questions?category=Entertainment | 0 questions | "No questions in this category." | ✅ (expected empty) |

**Key observation:** Categories with KNOWN data (Technology, Economy, Science, Other) all return empty. Categories without data also return empty (correctly). The filter is broken for ALL categories — it's not a data issue.

### 3. Question Detail Page

**Status:** ✅ PASS

Tested: `/questions/d451ce46-a8da-46a1-8452-6d49f73cc636` (Will GPT-5 be released before end of 2026?)

| Check | Result |
|-------|--------|
| Title | ✅ "Will GPT-5 be released before end of 2026?" |
| Category | ✅ "Technology" |
| Time remaining | ✅ "240d left" |
| Description | ✅ Full resolution criteria displayed |
| Deadline | ✅ "Dec 31, 2026" |
| Resolution source | ✅ Link to openai.com |
| Consensus | ✅ "0 Forecasters" (correct — no forecasts on this question) |
| Login prompt | ✅ "Log in to add your forecast" with link to /auth/login |

### 4. Auth Flow

#### Login Page (/auth/login)
**Status:** ✅ PASS

| Check | Result |
|-------|--------|
| Page loads | ✅ |
| Heading | ✅ "Welcome back" |
| Google OAuth | ✅ "Continue with Google" button |
| Email field | ✅ Placeholder: "you@example.com" |
| Password field | ✅ Masked input |
| Submit button | ✅ "Log in" |
| Forgot password | ✅ Link to /auth/reset-password |
| Signup link | ✅ "Join for free" → /auth/signup |

#### Signup Page (/auth/signup)
**Status:** ✅ PASS

| Check | Result |
|-------|--------|
| Page loads | ✅ |
| Heading | ✅ "Join Baycast" |
| Google OAuth | ✅ "Continue with Google" button |
| Username field | ✅ Placeholder: "YourName" |
| Email field | ✅ Placeholder: "you@example.com" |
| Password field | ✅ Masked input |
| Submit button | ✅ "Create my account" |
| Login link | ✅ "Already a member? Log in" → /auth/login |

### 5. Profile Page (/profile)

**Status:** ✅ PASS

| Check | Result |
|-------|--------|
| Redirect works | ✅ Redirects to /auth/login |
| URL after redirect | ✅ https://baycast-p.vercel.app/auth/login |

### 6. Leaderboard Page (/leaderboard)

**Status:** ✅ PASS

| Check | Result |
|-------|--------|
| Page loads | ✅ Title: "Leaderboard — Baycast" |
| Period filters | ✅ "All time", "This month", "This week" |
| Table headers | ✅ #, Forecaster, Brier, Log Score, Predictions, Resolved |
| Data | "No data available." — **Expected** (no resolved predictions in beta) |

### 7. Blocks Page (/blocks)

**Status:** ✅ PASS

| Check | Result |
|-------|--------|
| Page loads | ✅ Title includes Baycast |
| Heading | ✅ "Question Blocks" |
| Content | "No blocks available yet." — **Expected** (feature not yet populated) |

### 8. Mobile UX

**Status:** ✅ PASS

| Check | Result |
|-------|--------|
| Hamburger button | ✅ `<button class="md:hidden" aria-label="Open menu">` |
| Slide-out menu | ✅ `<div class="fixed ... md:hidden translate-x-full">` (hidden by default) |
| Close button | ✅ `<button aria-label="Close menu">` |
| Mobile nav links | ✅ Home, Questions, Blocks, Leaderboard, Log in, Get Started |
| Responsive classes | ✅ Uses Tailwind `md:hidden` for mobile-only elements |

---

## Bugs Found

### BUG-001: Category filters return no results (CRITICAL) — REGRESSION

- **Severity:** CRITICAL
- **Status:** UNRESOLVED (persists after b9f8bc5)
- **File:** `app/questions/page.tsx:81,92`
- **Description:** All category filters on `/questions` return "No questions in this category." despite questions with those categories being visible on the "All" view. This is the same bug identified in previous E2E audits (AQ-027, AQ-046). The `ilike` fix from commit b9f8bc5 does not resolve the issue in production.
- **Evidence:**
  - `/questions?category=Technology` → 0 results (2 Technology questions exist)
  - `/questions?category=Economy` → 0 results (2 Economy questions exist)
  - `/questions?category=Science` → 0 results (2 Science questions exist)
  - `/questions?category=Other` → 0 results (4 Other questions exist)
- **Steps to Reproduce:**
  1. Navigate to https://baycast-p.vercel.app/questions
  2. Observe 10 questions with categories: Technology(2), Economy(2), Science(2), Other(4)
  3. Click "Technology" filter
  4. Page shows "No questions in this category." — BUG
- **Root Cause Analysis:**
  - Code uses `.ilike('category', normalizedCategory)` where `normalizedCategory` = "Technology" (from `normalizeCategory()`)
  - The `normalizeCategory()` function correctly maps "technology" → "Technology" via `CATEGORY_ALIASES`
  - Supabase `.ilike()` should do case-insensitive exact match
  - **Suspected cause:** The Supabase PostgREST `ilike` operator may require `%` wildcards for pattern matching, OR there's a mismatch between the deployed code and what's in git (the deployed build may be stale), OR the database categories don't match the canonical forms despite the seed SQL showing they should
  - **Alternative cause:** RLS (Row Level Security) policies on the `questions` table may be interfering with the filtered query specifically
- **Suggested Fix:**
  1. **Immediate:** Try `.eq('category', normalizedCategory)` instead of `.ilike()` — since `normalizeCategory()` already produces canonical forms, exact match should suffice
  2. **Debug:** Add server-side logging to verify what `normalizedCategory` resolves to and what the Supabase query actually returns
  3. **Verify deployment:** Confirm the deployed Vercel build includes the latest code from commit 6c20155 — check Vercel deployment logs
  4. **Database check:** Run `SELECT DISTINCT category FROM questions WHERE status='open'` directly against the production Supabase to verify actual category values in the DB

---

## Regression Verification (b9f8bc5 fixes)

| Fix in b9f8bc5 | Verified | Status |
|----------------|----------|--------|
| Category filters (ilike instead of eq) | ✅ Tested | ❌ STILL BROKEN — ilike doesn't work either |
| Pagination count | ⚠️ Can't verify | Only 10 questions (1 page), no pagination controls needed |
| Profile route redirect | ✅ Tested | ✅ FIXED — /profile → /auth/login |
| Force-dynamic rendering | ✅ Tested | ✅ All pages render with fresh data |

---

## Previous Bugs Status

| Bug ID | Description | Previous Status | Current Status |
|--------|-------------|-----------------|----------------|
| AQ-027 | Category filters empty | Open | ❌ Still open |
| AQ-037 | No mobile nav | Open | ✅ Fixed (hamburger menu exists) |
| AQ-042 | Pagination controls missing | Open | ⚠️ Can't verify (only 10 questions) |

---

## Recommendations

1. **CRITICAL — Fix category filters before launch.** This is a core feature that's broken. The `ilike` approach isn't working. Try switching to `.eq()` and add debug logging to understand the mismatch.
2. **Verify deployment freshness.** The deployed site may not reflect the latest commit. Check Vercel deployment timestamps vs git commit dates.
3. **Add more seed questions** (35+) to enable pagination testing.
4. **Add E2E tests** for category filtering to prevent regression (Playwright/Cypress).

---

## Test Environment Notes

- Browser: Headless Chromium (1280px viewport)
- Vision AI: Unavailable (provider error) — visual checks done via DOM snapshot only
- Console errors: None detected on any page
- All navigation links verified correct
- Footer present on all pages
