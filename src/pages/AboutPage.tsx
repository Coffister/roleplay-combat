import { ArrowRight } from 'lucide-react'
import { Seo } from '../lib/seo'
import { brand } from '../config/brand'
import { about } from '../data/pages'
import { getDivisions, getFighters, getPastEvents, getResults, getUpcomingEvents } from '../lib/queries'
import { LinkButton } from '../components/ui/Button'
import { Section } from '../components/ui/Layout'
import { Reveal } from '../components/effects'
import s from './pages.module.css'

export default function AboutPage() {
  const stats = [
    ['Fighters', getFighters().length],
    ['Divisions', getDivisions().length],
    ['Events', getPastEvents().length + getUpcomingEvents().length],
    ['Fights', getResults().length],
  ] as const

  return (
    <>
      <Seo title="About" description={about.intro} />
      <Section className={s.aboutHero}>
        <p className="label">About {brand.organization}</p>
        <h1 className={s.statement}>{about.statement}</h1>
        <p className={s.aboutIntro}>{about.intro}</p>
      </Section>

      <Section tone="surface" flush>
        <dl className={s.statRow}>
          {stats.map(([label, value]) => (
            <div key={label}>
              <dt className="label">{label}</dt>
              <dd className="display tabular">{value}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section aria-label="How it works">
        <ol className={s.aboutList}>
          {about.sections.map((sec, i) => (
            <li key={sec.title}>
              <Reveal>
                <span className={s.aboutNum} aria-hidden>{String(i + 1).padStart(2, '0')}</span>
                <h2 className={s.aboutTitle}>{sec.title}</h2>
                <p>{sec.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
        <div className={s.aboutCta}>
          <LinkButton to="/register" size="lg">Register as fighter <ArrowRight aria-hidden /></LinkButton>
          <LinkButton to="/events" size="lg" variant="outline">See events</LinkButton>
        </div>
      </Section>
    </>
  )
}
