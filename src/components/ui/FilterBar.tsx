import { useId } from 'react'
import { X } from 'lucide-react'
import s from './Form.module.css'

export type Filter = {
  id: string
  label: string
  value: string
  options: { value: string; label: string }[]
  onChange: (value: string) => void
}

/** A row of labelled selects. The empty value means "all". */
export function FilterBar({ filters, onReset }: { filters: Filter[]; onReset?: () => void }) {
  const base = useId()
  const active = filters.some((f) => f.value)
  return (
    <div className={s.filterBar} role="group" aria-label="Filters">
      {filters.map((f) => (
        <div key={f.id} className={s.filter}>
          <label className="label" htmlFor={base + f.id}>{f.label}</label>
          <select id={base + f.id} className={s.select} value={f.value} onChange={(e) => f.onChange(e.target.value)}>
            <option value="">All</option>
            {f.options.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      ))}
      {onReset && active && (
        <button type="button" className={s.reset} onClick={onReset}>
          <X size={14} aria-hidden /> Clear filters
        </button>
      )}
    </div>
  )
}
