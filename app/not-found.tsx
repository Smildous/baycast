import Link from 'next/link'
import { SearchX } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4" style={{ backgroundColor: '#0f172a' }}>
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <div className="rounded-full bg-red-500/10 p-6">
            <SearchX className="w-16 h-16 text-red-400" />
          </div>
        </div>
        <h1 className="text-6xl font-outfit font-bold text-white mb-4">404</h1>
        <p className="text-xl text-slate-300 mb-8">Page not found</p>
        <p className="text-slate-400 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg bg-accent-green px-6 py-3 font-medium text-white transition-colors hover:bg-accent-green/90"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  )
}
