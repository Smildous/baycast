import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 text-center">
      <div className="text-6xl font-mono font-bold text-accent-green mb-4">404</div>
      <h1 className="text-2xl font-outfit font-semibold mb-2">Page not found</h1>
      <p className="text-text-secondary mb-8">This page doesn&apos;t exist or has been moved.</p>
      <Link
        href="/"
        className="px-6 py-2.5 rounded-lg bg-accent-green text-white font-semibold hover:bg-accent-green/90 transition-colors"
      >
        Back to home
      </Link>
    </div>
  )
}
