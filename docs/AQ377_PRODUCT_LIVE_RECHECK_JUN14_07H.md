# AQ-377 live resolved UX recheck, Jun 14 07h UTC

Run time: 2026-06-14 07:01:43 UTC

Checked live production at:

- https://baycast-p.vercel.app/questions?status=resolved
- https://baycast-p.vercel.app/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248

## Result

AQ-377: FAIL for this live recheck.

The stale open-state copy from yesterday is gone from the resolved list and the Apple Mac Pro detail page. I did not find these strings in visible text or DOM HTML on either checked surface:

- `Lock your call before the crowd can shape it`
- `Community signal locked`
- open `Closes` row copy

The Apple Mac Pro detail page also passes the raw payload check. None of these raw terms appeared in visible UI or DOM HTML there:

- `settled_by`
- `evidence_doc`
- `aggregate_probability`
- `forecasters_count`

The resolved list still fails the raw payload DOM check. Visible UI is clean, but DOM HTML still includes serialized resolution payload fields:

- `settled_by`
- `evidence_doc`

Evidence context from the resolved list DOM:

```text
"resolution":{"value":0,"outcome":"no","settled_at":"2026-06-13T07:06:50.320Z","settled_by":"odin","evidence_doc":"docs/AQ371_PRODUCT_EVIDENCE_GATE_JUN13_07H.md"}
```

`aggregate_probability` and `forecasters_count` were not found in visible UI or DOM HTML on the resolved list.

## Decision

Live propagation appears complete for the stale resolved-state copy. The remaining issue is separate but inside the AQ-377 check scope: raw payload terms are still present in DOM HTML on the resolved list. Recommend Dev fix the resolved list serialization so internal resolution fields are not shipped into page HTML, then rerun Product/Questions live QA.
