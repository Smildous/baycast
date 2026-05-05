# Baycast — Sprint 5 UX Improvements

**Date:** 2026-05-05  
**Based on:** Live E2E audit (baycast-p.vercel.app) + UX_AUDIT.md (2026-05-04)  
**Focus:** Conversion (signup → first forecast) and engagement (return visits)  
**Stack:** Next.js 14 + TypeScript + Tailwind CSS + Supabase

---

## Live E2E Audit Results (2026-05-05)

| # | Flow | Status | Notes |
|---|------|--------|-------|
| 1 | Landing page (`/`) | ✅ PASS | Loads fast. Stats visible (10 questions, 2 forecasters, 1 prediction). Hero section compelling. Onboarding modal still fires on first visit (AQ-028). |
| 2 | Questions (`/questions`) | ⚠️ PARTIAL | 10 questions visible with cards, countdowns, consensus. Category filters broken — clicking "Technology" returns 0 results despite Technology questions existing (AQ-027). Status filters work. No pagination needed (all 10 fit). |
| 3 | Question detail (`/questions/[id]`) | ✅ PASS | Detail page loads with title, description, metadata, resolution source. Shows "Log in to add your forecast" for unauthenticated users. No forecast form shown (expected). Consensus displays "0" for unanswered questions (minor). |
| 4 | Leaderboard (`/leaderboard`) | ✅ PASS | Loads properly. Improved empty state: "No forecasters on the leaderboard yet" with CTA. Period filters (All time/This month/This week) visible. No data (expected — 0 resolved questions). |
| 5 | Auth signup (`/auth/signup`) | ✅ PASS | Renders properly. Google OAuth + email signup. Username/email/password fields. "Already a member? Log in" link. Missing: password strength indicator, confirmation field, terms checkbox. |
| 6 | Auth login (`/auth/login`) | ✅ PASS | Renders properly. Google OAuth + email login. **"Forgot password?" link now present** (was UX-004 — FIXED). Links to `/auth/reset-password` which renders correctly. |
| 7 | Blocks (`/blocks`) | ⚠️ PARTIAL | Page loads. Improved empty state with emoji + description + "Browse Questions" CTA. Still empty (no blocks created). Nav link still points to empty page. |
| 8 | Profile (`/profile`) | ✅ PASS | Correctly redirects to login page when unauthenticated. URL stays at `/profile`, content is login form. |
| 9 | Mobile hamburger menu | ✅ PASS | **Now implemented** (was UX-001 — FIXED). Slide-in drawer from right with all nav links (Home, Questions, Blocks, Leaderboard) + Log in/Get Started at bottom. Proper `md:hidden` toggle. Uses `translate-x-full` for show/hide animation. |

### Bugs Fixed Since Last Audit
- **UX-001:** Mobile hamburger menu — ✅ Now implemented as a slide-in drawer
- **UX-004:** "Forgot password?" link — ✅ Added to login page, reset-password page works

### Bugs Still Open
- **AQ-028:** Onboarding modal blocks first-time visitors (no Escape/backdrop dismiss)
- **AQ-027:** Category filters return wrong results (Technology filter → 0 results)

---

## Top 5 UX Improvements for Sprint 5

### 1. 🔴 First Forecast Flow — Guided Onboarding (Conversion)

**Problem:**  
After signup, users land on... nowhere specific. There's no guided path from "I just created an account" to "I made my first forecast." The question detail page shows "Log in" even when the user just signed up. The forecast form requires navigating to a question, understanding the interface, and finding the slider — all without guidance.

**Proposed Solution:**  
Create a post-signup redirect flow:
1. After successful signup, redirect to `/questions` with a welcome banner: "Welcome! Pick a question to make your first forecast."
2. On first visit to any question detail page (tracked via `localStorage` or user metadata), show a dismissible tooltip/highlight on the forecast slider: "Slide to set your probability, then click Submit."
3. After first forecast submission, show a celebratory state: "Your first forecast is in! Come back when questions resolve to see your score."

**Estimated Effort:** M (2-3 days)  
**Affected Files:**
- `app/auth/signup/page.tsx` — Add redirect after successful signup
- `app/questions/[id]/page.tsx` — Add first-visit tooltip for forecast form
- `components/ForecastForm.tsx` — Add celebratory state after first submission
- `app/components/OnboardingProvider.tsx` — Track "first forecast" milestone

---

### 2. 🔴 Fix Category Filters + Add Search (Engagement)

**Problem:**  
Category filters are broken (AQ-027). Clicking "Technology" returns 0 results despite Technology questions being visible in the default view. This is a core navigation feature. Additionally, with only 10 questions and no search, users can't quickly find topics they care about.

**Proposed Solution:**  
1. Debug and fix the `normalizeCategory()` function. The likely cause is DB category values not matching the `CATEGORIES` array casing. Run a DB migration to normalize: `UPDATE questions SET category = INITCAP(LOWER(category))`. Switch from `.ilike()` to `.eq()` for exact matching.
2. Add a search bar above the filter pills that filters questions by title text using `.ilike('title', '%query%')` with 300ms debounce.
3. Add a result count: "Showing 3 of 10 questions" below the subtitle.

**Estimated Effort:** S (1-2 days)  
**Affected Files:**
- `app/questions/page.tsx` — Fix category query, add search param, add result count
- `lib/types.ts` — Fix `normalizeCategory()` function
- `sql/` — Migration to normalize category casing in DB

---

### 3. 🔴 Onboarding Modal — Delay or Gate Behind Intent (Conversion)

**Problem:**  
The full-screen onboarding modal appears immediately on first visit (AQ-028). Users must click "Close onboarding" to see any content. This kills conversion for curious visitors who want to browse before committing. The modal cannot be dismissed by Escape key or backdrop click.

**Proposed Solution:**  
1. Delay the modal by 3 seconds: show the hero section first, then overlay the modal after the user has had a chance to start reading.
2. Allow dismissal via Escape key and backdrop click.
3. Alternatively (better for conversion): remove the auto-trigger entirely. Instead, show the onboarding as a step in the signup flow or as a dismissible banner at the top of the questions page: "New here? Learn how Baycast works →"

**Estimated Effort:** S (0.5-1 day)  
**Affected Files:**
- `app/components/OnboardingProvider.tsx` — Add delay timer, Escape key listener
- `app/components/OnboardingModal.tsx` — Add backdrop click handler

---

### 4. ⚠️ Return Visit Engagement — Notification System (Engagement)

**Problem:**  
There is no mechanism to bring users back after they make forecasts. Questions have deadlines weeks/months away. Users make a forecast and forget. When questions resolve, there's no push/email notification. This kills engagement and retention.

**Proposed Solution:**  
1. Add a "Notify me" toggle on each question detail page. Store preferences in a `question_notifications` Supabase table.
2. Send email notifications when: (a) a question enters the revision phase (forecasts revealed), (b) a question is about to close (24h warning), (c) a question resolves and the user's score is calculated.
3. Add an in-app notification bell (component exists: `components/NotificationBell.tsx`) that shows pending notifications.
4. Add a "You have unresolved forecasts" banner on the homepage for returning logged-in users.

**Estimated Effort:** L (4-5 days)  
**Affected Files:**
- `app/questions/[id]/page.tsx` — Add "Notify me" toggle
- `components/NotificationBell.tsx` — Wire up to real notification data
- `app/api/` — New notification endpoint
- `supabase/functions/` — Cron job for deadline reminders and resolution notifications
- New: `components/ForecastNotificationBanner.tsx`

---

### 5. ⚠️ Password Strength + Signup Friction Reduction (Conversion)

**Problem:**  
The signup form has no password strength indicator, no password confirmation field, and no terms/privacy checkbox. Users get no feedback on password quality until submission fails. Typos in passwords create frustrating failed-login loops. The lack of legal links is a compliance gap.

**Proposed Solution:**  
1. Add a real-time password strength meter below the password field. Use a simple regex-based checker (length, uppercase, number, special char) with a colored bar (red → yellow → green). Show specific requirements: "8+ characters, 1 uppercase, 1 number."
2. Add a password confirmation field with real-time match validation (green checkmark or red X).
3. Add a terms checkbox: "I agree to the [Terms of Service](/terms) and [Privacy Policy](/privacy)." Disable the submit button until checked.
4. Increase minimum password length from 6 to 8 characters.

**Estimated Effort:** S (1 day)  
**Affected Files:**
- `components/AuthForm.tsx` — Add password strength meter, confirmation field, terms checkbox
- `app/auth/signup/page.tsx` — Update validation logic
- New: `components/PasswordStrengthMeter.tsx`

---

## Priority Summary

| Rank | Improvement | Focus | Effort | Impact |
|------|------------|-------|--------|--------|
| 1 | First Forecast Flow | Conversion | M | Directly increases signup → forecast rate |
| 2 | Fix Category Filters + Search | Engagement | S | Core navigation broken — blocks discovery |
| 3 | Onboarding Modal Fix | Conversion | S | Removes #1 conversion blocker |
| 4 | Notification System | Engagement | L | Drives return visits and retention |
| 5 | Password Strength + Friction | Conversion | S | Reduces signup abandonment |

**Total estimated effort:** ~9-12 days  
**Recommended sprint capacity allocation:** Items 1-3 + 5 (Sprint 5 core), Item 4 (Sprint 6)

---

## Appendix: Minor Improvements (Backlog)

These are lower-priority items from the audit that should be tracked but don't need immediate attention:

| ID | Item | Priority | Effort |
|----|------|----------|--------|
| MIN-01 | Add sorting dropdown on /questions (Deadline, Popular, Newest) | LOW | S |
| MIN-02 | Add filter group labels ("Category", "Status") on /questions | LOW | XS |
| MIN-03 | Hide "Blocks" nav link or show "Coming Soon" teaser | LOW | XS |
| MIN-04 | Add "Back to top" button on long homepage | LOW | XS |
| MIN-05 | Add Brier/Log score tooltips on leaderboard | LOW | XS |
| MIN-06 | Add focus-visible rings on all interactive elements | LOW | S |
| MIN-07 | Condense homepage — collapse history section | MEDIUM | S |
| MIN-08 | Show "—" instead of "0" for consensus when no forecasts exist | LOW | XS |

---

## Resolved from Previous Audit

| ID | Issue | Resolution |
|----|-------|------------|
| UX-001 | No mobile hamburger menu | ✅ Implemented as slide-in drawer with all nav links |
| UX-004 | No "Forgot password?" link | ✅ Added to login page, `/auth/reset-password` page functional |
| UX-005 | Blocks empty state too passive | ✅ Improved with emoji, description, and CTA to Browse Questions |
| (Implicit) | Leaderboard empty state too sparse | ✅ Improved with trophy emoji, explanation, and CTA |
