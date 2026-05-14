'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import type { Notification, NotificationType } from '@/lib/types'
import { NOTIFICATION_TYPE_CONFIG } from '@/lib/types'

export const dynamic = 'force-dynamic'

const PAGE_SIZE = 20

function formatTimeAgo(dateStr: string): string {
  const now = Date.now()
  const then = new Date(dateStr).getTime()
  const diffMs = now - then
  const diffSec = Math.floor(diffMs / 1000)
  const diffMin = Math.floor(diffSec / 60)
  const diffHr = Math.floor(diffMin / 60)
  const diffDay = Math.floor(diffHr / 24)

  if (diffSec < 60) return 'just now'
  if (diffMin < 60) return `${diffMin}m ago`
  if (diffHr < 24) return `${diffHr}h ago`
  if (diffDay < 7) return `${diffDay}d ago`
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function getTypeIcon(type: NotificationType): { emoji: string; color: string } {
  return NOTIFICATION_TYPE_CONFIG[type] ?? { emoji: '🔔', color: '#6b7280' }
}

function NotificationItem({ notification, onMarkRead }: {
  notification: Notification
  onMarkRead: (id: string) => void
}) {
  const { emoji } = getTypeIcon(notification.type)

  const handleClick = () => {
    if (!notification.read) {
      onMarkRead(notification.id)
    }
  }

  const content = (
    <div
      onClick={handleClick}
      className={`flex items-start gap-3 px-4 py-3 border-b border-border-dark/50 transition-colors ${
        !notification.read
          ? 'bg-accent-blue/5 border-l-2 border-l-accent-blue cursor-pointer'
          : 'hover:bg-white/[0.02] cursor-default'
      }`}
    >
      <span className="text-lg mt-0.5 flex-shrink-0">{emoji}</span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className={`text-sm truncate ${!notification.read ? 'font-semibold text-white' : 'text-text-secondary'}`}>
            {notification.title}
          </p>
          {!notification.read && (
            <span className="w-2 h-2 rounded-full bg-accent-blue flex-shrink-0" />
          )}
        </div>
        <p className="text-sm text-text-secondary/70 mt-0.5 line-clamp-2">{notification.body}</p>
        <p className="text-xs text-text-secondary/50 mt-1">{formatTimeAgo(notification.created_at)}</p>
      </div>
    </div>
  )

  if (notification.link) {
    return <Link href={notification.link}>{content}</Link>
  }
  return content
}

function EmptyState({ filter }: { filter: 'all' | 'unread' }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <span className="text-4xl mb-4">🔔</span>
      <h3 className="text-lg font-outfit font-semibold text-white mb-1">
        {filter === 'unread' ? 'All caught up!' : 'No notifications yet'}
      </h3>
      <p className="text-sm text-text-secondary max-w-sm">
        {filter === 'unread'
          ? 'You have no unread notifications. Check back later.'
          : "When you forecast on questions, you'll receive updates about resolutions and more here."}
      </p>
      <Link
        href="/questions"
        className="mt-4 px-4 py-2 rounded-lg border border-accent-green/50 text-accent-green text-sm hover:bg-accent-green/10 transition-colors"
      >
        Browse Questions
      </Link>
    </div>
  )
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [filter, setFilter] = useState<'all' | 'unread'>('all')
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [hasMore, setHasMore] = useState(false)
  const [offset, setOffset] = useState(0)
  const [markingAll, setMarkingAll] = useState(false)

  const fetchNotifications = useCallback(async (reset = false) => {
    const currentOffset = reset ? 0 : offset
    if (!reset) setLoadingMore(true)
    else setLoading(true)

    try {
      const params = new URLSearchParams({
        limit: String(PAGE_SIZE),
        offset: String(currentOffset),
      })
      if (filter === 'unread') params.set('unread_only', 'true')

      const res = await fetch(`/api/notifications?${params}`)
      if (!res.ok) return

      const data = await res.json()
      if (reset) {
        setNotifications(data.notifications ?? [])
      } else {
        setNotifications(prev => [...prev, ...(data.notifications ?? [])])
      }
      setUnreadCount(data.unread_count ?? 0)
      setHasMore((data.notifications ?? []).length === PAGE_SIZE)
      if (reset) setOffset(PAGE_SIZE)
      else setOffset(prev => prev + PAGE_SIZE)
    } catch {
      // Silently fail
    } finally {
      setLoading(false)
      setLoadingMore(false)
    }
  }, [offset, filter])

  // Initial fetch + refetch on filter change
  useEffect(() => {
    setOffset(0)
    setHasMore(false)
    fetchNotifications(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter])

  const handleMarkRead = async (id: string) => {
    // Optimistic update
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    )
    setUnreadCount(prev => Math.max(0, prev - 1))

    try {
      await fetch(`/api/notifications/${id}/read`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ read: true }),
      })
    } catch {
      // Revert on failure
      setNotifications(prev =>
        prev.map(n => n.id === id ? { ...n, read: false } : n)
      )
      setUnreadCount(prev => prev + 1)
    }
  }

  const handleMarkAllRead = async () => {
    setMarkingAll(true)
    try {
      const res = await fetch('/api/notifications/mark-all-read', { method: 'POST' })
      if (res.ok) {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })))
        setUnreadCount(0)
      }
    } catch {
      // Silently fail
    } finally {
      setMarkingAll(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-outfit font-bold mb-2">Notifications</h1>
          <p className="text-text-secondary text-sm">
            Stay updated on your forecasts and platform activity.
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={handleMarkAllRead}
            disabled={markingAll}
            className="px-3 py-1.5 rounded-lg border border-border-dark text-sm text-text-secondary hover:border-accent-green/50 hover:text-accent-green transition-colors disabled:opacity-50"
          >
            {markingAll ? 'Marking…' : `Mark all read (${unreadCount})`}
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6">
        {[
          { label: 'All', value: 'all' as const },
          { label: 'Unread', value: 'unread' as const },
        ].map(({ label, value }) => (
          <button
            key={value}
            onClick={() => setFilter(value)}
            className={`px-4 py-1.5 rounded-full border text-sm transition-colors ${
              filter === value
                ? 'border-accent-green text-accent-green bg-accent-green/10'
                : 'border-border-dark text-text-secondary hover:border-accent-green/50'
            }`}
          >
            {label}
            {value === 'unread' && unreadCount > 0 && (
              <span className="ml-1.5 text-xs opacity-70">({unreadCount})</span>
            )}
          </button>
        ))}
      </div>

      {/* Notification list */}
      <div className="rounded-xl border border-border-dark overflow-hidden bg-card">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-6 h-6 border-2 border-accent-green border-t-transparent rounded-full animate-spin" />
          </div>
        ) : notifications.length === 0 ? (
          <EmptyState filter={filter} />
        ) : (
          <>
            {notifications.map(n => (
              <NotificationItem
                key={n.id}
                notification={n}
                onMarkRead={handleMarkRead}
              />
            ))}

            {/* Load more */}
            {hasMore && (
              <div className="flex justify-center py-4 border-t border-border-dark/50">
                <button
                  onClick={() => fetchNotifications(false)}
                  disabled={loadingMore}
                  className="px-4 py-2 rounded-lg border border-border-dark text-sm text-text-secondary hover:border-accent-green/50 hover:text-white transition-colors disabled:opacity-50"
                >
                  {loadingMore ? 'Loading…' : 'Load more'}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
