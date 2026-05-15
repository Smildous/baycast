'use client'

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
  type ReactNode,
} from 'react'
import { usePathname } from 'next/navigation'
import OnboardingModal, {
  type OnboardingContextValue,
} from './OnboardingModal'
import {
  type OnboardingStep,
  isOnboardingCompleted,
  setOnboardingCompleted,
  getOnboardingStep,
  setOnboardingStep,
} from './onboarding-utils'

const OnboardingContext = createContext<OnboardingContextValue>({
  currentStep: 1,
  isOpen: false,
  nextStep: () => {},
  skipOnboarding: () => {},
  completeOnboarding: () => {},
  showOnboarding: () => {},
})

export function useOnboarding() {
  return useContext(OnboardingContext)
}

/** Routes where the onboarding modal must NOT appear */
const AUTH_ROUTE_PREFIX = '/auth'

/** Routes where onboarding modal must NOT appear (blocks critical UI like category filters) */
const NO_ONBOARDING_ROUTES = ['/questions'] as const;

function isAuthRoute(pathname: string): boolean {
  return pathname.startsWith(AUTH_ROUTE_PREFIX)
}

/** Delay in ms before the onboarding modal appears */
const ONBOARDING_DELAY_MS = 3000

export default function OnboardingProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [currentStep, setCurrentStep] = useState<OnboardingStep>(1)
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const delayTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => {
      const next = (prev + 1) as OnboardingStep
      setOnboardingStep(next)
      return next
    })
  }, [])

  const completeOnboarding = useCallback(() => {
    setOnboardingCompleted(true)
    setOnboardingStep(3)
    setIsOpen(false)
    if (delayTimerRef.current) {
      clearTimeout(delayTimerRef.current)
      delayTimerRef.current = null
    }
  }, [])

  const skipOnboarding = useCallback(() => {
    completeOnboarding()
  }, [completeOnboarding])

  const showOnboarding = useCallback(() => {
    setOnboardingCompleted(false)
    setCurrentStep(1)
    setOnboardingStep(1)
    setIsOpen(true)
  }, [])

  // AQ-130: Check if current route should skip onboarding (blocks critical UI like category filters)
  const isNoOnboardingRoute = NO_ONBOARDING_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + '/')
  )

  useEffect(() => {
    setMounted(true)
    // Never show onboarding on auth routes or /questions (AQ-130: blocks category filters)
    if (isAuthRoute(pathname) || isNoOnboardingRoute) {
      setIsOpen(false)
      return
    }
    if (!isOnboardingCompleted()) {
      const savedStep = getOnboardingStep()
      setCurrentStep(savedStep)
      // AQ-064: 3-second delay before showing the modal
      delayTimerRef.current = setTimeout(() => {
        setIsOpen(true)
      }, ONBOARDING_DELAY_MS)
    }

    return () => {
      if (delayTimerRef.current) {
        clearTimeout(delayTimerRef.current)
        delayTimerRef.current = null
      }
    }
  }, [pathname, isNoOnboardingRoute])

  // AQ-064: Allow dismissal via Escape key
  useEffect(() => {
    if (!mounted || !isOpen) return

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        completeOnboarding()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, mounted, completeOnboarding])

  // AQ-130: Dismiss modal on user scroll — makes onboarding non-blocking
  useEffect(() => {
    if (!mounted || !isOpen) return

    let scrollDismissed = false
    function handleScroll() {
      if (scrollDismissed) return
      scrollDismissed = true
      completeOnboarding()
    }

    window.addEventListener('scroll', handleScroll, { passive: true, once: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isOpen, mounted, completeOnboarding])

  // Lock body scroll when modal is open, restore on close
  useEffect(() => {
    if (!mounted) return
    if (isOpen) {
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = prev
      }
    }
  }, [isOpen, mounted])

  if (!mounted) {
    return <>{children}</>
  }

  return (
    <OnboardingContext.Provider
      value={{ currentStep, isOpen, nextStep, skipOnboarding, completeOnboarding, showOnboarding }}
    >
      {children}
      {isOpen && (
        <OnboardingModal
          currentStep={currentStep}
          onNext={nextStep}
          onSkip={skipOnboarding}
          onComplete={completeOnboarding}
        />
      )}
    </OnboardingContext.Provider>
  )
}
