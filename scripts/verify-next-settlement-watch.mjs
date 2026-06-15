#!/usr/bin/env node
/**
 * Read-only watch for the next settlement candidates.
 *
 * Reads questions only. It never queries forecasts or writes to Supabase.
 */

import { getClient } from './supabase-admin.mjs'

const CANDIDATES = [
  {
    label: 'FIFA opening match at least three goals',
    titleSubstring: '2026 FIFA World Cup opening match',
    expectedStatus: 'open',
    expectedClosesAt: '2026-06-30T23:59:59+00:00',
  },
  {
    label: 'OpenAI public video generation model before July 1 2026',
    titleSubstring: 'OpenAI release a new public video generation model before July 1, 2026',
    expectedStatus: 'open',
    expectedClosesAt: '2026-06-30T23:59:59+00:00',
  },
  {
    label: 'Microsoft first-party Xbox handheld before Aug 1 2026',
    titleSubstring: 'Microsoft announce a new first-party Xbox handheld before August 1, 2026',
    expectedStatus: 'open',
    expectedClosesAt: '2026-07-31T23:59:59+00:00',
  },
]

function normalizeIso(value) {
  if (!value) return null
  const timestamp = new Date(value).getTime()
  if (Number.isNaN(timestamp)) return String(value)
  return new Date(timestamp).toISOString()
}

function sameInstant(left, right) {
  return normalizeIso(left) === normalizeIso(right)
}

function safeMessage(error) {
  return String(error?.message || error || 'unknown error')
    .replace(/(eyJ[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+)/g, '[redacted-jwt]')
    .replace(/(service_role|anon)[=:]\s*[^\s,;]+/gi, '$1=[redacted]')
}

function resultFor(candidate, rows) {
  const matches = (rows || []).filter(row => row.title?.toLowerCase().includes(candidate.titleSubstring.toLowerCase()))

  if (matches.length !== 1) {
    return {
      ok: false,
      label: candidate.label,
      reason: `expected exactly 1 matching question, found ${matches.length}`,
      matches: matches.map(row => ({ id: row.id, title: row.title, status: row.status, closes_at: row.closes_at })),
    }
  }

  const question = matches[0]
  const failures = []
  if (question.status !== candidate.expectedStatus) {
    failures.push(`status ${question.status || 'null'} != ${candidate.expectedStatus}`)
  }
  if (!sameInstant(question.closes_at, candidate.expectedClosesAt)) {
    failures.push(`closes_at ${question.closes_at || 'null'} != ${candidate.expectedClosesAt}`)
  }

  return {
    ok: failures.length === 0,
    label: candidate.label,
    question: {
      id: question.id,
      title: question.title,
      status: question.status,
      closes_at: question.closes_at,
    },
    reason: failures.join('; ') || 'ok',
  }
}

async function main() {
  let client
  try {
    client = await getClient()
  } catch (error) {
    console.error(`next settlement watch: FAIL\nSupabase env unavailable: ${safeMessage(error)}`)
    process.exitCode = 1
    return
  }

  const { data, error } = await client
    .from('questions')
    .select('id,title,status,closes_at')
    .order('closes_at', { ascending: true })

  if (error) {
    console.error(`next settlement watch: FAIL\nquestions lookup failed: ${safeMessage(error)}`)
    process.exitCode = 1
    return
  }

  const results = CANDIDATES.map(candidate => resultFor(candidate, data || []))
  const ok = results.every(result => result.ok)

  console.log(`next settlement watch: ${ok ? 'PASS' : 'FAIL'}`)
  for (const result of results) {
    console.log(`${result.ok ? 'PASS' : 'FAIL'} ${result.label}: ${result.reason}`)
    if (result.question) {
      console.log(`  ${result.question.id} | ${result.question.status} | ${result.question.closes_at} | ${result.question.title}`)
    }
    if (result.matches?.length) {
      for (const match of result.matches) {
        console.log(`  ${match.id} | ${match.status} | ${match.closes_at} | ${match.title}`)
      }
    }
  }

  if (!ok) process.exitCode = 1
}

main().catch(error => {
  console.error(`next settlement watch: FAIL\n${safeMessage(error)}`)
  process.exitCode = 1
})
