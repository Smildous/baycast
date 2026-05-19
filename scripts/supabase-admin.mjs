#!/usr/bin/env node
/**
 * Baycast Supabase admin helper.
 *
 * Reads .env.local without printing secrets.
 * Read-only works with SUPABASE_ANON_KEY.
 * Writes require one of:
 *   SUPABASE_SERVICE_ROLE_KEY
 *   SUPABASE_ADMIN_JWT
 *   SUPABASE_ADMIN_EMAIL + SUPABASE_ADMIN_PASSWORD
 */

import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
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
    const value = line.slice(i + 1).trim().replace(/^['"]|['"]$/g, '')
    if (!process.env[key]) process.env[key] = value
  }
}

loadEnv()

const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
const anonKey = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const adminJwt = process.env.SUPABASE_ADMIN_JWT

async function getClient({ write = false } = {}) {
  if (!url || !anonKey) {
    throw new Error('Missing SUPABASE_URL/NEXT_PUBLIC_SUPABASE_URL or SUPABASE_ANON_KEY/NEXT_PUBLIC_SUPABASE_ANON_KEY')
  }
  if (serviceKey) return createClient(url, serviceKey)
  if (adminJwt) return createClient(url, anonKey, { global: { headers: { Authorization: `Bearer ${adminJwt}` } } })

  const client = createClient(url, anonKey)
  if (write && process.env.SUPABASE_ADMIN_EMAIL && process.env.SUPABASE_ADMIN_PASSWORD) {
    const { data, error } = await client.auth.signInWithPassword({
      email: process.env.SUPABASE_ADMIN_EMAIL,
      password: process.env.SUPABASE_ADMIN_PASSWORD,
    })
    if (error) throw new Error(`admin login failed: ${error.message}`)
    if (!data?.session?.access_token) throw new Error('admin login failed: no access token')
    return createClient(url, anonKey, {
      global: { headers: { Authorization: `Bearer ${data.session.access_token}` } },
    })
  }

  if (write) {
    throw new Error('write access unavailable: set SUPABASE_SERVICE_ROLE_KEY, SUPABASE_ADMIN_JWT, or SUPABASE_ADMIN_EMAIL + SUPABASE_ADMIN_PASSWORD in .env.local')
  }
  return client
}

async function countRows(client, table, filter) {
  let q = client.from(table).select('id', { count: 'exact', head: true })
  if (filter) q = filter(q)
  const { count, error } = await q
  if (error) return { table, error: error.message }
  return { table, count }
}

async function status() {
  const client = await getClient()
  const rows = []
  rows.push(await countRows(client, 'questions'))
  rows.push(await countRows(client, 'questions', q => q.eq('status', 'open')))
  rows[1].table = 'questions_open'
  rows.push(await countRows(client, 'forecasts'))
  rows.push(await countRows(client, 'profiles'))

  const { data: latest, error } = await client
    .from('questions')
    .select('title,status,category,closes_at')
    .order('created_at', { ascending: false })
    .limit(5)

  console.log(JSON.stringify({ ok: true, mode: serviceKey ? 'service_role' : adminJwt ? 'admin_jwt' : 'anon_readonly', counts: rows, latest_error: error?.message || null, latest: latest || [] }, null, 2))
}

async function insertQuestion(file) {
  const client = await getClient({ write: true })
  const payload = JSON.parse(fs.readFileSync(file, 'utf8'))
  const { data, error } = await client.from('questions').insert(payload).select('id,title,status').single()
  if (error) throw new Error(error.message)
  console.log(JSON.stringify({ ok: true, inserted: data }, null, 2))
}

async function updateQuestion(id, patchFile) {
  const client = await getClient({ write: true })
  const patch = JSON.parse(fs.readFileSync(patchFile, 'utf8'))
  const { data, error } = await client.from('questions').update(patch).eq('id', id).select('id,title,status').single()
  if (error) throw new Error(error.message)
  console.log(JSON.stringify({ ok: true, updated: data }, null, 2))
}

function isMissingBlindUntilError(error) {
  return error?.code === '42703' || /blind_until/i.test(error?.message || '')
}

function isActiveBlindPhase(question, now = new Date()) {
  if (!question?.blind_until) return false
  const blindUntil = new Date(question.blind_until)
  if (Number.isNaN(blindUntil.getTime()) || blindUntil <= now) return false
  if (!question.closes_at) return true
  const closesAt = new Date(question.closes_at)
  return Number.isNaN(closesAt.getTime()) || blindUntil < closesAt
}

export async function verifyBlindUntilLive(client, { now = new Date() } = {}) {
  const schemaProbe = await client.from('questions').select('blind_until').limit(1)
  if (schemaProbe.error) {
    if (isMissingBlindUntilError(schemaProbe.error)) {
      const err = new Error('questions.blind_until is missing on the live schema. Apply sql/migration_006_aq226_blind_until_live_safety.sql before enabling AQ-227 live checks.')
      err.code = 'AQ227_MISSING_BLIND_UNTIL'
      throw err
    }
    throw new Error(`blind_until schema probe failed: ${schemaProbe.error.message}`)
  }

  const { data, error } = await client
    .from('questions')
    .select('id,title,status,closes_at,blind_until')
    .eq('status', 'open')
    .order('closes_at', { ascending: true })

  if (error) {
    if (isMissingBlindUntilError(error)) {
      const err = new Error('questions.blind_until is missing on the live schema. Apply sql/migration_006_aq226_blind_until_live_safety.sql before enabling AQ-227 live checks.')
      err.code = 'AQ227_MISSING_BLIND_UNTIL'
      throw err
    }
    throw new Error(`open questions blind_until query failed: ${error.message}`)
  }

  const openQuestions = data || []
  const active = openQuestions.filter(question => isActiveBlindPhase(question, now))
  const unsafe = openQuestions.filter(question => !isActiveBlindPhase(question, now))

  return {
    ok: unsafe.length === 0,
    checked_at: now.toISOString(),
    column: 'questions.blind_until',
    column_present: true,
    open_questions: openQuestions.length,
    open_with_active_blind_phase: active.length,
    open_without_active_blind_phase: unsafe.length,
    unsafe_open_questions: unsafe.slice(0, 25).map(question => ({
      id: question.id,
      title: question.title,
      closes_at: question.closes_at,
      blind_until: question.blind_until,
    })),
  }
}

async function verifyBlindUntilCommand() {
  const client = await getClient()
  const report = await verifyBlindUntilLive(client)
  console.log(JSON.stringify(report, null, 2))
  if (!report.ok) process.exit(1)
}

const isCli = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href

if (isCli) {
  const [cmd, ...args] = process.argv.slice(2)
  try {
    if (!cmd || cmd === 'status') await status()
    else if (cmd === 'verify-blind-until') await verifyBlindUntilCommand()
    else if (cmd === 'insert-question') await insertQuestion(args[0])
    else if (cmd === 'update-question') await updateQuestion(args[0], args[1])
    else {
      console.error('Usage: node scripts/supabase-admin.mjs status | verify-blind-until | insert-question question.json | update-question <id> patch.json')
      process.exit(2)
    }
  } catch (err) {
    console.error(JSON.stringify({ ok: false, code: err.code || undefined, error: err.message }, null, 2))
    process.exit(1)
  }
}
