import { Link } from 'react-router'
import { motion } from 'motion/react'
import { ArrowDown, ArrowUp, Minus } from 'lucide-react'
import type { Fighter } from '../../types'
import type { RankingView } from '../../lib/queries'
import { formatDateLong, pad2 } from '../../lib/format'
import { Avatar, FighterAvatar, FighterRecord } from '../fighter'
import s from './ranking.module.css'

function Movement({ position, previous }: { position: number; previous?: number }) {
  if (previous === undefined) return <span className={`${s.move} ${s.new}`}>New</span>
  const diff = previous - position
  if (diff === 0) return <span className={s.move} aria-label="No change"><Minus size={14} aria-hidden /></span>
  const up = diff > 0
  return (
    <span className={`${s.move} ${up ? s.up : s.down}`} aria-label={`${up ? 'Up' : 'Down'} ${Math.abs(diff)} (was #${previous})`}>
      {up ? <ArrowUp size={14} aria-hidden /> : <ArrowDown size={14} aria-hidden />}
      <span aria-hidden>{up ? '+' : '−'}{Math.abs(diff)}</span>
    </span>
  )
}

export function RankingRow({ fighter, position, previousPosition }: { fighter: Fighter; position: number; previousPosition?: number }) {
  return (
    <motion.li className={s.row} variants={{ hidden: { opacity: 0, x: -12 }, show: { opacity: 1, x: 0 } }}>
      <span className={`${s.pos} tabular`} aria-label={`Rank ${position}`}>{pad2(position)}</span>
      <Avatar fighter={fighter} size="md" />
      <div className={s.who}>
        <Link to={`/fighters/${fighter.id}`} className={s.name}>
          {fighter.firstName} <strong>{fighter.lastName}</strong>
        </Link>
        {fighter.nickname && <span className={s.nick}>“{fighter.nickname}”</span>}
      </div>
      <FighterRecord record={fighter.record} size="sm" />
      <Movement position={position} previous={previousPosition} />
    </motion.li>
  )
}

/** Champion spotlight followed by the ranked contenders. */
export function RankingList({ ranking, compact }: { ranking: RankingView; compact?: boolean }) {
  const { champion } = ranking
  return (
    <div className={`${s.list} ${compact ? s.compact : ''}`}>
      {champion && (
        <div className={s.champion}>
          {!compact && <FighterAvatar fighter={champion} className={s.champPortrait} />}
          <div className={s.champInfo}>
            <p className={s.champLabel}>{ranking.divisionName} champion</p>
            <Link to={`/fighters/${champion.id}`} className={s.champName}>
              <span>{champion.firstName}</span> {champion.lastName}
            </Link>
            <FighterRecord record={champion.record} size={compact ? 'sm' : 'md'} />
          </div>
        </div>
      )}
      <motion.ol
        key={ranking.divisionId}
        className={s.rows}
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.05 } } }}
      >
        {ranking.entries.map((e) => (
          <RankingRow key={e.fighter.id} fighter={e.fighter} position={e.position} previousPosition={e.previousPosition} />
        ))}
      </motion.ol>
      {!compact && <p className={s.updated}>Updated {formatDateLong(ranking.updatedAt)}</p>}
    </div>
  )
}
