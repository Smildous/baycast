# Baycast — PRD: Sprints 3 & 4 (May 2026)

> Product Requirements Document — Updated 2026-04-30

---

## Sprint 3: "First Real Users" (Week 1-2 May 2026)

### Goal
Make the platform ready for 50 real users. Polish UX, add retention features, ensure stability.

### Features

#### 1. Onboarding Flow ✅ IN PROGRESS
- **Priority**: P0 | **Complexity**: M | **Status**: Dev in progress (OnboardingModal + Provider created)
- **Acceptance Criteria**:
  - 3-step modal: Welcome → Guided Forecast → Completion
  - Skip button on each step
  - localStorage persistence (`baycast_onboarding_completed`)
  - Responsive (mobile + desktop)
  - Accessible (keyboard navigation)
- **Dependencies**: None

#### 2. Question Blocks v1
- **Priority**: P1 | **Complexity**: L
- **Acceptance Criteria**:
  - Admin can create blocks (title, description, question selection)
  - Block page: `/blocks` listing + `/blocks/[id]` detail
  - Block scoring: average Brier score across block questions
  - 50% participation threshold for block ranking
  - 3 seed blocks created (Tech 2026, Geopolitics 2026, AI & Science 2026)
- **Dependencies**: New DB tables (`blocks`, `block_questions`), admin UI

#### 3. Profile Enhancement
- **Priority**: P1 | **Complexity**: M
- **Acceptance Criteria**:
  - Forecast history tab on profile page
  - Accuracy stats: Brier avg, log score avg, rank
  - Badges: Rookie (1-10 forecasts), Forecaster (11-50), Oracle (51+)
  - Badge display on profile card and leaderboard
- **Dependencies**: Badge logic in scoring utils

#### 4. Email Notifications
- **Priority**: P2 | **Complexity**: M
- **Dependencies**: Supabase Edge Functions + email provider (Resend/SendGrid)
- **Acceptance Criteria**:
  - Question resolved → notify forecasters
  - New question in followed category → notify
  - Weekly accuracy digest
  - Unsubscribe link in every email

#### 5. Admin Dashboard Improvements
- **Priority**: P2 | **Complexity**: S
- **Acceptance Criteria**:
  - Bulk question status change (open → voting → resolved)
  - User list with forecast count and accuracy
  - Basic moderation: hide user, delete forecast

### KPIs Sprint 3
| Metric | Current | Target |
|--------|---------|--------|
| Users | 1 | 50 |
| Questions | 10 | 25 |
| Forecasts per user | ~5 | ~10 |
| Onboarding completion | N/A | 70% |

### Risks
- **PAT GitHub**: Blocks deployment of new features to Vercel (auto-deploy from push)
- **No Supabase creds**: Blocks DB migrations for Question Blocks, notifications
- **Single user**: Hard to test real UX with 1 user

---

## Sprint 4: "AI Agents & Growth" (Week 3-4 May 2026)

### Goal
Launch AI forecasting agents publicly + reach 100 users.

### Features

#### 1. AI Agent Integration
- **Priority**: P0 | **Complexity**: L | **Status**: API scaffold exists (`/api/agent/forecast`)
- **Acceptance Criteria**:
  - Configure AGENT_API_KEY + deploy to Vercel env
  - 3+ AI agents active (different models/personas)
  - Agent badge on forecasts (visible to all users)
  - Agent leaderboard tab
  - Agent accuracy tracking vs human forecasters
  - Rate limiting (max 50 forecasts/agent/day)
- **Dependencies**: AGENT_API_KEY, AGENT_BASE_URL, AGENT_MODEL env vars on Vercel

#### 2. Social Features
- **Priority**: P1 | **Complexity**: L
- **Acceptance Criteria**:
  - Follow/unfollow users
  - Comment on questions (threaded)
  - Share forecast on Twitter/X
  - Activity feed on home page
- **Dependencies**: New DB tables (`follows`, `comments`), RLS policies

#### 3. Mobile Optimization
- **Priority**: P1 | **Complexity**: M
- **Acceptance Criteria**:
  - Full responsive audit (all pages)
  - PWA manifest + service worker
  - Add to Home Screen prompt
  - Touch-optimized forecast slider
- **Dependencies**: None

#### 4. Analytics Dashboard
- **Priority**: P2 | **Complexity**: M
- **Acceptance Criteria**:
  - User growth chart (daily/weekly)
  - Forecast volume by category
  - Accuracy trends (human vs AI)
  - Question resolution rate
- **Dependencies**: Supabase analytics or separate tracking

#### 5. Public API Documentation
- **Priority**: P2 | **Complexity**: S
- **Acceptance Criteria**:
  - OpenAPI spec for agent forecast endpoint
  - Authentication docs (API key)
  - Rate limits documentation
  - Example curl/Python requests
- **Dependencies**: API endpoint stable

### KPIs Sprint 4
| Metric | Sprint 3 Target | Sprint 4 Target |
|--------|-----------------|-----------------|
| Users | 50 | 100 |
| Active AI agents | 0 | 3+ |
| Forecasts total | ~500 | ~2000 |
| Twitter mentions | 0 | 20+ |

### Risks
- **API costs**: AI agent calls cost money — need budget planning
- **Quality control**: AI agent forecasts could be bad — need accuracy monitoring
- **Spam**: Social features attract spam — need moderation tools first

---

## Cross-Sprint Dependencies

```
Sprint 3                    Sprint 4
┌─────────────┐            ┌─────────────────┐
│ Onboarding  │───────────▶│ First 50 users  │
│ Question Bl.│──────┐     │                 │
│ Profile+    │      │     │ AI Agents       │
│ Admin       │      └────▶│ Social Features │
│ Notifications│            │ Mobile PWA      │
└─────────────┘            │ Analytics       │
                           │ API Docs        │
                           └─────────────────┘
```

## External Blockers (unchanged since Sprint 2)
1. 🔴 **PAT GitHub expired** — 4 commits unpinned, no auto-deploy. Smil must renew.
2. 🟡 **No Supabase creds on dev machine** — DB migrations must run manually by Smil.
3. 🟡 **No AGENT_API_KEY** — AI endpoint cannot be tested in production.
