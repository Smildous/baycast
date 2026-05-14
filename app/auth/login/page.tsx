import AuthForm from '@/components/AuthForm'
import Link from 'next/link'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Log In — Baycast | Prediction Polling Platform',
}

export default function LoginPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-outfit font-bold mb-2">Welcome back</h1>
          <p className="text-text-secondary">
            New to Baycast?{' '}
            <Link href="/auth/signup" className="text-accent-green hover:underline">
              Join for free
            </Link>
          </p>
          <ul className="mx-auto mt-4 max-w-sm list-disc space-y-2 pl-5 text-left text-sm text-text-secondary">
            <li>Save your forecasts and revisit them anytime.</li>
            <li>See blind consensus and compare after you forecast.</li>
          </ul>
        </div>
        <AuthForm mode="login" />
        <p className="text-center text-text-secondary text-sm mt-4">
          <Link href="/auth/reset-password" className="text-accent-green hover:underline">
            Forgot password?
          </Link>
        </p>
      </div>
    </div>
  )
}
