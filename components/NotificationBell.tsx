'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function NotificationBell() {
  const [unreadCount, setUnreadCount] = useState<number>(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    async function fetchUnreadCount() {
      try {
        const res = await fetch('/api/notifications/unread-count')
        if (res.ok) {
          const data = await res.json()
          setUnreadCount(typeof data.count === 'number' ? data.count : 0)
        }
      } catch {
        // Silently fail — notifications are non-critical
      }
    }
    fetchUnreadCount()
    // Poll every 60 seconds
    const interval = setInterval(fetchUnreadCount, 60_000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Link
      href="/notifications"
      className="relative flex items-center justify-center w-10 h-10 rounded-lg border border-border-dark hover:border-accent-green/40 transition-colors"
      aria-label={`Notifications${unreadCount > 0 ? ` (${unreadCount} unread)` : ''}`}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-text-secondary"
      >
        <path
          d="M10 2C7.24 2 5 4.24 5 7V10.26L4.12 11.14C3.73 11.53 4 12.17 4.56 12.17H15.44C16 12.17 16.27 11.53 15.88 11.14L15 10.26V7C15 4.24 12.76 2 10 2Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11.5 15C11.5 15.8284 10.8284 16.5 10 16.5C9.17157 16.5 8.5 15.8284 8.5 15"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {mounted && unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] flex items-center justify-center rounded-full bg-accent-green text-white text-[10px] font-bold leading-none px-1">
          {unreadCount > 99 ? '99+' : unreadCount}
        </span>
      )}
    </Link>
  )
}
