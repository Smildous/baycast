import { createClient } from '@/lib/supabase/server'
import QuestionCard from '@/components/QuestionCard'
import type { Question } from '@/lib/types'
import { CATEGORIES, normalizeCategory } from '@/lib/types'
import { autoCloseExpiredQuestions, aggregateProbabilities } from '@/lib/utils'

interface Props {
  searchParams: { category?: string; status?: string }
}

// Récupère les prévisions agrégées pour un ensemble de questions
async function fetchAggregates(
  supabase: any,
  questionIds: string[]
): Promise<Map<string, { avg: number; count: number }>> {
  if (questionIds.length === 0) return new Map()
  const { data } = await supabase
    .from('forecasts')
    .select('question_id, prediction')
    .in('question_id', questionIds)
  if (!data) return new Map()

  const grouped = new Map<string, number[]>()
  for (const row of data) {
    const probs = grouped.get(row.question_id) ?? []
    probs.push((row.prediction as { probability: number }).probability)
    grouped.set(row.question_id, probs)
  }

  const result = new Map<string, { avg: number; count: number }>()
  for (const [qid, probs] of Array.from(grouped.entries())) {
    result.set(qid, { avg: aggregateProbabilities(probs), count: probs.length })
  }
  return result
}

export default async function QuestionsPage({ searchParams }: Props) {
  const supabase = createClient()
  await autoCloseExpiredQuestions(supabase)

  // Normalize the incoming category filter so lowercase/shorthand values
  // (e.g. "tech", "economy") match the canonical capitalized form in the DB.
  const normalizedCategory = searchParams.category
    ? normalizeCategory(searchParams.category)
    : undefined

  let query = supabase.from('questions').select('*').order('closes_at', { ascending: true })

  if (normalizedCategory) {
    // Use ilike for case-insensitive matching — handles DB data with different casing
    query = query.ilike('category', normalizedCategory)
  }
  if (searchParams.status) {
    query = query.eq('status', searchParams.status)
  } else {
    query = query.eq('status', 'open')
  }

  const { data } = await query
  const questions = (data ?? []) as Question[]

  // Récupère les probabilités agrégées et le nombre de prévisionnistes
  const ids = questions.map((q) => q.id)
  const aggregates = await fetchAggregates(supabase, ids)
  const enriched = questions.map((q) => {
    const agg = aggregates.get(q.id)
    return {
      ...q,
      aggregate_probability: agg?.avg ?? undefined,
      forecasters_count: agg?.count ?? 0,
    }
  })

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-outfit font-bold mb-2">Questions</h1>
        <p className="text-text-secondary">Every forecast you add sharpens the collective estimate.</p>
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        <a
          href={searchParams.status ? `/questions?status=${searchParams.status}` : '/questions'}
          className={`px-4 py-1.5 rounded-full border text-sm transition-colors ${
            !normalizedCategory
              ? 'border-accent-green text-accent-green bg-accent-green/10'
              : 'border-border-dark text-text-secondary hover:border-accent-green/50'
          }`}
        >
          All
        </a>
        {CATEGORIES.map((cat) => {
          const statusParam = searchParams.status ? `status=${searchParams.status}` : ''
          const qs = `category=${encodeURIComponent(cat)}${statusParam ? `&${statusParam}` : ''}`
          return (
            <a
              key={cat}
              href={`/questions?${qs}`}
              className={`px-4 py-1.5 rounded-full border text-sm transition-colors ${
                normalizedCategory === cat
                  ? 'border-accent-green text-accent-green bg-accent-green/10'
                  : 'border-border-dark text-text-secondary hover:border-accent-green/50'
              }`}
            >
              {cat}
            </a>
          )
        })}
      </div>

      {/* Status filter */}
      <div className="flex gap-2 mb-8">
        {[
          { label: 'Open', value: undefined },
          { label: 'Closed', value: 'closed' },
          { label: 'Resolved', value: 'resolved' },
        ].map(({ label, value }) => {
          // Conserver le paramètre category dans les liens de statut
          const catParam = normalizedCategory ? `category=${encodeURIComponent(normalizedCategory)}` : ''
          const statusParam = value ? `status=${value}` : ''
          const qs = [catParam, statusParam].filter(Boolean).join('&')
          const href = `/questions${qs ? `?${qs}` : ''}`

          return (
            <a
              key={label}
              href={href}
              className={`px-4 py-1.5 rounded-lg border text-sm transition-colors ${
                (searchParams.status ?? undefined) === value
                  ? 'border-accent-blue text-accent-blue bg-accent-blue/10'
                  : 'border-border-dark text-text-secondary hover:border-accent-blue/30'
              }`}
            >
              {label}
            </a>
          )
        })}
      </div>

      {enriched.length === 0 ? (
        <div className="text-center py-16 text-text-secondary border border-border-dark rounded-xl">
          No questions in this category.
        </div>
      ) : (
        <div className="space-y-3">
          {enriched.map((q) => (
            <QuestionCard key={q.id} question={q} />
          ))}
        </div>
      )}
    </div>
  )
}
