export default function Loading() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-accent-green border-t-transparent rounded-full animate-spin" />
        <span className="text-text-secondary text-sm">Loading...</span>
      </div>
    </div>
  )
}
