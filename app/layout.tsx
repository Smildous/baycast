import type { Metadata } from 'next'
import './globals.css'
import Nav from '@/components/Nav'

export const metadata: Metadata = {
  title: 'Baycast — Prediction Polling',
  description: 'Forecast the future. Track your accuracy. Rise on the leaderboard.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="dark">
      <body className="min-h-screen bg-bg-primary text-text-primary font-dm-sans">
        <Nav />
        <main className="pt-16">{children}</main>
      </body>
    </html>
  )
}
