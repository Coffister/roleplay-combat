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
      <Seo title="Events" description="Upcoming CMRP Combat fight nights and results from past events." />
      <PageHeader eyebrow="Fight nights" title="Events" intro="Every card, every venue, every result." />

      <Section aria-labelledby="upcoming">
        <SectionHeader index="01" eyebrow="On the calendar" title="Upcoming" id="upcoming" />
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
          <p className={s.empty}>No events scheduled right now. Follow us on Discord for the next announcement.</p>
        )}
      </Section>

      <Section aria-labelledby="past" tone="surface">
        <SectionHeader index="02" eyebrow="The archive" title="Past events" id="past" action={{ label: 'All results', to: '/results' }} />
        {past.length ? (
          <ul className={s.grid3}>
            {past.map((e, i) => <li key={e.id}><Reveal delay={i * 0.06}>{card(e)}</Reveal></li>)}
          </ul>
        ) : (
          <p className={s.empty}>No past events yet.</p>
        )}
      </Section>
    </>
  )
}
