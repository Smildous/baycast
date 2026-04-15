'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import ForecastSlider from './ForecastSlider'
import type { Forecast, QuestionType, QuestionOptions } from '@/lib/types'
import Link from 'next/link'

interface Props {
  questionId: string
  questionType: QuestionType
  options: QuestionOptions
  existingForecast: Forecast | null
  isLoggedIn: boolean
}

export default function ForecastForm({
  questionId,
  questionType,
  options,
  existingForecast,
  isLoggedIn,
}: Props) {
  const router = useRouter()
  const [probability, setProbability] = useState(
    existingForecast?.prediction?.probability ?? 50
  )
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  if (!isLoggedIn) {
    return (
      <div className="text-center py-6">
        <p className="text-text-secondary mb-4">Connecte-toi pour soumettre une prédiction.</p>
        <Link
          href="/auth/login"
          className="px-6 py-2.5 rounded-lg bg-accent-green text-white font-semibold hover:bg-accent-green/90 transition-colors"
        >
          Se connecter
        </Link>
      </div>
    )
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      setError('Session expirée. Reconnecte-toi.')
      setLoading(false)
      return
    }

    const prediction = { probability }

    const { error: upsertError } = await supabase.from('forecasts').upsert(
      {
        question_id: questionId,
        user_id: user.id,
        prediction,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'question_id,user_id' }
    )

    if (upsertError) {
      setError(upsertError.message)
    } else {
      setSuccess(true)
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
      {success && (
        <div className="p-3 rounded-lg bg-success/10 border border-success/30 text-success text-sm">
          Prédiction enregistrée !
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-lg bg-accent-green text-white font-semibold hover:bg-accent-green/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {loading ? 'Envoi...' : existingForecast ? 'Mettre à jour' : 'Soumettre'}
      </button>

      {existingForecast && (
        <p className="text-center text-text-secondary text-sm">
          Ta prédiction actuelle :{' '}
          <span className="font-mono text-accent-green font-bold">
            {existingForecast.prediction?.probability}%
          </span>
        </p>
      )}
    </form>
  )
}
