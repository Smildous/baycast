import { NextResponse } from 'next/server'
import { createClient as createSupabaseServiceClient } from '@supabase/supabase-js'
import {
  buildAgentSystemPrompt,
  buildAgentUserPrompt,
  buildStoredAgentPrediction,
  getAgentPersona,
  parseAgentForecast,
  validateQuestionForAgent,
  type AgentForecastResult,
  type AgentPersona,
  type QuestionForAgent,
} from '@/lib/ai-forecaster'

/**
 * POST /api/agent/forecast
 *
 * Production-safe AI forecaster endpoint.
 * It reads the question server-side, never accepts client-supplied question text,
 * never reads Baycast consensus before forecasting, and writes with service-role only.
 *
 * Required env:
 *   AGENT_ENDPOINT_SECRET
 *   AGENT_API_KEY
 *   SUPABASE_SERVICE_ROLE_KEY
 */

interface ForecastRequest {
  question_id: string
  agent_id?: string
  context?: string
  dry_run?: boolean
}

interface ForecastResponse {
  ok: boolean
  forecast?: {
    id?: string
    question_id: string
    user_id: string
    prediction: Record<string, unknown>
    created_at?: string
  }
  agent?: {
    id: string
    display_name: string
    version: string
  }
  dry_run?: boolean
  error?: string
}

const DEFAULT_MODEL = 'gpt-4o'
const DEFAULT_BASE_URL = 'https://api.openai.com/v1'
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

type SupabaseServiceClient = any

function getEnv(key: string, fallback: string): string {
  return process.env[key] || fallback
}

function hasValidEndpointSecret(request: Request): boolean {
  const expected = process.env.AGENT_ENDPOINT_SECRET
  if (!expected) return false
  const bearer = request.headers.get('authorization')?.replace(/^Bearer\s+/i, '').trim()
  const header = request.headers.get('x-agent-secret')?.trim()
  return bearer === expected || header === expected
}

function createServiceClient(): SupabaseServiceClient {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) throw new Error('Missing Supabase service-role configuration')

  return createSupabaseServiceClient(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}

async function callLLM(
  question: QuestionForAgent,
  agent: AgentPersona,
  context: string | undefined,
): Promise<{ result: AgentForecastResult; model: string }> {
  const apiKey = process.env.AGENT_API_KEY
  if (!apiKey) throw new Error('AGENT_API_KEY environment variable is not set')

  const model = getEnv('AGENT_MODEL', DEFAULT_MODEL)
  const baseUrl = getEnv('AGENT_BASE_URL', DEFAULT_BASE_URL).replace(/\/+$/, '')

  const response = await fetch(`${baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: 'system', content: buildAgentSystemPrompt(agent) },
        { role: 'user', content: buildAgentUserPrompt(question, context) },
      ],
      temperature: 0.2,
      max_tokens: 400,
      response_format: { type: 'json_object' },
    }),
  })

  if (!response.ok) {
    const errorBody = await response.text()
    throw new Error(`LLM API error (${response.status}): ${errorBody}`)
  }

  const data = await response.json()
  const content = data.choices?.[0]?.message?.content?.trim()
  if (!content) throw new Error('LLM returned empty response')

  return { result: parseAgentForecast(content), model }
}

async function findAuthUserByEmail(supabase: SupabaseServiceClient, email: string) {
  const perPage = 100
  for (let page = 1; page <= 20; page += 1) {
    const { data, error } = await supabase.auth.admin.listUsers({ page, perPage })
    if (error) throw new Error(`Could not list auth users: ${error.message}`)
    const found = data?.users?.find((user: { email?: string | null }) => user.email?.toLowerCase() === email.toLowerCase())
    if (found) return found
    if (!data?.users || data.users.length < perPage) return null
  }
  return null
}

async function ensureAgentProfile(supabase: SupabaseServiceClient, agent: AgentPersona): Promise<string> {
  const { data: existingProfiles, error: profileError } = await supabase
    .from('profiles')
    .select('id,display_name')
    .eq('display_name', agent.displayName)
    .limit(1)

  if (profileError) throw new Error(`Could not check agent profile: ${profileError.message}`)
  if (existingProfiles?.[0]?.id) return existingProfiles[0].id

  let authUser = await findAuthUserByEmail(supabase, agent.email)
  if (!authUser) {
    const { data, error } = await supabase.auth.admin.createUser({
      email: agent.email,
      password: crypto.randomUUID(),
      email_confirm: true,
      user_metadata: { display_name: agent.displayName, forecaster_type: 'ai' },
    })
    if (error) throw new Error(`Could not create agent auth user: ${error.message}`)
    authUser = data.user
  }

  if (!authUser?.id) throw new Error('Agent auth user has no id')

  const { error: upsertError } = await supabase.from('profiles').upsert(
    {
      id: authUser.id,
      display_name: agent.displayName,
      bio: agent.bio,
      is_admin: false,
    },
    { onConflict: 'id' },
  )

  if (upsertError) throw new Error(`Could not upsert agent profile: ${upsertError.message}`)
  return authUser.id
}

export async function POST(request: Request): Promise<NextResponse<ForecastResponse>> {
  try {
    if (!hasValidEndpointSecret(request)) {
      return NextResponse.json({ ok: false, error: 'Unauthorized agent endpoint' }, { status: 401 })
    }

    let body: ForecastRequest
    try {
      body = await request.json()
    } catch {
      return NextResponse.json({ ok: false, error: 'Invalid JSON body' }, { status: 400 })
    }

    const { question_id, context, dry_run } = body
    if (!question_id || !UUID_RE.test(question_id)) {
      return NextResponse.json({ ok: false, error: 'Invalid question_id' }, { status: 400 })
    }

    const agent = getAgentPersona(body.agent_id)
    const supabase = createServiceClient()

    const { data: question, error: questionError } = await supabase
      .from('questions')
      .select('id,title,description,category,status,question_type,resolution_source,closes_at')
      .eq('id', question_id)
      .single()

    if (questionError || !question) {
      return NextResponse.json({ ok: false, error: 'Question not found' }, { status: 404 })
    }

    const q = question as QuestionForAgent
    validateQuestionForAgent(q)

    const agentUserId = await ensureAgentProfile(supabase, agent)

    const { data: existingForecast, error: existingError } = await supabase
      .from('forecasts')
      .select('id')
      .eq('question_id', question_id)
      .eq('user_id', agentUserId)
      .maybeSingle()

    if (existingError) throw new Error(`Could not check existing agent forecast: ${existingError.message}`)
    if (existingForecast) {
      return NextResponse.json({ ok: false, error: 'Agent already forecasted this question' }, { status: 409 })
    }

    const { result, model } = await callLLM(q, agent, context)
    const prediction = buildStoredAgentPrediction(result, agent, model)

    if (dry_run) {
      return NextResponse.json({
        ok: true,
        dry_run: true,
        agent: { id: agent.id, display_name: agent.displayName, version: agent.version },
        forecast: { question_id, user_id: agentUserId, prediction },
      })
    }

    const { data: forecast, error: insertError } = await supabase
      .from('forecasts')
      .insert({ question_id, user_id: agentUserId, prediction })
      .select('id, question_id, user_id, prediction, created_at')
      .single()

    if (insertError) throw new Error(`Failed to store forecast: ${insertError.message}`)

    return NextResponse.json({
      ok: true,
      agent: { id: agent.id, display_name: agent.displayName, version: agent.version },
      forecast: forecast as ForecastResponse['forecast'],
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Internal server error'
    console.error('[agent/forecast]', message)
    return NextResponse.json({ ok: false, error: message }, { status: 500 })
  }
}
