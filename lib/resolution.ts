export type ResolutionOutcomeLabel = 'Yes' | 'No' | 'Unknown'

const OUTCOME_KEYS = [
  'outcome',
  'result',
  'answer',
  'value',
  'resolved_outcome',
  'resolvedTo',
  'resolved_to',
  'resolution',
]

function labelFromValue(value: unknown): ResolutionOutcomeLabel | null {
  if (typeof value === 'boolean') return value ? 'Yes' : 'No'

  if (typeof value === 'number') {
    if (value === 1) return 'Yes'
    if (value === 0) return 'No'
  }

  if (typeof value === 'string') {
    const normalized = value.trim().toLowerCase()
    if (['yes', 'y', 'true', '1'].includes(normalized)) return 'Yes'
    if (['no', 'n', 'false', '0'].includes(normalized)) return 'No'
  }

  return null
}

export function formatResolutionOutcome(resolution: Record<string, unknown> | null): ResolutionOutcomeLabel {
  if (!resolution) return 'Unknown'

  for (const key of OUTCOME_KEYS) {
    const label = labelFromValue(resolution[key])
    if (label) return label
  }

  for (const value of Object.values(resolution)) {
    const label = labelFromValue(value)
    if (label) return label
  }

  return 'Unknown'
}
