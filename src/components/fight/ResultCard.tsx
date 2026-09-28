import { Link } from 'react-router'
import type { FightView } from '../../lib/queries'
import { getDivision } from '../../lib/queries'
import { methodLabels, methodShortLabels } from '../../config/site'
import { eventTitle, formatDateShort } from '../../lib/format'
import { Avatar } from '../fighter'
import s from './ResultCard.module.css'

/** One completed fight: "VÍTĚZ porazil PORAŽENÉHO — KO 2. kolo 3:21 — AKCE". */
export function ResultCard({ fight, showEvent = true }: { fight: FightView; showEvent?: boolean }) {
  const r = fight.result
  if (!r) return null
  const draw = !r.winnerId
  const [winner, loser] = fight.b.outcome === 'win' ? [fight.b, fight.a] : [fight.a, fight.b]
  const division = getDivision(fight.divisionId)

  return (
    <article className={s.card}>
      <div className={s.who}>
        <Avatar fighter={winner.fighter} size="md" />
        <p className={s.names}>
          <Link to={`/fighters/${winner.fighter.id}`} className={s.winner}>
            {winner.fighter.firstName} {winner.fighter.lastName}
          </Link>
          <span className={s.def}>{draw ? 'remizoval s' : 'porazil'}</span>
          <Link to={`/fighters/${loser.fighter.id}`} className={s.loser}>
            {loser.fighter.firstName} {loser.fighter.lastName}
          </Link>
        </p>
      </div>

      <p className={s.method}>
        <abbr title={methodLabels[r.method]} className={s.methodShort}>{methodShortLabels[r.method]}</abbr>
        {r.detail && <span className={s.detail}>{r.detail}</span>}
        {r.round && <span className={`${s.time} tabular`}>{r.round}. kolo · {r.time}</span>}
      </p>

      <p className={s.meta}>
        {fight.titleFight && <span className={s.titleTag}>Titul</span>}
        <span>{division?.name}</span>
        {showEvent && (
          <Link to={`/events/${fight.event.id}`} className={s.event}>
            {eventTitle(fight.event)} · {formatDateShort(fight.event.date)}
          </Link>
        )}
      </p>
    </article>
  )
}
