# E2E Verification Report — Baycast Evening Audit (May 7)

**Date:** 2026-05-07 (Evening session, ~19:00 UTC)
**Auditor:** PRODUCT Agent (automated)
**Environment:** https://baycast-p.vercel.app (production)
**Referenced Commit:** 6e3c7bd (category normalization fix)
**Previous Report:** E2E_VERIFY_2026-05-05_afternoon.md
**Purpose:** Verify category normalization fix (6e3c7bd); JSON-LD audit; sitemap check

---

## Executive Summary

| Area | Status | Notes |
|------|--------|-------|
| Category Filters (CHECK 1) | ❌ FAIL | Fix 6e3c7bd NOT working — all categories return empty |
| JSON-LD on Question Page (CHECK 2a) | ✅ PASS | Question schema present |
| JSON-LD Stale Bleed on Landing (CHECK 2b) | ✅ PASS | No stale bleed (AQ-095 not reproducible) |
| JSON-LD WebSite on Landing (CHECK 2c) | ❌ FAIL | No WebSite schema on landing page |
| Sitemap (CHECK 3) | ⚠️ PARTIAL | Loads OK but contains zero question URLs |

**Overall:** Category filter fix has NOT deployed or is ineffective. JSON-LD works on question pages but landing page is missing WebSite schema. Sitemap missing individual question URLs.

---

## CHECK 1: Category Filters Live Fix

**Expected:** Commit 6e3c7bd normalizes category values so filters return matching questions.
**Actual:** ALL category filters return "No questions match your search."

### Per-Category Results

| Category | URL Tested | Expected Questions | Actual | Status |
|----------|-----------|-------------------|--------|--------|
| Politics | ?category=Politics | 1 (Taiwan question visible on /questions) | 0 results | ❌ FAIL |
| Technology | ?category=Technology | 2 (GPT-5, EU AI Act) | 0 results | ❌ FAIL |
| Economy | ?category=Economy | 2 (Bitcoin $200k, Fed rates) | 0 results | ❌ FAIL |
| Science | ?category=Science | 2 (India Moon, Fusion) | 0 results | ❌ FAIL |
| Sports | ?category=Sports | 0 (no data) | 0 results | ✅ PASS (expected) |
| Culture | ?category=Culture | 0 (no data) | 0 results | ✅ PASS (expected) |
| AI | ?category=AI | 0 (no data) | 0 results | ✅ PASS (expected) |
| Crypto | ?category=Crypto | 0 (no data) | 0 results | ✅ PASS (expected) |
| Entertainment | ?category=Entertainment | 0 (no data) | 0 results | ✅ PASS (expected) |
| Other | ?category=Other | 3 (Brent crude, COVID, temperature) | 0 results | ❌ FAIL |

### Status Filter Results

| Filter | URL Tested | Expected | Actual | Status |
|--------|-----------|----------|--------|--------|
| Open | ?status=open | All 10 questions | 10 questions shown | ✅ PASS |
| Closed | ?status=closed | 0 | Not tested | — |
| Resolved | ?status=resolved | 0 | Not tested | — |

### Analysis

The `/questions` page correctly displays questions with category badges (Technology, Economy, Science, Other, Politics), but clicking any category filter returns zero results. The `?status=open` filter works correctly, returning all 10 questions. This confirms the issue is specifically with category filtering, not general query/filtering logic.

**Same bug as May 5 audit (BUG-001/AQ-027).** The category normalization fix from 6e3c7bd has either not deployed to Vercel or does not address the root cause. Possible causes:
1. **Deploy not triggered** — Vercel may not have rebuilt after push
2. **DB category values differ** — seed data categories may not match canonical forms despite normalization
3. **Supabase query issue** — `.ilike()` or `.eq()` not matching as expected
4. **Client-side filtering bug** — URL params may not be reaching the server query

**Recommendation:** Dev agent should verify Vercel deployment status and run `SELECT DISTINCT category FROM questions` against production Supabase.

---

## CHECK 2: JSON-LD Verification

### 2a. Question Detail Page

**URL:** `/questions/d451ce46-a8da-46a1-8452-6d49f73cc636` (Will GPT-5 be released before end of 2026?)

**Result:** ✅ PASS

| Property | Value |
|----------|-------|
| Script count | 1 |
| @context | https://schema.org |
| @type | Question |
| Fields present | name, text, dateCreated, dateModified, acceptedAnswer |

JSON-LD Question schema is correctly injected on question detail pages (added in commit 35834e7).

### 2b. Stale Bleed Bug (AQ-095)

**Test:** Navigate to question detail page → then to landing page → check if Question JSON-LD persists.

**Result:** ✅ PASS (no bleed detected)

Landing page (`/`) has **0 JSON-LD scripts**. No stale Question schema bleeds from detail page navigation. Bug AQ-095 is **NOT reproducible** — either fixed or only occurs in specific client-side navigation scenarios.

### 2c. WebSite JSON-LD on Landing Page

**Result:** ❌ FAIL

The landing page has **zero** JSON-LD schemas. A `WebSite` schema (with `name`, `url`, `potentialAction` for sitelinks search box) should be added to the landing page for SEO.

---

## CHECK 3: Sitemap

**URL:** `/sitemap.xml`

**Result:** ⚠️ PARTIAL

| Check | Result |
|-------|--------|
| Sitemap loads | ✅ Valid XML, correct namespace |
| Static pages included | ✅ 6 URLs: /, /questions, /blocks, /leaderboard, /auth/login, /auth/signup |
| Question URLs included | ❌ **ZERO** individual question URLs |
| lastmod timestamps | ✅ Current (2026-05-07T19:04:05.688Z) |
| Priority values | ✅ Reasonable (1.0 for home, 0.9 for questions, etc.) |

**Issue:** The sitemap does not include any `/questions/[id]` URLs. With 10 live questions, all should be listed. This is an SEO gap — search engines won't discover individual question pages via sitemap.

---

## Regression Comparison vs May 5 Audit

| Issue | May 5 Status | May 7 Status | Change |
|-------|-------------|-------------|--------|
| Category filters (BUG-001) | ❌ BROKEN | ❌ STILL BROKEN | No improvement |
| JSON-LD on question pages | Not tested | ✅ Present | New feature working |
| AQ-095 JSON-LD stale bleed | Not tested | ✅ Not reproducible | Appears fixed |
| WebSite JSON-LD on landing | Not tested | ❌ Missing | New gap identified |
| Sitemap question URLs | Not tested | ❌ Missing | Known gap |

---

## Action Items

| Priority | Item | Owner | Ticket |
|----------|------|-------|--------|
| P0 | Fix category filters — verify deployment of 6e3c7bd, check DB category values | Dev | AQ-027 |
| P1 | Add question URLs to sitemap.xml | Dev | New |
| P1 | Add WebSite JSON-LD to landing page | Dev | New |
| P2 | Verify JSON-LD bleed fix with client-side navigation (not just full page loads) | Dev | AQ-095 |

---

## Test Environment Notes

- Browser: Headless Chromium (1280px viewport)
- No JS console errors detected on any tested page
- All navigation links verified correct
- Onboarding modal present and dismissible
- Category badges on /questions correctly show: Technology(2), Economy(2), Other(3), Science(2), Politics(1)
