import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

/**
 * POST /api/agent/forecast
 *
 * Core AI forecaster endpoint — the differentiator for Baycast (human + AI forecasters).
 * Accepts a question and returns an AI-generated probability forecast with reasoning.
 *
 * Environment variables:
 *   AGENT_API_KEY  — API key for the LLM provider (required)
 *   AGENT_MODEL    — Model identifier (default: gpt-4o)
 *   AGENT_BASE_URL — OpenAI-compatible base URL (default: https://api.openai.com/v1)
 */

interface ForecastRequest {
  question_id: string
  question_text: string
  context?: string
}

interface ForecastResponse {
  ok: boolean
  forecast?: {
    id: string
    question_id: string
    user_id: string
    prediction: { probability: number }
    reasoning: string
    created_at: string
  }
  error?: string
}

const DEFAULT_MODEL = 'gpt-4o'
const DEFAULT_BASE_URL = 'https://api.openai.com/v1'

function getEnv(key: string, fallback: string): string {
  return process.env[key] || fallback
}

async function callLLM(
  questionText: string,
  context: string | undefined,
): Promise<{ probability: number; reasoning: string }> {
  const apiKey = process.env.AGENT_API_KEY
  if (!apiKey) {
    throw new Error('AGENT_API_KEY environment variable is not set')
  }

  const model = getEnv('AGENT_MODEL', DEFAULT_MODEL)
  const baseUrl = getEnv('AGENT_BASE_URL', DEFAULT_BASE_URL).replace(/\/+$/, '')

  const systemPrompt = `You are a superforecaster — an expert probabilistic thinker. You estimate the probability that a future event will happen.

You MUST respond with valid JSON matching this exact schema:
{
  "probability": <number between 1 and 99>,
  "reasoning": "<brief explanation of your reasoning>"
}

Rules:
- probability must be an integer between 1 and 99 (never 0 or 100).
- reasoning should be concise (1-3 sentences) and reference specific evidence or base rates.
- Respond ONLY with the JSON object, no markdown fences or extra text.`

  const userMessage = context
    ? `Question: ${questionText}\n\nAdditional context:\n${context}`
    : `Question: ${questionText}`

  const response = await fetch(`${baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage },
      ],
      temperature: 0.3,
      max_tokens: 500,
    }),
  })

  if (!response.ok) {
    const errorBody = await response.text()
    throw new Error(`LLM API error (${response.status}): ${errorBody}`)
  }

  const data = await response.json()
  const content = data.choices?.[0]?.message?.content?.trim()

  if (!content) {
    throw new Error('LLM returned empty response')
  }

  // Parse JSON from the response — handle potential markdown fences
  let jsonStr = content
  const fenceMatch = content.match(/```(?:json)?\s*([\s\S]*?)```/)
  if (fenceMatch) {
    jsonStr = fenceMatch[1].trim()
  }

  let parsed: { probability: number; reasoning: string }
  try {
    parsed = JSON.parse(jsonStr)
  } catch {
    throw new Error(`Failed to parse LLM response as JSON: ${content}`)
  }

  // Validate probability bounds
  const probability = Math.max(1, Math.min(99, Math.round(parsed.probability)))
  if (typeof parsed.reasoning !== 'string' || parsed.reasoning.length === 0) {
    throw new Error('LLM response missing reasoning')
  }

  return { probability, reasoning: parsed.reasoning }
}

export async function POST(request: Request): Promise<NextResponse<ForecastResponse>> {
  try {
    // Parse and validate request body
    let body: ForecastRequest
    try {
      body = await request.json()
    } catch {
      return NextResponse.json({ ok: false, error: 'Invalid JSON body' }, { status: 400 })
    }

    const { question_id, question_text, context } = body

    if (!question_id || !question_text) {
      return NextResponse.json(
        { ok: false, error: 'Missing required fields: question_id, question_text' },
        { status: 400 },
      )
    }

    // Call the LLM to get a forecast
    let forecastResult: { probability: number; reasoning: string }
    try {
      forecastResult = await callLLM(question_text, context)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown LLM error'
      console.error('[agent/forecast] LLM call failed:', message)
      return NextResponse.json(
        { ok: false, error: `Forecast generation failed: ${message}` },
        { status: 502 },
      )
    }

    // Store the forecast in Supabase
    const supabase = createClient()

    // Verify the agent user exists or create it — use a service account pattern
    const agentUserId = process.env.AGENT_USER_ID || 'agent-system'

    // Upsert the agent profile if needed (best-effort)
    await supabase.from('profiles').upsert(
      {
        id: agentUserId,
        display_name: 'Baycast AI Agent',
        is_admin: false,
      },
      { onConflict: 'id' },
    )

    // Insert the forecast
    const { data: forecast, error: insertError } = await supabase
      .from('forecasts')
      .insert({
        question_id,
        user_id: agentUserId,
        prediction: { probability: forecastResult.probability },
      })
      .select('id, question_id, user_id, prediction, created_at')
      .single()

    if (insertError) {
      console.error('[agent/forecast] DB insert failed:', insertError.message)
      return NextResponse.json(
        { ok: false, error: `Failed to store forecast: ${insertError.message}` },
        { status: 500 },
      )
    }

    return NextResponse.json({
      ok: true,
      forecast: {
        ...forecast,
        reasoning: forecastResult.reasoning,
      },
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Internal server error'
    console.error('[agent/forecast] Unexpected error:', message)
    return NextResponse.json({ ok: false, error: message }, { status: 500 })
  }
}
