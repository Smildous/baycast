# AQ-211: Forecaster count visibility

## Decision

Baycast should hide the exact forecaster count before a user forecasts.

This includes logged-out visitors, logged-in users who have not forecasted on the question, and users who have not otherwise unlocked consensus under the current BCP gate. The count can be shown after the user has made their own forecast, or after they qualify for the existing consensus unlock.

## Why

Blind Consensus works because the first answer is independent. Baycast already hides the aggregate probability because seeing the crowd number creates anchoring. A small participation count can create a softer version of the same problem.

If a user sees "1 forecaster", they learn that the question has almost no social proof. That can change behavior before they think about the question. They may decide not to forecast, or they may treat their answer as less meaningful. If they see "87 forecasters", they may assume the crowd already has a strong signal, even without seeing the percentage. The exact count does not reveal the answer, but it still reveals crowd strength.

The count is useful after a forecast. At that point it helps the user interpret consensus quality. Before a forecast, it is not worth the anchoring risk.

Current BCP logic is already pointed this way. The UI hides consensus until the user forecasts or qualifies through the existing unlock rule. The question page also avoids showing small exact counts in the stats card, using "Growing community" instead. AQ-211 is about closing the remaining leak: metadata and any pre-forecast surface should follow the same rule.

## Exact UI rule

Before consensus is unlocked for the current viewer:

- Do not show the exact forecaster count anywhere on the page.
- Do not include the exact forecaster count in title, description, Open Graph text, JSON-LD, share copy, cards, tooltips, or aria labels.
- Show a neutral placeholder in the stats card.
- If there is at least one forecast, use "Growing community" as the label.
- If there are zero forecasts, "No forecasts yet" is allowed because it invites the first forecast and does not reveal crowd strength.
- Do not show thresholds like "under 50" or "50+" before unlock. Thresholds still tell the user too much.

After consensus is unlocked for the current viewer:

- Show the exact forecaster count next to the consensus.
- Use singular and plural normally: "1 forecaster", "12 forecasters".
- Keep showing "No forecasts yet" when the count is zero.

Unlocked means the same thing the product already uses for BCP today: the viewer has forecasted this question, or the viewer qualifies through the existing consensus unlock rule. If the question is in blind phase, keep aggregate data hidden. The count should still not be exact before the viewer forecasts.

## Copy examples

Pre-forecast, count is zero:

```text
Consensus
No forecasts yet
```

Pre-forecast, count is greater than zero:

```text
Consensus
Growing community
```

Pre-forecast sign-in prompt:

```text
Sign in to forecast and see the community consensus.
```

Pre-forecast blind phase notice:

```text
Forecasts are hidden to keep your first estimate independent. Submit your forecast to see the community signal after it unlocks.
```

Post-forecast, count is one:

```text
Consensus
1 forecaster
```

Post-forecast, count is more than one:

```text
Consensus
12 forecasters
```

Metadata before unlock:

```text
Technology · Open · Forecast before seeing the community consensus.
```

Metadata after unlock, when viewer-specific metadata is available in app UI:

```text
Technology · Open · 12 forecasters
```

Public share metadata should use the pre-forecast version because crawlers and logged-out users have not forecasted.

## Acceptance criteria for Dev

1. A logged-out visitor on an open question must not see an exact forecaster count in the visible UI.
2. A logged-out visitor must not receive an exact forecaster count in page metadata, Open Graph description, JSON-LD, share text, or generated social preview text.
3. A logged-in user who has not forecasted on that question and has not unlocked consensus must not see an exact forecaster count in any visible or metadata surface.
4. A user who has forecasted on the question can see the exact forecaster count once consensus is otherwise visible under BCP rules.
5. A user who qualifies through the existing consensus unlock can see the exact count after blind phase rules allow consensus display.
6. The zero state can say "No forecasts yet" before unlock.
7. The nonzero locked state should say "Growing community" and should not expose a number, range, threshold, or count-derived hint.
8. Public SEO and social metadata should never include exact forecaster count for open questions, because those surfaces are not viewer-aware.
9. Tests should cover 0, 1, 2, 49, and 50 forecasts for locked and unlocked viewers.
10. The implementation should not change the BCP aggregate probability rule. This decision only covers participation count visibility.
