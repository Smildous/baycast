import { redirect, notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import QuestionForm from '@/components/QuestionForm'
import ResolveForm from '@/components/ResolveForm'
import type { Question } from '@/lib/types'

interface Props {
  params: { id: string }
}

export default async function EditQuestionPage({ params }: Props) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('id', user.id)
    .single()

  if (!profile?.is_admin) redirect('/')

  const { data: question } = await supabase
    .from('questions')
    .select('*')
    .eq('id', params.id)
    .single()

  if (!question) notFound()

  const q = question as Question

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 space-y-10">
      <div>
        <h1 className="text-3xl font-outfit font-bold mb-2">Edit question</h1>
        <p className="text-text-secondary line-clamp-2">{q.title}</p>
      </div>

      <QuestionForm mode="edit" question={q} />

      {q.status !== 'resolved' && (
        <div className="border-t border-border-dark pt-8">
          <h2 className="text-xl font-outfit font-semibold mb-4">Resolve question</h2>
          <ResolveForm questionId={q.id} />
        </div>
      )}
    </div>
  )
}
