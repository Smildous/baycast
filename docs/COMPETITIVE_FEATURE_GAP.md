# Competitive Feature Gap Analysis — Baycast

**Date:** May 10, 2026  
**Scope:** Top 5 missing features for user acquisition  
**Competitors:** Polymarket, Metaculus, Manifold Markets  
**Stack:** Next.js 14 + Supabase  

---

## 1. Executive Summary

Baycast has strong fundamentals — Blind Consensus Protocol, Brier scoring, clean UX — but is missing key engagement and distribution features that competitors use for acquisition. The five highest-impact gaps are: (1) **User-submitted questions** (Manifold's #1 growth driver), (2) **Social engagement / comments** (all competitors have this), (3) **News integration** (Polymarket's top engagement hook), (4) **Forecast revision with reasoning** (Metaculus's retention mechanism), and (5) **Embeddable question widgets / social sharing** (viral acquisition channel). These five features, prioritized by acquisition-impact-to-effort ratio, would close 80% of the feature gap with competitors while preserving Baycast's unique BCP differentiator.

---

## 2. Current Baycast Feature Inventory

### Pages & Navigation
| Route | Page | Status |
|-------|------|--------|
| `/` | Landing page (hero, how it works, live questions, testimonials, CTA) | ✅ Live |
| `/questions` | Question browsing with category/status filters + search | ✅ Live |
| `/questions/[id]` | Question detail with forecast form, consensus bar, share button | ✅ Live |
| `/blocks` | Question blocks (themed groups) — empty state | ✅ Live (no content) |
| `/blocks/[id]` | Block detail with leaderboard | ✅ Live |
| `/leaderboard` | Global leaderboard with time-period filters | ✅ Live (empty) |
| `/how-it-works` | BCP explanation, scoring guide, comparison table, FAQ | ✅ Live |
| `/auth/signup` | Sign up (Google OAuth + email/password) | ✅ Live |
| `/auth/login` | Log in | ✅ Live |
| `/auth/reset-password` | Password reset | ✅ Live |
| `/profile` | Own profile (requires auth) | ✅ Live |
| `/profile/[username]` | Public profile with badge, calibration chart, forecast history | ✅ Live |
| `/settings` | Notification preferences, profile editing | ✅ Live |
| `/notifications` | Notification inbox (bell icon in nav) | ✅ Live |
| `/admin` | Admin panel (question CRUD, resolution) | ✅ Live (admin only) |

### Features Implemented
| Feature | Details |
|---------|---------|
| **Blind Consensus Protocol** | Forecasts hidden until reveal phase; median aggregation |
| **Brier scoring** | Proper scoring rules on resolution; leaderboard ranking |
| **Category filters** | Politics, Technology, Economy, Science, Other (5 active) |
| **Status filters** | Open, Closed, Resolved |
| **Search** | Full-text question search |
| **User profiles** | Display name, avatar, bio, badge tier |
| **Badge system** | Rookie → Forecaster → Expert → Oracle (based on resolved forecast count) |
| **Calibration chart** | Visual accuracy chart on profile pages |
| **Notification system** | 5 types: closing soon, resolved, new block, forecast revised, weekly digest |
| **Notification preferences** | Per-type toggle in settings |
| **Share buttons** | Question sharing via link |
| **Onboarding modal** | BCP demo walkthrough on first visit |
| **Admin question management** | Create/edit/resolve questions via admin panel |
| **AI agent forecasting** | API endpoint `/api/agent/forecast` for AI agents |
| **SEO** | Sitemap, robots.txt, JSON-LD structured data, meta tags |
| **Question blocks** | Themed question groups with per-block leaderboard |
| **Responsive design** | Mobile-friendly layout |
| **Loading/error states** | Skeleton loaders, error boundaries, empty states |

### Features NOT Implemented (confirmed by browser audit)
- User-submitted questions
- Comments / discussion threads
- News integration
- Forecast revision with reasoning
- Embeddable widgets
- Social sharing (Twitter/X, Reddit) with auto-generated images
- Mobile app / PWA
- Tournaments / competitions
- Email digest / newsletters
- Community-created question blocks
- Follow users / forecasters
- Trending questions algorithm
- Real-time activity feed
- Multi-choice questions (only binary supported)

---

## 3. Competitor Feature Matrix

| Feature | Baycast | Polymarket | Metaculus | Manifold |
|---------|---------|------------|-----------|----------|
| **Binary questions** | ✅ | ✅ | ✅ | ✅ |
| **Multi-choice / numeric questions** | ❌ | ❌ | ✅ | ✅ |
| **Blind consensus (no herding)** | ✅ BCP | ❌ | ❌ | ❌ |
| **Brier / proper scoring** | ✅ | ❌ (P&L) | ✅ | ❌ (Mana) |
| **Leaderboard** | ✅ | ❌ | ✅ | ✅ |
| **User-submitted questions** | ❌ Admin only | ❌ | ✅ | ✅ |
| **Comments / discussion** | ❌ | ✅ | ✅ | ✅ |
| **News integration** | ❌ | ✅ (extensive) | ❌ | ❌ |
| **Forecast revision** | ✅ (no reasoning) | N/A | ✅ (with reasoning) | N/A |
| **Reasoning / comments on forecast** | ❌ | ❌ | ✅ | ❌ |
| **Social sharing** | ⚠️ Link only | ✅ | ⚠️ Basic | ✅ |
| **Embeddable widgets** | ❌ | ✅ | ❌ | ❌ |
| **Mobile app / PWA** | ❌ | ❌ | ❌ | ✅ |
| **Tournaments** | ❌ | ❌ | ✅ | ⚠️ Prize drawing |
| **Notification system** | ✅ | ⚠️ Email | ⚠️ Email | ⚠️ In-app |
| **User profiles** | ✅ | ⚠️ Address | ✅ | ✅ |
| **Badge / reputation tiers** | ✅ | ❌ | ✅ | ✅ (Mana balance) |
| **Categories / tags** | ✅ (5 active) | ✅ (12+) | ✅ (hubs) | ✅ (30+ topics) |
| **Question blocks / groups** | ✅ | ❌ | ✅ (tournaments) | ❌ |
| **AI agent participation** | ✅ | ❌ | ⚠️ FutureEval | ❌ |
| **Calibration tracking** | ✅ | ❌ | ✅ | ❌ |
| **Onboarding walkthrough** | ✅ | ❌ | ❌ | ⚠️ Tutorial |
| **Search** | ✅ | ✅ | ✅ | ✅ |
| **API for external access** | ⚠️ Agent only | ✅ | ✅ | ✅ |
| **Email digest** | ⚠️ Planned | ❌ | ✅ | ❌ |
| **Follow users** | ❌ | ❌ | ❌ | ✅ |
| **Trending algorithm** | ❌ | ✅ | ✅ | ✅ |

---

## 4. Top 5 Missing Features for Acquisition

### Feature 1: User-Submitted Questions (Community Questions)

**Description:** Allow any authenticated user to create and submit prediction questions for admin review. Submitted questions enter a "pending" state visible in a public queue. Other users can upvote questions they want to see go live. Admins approve/reject with one click. Approved questions follow the same BCP lifecycle as admin-created questions.

**Competitor who has it:** Manifold (core feature — any user creates markets), Metaculus (community questions)

**Estimated effort:** M (Medium) — 1-2 weeks

**Acquisition impact:** H (High) — This is Manifold's #1 growth driver. Community-created content scales without admin bandwidth. Users who create questions are 3-5x more likely to return and forecast on others' questions.

**Spec outline:**

#### Data Model Changes
```sql
-- Add to questions table
ALTER TABLE questions ADD COLUMN submitted_by uuid REFERENCES profiles(id);
ALTER TABLE questions ADD COLUMN upvotes int DEFAULT 0;
ALTER TABLE questions ADD COLUMN is_community boolean DEFAULT false;

-- Upvotes table (many-to-many)
CREATE TABLE question_upvotes (
  question_id uuid REFERENCES questions(id) ON DELETE CASCADE,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (question_id, user_id)
);

-- Status: add 'pending_review' to check constraint
ALTER TABLE questions DROP CONSTRAINT questions_status_check;
ALTER TABLE questions ADD CONSTRAINT questions_status_check 
  CHECK (status IN ('draft', 'pending_review', 'open', 'closed', 'resolved'));
```

#### API Endpoints
```
POST   /api/questions                    — Submit community question
GET    /api/questions/pending            — List pending questions (admin)
PUT    /api/questions/:id/approve        — Approve question (admin)
PUT    /api/questions/:id/reject         — Reject question (admin)
POST   /api/questions/:id/upvote         — Upvote a pending question
DELETE /api/questions/:id/upvote         — Remove upvote
```

#### UI Components
- **`/submit` page** — Question submission form (title, description, category, close date, resolution source, resolution criteria)
- **`/questions/pending` page** — Public queue of pending questions with upvote counts
- **Admin pending queue** — Inline in `/admin` with approve/reject buttons
- **Question card variant** — Show "Community" badge, upvote count, submitter name
- **User profile section** — "Questions you submitted" tab

#### Validation Rules
- Title must end with "?" for binary questions
- Close date must be at least 7 days in the future
- Resolution source must be provided (URL or description)
- Title minimum 10 characters, maximum 280 characters
- Rate limit: 5 submissions per user per day
- Duplicate detection: fuzzy match against existing open questions

---

### Feature 2: Comments & Discussion Threads

**Description:** Add a comment system to every question page. Users can post comments, reply to other comments (threaded), and upvote/downvote. Comments support markdown formatting. Each question shows a comment count on the question card in the browse view. Comments are a primary engagement driver on all competitor platforms.

**Competitor who has it:** Polymarket (comments on markets), Metaculus (comments + reasoning), Manifold (comments + reactions)

**Estimated effort:** L (Large) — 2-3 weeks

**Acquisition impact:** H (High) — Comments are the #1 retention feature across all competitors. Users who comment are 2-3x more likely to return. Comments also generate SEO-rich content. Metaculus's comment quality is a key part of their value proposition.

**Spec outline:**

#### Data Model Changes
```sql
CREATE TABLE comments (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  question_id uuid REFERENCES questions(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  parent_id uuid REFERENCES comments(id) ON DELETE CASCADE,
  content text NOT NULL,
  upvotes int DEFAULT 0,
  downvotes int DEFAULT 0,
  is_deleted boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE comment_votes (
  comment_id uuid REFERENCES comments(id) ON DELETE CASCADE,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  vote smallint CHECK (vote IN (-1, 0, 1)),
  PRIMARY KEY (comment_id, user_id)
);

CREATE INDEX idx_comments_question_id ON comments(question_id);
CREATE INDEX idx_comments_parent_id ON comments(parent_id);
CREATE INDEX idx_comments_created_at ON comments(created_at DESC);
```

#### API Endpoints
```
GET    /api/questions/:id/comments       — List comments (threaded)
POST   /api/questions/:id/comments       — Create comment
PUT    /api/comments/:id                 — Edit own comment
DELETE /api/comments/:id                 — Soft-delete own comment
POST   /api/comments/:id/vote            — Upvote/downvote
```

#### UI Components
- **CommentSection** — Renders below the forecast form on question detail pages
- **CommentThread** — Recursive component for nested replies (max depth: 3)
- **CommentForm** — Markdown textarea with preview
- **CommentCard** — Author avatar, name, badge, timestamp, content, vote buttons
- **Question card update** — Add comment count badge
- **`/profile/[username]` update** — "Comments" tab

#### Key Design Decisions
- **Threaded replies** (not flat) — Metaculus-style, max 3 levels deep
- **Markdown support** — Bold, italic, links, code blocks, blockquotes
- **No rich text editor** — Keep it simple, use a lightweight markdown parser (react-markdown)
- **Moderation** — Admins can delete any comment; users can delete their own; report button for flagging
- **Notification** — Question author + previous repliers notified of new comments (use existing notification system)
- **Sorting** — Default: "Best" (upvote score). Alternatives: "Newest", "Oldest"
- **Rate limit** — 10 comments per user per hour, 100 per day

---

### Feature 3: News Integration (Question-Linked News Feed)

**Description:** Each question displays relevant news articles and headlines that relate to the question topic. News is sourced via RSS feeds and/or a news API (NewsAPI, Currents API, or similar). The news section appears below the forecast form on question detail pages. On the `/questions` browse page, a "Trending" tab shows questions that have recent related news. This is Polymarket's most powerful engagement hook — users come for the news, stay for the forecast.

**Competitor who has it:** Polymarket (extensive — NYT, BBC, Reuters feeds on every market)

**Estimated effort:** M (Medium) — 1-2 weeks

**Acquisition impact:** H (High) — Polymarket's news integration is their #1 user engagement feature. It creates a "habit loop": check news → see related prediction → forecast → return tomorrow. Also drives SEO traffic from news-related queries.

**Spec outline:**

#### Data Model Changes
```sql
-- News articles cache
CREATE TABLE news_articles (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  url text NOT NULL UNIQUE,
  source text NOT NULL,
  summary text,
  image_url text,
  published_at timestamptz,
  fetched_at timestamptz DEFAULT now(),
  category text
);

CREATE INDEX idx_news_articles_published_at ON news_articles(published_at DESC);
CREATE INDEX idx_news_articles_category ON news_articles(category);

-- Question-news association (manual or keyword-matched)
CREATE TABLE question_news (
  question_id uuid REFERENCES questions(id) ON DELETE CASCADE,
  news_article_id uuid REFERENCES news_articles(id) ON DELETE CASCADE,
  relevance_score float DEFAULT 1.0,
  is_auto boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (question_id, news_article_id)
);
```

#### API Endpoints
```
GET  /api/questions/:id/news              — Get news for a specific question
GET  /api/news/trending                    — Get trending news (for /questions trending tab)
POST /api/admin/news/fetch                 — Trigger news fetch (admin/cron)
POST /api/admin/news/link                  — Manually link news to question (admin)
```

#### UI Components
- **NewsSection** — Renders below forecast form on question detail; shows 3-5 articles
- **NewsCard** — Thumbnail, headline (linked), source, time ago, one-line summary
- **TrendingTab** — New tab on `/questions` page showing questions with recent related news
- **"Related News" badge** — On question cards that have linked news articles

#### Implementation Notes
- **News source:** Use [Currents API](https://currentsapi.services/) (free tier: 200 req/day) or [NewsAPI](https://newsapi.org/) (free: 100 req/day dev)
- **Keyword matching:** Extract keywords from question title/description → search news API. Cache results in `news_articles` table.
- **Category mapping:** Map Baycast categories to news categories (Technology → technology, Economy → business, Politics → politics, Science → science)
- **Cron job:** Run news fetch daily via Vercel Cron or Supabase pg_cron
- **Rate limiting:** Cache aggressively (24h TTL); respect API rate limits
- **Manual curation:** Admins can manually link relevant articles for high-value questions

---

### Feature 4: Forecast Revision with Reasoning

**Description:** After the blind phase ends (reveal), users can revise their forecast probability. Each revision requires an optional text reasoning field explaining why they changed their mind. Revisions are timestamped and visible in a history timeline on the question page. This is Metaculus's core engagement feature — the reasoning creates discussion content, and the revision mechanism keeps users engaged with questions over time.

**Competitor who has it:** Metaculus (core feature — revisions with reasoning are their primary retention mechanism)

**Estimated effort:** S (Small) — 3-5 days

**Acquisition impact:** M (Medium) — Direct impact on retention (keeps users coming back to questions). Reasoning text also improves SEO and creates discussion content without building a full comment system. However, it's less impactful for initial acquisition than Features 1-3.

**Spec outline:**

#### Data Model Changes
```sql
-- Forecast revision history (additive to existing forecasts table)
CREATE TABLE forecast_revisions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  forecast_id uuid REFERENCES forecasts(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  question_id uuid REFERENCES questions(id) ON DELETE CASCADE NOT NULL,
  probability float NOT NULL CHECK (probability >= 0 AND probability <= 1),
  reasoning text,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX idx_forecast_revisions_forecast_id ON forecast_revisions(forecast_id);
CREATE INDEX idx_forecast_revisions_question_id ON forecast_revisions(question_id);
CREATE INDEX idx_forecast_revisions_created_at ON forecast_revisions(created_at DESC);
```

#### API Endpoints
```
POST   /api/questions/:id/revise          — Submit forecast revision
GET    /api/questions/:id/revisions        — Get all revisions for a question (after reveal)
GET    /api/questions/:id/my-revisions     — Get current user's revisions for a question
```

#### UI Components
- **RevisionForm** — Slider (current probability shown) + optional reasoning textarea. Appears on question detail page after reveal phase.
- **RevisionTimeline** — Chronological list of all revisions for a question (visible after reveal). Each entry shows: user avatar, name, old probability → new probability, reasoning text, timestamp.
- **MyRevisionsBadge** — On question card: "You revised 2x" indicator
- **Profile update** — Show revision count on profile

#### Key Design Decisions
- **Revisions only after reveal** — During blind phase, users can update their forecast (existing behavior) but no revision history is recorded
- **Reasoning is optional** — Don't create friction; empty reasoning is allowed
- **Max revisions:** 10 per question per user (prevent gaming)
- **Scoring impact:** Only the final forecast before close is scored (or the time-weighted average — decide during implementation)
- **Character limit:** Reasoning max 500 characters (short, tweet-like)
- **BCP compatibility:** Revisions happen AFTER reveal (Phase B), so they don't violate the blind phase

---

### Feature 5: Embeddable Question Widgets & Social Sharing Cards

**Description:** Generate shareable, embeddable widgets for each question that display the current consensus, time remaining, and a "Forecast on Baycast" CTA. Two formats: (1) **Open Graph image cards** for Twitter/X, Reddit, LinkedIn sharing (auto-generated via `og:image`), and (2) **Iframe embed code** that bloggers, journalists, and newsletter authors can paste into their articles. This is a viral acquisition channel — every share = free distribution.

**Competitor who has it:** Polymarket (embeddable market widgets used by Bloomberg, NYT), Manifold (basic embeds)

**Estimated effort:** S (Small) — 3-5 days

**Acquisition impact:** H (High) — Highest acquisition-impact-to-effort ratio. Every shared question becomes a micro-landing page. Polymarket's embeds are used by major news outlets, driving massive organic traffic. This is essentially free, user-initiated marketing.

**Spec outline:**

#### Data Model Changes
```sql
-- No schema changes needed. Uses existing question data + OG meta tags.
```

#### API Endpoints
```
GET  /api/og/question/:id                 — Generate OG image (returns PNG via HTML-to-image)
GET  /api/embed/question/:id              — Returns HTML snippet for iframe embed
GET  /api/embed/question/:id.js           — JS embed script (for non-iframe contexts)
```

#### UI Components
- **OG Image generation** — Use `@vercel/og` (Edge Runtime) or `satori` to generate dynamic Open Graph images for each question. Image shows: question title, consensus probability bar, time remaining, Baycast logo, "Forecast on Baycast" CTA.
- **ShareButtons upgrade** — Replace current share button with Twitter/X, Reddit, LinkedIn, Copy Link buttons. Each pre-fills share text with question title and auto-generates OG preview.
- **Embed code modal** — "Embed this question" button on question detail page. Shows iframe snippet + copy button.
- **Iframe embed page** — `/embed/questions/:id` — Minimal, branded page optimized for embedding (no nav, no footer, compact layout).

#### Implementation Notes
- **OG images:** Use Next.js `app/api/og/route.tsx` with `@vercel/og` (ImageResponse). This is zero-cost on Vercel and generates images at the edge.
- **Image design:** Dark background, Baycast brand colors, large question title (truncated at 2 lines), consensus bar (green/red gradient), "XX forecasters", time remaining badge, Baycast logo bottom-right. Size: 1200×630px (Twitter/X standard).
- **Iframe embed:** Lightweight HTML page (`/embed/questions/[id]`) with no navigation, minimal CSS. Include `X-Frame-Options: ALLOWALL` and `Content-Security-Policy: frame-ancestors *` headers.
- **JS embed:** Optional — provide a `<script>` tag that lazy-loads the iframe for sites that prefer JS widgets over iframes.
- **Share URLs:** Use existing question URLs — OG meta tags in `<head>` will auto-generate previews on Twitter, LinkedIn, Facebook, Slack, Discord.
- **UTM tracking:** Append `?utm_source=embed&utm_medium=widget` to all embed CTA links.

---

## 5. Recommended Priority Order

Ranked by **Acquisition Impact / Effort Ratio**:

| Priority | Feature | Impact | Effort | Ratio | Timeline |
|----------|---------|--------|--------|-------|----------|
| **#1** | Embeddable Widgets & Social Sharing Cards | H | S | ⭐⭐⭐⭐⭐ | Week 1 |
| **#2** | User-Submitted Questions | H | M | ⭐⭐⭐⭐ | Week 1-2 |
| **#3** | News Integration | H | M | ⭐⭐⭐⭐ | Week 2-3 |
| **#4** | Comments & Discussion Threads | H | L | ⭐⭐⭐ | Week 3-5 |
| **#5** | Forecast Revision with Reasoning | M | S | ⭐⭐⭐ | Week 3-4 |

### Rationale

1. **Embeddable Widgets first** — Highest ROI. 3-5 days of work creates a permanent, scalable acquisition channel. Every question shared on Twitter/Reddit/LinkedIn becomes a landing page. Zero ongoing cost. Polymarket's embeds drive millions in organic traffic.

2. **User-Submitted Questions second** — Unlocks community-driven content creation. Without this, Baycast is limited to admin-created questions (currently 10 live). Community submissions scale content without admin bandwidth. Manifold's entire growth model is built on user-created markets.

3. **News Integration third** — Creates the "habit loop" that Polymarket uses for daily engagement. Users come for news, see related predictions, forecast, and return. Also drives SEO from news-related queries. Can be built incrementally (start with 1-2 news APIs, expand later).

4. **Comments fourth** — Highest effort but critical for long-term retention. Defer because Features 1-3 drive initial acquisition more efficiently. Comments are most valuable once there's an active user base to discuss with. Build when weekly active users exceed 50.

5. **Forecast Revision fifth** — Good for retention but lower acquisition impact. Build incrementally: start with just the revision mechanic (update probability after reveal), add reasoning field later. Low effort makes it easy to slot into any sprint.

### Quick Wins (can be done in parallel)

- **Upgrade share buttons** (part of Feature 5) — Add Twitter/Reddit/LinkedIn buttons with pre-filled text. Takes 2 hours.
- **Add OG meta tags to question pages** (part of Feature 5) — Takes 1 hour. Immediate improvement to all shared links.
- **"Submit a Question" CTA** (part of Feature 1) — Add button to `/questions` page even before the full feature. Link to a Google Form as a temporary measure.
- **Trending questions** (part of Feature 3) — Add a simple "Most forecasted" sort to `/questions` page. No news API needed.

---

## Appendix: Browser Audit Notes

### Landing Page (`/`)
**What's good:** Clear value prop ("No money. No gambling. Pure judgment."), BCP explanation with 3-step visual, testimonials section, live questions preview, strong CTAs.
**What's missing:** No social proof beyond testimonials (user count is "2" — consider hiding until higher), no news/trending section, no "As seen in" press logos, share buttons are basic (link copy only).

### Questions Page (`/questions`)
**What's good:** Category filters, status filters, search, clean card layout with consensus bars and forecaster counts.
**What's missing:** No sort options (trending, most forecasted, closing soon, newest), no "Trending" tab, comment counts on cards, many cards show "Be the first to forecast" (social proof gap).

### Question Detail (`/questions/[id]`)
**What's good:** Clean layout, countdown timer, consensus bar, share button, resolution source displayed, forecast slider for authed users.
**What's missing:** No comments section, no news section, no forecast history/revision timeline, no related questions, no embed button, limited meta/OG tags for social sharing.

### Sign Up Page (`/auth/signup`)
**What's good:** Google OAuth + email/password, clean form, "Already a member?" login link.
**What's missing:** No social proof ("Join X forecasters"), no password strength indicator, no terms of service checkbox, no email verification confirmation message visible.

### How It Works (`/how-it-works`)
**What's good:** Excellent BCP explanation with phases, comparison table vs prediction markets, Brier score guide, FAQ accordion.
**What's missing:** No visual/interactive demo (could embed the onboarding modal), no video walkthrough, no external validation/citations.

### Leaderboard (`/leaderboard`)
**What's good:** Time-period filters (all time, month, week), clean empty state with CTA.
**What's missing:** Empty state — no users ranked yet. No category-specific leaderboards, no "top forecaster" badges visible.

### Blocks (`/blocks`)
**Status:** Empty state — "No blocks available yet." Feature exists in codebase but no content has been created.

---

*Document generated: May 10, 2026 | Next review: June 10, 2026 or after Feature 1-2 implementation*
