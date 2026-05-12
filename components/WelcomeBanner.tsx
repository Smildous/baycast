'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'

/**
 * Guided onboarding banner shown after signup.
 * Triggered by ?welcome=true query param or localStorage flag.
 *
 * Multi-step flow:
 *   Step 1: "Pick a question" — shown on /questions page
 *   Step 2: "Submit your forecast" — shown on question detail page
 *   Step 3: Done — banner auto-dismisses, onboarding_complete flag set
 *
 * Progress is tracked via localStorage keys so the banner persists
 * across page navigations until the user submits their first forecast.
 */

const ONBOARDING_STEP_KEY = 'baycast_onboarding_step'
const SIGNUP_FLAG_KEY = 'baycast_just_signed_up'

type OnboardingStep = 'pick' | 'forecast' | 'done'

function getStep(): OnboardingStep {
  if (typeof window === 'undefined') return 'pick'
  const stored = localStorage.getItem(ONBOARDING_STEP_KEY)
  if (stored === 'forecast' || stored === 'done') return stored
  return 'pick'
}

export default function WelcomeBanner() {
  const [visible, setVisible] = useState(false)
  const [step, setStep] = useState<OnboardingStep>('pick')
  const searchParams = useSearchParams()

  useEffect(() => {
    const hasQueryParam = searchParams.get('welcome') === 'true'
    const hasLocalFlag =
      typeof window !== 'undefined' &&
      localStorage.getItem(SIGNUP_FLAG_KEY) === 'true'

    if (hasQueryParam || hasLocalFlag) {
      // Clear signup flag so it doesn't re-trigger
      localStorage.removeItem(SIGNUP_FLAG_KEY)
      // Initialize onboarding step
      const currentStep = getStep()
      if (currentStep === 'done') return
      setStep(currentStep)
      setVisible(true)
    }
  }, [searchParams])

  // Listen for step changes (e.g. when user navigates to a question detail)
  useEffect(() => {
    if (!visible) return
    const interval = setInterval(() => {
      const currentStep = getStep()
      if (currentStep !== step) {
        if (currentStep === 'done') {
          setVisible(false)
        } else {
          setStep(currentStep)
        }
      }
    }, 500)
    return () => clearInterval(interval)
  }, [visible, step])

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

  const dismiss = () => {
    setVisible(false)
    // Mark onboarding as done if dismissed
    localStorage.setItem(ONBOARDING_STEP_KEY, 'done')
  }

  if (!visible) return null

  // Step-specific content
  const stepContent: Record<OnboardingStep, { icon: string; title: string; subtitle: string; stepNum: number; totalSteps: number }> = {
    pick: {
      icon: '👋',
      title: 'Welcome! Here are your first questions',
      subtitle: 'Tap one to make your first prediction.',
      stepNum: 1,
      totalSteps: 2,
    },
    forecast: {
      icon: '🎯',
      title: 'Almost there!',
      subtitle: 'Slide to set your probability and submit your forecast.',
      stepNum: 2,
      totalSteps: 2,
    },
    done: {
      icon: '🎉',
      title: '',
      subtitle: '',
      stepNum: 2,
      totalSteps: 2,
    },
  }

  const content = stepContent[step]
  if (step === 'done') return null

  // Progress dots
  const progressDots = Array.from({ length: content.totalSteps }, (_, i) => (
    <span
      key={i}
      className={`inline-block w-2 h-2 rounded-full transition-colors ${
        i < content.stepNum ? 'bg-accent-green' : 'bg-border-dark'
      }`}
    />
  ))

  return (
    <div
      id="welcome-banner"
      className="mb-6 relative overflow-hidden rounded-xl border border-accent-green/40 bg-gradient-to-r from-accent-green/10 via-accent-green/5 to-transparent px-5 py-4 transition-all duration-300"
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl flex-shrink-0">{content.icon}</span>
          <div>
            <p className="text-text-primary font-semibold text-sm">
              {content.title}
            </p>
            <p className="text-text-secondary text-sm">
              {content.subtitle}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          {/* Progress indicator */}
          <div className="flex items-center gap-1.5">
            {progressDots}
          </div>
          <button
            onClick={dismiss}
            className="w-7 h-7 flex items-center justify-center rounded-full text-text-secondary hover:text-text-primary hover:bg-white/10 transition-colors"
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
    </div>
  )
}

/**
 * Helper: advance the onboarding step (called from question detail pages).
 * Call with 'forecast' when user lands on a question detail page.
 */
export function advanceOnboardingStep(step: 'forecast' | 'done') {
  if (typeof window === 'undefined') return
  const current = localStorage.getItem(ONBOARDING_STEP_KEY)
  if (current === 'done') return
  localStorage.setItem(ONBOARDING_STEP_KEY, step)
}

/**
 * Helper: check if onboarding is in progress.
 */
export function isOnboardingActive(): boolean {
  if (typeof window === 'undefined') return false
  const step = localStorage.getItem(ONBOARDING_STEP_KEY)
  return step === 'pick' || step === 'forecast'
}
