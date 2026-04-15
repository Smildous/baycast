interface Props {
  probability: number
  compact?: boolean
}

export default function ProbBar({ probability, compact = false }: Props) {
  const p = Math.max(0, Math.min(100, probability))
  const isHigh = p >= 60
  const isLow = p <= 40

  const color = isHigh
    ? 'bg-success'
    : isLow
    ? 'bg-danger'
    : 'bg-accent-blue'

  if (compact) {
    return (
      <div className="w-full h-1.5 bg-border-dark rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${color}`}
          style={{ width: `${p}%` }}
        />
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-text-secondary">No</span>
        <span className="text-text-secondary">Yes</span>
      </div>
      <div className="w-full h-3 bg-border-dark rounded-full overflow-hidden relative">
        <div
          className={`h-full rounded-full transition-all ${color}`}
          style={{ width: `${p}%` }}
        />
      </div>
      <div className="flex justify-between text-xs text-text-secondary font-mono">
        <span>{100 - p}%</span>
        <span>{p}%</span>
      </div>
    </div>
  )
}
