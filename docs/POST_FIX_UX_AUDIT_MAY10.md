# Post-Fix UX Audit — May 10, 2026

**Auditor:** Product Agent (automated)  
**Environment:** baycast-p.vercel.app (production)  
**Commits verified:** 3667582 (AQ-130), 69d24a2 (AQ-137)

---

## Results Summary

| Item | Status | Notes |
|------|--------|-------|
| AQ-130: Onboarding modal dismissible | ✅ PASS | X button, "Got it" button, and "Skip onboarding" button all present. Modal closes on click, body overflow restored. Dismissal persisted via localStorage (does not reappear on revisit). |
| AQ-137: Mobile CTA "Sign Up" button | ✅ PASS | `md:hidden` "Sign Up" link rendered in nav with green gradient, positioned next to hamburger menu. Links to `/auth/signup`. Desktop shows "Get Started Free" (`hidden md:inline-flex`). |
| "How Baycast Works" section | ✅ PASS | Present on landing page with 3 steps: "Make Your Forecast", "Blind Consensus", "Get Scored". Properly styled with numbered steps (01, 02, 03). |
| AQ-138: Leaderboard empty state | ⚠️ CONFIRMED BUG | Still shows "No forecasters on the leaderboard yet". Expected — being fixed by separate agent. |
| /questions category filters | ✅ PASS | Category filters (All, Politics, Technology, Economy, Science, Other) and status filters (Open, Closed, Resolved) all visible and functional. Search box present. Tested Technology filter — correctly filtered to 2 results. |

---

## Observations

1. **Onboarding modal initial block:** While the modal is now dismissible (PASS for AQ-130), it still uses `overflow: hidden` on body and `z-[100]` overlay on first visit, meaning the page is fully blocked until user interacts. This is a minor UX concern — consider making it a non-blocking banner or bottom sheet in a future iteration.
2. **No regressions detected:** Navigation, footer, live questions section, testimonials, and CTA sections all rendering correctly.
3. **Questions page:** 10 questions live across 5 categories. All links and filters functional.
4. **Vision tool unavailable:** Browser vision analysis failed during this audit (provider adapter issue). All checks performed via accessibility tree snapshots and DOM inspection via `browser_console`.

---

**Overall verdict: 4/5 PASS, 1 known bug (AQ-138, tracked separately). No new issues found.**
