export function formatForecasterCount(count: number): string {
  if (count === 0) return 'No forecasts yet'
  return `${count} forecaster${count === 1 ? '' : 's'}`
}

export function formatParticipationLabel(count: number, unlocked: boolean): string {
  if (unlocked) return formatForecasterCount(count)
  return count === 0 ? 'No forecasts yet' : 'Growing community'
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
  const base = `${category} · ${statusLabel} · Forecast before seeing the community consensus.`
  return description ? `${base} ${description}` : base
}
