import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

function getSafeRedirectPath(next: string | null): string {
  if (!next) return '/'
  // Accept only relative paths: must start with / but not // (protocol-relative)
  // and not /\ (backslash bypass). Both techniques are used to redirect to external hosts.
  if (next.startsWith('/') && !next.startsWith('//') && !next.startsWith('/\\')) {
    return next
  }
  return '/'
}

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = getSafeRedirectPath(searchParams.get('next'))

  if (code) {
    const supabase = createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  return NextResponse.redirect(`${origin}/auth/login?error=auth_callback_failed`)
}
