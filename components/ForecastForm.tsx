'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import ForecastSlider from './ForecastSlider'
import type { Forecast } from '@/lib/types'
import Link from 'next/link'

const FIRST_HINT_KEY = 'baycast_first_forecast_hint_shown'
const FIRST_FORECAST_KEY = 'baycast_first_forecast_made'

interface Props {
  questionId: string
  existingForecast: Forecast | null
  isLoggedIn: boolean
  isBlind?: boolean
}

export default function ForecastForm({
  questionId,
  existingForecast,
  isLoggedIn,
  isBlind = false,
}: Props) {
  const router = useRouter()
  const [probability, setProbability] = useState(
    existingForecast?.prediction.probability ?? 50
  )
  // Optimistic display: updated immediately on submit, rolled back on error
  const [optimisticProbability, setOptimisticProbability] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)

  // Step B: Show first-visit tooltip pointing to the slider
  useEffect(() => {
    if (!isLoggedIn) return
    if (typeof window === 'undefined') return
    const hintShown = localStorage.getItem(FIRST_HINT_KEY)
    if (!hintShown) {
      // Small delay so the component renders first
      const timer = setTimeout(() => {
        setShowHint(true)
        localStorage.setItem(FIRST_HINT_KEY, 'true')
        // Auto-dismiss after 6 seconds
        const dismissTimer = setTimeout(() => setShowHint(false), 6000)
        return () => clearTimeout(dismissTimer)
      }, 800)
      return () => clearTimeout(timer)
    }
  }, [isLoggedIn])

  // Step C: Check if first forecast celebration should show
  useEffect(() => {
    if (typeof window === 'undefined') return
    const firstMade = localStorage.getItem(FIRST_FORECAST_KEY)
    if (firstMade === 'pending') {
      setShowCelebration(true)
      localStorage.setItem(FIRST_FORECAST_KEY, 'true')
    }
  }, [])

  const displayedProbability = optimisticProbability ?? existingForecast?.prediction.probability

  if (!isLoggedIn) {
    return (
      <div className="text-center py-6">
        <p className="text-text-secondary mb-4">Log in to add your forecast to the collective estimate.</p>
        <Link
          href="/auth/login"
          className="px-6 py-2.5 rounded-lg bg-accent-green text-white font-semibold hover:bg-accent-green/90 transition-colors"
        >
          Log in
        </Link>
      </div>
    )
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    // Optimistic update: show success immediately
    const prevOptimistic = optimisticProbability
    setOptimisticProbability(probability)
    setSuccess(true)

    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      setError('Session expired. Please log in again.')
      setOptimisticProbability(prevOptimistic)
      setSuccess(false)
      setLoading(false)
      return
    }

    const { error: upsertError } = await supabase.from('forecasts').upsert(
      {
        question_id: questionId,
        user_id: user.id,
        prediction: { probability },
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'question_id,user_id' }
    )

    if (upsertError) {
      // Rollback
      setError(upsertError.message)
      setOptimisticProbability(prevOptimistic)
      setSuccess(false)
    } else {
      // Step C: Check if this is the first forecast (no existing forecast before this)
      const isFirstForecast = !existingForecast
      if (isFirstForecast) {
        // Try Supabase metadata update, fallback to localStorage
        try {
          await supabase.auth.updateUser({ data: { first_forecast_made: true } })
        } catch {
          // Fallback: localStorage only
        }
        localStorage.setItem(FIRST_FORECAST_KEY, 'pending')
      }
      router.refresh()
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {isBlind && (
        <div className="p-3 rounded-lg bg-yellow-900/20 border border-yellow-800/40 text-yellow-300 text-sm">
          🔒 <strong>Blind phase active:</strong> Your forecast is private. Other forecasters
          cannot see your prediction until the blind phase ends. Make your best independent
          estimate — you can revise later.
        </div>
      )}
      {!isBlind && existingForecast && (
        <div className="p-3 rounded-lg bg-blue-900/20 border border-blue-800/40 text-blue-300 text-sm">
          📖 <strong>Revision phase:</strong> All forecasts are now visible. Review the
          aggregate and update your prediction if you wish.
        </div>
      )}

      {/* Step C: Celebratory message after first forecast */}
      {showCelebration && (
        <div className="p-4 rounded-xl border border-accent-green/40 bg-gradient-to-r from-accent-green/10 via-accent-green/5 to-transparent">
          <div className="flex items-center gap-3">
            <span className="text-2xl flex-shrink-0">🎯</span>
            <div>
              <p className="text-text-primary font-semibold text-sm">
                Your first forecast is in!
              </p>
              <p className="text-text-secondary text-sm">
                Come back when this question resolves to see your score.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowCelebration(false)}
              className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-full text-text-secondary hover:text-text-primary hover:bg-white/10 transition-colors"
              aria-label="Dismiss celebration"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Step B: First-visit tooltip pointing to the slider */}
      <div className="relative">
        {showHint && (
          <div className="absolute -top-16 left-1/2 -translate-x-1/2 z-10 animate-bounce">
            <div className="bg-accent-green text-white text-xs font-medium px-3 py-2 rounded-lg shadow-lg whitespace-nowrap">
              Slide to set your probability, then click Submit
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-accent-green" />
            </div>
          </div>
        )}
        <ForecastSlider value={probability} onChange={setProbability} disabled={loading} />
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-danger/10 border border-danger/30 text-danger text-sm">
          {error}
        </div>
      )}
      {success && !error && (
        <div className="p-3 rounded-lg bg-success/10 border border-success/30 text-success text-sm">
          Forecast saved.
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-lg bg-accent-green text-white font-semibold hover:bg-accent-green/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {existingForecast ? 'Update forecast' : 'Submit forecast'}
      </button>

      {displayedProbability !== undefined && (
        <p className="text-center text-text-secondary text-sm">
          Your current forecast:{' '}
          <span className="font-mono text-accent-green font-bold">
            {displayedProbability}%
          </span>
        </p>
      )}
    </form>
  )
}
