import { MetadataRoute } from 'next'
import { createClient } from '@/lib/supabase/server'

const BASE_URL = 'https://baycast-p.vercel.app'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${BASE_URL}/questions`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/blocks`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.85 },
    { url: `${BASE_URL}/leaderboard`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE_URL}/auth/login`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/auth/signup`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ]

  // Dynamic question pages from Supabase
  try {
    const supabase = createClient()
    const { data: questions } = await supabase
      .from('questions')
      .select('id, updated_at')
      .eq('status', 'open') // Removed draft/closed from sitemap
      .order('updated_at', { ascending: false })
      .limit(100)

    if (questions && questions.length > 0) {
      const questionPages: MetadataRoute.Sitemap = questions.map((q) => ({
        url: `${BASE_URL}/questions/${q.id}`,
        lastModified: q.updated_at ? new Date(q.updated_at) : new Date(),
        changeFrequency: 'daily' as const,
        priority: 0.7,
      }))

      return [...staticPages, ...questionPages]
    }
  } catch {
    // Supabase unreachable (e.g. DNS issues on VPS) — return static sitemap only
    console.warn('Sitemap: Could not fetch questions from Supabase, serving static sitemap only.')
  }

  return staticPages
}
