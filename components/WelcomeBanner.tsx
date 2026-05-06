'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'

/**
 * Dismissible welcome banner shown after signup.
 * Triggered by ?welcome=true query param or localStorage flag.
 * Auto-dismisses on scroll past or X button click.
 */
export default function WelcomeBanner() {
  const [visible, setVisible] = useState(false)
  const searchParams = useSearchParams()

  useEffect(() => {
    // Check query param first, then localStorage
    const hasQueryParam = searchParams.get('welcome') === 'true'
    const hasLocalFlag =
      typeof window !== 'undefined' &&
      localStorage.getItem('baycast_just_signed_up') === 'true'

    if (hasQueryParam || hasLocalFlag) {
      setVisible(true)
      // Clear the flag so it doesn't show again on next visit
      localStorage.removeItem('baycast_just_signed_up')
    }
  }, [searchParams])

  // Auto-dismiss on scroll past
  const handleScroll = useCallback(() => {
    if (!visible) return
    const banner = document.getElementById('welcome-banner')
    if (!banner) return
    const rect = banner.getBoundingClientRect()
    if (rect.bottom < 0) {
      setVisible(false)
    }
  }, [visible])

  useEffect(() => {
    if (visible) {
      window.addEventListener('scroll', handleScroll, { passive: true })
      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [visible, handleScroll])

  const dismiss = () => setVisible(false)

  if (!visible) return null

  return (
    <div
      id="welcome-banner"
      className="mb-6 relative overflow-hidden rounded-xl border border-accent-green/40 bg-gradient-to-r from-accent-green/10 via-accent-green/5 to-transparent px-5 py-4 transition-all duration-300"
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl flex-shrink-0">🎉</span>
          <div>
            <p className="text-text-primary font-semibold text-sm">
              Welcome to Baycast!
            </p>
            <p className="text-text-secondary text-sm">
              Pick a question to make your first forecast.
            </p>
          </div>
        </div>
        <button
          onClick={dismiss}
          className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-full text-text-secondary hover:text-text-primary hover:bg-white/10 transition-colors"
          aria-label="Dismiss welcome banner"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 4L4 12M4 4L12 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}
