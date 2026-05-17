import { getQuestionNewsContext } from '@/lib/news-context'

interface Props {
  title: string
  category: string
  description?: string | null
}

export default function NewsContextSection({ title, category, description }: Props) {
  const links = getQuestionNewsContext({ title, category, description })

  return (
    <section className="mb-8 rounded-xl border border-border-dark bg-bg-surface p-5">
      <div className="mb-3">
        <h2 className="font-outfit text-lg font-semibold text-text-primary">Context links</h2>
        <p className="mt-1 text-sm text-text-secondary">
          Static reference links that may help frame the question. No live news feed is loaded here.
        </p>
      </div>

      {links.length > 0 ? (
        <ul className="space-y-3">
          {links.map((link) => (
            <li key={link.url} className="rounded-lg border border-border-dark/70 bg-bg-primary/40 p-3">
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-accent-blue hover:underline"
              >
                {link.title}
              </a>
              <div className="mt-1 text-xs uppercase tracking-wide text-text-secondary">{link.source}</div>
              <p className="mt-1 text-sm text-text-secondary">{link.summary}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="rounded-lg border border-border-dark/70 bg-bg-primary/40 p-3 text-sm text-text-secondary">
          No static context links are available for this question yet. Use the question text and resolution source as the reference points.
        </p>
      )}
    </section>
  )
}
