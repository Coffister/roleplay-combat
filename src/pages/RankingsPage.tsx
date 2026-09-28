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
      <Seo title="Rankings" description="Official CMRP Combat rankings for every division, updated after each event." />
      <PageHeader eyebrow="Official" title="Rankings" intro="Voted by the matchmaking panel after every event.">
        {rankings.length > 1 && (
          <Tabs
            size="lg"
            label="Division"
            controls={panelId}
            value={active?.divisionId ?? ''}
            onChange={(id) => setParams({ division: id }, { replace: true, preventScrollReset: true })}
            items={rankings.map((r) => ({ id: r.divisionId, label: r.divisionName }))}
          />
        )}
      </PageHeader>
      <Section>
        <div id={panelId} role="tabpanel" aria-label={active ? `${active.divisionName} rankings` : undefined} className={s.narrow}>
          {active ? <RankingList ranking={active} /> : <p className={s.empty}>Rankings will be published after the first event.</p>}
        </div>
      </Section>
    </>
  )
}
