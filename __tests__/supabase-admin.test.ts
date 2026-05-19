import { beforeAll, describe, expect, it } from 'vitest'

let verifyBlindUntilLive: (client: unknown, options?: { now?: Date }) => Promise<any>

beforeAll(async () => {
  ;({ verifyBlindUntilLive } = await import('../scripts/supabase-admin.mjs'))
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
