import type { Category } from './types'
import { normalizeCategory } from './types'

export interface NewsContextLink {
  title: string
  source: string
  url: string
  summary: string
}

interface NewsContextEntry extends NewsContextLink {
  categories: Category[]
  keywords: string[]
}

const CONTEXT_LINKS: NewsContextEntry[] = [
  {
    title: 'Federal Reserve: recent monetary policy decisions',
    source: 'Federal Reserve',
    url: 'https://www.federalreserve.gov/monetarypolicy/fomccalendars.htm',
    summary: 'Official statements, projections, and meeting materials for US rate decisions.',
    categories: ['Economy'],
    keywords: ['fed', 'federal reserve', 'interest rate', 'rates', 'inflation', 'fomc'],
  },
  {
    title: 'FRED: US economic indicators',
    source: 'Federal Reserve Bank of St. Louis',
    url: 'https://fred.stlouisfed.org/',
    summary: 'A public data library for inflation, labor, output, and financial conditions.',
    categories: ['Economy'],
    keywords: ['inflation', 'cpi', 'gdp', 'unemployment', 'jobs', 'recession', 'economy'],
  },
  {
    title: 'Bureau of Labor Statistics: latest releases',
    source: 'BLS',
    url: 'https://www.bls.gov/bls/newsrels.htm',
    summary: 'Release calendar and source reports for US labor and inflation statistics.',
    categories: ['Economy'],
    keywords: ['jobs', 'employment', 'unemployment', 'cpi', 'wages', 'labor'],
  },
  {
    title: 'White House: presidential actions',
    source: 'The White House',
    url: 'https://www.whitehouse.gov/briefing-room/presidential-actions/',
    summary: 'Official executive orders, memoranda, proclamations, and related actions.',
    categories: ['Politics'],
    keywords: ['white house', 'president', 'executive order', 'biden', 'trump', 'us election'],
  },
  {
    title: 'Congress.gov: legislation and votes',
    source: 'Congress.gov',
    url: 'https://www.congress.gov/',
    summary: 'Official US bills, amendments, member actions, and legislative status.',
    categories: ['Politics'],
    keywords: ['congress', 'senate', 'house', 'bill', 'legislation', 'vote', 'shutdown'],
  },
  {
    title: 'United Nations: meetings coverage and releases',
    source: 'United Nations',
    url: 'https://press.un.org/en',
    summary: 'Official coverage for UN bodies, briefings, resolutions, and statements.',
    categories: ['Politics'],
    keywords: ['united nations', 'un ', 'security council', 'geopolitics', 'ceasefire', 'treaty'],
  },
  {
    title: 'SEC: crypto assets and cyber enforcement',
    source: 'SEC',
    url: 'https://www.sec.gov/securities-topics/crypto-assets',
    summary: 'Regulatory materials and investor information for crypto asset activity.',
    categories: ['Crypto'],
    keywords: ['crypto', 'bitcoin', 'ethereum', 'etf', 'sec', 'token', 'stablecoin'],
  },
  {
    title: 'Coin Metrics: market and network data',
    source: 'Coin Metrics',
    url: 'https://coinmetrics.io/community-network-data/',
    summary: 'Public datasets and charts for major crypto networks and market activity.',
    categories: ['Crypto'],
    keywords: ['bitcoin', 'ethereum', 'crypto', 'blockchain', 'network', 'market cap'],
  },
  {
    title: 'CoinGecko: crypto market data',
    source: 'CoinGecko',
    url: 'https://www.coingecko.com/',
    summary: 'Token prices, volume, exchange data, and project reference pages.',
    categories: ['Crypto'],
    keywords: ['bitcoin', 'ethereum', 'solana', 'token', 'crypto price', 'market'],
  },
  {
    title: 'NIST AI Resource Center',
    source: 'NIST',
    url: 'https://airc.nist.gov/',
    summary: 'AI risk management materials, standards work, and official guidance.',
    categories: ['AI', 'Technology'],
    keywords: ['ai', 'artificial intelligence', 'model', 'llm', 'frontier', 'safety'],
  },
  {
    title: 'OpenAI news and research updates',
    source: 'OpenAI',
    url: 'https://openai.com/news/',
    summary: 'Company announcements, safety notes, and research updates.',
    categories: ['AI', 'Technology'],
    keywords: ['openai', 'gpt', 'chatgpt', 'model', 'llm', 'artificial intelligence'],
  },
  {
    title: 'AI.gov: US government AI updates',
    source: 'AI.gov',
    url: 'https://ai.gov/',
    summary: 'US government AI policy, agency actions, and implementation resources.',
    categories: ['AI', 'Politics'],
    keywords: ['ai policy', 'artificial intelligence', 'regulation', 'government', 'agency'],
  },
  {
    title: 'NASA: missions and launch updates',
    source: 'NASA',
    url: 'https://www.nasa.gov/news/',
    summary: 'Official mission, launch, science, and agency announcements.',
    categories: ['Science', 'Technology'],
    keywords: ['nasa', 'space', 'launch', 'moon', 'mars', 'mission', 'rocket'],
  },
  {
    title: 'NOAA: climate and weather news',
    source: 'NOAA',
    url: 'https://www.noaa.gov/news',
    summary: 'Official updates on weather, oceans, climate, and environmental monitoring.',
    categories: ['Science'],
    keywords: ['weather', 'climate', 'hurricane', 'temperature', 'ocean', 'noaa'],
  },
  {
    title: 'WHO: disease outbreaks and emergencies',
    source: 'WHO',
    url: 'https://www.who.int/emergencies/disease-outbreak-news',
    summary: 'Official outbreak notices, emergency updates, and public health context.',
    categories: ['Science'],
    keywords: ['who', 'health', 'outbreak', 'virus', 'disease', 'pandemic', 'vaccine'],
  },
  {
    title: 'Apple WWDC',
    source: 'Apple',
    url: 'https://developer.apple.com/wwdc26/',
    summary: 'Official Apple Worldwide Developers Conference updates and event information.',
    categories: ['Technology'],
    keywords: ['apple', 'wwdc', 'mac', 'mac pro', 'ios'],
  },
  {
    title: 'Apple Newsroom',
    source: 'Apple',
    url: 'https://www.apple.com/newsroom/',
    summary: 'Official product, software, services, and company announcements.',
    categories: ['Technology'],
    keywords: ['apple', 'iphone', 'ios', 'mac', 'app store', 'wwdc'],
  },
  {
    title: 'Microsoft News Center',
    source: 'Microsoft',
    url: 'https://news.microsoft.com/',
    summary: 'Official Microsoft product, cloud, AI, and company updates.',
    categories: ['Technology', 'AI'],
    keywords: ['microsoft', 'azure', 'windows', 'copilot', 'xbox'],
  },
  {
    title: 'The Verge: tech coverage',
    source: 'The Verge',
    url: 'https://www.theverge.com/tech',
    summary: 'Technology reporting on platforms, products, policy, and the internet.',
    categories: ['Technology'],
    keywords: ['technology', 'platform', 'app', 'internet', 'device', 'software'],
  },
  {
    title: 'ESPN: top sports headlines',
    source: 'ESPN',
    url: 'https://www.espn.com/',
    summary: 'Schedules, standings, injuries, transactions, and sports news coverage.',
    categories: ['Sports'],
    keywords: ['nba', 'nfl', 'mlb', 'nhl', 'soccer', 'tennis', 'golf', 'sports'],
  },
  {
    title: 'The Athletic: sports news',
    source: 'The Athletic',
    url: 'https://www.nytimes.com/athletic/',
    summary: 'Team, league, and tournament reporting across major sports.',
    categories: ['Sports'],
    keywords: ['league', 'playoff', 'championship', 'world cup', 'team', 'match'],
  },
  {
    title: 'Official Olympic Games news',
    source: 'Olympics',
    url: 'https://olympics.com/en/news/',
    summary: 'Official Olympic and international competition updates.',
    categories: ['Sports'],
    keywords: ['olympic', 'olympics', 'medal', 'athlete', 'games'],
  },
  {
    title: 'Box Office Mojo: release and gross data',
    source: 'Box Office Mojo',
    url: 'https://www.boxofficemojo.com/',
    summary: 'Film release calendars and box office reference data.',
    categories: ['Entertainment', 'Culture'],
    keywords: ['box office', 'movie', 'film', 'cinema', 'opening weekend'],
  },
  {
    title: 'Billboard: charts and music news',
    source: 'Billboard',
    url: 'https://www.billboard.com/charts/',
    summary: 'Music charts, release coverage, and artist news.',
    categories: ['Entertainment', 'Culture'],
    keywords: ['music', 'album', 'song', 'artist', 'billboard', 'grammy'],
  },
  {
    title: 'UNESCO: culture news',
    source: 'UNESCO',
    url: 'https://www.unesco.org/en/newsroom',
    summary: 'Official updates on culture, heritage, education, and science programs.',
    categories: ['Culture'],
    keywords: ['culture', 'heritage', 'unesco', 'arts', 'museum'],
  },
]

const MAX_CONTEXT_LINKS = 3
const MIN_CONTEXT_LINKS = 2
const APPLE_CONTEXT_URLS = new Set(['https://developer.apple.com/wwdc26/', 'https://www.apple.com/newsroom/'])

function normalizeText(value: string | null | undefined): string {
  return (value ?? '').toLowerCase()
}

function hasKeyword(entry: NewsContextEntry, haystack: string): boolean {
  return entry.keywords.some((keyword) => haystack.includes(keyword))
}

function isAppleHardwareQuestion(haystack: string): boolean {
  return haystack.includes('apple') || haystack.includes('mac pro') || haystack.includes('wwdc')
}

export function getQuestionNewsContext(input: {
  title: string
  category: string
  description?: string | null
}): NewsContextLink[] {
  const category = normalizeCategory(input.category)
  const haystack = `${normalizeText(input.title)} ${normalizeText(input.description)}`

  if (isAppleHardwareQuestion(haystack)) {
    return CONTEXT_LINKS.filter((entry) => APPLE_CONTEXT_URLS.has(entry.url)).map((entry) => ({
      title: entry.title,
      source: entry.source,
      url: entry.url,
      summary: entry.summary,
    }))
  }

  const matches = CONTEXT_LINKS.filter((entry) => hasKeyword(entry, haystack))
  const categoryMatches = CONTEXT_LINKS.filter((entry) => entry.categories.includes(category))

  const selected = new Map<string, NewsContextLink>()
  for (const entry of [...matches, ...categoryMatches]) {
    selected.set(entry.url, {
      title: entry.title,
      source: entry.source,
      url: entry.url,
      summary: entry.summary,
    })
    if (selected.size === MAX_CONTEXT_LINKS) break
  }

  const links = Array.from(selected.values())
  return links.length >= MIN_CONTEXT_LINKS ? links : []
}
