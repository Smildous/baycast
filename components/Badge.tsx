import { BADGE_CONFIG } from '@/lib/types'
import type { BadgeTier } from '@/lib/types'
import { cn } from '@/lib/utils'

interface BadgeProps {
  tier: BadgeTier
  variant?: 'pill' | 'inline'  // default: 'pill'
  showName?: boolean           // default: true (ignored for inline)
  className?: string
}

/**
 * Badge display component for user profile badges.
 *
 * - `variant="pill"`: Renders emoji + tier name in a colored rounded pill.
 * - `variant="inline"`: Renders emoji only (used in forecast lists).
 * - If `showName=false` with pill variant, renders just the emoji in a small colored circle.
 */
export default function Badge({
  tier,
  variant = 'pill',
  showName = true,
  className,
}: BadgeProps) {
  const config = BADGE_CONFIG[tier]

  if (variant === 'inline') {
    return (
      <span className={cn('text-base leading-none', className)} title={config.name}>
        {config.emoji}
      </span>
    )
  }

  // Pill variant
  if (!showName) {
    return (
      <span
        className={cn(
          'inline-flex items-center justify-center w-6 h-6 rounded-full text-xs',
          className
        )}
        style={{ backgroundColor: config.color, color: 'white' }}
        title={config.name}
      >
        {config.emoji}
      </span>
    )
  }

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold',
        className
      )}
      style={{ backgroundColor: config.color, color: 'white' }}
    >
      <span className="leading-none">{config.emoji}</span>
      <span>{config.name}</span>
    </span>
  )
}
