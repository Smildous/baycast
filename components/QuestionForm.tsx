'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { Question, Category, QuestionType } from '@/lib/types'

const CATEGORIES: Category[] = ['Politics', 'Technology', 'Economy', 'Science', 'Sports', 'Culture', 'Other']

interface Props {
  mode: 'create' | 'edit'
  question?: Question
}

export default function QuestionForm({ mode, question: q }: Props) {
  const router = useRouter()
  const [title, setTitle] = useState(q?.title ?? '')
  const [description, setDescription] = useState(q?.description ?? '')
  const [category, setCategory] = useState<Category>(q?.category ?? 'Other')
  const [questionType] = useState<QuestionType>(q?.question_type ?? 'binary')
  const [resolutionSource, setResolutionSource] = useState(q?.resolution_source ?? '')
  const [opensAt, setOpensAt] = useState(q?.opens_at?.slice(0, 16) ?? '')
  const [closesAt, setClosesAt] = useState(q?.closes_at?.slice(0, 16) ?? '')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const payload = {
      title,
      description: description || null,
      category,
      question_type: questionType,
      options: {},
      resolution_source: resolutionSource || null,
      opens_at: opensAt,
      closes_at: closesAt,
      status: 'open' as const,
      created_by: user.id,
    }

    if (mode === 'create') {
      const { error } = await supabase.from('questions').insert(payload)
      if (error) {
        setError(error.message)
      } else {
        router.push('/admin')
        router.refresh()
      }
    } else {
      const { error } = await supabase
        .from('questions')
        .update(payload)
        .eq('id', q!.id)
      if (error) {
        setError(error.message)
      } else {
        router.push('/admin')
        router.refresh()
      }
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="bg-bg-surface border border-border-dark rounded-xl p-6 space-y-5">
      <div>
        <label className="block text-sm text-text-secondary mb-1.5">Titre *</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          maxLength={300}
          placeholder="Est-ce que X va se produire avant Y ?"
          className="w-full px-4 py-2.5 rounded-lg bg-bg-primary border border-border-dark text-text-primary placeholder-text-secondary focus:outline-none focus:border-accent-green transition-colors"
        />
      </div>

      <div>
        <label className="block text-sm text-text-secondary mb-1.5">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          placeholder="Critères de résolution, contexte..."
          className="w-full px-4 py-2.5 rounded-lg bg-bg-primary border border-border-dark text-text-primary placeholder-text-secondary focus:outline-none focus:border-accent-green transition-colors resize-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-text-secondary mb-1.5">Catégorie *</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
            className="w-full px-4 py-2.5 rounded-lg bg-bg-primary border border-border-dark text-text-primary focus:outline-none focus:border-accent-green transition-colors"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm text-text-secondary mb-1.5">Source de résolution</label>
          <input
            type="url"
            value={resolutionSource}
            onChange={(e) => setResolutionSource(e.target.value)}
            placeholder="https://..."
            className="w-full px-4 py-2.5 rounded-lg bg-bg-primary border border-border-dark text-text-primary placeholder-text-secondary focus:outline-none focus:border-accent-green transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-text-secondary mb-1.5">Ouvre le *</label>
          <input
            type="datetime-local"
            value={opensAt}
            onChange={(e) => setOpensAt(e.target.value)}
            required
            className="w-full px-4 py-2.5 rounded-lg bg-bg-primary border border-border-dark text-text-primary focus:outline-none focus:border-accent-green transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm text-text-secondary mb-1.5">Ferme le *</label>
          <input
            type="datetime-local"
            value={closesAt}
            onChange={(e) => setClosesAt(e.target.value)}
            required
            className="w-full px-4 py-2.5 rounded-lg bg-bg-primary border border-border-dark text-text-primary focus:outline-none focus:border-accent-green transition-colors"
          />
        </div>
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-danger/10 border border-danger/30 text-danger text-sm">
          {error}
        </div>
      )}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2.5 rounded-lg bg-accent-green text-white font-semibold hover:bg-accent-green/90 disabled:opacity-50 transition-colors"
        >
          {loading ? 'Enregistrement...' : mode === 'create' ? 'Créer la question' : 'Sauvegarder'}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2.5 rounded-lg border border-border-dark text-text-secondary hover:text-text-primary transition-colors"
        >
          Annuler
        </button>
      </div>
    </form>
  )
}
