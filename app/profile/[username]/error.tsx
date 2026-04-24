'use client'

import Link from 'next/link'

export default function ProfileError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 text-center">
      <div className="text-6xl font-mono font-bold text-danger mb-4">500</div>
      <h1 className="text-2xl font-outfit font-semibold mb-2">Failed to load profile</h1>
      <p className="text-text-secondary mb-8 max-w-md">
        {error.message || 'An error occurred while loading this profile.'}
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="px-6 py-2.5 rounded-lg bg-accent-green text-white font-semibold hover:bg-accent-green/90 transition-colors"
        >
          Try again
        </button>
        <Link
          href="/"
          className="px-6 py-2.5 rounded-lg border border-border-dark text-text-primary hover:border-accent-green/50 transition-colors"
        >
          Home
        </Link>
      </div>
    </div>
  )
}
