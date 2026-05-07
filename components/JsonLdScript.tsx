'use client'

import { useEffect, useRef } from 'react'

/**
 * Renders a JSON-LD <script> tag in <head> with proper cleanup on unmount.
 * Prevents stale bleed when navigating between pages via client-side router.
 *
 * Usage in server components:
 *   <JsonLdScript data={{ '@context': 'https://schema.org', '@type': 'Question', ... }} />
 */
export default function JsonLdScript({ data }: { data: Record<string, unknown> }) {
  const initialized = useRef(false)

  useEffect(() => {
    // Guard against SSR double-invoke in React 18 strict mode dev
    if (initialized.current) return
    initialized.current = true

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.setAttribute('data-jsonld', 'baycast')
    script.textContent = JSON.stringify(data)
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
      initialized.current = false
    }
  }, [data])

  return null
}
