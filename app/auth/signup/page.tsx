import type { Metadata } from 'next'
import Link from 'next/link'
import AuthForm from '@/components/AuthForm'
import { normalizeCategory } from '@/lib/types'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  title: 'Sign up - Baycast',
}

export const dynamic = 'force-dynamic'

interface FeaturedQuestionPreview {
  id: string
  title: string
  category: string
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
    title: 'Independent first calls',
    description: 'Answer before you see the crowd, so the collective signal starts with real independent judgment.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 3v18h18" stroke="#0F9D58" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M7 16l4-6 4 4 5-8" stroke="#0F9D58" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <circle cx="20" cy="6" r="1.5" fill="#0F9D58" />
      </svg>
    ),
    title: 'Accuracy scoring',
    description: 'Brier and log scores track how accurate you are over time.',
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
    title: 'Human and AI intelligence',
    description: 'Forecast the same questions as AI models and see which signals perform best over time.',
  },
]

async function getFeaturedQuestions(): Promise<FeaturedQuestionPreview[]> {
  const supabase = createClient()
  const { data } = await supabase
    .from('questions')
    .select('id, title, category, closes_at')
    .eq('status', 'open')
    .gte('closes_at', new Date().toISOString())
    .order('closes_at', { ascending: true })
    .limit(3)

  return (data ?? []).map((question) => ({
    id: question.id,
    title: question.title,
    category: normalizeCategory(question.category),
  }))
}

export default async function SignupPage() {
  const featuredQuestions = await getFeaturedQuestions()

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* ── Top section: Form + Value Props side-by-side on desktop ── */}
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left column: Signup form */}
          <div>
            <div className="text-center lg:text-left mb-8">
              <h1 className="text-3xl md:text-4xl font-outfit font-bold mb-3">Start forecasting with Baycast</h1>
              <p className="text-lg text-text-secondary leading-relaxed">
                Make predictions on real events, see how you compare with humans and AI, and contribute to collective intelligence.{' '}
                <span className="text-text-primary font-medium">No gambling. Just forecasts and scores.</span>
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

          {/* Right column: Value propositions + Questions open now */}
          <div className="space-y-10">
            {/* Value Props */}
            <div>
              <h2 className="text-xl font-outfit font-semibold mb-6 text-text-primary">
                Why Baycast forecasts are different
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
                  Questions open now
                </h2>
                <Link
                  href="/questions"
                  className="text-accent-blue hover:underline text-sm font-medium whitespace-nowrap"
                >
                  View all →
                </Link>
              </div>

              {featuredQuestions.length > 0 ? (
                <div className="space-y-3">
                  {featuredQuestions.map((question) => (
                    <Link
                      key={question.id}
                      href={`/questions/${question.id}`}
                      className="block bg-bg-surface border border-border-dark rounded-xl p-5 hover:border-accent-green/20 transition-colors"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs px-2 py-0.5 rounded-full border border-border-dark text-text-secondary">
                          {question.category}
                        </span>
                      </div>
                      <p className="text-text-primary text-sm font-medium leading-snug line-clamp-2">
                        {question.title}
                      </p>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="bg-bg-surface border border-border-dark rounded-xl p-5">
                  <p className="text-text-primary text-sm font-medium mb-1">
                    No live featured questions yet.
                  </p>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    New featured questions are coming. Browse all questions to see what is open now.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
