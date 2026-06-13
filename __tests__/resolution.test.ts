import { describe, expect, it } from 'vitest'
import { formatResolutionOutcome } from '@/lib/resolution'

describe('formatResolutionOutcome', () => {
  it('formats common resolved payload shapes without leaking JSON', () => {
    expect(formatResolutionOutcome({ outcome: false })).toBe('No')
    expect(formatResolutionOutcome({ result: 'yes' })).toBe('Yes')
    expect(formatResolutionOutcome({ resolved_to: 0 })).toBe('No')
  })

  it('falls back cleanly when the payload does not contain a binary outcome', () => {
    expect(formatResolutionOutcome({ note: 'settled from source' })).toBe('Unknown')
    expect(formatResolutionOutcome(null)).toBe('Unknown')
  })
})
