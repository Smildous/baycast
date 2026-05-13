import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'

// Ensure dynamic rendering so block detail is always fresh
export const dynamic = 'force-dynamic'
import Link from 'next/link'
import CategoryBadge from '@/components/CategoryBadge'
import type { Block, BlockLeaderboardEntry, Question, ScoreWithProfile } from '@/lib/types'

interface Props {
  params: { id: string }
}

export default async function BlockDetailPage({ params }: Props) {
  const supabase = createClient()

  // Fetch the block
  const { data: block } = await supabase
    .from('blocks')
    .select('*')
    .eq('id', params.id)
    .single()

  if (!block) {
    notFound()
  }

  // Fetch questions in this block (ordered by sort_order)
  const { data: blockQuestions } = await supabase
    .from('block_questions')
    .select('question_id, sort_order')
    .eq('block_id', params.id)
    .order('sort_order', { ascending: true })

  const questionIds = (blockQuestions ?? []).map((r: { question_id: string }) => r.question_id)

  // Fetch the actual questions
  let questions: Question[] = []
  if (questionIds.length > 0) {
    const { data } = await supabase
      .from('questions')
      .select('*')
      .in('id', questionIds)

    questions = (data ?? []) as Question[]

    // Sort by block_questions sort_order
    const orderMap = new Map(questionIds.map((id, i) => [id, i]))
    questions.sort((a, b) => (orderMap.get(a.id) ?? 0) - (orderMap.get(b.id) ?? 0))
  }

  // Compute block leaderboard
  // Only consider resolved questions
  const resolvedIds = questions.filter((q) => q.status === 'resolved').map((q) => q.id)

  let leaderboard: BlockLeaderboardEntry[] = []
  if (resolvedIds.length > 0) {
    const { data: scoreRows } = await supabase
      .from('scores')
      .select('user_id, question_id, brier_score, profiles!inner(display_name, avatar_url)')
      .in('question_id', resolvedIds)

    if (scoreRows && scoreRows.length > 0) {
      // Group by user
      const userScores = new Map<string, {
        display_name: string
        avatar_url: string | null
        scores: number[]
        resolvedSet: Set<string>
      }>()

      for (const row of scoreRows as unknown as ScoreWithProfile[]) {
        const existing = userScores.get(row.user_id)
        const entry = existing ?? {
          display_name: row.profiles?.display_name ?? 'Unknown',
          avatar_url: row.profiles?.avatar_url ?? null,
          scores: [] as number[],
          resolvedSet: new Set<string>(),
        }
        entry.scores.push(row.brier_score)
        entry.resolvedSet.add(row.question_id)
        userScores.set(row.user_id, entry)
      }

      // Only include users who forecasted at least 50% of resolved questions
      const minForecasts = Math.ceil(resolvedIds.length * 0.5)

      const entries: BlockLeaderboardEntry[] = []
      for (const [userId, entry] of Array.from(userScores.entries())) {
        if (entry.scores.length >= minForecasts) {
          const avg = entry.scores.reduce((a, b) => a + b, 0) / entry.scores.length
          entries.push({
            user_id: userId,
            display_name: entry.display_name,
            avatar_url: entry.avatar_url,
            avg_brier_score: avg,
            resolved_count: entry.resolvedSet.size,
          })
        }
      }

      entries.sort((a, b) => a.avg_brier_score - b.avg_brier_score)
      leaderboard = entries
    }
  }

  const resolvedCount = questions.filter((q) => q.status === 'resolved').length

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Back link */}
      <Link
        href="/blocks"
        className="inline-flex items-center gap-1 text-sm text-text-secondary hover:text-text-primary mb-6 transition-colors"
      >
        ← Back to Blocks
      </Link>

      {/* Block header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <CategoryBadge category={block.category} />
          <span className="text-xs text-text-secondary">
            {questions.length} question{questions.length !== 1 ? 's' : ''} · {resolvedCount} resolved
          </span>
        </div>
        <h1 className="text-3xl font-outfit font-bold mb-2">{block.title}</h1>
        {block.description && (
          <p className="text-text-secondary">{block.description}</p>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Question list */}
        <div className="lg:col-span-2">
          <h2 className="text-lg font-outfit font-semibold mb-4">Questions</h2>
          {questions.length === 0 ? (
            <div className="text-center py-12 text-text-secondary border border-border-dark rounded-xl">
              No questions in this block yet.
            </div>
          ) : (
            <div className="space-y-3">
              {questions.map((q, i) => (
                <Link
                  key={q.id}
                  href={`/questions/${q.id}`}
                  className="block bg-bg-surface border border-border-dark rounded-xl p-4 hover:border-accent-green/40 transition-all group"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-sm text-text-secondary font-mono mt-0.5 w-6 shrink-0">
                      {i + 1}.
                    </span>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-text-primary group-hover:text-white transition-colors line-clamp-2 mb-1">
                        {q.title}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-text-secondary">
                        <span className={`px-2 py-0.5 rounded-full text-xs ${
                          q.status === 'resolved'
                            ? 'bg-accent-green/10 text-accent-green'
                            : q.status === 'closed'
                              ? 'bg-yellow-500/10 text-yellow-400'
                              : 'bg-blue-500/10 text-blue-400'
                        }`}>
                          {q.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Leaderboard sidebar */}
        <div>
          <h2 className="text-lg font-outfit font-semibold mb-4">Block Leaderboard</h2>
          {resolvedCount === 0 ? (
            <div className="bg-bg-surface border border-border-dark rounded-xl p-6 text-center text-text-secondary text-sm">
              No resolved questions yet. Leaderboard will appear once questions are resolved.
            </div>
          ) : leaderboard.length === 0 ? (
            <div className="bg-bg-surface border border-border-dark rounded-xl p-6 text-center text-text-secondary text-sm">
              No eligible forecasters yet. Forecast at least 50% of resolved questions to rank.
            </div>
          ) : (
            <div className="bg-bg-surface border border-border-dark rounded-xl divide-y divide-border-dark">
              {leaderboard.map((entry, i) => (
                <div key={i} className="flex items-center gap-3 px-4 py-3">
                  <span className={`text-sm font-bold w-6 text-center ${
                    i === 0
                      ? 'text-yellow-400'
                      : i === 1
                        ? 'text-gray-400'
                        : i === 2
                          ? 'text-orange-400'
                          : 'text-text-secondary'
                  }`}>
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-text-primary truncate">
                      {entry.display_name}
                    </div>
                    <div className="text-xs text-text-secondary">
                      {entry.resolved_count} resolved
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-sm font-mono font-bold text-accent-green">
                      {entry.avg_brier_score.toFixed(3)}
                    </div>
                    <div className="text-xs text-text-secondary">avg Brier</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
