import Link from 'next/link'
import { buildSEO } from '@/lib/seo'

export const dynamic = 'force-dynamic'

export const metadata = buildSEO({
  title: 'Apple Mac Pro at WWDC 2026 settled No',
  description:
    'Baycast first settlement note: the Apple Mac Pro at WWDC 2026 question resolved No from Apple WWDC and Apple Newsroom evidence.',
  path: '/settlements/apple-mac-pro-wwdc-2026',
  ogType: 'article',
})

const sources = [
  {
    label: 'Apple WWDC',
    href: 'https://developer.apple.com/wwdc26/',
    description: 'Official Apple WWDC26 event information and related materials.',
  },
  {
    label: 'Apple Newsroom',
    href: 'https://www.apple.com/newsroom/',
    description: 'Official Apple announcements and press releases.',
  },
]

export default function AppleMacProSettlementPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-20 md:py-28">
      <section className="relative overflow-hidden rounded-3xl border border-border-dark bg-bg-surface p-8 md:p-12 mb-10">
        <div className="absolute -top-24 right-0 h-64 w-64 rounded-full bg-accent-green/10 blur-3xl" />
        <div className="relative">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent-green mb-4">
            Settlement note
          </p>
          <h1 className="text-4xl md:text-5xl font-outfit font-extrabold tracking-tight leading-tight mb-6">
            Apple Mac Pro at WWDC 2026 resolved No
          </h1>
          <p className="text-lg md:text-xl text-text-secondary leading-relaxed max-w-3xl">
            Baycast has its first resolved question. The question asked whether Apple would announce a new Mac Pro at WWDC 2026. It resolved No after checking Apple public materials for WWDC26 and Apple Newsroom during the resolution window.
          </p>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <div className="rounded-2xl border border-border-dark bg-bg-surface p-6">
          <div className="text-sm text-text-secondary mb-2">Question</div>
          <div className="font-medium text-text-primary">Will Apple announce a new Mac Pro at WWDC 2026?</div>
        </div>
        <div className="rounded-2xl border border-accent-green/30 bg-accent-green/5 p-6">
          <div className="text-sm text-text-secondary mb-2">Outcome</div>
          <div className="text-3xl font-mono font-bold text-accent-green">No</div>
        </div>
        <div className="rounded-2xl border border-border-dark bg-bg-surface p-6">
          <div className="text-sm text-text-secondary mb-2">Settled</div>
          <div className="font-medium text-text-primary">June 13, 2026</div>
        </div>
      </section>

      <section className="rounded-2xl border border-border-dark bg-bg-surface p-8 md:p-10 mb-10">
        <h2 className="text-2xl md:text-3xl font-outfit font-semibold mb-4">Why it resolved No</h2>
        <div className="space-y-4 text-text-secondary leading-relaxed">
          <p>
            The resolution rule was narrow: Yes required Apple to announce a new Mac Pro model during WWDC 2026 or in an Apple Newsroom post dated from June 8 through June 12, 2026. A spec bump to Mac Studio, MacBook, iMac, or Mac mini did not count.
          </p>
          <p>
            The public Apple sources used for settlement did not show a new Mac Pro announcement in that window. Under the rule, that means the correct outcome is No.
          </p>
        </div>
      </section>

      <section className="rounded-2xl border border-border-dark bg-bg-surface p-8 md:p-10 mb-10">
        <h2 className="text-2xl md:text-3xl font-outfit font-semibold mb-4">Sources checked</h2>
        <p className="text-text-secondary leading-relaxed mb-6">
          Settlement used Apple public sources only. These links are the stable references for the event and official company announcements.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sources.map((source) => (
            <a
              key={source.href}
              href={source.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-border-dark bg-bg-dark/40 p-5 hover:border-accent-green/40 transition-colors"
            >
              <div className="font-semibold text-text-primary mb-2">{source.label}</div>
              <div className="text-sm text-text-secondary leading-relaxed">{source.description}</div>
            </a>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-border-dark bg-bg-surface p-8 md:p-10 mb-10">
        <h2 className="text-2xl md:text-3xl font-outfit font-semibold mb-4">What the first score means</h2>
        <div className="space-y-4 text-text-secondary leading-relaxed">
          <p>
            Baycast scores probability forecasts with the Brier score. It compares a forecasted probability with the outcome that actually happened. Lower is better, and the score is most useful as a calibration record over many resolved questions.
          </p>
          <p>
            This first score is only one calibration point. It is not a claim that the system is proven, that the forecast was superior, or that one result says much by itself. The useful part is simpler: the public loop from question to evidence to resolution to score is now visible.
          </p>
        </div>
      </section>

      <section className="rounded-2xl border border-border-dark bg-bg-surface p-8 md:p-10">
        <h2 className="text-2xl md:text-3xl font-outfit font-semibold mb-4">What Baycast is doing here</h2>
        <p className="text-text-secondary leading-relaxed mb-6">
          Baycast is prediction polling. A person makes a probability estimate, the question resolves against public evidence, and the forecast receives a score. There are no prices to move, no trades to place, and no financial reward attached to this settlement note.
        </p>
        <Link
          href="/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248"
          className="inline-flex items-center rounded-xl bg-accent-green px-5 py-3 font-semibold text-white hover:bg-accent-green/90 transition-colors"
        >
          View the resolved question
        </Link>
      </section>
    </main>
  )
}
