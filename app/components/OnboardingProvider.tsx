'use client'

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
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

function isAuthRoute(pathname: string): boolean {
  return pathname.startsWith(AUTH_ROUTE_PREFIX)
}

export default function OnboardingProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [currentStep, setCurrentStep] = useState<OnboardingStep>(1)
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Never show onboarding on auth routes
    if (isAuthRoute(pathname)) {
      setIsOpen(false)
      return
    }
    if (!isOnboardingCompleted()) {
      const savedStep = getOnboardingStep()
      setCurrentStep(savedStep)
      setIsOpen(true)
    }
  }, [pathname])

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
