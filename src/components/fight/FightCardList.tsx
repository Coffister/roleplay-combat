import { useId, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import type { FightView } from '../../lib/queries'
import { cardGroups, divisions } from '../../config/site'
import { plural } from '../../lib/format'
import { Tabs } from '../ui/Tabs'
import { FightCard } from './FightCard'
import s from './FightCardList.module.css'

const headline = (f: FightView) => f.cardType === 'main' || f.cardType === 'co-main'

type Props = {
  fights: FightView[]
  /** Hide the filter tabs (e.g. short cards on the homepage). */
  filterable?: boolean
}

/** A full fight card grouped into Main Card / Featured / Prelims, with animated filtering. */
export function FightCardList({ fights, filterable = true }: Props) {
  const panelId = useId()
  const [group, setGroup] = useState('all')
  const [division, setDivision] = useState('')

  const groups = cardGroups
    .map((g) => ({ ...g, fights: fights.filter((f) => g.types.includes(f.cardType)) }))
    .filter((g) => g.fights.length)
  const presentDivisions = divisions.filter((d) => fights.some((f) => f.divisionId === d.id))

  const visible = groups
    .filter((g) => group === 'all' || g.id === group)
    .map((g) => ({ ...g, fights: g.fights.filter((f) => !division || f.divisionId === division) }))
    .filter((g) => g.fights.length)

  if (!fights.length) {
    return <p className={s.empty}>Karta zápasů pro tuto akci zatím nebyla oznámena.</p>
  }

  return (
    <div>
      {filterable && groups.length > 1 && (
        <div className={s.controls}>
          <Tabs
            label="Filtr karty zápasů"
            controls={panelId}
            value={group}
            onChange={setGroup}
            items={[{ id: 'all', label: 'Vše', count: fights.length }, ...groups.map((g) => ({ id: g.id, label: g.label, count: g.fights.length }))]}
          />
          {presentDivisions.length > 1 && (
            <label className={s.division}>
              <span className="sr-only">Váhová kategorie</span>
              <select value={division} onChange={(e) => setDivision(e.target.value)}>
                <option value="">Všechny kategorie</option>
                {presentDivisions.map((d) => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
            </label>
          )}
        </div>
      )}

      <div id={panelId} role={filterable ? 'tabpanel' : undefined} className={s.groups}>
        <AnimatePresence initial={false} mode="popLayout">
          {visible.map((g) => (
            <motion.section
              key={g.id}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              aria-label={g.label}
            >
              <h3 className={s.groupTitle}>
                {g.label} <span className={s.groupCount}>{plural(g.fights.length, 'zápas', 'zápasy', 'zápasů')}</span>
              </h3>
              <ol className={s.list}>
                {g.fights.map((f) => (
                  <li key={f.id}>
                    <FightCard fight={f} variant={headline(f) ? 'headline' : 'row'} />
                  </li>
                ))}
              </ol>
            </motion.section>
          ))}
        </AnimatePresence>
        {!visible.length && <p className={s.empty}>Filtrům neodpovídá žádný zápas.</p>}
      </div>
    </div>
  )
}
