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

const eyebrows = { upcoming: 'Upcoming event', live: 'Live now', completed: 'Final results' }

export default function EventDetailPage() {
  const { eventId = '' } = useParams()
  const event = getEvent(eventId)
  if (!event) return <ErrorPage notFound />

  const fights = getEventCard(event.id)
  const main = fights[0]
  const completed = event.status === 'completed'
  const title = eventTitle(event)
  const info = [
    ['Date', `${formatWeekday(event.date)}, ${formatDateLong(event.date)}`],
    ['Start', formatTime(event.date)],
    ['Venue', event.venue],
    ['Location', event.location],
    ['Broadcast', event.broadcast],
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
              Full fight card <ArrowRight aria-hidden />
            </LinkButton>
          )
        }
      />

      <Section tone="surface" aria-label="Event information">
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
        <SectionHeader index="01" eyebrow={title} title={completed ? 'Results' : 'Fight card'} id="fight-card" />
        <FightCardList fights={fights} />
      </Section>
    </>
  )
}
