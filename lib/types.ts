export type QuestionStatus = 'draft' | 'open' | 'closed' | 'resolved'
export type QuestionType = 'binary'
export type Category =
  | 'Politics'
  | 'Technology'
  | 'Economy'
  | 'Science'
  | 'Sports'
  | 'Culture'
  | 'Other'

/** Canonical categories keyed by lowercase lookup */
export const CATEGORY_ALIASES: Record<string, Category> = {
  politics: 'Politics',
  technology: 'Technology',
  tech: 'Technology',
  economy: 'Economy',
  economics: 'Economy',
  science: 'Science',
  sports: 'Sports',
  culture: 'Culture',
  other: 'Other',
}

export const CATEGORIES: Category[] = ['Politics', 'Technology', 'Economy', 'Science', 'Sports', 'Culture', 'Other']

/** Normalize any category string (lowercase, shorthand) to its canonical Category form */
export function normalizeCategory(raw: string): Category {
  return CATEGORY_ALIASES[raw.toLowerCase()] ?? 'Other'
}

export interface Profile {
  id: string
  display_name: string
  avatar_url: string | null
  bio: string | null
  is_admin: boolean
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
  status: QuestionStatus
  created_by: string
  // aggregated fields (from views/joins)
  forecasters_count?: number
  aggregate_probability?: number
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
  avg_brier_score: number
  total_forecasts: number
  resolved_forecasts: number
}

export interface ForecastHistory {
  created_at: string
  probability: number
}
