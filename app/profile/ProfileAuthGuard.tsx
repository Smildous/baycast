'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { ProfilePageSkeleton } from '@/components/LoadingSkeleton'

/**
 * Client-side auth guard for /profile.
 * Used as a fallback when the server-side redirect fails.
 * Checks auth status and redirects to /auth/login if not authenticated,
 * or to /profile/[username] if authenticated.
 */
export default function ProfileAuthGuard() {
  const router = useRouter()

  useEffect(() => {
    async function checkAuth() {
      try {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
          router.replace('/auth/login')
          return
        }

        // Look up display_name for the profile redirect
        const { data: profile } = await supabase
          .from('profiles')
          .select('display_name')
          .eq('id', user.id)
          .single()

        const username = profile?.display_name ?? user.id
        router.replace(`/profile/${username}`)
      } catch {
        // If anything goes wrong, redirect to login
        router.replace('/auth/login')
      }
    }

    checkAuth()
  }, [router])

  // Show loading skeleton while checking auth — never render empty content
  return <ProfilePageSkeleton />
}
