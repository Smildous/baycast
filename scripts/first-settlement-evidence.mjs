#!/usr/bin/env node
/**
 * Read-only first-settlement evidence verifier.
 *
 * Helps Odin collect public settlement evidence for the first June candidate.
 * Reads questions only. It never queries forecasts and never writes to Supabase.
 */

import { getClient } from './supabase-admin.mjs'

const JUNE_FROM = '2026-06-01T00:00:00.000Z'
const JUNE_UNTIL = '2026-06-30T23:59:59.999Z'
const TARGET_TITLE = 'Will Apple announce a new Mac Pro at WWDC 2026?'
const TARGET_CLOSE = new Date('2026-06-13T00:00:00.000Z').getTime()

function isMissingColumnError(error, column) {
  return error?.code === '42703' || (column && new RegExp(`\\b${column}\\b`, 'i').test(error?.message || ''))
}

function isUsablePublicSource(value) {
  if (typeof value !== 'string') return false
  return /https?:\/\/[^\s)]+/i.test(value.trim())
}

async function hasColumn(client, column) {
  const { error } = await client.from('questions').select(column).limit(1)
  if (!error) return true
  if (isMissingColumnError(error, column)) return false
  throw new Error(`questions.${column} schema probe failed: ${error.message}`)
}

function pickCandidate(rows) {
  const exact = rows.find(row => String(row.title || '').trim().toLowerCase() === TARGET_TITLE.toLowerCase())
  if (exact) return { candidate: exact, reason: 'Apple Mac Pro exact match' }

  const appleMacPro = rows.find(row => /apple/i.test(row.title || '') && /mac pro/i.test(row.title || ''))
  if (appleMacPro) return { candidate: appleMacPro, reason: 'Apple Mac Pro nearest title match' }

  const dated = rows
    .map(row => ({ row, time: new Date(row.closes_at).getTime() }))
    .filter(item => Number.isFinite(item.time))
    .sort((a, b) => Math.abs(a.time - TARGET_CLOSE) - Math.abs(b.time - TARGET_CLOSE) || a.time - b.time)

  if (dated[0]) return { candidate: dated[0].row, reason: 'nearest June close date' }
  return { candidate: rows[0] || null, reason: 'first June candidate returned' }
}

async function main() {
  const client = await getClient()
  const hasResolutionSource = await hasColumn(client, 'resolution_source')
  const hasResolutionUrl = await hasColumn(client, 'resolution_url')

  if (!hasResolutionSource && !hasResolutionUrl) {
    throw new Error('No public settlement source column exists on questions: missing resolution_source and resolution_url')
  }

  const sourceColumns = [hasResolutionSource ? 'resolution_source' : null, hasResolutionUrl ? 'resolution_url' : null].filter(Boolean)
  const selectColumns = ['id', 'title', 'status', 'category', 'closes_at', ...sourceColumns].join(',')

  const { data, error } = await client
    .from('questions')
    .select(selectColumns)
    .gte('closes_at', JUNE_FROM)
    .lte('closes_at', JUNE_UNTIL)
    .order('closes_at', { ascending: true })

  if (error) throw new Error(`June questions lookup failed: ${error.message}`)

  const rows = data || []
  if (rows.length === 0) {
    throw new Error(`No June 2026 settlement candidate found in questions between ${JUNE_FROM} and ${JUNE_UNTIL}`)
  }

  const { candidate, reason } = pickCandidate(rows)
  if (!candidate) throw new Error('No first-settlement candidate found in questions')

  const resolutionSource = hasResolutionSource ? candidate.resolution_source ?? null : null
  const resolutionUrl = hasResolutionUrl ? candidate.resolution_url ?? null : null
  const publicSource = isUsablePublicSource(resolutionUrl) ? resolutionUrl : resolutionSource

  if (!isUsablePublicSource(publicSource)) {
    throw new Error(`First-settlement candidate has no usable public source: ${candidate.title || candidate.id}`)
  }

  const report = {
    ok: true,
    mode: 'readonly',
    table: 'questions',
    checked_at: new Date().toISOString(),
    candidate_reason: reason,
    candidate: {
      title: candidate.title,
      status: candidate.status,
      closes_at: candidate.closes_at,
      resolution_source: resolutionSource,
      resolution_url: resolutionUrl,
    },
    checklist: [
      'Confirm the candidate title matches the intended first settlement.',
      'Open the public source URL before settlement.',
      'Capture source title, publisher, URL, and retrieval timestamp.',
      'Save public evidence only. Do not inspect protected Blind Consensus data for open questions.',
      'Settle only after close time and after the source directly answers the question.',
    ],
  }

  console.log(JSON.stringify(report, null, 2))
}

main().catch(error => {
  console.error(JSON.stringify({ ok: false, error: error.message }, null, 2))
  process.exit(1)
})
