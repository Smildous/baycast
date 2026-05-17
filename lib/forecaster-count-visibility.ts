export function formatForecasterCount(count: number): string {
  if (count === 0) return 'Awaiting forecasts'
  return `${count} forecaster${count === 1 ? '' : 's'}`
}

export function formatParticipationLabel(count: number, unlocked: boolean): string {
  if (unlocked) return formatForecasterCount(count)
  return 'Community signal locked'
}

export function formatParticipationValue(count: number, unlocked: boolean): string {
  if (!unlocked) return '—'
  return count === 0 ? '—' : String(count)
}

export function publicQuestionMetadataDescription(
  category: string,
  status: string,
  description?: string | null
): string {
  const statusLabel = status.charAt(0).toUpperCase() + status.slice(1)
  const base = `${category} · ${statusLabel} · Forecast before the crowd can shape your call.`
  return description ? `${base} ${description}` : base
}
