import AuthForm from '@/components/AuthForm'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign Up — Baycast | Prediction Polling Platform',
}

// --- Value proposition data ---
const valueProps = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="#0F9D58" strokeWidth="1.5" fill="none" />
        <circle cx="12" cy="12" r="5" stroke="#0F9D58" strokeWidth="1.5" fill="none" />
        <circle cx="12" cy="12" r="1.5" fill="#0F9D58" />
        <line x1="12" y1="2" x2="12" y2="7" stroke="#0F9D58" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="12" y1="17" x2="12" y2="22" stroke="#0F9D58" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="2" y1="12" x2="7" y2="12" stroke="#0F9D58" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="17" y1="12" x2="22" y2="12" stroke="#0F9D58" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: 'Blind Consensus',
    description: 'Forecast without seeing the crowd. Proven 25% more accurate than prediction markets.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 3v18h18" stroke="#0F9D58" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M7 16l4-6 4 4 5-8" stroke="#0F9D58" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <circle cx="20" cy="6" r="1.5" fill="#0F9D58" />
      </svg>
    ),
    title: 'Proper Scoring',
    description: 'Brier + logarithmic scores track your real forecasting skill over time.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="3" width="9" height="18" rx="2" stroke="#0F9D58" strokeWidth="1.5" fill="none" />
        <rect x="13" y="3" width="9" height="18" rx="2" stroke="#4285F4" strokeWidth="1.5" fill="none" />
        <circle cx="6.5" cy="17" r="1.5" fill="#0F9D58" />
        <circle cx="17.5" cy="17" r="1.5" fill="#4285F4" />
        <line x1="6.5" y1="6" x2="6.5" y2="14" stroke="#0F9D58" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="17.5" y1="6" x2="17.5" y2="14" stroke="#4285F4" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: 'Human vs AI',
    description: 'Compete against AI agents on the same questions. The ultimate forecasting benchmark.',
  },
]

// --- Featured questions (hardcoded, no Supabase) ---
const featuredQuestions = [
  {
    category: 'Geopolitics',
    title: 'Will there be a ceasefire agreement in the Ukraine-Russia conflict before September 2025?',
    forecasterLabel: '142 forecasters',
  },
  {
    category: 'Technology',
    title: 'Will OpenAI release GPT-5 with demonstrated agentic capabilities before Q4 2025?',
    forecasterLabel: '98 forecasters',
  },
  {
    category: 'Science',
    title: 'Will a new drug receive FDA breakthrough therapy designation for Alzheimer\'s in 2025?',
    forecasterLabel: '67 forecasters',
  },
]

export default function SignupPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* ── Top section: Form + Value Props side-by-side on desktop ── */}
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left column: Signup form */}
          <div>
            <div className="text-center lg:text-left mb-8">
              <h1 className="text-3xl md:text-4xl font-outfit font-bold mb-3">Join Baycast</h1>
              <p className="text-lg text-text-secondary leading-relaxed">
                Forecast the future. Score your accuracy.{' '}
                <span className="text-text-primary font-medium">No gambling, just intelligence.</span>
              </p>
              <p className="text-text-secondary text-sm mt-3">
                Already a member?{' '}
                <Link href="/auth/login" className="text-accent-green hover:underline">
                  Log in
                </Link>
              </p>
            </div>
            <AuthForm mode="signup" />
          </div>

          {/* Right column: Value propositions + Featured questions */}
          <div className="space-y-10">
            {/* Value Props */}
            <div>
              <h2 className="text-xl font-outfit font-semibold mb-6 text-text-primary">
                Why forecasters choose Baycast
              </h2>
              <div className="space-y-5">
                {valueProps.map((prop) => (
                  <div
                    key={prop.title}
                    className="flex gap-4 items-start bg-bg-surface border border-border-dark rounded-xl p-5 hover:border-accent-green/20 transition-colors"
                  >
                    <div className="shrink-0 mt-0.5">{prop.icon}</div>
                    <div>
                      <h3 className="font-outfit font-semibold text-text-primary mb-1">{prop.title}</h3>
                      <p className="text-text-secondary text-sm leading-relaxed">{prop.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Featured Questions Preview */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-outfit font-semibold text-text-primary">
                  Featured Questions
                </h2>
                <Link
                  href="/questions"
                  className="text-accent-blue hover:underline text-sm font-medium whitespace-nowrap"
                >
                  View all →
                </Link>
              </div>
              <div className="space-y-3">
                {featuredQuestions.map((q) => (
                  <div
                    key={q.title}
                    className="bg-bg-surface border border-border-dark rounded-xl p-5 hover:border-accent-green/20 transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs px-2 py-0.5 rounded-full border border-border-dark text-text-secondary">
                        {q.category}
                      </span>
                    </div>
                    <p className="text-text-primary text-sm font-medium leading-snug mb-2 line-clamp-2">
                      {q.title}
                    </p>
                    <p className="text-text-secondary text-xs">{q.forecasterLabel}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
