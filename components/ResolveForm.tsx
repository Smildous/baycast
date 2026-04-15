'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Props {
  questionId: string
}

export default function ResolveForm({ questionId }: Props) {
  const router = useRouter()
  const [outcome, setOutcome] = useState<'yes' | 'no'>('yes')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleResolve(e: React.FormEvent) {
    e.preventDefault()
    if (!confirm(`Résoudre cette question avec "${outcome}" ? Cette action est irréversible.`)) return

    setLoading(true)
    setError(null)

    const res = await fetch('/api/admin/resolve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ questionId, outcome }),
    })

    const data = await res.json()

    if (!res.ok) {
      setError(data.error ?? 'Erreur lors de la résolution')
      setLoading(false)
      return
    }

    router.push('/admin')
    router.refresh()
  }

  return (
    <form onSubmit={handleResolve} className="bg-bg-surface border border-border-dark rounded-xl p-6 space-y-5">
      <div>
        <label className="block text-sm text-text-secondary mb-3">Résultat</label>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setOutcome('yes')}
            className={`flex-1 py-3 rounded-lg border font-semibold transition-colors ${
              outcome === 'yes'
                ? 'border-success bg-success/10 text-success'
                : 'border-border-dark text-text-secondary hover:border-success/40'
            }`}
          >
            OUI — Réalisé
          </button>
          <button
            type="button"
            onClick={() => setOutcome('no')}
            className={`flex-1 py-3 rounded-lg border font-semibold transition-colors ${
              outcome === 'no'
                ? 'border-danger bg-danger/10 text-danger'
                : 'border-border-dark text-text-secondary hover:border-danger/40'
            }`}
          >
            NON — Pas réalisé
          </button>
        </div>
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-danger/10 border border-danger/30 text-danger text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="px-6 py-2.5 rounded-lg bg-danger text-white font-semibold hover:bg-danger/90 disabled:opacity-50 transition-colors"
      >
        {loading ? 'Résolution...' : 'Confirmer la résolution'}
      </button>
    </form>
  )
}
