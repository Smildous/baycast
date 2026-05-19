import { beforeAll, describe, expect, it } from 'vitest'

let analyzeResolutionReadiness: (questions: any[], options?: { now?: Date; soonDays?: number; availableColumns?: string[] }) => any
let verifyBlindUntilLive: (client: unknown, options?: { now?: Date }) => Promise<any>
let verifyResolutionReadinessLive: (client: unknown, options?: { now?: Date; soonDays?: number }) => Promise<any>
let verifyResolutionUrlsLive: (client: unknown) => Promise<any>

beforeAll(async () => {
  ;({ analyzeResolutionReadiness, verifyBlindUntilLive, verifyResolutionReadinessLive, verifyResolutionUrlsLive } = await import('../scripts/supabase-admin.mjs'))
})

function makeClient({ probeError, openRows = [], openError }: { probeError?: unknown; openRows?: unknown[]; openError?: unknown } = {}) {
  const calls: string[] = []

  return {
    calls,
    from(table: string) {
      expect(table).toBe('questions')
      return {
        select(columns: string) {
          calls.push(columns)

          if (columns === 'blind_until') {
            return {
              limit() {
                return Promise.resolve({ data: probeError ? null : [], error: probeError || null })
              },
            }
          }

          return {
            eq(column: string, value: string) {
              expect(column).toBe('status')
              expect(value).toBe('open')
              return {
                order(column: string, options: { ascending: boolean }) {
                  expect(column).toBe('closes_at')
                  expect(options).toEqual({ ascending: true })
                  return Promise.resolve({ data: openRows, error: openError || null })
                },
              }
            },
          }
        },
      }
    },
  }
}

describe('verifyBlindUntilLive', () => {
  it('fails cleanly when the live blind_until column is missing', async () => {
    const client = makeClient({ probeError: { code: '42703', message: 'column questions.blind_until does not exist' } })

    await expect(verifyBlindUntilLive(client)).rejects.toMatchObject({
      code: 'AQ227_MISSING_BLIND_UNTIL',
      message: expect.stringContaining('questions.blind_until is missing'),
    })
  })

  it('reports open questions without an active blind phase', async () => {
    const now = new Date('2026-05-19T07:00:00.000Z')
    const client = makeClient({
      openRows: [
        {
          id: 'active',
          title: 'Active blind phase',
          closes_at: '2026-05-25T07:00:00.000Z',
          blind_until: '2026-05-21T07:00:00.000Z',
        },
        {
          id: 'missing',
          title: 'Missing blind phase',
          closes_at: '2026-05-25T07:00:00.000Z',
          blind_until: null,
        },
        {
          id: 'expired',
          title: 'Expired blind phase',
          closes_at: '2026-05-25T07:00:00.000Z',
          blind_until: '2026-05-18T07:00:00.000Z',
        },
      ],
    })

    const report = await verifyBlindUntilLive(client, { now })

    expect(report).toMatchObject({
      ok: false,
      column_present: true,
      open_questions: 3,
      open_with_active_blind_phase: 1,
      open_without_active_blind_phase: 2,
    })
    expect(report.unsafe_open_questions.map((question: { id: string }) => question.id)).toEqual(['missing', 'expired'])
  })
})


describe('analyzeResolutionReadiness', () => {
  it('reports soon-closing open questions that are ready for objective settlement', () => {
    const report = analyzeResolutionReadiness(
      [
        {
          id: 'ready',
          title: 'Will the official index close above 100?',
          description: 'This resolves YES if the official index published by the exchange closes above 100 before the deadline. Intraday values do not count.',
          status: 'open',
          category: 'Economy',
          question_type: 'binary',
          options: {},
          resolution_source: 'https://example.com/official-index',
          closes_at: '2026-05-25T00:00:00.000Z',
        },
        {
          id: 'later',
          title: 'Later question',
          description: 'This resolves based on official published data.',
          status: 'open',
          category: 'Economy',
          question_type: 'binary',
          resolution_source: 'https://example.com',
          closes_at: '2026-07-01T00:00:00.000Z',
        },
      ],
      { now: new Date('2026-05-19T00:00:00.000Z'), soonDays: 14 },
    )

    expect(report).toMatchObject({
      ok: true,
      open_questions: 2,
      soon_closing_open_questions: 1,
      ready_soon_closing_open_questions: 1,
      not_ready_soon_closing_open_questions: 0,
    })
    expect(report.soon_closing_questions).toHaveLength(1)
    expect(report.soon_closing_questions[0]).toMatchObject({ id: 'ready', ready: true, missing_fields: [] })
  })

  it('flags missing settlement fields and tolerates the resolution_date schema', () => {
    const report = analyzeResolutionReadiness(
      [
        {
          id: 'missing-fields',
          title: '',
          description: 'Vague.',
          status: 'open',
          question_type: 'multiple_choice',
          options: {},
          resolution_source: '',
          resolution_date: '2026-05-20T00:00:00.000Z',
        },
      ],
      {
        now: new Date('2026-05-19T00:00:00.000Z'),
        soonDays: 14,
        availableColumns: ['id', 'title', 'description', 'status', 'question_type', 'options', 'resolution_source', 'resolution_date'],
      },
    )

    expect(report.ok).toBe(false)
    expect(report.missing_by_field).toMatchObject({
      title: 1,
      resolution_source: 1,
      options: 1,
      objective_resolution_criteria: 1,
    })
    expect(report.soon_closing_questions[0]).toMatchObject({
      id: 'missing-fields',
      closes_at: '2026-05-20T00:00:00.000Z',
      ready: false,
    })
  })
})

function makeResolutionReadinessClient({ missingColumns = [], openRows = [], openError }: { missingColumns?: string[]; openRows?: unknown[]; openError?: unknown } = {}) {
  const calls: string[] = []

  return {
    calls,
    from(table: string) {
      expect(table).toBe('questions')
      return {
        select(columns: string) {
          calls.push(columns)
          if (!columns.includes(',')) {
            return {
              limit() {
                return Promise.resolve({
                  data: missingColumns.includes(columns) ? null : [],
                  error: missingColumns.includes(columns) ? { code: '42703', message: `column questions.${columns} does not exist` } : null,
                })
              },
            }
          }

          return {
            eq(column: string, value: string) {
              expect(column).toBe('status')
              expect(value).toBe('open')
              return {
                order(column: string, options: { ascending: boolean }) {
                  expect(['closes_at', 'resolution_date']).toContain(column)
                  expect(options).toEqual({ ascending: true })
                  return Promise.resolve({ data: openRows, error: openError || null })
                },
              }
            },
          }
        },
      }
    },
  }
}

describe('verifyResolutionReadinessLive', () => {
  it('probes optional columns and reads open questions without writing', async () => {
    const client = makeResolutionReadinessClient({
      missingColumns: ['closes_at'],
      openRows: [
        {
          id: 'legacy-date',
          title: 'Legacy date question',
          description: 'This resolves YES based on the official published result.',
          status: 'open',
          question_type: 'binary',
          resolution_source: 'Official source',
          resolution_date: '2026-05-20T00:00:00.000Z',
        },
      ],
    })

    const report = await verifyResolutionReadinessLive(client, { now: new Date('2026-05-19T00:00:00.000Z'), soonDays: 14 })

    expect(report).toMatchObject({
      mode: 'readonly',
      table: 'questions',
      missing_columns: ['closes_at'],
      soon_closing_open_questions: 1,
      not_ready_soon_closing_open_questions: 0,
    })
    expect(client.calls.some(call => call.includes('insert') || call.includes('update'))).toBe(false)
  })
})

function makeResolutionUrlsClient({ openRows = [], openError }: { openRows?: unknown[]; openError?: unknown } = {}) {
  const calls: string[] = []

  return {
    calls,
    from(table: string) {
      expect(table).toBe('questions')
      return {
        select(columns: string) {
          calls.push(columns)
          if (columns === 'resolution_url') {
            return {
              limit() {
                return Promise.resolve({ data: [], error: null })
              },
            }
          }
          expect(columns).toBe('id,title,status,resolution_url')
          return {
            eq(column: string, value: string) {
              calls.push(`eq:${column}:${value}`)
              expect(column).toBe('status')
              expect(value).toBe('open')
              return {
                order(column: string, options: { ascending: boolean }) {
                  calls.push(`order:${column}`)
                  expect(column).toBe('id')
                  expect(options).toEqual({ ascending: true })
                  return Promise.resolve({ data: openRows, error: openError || null })
                },
              }
            },
          }
        },
      }
    },
  }
}

describe('verifyResolutionUrlsLive', () => {
  it('falls back to resolution_source when the live schema has no resolution_url column', async () => {
    const calls: string[] = []
    const client = {
      calls,
      from(table: string) {
        expect(table).toBe('questions')
        return {
          select(columns: string) {
            calls.push(columns)
            if (columns === 'resolution_url') {
              return { limit: () => Promise.resolve({ data: null, error: { code: '42703', message: 'column questions.resolution_url does not exist' } }) }
            }
            if (columns === 'resolution_source') {
              return { limit: () => Promise.resolve({ data: [], error: null }) }
            }
            expect(columns).toBe('id,title,status,resolution_source')
            return {
              eq(column: string, value: string) {
                expect(column).toBe('status')
                expect(value).toBe('open')
                return {
                  order(column: string, options: { ascending: boolean }) {
                    expect(column).toBe('id')
                    expect(options).toEqual({ ascending: true })
                    return Promise.resolve({
                      data: [
                        { id: 'ready', title: 'Ready', status: 'open', resolution_source: 'https://example.com/source' },
                        { id: 'missing', title: 'Missing', status: 'open', resolution_source: null },
                      ],
                      error: null,
                    })
                  },
                }
              },
            }
          },
        }
      },
    }

    const report = await verifyResolutionUrlsLive(client)

    expect(report).toMatchObject({
      ok: false,
      resolution_url_column: 'resolution_source',
      open_questions: 2,
      open_with_usable_resolution_url: 1,
      open_missing_usable_resolution_url: 1,
    })
    expect(report.missing_resolution_url_questions).toEqual([{ id: 'missing', title: 'Missing', resolution_url: null }])
  })

  it('checks open questions for usable resolution_url values without writing', async () => {
    const client = makeResolutionUrlsClient({
      openRows: [
        { id: 'ready', title: 'Ready', status: 'open', resolution_url: 'https://example.com/source' },
        { id: 'embedded', title: 'Embedded', status: 'open', resolution_url: 'Official source: https://example.com/source' },
        { id: 'missing', title: 'Missing', status: 'open', resolution_url: null },
        { id: 'blank', title: 'Blank', status: 'open', resolution_url: '   ' },
        { id: 'bad', title: 'Bad', status: 'open', resolution_url: 'not a url' },
      ],
    })

    const report = await verifyResolutionUrlsLive(client)

    expect(report).toMatchObject({
      ok: false,
      mode: 'readonly',
      table: 'questions',
      status: 'open',
      open_questions: 5,
      open_with_usable_resolution_url: 2,
      open_missing_usable_resolution_url: 3,
    })
    expect(report.missing_resolution_url_questions.map((question: { id: string }) => question.id)).toEqual(['missing', 'blank', 'bad'])
    expect(client.calls).toEqual(['resolution_url', 'id,title,status,resolution_url', 'eq:status:open', 'order:id'])
  })
})
