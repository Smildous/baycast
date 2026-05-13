export default function QuestionsLoading() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Title skeleton */}
      <div className="mb-8">
        <div className="h-9 w-48 bg-white/5 rounded-lg animate-pulse mb-2" />
        <div className="h-5 w-72 bg-white/5 rounded-lg animate-pulse" />
      </div>

      {/* Category filter skeleton */}
      <div className="flex flex-wrap gap-2 mb-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-8 w-20 rounded-full bg-white/5 animate-pulse"
          />
        ))}
      </div>

      {/* Status/Sort controls skeleton */}
      <div className="flex flex-wrap items-center gap-2 mb-8">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="h-8 w-24 rounded-lg bg-white/5 animate-pulse"
          />
        ))}
      </div>

      {/* Question card skeletons */}
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <QuestionCardSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}

function QuestionCardSkeleton() {
  return (
    <div className="bg-bg-surface border border-border-dark rounded-xl p-5 animate-pulse">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex-1">
          {/* Title */}
          <div className="h-5 w-3/4 bg-white/5 rounded mb-2" />
          {/* Description */}
          <div className="h-4 w-1/2 bg-white/5 rounded mb-3" />
          {/* Meta row */}
          <div className="flex items-center gap-3">
            <div className="h-5 w-16 rounded-full bg-white/5" />
            <div className="h-4 w-24 bg-white/5 rounded" />
            <div className="h-4 w-20 bg-white/5 rounded" />
          </div>
        </div>
        {/* Probability circle placeholder */}
        <div className="shrink-0 w-12 h-12 rounded-full bg-white/5" />
      </div>
    </div>
  )
}
