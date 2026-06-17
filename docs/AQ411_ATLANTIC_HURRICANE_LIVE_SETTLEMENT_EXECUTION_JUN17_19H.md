# AQ-411 Atlantic hurricane live settlement execution, Jun 17 19h

Question: `Will the 2026 Atlantic hurricane season have a named storm before June 15?`

Question id: `9345891c-192a-4915-acad-8bed7c554333`.

Evidence gate: `docs/AQ411_ATLANTIC_HURRICANE_EVIDENCE_GATE_JUN17_19H.md`.

Decision: settled as `No`.

Why: the official NHC 2026 archive lists Tropical Storm Arthur as the first Atlantic storm entry. Arthur's advisory archive starts on Tuesday, June 16, 2026, with first advisory markers at `20260616 1500`. The Baycast question required a named Atlantic storm before `2026-06-15 00:00 UTC`.

BCP sequence:

1. Public NHC evidence was captured first in the evidence gate file.
2. The settlement decision was made from NHC sources only.
3. Forecast rows were read only after the evidence file existed.
4. The question row was updated to `status = resolved` with `resolution.outcome = no`.
5. Forecast rows read after evidence: 0.
6. Scores inserted: 0, because the question had no forecast rows.

Live write result:

- Question status: resolved.
- Resolution payload: outcome `no`, value `0`, evidence doc `docs/AQ411_ATLANTIC_HURRICANE_EVIDENCE_GATE_JUN17_19H.md`.
- Scores inserted: 0.
- Supabase status after settlement: 44 questions, 42 open, 12 forecasts, 6 profiles.

Verification:

- `npm run verify:public-bcp`: PASS.
- `npm run verify:distribution-gate`: PASS.
- Browser live check on `/questions/9345891c-192a-4915-acad-8bed7c554333`: page shows `Resolved`, outcome `No`, resolved date `Jun 17, 2026`.
- Browser DOM check on the resolved Atlantic page: `aggregate_probability = 0`, `forecasters_count = 0`, `settled_by = false`, `evidence_doc = false`, `rawJson = false`.

Decision:

Settlement is complete. It does not create a new leaderboard score because no one forecast this question. Distribution stays NO SEND because the private warm target list still has 0 complete sendable rows.
