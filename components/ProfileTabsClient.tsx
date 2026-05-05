'use client'

import { useState, ReactNode } from 'react'

export interface TabDef {
  key: string
  label: string
}

interface Props {
  tabs: TabDef[]
  children: Record<string, ReactNode>
  defaultTab?: string
}

/**
 * Client-side tab switcher for the profile page.
 * All tab content is pre-rendered server-side; this component
 * only toggles visibility to avoid extra fetches.
 */
export default function ProfileTabsClient({ tabs, children, defaultTab }: Props) {
  const [active, setActive] = useState(defaultTab ?? tabs[0]?.key ?? '')

  return (
    <div>
      {/* Tab bar */}
      <div className="flex gap-1 border-b border-border-dark mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActive(tab.key)}
            className={`px-4 py-2.5 text-sm font-medium transition-colors relative ${
              active === tab.key
                ? 'text-accent-green'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            {tab.label}
            {active === tab.key && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-green rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div>{children[active]}</div>
    </div>
  )
}
