# AQ-379 next resolution gate, Jun 14 13h UTC

Scope: choose the next near-term resolution candidates after the first Apple Mac Pro settlement, without reading open forecasts.

Data basis: pre-run product facts supplied for this job. I did not query or inspect forecast rows. Supabase question data was not pulled because the task allows the pre-run facts when safe repo scripts or env access are not needed for the gate.

## Gate decision

Go for prep on three candidates, in this order:

1. Will the 2026 FIFA World Cup opening match have at least three total goals?
2. Will OpenAI release a new public video generation model before July 1, 2026?
3. Microsoft Xbox handheld question

Do not prepare the Apple foldable iPhone question in this gate. It closes later, on 2026-09-30, and is not the next near-term work.

No settlement may happen from this document alone. This is a resolution-prep gate. The operator can move a candidate into settlement only after the close date has passed, the source checks below are complete, and the BCP rule is confirmed in the same run.

## Candidate 1: FIFA World Cup opening match goals

Title: Will the 2026 FIFA World Cup opening match have at least three total goals?

Close date: 2026-06-30.

Resolution source checks:

- Use the official FIFA match centre or FIFA report for the opening match as the primary source.
- Cross-check the final score with a stable public match report from a major sports wire or broadcaster.
- Count total goals in regulation plus stoppage time only unless the question text says otherwise. If the exact market text defines extra time or penalties, follow that text.
- Save the final score, match date, source URLs, access time, and a short quote or table value that proves the goal count.

Exact go/no-go decision:

Go only if the official final score is available and the total is unambiguous. Resolve Yes if the opening match has 3 or more total goals. Resolve No if it has 0, 1, or 2 total goals. No-go if the match is postponed, abandoned without an official final score, or if the question wording cannot be reconciled with the source result in one clean sentence.

## Candidate 2: OpenAI public video generation model

Title: Will OpenAI release a new public video generation model before July 1, 2026?

Close date: 2026-06-30.

Resolution source checks:

- Use OpenAI's official blog, product release notes, help center, platform changelog, or model documentation as primary evidence.
- Confirm that the release is public, not only a private research preview, closed alpha, invite-only enterprise pilot, or internal demo.
- Confirm that the model is new and video generation is a core capability.
- Confirm timing before July 1, 2026. Record the publication timestamp or release date shown by OpenAI.
- Cross-check with a reputable secondary report only to clarify timing or public availability. Do not let secondary coverage override OpenAI's own release language.

Exact go/no-go decision:

Go only if OpenAI has an official source that clearly establishes release status before the deadline. Resolve Yes if a new public video generation model is released before July 1, 2026. Resolve No if no official public release is found by the close review. No-go if there is only rumor, demo footage, partner-only access, waitlist language that does not prove public release, or ambiguous branding that needs product owner review.

## Candidate 3: Microsoft Xbox handheld

Title: Microsoft Xbox handheld question.

Close date: 2026-07-31.

Resolution source checks:

- First pull the exact question title and resolution criteria from the questions table or repo-approved question export before any settlement work. This gate only has the short title from pre-run facts.
- Use official Microsoft, Xbox Wire, or Microsoft Store material as primary evidence.
- If the criterion is announcement, verify the announcement date and product identity. If the criterion is release, verify actual public availability or shipping date. Do not assume one from the other.
- Cross-check with a reputable hardware or gaming outlet only after the official source is captured.
- Record the exact official wording, URL, publication date, and whether the device is Microsoft-branded, Xbox-branded, partner-branded, or only a Windows handheld reference design.

Exact go/no-go decision:

Go for evidence prep now, but no-go for settlement until the exact question wording is retrieved. Once wording is retrieved, resolve only against that wording. If the question asks for a Microsoft Xbox handheld and the official evidence is only a partner PC handheld, no-go until product owner confirms interpretation or the wording already covers partner devices.

## BCP rule for all three

Blind Consensus Protocol stays intact. During resolution prep and settlement, do not read open forecasts, aggregate probability, forecaster count, comments derived from forecasts, leaderboard impact, or any user-level prediction data. The operator may read only question metadata, close date, resolution criteria, public source evidence, and settlement tooling output that does not expose open forecasts.

If any script prints forecast rows, probabilities, counts, or profile-level prediction data, stop the run, discard that output for decision-making, and restart with a narrower query or manual metadata lookup.

## Operator checklist

Before the close date, prepare source bookmarks and a blank evidence note. Do not decide early.

At close review:

- Confirm the candidate is closed or past its close date.
- Retrieve exact question wording and resolution criteria without reading forecasts.
- Capture primary source evidence first.
- Add one secondary source only when it helps validate timing or public availability.
- Write the outcome in one sentence that maps source fact to question wording.
- Check BCP compliance before touching settlement scripts.
- Run the settlement dry path if the repo has one and it does not expose forecasts.
- If the result is ambiguous, record no-go and escalate to product owner. Do not force a resolution for schedule reasons.

Final priority: FIFA and OpenAI are the next live candidates because both close on 2026-06-30. Microsoft Xbox handheld is queued after them for 2026-07-31 once exact wording is available.
