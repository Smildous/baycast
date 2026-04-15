'use client'

interface Props {
  value: number
  onChange: (v: number) => void
  disabled?: boolean
}

export default function ForecastSlider({ value, onChange, disabled = false }: Props) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-text-secondary text-sm">Unlikely</span>
        <span className="text-4xl font-mono font-bold text-accent-green tabular-nums">
          {value}%
        </span>
        <span className="text-text-secondary text-sm">Certain</span>
      </div>

      <input
        type="range"
        min={1}
        max={99}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        disabled={disabled}
        className="w-full"
        style={{
          background: `linear-gradient(to right, #0F9D58 0%, #0F9D58 ${((value - 1) / 98) * 100}%, #1E2740 ${((value - 1) / 98) * 100}%, #1E2740 100%)`,
        }}
      />

      {/* Quick select buttons */}
      <div className="flex gap-2 flex-wrap">
        {[5, 10, 25, 50, 75, 90, 95].map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => onChange(p)}
            disabled={disabled}
            className={`px-3 py-1 rounded-lg border text-xs font-mono transition-colors ${
              value === p
                ? 'border-accent-green text-accent-green bg-accent-green/10'
                : 'border-border-dark text-text-secondary hover:border-accent-green/40'
            }`}
          >
            {p}%
          </button>
        ))}
      </div>
    </div>
  )
}
