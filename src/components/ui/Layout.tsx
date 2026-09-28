import type { HTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router'
import { ArrowRight } from 'lucide-react'
import s from './Layout.module.css'

export function Container({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return <div className={[s.container, className].filter(Boolean).join(' ')} {...rest} />
}

type SectionProps = HTMLAttributes<HTMLElement> & {
  tone?: 'default' | 'surface'
  /** Remove vertical padding, for sections that manage their own spacing. */
  flush?: boolean
}

export function Section({ tone = 'default', flush, className, children, ...rest }: SectionProps) {
  return (
    <section className={[s.section, s[tone], flush && s.flush, className].filter(Boolean).join(' ')} {...rest}>
      <Container>{children}</Container>
    </section>
  )
}

type HeadingProps = HTMLAttributes<HTMLHeadingElement> & {
  as?: 'h1' | 'h2' | 'h3' | 'h4'
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

export function Heading({ as: Tag = 'h2', size = 'md', className, ...rest }: HeadingProps) {
  return <Tag className={[s.heading, s[`h-${size}`], className].filter(Boolean).join(' ')} {...rest} />
}

type SectionHeaderProps = {
  /** Small editorial index, e.g. "01". */
  index?: string
  eyebrow: string
  title: ReactNode
  id?: string
  action?: { label: string; to: string }
}

/** Editorial section header: "01 — NEXT EVENT" label above a big title, optional link on the right. */
export function SectionHeader({ index, eyebrow, title, id, action }: SectionHeaderProps) {
  return (
    <header className={s.sectionHeader}>
      <div>
        <p className={`label ${s.eyebrow}`}>
          {index && <span className={s.index}>{index}</span>}
          {eyebrow}
        </p>
        <Heading id={id} size="lg">{title}</Heading>
      </div>
      {action && (
        <Link to={action.to} className={s.action}>
          {action.label} <ArrowRight aria-hidden size={16} />
        </Link>
      )}
    </header>
  )
}

/** Top of secondary pages: label, huge title, optional intro and extra content (tabs, filters). */
export function PageHeader({ eyebrow, title, intro, children }: { eyebrow: string; title: ReactNode; intro?: ReactNode; children?: ReactNode }) {
  return (
    <header className={s.pageHeader}>
      <Container>
        <p className={`label ${s.eyebrow}`}>{eyebrow}</p>
        <Heading as="h1" size="xl">{title}</Heading>
        {intro && <p className={s.intro}>{intro}</p>}
        {children && <div className={s.pageHeaderExtra}>{children}</div>}
      </Container>
    </header>
  )
}
