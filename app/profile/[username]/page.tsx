import { notFound, redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

// Ensure dynamic rendering so profile data is always fresh
export const dynamic = 'force-dynamic'
import Link from 'next/link'
import Image from 'next/image'
import EmptyState from '@/components/EmptyState'
import type { Profile, Forecast, Score, ForecastPrediction } from '@/lib/types'
import { normalizeCategory } from '@/lib/categoryMap'
import CalibrationChart, { type CalibrationPoint } from '@/components/CalibrationChart'
import ProfileBadgeSection from '@/components/ProfileBadgeSection'
import ProfileTabsClient from '@/components/ProfileTabsClient'

const PAGE_SIZE = 20

interface Props {
  params: { username: string }
  searchParams: { page?: string; tab?: string }
}

type ForecastWithQuestion = Forecast & {
  questions: {
    title: string
    status: string
    category: string
    resolution?: { outcome: string; value: number } | null
  } | null
}

type ResolvedForecastRaw = {
  prediction: ForecastPrediction
  questions: { status: string; resolution: { outcome: string; value: number } | null } | null
}

function computeCalibration(resolvedForecasts: ResolvedForecastRaw[]): CalibrationPoint[] {
  const buckets = Array.from({ length: 10 }, () => ({ total: 0, yes: 0 }))

  for (const f of resolvedForecasts) {
    const prob = f.prediction.probability
    const value = f.questions?.resolution?.value
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

const TABS = [
  { key: 'overview', label: 'Overview' },
  { key: 'forecasts', label: 'Forecasts' },
  { key: 'accuracy', label: 'Accuracy' },
]

export default async function ProfilePage({ params, searchParams }: Props) {
  const supabase = createClient()

  // Require authentication to view profiles
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('display_name', params.username)
    .single()

  if (!profile) notFound()

  const p = profile as Profile
  const isOwnProfile = user.id === p.id

  const page = Math.max(1, Number(searchParams.page ?? '1'))
  const offset = (page - 1) * PAGE_SIZE

  const [
    { data: scores },
    { data: forecasts, count: forecastsTotal },
    { data: resolvedRaw },
    { data: forecastDatesRaw },
  ] = await Promise.all([
    supabase
      .from('scores')
      .select('*')
      .eq('user_id', p.id),
    supabase
      .from('forecasts')
      .select('*, questions(title, status, category, resolution)', { count: 'exact' })
      .eq('user_id', p.id)
      .order('updated_at', { ascending: false })
      .range(offset, offset + PAGE_SIZE - 1),
    // All forecasts on resolved questions — used for calibration only
    supabase
      .from('forecasts')
      .select('prediction, questions(status, resolution)')
      .eq('user_id', p.id),
    // All forecast dates for streak calculation (AQ-199)
    supabase
      .from('forecasts')
      .select('created_at')
      .eq('user_id', p.id)
      .order('created_at', { ascending: false }),
  ])

  const scoreList = (scores ?? []) as Score[]
  const forecastList = (forecasts ?? []) as ForecastWithQuestion[]
  const totalPages = Math.ceil((forecastsTotal ?? 0) / PAGE_SIZE)

  // Build a score lookup map by question_id
  const scoreMap = new Map<string, Score>()
  for (const sc of scoreList) {
    scoreMap.set(sc.question_id, sc)
  }

  // Compute forecast streak (AQ-199): consecutive days with at least 1 forecast
  const forecastStreak = (() => {
    const datesRaw = (forecastDatesRaw ?? []) as { created_at: string }[]
    if (datesRaw.length === 0) return 0

    // Extract unique UTC date strings (YYYY-MM-DD)
    const uniqueDays = new Set<string>()
    for (const f of datesRaw) {
      const d = new Date(f.created_at)
      const dayStr = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(d.getUTCDate()).padStart(2, '0')}`
      uniqueDays.add(dayStr)
    }

    const sortedDays = Array.from(uniqueDays).sort().reverse() // newest first
    const today = new Date()
    const todayStr = `${today.getUTCFullYear()}-${String(today.getUTCMonth() + 1).padStart(2, '0')}-${String(today.getUTCDate()).padStart(2, '0')}`

    // Check if the most recent forecast day is today or yesterday
    if (sortedDays.length === 0) return 0
    const mostRecent = sortedDays[0]
    const mostRecentDate = new Date(mostRecent + 'T00:00:00Z')
    const todayDate = new Date(todayStr + 'T00:00:00Z')
    const diffDays = Math.round((todayDate.getTime() - mostRecentDate.getTime()) / (1000 * 60 * 60 * 24))

    if (diffDays > 1) return 0 // Streak broken — last forecast was 2+ days ago

    let streak = 0
    let expectedDate = mostRecentDate

    for (const day of sortedDays) {
      const currentDate = new Date(day + 'T00:00:00Z')
      const gap = Math.round((expectedDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24))
      if (gap === 0) {
        streak++
        expectedDate = new Date(currentDate.getTime() - 24 * 60 * 60 * 1000)
      } else {
        break
      }
    }

    return streak
  })()

  const avgBrier =
    scoreList.length > 0
      ? scoreList.reduce((s, sc) => s + sc.brier_score, 0) / scoreList.length
      : null

  const avgLog =
    scoreList.length > 0
      ? scoreList.reduce((s, sc) => s + (sc.log_score ?? 0), 0) / scoreList.length
      : null

  // Compute calibration from resolved forecasts only
  const resolvedForecasts = (resolvedRaw as unknown as ResolvedForecastRaw[] ?? []).filter(
    (f) => f.questions?.status === 'resolved' && f.questions?.resolution != null
  )

  const calibrationPoints = computeCalibration(resolvedForecasts)

  // Compute accuracy %: forecasts on the correct side of 50%
  const pendingCount = (forecastsTotal ?? 0) - scoreList.length
  let correctSideCount = 0
  for (const f of resolvedForecasts) {
    const prob = f.prediction.probability
    const value = f.questions?.resolution?.value
    if (value === undefined || value === null) continue
    // Correct side: prob > 50 and value === 1, or prob < 50 and value === 0
    if ((prob > 50 && value === 1) || (prob < 50 && value === 0)) {
      correctSideCount++
    }
    // At exactly 50%, it's neither correct nor wrong — skip
  }
  const accuracyPct = resolvedForecasts.length > 0
    ? Math.round((correctSideCount / resolvedForecasts.length) * 100)
    : null

  const activeTab = searchParams.tab ?? 'overview'

  // ─── Tab content: Overview ───
  const overviewContent = (
    <div className="space-y-6">
      {/* Badge section */}
      <ProfileBadgeSection profile={p} />

      {/* Summary stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-bg-surface border border-border-dark rounded-xl p-4 text-center">
          <div className="text-2xl font-mono font-bold text-accent-green">
            {avgBrier !== null ? avgBrier.toFixed(4) : '—'}
          </div>
          <div className="text-text-secondary text-sm mt-1">Avg Brier Score</div>
        </div>
        <div className="bg-bg-surface border border-border-dark rounded-xl p-4 text-center">
          <div className="text-2xl font-mono font-bold text-accent-blue">
            {avgLog !== null ? avgLog.toFixed(3) : '—'}
          </div>
          <div className="text-text-secondary text-sm mt-1">Avg Log Score</div>
        </div>
        <div className="bg-bg-surface border border-border-dark rounded-xl p-4 text-center">
          <div className="text-2xl font-mono font-bold text-text-primary">
            {forecastsTotal ?? 0}
          </div>
          <div className="text-text-secondary text-sm mt-1">Total Forecasts</div>
        </div>
        <div className="bg-bg-surface border border-border-dark rounded-xl p-4 text-center">
          <div className="text-2xl font-mono font-bold text-text-primary">
            {scoreList.length}
          </div>
          <div className="text-text-secondary text-sm mt-1">Resolved</div>
        </div>
      </div>

      {/* Forecast streak (AQ-199) */}
      <div className="bg-bg-surface border border-border-dark rounded-xl p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-orange-900/40 border border-orange-800 flex items-center justify-center text-lg">
              🔥
            </div>
            <div>
              <div className="text-text-primary font-semibold">
                {forecastStreak > 0 ? `${forecastStreak}-day forecast streak` : 'No active streak'}
              </div>
              <div className="text-text-secondary text-sm">
                {forecastStreak > 0
                  ? 'Keep it going — forecast every day!'
                  : 'Make a forecast today to start your streak!'}
              </div>
            </div>
          </div>
          <span className="text-2xl font-mono font-bold text-orange-400">
            {forecastStreak}
          </span>
        </div>
      </div>

      {/* Quick accuracy summary */}
      {accuracyPct !== null && (
        <div className="bg-bg-surface border border-border-dark rounded-xl p-4">
          <div className="flex items-center justify-between">
            <span className="text-text-secondary text-sm">Directional accuracy (correct side of 50%)</span>
            <span className={`text-lg font-mono font-bold ${accuracyPct >= 50 ? 'text-accent-green' : 'text-danger'}`}>
              {accuracyPct}%
            </span>
          </div>
        </div>
      )}
    </div>
  )

  // ─── Tab content: Forecasts ───
  const forecastsContent = (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-outfit font-semibold">Forecast history</h2>
        {(forecastsTotal ?? 0) > 0 && (
          <span className="text-text-secondary text-sm">{forecastsTotal} total</span>
        )}
      </div>

      {/* Desktop table */}
      <div className="hidden sm:block bg-bg-surface border border-border-dark rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border-dark text-text-secondary text-sm">
              <th className="text-left px-4 py-3">Question</th>
              <th className="text-right px-4 py-3 w-24">Your Prob</th>
              <th className="text-right px-4 py-3 w-28">Crowd</th>
              <th className="text-right px-4 py-3 w-24">Outcome</th>
              <th className="text-right px-4 py-3 w-24">Brier</th>
              <th className="text-right px-4 py-3 w-28">Date</th>
            </tr>
          </thead>
          <tbody>
            {forecastList.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-0">
                  <EmptyState
                    icon="📊"
                    title="Forecast history is empty"
                    description="This forecaster hasn't made any predictions. Browse open questions to get started."
                    cta={{ label: 'Browse Questions', href: '/questions' }}
                  />
                </td>
              </tr>
            ) : (
              forecastList.map((f) => {
                const score = scoreMap.get(f.question_id)
                const resolutionValue = f.questions?.resolution?.value
                const isResolved = f.questions?.status === 'resolved'
                const canShowPrediction = isOwnProfile || isResolved
                const outcomeLabel = isResolved
                  ? resolutionValue === 1
                    ? 'Yes'
                    : resolutionValue === 0
                      ? 'No'
                      : '—'
                  : null

                return (
                  <tr
                    key={f.id}
                    className="border-b border-border-dark/50 hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="px-4 py-3">
                      <Link
                        href={`/questions/${f.question_id}`}
                        className="hover:text-accent-blue transition-colors"
                      >
                        <div className="text-xs text-text-secondary mb-0.5">{normalizeCategory(f.questions?.category ?? 'Other')}</div>
                        <div className="font-medium truncate max-w-xs">{f.questions?.title}</div>
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-right font-mono font-bold text-accent-green">
                      {canShowPrediction ? `${f.prediction.probability}%` : 'Locked'}
                    </td>
                    <td className="px-4 py-3 text-right font-mono text-sm text-text-secondary">
                      —
                    </td>
                    <td className="px-4 py-3 text-right text-sm">
                      {outcomeLabel ? (
                        <span className={`font-medium ${outcomeLabel === 'Yes' ? 'text-accent-green' : 'text-danger'}`}>
                          {outcomeLabel}
                        </span>
                      ) : (
                        <span className="text-text-secondary capitalize text-xs">{f.questions?.status ?? 'open'}</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right font-mono text-sm">
                      {score ? score.brier_score.toFixed(4) : '—'}
                    </td>
                    <td className="px-4 py-3 text-right text-text-secondary text-xs">
                      {new Date(f.updated_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile card list */}
      <div className="sm:hidden space-y-2">
        {forecastList.length === 0 ? (
          <div className="bg-bg-surface border border-border-dark rounded-xl">
            <EmptyState
              icon="📊"
              title="Forecast history is empty"
              description="This forecaster hasn't made any predictions. Browse open questions to get started."
              cta={{ label: 'Browse Questions', href: '/questions' }}
              className="py-12"
            />
          </div>
        ) : (
          forecastList.map((f) => {
            const score = scoreMap.get(f.question_id)
            const resolutionValue = f.questions?.resolution?.value
            const isResolved = f.questions?.status === 'resolved'
            const canShowPrediction = isOwnProfile || isResolved
            const outcomeLabel = isResolved
              ? resolutionValue === 1
                ? 'Yes'
                : resolutionValue === 0
                  ? 'No'
                  : '—'
              : null

            return (
              <Link
                key={f.id}
                href={`/questions/${f.question_id}`}
                className="block bg-bg-surface border border-border-dark rounded-lg p-4 hover:border-accent-blue/40 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-text-secondary mb-1">{normalizeCategory(f.questions?.category ?? 'Other')}</div>
                    <div className="font-medium truncate">{f.questions?.title}</div>
                    <div className="flex items-center gap-3 mt-2 text-xs text-text-secondary">
                      <span>Crowd: —</span>
                      {score && <span>Brier: {score.brier_score.toFixed(4)}</span>}
                      <span>{new Date(f.updated_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-xl font-mono font-bold text-accent-green">
                      {canShowPrediction ? `${f.prediction.probability}%` : 'Locked'}
                    </div>
                    {outcomeLabel ? (
                      <div className={`text-xs font-medium mt-0.5 ${outcomeLabel === 'Yes' ? 'text-accent-green' : 'text-danger'}`}>
                        {outcomeLabel}
                      </div>
                    ) : (
                      <div className="text-xs text-text-secondary capitalize mt-0.5">{f.questions?.status ?? 'open'}</div>
                    )}
                  </div>
                </div>
              </Link>
            )
          })
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
                href={`/profile/${params.username}?tab=forecasts&page=${page - 1}`}
                className="px-4 py-2 rounded-lg border border-border-dark text-text-secondary hover:text-text-primary hover:border-accent-green/40 text-sm transition-colors"
              >
                ← Previous
              </Link>
            )}
            {page < totalPages && (
              <Link
                href={`/profile/${params.username}?tab=forecasts&page=${page + 1}`}
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

  // ─── Tab content: Accuracy ───
  const accuracyContent = (
    <div className="space-y-6">
      {/* Key stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-bg-surface border border-border-dark rounded-xl p-4 text-center">
          <div className="text-2xl font-mono font-bold text-accent-green">
            {avgBrier !== null ? avgBrier.toFixed(4) : '—'}
          </div>
          <div className="text-text-secondary text-sm mt-1">Avg Brier Score</div>
          <div className="text-text-secondary text-xs mt-0.5">Lower is better</div>
        </div>
        <div className="bg-bg-surface border border-border-dark rounded-xl p-4 text-center">
          <div className={`text-2xl font-mono font-bold ${accuracyPct !== null && accuracyPct >= 50 ? 'text-accent-green' : accuracyPct !== null ? 'text-danger' : 'text-text-primary'}`}>
            {accuracyPct !== null ? `${accuracyPct}%` : '—'}
          </div>
          <div className="text-text-secondary text-sm mt-1">Directional Accuracy</div>
          <div className="text-text-secondary text-xs mt-0.5">Correct side of 50%</div>
        </div>
        <div className="bg-bg-surface border border-border-dark rounded-xl p-4 text-center">
          <div className="text-2xl font-mono font-bold text-accent-blue">
            {scoreList.length}
          </div>
          <div className="text-text-secondary text-sm mt-1">Resolved</div>
        </div>
        <div className="bg-bg-surface border border-border-dark rounded-xl p-4 text-center">
          <div className="text-2xl font-mono font-bold text-text-primary">
            {pendingCount}
          </div>
          <div className="text-text-secondary text-sm mt-1">Pending</div>
        </div>
      </div>

      {/* Calibration chart */}
      <div className="bg-bg-surface border border-border-dark rounded-xl p-6">
        <div className="mb-4">
          <h2 className="text-lg font-outfit font-semibold mb-1">Calibration Curve</h2>
          <p className="text-text-secondary text-sm">
            A well-calibrated forecaster&apos;s dots follow the dashed diagonal — things predicted at 70% should happen ~70% of the time.
          </p>
        </div>
        {calibrationPoints.length >= 3 ? (
          <>
            <CalibrationChart data={calibrationPoints} />
            <p className="text-text-secondary text-xs mt-2 text-right">
              Based on {resolvedForecasts.length} resolved forecast{resolvedForecasts.length !== 1 ? 's' : ''}
            </p>
          </>
        ) : (
          <EmptyState
            icon="📈"
            title="Not enough data for calibration"
            description={`Need at least 3 resolved forecasts to show calibration data. Currently ${resolvedForecasts.length} resolved.`}
            className="py-12"
          />
        )}
      </div>

      {/* Brier score explanation */}
      <div className="bg-bg-surface border border-border-dark rounded-xl p-4">
        <h3 className="text-sm font-outfit font-semibold mb-2">How scores work</h3>
        <div className="text-text-secondary text-sm space-y-1">
          <p><strong className="text-text-primary">Brier Score:</strong> Measures how close your probability was to the outcome. Ranges from 0 (perfect) to 1 (worst). A random guess scores ~0.25.</p>
          <p><strong className="text-text-primary">Directional Accuracy:</strong> Percentage of resolved forecasts where you were on the correct side of 50%. Predicting 60% on a &quot;Yes&quot; outcome counts as correct.</p>
          <p><strong className="text-text-primary">Calibration:</strong> Compares your predicted probabilities against actual outcomes across confidence levels. Perfect calibration means predictions match reality.</p>
        </div>
      </div>
    </div>
  )

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {/* Profile header (always visible) */}
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
              <div className="text-text-secondary text-sm">Avg Brier</div>
            </div>
            <div>
              <div className="text-xl font-mono font-bold text-accent-blue">
                {avgLog !== null ? avgLog.toFixed(3) : '—'}
              </div>
              <div className="text-text-secondary text-sm">Avg Log Score</div>
            </div>
            <div>
              <div className="text-xl font-mono font-bold text-text-primary">
                {forecastsTotal ?? 0}
              </div>
              <div className="text-text-secondary text-sm">Forecasts</div>
            </div>
            <div>
              <div className="text-xl font-mono font-bold text-text-primary">
                {scoreList.length}
              </div>
              <div className="text-text-secondary text-sm">Resolved</div>
            </div>
            <div>
              <div className="text-xl font-mono font-bold text-orange-400">
                {forecastStreak}
              </div>
              <div className="text-text-secondary text-sm">🔥 Streak</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabbed content */}
      <ProfileTabsClient tabs={TABS} defaultTab={activeTab}>
        {{
          overview: overviewContent,
          forecasts: forecastsContent,
          accuracy: accuracyContent,
        }}
      </ProfileTabsClient>
    </div>
  )
}
