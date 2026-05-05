interface EmptyStateProps {
  /** Emoji or text icon displayed prominently */
  icon: string
  /** Bold heading text */
  title: string
  /** Helpful description below the title */
  description?: string
  /** Optional call-to-action button */
  cta?: {
    label: string
    href: string
  }
  /** Optional additional className for the wrapper */
  className?: string
}

/**
 * Reusable empty state component.
 * Displays an icon, title, optional description, and optional CTA button.
 * Styled consistently with the Baycast dark theme.
 */
export default function EmptyState({ icon, title, description, cta, className = '' }: EmptyStateProps) {
  return (
    <div className={`text-center py-16 px-4 ${className}`}>
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-lg font-outfit font-semibold text-text-primary mb-2">
        {title}
      </h3>
      {description && (
        <p className="text-text-secondary text-sm max-w-md mx-auto mb-6">
          {description}
        </p>
      )}
      {cta && (
        <a
          href={cta.href}
          className="inline-block px-5 py-2.5 rounded-lg bg-accent-green text-white text-sm font-semibold hover:bg-accent-green/90 transition-colors"
        >
          {cta.label}
        </a>
      )}
    </div>
  )
}
