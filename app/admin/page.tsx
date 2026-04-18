import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import type { Question } from '@/lib/types'
import { formatDate } from '@/lib/utils'

const PAGE_SIZE = 20

interface Props {
  searchParams: { page?: string }
}

interface AuditEntry {
  id: string
  action: string
  details: { outcome?: string; scored?: number } | null
  created_at: string
  profiles: { display_name: string } | null
  questions: { title: string } | null
}

export default async function AdminPage({ searchParams }: Props) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('id', user.id)
    .single()

  if (!profile?.is_admin) redirect('/')

  const page = Math.max(1, Number(searchParams.page ?? '1'))
  const offset = (page - 1) * PAGE_SIZE

  const [{ data: questions, count }, { data: auditRaw }] = await Promise.all([
    supabase
      .from('questions')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + PAGE_SIZE - 1),
    supabase
      .from('admin_audit_log')
      .select('*, profiles(display_name), questions(title)')
      .order('created_at', { ascending: false })
      .limit(20),
  ])

  const qs = (questions ?? []) as Question[]
  const auditLog = (auditRaw ?? []) as AuditEntry[]
  const totalPages = Math.ceil((count ?? 0) / PAGE_SIZE)

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-outfit font-bold mb-1">Admin</h1>
          <p className="text-text-secondary">Manage questions and the platform.</p>
        </div>
        <Link
          href="/admin/questions/new"
          className="px-5 py-2.5 rounded-lg bg-accent-green text-white font-semibold hover:bg-accent-green/90 transition-colors"
        >
          + New question
        </Link>
      </div>

      {/* Questions table */}
      <div className="bg-bg-surface border border-border-dark rounded-xl overflow-hidden mb-4">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border-dark text-text-secondary text-sm">
              <th className="text-left px-4 py-3">Question</th>
              <th className="text-left px-4 py-3 hidden sm:table-cell">Category</th>
              <th className="text-left px-4 py-3 hidden md:table-cell">Status</th>
              <th className="text-left px-4 py-3 hidden md:table-cell">Closes</th>
              <th className="text-right px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {qs.map((q) => (
              <tr key={q.id} className="border-b border-border-dark/50 hover:bg-white/[0.02]">
                <td className="px-4 py-3">
                  <span className="font-medium line-clamp-2">{q.title}</span>
                  {/* Inline metadata visible on mobile only */}
                  <div className="flex items-center gap-2 mt-1 sm:hidden">
                    <span className="text-text-secondary text-xs">{q.category}</span>
                    <span className="text-text-secondary text-xs">·</span>
                    <span className={`px-1.5 py-0.5 rounded text-xs border ${
                      q.status === 'open'
                        ? 'bg-success/10 text-success border-success/30'
                        : q.status === 'resolved'
                        ? 'bg-accent-blue/10 text-accent-blue border-accent-blue/30'
                        : 'bg-border-dark text-text-secondary border-border-dark'
                    }`}>
                      {q.status}
                    </span>
                    <span className="text-text-secondary text-xs">
                      · {new Date(q.closes_at).toLocaleDateString('en-US')}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 text-text-secondary text-sm hidden sm:table-cell">
                  {q.category}
                </td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <span className={`px-2 py-0.5 rounded text-xs border ${
                    q.status === 'open'
                      ? 'bg-success/10 text-success border-success/30'
                      : q.status === 'resolved'
                      ? 'bg-accent-blue/10 text-accent-blue border-accent-blue/30'
                      : 'bg-border-dark text-text-secondary border-border-dark'
                  }`}>
                    {q.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-text-secondary text-sm hidden md:table-cell">
                  {new Date(q.closes_at).toLocaleDateString('en-US')}
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/admin/questions/${q.id}`}
                    className="text-accent-blue hover:underline text-sm"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
            {qs.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-10 text-text-secondary">
                  No questions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mb-12">
          <span className="text-text-secondary text-sm">
            Page {page} of {totalPages} · {count} questions total
          </span>
          <div className="flex gap-2">
            {page > 1 && (
              <Link
                href={`/admin?page=${page - 1}`}
                className="px-4 py-2 rounded-lg border border-border-dark text-text-secondary hover:text-text-primary hover:border-accent-green/40 text-sm transition-colors"
              >
                ← Previous
              </Link>
            )}
            {page < totalPages && (
              <Link
                href={`/admin?page=${page + 1}`}
                className="px-4 py-2 rounded-lg border border-border-dark text-text-secondary hover:text-text-primary hover:border-accent-green/40 text-sm transition-colors"
              >
                Next →
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Audit log */}
      <div className="mt-12">
        <h2 className="text-xl font-outfit font-semibold mb-4">Resolution audit log</h2>
        {auditLog.length === 0 ? (
          <div className="text-center py-8 text-text-secondary border border-border-dark rounded-xl text-sm">
            No actions logged yet. Resolutions will appear here.
          </div>
        ) : (
          <div className="bg-bg-surface border border-border-dark rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border-dark text-text-secondary text-sm">
                  <th className="text-left px-4 py-3">Question</th>
                  <th className="text-left px-4 py-3 hidden sm:table-cell">Outcome</th>
                  <th className="text-left px-4 py-3 hidden sm:table-cell">Scored</th>
                  <th className="text-left px-4 py-3 hidden md:table-cell">By</th>
                  <th className="text-right px-4 py-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {auditLog.map((entry) => (
                  <tr key={entry.id} className="border-b border-border-dark/50 text-sm">
                    <td className="px-4 py-3">
                      <span className="line-clamp-1 text-text-primary">
                        {entry.questions?.title ?? <span className="text-text-secondary italic">Deleted question</span>}
                      </span>
                      {/* Mobile inline details */}
                      <div className="flex items-center gap-2 mt-0.5 sm:hidden text-xs text-text-secondary">
                        {entry.details?.outcome && (
                          <span className={entry.details.outcome === 'yes' ? 'text-success' : 'text-danger'}>
                            {entry.details.outcome.toUpperCase()}
                          </span>
                        )}
                        {entry.details?.scored !== undefined && (
                          <span>· {entry.details.scored} scored</span>
                        )}
                        {entry.profiles?.display_name && (
                          <span>· {entry.profiles.display_name}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      {entry.details?.outcome && (
                        <span className={`px-2 py-0.5 rounded text-xs border font-semibold ${
                          entry.details.outcome === 'yes'
                            ? 'bg-success/10 text-success border-success/30'
                            : 'bg-danger/10 text-danger border-danger/30'
                        }`}>
                          {entry.details.outcome.toUpperCase()}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-text-secondary hidden sm:table-cell font-mono">
                      {entry.details?.scored ?? '—'}
                    </td>
                    <td className="px-4 py-3 text-text-secondary hidden md:table-cell">
                      {entry.profiles?.display_name ?? '—'}
                    </td>
                    <td className="px-4 py-3 text-right text-text-secondary">
                      {formatDate(entry.created_at)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
