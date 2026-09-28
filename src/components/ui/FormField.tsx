import { useId, type ReactNode } from 'react'
import s from './Form.module.css'

export type FieldControlProps = {
  id: string
  'aria-describedby'?: string
  'aria-invalid'?: boolean
}

type FormFieldProps = {
  label: string
  required?: boolean
  hint?: string
  error?: string
  /** Receives the id/aria wiring for the control. */
  children: (props: FieldControlProps) => ReactNode
  className?: string
}

export function FormField({ label, required, hint, error, children, className }: FormFieldProps) {
  const id = useId()
  const hintId = hint ? id + '-hint' : undefined
  const errorId = error ? id + '-error' : undefined
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined
  return (
    <div className={[s.field, error && s.invalid, className].filter(Boolean).join(' ')}>
      <label htmlFor={id} className={s.fieldLabel}>
        {label}
        {required ? <span aria-hidden className={s.req}>*</span> : <span className={s.optional}>Nepovinné</span>}
      </label>
      {children({ id, 'aria-describedby': describedBy, 'aria-invalid': error ? true : undefined })}
      {hint && <p id={hintId} className={s.hint}>{hint}</p>}
      {error && <p id={errorId} className={s.error}>{error}</p>}
    </div>
  )
}

export const inputClass = s.input
export const selectClass = s.select
