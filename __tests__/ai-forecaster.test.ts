import { describe, expect, it } from 'vitest'
import {
  AGENT_PERSONAS,
  buildAgentSystemPrompt,
  buildAgentUserPrompt,
  buildStoredAgentPrediction,
  getAgentPersona,
  normalizeProbability,
  parseAgentForecast,
  validateQuestionForAgent,
  type QuestionForAgent,
} from '@/lib/ai-forecaster'

const openQuestion: QuestionForAgent = {
  id: '9345891c-192a-4915-acad-8bed7c554333',
  title: 'Will the 2026 Atlantic hurricane season have a named storm before June 15?',
  description: 'Resolution uses National Hurricane Center named storm records.',
  category: 'science',
  status: 'open',
  question_type: 'binary',
  resolution_source: 'National Hurricane Center',
  blind_until: '2026-06-01T00:00:00+00:00',
  closes_at: '2026-06-15T00:00:00+00:00',
}

describe('AI forecaster helpers', () => {
  it('normalizes probabilities to safe integer bounds', () => {
    expect(normalizeProbability(0)).toBe(1)
    expect(normalizeProbability(42.4)).toBe(42)
    expect(normalizeProbability(99.8)).toBe(99)
    expect(normalizeProbability('63')).toBe(63)
    expect(() => normalizeProbability('nope')).toThrow('finite number')
  })

  it('parses fenced JSON forecasts and trims reasoning', () => {
    const parsed = parseAgentForecast('```json\n{"probability": 61.7, "reasoning": "  Public base rates point slightly above even.  "}\n```')
    expect(parsed).toEqual({
      probability: 62,
      reasoning: 'Public base rates point slightly above even.',
    })
  })

  it('validates open binary questions only', () => {
    expect(() => validateQuestionForAgent(openQuestion, new Date('2026-05-18T00:00:00Z'))).not.toThrow()
    expect(() => validateQuestionForAgent({ ...openQuestion, status: 'resolved' }, new Date('2026-05-18T00:00:00Z'))).toThrow('not open')
    expect(() => validateQuestionForAgent({ ...openQuestion, closes_at: '2026-01-01T00:00:00Z' }, new Date('2026-05-18T00:00:00Z'))).toThrow('already closed')
    expect(() => validateQuestionForAgent({ ...openQuestion, blind_until: null }, new Date('2026-05-18T00:00:00Z'))).toThrow('missing blind_until')
    expect(() => validateQuestionForAgent({ ...openQuestion, blind_until: '2026-05-17T00:00:00Z' }, new Date('2026-05-18T00:00:00Z'))).toThrow('blind phase is not active')
  })

  it('keeps Baycast consensus and gambling language out of the agent prompt', () => {
    const prompt = buildAgentSystemPrompt(AGENT_PERSONAS.climatology_scout).toLowerCase()
    expect(prompt).toContain('prediction polling')
    expect(prompt).toContain('not gambling')
    expect(prompt).toContain('do not infer baycast consensus')
    expect(prompt).toContain('do not mention betting')
  })

  it('builds a server-side prompt from canonical question data', () => {
    const prompt = buildAgentUserPrompt(openQuestion, 'Use only public NHC records.')
    expect(prompt).toContain(openQuestion.id)
    expect(prompt).toContain(openQuestion.title)
    expect(prompt).toContain('National Hurricane Center')
    expect(prompt).not.toContain('aggregate_probability')
    expect(prompt).not.toContain('forecaster_count')
  })

  it('stores audit metadata inside prediction JSON', () => {
    const agent = getAgentPersona('macro_tape')
    const prediction = buildStoredAgentPrediction(
      { probability: 54, reasoning: 'The official threshold is close to recent monthly readings.' },
      agent,
      'gpt-4o',
    )

    expect(prediction).toMatchObject({
      probability: 54,
      forecaster_type: 'ai',
      agent_id: 'macro_tape',
      agent_name: 'Baycast Macro Tape',
      agent_version: 'macro-tape-v0',
      prompt_version: 'ai-forecaster-v0.1',
      model: 'gpt-4o',
    })
  })

  it('blocks forbidden advice and gambling terms in stored reasoning', () => {
    expect(() => buildStoredAgentPrediction(
      { probability: 52, reasoning: 'This is not a signal to buy anything.' },
      AGENT_PERSONAS.macro_tape,
      'gpt-4o',
    )).toThrow('forbidden term')
  })
})
