import { Link } from 'react-router'
import type { Corner, FightView } from '../../lib/queries'
import { getDivision } from '../../lib/queries'
import { cardTypeLabels, methodLabels } from '../../config/site'
import { rankLabel } from '../../lib/format'
import { Avatar, FighterAvatar, FighterRecord } from '../fighter'
import { Badge } from '../ui/Badge'
import s from './FightCard.module.css'

const outcomeText = { win: 'Win', loss: 'Loss', draw: 'Draw' } as const

function CornerInfo({ corner, compact }: { corner: Corner; compact?: boolean }) {
  const { fighter: f, rank, outcome } = corner
  return (
    <div className={s.info}>
      <div className={s.infoMeta}>
        {rank !== undefined && (
          <span className={rank === 0 ? s.champ : s.rank}>{rank === 0 ? 'Champion' : rankLabel(rank)}</span>
        )}
        {outcome && <span className={`${s.outcome} ${s[outcome]}`}>{outcomeText[outcome]}</span>}
      </div>
      <h3 className={s.name}>
        <Link to={`/fighters/${f.id}`} className={s.nameLink}>
          <span className={s.first}>{f.firstName}</span>{' '}
          {f.nickname && !compact && <span className={s.nick}>“{f.nickname}” </span>}
          <span className={s.last}>{f.lastName}</span>
        </Link>
      </h3>
      <p className={s.sub}>
        <FighterRecord record={f.record} size="sm" />
        {f.nationality && <span className={s.nation}>{f.nationality}</span>}
      </p>
    </div>
  )
}

function ResultLine({ fight }: { fight: FightView }) {
  const r = fight.result
  if (!r) return null
  const method = methodLabels[r.method]
  return (
    <p className={s.resultLine}>
      <span className={s.method}>{method}</span>
      {r.detail && <span>{r.detail}</span>}
      {r.round && <span className="tabular">R{r.round} {r.time}</span>}
    </p>
  )
}

type FightCardProps = {
  fight: FightView
  /** "headline": poster-style with full portraits. "row": compact line for the undercard. */
  variant?: 'headline' | 'row'
  /** Show the card slot label ("Main Event") above the matchup. */
  showSlot?: boolean
}

export function FightCard({ fight, variant = 'row', showSlot = true }: FightCardProps) {
  const division = getDivision(fight.divisionId)
  const completed = fight.status === 'completed'
  const cls = [s.card, s[variant], completed && s.completed, fight.titleFight && s.title].filter(Boolean).join(' ')
  const matchup = `${fight.a.fighter.firstName} ${fight.a.fighter.lastName} versus ${fight.b.fighter.firstName} ${fight.b.fighter.lastName}`

  return (
    <article className={cls} aria-label={matchup}>
      {showSlot && (
        <header className={s.slot}>
          <span className={s.slotLabel}>{cardTypeLabels[fight.cardType]}</span>
          {fight.titleFight && <Badge tone="accent">Title fight</Badge>}
          {fight.status === 'live' && <Badge tone="primary">Live</Badge>}
        </header>
      )}

      <div className={s.matchup}>
        <div className={`${s.corner} ${s.cornerA} ${fight.a.outcome ? s[fight.a.outcome] : ''}`}>
          {variant === 'headline' ? (
            <FighterAvatar fighter={fight.a.fighter} className={s.portrait} />
          ) : (
            <Avatar fighter={fight.a.fighter} size="lg" />
          )}
          <CornerInfo corner={fight.a} compact={variant === 'row'} />
        </div>

        <div className={s.center}>
          <span className={s.vs} aria-hidden>vs</span>
          <span className={s.centerMeta}>
            {division?.name}
            <span className={s.dot} aria-hidden>·</span>
            {fight.scheduledRounds} Rds
          </span>
        </div>

        <div className={`${s.corner} ${s.cornerB} ${fight.b.outcome ? s[fight.b.outcome] : ''}`}>
          {variant === 'headline' ? (
            <FighterAvatar fighter={fight.b.fighter} mirror className={s.portrait} />
          ) : (
            <Avatar fighter={fight.b.fighter} size="lg" />
          )}
          <CornerInfo corner={fight.b} compact={variant === 'row'} />
        </div>
      </div>

      {completed && <ResultLine fight={fight} />}
    </article>
  )
}
