import Link from 'next/link'
import type { Block } from '@/lib/types'
import CategoryBadge from './CategoryBadge'

interface Props {
  block: Block
}

export default function BlockCard({ block }: Props) {
  return (
    <Link
      href={`/blocks/${block.id}`}
      className="block bg-bg-surface border border-border-dark rounded-xl p-5 hover:border-accent-green/40 transition-all hover:-translate-y-0.5 group"
    >
      <div className="flex items-start gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <CategoryBadge category={block.category} />
          </div>
          <h3 className="font-medium text-text-primary group-hover:text-white transition-colors mb-2">
            {block.title}
          </h3>
          {block.description && (
            <p className="text-sm text-text-secondary line-clamp-2 mb-3">
              {block.description}
            </p>
          )}
          <div className="text-text-secondary text-xs">
            {block.question_count ?? 0} question{(block.question_count ?? 0) !== 1 ? 's' : ''}
          </div>
        </div>

        {block.top_scorer && (
          <div className="shrink-0 text-right">
            <div className="text-lg font-mono font-bold text-accent-green">
              {block.top_scorer.avg_brier_score.toFixed(3)}
            </div>
            <div className="text-xs text-text-secondary truncate max-w-[120px]">
              {block.top_scorer.display_name}
            </div>
          </div>
        )}
      </div>
    </Link>
  )
}
