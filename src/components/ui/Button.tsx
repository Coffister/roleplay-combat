import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link, type LinkProps } from 'react-router'
import s from './Button.module.css'

type Variant = 'primary' | 'outline' | 'ghost'
type Size = 'md' | 'lg'

type StyleProps = {
  variant?: Variant
  size?: Size
  /** Animated running border (hero CTA only). */
  moving?: boolean
  children: ReactNode
}

const cls = ({ variant = 'primary', size = 'md', moving }: Omit<StyleProps, 'children'>, extra?: string) =>
  [s.button, s[variant], s[size], moving && s.moving, extra].filter(Boolean).join(' ')

export function Button({ variant, size, moving, className, children, ...rest }: StyleProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cls({ variant, size, moving }, className)} {...rest}>
      <span className={s.inner}>{children}</span>
    </button>
  )
}

export function LinkButton({ variant, size, moving, className, children, ...rest }: StyleProps & LinkProps) {
  return (
    <Link className={cls({ variant, size, moving }, className)} {...rest}>
      <span className={s.inner}>{children}</span>
    </Link>
  )
}
