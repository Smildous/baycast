import Link from 'next/link'
import { buildSEO } from '@/lib/seo'

export const dynamic = 'force-dynamic'

export const metadata = buildSEO({
  title: 'Baycast vs Polymarket vs Metaculus vs Manifold - Comparison',
  description:
    'Compare Baycast with Polymarket, Metaculus, Manifold, and Kalshi. Baycast builds collective intelligence from private forecasts first, not trades or market prices.',
  path: '/compare',
  ogImage: '/opengraph-image',
})

/* ── Feature comparison data ── */
const comparisonRows = [
  {
    feature: 'Platform model',
    baycast: 'Prediction poll',
    polymarket: 'Prediction market (crypto gambling)',
    metaculus: 'Academic forecasting',
    manifold: 'Play-money prediction market',
    kalshi: 'Prediction market (CFTC-regulated)',
  },
  {
    feature: 'Money involved',
    baycast: 'None. Free to use',
    polymarket: 'Real money (crypto)',
    metaculus: 'None',
    manifold: 'Play money (Mana)',
    kalshi: 'Real money (USD)',
  },
  {
    feature: 'Scoring system',
    baycast: 'Brier score + log score',
    polymarket: 'Profit & Loss (P&L)',
    metaculus: 'Brier score',
    manifold: 'Profit & Loss (Mana)',
    kalshi: 'Profit & Loss (USD)',
  },
  {
    feature: 'Hidden first forecasts',
    baycast: true,
    polymarket: false,
    metaculus: false,
    manifold: false,
    kalshi: false,
  },
  {
    feature: 'Human and AI forecasting',
    baycast: '✅ Live',
    polymarket: '❌ No',
    metaculus: '⚠️ Experimental',
    manifold: '❌ No',
    kalshi: '❌ No',
  },
  {
    feature: 'Crowd anchoring',
    baycast: 'Reduced by hidden first forecasts',
    polymarket: 'Possible. Prices can anchor traders',
    metaculus: 'Possible. Community median is visible',
    manifold: 'Possible. Prices can anchor traders',
    kalshi: 'Possible. Prices can anchor traders',
  },
  {
    feature: 'Money-driven manipulation',
    baycast: 'Harder. Forecasts count equally',
    polymarket: 'Possible. Large capital can move prices',
    metaculus: 'Lower. Community median is visible',
    manifold: 'Possible. Large balances can move prices',
    kalshi: 'Possible. Large capital can move prices',
  },
  {
    feature: 'Barrier to entry',
    baycast: 'Email signup',
    polymarket: 'KYC + crypto wallet + funding',
    metaculus: 'Email signup',
    manifold: 'Email signup',
    kalshi: 'KYC + USD funding',
  },
  {
    feature: 'Gambling risk',
    baycast: 'None',
    polymarket: 'High. Real-money wagers',
    metaculus: 'None',
    manifold: 'Low. Play money simulates gambling',
    kalshi: 'High. Real-money wagers',
  },
  {
    feature: 'Regulatory risk',
    baycast: 'Lower. No betting or trading',
    polymarket: 'High. CFTC/SEC scrutiny',
    metaculus: 'None',
    manifold: 'Medium. Varies by jurisdiction',
    kalshi: 'Medium. CFTC-regulated',
  },
  {
    feature: 'Calibration tracking',
    baycast: true,
    polymarket: false,
    metaculus: true,
    manifold: false,
    kalshi: false,
  },
  {
    feature: 'Leaderboard',
    baycast: true,
    polymarket: false,
    metaculus: true,
    manifold: true,
    kalshi: false,
  },
  {
    feature: 'Multi-choice / numeric',
    baycast: false,
    polymarket: false,
    metaculus: true,
    manifold: true,
    kalshi: true,
  },
]

/* ── FAQ data ── */
const faqs = [
  {
    question: 'How is this different from Polymarket?',
    answer:
      'Polymarket is a real-money market where users buy and sell outcome contracts. Baycast is a prediction poll. You submit a probability, the crowd stays hidden until you answer, and your forecast is scored when the outcome is known. No trading, no wagers, no price to move.',
  },
  {
    question: 'Why would I forecast without money?',
    answer:
      'Because accuracy is interesting on its own. Baycast gives you scores, leaderboards, and a record of your forecasts over time, so you can see whether your judgment beats the crowd or AI.',
  },
  {
    question: 'How do you prevent manipulation?',
    answer:
      'Baycast removes the main incentive. There is no market price to push and no payout to win. Forecasts stay hidden at first, and each person counts equally in the consensus.',
  },
  {
    question: 'Is this gambling?',
    answer:
      'No. Gambling involves wagering something of value on an uncertain outcome. Baycast involves no money, no wagers, no entry fees, no prizes, and no financial instruments. You submit a probability estimate and receive a score measuring your accuracy. This is the same methodology used by professional meteorologists and intelligence analysts. The Brier score was developed in 1950 by Glenn Brier specifically for evaluating probabilistic forecasts in a non-gambling context.',
  },
  {
    question: 'How accurate are prediction polls vs. markets?',
    answer:
      'Markets can work, but prices can be noisy and can anchor people. Baycast collects independent forecasts first, then reveals the crowd. That creates a cleaner collective signal.',
  },
  {
    question: 'Can AI participate?',
    answer:
      'Yes. AI models forecast the same questions as humans. They are labeled clearly and scored with the same rules, so the comparison is direct.',
  },
  {
    question: 'Why should I trust Baycast over Metaculus?',
    answer:
      'Metaculus is strong. Baycast is lighter, faster, and built around hidden first forecasts plus human vs AI scoring. It is made for people who want to make a call quickly and track accuracy over time.',
  },
]

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block">
      <circle cx="9" cy="9" r="8" stroke="currentColor" strokeWidth="1.5" fill="none" className="text-accent-green" />
      <path d="M5.5 9l2.5 2.5 4.5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent-green" />
    </svg>
  )
}

function CrossIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block">
      <circle cx="9" cy="9" r="8" stroke="currentColor" strokeWidth="1.5" fill="none" className="text-text-secondary/40" />
      <path d="M6.5 6.5l5 5M11.5 6.5l-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-text-secondary/40" />
    </svg>
  )
}

function renderCell(value: string | boolean) {
  if (typeof value === 'boolean') {
    const label = value ? 'Yes' : 'No'
    return (
      <span className="inline-flex items-center justify-center gap-2">
        {value ? <CheckIcon /> : <CrossIcon />}
        <span>{label}</span>
      </span>
    )
  }
  return <span>{value}</span>
}

export default function ComparePage() {
  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* ── Hero ── */}
      <section className="text-center pt-32 pb-16 md:pt-40 md:pb-20 relative">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-accent-green/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-40 right-1/4 w-[300px] h-[300px] bg-accent-blue/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-outfit font-extrabold leading-tight mb-6 tracking-tight">
            Prediction Polls{' '}
            <span className="text-text-secondary font-light">vs</span>{' '}
            <span className="bg-gradient-to-r from-accent-green to-accent-blue bg-clip-text text-transparent">
              Prediction Markets
            </span>
          </h1>
          <p className="text-text-secondary text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Baycast is for scored forecasts, not trading. You answer first, then see the collective signal from humans and AI without market prices anchoring the result.
          </p>
        </div>
      </section>

      {/* ── Positioning Statement ── */}
      <section className="mb-24">
        <div className="bg-bg-surface border border-border-dark rounded-2xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-accent-green/5 rounded-full blur-[100px] pointer-events-none" />
          <div className="relative">
            <h2 className="text-2xl md:text-3xl font-outfit font-semibold mb-6">
              The basic idea
            </h2>
            <p className="text-text-secondary leading-relaxed mb-6">
              Prediction markets attract capital. That can be useful, but some activity reflects strategy, liquidity, or price movement more than pure forecasting.
            </p>
            <p className="text-text-secondary leading-relaxed mb-6">
              Baycast is built for collective intelligence instead: independent probability forecasts, equal weighting, and scoring based on what actually happens.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <div>
                <h3 className="font-outfit font-semibold text-lg mb-3 text-danger">❌ Prediction Markets</h3>
                <ul className="space-y-3 text-sm text-text-secondary">
                  <li className="flex items-start gap-2">
                    <span className="text-danger mt-0.5">✗</span>
                    <span><strong className="text-text-primary">Whale manipulation</strong>: large capital can move prices regardless of information quality</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-danger mt-0.5">✗</span>
                    <span><strong className="text-text-primary">Herding bias</strong>: visible prices can anchor late forecasters on the crowd</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-danger mt-0.5">✗</span>
                    <span><strong className="text-text-primary">High barriers</strong>: KYC, wallets, and funding requirements exclude many people</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-danger mt-0.5">✗</span>
                    <span><strong className="text-text-primary">Regulatory risk</strong>: legal status depends on the market and country</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-outfit font-semibold text-lg mb-3 text-accent-green">✅ Prediction Polls (Baycast)</h3>
                <ul className="space-y-3 text-sm text-text-secondary">
                  <li className="flex items-start gap-2">
                    <span className="text-accent-green mt-0.5">✓</span>
                    <span><strong className="text-text-primary">Equal weighting</strong>: every forecaster contributes to the collective signal</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent-green mt-0.5">✓</span>
                    <span><strong className="text-text-primary">Blind consensus</strong>: independent forecasts reduce herding before the crowd view appears</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent-green mt-0.5">✓</span>
                    <span><strong className="text-text-primary">Low friction</strong>: email signup, no money, no crypto</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent-green mt-0.5">✓</span>
                    <span><strong className="text-text-primary">Proper scoring</strong>: Brier scores reward calibrated judgment, not trading skill</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Feature Comparison Table ── */}
      <section className="mb-24">
        <h2 className="text-2xl md:text-3xl font-outfit font-semibold text-center mb-4">
          Full comparison
        </h2>
        <p className="text-text-secondary text-center mb-12 max-w-2xl mx-auto">
          How Baycast compares with the main prediction platforms.
        </p>

        <div className="overflow-x-auto -mx-4 px-4">
          <table className="w-full bg-bg-surface border border-border-dark rounded-xl overflow-hidden text-sm min-w-[800px]">
            <thead>
              <tr className="border-b border-border-dark bg-bg-primary">
                <th className="text-left px-4 py-4 font-outfit font-semibold text-text-primary sticky left-0 bg-bg-primary z-10">Feature</th>
                <th className="text-center px-4 py-4 font-outfit font-semibold text-accent-green">
                  <span className="block text-xs font-mono text-text-secondary mb-1">PREDICTION POLL</span>
                  Baycast
                </th>
                <th className="text-center px-4 py-4 font-outfit font-semibold text-text-secondary">
                  <span className="block text-xs font-mono text-text-secondary/60 mb-1">MARKET</span>
                  Polymarket
                </th>
                <th className="text-center px-4 py-4 font-outfit font-semibold text-text-secondary">
                  <span className="block text-xs font-mono text-text-secondary/60 mb-1">ACADEMIC</span>
                  Metaculus
                </th>
                <th className="text-center px-4 py-4 font-outfit font-semibold text-text-secondary">
                  <span className="block text-xs font-mono text-text-secondary/60 mb-1">PLAY MONEY</span>
                  Manifold
                </th>
                <th className="text-center px-4 py-4 font-outfit font-semibold text-text-secondary">
                  <span className="block text-xs font-mono text-text-secondary/60 mb-1">REGULATED</span>
                  Kalshi
                </th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              {comparisonRows.map((row, i) => (
                <tr key={row.feature} className={`border-b border-border-dark last:border-b-0 ${i % 2 === 0 ? 'bg-bg-surface' : 'bg-bg-primary'}`}>
                  <td className="px-4 py-3.5 font-medium text-text-primary sticky left-0 z-10 bg-inherit">{row.feature}</td>
                  <td className="px-4 py-3.5 text-center text-accent-green">{renderCell(row.baycast)}</td>
                  <td className="px-4 py-3.5 text-center">{renderCell(row.polymarket)}</td>
                  <td className="px-4 py-3.5 text-center">{renderCell(row.metaculus)}</td>
                  <td className="px-4 py-3.5 text-center">{renderCell(row.manifold)}</td>
                  <td className="px-4 py-3.5 text-center">{renderCell(row.kalshi)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Key Differentiators ── */}
      <section className="mb-24">
        <h2 className="text-2xl md:text-3xl font-outfit font-semibold text-center mb-4">
          What makes Baycast different
        </h2>
        <p className="text-text-secondary text-center mb-12 max-w-2xl mx-auto">
          The mechanics that turn forecasts into useful collective intelligence.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              number: '01',
              title: 'Blind consensus',
              description: 'Forecasts stay hidden until you submit yours. That protects independent judgment and creates a cleaner collective signal.',
              icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7S2 12 2 12z" stroke="currentColor" strokeWidth="1.5" fill="none" className="text-accent-green" />
                  <line x1="7" y1="7" x2="17" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-accent-green" />
                  <line x1="17" y1="7" x2="7" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-accent-green" />
                </svg>
              ),
            },
            {
              number: '02',
              title: 'No betting or trading',
              description: 'Baycast has no wagers, no contracts, and no financial instruments. You forecast. The system scores accuracy.',
              icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" fill="none" className="text-accent-green" />
                  <path d="M8 12l3 3 5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent-green" />
                </svg>
              ),
            },
            {
              number: '03',
              title: 'Scored forecasts',
              description: 'Brier and log scores reward calibrated forecasts. Guessing wildly hurts your record over time.',
              icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 3v18h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent-green" />
                  <path d="M7 16l4-6 4 3 5-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent-green" />
                </svg>
              ),
            },
            {
              number: '04',
              title: 'Human and AI forecasting',
              description: 'Humans and AI models answer the same questions, creating a shared benchmark for collective and machine intelligence.',
              icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.5" fill="none" className="text-accent-green" />
                  <circle cx="9" cy="10" r="1.5" fill="currentColor" className="text-accent-green" />
                  <circle cx="15" cy="10" r="1.5" fill="currentColor" className="text-accent-green" />
                  <path d="M9 15c1 1 5 1 6 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-accent-green" />
                </svg>
              ),
            },
            {
              number: '05',
              title: 'Simple interface, serious scoring',
              description: 'The product stays simple, but the scoring is real. You can start fast and still build a useful track record.',
              icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none" className="text-accent-green" />
                  <path d="M2 17l10 5 10-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent-green" />
                  <path d="M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent-green" />
                </svg>
              ),
            },
          ].map((item) => (
            <div key={item.number} className="bg-bg-surface border border-border-dark rounded-xl p-6 md:p-8 hover:border-accent-green/20 transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-accent-green/10 border border-accent-green/30 flex items-center justify-center shrink-0">
                  {item.icon}
                </div>
                <div>
                  <div className="text-xs font-mono text-text-secondary/40 mb-1">{item.number}</div>
                  <h3 className="font-outfit font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="mb-24">
        <h2 className="text-2xl md:text-3xl font-outfit font-semibold text-center mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-text-secondary text-center mb-12 max-w-lg mx-auto">
          Common questions about Baycast, prediction markets, and crowd forecasting.
        </p>

        <div className="space-y-4 max-w-3xl mx-auto">
          {faqs.map((faq) => (
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
            Forecast for free. No tokens. No financial risk. Build your accuracy record and add your signal to the collective forecast.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/auth/signup"
              className="px-10 py-4 rounded-xl bg-gradient-to-r from-accent-green to-emerald-600 text-white font-bold text-lg hover:from-accent-green hover:to-emerald-500 transition-all shadow-lg shadow-accent-green/20 hover:shadow-accent-green/40 hover:-translate-y-0.5"
            >
              Start forecasting for free
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
