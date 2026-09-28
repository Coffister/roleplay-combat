import { useParams } from 'react-router'
import { ArrowRight } from 'lucide-react'
import { Seo } from '../lib/seo'
import { getEvent, getEventCard } from '../lib/queries'
import { eventTitle, formatDateLong, formatTime, formatWeekday } from '../lib/format'
import { EventHero } from '../components/event/EventHero'
import { Countdown } from '../components/event/Countdown'
import { FightCardList } from '../components/fight/FightCardList'
import { LinkButton } from '../components/ui/Button'
import { Section, SectionHeader } from '../components/ui/Layout'
import { ErrorPage } from './ErrorPage'
import s from './pages.module.css'

const eyebrows = { upcoming: 'Nadcházející akce', live: 'Právě živě', completed: 'Konečné výsledky' }

export default function EventDetailPage() {
  const { eventId = '' } = useParams()
  const event = getEvent(eventId)
  if (!event) return <ErrorPage notFound />

  const fights = getEventCard(event.id)
  const main = fights[0]
  const completed = event.status === 'completed'
  const title = eventTitle(event)
  const info = [
    ['Datum', `${formatWeekday(event.date)}, ${formatDateLong(event.date)}`],
    ['Začátek', formatTime(event.date)],
    ['Místo konání', event.venue],
    ['Lokalita', event.location],
    ['Přenos', event.broadcast],
  ].filter((x): x is [string, string] => !!x[1])

  return (
    <>
      <Seo
        title={title}
        description={event.description ?? `${title}, ${formatDateLong(event.date)}, ${event.location}.`}
      />
      <EventHero
        event={event}
        mainEvent={main}
        eyebrow={eyebrows[event.status]}
        actions={
          !completed && (
            <LinkButton to="#fight-card" size="lg" moving>
              Celá karta zápasů <ArrowRight aria-hidden />
            </LinkButton>
          )
        }
      />

      <Section tone="surface" aria-label="Informace o akci">
        <div className={s.eventInfo}>
          <div>
            {event.description && <p className={s.lede}>{event.description}</p>}
            <dl className={s.infoList}>
              {info.map(([k, v]) => (
                <div key={k}>
                  <dt className="label">{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          {!completed && <Countdown date={event.date} />}
        </div>
      </Section>

      <Section aria-labelledby="fight-card">
        <SectionHeader index="01" eyebrow={title} title={completed ? 'Výsledky' : 'Karta zápasů'} id="fight-card" />
        <FightCardList fights={fights} />
      </Section>
    </>
  )
}
