import { describe, it, expect } from 'vitest'
import {
  calculateBadgeTier,
  getDisplayBadge,
  BADGE_CONFIG,
  BADGE_TIER_ORDER,
} from '@/lib/types'
import type { BadgeTier } from '@/lib/types'

// ─── calculateBadgeTier ───────────────────────────────────────────────────

describe('calculateBadgeTier', () => {
  it('returns rookie for 0 resolved forecasts', () => {
    expect(calculateBadgeTier(0)).toBe('rookie')
  })

  it('returns rookie for 1-4 resolved forecasts', () => {
    expect(calculateBadgeTier(1)).toBe('rookie')
    expect(calculateBadgeTier(2)).toBe('rookie')
    expect(calculateBadgeTier(3)).toBe('rookie')
    expect(calculateBadgeTier(4)).toBe('rookie')
  })

  it('returns forecaster for 5 resolved forecasts (inclusive lower bound)', () => {
    expect(calculateBadgeTier(5)).toBe('forecaster')
  })

  it('returns forecaster for 5-19 resolved forecasts', () => {
    expect(calculateBadgeTier(6)).toBe('forecaster')
    expect(calculateBadgeTier(10)).toBe('forecaster')
    expect(calculateBadgeTier(19)).toBe('forecaster')
  })

  it('returns expert for 20 resolved forecasts (inclusive lower bound)', () => {
    expect(calculateBadgeTier(20)).toBe('expert')
  })

  it('returns expert for 20-49 resolved forecasts', () => {
    expect(calculateBadgeTier(25)).toBe('expert')
    expect(calculateBadgeTier(49)).toBe('expert')
  })

  it('returns oracle for 50 resolved forecasts (inclusive lower bound)', () => {
    expect(calculateBadgeTier(50)).toBe('oracle')
  })

  it('returns oracle for very high counts', () => {
    expect(calculateBadgeTier(100)).toBe('oracle')
    expect(calculateBadgeTier(500)).toBe('oracle')
  })

  it('handles negative counts gracefully (returns rookie)', () => {
    expect(calculateBadgeTier(-1)).toBe('rookie')
    expect(calculateBadgeTier(-100)).toBe('rookie')
  })
})

// ─── getDisplayBadge ──────────────────────────────────────────────────────

describe('getDisplayBadge', () => {
  it('returns current tier when both are the same', () => {
    expect(getDisplayBadge('rookie', 'rookie')).toBe('rookie')
    expect(getDisplayBadge('forecaster', 'forecaster')).toBe('forecaster')
    expect(getDisplayBadge('expert', 'expert')).toBe('expert')
    expect(getDisplayBadge('oracle', 'oracle')).toBe('oracle')
  })

  it('returns the higher tier when ever_reached > current', () => {
    // User was once an expert but currently only has rookie-level resolved count
    expect(getDisplayBadge('rookie', 'expert')).toBe('expert')
  })

  it('returns the higher tier when current > ever_reached', () => {
    expect(getDisplayBadge('expert', 'rookie')).toBe('expert')
  })

  it('never returns a tier lower than either input', () => {
    expect(getDisplayBadge('forecaster', 'oracle')).toBe('oracle')
    expect(getDisplayBadge('oracle', 'forecaster')).toBe('oracle')
  })

  it('handles rookie vs all tiers correctly', () => {
    expect(getDisplayBadge('rookie', 'forecaster')).toBe('forecaster')
    expect(getDisplayBadge('rookie', 'expert')).toBe('expert')
    expect(getDisplayBadge('rookie', 'oracle')).toBe('oracle')
    expect(getDisplayBadge('forecaster', 'rookie')).toBe('forecaster')
  })
})

// ─── BADGE_CONFIG ─────────────────────────────────────────────────────────

describe('BADGE_CONFIG', () => {
  const tiers: BadgeTier[] = ['rookie', 'forecaster', 'expert', 'oracle']

  it('has config for all four tiers', () => {
    for (const tier of tiers) {
      expect(BADGE_CONFIG[tier]).toBeDefined()
    }
  })

  it('each tier has the required fields', () => {
    for (const tier of tiers) {
      const config = BADGE_CONFIG[tier]
      expect(typeof config.name).toBe('string')
      expect(config.name.length).toBeGreaterThan(0)
      expect(typeof config.emoji).toBe('string')
      expect(config.emoji.length).toBeGreaterThan(0)
      expect(typeof config.color).toBe('string')
      expect(config.color).toMatch(/^#[0-9a-f]{6}$/i)
      expect(typeof config.minResolved).toBe('number')
      expect(config.minResolved).toBeGreaterThanOrEqual(0)
    }
  })

  it('minResolved thresholds are strictly increasing', () => {
    const mins = tiers.map((t) => BADGE_CONFIG[t].minResolved)
    for (let i = 1; i < mins.length; i++) {
      expect(mins[i]).toBeGreaterThan(mins[i - 1])
    }
  })
})

// ─── BADGE_TIER_ORDER ─────────────────────────────────────────────────────

describe('BADGE_TIER_ORDER', () => {
  it('contains all four tiers in ascending order', () => {
    expect(BADGE_TIER_ORDER).toEqual(['rookie', 'forecaster', 'expert', 'oracle'])
  })

  it('has exactly four entries', () => {
    expect(BADGE_TIER_ORDER).toHaveLength(4)
  })
})
