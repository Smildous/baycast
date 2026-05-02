import { BADGE_CONFIG, BADGE_TIER_ORDER, calculateBadgeTier } from '@/lib/types'
import type { BadgeTier, Profile } from '@/lib/types'
import Badge from './Badge'

interface ProfileBadgeSectionProps {
  profile: Profile
}

/**
 * Profile badge section showing the user's current badge tier with
 * progress bar toward the next tier.
 *
 * - Displays badge prominently with tier name and progress to next tier.
 * - Shows a progress bar: `(resolved - currentMin) / (nextMin - currentMin)`.
 * - If at Oracle tier, shows "Max tier reached".
 * - Users without any resolved forecasts show no badge.
 */
export default function ProfileBadgeSection({ profile }: ProfileBadgeSectionProps) {
  const resolvedCount = profile.resolved_forecast_count ?? 0

  // Don't show badge for users with no resolved forecasts (spec: avoid cluttering new users)
  if (resolvedCount === 0 && !profile.badge_ever_reached) {
    return null
  }

  // Determine display tier (never downgrade)
  const currentTier = profile.badge_tier
    ? calculateBadgeTier(resolvedCount)
    : 'rookie'
  const everReached = profile.badge_ever_reached ?? 'rookie'

  const currentIdx = BADGE_TIER_ORDER.indexOf(currentTier)
  const everIdx = BADGE_TIER_ORDER.indexOf(everReached)
  const displayTier: BadgeTier = BADGE_TIER_ORDER[Math.max(currentIdx, everIdx)]

  const config = BADGE_CONFIG[displayTier]

  // Calculate progress to next tier
  const nextTierIdx = Math.min(currentIdx + 1, BADGE_TIER_ORDER.length - 1)
  const isMaxTier = currentIdx >= BADGE_TIER_ORDER.length - 1 && everIdx >= BADGE_TIER_ORDER.length - 1

  let progressPercent = 0
  let progressLabel = ''
  let nextTierName = ''

  if (isMaxTier) {
    progressPercent = 100
    progressLabel = '🏆 Max tier reached'
  } else {
    const currentMin = config.minResolved
    const nextTierConfig = BADGE_CONFIG[BADGE_TIER_ORDER[nextTierIdx]]
    const nextMin = nextTierConfig.minResolved
    const range = nextMin - currentMin
    const progress = Math.max(0, Math.min(range, resolvedCount - currentMin))
    progressPercent = range > 0 ? (progress / range) * 100 : 100
    nextTierName = nextTierConfig.name
    const remaining = Math.max(0, nextMin - resolvedCount)
    progressLabel = `${resolvedCount} / ${nextMin} resolved`
  }

  return (
    <div className="bg-bg-surface border border-border-dark rounded-xl p-4">
      <div className="flex items-center gap-3 mb-3">
        <Badge tier={displayTier} variant="pill" showName />
      </div>

      {/* Progress bar */}
      <div className="mb-2">
        <div className="w-full h-2 bg-bg-primary rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{
              width: `${progressPercent}%`,
              backgroundColor: config.color,
            }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-text-secondary">
        <span>{progressLabel}</span>
        {!isMaxTier && (
          <span>
            {Math.max(0, BADGE_CONFIG[BADGE_TIER_ORDER[nextTierIdx]].minResolved - resolvedCount)} more to reach{' '}
            <span className="font-medium">{BADGE_CONFIG[BADGE_TIER_ORDER[nextTierIdx]].name}</span>{' '}
            {BADGE_CONFIG[BADGE_TIER_ORDER[nextTierIdx]].emoji}
          </span>
        )}
      </div>
    </div>
  )
}
