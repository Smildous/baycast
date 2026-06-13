# AQ-371 live settlement execution, Jun 13 07h

Question: Will Apple announce a new Mac Pro at WWDC 2026?

Candidate id: 13aa9f2f-3226-4213-a04f-0cc2b87ad248.

Evidence gate: `docs/AQ371_PRODUCT_EVIDENCE_GATE_JUN13_07H.md`.

Decision: settled as No.

Why: Apple WWDC26 and Apple Newsroom public sources did not show a new Mac Pro announcement in the resolution window. The Apple WWDC26 coverage focused on Apple Intelligence, Siri AI, parental controls, developer tools, services, and platform software updates. The evidence file captured the public URLs and retrieval timestamp before any score work.

BCP sequence:

1. Public Apple evidence was captured first.
2. The settlement decision was made from public Apple sources only.
3. Forecasts were read only after the evidence gate and after close time.
4. The question row was updated to `status = resolved` with `resolution.outcome = no`.
5. One Brier score was inserted for the resolved question.

Live write result:

- Question status: resolved.
- Resolution payload: outcome `no`, value `0`, evidence doc `docs/AQ371_PRODUCT_EVIDENCE_GATE_JUN13_07H.md`.
- Scores inserted: 1.
- Brier score inserted: 0.25.
- Production question page shows Resolved and the No payload.
- Production leaderboard shows S Simba with Brier 0.2500.
- Production activity now shows the resolved Apple forecast.

Operational issue found:

The live `scores` table does not have `log_score`. The first score write with `log_score` failed after the question row was already resolved. Recovery succeeded by inserting the Brier score only. This is a live schema gap, not a scoring math problem. The repo has `sql/migration_003_log_score.sql`, but the live schema cache rejected `scores.log_score`.

Decision:

The first settlement is complete enough to prove the loop: resolved question, public page update, activity unlocked, leaderboard score visible. Distribution remains gated because there is still no private warm target list and no public narrative page outside the raw question page.
