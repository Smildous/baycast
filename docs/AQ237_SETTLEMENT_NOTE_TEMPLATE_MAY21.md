# AQ-237 settlement note template, May 21

Prepared May 21, 2026.

This is an operator template for the first June settlement rehearsal. It is for evidence capture only. It does not read forecasts, does not expose consensus, and does not write Supabase.

Use it after `closes_at` has passed in UTC and only when the question is no longer forecastable. If the question still accepts forecasts, stop and log a product bug.

## Before filling the note

Run the readiness check first:

```sh
npm run verify:first-resolution-readiness
```

Keep the note focused on public evidence. Do not include forecast counts, consensus, user names, prediction payloads, activity cadence, or any hint about live participation.

## Settlement note

Question id:

Question title:

Close time in UTC:

Operator:

Source URL from the question:

Final evidence URL used:

Source checked at UTC:

Outcome:

Deciding evidence:

Paste the exact quote, table row, release line, advisory text, filing value, or official statement that answers the criteria.

Why this settles the question:

Explain why the evidence maps to the written criteria. Keep it factual and short.

Why the opposite answer does not fit:

Name the part of the criteria or source record that rules it out.

Saved evidence:

Add a screenshot path, archive link, downloaded file name, or note that the source is stable enough to cite directly.

Caveats or fallback source:

Use this only if needed. If the primary source was unavailable, say when it was checked and why the fallback is allowed by the criteria.

Operator decision:

Leave closed and unresolved, or resolve yes, or resolve no.

## Guardrails

Do not settle from social chatter, live blogs, recaps, rumors, or secondary media unless the question criteria explicitly name that source.

Do not resolve before the official source directly answers the criteria.

Do not add scoring notes before resolution. After resolution, normal product surfaces can show resolved scores and leaderboard effects.

Do not use this template as a settlement writer. It is a private evidence note for the operator rehearsal.
