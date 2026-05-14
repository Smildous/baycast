'use client'

import Link from 'next/link'

interface ConsensusGateProps {
  /** Total number of forecasts the user has made across ALL questions */
  totalForecastCount: number
  /** Whether the user has forecasted on THIS specific question */
  hasForecastedThisQuestion: boolean
  /** The consensus content to show when unlocked */
  children: React.ReactNode
}

const FORECASTS_TO_UNLOCK = 3

export default function ConsensusGate({
  totalForecastCount,
  hasForecastedThisQuestion,
  children,
}: ConsensusGateProps) {
  // Unlocked if: user has 3+ total forecasts OR user has already forecasted this question
  const isUnlocked = totalForecastCount >= FORECASTS_TO_UNLOCK || hasForecastedThisQuestion

  if (isUnlocked) {
    return <>{children}</>
  }

  const progress = Math.min(totalForecastCount, FORECASTS_TO_UNLOCK)
  const progressPct = Math.round((progress / FORECASTS_TO_UNLOCK) * 100)

  return (
    <div className="mb-8 p-5 rounded-xl border border-yellow-800/50 bg-yellow-900/20">
      <div className="text-yellow-300 font-semibold mb-2">
        🔒 Make {FORECASTS_TO_UNLOCK} forecasts to see crowd numbers
      </div>
      <p className="text-text-secondary text-sm mb-4">
        Call {FORECASTS_TO_UNLOCK} questions first. Then we&apos;ll show the crowd numbers across Baycast.
      </p>

      {/* Progress bar */}
      <div className="mb-3">
        <div className="flex items-center justify-between text-sm mb-1.5">
          <span className="text-text-secondary">Progress</span>
          <span className="font-mono font-bold text-yellow-300">
            {progress}/{FORECASTS_TO_UNLOCK} forecasts
          </span>
        </div>
        <div className="w-full h-2.5 rounded-full bg-border-dark overflow-hidden">
          <div
            className="h-full rounded-full bg-yellow-400 transition-all duration-300"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      <Link
        href="/questions"
        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-yellow-400/20 border border-yellow-800/50 text-yellow-300 text-sm font-medium hover:bg-yellow-400/30 transition-colors"
      >
        <span>Browse questions</span>
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </div>
  )
}
