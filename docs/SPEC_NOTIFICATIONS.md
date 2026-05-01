# Baycast — Notification Preferences Spec

---

## 1. Overview

Baycast sends notifications to keep users engaged with the platform. This spec covers in-app notifications (Sprint 3) with email delivery planned for a later sprint. Users control which notification types they receive via per-type preferences.

---

## 2. Notification Types

| Type Key | Label | Description | Trigger |
|----------|-------|-------------|---------|
| `question_closing_soon` | Question Closing Soon | A question you forecasted on closes in 24 hours | Cron job: check `questions.closes_at` within 24h, `status = 'open'` |
| `question_resolved` | Question Resolved | A question you forecasted on has been resolved | Trigger on `questions` update when `status` changes to `'resolved'` |
| `new_block` | New Block Published | A new question block has been created | Trigger on `blocks` insert |
| `forecast_revised` | Forecast Revised | Someone revised their forecast on a question you follow (Phase B) | Trigger on `forecasts` update during Phase B |
| `weekly_digest` | Weekly Digest | Summary of your week: resolutions, scores, leaderboard movement | Cron job: runs every Monday 09:00 UTC |

### Default Preferences

All notification types are **opt-in** except `question_closing_soon` and `question_resolved`, which are **on by default**.

---

## 3. Database Schema

### 3.1 Notifications Table

```sql
CREATE TABLE IF NOT EXISTS public.notifications (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id       UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  type          TEXT NOT NULL CHECK (type IN (
    'question_closing_soon',
    'question_resolved',
    'new_block',
    'forecast_revised',
    'weekly_digest'
  )),
  title         TEXT NOT NULL,
  body          TEXT NOT NULL,
  -- Link to the relevant resource (question page, block page, etc.)
  link          TEXT,
  -- FK to the related entity (optional)
  question_id   UUID REFERENCES public.questions(id) ON DELETE SET NULL,
  block_id      UUID REFERENCES public.blocks(id) ON DELETE SET NULL,
  -- Metadata (JSON for extensibility)
  metadata      JSONB DEFAULT '{}'::jsonb,
  read          BOOLEAN DEFAULT false,
  created_at    TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_read ON public.notifications(user_id, read);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON public.notifications(created_at DESC);

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Users can read their own notifications
CREATE POLICY "Users can read own notifications"
  ON public.notifications FOR SELECT
  USING (auth.uid() = user_id);

-- Users can mark their own as read
CREATE POLICY "Users can update own notifications"
  ON public.notifications FOR UPDATE
  USING (auth.uid() = user_id);
```

### 3.2 Notification Preferences Table

```sql
CREATE TABLE IF NOT EXISTS public.notification_preferences (
  user_id       UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
  question_closing_soon  BOOLEAN DEFAULT true,
  question_resolved      BOOLEAN DEFAULT true,
  new_block              BOOLEAN DEFAULT false,
  forecast_revised       BOOLEAN DEFAULT false,
  weekly_digest          BOOLEAN DEFAULT false,
  updated_at    TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.notification_preferences ENABLE ROW LEVEL SECURITY;

-- Users can read their own preferences
CREATE POLICY "Users can read own notification preferences"
  ON public.notification_preferences FOR SELECT
  USING (auth.uid() = user_id);

-- Users can update their own preferences
CREATE POLICY "Users can update own notification preferences"
  ON public.notification_preferences FOR UPDATE
  USING (auth.uid() = user_id);
```

### 3.3 Auto-Create Preferences on Signup

```sql
CREATE OR REPLACE FUNCTION public.create_default_notification_preferences()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.notification_preferences (user_id)
  VALUES (NEW.id)
  ON CONFLICT DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trg_create_notif_prefs ON public.profiles;
CREATE TRIGGER trg_create_notif_prefs
  AFTER INSERT ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.create_default_notification_preferences();
```

### 3.4 Notification Helper: Check Preference Before Insert

```sql
-- Helper function: check if a user has opted in to a notification type
CREATE OR REPLACE FUNCTION public.user_wants_notification(
  p_user_id UUID,
  p_type TEXT
)
RETURNS BOOLEAN AS $$
DECLARE
  pref_row RECORD;
  col_name TEXT;
  col_value BOOLEAN;
BEGIN
  SELECT * INTO pref_row
    FROM public.notification_preferences
    WHERE user_id = p_user_id;

  IF NOT FOUND THEN RETURN false; END IF;

  col_name := p_type;
  EXECUTE format('SELECT ($1).%I', col_name) INTO col_value USING pref_row;
  RETURN col_value;
EXCEPTION WHEN OTHERS THEN
  RETURN false;
END;
$$ LANGUAGE plpgsql STABLE;
```

### 3.5 Trigger: Question Resolved Notifications

```sql
CREATE OR REPLACE FUNCTION public.notify_question_resolved()
RETURNS TRIGGER AS $$
BEGIN
  -- Only fire when status changes to 'resolved'
  IF NEW.status != 'resolved' OR (OLD.status IS NOT NULL AND OLD.status = 'resolved') THEN
    RETURN NEW;
  END IF;

  INSERT INTO public.notifications (user_id, type, title, body, link, question_id)
  SELECT
    f.user_id,
    'question_resolved',
    'Question Resolved',
    '"' || NEW.title || '" has been resolved.',
    '/questions/' || NEW.id,
    NEW.id
  FROM public.forecasts f
  WHERE f.question_id = NEW.id
    AND public.user_wants_notification(f.user_id, 'question_resolved');

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trg_notify_question_resolved ON public.questions;
CREATE TRIGGER trg_notify_question_resolved
  AFTER UPDATE ON public.questions
  FOR EACH ROW EXECUTE FUNCTION public.notify_question_resolved();
```

### 3.6 Trigger: New Block Notification

```sql
CREATE OR REPLACE FUNCTION public.notify_new_block()
RETURNS TRIGGER AS $$
BEGIN
  -- Notify all users who opted in (batch insert)
  INSERT INTO public.notifications (user_id, type, title, body, link, block_id)
  SELECT
    np.user_id,
    'new_block',
    'New Block: ' || NEW.title,
    COALESCE(NEW.description, 'A new question block is available.'),
    '/blocks/' || NEW.id,
    NEW.id
  FROM public.notification_preferences np
  WHERE np.new_block = true;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trg_notify_new_block ON public.blocks;
CREATE TRIGGER trg_notify_new_block
  AFTER INSERT ON public.blocks
  FOR EACH ROW EXECUTE FUNCTION public.notify_new_block();
```

---

## 4. TypeScript Types

Add to `lib/types.ts`:

```typescript
export type NotificationType =
  | 'question_closing_soon'
  | 'question_resolved'
  | 'new_block'
  | 'forecast_revised'
  | 'weekly_digest'

export interface Notification {
  id: string
  user_id: string
  type: NotificationType
  title: string
  body: string
  link: string | null
  question_id: string | null
  block_id: string | null
  metadata: Record<string, unknown>
  read: boolean
  created_at: string
}

export interface NotificationPreferences {
  user_id: string
  question_closing_soon: boolean
  question_resolved: boolean
  new_block: boolean
  forecast_revised: boolean
  weekly_digest: boolean
  updated_at: string
}

export interface NotificationPrefsUpdate {
  question_closing_soon?: boolean
  question_resolved?: boolean
  new_block?: boolean
  forecast_revised?: boolean
  weekly_digest?: boolean
}
```

---

## 5. API Endpoints

### 5.1 Get Notifications

```
GET /api/notifications
```

**Query Params:**

| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `unread_only` | boolean | `false` | Filter to unread only |
| `limit` | number | `50` | Max notifications to return |
| `offset` | number | `0` | Pagination offset |

**Response:**

```json
{
  "notifications": Notification[],
  "unread_count": number
}
```

**Implementation:**
- Query `notifications` table where `user_id = auth.uid()`.
- Return `unread_count` as a separate count query for the bell icon badge.

### 5.2 Get Unread Count

```
GET /api/notifications/unread-count
```

**Response:**

```json
{
  "count": 7
}
```

**Implementation:**
- `SELECT count(*) FROM notifications WHERE user_id = auth.uid() AND read = false;`
- This should be a lightweight endpoint — used on every page load for the bell badge.

### 5.3 Mark as Read

```
PATCH /api/notifications/[id]/read
```

**Body:**

```json
{
  "read": true
}
```

**Response:**

```json
{
  "success": true
}
```

### 5.4 Mark All as Read

```
POST /api/notifications/mark-all-read
```

**Response:**

```json
{
  "success": true,
  "marked_count": 12
}
```

**Implementation:**
- `UPDATE notifications SET read = true WHERE user_id = auth.uid() AND read = false;`

### 5.5 Get Notification Preferences

```
GET /api/notifications/preferences
```

**Response:**

```json
{
  "preferences": NotificationPreferences
}
```

### 5.6 Update Notification Preferences

```
PATCH /api/notifications/preferences
```

**Body:**

```json
{
  "question_closing_soon": false,
  "weekly_digest": true
}
```

Only provided fields are updated (partial update).

**Response:**

```json
{
  "success": true,
  "preferences": NotificationPreferences
}
```

---

## 6. Cron Jobs

### 6.1 Question Closing Soon (Hourly)

Run hourly via Supabase Edge Function or `pg_cron`:

```sql
-- Requires pg_cron extension: CREATE EXTENSION IF NOT EXISTS pg_cron;

SELECT cron.schedule(
  'notify-closing-soon',
  '0 * * * *',  -- every hour
  $$
  INSERT INTO public.notifications (user_id, type, title, body, link, question_id)
  SELECT DISTINCT
    f.user_id,
    'question_closing_soon',
    'Closing Soon',
    '"' || q.title || '" closes in less than 24 hours.',
    '/questions/' || q.id,
    q.id
  FROM public.questions q
  JOIN public.forecasts f ON f.question_id = q.id
  WHERE q.status = 'open'
    AND q.closes_at BETWEEN now() AND now() + interval '24 hours'
    AND public.user_wants_notification(f.user_id, 'question_closing_soon')
    -- Avoid duplicate notifications: skip if one already created in last 23h
    AND NOT EXISTS (
      SELECT 1 FROM public.notifications n
      WHERE n.user_id = f.user_id
        AND n.question_id = q.id
        AND n.type = 'question_closing_soon'
        AND n.created_at > now() - interval '23 hours'
    );
  $$
);
```

### 6.2 Weekly Digest (Monday 09:00 UTC)

```sql
SELECT cron.schedule(
  'weekly-digest',
  '0 9 * * 1',  -- every Monday 09:00 UTC
  $$
  INSERT INTO public.notifications (user_id, type, title, body, metadata)
  SELECT
    np.user_id,
    'weekly_digest',
    'Weekly Digest',
    'Your Baycast weekly summary is ready.',
    jsonb_build_object(
      'week_start', date_trunc('week', now())::text,
      'resolutions_count', sub.resolutions,
      'avg_brier', sub.avg_score
    )
  FROM public.notification_preferences np
  JOIN LATERAL (
    SELECT
      count(DISTINCT s.question_id) AS resolutions,
      avg(s.brier_score) AS avg_score
    FROM public.scores s
    JOIN public.questions q ON q.id = s.question_id
    WHERE s.user_id = np.user_id
      AND q.resolved_at >= date_trunc('week', now())
  ) sub ON true
  WHERE np.weekly_digest = true;
  $$
);
```

---

## 7. Frontend Components

### 7.1 `<NotificationBell>` Component

**File:** `components/notification-bell.tsx`

**Behavior:**
- Fixed position in the top navbar (right side, before avatar).
- Renders a 🔔 icon with a red badge showing `unread_count`.
- If `unread_count > 99`, shows `99+`.
- If `unread_count === 0`, no red badge.
- On click, toggles the `<NotificationDropdown>`.

**Polling:**
- Fetch `GET /api/notifications/unread-count` on mount and every 60 seconds.
- Use SWR or React Query for caching.

### 7.2 `<NotificationDropdown>` Component

**File:** `components/notification-dropdown.tsx`

**Behavior:**
- Positioned absolutely below the bell icon.
- Max height: `400px`, scrollable.
- Header: "Notifications" + "Mark all read" button.
- List of notifications, each showing:
  - **Type icon:** emoji per type (📌 closing soon, ✅ resolved, 📦 new block, 🔄 revised, 📊 digest).
  - **Title** (bold) + **body** (truncated to 2 lines).
  - **Time ago:** relative timestamp (e.g., "2h ago", "3d ago").
  - Unread notifications have a left blue border + subtle blue background.
  - Clicking a notification: marks it as read and navigates to `link`.
- Footer: "View all notifications" link → `/notifications`.
- Close on click outside.

### 7.3 `<NotificationList>` Component

**File:** `components/notification-list.tsx`

**Props:**

```typescript
interface NotificationListProps {
  unreadOnly?: boolean  // default: false
  limit?: number        // default: 50
}
```

**Behavior:**
- Full-page notification list at `/notifications`.
- Renders the same notification items as the dropdown.
- Supports infinite scroll (load more via `offset`).
- Tab toggle: "All" / "Unread".

### 7.4 `<NotificationPreferencesPage>` Component

**File:** `components/notification-preferences.tsx` (rendered at `/settings/notifications`)

**Behavior:**
- Page title: "Notification Preferences".
- A card with toggle switches for each notification type.
- Each row shows:
  - **Label** (e.g., "Question Closing Soon")
  - **Description** (e.g., "Get notified when a question you forecasted on closes within 24 hours")
  - **Toggle switch** (on/off)
- Changes are saved immediately on toggle via `PATCH /api/notifications/preferences`.
- Shows a brief toast: "Preferences updated" on success.

**Layout:**

```
┌──────────────────────────────────────────────────┐
│  Notification Preferences                        │
├──────────────────────────────────────────────────┤
│                                                  │
│  📌 Question Closing Soon              [  ON  ]  │
│  Get notified when a question closes in 24h      │
│                                                  │
│  ✅ Question Resolved                   [  ON  ]  │
│  Get notified when a question you follow is      │
│  resolved                                         │
│                                                  │
│  📦 New Block Published                  [ OFF ]  │
│  Get notified when a new question block is       │
│  created                                          │
│                                                  │
│  🔄 Forecast Revised                    [ OFF ]  │
│  Get notified when someone revises their         │
│  forecast in Phase B                              │
│                                                  │
│  📊 Weekly Digest                        [ OFF ]  │
│  Weekly summary of your activity and scores      │
│                                                  │
└──────────────────────────────────────────────────┘
```

### 7.5 Notification Type Icons

| Type | Emoji | Color |
|------|-------|-------|
| `question_closing_soon` | 📌 | Orange `#f97316` |
| `question_resolved` | ✅ | Green `#22c55e` |
| `new_block` | 📦 | Blue `#3b82f6` |
| `forecast_revised` | 🔄 | Purple `#a855f7` |
| `weekly_digest` | 📊 | Amber `#f59e0b` |

---

## 8. Future Considerations

- **Email delivery:** Add `email_sent_at` column and a worker to send emails via Resend/SendGrid. Reuse `notification_preferences` with per-channel toggles.
- **Push notifications:** Web push via service worker. Add `push_subscription` table.
- **Notification deduplication:** Coalesce multiple `forecast_revised` events for the same question within a time window.
- **Mute per-question:** Allow users to mute notifications for specific questions (add `question_mutes` table).
