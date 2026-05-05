import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import ProfileAuthGuard from './ProfileAuthGuard'

export const dynamic = 'force-dynamic'

/**
 * /profile catch-all page.
 * - Authenticated users are redirected to their own profile (/profile/[username]).
 * - Unauthenticated users are redirected to /auth/login.
 *
 * Server-side redirect is the primary mechanism. A client-side auth guard
 * is rendered as a fallback in case the server redirect fails (e.g. edge
 * caching, static prerender without cookies, or client-side navigation).
 */
export default async function ProfilePage() {
  let isAuthenticated = false

  try {
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
  } catch (error) {
    // If the error is a redirect (NEXT_REDIRECT), re-throw it
    if (error && typeof error === 'object' && 'digest' in error &&
        typeof (error as { digest: string }).digest === 'string' &&
        (error as { digest: string }).digest.startsWith('NEXT_REDIRECT')) {
      throw error
    }
    // For any other error (e.g. Supabase init failure), fall through
    // to client-side auth guard
    console.error('[ProfilePage] Server auth check failed:', error)
  }

  // Fallback: render a client-side auth guard that will redirect
  return <ProfileAuthGuard />
}
