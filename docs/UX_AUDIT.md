# Baycast — UX Audit Report

**Date:** 2026-05-04  
**URL:** baycast-p.vercel.app  
**Stack:** Next.js 14 + TypeScript + Tailwind CSS + Supabase  
**Auditor:** Hermes Agent (automated)

---

## Executive Summary

Baycast presents a polished dark-themed forecasting platform with strong visual identity and compelling copywriting. The core user flow (browse → sign up → forecast) is discoverable but hindered by an aggressive onboarding modal (known bug AQ-028) and broken category filters (known bug AQ-027). The leaderboard and blocks pages show minimal content, suggesting early-stage adoption. Key priorities: fix the onboarding modal gating, restore category filters, add password validation feedback, improve empty states, and ship a mobile hamburger menu.

---

## 1. Homepage (`/`)

### ✅ What works well
- **Strong hero copy:** The headline "A different kind of intelligence" is memorable. The gradient text treatment on "intelligence" is visually striking.
- **Clear value proposition:** Two concise paragraphs explain the concept without jargon overload.
- **Multiple CTAs:** "Start forecasting" (primary green) and "Join the experiment" (secondary outline) give users clear next steps.
- **Live stats section:** "10 Active questions / 2 Forecasters / 1 Predictions made" builds social proof (even if numbers are small).
- **How-it-works section:** 4-step numbered cards (01–04) clearly explain the Blind Consensus Protocol.
- **Differentiation section:** "Why prediction markets failed" with 3 feature cards (Proper scoring rules, AI agents, Reputation) effectively communicates the unique selling point.
- **Bottom-of-page CTA:** "The crowd is waiting" section repeats the signup call, catching scroll-heavy users.
- **Footer:** Minimal, on-brand tagline ("Where Bayes meets the crowd.").

### ⚠️ Minor UX issues
- **Page length is excessive:** The homepage contains ~7 full-viewport sections. Users must scroll extensively to reach the live questions. Consider condensing or adding a "skip to questions" sticky CTA.
- **Stats are underwhelming for early adopters:** "2 Forecasters / 1 Predictions made" signals low adoption. Consider hiding stats below a threshold or reframing (e.g., "Join 2 early forecasters").
- **No visual hierarchy between sections:** All sections use the same `mb-24` spacing and `max-w-6xl` container. The "wisdom of crowds" historical narrative section could be collapsed/hidden to reduce cognitive load.
- **Step cards lack visual progress connection:** The 4-step cards (01–04) sit in a grid but have no visual flow indicator (arrow, connecting line).

### 🔴 Critical blockers
- **🔴 Onboarding modal blocks all visitors (AQ-028 — known):** A full-screen modal with backdrop blur appears on first visit. Users must click "Got it" or "Skip onboarding" to see any content. This is a major conversion killer for first-time visitors. The modal cannot be dismissed by clicking outside or pressing Escape.

### 💡 Improvement suggestions

| Priority | Suggestion | Technical approach |
|----------|-----------|-------------------|
| HIGH | Make onboarding dismissible via backdrop click or Escape key | Add `onClick` on backdrop `<div>` calling `onComplete()`. Add `useEffect` with `keydown` listener for Escape. |
| HIGH | Lazy-load onboarding (show after 3s or on second visit) | In `OnboardingProvider.tsx`, add `setTimeout(() => setIsOpen(true), 3000)` or check `localStorage` visit count. |
| MEDIUM | Add a "Back to top" floating button on the long homepage | Add a client component with `IntersectionObserver` on the hero section, toggling visibility. |
| MEDIUM | Condense the Galton/IARPA history section into a collapsible block | Wrap in a `<details>` element or an accordion component. |
| LOW | Add subtle entrance animations to sections on scroll | Use `IntersectionObserver` + CSS `transition` classes (e.g., `animate-on-scroll`). |

---

## 2. Questions Page (`/questions`)

### ✅ What works well
- **Clean filter bar:** Category filters use pill-shaped buttons (`rounded-full`) with green accent for active state. Status filters (Open/Closed/Resolved) use `rounded-lg` with blue accent — good visual distinction between filter groups.
- **QuestionCard design:** Cards show category badge, countdown timer, question title (with `line-clamp-2`), probability bar, and forecaster count — all essential info at a glance.
- **Consensus display:** Large green percentage on the right side of cards with "consensus" label is immediately scannable.
- **Pagination logic:** Server-side pagination with `.range()`, smart page number display (ellipsis for large ranges), and preserved filter params in pagination links.
- **Empty state:** "No questions in this category." with a bordered container — clear and non-broken.

### ⚠️ Minor UX issues
- **Category filters broken (AQ-027 — known):** Clicking a category pill (e.g., "Technology") navigates to `?category=Technology` but the query uses `ilike` which may not match DB casing. The active state visual indicator still works.
- **No result count:** Users can't see how many questions match their current filter (e.g., "Showing 3 of 10 questions").
- **No sorting options:** Questions are sorted by `closes_at` (ascending) only. No option to sort by popularity (forecasters count), newest, or consensus probability.
- **Category and status filters aren't visually grouped:** Both sit in separate `<div>` rows with the same `gap-2` but no labels. Users might not understand they're two independent filter groups.
- **"All" filter link clears category but not status:** The `filterHref` function correctly handles this, but the visual state of the "All" pill doesn't indicate it belongs to the category group.

### 🔴 Critical blockers
- None beyond the known AQ-027 filter bug.

### 💡 Improvement suggestions

| Priority | Suggestion | Technical approach |
|----------|-----------|-------------------|
| HIGH | Fix category filter matching (AQ-027) | Debug the `normalizeCategory()` function. Ensure DB values match the `CATEGORIES` array exactly. Consider using `.eq()` instead of `.ilike()` if casing is normalized. |
| HIGH | Add a search bar for question text | Add a `<input type="search">` with debounce (300ms) and `.textSearch()` or `.ilike('title', '%query%')` on the Supabase query. |
| MEDIUM | Show result count in the header | Display `Showing {enriched.length} of {totalCount} questions` below the subtitle. |
| MEDIUM | Add sorting dropdown (Deadline, Popular, Newest, Consensus) | Add a `<select>` element that sets a `sort` query param. Handle in server component with different `.order()` calls. |
| LOW | Add filter group labels ("Category", "Status") | Add `<span className="text-xs text-text-secondary uppercase tracking-wider">Category</span>` above each filter row. |

---

## 3. Auth Pages (`/auth/signup`, `/auth/login`)

### ✅ What works well
- **Clean, centered layout:** `min-h-[calc(100vh-4rem)]` with flexbox centering creates a balanced form layout.
- **Google OAuth button:** Prominent placement with proper Google SVG icon. Reduces friction for quick signups.
- **"or" divider:** Visual separator between OAuth and email signup is well-styled.
- **Cross-linking:** "Already a member? Log in" and "New to Baycast? Join for free" links are clearly visible.
- **Error/info feedback:** Error messages appear in a red-bordered box (`bg-danger/10 border-danger/30`). Success messages in green. Both are distinct from the form.
- **Loading state:** Button shows "Loading..." and gets `disabled:opacity-50` during submission.
- **Username field has validation attributes:** `minLength={3}` and `maxLength={30}` on the signup form.

### ⚠️ Minor UX issues
- **No password strength indicator:** Users get no real-time feedback on password strength before submission. Only `minLength={6}` is enforced.
- **No "Forgot password?" link on login page:** Common pattern missing — users with forgotten passwords have no recovery path visible.
- **No password confirmation field on signup:** Single password field with no confirmation — risk of typos.
- **No email format pre-validation:** The `type="email"` provides browser validation but no custom feedback for common mistakes (trailing spaces, missing TLD).
- **Signup success message is passive:** "Check your email to confirm your account." appears inline but could be more prominent (full-screen success state).
- **No terms of service or privacy policy links:** No legal checkboxes or links — potential compliance issue.

### 🔴 Critical blockers
- None critical, but the lack of a "Forgot password" flow is a significant user pain point.

### 💡 Improvement suggestions

| Priority | Suggestion | Technical approach |
|----------|-----------|-------------------|
| HIGH | Add "Forgot password?" link on login page | Add `<Link href="/auth/reset-password">Forgot password?</Link>` below the password field. Implement Supabase `resetPasswordForEmail()`. |
| HIGH | Add password strength meter on signup | Use a library like `zxcvbn` or a simple regex-based strength checker. Show colored bar (red→yellow→green) below the password field. |
| MEDIUM | Add password confirmation field on signup | Add `password2` state with real-time match validation. Show green checkmark or red X. |
| MEDIUM | Add terms/privacy checkbox on signup | Add a required checkbox: "I agree to the [Terms of Service](/terms) and [Privacy Policy](/privacy)." |
| LOW | Improve signup success state | Replace inline message with a full centered success screen showing an envelope icon and "Check your email" with a "Resend email" button. |

---

## 4. Leaderboard (`/leaderboard`)

### ✅ What works well
- **Clear period filters:** "All time", "This month", "This week" pills with green accent for active state.
- **Responsive table:** Columns progressively hide on smaller screens (`hidden sm:table-cell`, `hidden md:table-cell`, `hidden lg:table-cell`) — good mobile approach.
- **Medal emojis:** 🥇🥈🥉 for top 3 add visual flair.
- **"You" indicator:** Current user's row gets `bg-accent-green/5` highlight with "(you)" label.
- **Profile links:** Clicking a forecaster name navigates to their profile.
- **Avatar fallback:** Missing avatars show a colored circle with the first letter of the display name.
- **Brier score color coding:** #1 gets yellow-400, top 3 get accent-green, rest get text-primary — clear visual hierarchy.

### ⚠️ Minor UX issues
- **Empty state is too sparse:** "No data available." is a single line in a table cell. No explanation of why it's empty or when data might appear.
- **No explanation of Brier/Log scores:** The subtitle mentions "A Brier score near 0" but there's no tooltip or info icon explaining what Brier or Log scores mean.
- **"Resolved" column is confusing:** For time-filtered views, `resolved_forecasts` equals `total_forecasts` (line 76: `resolved_forecasts: count`). This column is redundant and misleading.
- **No way to search for a specific user:** With 50 entries, finding a specific person requires scrolling.

### 🔴 Critical blockers
- None.

### 💡 Improvement suggestions

| Priority | Suggestion | Technical approach |
|----------|-----------|-------------------|
| MEDIUM | Improve empty state with illustration and explanation | Replace table cell with a centered block: icon + "No resolved forecasts yet. The leaderboard will populate as questions are resolved." |
| MEDIUM | Add tooltip info for Brier/Log score columns | Add an `<Info>` icon next to column headers with a tooltip: "Brier score: 0 = perfect, 1 = worst. Lower is better." |
| LOW | Add user search/filter input | Add a client-side search input that filters the rendered table by `display_name`. |
| LOW | Fix "Resolved" column for time-filtered views | Query `scores` joined with resolved questions only, instead of using `count` for both columns. |

---

## 5. Question Blocks (`/blocks`)

### ✅ What works well
- **Clear page title and subtitle:** "Question Blocks — Compete on themed groups of related questions."
- **Empty state container:** Bordered rounded box with "No blocks available yet." — consistent with the questions page empty state.

### ⚠️ Minor UX issues
- **Empty state is passive:** No indication of when blocks might become available, no CTA, no illustration. Users land here from the nav and get nothing to do.
- **No "Create a block" option:** Even as an admin, there's no visible path to create blocks from this page (admin is at `/admin`).
- **Nav link leads to a dead end:** "Blocks" is in the main navigation, suggesting it's a core feature, but the page is empty.

### 🔴 Critical blockers
- **Nav link to empty page:** Having "Blocks" in the primary navigation when the page is empty is misleading. Users expect content behind nav links.

### 💡 Improvement suggestions

| Priority | Suggestion | Technical approach |
|----------|-----------|-------------------|
| HIGH | Hide "Blocks" nav link or show a teaser instead of empty page | In `NavClient.tsx`, conditionally render the Blocks link only when blocks exist (pass a prop from server). Or show a teaser: "Coming soon — themed prediction challenges." |
| MEDIUM | Improve empty state with "Coming Soon" messaging | Replace "No blocks available yet." with a more engaging message: icon + "Block challenges are coming soon. In the meantime, try individual questions." + CTA to `/questions`. |
| LOW | Add a "Notify me" button on the empty state | Collect emails for notification when blocks launch. Store in a `waitlist` Supabase table. |

---

## Top 5 Priority Improvements

### 1. 🔴 Fix Onboarding Modal Gating (AQ-028)
**Problem:** Full-screen modal blocks all content on first visit. No Escape key or backdrop click dismiss.  
**Impact:** Kills conversion for curious visitors who want to browse before committing.  
**Fix:** In `OnboardingModal.tsx`, add `onClick={handleSkip}` on the backdrop `<div>`. Add Escape key listener in `OnboardingProvider.tsx`. Consider delaying the modal by 2-3 seconds or only showing it when the user clicks "Get Started."

```tsx
// OnboardingModal.tsx — backdrop click
<div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onSkip} />

// OnboardingProvider.tsx — Escape key
useEffect(() => {
  const handler = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && isOpen) completeOnboarding()
  }
  window.addEventListener('keydown', handler)
  return () => window.removeEventListener('keydown', handler)
}, [isOpen, completeOnboarding])
```

### 2. 🔴 Fix Category Filters (AQ-027)
**Problem:** Category filter links navigate correctly but return all questions regardless of selected category.  
**Impact:** Users can't find questions by topic — a core navigation feature is broken.  
**Fix:** Debug `normalizeCategory()` in `lib/types.ts`. Ensure the `CATEGORIES` array values exactly match DB `category` column values. If the DB has inconsistent casing, run a migration to normalize. Consider using `.eq('category', normalizedCategory)` instead of `.ilike()`.

### 3. 🔴 Add Mobile Navigation Menu
**Problem:** The nav only shows desktop links (`hidden md:flex`). On mobile, users see only the logo and "Get Started" button — no way to navigate to Questions, Blocks, or Leaderboard.  
**Impact:** ~50% of traffic on mobile cannot navigate the site.  
**Fix:** Add a hamburger menu button visible on mobile (`flex md:hidden`). On click, toggle a slide-down or slide-in panel with all nav links.

```tsx
// NavClient.tsx — mobile menu
<button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2">
  <MenuIcon />
</button>
{menuOpen && (
  <div className="absolute top-full left-0 right-0 bg-bg-surface border-b border-border-dark p-4 md:hidden">
    {NAV_LINKS.map(({ href, label }) => (
      <Link key={href} href={href} onClick={() => setMenuOpen(false)}
        className="block py-3 text-text-secondary hover:text-text-primary">
        {label}
      </Link>
    ))}
  </div>
)}
```

### 4. ⚠️ Add Password Reset Flow
**Problem:** Login page has no "Forgot password?" link. Users with forgotten passwords are stuck.  
**Impact:** Users who forget passwords will abandon the platform.  
**Fix:** Add a "Forgot password?" link on `/auth/login` pointing to `/auth/reset-password`. Create a new page with an email input that calls `supabase.auth.resetPasswordForEmail()`.

### 5. ⚠️ Improve Empty States Across All Pages
**Problem:** Leaderboard shows "No data available." and Blocks shows "No blocks available yet." — both are terse and passive.  
**Impact:** Users land on these pages from the nav and find no value, no explanation, no next step.  
**Fix:** Create a reusable `<EmptyState>` component with icon, title, description, and optional CTA. Use it consistently on Leaderboard, Blocks, and filtered Questions pages.

```tsx
// components/EmptyState.tsx
export default function EmptyState({ icon, title, description, action }: Props) {
  return (
    <div className="text-center py-16">
      <span className="text-5xl mb-4 block">{icon}</span>
      <h3 className="text-lg font-outfit font-semibold mb-2">{title}</h3>
      <p className="text-text-secondary mb-6 max-w-md mx-auto">{description}</p>
      {action}
    </div>
  )
}
```

---

## Design Recommendations

### Color Palette
The current palette is cohesive and appropriate for a data/forecasting platform:

| Token | Current | Assessment |
|-------|---------|------------|
| `--bg-primary` | `#0A0E1A` | ✅ Deep navy-black — excellent for contrast and readability |
| `--bg-surface` | `#141929` | ✅ Slightly lighter — good card/panel background |
| `--border` | `#1E2740` | ✅ Subtle border — visible but not distracting |
| `--accent-green` | `#0F9D58` | ✅ Google Green — energetic, associated with "go" and "correct" |
| `--accent-blue` | `#4285F4` | ✅ Google Blue — good secondary accent, used for links |
| `--text-primary` | `#E2E8F0` | ✅ Near-white with slight warmth — easy on the eyes |
| `--text-secondary` | `#718096` | ⚠️ Could be slightly brighter (`#8896AB`) for better readability on `bg-primary` |

**Recommendation:** Add a `--accent-warning` (amber/orange) and `--accent-danger` (red) for scoring states (poor calibration = red, average = amber, excellent = green). This would enhance the leaderboard and profile score displays.

### Typography
- **Headings (Outfit):** Excellent choice — geometric sans-serif that feels modern and technical without being cold. Bold weight (700-800) provides strong hierarchy.
- **Body (DM Sans):** Good readability. Consider increasing base size from 16px to 17px for body text on the homepage long-form sections.
- **Monospace (JetBrains Mono):** Perfect for scores, percentages, and data. The green color on mono text creates a "terminal/data" aesthetic that fits the forecasting theme.

**Recommendation:** Add `letter-spacing: -0.02em` to large headings (h1) for a tighter, more premium feel. Consider `tracking-wide` on the pill filter labels for better scannability.

### Spacing & Layout
- **Container width (`max-w-6xl` = 72rem):** Good for content pages. The leaderboard table benefits from a narrower container (`max-w-4xl`) which is already implemented.
- **Section spacing (`mb-24`):** Consistent but generous. For the homepage, consider alternating between `mb-16` (shorter sections) and `mb-24` (major sections).
- **Card padding (`p-5` to `p-6`):** Appropriate for the current content density.
- **Nav height (`h-16`):** Standard and comfortable. The `backdrop-blur-md` is a nice touch.

**Recommendation:** Add `py-10` top padding to the main content area (currently `pt-16` accounts for nav). On mobile, increase horizontal padding from `px-4` to `px-5` for less edge-crowding.

### Component Design Patterns
- **Border style:** `border border-border-dark rounded-xl` is the standard card pattern — consistent and clean.
- **Hover states:** `hover:border-accent-green/40` on cards and `hover:-translate-y-0.5` lift effect are subtle and polished.
- **Active filter state:** Green pill with `bg-accent-green/10` — clear and accessible.
- **CTA buttons:** Green filled (`bg-accent-green text-white`) for primary, outlined (`border border-border-dark`) for secondary — good pattern.

**Recommendation:** Add `focus-visible` rings to all interactive elements for keyboard accessibility. Currently only the slider has focus styles.

### Dark Mode Consistency
The app is always dark mode (`className="dark"` on `<html>`). This is fine for the current single-theme approach, but the design system should support light mode tokens if needed in the future. Consider using Tailwind's `dark:` variant system rather than hardcoding dark colors.

---

## Bugs Found (Beyond Known Issues)

| ID | Severity | Page | Description |
|----|----------|------|-------------|
| UX-001 | MEDIUM | Nav | No mobile hamburger menu — mobile users can only access Home and Get Started |
| UX-002 | MEDIUM | Leaderboard | "Resolved" column always equals "Predictions" in time-filtered views (data bug in `leaderboard/page.tsx:76`) |
| UX-003 | LOW | Auth | No password confirmation on signup — typo risk |
| UX-004 | LOW | Auth | No "Forgot password?" link on login |
| UX-005 | LOW | Blocks | Nav link points to empty page with no "coming soon" messaging |
| UX-006 | LOW | All | Missing `focus-visible` ring styles on interactive elements (only slider has them) |

---

## Appendix: Page-by-Page Score

| Page | Visual Design | Content | Navigation | Interactivity | Overall |
|------|--------------|---------|------------|---------------|---------|
| Homepage | 9/10 | 8/10 | 7/10 | 6/10* | 7.5/10 |
| Questions | 8/10 | 7/10 | 6/10* | 7/10 | 7/10 |
| Auth (Signup) | 8/10 | 7/10 | 9/10 | 7/10 | 7.75/10 |
| Auth (Login) | 8/10 | 6/10 | 8/10 | 7/10 | 7.25/10 |
| Leaderboard | 8/10 | 6/10 | 8/10 | 7/10 | 7.25/10 |
| Blocks | 7/10 | 3/10 | 5/10 | 2/10 | 4.25/10 |

\* Deducted for onboarding modal (homepage) and broken category filters (questions).
