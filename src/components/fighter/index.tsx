import { useState } from 'react'
import { Link } from 'react-router'
import type { Fighter } from '../../types'
import { formatRecord, rankLabel } from '../../lib/format'
import { getDivision } from '../../lib/queries'
import { Badge } from '../ui/Badge'
import s from './fighter.module.css'

const initials = (f: Fighter) => (f.firstName[0] ?? '') + (f.lastName[0] ?? '')

/** Small square headshot, cropped to the top of the portrait. Falls back to initials. */
export function Avatar({ fighter, size = 'md' }: { fighter: Fighter; size?: 'sm' | 'md' | 'lg' }) {
  const [failed, setFailed] = useState(false)
  return (
    <span className={`${s.avatar} ${s[`avatar-${size}`]}`} aria-hidden>
      {failed ? (
        <span className={s.initials}>{initials(fighter)}</span>
      ) : (
        <img src={fighter.portrait} alt="" loading="lazy" decoding="async" onError={() => setFailed(true)} />
      )}
    </span>
  )
}

type FighterAvatarProps = {
  fighter: Fighter
  /** Face left instead of right (B corner). */
  mirror?: boolean
  /** Set when the image is the only place the name appears. */
  alt?: string
  priority?: boolean
  className?: string
}

/** Full cut-out portrait. Portraits face right, so the B corner mirrors them to face the opponent. */
export function FighterAvatar({ fighter, mirror, alt = '', priority, className }: FighterAvatarProps) {
  const [failed, setFailed] = useState(false)
  return (
    <div className={[s.portrait, mirror && s.mirror, className].filter(Boolean).join(' ')}>
      {failed ? (
        <span className={s.portraitFallback} aria-hidden>{initials(fighter)}</span>
      ) : (
        <img
          src={fighter.portrait}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : undefined}
          decoding="async"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  )
}

export function FighterRecord({ record, size = 'md' }: { record: Fighter['record']; size?: 'sm' | 'md' | 'lg' }) {
  const { wins, losses, draws } = record
  return (
    <span className={`${s.record} ${s[`record-${size}`]} tabular`} aria-label={`Bilance – výhry: ${wins}, prohry: ${losses}, remízy: ${draws}`}>
      {formatRecord(record)}
    </span>
  )
}

export function RankBadge({ rank }: { rank?: number }) {
  if (rank === undefined) return null
  return rank === 0 ? <Badge tone="accent">Šampion</Badge> : <Badge tone="outline">{rankLabel(rank)}</Badge>
}

/** Name with nickname, in the "JOHN „THE WOLF“ DOE" poster style. */
export function FighterName({ fighter, as: Tag = 'span', className }: { fighter: Fighter; as?: 'span' | 'h1' | 'h2' | 'h3'; className?: string }) {
  return (
    <Tag className={[s.name, className].filter(Boolean).join(' ')}>
      <span className={s.first}>{fighter.firstName}</span>{' '}
      {fighter.nickname && <span className={s.nick}>„{fighter.nickname}“</span>}{' '}
      <span className={s.last}>{fighter.lastName}</span>
    </Tag>
  )
}

export function FighterCard({ fighter, rank }: { fighter: Fighter; rank?: number }) {
  const division = getDivision(fighter.divisionId)
  return (
    <article className={s.card}>
      <FighterAvatar fighter={fighter} className={s.cardPortrait} />
      <div className={s.cardBody}>
        <div className={s.cardMeta}>
          <span className="label">{division?.name}</span>
          <RankBadge rank={rank} />
        </div>
        <h3 className={s.cardName}>
          <Link to={`/fighters/${fighter.id}`} className={s.stretched}>
            <span className={s.first}>{fighter.firstName}</span> {fighter.lastName}
          </Link>
        </h3>
        {fighter.nickname && <p className={s.cardNick}>„{fighter.nickname}“</p>}
        <FighterRecord record={fighter.record} size="sm" />
      </div>
    </article>
  )
}

export function FighterStats({ fighter }: { fighter: Fighter }) {
  const { wins, losses, draws } = fighter.record
  const methods = [
    { label: 'KO / TKO', value: fighter.winsByKO },
    { label: 'Submise', value: fighter.winsBySubmission },
    { label: 'Rozhodnutí', value: fighter.winsByDecision },
  ].filter((m): m is { label: string; value: number } => m.value !== undefined)
  const division = getDivision(fighter.divisionId)
  const details = [
    ['Kategorie', division ? `${division.name} (${division.limit})` : undefined],
    ['Národnost', fighter.nationality],
    ['Tým', fighter.team],
    ['Styl', fighter.fightingStyle],
    ['Věk', fighter.age?.toString()],
    ['Výška', fighter.height],
    ['Váha', fighter.weight],
    ['Rozpětí paží', fighter.reach],
  ].filter((d): d is [string, string] => !!d[1])

  return (
    <div className={s.stats}>
      <dl className={s.wld}>
        {[['Výhry', wins], ['Prohry', losses], ['Remízy', draws]].map(([label, value]) => (
          <div key={label}>
            <dt className="label">{label}</dt>
            <dd className="display tabular">{value}</dd>
          </div>
        ))}
      </dl>

      {methods.length > 0 && wins > 0 && (
        <div>
          <h2 className={`label ${s.statsHeading}`}>Výhry podle způsobu</h2>
          <dl className={s.methods}>
            {methods.map((m) => (
              <div key={m.label} className={s.method}>
                <dt>{m.label}</dt>
                <dd className="tabular">
                  <span className={s.methodValue}>{m.value}</span>
                  <span className={s.methodPct}>{Math.round((m.value / wins) * 100)}%</span>
                </dd>
                <span className={s.bar} aria-hidden style={{ '--pct': `${(m.value / wins) * 100}%` } as React.CSSProperties} />
              </div>
            ))}
          </dl>
        </div>
      )}

      <dl className={s.details}>
        {details.map(([label, value]) => (
          <div key={label}>
            <dt className="label">{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

