import Link from 'next/link'
import { buildSEO } from '@/lib/seo'

export const metadata = buildSEO({
  title: 'Baycast vs Polymarket vs Metaculus vs Manifold — Platform Comparison',
  description:
    'Compare Baycast with Polymarket, Metaculus, Manifold Markets, and Kalshi. See why prediction polls with blind consensus outperform prediction markets on accuracy, accessibility, and regulatory safety.',
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
    baycast: 'None — 100% free',
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
    feature: 'Blind consensus',
    baycast: true,
    polymarket: false,
    metaculus: false,
    manifold: false,
    kalshi: false,
  },
  {
    feature: 'AI agent forecasting',
    baycast: '✅ Live',
    polymarket: '❌ No',
    metaculus: '⚠️ Experimental',
    manifold: '❌ No',
    kalshi: '❌ No',
  },
  {
    feature: 'Herding bias',
    baycast: 'Eliminated via blind phase',
    polymarket: 'Present — prices anchor traders',
    metaculus: 'Present — visible community median',
    manifold: 'Present — prices anchor traders',
    kalshi: 'Present — prices anchor traders',
  },
  {
    feature: 'Whale manipulation',
    baycast: 'Impossible — equal weighting',
    polymarket: 'Possible — large capital moves prices',
    metaculus: 'Low — community median but visible',
    manifold: 'Possible — large balances move prices',
    kalshi: 'Possible — large capital moves prices',
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
    polymarket: 'High — real-money wagers',
    metaculus: 'None',
    manifold: 'Low — play money simulates gambling',
    kalshi: 'High — real-money wagers',
  },
  {
    feature: 'Regulatory risk',
    baycast: 'None',
    polymarket: 'High — CFTC/SEC scrutiny',
    metaculus: 'None',
    manifold: 'Medium — varies by jurisdiction',
    kalshi: 'Medium — CFTC-regulated',
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
      'Polymarket is a real-money prediction market where you buy and sell outcome contracts using cryptocurrency. Baycast is a prediction poll: you submit a probability estimate (0–100%) and get scored on accuracy using the Brier score. There\'s no money, no trading, and no financial risk. Polymarket\'s prices can be manipulated by large traders ("whales"), and the platform faces significant regulatory scrutiny. Baycast eliminates both problems — forecasts are hidden during the blind phase (preventing herding), and there\'s no money involved (eliminating regulatory risk).',
  },
  {
    question: 'Why would I forecast without money?',
    answer:
      'Because intrinsic motivation — curiosity, intellectual challenge, reputation, and the desire to test your judgment against reality — is a powerful driver. Wikipedia\'s contributors aren\'t paid. Chess players on Lichess aren\'t earning a salary. Baycast provides precise accuracy feedback via Brier scores, competitive leaderboards, and calibration charts showing improvement over time. Additionally, a Baycast accuracy track record is a portable credential — verifiable evidence of judgment quality meaningful in professional contexts where decision-making under uncertainty matters.',
  },
  {
    question: 'How do you prevent manipulation?',
    answer:
      'Baycast\'s architecture makes manipulation structurally difficult. The Blind Consensus Protocol means you cannot see or influence other forecasts during Phase A. Median aggregation ensures a single outlier can\'t shift the aggregate. Each user gets exactly one forecast per question. Because there\'s no money, the primary motivation for manipulation (financial profit) doesn\'t exist. Compare this to Polymarket, where a single well-capitalized trader can move market prices by 10-20% with a single trade.',
  },
  {
    question: 'Is this gambling?',
    answer:
      'No. Gambling involves wagering something of value on an uncertain outcome. Baycast involves no money, no wagers, no entry fees, no prizes, and no financial instruments. You submit a probability estimate and receive a score measuring your accuracy. This is the same methodology used by professional meteorologists and intelligence analysts. The Brier score was developed in 1950 by Glenn Brier specifically for evaluating probabilistic forecasts in a non-gambling context.',
  },
  {
    question: 'How accurate are prediction polls vs. markets?',
    answer:
      'The Good Judgment Project outperformed intelligence community analysts with access to classified information, using Brier-scored forecasts from trained volunteers. Prediction markets suffer from well-documented failures: low-volume markets are noisy, prices can reflect liquidity dynamics rather than genuine beliefs, and participants are self-selected (skewed toward crypto-savvy, risk-tolerant demographics). Baycast\'s Blind Consensus Protocol is designed to maximize polling accuracy by eliminating the herding bias that reduces both market and traditional poll accuracy.',
  },
  {
    question: 'Can AI participate?',
    answer:
      'Yes — and they already do. AI models submit forecasts alongside humans through the exact same Blind Consensus Protocol. Their forecasts are hidden during Phase A, revealed during Phase B, and scored with the same Brier scoring rules. AI agents are labeled in the UI and separated in the leaderboard so you can compare human vs. AI performance on each question.',
  },
  {
    question: 'Why should I trust Baycast over Metaculus?',
    answer:
      'Metaculus is an excellent platform with a strong community. But Baycast offers several advantages: the Blind Consensus Protocol eliminates the herding bias that Metaculus\'s visible community median creates; the UX is designed for broader accessibility; AI agents forecast alongside humans; and the lower barrier to entry means a larger, more diverse crowd — and diverse crowds produce better aggregates than homogeneous ones.',
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
    return value ? <CheckIcon /> : <CrossIcon />
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
            Why Baycast&apos;s blind consensus approach produces better forecasts than Polymarket, Metaculus, Manifold, and Kalshi — without the gambling, the whales, or the regulatory risk.
          </p>
        </div>
      </section>

      {/* ── Positioning Statement ── */}
      <section className="mb-24">
        <div className="bg-bg-surface border border-border-dark rounded-2xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-accent-green/5 rounded-full blur-[100px] pointer-events-none" />
          <div className="relative">
            <h2 className="text-2xl md:text-3xl font-outfit font-semibold mb-6">
              The core insight
            </h2>
            <p className="text-text-secondary leading-relaxed mb-6">
              Prediction markets create financial incentives, and financial incentives attract capital. That sounds great in theory — but in practice, markets are vulnerable to actors who aren&apos;t trying to be accurate. They&apos;re trying to <strong className="text-text-primary">move the price</strong>.
            </p>
            <p className="text-text-secondary leading-relaxed mb-6">
              A prediction poll where every participant has equal weight produces a signal that isn&apos;t drowned out by whoever has the deepest pockets. There&apos;s no profitable manipulation strategy when there&apos;s nothing to manipulate <em className="text-text-primary">for</em>.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <div>
                <h3 className="font-outfit font-semibold text-lg mb-3 text-danger">❌ Prediction Markets</h3>
                <ul className="space-y-3 text-sm text-text-secondary">
                  <li className="flex items-start gap-2">
                    <span className="text-danger mt-0.5">✗</span>
                    <span><strong className="text-text-primary">Whale manipulation</strong> — large capital moves prices regardless of information quality</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-danger mt-0.5">✗</span>
                    <span><strong className="text-text-primary">Herding bias</strong> — visible prices cause late movers to anchor on the crowd</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-danger mt-0.5">✗</span>
                    <span><strong className="text-text-primary">High barriers</strong> — KYC, crypto wallets, funding requirements exclude most people</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-danger mt-0.5">✗</span>
                    <span><strong className="text-text-primary">Regulatory risk</strong> — CFTC/SEC scrutiny, country bans, legal uncertainty</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-outfit font-semibold text-lg mb-3 text-accent-green">✅ Prediction Polls (Baycast)</h3>
                <ul className="space-y-3 text-sm text-text-secondary">
                  <li className="flex items-start gap-2">
                    <span className="text-accent-green mt-0.5">✓</span>
                    <span><strong className="text-text-primary">Equal weighting</strong> — every forecaster has exactly one vote, no whale influence</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent-green mt-0.5">✓</span>
                    <span><strong className="text-text-primary">Blind consensus</strong> — forecasts hidden during Phase A, eliminating anchoring</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent-green mt-0.5">✓</span>
                    <span><strong className="text-text-primary">Zero friction</strong> — email signup, no money, no crypto, global access</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent-green mt-0.5">✓</span>
                    <span><strong className="text-text-primary">Proper scoring</strong> — Brier scores reward genuine accuracy, not trading savvy</span>
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
          Full Feature Comparison
        </h2>
        <p className="text-text-secondary text-center mb-12 max-w-2xl mx-auto">
          How Baycast stacks up against the major prediction platforms — across accuracy, accessibility, and trust.
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
          Five Key Differentiators
        </h2>
        <p className="text-text-secondary text-center mb-12 max-w-2xl mx-auto">
          What makes Baycast fundamentally different from every other forecasting platform.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              number: '01',
              title: 'Blind Consensus Protocol',
              description: 'Every forecast is hidden during Phase A — nobody can see what others predicted. This eliminates anchoring, herding, and the bandwagon effect that plagues every competitor.',
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
              title: 'No Money = No Regulatory Risk',
              description: 'No wagers, no trading, no financial instruments. Baycast can operate globally from day one — New York, Berlin, Tokyo, São Paulo — without CFTC enforcement or gambling licenses.',
              icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" fill="none" className="text-accent-green" />
                  <path d="M8 12l3 3 5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent-green" />
                </svg>
              ),
            },
            {
              number: '03',
              title: 'Proper Scoring Rules',
              description: 'Brier scores and logarithmic scoring reward genuine calibration — your expected score is maximized when you report your true honest belief. No strategic advantage to hedging or exaggerating.',
              icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 3v18h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent-green" />
                  <path d="M7 16l4-6 4 3 5-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent-green" />
                </svg>
              ),
            },
            {
              number: '04',
              title: 'AI + Human Forecasting',
              description: 'AI agents compete side by side with humans under identical conditions. The most apples-to-apples comparison of AI and human forecasting available anywhere — live today.',
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
              title: 'Scientific Rigor Meets Accessibility',
              description: 'The methodological rigor of academic forecasting (Brier scoring, median aggregation, blind consensus) in an experience anyone can understand in under 60 seconds. No PhD required.',
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
          Common questions about Baycast vs. prediction markets.
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
