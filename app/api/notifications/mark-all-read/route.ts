import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

/**
 * POST /api/notifications/mark-all-read
 *
 * Mark all unread notifications as read for the authenticated user.
 *
 * Response:
 *   { success: true, marked_count: number }
 *
 * Security: RLS ensures users can only update their own notifications.
 */
export async function POST() {
  const supabase = createClient()

  // Authenticate
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  // First count how many will be marked
  const { count, error: countError } = await supabase
    .from('notifications')
    .select('*', { count: 'exact', head: true })
    .eq('read', false)

  if (countError) {
    console.error('[api/notifications/mark-all-read] Count failed:', countError.message)
    return NextResponse.json({ error: 'Failed to count notifications' }, { status: 500 })
  }

  const markedCount = count ?? 0

  // Update all unread notifications
  const { error } = await supabase
    .from('notifications')
    .update({ read: true })
    .eq('read', false)

  if (error) {
    console.error('[api/notifications/mark-all-read] Update failed:', error.message)
    return NextResponse.json({ error: 'Failed to mark notifications as read' }, { status: 500 })
  }

  return NextResponse.json({ success: true, marked_count: markedCount })
}
