import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import QuestionForm from '@/components/QuestionForm'

export default async function NewQuestionPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('id', user.id)
    .single()

  if (!profile?.is_admin) redirect('/')

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-outfit font-bold mb-2">New question</h1>
      <p className="text-text-secondary mb-8">Create a prediction question for the platform.</p>
      <QuestionForm mode="create" />
    </div>
  )
}
