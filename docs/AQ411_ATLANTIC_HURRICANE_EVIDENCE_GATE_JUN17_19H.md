# AQ-411 Atlantic hurricane evidence gate, Jun 17 19h

Evidence captured at 2026-06-17 19:09 UTC before reading any Baycast forecasts for this question.

Question: `Will the 2026 Atlantic hurricane season have a named storm before June 15?`

Question id: `9345891c-192a-4915-acad-8bed7c554333`.

Resolution criterion from Baycast:

`Resolves Yes if the National Hurricane Center designates at least one Atlantic basin tropical or subtropical storm with a name before 2026-06-15 00:00 UTC. A tropical depression without a name does not count. A storm that forms before the deadline and is named later counts only if NHC's official best track or advisory says it reached named storm strength before the deadline. Otherwise resolves No.`

Official source checked:

- NHC 2026 advisory archive: `https://www.nhc.noaa.gov/archive/2026/`
- NHC Tropical Storm Arthur archive: `https://www.nhc.noaa.gov/archive/2026/ARTHUR.shtml`

Public evidence:

- The 2026 NHC archive lists `Tropical Storm ARTHUR` as the first Atlantic storm entry, with archive marker `atcf_index=al01`.
- The Arthur advisory archive starts on Tuesday, June 16, 2026.
- The first listed Arthur forecast advisory is `20260616 1500`, advisory 1 at `1500 UTC`.
- The first listed Arthur public advisory is also `20260616 1500`, advisory 1 at `1500 UTC`.
- That is after the Baycast deadline of `2026-06-15 00:00 UTC`.
- I found no earlier Atlantic named storm entry in the NHC 2026 archive before Arthur.

Decision:

Resolve as `No`.

Reason:

The first Atlantic named storm in the official NHC 2026 advisory archive appears after the deadline. The Baycast criterion requires a named storm before `2026-06-15 00:00 UTC`. The official archive evidence supports `No`.

BCP sequence:

1. Public NHC evidence captured here first.
2. Settlement decision made from NHC sources only.
3. Forecast rows may be read only after this file exists.
4. Live question can be updated to `status = resolved` with outcome `no`.
