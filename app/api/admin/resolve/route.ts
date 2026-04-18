import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  const supabase = createClient()

  // Verify admin
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('id', user.id)
    .single()

  if (!profile?.is_admin) {
    return NextResponse.json({ error: 'Not authorized' }, { status: 403 })
  }

  const body = await request.json()
  const { questionId, outcome } = body as { questionId: string; outcome: 'yes' | 'no' }

  if (!questionId || !outcome) {
    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 })
  }

  // Update question status
  const resolution = { outcome, value: outcome === 'yes' ? 1 : 0 }
  const { error: updateError } = await supabase
    .from('questions')
    .update({
      status: 'resolved',
      resolution,
      resolved_at: new Date().toISOString(),
    })
    .eq('id', questionId)

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 })
  }

  // Calculate and insert Brier scores for all forecasters
  const { data: forecasts } = await supabase
    .from('forecasts')
    .select('user_id, prediction')
    .eq('question_id', questionId)

  if (forecasts && forecasts.length > 0) {
    const outcomeValue = outcome === 'yes' ? 1 : 0
    const scores = forecasts.map((f) => {
      const p = ((f.prediction as Record<string, unknown>)?.probability as number ?? 50) / 100
      const brier = Math.pow(p - outcomeValue, 2)
      return {
        question_id: questionId,
        user_id: f.user_id,
        brier_score: brier,
      }
    })

    const { error: scoreError } = await supabase
      .from('scores')
      .upsert(scores, { onConflict: 'question_id,user_id' })

    if (scoreError) {
      return NextResponse.json({ error: `Question resolved but score error: ${scoreError.message}` }, { status: 207 })
    }
  }

  const scored = forecasts?.length ?? 0

  // Write to audit log — non-blocking, failure does not affect the response
  await supabase.from('admin_audit_log').insert({
    action: 'resolve_question',
    admin_id: user.id,
    question_id: questionId,
    details: { outcome, scored },
  })

  return NextResponse.json({ ok: true, scored })
}
