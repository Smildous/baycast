'use client'

import { useState, useMemo } from 'react'
import QuestionCard from './QuestionCard'
import EmptyState from './EmptyState'
import type { Question } from '@/lib/types'

interface Props {
  questions: Question[]
}

export default function QuestionsList({ questions }: Props) {
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    if (!search.trim()) return questions
    const term = search.toLowerCase().trim()
    return questions.filter((q) => q.title.toLowerCase().includes(term))
  }, [questions, search])

  return (
    <>
      {/* Search bar */}
      <div className="relative mb-6">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search questions..."
          className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-bg-surface border border-border-dark text-text-primary placeholder:text-text-secondary/60 text-sm focus:outline-none focus:border-accent-green/50 focus:ring-1 focus:ring-accent-green/20 transition-colors"
        />
      </div>

      {/* Filtered results */}
      {filtered.length === 0 ? (
        <div className="bg-bg-surface border border-border-dark rounded-xl">
          <EmptyState
            icon="🔍"
            title="No match"
            description="Try another word, or clear the search."
          />
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((q) => (
            <QuestionCard key={q.id} question={q} />
          ))}
        </div>
      )}
    </>
  )
}
