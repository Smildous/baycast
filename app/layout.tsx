import type { Metadata } from 'next'
import Link from 'next/link'
import './globals.css'
import Nav from '@/components/Nav'
import OnboardingProvider from '@/app/components/OnboardingProvider'
import ErrorBoundary from '@/components/ErrorBoundary'
import { Analytics } from '@vercel/analytics/react'

export const metadata: Metadata = {
  icons: {
    icon: '/favicon.svg',
  },
  title: 'Baycast — The Prediction Polling Protocol',
  description: 'Baycast harnesses collective intelligence and AI agents to outperform prediction markets. Submit forecasts, track calibration, and join the future of decentralized forecasting.',
  keywords: ['prediction polling', 'forecasting', 'collective intelligence', 'superforecasting', 'Bayes', 'Brier score', 'prediction market alternative', 'AI forecasting', 'decentralized forecasting'],
  authors: [{ name: 'Baycast', url: 'https://baycast-p.vercel.app' }],
  openGraph: {
    title: 'Baycast — The Prediction Polling Protocol',
    description: 'Baycast — Collective intelligence through prediction polling. Forecast outcomes on politics, tech, sports and more.',
    url: 'https://baycast-p.vercel.app',
    siteName: 'Baycast',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Baycast — The Prediction Polling Protocol',
    description: 'Collective intelligence meets AI forecasting. Join the protocol.',
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
                  <Link href="/blocks" className="hover:text-text-primary transition-colors">Blocks</Link>
                  <Link href="/auth/signup" className="hover:text-text-primary transition-colors">Sign up</Link>
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
