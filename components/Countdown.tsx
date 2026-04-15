import { daysRemaining } from '@/lib/utils'
import type { QuestionStatus } from '@/lib/types'

interface Props {
  closesAt: string
  status: QuestionStatus
}

export default function Countdown({ closesAt, status }: Props) {
  if (status === 'resolved') {
    return (
      <span className="text-xs px-2 py-0.5 rounded-full bg-accent-blue/10 text-accent-blue border border-accent-blue/30">
        Resolved
      </span>
    )
  }
  if (status === 'closed') {
    return (
      <span className="text-xs px-2 py-0.5 rounded-full bg-border-dark text-text-secondary border border-border-dark">
        Closed
      </span>
    )
  }

  const days = daysRemaining(closesAt)

  if (days === 0) {
    return (
      <span className="text-xs px-2 py-0.5 rounded-full bg-danger/10 text-danger border border-danger/30">
        Closes today
      </span>
    )
  }

  const color =
    days <= 3
      ? 'bg-danger/10 text-danger border-danger/30'
      : days <= 7
      ? 'bg-yellow-900/30 text-yellow-400 border-yellow-800/50'
      : 'bg-success/10 text-success border-success/30'

  return (
    <span className={`text-xs px-2 py-0.5 rounded-full border font-mono ${color}`}>
      {days}d left
    </span>
  )
}
