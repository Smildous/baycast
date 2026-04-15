import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import QuestionCard from '@/components/QuestionCard'
import type { Question } from '@/lib/types'

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
          Beta — Rejoins les premiers forecasters
        </div>
        <h1 className="text-5xl md:text-6xl font-outfit font-bold leading-tight">
          Prédis le futur.{' '}
          <span className="bg-gradient-to-r from-accent-green to-accent-blue bg-clip-text text-transparent">
            Mesure ta précision.
          </span>
        </h1>
        <p className="text-text-secondary text-xl max-w-2xl mx-auto">
          Baycast est une plateforme de prediction polling. Soumets tes probabilités sur des questions ouvertes, suis tes scores Brier, et grimpe au classement.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            href="/questions"
            className="px-8 py-3 rounded-lg bg-accent-green text-white font-semibold hover:bg-accent-green/90 transition-colors"
          >
            Voir les questions
          </Link>
          <Link
            href="/auth/signup"
            className="px-8 py-3 rounded-lg border border-border-dark text-text-primary hover:border-accent-green/50 transition-colors"
          >
            Créer un compte
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
        {[
          { label: 'Questions ouvertes', value: stats.questions, suffix: '' },
          { label: 'Forecasters inscrits', value: stats.users, suffix: '' },
          { label: 'Prédictions soumises', value: stats.forecasts, suffix: '' },
        ].map((s) => (
          <div key={s.label} className="bg-bg-surface border border-border-dark rounded-xl p-6 text-center">
            <div className="text-4xl font-mono font-bold text-accent-green mb-1">
              {s.value.toLocaleString('fr-FR')}{s.suffix}
            </div>
            <div className="text-text-secondary">{s.label}</div>
          </div>
        ))}
      </section>

      {/* Trending questions */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-outfit font-semibold">Questions tendance</h2>
          <Link href="/questions" className="text-accent-blue hover:underline text-sm">
            Voir tout →
          </Link>
        </div>
        {trending.length === 0 ? (
          <div className="text-center py-12 text-text-secondary border border-border-dark rounded-xl">
            Aucune question ouverte pour le moment.
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
