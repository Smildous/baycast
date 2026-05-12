import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { normalizeCategory, getCategoryVariants } from '@/lib/types'
import type { Category, Question } from '@/lib/types'
import CategoryBadge from './CategoryBadge'
import { formatDate } from '@/lib/utils'

interface Props {
  currentQuestionId: string
  category: string
}

async function getRelatedQuestions(currentQuestionId: string, category: string) {
  const supabase = createClient()
  const canonical = normalizeCategory(category)
  const variants = getCategoryVariants(canonical)

  const { data } = await supabase
    .from('questions')
    .select('id, title, category, closes_at, status')
    .in('category', variants)
    .neq('id', currentQuestionId)
    .in('status', ['open', 'closed'])
    .order('closes_at', { ascending: true })
    .limit(3)

  return (data ?? []) as Pick<Question, 'id' | 'title' | 'category' | 'closes_at' | 'status'>[]
}

export default async function RelatedQuestions({ currentQuestionId, category }: Props) {
  const related = await getRelatedQuestions(currentQuestionId, category)

  if (related.length === 0) return null

  return (
    <section className="mt-12">
      <h2 className="text-xl font-outfit font-semibold mb-4">Related Questions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {related.map((q) => (
          <Link
            key={q.id}
            href={`/questions/${q.id}`}
            className="block bg-bg-surface border border-border-dark rounded-xl p-4 hover:border-accent-green/40 transition-all hover:-translate-y-0.5 group"
          >
            <div className="flex items-center gap-2 mb-2">
              <CategoryBadge category={q.category} />
            </div>
            <h3 className="font-medium text-text-primary group-hover:text-white transition-colors line-clamp-2 text-sm mb-3">
              {q.title}
            </h3>
            <div className="flex items-center gap-2 text-text-secondary text-xs">
              {/* Calendar icon */}
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="3" width="12" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.2" fill="none" />
                <path d="M2 7h12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                <path d="M5 1v3M11 1v3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              <span>{q.closes_at ? formatDate(q.closes_at) : 'TBD'}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
