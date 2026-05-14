# Post-Deploy QA + Seed Readiness Check — AQ-208

**Created:** 2026-05-14  
**Owner:** Product / QA  
**Target deploy dependency:** AQ-207  
**Live environment:** `https://baycast.app` unless a staging URL is explicitly supplied  
**Seed command covered:** `npx tsx scripts/seed-questions.ts`

This is a concrete runbook for the first QA pass after AQ-207 deploys and for Smil's seed smoke test. It also includes 5 new short-term prediction questions in the May 24–June 7 window that are distinct from `docs/QUESTIONS_SHORTTERM_MAY21_MAY31.md`.

---

## 1) Live E2E Checklist After AQ-207 Deploys

### Preconditions

- [ ] AQ-207 has deployed to the live URL.
- [ ] Production Supabase contains at least several `status = open` questions with future `closes_at` values.
- [ ] At least one open question closes within the next **14 days**; this is the current Closing Soon threshold (`CLOSING_SOON_WINDOW_DAYS = 14`).
- [ ] At least one open question closes more than 14 days out, so the negative case can be checked.
- [ ] Test with a fresh/incognito browser first, then repeat the auth-only checks with a real test account.

### A. Signup page live questions

URL: `https://baycast.app/auth/signup`

- [ ] Hard-refresh the page in an incognito window.
- [ ] Confirm the signup page loads without a server error, client crash, hydration warning, or console error.
- [ ] Confirm the right-side / featured-question area does **not** show `No live featured questions yet.` when production has open seeded questions.
- [ ] Confirm at least one live open question card is visible on the signup page.
- [ ] Confirm every displayed signup question card has:
  - [ ] Human-readable title.
  - [ ] Category label.
  - [ ] Close date / time remaining.
  - [ ] CTA that routes to the corresponding question detail page or auth flow without a broken link.
- [ ] Click the first displayed question/card CTA.
- [ ] Expected result: unauthenticated users are either taken to the question detail page or to the intended auth gate; there is no 404 and no stale placeholder copy.
- [ ] Return to `/auth/signup`, create/sign in with the test account if needed, and verify the signup flow itself still submits successfully.

### B. Questions page: Closing Soon category + threshold

URL: `https://baycast.app/questions?status=open`

- [ ] Hard-refresh the open questions page.
- [ ] Confirm the page loads and displays the `Closing Soon` sort option / section.
- [ ] Verify threshold behavior: the `⚡ Closing Soon` section includes only open questions with `closes_at` within **14 days** of the current time.
- [ ] Verify exclusion behavior: questions shown in the `⚡ Closing Soon` section are not duplicated again in the main list below the section.
- [ ] Verify ordering: Closing Soon cards are sorted by ascending close date, earliest first.
- [ ] Verify cap: the section shows no more than **3** questions.
- [ ] Category filter check:
  - [ ] Select a category that has at least one near-term open question.
  - [ ] Expected: the open count, Closing Soon section, and main list all reflect only that category.
  - [ ] Select a category with no near-term open questions but with open questions later than 14 days.
  - [ ] Expected: no `⚡ Closing Soon` section appears, but the main list still shows matching open questions.
- [ ] Negative threshold check: identify a visible open question closing **more than 14 days** from now; confirm it is not present in the Closing Soon section.
- [ ] Status filter check: switch away from `open` if the UI exposes closed/resolved filters.
  - [ ] Expected: Closing Soon is hidden outside the open-question context.

### C. `/compare` Yes/No rows

URL: `https://baycast.app/compare`

- [ ] Hard-refresh `/compare` on desktop width.
- [ ] Confirm the comparison table renders without horizontal content clipping in the default viewport.
- [ ] Confirm the table includes explicit rows/labels for Yes/No forecasting semantics where applicable:
  - [ ] Baycast questions resolve as **Yes / No** outcomes.
  - [ ] Market/platform rows do not imply Baycast uses tradable binary contracts.
  - [ ] Copy distinguishes Baycast forecasting/polling from real-money market positions.
- [ ] Confirm the Baycast column states the intended advantages consistently: blind phase, no money required, no gambling/securities exposure, proper scoring, and AI/human participation where applicable.
- [ ] Mobile check at ~375px width:
  - [ ] The comparison table is readable via the intended responsive layout or horizontal scroll.
  - [ ] Yes/No rows and Baycast cells are not truncated.
  - [ ] No column content overlaps or disappears.

### D. BCP no-leak checks — cards, title, meta, API

Goal: during the blind phase, users must not see aggregate/crowd probabilities before submitting their own forecast.

#### D1. Question cards/list pages

Check these URLs while signed out and before submitting any forecast with the test account:

- `https://baycast.app/`
- `https://baycast.app/questions?status=open`
- Any category-filtered questions URL
- Any block/list page that displays question cards

For each visible open/blind question card:

- [ ] Card title, category, close date, status, and CTA are visible.
- [ ] Card does **not** reveal aggregate probability before the user forecasts.
- [ ] Card does **not** reveal vote counts in a way that implies consensus direction before the user forecasts.
- [ ] Card does **not** show phrases like `crowd says`, `consensus`, `average forecast`, `Baycast probability`, `Yes 62%`, `No 38%`, or equivalent pre-vote aggregate leakage.
- [ ] If a card has a placeholder/progress visualization, it is clearly neutral and does not encode the crowd result.

#### D2. Question detail title/body

For at least two open questions, URL pattern: `https://baycast.app/questions/<id-or-slug>`

- [ ] In signed-out state, the title/body show only the question, options, category, close date, and resolution criteria/source.
- [ ] Before the test account submits a forecast, the detail page does not show current aggregate, distribution, average, median, or percent split.
- [ ] Submit a test forecast if allowed.
- [ ] Expected after submission: the app may reveal aggregate/revision UI only after the user has committed an independent forecast, consistent with BCP.
- [ ] Open the same question in a second fresh incognito window without the forecast cookie/session.
- [ ] Expected: aggregates remain hidden in the fresh pre-vote session.

#### D3. SEO title/meta/social metadata

Use browser View Source, DevTools Elements, or `curl -sL https://baycast.app/questions/<id-or-slug>`.

- [ ] `<title>` contains the question title or Baycast branding only; it does not include a crowd probability.
- [ ] `<meta name="description">` does not contain a current aggregate, vote split, `Yes NN%`, `No NN%`, or consensus phrase.
- [ ] OpenGraph/Twitter tags (`og:title`, `og:description`, `twitter:title`, `twitter:description`) do not leak aggregate probabilities.
- [ ] JSON-LD, if present, does not include aggregate forecast values for blind/open questions.

#### D4. API/network responses

Use DevTools Network with cache disabled while loading a blind/open question before submitting a forecast.

- [ ] Inspect initial document, RSC/Flight payloads, Supabase REST calls, and any `/api/*` responses.
- [ ] Expected before forecast submission: responses required to render public cards/details do not include aggregate probability fields for the current question.
- [ ] Specifically search response bodies for: `aggregate`, `probability`, `yes_pct`, `no_pct`, `mean`, `median`, `consensus`, `forecast_count`, `predictions`.
- [ ] If counts are intentionally public, verify they do not reveal direction or consensus before a forecast.
- [ ] After submitting a forecast, repeat the network capture.
- [ ] Expected: any newly returned aggregate data appears only after the independent forecast is recorded for that user/session.

### E. Pass/fail recording template

For each section, record:

| Area | Pass/Fail | URL(s) | Browser/account | Evidence | Bug link |
|---|---|---|---|---|---|
| Signup live questions |  |  |  | screenshot + console status |  |
| Closing Soon threshold/category |  |  |  | question titles + close dates |  |
| `/compare` Yes/No rows |  |  |  | screenshot desktop/mobile |  |
| BCP no-leak cards/title/meta/API |  |  |  | screenshots + network notes |  |

---

## 2) Seed Smoke Test Steps for Smil

Run after seeding with:

```bash
npx tsx scripts/seed-questions.ts
```

### A. Before running the seed

- [ ] Confirm `.env.local` or shell env contains the production/staging Supabase values intended for this run:
  - [ ] `SUPABASE_URL`
  - [ ] `SUPABASE_ANON_KEY`
- [ ] Confirm you are in the repo root.
- [ ] Confirm the target database is the intended one; do not run against production unless this is the planned production seed.
- [ ] Optional but recommended: export a pre-seed row count from Supabase for `questions` where `status = 'open'`.

### B. Expected CLI behavior

- [ ] Run `npx tsx scripts/seed-questions.ts`.
- [ ] Expected: the script reads `docs/questions_batch_may*.sql` files.
- [ ] Expected: no fatal parse errors.
- [ ] Expected: duplicate titles are skipped/idempotent rather than inserted twice.
- [ ] Expected: inserted rows have non-empty `title`, `description`, `category`, `options`, `resolution_source`, `closes_at`/resolution date, and `status`.
- [ ] If the script prints column/value mismatch warnings, capture the filename and row title, then verify whether that row was intentionally skipped.

### C. Database spot checks after the seed

In Supabase Table Editor or SQL editor:

- [ ] Query latest 10 questions by created time / close date and confirm new rows exist or duplicates were cleanly skipped.
- [ ] Confirm each newly inserted row has `status = open` unless the batch intentionally says otherwise.
- [ ] Confirm `options` contains exactly the binary outcome set `Yes` and `No` for normal prediction questions.
- [ ] Confirm `closes_at` / resolution date is in the future for newly seeded open questions.
- [ ] Confirm `blind_until`, if present, is not after `closes_at` in a way that prevents intended participation.
- [ ] Confirm categories are valid app categories and not misspelled variants.
- [ ] Confirm no title duplicates were created by re-running the seed once.

Suggested SQL checks, adapting column names if needed:

```sql
select title, category, status, closes_at, resolution_source
from questions
order by created_at desc
limit 20;

select title, count(*)
from questions
group by title
having count(*) > 1
order by count(*) desc, title;

select title, options
from questions
where status = 'open'
order by created_at desc
limit 20;
```

### D. Live UI smoke after the seed

- [ ] Visit `/questions?status=open`.
- [ ] Expected: newly seeded questions appear in the open list or are discoverable via category filters.
- [ ] Open 3 newly seeded question detail pages.
- [ ] Expected on each detail page:
  - [ ] Title matches seeded SQL/doc copy.
  - [ ] Category is correct.
  - [ ] Yes/No options are present.
  - [ ] Close date is correct.
  - [ ] Resolution source/criteria are visible and readable.
  - [ ] No pre-vote aggregate leakage occurs.
- [ ] Visit `/auth/signup`.
- [ ] Expected: signup featured/live questions are populated from live open questions, not placeholders.
- [ ] Visit `/questions?status=open`, choose `Closing Soon` sort/filter.
- [ ] Expected: questions closing within 14 days are surfaced first/sectioned correctly.
- [ ] Re-run `npx tsx scripts/seed-questions.ts` once.
- [ ] Expected: row counts do not double; duplicate titles are skipped.

### E. Seed smoke pass criteria

The seed is ready if all are true:

- [ ] CLI exits successfully.
- [ ] No duplicate question titles are introduced.
- [ ] New question rows are visible in Supabase and in the live UI.
- [ ] Open seeded questions have valid Yes/No options and future close dates.
- [ ] Signup live question modules and Closing Soon surfaces consume the seeded data correctly.
- [ ] BCP no-leak checks still pass on newly seeded questions.

---

## 3) Five New Short-Term Prediction Questions (May 24–June 7)

These are intentionally **not duplicates** of `docs/QUESTIONS_SHORTTERM_MAY21_MAY31.md`. They avoid NVIDIA/Anthropic, UNSC Gaza ceasefire, April core PCE, NOAA hurricane outlook, SpaceX Starship, Monaco GP, Roland-Garros men's top-10 first-round upset, *Lilo & Stitch* box office, and BTC May close.

### 1. Will Real Madrid win the 2026 UEFA Champions League final?

| Field | Value |
|---|---|
| **Category** | Sports |
| **Close date** | 2026-05-30 |
| **Resolution source** | UEFA official match report and competition results: https://www.uefa.com/uefachampionsleague/ |
| **Outcome set** | Yes / No |

**Resolution criteria:** Resolves **Yes** if Real Madrid is officially declared the winner of the 2026 UEFA Champions League final. Resolves **No** if any other club is officially declared the winner, if Real Madrid does not participate in the final, or if the final is abandoned without Real Madrid being declared champion by UEFA.

**Edge cases:** Extra time and penalties count as part of the final result. If UEFA later changes the result due to disciplinary action within 7 calendar days, use UEFA's updated official result. Changes after 7 days do not alter resolution unless the original result is voided before settlement.

---

### 2. Will the ECB cut its deposit facility rate at the June 2026 monetary policy meeting?

| Field | Value |
|---|---|
| **Category** | Economy |
| **Close date** | 2026-06-04 |
| **Resolution source** | European Central Bank monetary policy decisions: https://www.ecb.europa.eu/press/govcdec/mopo/html/index.en.html |
| **Outcome set** | Yes / No |

**Resolution criteria:** Resolves **Yes** if the ECB's official June 2026 monetary policy decision lowers the deposit facility rate compared with the rate in effect immediately before that decision. Resolves **No** if the rate is unchanged or increased.

**Edge cases:** If the ECB changes other policy rates but leaves the deposit facility rate unchanged, resolves **No**. If the scheduled decision is delayed, resolution waits for the first official decision tied to that meeting. An emergency rate cut before the scheduled meeting counts only if the ECB explicitly says it replaces or is part of the June policy decision; otherwise the scheduled June decision governs.

---

### 3. Will the Bank of Canada cut its overnight rate target at its June 2026 decision?

| Field | Value |
|---|---|
| **Category** | Economy |
| **Close date** | 2026-06-03 |
| **Resolution source** | Bank of Canada interest rate announcements: https://www.bankofcanada.ca/core-functions/monetary-policy/key-interest-rate/ |
| **Outcome set** | Yes / No |

**Resolution criteria:** Resolves **Yes** if the Bank of Canada lowers its target for the overnight rate in the official June 2026 interest rate announcement. Resolves **No** if the target is held steady or raised.

**Edge cases:** A change to guidance, balance-sheet policy, or other liquidity facilities does not count unless the overnight target itself is lowered. If the announcement is postponed, resolve using the first official announcement replacing the scheduled June decision. If an unscheduled cut occurs before the meeting but the scheduled decision still occurs, use the scheduled June decision unless the Bank states the unscheduled move replaces it.

---

### 4. Will the first May 2026 US nonfarm payrolls print be at least 150,000?

| Field | Value |
|---|---|
| **Category** | Economy |
| **Close date** | 2026-06-05 |
| **Resolution source** | US Bureau of Labor Statistics Employment Situation release: https://www.bls.gov/news.release/empsit.toc.htm |
| **Outcome set** | Yes / No |

**Resolution criteria:** Resolves **Yes** if the first official BLS Employment Situation release for May 2026 reports total nonfarm payroll employment increased by **150,000 or more**. Resolves **No** if the first published figure is 149,000 or lower.

**Edge cases:** Use the initial headline nonfarm payrolls change for May 2026; later revisions do not change the result. If publication is delayed, resolution waits for the first official release. A strike, shutdown, or data-collection note does not alter the threshold unless BLS explicitly withholds the headline figure, in which case resolution waits until BLS publishes it.

---

### 5. Will Apple announce a new Apple-branded generative AI model or developer API before June 8, 2026?

| Field | Value |
|---|---|
| **Category** | Tech |
| **Close date** | 2026-06-07 |
| **Resolution source** | Apple Newsroom, Apple Developer News, or official WWDC/keynote materials: https://www.apple.com/newsroom/ and https://developer.apple.com/news/ |
| **Outcome set** | Yes / No |

**Resolution criteria:** Resolves **Yes** if Apple publicly announces before **2026-06-08 00:00 UTC** either (a) a newly named Apple-branded generative AI model, or (b) a new developer-facing API/framework that gives third-party developers direct access to Apple generative AI capabilities. Resolves **No** if Apple makes no such announcement by the deadline.

**Edge cases:** A feature demo using existing Apple Intelligence branding does not count unless it includes a newly named model or new third-party developer API/framework. Private beta access counts only if announced publicly by Apple. Third-party rumors, analyst notes, or leaked documentation do not count. A renamed existing feature without materially new model/API access resolves **No**.

---

## Final AQ-208 readiness note

AQ-208 should be considered complete when this playbook is run against the live AQ-207 deploy, evidence is captured for each checklist area, and any failures are filed with exact URL, account state, screenshot/network proof, and reproduction steps.
