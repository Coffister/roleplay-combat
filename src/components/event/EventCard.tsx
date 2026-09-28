import { Link } from 'react-router'
import { ArrowRight } from 'lucide-react'
import type { FightEvent } from '../../types'
import type { FightView } from '../../lib/queries'
import { formatDay, formatMonthYear, formatTime, formatWeekday, plural } from '../../lib/format'
import { FighterAvatar } from '../fighter'
import { StatusBadge } from '../ui/Badge'
import s from './event.module.css'

/** Poster area: the event's own poster if it has one, otherwise the main event face-off. */
export function EventPoster({ event, mainEvent, priority }: { event: FightEvent; mainEvent?: FightView; priority?: boolean }) {
  return (
    <div className={s.poster}>
      {event.poster ? (
        <img src={event.poster} alt="" loading={priority ? 'eager' : 'lazy'} className={s.posterImg} />
      ) : (
        <>
          <span className={s.posterNumber} aria-hidden>{event.number ?? event.name.split(' ').at(-1)}</span>
          {mainEvent && (
            <div className={s.posterFighters}>
              <FighterAvatar fighter={mainEvent.a.fighter} priority={priority} />
              <FighterAvatar fighter={mainEvent.b.fighter} mirror priority={priority} />
            </div>
          )}
        </>
      )}
    </div>
  )
}

type EventCardProps = {
  event: FightEvent
  mainEvent?: FightView
  fightCount: number
  variant?: 'default' | 'feature'
}

export function EventCard({ event, mainEvent, fightCount, variant = 'default' }: EventCardProps) {
  const completed = event.status === 'completed'
  return (
    <article className={`${s.card} ${s[variant]}`}>
      <EventPoster event={event} mainEvent={mainEvent} />
      <div className={s.cardBody}>
        <div className={s.cardTop}>
          <time dateTime={event.date} className={s.dateBlock}>
            <span className={s.day}>{formatDay(event.date)}</span>
            <span className="label">{formatMonthYear(event.date)}</span>
          </time>
          <StatusBadge status={event.status} />
        </div>

        <h3 className={s.cardTitle}>
          <Link to={`/events/${event.id}`} className={s.stretched}>
            {event.name} {event.number && <span className={s.num}>{event.number}</span>}
          </Link>
        </h3>

        {mainEvent && (
          <p className={s.mainEvent}>
            <span className="label">Hlavní zápas</span>
            <span className={s.mainNames}>
              {mainEvent.a.fighter.lastName} <span className={s.vsSmall}>vs</span> {mainEvent.b.fighter.lastName}
            </span>
          </p>
        )}

        <ul className={s.facts}>
          <li>{formatWeekday(event.date)} {formatTime(event.date)}</li>
          <li>{event.venue ? `${event.venue}, ` : ''}{event.location}</li>
          <li>{plural(fightCount, 'zápas', 'zápasy', 'zápasů')}</li>
        </ul>

        <span className={s.cta} aria-hidden>
          {completed ? 'Výsledky' : 'Karta zápasů'} <ArrowRight size={16} />
        </span>
      </div>
    </article>
  )
}
