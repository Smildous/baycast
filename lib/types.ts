export type QuestionStatus = 'draft' | 'open' | 'closed' | 'resolved'
export type QuestionType = 'binary' | 'multiple_choice' | 'range'
export type Category =
  | 'Politics'
  | 'Technology'
  | 'Economy'
  | 'Science'
  | 'Sports'
  | 'Culture'
  | 'Other'

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
  resolved_at: string | null
  resolution: Record<string, unknown> | null
  status: QuestionStatus
  created_by: string
  // aggregated fields (from views/joins)
  forecasters_count?: number
  aggregate_probability?: number
}

export interface QuestionOptions {
  // binary
  yes_label?: string
  no_label?: string
  // multiple_choice
  choices?: string[]
  // range
  min?: number
  max?: number
  unit?: string
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
  // binary: probability 0-100
  probability?: number
  // multiple_choice: { [choice]: probability }
  probabilities?: Record<string, number>
  // range
  value?: number
}

export interface Score {
  id: string
  question_id: string
  user_id: string
  brier_score: number
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
