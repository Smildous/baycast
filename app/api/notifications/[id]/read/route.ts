import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

/**
 * PATCH /api/notifications/[id]/read
 *
 * Mark a single notification as read (or unread).
 *
 * Body:
 *   { read: boolean }  (default: true)
 *
 * Response:
 *   { success: true }
 *
 * Security: RLS ensures users can only update their own notifications.
 */
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = createClient()

  // Authenticate
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const { id } = await params

  // Parse body
  let read = true
  try {
    const body = await request.json()
    if (typeof body.read === 'boolean') {
      read = body.read
    }
  } catch {
    // Default to true if no body
  }

  const { error } = await supabase
    .from('notifications')
    .update({ read })
    .eq('id', id)

  if (error) {
    console.error('[api/notifications/[id]/read] Update failed:', error.message)
    return NextResponse.json({ error: 'Failed to update notification' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
