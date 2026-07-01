import { afterEach, describe, expect, it, vi } from 'vitest'
import { hasQuestionClosed, isClosingSoon } from '@/lib/utils'

const NOW = new Date('2026-07-01T19:00:00.000Z').getTime()

describe('closing soon date semantics', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('keeps the closing-soon zero state aligned with public cards after settlement time passes', () => {
    vi.spyOn(Date, 'now').mockReturnValue(NOW)

    const settledToday = '2026-07-01T00:00:00.000Z'

    expect(hasQuestionClosed(settledToday)).toBe(true)
    expect(isClosingSoon(settledToday, 14)).toBe(false)
  })

  it('still treats future same-day open questions as closing soon', () => {
    vi.spyOn(Date, 'now').mockReturnValue(NOW)

    const laterToday = '2026-07-01T23:59:00.000Z'

    expect(hasQuestionClosed(laterToday)).toBe(false)
    expect(isClosingSoon(laterToday, 14)).toBe(true)
  })
})
