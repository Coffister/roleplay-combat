import { useId, useRef, type KeyboardEvent } from 'react'
import { motion } from 'motion/react'
import s from './Tabs.module.css'

export type TabItem = { id: string; label: string; count?: number }

type TabsProps = {
  items: TabItem[]
  value: string
  onChange: (id: string) => void
  /** Accessible name for the tab list. */
  label: string
  /** id of the element the tabs control. */
  controls: string
  size?: 'md' | 'lg'
}

/** Accessible tabs with roving focus and a sliding indicator (Aceternity-style animated tabs). */
export function Tabs({ items, value, onChange, label, controls, size = 'md' }: TabsProps) {
  const layoutId = useId()
  const refs = useRef<(HTMLButtonElement | null)[]>([])

  function onKeyDown(e: KeyboardEvent, i: number) {
    const last = items.length - 1
    const next = { ArrowRight: i === last ? 0 : i + 1, ArrowLeft: i === 0 ? last : i - 1, Home: 0, End: last }[e.key]
    if (next === undefined) return
    e.preventDefault()
    onChange(items[next].id)
    refs.current[next]?.focus()
  }

  return (
    <div role="tablist" aria-label={label} className={`${s.list} ${s[size]}`}>
      {items.map((item, i) => {
        const selected = item.id === value
        return (
          <button
            key={item.id}
            ref={(el) => { refs.current[i] = el }}
            role="tab"
            type="button"
            aria-selected={selected}
            aria-controls={controls}
            tabIndex={selected ? 0 : -1}
            className={s.tab}
            onClick={() => onChange(item.id)}
            onKeyDown={(e) => onKeyDown(e, i)}
          >
            {item.label}
            {item.count !== undefined && <span className={s.count}>{item.count}</span>}
            {selected && <motion.span layoutId={layoutId} className={s.indicator} transition={{ type: 'spring', bounce: 0.15, duration: 0.45 }} />}
          </button>
        )
      })}
    </div>
  )
}
