import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

/**
 * /profile catch-all page.
 * - Authenticated users are redirected to their own profile (/profile/[username]).
 * - Unauthenticated users are redirected to /auth/login.
 */
export default async function ProfilePage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  // Look up the user's display_name to build the profile URL
  const { data: profile } = await supabase
    .from('profiles')
    .select('display_name')
    .eq('id', user.id)
    .single()

  const username = profile?.display_name ?? user.id
  redirect(`/profile/${username}`)
}
