import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import CategoryBadge from '@/components/CategoryBadge'
import Countdown from '@/components/Countdown'
import ProbBar from '@/components/ProbBar'
import Sparkline from '@/components/Sparkline'
import ForecastForm from '@/components/ForecastForm'
import ShareButtons from '@/components/ShareButtons'
import JsonLdScript from '@/components/JsonLdScript'
import type { Question, Forecast, ForecastPrediction } from '@/lib/types'
import { formatDate, questionPhase } from '@/lib/utils'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://baycast-p.vercel.app'

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const supabase = createClient()
  const { data: question } = await supabase
    .from('questions')
    .select('id, title, description')
    .eq('id', params.id)
    .single()

  if (!question) {
    return { title: 'Question Not Found — Baycast' }
  }

  const q = question as Pick<Question, 'id' | 'title' | 'description'>
  const url = `${BASE_URL}/questions/${q.id}`
  const description = q.description
    ? `${q.description}. Cast your forecast!`
    : 'Cast your forecast on Baycast!'

  return {
    title: `${q.title} — Baycast Prediction Poll`,
    description,
    openGraph: {
      title: `${q.title} — Baycast Prediction Poll`,
      description,
      url,
      siteName: 'Baycast',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${q.title} — Baycast Prediction Poll`,
      description,
    },
  }
}

/**
 * Ensures a URL is absolute (has a protocol).
 * Handles relative paths (/questions/CoinGecko) and bare domains (coingecko.com).
 * Also lowercases bare domain-like inputs to avoid broken links (e.g. "CoinGecko" → "https://coingecko.com").
 */
function normalizeUrl(raw: string): string {
  const trimmed = raw.trim()
  if (!trimmed) return trimmed
  if (/^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//.test(trimmed)) return trimmed
  // Bare domain or word: lowercase it and prepend https://
  return `https://${trimmed.toLowerCase()}`
}

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

  // Determine question phase using Blind Consensus Protocol
  const phase = questionPhase(q.status, q.blind_until, q.closes_at)
  const isBlind = phase === 'blind'
  const isOpen = q.status === 'open'
  const isResolved = q.status === 'resolved'

  // During blind phase, skip fetching other users' forecasts entirely.
  // RLS policy also enforces this server-side, but we avoid the query for performance.
  // We still fetch the count of forecasters (including the current user).
  let allForecasts: { prediction: ForecastPrediction }[] | null = null
  let forecasters = 0
  let avgProb: number | null = null
  let historyData: number[] = []
  let forecastsError: string | null = null

  if (!isBlind) {
    // Fetch all forecasts for aggregate display (only when visible)
    const { data, error } = await supabase
      .from('forecasts')
      .select('prediction')
      .eq('question_id', params.id)
      .order('created_at', { ascending: true })

    forecastsError = error?.message ?? null
    allForecasts = data as { prediction: ForecastPrediction }[] | null
    forecasters = allForecasts?.length ?? 0
    avgProb =
      forecasters > 0
        ? Math.round(
            allForecasts!.reduce(
              (s, f) => s + (f.prediction as ForecastPrediction).probability,
              0
            ) / forecasters
          )
        : null
    historyData =
      allForecasts?.map((f) => (f.prediction as ForecastPrediction).probability) ?? []
  } else {
    // During blind phase, only count forecasters (RLS ensures only own forecast is returned)
    const { count } = await supabase
      .from('forecasts')
      .select('*', { count: 'exact', head: true })
      .eq('question_id', params.id)
    forecasters = count ?? 0
  }

  if (forecastsError) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="p-4 rounded-xl border border-danger/40 bg-danger/10 text-danger">
          Failed to load forecast data. Please try refreshing the page.
        </div>
      </div>
    )
  }

  // JSON-LD structured data for SEO (schema.org Question)
  const jsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Question',
    name: q.title,
    text: q.description || undefined,
    dateCreated: q.opens_at,
    dateModified: q.resolved_at || q.closes_at,
    acceptedAnswer: {
      '@type': 'Answer',
      text: isResolved && q.resolution
        ? `Resolved: ${JSON.stringify(q.resolution)}`
        : avgProb !== null
          ? `Consensus probability: ${avgProb}%`
          : 'No forecasts yet',
    },
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {/* JSON-LD Structured Data — injected into <head> via client component with cleanup */}
      <JsonLdScript data={jsonLd} />

      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-3">
          <CategoryBadge category={q.category} />
          {q.closes_at && <Countdown closesAt={q.closes_at} status={q.status} />}
          {isBlind && (
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-yellow-900/40 text-yellow-300 border border-yellow-800">
              🔒 Blind Phase
            </span>
          )}
          {!isBlind && isOpen && q.blind_until && (
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-900/40 text-blue-300 border border-blue-800">
              📖 Revision Phase
            </span>
          )}
        </div>
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-3xl font-outfit font-bold mb-3 leading-snug">{q.title}</h1>
          <div className="shrink-0 mt-1">
            <ShareButtons title={q.title} url={`${BASE_URL}/questions/${q.id}`} />
          </div>
        </div>
        <p className="text-text-secondary leading-relaxed">
          {q.description || 'No description provided for this question.'}
        </p>
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

      {/* Blind phase notice — hide aggregate stats */}
      {isBlind && (
        <div className="mb-8 p-5 rounded-xl border border-yellow-800/50 bg-yellow-900/20">
          <div className="text-yellow-300 font-semibold mb-1">
            🔒 Blind Consensus Phase Active
          </div>
          <p className="text-text-secondary text-sm">
            Forecasts are hidden during the blind phase to prevent anchoring bias.
            Submit your independent prediction now — the aggregate and individual
            forecasts will be revealed when this phase ends.
          </p>
        </div>
      )}

      {/* Stats row — only show aggregate after blind phase */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-bg-surface border border-border-dark rounded-xl p-4 text-center">
          <div className="text-2xl font-mono font-bold text-accent-green">
            {isBlind ? '—' : avgProb !== null ? `${avgProb}%` : '—'}
          </div>
          <div className="text-text-secondary text-sm">
            {!isBlind && forecasters === 0
              ? 'No forecasts yet — be the first!'
              : 'Consensus'}
          </div>
        </div>
        <div className="bg-bg-surface border border-border-dark rounded-xl p-4 text-center">
          <div className="text-2xl font-mono font-bold text-text-primary">
            {isBlind ? `${forecasters}` : forecasters}
          </div>
          <div className="text-text-secondary text-sm">Forecaster{forecasters !== 1 ? 's' : ''}</div>
        </div>
        <div className="bg-bg-surface border border-border-dark rounded-xl p-4 text-center">
          <div className="text-2xl font-mono font-bold text-text-primary">
            {q.closes_at ? formatDate(q.closes_at) : 'TBD'}
          </div>
          <div className="text-text-secondary text-sm">Closes</div>
        </div>
      </div>

      {/* Probability bar — hidden during blind phase */}
      {!isBlind && avgProb !== null && (
        <div className="mb-8">
          <ProbBar probability={avgProb} />
        </div>
      )}

      {/* Sparkline — hidden during blind phase */}
      {!isBlind && historyData.length > 1 && (
        <div className="bg-bg-surface border border-border-dark rounded-xl p-4 mb-8">
          <div className="text-sm text-text-secondary mb-3">Consensus over time</div>
          <Sparkline data={historyData} />
        </div>
      )}

      {/* Source */}
      {q.resolution_source && (() => {
        const raw = q.resolution_source.trim()
        // Validate URL: must start with http(s):// and contain no spaces
        const isValidUrl = /^https?:\/\/\S+$/.test(raw)
        if (isValidUrl) {
          const href = normalizeUrl(raw)
          return (
            <div className="mb-8 text-sm text-text-secondary">
              Resolution source:{' '}
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-blue hover:underline break-all"
              >
                {href}
              </a>
            </div>
          )
        }
        // Invalid URL — display as plain text
        return (
          <div className="mb-8 text-sm text-text-secondary">
            Resolution source:{' '}
            <span className="text-text-primary">{raw || 'Not specified'}</span>
          </div>
        )
      })()}

      {/* Show fallback if resolution_source is null */}
      {!q.resolution_source && (
        <div className="mb-8 text-sm text-text-secondary">
          Resolution source:{' '}
          <span className="text-text-primary">Not specified</span>
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
            isBlind={isBlind}
          />
        </div>
      )}
    </div>
  )
}
