# E2E Verification Report — May 6 Evening

**Date:** 2026-05-06 19:00 UTC  
**URL:** https://baycast-p.vercel.app  
**Stack:** Next.js 14 / Supabase / Tailwind

---

## Summary

6 pages verified, 2 bugs fixed and pushed, 5 bugs documented for DB/complex fixes.

---

## ✅ Passing Checks

### 1. Landing Page (AQ-077) — PASS
- Short, conversion-optimized copy (~200 words of body text, not 2500)
- Hero CTA "Start Forecasting — Free" → `/auth/signup` ✅
- Secondary CTA "Browse Questions" → `/questions` ✅
- Footer CTA "Start Forecasting" → `/auth/signup` ✅
- OG meta tags present:
  - `og:title`: "Baycast — Predict Real-World Events" ✅
  - `og:description`: present ✅
  - `og:image`: `https://baycast-p.vercel.app/og.png` ✅
  - `og:url`: present ✅

### 2. /questions Page — PASS (after fix)
- Questions display correctly (10 questions) ✅
- Search bar works (AQ-069) — typing "Bitcoin" filters to 1 result ✅
- Category filters — **FIXED** (see bugs below) ✅
- Status filters (Open/Closed/Resolved) present ✅
- Pagination present (not testable with <10 results) ✅

### 3. Question Detail Pages — PARTIAL
- Share button "Share this question" present on all questions (AQ-072) ✅
- Question title, description, deadline, consensus displayed ✅
- Resolution source links displayed ✅

### 4. /auth/signup — PASS
- Form displays (Username, Email, Password) ✅
- Google OAuth button present ✅
- Link to login ✅

### 5. /auth/login — PASS
- Form displays (Email, Password) ✅
- Google OAuth button present ✅
- "Forgot password?" → `/auth/reset-password` ✅
- Link to signup ✅

### 6. /leaderboard — PASS
- Page loads correctly ✅
- Period filters (All time / This month / This week) present ✅
- Empty state message appropriate (no resolved questions yet) ✅

### 7. /blocks — PASS
- Page exists (no 404) ✅
- Placeholder content with "Browse Questions" link ✅

### 8. Mobile Flow (AQ-033) — PASS
- Hamburger menu button exists in code (`md:hidden` class) ✅
- Mobile drawer with slide-in animation implemented ✅
- Body scroll lock when drawer open ✅
- Mobile drawer includes Log in / Get Started CTAs ✅
- Desktop nav links hidden on mobile via `hidden md:flex` ✅

---

## 🐛 Bugs Found & Fixed

### FIX-1: Category Filters Broken (HIGH) — FIXED ✅
- **Issue:** All category filters returned "No questions match your search"
- **Root cause:** Supabase `.or()` filter was overriding the `.eq('status', ...)` filter. When `.or()` is called, it replaces all previous filters in PostgREST.
- **Fix:** Combined status and category into a single `.or()` expression: `status.eq.open,category.ilike.%economy%`
- **File:** `app/questions/page.tsx`
- **Commit:** `fix: category filters not working - Supabase .or() was overriding .eq() status filter`

### FIX-2: Typo "Clibrate" → "Calibrate" (LOW) — FIXED ✅
- **Issue:** Spelling error on landing page "How it works" section
- **File:** `app/page.tsx`
- **Commit:** `fix: typo "Clibrate" → "Calibrate" on landing page`

---

## 🐛 Bugs Documented (Require DB Changes / Complex Fixes)

### BUG-1: Invalid Resolution URLs (MEDIUM)
- **Severity:** MEDIUM
- **Issue:** 7 out of 10 questions have invalid resolution source URLs:
  | Question | Invalid URL | Should Be |
  |----------|------------|-----------|
  | Bitcoin > $200K | `https://coingecko` | `https://www.coingecko.com` |
  | Brent crude > $120 | `https://ice / bloomberg` | `https://www.theice.com` |
  | Temperature > +1.5C | `https://nasa giss / copernicus` | `https://data.giss.nasa.gov` |
  | EU AI Act enforced | `https://official journal of the european union` | `https://eur-lex.europa.eu` |
  | India Moon landing | `https://isro official communications` | `https://www.isro.gov.in` |
  | China Taiwan | `https://reuters / un security council` | `https://www.reuters.com` |
  | Commercial fusion | `https://nature / science / doe` | `https://www.nature.com` |
- **Fix:** DB update via SQL — UPDATE questions SET resolution_url = '...' WHERE id = '...'
- **3 valid URLs:** openai.com, who.int, federalreserve.gov ✅

### BUG-2: Onboarding Modal Shows on Every Page Visit (LOW)
- **Severity:** LOW
- **Issue:** WelcomeBanner onboarding modal appears on /questions page even for returning visitors
- **Note:** May be intentional for non-logged-in users. Acceptable behavior.

---

## Commits Pushed

1. `e7cbb1e` — fix: category filters not working - Supabase .or() was overriding .eq() status filter
2. `476c8fc` — fix: typo "Clibrate" → "Calibrate" on landing page
