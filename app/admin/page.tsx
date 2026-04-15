import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import type { Question } from '@/lib/types'

export default async function AdminPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('id', user.id)
    .single()

  if (!profile?.is_admin) redirect('/')

  const { data: questions } = await supabase
    .from('questions')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(20)

  const qs = (questions ?? []) as Question[]

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

      <div className="bg-bg-surface border border-border-dark rounded-xl overflow-hidden">
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
                  <span className="font-medium line-clamp-1">{q.title}</span>
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
          </tbody>
        </table>
      </div>
    </div>
  )
}
