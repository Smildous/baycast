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

  it('uses only Apple WWDC and Apple Newsroom for Apple Mac Pro context', () => {
    const links = getQuestionNewsContext({
      title: 'Will Apple announce a new Mac Pro at WWDC 2026?',
      category: 'Technology',
    })

    expect(links.map((link) => link.url)).toEqual([
      'https://developer.apple.com/wwdc26/',
      'https://www.apple.com/newsroom/',
    ])
    expect(JSON.stringify(links)).not.toContain('NIST')
    expect(JSON.stringify(links)).not.toContain('OpenAI')
  })

  it('uses only FIFA for the World Cup opening match context', () => {
    const links = getQuestionNewsContext({
      title: 'Will the 2026 FIFA World Cup opening match have at least three total goals?',
      category: 'Sports',
    })

    expect(links.map((link) => link.url)).toEqual([
      'https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026',
    ])
    expect(JSON.stringify(links)).not.toContain('AI.gov')
    expect(JSON.stringify(links)).not.toContain('The Athletic')
    expect(JSON.stringify(links)).not.toContain('ESPN')
  })

  it('uses only OpenAI official sources for OpenAI release context', () => {
    const links = getQuestionNewsContext({
      title: 'Will OpenAI release a new public video generation model before July 1, 2026?',
      category: 'Technology',
    })

    expect(links.map((link) => link.url)).toEqual([
      'https://openai.com/news/',
      'https://help.openai.com/en/articles/6825453-chatgpt-release-notes',
    ])
    expect(JSON.stringify(links)).not.toContain('NIST')
    expect(JSON.stringify(links)).not.toContain('NASA')
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
