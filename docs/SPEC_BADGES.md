# Baycast — Profile Badge System Spec

---

## 1. Overview

Badges are tier-based indicators of a user's experience level on Baycast, determined by the number of **resolved questions** they have forecasted on. Badges provide social recognition and incentivize participation.

---

## 2. Badge Tiers

| Tier | Name | Resolved Forecasts | Emoji | Color | Hex |
|------|------|-------------------|-------|-------|-----|
| 0 | **Rookie** | 0–4 | 🌱 | Green | `#22c55e` |
| 1 | **Forecaster** | 5–19 | 🌤️ | Blue | `#3b82f6` |
| 2 | **Expert** | 20–49 | ⭐ | Amber | `#f59e0b` |
| 3 | **Oracle** | 50+ | 🧙 | Purple | `#a855f7` |

### Criteria

- Count = number of distinct resolved questions where the user has a score in the `scores` table.
- Thresholds are **inclusive** on the lower bound: 5 resolved → Forecaster, 20 → Expert, 50 → Oracle.
- Badges are **never downgraded** — once a user reaches a tier, they keep it even if questions are un-resolved (edge case). The displayed tier is `max(ever_reached_tier, current_tier)`.

---

## 3. Badge Display Rules

### Where Badges Appear

| Location | Display |
|----------|---------|
| **User profile page** (`/profile/[id]`) | Full badge: emoji + tier name + color background pill |
| **Leaderboard** (global + block) | Emoji + tier name next to display name |
| **Question page** (forecast list) | Emoji only, next to username |
| **Comments / activity feed** (future) | Emoji only |

### Visibility

- Badges are **public** — visible to all users (no opt-out).
- Users without any resolved forecasts show no badge (not even Rookie) to avoid cluttering new users.

---

## 4. Visual Design

### Badge Component Variants

**Full Badge** (profile, leaderboard):

```
┌──────────────────────┐
│ 🌤️  Forecaster       │  ← Blue background pill (#3b82f6), white text
└──────────────────────┘
```

**Inline Badge** (question pages, comments):

```
johndoe 🌤️
```

### Design Tokens

```css
.badge-rookie   { --badge-color: #22c55e; }
.badge-forecaster { --badge-color: #3b82f6; }
.badge-expert   { --badge-color: #f59e0b; }
.badge-oracle   { --badge-color: #a855f7; }
```

- Pill: `background: var(--badge-color); color: white; border-radius: 9999px; padding: 2px 10px; font-size: 0.75rem; font-weight: 600;`
- Inline emoji: `font-size: 1rem;` no additional styling.

---

## 5. Database Schema

### 5.1 Badge Tier Enum

```sql
CREATE TYPE public.badge_tier AS ENUM ('rookie', 'forecaster', 'expert', 'oracle');
```

### 5.2 Add Badge Columns to Profiles

```sql
ALTER TABLE public.profiles
  ADD COLUMN badge_tier public.badge_tier DEFAULT 'rookie',
  ADD COLUMN badge_ever_reached public.badge_tier DEFAULT 'rookie',
  ADD COLUMN resolved_forecast_count integer DEFAULT 0;
```

### 5.3 Badge Calculation Function

Computes the current tier from resolved forecast count:

```sql
CREATE OR REPLACE FUNCTION public.compute_badge_tier(count integer)
RETURNS public.badge_tier AS $$
BEGIN
  IF count >= 50 THEN RETURN 'oracle';
  ELSIF count >= 20 THEN RETURN 'expert';
  ELSIF count >= 5 THEN RETURN 'forecaster';
  ELSE RETURN 'rookie';
  END IF;
END;
$$ LANGUAGE plpgsql IMMUTABLE;
```

### 5.4 Auto-Update Trigger

Updates `resolved_forecast_count`, `badge_tier`, and `badge_ever_reached` whenever scores are inserted:

```sql
CREATE OR REPLACE FUNCTION public.update_user_badge()
RETURNS TRIGGER AS $$
DECLARE
  new_count integer;
  current_tier public.badge_tier;
  ever_reached public.badge_tier;
BEGIN
  -- Count distinct resolved questions for this user
  SELECT count(DISTINCT question_id)
    INTO new_count
    FROM public.scores
    WHERE user_id = COALESCE(NEW.user_id, OLD.user_id);

  current_tier := public.compute_badge_tier(new_count);

  -- Never downgrade: take the higher of current computed tier or ever-reached
  ever_reached := (
    SELECT badge_ever_reached FROM public.profiles
    WHERE id = COALESCE(NEW.user_id, OLD.user_id)
  );

  UPDATE public.profiles
    SET resolved_forecast_count = new_count,
        badge_tier = current_tier,
        badge_ever_reached = GREATEST(
          current_tier::text::integer,
          ever_reached::text::integer
        )::public.badge_tier
    WHERE id = COALESCE(NEW.user_id, OLD.user_id);

  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER trg_update_badge_after_score
  AFTER INSERT OR DELETE ON public.scores
  FOR EACH ROW EXECUTE FUNCTION public.update_user_badge();
```

### 5.5 Leaderboard View Update

Add badge columns to the existing leaderboard view:

```sql
CREATE OR REPLACE VIEW public.leaderboard AS
SELECT
  s.user_id,
  p.display_name,
  p.avatar_url,
  p.badge_tier,
  p.badge_ever_reached,
  p.resolved_forecast_count,
  avg(s.brier_score) AS avg_brier_score,
  avg(s.log_score) AS avg_log_score,
  count(DISTINCT f.question_id) AS total_forecasts,
  count(DISTINCT s.question_id) AS resolved_forecasts
FROM public.scores s
JOIN public.profiles p ON p.id = s.user_id
LEFT JOIN public.forecasts f ON f.user_id = s.user_id
GROUP BY s.user_id, p.display_name, p.avatar_url, p.badge_tier, p.badge_ever_reached, p.resolved_forecast_count
ORDER BY avg_brier_score ASC;
```

### 5.6 RLS

No additional RLS policies needed — badge columns are on `profiles` which is already publicly readable.

---

## 6. TypeScript Types

Add to `lib/types.ts`:

```typescript
export type BadgeTier = 'rookie' | 'forecaster' | 'expert' | 'oracle'

export const BADGE_CONFIG: Record<BadgeTier, {
  name: string
  emoji: string
  color: string
  minResolved: number
}> = {
  rookie:     { name: 'Rookie',     emoji: '🌱', color: '#22c55e', minResolved: 0 },
  forecaster: { name: 'Forecaster', emoji: '🌤️', color: '#3b82f6', minResolved: 5 },
  expert:     { name: 'Expert',     emoji: '⭐', color: '#f59e0b', minResolved: 20 },
  oracle:     { name: 'Oracle',     emoji: '🧙', color: '#a855f7', minResolved: 50 },
}

export function getDisplayBadge(
  currentTier: BadgeTier,
  everReached: BadgeTier
): BadgeTier {
  const order: BadgeTier[] = ['rookie', 'forecaster', 'expert', 'oracle']
  const currentIdx = order.indexOf(currentTier)
  const everIdx = order.indexOf(everReached)
  return order[Math.max(currentIdx, everIdx)]
}
```

Update `Profile` interface:

```typescript
export interface Profile {
  id: string
  display_name: string
  avatar_url: string | null
  bio: string | null
  is_admin: boolean
  // Badge fields (added)
  badge_tier: BadgeTier
  badge_ever_reached: BadgeTier
  resolved_forecast_count: number
}
```

Update `LeaderboardEntry` interface:

```typescript
export interface LeaderboardEntry {
  user_id: string
  display_name: string
  avatar_url: string | null
  badge_tier: BadgeTier
  badge_ever_reached: BadgeTier
  resolved_forecast_count: number
  avg_brier_score: number
  avg_log_score: number | null
  total_forecasts: number
  resolved_forecasts: number
}
```

---

## 7. API Changes

### No New Endpoints Required

Badge data is included in existing responses via profile and leaderboard queries. No dedicated badge API is needed.

### Existing Endpoints to Update

| Endpoint | Change |
|----------|--------|
| `GET /api/profile/[id]` | Response now includes `badge_tier`, `badge_ever_reached`, `resolved_forecast_count` |
| `GET /api/leaderboard` | Response entries now include `badge_tier`, `badge_ever_reached`, `resolved_forecast_count` |
| `GET /api/questions/[id]` | Forecaster list in response now includes badge data from joined profiles |

### Backfill Script

After deploying the migration, run a one-time backfill:

```sql
-- Backfill all users' badge data
UPDATE public.profiles p SET
  resolved_forecast_count = sub.cnt,
  badge_tier = public.compute_badge_tier(sub.cnt),
  badge_ever_reached = public.compute_badge_tier(sub.cnt)
FROM (
  SELECT user_id, count(DISTINCT question_id) AS cnt
  FROM public.scores
  GROUP BY user_id
) sub
WHERE p.id = sub.user_id;
```

---

## 8. Frontend Components

### 8.1 `<Badge>` Component

**File:** `components/badge.tsx`

**Props:**

```typescript
interface BadgeProps {
  tier: BadgeTier
  variant: 'pill' | 'inline'  // default: 'pill'
  showName?: boolean           // default: true (ignored for inline)
}
```

**Behavior:**
- `variant="pill"`: Renders emoji + tier name in a colored rounded pill.
- `variant="inline"`: Renders emoji only (used in forecast lists).
- If `showName=false` with pill variant, renders just the emoji in a small colored circle.

### 8.2 `<ProfileBadgeSection>` Component

**File:** `components/profile-badge-section.tsx`

**Props:**

```typescript
interface ProfileBadgeSectionProps {
  profile: Profile
}
```

**Behavior:**
- Displays the user's badge prominently with tier name and progress to next tier.
- Shows a progress bar: `(resolved_forecast_count - currentTierMin) / (nextTierMin - currentTierMin)`.
- If at Oracle tier, shows "🏆 Max tier reached".
- Example layout:

```
┌─────────────────────────────────┐
│  🌤️  Forecaster                 │
│  ████████░░░░  12 / 20 resolved │
│  8 more to reach Expert ⭐       │
└─────────────────────────────────┘
```

### 8.3 Integration Points

| Page | Component | Notes |
|------|-----------|-------|
| `/profile/[id]` | `<ProfileBadgeSection>` | Below avatar/bio |
| `/leaderboard` | `<Badge variant="pill">` | Next to each entry's display name |
| `/blocks/[id]` | `<Badge variant="pill">` | Block leaderboard entries |
| `/questions/[id]` | `<Badge variant="inline">` | Next to each forecaster's name |
