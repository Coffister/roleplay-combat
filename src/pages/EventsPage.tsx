import { Seo } from '../lib/seo'
import { getEventCard, getMainEvent, getPastEvents, getUpcomingEvents } from '../lib/queries'
import { EventCard } from '../components/event/EventCard'
import { PageHeader, Section, SectionHeader } from '../components/ui/Layout'
import { Reveal } from '../components/effects'
import type { FightEvent } from '../types'
import s from './pages.module.css'

const card = (e: FightEvent, variant: 'default' | 'feature' = 'default') => (
  <EventCard event={e} mainEvent={getMainEvent(e.id)} fightCount={getEventCard(e.id).length} variant={variant} />
)

export default function EventsPage() {
  const [next, ...upcoming] = getUpcomingEvents()
  const past = getPastEvents()

  return (
    <>
      <Seo title="Akce" description="Nadcházející galavečery CMRP Combat a výsledky proběhlých akcí." />
      <PageHeader eyebrow="Galavečery" title="Akce" intro="Každá karta, každé místo, každý výsledek." />

      <Section aria-labelledby="upcoming">
        <SectionHeader index="01" eyebrow="V kalendáři" title="Nadcházející" id="upcoming" />
        {next ? (
          <div className={s.stack}>
            {card(next, 'feature')}
            {upcoming.length > 0 && (
              <ul className={s.grid3}>
                {upcoming.map((e, i) => <li key={e.id}><Reveal delay={i * 0.06}>{card(e)}</Reveal></li>)}
              </ul>
            )}
          </div>
        ) : (
          <p className={s.empty}>Momentálně není naplánovaná žádná akce. Sleduj náš Discord, ať ti neunikne další oznámení.</p>
        )}
      </Section>

      <Section aria-labelledby="past" tone="surface">
        <SectionHeader index="02" eyebrow="Archiv" title="Proběhlé akce" id="past" action={{ label: 'Všechny výsledky', to: '/results' }} />
        {past.length ? (
          <ul className={s.grid3}>
            {past.map((e, i) => <li key={e.id}><Reveal delay={i * 0.06}>{card(e)}</Reveal></li>)}
          </ul>
        ) : (
          <p className={s.empty}>Zatím žádné proběhlé akce.</p>
        )}
      </Section>
    </>
  )
}
