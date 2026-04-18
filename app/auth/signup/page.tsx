import AuthForm from '@/components/AuthForm'
import Link from 'next/link'

export default function SignupPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-outfit font-bold mb-2">Join Baycast</h1>
          <p className="text-text-secondary mb-2">
            Start forecasting and discover how well-calibrated your judgment really is.
          </p>
          <p className="text-text-secondary text-sm">
            Already a member?{' '}
            <Link href="/auth/login" className="text-accent-green hover:underline">
              Log in
            </Link>
          </p>
        </div>
        <AuthForm mode="signup" />
      </div>
    </div>
  )
}
