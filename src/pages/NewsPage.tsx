import { Seo } from '../lib/seo'
import { getNews } from '../lib/queries'
import { NewsCard } from '../components/news'
import { PageHeader, Section } from '../components/ui/Layout'
import { Reveal } from '../components/effects'
import s from './pages.module.css'

export default function NewsPage() {
  const [lead, ...rest] = getNews()
  return (
    <>
      <Seo title="News" description="Announcements, fight news and roster updates from CMRP Combat." />
      <PageHeader eyebrow="Announcements" title="News" />
      <Section>
        {lead ? (
          <div className={s.stack}>
            <NewsCard article={lead} variant="lead" />
            <ul className={s.grid3}>
              {rest.map((a, i) => <li key={a.slug}><Reveal delay={i * 0.06}><NewsCard article={a} /></Reveal></li>)}
            </ul>
          </div>
        ) : (
          <p className={s.empty}>No news yet.</p>
        )}
      </Section>
    </>
  )
}
