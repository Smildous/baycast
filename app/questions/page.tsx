import { Suspense } from 'react'
import { createClient } from '@/lib/supabase/server'
import QuestionsList from '@/components/QuestionsList'
import WelcomeBanner from '@/components/WelcomeBanner'
import QuestionCard from '@/components/QuestionCard'
import type { Question } from '@/lib/types'
import { CATEGORIES, normalizeCategory } from '@/lib/types'
import { autoCloseExpiredQuestions, aggregateProbabilities, isClosingSoon } from '@/lib/utils'
import { buildSEO } from '@/lib/seo'

export const metadata = buildSEO({
  title: 'Browse Prediction Questions',
  description: 'Browse open forecasting questions. Submit your probability estimates and get scored on accuracy.',
  path: '/questions',
  ogImage: '/opengraph-image',
})

// Ensure dynamic rendering so filters and counts reflect live DB state
export const dynamic = 'force-dynamic'

const PAGE_SIZE = 10
const CLOSING_SOON_WINDOW_DAYS = 14

type SortOption = 'closing-soon' | 'newest' | 'most-active'

const SORT_OPTIONS: { label: string; value: SortOption }[] = [
  { label: 'Closing Soon', value: 'closing-soon' },
  { label: 'Newest', value: 'newest' },
  { label: 'Most Active', value: 'most-active' },
]

interface Props {
  searchParams: { category?: string; status?: string; page?: string; sort?: string }
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
  // (e.g. "tech", "economy") match the canonical capitalized form.
  const normalizedCategory = searchParams.category
    ? normalizeCategory(searchParams.category)
    : undefined

  // Parse sort option
  const validSorts = new Set<string>(SORT_OPTIONS.map(s => s.value))
  const sortOption: SortOption = validSorts.has(searchParams.sort ?? '')
    ? (searchParams.sort as SortOption)
    : 'newest'

  // Pagination: parse page param, default to 1
  const currentPage = Math.max(1, parseInt(searchParams.page ?? '1', 10) || 1)

  const statusFilter = searchParams.status || 'open'

  // Fetch all questions for the current status — category filtering
  // is done client-side via normalizeCategory() for reliability.
  const { data: allData } = await supabase
    .from('questions')
    .select('*')
    .eq('status', statusFilter)

  const allQuestions = (allData ?? []) as Question[]

  // Client-side category filter using normalizeCategory() for
  // reliable matching regardless of DB casing/aliases.
  const filtered = normalizedCategory
    ? allQuestions.filter(q => normalizeCategory(q.category) === normalizedCategory)
    : allQuestions

  // Fetch open questions separately so the open count and "Closing Soon"
  // section both respect the active category filter.
  const { data: openData } = await supabase
    .from('questions')
    .select('*')
    .eq('status', 'open')

  const openQuestions = (openData ?? []) as Question[]
  const filteredOpenQuestions = normalizedCategory
    ? openQuestions.filter(q => normalizeCategory(q.category) === normalizedCategory)
    : openQuestions
  const openCount = filteredOpenQuestions.length

  // "Closing Soon" should only include genuinely near-term questions.
  const closingSoonQuestions = filteredOpenQuestions
    .filter((q) => isClosingSoon(q.closes_at, CLOSING_SOON_WINDOW_DAYS))
    .sort((a, b) => new Date(a.closes_at).getTime() - new Date(b.closes_at).getTime())
    .slice(0, 3)

  const showClosingSoon = statusFilter === 'open' && sortOption !== 'closing-soon' && closingSoonQuestions.length > 0
  let closingSoonEnriched: Question[] = []

  if (showClosingSoon) {
    const csIds = closingSoonQuestions.map(q => q.id)
    const csAggregates = await fetchAggregates(supabase, csIds)
    closingSoonEnriched = closingSoonQuestions.map(q => {
      const agg = csAggregates.get(q.id)
      return {
        ...q,
        aggregate_probability: agg?.avg ?? undefined,
        forecasters_count: agg?.count ?? 0,
      }
    })
  }

  // Server-side sort. The explicit "Closing Soon" filter should not show
  // long-range questions just because they are the next to close overall.
  const sortableQuestions = sortOption === 'closing-soon'
    ? filtered.filter((q) => isClosingSoon(q.closes_at, CLOSING_SOON_WINDOW_DAYS))
    : filtered

  const sorted = [...sortableQuestions].sort((a, b) => {
    switch (sortOption) {
      case 'newest':
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      case 'most-active':
        return (b.forecasters_count ?? 0) - (a.forecasters_count ?? 0)
      case 'closing-soon':
      default:
        return new Date(a.closes_at).getTime() - new Date(b.closes_at).getTime()
    }
  })
  const headerOpenCount = statusFilter === 'open' ? sorted.length : openCount

  // Exclude questions already shown in the Closing Soon section from the main list
  const closingSoonIds = new Set(closingSoonQuestions.map(q => q.id))
  const mainQuestions = showClosingSoon
    ? sorted.filter(q => !closingSoonIds.has(q.id))
    : sorted

  // Client-side pagination
  const totalCount = mainQuestions.length
  const totalPages = Math.ceil(totalCount / PAGE_SIZE)
  const from = (currentPage - 1) * PAGE_SIZE
  const to = from + PAGE_SIZE - 1
  const questions = mainQuestions.slice(from, to + 1)

  // Fetch aggregates for paginated questions
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

  // Only show category buttons that have at least 1 question (AQ-105)
  const categoriesWithQuestions = CATEGORIES.filter((cat) =>
    allQuestions.some((q) => normalizeCategory(q.category) === cat)
  )

  // Helper to build filter hrefs using explicit param map to prevent accumulation.
  // Same-group filters replace; cross-group filters add.
  const filterHref = (overrides: Record<string, string | undefined>) => {
    const base: Record<string, string | undefined> = {}
    if (normalizedCategory) base.category = normalizedCategory
    if (searchParams.status) base.status = searchParams.status
    if (sortOption !== 'newest') base.sort = sortOption
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
    if (sortOption !== 'newest') base.sort = sortOption
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
      {/* Welcome banner for new users */}
      <Suspense fallback={null}>
        <WelcomeBanner />
      </Suspense>

      <div className="mb-8">
        <h1 className="text-3xl font-outfit font-bold mb-2">
          Questions
          <span className="text-lg font-normal text-text-secondary ml-2">
            ({headerOpenCount} open)
          </span>
        </h1>
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
        {categoriesWithQuestions.map((cat) => (
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

      {/* Status filter + Sort controls */}
      <div className="flex flex-wrap items-center gap-2 mb-8">
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

        {/* Sort separator */}
        <span className="text-border-dark mx-1 hidden sm:inline">|</span>

        {/* Sort controls */}
        {SORT_OPTIONS.map(({ label, value }) => {
          const isActive = sortOption === value
          return (
            <a
              key={value}
              href={filterHref({ sort: value })}
              className={`px-4 py-1.5 rounded-lg border text-sm transition-colors ${
                isActive
                  ? 'border-accent-green text-accent-green bg-accent-green/10'
                  : 'border-border-dark text-text-secondary hover:border-accent-green/30'
              }`}
            >
              {label}
            </a>
          )
        })}
      </div>

      {/* Closing Soon section */}
      {showClosingSoon && closingSoonEnriched.length > 0 && (
        <div className="mb-8 border border-amber-500/30 bg-amber-500/5 rounded-xl p-5">
          <h2 className="text-lg font-outfit font-semibold mb-4 text-amber-400">
            ⚡ Closing Soon
          </h2>
          <div className="space-y-3">
            {closingSoonEnriched.map((q) => (
              <QuestionCard key={q.id} question={q} />
            ))}
          </div>
        </div>
      )}

      <QuestionsList questions={enriched} />

      {/* Pagination */}
      {enriched.length > 0 && totalPages > 1 && (
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
    </div>
  )
}
