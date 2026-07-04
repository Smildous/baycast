#!/usr/bin/env node

import fs from 'node:fs'
import { spawnSync } from 'node:child_process'
import { createClient } from '@supabase/supabase-js'

const DEFAULT_BASE_URL = 'https://baycast-p.vercel.app'
const ENDPOINT_PATH = '/api/agent/forecast'
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

const baseUrl = normalizeBaseUrl(process.env.BAYCAST_AGENT_BASE_URL || DEFAULT_BASE_URL)
const endpointUrl = `${baseUrl}${ENDPOINT_PATH}`
const env = loadEnv('.env.local')

const failures = []
const warnings = []

function normalizeBaseUrl(value) {
  try {
    const url = new URL(value)
    url.pathname = url.pathname.replace(/\/+$/, '')
    url.search = ''
    url.hash = ''
    return url.toString().replace(/\/+$/, '')
  } catch {
    console.error('Invalid BAYCAST_AGENT_BASE_URL')
    process.exit(2)
  }
}

function loadEnv(file) {
  if (!fs.existsSync(file)) return { exists: false, values: new Map() }

  const values = new Map()
  for (const raw of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
    const line = raw.trim()
    if (!line || line.startsWith('#')) continue
    const index = line.indexOf('=')
    if (index === -1) continue

    const key = line.slice(0, index).trim()
    const value = line.slice(index + 1).trim().replace(/^['"]|['"]$/g, '')
    values.set(key, value)
    if (!process.env[key]) process.env[key] = value
  }

  return { exists: true, values }
}

function hasValue(key) {
  const value = process.env[key]
  return typeof value === 'string' && value.trim().length > 0
}

function envHasValue(key) {
  const value = env.values.get(key)
  return typeof value === 'string' && value.trim().length > 0
}

function redactError(message) {
  let redacted = String(message || '')
  for (const value of env.values.values()) {
    if (typeof value === 'string' && value.length >= 8) {
      redacted = redacted.split(value).join('[redacted]')
    }
  }
  for (const key of ['AGENT_ENDPOINT_SECRET', 'VERCEL_TOKEN', 'SUPABASE_SERVICE_ROLE_KEY', 'SUPABASE_ANON_KEY', 'NEXT_PUBLIC_SUPABASE_ANON_KEY']) {
    const value = process.env[key]
    if (typeof value === 'string' && value.length >= 8) {
      redacted = redacted.split(value).join('[redacted]')
    }
  }
  return redacted
}

function checkVercelAuth() {
  const tokenPresent = hasValue('VERCEL_TOKEN')
  const cli = spawnSync('vercel', ['whoami'], {
    encoding: 'utf8',
    env: tokenPresent ? { ...process.env, VERCEL_TOKEN: process.env.VERCEL_TOKEN } : process.env,
    timeout: 15000,
  })

  if (cli.error?.code === 'ENOENT') {
    return { cli_available: false, token_present: tokenPresent, authenticated: false, detail: 'vercel CLI not installed' }
  }

  if (cli.error) {
    return { cli_available: true, token_present: tokenPresent, authenticated: false, detail: redactError(cli.error.message) }
  }

  return {
    cli_available: true,
    token_present: tokenPresent,
    authenticated: cli.status === 0,
    detail: cli.status === 0 ? 'vercel whoami succeeded' : 'vercel whoami failed',
  }
}

function getSupabaseConfig() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  const mode = process.env.SUPABASE_SERVICE_ROLE_KEY ? 'service_role' : key ? 'anon_readonly' : 'unavailable'
  if (!url || !key) return { available: false, mode }
  return { available: true, url, key, mode }
}

async function countForecasts(client) {
  const { count, error } = await client.from('forecasts').select('id', { count: 'exact', head: true })
  if (error) throw new Error(error.message)
  return count
}

async function getProbeQuestionId(client) {
  if (hasValue('BAYCAST_AGENT_PROBE_QUESTION_ID')) {
    const id = process.env.BAYCAST_AGENT_PROBE_QUESTION_ID.trim()
    if (!UUID_RE.test(id)) throw new Error('BAYCAST_AGENT_PROBE_QUESTION_ID is not a valid UUID')
    return { id, source: 'BAYCAST_AGENT_PROBE_QUESTION_ID' }
  }

  const nowIso = new Date().toISOString()
  const { data, error } = await client
    .from('questions')
    .select('id')
    .eq('status', 'open')
    .gt('closes_at', nowIso)
    .order('closes_at', { ascending: true })
    .limit(1)

  if (error) throw new Error(error.message)
  if (!data?.[0]?.id) throw new Error('No open future question available for dry_run probe')
  return { id: data[0].id, source: 'first open future question' }
}

async function postDryRun(questionId, secret) {
  const response = await fetch(endpointUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${secret}`,
      'user-agent': 'baycast-agent-secret-gate-verifier/1.0',
    },
    body: JSON.stringify({ question_id: questionId, dry_run: true }),
  })

  let body = null
  const contentType = response.headers.get('content-type') || ''
  if (contentType.includes('application/json')) {
    try {
      body = await response.json()
    } catch {
      body = null
    }
  } else {
    await response.arrayBuffer()
  }

  return {
    status: response.status,
    ok: response.ok,
    body_ok: body?.ok === true,
    dry_run: body?.dry_run === true,
    error: typeof body?.error === 'string' ? body.error : null,
  }
}

async function postUnauthorizedProbe(questionId) {
  const response = await fetch(endpointUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'user-agent': 'baycast-agent-secret-gate-verifier/1.0',
    },
    body: JSON.stringify({ question_id: questionId, dry_run: true }),
  })
  await response.arrayBuffer()
  return { status: response.status, ok: response.ok }
}

function logJson(label, value) {
  console.log(`${label}: ${JSON.stringify(value)}`)
}

console.log(`AQ-548 agent secret gate verifier for ${endpointUrl}`)
logJson('local_env', {
  env_local_exists: env.exists,
  agent_endpoint_secret_present: envHasValue('AGENT_ENDPOINT_SECRET'),
})

const vercelAuth = checkVercelAuth()
logJson('vercel', vercelAuth)

const supabaseConfig = getSupabaseConfig()
logJson('supabase', { available: supabaseConfig.available, mode: supabaseConfig.mode })

let beforeCount = null
let afterCount = null
let probeQuestion = null
let client = null

if (supabaseConfig.available) {
  try {
    client = createClient(supabaseConfig.url, supabaseConfig.key, {
      auth: { autoRefreshToken: false, persistSession: false },
    })
    beforeCount = await countForecasts(client)
    probeQuestion = await getProbeQuestionId(client)
    logJson('forecast_count_before', { count: beforeCount })
    logJson('probe_question', { available: true, source: probeQuestion.source })
  } catch (error) {
    warnings.push(`Supabase read skipped: ${redactError(error.message)}`)
    client = null
  }
} else {
  warnings.push('Supabase env unavailable. Forecast count and question lookup skipped.')
}

if (probeQuestion?.id) {
  try {
    const unauthorized = await postUnauthorizedProbe(probeQuestion.id)
    logJson('unauthorized_probe', unauthorized)
    if (unauthorized.status !== 401) {
      failures.push(`Unauthenticated dry_run returned ${unauthorized.status}, expected 401`)
    }
  } catch (error) {
    warnings.push(`Unauthenticated dry_run probe skipped: ${redactError(error.message)}`)
  }
}

if (envHasValue('AGENT_ENDPOINT_SECRET')) {
  if (!probeQuestion?.id) {
    warnings.push('Authorized dry_run skipped because no probe question is available.')
  } else {
    try {
      const result = await postDryRun(probeQuestion.id, process.env.AGENT_ENDPOINT_SECRET)
      logJson('authorized_dry_run_probe', result)
      if (!result.ok || !result.body_ok || !result.dry_run) {
        failures.push(`Authorized dry_run did not return ok dry_run response. Status ${result.status}`)
      }
    } catch (error) {
      failures.push(`Authorized dry_run failed: ${redactError(error.message)}`)
    }
  }
} else {
  logJson('authorized_dry_run_probe', { skipped: true, reason: 'AGENT_ENDPOINT_SECRET missing from local .env.local' })
}

if (client) {
  try {
    afterCount = await countForecasts(client)
    logJson('forecast_count_after', { count: afterCount })
    if (beforeCount !== null && afterCount !== beforeCount) {
      failures.push(`Forecast count changed during dry_run probe: before ${beforeCount}, after ${afterCount}`)
    }
  } catch (error) {
    warnings.push(`Forecast count after skipped: ${redactError(error.message)}`)
  }
}

for (const warning of warnings) {
  console.warn(`warning: ${warning}`)
}

if (failures.length > 0) {
  console.error('AQ-548 verifier failed.')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log('AQ-548 verifier passed without printing secret values.')
