import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import CategoryBadge from '@/components/CategoryBadge'
import Countdown from '@/components/Countdown'
import ProbBar from '@/components/ProbBar'
import Sparkline from '@/components/Sparkline'
import ForecastForm from '@/components/ForecastForm'
import type { Question, Forecast, ForecastPrediction } from '@/lib/types'
import { formatDate } from '@/lib/utils'

interface Props {
  params: { id: string }
}

export default async function QuestionDetailPage({ params }: Props) {
  const supabase = createClient()

  const [{ data: question }, { data: { user } }] = await Promise.all([
    supabase.from('questions').select('*').eq('id', params.id).single(),
    supabase.auth.getUser(),
  ])

  if (!question) notFound()

  const q = question as Question

  // Get user's existing forecast
  let userForecast: Forecast | null = null
  if (user) {
    const { data } = await supabase
      .from('forecasts')
      .select('*')
      .eq('question_id', params.id)
      .eq('user_id', user.id)
      .single()
    userForecast = data as Forecast | null
  }

  // Get aggregate probability (avg of all forecasts), ordered for sparkline
  const { data: allForecasts, error: forecastsError } = await supabase
    .from('forecasts')
    .select('prediction')
    .eq('question_id', params.id)
    .order('created_at', { ascending: true })

  const forecasters = allForecasts?.length ?? 0
  const avgProb =
    forecasters > 0
      ? Math.round(
          allForecasts!.reduce(
            (s, f) => s + (f.prediction as ForecastPrediction).probability,
            0
          ) / forecasters
        )
      : null

  const historyData =
    allForecasts?.map((f) => (f.prediction as ForecastPrediction).probability) ?? []

  const isOpen = q.status === 'open'
  const isResolved = q.status === 'resolved'

  if (forecastsError) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="p-4 rounded-xl border border-danger/40 bg-danger/10 text-danger">
          Failed to load forecast data. Please try refreshing the page.
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-3">
          <CategoryBadge category={q.category} />
          <Countdown closesAt={q.closes_at} status={q.status} />
        </div>
        <h1 className="text-3xl font-outfit font-bold mb-3 leading-snug">{q.title}</h1>
        {q.description && (
          <p className="text-text-secondary leading-relaxed">{q.description}</p>
        )}
      </div>

      {/* Resolution (if resolved) */}
      {isResolved && q.resolution && (
        <div className="mb-6 p-4 rounded-xl border border-success/40 bg-success/10">
          <div className="text-success font-semibold mb-1">Question resolved</div>
          <div className="text-text-primary">
            Resolution: <span className="font-mono font-bold">{JSON.stringify(q.resolution)}</span>
          </div>
          <div className="text-text-secondary text-sm mt-1">
            {q.resolved_at && `On ${formatDate(q.resolved_at)}`}
          </div>
        </div>
      )}

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-bg-surface border border-border-dark rounded-xl p-4 text-center">
          <div className="text-2xl font-mono font-bold text-accent-green">
            {avgProb !== null ? `${avgProb}%` : '—'}
          </div>
          <div className="text-text-secondary text-sm">Consensus</div>
        </div>
        <div className="bg-bg-surface border border-border-dark rounded-xl p-4 text-center">
          <div className="text-2xl font-mono font-bold text-text-primary">{forecasters}</div>
          <div className="text-text-secondary text-sm">Forecasters</div>
        </div>
        <div className="bg-bg-surface border border-border-dark rounded-xl p-4 text-center">
          <div className="text-2xl font-mono font-bold text-text-primary">
            {formatDate(q.closes_at)}
          </div>
          <div className="text-text-secondary text-sm">Closes</div>
        </div>
      </div>

      {/* Probability bar */}
      {avgProb !== null && (
        <div className="mb-8">
          <ProbBar probability={avgProb} />
        </div>
      )}

      {/* Sparkline */}
      {historyData.length > 1 && (
        <div className="bg-bg-surface border border-border-dark rounded-xl p-4 mb-8">
          <div className="text-sm text-text-secondary mb-3">Consensus over time</div>
          <Sparkline data={historyData} />
        </div>
      )}

      {/* Source */}
      {q.resolution_source && (
        <div className="mb-8 text-sm text-text-secondary">
          Resolution source:{' '}
          <a
            href={q.resolution_source}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-blue hover:underline"
          >
            {q.resolution_source}
          </a>
        </div>
      )}

      {/* Forecast submission */}
      {isOpen && (
        <div className="bg-bg-surface border border-border-dark rounded-xl p-6">
          <h2 className="text-xl font-outfit font-semibold mb-4">
            {userForecast ? 'Update your forecast' : 'Add your forecast'}
          </h2>
          <ForecastForm
            questionId={q.id}
            existingForecast={userForecast}
            isLoggedIn={!!user}
          />
        </div>
      )}
    </div>
  )
}
