import Link from 'next/link'
import type { Question } from '@/lib/types'
import CategoryBadge from './CategoryBadge'
import Countdown from './Countdown'
import ProbBar from './ProbBar'

interface Props {
  question: Question
}

export default function QuestionCard({ question: q }: Props) {
  // BCP: Never show aggregate probability or exact forecaster count on list/card views.
  const hasForecasts = q.has_forecasts ?? (q.forecasters_count ?? 0) > 0

  return (
    <Link
      href={`/questions/${q.id}`}
      className="block bg-bg-surface border border-border-dark rounded-xl p-5 hover:border-accent-green/40 transition-all hover:-translate-y-0.5 group"
    >
      <div className="flex items-start gap-4">
        {/* Main content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <CategoryBadge category={q.category} />
            <Countdown closesAt={q.closes_at} status={q.status} />
          </div>
          <h3 className="font-medium text-text-primary group-hover:text-white transition-colors line-clamp-2 mb-3">
            {q.title}
          </h3>
          <div className="mt-2 text-text-secondary text-xs">
            {hasForecasts ? 'Join the forecast' : 'Be the first to forecast'}
          </div>
        </div>
      </div>
    </Link>
  )
}
