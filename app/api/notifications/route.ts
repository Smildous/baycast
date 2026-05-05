import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import type { Notification } from '@/lib/types'

/**
 * GET /api/notifications
 *
 * Returns notifications for the authenticated user.
 * Query params:
 *   unread_only (boolean) — filter to unread only (default: false)
 *   limit (number)        — max notifications to return (default: 50)
 *   offset (number)       — pagination offset (default: 0)
 *
 * Response:
 *   { notifications: Notification[], unread_count: number }
 *
 * Security: RLS ensures users only see their own notifications.
 */
export async function GET(request: Request) {
  const supabase = createClient()

  // Authenticate
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  // Parse query params
  const { searchParams } = new URL(request.url)
  const unreadOnly = searchParams.get('unread_only') === 'true'
  const limit = Math.min(Math.max(Number(searchParams.get('limit') ?? '50'), 1), 100)
  const offset = Math.max(Number(searchParams.get('offset') ?? '0'), 0)

  // Build query — RLS filters to user's own notifications
  let query = supabase
    .from('notifications')
    .select('*')
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (unreadOnly) {
    query = query.eq('read', false)
  }

  const { data: notifications, error } = await query

  if (error) {
    console.error('[api/notifications] Fetch failed:', error.message)
    return NextResponse.json({ error: 'Failed to fetch notifications' }, { status: 500 })
  }

  // Get unread count (always, for the bell badge)
  const { count: unreadCount, error: countError } = await supabase
    .from('notifications')
    .select('*', { count: 'exact', head: true })
    .eq('read', false)

  if (countError) {
    console.error('[api/notifications] Unread count failed:', countError.message)
    // Return notifications even if count fails
    return NextResponse.json({
      notifications: (notifications ?? []) as Notification[],
      unread_count: 0,
    })
  }

  return NextResponse.json({
    notifications: (notifications ?? []) as Notification[],
    unread_count: unreadCount ?? 0,
  })
}
