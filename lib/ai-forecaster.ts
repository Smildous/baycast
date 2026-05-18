export interface AgentPersona {
  id: string
  email: string
  displayName: string
  bio: string
  focus: string
  version: string
}

export interface AgentForecastResult {
  probability: number
  reasoning: string
}

export interface QuestionForAgent {
  id: string
  title: string
  description: string | null
  category: string
  status: string
  question_type: string
  resolution_source: string | null
  closes_at: string
}

export const AGENT_PROMPT_VERSION = 'ai-forecaster-v0.1'

export const AGENT_PERSONAS: Record<string, AgentPersona> = {
  climatology_scout: {
    id: 'climatology_scout',
    email: 'baycast-climatology-scout@agents.baycast.local',
    displayName: 'Baycast Climatology Scout',
    bio: 'AI forecaster. Uses public base rates and official sources. Not a human.',
    focus: 'weather, climate, science, seasonal events, official datasets',
    version: 'climatology-scout-v0',
  },
  macro_tape: {
    id: 'macro_tape',
    email: 'baycast-macro-tape@agents.baycast.local',
    displayName: 'Baycast Macro Tape',
    bio: 'AI forecaster focused on macro data. Uses public sources and gives no financial advice.',
    focus: 'economic releases, inflation, central banks, public macro data',
    version: 'macro-tape-v0',
  },
  product_radar: {
    id: 'product_radar',
    email: 'baycast-product-radar@agents.baycast.local',
    displayName: 'Baycast Product Radar',
    bio: 'AI forecaster for product and technology announcements. Uses public information, not leaks.',
    focus: 'technology releases, official product announcements, release notes, public availability',
    version: 'product-radar-v0',
  },
}

const FORBIDDEN_REASONING_TERMS = [
  'bet',
  'bets',
  'betting',
  'buy',
  'sell',
  'trade',
  'trading',
  'stake',
  'staking',
  'payout',
]

export function getAgentPersona(agentId: string | undefined): AgentPersona {
  if (!agentId) return AGENT_PERSONAS.product_radar
  return AGENT_PERSONAS[agentId] ?? AGENT_PERSONAS.product_radar
}

export function normalizeProbability(raw: unknown): number {
  const numeric = typeof raw === 'number' ? raw : Number(raw)
  if (!Number.isFinite(numeric)) throw new Error('Probability must be a finite number')
  return Math.max(1, Math.min(99, Math.round(numeric)))
}

export function parseAgentForecast(content: string): AgentForecastResult {
  const trimmed = content.trim()
  const fenceMatch = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/)
  const jsonText = fenceMatch ? fenceMatch[1].trim() : trimmed

  let parsed: { probability?: unknown; reasoning?: unknown }
  try {
    parsed = JSON.parse(jsonText)
  } catch {
    throw new Error('Failed to parse agent forecast JSON')
  }

  if (typeof parsed.reasoning !== 'string' || parsed.reasoning.trim().length === 0) {
    throw new Error('Agent forecast missing reasoning')
  }

  return {
    probability: normalizeProbability(parsed.probability),
    reasoning: sanitizeReasoning(parsed.reasoning),
  }
}

export function sanitizeReasoning(reasoning: string): string {
  const normalized = reasoning.replace(/\s+/g, ' ').trim()
  if (normalized.length > 700) return `${normalized.slice(0, 697).trim()}...`
  return normalized
}

export function assertSafeAgentReasoning(reasoning: string): void {
  const lower = reasoning.toLowerCase()
  const found = FORBIDDEN_REASONING_TERMS.find(term => new RegExp(`\\b${term}\\b`, 'i').test(lower))
  if (found) throw new Error(`Agent reasoning contains forbidden term: ${found}`)
}

export function buildAgentSystemPrompt(agent: AgentPersona): string {
  return `You are ${agent.displayName}, a labeled AI forecaster inside Baycast.
Baycast is prediction polling, not gambling.
Your focus: ${agent.focus}.

Return valid JSON only:
{
  "probability": <integer from 1 to 99>,
  "reasoning": "<1-3 short sentences based on public information>"
}

Rules:
- Use only the question text, resolution source, dates, and public context provided in this request.
- Do not infer Baycast consensus, forecast counts, user activity, rankings, or other forecasts.
- Do not mention betting, odds, trading, staking, payouts, or advice.
- Do not claim private information, leaks, or certainty.
- Keep reasoning concise and resolvable.`
}

export function buildAgentUserPrompt(question: QuestionForAgent, context?: string): string {
  const safeContext = context?.trim() ? context.trim().slice(0, 4000) : 'No extra public context provided.'
  return [
    `Question ID: ${question.id}`,
    `Title: ${question.title}`,
    `Description: ${question.description || 'No description provided.'}`,
    `Category: ${question.category}`,
    `Resolution source: ${question.resolution_source || 'Not specified'}`,
    `Closes at: ${question.closes_at}`,
    `Public context: ${safeContext}`,
  ].join('\n')
}

export function validateQuestionForAgent(question: QuestionForAgent, now = new Date()): void {
  if (question.status !== 'open') throw new Error('Question is not open')
  if (question.question_type !== 'binary') throw new Error('Only binary questions are supported')
  if (Number.isNaN(new Date(question.closes_at).getTime())) throw new Error('Question has invalid closes_at')
  if (new Date(question.closes_at).getTime() <= now.getTime()) throw new Error('Question is already closed')
}

export function buildStoredAgentPrediction(
  result: AgentForecastResult,
  agent: AgentPersona,
  model: string,
): Record<string, unknown> {
  assertSafeAgentReasoning(result.reasoning)
  return {
    probability: result.probability,
    reasoning: result.reasoning,
    forecaster_type: 'ai',
    agent_id: agent.id,
    agent_name: agent.displayName,
    agent_version: agent.version,
    prompt_version: AGENT_PROMPT_VERSION,
    model,
  }
}
