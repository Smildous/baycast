import type { Category } from '@/lib/types'
import { CATEGORY_COLORS } from '@/lib/utils'

interface Props {
  category: Category | string
}

export default function CategoryBadge({ category }: Props) {
  const cls = CATEGORY_COLORS[category] ?? CATEGORY_COLORS['Other']
  return (
    <span className={`px-2 py-0.5 rounded-full border text-xs font-medium ${cls}`}>
      {category}
    </span>
  )
}
