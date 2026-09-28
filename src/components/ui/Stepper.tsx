import { Check } from 'lucide-react'
import s from './Stepper.module.css'

export function Stepper({ steps, current }: { steps: string[]; current: number }) {
  return (
    <ol className={s.stepper} aria-label="Registration progress">
      {steps.map((label, i) => {
        const state = i < current ? 'done' : i === current ? 'current' : 'todo'
        return (
          <li key={label} className={`${s.step} ${s[state]}`} aria-current={state === 'current' ? 'step' : undefined}>
            <span className={s.num}>{state === 'done' ? <Check size={14} aria-hidden /> : String(i + 1).padStart(2, '0')}</span>
            <span className={s.text}>
              <span className="sr-only">Step {i + 1}: </span>
              {label}
              {state === 'done' && <span className="sr-only"> (completed)</span>}
            </span>
          </li>
        )
      })}
    </ol>
  )
}
