#!/usr/bin/env node
/**
 * Seed a small number of Baycast AI agent forecasts.
 *
 * Uses the Supabase service role from .env.local. It prints table names,
 * column names, ids, and counts only. It never prints secrets.
 */

import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import { createClient } from '@supabase/supabase-js'

function loadEnv(file = '.env.local') {
  const full = path.resolve(process.cwd(), file)
  if (!fs.existsSync(full)) return
  for (const raw of fs.readFileSync(full, 'utf8').split(/\r?\n/)) {
    const line = raw.trim()
    if (!line || line.startsWith('#')) continue
    const i = line.indexOf('=')
    if (i === -1) continue
    const key = line.slice(0, i).trim()
    const value = line.slice(i + 1).trim().replace(/^["']|["']$/g, '')
    if (!process.env[key]) process.env[key] = value
  }
}

loadEnv()

const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!url || !serviceKey) {
  console.error(JSON.stringify({ ok: false, error: 'Missing Supabase URL or SUPABASE_SERVICE_ROLE_KEY in .env.local' }, null, 2))
  process.exit(1)
}

const supabase = createClient(url, serviceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

const AGENTS = [
  {
    email: 'baycast-ai-scout@agents.baycast.local',
    displayName: 'Baycast AI Scout',
    bio: 'AI forecasting agent used for Baycast calibration tests.',
    offset: 7,
  },
  {
    email: 'baycast-ai-baseline@agents.baycast.local',
    displayName: 'Baycast AI Baseline',
    bio: 'AI baseline forecaster for early Baycast activity.',
    offset: 19,
  },
]

const REQUIRED = {
  questions: ['id', 'title', 'description', 'category', 'status', 'question_type', 'options', 'closes_at', 'created_at'],
  profiles: ['id', 'display_name'],
  forecasts: ['question_id', 'user_id', 'prediction'],
}

function hasAll(columns, required) {
  return required.every(column => columns.includes(column))
}

async function getColumns(table) {
  const { data, error } = await supabase.from(table).select('*').limit(1)
  if (error) throw new Error(`Could not inspect ${table}: ${error.message}`)
  return data?.[0] ? Object.keys(data[0]) : []
}

async function inspectSchema() {
  const schema = {}
  for (const table of Object.keys(REQUIRED)) {
    schema[table] = await getColumns(table)
  }

  const missing = Object.entries(REQUIRED)
    .flatMap(([table, columns]) => columns.filter(column => !schema[table].includes(column)).map(column => `${table}.${column}`))

  if (missing.length > 0) {
    throw new Error(`Live schema is missing required columns: ${missing.join(', ')}`)
  }

  return schema
}

async function findAuthUserByEmail(email) {
  const perPage = 100
  for (let page = 1; page <= 20; page += 1) {
    const { data, error } = await supabase.auth.admin.listUsers({ page, perPage })
    if (error) throw new Error(`Could not list auth users: ${error.message}`)
    const found = data?.users?.find(user => user.email?.toLowerCase() === email.toLowerCase())
    if (found) return found
    if (!data?.users || data.users.length < perPage) return null
  }
  return null
}

async function ensureAgent(agent) {
  const { data: existingProfiles, error: profileError } = await supabase
    .from('profiles')
    .select('id,display_name')
    .eq('display_name', agent.displayName)
    .limit(1)

  if (profileError) throw new Error(`Could not check profile ${agent.displayName}: ${profileError.message}`)
  if (existingProfiles?.[0]?.id) return { ...agent, id: existingProfiles[0].id, created: false }

  let authUser = await findAuthUserByEmail(agent.email)
  if (!authUser) {
    const password = crypto.randomBytes(32).toString('base64url')
    const { data, error } = await supabase.auth.admin.createUser({
      email: agent.email,
      password,
      email_confirm: true,
      user_metadata: { display_name: agent.displayName },
    })
    if (error) throw new Error(`Could not create auth user for ${agent.displayName}: ${error.message}`)
    authUser = data.user
  }

  if (!authUser?.id) throw new Error(`Auth user for ${agent.displayName} has no id`)

  const profilePayload = {
    id: authUser.id,
    display_name: agent.displayName,
    bio: agent.bio,
    is_admin: false,
  }

  const { error: upsertError } = await supabase
    .from('profiles')
    .upsert(profilePayload, { onConflict: 'id' })

  if (upsertError) throw new Error(`Could not upsert profile ${agent.displayName}: ${upsertError.message}`)

  return { ...agent, id: authUser.id, created: true }
}

function probabilityFor(question, agentOffset) {
  const input = `${question.id}:${question.title}:${question.category}:${agentOffset}`
  const hash = crypto.createHash('sha256').update(input).digest()
  const raw = hash[0] + agentOffset
  const categoryTilt = question.category === 'tech' ? 8 : question.category === 'sports' ? -2 : question.category === 'politics' ? -5 : 0
  const value = 18 + (raw % 58) + categoryTilt
  return Math.max(8, Math.min(88, value))
}

async function getOpenQuestions(limit) {
  const { data, error } = await supabase
    .from('questions')
    .select('id,title,description,category,status,question_type,options,closes_at,created_at')
    .eq('status', 'open')
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) throw new Error(`Could not load open questions: ${error.message}`)

  return (data || []).filter(question => question.question_type === 'binary')
}

async function seed() {
  const schema = await inspectSchema()
  const agents = []
  for (const agent of AGENTS) agents.push(await ensureAgent(agent))

  const agentIds = agents.map(agent => agent.id)
  const questions = await getOpenQuestions(24)
  if (questions.length < 8) throw new Error(`Need at least 8 open binary questions, found ${questions.length}`)

  const questionIds = questions.map(question => question.id)
  const { data: existingForecasts, error: existingError } = await supabase
    .from('forecasts')
    .select('question_id,user_id')
    .in('question_id', questionIds)
    .in('user_id', agentIds)

  if (existingError) throw new Error(`Could not check existing agent forecasts: ${existingError.message}`)

  const existingKeys = new Set((existingForecasts || []).map(row => `${row.question_id}:${row.user_id}`))
  const rows = []

  for (let i = 0; i < questions.length && rows.length < 10; i += 1) {
    const question = questions[i]
    const agent = agents[i % agents.length]
    const key = `${question.id}:${agent.id}`
    if (existingKeys.has(key)) continue
    rows.push({
      question_id: question.id,
      user_id: agent.id,
      prediction: { probability: probabilityFor(question, agent.offset) },
    })
  }

  if (rows.length < 8) {
    throw new Error(`Only ${rows.length} new agent forecasts are available without touching existing agent forecasts`)
  }

  const { data: inserted, error: insertError } = await supabase
    .from('forecasts')
    .insert(rows)
    .select('id,question_id,user_id,prediction,created_at')

  if (insertError) throw new Error(`Could not insert forecasts: ${insertError.message}`)

  console.log(JSON.stringify({
    ok: true,
    inspected_schema: Object.fromEntries(Object.entries(schema).map(([table, columns]) => [table, columns])),
    agents: agents.map(agent => ({ display_name: agent.displayName, id: agent.id, created: agent.created })),
    inserted_count: inserted?.length || 0,
    inserted: (inserted || []).map(row => ({
      id: row.id,
      question_id: row.question_id,
      user_id: row.user_id,
      prediction: row.prediction,
      created_at: row.created_at,
    })),
  }, null, 2))
}

seed().catch(error => {
  console.error(JSON.stringify({ ok: false, error: error.message }, null, 2))
  process.exit(1)
})
