import { createClient } from '@/lib/supabase/server'
import NavClient from './NavClient'

// Server Component: fetches user + profile at SSR time.
// No client-side useEffect, no profile fetch on every navigation.
export default async function Nav() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  let profile: { display_name: string; avatar_url: string | null } | null = null
  if (user) {
    const { data } = await supabase
      .from('profiles')
      .select('display_name, avatar_url')
      .eq('id', user.id)
      .single()
    profile = data
  }

  return <NavClient user={user} profile={profile} />
}
