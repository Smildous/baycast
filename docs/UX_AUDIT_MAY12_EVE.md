# Baycast UX Audit — Evening Pass
**Date:** May 12, 2026 (04:10 PM)
**Auditor:** Hermes Agent (Product/QA)
**URL:** https://baycast-p.vercel.app
**Stack:** Next.js 14 + Supabase + Tailwind

---

## Summary Score: 6.5/10 (up from 5.5 after prior fixes)

The core experience is functional and coherent. The value proposition is clear, navigation is complete, and the forecast flow is intuitive. However, several **data integrity and polish issues** remain that would erode user trust at first contact.

---

## Issues Found

### 1. 🔴 Activity Feed Shows 400% Forecast (Data Validation Bug)
- **Page:** `/activity`
- **What's wrong:** The activity feed displays "Simba forecasted **400%** on Will Bitcoin exceed $200,000 before 2027?" A probability forecast of 400% is impossible — valid range is 0–100%. This is a critical data integrity issue that undermines platform credibility.
- **Severity:** HIGH
- **Suggested fix:** Add server-side validation to clamp forecast values to [0, 100] before insertion. Audit the `forecasts` table for any values outside valid range. Add a database CHECK constraint.

### 2. 🟡 Questions Page Shows Duplicate Cards
- **Page:** `/questions`
- **What's wrong:** The page shows a "⚡ Closing Soon" section with 3 questions at the top, then lists ALL 10 questions below (including the same 3). This means 3 questions appear twice on the page, creating a confusing user experience.
- **Severity:** MEDIUM
- **Suggested fix:** Either: (a) remove the "Closing Soon" carousel if there's no real urgency differentiation (all questions have 233d+ remaining), or (b) show "Closing Soon" questions only in the top section and exclude them from the main list below.

### 3. 🟡 No Crypto/Finance Category Filter
- **Page:** `/questions`
- **What's wrong:** Category filters show: All, Politics, Technology, Economy, Science, Other. There is no dedicated "Crypto" or "Crypto/Finance" category in the UI, despite multiple crypto questions in the database batches (Bitcoin, Solana ETF, Ethereum, DeFi TVL, etc.). Crypto questions would likely appear under "Other" or "Economy" — both inaccurate.
- **Severity:** MEDIUM
- **Suggested fix:** Add "Crypto" or "Crypto/Finance" as a category filter option. Ensure category values in the DB match the filter labels.

### 4. 🟡 Signup Featured Questions Show Stale/Hardcoded Data
- **Page:** `/auth/signup`
- **What's wrong:** The "Featured Questions" section at the bottom shows questions with dates like "September 2025" and forecaster counts (142, 98, 67) that appear to be hardcoded demo content, not live data. The actual platform has 10 questions with nearly zero forecasts. This is misleading.
- **Severity:** MEDIUM
- **Suggested fix:** Either (a) pull live data from the API for the signup page featured questions, or (b) remove the section entirely until real activity data exists. Showing fake engagement numbers is worse than showing none.

### 5. 🟡 Signup Form: No Inline Validation
- **Page:** `/auth/signup`
- **What's wrong:** Clicking "Create my account" with all fields empty produces no visible error messages. There is no inline validation for email format, password strength, or username requirements. The form appears to silently fail.
- **Severity:** MEDIUM
- **Suggested fix:** Add client-side validation: highlight empty required fields with red borders, show specific error messages ("Email is required", "Password must be at least 8 characters"), and provide real-time validation as the user types.

### 6. 🟡 Question Detail: Competing CTAs for Logged-Out Users
- **Page:** `/questions/[id]` (e.g., GPT-5 question)
- **What's wrong:** The page shows BOTH a "Submit forecast" button AND a "Sign up to submit your forecast" message simultaneously. The Submit button is clickable even when not logged in. This is confusing — users may try to submit and get an error or nothing happens.
- **Severity:** MEDIUM
- **Suggested fix:** When the user is not authenticated, disable or hide the Submit button and show only the signup prompt. Optionally make the slider interactive but gate the submission behind auth.

### 7. 🟢 No Password Requirements Shown
- **Page:** `/auth/signup`
- **What's wrong:** The password field has no indication of minimum requirements (length, complexity). Users may enter a weak password and get a server-side rejection with a poor error message.
- **Severity:** LOW
- **Suggested fix:** Add helper text below the password field: "Minimum 8 characters" or equivalent.

### 8. 🟢 Leaderboard Empty State
- **Page:** `/leaderboard`
- **What's wrong:** The leaderboard shows "waiting for its champion" which is acceptable, but the page feels sparse. No demo/sample data to illustrate what a populated leaderboard would look like.
- **Severity:** LOW
- **Suggested fix:** Consider showing a "Preview" mode with anonymized or fictional sample entries to demonstrate the leaderboard format. Or add AI agent entries to seed the board.

### 9. 🟢 Blocks Page Is Empty
- **Page:** `/blocks`
- **What's wrong:** No blocks have been created. The page shows a placeholder message. This feature is incomplete.
- **Severity:** LOW
- **Suggested fix:** Consider removing from navigation until blocks are ready, or create at least 2-3 themed blocks to demonstrate the feature.

### 10. 🟢 Question Card Time Labels Not Urgency-Coded
- **Page:** `/questions`
- **What's wrong:** All questions show time remaining in days (e.g., "233d left", "414d left", "598d left", "1329d left") with no color or urgency differentiation. Questions closing in 233 days look identical to those closing in 1329 days.
- **Severity:** LOW
- **Suggested fix:** Add color coding: green for >180 days, yellow for 30-180 days, red for <30 days. This would make the "Closing Soon" section more meaningful.

### 11. 🟢 Navigation Overload on Mobile
- **Page:** Global nav
- **What's wrong:** Desktop nav shows 8 items: Home, Questions, Activity, Blocks, Leaderboard, How It Works, Compare, Get Started Free. On mobile viewports, this many items likely overflow or require a hamburger menu that may hide important pages.
- **Severity:** LOW
- **Suggested fix:** Verify mobile nav renders properly with a hamburger menu. Consider reducing to 4-5 primary nav items and moving secondary pages (How It Works, Compare) to the footer only.

---

## What's Working Well ✅

1. **Clear Value Proposition:** Landing page clearly explains "predict the future, Brier scores, no gambling." The hero copy is compelling.
2. **Forecast Slider + Quick-Select:** The question detail page has an intuitive slider with 5%/10%/25%/50%/75%/90%/95% quick buttons. Good UX pattern.
3. **Complete Navigation:** All key pages are accessible from the top nav. Footer provides secondary navigation. No dead links found.
4. **How It Works Page:** Excellent educational content with Brier score explanation, prediction markets comparison table, and FAQ accordion. Thorough and well-structured.
5. **Compare Page:** Detailed feature comparison against Polymarket, Metaculus, Manifold, and Kalshi. Strong competitive positioning.
6. **Share Button:** Question detail page has a share button for social distribution.
7. **Auth Flow:** Google OAuth + email/password options. Clean login/signup toggle. Forgot password link present.
8. **No JS Errors:** Console is clean — no JavaScript errors detected on any page.
9. **Category + Status Filters:** Questions page has category tabs, status filters (Open/Closed/Resolved), and sort options (Closing Soon/Newest/Most Active).
10. **Search Box:** Questions page has a search input field.

---

## Mobile Viewport Check
- **Viewport tested:** 1280×720 (default desktop)
- **No console errors** on any page
- **No visible layout breaks** at desktop width
- **Recommendation:** Test at 375×812 (iPhone) and 768×1024 (iPad) viewports explicitly. The nav overflow issue (#11) is the primary mobile concern.

---

## Priority Action Items

| Priority | Issue | Effort |
|----------|-------|--------|
| P0 | Fix 400% forecast data validation bug (#1) | Small |
| P1 | Remove duplicate questions or fix Closing Soon logic (#2) | Small |
| P1 | Fix signup page hardcoded featured questions (#4) | Medium |
| P1 | Add form validation to signup (#5) | Medium |
| P1 | Gate Submit button behind auth (#6) | Small |
| P2 | Add Crypto category filter (#3) | Small |
| P2 | Add password requirements text (#7) | Trivial |
| P3 | Seed leaderboard/blocks with sample data (#8, #9) | Medium |
| P3 | Add urgency color coding to time remaining (#10) | Small |
| P3 | Verify mobile nav behavior (#11) | Small |

---

*Audit completed: May 12, 2026 04:10 PM UTC*
