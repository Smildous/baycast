/**
 * Brier score for a binary prediction.
 * prediction: 0-1 probability, outcome: 1 (yes) or 0 (no)
 * Lower is better; perfect = 0, worst = 2
 */
export function brierScore(prediction: number, outcome: number): number {
  return Math.pow(prediction - outcome, 2)
}

/**
 * Returns days remaining until a date, or 0 if past.
 */
export function daysRemaining(closesAt: string): number {
  const diff = new Date(closesAt).getTime() - Date.now()
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
}

/**
 * Format a probability (0-100) as a display string.
 */
export function formatProbability(p: number): string {
  return `${Math.round(p)}%`
}

/**
 * Aggregate binary forecasts: geometric mean of probabilities.
 */
export function aggregateProbabilities(probs: number[]): number {
  if (probs.length === 0) return 50
  const logSum = probs.reduce((s, p) => s + Math.log(Math.max(1, Math.min(99, p)) / 100), 0)
  const gm = Math.exp(logSum / probs.length) * 100
  return Math.round(Math.max(1, Math.min(99, gm)))
}

export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(' ')
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export const CATEGORY_COLORS: Record<string, string> = {
  Politics: 'bg-red-900/40 text-red-300 border-red-800',
  Technology: 'bg-blue-900/40 text-blue-300 border-blue-800',
  Economy: 'bg-yellow-900/40 text-yellow-300 border-yellow-800',
  Science: 'bg-purple-900/40 text-purple-300 border-purple-800',
  Sports: 'bg-orange-900/40 text-orange-300 border-orange-800',
  Culture: 'bg-pink-900/40 text-pink-300 border-pink-800',
  Other: 'bg-gray-800/40 text-gray-300 border-gray-700',
}
