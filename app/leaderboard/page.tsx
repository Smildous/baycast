import { createClient } from '@/lib/supabase/server'
import type { LeaderboardEntry } from '@/lib/types'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
  searchParams: { period?: 'all' | 'month' | 'week' }
}

export default async function LeaderboardPage({ searchParams }: Props) {
  const supabase = createClient()
  const period = searchParams.period ?? 'all'

  let entries: LeaderboardEntry[] = []
  let error: { message: string } | null = null

  if (period === 'all') {
    // Use the pre-aggregated view for the all-time leaderboard
    const { data, error: err } = await supabase
      .from('leaderboard')
      .select('*')
      .order('avg_brier_score', { ascending: true })
      .limit(50)
    entries = (data ?? []) as LeaderboardEntry[]
    error = err
  } else {
    // For time-filtered periods, query scores directly and aggregate in JS.
    // The leaderboard view cannot be filtered by date after aggregation.
    const cutoff = new Date()
    if (period === 'week') cutoff.setDate(cutoff.getDate() - 7)
    else cutoff.setMonth(cutoff.getMonth() - 1)

    const { data: rawScores, error: err } = await supabase
      .from('scores')
      .select('user_id, brier_score, profiles(display_name, avatar_url)')
      .gte('created_at', cutoff.toISOString())
    error = err

    if (rawScores) {
      const map = new Map<string, {
        display_name: string
        avatar_url: string | null
        total: number
        count: number
      }>()

      for (const row of rawScores) {
        const profile = row.profiles as { display_name: string; avatar_url: string | null }
        const existing = map.get(row.user_id)
        if (existing) {
          existing.total += row.brier_score
          existing.count += 1
        } else {
          map.set(row.user_id, {
            display_name: profile.display_name,
            avatar_url: profile.avatar_url,
            total: row.brier_score,
            count: 1,
          })
        }
      }

      entries = Array.from(map.entries())
        .map(([user_id, { display_name, avatar_url, total, count }]) => ({
          user_id,
          display_name,
          avatar_url,
          avg_brier_score: total / count,
          total_forecasts: count,
          resolved_forecasts: count,
        }))
        .sort((a, b) => a.avg_brier_score - b.avg_brier_score)
        .slice(0, 50)
    }
  }

  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-outfit font-bold mb-2">Leaderboard</h1>
        <p className="text-text-secondary">Ranked by calibration. A Brier score near 0 means your predictions matched what actually happened.</p>
      </div>

      {/* Period filter */}
      <div className="flex gap-2 mb-8">
        {[
          { label: 'All time', value: 'all' },
          { label: 'This month', value: 'month' },
          { label: 'This week', value: 'week' },
        ].map(({ label, value }) => (
          <a
            key={value}
            href={`/leaderboard?period=${value}`}
            className={`px-4 py-1.5 rounded-lg border text-sm transition-colors ${
              period === value
                ? 'border-accent-green text-accent-green bg-accent-green/10'
                : 'border-border-dark text-text-secondary hover:border-accent-green/30'
            }`}
          >
            {label}
          </a>
        ))}
      </div>

      {/* Table */}
      <div className="bg-bg-surface border border-border-dark rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border-dark text-text-secondary text-sm">
              <th className="text-left px-4 py-3 w-12">#</th>
              <th className="text-left px-4 py-3">Forecaster</th>
              <th className="text-right px-4 py-3">Brier Score</th>
              <th className="text-right px-4 py-3 hidden sm:table-cell">Predictions</th>
              <th className="text-right px-4 py-3 hidden md:table-cell">Resolved</th>
            </tr>
          </thead>
          <tbody>
            {entries.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-12 text-text-secondary">
                  No data available.
                </td>
              </tr>
            ) : (
              entries.map((entry, i) => {
                const isMe = user?.id === entry.user_id
                const rank = i + 1
                const medal = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : null

                return (
                  <tr
                    key={entry.user_id}
                    className={`border-b border-border-dark/50 hover:bg-white/[0.02] transition-colors ${
                      isMe ? 'bg-accent-green/5' : ''
                    }`}
                  >
                    <td className="px-4 py-3 text-text-secondary font-mono text-sm">
                      {medal ?? rank}
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/profile/${entry.display_name}`}
                        className="flex items-center gap-3 hover:text-accent-blue transition-colors"
                      >
                        {entry.avatar_url ? (
                          <Image
                            src={entry.avatar_url}
                            alt={entry.display_name}
                            width={32}
                            height={32}
                            className="rounded-full"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-border-dark flex items-center justify-center text-sm font-semibold text-accent-green">
                            {entry.display_name[0]?.toUpperCase()}
                          </div>
                        )}
                        <span className="font-medium">
                          {entry.display_name}
                          {isMe && (
                            <span className="ml-2 text-xs text-accent-green">(you)</span>
                          )}
                        </span>
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className={`font-mono font-bold ${
                        rank === 1 ? 'text-yellow-400' : rank <= 3 ? 'text-accent-green' : 'text-text-primary'
                      }`}>
                        {entry.avg_brier_score?.toFixed(4) ?? '—'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right text-text-secondary font-mono text-sm hidden sm:table-cell">
                      {entry.total_forecasts}
                    </td>
                    <td className="px-4 py-3 text-right text-text-secondary font-mono text-sm hidden md:table-cell">
                      {entry.resolved_forecasts}
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      {error && (
        <div className="mt-4 p-3 rounded-lg bg-danger/10 border border-danger/30 text-danger text-sm">
          Error: the leaderboard view may not exist yet. Check your SQL schema.
        </div>
      )}
    </div>
  )
}
