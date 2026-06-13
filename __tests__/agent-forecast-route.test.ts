import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const mockCreateClient = vi.fn()

vi.mock('@supabase/supabase-js', () => ({
  createClient: mockCreateClient,
}))

const questionId = '123e4567-e89b-12d3-a456-426614174000'

function createQuestionQuery() {
  const query = {
    select: vi.fn(() => query),
    eq: vi.fn(() => query),
    single: vi.fn(async () => ({
      data: {
        id: questionId,
        title: 'Will the launch happen before July?',
        description: 'Public launch date question',
        category: 'Technology',
        status: 'open',
        question_type: 'binary',
        resolution_source: 'Company announcement',
        blind_until: '2099-06-20T00:00:00.000Z',
        closes_at: '2099-07-01T00:00:00.000Z',
      },
      error: null,
    })),
  }
  return query
}

describe('POST /api/agent/forecast', () => {
  const originalEnv = process.env

  beforeEach(() => {
    vi.resetModules()
    vi.clearAllMocks()
    process.env = {
      ...originalEnv,
      AGENT_ENDPOINT_SECRET: 'agent-secret',
      AGENT_API_KEY: 'llm-secret',
      SUPABASE_URL: 'https://example.supabase.co',
      SUPABASE_SERVICE_ROLE_KEY: 'service-role-secret',
    }
  })

  afterEach(() => {
    process.env = originalEnv
    vi.restoreAllMocks()
  })

  it('keeps dry runs read-only after reading the canonical question and calling the model', async () => {
    const questionQuery = createQuestionQuery()
    const from = vi.fn((table: string) => {
      if (table !== 'questions') {
        throw new Error(`dry_run should not touch ${table}`)
      }
      return questionQuery
    })
    const authAdmin = {
      listUsers: vi.fn(async () => {
        throw new Error('dry_run should not list auth users')
      }),
      createUser: vi.fn(async () => {
        throw new Error('dry_run should not create auth users')
      }),
    }

    mockCreateClient.mockReturnValue({
      from,
      auth: { admin: authAdmin },
    })

    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(
        JSON.stringify({
          choices: [
            {
              message: {
                content: JSON.stringify({ probability: 57, reasoning: 'Base rates and timing support a modest yes.' }),
              },
            },
          ],
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } },
      ),
    )

    const { POST } = await import('../app/api/agent/forecast/route')
    const response = await POST(
      new Request('https://baycast.test/api/agent/forecast', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer agent-secret',
        },
        body: JSON.stringify({
          question_id: questionId,
          question_text: 'Client supplied text must be ignored',
          dry_run: true,
        }),
      }),
    )

    expect(response.status).toBe(200)
    const body = await response.json()
    expect(body).toMatchObject({
      ok: true,
      dry_run: true,
      forecast: {
        question_id: questionId,
        user_id: 'dry-run:product_radar',
      },
    })

    expect(from).toHaveBeenCalledTimes(1)
    expect(from).toHaveBeenCalledWith('questions')
    expect(questionQuery.select).toHaveBeenCalledWith('id,title,description,category,status,question_type,resolution_source,blind_until,closes_at')
    expect(questionQuery.eq).toHaveBeenCalledWith('id', questionId)
    expect(questionQuery.single).toHaveBeenCalledTimes(1)
    expect(authAdmin.listUsers).not.toHaveBeenCalled()
    expect(authAdmin.createUser).not.toHaveBeenCalled()
    expect(fetchMock).toHaveBeenCalledTimes(1)

    const llmBody = JSON.parse(String(fetchMock.mock.calls[0]?.[1]?.body))
    const prompt = llmBody.messages[1].content as string
    expect(prompt).toContain('Will the launch happen before July?')
    expect(prompt).not.toContain('Client supplied text must be ignored')
  })
})
