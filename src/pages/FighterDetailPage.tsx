import { Link, useParams } from 'react-router'
import { motion } from 'motion/react'
import { Seo } from '../lib/seo'
import { getDivision, getFighter, getFighterHistory, getFighterUpcoming, getRank } from '../lib/queries'
import { eventTitle, formatDateShort, formatRecord, fullName } from '../lib/format'
import { methodLabels } from '../config/site'
import { FighterAvatar, FighterRecord, FighterStats, RankBadge } from '../components/fighter'
import { FightCard } from '../components/fight/FightCard'
import { Section, SectionHeader } from '../components/ui/Layout'
import { Badge } from '../components/ui/Badge'
import { ErrorPage } from './ErrorPage'
import s from './FighterDetailPage.module.css'

const outcomeLetter = { win: 'V', loss: 'P', draw: 'R' } as const
const outcomeWord = { win: 'Výhra', loss: 'Prohra', draw: 'Remíza' } as const

export default function FighterDetailPage() {
  const { fighterId = '' } = useParams()
  const fighter = getFighter(fighterId)
  if (!fighter) return <ErrorPage notFound />

  const division = getDivision(fighter.divisionId)
  const rank = getRank(fighter.id)
  const history = getFighterHistory(fighter.id)
  const upcoming = getFighterUpcoming(fighter.id)

  return (
    <>
      <Seo
        title={fullName(fighter)}
        description={`${fullName(fighter)}${fighter.nickname ? ` „${fighter.nickname}“` : ''}, ${division?.name ?? ''}. Bilance ${formatRecord(fighter.record)}.`}
        image={fighter.portrait}
      />

      <section className={s.hero} aria-labelledby="fighter-name">
        <div className={s.heroInner}>
          <motion.div className={s.portraitWrap} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
            <span className={s.bgName} aria-hidden>{fighter.lastName}</span>
            <FighterAvatar fighter={fighter} alt={`Portrét: ${fullName(fighter)}`} priority className={s.portrait} />
          </motion.div>

          <motion.div className={s.identity} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <div className={s.badges}>
              <RankBadge rank={rank} />
              {division && <Badge tone="outline">{division.name}</Badge>}
            </div>
            <h1 id="fighter-name" className={s.name}>
              <span className={s.first}>{fighter.firstName}</span>
              {fighter.nickname && <span className={s.nick}>„{fighter.nickname}“</span>}
              <span className={s.last}>{fighter.lastName}</span>
            </h1>
            <FighterRecord record={fighter.record} size="lg" />
            <p className={s.origin}>
              {[fighter.nationality, fighter.team].filter(Boolean).join(' · ')}
            </p>
          </motion.div>
        </div>
      </section>

      <Section aria-label="Statistiky">
        <div className={s.statsGrid}>
          <FighterStats fighter={fighter} />
          {fighter.bio && (
            <div className={s.bio}>
              <h2 className="label">Životopis</h2>
              <p>{fighter.bio}</p>
            </div>
          )}
        </div>
      </Section>

      {upcoming.length > 0 && (
        <Section tone="surface" aria-labelledby="next-fight">
          <SectionHeader eyebrow="Nasmlouváno" title="Příští zápas" id="next-fight" action={{ label: eventTitle(upcoming[0].event), to: `/events/${upcoming[0].event.id}` }} />
          <div className={s.upcoming}>
            {upcoming.map((f) => <FightCard key={f.id} fight={f} />)}
          </div>
        </Section>
      )}

      <Section aria-labelledby="history">
        <SectionHeader eyebrow="CMRP Combat" title="Historie zápasů" id="history" />
        {history.length ? (
          <table className={s.table}>
            <caption className="sr-only">Historie zápasů – {fullName(fighter)}, od nejnovějšího</caption>
            <thead>
              <tr>
                <th scope="col">Výsledek</th>
                <th scope="col">Soupeř</th>
                <th scope="col">Způsob</th>
                <th scope="col">Akce</th>
                <th scope="col">Datum</th>
              </tr>
            </thead>
            <tbody>
              {history.map(({ fight, opponent, outcome }) => {
                const r = fight.result!
                return (
                  <tr key={fight.id}>
                    <td data-label="Výsledek">
                      {outcome && (
                        <span className={`${s.outcome} ${s[outcome]}`}>
                          <span aria-hidden>{outcomeLetter[outcome]}</span>
                          <span className={s.outcomeWord}>{outcomeWord[outcome]}</span>
                        </span>
                      )}
                    </td>
                    <td data-label="Soupeř">
                      <Link to={`/fighters/${opponent.id}`} className={s.opponent}>{fullName(opponent)}</Link>
                    </td>
                    <td data-label="Způsob">
                      <span className={s.method}>{methodLabels[r.method]}</span>
                      <span className={s.muted}>
                        {r.detail && `${r.detail} · `}{r.round}. kolo {r.time}
                      </span>
                    </td>
                    <td data-label="Akce">
                      <Link to={`/events/${fight.event.id}`}>{eventTitle(fight.event)}</Link>
                      {fight.titleFight && <span className={s.titleTag}>Titulový zápas</span>}
                    </td>
                    <td data-label="Datum" className="tabular">{formatDateShort(fight.event.date)}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        ) : (
          <p className={s.empty}>Zatím žádné zápasy v CMRP Combat.</p>
        )}
      </Section>
    </>
  )
}
