# AI Forecaster v0 product spec

Baycast AI Forecaster v0 is a small, labeled set of scored forecasters. They make probability forecasts on the same public questions as humans. They do not trade, bet, recommend actions, or claim private information.

The safe version is boring on purpose. It adds proof that Baycast can score AI forecasters without weakening Blind Consensus.

## Product shape

AI forecasters are accounts with a clear `AI forecaster` label. Each account can submit one forecast per open question in v0. Forecast updates can wait.

Every AI forecast stores:

- question id
- agent id and display name
- probability
- short rationale based only on public information
- model or agent version
- prompt version
- created at
- blind status

Scores use Brier and log score after resolution. The product may show both once enough resolved forecasts exist. Before that, it should say that scores need resolved questions, not invent a rank.

No live Supabase write is part of this spec. Launch data should be inserted only after the UI gates below are built and checked.

## Blind Consensus rule

The agent must not see Baycast consensus, forecast count, other forecasts, activity on that question, or any rank signal before making its own forecast.

The user must not see the agent probability before making a forecast on that question, unless the question is already resolved or the existing Baycast unlock rule says consensus is visible.

This means AI forecasts are not a shortcut around Blind Consensus. They are just more forecasters inside the same protocol.

## User-facing surfaces

### Question page

Before the viewer forecasts, keep the normal locked consensus state. If an AI forecast exists, do not show the probability, rationale, agent name list, count, or any hint that points toward the answer.

Allowed copy:

```text
Forecast first to see the community signal.
```

```text
Some forecasts may come from labeled AI forecasters. They are scored after resolution like everyone else.
```

After the viewer forecasts, show AI forecasts in the same area as other forecast context, clearly labeled.

Copy:

```text
AI forecaster
Baycast Agent A estimated 62%.
Reasoning: Based on public data available at forecast time.
```

If rationales are shown, keep them short and sourced in plain language. No advice language. No "buy", "sell", "trade", "bet", "odds", "edge", or "payout".

### Activity feed

Before the viewer has unlocked a question, activity must not reveal the forecast value or the side implied by it.

Locked copy:

```text
An AI forecaster added a forecast to an open question.
Forecast first to see the details.
```

Unlocked copy:

```text
Baycast Agent A forecasted 62% on: Will X happen?
```

For signed-out visitors, use the locked copy by default.

### Forecaster profile

The profile can explain what the agent is and how it is scored.

Copy:

```text
Baycast Agent A is an AI forecaster. It makes probability forecasts from public information and is scored after questions resolve.
```

Before resolution, the profile should not expose open-question probabilities to a viewer who has not unlocked those questions. It can show neutral participation text.

Copy:

```text
Open forecasts are hidden until you forecast or the question resolves.
```

After resolution, show resolved forecasts, Brier score, log score, and rationale if it was stored.

### Leaderboard

Do not show AI forecasters in a ranked leaderboard until they have enough resolved questions to avoid fake precision. v0 can show a separate waiting state.

Copy:

```text
AI forecasters will appear here after enough questions resolve to score them fairly.
```

When shown, label them as AI. Do not mix unlabeled AI accounts with humans.

### Explainer and onboarding

Add one plain explanation wherever AI forecasters are introduced.

Copy:

```text
AI forecasters are scored participants. They make forecasts before seeing consensus, then Baycast scores them with Brier and log score after resolution.
```

```text
Baycast is prediction polling, not gambling. There is no staking, payout, or betting mechanic.
```

## What not to expose before resolution

Do not expose any claim that makes unresolved performance look known.

Keep hidden until resolution:

- whether an AI forecast was right or wrong
- score changes, rank changes, streaks, or accuracy claims
- Brier or log score for unresolved questions
- "top AI", "best model", or similar status language
- confidence trophies or badges based on unresolved forecasts
- internal prompts, chain of thought, hidden agent deliberation, or private scratchpads
- aggregate agent performance on questions that have not resolved

Keep hidden until the viewer unlocks consensus, even if the question is still open:

- AI probability
- rationale that reveals the likely direction of the forecast
- exact AI forecaster count on the question
- agent names attached to open-question forecasts
- activity text that implies high or low probability

Never expose service role details, admin tooling, prompt secrets, provider keys, private logs, or anything that suggests the agent used non-public information.

## Launch limits

Start with a small batch. Ten forecasts across two or three labeled agents is enough. Prefer near-term, binary questions with public resolution sources and clean criteria.

Avoid medical, legal, emergency, personal finance, and public safety guidance. Avoid questions where a forecast could be mistaken for a recommendation.

If any UI leak appears, stop inserts. Fix the surface before adding more AI forecasts.

## Acceptance criteria

v0 is acceptable when all of this is true:

1. AI forecaster accounts are visibly labeled on question pages, profiles, activity, and leaderboard surfaces.
2. An AI agent cannot read Baycast consensus, current forecast count, other user forecasts, or question activity before submitting its forecast.
3. A logged-out visitor cannot see AI probabilities, rationales, agent names for open-question forecasts, exact AI forecast counts, or answer-direction hints.
4. A logged-in user who has not forecasted on a question gets the same locked treatment.
5. A user who has forecasted can see AI forecast details only under the existing Blind Consensus unlock rule.
6. Resolved questions can show AI forecast details, Brier score, and log score.
7. The leaderboard does not rank AI forecasters until there is a minimum resolved sample size.
8. All AI copy avoids gambling, market, odds, staking, payout, and advice language.
9. Public metadata, Open Graph copy, JSON-LD, share text, and notifications do not leak locked AI forecast details.
10. The system stores an audit trail with agent id, question id, probability, model or agent version, prompt version, and timestamp.
11. No live Supabase writes are needed to complete this spec.
12. QA covers signed-out, signed-in not forecasted, signed-in forecasted, resolved, and leaderboard states.

## Non-goals for v0

No autonomous question creation. No forecast updates. No chat interface. No personalized advice. No public model comparison claims. No betting, trading, staking, or payout features.

The goal is simple: labeled AI forecasters, protected Blind Consensus, clean scoring after resolution.
