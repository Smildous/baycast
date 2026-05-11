'use client'

import { useState, useEffect, useCallback } from 'react'
import ForecastSlider from '@/components/ForecastSlider'
import {
  ONBOARDING_KEY,
  ONBOARDING_STEP_KEY,
  isOnboardingCompleted,
  setOnboardingCompleted,
  getOnboardingStep,
  setOnboardingStep,
  type OnboardingStep,
} from './onboarding-utils'

export {
  ONBOARDING_KEY,
  ONBOARDING_STEP_KEY,
  type OnboardingStep,
  isOnboardingCompleted,
  setOnboardingCompleted,
  getOnboardingStep,
  setOnboardingStep,
}

export interface OnboardingContextValue {
  currentStep: OnboardingStep
  isOpen: boolean
  nextStep: () => void
  skipOnboarding: () => void
  completeOnboarding: () => void
  showOnboarding: () => void
}

const DEMO_QUESTION = {
  title: 'Will GPT-5 be released by December 2026?',
  description: 'OpenAI officially announces and makes GPT-5 available via API or product.',
}

/**
 * Simulated community distribution for the demo question.
 * Bucket: label → percentage of forecasters.
 */
const MOCK_DISTRIBUTUTION: Record<string, number> = {
  '10%': 8,
  '20%': 12,
  '30%': 15,
  '40%': 18,
  '50%': 22,
  '60%': 14,
  '70%': 7,
  '80%': 3,
  '90%': 1,
}

const MOCK_AVG = 45
const MOCK_RESOLVED_OUTCOME = 'YES'
const MOCK_TOTAL_FORECASTERS = 142

/** Brier score calculation: (forecast/100 - outcome)^2 */
function brierScore(probability: number, outcome: 0 | 1): number {
  return Math.pow(probability / 100 - outcome, 2)
}

/** Sub-states within Step 2 of the guided forecast */
type DemoSubStep = 'input' | 'phase-a' | 'phase-b' | 'resolution'

function StepWelcome({ onNext, onSkip }: { onNext: () => void; onSkip: () => void }) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-outfit font-extrabold text-text-primary mb-2">
          Welcome to Baycast
        </h2>
        <p className="text-text-secondary text-sm">
          The prediction polling protocol powered by collective intelligence.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-start gap-3 p-4 rounded-xl bg-bg-surface border border-border-dark">
          <span className="text-2xl flex-shrink-0">🔒</span>
          <div>
            <h3 className="font-semibold text-text-primary text-sm">Blind Forecasts</h3>
            <p className="text-text-secondary text-sm">
              Your prediction is hidden until Phase B — no anchoring bias.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 rounded-xl bg-bg-surface border border-border-dark">
          <span className="text-2xl flex-shrink-0">📊</span>
          <div>
            <h3 className="font-semibold text-text-primary text-sm">Scored Accuracy</h3>
            <p className="text-text-secondary text-sm">
              Ranked by Brier score — not just right or wrong. Express your uncertainty.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 rounded-xl bg-bg-surface border border-border-dark">
          <span className="text-2xl flex-shrink-0">🤖</span>
          <div>
            <h3 className="font-semibold text-text-primary text-sm">Human + AI</h3>
            <p className="text-text-secondary text-sm">
              Compete against AI agents and other forecasters on real-world questions.
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={onNext}
        className="w-full py-3 rounded-lg bg-accent-green text-white font-semibold hover:bg-accent-green/90 transition-colors"
      >
        Got it
      </button>

      <button
        onClick={onSkip}
        className="w-full text-center text-text-secondary text-sm hover:text-text-primary transition-colors"
      >
        Skip onboarding
      </button>
    </div>
  )
}

function StepGuidedForecast({
  onNext,
  onSkip,
}: {
  onNext: () => void
  onSkip: () => void
}) {
  const [probability, setProbability] = useState(50)
  const [subStep, setSubStep] = useState<DemoSubStep>('input')
  const [animating, setAnimating] = useState(false)

  // Calculate mock Brier score for the user's probability
  const outcomeNum: 0 | 1 = MOCK_RESOLVED_OUTCOME === 'YES' ? 1 : 0
  const userBrier = brierScore(probability, outcomeNum)
  // Simulate a percentile (hardcoded for the demo)
  const mockPercentile = Math.max(5, Math.min(95, Math.round(100 - userBrier * 120)))

  const handleSubmit = () => {
    setAnimating(true)
    // Show Phase A confirmation after brief delay
    setTimeout(() => {
      setSubStep('phase-a')
      setAnimating(false)
    }, 600)
  }

  const handleSeePhaseB = () => {
    setAnimating(true)
    setTimeout(() => {
      setSubStep('phase-b')
      setAnimating(false)
    }, 400)
  }

  const handleSeeScore = () => {
    setAnimating(true)
    setTimeout(() => {
      setSubStep('resolution')
      setAnimating(false)
    }, 400)
  }

  // Phase A: Forecast locked confirmation
  if (subStep === 'phase-a') {
    return (
      <div className="space-y-5">
        <div className="text-center">
          <div className="text-4xl mb-2">🎯</div>
          <h2 className="text-2xl font-outfit font-extrabold text-text-primary mb-2">
            Forecast submitted!
          </h2>
          <p className="text-text-secondary text-sm">
            You said: <span className="text-accent-green font-mono font-bold">{probability}% Yes</span>
          </p>
        </div>

        <div className="p-5 rounded-xl border-2 border-dashed border-yellow-700/60 bg-yellow-900/15">
          <div className="flex items-center gap-2 mb-2">
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="6" width="12" height="8" rx="1.5" stroke="#FACC15" strokeWidth="1.5" fill="none"/>
              <path d="M5 6V4.5C5 2.84315 6.34315 1.5 8 1.5V1.5C9.65685 1.5 11 2.84315 11 4.5V6" stroke="#FACC15" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span className="text-yellow-300 font-semibold text-sm">BLIND PHASE ACTIVE</span>
          </div>
          <p className="text-text-secondary text-sm leading-relaxed">
            Your prediction is locked and hidden from everyone else. No anchoring, no herding — just your honest assessment.
          </p>
        </div>

        <button
          onClick={handleSeePhaseB}
          disabled={animating}
          className="w-full py-3 rounded-lg bg-accent-green text-white font-semibold hover:bg-accent-green/90 disabled:opacity-50 transition-colors"
        >
          See what happens next →
        </button>

        <button
          onClick={onSkip}
          className="w-full text-center text-text-secondary text-sm hover:text-text-primary transition-colors"
        >
          Skip demo
        </button>
      </div>
    )
  }

  // Phase B: Distribution reveal
  if (subStep === 'phase-b') {
    // Find which bucket the user's probability falls into
    const userBucket = Math.round(probability / 10) * 10
    const bucketKey = `${Math.min(90, Math.max(10, userBucket))}%`

    return (
      <div className="space-y-5">
        <div className="text-center">
          <div className="text-4xl mb-2">📊</div>
          <h2 className="text-2xl font-outfit font-extrabold text-text-primary mb-2">
            Phase B — Revision Phase
          </h2>
          <p className="text-text-secondary text-sm">
            The blind is lifted! Here&apos;s what {MOCK_TOTAL_FORECASTERS} others predicted:
          </p>
        </div>

        <div className="p-5 rounded-xl bg-bg-surface border border-border-dark">
          <div className="text-xs text-text-secondary mb-3 font-medium">Community Distribution</div>
          <div className="flex items-end gap-1.5 h-28">
            {Object.entries(MOCK_DISTRIBUTUTION).map(([label, pct]) => {
              const isUser = label === bucketKey
              const isAvg = parseInt(label) === MOCK_AVG
              return (
                <div key={label} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-[10px] text-text-secondary/60">{pct}%</span>
                  <div
                    className={`w-full rounded-t-sm transition-all duration-500 ${
                      isUser
                        ? 'bg-accent-green ring-2 ring-accent-green/50'
                        : isAvg
                          ? 'bg-accent-blue/60'
                          : 'bg-border-dark'
                    }`}
                    style={{ height: `${Math.max(4, (pct / 22) * 100)}%` }}
                  />
                  <span className={`text-[10px] ${isUser ? 'text-accent-green font-bold' : 'text-text-secondary/60'}`}>
                    {label}
                  </span>
                </div>
              )
            })}
          </div>
          <div className="mt-3 flex items-center gap-3 text-xs text-text-secondary">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-sm bg-accent-green" /> You: {probability}%
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-sm bg-accent-blue/60" /> Avg: {MOCK_AVG}%
            </span>
          </div>
        </div>

        <p className="text-text-secondary text-sm text-center leading-relaxed">
          {probability > MOCK_AVG
            ? 'You were more confident than the crowd!'
            : probability < MOCK_AVG
              ? 'You were more cautious than the crowd.'
              : 'Right in line with the consensus!'}
        </p>

        <button
          onClick={handleSeeScore}
          disabled={animating}
          className="w-full py-3 rounded-lg bg-accent-green text-white font-semibold hover:bg-accent-green/90 disabled:opacity-50 transition-colors"
        >
          See your score →
        </button>

        <button
          onClick={onSkip}
          className="w-full text-center text-text-secondary text-sm hover:text-text-primary transition-colors"
        >
          Skip demo
        </button>
      </div>
    )
  }

  // Resolution: Show simulated score
  if (subStep === 'resolution') {
    const isGoodScore = userBrier < 0.2
    const isGreatScore = userBrier < 0.1

    return (
      <div className="space-y-5">
        <div className="text-center">
          <div className="text-4xl mb-2">✅</div>
          <h2 className="text-2xl font-outfit font-extrabold text-text-primary mb-1">
            Question Resolved: {MOCK_RESOLVED_OUTCOME}
          </h2>
          <p className="text-text-secondary text-sm">{DEMO_QUESTION.title}</p>
        </div>

        <div className="p-5 rounded-xl bg-bg-surface border border-border-dark">
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Your forecast</span>
              <span className="text-text-primary font-mono font-bold">{probability}%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Outcome</span>
              <span className="text-text-primary font-mono font-bold">{MOCK_RESOLVED_OUTCOME} (100%)</span>
            </div>
            <div className="border-t border-border-dark pt-3" />
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Brier Score</span>
              <span className={`font-mono font-bold ${isGreatScore ? 'text-accent-green' : isGoodScore ? 'text-yellow-300' : 'text-red-400'}`}>
                {userBrier.toFixed(4)}
              </span>
            </div>
          </div>
        </div>

        <div className={`text-center p-4 rounded-xl border ${
          isGreatScore
            ? 'border-accent-green/40 bg-accent-green/10'
            : isGoodScore
              ? 'border-yellow-700/40 bg-yellow-900/15'
              : 'border-red-700/40 bg-red-900/15'
        }`}>
          <div className="text-2xl mb-1">{isGreatScore ? '🏆' : isGoodScore ? '👍' : '📈'}</div>
          <p className="text-text-primary font-semibold text-sm">
            Top {mockPercentile}% of forecasters!
          </p>
          <p className="text-text-secondary text-xs mt-1">
            {isGreatScore
              ? 'Excellent calibration — you nailed it!'
              : isGoodScore
                ? 'Solid prediction. Closer to 0 is better.'
                : 'A learning opportunity. Brier scores reward well-calibrated uncertainty.'}
          </p>
        </div>

        <p className="text-text-secondary text-xs text-center leading-relaxed">
          This is how scoring works on Baycast. The closer your probability to the truth,
          the better your score. Lower Brier = more accurate.
        </p>

        <button
          onClick={onNext}
          className="w-full py-3 rounded-lg bg-gradient-to-r from-accent-green to-emerald-600 text-white font-bold hover:from-accent-green hover:to-emerald-500 transition-all"
        >
          Start forecasting for real →
        </button>

        <button
          onClick={onSkip}
          className="w-full text-center text-text-secondary text-sm hover:text-text-primary transition-colors"
        >
          Skip
        </button>
      </div>
    )
  }

  // Default: Input sub-step (slider)
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-outfit font-extrabold text-text-primary mb-2">
          Try a forecast
        </h2>
        <p className="text-text-secondary text-sm">
          This is a demo — give it a try! Your forecast is hidden until Phase B.
        </p>
      </div>

      <div className="p-6 rounded-xl bg-bg-surface border border-border-dark">
        <h3 className="font-semibold text-text-primary mb-1">{DEMO_QUESTION.title}</h3>
        <p className="text-text-secondary text-sm mb-6">{DEMO_QUESTION.description}</p>

        <ForecastSlider value={probability} onChange={setProbability} />
      </div>

      <button
        onClick={handleSubmit}
        disabled={animating}
        className="w-full py-3 rounded-lg bg-accent-green text-white font-semibold hover:bg-accent-green/90 disabled:opacity-50 transition-colors"
      >
        Submit forecast
      </button>

      <button
        onClick={onSkip}
        className="w-full text-center text-text-secondary text-sm hover:text-text-primary transition-colors"
      >
        Skip this step
      </button>
    </div>
  )
}

function StepComplete({ onSkip }: { onSkip: () => void }) {
  return (
    <div className="space-y-6 text-center">
      <div>
        <span className="text-5xl">🎉</span>
      </div>

      <div>
        <h2 className="text-3xl font-outfit font-extrabold text-text-primary mb-2">
          You&apos;re all set!
        </h2>
        <p className="text-text-secondary text-sm">
          You&apos;re ready to start forecasting. Browse active questions and make your first real prediction.
        </p>
      </div>

      <div className="space-y-3">
        <a
          href="/questions"
          className="block w-full py-3 rounded-lg bg-accent-green text-white font-semibold hover:bg-accent-green/90 transition-colors text-center"
        >
          Browse Questions
        </a>
        <a
          href="/profile"
          className="block w-full py-3 rounded-lg border border-border-dark text-text-primary font-semibold hover:bg-white/5 transition-colors text-center"
        >
          Set up your profile
        </a>
      </div>

      <button
        onClick={onSkip}
        className="w-full text-center text-text-secondary text-sm hover:text-text-primary transition-colors"
      >
        Skip
      </button>
    </div>
  )
}

interface OnboardingModalProps {
  currentStep: OnboardingStep
  onNext: () => void
  onSkip: () => void
  onComplete: () => void
}

export default function OnboardingModal({
  currentStep,
  onNext,
  onSkip,
  onComplete,
}: OnboardingModalProps) {
  const handleNext = () => {
    if (currentStep < 3) {
      const next = (currentStep + 1) as OnboardingStep
      setOnboardingStep(next)
      onNext()
    } else {
      onComplete()
    }
  }

  const handleSkip = () => {
    onComplete()
  }

  // AQ-064: Backdrop click — only dismiss if clicking directly on the overlay
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleSkip()
    }
  }

  // Escape key handling
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        handleSkip()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label="Onboarding"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative w-full max-w-md rounded-2xl bg-bg-surface border border-border-dark shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
        {/* Close / Skip button (X) — always visible */}
        <button
          onClick={handleSkip}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full text-text-secondary hover:text-text-primary hover:bg-white/10 transition-colors z-10"
          aria-label="Close onboarding"
          title="Skip onboarding"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {([1, 2, 3] as OnboardingStep[]).map((step) => (
            <div
              key={step}
              className={`h-1.5 rounded-full transition-colors ${
                step <= currentStep
                  ? 'w-8 bg-accent-green'
                  : 'w-4 bg-border-dark'
              }`}
              aria-hidden="true"
            />
          ))}
        </div>

        {currentStep === 1 && <StepWelcome onNext={handleNext} onSkip={handleSkip} />}
        {currentStep === 2 && <StepGuidedForecast onNext={handleNext} onSkip={handleSkip} />}
        {currentStep === 3 && <StepComplete onSkip={handleSkip} />}
      </div>
    </div>
  )
}
