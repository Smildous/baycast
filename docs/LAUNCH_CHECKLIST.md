# Baycast — Public Launch Checklist

**Proto:** [baycast-p.vercel.app](https://baycast-p.vercel.app) | **Code:** [github.com/Smildous/baycast](https://github.com/Smildous/baycast) | **Marketing docs:** [docs/MARKETING_LAUNCH.md](./MARKETING_LAUNCH.md)

---

## Phase 0: Pre-Launch Verification (T-7 to T-3 days)

### Platform Readiness
- [ ] Verify proto loads correctly on mobile (iOS Safari, Android Chrome)
- [ ] Verify proto loads correctly on desktop (Chrome, Firefox, Safari)
- [ ] Test the full prediction flow: blind phase → revision phase → scoring display
- [ ] Confirm all 10 questions have correct resolution dates and clear resolution criteria
- [ ] Test scoring calculation: Brier score + calibration score display correctly
- [ ] Verify blind/revision delta is displayed properly after revision phase
- [ ] Check for any console errors or broken UI elements
- [ ] Test at 5+ different user flows (new visitor, returning visitor, multiple predictions)
- [ ] Verify GitHub repo is public and README is updated
- [ ] Confirm no hardcoded dev data, API keys, or test content in production

### Content & Assets
- [ ] Finalize Smil's X/Twitter launch thread (see [MARKETING_LAUNCH.md](./MARKETING_LAUNCH.md) — 8 tweets)
- [ ] Finalize Product Hunt listing (tagline, description, first comment)
- [ ] Finalize Reddit posts (r/predictionmarket and r/superforecasters drafts)
- [ ] Create a simple landing page or ensure proto has clear onboarding for first-time visitors
- [ ] Prepare 3-5 screenshots for Product Hunt and social media
- [ ] Write a short "How it works" section visible on the proto (or link to README)
- [ ] Prepare outreach DMs for Tier 1 targets (see MARKETING_LAUNCH.md Section 3)

### Accounts & Tools
- [ ] Ensure Product Hunt maker account is set up
- [ ] Set up a tracking spreadsheet for outreach (who contacted, responses, conversions)
- [ ] Set up basic analytics on the proto (Vercel analytics or similar) — track visitors, predictions submitted
- [ ] Prepare a short FAQ for DMs and comments

---

## Phase 1: Launch Day (T-0)

### Timing
- **Best window:** Tuesday–Thursday, 9:00–11:00 AM ET
- **Avoid:** Fridays, weekends, US holidays
- **Rationale:** Maximum US and European overlap, mid-week engagement peak

### Launch Sequence (in order)

#### 1. X/Twitter Thread (Smil's Personal Account) — 9:00 AM ET
- [ ] Post the 8-tweet thread from MARKETING_LAUNCH.md
- [ ] Pin the thread to profile for 48 hours
- [ ] Quote-tweet with a shorter hook 2 hours later
- [ ] Reply to every meaningful comment in the first 4 hours
- [ ] Tag/mention relevant accounts where appropriate (without being spammy)

#### 2. Product Hunt — 12:01 AM PST (same day)
- [ ] Submit the Product Hunt listing (must be submitted before midnight PST to appear same day)
- [ ] Post as "Maker" with prepared description and first comment
- [ ] Monitor and respond to every comment within 1 hour
- [ ] Ask 3-5 friends to upvote and comment early (legitimately, with real feedback)
- [ ] Update the listing throughout the day with response comments

#### 3. Reddit Posts — 10:00 AM ET
- [ ] Post to r/predictionmarket with draft from MARKETING_LAUNCH.md
- [ ] Post to r/superforecasters with draft from MARKETING_LAUNCH.md
- [ ] Cross-post consideration: r/slatestarcodex, r/effectivealtruism (if appropriate)
- [ ] Engage with every comment for 2 hours after posting
- [ ] Do NOT cross-post to more than 2-3 subreddits in one day (spam filter risk)

#### 4. Hacker News — 10:00 AM ET
- [ ] Submit as "Show HN: Baycast – Prediction polling with blind consensus scoring"
- [ ] Title must be factual and descriptive (HN guidelines)
- [ ] Be present in comments for first 3 hours
- [ ] Do not astroturf — HN will detect it

#### 5. Direct Outreach — Afternoon (2:00–5:00 PM ET)
- [ ] Send DMs to first 5 Tier 1 targets from MARKETING_LAUNCH.md
- [ ] Personalize each message (reference their work)
- [ ] Keep it short and low-pressure
- [ ] Track in spreadsheet

#### 6. Community Posts — Afternoon
- [ ] LessWrong: Cross-post blog outline or short intro
- [ ] EA Forum: If appropriate, post about the methodology
- [ ] Discord/Slack communities: Share in relevant forecasting community channels

---

## Phase 2: Post-Launch — First Week Follow-Up

### Day 1 (Launch Day Evening)
- [ ] Review all platform analytics (visitors, predictions, bounce rate)
- [ ] Respond to any remaining comments on Reddit, HN, PH
- [ ] Send follow-up DMs if any Tier 1 targets engaged
- [ ] Note any bugs or UX issues reported by early users

### Day 2
- [ ] Post a follow-up tweet: "24 hours in: X predictions submitted, Y users, initial data on blind vs revised consensus"
- [ ] Share any interesting early data (even if small sample)
- [ ] Continue responding to comments across all platforms
- [ ] Send DMs to next 5 Tier 1/2 targets

### Day 3
- [ ] Fix any critical bugs found in first 48 hours
- [ ] Write a short "first results" thread if data is interesting
- [ ] Consider a short blog post: "What we learned from 48 hours of blind consensus"

### Day 4-5
- [ ] Send follow-up DMs to anyone who hasn't responded (one follow-up only)
- [ ] Post update on Product Hunt (comments section)
- [ ] Share any milestone (e.g., "50 predictions submitted")

### Day 6-7
- [ ] Weekly recap tweet: data, learnings, next steps
- [ ] Plan next question set or platform improvements based on feedback
- [ ] Review MARKET_INTELLIGENCE doc for any new competitive developments
- [ ] Decide on next marketing actions (blog post, podcast pitch, etc.)

---

## Phase 3: Second Week & Beyond

### Ongoing
- [ ] Add new questions regularly (aim for 5-10 new questions per week)
- [ ] Track scoring leaderboards as data accumulates
- [ ] Publish "Baycast Data Report" when first questions resolve
- [ ] Iterate on UX based on user feedback
- [ ] Begin AI agent integration planning

### Potential Next Moves
- [ ] Pitch to forecasting/tech podcasts
- [ ] Write guest post for rationalist community blogs
- [ ] Submit to "best new tools" roundups
- [ ] Explore partnership with academic forecasting researchers
- [ ] Consider Substack post from Smil on the methodology

---

## Quick Reference

| Platform | Action | Timing | Status |
|----------|--------|--------|--------|
| X/Twitter | 8-tweet thread | Launch day 9AM ET | ⬜ |
| Product Hunt | Listing submission | Launch day 12:01AM PST | ⬜ |
| Reddit r/predictionmarket | Post | Launch day 10AM ET | ⬜ |
| Reddit r/superforecasters | Post | Launch day 10AM ET | ⬜ |
| Hacker News | Show HN | Launch day 10AM ET | ⬜ |
| LessWrong | Cross-post | Launch day afternoon | ⬜ |
| Direct outreach (Tier 1) | DMs | Launch day 2-5PM ET | ⬜ |

### Key URLs
- Proto: https://baycast-p.vercel.app
- GitHub: https://github.com/Smildous/baycast
- Marketing Launch Materials: [docs/MARKETING_LAUNCH.md](./MARKETING_LAUNCH.md)
- Market Intelligence: [docs/MARKET_INTELLIGENCE_2026-04-30.md](./MARKET_INTELLIGENCE_2026-04-30.md)
- Specs: [docs/SPECS.md](./SPECS.md)

---

*Prepared for Baycast public launch planning. Execute in order. Track progress in each checkbox.*
