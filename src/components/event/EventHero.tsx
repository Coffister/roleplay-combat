import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { MapPin } from 'lucide-react'
import type { FightEvent } from '../../types'
import type { FightView } from '../../lib/queries'
import { getDivision } from '../../lib/queries'
import { cardTypeLabels } from '../../config/site'
import { formatDateLong, formatTime, formatWeekday } from '../../lib/format'
import { FighterAvatar, FighterRecord } from '../fighter'
import { Spotlight } from '../effects'
import s from './EventHero.module.css'

type EventHeroProps = {
  event: FightEvent
  mainEvent?: FightView
  /** Small label above the title, e.g. "Další akce". */
  eyebrow: string
  actions?: ReactNode
  /** Extra content under the matchup, e.g. a countdown. */
  children?: ReactNode
}

const ease = [0.22, 1, 0.36, 1] as const

/** Full-bleed event hero: two fighters facing off with the event title between them. */
export function EventHero({ event, mainEvent, eyebrow, actions, children }: EventHeroProps) {
  const division = mainEvent && getDivision(mainEvent.divisionId)
  return (
    <section className={s.hero} aria-labelledby="event-hero-title">
      <Spotlight />

      {mainEvent && (
        <div className={s.fighters} aria-hidden>
          <motion.div className={s.fighterA} initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, ease, delay: 0.1 }}>
            <FighterAvatar fighter={mainEvent.a.fighter} priority />
          </motion.div>
          <motion.div className={s.fighterB} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, ease, delay: 0.1 }}>
            <FighterAvatar fighter={mainEvent.b.fighter} mirror priority />
          </motion.div>
        </div>
      )}

      <div className={s.content}>
        <motion.div className={s.titleBlock} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }}>
          <p className={s.eyebrow}>
            <span className={s.eyebrowMark} aria-hidden />
            {eyebrow}
          </p>
          <h1 id="event-hero-title" className={s.title}>
            <span className={s.titleName}>{event.name}</span>
            {event.number && <span className={s.titleNumber}>{event.number}</span>}
          </h1>
          <p className={s.when}>
            <time dateTime={event.date}>
              <span className={s.weekday}>{formatWeekday(event.date)}</span> {formatDateLong(event.date)}
              <span className={s.sep} aria-hidden>/</span>
              {formatTime(event.date)}
            </time>
          </p>
          <p className={s.where}>
            <MapPin size={16} aria-hidden /> {event.venue ? `${event.venue}, ` : ''}{event.location}
          </p>
        </motion.div>

        {mainEvent && (
          <motion.div className={s.matchup} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.45 }}>
            <p className={s.slot}>
              {cardTypeLabels[mainEvent.cardType]}
              <span aria-hidden> · </span>
              {division?.name}{mainEvent.titleFight && ' · o titul'}
            </p>
            <div className={s.names}>
              <div className={s.side}>
                <span className={s.first}>{mainEvent.a.fighter.firstName}</span>
                <span className={s.last}>{mainEvent.a.fighter.lastName}</span>
                <FighterRecord record={mainEvent.a.fighter.record} size="sm" />
              </div>
              <span className={s.vs} aria-label="proti">vs</span>
              <div className={`${s.side} ${s.sideB}`}>
                <span className={s.first}>{mainEvent.b.fighter.firstName}</span>
                <span className={s.last}>{mainEvent.b.fighter.lastName}</span>
                <FighterRecord record={mainEvent.b.fighter.record} size="sm" />
              </div>
            </div>
          </motion.div>
        )}

        {children}
        {actions && <div className={s.actions}>{actions}</div>}
      </div>
    </section>
  )
}
