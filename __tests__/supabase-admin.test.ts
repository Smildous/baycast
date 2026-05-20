import { beforeAll, describe, expect, it } from 'vitest'

let analyzeResolutionReadiness: (questions: any[], options?: any) => any
let parseResolutionSourceFixes: (rawFixes: unknown) => { id: string; resolution_source: string }[]
let updateResolutionSourcesLive: (client: unknown, fixes: unknown, options?: { apply?: boolean }) => Promise<any>
let verifyBlindUntilLive: (client: unknown, options?: { now?: Date }) => Promise<any>
let verifyResolutionReadinessLive: (client: unknown, options?: any) => Promise<any>
let verifyResolutionUrlsLive: (client: unknown) => Promise<any>

beforeAll(async () => {
  ;({ analyzeResolutionReadiness, parseResolutionSourceFixes, updateResolutionSourcesLive, verifyBlindUntilLive, verifyResolutionReadinessLive, verifyResolutionUrlsLive } = await import('../scripts/supabase-admin.mjs'))
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

  it('can focus the read-only readiness report on June closing questions', () => {
    const report = analyzeResolutionReadiness(
      [
        {
          id: 'may-close',
          title: 'May question',
          description: 'This resolves based on the official published result.',
          status: 'open',
          question_type: 'binary',
          resolution_source: 'https://example.com/may',
          closes_at: '2026-05-31T23:59:59.000Z',
        },
        {
          id: 'june-ready',
          title: 'June ready question',
          description: 'This resolves based on the official published result.',
          status: 'open',
          question_type: 'binary',
          resolution_source: 'https://example.com/june',
          closes_at: '2026-06-15T00:00:00.000Z',
        },
        {
          id: 'june-needs-source',
          title: 'June source question',
          description: 'This resolves based on the official published result.',
          status: 'open',
          question_type: 'binary',
          resolution_source: null,
          closes_at: '2026-06-30T23:00:00.000Z',
        },
        {
          id: 'july-close',
          title: 'July question',
          description: 'This resolves based on the official published result.',
          status: 'open',
          question_type: 'binary',
          resolution_source: 'https://example.com/july',
          closes_at: '2026-07-01T00:00:00.000Z',
        },
        {
          id: 'undated',
          title: 'Undated question',
          description: 'This resolves based on the official published result.',
          status: 'open',
          question_type: 'binary',
          resolution_source: 'https://example.com/undated',
          closes_at: null,
        },
      ],
      {
        now: new Date('2026-05-20T00:00:00.000Z'),
        from: '2026-06-01T00:00:00.000Z',
        until: '2026-06-30T23:59:59.999Z',
      },
    )

    expect(report).toMatchObject({
      ok: false,
      window_from: '2026-06-01T00:00:00.000Z',
      window_until: '2026-06-30T23:59:59.999Z',
      open_questions: 5,
      soon_closing_open_questions: 2,
      ready_soon_closing_open_questions: 1,
      not_ready_soon_closing_open_questions: 1,
      missing_by_field: { resolution_source: 1 },
    })
    expect(report.soon_closing_questions.map((question: { id: string }) => question.id)).toEqual(['june-ready', 'june-needs-source'])
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

  it('passes a June date window through the live read-only verifier', async () => {
    const client = makeResolutionReadinessClient({
      openRows: [
        {
          id: 'june-ready',
          title: 'June ready question',
          description: 'This resolves based on the official published result.',
          status: 'open',
          question_type: 'binary',
          resolution_source: 'https://example.com/june',
          closes_at: '2026-06-15T00:00:00.000Z',
        },
        {
          id: 'july-ready',
          title: 'July ready question',
          description: 'This resolves based on the official published result.',
          status: 'open',
          question_type: 'binary',
          resolution_source: 'https://example.com/july',
          closes_at: '2026-07-01T00:00:00.000Z',
        },
      ],
    })

    const report = await verifyResolutionReadinessLive(client, {
      now: new Date('2026-05-20T00:00:00.000Z'),
      from: '2026-06-01T00:00:00.000Z',
      until: '2026-06-30T23:59:59.999Z',
    })

    expect(report).toMatchObject({
      mode: 'readonly',
      window_from: '2026-06-01T00:00:00.000Z',
      window_until: '2026-06-30T23:59:59.999Z',
      soon_closing_open_questions: 1,
    })
    expect(report.soon_closing_questions.map((question: { id: string }) => question.id)).toEqual(['june-ready'])
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

function makeResolutionSourceUpdateClient({ rows = [], lookupError, updateError }: { rows?: any[]; lookupError?: unknown; updateError?: unknown } = {}) {
  const calls: string[] = []
  const updates: any[] = []

  return {
    calls,
    updates,
    from(table: string) {
      expect(table).toBe('questions')
      return {
        select(columns: string) {
          calls.push(`select:${columns}`)
          expect(columns).toBe('id,title,status,resolution_source')
          return {
            in(column: string, ids: string[]) {
              calls.push(`in:${column}:${ids.join(',')}`)
              expect(column).toBe('id')
              return Promise.resolve({ data: rows, error: lookupError || null })
            },
          }
        },
        update(patch: { resolution_source: string }) {
          calls.push(`update:${patch.resolution_source}`)
          updates.push(patch)
          return {
            eq(column: string, id: string) {
              calls.push(`eq:${column}:${id}`)
              expect(column).toBe('id')
              return {
                select(columns: string) {
                  calls.push(`update-select:${columns}`)
                  expect(columns).toBe('id,title,status,resolution_source')
                  return {
                    single() {
                      if (updateError) return Promise.resolve({ data: null, error: updateError })
                      return Promise.resolve({ data: { id, title: 'Updated', status: 'open', resolution_source: patch.resolution_source }, error: null })
                    },
                  }
                },
              }
            },
          }
        },
      }
    },
  }
}

describe('updateResolutionSourcesLive', () => {
  it('validates fixes before any Supabase call', () => {
    expect(() => parseResolutionSourceFixes({})).toThrow('must be a JSON array')
    expect(() => parseResolutionSourceFixes([{ id: 'q1', resolution_source: 'not a url' }])).toThrow('usable http(s) URL')
    expect(() => parseResolutionSourceFixes([
      { id: 'q1', resolution_source: 'https://example.com/a' },
      { id: 'q1', resolution_source: 'https://example.com/b' },
    ])).toThrow('duplicate fix id')
  })

  it('dry-runs by default and never updates rows', async () => {
    const client = makeResolutionSourceUpdateClient({
      rows: [
        { id: 'q1', title: 'Needs source', status: 'open', resolution_source: null },
        { id: 'q2', title: 'Already fixed', status: 'open', resolution_source: 'https://example.com/old' },
      ],
    })

    const report = await updateResolutionSourcesLive(client, [
      { id: 'q1', resolution_source: 'https://example.com/source' },
      { id: 'q2', resolution_source: 'https://example.com/old' },
    ])

    expect(report).toMatchObject({
      ok: true,
      mode: 'dry_run',
      dry_run: true,
      requested_updates: 2,
      found_questions: 2,
      missing_ids: [],
    })
    expect(report.planned_updates.map((update: { id: string }) => update.id)).toEqual(['q1'])
    expect(report.unchanged.map((update: { id: string }) => update.id)).toEqual(['q2'])
    expect(client.updates).toEqual([])
    expect(client.calls).toEqual(['select:id,title,status,resolution_source', 'in:id:q1,q2'])
  })

  it('applies updates only when apply is true and all ids exist', async () => {
    const client = makeResolutionSourceUpdateClient({
      rows: [{ id: 'q1', title: 'Needs source', status: 'open', resolution_source: null }],
    })

    const report = await updateResolutionSourcesLive(client, [{ id: 'q1', resolution_source: 'https://example.com/source' }], { apply: true })

    expect(report).toMatchObject({
      ok: true,
      mode: 'apply',
      dry_run: false,
      requested_updates: 1,
      found_questions: 1,
    })
    expect(client.updates).toEqual([{ resolution_source: 'https://example.com/source' }])
    expect(report.applied_updates).toEqual([{ id: 'q1', title: 'Updated', status: 'open', resolution_source: 'https://example.com/source' }])
  })

  it('does not apply partial updates when any id is missing', async () => {
    const client = makeResolutionSourceUpdateClient({
      rows: [{ id: 'q1', title: 'Needs source', status: 'open', resolution_source: null }],
    })

    const report = await updateResolutionSourcesLive(client, [
      { id: 'q1', resolution_source: 'https://example.com/source' },
      { id: 'missing', resolution_source: 'https://example.com/missing' },
    ], { apply: true })

    expect(report).toMatchObject({ ok: false, mode: 'apply', missing_ids: ['missing'] })
    expect(client.updates).toEqual([])
  })
})
