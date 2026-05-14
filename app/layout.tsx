import type { Metadata } from 'next'
import Link from 'next/link'
import './globals.css'
import Nav from '@/components/Nav'
import OnboardingProvider from '@/app/components/OnboardingProvider'
import ErrorBoundary from '@/components/ErrorBoundary'
import { Analytics } from '@vercel/analytics/react'

export const metadata: Metadata = {
  metadataBase: new URL('https://baycast-p.vercel.app'),
  icons: {
    icon: '/favicon.svg',
  },
  title: 'Baycast - Forecast real events',
  description: 'Baycast lets you forecast real events, compare your accuracy, and see how humans and AI score over time.',
  keywords: ['prediction polling', 'forecasting', 'superforecasting', 'Bayes', 'Brier score', 'prediction market alternative', 'AI forecasting'],
  authors: [{ name: 'Baycast', url: 'https://baycast-p.vercel.app' }],
  openGraph: {
    title: 'Baycast - Forecast real events',
    description: 'Forecast real events, get scored, and compare humans with AI.',
    url: 'https://baycast-p.vercel.app',
    siteName: 'Baycast',
    type: 'website',
    locale: 'en_US',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Baycast - Forecast real events' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Baycast - Forecast real events',
    description: 'Forecast real events, get scored, and compare humans with AI.',
    images: ['/opengraph-image'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-bg-primary text-text-primary font-dm-sans">
        <OnboardingProvider>
          <ErrorBoundary>
            <Nav />
            <main className="pt-16 min-h-[calc(100vh-8rem)]">{children}</main>
            <footer className="border-t border-border-dark py-8 mt-8">
              <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-text-secondary">
                <div className="flex items-center gap-2">
                  <span className="font-outfit font-bold bg-gradient-to-r from-accent-green to-accent-blue bg-clip-text text-transparent">
                    BAYCAST
                  </span>
                  <span>© 2026</span>
                </div>
                <div className="flex items-center gap-6">
                  <Link href="/questions" className="hover:text-text-primary transition-colors">Questions</Link>
                  <Link href="/leaderboard" className="hover:text-text-primary transition-colors">Leaderboard</Link>
                  {/* TODO(AQ-190): Re-enable Blocks link when Blocks feature is ready */}
                  {/* <Link href="/blocks" className="hover:text-text-primary transition-colors">Blocks</Link> */}
                  <Link href="/auth/signup" className="hover:text-text-primary transition-colors">Sign up</Link>
                </div>
                <div className="flex items-center gap-4">
                  <Link
                    href="/auth/signup"
                    className="px-4 py-2 rounded-lg bg-accent-green text-white font-semibold text-sm hover:bg-accent-green/90 transition-colors shadow-sm shadow-accent-green/20"
                  >
                    Join Baycast
                  </Link>
                </div>
                <div className="text-text-secondary/60">
                  Not a prediction market. Pure forecasting.
                </div>
              </div>
            </footer>
          </ErrorBoundary>
        </OnboardingProvider>
        <Analytics />
      </body>
    </html>
  )
}
