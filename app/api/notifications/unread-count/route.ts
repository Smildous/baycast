import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

/**
 * GET /api/notifications/unread-count
 *
 * Lightweight endpoint returning only the unread notification count.
 * Used by the NotificationBell badge — called on mount and every 60s.
 *
 * Response:
 *   { count: number }
 *
 * Security: RLS ensures users only see their own notifications.
 */
export async function GET() {
  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const { count, error } = await supabase
    .from('notifications')
    .select('*', { count: 'exact', head: true })
    .eq('read', false)

  if (error) {
    console.error('[api/notifications/unread-count] Failed:', error.message)
    return NextResponse.json({ count: 0 })
  }

  return NextResponse.json({ count: count ?? 0 })
}
