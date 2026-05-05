'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import type { Notification } from '@/lib/types'
import { NOTIFICATION_TYPE_CONFIG } from '@/lib/types'

/**
 * NotificationBell — placeholder bell icon with unread count badge.
 *
 * Behavior:
 * - Shows a bell icon with a red badge displaying the unread count.
 * - If unread > 99, displays "99+".
 * - If unread === 0, no badge is shown.
 * - On click, toggles a dropdown with recent notifications.
 * - Fetches unread count on mount and polls every 60 seconds.
 *
 * NOTE: This is a scaffold (AQ-007). Full dropdown with mark-as-read,
 * mark-all-read, and infinite scroll will be added in a follow-up.
 */
export default function NotificationBell() {
  const [unreadCount, setUnreadCount] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const fetchUnreadCount = useCallback(async () => {
    try {
      const supabase = createClient()
      const { count, error } = await supabase
        .from('notifications')
        .select('*', { count: 'exact', head: true })
        .eq('read', false)

      if (!error) {
        setUnreadCount(count ?? 0)
      }
    } catch {
      // Silently fail — don't break the UI for a notification count
    }
  }, [])

  const fetchNotifications = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/notifications?limit=10')
      if (res.ok) {
        const data = await res.json()
        setNotifications(data.notifications ?? [])
        setUnreadCount(data.unread_count ?? 0)
      }
    } catch {
      // Silently fail
    } finally {
      setLoading(false)
    }
  }, [])

  // Poll unread count every 60 seconds
  useEffect(() => {
    fetchUnreadCount()
    const interval = setInterval(fetchUnreadCount, 60_000)
    return () => clearInterval(interval)
  }, [fetchUnreadCount])

  // Fetch notifications when dropdown opens
  useEffect(() => {
    if (isOpen) {
      fetchNotifications()
    }
  }, [isOpen, fetchNotifications])

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const badge = unreadCount > 0 ? (
    <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-danger text-[10px] font-bold text-white leading-none">
      {unreadCount > 99 ? '99+' : unreadCount}
    </span>
  ) : null

  function formatTimeAgo(dateStr: string): string {
    const now = Date.now()
    const then = new Date(dateStr).getTime()
    const diffMs = now - then
    const diffMin = Math.floor(diffMs / 60_000)
    if (diffMin < 1) return 'just now'
    if (diffMin < 60) return `${diffMin}m ago`
    const diffHr = Math.floor(diffMin / 60)
    if (diffHr < 24) return `${diffHr}h ago`
    const diffDay = Math.floor(diffHr / 24)
    if (diffDay < 7) return `${diffDay}d ago`
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex items-center justify-center w-10 h-10 rounded-lg border border-border-dark hover:border-accent-green/40 transition-colors"
        aria-label={`Notifications${unreadCount > 0 ? ` (${unreadCount} unread)` : ''}`}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-text-primary"
        >
          <path
            d="M10 2C7.24 2 5 4.24 5 7V10.5L3.5 13C3.17 13.5 3.5 14.17 4.1 14.17H15.9C16.5 14.17 16.83 13.5 16.5 13L15 10.5V7C15 4.24 12.76 2 10 2Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8.17 14.17C8.17 15.27 9.07 16.17 10.17 16.17C11.27 16.17 12.17 15.27 12.17 14.17"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {badge}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-bg-surface border border-border-dark rounded-xl shadow-xl z-50">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border-dark">
            <h3 className="text-sm font-semibold text-text-primary">Notifications</h3>
            {unreadCount > 0 && (
              <span className="text-xs text-text-secondary">{unreadCount} unread</span>
            )}
          </div>

          {/* Notification list */}
          <div className="max-h-[400px] overflow-y-auto">
            {loading ? (
              <div className="px-4 py-8 text-center text-text-secondary text-sm animate-pulse">
                Loading...
              </div>
            ) : notifications.length === 0 ? (
              <div className="px-4 py-8 text-center text-text-secondary text-sm">
                <div className="text-2xl mb-2">🔔</div>
                No notifications yet
              </div>
            ) : (
              notifications.map((n) => {
                const config = NOTIFICATION_TYPE_CONFIG[n.type] ?? { emoji: '🔔', color: '#6b7280' }
                return (
                  <Link
                    key={n.id}
                    href={n.link ?? '#'}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-3 border-b border-border-dark/50 hover:bg-white/[0.02] transition-colors ${
                      !n.read ? 'border-l-2 border-l-accent-blue bg-accent-blue/5' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-lg shrink-0 mt-0.5">{config.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-sm font-medium text-text-primary truncate">
                            {n.title}
                          </span>
                          <span className="text-[10px] text-text-secondary whitespace-nowrap">
                            {formatTimeAgo(n.created_at)}
                          </span>
                        </div>
                        <p className="text-xs text-text-secondary mt-0.5 line-clamp-2">
                          {n.body}
                        </p>
                      </div>
                    </div>
                  </Link>
                )
              })
            )}
          </div>

          {/* Footer */}
          <div className="px-4 py-2 border-t border-border-dark">
            <span className="text-xs text-text-secondary">
              View all notifications — coming soon
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
