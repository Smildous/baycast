import { describe, it, expect, beforeEach } from 'vitest'
import {
  ONBOARDING_KEY,
  ONBOARDING_STEP_KEY,
  isOnboardingCompleted,
  setOnboardingCompleted,
  getOnboardingStep,
  setOnboardingStep,
} from '@/app/components/onboarding-utils'
import type { OnboardingStep } from '@/app/components/onboarding-utils'

// ─── Setup ────────────────────────────────────────────────────────────────

beforeEach(() => {
  localStorage.clear()
})

// ─── isOnboardingCompleted ────────────────────────────────────────────────

describe('isOnboardingCompleted', () => {
  it('returns false when key is not set', () => {
    expect(isOnboardingCompleted()).toBe(false)
  })

  it('returns true when key is set to "true"', () => {
    localStorage.setItem(ONBOARDING_KEY, 'true')
    expect(isOnboardingCompleted()).toBe(true)
  })

  it('returns false when key is set to some other value', () => {
    localStorage.setItem(ONBOARDING_KEY, 'false')
    expect(isOnboardingCompleted()).toBe(false)
    localStorage.setItem(ONBOARDING_KEY, '1')
    expect(isOnboardingCompleted()).toBe(false)
  })
})

// ─── setOnboardingCompleted ───────────────────────────────────────────────

describe('setOnboardingCompleted', () => {
  it('sets localStorage to "true" when called with true', () => {
    setOnboardingCompleted(true)
    expect(localStorage.getItem(ONBOARDING_KEY)).toBe('true')
    expect(isOnboardingCompleted()).toBe(true)
  })

  it('removes the key when called with false', () => {
    localStorage.setItem(ONBOARDING_KEY, 'true')
    setOnboardingCompleted(false)
    expect(localStorage.getItem(ONBOARDING_KEY)).toBeNull()
    expect(isOnboardingCompleted()).toBe(false)
  })
})

// ─── getOnboardingStep ────────────────────────────────────────────────────

describe('getOnboardingStep', () => {
  it('returns 1 when no step is stored', () => {
    expect(getOnboardingStep()).toBe(1)
  })

  it('returns the stored step for valid values', () => {
    for (const step of [1, 2, 3] as OnboardingStep[]) {
      localStorage.setItem(ONBOARDING_STEP_KEY, String(step))
      expect(getOnboardingStep()).toBe(step)
    }
  })

  it('returns 1 for invalid values', () => {
    localStorage.setItem(ONBOARDING_STEP_KEY, '0')
    expect(getOnboardingStep()).toBe(1)
    localStorage.setItem(ONBOARDING_STEP_KEY, '4')
    expect(getOnboardingStep()).toBe(1)
    localStorage.setItem(ONBOARDING_STEP_KEY, 'abc')
    expect(getOnboardingStep()).toBe(1)
    localStorage.setItem(ONBOARDING_STEP_KEY, '')
    expect(getOnboardingStep()).toBe(1)
  })
})

// ─── setOnboardingStep ────────────────────────────────────────────────────

describe('setOnboardingStep', () => {
  it('stores the step value in localStorage', () => {
    setOnboardingStep(2)
    expect(localStorage.getItem(ONBOARDING_STEP_KEY)).toBe('2')
  })

  it('persists across reads', () => {
    setOnboardingStep(3)
    expect(getOnboardingStep()).toBe(3)
  })
})

// ─── Step navigation logic ────────────────────────────────────────────────

describe('step navigation logic', () => {
  it('advances through all 3 steps sequentially', () => {
    setOnboardingStep(1)
    expect(getOnboardingStep()).toBe(1)

    setOnboardingStep(2)
    expect(getOnboardingStep()).toBe(2)

    setOnboardingStep(3)
    expect(getOnboardingStep()).toBe(3)
  })

  it('completion marks onboarding as done regardless of step', () => {
    setOnboardingStep(1)
    setOnboardingCompleted(true)
    expect(isOnboardingCompleted()).toBe(true)
    expect(getOnboardingStep()).toBe(1)
  })

  it('completion from step 3 marks onboarding as done', () => {
    setOnboardingStep(3)
    setOnboardingCompleted(true)
    expect(isOnboardingCompleted()).toBe(true)
  })

  it('re-showing onboarding clears completion and resets step', () => {
    setOnboardingStep(3)
    setOnboardingCompleted(true)
    expect(isOnboardingCompleted()).toBe(true)

    setOnboardingCompleted(false)
    setOnboardingStep(1)
    expect(isOnboardingCompleted()).toBe(false)
    expect(getOnboardingStep()).toBe(1)
  })
})

// ─── Constants ────────────────────────────────────────────────────────────

describe('constants', () => {
  it('exports correct localStorage key for completion', () => {
    expect(ONBOARDING_KEY).toBe('baycast_onboarding_completed')
  })

  it('exports correct localStorage key for step', () => {
    expect(ONBOARDING_STEP_KEY).toBe('onboarding_step')
  })
})
