import { createClient } from '@/lib/supabase/server'
import BlockCard from '@/components/BlockCard'

// Ensure dynamic rendering so blocks reflect live data
export const dynamic = 'force-dynamic'
import EmptyState from '@/components/EmptyState'
import type { Block, BlockQuestion, ScoreWithProfile } from '@/lib/types'

export default async function BlocksPage() {
  const supabase = createClient()

  // Fetch all blocks
  const { data: blocks } = await supabase
    .from('blocks')
    .select('*')
    .order('created_at', { ascending: false })

  if (!blocks || blocks.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-outfit font-bold mb-2">Question Blocks</h1>
          <p className="text-text-secondary">Compete on themed groups of related questions.</p>
        </div>
        <div className="bg-bg-surface border border-border-dark rounded-xl">
          <EmptyState
            icon="🧩"
            title="No blocks available yet"
            description="Question blocks are themed groups of related questions. Check back soon or browse individual questions in the meantime."
            cta={{ label: 'Browse Questions', href: '/questions' }}
          />
        </div>
      </div>
    )
  }

  // ── Batch fetch all data (avoids N+1) ──

  const blockIds = blocks.map((b) => b.id)

  // 1. All block_questions for these blocks
  const { data: allBQ } = await supabase
    .from('block_questions')
    .select('block_id, question_id')
    .in('block_id', blockIds)

  const bqRows = (allBQ ?? []) as Pick<BlockQuestion, 'block_id' | 'question_id'>[]

  // Group question IDs by block_id
  const questionsByBlock = new Map<string, string[]>()
  const allQuestionIdsSet = new Set<string>()
  for (const row of bqRows) {
    const list = questionsByBlock.get(row.block_id) ?? []
    list.push(row.question_id)
    questionsByBlock.set(row.block_id, list)
    allQuestionIdsSet.add(row.question_id)
  }
  const allQuestionIds = Array.from(allQuestionIdsSet)

  // 2. All resolved questions among those IDs
  let resolvedIds: string[] = []
  if (allQuestionIds.length > 0) {
    const { data: resolvedQs } = await supabase
      .from('questions')
      .select('id')
      .in('id', allQuestionIds)
      .eq('status', 'resolved')
    resolvedIds = (resolvedQs ?? []).map((r) => r.id)
  }
  const resolvedSet = new Set(resolvedIds)

  // 3. All scores for resolved questions (joined with profiles)
  let scoreRows: ScoreWithProfile[] = []
  if (resolvedIds.length > 0) {
    const { data } = await supabase
      .from('scores')
      .select('user_id, question_id, brier_score, profiles!inner(display_name)')
      .in('question_id', resolvedIds)
    scoreRows = (data ?? []) as unknown as ScoreWithProfile[]
  }

  // Build index: question_id -> score entries for that question
  const scoresByQuestion = new Map<string, ScoreWithProfile[]>()
  for (const row of scoreRows) {
    const list = scoresByQuestion.get(row.question_id) ?? []
    list.push(row)
    scoresByQuestion.set(row.question_id, list)
  }

  // ── Enrich each block in-memory ──

  const enriched: Block[] = blocks.map((block) => {
    const blockQuestionIds = questionsByBlock.get(block.id) ?? []
    const questionCount = blockQuestionIds.length
    const blockResolvedIds = blockQuestionIds.filter((id) => resolvedSet.has(id))

    let topScorer: { display_name: string; avg_brier_score: number } | null = null

    if (blockResolvedIds.length > 0) {
      const userScores = new Map<string, { name: string; scores: number[] }>()
      for (const qid of blockResolvedIds) {
        const rows = scoresByQuestion.get(qid) ?? []
        for (const row of rows) {
          const existing = userScores.get(row.user_id)
          const entry = existing ?? {
            name: row.profiles.display_name,
            scores: [] as number[],
          }
          entry.scores.push(row.brier_score)
          userScores.set(row.user_id, entry)
        }
      }

      const minForecasts = Math.ceil(blockResolvedIds.length * 0.5)
      let bestAvg = Infinity
      let bestName = ''

      for (const [, entry] of Array.from(userScores.entries())) {
        if (entry.scores.length >= minForecasts) {
          const avg = entry.scores.reduce((a, b) => a + b, 0) / entry.scores.length
          if (avg < bestAvg) {
            bestAvg = avg
            bestName = entry.name
          }
        }
      }

      if (bestAvg < Infinity) {
        topScorer = { display_name: bestName, avg_brier_score: bestAvg }
      }
    }

    return {
      ...block,
      question_count: questionCount,
      top_scorer: topScorer,
    } as Block
  })

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-outfit font-bold mb-2">Question Blocks</h1>
        <p className="text-text-secondary">Compete on themed groups of related questions.</p>
      </div>

      <div className="space-y-3">
        {enriched.map((block) => (
          <BlockCard key={block.id} block={block} />
        ))}
      </div>
    </div>
  )
}
