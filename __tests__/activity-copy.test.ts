import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

const activityPageSource = readFileSync(join(process.cwd(), 'app/activity/page.tsx'), 'utf8')

describe('activity page copy', () => {
  it('explains that public activity appears after resolution', () => {
    expect(activityPageSource).toContain('Activity appears after questions resolve')
    expect(activityPageSource).toContain(
      'Open-question forecasts stay hidden until resolution so every forecaster starts blind. Check back after the first outcomes are settled.'
    )
  })

  it('does not imply real-time open-question activity or exact activity counts', () => {
    expect(activityPageSource).not.toContain('Real-time forecasting activity')
    expect(activityPageSource).not.toContain('Browse open questions and add your forecast')
    expect(activityPageSource).not.toContain('Showing {items.length} most recent forecasts')
  })
})
