# 🎯 Baycast — Post-Seeding 14-Day Execution Plan

> **Baycast is a prediction polling platform where you forecast real-world events without seeing the crowd first — a technique called the Blind Consensus Protocol, inspired by the Delphi method and proven to outperform prediction markets by 25%. Unlike Polymarket or Kalshi, there's no money, no crypto, no gambling — just scored collective intelligence where humans and AI compete on the same questions, tracked by proper Brier scores. Free, open-source, EU-based.**

**Prototype:** [baycast-p.vercel.app](https://baycast-p.vercel.app) | **GitHub:** [github.com/Smildous/baycast](https://github.com/Smildous/baycast) | **Twitter:** @baycast_

---

## Phase 1: Seed Day (Day 0)

> **Goal:** Get 176+ questions into the database so the site has real content. Without this, nothing else matters.

### ⏰ Morning — Run the Seed Script

- [ ] ✅ Open terminal, navigate to the project root
- [ ] ✅ Confirm `.env.local` has `SUPABASE_URL` and `SUPABASE_ANON_KEY`:
  ```bash
  cat .env.local | grep SUPABASE
  ```
- [ ] ✅ Run the seed script:
  ```bash
  npx tsx scripts/seed-questions.ts
  ```
- [ ] ✅ Watch the output — expect it to process all `docs/questions_batch_may*.sql` files (14 SQL batches, may6–may19)
- [ ] ✅ If any errors, note which batch failed and re-run individually

📁 **File reference:** `scripts/seed-questions.ts` (the script) + `docs/questions_batch_may{6..19}.sql` (the data)

### ⏰ After Seeding — Verify Everything Works

- [ ] ✅ Open https://baycast-p.vercel.app — homepage loads with questions
- [ ] ✅ Count visible questions: should see **176+** questions across categories
- [ ] ✅ Click into 3-5 different questions — each page renders with the slider/prediction UI
- [ ] ✅ Verify categories are populated: Politics, AI/Technology, Sports, Economics, Science, Crypto/Finance, Geopolitics
- [ ] ✅ Test the signup flow: create a test account, submit a forecast, confirm it saves
- [ ] ✅ Check the "Closing Soon" section if shipped — should show questions near their deadline
- [ ] ✅ Check sort controls if shipped — filter by category, sort by newest/most popular
- [ ] ✅ Test on mobile (open on your phone) — the 7 mobile UX fixes should be live

📊 **Expected outcome:** A fully populated, functional site with 176+ questions across 7+ categories. Ready for public promotion.

---

## Phase 2: Launch Week (Days 1–7)

> **Goal:** Drive first 50-100 signups through targeted posts on Twitter, Reddit, HN, and email outreach. Build social proof before Product Hunt on May 28.

---

### Day 1 — Twitter Launch + Reddit r/predictionmarkets

⏰ **8:00 AM UTC** — Twitter/X

- [ ] ✅ Post the "What is Baycast?" thread from `docs/TWEET_THREAD_WHAT_IS_BAYCAST.md` (12 tweets)
- [ ] ✅ Pin the thread to your @baycast_ profile
- [ ] ✅ Update Twitter bio: "Prediction polling, not prediction markets. Blind consensus protocol. No gambling."
- [ ] ✅ Update Twitter profile link → baycast-p.vercel.app

📁 **File:** `docs/TWEET_THREAD_WHAT_IS_BAYCAST.md`

⏰ **2:00 PM UTC** — Reddit Post #1

- [ ] ✅ Post to **r/predictionmarkets** — use `docs/REDDIT_PREDICTIONMARKETS_MAY9.md`
- [ ] ✅ Title: "Baycast: Blind prediction polling with Brier scoring — open source, no money, EU-based"
- [ ] ✅ Respond to every comment within 2 hours

📁 **File:** `docs/REDDIT_PREDICTIONMARKETS_MAY9.md`

⏰ **6:00 PM UTC** — Engagement Sweep

- [ ] ✅ Search Twitter for "prediction markets," "Polymarket," "forecasting" — reply to 3-5 relevant tweets with helpful, non-spammy comments (mention Baycast only if natural)
- [ ] ✅ Check Reddit post, respond to comments

📊 **Expected outcome:** Thread gets 50-100 impressions. Reddit post gets 10-20 upvotes. 5-10 site visits.

---

### Day 2 — Reddit r/Superforecasters + Twitter Engagement

⏰ **9:00 AM UTC** — Twitter Standalone Tweets

- [ ] ✅ Post Tweet 1 (Platform Intro) from `docs/TWEET_TEMPLATES.md`
- [ ] ✅ Post Tweet 2 (Blind Consensus feature) from `docs/TWEET_TEMPLATES.md`

📁 **File:** `docs/TWEET_TEMPLATES.md`

⏰ **3:00 PM UTC** — Reddit Post #2

- [ ] ✅ Post to **r/Superforecasters** — technical angle: Delphi method, Brier scores, Good Judgment Project
- [ ] ✅ Use the email template talking points from `docs/EMAIL_ACQUISITION_TEMPLATE.md` as a guide for the post body (sections on BCP, Delphi method, GJP)
- [ ] ✅ Ask for methodology feedback explicitly — this community respects substance
- [ ] ✅ Respond to every comment

📁 **File:** `docs/EMAIL_ACQUISITION_TEMPLATE.md` (talking points)

⏰ **7:00 PM UTC** — Community Engagement

- [ ] ✅ Check Day 1 Reddit posts, respond to any new comments
- [ ] ✅ Follow 10-15 people in the forecasting/prediction space on Twitter
- [ ] ✅ Like and quote-tweet 2-3 relevant posts from forecasting community

📊 **Expected outcome:** 20-50 more site visits. First substantive Reddit discussion. 2-5 signups.

---

### Day 3 — Email Outreach Day + Twitter Thread

⏰ **9:00 AM UTC** — Send Emails

- [ ] ✅ Send 10-15 personalized emails using `docs/EMAIL_ACQUISITION_TEMPLATE.md`
- [ ] ✅ Target: Metaculus/ACX community members, superforecasters, AI researchers
- [ ] ✅ Use segmentation from the template:
  - Metaculus/ACX → subject: "Your Brier score deserves a better home"
  - Superforecasters → subject: "We rebuilt the Good Judgment Project for the internet"
  - AI researchers → subject: "A forecasting benchmark where humans and AI play by the same rules"
- [ ] ✅ Personalize the first line for each recipient

📁 **File:** `docs/EMAIL_ACQUISITION_TEMPLATE.md`

⏰ **2:00 PM UTC** — Twitter Thread

- [ ] ✅ Post the Monday thread from `docs/MONDAY_THREAD_PREDICTION_POLLS.md` (7 tweets)
- [ ] ✅ This is the provocative "Why prediction markets are gambling" angle — works well for engagement

📁 **File:** `docs/MONDAY_THREAD_PREDICTION_POLLS.md`

⏰ **6:00 PM UTC** — Reddit Follow-up

- [ ] ✅ Post a follow-up comment on your Day 1 r/predictionmarkets post with an update (e.g., "We just added 50 new questions covering [topic] — check it out")
- [ ] ✅ Respond to any new comments on both Reddit posts

📊 **Expected outcome:** 5-10 email opens. 2-5 email signups. Thread engagement on Twitter. Cumulative 10-15 signups.

---

### Day 4 — Hacker News "Show HN" + Blog Post

⏰ **8:00 AM UTC** — Hacker News Post

- [ ] ✅ Post to Hacker News as **"Show HN: Baycast – Prediction polling with blind consensus protocol"**
- [ ] ✅ Text post (not link-only) — explain the technical design:
  - Brier scoring
  - Two-phase protocol (blind → reveal → revise)
  - No-money approach
  - Open source
- [ ] ✅ Keep it technical and honest — HN hates marketing fluff
- [ ] ✅ Respond to every comment within 1 hour for the first 4 hours

⏰ **12:00 PM UTC** — Publish Blog Post

- [ ] ✅ Publish "Why Blind Consensus Beats the Wisdom of Crowds" from `docs/BLOG_BLIND_CONSENSUS.md`
- [ ] ✅ Post to Medium as a cross-post for SEO
- [ ] ✅ Tweet the blog with a key quote from the article

📁 **File:** `docs/BLOG_BLIND_CONSENSUS.md`

⏰ **5:00 PM UTC** — Engagement

- [ ] ✅ Monitor HN post — respond to all comments
- [ ] ✅ Send second batch of 10 emails from `docs/EMAIL_ACQUISITION_TEMPLATE.md` (different segment)
- [ ] ✅ Follow up on Day 3 emails that didn't open

📊 **Expected outcome:** HN post gets 20-50 upvotes if it resonates. Blog post gets 100+ reads. 10-20 new signups.

---

### Day 5 — Reddit r/artificial + Twitter Content

⏰ **9:00 AM UTC** — Reddit Post #3 (AI Angle)

- [ ] ✅ Post to **r/artificial** — use `docs/REDDIT_POST_2.md`
- [ ] ✅ Title: "I built a prediction platform where humans and AI forecast together — here's what I learned"
- [ ] ✅ Fallback subreddits if removed: r/MachineLearning, r/singularity
- [ ] ✅ Respond to comments

📁 **File:** `docs/REDDIT_POST_2.md`

⏰ **3:00 PM UTC** — Twitter Content

- [ ] ✅ Post Tweet 3 (Philosophical Angle — RAND/Delphi) from `docs/TWEET_TEMPLATES.md`
- [ ] ✅ Post Tweet 4 (Question Teaser — the herding quiz) from `docs/TWEET_TEMPLATES.md`
- [ ] ✅ Space these 2+ hours apart

📁 **File:** `docs/TWEET_TEMPLATES.md`

⏰ **7:00 PM UTC** — Email Follow-ups

- [ ] ✅ Follow up on all unopened emails from Days 3-4 (5-day follow-up rule)
- [ ] ✅ Send 5 more new personalized emails (different targets)

📁 **File:** `docs/EMAIL_ACQUISITION_TEMPLATE.md`

📊 **Expected outcome:** r/artificial post gets 30+ upvotes. Cumulative 20-30 signups.

---

### Day 6 — LinkedIn + Cross-Promotion + Product Hunt Prep

⏰ **9:00 AM UTC** — LinkedIn Post

- [ ] ✅ Post a professional angle on LinkedIn: "Why we chose prediction polling over prediction markets"
- [ ] ✅ Use talking points from `docs/COMPARISON_PAGE_CONTENT.md` — the Baycast vs. Polymarket/Metaculus/Manifold comparison
- [ ] ✅ Tag relevant people if appropriate

📁 **File:** `docs/COMPARISON_PAGE_CONTENT.md`

⏰ **2:00 PM UTC** — SEO Content

- [ ] ✅ Publish the "Polymarket Alternatives" article from `docs/SEO/polymarket-alternatives.md`
- [ ] ✅ This is pure SEO bait — targets "polymarket alternatives" search queries
- [ ] ✅ Share on Twitter with a hook tweet

📁 **File:** `docs/SEO/polymarket-alternatives.md`

⏰ **6:00 PM UTC** — Product Hunt Prep (May 28 = Day 8 from now if Day 0 is May 20)

- [ ] ✅ Review `docs/PRODUCT_HUNT_LAUNCH.md` — tagline, description, maker comment all ready
- [ ] ✅ Create PH maker profile if not done (photo, bio, social links)
- [ ] ✅ Prepare 3-4 screenshots (1920x1080px) — homepage, a question page, leaderboard, BCP flow
- [ ] ✅ Record a 30-second demo GIF showing: question → blind predict → reveal → revise
- [ ] ✅ DM 10-15 people asking for upvote support on May 28

📁 **Files:** `docs/PRODUCT_HUNT_LAUNCH.md`, `docs/PH_LAUNCH_DAY_EXECUTION.md`, `docs/PRODUCT_HUNT_LAUNCH_STRATEGY.md`

📊 **Expected outcome:** LinkedIn reach 500+. SEO article indexed within days. PH assets ready.

---

### Day 7 — Newsjacking + Weekly Review + PH Final Prep

⏰ **9:00 AM UTC** — Newsjacking Tweets

- [ ] ✅ Scan news for: prediction markets, Polymarket, AI forecasting, election odds, crypto regulation
- [ ] ✅ Post 2-3 relevant tweets using templates from `docs/MARKETING_MAY8_NEWSJACKING.md`
- [ ] ✅ These are reactive — adapt the templates to today's headlines

📁 **File:** `docs/MARKETING_MAY8_NEWSJACKING.md`

⏰ **2:00 PM UTC** — Publish Second Blog Post

- [ ] ✅ Publish the launch blog from `docs/LAUNCH_BLOG_POST_MAY9.md` — "The $15B Prediction Industry Is Having a Regulatory Crisis"
- [ ] ✅ Tweet the key thesis as a standalone tweet
- [ ] ✅ Cross-post to Medium

📁 **File:** `docs/LAUNCH_BLOG_POST_MAY9.md`

⏰ **6:00 PM UTC** — Weekly Review

- [ ] ✅ Count total signups — target: 30-50
- [ ] ✅ Review which Reddit posts got the most engagement
- [ ] ✅ Note which Twitter tweets performed best
- [ ] ✅ Respond to any pending Reddit/HN comments
- [ ] ✅ Draft the PH listing as a draft on Product Hunt (don't publish yet)
- [ ] ✅ DM supporters: "We're launching on Product Hunt this Thursday (May 28) — would love your support at 12:01 AM PST"

📊 **Expected outcome:** Clear picture of what's working. 30-50 total signups. PH draft ready.

---

## Phase 3: Growth Week (Days 8–14)

> **Goal:** Leverage Product Hunt launch (May 28), convert early users into social proof, and establish a content rhythm.

---

### Day 8 — 🚀 PRODUCT HUNT LAUNCH DAY (May 28)

⏰ **12:01 AM PST / 8:01 AM UTC** — Submit Product Hunt

- [ ] ✅ Submit the listing on Product Hunt
- [ ] ✅ Name: Baycast
- [ ] ✅ Tagline: "Blind consensus forecasting — humans + AI, scored."
- [ ] ✅ Description: (use `docs/PRODUCT_HUNT_LAUNCH.md` Section 2 — 259 chars)
- [ ] ✅ Topics: Prediction Markets, Forecasting, Artificial Intelligence, Data Science, Polling, Tech, Future
- [ ] ✅ Upload all screenshots + demo GIF
- [ ] ✅ Website: https://baycast-p.vercel.app

📁 **File:** `docs/PRODUCT_HUNT_LAUNCH.md`

⏰ **8:30 AM UTC** — Maker Comment

- [ ] ✅ Post the first comment on your PH listing (founder story + CTA)
- [ ] ✅ Use the copy from `docs/PRODUCT_HUNT_LAUNCH.md` Section 4-5
- [ ] ✅ Key points: why we built it, how it's different, "Your first forecast takes 30 seconds"

📁 **File:** `docs/PRODUCT_HUNT_LAUNCH.md`

⏰ **9:00 AM UTC** — Cross-Post Everywhere

- [ ] ✅ Tweet: "We just launched on Product Hunt! 🚀 Check out Baycast — blind consensus forecasting. [PH link]"
- [ ] ✅ Post in all relevant Discord/Slack communities
- [ ] ✅ Send reminder DMs to upvote supporters
- [ ] ✅ Post on Reddit (add a comment on your existing threads, don't create new spam posts)

⏰ **All Day** — PH Engagement

- [ ] ✅ Respond to every PH comment within 30 minutes
- [ ] ✅ Thank every upvoter who leaves a comment
- [ ] ✅ Monitor ranking — goal: stay in top 5 for the day

📊 **Expected outcome:** 100+ PH upvotes. 50-200 site visits. 20-50 new signups. Top 5 Product of the Day.

---

### Day 9 — Post-PH Follow-up + Content

⏰ **9:00 AM UTC** — Twitter Victory Thread (or graceful wrap-up)

- [ ] ✅ Post a "Thank you" tweet thread regardless of PH ranking
- [ ] ✅ Share 2-3 interesting stats: number of signups, most popular question category, any fun data
- [ ] ✅ If PH went well: "We made it to #X on Product Hunt! Here's what we learned building a prediction polling platform..."
- [ ] ✅ CTA: "We're just getting started — join us: baycast-p.vercel.app"

⏰ **2:00 PM UTC** — Publish "Why Prediction Polls" Article

- [ ] ✅ Publish `docs/WHY_PREDICTION_POLLS.md` as a blog post / Medium article
- [ ] ✅ This is the intellectual foundation piece — positions Baycast as methodology-first
- [ ] ✅ Share on Twitter, Reddit (as a comment on existing threads), and LinkedIn

📁 **File:** `docs/WHY_PREDICTION_POLLS.md`

⏰ **6:00 PM UTC** — Social Proof Collection

- [ ] ✅ DM every user who signed up in the last 2 days: "Hey! Thanks for trying Baycast. Quick question — what did you think? Any feedback?"
- [ ] ✅ Collect 3-5 testimonials/quotes from early users
- [ ] ✅ Screenshot any positive Reddit/HN/PH comments for later use

📊 **Expected outcome:** 10-20 more signups. 3-5 user testimonials collected. Blog published.

---

### Day 10 — Reddit Round 2 + User Feedback Integration

⏰ **9:00 AM UTC** — Reddit Engagement

- [ ] ✅ Post a "1 week in" update on r/predictionmarkets: "Baycast is 1 week old — here's what we learned from 50+ forecasters"
- [ ] ✅ Share real data: most popular categories, average confidence levels, any interesting consensus findings
- [ ] ✅ Ask for feature requests

⏰ **2:00 PM UTC** — Publish Prediction Markets Guide Thread

- [ ] ✅ Post the "What Are Prediction Markets?" educational thread from `docs/TWITTER_PREDICTION_MARKETS_GUIDE.md`
- [ ] ✅ This is value-first content — builds credibility before pitching Baycast
- [ ] ✅ Final tweet of the thread mentions Baycast as the alternative

📁 **File:** `docs/TWITTER_PREDICTION_MARKETS_GUIDE.md`

⏰ **6:00 PM UTC** — Email Batch #3

- [ ] ✅ Send 10-15 more emails from `docs/EMAIL_ACQUISITION_TEMPLATE.md`
- [ ] ✅ This batch: reference any social proof collected on Day 9 ("We have 50+ forecasters already...")
- [ ] ✅ Subject line: "50 forecasters are already building accuracy track records on Baycast"

📁 **File:** `docs/EMAIL_ACQUISITION_TEMPLATE.md`

📊 **Expected outcome:** Reddit discussion generates 10+ comments. Email batch gets 40%+ open rate. 10-15 more signups.

---

### Day 11 — Content Repurposing + Community Building

⏰ **9:00 AM UTC** — Repurpose Top-Performing Content

- [ ] ✅ Identify the best-performing tweet/Reddit post from Days 1-10
- [ ] ✅ Expand it into a longer blog post or Twitter thread
- [ ] ✅ Example: if the "herding problem" angle got engagement, expand `docs/BLOG_BLIND_CONSENSUS.md` into a Twitter thread series

⏰ **2:00 PM UTC** — Week 2 Daily Content

- [ ] ✅ Post today's tweets from `docs/WEEK2_DAILY_CONTENT.md` (pick the day matching today's topic)
- [ ] ✅ Do the engagement action listed for that day (search and reply to relevant conversations)

📁 **File:** `docs/WEEK2_DAILY_CONTENT.md`

⏰ **6:00 PM UTC** — Forecast Results & Social Proof

- [ ] ✅ If any questions have resolved by now, share the results on Twitter
- [ ] ✅ "Question: [X]. Community prediction: [Y]%. Actual outcome: [Z]. Brier scores are in."
- [ ] ✅ This is the strongest social proof — it shows the platform works in real-time

📊 **Expected outcome:** Content repurposing extends reach of best performers. Resolution results create compelling social proof.

---

### Day 12 — SEO Push + Email Follow-ups

⏰ **9:00 AM UTC** — Publish Launch Blog Post (if not already)

- [ ] ✅ If not published yet, publish `docs/LAUNCH_BLOG_POST.md` — the long-form "Prediction Markets Are Broken" piece
- [ ] ✅ This is the flagship content piece — 2000+ words, comprehensive
- [ ] ✅ Share on Twitter, LinkedIn, Reddit (as a link comment on existing threads)
- [ ] ✅ Cross-post to Medium and Dev.to

📁 **File:** `docs/LAUNCH_BLOG_POST.md`

⏰ **2:00 PM UTC** — Email Follow-up Round

- [ ] ✅ Follow up on ALL unopened emails from Days 3, 5, and 10
- [ ] ✅ Updated subject: "Quick follow-up: Baycast just hit [X] forecasters"
- [ ] ✅ Include any user testimonial as social proof

⏰ **6:00 PM UTC** — Community Engagement

- [ ] ✅ Spend 30 minutes engaging on Twitter: reply to forecasting threads, quote-tweet relevant news
- [ ] ✅ Respond to all pending Reddit comments
- [ ] ✅ Check HN for any relevant threads to contribute to

📊 **Expected outcome:** Flagship blog live. Email follow-ups recover 5-10 signups. Cumulative 75-100+ signups.

---

### Day 13 — Metrics Review + Planning

⏰ **9:00 AM UTC** — Full Metrics Audit

- [ ] ✅ **Total signups:** Count all registered users
- [ ] ✅ **Total forecasts submitted:** Check Supabase `forecasts` table
- [ ] ✅ **Questions with predictions:** How many questions have at least 1 forecast?
- [ ] ✅ **Traffic sources:** Check Vercel analytics or GA4 — which channels drove the most signups?
  - Twitter
  - Reddit
  - Hacker News
  - Product Hunt
  - Direct / organic
  - Email
- [ ] ✅ **Best-performing content:** Which tweet/Reddit post got the most engagement?
- [ ] ✅ **Conversion rate:** Signups ÷ unique visitors

⏰ **2:00 PM UTC** — Adjust Strategy

- [ ] ✅ Double down on the top-performing channel (if Reddit → more Reddit posts; if Twitter → more threads)
- [ ] ✅ Note which content angles resonate (herding problem? AI angle? anti-gambling?)
- [ ] ✅ Plan next week's content calendar based on data

⏰ **6:00 PM UTC** — Publish "Prediction Markets Guide" Thread

- [ ] ✅ If not posted on Day 10, post `docs/TWITTER_PREDICTION_MARKETS_GUIDE.md` today
- [ ] ✅ This educational content builds long-term authority

📁 **File:** `docs/TWITTER_PREDICTION_MARKETS_GUIDE.md`

📊 **Expected outcome:** Clear data-driven understanding of what works. Strategy adjusted for continued growth.

---

### Day 14 — Milestone Post + Growth Loop Setup

⏰ **9:00 AM UTC** — Milestone Announcement

- [ ] ✅ Post a milestone tweet: "Baycast is 2 weeks old: [X] forecasters, [Y] predictions, [Z] questions resolved"
- [ ] ✅ Include a user quote/testimonial if collected
- [ ] ✅ CTA: "Join the most accurate community of forecasters on the internet"

⏰ **2:00 PM UTC** — Leverage Early Forecasters for Social Proof

- [ ] ✅ Identify top 5 forecasters by Brier score or activity
- [ ] ✅ DM them: "You're one of our top forecasters! Would you be willing to share a brief testimonial?"
- [ ] ✅ Create a "leaderboard highlight" tweet: "This week's top forecaster predicted [X] with [Y]% confidence. The crowd was at [Z]%. They were closer."
- [ ] ✅ If any forecaster has an interesting take, ask them to co-author a blog post

⏰ **6:00 PM UTC** — Set Up Growth Loops for Week 3+

- [ ] ✅ **Daily habit:** 2 tweets/day + 30 min community engagement
- [ ] ✅ **Weekly habit:** 1 Reddit post + 1 blog post + 1 email batch
- [ ] ✅ **Add new questions weekly:** Review and add fresh questions from `docs/questions_batch_*.md` files
- [ ] ✅ **Resolution posts:** Every time a question resolves, post the results
- [ ] ✅ **Leaderboard updates:** Weekly "top forecaster" spotlight

📁 **Files:** `docs/WEEK2_DAILY_CONTENT.md` (daily tweets), `docs/PUBLICATION_CALENDAR.md` (ongoing calendar), `docs/LAUNCH_CONTENT_CALENDAR.md` (longer-term plan)

📊 **Expected outcome:** Public milestone creates credibility. Growth loops established. Clear path to 200+ signups by end of Week 3.

---

## 📊 Master Metrics Tracker

| Metric | Day 0 | Day 7 | Day 14 |
|--------|-------|-------|--------|
| Questions in DB | 176+ | 176+ | 176+ |
| Registered users | 0 | **30-50** | **75-150** |
| Total forecasts | 0 | **100-300** | **500-1000** |
| Twitter followers | 0 | **50-100** | **150-300** |
| Reddit karma (from posts) | 0 | **50-100** | **100-200** |
| HN points | — | **20-50** | **20-50** |
| PH upvotes | — | — | **100+** |
| Blog reads (cumulative) | 0 | **500+** | **2000+** |
| Emails sent | 0 | **25-30** | **50-60** |
| Email open rate | — | **40%+** | **40%+** |

---

## 📁 Quick Reference — All Available Content Files

| File | Purpose | Used On |
|------|---------|---------|
| `docs/TWEET_THREAD_WHAT_IS_BAYCAST.md` | 12-tweet intro thread | Day 1 |
| `docs/TWEET_TEMPLATES.md` | 4 standalone tweets | Days 1-5 |
| `docs/MONDAY_THREAD_PREDICTION_POLLS.md` | 7-tweet provocative thread | Day 3 |
| `docs/TWITTER_PREDICTION_MARKETS_GUIDE.md` | 5-tweet educational thread | Day 10 |
| `docs/MARKETING_MAY8_NEWSJACKING.md` | Reactive newsjacking tweets | Day 7 |
| `docs/WEEK2_DAILY_CONTENT.md` | 14 tweets + engagement actions | Days 11+ |
| `docs/REDDIT_PREDICTIONMARKETS_MAY9.md` | Reddit post — methodology angle | Day 1 |
| `docs/REDDIT_POST_2.md` | Reddit post — AI angle | Day 5 |
| `docs/EMAIL_ACQUISITION_TEMPLATE.md` | Email + segmentation guide | Days 3, 5, 10, 12 |
| `docs/BLOG_BLIND_CONSENSUS.md` | Blog — methodology deep dive | Day 4 |
| `docs/LAUNCH_BLOG_POST_MAY9.md` | Blog — regulatory angle | Day 7 |
| `docs/LAUNCH_BLOG_POST.md` | Blog — flagship manifesto | Day 12 |
| `docs/WHY_PREDICTION_POLLS.md` | Blog — intellectual foundation | Day 9 |
| `docs/SEO/polymarket-alternatives.md` | SEO article | Day 6 |
| `docs/COMPARISON_PAGE_CONTENT.md` | Platform comparison data | Day 6 (LinkedIn) |
| `docs/PRODUCT_HUNT_LAUNCH.md` | PH listing content | Day 8 |
| `docs/PH_LAUNCH_DAY_EXECUTION.md` | PH minute-by-minute plan | Day 8 |
| `docs/PRODUCT_HUNT_LAUNCH_STRATEGY.md` | PH full strategy | Day 6-8 |
| `docs/LAUNCH_DAY_CHEAT_SHEET.md` | Launch day reference | All days |
| `docs/LAUNCH_PLAYBOOK.md` | Full launch playbook | Reference |
| `docs/PUBLICATION_CALENDAR.md` | Ongoing content calendar | Week 3+ |
| `docs/LAUNCH_CONTENT_CALENDAR.md` | Long-term calendar | Week 3+ |

---

## ⚡ Emergency Rules

1. **If a Reddit post gets removed** — don't re-post immediately. Wait 48h, re-read the subreddit rules, adjust, and try a different subreddit.
2. **If HN flags your post** — the community will tell you what's wrong. Fix it and don't re-submit for 2 weeks.
3. **If nobody signs up for 3 days** — stop posting new content. Go back to your Reddit/HN threads and respond to every single comment. Engagement > broadcasting.
4. **If someone writes negative feedback** — respond thoughtfully and publicly. It's an opportunity to show you listen.
5. **If a question resolves and the community was wrong** — celebrate it! "Our blind consensus was 35%. Reality: 0%. That's what makes forecasting hard — and why Brier scores matter."

---

*Plan created: May 11, 2026. Execute immediately after seeding. No more planning — just do.*
