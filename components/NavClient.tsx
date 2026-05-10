'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'
import Image from 'next/image'
import NotificationBell from './NotificationBell'

interface NavProfile {
  display_name: string
  avatar_url: string | null
}

interface Props {
  user: User | null
  profile: NavProfile | null
}

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/questions', label: 'Questions' },
  { href: '/blocks', label: 'Blocks' },
  { href: '/leaderboard', label: 'Leaderboard' },
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/compare', label: 'Compare' },
]

export default function NavClient({ user, profile }: Props) {
  const pathname = usePathname()
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false)

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileDrawerOpen(false)
  }, [pathname])

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (mobileDrawerOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileDrawerOpen])

  const closeMobileDrawer = useCallback(() => setMobileDrawerOpen(false), [])

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    setMenuOpen(false)
    setMobileDrawerOpen(false)
    router.push('/')
    router.refresh()
  }

  const displayName = profile?.display_name ?? ''
  const avatarUrl = profile?.avatar_url ?? null

  const mobileLinks = [
    ...NAV_LINKS,
    ...(user
      ? [
          { href: `/profile/${displayName}`, label: 'Profile' },
          { href: '/settings', label: 'Settings' },
        ]
      : []),
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border-dark bg-bg-primary/90 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2" onClick={closeMobileDrawer}>
          <span className="text-xl font-outfit font-extrabold bg-gradient-to-r from-accent-green to-accent-blue bg-clip-text text-transparent tracking-tight">
            BAYCAST
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ href, label }) => (
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
          {/* Notification bell — authenticated users only */}
          {user && <NotificationBell />}

          {/* Hamburger button — mobile only */}
          <button
            onClick={() => setMobileDrawerOpen(true)}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg border border-border-dark hover:border-accent-green/40 transition-colors"
            aria-label="Open menu"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 5H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-text-primary" />
              <path d="M3 10H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-text-primary" />
              <path d="M3 15H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-text-primary" />
            </svg>
          </button>

          {/* Mobile: compact CTA for non-authenticated users */}
          {!user && (
            <Link
              href="/auth/signup"
              className="md:hidden px-3 py-1.5 rounded-lg bg-gradient-to-r from-accent-green to-emerald-600 text-white text-xs font-bold hover:from-accent-green hover:to-emerald-500 transition-all"
            >
              Sign Up
            </Link>
          )}

          {/* Desktop: user menu or CTA */}
          {user ? (
            <div className="relative hidden md:block">
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
                    My profile
                  </Link>
                  <Link
                    href="/settings"
                    className="block px-4 py-2 text-sm text-text-primary hover:bg-white/5"
                    onClick={() => setMenuOpen(false)}
                  >
                    Settings
                  </Link>
                  <div className="border-t border-border-dark my-1" />
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-4 py-2 text-sm text-danger hover:bg-white/5"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/auth/signup"
              className="hidden md:inline-flex px-5 py-2.5 rounded-lg bg-gradient-to-r from-accent-green to-emerald-600 text-white text-sm font-bold hover:from-accent-green hover:to-emerald-500 transition-all shadow-md shadow-accent-green/15 hover:shadow-accent-green/30"
            >
              Get Started Free
            </Link>
          )}
        </div>
      </div>

      {/* Mobile drawer backdrop */}
      {mobileDrawerOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={closeMobileDrawer}
          aria-hidden="true"
        />
      )}

      {/* Mobile drawer panel */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-72 bg-bg-surface border-l border-border-dark shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden ${
          mobileDrawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-border-dark">
          <span className="text-lg font-outfit font-bold bg-gradient-to-r from-accent-green to-accent-blue bg-clip-text text-transparent">
            Menu
          </span>
          <button
            onClick={closeMobileDrawer}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/5 transition-colors"
            aria-label="Close menu"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 4L14 14M14 4L4 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-text-secondary" />
            </svg>
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {mobileLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={closeMobileDrawer}
              className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                pathname === href
                  ? 'text-text-primary bg-white/5'
                  : 'text-text-secondary hover:text-text-primary hover:bg-white/5'
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {user ? (
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border-dark">
            <button
              onClick={handleSignOut}
              className="w-full text-left px-4 py-3 rounded-lg text-sm text-danger hover:bg-white/5 transition-colors"
            >
              Sign out
            </button>
          </div>
        ) : (
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border-dark space-y-2">
            <Link
              href="/auth/login"
              onClick={closeMobileDrawer}
              className="block w-full text-center px-4 py-3 rounded-lg border border-border-dark text-text-primary text-sm font-semibold hover:border-accent-green/50 transition-colors"
            >
              Log in
            </Link>
            <Link
              href="/auth/signup"
              onClick={closeMobileDrawer}
              className="block w-full text-center px-4 py-3 rounded-lg bg-gradient-to-r from-accent-green to-emerald-600 text-white text-sm font-bold hover:from-accent-green hover:to-emerald-500 transition-all"
            >
              Get Started Free
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
