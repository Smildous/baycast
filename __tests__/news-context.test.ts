import { describe, expect, it } from 'vitest'
import { getQuestionNewsContext } from '@/lib/news-context'

describe('getQuestionNewsContext', () => {
  it('returns static links for category context', () => {
    const links = getQuestionNewsContext({
      title: 'Will US CPI inflation be above target in June?',
      category: 'Economy',
    })

    expect(links.length).toBeGreaterThanOrEqual(2)
    expect(links.length).toBeLessThanOrEqual(3)
    expect(links.some((link) => link.source === 'Federal Reserve')).toBe(true)
    expect(links.every((link) => link.url.startsWith('https://'))).toBe(true)
  })

  it('uses title keywords across categories', () => {
    const links = getQuestionNewsContext({
      title: 'Will OpenAI release a new frontier model before September?',
      category: 'Other',
    })

    expect(links.length).toBeGreaterThanOrEqual(2)
    expect(links.map((link) => link.source)).toContain('OpenAI')
  })

  it('returns an empty list when no safe static context exists', () => {
    const links = getQuestionNewsContext({
      title: 'Will the local demo day finish before lunch?',
      category: 'Other',
    })

    expect(links).toEqual([])
  })

  it('does not include BCP-sensitive copy in static context', () => {
    const links = getQuestionNewsContext({
      title: 'Will Bitcoin remain above its current range?',
      category: 'Crypto',
    })
    const copy = JSON.stringify(links).toLowerCase()

    expect(copy).not.toContain('consensus')
    expect(copy).not.toContain('forecaster')
    expect(copy).not.toContain('aggregate probability')
    expect(copy).not.toContain('gambling')
  })
})
