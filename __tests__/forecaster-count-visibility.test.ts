import { describe, expect, it } from 'vitest'
import {
  formatForecasterCount,
  formatParticipationLabel,
  formatParticipationValue,
  publicQuestionMetadataDescription,
} from '@/lib/forecaster-count-visibility'

describe('forecaster count visibility', () => {
  const counts = [0, 1, 2, 49, 50]

  it('hides exact participation counts while locked', () => {
    for (const count of counts) {
      expect(formatParticipationValue(count, false)).toBe('—')
      expect(formatParticipationLabel(count, false)).toBe('Community signal locked')
    }
  })

  it('shows exact participation counts after unlock', () => {
    const expected: Record<number, string> = {
      0: 'Awaiting forecasts',
      1: '1 forecaster',
      2: '2 forecasters',
      49: '49 forecasters',
      50: '50 forecasters',
    }

    for (const count of counts) {
      expect(formatParticipationValue(count, true)).toBe(count === 0 ? '—' : String(count))
      expect(formatParticipationLabel(count, true)).toBe(expected[count])
    }
  })

  it('formats singular and plural unlocked counts', () => {
    expect(formatForecasterCount(0)).toBe('Awaiting forecasts')
    expect(formatForecasterCount(1)).toBe('1 forecaster')
    expect(formatForecasterCount(2)).toBe('2 forecasters')
  })

  it('keeps public metadata count-free', () => {
    const description = publicQuestionMetadataDescription(
      'Technology',
      'open',
      'Will the launch happen?'
    )

    expect(description).toBe(
      'Technology · Open · Forecast before seeing the community consensus. Will the launch happen?'
    )
    expect(description).not.toMatch(/\d+ forecaster|No forecasts yet|Growing community|50\+/)
  })
})
