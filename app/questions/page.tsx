import { createClient } from '@/lib/supabase/server'
import QuestionCard from '@/components/QuestionCard'
import type { Question, Category } from '@/lib/types'

const CATEGORIES: Category[] = ['Politics', 'Technology', 'Economy', 'Science', 'Sports', 'Culture', 'Other']

interface Props {
  searchParams: { category?: string; status?: string }
}

export default async function QuestionsPage({ searchParams }: Props) {
  const supabase = createClient()

  let query = supabase.from('questions').select('*').order('closes_at', { ascending: true })

  if (searchParams.category) {
    query = query.eq('category', searchParams.category)
  }
  if (searchParams.status) {
    query = query.eq('status', searchParams.status)
  } else {
    query = query.eq('status', 'open')
  }

  const { data } = await query
  const questions = (data ?? []) as Question[]

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-outfit font-bold mb-2">Questions</h1>
        <p className="text-text-secondary">Browse open questions and submit your predictions.</p>
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        <a
          href="/questions"
          className={`px-4 py-1.5 rounded-full border text-sm transition-colors ${
            !searchParams.category
              ? 'border-accent-green text-accent-green bg-accent-green/10'
              : 'border-border-dark text-text-secondary hover:border-accent-green/50'
          }`}
        >
          All
        </a>
        {CATEGORIES.map((cat) => (
          <a
            key={cat}
            href={`/questions?category=${cat}`}
            className={`px-4 py-1.5 rounded-full border text-sm transition-colors ${
              searchParams.category === cat
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
          { label: 'Open', value: undefined },
          { label: 'Closed', value: 'closed' },
          { label: 'Resolved', value: 'resolved' },
        ].map(({ label, value }) => (
          <a
            key={label}
            href={value ? `/questions?status=${value}` : '/questions'}
            className={`px-4 py-1.5 rounded-lg border text-sm transition-colors ${
              (searchParams.status ?? undefined) === value
                ? 'border-accent-blue text-accent-blue bg-accent-blue/10'
                : 'border-border-dark text-text-secondary hover:border-accent-blue/30'
            }`}
          >
            {label}
          </a>
        ))}
      </div>

      {questions.length === 0 ? (
        <div className="text-center py-16 text-text-secondary border border-border-dark rounded-xl">
          No questions in this category.
        </div>
      ) : (
        <div className="space-y-3">
          {questions.map((q) => (
            <QuestionCard key={q.id} question={q} />
          ))}
        </div>
      )}
    </div>
  )
}
