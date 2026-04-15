'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'
import Image from 'next/image'

export default function Nav() {
  const pathname = usePathname()
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const [displayName, setDisplayName] = useState<string>('')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
      if (user) {
        supabase
          .from('profiles')
          .select('display_name, avatar_url')
          .eq('id', user.id)
          .single()
          .then(({ data }) => {
            setDisplayName(data?.display_name ?? '')
            setAvatarUrl(data?.avatar_url ?? null)
          })
      }
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/questions', label: 'Questions' },
    { href: '/leaderboard', label: 'Leaderboard' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border-dark bg-bg-primary/90 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-outfit font-extrabold bg-gradient-to-r from-accent-green to-accent-blue bg-clip-text text-transparent tracking-tight">
            BAYCAST
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === href
                  ? 'text-text-primary bg-white/5'
                  : 'text-text-secondary hover:text-text-primary hover:bg-white/5'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border-dark hover:border-accent-green/40 transition-colors"
              >
                {avatarUrl ? (
                  <Image src={avatarUrl} alt={displayName} width={28} height={28} className="rounded-full" />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-border-dark flex items-center justify-center text-sm font-semibold text-accent-green">
                    {displayName[0]?.toUpperCase() ?? '?'}
                  </div>
                )}
                <span className="text-sm text-text-primary hidden sm:block">{displayName}</span>
              </button>

              {menuOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-bg-surface border border-border-dark rounded-xl shadow-xl py-1">
                  <Link
                    href={`/profile/${displayName}`}
                    className="block px-4 py-2 text-sm text-text-primary hover:bg-white/5"
                    onClick={() => setMenuOpen(false)}
                  >
                    Mon profil
                  </Link>
                  <Link
                    href="/settings"
                    className="block px-4 py-2 text-sm text-text-primary hover:bg-white/5"
                    onClick={() => setMenuOpen(false)}
                  >
                    Paramètres
                  </Link>
                  <div className="border-t border-border-dark my-1" />
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-4 py-2 text-sm text-danger hover:bg-white/5"
                  >
                    Se déconnecter
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/auth/signup"
              className="px-4 py-2 rounded-lg bg-accent-green text-white text-sm font-semibold hover:bg-accent-green/90 transition-colors"
            >
              Get Started
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}
