# Baycast Launch Readiness Checklist

> **Proto:** baycast-p.vercel.app | **Stack:** Next.js 14 + Supabase + Vercel
> **Positioning:** Collective intelligence scored, not gambling

---

## 1. PRE-LAUNCH CHECKLIST (Smil Actions)

### Supabase Setup
- [ ] Execute seed SQL in Supabase Dashboard → SQL Editor (paste, run, confirm 35 rows) — **10 min**
- [ ] Execute leaderboard migration SQL in Supabase Dashboard → SQL Editor — **5 min**
- [ ] Verify `forecasts` table has RLS policies enabled — **2 min**

### Code & Deploy
- [ ] Merge AQ-041 fix (category filters data mismatch) — verify on branch first — **10 min**
- [ ] Merge AQ-042 fix (pagination controls visibility) — test on mobile viewport — **10 min**
- [ ] Merge AQ-043 fix (favicon + OG image) — **10 min**
- [ ] Verify all fixes deploy cleanly on baycast-p.vercel.app — **5 min**

### Branding & Assets
- [ ] Confirm favicon renders in browser tab (Chrome, Firefox, Safari) — **2 min**
- [ ] Create OG image (1200×630px) if not done — use Canva/Figma template — **15 min**
- [ ] Test OG image preview: https://developers.facebook.com/tools/debug/ — **2 min**
- [ ] Test Twitter card preview: https://cards-dev.twitter.com/validator — **2 min**

### Auth & User Flow
- [ ] Create GitHub PAT classic (classic token, repo scope) for CI workflows — **5 min**
- [ ] Add PAT to GitHub repo secrets as `GH_PAT` — **2 min**
- [ ] Test full signup flow (email + Google OAuth) — **5 min**
- [ ] Test password reset flow — **3 min**
- [ ] Submit 2-3 test forecasts to populate leaderboard — **10 min**

### Marketing Prep
- [ ] Review and customize PH kit (screenshots, tagline, first comment) — **30 min**
- [ ] Schedule Product Hunt launch slot — **5 min**
- [ ] Pre-draft launch tweet with link — **10 min**
- [ ] Pre-draft Reddit post (r/predictionmarkets or r/startups) — **15 min**

**Total estimated: ~2.5 hours**

---

## 2. GO/NO-GO CRITERIA

| # | Area | Criteria | Pass? |
|---|------|----------|-------|
| 1 | **Seed data** | 35 questions visible on /questions page | [ ] |
| 2 | **Category filters** | All categories show correct question counts (AQ-041 fixed) | [ ] |
| 3 | **Pagination** | Controls visible, pages 1-2-3 navigable (AQ-042 fixed) | [ ] |
| 4 | **Favicon** | Renders in Chrome tab at baycast-p.vercel.app | [ ] |
| 5 | **OG image** | Facebook debug tool shows correct preview image | [ ] |
| 6 | **Auth — signup** | New user can sign up with email | [ ] |
| 7 | **Auth — Google** | Google OAuth completes and redirects | [ ] |
| 8 | **Forecast submit** | Can submit a forecast on any question | [ ] |
| 9 | **Leaderboard** | Shows test user with score after forecast submitted | [ ] |
| 10 | **Mobile** | Core flows work on iPhone/Android Chrome — signup, browse, forecast | [ ] |
| 11 | **SEO** | og:title, og:description, twitter:card present in page source | [ ] |
| 12 | **No console errors** | Open DevTools → Console on homepage: zero red errors | [ ] |
| 13 | **CI pipeline** | GitHub Actions workflow runs successfully with PAT | [ ] |
| 14 | **Performance** | Lighthouse Performance > 60 (use lighthouse CLI or web.dev) | [ ] |

**Threshold: 12/14 must pass to launch. Items 1, 2, 3, 6, 8 are HARD BLOCKERS (must pass).**

---

## 3. LAUNCH SEQUENCE (Day 1)

> Full details in `docs/LAUNCH_DAY_PLAN.md` (828 lines)

| Time | Action | Owner |
|------|--------|-------|
| **T-1 day** | Final GO/NO-GO check (table above). Fix any hard blockers. | Smil |
| **T-1h** | Deploy latest `main` to Vercel. Confirm baycast-p.vercel.app is green. | Smil |
| **T-0** | Press launch. Switch Vercel to production domain if ready. | Smil |
| **T+0:05** | Post Product Hunt. Pin first comment with launch story. | Smil |
| **T+0:10** | Tweet launch announcement. Pin to profile. | Smil |
| **T+0:30** | Post to Reddit (chosen subreddit). Engage with early comments. | Smil |
| **T+1h** | Check metrics: visitors, signups, forecasts. Note any errors. | Smil |
| **T+3h** | Respond to all PH comments. Reply to Reddit thread. | Smil |
| **T+6h** | Send launch email to waitlist/personal network. | Smil |
| **T+12h** | Evening check: Uptime, error rate, user feedback summary. | Smil |
| **T+24h** | End-of-day review. Log metrics. Plan Day 2 priorities. | Smil |

---

## 4. FIRST 48H MONITORING

| Check | Frequency | How | Alert Threshold |
|-------|-----------|-----|-----------------|
| **Site uptime** | Every 2h | Visit homepage + /questions | Down = immediate fix |
| **Vercel logs** | Every 4h | Vercel Dashboard → Logs | >5 errors/hour = investigate |
| **New signups** | Every 4h | Supabase → Auth → Users | <5 in 24h = boost marketing |
| **Forecasts submitted** | Every 4h | Supabase → Table Editor → forecasts | 0 in 12h = check UX flow |
| **PH ranking** | Every 2h (Day 1) | Product Hunt page | Top 5 = push harder; Top 10 = good |
| **Reddit engagement** | Every 4h | Reddit notifications | Negative sentiment = respond ASAP |
| **Twitter mentions** | Every 4h | Twitter search "baycast" | Any bugs reported = fix within 2h |
| **Supabase DB size** | Once at 48h | Supabase Dashboard → Settings | >500MB = review (unlikely) |

---

## 5. EMERGENCY CONTACTS & ROLLBACK

### If Site Goes Down
1. Check Vercel status: https://www.vercel-status.com
2. Check Supabase status: https://status.supabase.com
3. If Vercel deploy failed: redeploy last known-good commit via Vercel Dashboard → Deployments → Promote
4. If Supabase is down: wait (SLA is usually <5min for incidents)

### If Critical Bug Found
1. **Revert the commit** that introduced it: `git revert <hash> && git push origin main`
2. Vercel auto-deploys on push — fix live in ~2 min
3. Communicate on PH comments / Twitter if users are affected

### If Data Integrity Issue
1. Do NOT modify Supabase data directly without a backup
2. Export affected tables: Supabase → Table Editor → Export CSV
3. Fix SQL → test on a staging branch → apply

### Key Links
- **Vercel Dashboard:** https://vercel.com/dashboard
- **Supabase Dashboard:** https://supabase.com/dashboard
- **GitHub Repo:** your repo URL
- **Launch Day Plan:** `docs/LAUNCH_DAY_PLAN.md`
- **Marketing Assets:** `docs/marketing/`

### Rollback Command (nuclear option)
```bash
cd /root/baycast
git log --oneline -10          # find last good commit
git revert <bad-commit-hash>   # or: git reset --hard <good-hash>
git push origin main --force   # only if reset used
```

---

*Last updated: 2026-05-04*
