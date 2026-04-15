import Link from 'next/link'
import type { Question } from '@/lib/types'
import CategoryBadge from './CategoryBadge'
import Countdown from './Countdown'
import ProbBar from './ProbBar'

interface Props {
  question: Question
}

export default function QuestionCard({ question: q }: Props) {
  const prob = q.aggregate_probability ?? null
  const forecasters = q.forecasters_count ?? 0

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
          {prob !== null && <ProbBar probability={prob} compact />}
          <div className="mt-2 text-text-secondary text-xs">
            {forecasters > 0 ? `${forecasters} forecaster${forecasters > 1 ? 's' : ''}` : 'Sois le premier'}
          </div>
        </div>

        {/* Probability display */}
        {prob !== null && (
          <div className="shrink-0 text-right">
            <div className="text-2xl font-mono font-bold text-accent-green">{prob}%</div>
            <div className="text-xs text-text-secondary">consensus</div>
          </div>
        )}
      </div>
    </Link>
  )
}
