# Baycast Development Priority Report
**Date:** 2026-04-26  
**Agent:** Development Agent  
**Commit baseline:** `01f4bac` (Blind Consensus Protocol)

---

## 1. Code Quality Assessment: B+

### Strengths
- **Clean architecture**: Well-organized Next.js 14 App Router with proper server/client component separation. All pages use server components for data fetching; only interactive forms are `'use client'`.
- **Security-first**: Blind Consensus Protocol enforced at **two levels** — RLS policy in PostgreSQL (`migration_002`) *and* application-level skip of forecast queries during blind phase. Defense in depth.
- **Type safety**: Full TypeScript with well-defined interfaces in `lib/types.ts`. Types align cleanly with the DB schema.
- **SQL discipline**: Schema file (`baycast_supabase_schema.sql`) is comprehensive and up-to-date. Migrations are additive and idempotent (`IF NOT EXISTS`).
- **UX polish**: Optimistic updates in ForecastForm, error boundaries on every route, loading states, dark theme with consistent design tokens.
- **Build health**: Clean `next build` with zero warnings. ~87KB first-load JS (reasonable).

### Weaknesses
- **Zero tests**: No test files exist anywhere. No Jest, Vitest, or Playwright config. Critical scoring logic (`brierScore`, `logScore`, `questionPhase`) is untested.
- **No caching strategy**: Every page request hits Supabase directly. The questions list page doesn't even use `revalidate`. No ISR or SWR.
- **Aggregate computed client-side**: In `questions/[id]/page.tsx`, the average probability is computed in JS (lines 65-73) rather than via a DB view. This means every page load fetches *all* forecasts for a question and computes the average in the server component.
- **Inconsistent scoring**: `logScore()` exists in `lib/utils.ts` but is **never called**. The resolve API route (`api/admin/resolve/route.ts`) only computes Brier scores — the `log_score` column in the `scores` table is never populated.
- **No pagination**: Questions page loads all open questions at once. Will degrade with scale.
- **No rate limiting**: Forecast submissions are unlimited (client-side `loading` state only).

---

## 2. Top 3 Development Priorities for This Week

### Priority 1: Activate Logarithmic Scoring (1-2 hours)
**Why:** `logScore()` is implemented in utils but never wired in. The `Score` type has `log_score: number | null` but it's always null. The whitepaper mandates dual scoring (Brier + Log). This is the lowest-effort, highest-impact gap to close.

**Tasks:**
- Update `api/admin/resolve/route.ts` to compute and insert `log_score` alongside `brier_score`
- Display log score on the leaderboard and profile pages
- Update the `scores` table schema to include `log_score double precision` (currently missing from the schema SQL — only in the TypeScript type)

### Priority 2: Add Tests for Core Logic (3-4 hours)
**Why:** Scoring functions and `questionPhase()` are correctness-critical. A bug in Brier/log scoring silently corrupts the leaderboard. The blind phase logic must be airtight.

**Tasks:**
- Add Vitest config
- Write unit tests for: `brierScore()`, `logScore()`, `aggregateProbabilities()`, `questionPhase()`, `daysRemaining()`
- Add a basic integration test for the resolve API route
- Add GitHub Actions CI step to run tests on push

### Priority 3: Onboard First AI Agent (4-6 hours)
**Why:** AI agent integration is listed as HIGH priority in the gap analysis and is a core whitepaper differentiator. Currently there are 10 questions, 1 forecaster, and 0 predictions. An AI agent would immediately generate real activity and validate the platform works end-to-end.

**Tasks:**
- Design a minimal agent API: `POST /api/agent/forecast` with API key auth
- Create an `agents` table (id, name, api_key_hash, is_ai, user_id or null)
- Implement API key authentication middleware
- Build a simple external agent (Python script or GitHub Action) that fetches open questions and submits forecasts
- Mark agent forecasts distinctly in the UI (robot icon, "AI Agent" label)

---

## 3. Technical Debt & Issues Found

| Issue | Severity | Details |
|-------|----------|---------|
| **`log_score` column missing from schema** | HIGH | `baycast_supabase_schema.sql` scores table (line 121) has no `log_score` column, but `lib/types.ts` defines it. Schema drift. |
| **Blind phase count may leak info** | MEDIUM | During blind phase, `forecasts` count is still shown (line 82). This reveals how many people have forecasted, which is partial information leakage. Consider hiding or showing "≥1" only. |
| **`aggregate_probability` not populated** | MEDIUM | `QuestionCard` reads `q.aggregate_probability` but this field is never populated — questions page queries `select('*')` which returns null for this computed field. The detail page computes average manually, but the listing doesn't. |
| **No `updated_at` trigger** | LOW | `forecasts.updated_at` defaults to `now()` on insert but has no trigger to auto-update on row update. The `ForecastForm` manually sets it, but direct DB updates won't. |
| **`as any` in server.ts** | LOW | Line 18 of `lib/supabase/server.ts` uses `options as any` for cookie types. Minor type safety issue. |
| **Category filter + status filter don't compose** | LOW | On `/questions`, selecting a category and then clicking a status filter loses the category param (the status links don't include `?category=`). |
| **No `.env.example`** | OPS | No template for required env vars (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`). |

---

## 4. What Should Be Deployed Next

### Immediate (deploy this week):
1. **Wire up log scoring in the resolve route** — trivial change, completes dual scoring promise
2. **Add `.env.example`** to the repo
3. **Fix category+status filter URL composition** on `/questions`

### This Sprint (1-2 weeks):
4. **AI agent API** (`/api/agent/forecast`) with key-based auth — this unblocks the core differentiator
5. **Add server-side aggregate computation** — either a DB view for `aggregate_probability` or a computed column, so `QuestionCard` shows consensus on the listing page
6. **Basic test suite** (Vitest + scoring unit tests)

### Next Sprint (2-4 weeks):
7. **Pagination** on questions page
8. **Caching** with `revalidate` tags for question pages
9. **Question blocks** (whitepaper §4.6) — group questions into themed tournaments
10. **Custom domain** — move off `baycast-p.vercel.app`

### Not Yet (later phases):
- BAY Token / smart contracts (requires dedicated blockchain sprint)
- Kelly criterion compounding (depends on token economics)
- Multichoice/continuous question types (significant schema + scoring overhaul)

---

## Summary

The codebase is solid for a Phase 1 MVP. The Blind Consensus Protocol is well-implemented with proper defense-in-depth (RLS + application logic). The biggest bang-for-buck this week is wiring up the already-written `logScore()` function and onboarding the first AI agent to generate real platform activity. The most critical technical debt is the schema drift on `log_score` and the complete absence of tests for scoring logic.
