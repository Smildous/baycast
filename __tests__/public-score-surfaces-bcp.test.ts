import { readFileSync } from 'fs'
import { join } from 'path'
import { describe, expect, it } from 'vitest'

const activityPageSource = readFileSync(join(process.cwd(), 'app/activity/page.tsx'), 'utf8')
const leaderboardPageSource = readFileSync(join(process.cwd(), 'app/leaderboard/page.tsx'), 'utf8')

describe('public score surface BCP safety', () => {
  it('keeps public activity scoped to resolved questions before exposing forecast payloads', () => {
    expect(activityPageSource).toContain(".from('forecasts')")
    expect(activityPageSource).toContain('questions:questions!forecasts_question_id_fkey!inner')
    expect(activityPageSource).toContain(".eq('questions.status', 'resolved')")
    expect(activityPageSource).not.toContain(".neq('questions.status', 'open')")
  })

  it('does not expose open-question consensus payload fields on activity', () => {
    expect(activityPageSource).not.toMatch(/aggregate_probability|forecasters_count|forecastCount|fcCount/)
  })

  it('builds the leaderboard from resolved score surfaces, not raw forecast payloads', () => {
    expect(leaderboardPageSource).toContain(".from('leaderboard')")
    expect(leaderboardPageSource).toContain(".from('scores')")
    expect(leaderboardPageSource).not.toContain(".from('forecasts')")
    expect(leaderboardPageSource).not.toMatch(/aggregate_probability|forecasters_count|forecastCount|fcCount/)
    expect(leaderboardPageSource).not.toMatch(/\.select\([^)]*prediction/)
  })
})
