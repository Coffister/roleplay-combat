import { useId } from 'react'
import { useSearchParams } from 'react-router'
import { Search } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { Seo } from '../lib/seo'
import { getDivisions, getFighters, getRank } from '../lib/queries'
import { plural } from '../lib/format'
import { FighterCard } from '../components/fighter'
import { PageHeader, Section } from '../components/ui/Layout'
import { Tabs } from '../components/ui/Tabs'
import s from './pages.module.css'

const normalize = (t: string) => t.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase()

export default function FightersPage() {
  const panelId = useId()
  const [params, setParams] = useSearchParams()
  const division = params.get('division') ?? 'all'
  const q = params.get('q') ?? ''

  const update = (key: string, value: string, empty: string) =>
    setParams((p) => {
      if (value === empty) p.delete(key)
      else p.set(key, value)
      return p
    }, { replace: true })

  const all = getFighters()
  // Champions first, then ranked, then the rest, alphabetically within each.
  const fighters = all
    .filter((f) => division === 'all' || f.divisionId === division)
    .filter((f) => !q || normalize(`${f.firstName} ${f.lastName} ${f.nickname ?? ''}`).includes(normalize(q)))
    .sort((a, b) => (getRank(a.id) ?? 99) - (getRank(b.id) ?? 99) || a.lastName.localeCompare(b.lastName))

  const tabs = [
    { id: 'all', label: 'Vše', count: all.length },
    ...getDivisions().map((d) => ({ id: d.id, label: d.name, count: all.filter((f) => f.divisionId === d.id).length })),
  ]

  return (
    <>
      <Seo title="Zápasníci" description="Kompletní soupiska CMRP Combat: šampioni, vyzyvatelé a talenty ve všech kategoriích." />
      <PageHeader eyebrow="Soupiska" title="Zápasníci" intro={`${plural(all.length, 'zápasník', 'zápasníci', 'zápasníků')} · ${plural(getDivisions().length, 'váhová kategorie', 'váhové kategorie', 'váhových kategorií')}`}>
        <div className={s.toolbar}>
          <Tabs label="Kategorie" controls={panelId} value={division} onChange={(v) => update('division', v, 'all')} items={tabs} />
          <label className={s.search}>
            <Search size={16} aria-hidden />
            <span className="sr-only">Hledat zápasníky</span>
            <input type="search" placeholder="Hledat podle jména" value={q} onChange={(e) => update('q', e.target.value, '')} />
          </label>
        </div>
      </PageHeader>

      <Section>
        <div id={panelId} role="tabpanel" aria-live="polite">
          {fighters.length ? (
            <motion.ul layout className={s.fighterGrid}>
              <AnimatePresence initial={false} mode="popLayout">
                {fighters.map((f) => (
                  <motion.li key={f.id} layout initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.25 }}>
                    <FighterCard fighter={f} rank={getRank(f.id)} />
                  </motion.li>
                ))}
              </AnimatePresence>
            </motion.ul>
          ) : (
            <p className={s.empty}>Hledání „{q}“ neodpovídá žádný zápasník.</p>
          )}
        </div>
      </Section>
    </>
  )
}
