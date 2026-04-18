'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import ForecastSlider from './ForecastSlider'
import type { Forecast } from '@/lib/types'
import Link from 'next/link'

interface Props {
  questionId: string
  existingForecast: Forecast | null
  isLoggedIn: boolean
}

export default function ForecastForm({
  questionId,
  existingForecast,
  isLoggedIn,
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
      router.refresh()
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <ForecastSlider value={probability} onChange={setProbability} disabled={loading} />

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
