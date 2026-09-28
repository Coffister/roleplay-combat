import type { ReactNode } from 'react'
import type { Status } from '../../types'
import s from './Badge.module.css'

type Tone = 'default' | 'primary' | 'accent' | 'outline'

export function Badge({ tone = 'default', children, className }: { tone?: Tone; children: ReactNode; className?: string }) {
  return <span className={[s.badge, s[tone], className].filter(Boolean).join(' ')}>{children}</span>
}

const statusText: Record<Status, string> = { upcoming: 'Nadcházející', live: 'Živě', completed: 'Ukončeno' }

export function StatusBadge({ status }: { status: Status }) {
  return (
    <Badge tone={status === 'live' ? 'primary' : status === 'upcoming' ? 'outline' : 'default'}>
      {status === 'live' && <span className={s.dot} aria-hidden />}
      {statusText[status]}
    </Badge>
  )
}
