import { createClient } from '@/lib/supabase/server'
import QuestionCard from '@/components/QuestionCard'
import type { Question } from '@/lib/types'
import { CATEGORIES, normalizeCategory } from '@/lib/types'
import { autoCloseExpiredQuestions, aggregateProbabilities } from '@/lib/utils'

const PAGE_SIZE = 10

interface Props {
  searchParams: { category?: string; status?: string; page?: string }
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

/**
 * Build a query string from an explicit set of params.
 * Always starts from scratch — never appends to existing params,
 * which prevents query param accumulation bugs.
 */
function buildQueryString(params: Record<string, string | undefined>): string {
  const parts = Object.entries(params)
    .filter(([, v]) => v !== undefined && v !== '')
    .map(([k, v]) => `${k}=${encodeURIComponent(v!)}`)
  return parts.length > 0 ? `?${parts.join('&')}` : ''
}

export default async function QuestionsPage({ searchParams }: Props) {
  const supabase = createClient()
  await autoCloseExpiredQuestions(supabase)

  // Normalize the incoming category filter so lowercase/shorthand values
  // (e.g. "tech", "economy") match the canonical capitalized form in the DB.
  const normalizedCategory = searchParams.category
    ? normalizeCategory(searchParams.category)
    : undefined

  // Pagination: parse page param, default to 1
  const currentPage = Math.max(1, parseInt(searchParams.page ?? '1', 10) || 1)

  let query = supabase.from('questions').select('*', { count: 'exact' }).order('closes_at', { ascending: true })

  if (normalizedCategory) {
    // Use eq for exact matching — categories are already normalized via normalizeCategory
    query = query.eq('category', normalizedCategory)
  }
  if (searchParams.status) {
    query = query.eq('status', searchParams.status)
  } else {
    query = query.eq('status', 'open')
  }

  // Server-side pagination using .range()
  const from = (currentPage - 1) * PAGE_SIZE
  const to = from + PAGE_SIZE - 1
  const { data, count } = await query.range(from, to)
  const questions = (data ?? []) as Question[]
  const totalCount = count ?? 0
  const totalPages = Math.ceil(totalCount / PAGE_SIZE)

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

  // Helper to build filter hrefs using explicit param map to prevent accumulation.
  // Same-group filters replace; cross-group filters add.
  const filterHref = (overrides: Record<string, string | undefined>) => {
    const base: Record<string, string | undefined> = {}
    if (normalizedCategory) base.category = normalizedCategory
    if (searchParams.status) base.status = searchParams.status
    for (const [k, v] of Object.entries(overrides)) {
      if (v === undefined) {
        delete base[k]
      } else {
        base[k] = v
      }
    }
    return `/questions${buildQueryString(base)}`
  }

  // Helper to build pagination hrefs preserving filters
  const pageHref = (page: number) => {
    const base: Record<string, string | undefined> = {}
    if (normalizedCategory) base.category = normalizedCategory
    if (searchParams.status) base.status = searchParams.status
    if (page > 1) base.page = String(page)
    return `/questions${buildQueryString(base)}`
  }

  // Page numbers to display (show up to 5 pages around current)
  const getPageNumbers = (): (number | '...')[] => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }
    const pages: (number | '...')[] = [1]
    const start = Math.max(2, currentPage - 1)
    const end = Math.min(totalPages - 1, currentPage + 1)
    if (start > 2) pages.push('...')
    for (let i = start; i <= end; i++) pages.push(i)
    if (end < totalPages - 1) pages.push('...')
    pages.push(totalPages)
    return pages
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-outfit font-bold mb-2">Questions</h1>
        <p className="text-text-secondary">Every forecast you add sharpens the collective estimate.</p>
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        <a
          href={filterHref({ category: undefined })}
          className={`px-4 py-1.5 rounded-full border text-sm transition-colors ${
            !normalizedCategory
              ? 'border-accent-green text-accent-green bg-accent-green/10'
              : 'border-border-dark text-text-secondary hover:border-accent-green/50'
          }`}
        >
          All
        </a>
        {CATEGORIES.map((cat) => (
          <a
            key={cat}
            href={filterHref({ category: cat })}
            className={`px-4 py-1.5 rounded-full border text-sm transition-colors ${
              normalizedCategory === cat
                ? 'border-accent-green text-accent-green bg-accent-green/10'
                : 'border-border-dark text-text-secondary hover:border-accent-green/50'
            }`}
          >
            {cat}
          </a>
        ))}
      </div>

      {/* Status filter */}
      <div className="flex gap-2 mb-8">
        {[
          { label: 'Open', value: 'open' },
          { label: 'Closed', value: 'closed' },
          { label: 'Resolved', value: 'resolved' },
        ].map(({ label, value }) => {
          // "Open" is active when status is explicitly 'open' or not set (default)
          const isActive = label === 'Open'
            ? (searchParams.status === undefined || searchParams.status === 'open')
            : searchParams.status === value
          return (
            <a
              key={label}
              href={filterHref({ status: value })}
              className={`px-4 py-1.5 rounded-lg border text-sm transition-colors ${
                isActive
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
        <>
          <div className="space-y-3">
            {enriched.map((q) => (
              <QuestionCard key={q.id} question={q} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <nav className="flex items-center justify-center gap-1 mt-8" aria-label="Pagination">
              {/* Previous */}
              {currentPage > 1 ? (
                <a
                  href={pageHref(currentPage - 1)}
                  className="px-3 py-2 rounded-lg border border-border-dark text-sm text-text-secondary hover:border-accent-green/50 hover:text-white transition-colors"
                >
                  ← Prev
                </a>
              ) : (
                <span className="px-3 py-2 rounded-lg border border-border-dark/50 text-sm text-text-secondary/40 cursor-not-allowed">
                  ← Prev
                </span>
              )}

              {/* Page numbers */}
              {getPageNumbers().map((page, idx) =>
                page === '...' ? (
                  <span key={`ellipsis-${idx}`} className="px-2 py-2 text-text-secondary text-sm">
                    …
                  </span>
                ) : (
                  <a
                    key={page}
                    href={pageHref(page)}
                    className={`px-3 py-2 rounded-lg border text-sm transition-colors ${
                      currentPage === page
                        ? 'border-accent-green text-accent-green bg-accent-green/10'
                        : 'border-border-dark text-text-secondary hover:border-accent-green/50 hover:text-white'
                    }`}
                  >
                    {page}
                  </a>
                )
              )}

              {/* Next */}
              {currentPage < totalPages ? (
                <a
                  href={pageHref(currentPage + 1)}
                  className="px-3 py-2 rounded-lg border border-border-dark text-sm text-text-secondary hover:border-accent-green/50 hover:text-white transition-colors"
                >
                  Next →
                </a>
              ) : (
                <span className="px-3 py-2 rounded-lg border border-border-dark/50 text-sm text-text-secondary/40 cursor-not-allowed">
                  Next →
                </span>
              )}
            </nav>
          )}
        </>
      )}
    </div>
  )
}
