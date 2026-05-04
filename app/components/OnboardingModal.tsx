'use client'

import { useState } from 'react'
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
  title: 'Will it rain in London tomorrow?',
  description: 'Drag to set your probability. Your forecast is hidden until Phase B.',
}

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
        onClick={onNext}
        className="w-full py-3 rounded-lg bg-accent-green text-white font-semibold hover:bg-accent-green/90 transition-colors"
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

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop — clicks close the modal */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleSkip} />

      {/* Modal */}
      <div className="relative w-full max-w-md rounded-2xl bg-bg-surface border border-border-dark shadow-2xl p-8">
        {/* Close / Skip button (X) — always visible */}
        <button
          onClick={handleSkip}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-text-secondary hover:text-text-primary hover:bg-white/10 transition-colors"
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
