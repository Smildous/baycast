'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import type { Profile } from '@/lib/types'

interface Props {
  profile: Profile | null
  userEmail: string
}

export default function SettingsForm({ profile, userEmail }: Props) {
  const router = useRouter()
  const [displayName, setDisplayName] = useState(profile?.display_name ?? '')
  const [bio, setBio] = useState(profile?.bio ?? '')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { error } = await supabase
      .from('profiles')
      .update({ display_name: displayName, bio })
      .eq('id', user.id)

    if (error) {
      setError(error.message)
    } else {
      setSuccess(true)
      router.refresh()
    }
    setLoading(false)
  }

  return (
    <div className="bg-bg-surface border border-border-dark rounded-xl p-6 space-y-6">
      <div>
        <label className="block text-sm text-text-secondary mb-1">Email</label>
        <div className="px-4 py-2.5 rounded-lg bg-bg-primary border border-border-dark text-text-secondary">
          {userEmail}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-text-secondary mb-1.5">Username</label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            required
            minLength={3}
            maxLength={30}
            className="w-full px-4 py-2.5 rounded-lg bg-bg-primary border border-border-dark text-text-primary focus:outline-none focus:border-accent-green transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm text-text-secondary mb-1.5">Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={3}
            maxLength={200}
            placeholder="A few words about yourself..."
            className="w-full px-4 py-2.5 rounded-lg bg-bg-primary border border-border-dark text-text-primary placeholder-text-secondary focus:outline-none focus:border-accent-green transition-colors resize-none"
          />
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-danger/10 border border-danger/30 text-danger text-sm">
            {error}
          </div>
        )}
        {success && (
          <div className="p-3 rounded-lg bg-success/10 border border-success/30 text-success text-sm">
            Profile updated!
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2.5 rounded-lg bg-accent-green text-white font-semibold hover:bg-accent-green/90 disabled:opacity-50 transition-colors"
        >
          {loading ? 'Saving...' : 'Save'}
        </button>
      </form>
    </div>
  )
}
