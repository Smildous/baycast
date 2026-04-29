# Baycast — Product Specifications

---

## 1. AI Agent API Spec

### Endpoint

```
POST /api/agent/forecast
```

### Request

```json
{
  "question_id": "uuid",
  "question_text": "string",
  "context": "string (optional, additional info)"
}
```

### Response

```json
{
  "success": true,
  "forecast_id": "uuid",
  "probability": 72,
  "reasoning": "string — model's justification",
  "model": "gpt-4o",
  "created_at": "2026-04-29T12:00:00Z"
}
```

### Error Response

```json
{
  "success": false,
  "error": "AGENT_DISABLED | QUESTION_CLOSED | RATE_LIMITED | INVALID_INPUT"
}
```

### Agent Profile

- AI agents are stored as a special user in `profiles`:
  - `display_name`: `"AI: {model_name}"`
  - `avatar_url`: robot icon (static asset)
  - `is_agent`: `true` (new boolean column)
- Agents participate in **Phase A (blind)** identically to humans — they never see existing forecasts before submitting.

### Multi-Model Support

- Environment variable `AGENT_MODELS` (comma-separated, e.g. `"gpt-4o,claude-sonnet"`) configures which models are available.
- Each model gets its own agent profile row.
- **Future**: admin UI to enable/disable models per question.

### Database

AI forecasts include agent metadata in the `forecasts` table:

| Column | Type | Notes |
|---|---|---|
| `agent_model` | `text nullable` | Model identifier (null for human forecasts) |
| `agent_reasoning` | `text nullable` | Full chain-of-thought from the model |

### Admin Controls

- `AGENT_ENABLED` env var — global kill switch. When `"false"`, endpoint returns 403.
- **Future**: per-question toggle via `questions.agent_allowed boolean` column.

### Rate Limiting

- **Max 1 AI forecast per question per model per phase.**
- Enforced at DB level: unique constraint on `(question_id, agent_model, phase)`.
- Middleware rejects duplicates before hitting the LLM.

### Implementation Notes

- The scaffold at `app/api/agent/forecast/route.ts` calls an OpenAI-compatible API (base URL via `OPENAI_BASE_URL`, key via `OPENAI_API_KEY`).
- System prompt instructs the model to return JSON with `probability` (integer 1–99) and `reasoning`.
- Request is validated with Zod; probability is clamped to [1, 99].
- LLM call timeout: 30 seconds. Retry once on failure.

---

## 2. 15 New Seed Questions

### Tech

| # | Title | Category | Closing Date | Resolution Criteria |
|---|---|---|---|---|
| 1 | GPT-5 will be released by Dec 2026 | Tech | 2026-12-31 | OpenAI officially announces and makes GPT-5 available via API or product. |
| 2 | Apple will launch a dedicated AI hardware device by Dec 2026 | Tech | 2026-12-31 | Apple announces and ships a new hardware product marketed primarily as an AI device. |
| 3 | Bitcoin will exceed $150,000 at any point by Dec 2026 | Tech | 2026-12-31 | BTC/USD spot price reaches ≥$150,000 on a major exchange (Coinbase, Binance). |
| 4 | Tesla will launch commercial robotaxi service by Dec 2026 | Tech | 2026-12-31 | Tesla operates a paid, public-facing autonomous ride-hail service in at least one US city. |
| 5 | OpenAI will complete an IPO by Dec 2026 | Tech | 2026-12-31 | OpenAI publicly files and prices an IPO on a major stock exchange. |

### Geopolitics

| # | Title | Category | Closing Date | Resolution Criteria |
|---|---|---|---|---|
| 6 | Ukraine-Russia ceasefire agreement by Dec 2026 | Geopolitics | 2026-12-31 | Both parties formally agree to a sustained ceasefire (minimum 30 days). |
| 7 | Taiwan Strait crisis escalation to military confrontation by Dec 2026 | Geopolitics | 2026-12-31 | Armed military clash between China and Taiwan/US forces in the Taiwan Strait. |
| 8 | EU AI Act enforcement fines issued by Dec 2026 | Geopolitics | 2026-12-31 | At least one company is publicly fined under the EU AI Act. |
| 9 | India GDP growth exceeds 7% in FY 2026 | Geopolitics | 2026-12-31 | Official Indian government GDP figures show >7% real growth for FY 2026-27. |
| 10 | BRICS announces a common currency by Dec 2026 | Geopolitics | 2026-12-31 | BRICS bloc formally announces creation of a shared reserve or trade currency. |

### Science & Economics

| # | Title | Category | Closing Date | Resolution Criteria |
|---|---|---|---|---|
| 11 | US recession declared in 2026 | Economics | 2026-12-31 | NBER officially declares a US recession starting at any point in 2026. |
| 12 | Fed funds rate below 3% by Dec 2026 | Economics | 2026-12-31 | Federal Reserve target federal funds rate drops below 3.00%. |
| 13 | Nobel Prize in Physics awarded for AI research by 2026 | Science | 2026-12-31 | The Nobel Prize in Physics is awarded for work primarily in artificial intelligence or machine learning. |
| 14 | SpaceX Starship achieves crewed Moon landing by Dec 2026 | Science | 2026-12-31 | A SpaceX Starship vehicle successfully lands humans on the lunar surface. |
| 15 | Global EV sales exceed 30% market share by Dec 2026 | Science | 2026-12-31 | Battery electric vehicles account for >30% of new passenger vehicle sales worldwide. |

---

## 3. Question Blocks v1 Spec

### Concept

A **Question Block** groups 5–10 related questions under a single theme. Users can compete on block-level accuracy alongside individual question scores.

### Scoring

- Block score = **average Brier score** across all resolved questions in the block.
- Only resolved questions count toward the average (unresolved are ignored).
- A user must have forecasted at least 50% of resolved questions in a block to appear on its leaderboard.

### Leaderboard

- Separate block leaderboard independent of the global leaderboard.
- Ranked by block Brier score (lower = better).
- Displayed on the block detail page (`/blocks/[id]`).

### UI Routes

| Route | Description |
|---|---|
| `/blocks` | Lists all available blocks with title, category, question count, top scorer. |
| `/blocks/[id]` | Block detail: question list, block leaderboard, user's block score. |

### First 3 Blocks

| Block | Description | Questions |
|---|---|---|
| AI in 2026 | Tech questions about AI industry developments | #1, #2, #5, #13, #14 |
| Global Politics 2026 | Geopolitical events and policy outcomes | #6, #7, #8, #9, #10 |
| Markets & Economics 2026 | Economic indicators and market predictions | #3, #4, #11, #12, #15 |

### Database Schema

```sql
CREATE TABLE blocks (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title       TEXT NOT NULL,
  description TEXT,
  category    TEXT NOT NULL,
  created_by  UUID REFERENCES profiles(id),
  created_at  TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE block_questions (
  block_id     UUID REFERENCES blocks(id) ON DELETE CASCADE,
  question_id  UUID REFERENCES questions(id) ON DELETE CASCADE,
  sort_order   INT DEFAULT 0,
  PRIMARY KEY (block_id, question_id)
);
```

### Future Considerations

- User-created blocks (v2).
- Block subscription / notification on new questions.
- Time-weighted Brier (decay factor for older questions).

---

## 4. Onboarding Flow Spec

### Overview

Three-step onboarding triggered after first signup. Each step has a **"Skip"** link for returning users who don't want to repeat it.

### Step 1 — Welcome Modal

- Triggered: immediately after account creation.
- Content:
  - Heading: **"Welcome to Baycast"**
  - Three bullet points:
    - **Blind forecasts** — your prediction is hidden until Phase B
    - **Scored accuracy** — ranked by Brier score, not just right/wrong
    - **Human + AI** — compete against AI agents and other forecasters
  - CTA button: **"Got it"**
- Skip: dismisses modal, marks step as complete.

### Step 2 — Guided Forecast

- Triggered: after Step 1 completion.
- Shows a fixed demo question (e.g. *"Will it rain in London tomorrow?"*).
- UI highlights the probability slider with a tooltip: *"Drag to set your probability. Your forecast is hidden until Phase B."*
- User submits forecast (stored normally but marked as demo/onboarding).
- Skip: skips demo forecast, proceeds to Step 3.

### Step 3 — You're All Set

- Triggered: after Step 2 completion or skip.
- Content:
  - Heading: **"You're all set!"**
  - Two links:
    - **"Browse Questions"** → `/questions`
    - **"Set up your profile"** → `/profile`
- Auto-redirect to `/questions` after 5 seconds.

### Profile Tracking

```sql
ALTER TABLE profiles ADD COLUMN onboarding_completed BOOLEAN DEFAULT false;
```

- Set to `true` when Step 3 is reached.
- Checked on app load — if `false`, redirect to the appropriate onboarding step.
- Onboarding step progress tracked client-side in localStorage (`onboarding_step`: 1 | 2 | 3).
