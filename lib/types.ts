export type QuestionStatus = 'draft' | 'open' | 'closed' | 'resolved'
export type QuestionType = 'binary'
export type Category =
  | 'Politics'
  | 'Technology'
  | 'Economy'
  | 'Science'
  | 'Sports'
  | 'Culture'
  | 'AI'
  | 'Crypto'
  | 'Entertainment'
  | 'Other'

/**
 * Canonical categories keyed by lowercase lookup.
 * Includes all known DB variants from migration_005_normalize_categories.sql
 * so categories display correctly even when the migration hasn't been run.
 */
export const CATEGORY_ALIASES: Record<string, Category> = {
  // Politics
  politics: 'Politics',
  geopolitics: 'Politics',
  geopolitic: 'Politics',
  // Technology
  technology: 'Technology',
  tech: 'Technology',
  // Economy
  economy: 'Economy',
  economics: 'Economy',
  // Science
  science: 'Science',
  // Sports
  sports: 'Sports',
  sport: 'Sports',
  // Culture
  culture: 'Culture',
  cultures: 'Culture',
  arts: 'Culture',
  // AI
  ai: 'AI',
  'artificial intelligence': 'AI',
  artificialintelligence: 'AI',
  // Crypto
  crypto: 'Crypto',
  cryptocurrency: 'Crypto',
  cryptocurrencies: 'Crypto',
  defi: 'Crypto',
  // Entertainment
  entertainment: 'Entertainment',
  entertainments: 'Entertainment',
  movies: 'Entertainment',
  music: 'Entertainment',
  // Other
  other: 'Other',
  others: 'Other',
  misc: 'Other',
  miscellaneous: 'Other',
  general: 'Other',
}

export const CATEGORIES: Category[] = ['Politics', 'Technology', 'Economy', 'Science', 'Sports', 'Culture', 'AI', 'Crypto', 'Entertainment', 'Other']

/** Normalize any category string (lowercase, shorthand) to its canonical Category form */
export function normalizeCategory(raw: string): Category {
  return CATEGORY_ALIASES[raw.toLowerCase()] ?? 'Other'
}

/**
 * Reverse map: canonical Category → all possible DB values (lowercase aliases + canonical).
 * Used for resilient category filtering when DB data may not be normalized.
 * e.g. 'Technology' → ['technology', 'tech', 'Technology', 'Tech']
 */
export function getCategoryVariants(canonical: Category): string[] {
  const variants = new Set<string>()
  variants.add(canonical)
  variants.add(canonical.toLowerCase())
  for (const [alias, target] of Object.entries(CATEGORY_ALIASES)) {
    if (target === canonical) {
      variants.add(alias)
      // Capitalize first letter variant (common in DB)
      variants.add(alias.charAt(0).toUpperCase() + alias.slice(1))
    }
  }
  return Array.from(variants)
}

export interface Profile {
  id: string
  display_name: string
  avatar_url: string | null
  bio: string | null
  is_admin: boolean
  // Onboarding (AQ-162)
  onboarding_complete?: boolean
  // Badge fields (added v1)
  badge_tier?: BadgeTier
  badge_ever_reached?: BadgeTier
  resolved_forecast_count?: number
}

export interface Question {
  id: string
  title: string
  description: string | null
  category: Category
  question_type: QuestionType
  options: QuestionOptions
  resolution_source: string | null
  opens_at: string
  closes_at: string
  blind_until: string | null
  resolved_at: string | null
  resolution: Record<string, unknown> | null
  created_at: string;
  status: QuestionStatus;
  created_by: string;
  // aggregated fields (from views/joins)
  forecasters_count?: number;
  aggregate_probability?: number;
}

export interface QuestionOptions {
  yes_label?: string
  no_label?: string
}

export interface Forecast {
  id: string
  question_id: string
  user_id: string
  prediction: ForecastPrediction
  created_at: string
  updated_at: string
}

export interface ForecastPrediction {
  probability: number
}

export interface Score {
  id: string
  question_id: string
  user_id: string
  brier_score: number
  log_score: number | null
}

export interface LeaderboardEntry {
  user_id: string
  display_name: string
  avatar_url: string | null
  badge_tier?: BadgeTier
  badge_ever_reached?: BadgeTier
  resolved_forecast_count?: number
  avg_brier_score: number
  avg_log_score: number | null
  total_forecasts: number
  resolved_forecasts: number
}

export interface ForecastHistory {
  created_at: string
  probability: number
}

/* ── Profile Badges v1 ── */

export type BadgeTier = 'rookie' | 'forecaster' | 'expert' | 'oracle'

export const BADGE_CONFIG: Record<BadgeTier, {
  name: string
  emoji: string
  color: string
  minResolved: number
}> = {
  rookie:     { name: 'Rookie',     emoji: '🌱', color: '#22c55e', minResolved: 0 },
  forecaster: { name: 'Forecaster', emoji: '🌤️', color: '#3b82f6', minResolved: 5 },
  expert:     { name: 'Expert',     emoji: '⭐', color: '#f59e0b', minResolved: 20 },
  oracle:     { name: 'Oracle',     emoji: '🧙', color: '#a855f7', minResolved: 50 },
}

/** Ordered tiers from lowest to highest */
export const BADGE_TIER_ORDER: BadgeTier[] = ['rookie', 'forecaster', 'expert', 'oracle']

/**
 * Calculate badge tier from resolved forecast count.
 * Thresholds are inclusive on the lower bound: 5 → Forecaster, 20 → Expert, 50 → Oracle.
 */
export function calculateBadgeTier(resolvedCount: number): BadgeTier {
  if (resolvedCount >= 50) return 'oracle'
  if (resolvedCount >= 20) return 'expert'
  if (resolvedCount >= 5) return 'forecaster'
  return 'rookie'
}

/**
 * Return the effective badge tier, which is the higher of current and ever-reached tiers.
 * Badges are never downgraded.
 */
export function getDisplayBadge(
  currentTier: BadgeTier,
  everReached: BadgeTier
): BadgeTier {
  const currentIdx = BADGE_TIER_ORDER.indexOf(currentTier)
  const everIdx = BADGE_TIER_ORDER.indexOf(everReached)
  return BADGE_TIER_ORDER[Math.max(currentIdx, everIdx)]
}

/* ── Question Blocks v1 ── */

export interface Block {
  id: string
  title: string
  description: string | null
  category: string
  created_by: string | null
  created_at: string
  // aggregated fields
  question_count?: number
  top_scorer?: { display_name: string; avg_brier_score: number } | null
}

export interface BlockQuestion {
  block_id: string
  question_id: string
  sort_order: number
}

export interface BlockLeaderboardEntry {
  user_id: string
  display_name: string
  avatar_url: string | null
  avg_brier_score: number
  resolved_count: number
}

/** Result of scores + profiles inner join query (used in block pages) */
export interface ScoreWithProfile {
  user_id: string
  question_id: string
  brier_score: number
  profiles: {
    display_name: string
    avatar_url?: string | null
  }
}

/* ── Notifications (AQ-007) ── */

export type NotificationType =
  | 'question_closing_soon'
  | 'question_resolved'
  | 'new_block'
  | 'forecast_revised'
  | 'weekly_digest'

export interface Notification {
  id: string
  user_id: string
  type: NotificationType
  title: string
  body: string
  link: string | null
  question_id: string | null
  block_id: string | null
  metadata: Record<string, unknown>
  read: boolean
  created_at: string
}

export interface NotificationPreferences {
  user_id: string
  question_closing_soon: boolean
  question_resolved: boolean
  new_block: boolean
  forecast_revised: boolean
  weekly_digest: boolean
  updated_at: string
}

export interface NotificationPrefsUpdate {
  question_closing_soon?: boolean
  question_resolved?: boolean
  new_block?: boolean
  forecast_revised?: boolean
  weekly_digest?: boolean
}

/** Emoji + color map for notification types (matches SPEC_NOTIFICATIONS.md §7.5) */
export const NOTIFICATION_TYPE_CONFIG: Record<NotificationType, { emoji: string; color: string }> = {
  question_closing_soon: { emoji: '📌', color: '#f97316' },
  question_resolved:    { emoji: '✅', color: '#22c55e' },
  new_block:            { emoji: '📦', color: '#3b82f6' },
  forecast_revised:     { emoji: '🔄', color: '#a855f7' },
  weekly_digest:        { emoji: '📊', color: '#f59e0b' },
}
