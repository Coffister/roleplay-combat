import { useEffect, useRef, type ReactNode } from 'react'
import s from './Modal.module.css'

type ModalProps = {
  open: boolean
  onClose: () => void
  /** Accessible name. */
  label: string
  variant?: 'center' | 'fullscreen'
  children: ReactNode
}

/** Native <dialog>: focus trapping, Esc to close and inert background come for free. */
export function Modal({ open, onClose, label, variant = 'center', children }: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (open && !d.open) d.showModal()
    if (!open && d.open) d.close()
  }, [open])

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : ''
    return () => { document.documentElement.style.overflow = '' }
  }, [open])

  return (
    <dialog
      ref={ref}
      aria-label={label}
      className={`${s.dialog} ${s[variant]}`}
      onClose={onClose}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {children}
    </dialog>
  )
}
