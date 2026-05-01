import { createClient } from '@/lib/supabase/server'
import BlockCard from '@/components/BlockCard'
import type { Block } from '@/lib/types'

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
        <div className="text-center py-16 text-text-secondary border border-border-dark rounded-xl">
          No blocks available yet.
        </div>
      </div>
    )
  }

  // For each block, fetch question count and top scorer
  const enriched: Block[] = await Promise.all(
    blocks.map(async (block) => {
      // Question count
      const { count } = await supabase
        .from('block_questions')
        .select('question_id', { count: 'exact', head: true })
        .eq('block_id', block.id)

      // Top scorer: users ranked by avg Brier score for resolved questions in this block
      // First get the question IDs in this block that are resolved
      const { data: bq } = await supabase
        .from('block_questions')
        .select('question_id')
        .eq('block_id', block.id)

      const questionIds = (bq ?? []).map((r: { question_id: string }) => r.question_id)

      let topScorer: { display_name: string; avg_brier_score: number } | null = null

      if (questionIds.length > 0) {
        // Get resolved question IDs
        const { data: resolvedQs } = await supabase
          .from('questions')
          .select('id')
          .in('id', questionIds)
          .eq('status', 'resolved')

        const resolvedIds = (resolvedQs ?? []).map((r: { id: string }) => r.id)

        if (resolvedIds.length > 0) {
          // Get scores for these resolved questions, join profiles
          const { data: scoreRows } = await supabase
            .from('scores')
            .select('user_id, brier_score, profiles!inner(display_name)')
            .in('question_id', resolvedIds)

          if (scoreRows && scoreRows.length > 0) {
            // Group by user and compute avg Brier
            const userScores = new Map<string, { name: string; scores: number[] }>()
            for (const row of scoreRows as any[]) {
              const existing = userScores.get(row.user_id)
              const entry = existing ?? {
                name: (row.profiles?.display_name ?? 'Unknown') as string,
                scores: [] as number[],
              }
              entry.scores.push(row.brier_score as number)
              userScores.set(row.user_id, entry)
            }

            // Only include users who forecasted at least 50% of resolved questions
            const minForecasts = Math.ceil(resolvedIds.length * 0.5)
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
        }
      }

      return {
        ...block,
        question_count: count ?? 0,
        top_scorer: topScorer,
      } as Block
    })
  )

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
