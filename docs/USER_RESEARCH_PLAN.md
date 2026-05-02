# User Research Plan — Baycast Beta

> Version 1.0 — May 2, 2026
> Owner: Product Agent

---

## 1. Target User Personas

### Persona 1: "The Crypto Trader" — Marcus, 29
- **Background**: Day trader & DeFi enthusiast, active on Crypto Twitter, follows prediction markets (Polymarket, Metaculus)
- **Motivation**: Wants to test and sharpen his probabilistic thinking; sees Baycast as a skill-building tool that complements his trading
- **Pain points**: Existing prediction markets are crypto-gated; wants clean UX without wallet friction
- **Success metric**: Returns daily, forecasts on 5+ questions per week
- **Acquisition channel**: Twitter/X, crypto communities, DeFi Discord servers

### Persona 2: "The Policy Analyst" — Priya, 34
- **Background**: Works at a think tank, reads geopolitical forecasting (Good Judgment, Superforecasters)
- **Motivation**: Professional development — wants to track her calibration over time and benchmark against others
- **Pain points**: Most platforms are US-centric; wants more global questions; cares about methodology rigor
- **Success metric**: Completes profiles, engages with geopolitical questions, shares leaderboard standings
- **Acquisition channel**: LinkedIn, policy newsletters, think tank networks

### Persona 3: "The AI Researcher" — Dr. Yuki Tanaka, 41
- **Background**: ML researcher at a major lab, follows AI safety and capabilities closely
- **Motivation**: Curious whether collective forecasts on AI milestones are accurate; wants to compare human vs AI predictions
- **Pain points**: Skeptical of "wisdom of crowds" for fast-moving AI topics; wants resolution criteria to be airtight
- **Success metric**: Forecasts on AI questions, provides feedback on resolution criteria quality
- **Acquisition channel**: AI communities (LessWrong, AI Alignment Forum), lab Slack channels, Twitter/X

### Persona 4: "The Casual Predictor" — Jordan, 22
- **Background**: College student, follows sports and pop culture, plays fantasy leagues
- **Motivation**: Fun, competitive, social — wants to prove they're "good at calling things"
- **Pain points**: Low attention span; needs mobile-friendly UX; doesn't care about Brier scores, wants simple "you were right/wrong"
- **Success metric**: Completes onboarding, makes first forecast within 2 minutes, returns at least 3x in first week
- **Acquisition channel**: TikTok/Instagram, word of mouth, viral question blocks

---

## 2. Beta Interview Questions (10)

Conducted as semi-structured 30-minute video calls:

1. **First impressions**: "When you landed on Baycast for the first time, what did you expect? What did you actually see?"
2. **Onboarding**: "Walk me through your experience creating your account and making your first forecast. What was confusing? What felt natural?"
3. **Question quality**: "Which questions caught your attention? Were there topics you expected but didn't find? Were the resolution criteria clear?"
4. **Forecasting UX**: "How did it feel to submit a probability? Was the slider intuitive? Did you understand what Phase A (blind) vs Phase B (revision) means?"
5. **Motivation**: "What would make you come back to Baycast tomorrow? What would make you recommend it to a friend?"
6. **Competition & scoring**: "How important is the leaderboard to you? Do the Brier/logarithmic scores feel fair? Would badges motivate you?"
7. **Trust**: "Do you trust the resolution process? What would increase your confidence that questions are resolved fairly?"
8. **Comparison**: "Have you used other prediction platforms (Metaculus, Polymarket, Manifold)? How does Baycast compare?"
9. **Missing features**: "If you could add one feature to Baycast today, what would it be?"
10. **Willingness to pay**: "Would you pay for premium features (e.g., advanced analytics, private question blocks, API access)? What price feels right?"

---

## 3. Metrics to Track During Beta

### Core Engagement
| Metric | Definition | Target (Week 4) | Tool |
|--------|-----------|-----------------|------|
| DAU/MAU ratio | Daily active / monthly active | ≥ 20% | Supabase analytics |
| Time-to-first-forecast | Minutes from signup to first forecast submission | < 3 min | Event tracking |
| Forecasts per user per week | Avg number of forecasts per active user | ≥ 5 | DB query |
| Question completion rate | % of open questions with at least 1 forecast | ≥ 60% | DB query |

### Retention
| Metric | Definition | Target (Week 4) | Tool |
|--------|-----------|-----------------|------|
| D1 retention | % who return within 24h of first forecast | ≥ 40% | Supabase |
| D7 retention | % who return within 7 days | ≥ 25% | Supabase |
| D30 retention | % who return within 30 days | ≥ 15% | Supabase |
| Churn after first resolution | % who leave after their first question resolves | < 30% | DB query |

### Quality
| Metric | Definition | Target (Week 4) | Tool |
|--------|-----------|-----------------|------|
| Avg Brier score | Mean Brier score across all resolved questions | < 0.25 (better than coin flip) | Scoring engine |
| Calibration | Actual vs predicted probability (calibration curve) | Within 5% of perfect calibration | Post-resolution analysis |
| Blind phase participation | % of forecasts submitted during Phase A (blind) | ≥ 70% | DB query |
| Revision rate | % of forecasts revised during Phase B | 20-40% (healthy revision) | DB query |

### Funnel
| Metric | Definition | Target | Tool |
|--------|-----------|--------|------|
| Signup → Onboarding complete | % who finish all 3 onboarding steps | ≥ 80% | Event tracking |
| Onboarding → First forecast | % who make at least 1 forecast | ≥ 60% | Event tracking |
| First forecast → Second forecast | % who return to forecast again | ≥ 50% | DB query |

---

## 4. Feedback Collection Mechanism

### In-App Rating After Resolution
- **Trigger**: When a question resolves that the user forecasted on
- **UI**: Non-intrusive toast notification → expandable modal
- **Questions**:
  1. "How fair was the resolution?" (1-5 stars)
  2. "Was the resolution criteria clear?" (Yes/No + optional comment)
  3. Free-text: "Any thoughts on this question?"
- **Data**: Stored in `resolution_feedback` table (question_id, user_id, rating, comment, created_at)

### NPS Survey
- **Timing**: Shown 14 days after signup, then quarterly
- **Question**: "On a scale of 0-10, how likely are you to recommend Baycast to a friend or colleague?"
- **Follow-up**: "What's the main reason for your score?" (free text)
- **Data**: Stored in `nps_responses` table (user_id, score, comment, period, created_at)

### Bug/Feature Report
- **Persistent**: Floating button (bottom-right) → opens a form
- **Fields**: Type (bug/feature/other), Description, Screenshot (optional), Email (optional)
- **Data**: Stored in `user_reports` table

### Post-Session Micro-Survey
- **Trigger**: After user's 5th forecast in a session
- **Question**: "How's your forecasting session going?" (😊 Great / 😐 Okay / 😫 Frustrating)
- **If frustrated**: Expand to "What's the issue?" (UX / Question quality / Performance / Other)

---

## 5. Beta Launch Criteria (Go/No-Go for Public Launch)

Baycast is ready for public launch when ALL of the following are met:

### Must-Have (Hard Gates)
| Criteria | Threshold | Status |
|----------|-----------|--------|
| Beta users | ≥ 50 signed up, ≥ 30 active (1+ forecast) | ☐ |
| D7 retention | ≥ 25% | ☐ |
| Time-to-first-forecast | Median < 3 minutes | ☐ |
| Question coverage | ≥ 20 active questions across 4+ categories | ☐ |
| Zero P0 bugs | No critical bugs (auth, data loss, payment) open | ☐ |
| Onboarding completion | ≥ 75% finish all 3 steps | ☐ |
| Resolution pipeline | ≥ 3 questions resolved end-to-end successfully | ☐ |

### Nice-to-Have (Soft Gates)
| Criteria | Threshold | Status |
|----------|-----------|--------|
| D30 retention | ≥ 15% | ☐ |
| NPS score | ≥ 40 | ☐ |
| AI agents live | ≥ 2 AI agents submitting forecasts | ☐ |
| Mobile PWA | Installable, passes Lighthouse PWA audit | ☐ |
| Notification system | Email + in-app notifications operational | ☐ |
| Badge system | All 4 tiers visible on profiles | ☐ |

### Launch Sequence
1. **Private beta** (Weeks 1-4): Invite-only, 50 users, heavy feedback collection
2. **Closed beta** (Weeks 5-8): 200 users, waitlist opens, iterate on feedback
3. **Public launch** (Week 9+): Open registration, marketing push, Product Hunt launch

### Kill Criteria (Abort Public Launch If)
- D7 retention drops below 10% for 2 consecutive weeks
- More than 3 P0 bugs reported in a single week
- Average resolution fairness rating < 3/5 stars
- Zero organic signups (all users from direct invites) after week 4
