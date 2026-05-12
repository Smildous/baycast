# UX Funnel Audit — May 12, 2026 (Day 8)

> Post-conversion-quick-wins audit. All AQ-155/156/158/160/162 fixes LIVE.
> Score global: **5.5/10** (up from 3.5/10 pre-fixes)

## Landing Page (/) — Score: 6/10

### What works
- ✅ Hero headline clear: "How well can you predict the future?"
- ✅ Value prop differentiated: "No money. No gambling. Pure judgment."
- ✅ Two CTAs: "Start Forecasting" (primary) + "Browse Questions" (secondary)
- ✅ Social proof stats visible: "30-second sign-up", "10 Questions live now"
- ✅ How It Works 3-step section (Make Forecast → Blind Consensus → Get Scored)
- ✅ Differentiators section (No money, AI vs Human, Blind consensus)
- ✅ Live questions preview with category + time left
- ✅ Footer signup CTA present

### Issues
- 🔴 **10 questions only, 9/10 "Be the first to forecast"** = ghost town. This is the #1 conversion killer. Visitors see an empty platform.
- 🟡 **Category tags: 4/10 questions tagged "Other"** (Brent crude, COVID, global temp) — looks unprofessional. Should be Economy, Health, Science.
- 🟡 **No testimonials / user quotes** — AQ-159 removed fake ones, but nothing replaced them.
- 🟡 **Stats feel small**: "10 Questions live now" is underwhelming. Should emphasize the pipeline ("186+ questions coming") or hide the number below a threshold.
- 🟢 **No urgency**: All questions have 233-1329 days left. Nothing closing soon. No reason to act NOW.

## Signup Flow (/auth/signup) — Score: 6/10

### What works
- ✅ Google OAuth option (reduces friction)
- ✅ Clean form: username, email, password
- ✅ "Already a member? Log in" link
- ✅ Clear page title "Join Baycast"

### Issues
- 🔴 **No value reinforcement on signup page**: Landing page sells the dream, but signup page is a bare form. No reminder of WHY to sign up. No social proof. No "Join X forecasters" messaging.
- 🟡 **No password requirements shown**: User types password blind. Is it 8 chars? Special chars? Unclear.
- 🟡 **No terms/privacy link**: Legal gap. "By creating an account you agree to..." missing.
- 🟡 **Username field says "YourName"** — should clarify this is public display name vs unique handle.

## Questions Page (/questions) — Score: 5/10

### What works
- ✅ Sort controls: Closing Soon / Newest / Most Active
- ✅ Category filters visible
- ✅ Search box
- ✅ "10 open" count
- ✅ ⚡ Closing Soon section (top 3)

### Issues
- 🔴 **Closing Soon section shows questions with 233+ days left** — not actually "soon". This undermines credibility. Need questions resolving in <30 days.
- 🔴 **9/10 questions say "Be the first to forecast"** — massive ghost town signal. Every card screams "nobody uses this platform".
- 🟡 **Duplicate content**: Top 3 "Closing Soon" questions are repeated in the full list below. Wastes space.
- 🟡 **"Other" category dominates** — category filter for Other returns 4 questions but the labels are wrong (economy/health/science questions tagged Other).
- 🟡 **No visual diversity**: All question cards look the same. No images, no difficulty rating, no participation indicators.

## Question Detail — Score: 5/10

### What works
- ✅ Inline slider CTA for signed-out users (AQ-158)
- ✅ Quick-select buttons (5-95%)
- ✅ Signup link (not login) for CTAs (AQ-155)

### Issues
- 🔴 **After sliding, user sees signup wall** — the slider teases engagement but the payoff requires account creation. This is a LOSE-LOSE: user invests effort, gets blocked. Could be mitigated by showing "your forecast is saved! Sign up to track it".
- 🟡 **No question context**: No background info, no sources, no resolution criteria visible. Why should I forecast on this? What data should I consider?
- 🟡 **No discussion/comments**: Forecasting is solitary. No way to see others' reasoning (even after reveal).

## Post-Signup — Score: 4/10

### What works
- ✅ Onboarding flow exists (AQ-162): pick → forecast → celebrate

### Issues
- 🔴 **Onboarding requires migration_004** (AQ-163 BLOCKED). If `onboarding_complete` column doesn't exist, the onboarding may error silently.
- 🟡 **No email verification flow**: Does user get a welcome email? Setup instructions?
- 🟡 **No personalized recommendations**: After signup, what does the user see? The same ghost-town questions page.

---

## TOP 3 ISSUES (conversion killers)

### 1. 🔴 Ghost Town Effect (Impact: CRITICAL)
**Problem**: 10 questions, 9 with 0 forecasts. Every page screams "nobody is here".
**Fix**: Seed the 186 questions + have Smil/aliases make initial forecasts to break the cold-start problem.
**Effort**: Smil runs seed script (1 command).

### 2. 🔴 Category Tagging Broken (Impact: HIGH)
**Problem**: 4/10 questions tagged "Other" instead of proper categories. Makes the platform look broken.
**Fix**: Run `fix_resolution_urls.sql` + category normalization migration.
**Effort**: Smil executes 2 SQL scripts.

### 3. 🟡 Signup Page = Bare Form (Impact: MEDIUM)
**Problem**: No value reinforcement, no social proof, no urgency on the signup form. User clicks "Start Forecasting", lands on a generic form, bounces.
**Fix**: Add value props to signup page (testimonials placeholder, "Join the collective intelligence" tagline, question preview).

---

## UK POLITICS QUESTIONS (AQ-166) — Newsjacking Starmer

*Polymarket's Starmer resignation market hit $20M+ volume. Baycast should capture this attention.*

### Q1: Will Keir Starmer resign as UK Prime Minister before August 1, 2026?
- **Options**: Yes / No
- **Resolution**: Official UK government announcement of Starmer's resignation as PM. Source: gov.uk, BBC News.
- **End date**: 2026-08-01
- **Category**: Politics
- **Edge cases**: If Starmer is removed via Labour leadership challenge (not voluntary resignation), resolves YES. If he calls and loses a snap election, resolves NO (he'd lose the PM role via election, not resignation).

### Q2: Will the UK Labour Party hold a leadership contest before October 1, 2026?
- **Options**: Yes / No
- **Resolution**: Official Labour Party announcement of a leadership contest. Source: labour.org.uk, BBC News.
- **End date**: 2026-10-01
- **Category**: Politics
- **Edge cases**: Challenge must reach the threshold (20% of Labour MPs nominating a challenger) to count as a "contest".

### Q3: Will UK inflation (CPI) fall below 2.0% before September 2026?
- **Options**: Yes / No
- **Resolution**: ONS monthly CPI publication showing CPI below 2.0%. Source: ons.gov.uk.
- **End date**: 2026-09-30
- **Category**: Economy

### Q4: Will the UK announce a new general election date before December 31, 2026?
- **Options**: Yes / No
- **Resolution**: Official announcement via royal prerogative (PM requests dissolution of Parliament). Source: gov.uk, Parliament.uk.
- **End date**: 2026-12-31
- **Category**: Politics

### Q5: Will the UK sign a new trade agreement with the EU before end of 2026?
- **Options**: Yes / No
- **Resolution**: Official UK government announcement of a signed trade agreement with the EU (not just talks). Source: gov.uk, europeancommission.eu.
- **End date**: 2026-12-31
- **Category**: Politics

### Q6: Will Nigel Farage win a parliamentary seat in the next UK general election?
- **Options**: Yes / No
- **Resolution**: Official election results for Farage's constituency. Source: BBC News Election Results.
- **End date**: 2028-01-31 (or date of next general election)
- **Category**: Politics
- **Edge cases**: If Farage doesn't stand, resolves NO.

### Q7: Will the Bank of England base rate be at or below 3.5% by September 2026?
- **Options**: Yes / No
- **Resolution**: BoE Monetary Policy Committee official rate announcement. Source: bankofengland.co.uk.
- **End date**: 2026-09-30
- **Category**: Economy

### Q8: Will Reform UK poll above 25% in a national opinion poll before August 2026?
- **Options**: Yes / No
- **Resolution**: Any major UK pollster (YouGov, Ipsos, Survation, Redfield & Wilton) publishing a national voting intention poll with Reform UK above 25%. Source: polling data aggregated on Wikipedia or Britain Elects.
- **End date**: 2026-08-31
- **Category**: Politics

---

*Audit performed by Odin (CEO AI) via live E2E navigation on baycast-p.vercel.app.*
