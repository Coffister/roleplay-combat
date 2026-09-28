import { useId } from 'react'
import { useSearchParams } from 'react-router'
import { Seo } from '../lib/seo'
import { getRankings } from '../lib/queries'
import { RankingList } from '../components/ranking'
import { PageHeader, Section } from '../components/ui/Layout'
import { Tabs } from '../components/ui/Tabs'
import s from './pages.module.css'

export default function RankingsPage() {
  const panelId = useId()
  const rankings = getRankings()
  const [params, setParams] = useSearchParams()
  const active = rankings.find((r) => r.divisionId === params.get('division')) ?? rankings[0]

  return (
    <>
      <Seo title="Žebříčky" description="Oficiální žebříčky CMRP Combat pro všechny kategorie, aktualizované po každé akci." />
      <PageHeader eyebrow="Oficiální" title="Žebříčky" intro="Sestavuje matchmakingová komise po každé akci.">
        {rankings.length > 1 && (
          <Tabs
            size="lg"
            label="Kategorie"
            controls={panelId}
            value={active?.divisionId ?? ''}
            onChange={(id) => setParams({ division: id }, { replace: true, preventScrollReset: true })}
            items={rankings.map((r) => ({ id: r.divisionId, label: r.divisionName }))}
          />
        )}
      </PageHeader>
      <Section>
        <div id={panelId} role="tabpanel" aria-label={active ? `Žebříček – ${active.divisionName}` : undefined} className={s.narrow}>
          {active ? <RankingList ranking={active} /> : <p className={s.empty}>Žebříčky zveřejníme po první akci.</p>}
        </div>
      </Section>
    </>
  )
}
