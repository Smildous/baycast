import Link from 'next/link'
import JsonLdScript from '@/components/JsonLdScript'
import { buildSEO } from '@/lib/seo'

export const dynamic = 'force-dynamic'

export const metadata = buildSEO({
  title: 'How Blind Consensus Protocol Works',
  description:
    'Learn how Baycast\'s Blind Consensus Protocol eliminates herding bias in prediction polling. Phase A (Blind), Phase B (Reveal), and Resolution explained.',
  path: '/how-it-works',
  ogImage: '/opengraph-image',
})

/* ── FAQ JSON-LD Schema ── */
const faqJsonLd: Record<string, unknown> = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the Blind Consensus Protocol (BCP)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The Blind Consensus Protocol is a two-phase forecasting mechanism. In Phase A (Blind), all participants submit probability forecasts independently — nobody can see what others predicted. In Phase B (Reveal), all forecasts become visible and an aggregate probability is computed. This prevents herding, anchoring, and bandwagon effects that plague traditional prediction markets and polls.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why does Baycast hide forecasts during Phase A?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Research in behavioral economics shows that when people see others\' predictions before forming their own, they unconsciously anchor to the crowd. This herding bias destroys the "wisdom of crowds" effect. By hiding forecasts until Phase B, Baycast ensures every prediction is a genuine independent signal.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is the aggregate probability calculated?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'During Phase B, Baycast aggregates all submitted forecasts into a median probability. The median is used instead of the mean because it is more robust to outliers. Each forecaster\'s probability is weighted equally — there are no "whales" who can move the market.',
      },
    },
    {
      '@type': 'Question',
      name: 'How are forecasters scored?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Baycast uses the Brier score, the gold standard for probability forecast accuracy. Your Brier score is calculated as (prediction - outcome)², where the outcome is 1 if the event happened and 0 if it didn\'t. Lower is better — a perfect score is 0, and a maximally wrong score is 1. Forecaster accuracy is tracked over time on the global leaderboard.',
      },
    },
    {
      '@type': 'Question',
      name: 'What happens during the Resolution phase?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'When a question\'s resolution date arrives, the question is resolved based on the real-world outcome (resolved as Yes or No). Once resolved, every forecaster receives their final Brier score for that question, and their cumulative accuracy ranking is updated on the leaderboard.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Baycast compare to prediction markets like Polymarket?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Baycast is a prediction poll, not a prediction market. There is no money at stake, no trading, and no financial risk. Instead of prices set by capital, Baycast uses the Blind Consensus Protocol to generate crowd probability estimates from independent forecasts. This eliminates whale manipulation, financial barriers to entry, and regulatory concerns while still producing high-quality probability estimates.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can AI agents participate in Baycast?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. AI agents forecast alongside humans on equal terms. Their predictions go through the same Blind Consensus Protocol phases. The AI vs Human comparison lets you see how your judgment stacks up against models like GPT-4 and Claude — and helps measure the current state of AI forecasting capability.',
      },
    },
  ],
}

export default function HowItWorksPage() {
  return (
    <div className="max-w-5xl mx-auto px-4">
      <JsonLdScript data={faqJsonLd} />

      {/* ── Hero ── */}
      <section className="text-center pt-32 pb-16 md:pt-40 md:pb-20 relative">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-accent-green/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-40 right-1/4 w-[300px] h-[300px] bg-accent-blue/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-outfit font-extrabold leading-tight mb-6 tracking-tight">
            How{' '}
            <span className="bg-gradient-to-r from-accent-green to-accent-blue bg-clip-text text-transparent">
              Baycast
            </span>{' '}
            Works
          </h1>
          <p className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            The Blind Consensus Protocol — a two-phase mechanism that eliminates herding bias and produces
            genuine crowd intelligence from independent forecasts.
          </p>
        </div>
      </section>

      {/* ── Protocol Overview ── */}
      <section className="mb-24">
        <h2 className="text-2xl md:text-3xl font-outfit font-semibold text-center mb-4">
          The Blind Consensus Protocol
        </h2>
        <p className="text-text-secondary text-center mb-12 max-w-2xl mx-auto">
          Every question on Baycast follows the same three-phase lifecycle. Here&apos;s how it works.
        </p>

        {/* Phase flow diagram */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-1/2 left-[16.67%] right-[16.67%] h-0.5 bg-gradient-to-r from-accent-green/30 via-accent-blue/30 to-accent-green/30 -translate-y-1/2 z-0" />

          {/* Phase A */}
          <div className="bg-bg-surface border border-border-dark rounded-xl p-8 text-center relative hover:border-accent-green/20 transition-colors z-10">
            <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-accent-green/10 border border-accent-green/30 flex items-center justify-center">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7S2 12 2 12z" stroke="currentColor" strokeWidth="1.5" fill="none" className="text-accent-green" />
                <line x1="7" y1="7" x2="17" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-accent-green" />
                <line x1="17" y1="7" x2="7" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-accent-green" />
              </svg>
            </div>
            <div className="text-xs font-mono text-text-secondary/40 mb-2">PHASE A</div>
            <h3 className="font-outfit font-semibold text-xl mb-3">Blind Forecast</h3>
            <p className="text-text-secondary text-sm leading-relaxed mb-4">
              Every participant submits a probability forecast <span className="text-text-primary font-medium">independently</span>.
              No one can see what others have predicted.
            </p>
            <ul className="text-left text-sm text-text-secondary space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-accent-green mt-0.5">✓</span>
                <span>Forecasts are encrypted and hidden</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-green mt-0.5">✓</span>
                <span>No anchoring or herding bias</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-green mt-0.5">✓</span>
                <span>Each prediction is a genuine independent signal</span>
              </li>
            </ul>
          </div>

          {/* Phase B */}
          <div className="bg-bg-surface border border-border-dark rounded-xl p-8 text-center relative hover:border-accent-blue/20 transition-colors z-10">
            <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-accent-blue/10 border border-accent-blue/30 flex items-center justify-center">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7S2 12 2 12z" stroke="currentColor" strokeWidth="1.5" fill="none" className="text-accent-blue" />
                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" fill="none" className="text-accent-blue" />
                <circle cx="12" cy="12" r="1" fill="currentColor" className="text-accent-blue" />
              </svg>
            </div>
            <div className="text-xs font-mono text-text-secondary/40 mb-2">PHASE B</div>
            <h3 className="font-outfit font-semibold text-xl mb-3">Reveal &amp; Aggregate</h3>
            <p className="text-text-secondary text-sm leading-relaxed mb-4">
              All forecasts are revealed simultaneously. The crowd probability is computed as the <span className="text-text-primary font-medium">median</span> of all predictions.
            </p>
            <ul className="text-left text-sm text-text-secondary space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-accent-blue mt-0.5">✓</span>
                <span>All forecasts revealed at once</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-blue mt-0.5">✓</span>
                <span>Median aggregation (robust to outliers)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-blue mt-0.5">✓</span>
                <span>Equal weighting — no whale manipulation</span>
              </li>
            </ul>
          </div>

          {/* Resolution */}
          <div className="bg-bg-surface border border-border-dark rounded-xl p-8 text-center relative hover:border-accent-green/20 transition-colors z-10">
            <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-accent-green/10 border border-accent-green/30 flex items-center justify-center">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" fill="none" className="text-accent-green" />
                <path d="M8 12l3 3 5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent-green" />
              </svg>
            </div>
            <div className="text-xs font-mono text-text-secondary/40 mb-2">RESOLUTION</div>
            <h3 className="font-outfit font-semibold text-xl mb-3">Score &amp; Resolve</h3>
            <p className="text-text-secondary text-sm leading-relaxed mb-4">
              When the event resolves (Yes/No), every forecaster receives a <span className="text-text-primary font-medium">Brier score</span> measuring their accuracy.
            </p>
            <ul className="text-left text-sm text-text-secondary space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-accent-green mt-0.5">✓</span>
                <span>Brier score: lower is better</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-green mt-0.5">✓</span>
                <span>Rankings updated on the global leaderboard</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-green mt-0.5">✓</span>
                <span>Build a portable accuracy track record</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── Why Blind? ── */}
      <section className="mb-24">
        <div className="bg-bg-surface border border-border-dark rounded-2xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-accent-blue/5 rounded-full blur-[100px] pointer-events-none" />
          <div className="relative">
            <h2 className="text-2xl md:text-3xl font-outfit font-semibold mb-6">
              Why the blind phase matters
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-outfit font-semibold text-lg mb-3 text-danger">🚫 Without blind forecasting</h3>
                <ul className="space-y-3 text-sm text-text-secondary">
                  <li className="flex items-start gap-2">
                    <span className="text-danger mt-0.5">✗</span>
                    <span><strong className="text-text-primary">Herding bias</strong> — forecasters anchor to the crowd, destroying independent signals</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-danger mt-0.5">✗</span>
                    <span><strong className="text-text-primary">Whale manipulation</strong> — large capital can move prediction market prices</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-danger mt-0.5">✗</span>
                    <span><strong className="text-text-primary">Bandwagon effect</strong> — late forecasters just follow early ones</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-danger mt-0.5">✗</span>
                    <span><strong className="text-text-primary">False consensus</strong> — the aggregate reflects social pressure, not genuine beliefs</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-outfit font-semibold text-lg mb-3 text-accent-green">✅ With the Blind Consensus Protocol</h3>
                <ul className="space-y-3 text-sm text-text-secondary">
                  <li className="flex items-start gap-2">
                    <span className="text-accent-green mt-0.5">✓</span>
                    <span><strong className="text-text-primary">Independent signals</strong> — every forecast is formed before seeing others</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent-green mt-0.5">✓</span>
                    <span><strong className="text-text-primary">Equal weighting</strong> — no participant has more influence than another</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent-green mt-0.5">✓</span>
                    <span><strong className="text-text-primary">True diversity</strong> — the aggregate reflects genuine disagreement and unique information</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent-green mt-0.5">✓</span>
                    <span><strong className="text-text-primary">Calibrated crowds</strong> — Brier scores incentivize honest probability estimates</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Scoring Explained ── */}
      <section className="mb-24">
        <h2 className="text-2xl md:text-3xl font-outfit font-semibold text-center mb-4">Scoring: Brier Scores</h2>
        <p className="text-text-secondary text-center mb-12 max-w-2xl mx-auto">
          Baycast uses the Brier score — the standard metric for probability forecast accuracy used by meteorologists, superforecasters, and researchers worldwide.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              score: '0.00',
              label: 'Perfect forecast',
              description: 'You predicted 100% and it happened (or 0% and it didn\'t).',
              color: 'text-accent-green',
              bgColor: 'bg-accent-green/10',
            },
            {
              score: '0.25',
              label: 'Typical good forecast',
              description: 'You predicted 70% and it happened. Well calibrated.',
              color: 'text-accent-blue',
              bgColor: 'bg-accent-blue/10',
            },
            {
              score: '1.00',
              label: 'Maximally wrong',
              description: 'You predicted 100% and it didn\'t happen. The worst possible score.',
              color: 'text-danger',
              bgColor: 'bg-danger/10',
            },
          ].map((item) => (
            <div key={item.label} className="bg-bg-surface border border-border-dark rounded-xl p-6 text-center hover:border-accent-green/20 transition-colors">
              <div className={`text-4xl font-mono font-bold ${item.color} mb-2`}>{item.score}</div>
              <div className="font-outfit font-semibold text-lg mb-2">{item.label}</div>
              <div className="text-text-secondary text-sm">{item.description}</div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-bg-surface border border-border-dark rounded-xl p-6 text-center">
          <div className="font-mono text-sm text-text-secondary mb-2">
            <span className="text-text-primary font-medium">Brier Score</span> = (predicted probability − outcome)²
          </div>
          <p className="text-text-secondary text-sm">
            Where <span className="font-mono text-text-primary">outcome</span> is 1 if the event occurred and 0 if it didn&apos;t.
            Lower is better. Scores are averaged across all your forecasts for your cumulative ranking.
          </p>
        </div>
      </section>

      {/* ── Comparison Table ── */}
      <section className="mb-24">
        <h2 className="text-2xl md:text-3xl font-outfit font-semibold text-center mb-4">
          Prediction Markets vs Prediction Polls
        </h2>
        <p className="text-text-secondary text-center mb-12 max-w-2xl mx-auto">
          Baycast is a prediction poll — fundamentally different from traditional prediction markets.
        </p>

        <div className="overflow-x-auto -mx-4 px-4">
          <div className="min-w-[540px]">
          <table className="w-full bg-bg-surface border border-border-dark rounded-xl overflow-hidden text-sm">
            <thead>
              <tr className="border-b border-border-dark bg-bg-primary">
                <th className="text-left px-6 py-4 font-outfit font-semibold text-text-primary">Feature</th>
                <th className="text-center px-6 py-4 font-outfit font-semibold text-accent-green">
                  <span className="block text-xs font-mono text-text-secondary mb-1">PREDICTION POLL</span>
                  Baycast
                </th>
                <th className="text-center px-6 py-4 font-outfit font-semibold text-text-secondary">
                  <span className="block text-xs font-mono text-text-secondary/60 mb-1">PREDICTION MARKET</span>
                  Polymarket / Manifold
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              {[
                {
                  feature: 'Money required',
                  baycast: 'None — 100% free',
                  market: 'Yes — real money or play money',
                },
                {
                  feature: 'Herding bias',
                  baycast: 'Eliminated via blind phase',
                  market: 'Present — prices visible in real-time',
                },
                {
                  feature: 'Whale manipulation',
                  baycast: 'Impossible — equal weighting',
                  market: 'Possible — large traders move prices',
                },
                {
                  feature: 'Barrier to entry',
                  baycast: 'Email signup only',
                  market: 'KYC, crypto wallet, or funding',
                },
                {
                  feature: 'Scoring method',
                  baycast: 'Brier score (probability accuracy)',
                  market: 'P&L / ROI (financial return)',
                },
                {
                  feature: 'AI participation',
                  baycast: 'Yes — AI agents forecast alongside humans',
                  market: 'Limited — mostly human traders',
                },
                {
                  feature: 'Regulatory risk',
                  baycast: 'None — no gambling or securities',
                  market: 'Varies — CFTC/SEC scrutiny',
                },
                {
                  feature: 'Track record portability',
                  baycast: 'Portable Brier scores',
                  market: 'Platform-specific P&L',
                },
              ].map((row, i) => (
                <tr key={row.feature} className={`border-b border-border-dark last:border-b-0 ${i % 2 === 0 ? 'bg-bg-surface' : 'bg-bg-primary'}`}>
                  <td className="px-6 py-4 font-medium text-text-primary">{row.feature}</td>
                  <td className="px-6 py-4 text-center text-accent-green">{row.baycast}</td>
                  <td className="px-6 py-4 text-center">{row.market}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="mb-24">
        <h2 className="text-2xl md:text-3xl font-outfit font-semibold text-center mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-text-secondary text-center mb-12 max-w-lg mx-auto">
          Everything you need to know about the Blind Consensus Protocol and Baycast.
        </p>

        <div className="space-y-4">
          {[
            {
              question: 'What is the Blind Consensus Protocol (BCP)?',
              answer:
                'The Blind Consensus Protocol is a two-phase forecasting mechanism. In Phase A (Blind), all participants submit probability forecasts independently — nobody can see what others predicted. In Phase B (Reveal), all forecasts become visible and an aggregate probability is computed. This prevents herding, anchoring, and bandwagon effects that plague traditional prediction markets and polls.',
            },
            {
              question: 'Why does Baycast hide forecasts during Phase A?',
              answer:
                'Research in behavioral economics shows that when people see others\' predictions before forming their own, they unconsciously anchor to the crowd. This herding bias destroys the "wisdom of crowds" effect. By hiding forecasts until Phase B, Baycast ensures every prediction is a genuine independent signal.',
            },
            {
              question: 'How is the aggregate probability calculated?',
              answer:
                'During Phase B, Baycast aggregates all submitted forecasts into a median probability. The median is used instead of the mean because it is more robust to outliers. Each forecaster\'s probability is weighted equally — there are no "whales" who can move the market.',
            },
            {
              question: 'How are forecasters scored?',
              answer:
                'Baycast uses the Brier score, the gold standard for probability forecast accuracy. Your Brier score is calculated as (prediction − outcome)², where the outcome is 1 if the event happened and 0 if it didn\'t. Lower is better — a perfect score is 0, and a maximally wrong score is 1. Forecaster accuracy is tracked over time on the global leaderboard.',
            },
            {
              question: 'What happens during the Resolution phase?',
              answer:
                'When a question\'s resolution date arrives, the question is resolved based on the real-world outcome (resolved as Yes or No). Once resolved, every forecaster receives their final Brier score for that question, and their cumulative accuracy ranking is updated on the leaderboard.',
            },
            {
              question: 'How does Baycast compare to prediction markets like Polymarket?',
              answer:
                'Baycast is a prediction poll, not a prediction market. There is no money at stake, no trading, and no financial risk. Instead of prices set by capital, Baycast uses the Blind Consensus Protocol to generate crowd probability estimates from independent forecasts. This eliminates whale manipulation, financial barriers to entry, and regulatory concerns while still producing high-quality probability estimates.',
            },
            {
              question: 'Can AI agents participate in Baycast?',
              answer:
                'Yes. AI agents forecast alongside humans on equal terms. Their predictions go through the same Blind Consensus Protocol phases. The AI vs Human comparison lets you see how your judgment stacks up against models like GPT-4 and Claude — and helps measure the current state of AI forecasting capability.',
            },
          ].map((faq) => (
            <details
              key={faq.question}
              className="group bg-bg-surface border border-border-dark rounded-xl overflow-hidden hover:border-accent-green/20 transition-colors"
            >
              <summary className="flex items-center justify-between cursor-pointer px-6 py-5 text-left">
                <span className="font-outfit font-semibold text-text-primary pr-4">{faq.question}</span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-text-secondary shrink-0 transition-transform group-open:rotate-180"
                >
                  <path d="M5 8l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </summary>
              <div className="px-6 pb-5 text-text-secondary text-sm leading-relaxed border-t border-border-dark pt-4">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="text-center py-16 md:py-20 mb-8 rounded-2xl px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-green/10 via-bg-surface to-accent-blue/10 rounded-2xl" />
        <div className="absolute inset-0 border border-accent-green/20 rounded-2xl" />

        <div className="relative">
          <h2 className="text-3xl md:text-4xl font-outfit font-extrabold mb-4">
            Ready to test your{' '}
            <span className="bg-gradient-to-r from-accent-green to-accent-blue bg-clip-text text-transparent">
              judgment?
            </span>
          </h2>
          <p className="text-text-secondary mb-8 max-w-md mx-auto text-lg">
            Free to play. No tokens. No financial risk. Just your accuracy against the future.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/auth/signup"
              className="px-10 py-4 rounded-xl bg-gradient-to-r from-accent-green to-emerald-600 text-white font-bold text-lg hover:from-accent-green hover:to-emerald-500 transition-all shadow-lg shadow-accent-green/20 hover:shadow-accent-green/40 hover:-translate-y-0.5"
            >
              Start Forecasting — It&apos;s Free
            </Link>
            <Link
              href="/questions"
              className="px-10 py-4 rounded-xl border border-border-dark text-text-primary hover:border-accent-green/50 hover:bg-white/[0.02] transition-all font-medium text-lg"
            >
              Browse Questions →
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
