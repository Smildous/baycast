#!/usr/bin/env node

const DEFAULT_BASE_URL = 'https://baycast-p.vercel.app'
const APPLE_SETTLEMENT_PATH = '/settlements/apple-mac-pro-wwdc-2026'

const baseUrl = normalizeBaseUrl(process.env.BAYCAST_BASE_URL || DEFAULT_BASE_URL)

const routes = {
  home: '/',
  resolvedQuestions: '/questions?status=resolved',
  appleSettlement: APPLE_SETTLEMENT_PATH,
}

const resolvedPrivateFields = [
  'settled_by',
  'evidence_doc',
  'aggregate_probability',
  'forecasters_count',
]

function normalizeBaseUrl(value) {
  try {
    const url = new URL(value)
    url.pathname = url.pathname.replace(/\/+$/, '')
    url.search = ''
    url.hash = ''
    return url.toString().replace(/\/+$/, '')
  } catch {
    console.error(`Invalid BAYCAST_BASE_URL: ${value}`)
    process.exit(2)
  }
}

function routeUrl(route) {
  return `${baseUrl}${route === '/' ? '' : route}`
}

function compactText(html) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim()
}

async function fetchHtml(route) {
  const url = routeUrl(route)
  const response = await fetch(url, {
    headers: {
      accept: 'text/html,application/xhtml+xml',
      'user-agent': 'baycast-distribution-gate-verifier/1.0',
    },
    redirect: 'follow',
  })

  if (!response.ok) {
    throw new Error(`${url} returned ${response.status} ${response.statusText}`)
  }

  const contentType = response.headers.get('content-type') || ''
  if (!contentType.toLowerCase().includes('text/html')) {
    throw new Error(`${url} returned non-HTML content-type: ${contentType || 'unknown'}`)
  }

  return response.text()
}

function requireText(name, text, patterns) {
  const missing = patterns.filter((pattern) => !pattern.test(text))
  if (missing.length === 0) return []

  return missing.map((pattern) => `${name} missing ${pattern}`)
}

function rejectText(name, text, values) {
  return values
    .filter((value) => text.includes(value))
    .map((value) => `${name} contains ${value}`)
}

const failures = []

console.log(`Verifying distribution gate at ${baseUrl}`)

try {
  const html = await fetchHtml(routes.appleSettlement)
  const text = compactText(html)
  failures.push(
    ...requireText('Apple settlement page', text, [
      /Apple Mac Pro at WWDC 2026 resolved No/i,
      /Baycast has its first resolved question/i,
      /Outcome\s+No/i,
      /Apple WWDC/i,
      /Apple Newsroom/i,
    ]),
  )
  console.log(`ok ${routes.appleSettlement}`)
} catch (error) {
  failures.push(`Apple settlement page failed: ${error.message}`)
}

try {
  const html = await fetchHtml(routes.resolvedQuestions)
  failures.push(...rejectText('resolved questions page', html, resolvedPrivateFields))
  console.log(`ok ${routes.resolvedQuestions}`)
} catch (error) {
  failures.push(`resolved questions page failed: ${error.message}`)
}

try {
  const html = await fetchHtml(routes.home)
  const text = compactText(html)
  failures.push(...rejectText('homepage', text, ['Free to play']))
  console.log(`ok ${routes.home}`)
} catch (error) {
  failures.push(`homepage failed: ${error.message}`)
}

if (failures.length > 0) {
  console.error('\nDistribution gate verification failed.')
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log('Distribution gate verification passed.')
