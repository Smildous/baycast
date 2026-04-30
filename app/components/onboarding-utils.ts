/**
 * Onboarding localStorage helpers and types.
 * Pure functions — no React, no JSX — safe to import in tests and SSR.
 */

export const ONBOARDING_KEY = 'baycast_onboarding_completed'
export const ONBOARDING_STEP_KEY = 'onboarding_step'

export type OnboardingStep = 1 | 2 | 3

export function isOnboardingCompleted(): boolean {
  if (typeof window === 'undefined') return false
  return localStorage.getItem(ONBOARDING_KEY) === 'true'
}

export function setOnboardingCompleted(value: boolean): void {
  if (typeof window === 'undefined') return
  if (value) {
    localStorage.setItem(ONBOARDING_KEY, 'true')
  } else {
    localStorage.removeItem(ONBOARDING_KEY)
  }
}

export function getOnboardingStep(): OnboardingStep {
  if (typeof window === 'undefined') return 1
  const raw = localStorage.getItem(ONBOARDING_STEP_KEY)
  const step = Number(raw)
  if (step === 1 || step === 2 || step === 3) return step
  return 1
}

export function setOnboardingStep(step: OnboardingStep): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(ONBOARDING_STEP_KEY, String(step))
}
