import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import Image from 'next/image'
import type { Profile, Forecast, Score } from '@/lib/types'

interface Props {
  params: { username: string }
}

export default async function ProfilePage({ params }: Props) {
  const supabase = createClient()

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('display_name', params.username)
    .single()

  if (!profile) notFound()

  const p = profile as Profile

  const [{ data: scores }, { data: forecasts }] = await Promise.all([
    supabase.from('scores').select('*').eq('user_id', p.id),
    supabase
      .from('forecasts')
      .select('*, questions(title, status, category)')
      .eq('user_id', p.id)
      .order('updated_at', { ascending: false })
      .limit(10),
  ])

  const scoreList = (scores ?? []) as Score[]
  const avgBrier =
    scoreList.length > 0
      ? scoreList.reduce((s, sc) => s + sc.brier_score, 0) / scoreList.length
      : null

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {/* Profile header */}
      <div className="bg-bg-surface border border-border-dark rounded-xl p-6 mb-8 flex gap-6 items-start">
        {p.avatar_url ? (
          <Image
            src={p.avatar_url}
            alt={p.display_name}
            width={80}
            height={80}
            className="rounded-full"
          />
        ) : (
          <div className="w-20 h-20 rounded-full bg-border-dark flex items-center justify-center text-3xl font-semibold text-accent-green">
            {p.display_name[0]?.toUpperCase()}
          </div>
        )}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-outfit font-bold">{p.display_name}</h1>
            {p.is_admin && (
              <span className="px-2 py-0.5 rounded text-xs bg-accent-blue/20 text-accent-blue border border-accent-blue/30">
                Admin
              </span>
            )}
          </div>
          {p.bio && <p className="text-text-secondary">{p.bio}</p>}
          <div className="flex gap-6 mt-4">
            <div>
              <div className="text-xl font-mono font-bold text-accent-green">
                {avgBrier !== null ? avgBrier.toFixed(4) : '—'}
              </div>
              <div className="text-text-secondary text-sm">Score Brier moyen</div>
            </div>
            <div>
              <div className="text-xl font-mono font-bold text-text-primary">
                {forecasts?.length ?? 0}
              </div>
              <div className="text-text-secondary text-sm">Prédictions récentes</div>
            </div>
            <div>
              <div className="text-xl font-mono font-bold text-text-primary">
                {scoreList.length}
              </div>
              <div className="text-text-secondary text-sm">Questions résolues</div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent forecasts */}
      <h2 className="text-xl font-outfit font-semibold mb-4">Prédictions récentes</h2>
      <div className="space-y-2">
        {forecasts?.length === 0 ? (
          <div className="text-center py-8 text-text-secondary border border-border-dark rounded-xl">
            Aucune prédiction pour l&apos;instant.
          </div>
        ) : (
          forecasts?.map((f: any) => (
            <Link
              key={f.id}
              href={`/questions/${f.question_id}`}
              className="block bg-bg-surface border border-border-dark rounded-lg p-4 hover:border-accent-blue/40 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-text-secondary mb-1">{f.questions?.category}</div>
                  <div className="font-medium truncate">{f.questions?.title}</div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-xl font-mono font-bold text-accent-green">
                    {f.prediction?.probability ?? '—'}%
                  </div>
                  <div className="text-xs text-text-secondary capitalize">{f.questions?.status}</div>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}
