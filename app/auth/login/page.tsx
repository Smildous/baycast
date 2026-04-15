import AuthForm from '@/components/AuthForm'
import Link from 'next/link'

export default function LoginPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-outfit font-bold mb-2">Connexion</h1>
          <p className="text-text-secondary">
            Pas encore de compte ?{' '}
            <Link href="/auth/signup" className="text-accent-green hover:underline">
              Créer un compte
            </Link>
          </p>
        </div>
        <AuthForm mode="login" />
      </div>
    </div>
  )
}
