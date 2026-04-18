import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import Image from 'next/image'
import type { Profile, Forecast, Score, ForecastPrediction } from '@/lib/types'
import CalibrationChart, { type CalibrationPoint } from '@/components/CalibrationChart'

const PAGE_SIZE = 20

interface Props {
  params: { username: string }
  searchParams: { page?: string }
}

type ForecastWithQuestion = Forecast & {
  questions: { title: string; status: string; category: string } | null
}

type ResolvedForecastRaw = {
  prediction: ForecastPrediction
  questions: { status: string; resolution: { outcome: string; value: number } | null } | null
}

function computeCalibration(resolvedForecasts: ResolvedForecastRaw[]): CalibrationPoint[] {
  const buckets = Array.from({ length: 10 }, () => ({ total: 0, yes: 0 }))

  for (const f of resolvedForecasts) {
    const prob = f.prediction.probability          // 1–99
    const value = f.questions?.resolution?.value   // 0 or 1
    if (value === undefined || value === null) continue
    const idx = Math.min(Math.floor(prob / 10), 9)
    buckets[idx].total++
    if (value === 1) buckets[idx].yes++
  }

  return buckets
    .map((b, i) => ({
      predicted: i * 10 + 5,
      actual: b.total > 0 ? Math.round((b.yes / b.total) * 100) : null,
      count: b.total,
    }))
    .filter((p): p is CalibrationPoint => p.actual !== null)
}

export default async function ProfilePage({ params, searchParams }: Props) {
  const supabase = createClient()

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('display_name', params.username)
    .single()

  if (!profile) notFound()

  const p = profile as Profile

  const page = Math.max(1, Number(searchParams.page ?? '1'))
  const offset = (page - 1) * PAGE_SIZE

  const [
    { data: scores },
    { data: forecasts, count: forecastsTotal },
    { data: resolvedRaw },
  ] = await Promise.all([
    supabase
      .from('scores')
      .select('*')
      .eq('user_id', p.id),
    supabase
      .from('forecasts')
      .select('*, questions(title, status, category)', { count: 'exact' })
      .eq('user_id', p.id)
      .order('updated_at', { ascending: false })
      .range(offset, offset + PAGE_SIZE - 1),
    // All forecasts on resolved questions — used for calibration only
    supabase
      .from('forecasts')
      .select('prediction, questions(status, resolution)')
      .eq('user_id', p.id),
  ])

  const scoreList = (scores ?? []) as Score[]
  const forecastList = (forecasts ?? []) as ForecastWithQuestion[]
  const totalPages = Math.ceil((forecastsTotal ?? 0) / PAGE_SIZE)

  const avgBrier =
    scoreList.length > 0
      ? scoreList.reduce((s, sc) => s + sc.brier_score, 0) / scoreList.length
      : null

  // Compute calibration from resolved forecasts only
  const resolvedForecasts = (resolvedRaw ?? []).filter(
    (f) =>
      (f.questions as ResolvedForecastRaw['questions'])?.status === 'resolved' &&
      (f.questions as ResolvedForecastRaw['questions'])?.resolution != null
  ) as ResolvedForecastRaw[]

  const calibrationPoints = computeCalibration(resolvedForecasts)

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {/* Profile header */}
      <div className="bg-bg-surface border border-border-dark rounded-xl p-6 mb-8 flex gap-6 items-start">
        {p.avatar_url ? (
          <Image
            src={p.avatar_url}
            alt={p.display_name}
            width={80}
            height={80}
            className="rounded-full"
          />
        ) : (
          <div className="w-20 h-20 rounded-full bg-border-dark flex items-center justify-center text-3xl font-semibold text-accent-green">
            {p.display_name[0]?.toUpperCase()}
          </div>
        )}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-outfit font-bold">{p.display_name}</h1>
            {p.is_admin && (
              <span className="px-2 py-0.5 rounded text-xs bg-accent-blue/20 text-accent-blue border border-accent-blue/30">
                Admin
              </span>
            )}
          </div>
          {p.bio && <p className="text-text-secondary">{p.bio}</p>}
          <div className="flex gap-6 mt-4">
            <div>
              <div className="text-xl font-mono font-bold text-accent-green">
                {avgBrier !== null ? avgBrier.toFixed(4) : '—'}
              </div>
              <div className="text-text-secondary text-sm">Avg Brier score</div>
            </div>
            <div>
              <div className="text-xl font-mono font-bold text-text-primary">
                {forecastsTotal ?? 0}
              </div>
              <div className="text-text-secondary text-sm">Total forecasts</div>
            </div>
            <div>
              <div className="text-xl font-mono font-bold text-text-primary">
                {scoreList.length}
              </div>
              <div className="text-text-secondary text-sm">Resolved</div>
            </div>
          </div>
        </div>
      </div>

      {/* Calibration curve */}
      {calibrationPoints.length >= 3 && (
        <div className="bg-bg-surface border border-border-dark rounded-xl p-6 mb-8">
          <div className="mb-4">
            <h2 className="text-lg font-outfit font-semibold mb-1">Calibration</h2>
            <p className="text-text-secondary text-sm">
              A well-calibrated forecaster&apos;s dots follow the dashed diagonal — things predicted at 70% should happen ~70% of the time.
            </p>
          </div>
          <CalibrationChart data={calibrationPoints} />
          <p className="text-text-secondary text-xs mt-2 text-right">
            Based on {resolvedForecasts.length} resolved forecast{resolvedForecasts.length !== 1 ? 's' : ''}
          </p>
        </div>
      )}

      {/* Forecast history */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-outfit font-semibold">Forecast history</h2>
        {(forecastsTotal ?? 0) > 0 && (
          <span className="text-text-secondary text-sm">{forecastsTotal} total</span>
        )}
      </div>

      <div className="space-y-2">
        {forecastList.length === 0 ? (
          <div className="text-center py-8 text-text-secondary border border-border-dark rounded-xl">
            No forecasts yet.
          </div>
        ) : (
          forecastList.map((f) => (
            <Link
              key={f.id}
              href={`/questions/${f.question_id}`}
              className="block bg-bg-surface border border-border-dark rounded-lg p-4 hover:border-accent-blue/40 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-text-secondary mb-1">{f.questions?.category}</div>
                  <div className="font-medium truncate">{f.questions?.title}</div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-xl font-mono font-bold text-accent-green">
                    {f.prediction.probability}%
                  </div>
                  <div className="text-xs text-text-secondary capitalize">{f.questions?.status}</div>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6">
          <span className="text-text-secondary text-sm">
            Page {page} of {totalPages}
          </span>
          <div className="flex gap-2">
            {page > 1 && (
              <Link
                href={`/profile/${params.username}?page=${page - 1}`}
                className="px-4 py-2 rounded-lg border border-border-dark text-text-secondary hover:text-text-primary hover:border-accent-green/40 text-sm transition-colors"
              >
                ← Previous
              </Link>
            )}
            {page < totalPages && (
              <Link
                href={`/profile/${params.username}?page=${page + 1}`}
                className="px-4 py-2 rounded-lg border border-border-dark text-text-secondary hover:text-text-primary hover:border-accent-green/40 text-sm transition-colors"
              >
                Next →
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
