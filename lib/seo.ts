import type { Metadata } from 'next'

const BASE_URL = 'https://baycast-p.vercel.app'
const DEFAULT_OG_IMAGE = `${BASE_URL}/og.png`

interface SEOProps {
  title: string
  description: string
  path?: string
  ogImage?: string
  ogType?: 'website' | 'article'
  noIndex?: boolean
}

/**
 * Generates a Next.js Metadata object with Open Graph and Twitter card tags.
 * Usage in any page/layout:
 *   export const metadata = buildSEO({ title: '...', description: '...' })
 */
export function buildSEO({
  title,
  description,
  path = '',
  ogImage = DEFAULT_OG_IMAGE,
  ogType = 'website',
  noIndex = false,
}: SEOProps): Metadata {
  const url = `${BASE_URL}${path}`
  const fullTitle = title.includes('Baycast') ? title : `${title} — Baycast`

  return {
    title: fullTitle,
    description,
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: 'Baycast',
      type: ogType,
      locale: 'en_US',
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630, alt: fullTitle }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: ogImage ? [ogImage] : [],
    },
    ...(noIndex && { robots: { index: false, follow: false } }),
  }
}
