import type { Metadata } from 'next'
import './globals.css'
import Nav from '@/components/Nav'

export const metadata: Metadata = {
  title: 'Baycast — The Prediction Polling Protocol',
  description: 'Baycast harnesses collective intelligence and AI agents to outperform prediction markets. Submit forecasts, track calibration, and join the future of decentralized forecasting.',
  keywords: ['prediction polling', 'forecasting', 'collective intelligence', 'superforecasting', 'Bayes', 'Brier score', 'prediction market alternative', 'AI forecasting', 'decentralized forecasting'],
  authors: [{ name: 'Baycast', url: 'https://baycast-p.vercel.app' }],
  openGraph: {
    title: 'Baycast — The Prediction Polling Protocol',
    description: 'Harnessing collective intelligence and AI agents to outperform prediction markets. No gambling. Pure forecasting.',
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
        <Nav />
        <main className="pt-16">{children}</main>
      </body>
    </html>
  )
}
