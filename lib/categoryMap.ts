/**
 * Client-side category normalization fallback (AQ-089)
 *
 * This module provides a display-safe category normalizer that handles
 * non-standard DB values when migration_005_normalize_categories.sql
 * hasn't been run yet. It re-exports the enhanced normalizeCategory
 * from lib/types, which includes all known DB category variants.
 *
 * Usage: import { normalizeCategoryForDisplay } from '@/lib/categoryMap'
 */

import { normalizeCategory } from './types'
import type { Category } from './types'

/**
 * Normalize any raw category string from the DB to a canonical Category.
 * Handles legacy names, casing differences, and whitespace.
 *
 * Examples:
 *   'Geopolitics'       → 'Politics'
 *   'Economics'         → 'Economy'
 *   'Artificial Intelligence' → 'AI'
 *   'DeFi'              → 'Crypto'
 *   'Arts'              → 'Culture'
 *   'Miscellaneous'     → 'Other'
 */
export function normalizeCategoryForDisplay(raw: string | null | undefined): Category {
  if (!raw) return 'Other'
  return normalizeCategory(raw.trim())
}

export { normalizeCategory } from './types'
export { CATEGORIES, type Category } from './types'
