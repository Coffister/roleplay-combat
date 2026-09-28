import { useLocation } from 'react-router'
import { Seo } from '../lib/seo'
import { legal } from '../data/pages'
import { formatDateLong } from '../lib/format'
import { PageHeader, Section } from '../components/ui/Layout'
import { ErrorPage } from './ErrorPage'
import s from './pages.module.css'

export default function LegalPage() {
  const page = legal[useLocation().pathname.slice(1)]
  if (!page) return <ErrorPage notFound />
  return (
    <>
      <Seo title={page.title} />
      <PageHeader eyebrow={`Updated ${formatDateLong(page.updated)}`} title={page.title} />
      <Section>
        <div className={s.prose}>
          {page.body.map((p, i) => <p key={i}>{p}</p>)}
        </div>
      </Section>
    </>
  )
}
