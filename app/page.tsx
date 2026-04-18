import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import QuestionCard from '@/components/QuestionCard'
import type { Question } from '@/lib/types'
import { autoCloseExpiredQuestions } from '@/lib/utils'

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
  return (data ?? []) as Question[]
}

export default async function HomePage() {
  const [stats, trending] = await Promise.all([getStats(), getTrending()])

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Hero */}
      <section className="text-center py-16 space-y-6">
        <div className="inline-block px-3 py-1 rounded-full border border-border-dark text-text-secondary text-sm mb-2">
          Beta — Early access
        </div>
        <h1 className="text-5xl md:text-6xl font-outfit font-bold leading-tight">
          What will happen next?{' '}
          <span className="bg-gradient-to-r from-accent-green to-accent-blue bg-clip-text text-transparent">
            Together, we find out.
          </span>
        </h1>
        <p className="text-text-secondary text-xl max-w-2xl mx-auto">
          When many people each think carefully about the same question, their pooled estimates tend to beat any single expert. Baycast puts that principle to work — submit your forecasts, track your calibration, and contribute to a live picture of collective expectations.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            href="/questions"
            className="px-8 py-3 rounded-lg bg-accent-green text-white font-semibold hover:bg-accent-green/90 transition-colors"
          >
            See open questions
          </Link>
          <Link
            href="/auth/signup"
            className="px-8 py-3 rounded-lg border border-border-dark text-text-primary hover:border-accent-green/50 transition-colors"
          >
            Join for free
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
        {[
          { label: 'Active questions', value: stats.questions },
          { label: 'Forecasters', value: stats.users },
          { label: 'Predictions made', value: stats.forecasts },
        ].map((s) => (
          <div key={s.label} className="bg-bg-surface border border-border-dark rounded-xl p-6 text-center">
            <div className="text-4xl font-mono font-bold text-accent-green mb-1">
              {s.value.toLocaleString('en-US')}
            </div>
            <div className="text-text-secondary">{s.label}</div>
          </div>
        ))}
      </section>

      {/* How it works */}
      <section className="mb-16">
        <h2 className="text-2xl font-outfit font-semibold text-center mb-8">How it works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              step: '01',
              title: 'Browse questions',
              description:
                'Open questions on politics, technology, science and more — each with a defined resolution date and clear criteria.',
            },
            {
              step: '02',
              title: 'Submit your forecast',
              description:
                'Assign a probability from 1% to 99%. No hedging: you\'re committing to a number. The aggregate of all forecasts forms the collective estimate.',
            },
            {
              step: '03',
              title: 'Track your accuracy',
              description:
                'When a question resolves, your Brier score updates. Lower is better. Over time, you\'ll see how well your judgment is calibrated against reality.',
            },
          ].map(({ step, title, description }) => (
            <div key={step} className="bg-bg-surface border border-border-dark rounded-xl p-6">
              <div className="text-3xl font-mono font-bold text-accent-green/40 mb-3">{step}</div>
              <h3 className="font-outfit font-semibold text-lg mb-2">{title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trending questions */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-outfit font-semibold">Questions everyone is watching</h2>
          <Link href="/questions" className="text-accent-blue hover:underline text-sm">
            View all →
          </Link>
        </div>
        {trending.length === 0 ? (
          <div className="text-center py-12 text-text-secondary border border-border-dark rounded-xl">
            No open questions at the moment.
          </div>
        ) : (
          <div className="space-y-3">
            {trending.map((q) => (
              <QuestionCard key={q.id} question={q} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
