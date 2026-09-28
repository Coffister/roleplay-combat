import { useEffect, useState } from 'react'
import { formatDateLong, formatTime, pad2 } from '../../lib/format'
import s from './event.module.css'

function remaining(target: number) {
  const ms = Math.max(0, target - Date.now())
  return {
    done: ms === 0,
    units: [
      { label: 'Days', value: Math.floor(ms / 86_400_000) },
      { label: 'Hours', value: Math.floor(ms / 3_600_000) % 24 },
      { label: 'Min', value: Math.floor(ms / 60_000) % 60 },
      { label: 'Sec', value: Math.floor(ms / 1000) % 60 },
    ],
  }
}

/** Ticking countdown. Digits are hidden from screen readers; they get the date instead. */
export function Countdown({ date, size = 'md' }: { date: string; size?: 'md' | 'lg' }) {
  const target = new Date(date).getTime()
  const [state, setState] = useState(() => remaining(target))

  useEffect(() => {
    const id = setInterval(() => setState(remaining(target)), 1000)
    return () => clearInterval(id)
  }, [target])

  if (state.done) return <p className={s.countdownDone}>Fight night is here</p>

  return (
    <div className={`${s.countdown} ${s[`countdown-${size}`]}`}>
      <p className="sr-only">Starts {formatDateLong(date)} at {formatTime(date)}</p>
      <div aria-hidden className={s.units}>
        {state.units.map((u) => (
          <div key={u.label} className={s.unit}>
            <span className={`${s.unitValue} tabular`}>{pad2(u.value)}</span>
            <span className={s.unitLabel}>{u.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
