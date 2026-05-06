import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import QuestionCard from '@/components/QuestionCard'
import EmptyState from '@/components/EmptyState'
import type { Question } from '@/lib/types'
import { autoCloseExpiredQuestions, aggregateProbabilities } from '@/lib/utils'
import { buildSEO } from '@/lib/seo'

// Ensure the landing page is always dynamically rendered so stats reflect the live DB
export const dynamic = 'force-dynamic'

export const metadata = buildSEO({
  title: 'Baycast — Predict Real-World Events',
  description:
    'Forecast outcomes, get scored on accuracy, and see how you stack up. Free prediction polling — no money, just judgment.',
  path: '',
})

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
      {/* ── Hero ── */}
      <section className="text-center py-20 md:py-28">
        <h1 className="text-4xl md:text-6xl font-outfit font-bold leading-tight mb-6">
          Predict the future.{' '}
          <span className="bg-gradient-to-r from-accent-green to-accent-blue bg-clip-text text-transparent">
            Get scored.
          </span>
        </h1>
        <p className="text-text-secondary text-lg md:text-xl max-w-xl mx-auto mb-10">
          Forecast real-world events, track your accuracy with Brier scores, and compete on the leaderboard.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            href="/auth/signup"
            className="px-8 py-3 rounded-lg bg-accent-green text-white font-semibold hover:bg-accent-green/90 transition-colors"
          >
            Start Forecasting — Free
          </Link>
          <Link
            href="/questions"
            className="px-8 py-3 rounded-lg border border-border-dark text-text-primary hover:border-accent-green/50 transition-colors"
          >
            Browse Questions
          </Link>
        </div>
      </section>

      {/* ── Social Proof Bar ── */}
      <section className="grid grid-cols-3 gap-4 mb-24">
        {[
          { value: stats.questions, label: 'Live questions' },
          { value: Math.max(stats.forecasts, stats.users), label: 'Predictions made' },
          { value: '100%', label: 'Free to play' },
        ].map((s) => (
          <div key={s.label} className="bg-bg-surface border border-border-dark rounded-xl p-6 text-center">
            <div className="text-3xl md:text-4xl font-mono font-bold text-accent-green mb-1">
              {typeof s.value === 'number' ? s.value.toLocaleString('en-US') : s.value}
            </div>
            <div className="text-text-secondary text-sm">{s.label}</div>
          </div>
        ))}
      </section>

      {/* ── How It Works ── */}
      <section className="mb-24">
        <h2 className="text-2xl font-outfit font-semibold text-center mb-12">How it works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: '📊',
              title: 'Pick a question',
              description: 'Binary questions with clear resolution criteria and deadlines. No ambiguity.',
            },
            {
              icon: '🎯',
              title: 'Set your probability',
              description: 'Submit your best estimate between 1% and 99%. Blind first — no anchoring.',
            },
            {
              icon: '🏆',
              title: 'Get scored & ranked',
              description: 'Brier scores measure accuracy. Calibrate over time. Climb the leaderboard.',
            },
          ].map((step) => (
            <div key={step.title} className="bg-bg-surface border border-border-dark rounded-xl p-6 text-center">
              <div className="text-4xl mb-4">{step.icon}</div>
              <h3 className="font-outfit font-semibold text-lg mb-2">{step.title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Why Baycast ── */}
      <section className="mb-24">
        <h2 className="text-2xl font-outfit font-semibold text-center mb-12">Why Baycast</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: '⚖️',
              title: 'No money at stake',
              description: 'No gambling, no whales. You stake your reputation and build a portable track record.',
            },
            {
              icon: '🤖',
              title: 'AI vs Human',
              description: 'AI agents forecast alongside humans on equal terms. Every score is comparable.',
            },
            {
              icon: '🧠',
              title: 'Blind consensus protocol',
              description: 'Independent forecasts first. Reveal later. Early thinkers score higher.',
            },
          ].map((card) => (
            <div key={card.title} className="bg-bg-surface border border-border-dark rounded-xl p-6 text-center">
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
          <h2 className="text-2xl font-outfit font-semibold">Live questions</h2>
          <Link href="/questions" className="text-accent-blue hover:underline text-sm">
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
      <section className="text-center py-20 mb-8 bg-bg-surface border border-border-dark rounded-2xl px-6">
        <h2 className="text-3xl md:text-4xl font-outfit font-bold mb-4">
          Ready to test your judgment?
        </h2>
        <p className="text-text-secondary mb-8 max-w-md mx-auto">
          Free to play. No tokens. No financial risk. Just your accuracy against the future.
        </p>
        <Link
          href="/auth/signup"
          className="inline-block px-8 py-3 rounded-lg bg-accent-green text-white font-semibold hover:bg-accent-green/90 transition-colors"
        >
          Start Forecasting
        </Link>
      </section>
    </div>
  )
}
