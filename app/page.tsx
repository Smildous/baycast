import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import QuestionCard from '@/components/QuestionCard'
import EmptyState from '@/components/EmptyState'
import JsonLdScript from '@/components/JsonLdScript'
import type { Question } from '@/lib/types'
import { autoCloseExpiredQuestions, aggregateProbabilities } from '@/lib/utils'
import { buildSEO } from '@/lib/seo'

// Ensure the landing page is always dynamically rendered so stats reflect the live DB
export const dynamic = 'force-dynamic'

export const metadata = buildSEO({
  title: 'Baycast - Predict Real Events',
  description:
    'Forecast real events, get scored on accuracy, and see how you compare. No money. No gambling.',
  path: '',
})

const websiteJsonLd: Record<string, unknown> = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Baycast',
  url: 'https://baycast-p.vercel.app',
  description: 'Prediction polling platform',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://baycast-p.vercel.app/questions?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
}

const organizationJsonLd: Record<string, unknown> = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Baycast',
  description: 'Prediction polling platform',
  url: 'https://baycast-p.vercel.app',
  logo: 'https://baycast-p.vercel.app/logo.png',
  sameAs: [],
}

async function getStats() {
  const supabase = createClient()
  const [{ count: qCount }, { count: uCount }, { count: fCount }] = await Promise.all([
    supabase.from('questions').select('*', { count: 'exact', head: true }).eq('status', 'open'),
    supabase.from('profiles').select('*', { count: 'exact', head: true }),
    supabase.from('forecasts').select('*', { count: 'exact', head: true }),
  ])
  return { questions: qCount ?? 0, users: uCount ?? 0, forecasts: fCount ?? 0 }
}

async function getTrending(): Promise<Question[]> {
  const supabase = createClient()
  await autoCloseExpiredQuestions(supabase)
  const { data } = await supabase
    .from('questions')
    .select('*')
    .eq('status', 'open')
    .order('closes_at', { ascending: true })
    .limit(5)
  const questions = (data ?? []) as Question[]

  if (questions.length > 0) {
    const ids = questions.map((q) => q.id)
    const { data: forecasts } = await supabase
      .from('forecasts')
      .select('question_id, prediction')
      .in('question_id', ids)

    if (forecasts) {
      const grouped = new Map<string, number[]>()
      for (const row of forecasts) {
        const probs = grouped.get(row.question_id) ?? []
        probs.push((row.prediction as { probability: number }).probability)
        grouped.set(row.question_id, probs)
      }
      for (const q of questions) {
        const probs = grouped.get(q.id)
        if (probs && probs.length > 0) {
          q.aggregate_probability = aggregateProbabilities(probs)
          q.forecasters_count = probs.length
        }
      }
    }
  }

  return questions
}

export default async function HomePage() {
  const [stats, trending] = await Promise.all([getStats(), getTrending()])

  return (
    <div className="max-w-5xl mx-auto px-4">
      {/* WebSite + Organization JSON-LD for SEO */}
      <JsonLdScript data={websiteJsonLd} />
      <JsonLdScript data={organizationJsonLd} />

      {/* ── Hero ── */}
      <section className="text-center py-16 md:py-24 relative">
        {/* Decorative gradient orbs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-accent-green/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-20 right-1/4 w-[300px] h-[300px] bg-accent-blue/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative">
          {/* Launch badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent-green/30 bg-accent-green/5 text-accent-green text-sm font-medium mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-green opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-green"></span>
            </span>
            Live now: human and AI forecasting
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-outfit font-extrabold leading-tight mb-6 tracking-tight">
            How well can you{' '}
            <span className="bg-gradient-to-r from-accent-green to-accent-blue bg-clip-text text-transparent">
              predict the future?
            </span>
          </h1>
          <p className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Forecast real events alongside AI models. Track your accuracy when questions resolve.{' '}
            <span className="text-text-primary font-medium">No money. No gambling.</span>
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/auth/signup"
              className="px-10 py-4 rounded-xl bg-gradient-to-r from-accent-green to-emerald-600 text-white font-bold text-lg hover:from-accent-green hover:to-emerald-500 transition-all shadow-lg shadow-accent-green/20 hover:shadow-accent-green/40 hover:-translate-y-0.5"
            >
              Start forecasting
            </Link>
            <Link
              href="/questions"
              className="px-10 py-4 rounded-xl border border-border-dark text-text-primary hover:border-accent-green/50 hover:bg-white/[0.02] transition-all font-medium text-lg"
            >
              Browse Questions →
            </Link>
          </div>

          {/* Trust micro-bar */}
          <div className="flex items-center justify-center gap-6 mt-10 text-sm text-text-secondary flex-wrap text-center">
            <span className="flex items-center gap-1.5">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 1L10.1 5.3L15 6L11.5 9.4L12.3 14.3L8 12.1L3.7 14.3L4.5 9.4L1 6L5.9 5.3L8 1Z" fill="#0F9D58"/>
              </svg>
              Free forever
            </span>
            <span className="flex items-center gap-1.5">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="8" cy="8" r="7" stroke="#0F9D58" strokeWidth="1.5" fill="none"/>
                <path d="M5 8L7 10L11 6" stroke="#0F9D58" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              No sign-up card
            </span>
            <span className="flex items-center gap-1.5">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="6" width="12" height="8" rx="1.5" stroke="#0F9D58" strokeWidth="1.5" fill="none"/>
                <path d="M5 6V4.5C5 2.84315 6.34315 1.5 8 1.5V1.5C9.65685 1.5 11 2.84315 11 4.5V6" stroke="#0F9D58" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              30-second sign-up
            </span>
          </div>
        </div>
      </section>

      {/* ── Social Proof Bar ── */}
      <section className="grid grid-cols-3 gap-4 mb-24">
        {[
          { value: stats.questions, label: 'Questions live now', icon: '📊' },
          ...(stats.users >= 50
            ? [{ value: stats.users, label: 'Forecasters joined', icon: '👥' }]
            : [{ value: 'AI vs Human', label: 'Forecasting', icon: '🤖' }]
          ),
          { value: '100%', label: 'Free to play', icon: '🎯' },
        ].map((s) => (
          <div key={s.label} className="bg-bg-surface border border-border-dark rounded-xl p-6 text-center hover:border-accent-green/20 transition-colors">
            <div className="text-2xl mb-2">{s.icon}</div>
            <div className="text-3xl md:text-4xl font-mono font-bold text-accent-green mb-1">
              {typeof s.value === 'number' ? s.value.toLocaleString('en-US') : s.value}
            </div>
            <div className="text-text-secondary text-sm">{s.label}</div>
          </div>
        ))}
      </section>

      {/* ── How Baycast Works ── */}
      <section className="mb-24">
        <h2 className="text-2xl md:text-3xl font-outfit font-semibold text-center mb-4">How Baycast Works</h2>
        <p className="text-text-secondary text-center mb-12 max-w-lg mx-auto">Prediction polling, not gambling. You make the call. The outcome scores it.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              step: '01',
              icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" fill="none" />
                  <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="1.5" fill="none" />
                  <circle cx="12" cy="12" r="2" fill="currentColor" />
                  <line x1="12" y1="2" x2="12" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="12" y1="18" x2="12" y2="22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="2" y1="12" x2="6" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="18" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              ),
              title: 'Make your forecast',
              description: 'Pick a probability for a real question.',
            },
            {
              step: '02',
              icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto">
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7S2 12 2 12z" stroke="currentColor" strokeWidth="1.5" fill="none" />
                  <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
                  <path d="M15 3l3 3M6 3L3 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ),
              title: 'Answer before the crowd',
              description: 'You do not see the crowd until after you answer.',
            },
            {
              step: '03',
              icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto">
                  <path d="M6 9l4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  <path d="M10 5v14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M14 5v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M14 11v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M14 17v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              ),
              title: 'Get scored',
              description: 'When the question resolves, your accuracy counts.',
            },
          ].map((step) => (
            <div key={step.title} className="bg-bg-surface border border-border-dark rounded-xl p-6 text-center relative hover:border-accent-green/20 transition-colors">
              <div className="absolute top-4 right-4 text-xs font-mono text-text-secondary/40">{step.step}</div>
              <div className="text-accent-green mb-4">{step.icon}</div>
              <h3 className="font-outfit font-semibold text-lg mb-2">{step.title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Baycast is different */}
      <section className="mb-24">
        <h2 className="text-2xl md:text-3xl font-outfit font-semibold text-center mb-4">Why Baycast is different</h2>
        <p className="text-text-secondary text-center mb-12 max-w-lg mx-auto">Not another prediction market. A place to make probability forecasts without trading.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: '⚖️',
              title: 'No money at stake',
              description: 'No trades. No market-moving accounts. Your score comes from being right.',
            },
            {
              icon: '🤖',
              title: 'Human vs AI',
              description: 'Forecast the same questions as AI models and compare the scores.',
            },
            {
              icon: '🧠',
              title: 'Blind consensus',
              description: 'Answer first. See the crowd later. That keeps the first call clean.',
            },
          ].map((card) => (
            <div key={card.title} className="bg-bg-surface border border-border-dark rounded-xl p-6 text-center hover:border-accent-green/20 transition-colors">
              <div className="text-4xl mb-4">{card.icon}</div>
              <h3 className="font-outfit font-semibold text-lg mb-2">{card.title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">{card.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Live Questions ── */}
      <section className="mb-24">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-outfit font-semibold">Live questions</h2>
            <p className="text-text-secondary text-sm mt-1">These need your forecast right now</p>
          </div>
          <Link href="/questions" className="text-accent-blue hover:underline text-sm font-medium whitespace-nowrap">
            View all →
          </Link>
        </div>
        {trending.length === 0 ? (
          <div className="bg-bg-surface border border-border-dark rounded-xl">
            <EmptyState
              icon="🔮"
              title="No open questions at the moment"
              description="Check back soon or sign up to get notified when new questions go live."
              cta={{ label: 'Sign Up', href: '/auth/signup' }}
            />
          </div>
        ) : (
          <div className="space-y-3">
            {trending.map((q) => (
              <QuestionCard key={q.id} question={q} />
            ))}
          </div>
        )}
      </section>

      {/* ── Final CTA ── */}
      <section className="text-center py-16 md:py-20 mb-8 rounded-2xl px-6 relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent-green/10 via-bg-surface to-accent-blue/10 rounded-2xl" />
        <div className="absolute inset-0 border border-accent-green/20 rounded-2xl" />

        <div className="relative">
          <h2 className="text-3xl md:text-4xl font-outfit font-extrabold mb-4">
            Put your judgment{' '}
            <span className="bg-gradient-to-r from-accent-green to-accent-blue bg-clip-text text-transparent">
              to the test.
            </span>
          </h2>
          <p className="text-text-secondary mb-8 max-w-md mx-auto text-lg">
            Forecast for free. No tokens. No financial risk. Just your forecast, scored against what happens next.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/auth/signup"
              className="px-10 py-4 rounded-xl bg-gradient-to-r from-accent-green to-emerald-600 text-white font-bold text-lg hover:from-accent-green hover:to-emerald-500 transition-all shadow-lg shadow-accent-green/20 hover:shadow-accent-green/40 hover:-translate-y-0.5"
            >
              Create account
            </Link>
            <Link
              href="/questions"
              className="px-10 py-4 rounded-xl border border-border-dark text-text-primary hover:border-accent-green/50 hover:bg-white/[0.02] transition-all font-medium text-lg"
            >
              Explore Questions →
            </Link>
          </div>
          {stats.users >= 50 && (
            <p className="text-text-secondary/60 text-xs mt-6">
              Join {stats.users} forecaster{stats.users !== 1 ? 's' : ''} already on Baycast
            </p>
          )}
        </div>
      </section>
    </div>
  )
}
