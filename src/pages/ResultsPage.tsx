import { useSearchParams } from 'react-router'
import { Seo } from '../lib/seo'
import { getDivisions, getResults } from '../lib/queries'
import { eventTitle, formatDateLong, plural, yearOf } from '../lib/format'
import { ResultCard } from '../components/fight/ResultCard'
import { FilterBar } from '../components/ui/FilterBar'
import { PageHeader, Section } from '../components/ui/Layout'
import type { FightView } from '../lib/queries'
import s from './pages.module.css'

export default function ResultsPage() {
  const [params, setParams] = useSearchParams()
  const all = getResults()
  const event = params.get('event') ?? ''
  const division = params.get('division') ?? ''
  const year = params.get('year') ?? ''

  const set = (key: string) => (value: string) =>
    setParams((p) => {
      if (value) p.set(key, value)
      else p.delete(key)
      return p
    }, { replace: true, preventScrollReset: true })

  const results = all.filter(
    (f) => (!event || f.eventId === event) && (!division || f.divisionId === division) && (!year || yearOf(f.event.date) === year),
  )

  // Group by event, preserving newest-first order.
  const groups = new Map<string, FightView[]>()
  for (const f of results) groups.set(f.eventId, [...(groups.get(f.eventId) ?? []), f])

  const events = [...new Map(all.map((f) => [f.event.id, f.event])).values()]
  const years = [...new Set(all.map((f) => yearOf(f.event.date)))]

  return (
    <>
      <Seo title="Výsledky" description="Všechny výsledky zápasů CMRP Combat s filtrem podle akce, kategorie a roku." />
      <PageHeader eyebrow="Historie" title="Výsledky" intro={`${plural(all.length, 'zápas', 'zápasy', 'zápasů')} · ${plural(events.length, 'akce', 'akce', 'akcí')}`}>
        <FilterBar
          onReset={() => setParams({}, { replace: true, preventScrollReset: true })}
          filters={[
            { id: 'event', label: 'Akce', value: event, onChange: set('event'), options: events.map((e) => ({ value: e.id, label: eventTitle(e) })) },
            { id: 'division', label: 'Kategorie', value: division, onChange: set('division'), options: getDivisions().map((d) => ({ value: d.id, label: d.name })) },
            { id: 'year', label: 'Rok', value: year, onChange: set('year'), options: years.map((y) => ({ value: y, label: y })) },
          ]}
        />
      </PageHeader>

      <Section>
        <p className="sr-only" aria-live="polite">Výsledků: {results.length}</p>
        {groups.size ? (
          <div className={s.resultGroups}>
            {[...groups].map(([id, fights]) => (
              <section key={id} aria-labelledby={`r-${id}`}>
                <header className={s.resultHeader}>
                  <h2 id={`r-${id}`} className={s.resultTitle}>{eventTitle(fights[0].event)}</h2>
                  <p className="label">{formatDateLong(fights[0].event.date)} · {fights[0].event.venue ?? fights[0].event.location}</p>
                </header>
                <ul className={s.list}>
                  {fights.map((f) => <li key={f.id}><ResultCard fight={f} showEvent={false} /></li>)}
                </ul>
              </section>
            ))}
          </div>
        ) : (
          <p className={s.empty}>Filtrům neodpovídá žádný výsledek.</p>
        )}
      </Section>
    </>
  )
}
