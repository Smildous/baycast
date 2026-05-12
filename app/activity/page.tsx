import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import Image from 'next/image'
import EmptyState from '@/components/EmptyState'
import { buildSEO } from '@/lib/seo'

export const dynamic = 'force-dynamic'

export const metadata = buildSEO({
  title: 'Recent Forecasting Activity',
  description: 'See the latest forecasts made by the Baycast community in real time.',
  path: '/activity',
})

interface ActivityRow {
  id: string
  created_at: string
  prediction: { probability: number }
  user_id: string
  question_id: string
  profiles: { display_name: string; avatar_url: string | null } | null
  questions: { id: string; title: string; status: string } | null
}

function timeAgo(dateStr: string): string {
  const now = Date.now()
  const then = new Date(dateStr).getTime()
  const seconds = Math.floor((now - then) / 1000)
  if (seconds < 60) return 'just now'
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 30) return `${days}d ago`
  const months = Math.floor(days / 30)
  return `${months}mo ago`
}

export default async function ActivityPage() {
  const supabase = createClient()

  const { data: forecasts, error } = await supabase
    .from('forecasts')
    .select(`
      id,
      created_at,
      prediction,
      user_id,
      question_id,
      profiles:profiles!forecasts_user_id_fkey ( display_name, avatar_url ),
      questions:questions!forecasts_question_id_fkey ( id, title, status )
    `)
    .order('created_at', { ascending: false })
    .limit(50)

  const items = (forecasts ?? []) as unknown as ActivityRow[]

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-outfit font-bold mb-2">Activity Feed</h1>
        <p className="text-text-secondary">
          Real-time forecasting activity across Baycast. See what the community is predicting.
        </p>
      </div>

      {error && (
        <div className="mb-6 p-3 rounded-lg bg-danger/10 border border-danger/30 text-danger text-sm">
          Failed to load activity. Please try again later.
        </div>
      )}

      {items.length === 0 && !error ? (
        <div className="bg-bg-surface border border-border-dark rounded-xl">
          <EmptyState
            icon="🔮"
            title="No forecasts yet — be the first!"
            description="The community hasn't made any predictions yet. Browse open questions and cast the first forecast."
            cta={{ label: 'Browse Questions', href: '/questions' }}
          />
        </div>
      ) : (
        <div className="space-y-1">
          {items.map((item) => {
            const displayName = item.profiles?.display_name ?? 'Anonymous'
            const probability = Math.round(item.prediction.probability * 100)
            const questionTitle = item.questions?.title ?? 'Unknown Question'
            const questionHref = item.questions ? `/questions/${item.questions.id}` : '#'

            return (
              <Link
                key={item.id}
                href={questionHref}
                className="flex items-start gap-4 px-4 py-4 rounded-xl hover:bg-white/[0.02] transition-colors group"
              >
                {/* Avatar */}
                <div className="shrink-0 mt-0.5">
                  {item.profiles?.avatar_url ? (
                    <Image
                      src={item.profiles.avatar_url}
                      alt={displayName}
                      width={36}
                      height={36}
                      className="rounded-full"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-border-dark flex items-center justify-center text-sm font-semibold text-accent-green">
                      {displayName[0]?.toUpperCase() ?? '?'}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm leading-relaxed">
                    <span className="font-semibold text-text-primary group-hover:text-accent-blue transition-colors">
                      {displayName}
                    </span>
                    <span className="text-text-secondary"> forecasted </span>
                    <span className="font-mono font-bold text-accent-green">{probability}%</span>
                    <span className="text-text-secondary"> on </span>
                    <span className="font-medium text-text-primary group-hover:text-accent-blue transition-colors">
                      {questionTitle}
                    </span>
                  </p>
                  <p className="text-xs text-text-secondary mt-1">
                    {timeAgo(item.created_at)}
                  </p>
                </div>

                {/* Probability badge */}
                <div className="shrink-0 self-center">
                  <span className={`inline-flex items-center justify-center w-12 h-12 rounded-xl text-sm font-bold font-mono ${
                    probability >= 50
                      ? 'bg-accent-green/10 text-accent-green'
                      : 'bg-red-500/10 text-red-400'
                  }`}>
                    {probability}%
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      )}

      {items.length > 0 && (
        <p className="text-center text-text-secondary text-sm mt-8">
          Showing {items.length} most recent forecasts
        </p>
      )}
    </div>
  )
}
