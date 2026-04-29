import { describe, it, expect } from 'vitest'
import {
  brierScore,
  logScore,
  daysRemaining,
  formatProbability,
  aggregateProbabilities,
  cn,
  formatDate,
  questionPhase,
} from '@/lib/utils'

// ─── brierScore ──────────────────────────────────────────────────────────────

describe('brierScore', () => {
  it('returns 0 for a perfect prediction (predict 1, outcome 1)', () => {
    expect(brierScore(1, 1)).toBe(0)
  })

  it('returns 0 for a perfect prediction (predict 0, outcome 0)', () => {
    expect(brierScore(0, 0)).toBe(0)
  })

  it('returns 1 for worst prediction (predict 0, outcome 1)', () => {
    expect(brierScore(0, 1)).toBe(1)
  })

  it('returns 1 for worst prediction (predict 1, outcome 0)', () => {
    expect(brierScore(1, 0)).toBe(1)
  })

  it('returns 0.25 for p=0.5 with either outcome', () => {
    expect(brierScore(0.5, 1)).toBeCloseTo(0.25, 10)
    expect(brierScore(0.5, 0)).toBeCloseTo(0.25, 10)
  })

  it('handles intermediate values correctly', () => {
    expect(brierScore(0.7, 1)).toBeCloseTo(0.09, 10)
    expect(brierScore(0.3, 0)).toBeCloseTo(0.09, 10)
  })

  it('clamps via square — predictions outside 0-1 just give large scores', () => {
    // p=2, outcome=0 → (2-0)^2 = 4
    expect(brierScore(2, 0)).toBe(4)
  })
})

// ─── logScore ────────────────────────────────────────────────────────────────

describe('logScore', () => {
  it('returns 0 for perfect prediction (predict 1, outcome 1)', () => {
    // p is clamped to 1 - 1e-10, so log2(1 - 1e-10) ≈ 0 (tiny negative)
    expect(logScore(1, 1)).toBeCloseTo(0, 6)
  })

  it('returns 0 for perfect prediction (predict 0, outcome 0)', () => {
    // p clamped to 1e-10, so log2(1 - 1e-10) ≈ 0
    expect(logScore(0, 0)).toBeCloseTo(0, 6)
  })

  it('returns very negative for worst prediction (predict 0, outcome 1)', () => {
    // p clamped to 1e-10, log2(1e-10) ≈ -33.2
    const score = logScore(0, 1)
    expect(score).toBeLessThan(-30)
    expect(score).toBeCloseTo(Math.log2(1e-10), 4)
  })

  it('returns very negative for worst prediction (predict 1, outcome 0)', () => {
    // p clamped to 1-1e-10, log2(1e-10) ≈ -33.2
    const score = logScore(1, 0)
    expect(score).toBeLessThan(-30)
    expect(score).toBeCloseTo(Math.log2(1e-10), 4)
  })

  it('returns -1 for p=0.5 with either outcome', () => {
    expect(logScore(0.5, 1)).toBeCloseTo(-1, 10)
    expect(logScore(0.5, 0)).toBeCloseTo(-1, 10)
  })

  it('gives better (less negative) scores for confident correct predictions', () => {
    const p80 = logScore(0.8, 1)
    const p50 = logScore(0.5, 1)
    expect(p80).toBeGreaterThan(p50)
  })

  it('handles p=0 gracefully (clamped) for outcome=1', () => {
    // Should not return -Infinity
    const score = logScore(0, 1)
    expect(Number.isFinite(score)).toBe(true)
    expect(score).toBeLessThan(-30)
  })

  it('handles p=1 gracefully (clamped) for outcome=0', () => {
    const score = logScore(1, 0)
    expect(Number.isFinite(score)).toBe(true)
    expect(score).toBeLessThan(-30)
  })
})

// ─── daysRemaining ───────────────────────────────────────────────────────────

describe('daysRemaining', () => {
  it('returns 0 for a date in the past', () => {
    const past = new Date(Date.now() - 86400000).toISOString()
    expect(daysRemaining(past)).toBe(0)
  })

  it('returns 0 for a date right now', () => {
    const now = new Date().toISOString()
    // Depending on timing this could be 0 or 1; since we ceil, anything < 24h → 1
    // But if the diff is 0 or negative, it returns 0
    expect([0, 1]).toContain(daysRemaining(now))
  })

  it('returns a positive number for a future date', () => {
    const future = new Date(Date.now() + 5 * 86400000).toISOString()
    expect(daysRemaining(future)).toBeGreaterThanOrEqual(4)
    expect(daysRemaining(future)).toBeLessThanOrEqual(5)
  })
})

// ─── formatProbability ──────────────────────────────────────────────────────

describe('formatProbability', () => {
  it('formats integers as percentages', () => {
    expect(formatProbability(50)).toBe('50%')
    expect(formatProbability(0)).toBe('0%')
    expect(formatProbability(100)).toBe('100%')
  })

  it('rounds to nearest integer', () => {
    expect(formatProbability(73.7)).toBe('74%')
    expect(formatProbability(73.3)).toBe('73%')
  })
})

// ─── aggregateProbabilities ──────────────────────────────────────────────────

describe('aggregateProbabilities', () => {
  it('returns 50 for an empty array', () => {
    expect(aggregateProbabilities([])).toBe(50)
  })

  it('returns the single value for one prediction', () => {
    expect(aggregateProbabilities([75])).toBe(75)
  })

  it('computes geometric mean for two predictions', () => {
    // Geometric mean of 25 and 75: sqrt(0.25 * 0.75) * 100 ≈ 43.3 → 43
    const result = aggregateProbabilities([25, 75])
    expect(result).toBe(43)
  })

  it('returns 50 for 50 and 50', () => {
    expect(aggregateProbabilities([50, 50])).toBe(50)
  })

  it('clamps to [1, 99]', () => {
    expect(aggregateProbabilities([0])).toBe(1)
    expect(aggregateProbabilities([100])).toBe(99)
  })
})

// ─── cn ──────────────────────────────────────────────────────────────────────

describe('cn', () => {
  it('joins string classes', () => {
    expect(cn('foo', 'bar')).toBe('foo bar')
  })

  it('filters out falsy values', () => {
    expect(cn('foo', false, null, undefined, 'bar')).toBe('foo bar')
  })

  it('returns empty string for no args', () => {
    expect(cn()).toBe('')
  })
})

// ─── formatDate ──────────────────────────────────────────────────────────────

describe('formatDate', () => {
  it('formats a date string', () => {
    const result = formatDate('2025-06-15T00:00:00Z')
    // Output depends on timezone, but should contain month and year
    expect(result).toContain('2025')
    expect(result).toContain('Jun')
  })
})

// ─── questionPhase ───────────────────────────────────────────────────────────

describe('questionPhase', () => {
  const farFuture = new Date(Date.now() + 30 * 86400000).toISOString()
  const farPast = new Date(Date.now() - 30 * 86400000).toISOString()

  it('returns "resolved" for resolved questions', () => {
    expect(questionPhase('resolved', null, farFuture)).toBe('resolved')
  })

  it('returns "closed" for closed questions', () => {
    expect(questionPhase('closed', null, farFuture)).toBe('closed')
  })

  it('returns "blind" when blind_until is in the future', () => {
    const blindUntil = new Date(Date.now() + 7 * 86400000).toISOString()
    expect(questionPhase('open', blindUntil, farFuture)).toBe('blind')
  })

  it('returns "closed" when closes_at is in the past', () => {
    expect(questionPhase('open', null, farPast)).toBe('closed')
  })

  it('returns "open" when past blind_until but before closes_at', () => {
    const blindPast = new Date(Date.now() - 7 * 86400000).toISOString()
    expect(questionPhase('open', blindPast, farFuture)).toBe('open')
  })
})
