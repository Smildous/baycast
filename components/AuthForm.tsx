'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

interface Props {
  mode: 'login' | 'signup'
}

export default function AuthForm({ mode }: Props) {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [info, setInfo] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setInfo(null)

    const supabase = createClient()

    if (mode === 'signup') {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { display_name: displayName },
          emailRedirectTo: `${location.origin}/auth/callback`,
        },
      })
      if (error) {
        setError(error.message)
      } else {
        setInfo('Check your email to confirm your account.')
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) {
        setError(error.message)
      } else {
        router.push('/')
        router.refresh()
      }
    }
    setLoading(false)
  }

  async function handleGoogle() {
    const supabase = createClient()
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${location.origin}/auth/callback` },
    })
  }

  return (
    <div className="bg-bg-surface border border-border-dark rounded-xl p-6 space-y-4">
      {/* Google OAuth */}
      <button
        type="button"
        onClick={handleGoogle}
        className="w-full py-3 rounded-lg border border-border-dark text-text-primary hover:border-accent-blue/50 hover:bg-white/5 transition-colors flex items-center justify-center gap-3"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
          <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z" fill="#34A853"/>
          <path d="M3.964 10.71c-.18-.54-.282-1.117-.282-1.71s.102-1.17.282-1.71V4.958H.957C.347 6.173 0 7.548 0 9s.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
          <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
        </svg>
        Continue with Google
      </button>

      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-border-dark" />
        <span className="text-text-secondary text-sm">or</span>
        <div className="flex-1 h-px bg-border-dark" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === 'signup' && (
          <div>
            <label className="block text-sm text-text-secondary mb-1.5">Username</label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              required
              minLength={3}
              maxLength={30}
              placeholder="YourName"
              className="w-full px-4 py-2.5 rounded-lg bg-bg-primary border border-border-dark text-text-primary placeholder-text-secondary focus:outline-none focus:border-accent-green transition-colors"
            />
          </div>
        )}

        <div>
          <label className="block text-sm text-text-secondary mb-1.5">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="you@example.com"
            className="w-full px-4 py-2.5 rounded-lg bg-bg-primary border border-border-dark text-text-primary placeholder-text-secondary focus:outline-none focus:border-accent-green transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm text-text-secondary mb-1.5">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            placeholder="••••••••"
            className="w-full px-4 py-2.5 rounded-lg bg-bg-primary border border-border-dark text-text-primary placeholder-text-secondary focus:outline-none focus:border-accent-green transition-colors"
          />
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-danger/10 border border-danger/30 text-danger text-sm">
            {error}
          </div>
        )}
        {info && (
          <div className="p-3 rounded-lg bg-success/10 border border-success/30 text-success text-sm">
            {info}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-lg bg-accent-green text-white font-semibold hover:bg-accent-green/90 disabled:opacity-50 transition-colors"
        >
          {loading ? 'Loading...' : mode === 'login' ? 'Log in' : 'Create my account'}
        </button>
      </form>
    </div>
  )
}
