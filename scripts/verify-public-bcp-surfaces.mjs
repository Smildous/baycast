#!/usr/bin/env node
/**
 * Public Blind Consensus Protocol surface verifier.
 *
 * Fetches public HTML with Node fetch and fails if fields or copy that can leak
 * open-question consensus data appear on public routes.
 */

const DEFAULT_BASE_URL = 'https://baycast-p.vercel.app'
const ROUTES = ['/', '/questions', '/leaderboard', '/activity']

const baseUrl = normalizeBaseUrl(process.env.BAYCAST_BASE_URL || DEFAULT_BASE_URL)

const checks = [
  {
    name: 'aggregate_probability field name',
    pattern: /aggregate_probability/g,
  },
  {
    name: 'forecasters_count field name',
    pattern: /forecasters_count/g,
  },
  {
    name: 'exact forecaster count copy',
    pattern: /\b\d{1,3}(?:,\d{3})*\s+forecasters?\b/gi,
  },
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

function preview(html, index, length) {
  const start = Math.max(0, index - 90)
  const end = Math.min(html.length, index + length + 90)
  return html
    .slice(start, end)
    .replace(/\s+/g, ' ')
    .trim()
}

function findPatternMatches(html, check) {
  const matches = []
  for (const match of html.matchAll(check.pattern)) {
    matches.push({
      check: check.name,
      value: match[0],
      preview: preview(html, match.index ?? 0, match[0].length),
    })
  }
  return matches
}

function findCommunityConsensusOpenQuestionMatches(html) {
  const matches = []
  const pattern = /community consensus/gi
  const contextPattern = /open[-\s]?question|open questions?|blind phase|forecast is private|stay hidden until resolution|consensus hidden/i

  for (const match of html.matchAll(pattern)) {
    const index = match.index ?? 0
    const windowStart = Math.max(0, index - 800)
    const windowEnd = Math.min(html.length, index + match[0].length + 800)
    const context = html.slice(windowStart, windowEnd)

    if (!contextPattern.test(context)) continue

    matches.push({
      check: 'community consensus copy in open-question context',
      value: match[0],
      preview: preview(html, index, match[0].length),
    })
  }

  return matches
}

async function fetchRoute(route) {
  const url = routeUrl(route)
  const response = await fetch(url, {
    headers: {
      accept: 'text/html,application/xhtml+xml',
      'user-agent': 'baycast-public-bcp-verifier/1.0',
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

const flagged = []
const fetchFailures = []

console.log(`Verifying public BCP surfaces at ${baseUrl}`)

for (const route of ROUTES) {
  try {
    const html = await fetchRoute(route)
    const routeMatches = [
      ...checks.flatMap(check => findPatternMatches(html, check)),
      ...findCommunityConsensusOpenQuestionMatches(html),
    ]

    if (routeMatches.length === 0) {
      console.log(`ok ${route}`)
      continue
    }

    console.error(`flagged ${route}`)
    for (const match of routeMatches) {
      console.error(`  - ${match.check}: ${JSON.stringify(match.value)}`)
      console.error(`    ${match.preview}`)
      flagged.push({ route, ...match })
    }
  } catch (error) {
    fetchFailures.push({ route, error })
    console.error(`failed ${route}: ${error.message}`)
  }
}

if (fetchFailures.length > 0 || flagged.length > 0) {
  console.error('\nPublic BCP surface verification failed.')
  if (fetchFailures.length > 0) {
    console.error(`Fetch failures: ${fetchFailures.length}`)
  }
  if (flagged.length > 0) {
    console.error(`Flagged routes: ${[...new Set(flagged.map(match => match.route))].join(', ')}`)
  }
  process.exit(1)
}

console.log('Public BCP surface verification passed.')
