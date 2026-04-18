import type { Metadata } from 'next'
import './globals.css'
import Nav from '@/components/Nav'

export const metadata: Metadata = {
  title: 'Baycast — Collective Forecasting',
  description: 'When many people think carefully about the same question, the crowd tends to be right. Submit your forecasts, track your calibration, and contribute to collective intelligence.',
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
