'use client'

export default function BlockError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="text-center py-16">
        <h2 className="text-2xl font-outfit font-bold text-danger mb-4">Something went wrong</h2>
        <p className="text-text-secondary mb-6">
          {error.message || 'Failed to load this block.'}
        </p>
        <button
          onClick={reset}
          className="px-4 py-2 rounded-lg bg-accent-green text-white text-sm font-semibold hover:bg-accent-green/90 transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  )
}
