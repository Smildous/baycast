# 🚀 Smil Launch Playbook — Baycast
> ONE file. Follow these 15 steps. You're live.
> **Total time: ~1.5 hours.** Open this file and execute top-to-bottom.

---

## Step 1: Seed Questions (5 min)

Run the seed script to insert 176+ prediction questions into Supabase.

**Prerequisites:** `.env.local` must exist in the project root with:
```
SUPABASE_URL=https://jlfohoqtdwtgfsgslsbr.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...your-key-here
```

**Verify env vars exist:**
```bash
cd baycast
cat .env.local | grep SUPABASE
```

**Run the seed:**
```bash
npm install
npx tsx scripts/seed-questions.ts
```

**Expected output:**
```
📦 Found 11+ question batch files in docs/
🔍 Fetching existing question titles from Supabase...
📄 Processing: questions_batch_may6.sql → ✅ Inserted 15 new questions
📄 Processing: questions_batch_may7.sql → ✅ Inserted 15 new questions
... (all batches) ...
═══════════════════════════════════════════════
  SEED COMPLETE
  ✅ Inserted: 133+
  ⏭ Skipped:  N (already exist)
  ❌ Errors:   0
═══════════════════════════════════════════════
```

> **Idempotent:** Re-running is safe. Already-existing questions are skipped.

---

## Step 2: Run SQL Migrations (5 min)

Go to [Supabase Dashboard](https://supabase.com/dashboard) → Your Project → **SQL Editor** → **New query**.

Run these SQL files **in order** (copy entire contents, paste, click **Run**):

1. `docs/seed_questions_v2.sql` — Launch batch (10 questions)
2. `sql/migration_002_blind_consensus.sql` — Blind consensus schema
3. `sql/migration_003_log_score.sql` — Logarithmic scoring
4. `sql/migration_005_normalize_categories.sql` — Category normalization
5. `docs/migration_004_onboarding.sql` — Onboarding UX tables (if exists)

> After each: confirm "Success" with no errors. If duplicate key errors, skip that file.

**Also check:** If any `questions_batch_may*.sql` files in `/docs` were NOT caught by the seed script, paste them individually into the SQL Editor.

---

## Step 3: Verify Site (2 min)

Open **https://baycast-p.vercel.app** and check:

- [ ] Homepage loads with question cards visible
- [ ] **176+ questions** across categories (Politics, AI/Tech, Sports, Economics, Science, Crypto, Geopolitics)
- [ ] Click into 3-5 questions → each renders with the slider/prediction UI
- [ ] Signup flow works: create account → submit a forecast → confirm it saves
- [ ] Mobile: open on your phone, verify the 7 mobile UX fixes are live
- [ ] Sort/filter controls work (category filter, sort by newest/popular)
- [ ] "Closing Soon" section shows questions near deadline
- [ ] Leaderboard page loads (may show "waiting for its champion" — that's OK)

**If something's broken:** Check Vercel deploy logs. The most common issue is a Supabase connection error.

---

## Step 4: Twitter — Honest Week 2 Update (2 min)

**Post at 9:00 AM ET**

```
Week 2 of Baycast: 0 signups, 176 questions, and a founder who's learning that distribution is harder than code.

The product works. Nobody knows it exists.

Time to fix that. This week I'm going where the forecasters are. 👇

#BuildingInPublic #Startups
```

---

## Step 5: Twitter — Prediction Polling vs Markets Thread (3 min)

**Post at 10:00 AM ET** (as a thread — reply to yourself for each part)

**Part 1/4:**
```
I spent 8 months building a prediction platform with no money, no crypto, and no gambling.

Everyone asked: "Why not just build on Polymarket?"

Here's why. 🧵 #Baycast #Forecasting
```

**Part 2/4:**
```
Prediction markets optimize for ONE thing: capital allocation.

But forecasting accuracy ≠ capital allocation. The best forecasters aren't the richest. They're the most calibrated.

Tetlock's superforecasters beat intelligence analysts. None of them bet money. They used structured scoring.
```

**Part 3/4:**
```
When you put money on predictions:
• Whales move markets for non-forecasting reasons
• Insider trading distorts the signal
• Domain experts who don't want to gamble get excluded
• The "price" reflects capital, not wisdom

The data is noisy. The incentives are wrong.
```

**Part 4/4:**
```
Baycast uses blind consensus + Brier scoring. No money. No crypto. No whales.

Your accuracy is measured against REALITY, not against a market price distorted by people chasing profit.

Try it → baycast-p.vercel.app

The leaderboard is empty. You could be first. 🏆

#CollectiveIntelligence #PredictionMarkets
```

---

## Step 6: Twitter — Question of the Day (2 min)

**Post at 9:30 AM ET (next day)**

```
🤔 Question of the Day

"Will GPT-5 be announced before July 2026?"

What's your gut? 30%? 60%? 90%?

On Baycast, you commit your number BEFORE seeing what anyone else thinks. No anchoring. Pure judgment.

Make your call → baycast-p.vercel.app

#AI #GPT5 #Forecasting
```

---

## Step 7: Twitter — Anchoring Problem Thread (3 min)

**Post at 10:00 AM ET (day after)**

**Part 1/3:**
```
Every prediction platform shows you the odds BEFORE you predict.

Polymarket shows the price. Metaculus shows the median. Manifold shows the market.

This seems helpful. It's actually destroying the data. Here's the science 🧵

#BehavioralEconomics #Forecasting
```

**Part 2/3:**
```
The anchoring effect: exposure to a group estimate shifts your answer 10-20% toward the consensus.

The "wisdom of crowds" REQUIRES independent judgment. A doctor knows healthcare. A trader knows markets. The magic is combining those independent views.

Show the crowd first → independence collapses.
```

**Part 3/3:**
```
That's why Baycast uses the Blind Consensus Protocol:

1. Predict WITHOUT seeing others
2. After you commit, the crowd aggregate reveals
3. Revise with full context
4. Both answers scored independently

Your first answer = pure you.
Your revision = how well you update.

baycast-p.vercel.app

#CollectiveIntelligence #DataScience
```

---

## Step 8: Twitter — Superforecasting Single (2 min)

**Post at 10:00 AM ET (day after that)**

```
"Markets aggregate capital. Polls aggregate judgment." — The difference matters more than you think.

When money drives the signal, you get noise. When accuracy drives the signal, you get insight. #PredictionPolling #Bayes
```

**AND later that day:**
```
Prediction markets capture the signal of people willing to bet money.

But what about the epidemiologist who models disease spread but won't gamble?
The AI safety researcher who understands timelines but hates crypto?

Their forecasts are valuable. They just have nowhere to put them.

Until now → baycast-p.vercel.app

#Forecasting #CollectiveIntelligence
```

---

## Step 9: Reddit Post — r/lesswrong (5 min)

**Target:** r/lesswrong (primary)
**Timing:** Tuesday or Wednesday, 8:00-10:00 AM ET
**Full post in:** `docs/REDDIT_LESSWRONG_MAY12.md`

**Title:**
```
I built a free, open-source prediction platform that forces blind forecasts before showing the crowd aggregate. It scores with full Brier decomposition. Here's why I think the methodology matters.
```

**Post-submit checklist:**
- [ ] Stay online 2 hours after posting
- [ ] Reply to every comment within 30 minutes
- [ ] Thank critics, engage substantively — don't get defensive
- [ ] Crosspost to r/slatestarcodex after 24 hours if engagement is positive

**Also post to r/Superforecasters** — use the Delphi method angle from `docs/SMIL_ACTION_PACK_MAY11.md` Section 1, Action 2.

---

## Step 10: Hacker News — Show HN (5 min)

**Full post in:** `docs/SHOW_HN_BAYCAST.md`

**Title to submit:**
```
Show HN: Baycast – Prediction polling with blind consensus protocol
```

**URL:** https://baycast-p.vercel.app

**Text:** Copy the body from `docs/SHOW_HN_BAYCAST.md`

**Posting tips:**
- Post Tuesday–Thursday, 8:00-10:00 AM ET
- Reply to every comment within 1 hour
- Be technical. HN respects substance, not marketing.
- If someone finds a bug, thank them and fix it fast.

---

## Step 11: Blog Post (5 min)

**File:** `docs/BLOG_WEEK1_RETROSPECTIVE.md`
**Also:** `docs/BCP_BLOG_POST.md` (1500+ words, Blind Consensus Protocol deep-dive)

**Publish to:**
1. [ ] **Dev.to** — tags: `#forecasting`, `#technology`, `#behavioralscience`
2. [ ] **Medium** — same content, different audience
3. [ ] **Baycast blog** (if set up)
4. [ ] **Crosspost link** to r/Superforecasters as a follow-up comment

> The Week 1 Retrospective is the most authentic piece — zero signups, honest takeaways. HN and Dev.to respect that.

---

## Step 12: Email Outreach (10 min)

Send personal emails to 10-15 people in the forecasting community. Use the template in `docs/EMAIL_ACQUISITION_TEMPLATE.md`.

**Subject line:**
> You're good at predicting things. We built a protocol that proves it.

**Who to email (find via):**
- Metaculus top forecasters (check public profiles)
- r/Superforecasters active contributors
- ACX/LessWrong community members who've written about calibration
- AI researchers who've published on forecasting benchmarks
- Good Judgment Project alumni (LinkedIn)

**Key points in every email:**
- Blind Consensus Protocol (Delphi method, digitized)
- Brier scoring with full decomposition
- No money, no crypto — scored collective intelligence
- 176+ questions live, looking for 50 early forecasters
- Open source: github.com/Smildous/baycast

---

## Step 13: Reddit Community Engagement (10 min)

**Post to these communities this week (customize each post — never copy-paste identical content):**

| Priority | Subreddit | Angle | Timing |
|----------|-----------|-------|--------|
| 🔴 1st | r/lesswrong | Methodology deep-dive | Tue/Wed 9 AM ET |
| 🔴 2nd | r/Superforecasters | Delphi method, Brier scoring | Tue/Wed 10 AM ET |
| 🟡 3rd | r/predictionmarkets | "I built prediction polling — no money, no herding" | Thu 9 AM ET |
| 🟡 4th | r/slatestarcodex | Crosspost from r/lesswrong if positive engagement | Fri 10 AM ET |
| 🟢 5th | r/artificial | AI vs human forecasting benchmarks | Next week |

**Anti-spam rules (READ FIRST):**
1. Always disclose "I built this"
2. Customize every post for its community
3. Respond to every comment within 30 min
4. Don't get defensive — thank critics
5. If downvoted, do NOT repost

---

## Step 14: Twitter Engagement Sweep (10 min)

**Daily engagement actions (5 min each):**

1. **Quote-tweet relevant content:** Search for posts about Polymarket, Metaculus, Kalshi. Quote-tweet with:
   > "Interesting odds — but here's the catch: when you see the crowd's estimate before predicting, your answer shifts 10-20% toward consensus (anchoring bias). Baycast removes this with a Blind Consensus Protocol."

2. **Follow 10-15 people** in the forecasting/prediction space on Twitter

3. **Like and reply** to 3-5 relevant posts from the forecasting community (add value, don't just drop links)

---

## Step 15: Track & Iterate (ongoing)

Use this checklist to track the week:

| Day | Seed Done? | Reddit? | Tweet 1? | Tweet 2/Thread? | HN? | Engagement? |
|-----|-----------|---------|----------|-----------------|-----|-------------|
| Day 1 | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| Day 2 | ☐ | ☐ | ☐ | ☐ | — | ☐ |
| Day 3 | ☐ | ☐ | ☐ | ☐ | — | ☐ |
| Day 4 | ☐ | ☐ | ☐ | ☐ | — | ☐ |
| Day 5 | ☐ | ☐ | ☐ | ☐ | — | ☐ |

**Weekly metrics to check:**
- Supabase dashboard: total questions, total users, total forecasts
- Vercel analytics: page views, unique visitors
- Twitter analytics: impressions, engagement rate
- Reddit: upvotes, comments, referral clicks

---

## 🚨 Key Reminders

1. **The seed script is Step 1 for a reason.** No questions = no content = no users. Run it FIRST.
2. **Respond to every comment** within 30 minutes on Reddit, 2 hours on Twitter.
3. **Don't get defensive** — thank critics, engage substantively.
4. **If a post gets downvoted**, do NOT repost. Analyze why, adjust, try a different angle days later.
5. **Customize every post** — never post the exact same text in two communities.
6. **Stay online 2 hours** after each Reddit post.

---

## 📚 Reference Files (only if you need more)

| File | What's In It |
|------|-------------|
| `docs/SEED_QUESTIONS_GUIDE.md` | Detailed seed script instructions + troubleshooting |
| `docs/SMIL_ACTION_PACK_MAY11.md` | Original action pack with all tweets + newsjacking |
| `docs/POST_SEEDING_PLAN.md` | Full 14-day execution plan |
| `docs/REDDIT_LESSWRONG_MAY12.md` | Full r/lesswrong post (ready to copy) |
| `docs/COMMUNITY_OUTREACH_PLAYBOOK.md` | 15 communities + custom posts for each |
| `docs/EMAIL_ACQUISITION_TEMPLATE.md` | Recruiter email template |
| `docs/BCP_BLOG_POST.md` | Full blog post (1500+ words) |
| `docs/BLOG_WEEK1_RETROSPECTIVE.md` | Week 1 honest retrospective |
| `docs/TWEETS_WEEK2_MAY12.md` | 8 tweets for the week |
| `docs/TWEETS_WEEK2_MAY13.md` | 8 more tweets (standalone) |
| `docs/SHOW_HN_BAYCAST.md` | Hacker News Show HN post |

---

*Created: May 12, 2026 — Marketing Agent*
*Execute now. No more planning. Just ship.*
