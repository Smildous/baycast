# Onboarding UX Improvements — Review & Recommendations

> Based on review of: `OnboardingModal.tsx`, `OnboardingProvider.tsx`, `onboarding-utils.ts`
> Date: May 2, 2026

## Current State Assessment

The current onboarding flow is a 3-step modal:
1. **Step 1 — Welcome**: Explains Blind Forecasts, Scored Accuracy, Human+AI concepts
2. **Step 2 — Guided Forecast**: Demo slider on "Will it rain in London tomorrow?"
3. **Step 3 — Complete**: Links to Browse Questions and Set up Profile

**Strengths**: Clean design, skip option at every step, step indicator, demo forecast is interactive.

**Weaknesses identified**:
- No personalization — every user sees the same flow regardless of interest
- Demo question is trivial (weather) and doesn't showcase the platform's unique value
- No feedback after demo forecast submission — user doesn't learn what happens next
- Profile setup is deferred but not incentivized
- No category preference selection — user has no reason to return

---

## Recommendation 1: Category Interest Picker (Replace Step 1)

### Problem
The current Step 1 is a passive info-dump (3 feature cards). Users read about features but don't make any choices, reducing engagement and commitment. There's no signal about what they care about, so the homepage shows generic content.

### Solution
Replace the passive welcome with an **interactive category picker**. Users select 2-4 categories they're interested in. This data feeds into personalized question recommendations on the homepage.

### Mockup Description

```
┌─────────────────────────────────────────────┐
│         ● ● ○  Step 1 of 3                 │
│                                             │
│     What do you want to predict?            │
│     Pick at least 2 topics.                 │
│                                             │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐    │
│  │ 🤖 AI   │  │ 💰Crypto│  │ 🌍Geopol│    │
│  │  [✓]   │  │         │  │  [✓]   │    │
│  └─────────┘  └─────────┘  └─────────┘    │
│                                             │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐    │
│  │ 🔬Sci  │  │ ⚽Sports │  │ 🎬Enter │    │
│  │         │  │  [✓]   │  │         │    │
│  └─────────┘  └─────────┘  └─────────┘    │
│                                             │
│  ┌─────────┐  ┌─────────┐                  │
│  │ 📈Econ  │  │ 💻Tech  │                  │
│  │         │  │         │                  │
│  └─────────┘  └─────────┘                  │
│                                             │
│     [      Continue →      ]               │
│                                             │
│     Skip onboarding                         │
└─────────────────────────────────────────────┘
```

### Implementation Notes
- Store selections in `user_preferences` table (or profile metadata) via Supabase
- Categories shown as selectable cards with toggle state (selected = green border + checkmark)
- Minimum 2 selections required to proceed
- Feed into homepage: show "Recommended for you" section with questions from selected categories
- Feature explanation moved to a collapsible tooltip or bottom sheet

### Expected Impact
- **Engagement**: +15-20% onboarding completion (active choice vs passive reading)
- **Retention**: Personalized homepage → higher D1 return rate
- **Data**: Category preferences inform question creation priority

---

## Recommendation 2: Demo Forecast with Feedback Loop (Enhance Step 2)

### Problem
The current demo forecast ("Will it rain in London tomorrow?") submits and immediately jumps to Step 3. The user never sees what happens after submission — no confirmation, no explanation of Phase A vs Phase B, no preview of the scoring mechanism. This misses the key "aha moment" of the Blind Consensus Protocol.

### Solution
After the user submits the demo forecast, show a **3-phase animation** that demonstrates the full lifecycle:
1. **Phase A confirmation**: "Your forecast is locked! 🔒 It's hidden from everyone else."
2. **Phase B reveal simulation**: "Phase B is now open. 47 other forecasters submitted predictions." → Show a mini-distribution chart
3. **Resolution simulation**: "This question resolved as YES. Your score: Brier 0.12 — that's in the top 15%!"

### Mockup Description

**Phase A confirmation (immediate after submit):**
```
┌─────────────────────────────────────────────┐
│  🎯 Forecast submitted!                     │
│                                             │
│  You said: 72% Yes                          │
│                                             │
│  ┌─────────────────────────────────┐        │
│  │  🔒 BLIND PHASE ACTIVE          │        │
│  │                                 │        │
│  │  Your prediction is hidden.     │        │
│  │  No one can see it yet.         │        │
│  │                                 │        │
│  │  Phase B opens in 7 days.       │        │
│  └─────────────────────────────────┘        │
│                                             │
│     [ See what happens next → ]             │
└─────────────────────────────────────────────┘
```

**Phase B simulation (after tap):**
```
┌─────────────────────────────────────────────┐
│  📊 Phase B — Revision Phase                │
│                                             │
│  The blind is lifted! Here's what others    │
│  predicted:                                 │
│                                             │
│        Community Distribution               │
│  ┌─────────────────────────────────┐        │
│  │  10% ████████                    │        │
│  │  20% ██████████████             │        │
│  │  30% ████████████████████  ← avg│        │
│  │  40% ██████████████             │        │
│  │  50% ████████                    │        │
│  │  60% ████                        │        │
│  │  70% ██  ← You: 72%             │        │
│  │  80% █                          │        │
│  └─────────────────────────────────┘        │
│                                             │
│  You were more confident than the crowd!    │
│                                             │
│     [ See your score → ]                    │
└─────────────────────────────────────────────┘
```

**Resolution simulation:**
```
┌─────────────────────────────────────────────┐
│  ✅ Question Resolved: YES                  │
│                                             │
│  ┌─────────────────────────────────┐        │
│  │  Your forecast:  72%            │        │
│  │  Outcome:        YES (100%)     │        │
│  │                                 │        │
│  │  Brier Score:    0.0784         │        │
│  │  Log Score:      -0.33          │        │
│  │                                 │        │
│  │  🏆 Top 15% of forecasters!     │        │
│  └─────────────────────────────────┘        │
│                                             │
│  This is how scoring works on Baycast.      │
│  The closer your probability to the truth,  │
│  the better your score.                     │
│                                             │
│     [ Start forecasting for real → ]        │
└─────────────────────────────────────────────┘
```

### Implementation Notes
- Use hardcoded mock data for the simulation (no API calls needed)
- Each sub-step is a state within Step 2 (not a new onboarding step)
- Duration: ~15-20 seconds total, but user can skip
- Animate the distribution chart appearing (simple CSS transition)
- Store the fact that the demo was completed (useful for analytics)

### Expected Impact
- **"Aha moment" delivery**: Users understand the full value prop in 20 seconds
- **Reduced confusion**: Phase A/B mechanics are demonstrated, not just explained
- **Confidence boost**: Simulated top-15% result creates positive reinforcement

---

## Recommendation 3: Progressive Profile Builder (Replace Step 3 + Post-Onboarding)

### Problem
Step 3 ("You're all set!") is a dead end — it offers two links (Browse Questions, Set up Profile) but no incentive to complete the profile. Most users click "Browse Questions" and never return to their profile. Profile completion rate will likely be <10%.

### Solution
Replace the passive completion screen with a **quick-profile builder** that takes 15 seconds: choose a display name + avatar color. Then, after the user's first real forecast, trigger a lightweight follow-up prompt for optional enrichment (bio, social links, notification preferences).

### Mockup Description

**Step 3 — Quick Profile (mandatory, 15 sec):**
```
┌─────────────────────────────────────────────┐
│         ● ● ●  Step 3 of 3                 │
│                                             │
│     Almost done! Set up your profile.       │
│                                             │
│     ┌──────────┐                            │
│     │   (A)    │  ← Tappable avatar circle  │
│     │  #4ADE80 │  (cycles through 8 colors) │
│     └──────────┘                            │
│                                             │
│  Display name                               │
│  ┌─────────────────────────────────┐        │
│  │  Marcus_T                        │        │
│  └─────────────────────────────────┘        │
│                                             │
│  (Optional) One-line bio                    │
│  ┌─────────────────────────────────┐        │
│  │  Crypto trader, probability nerd│        │
│  └─────────────────────────────────┘        │
│                                             │
│     [  🚀 Start Forecasting  ]              │
│                                             │
└─────────────────────────────────────────────┘
```

**Post-first-forecast prompt (optional, dismissible):**
```
┌─────────────────────────────────────────────┐
│  🔔 Nice! Your first forecast is in.        │
│                                             │
│  Want to get notified when this resolves?   │
│                                             │
│  [✓] Email me when questions resolve        │
│  [✓] Weekly digest of my scores             │
│  [ ] Daily reminder for open questions      │
│                                             │
│     [ Save & continue ]  [ Maybe later ]    │
└─────────────────────────────────────────────┘
```

### Implementation Notes
- Display name: minimum 2 characters, no profanity filter needed for beta (flag for review)
- Avatar: 8 preset colors, stored as hex in profile. Future: upload custom avatar
- Bio: max 80 characters, optional
- Notification preferences: stored in `notification_preferences` table
- Post-forecast prompt: triggered after first real forecast submission, shown as a slide-up sheet
- Profile data is written to Supabase `profiles` table immediately

### Expected Impact
- **Profile completion**: 90%+ (name is mandatory, takes 10 seconds)
- **Notification opt-in**: 40-60% (prompted at the moment of highest engagement)
- **Leaderboard identity**: Users appear with names/colors instead of anonymous IDs → social motivation
- **Retention**: Notification opt-ins drive D7/D30 return visits
