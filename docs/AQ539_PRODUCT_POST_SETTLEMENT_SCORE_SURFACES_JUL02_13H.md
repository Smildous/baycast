# AQ-539 product check, post-settlement score surfaces, Jul 2 13H

## Scope

Checked production after the AQ-538 settlements propagated. I used `/root/baycast-product` and did not read open forecasts.

Production host: `https://baycast-p.vercel.app`

Routes checked:

- `/questions?status=resolved`
- `/questions/9df06e86-a3f4-4550-8381-c6be33ea48a7`
- `/leaderboard`
- `/activity`
- `/questions?sort=closing-soon`

The Cannes detail route was identified from prior repo evidence and the resolved list link. The slug is the question UUID: `9df06e86-a3f4-4550-8381-c6be33ea48a7`.

## Browser findings

### `/questions?status=resolved`

Visible UX looked correct.

- Page title: `Browse Prediction Questions - Baycast`
- Heading: `Questions(9 resolved)`
- The resolved list includes the five Jul 2 settlements plus earlier resolved questions.
- Cannes is visible as resolved: `Will the 2026 Cannes Palme d'Or go to a film from a female director?`
- Each resolved card uses the public status copy: `Resolved. Scores now count against the final outcome`

DOM and rendered HTML check:

```text
aggregate_probability: 0
forecasters_count: 0
settled_by: false
evidence_doc: false
rawJson: false
forecastCount or equivalent count fields: 0
```

### Cannes detail

URL: `/questions/9df06e86-a3f4-4550-8381-c6be33ea48a7`

Visible UX looked correct.

- Page title: `Will the 2026 Cannes Palme d'Or go to a film from a female director? - Baycast`
- Status: `Resolved`
- Outcome: `No`
- Resolved date: `Jul 2, 2026`
- The page shows the public settlement note: `Scores use the final Yes/No outcome for this resolved question. Open-question consensus stays hidden until the protocol allows it.`
- Resolution source is public copy only: `Festival de Cannes official awards and film pages: https://www.festival-cannes.com/en/`

DOM and rendered HTML check:

```text
aggregate_probability: 0
forecasters_count: 0
settled_by: false
evidence_doc: false
rawJson: false
forecastCount or equivalent count fields: 0
```

### `/leaderboard`

Visible UX looked correct.

- Page title: `Forecaster Leaderboard - Baycast`
- The table headers are `#`, `Forecaster`, `Brier`, `Log Score`, `Predictions`, `Resolved`
- The table shows public scoring rows for `Baycast AI Scout` and `Simba`
- The Cannes Brier-only state is reflected by blank log score display, shown as `-`, not as raw internal data

DOM and rendered HTML check:

```text
aggregate_probability: 0
forecasters_count: 0
settled_by: false
evidence_doc: false
rawJson: false
forecastCount or equivalent count fields: 0
```

### `/activity`

Visible UX looked correct.

- Page title: `Recent Forecasting Activity - Baycast`
- Public copy says: `Public forecasting activity appears after questions resolve.`
- The feed shows only resolved-question activity in this check.
- It includes resolved Apple Mac Pro activity and resolved Cannes activity.
- Footer copy says: `Showing recent resolved-question forecasts`

DOM and rendered HTML check:

```text
aggregate_probability: 0
forecasters_count: 0
settled_by: false
evidence_doc: false
rawJson: false
forecastCount or equivalent count fields: 0
```

### `/questions?sort=closing-soon`

Visible UX looked correct.

- Page title: `Browse Prediction Questions - Baycast`
- Heading: `Questions(0 closing soon)`
- Empty state: `No questions closing in the next 14 days`
- Empty-state helper copy: `Use Newest for the full open set, or come back when the first resolution windows get closer.`

DOM and rendered HTML check:

```text
aggregate_probability: 0
forecasters_count: 0
settled_by: false
evidence_doc: false
rawJson: false
forecastCount or equivalent count fields: 0
```

## Additional verification

Ran the existing distribution gate script:

```text
npm run verify:distribution-gate
```

Result:

```text
ok /settlements/apple-mac-pro-wwdc-2026
ok /questions?status=resolved
ok /
Distribution gate verification passed.
```

## Conclusion

No deterministic UX or BCP bug was found. The resolved public surfaces and adjacent score surfaces were clean for the required blocked fields after the Jul 2 settlements. I only changed this evidence document.
