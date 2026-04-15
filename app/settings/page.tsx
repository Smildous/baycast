import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import SettingsForm from '@/components/SettingsForm'

export default async function SettingsPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/auth/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-outfit font-bold mb-2">Settings</h1>
      <p className="text-text-secondary mb-8">Manage your profile and preferences.</p>
      <SettingsForm profile={profile} userEmail={user.email ?? ''} />
    </div>
  )
}
