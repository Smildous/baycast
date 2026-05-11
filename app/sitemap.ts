import { MetadataRoute } from 'next'
import { createClient } from '@supabase/supabase-js'

// Prevent Vercel from caching a static sitemap at build time
// (build-time Supabase queries may fail, resulting in static-only sitemap)
export const dynamic = 'force-dynamic'

const BASE_URL = 'https://baycast-p.vercel.app'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${BASE_URL}/questions`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/blocks`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.85 },
    { url: `${BASE_URL}/leaderboard`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE_URL}/how-it-works`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.85 },
    { url: `${BASE_URL}/compare`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.85 },
    { url: `${BASE_URL}/auth/login`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/auth/signup`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ]

  // Dynamic question pages from Supabase
  // Use direct Supabase client (no cookies/SSR) — sitemap routes lack cookie context
  // which causes the server createClient() to throw silently.
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) {
      console.warn('Sitemap: Missing Supabase env vars, serving static sitemap only.')
      return staticPages
    }

    const supabase = createClient(supabaseUrl, supabaseKey)
    const { data: questions, error } = await supabase
      .from('questions')
      .select('id, updated_at, status')
      .in('status', ['open', 'closed', 'resolved']) // All published (non-draft) questions
      .order('updated_at', { ascending: false })
      .limit(500)

    if (error) {
      console.warn('Sitemap: Supabase query failed:', error.message, '— serving static sitemap only.')
      return staticPages
    }

    if (questions && questions.length > 0) {
      const questionPages: MetadataRoute.Sitemap = questions.map((q) => ({
        url: `${BASE_URL}/questions/${q.id}`,
        lastModified: q.updated_at ? new Date(q.updated_at) : new Date(),
        changeFrequency: 'daily' as const,
        priority: 0.7,
      }))

      return [...staticPages, ...questionPages]
    }
  } catch (err) {
    // Supabase unreachable (e.g. DNS issues on VPS) — return static sitemap only
    console.warn('Sitemap: Could not fetch questions from Supabase, serving static sitemap only.', err)
  }

  return staticPages
}
