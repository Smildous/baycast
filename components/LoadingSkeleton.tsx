/**
 * Reusable loading skeleton components.
 * Match the layout of real content (cards, rows, stats) with animated pulse placeholders.
 * Styled consistently with the Baycast dark theme.
 */

function Skeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`animate-pulse rounded-md bg-border-dark ${className}`} />
  )
}

/** Skeleton that mimics a QuestionCard */
export function QuestionCardSkeleton() {
  return (
    <div className="bg-bg-surface border border-border-dark rounded-xl p-5">
      <div className="flex items-start gap-4">
        <div className="flex-1 min-w-0 space-y-3">
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-5 w-16 rounded" />
          </div>
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-5 w-1/2" />
          <Skeleton className="h-2 w-full rounded-full" />
          <Skeleton className="h-3 w-28" />
        </div>
        <div className="shrink-0 text-right space-y-1">
          <Skeleton className="h-8 w-16 ml-auto" />
          <Skeleton className="h-3 w-16 ml-auto" />
        </div>
      </div>
    </div>
  )
}

/** Skeleton that mimics a leaderboard table row */
export function LeaderboardRowSkeleton() {
  return (
    <tr className="border-b border-border-dark/50">
      <td className="px-4 py-3">
        <Skeleton className="h-5 w-6" />
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-5 w-28" />
        </div>
      </td>
      <td className="px-4 py-3 text-right">
        <Skeleton className="h-5 w-14 ml-auto" />
      </td>
      <td className="px-4 py-3 text-right hidden sm:table-cell">
        <Skeleton className="h-5 w-12 ml-auto" />
      </td>
      <td className="px-4 py-3 text-right hidden md:table-cell">
        <Skeleton className="h-5 w-10 ml-auto" />
      </td>
      <td className="px-4 py-3 text-right hidden lg:table-cell">
        <Skeleton className="h-5 w-10 ml-auto" />
      </td>
    </tr>
  )
}

/** Skeleton for a profile stat card */
export function ProfileStatSkeleton() {
  return (
    <div className="bg-bg-surface border border-border-dark rounded-xl p-4 text-center">
      <Skeleton className="h-8 w-20 mx-auto mb-2" />
      <Skeleton className="h-4 w-24 mx-auto" />
    </div>
  )
}

/** Skeleton for a forecast table row (desktop) */
export function ForecastRowSkeleton() {
  return (
    <tr className="border-b border-border-dark/50">
      <td className="px-4 py-3">
        <Skeleton className="h-3 w-14 mb-1" />
        <Skeleton className="h-4 w-48" />
      </td>
      <td className="px-4 py-3 text-right">
        <Skeleton className="h-5 w-12 ml-auto" />
      </td>
      <td className="px-4 py-3 text-right">
        <Skeleton className="h-5 w-12 ml-auto" />
      </td>
      <td className="px-4 py-3 text-right">
        <Skeleton className="h-4 w-10 ml-auto" />
      </td>
      <td className="px-4 py-3 text-right">
        <Skeleton className="h-4 w-12 ml-auto" />
      </td>
      <td className="px-4 py-3 text-right">
        <Skeleton className="h-4 w-20 ml-auto" />
      </td>
    </tr>
  )
}

/** Skeleton that mimics a BlockCard */
export function BlockCardSkeleton() {
  return (
    <div className="bg-bg-surface border border-border-dark rounded-xl p-5">
      <div className="flex items-start gap-4">
        <div className="flex-1 min-w-0 space-y-3">
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-3 w-28" />
        </div>
        <div className="shrink-0 text-right space-y-1">
          <Skeleton className="h-6 w-14 ml-auto" />
          <Skeleton className="h-3 w-20 ml-auto" />
        </div>
      </div>
    </div>
  )
}

/** Repeated skeleton helper */
function repeat<T>(count: number, factory: () => T): T[] {
  return Array.from({ length: count }, factory)
}

/** Page-level skeleton for the Questions page */
export function QuestionsPageSkeleton() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <Skeleton className="h-9 w-40 mb-2" />
        <Skeleton className="h-5 w-80" />
      </div>
      {/* Category filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {repeat(6, () => (
          <Skeleton key={Math.random()} className="h-8 w-20 rounded-full" />
        ))}
      </div>
      {/* Status filters */}
      <div className="flex gap-2 mb-8">
        {repeat(3, () => (
          <Skeleton key={Math.random()} className="h-8 w-20 rounded-lg" />
        ))}
      </div>
      {/* Cards */}
      <div className="space-y-3">
        {repeat(5, QuestionCardSkeleton)}
      </div>
    </div>
  )
}

/** Page-level skeleton for the Leaderboard page */
export function LeaderboardPageSkeleton() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-8">
        <Skeleton className="h-9 w-44 mb-2" />
        <Skeleton className="h-5 w-96" />
      </div>
      {/* Period filters */}
      <div className="flex gap-2 mb-8">
        {repeat(3, () => (
          <Skeleton key={Math.random()} className="h-8 w-24 rounded-lg" />
        ))}
      </div>
      {/* Table */}
      <div className="bg-bg-surface border border-border-dark rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border-dark text-text-secondary text-sm">
              <th className="text-left px-4 py-3 w-12">#</th>
              <th className="text-left px-4 py-3">Forecaster</th>
              <th className="text-right px-4 py-3">Brier</th>
              <th className="text-right px-4 py-3 hidden sm:table-cell">Log Score</th>
              <th className="text-right px-4 py-3 hidden md:table-cell">Predictions</th>
              <th className="text-right px-4 py-3 hidden lg:table-cell">Resolved</th>
            </tr>
          </thead>
          <tbody>
            {repeat(8, LeaderboardRowSkeleton)}
          </tbody>
        </table>
      </div>
    </div>
  )
}

/** Page-level skeleton for the Profile page */
export function ProfilePageSkeleton() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="bg-bg-surface border border-border-dark rounded-xl p-6 mb-8 flex gap-6 items-start">
        <Skeleton className="h-20 w-20 rounded-full shrink-0" />
        <div className="flex-1 space-y-3">
          <Skeleton className="h-7 w-40" />
          <Skeleton className="h-4 w-64" />
          <div className="flex gap-6">
            {repeat(4, () => (
              <div key={Math.random()} className="space-y-1">
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-3 w-14" />
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Tab content */}
      <div className="space-y-4">
        <Skeleton className="h-5 w-40" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {repeat(4, ProfileStatSkeleton)}
        </div>
      </div>
    </div>
  )
}

/** Page-level skeleton for the Blocks page */
export function BlocksPageSkeleton() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <Skeleton className="h-9 w-48 mb-2" />
        <Skeleton className="h-5 w-64" />
      </div>
      <div className="space-y-3">
        {repeat(4, BlockCardSkeleton)}
      </div>
    </div>
  )
}
