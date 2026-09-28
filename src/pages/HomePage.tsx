import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'
import { Seo } from '../lib/seo'
import {
  getEventCard, getFeaturedFighters, getMainEvent, getNews, getNextEvent,
  getPastEvents, getRank, getRankings, getResults, getUpcomingEvents,
} from '../lib/queries'
import { eventTitle, formatDateLong, formatTime, formatWeekday } from '../lib/format'
import { EventHero } from '../components/event/EventHero'
import { EventCard } from '../components/event/EventCard'
import { Countdown } from '../components/event/Countdown'
import { FightCardList } from '../components/fight/FightCardList'
import { ResultCard } from '../components/fight/ResultCard'
import { FighterCard } from '../components/fighter'
import { RankingList } from '../components/ranking'
import { NewsCard } from '../components/news'
import { LinkButton } from '../components/ui/Button'
import { Section, SectionHeader } from '../components/ui/Layout'
import { StatusBadge } from '../components/ui/Badge'
import { Reveal } from '../components/effects'
import s from './HomePage.module.css'

export default function HomePage() {
  const next = getNextEvent()
  const featured = next ?? getPastEvents()[0]
  const main = featured && getMainEvent(featured.id)
  const card = next ? getEventCard(next.id) : []
  const laterEvents = getUpcomingEvents().filter((e) => e.id !== next?.id)
  const fighters = getFeaturedFighters(4)
  const rankings = getRankings()
  const results = getResults().slice(0, 4)
  const [lead, ...moreNews] = getNews().slice(0, 3)
  let n = 0
  const idx = () => String(++n).padStart(2, '0')

  return (
    <>
      <Seo />

      {featured && (
        <EventHero
          event={featured}
          mainEvent={main}
          eyebrow={next ? 'Další akce' : 'Poslední akce'}
          actions={
            <>
              <LinkButton to={`/events/${featured.id}`} size="lg" moving>
                {next ? 'Karta zápasů' : 'Výsledky'} <ArrowRight aria-hidden />
              </LinkButton>
              <LinkButton to="/register" size="lg" variant="outline">Staň se zápasníkem</LinkButton>
            </>
          }
        />
      )}

      {next && (
        <Section tone="surface" aria-labelledby="next-title" className={s.next}>
          <div className={s.nextGrid}>
            <div className={s.nextInfo}>
              <p className="label">{idx()} — Další akce</p>
              <h2 id="next-title" className={s.nextTitle}>{eventTitle(next)}</h2>
              <dl className={s.nextFacts}>
                <div><dt className="label">Datum</dt><dd>{formatWeekday(next.date)}, {formatDateLong(next.date)}</dd></div>
                <div><dt className="label">Začátek</dt><dd>{formatTime(next.date)}</dd></div>
                <div><dt className="label">Místo</dt><dd>{next.venue ?? '—'}, {next.location}</dd></div>
                <div><dt className="label">Stav</dt><dd><StatusBadge status={next.status} /></dd></div>
              </dl>
            </div>
            <div className={s.nextCountdown}>
              <Countdown date={next.date} size="lg" />
              {main && (
                <p className={s.nextMain}>
                  <span className="label">Hlavní zápas</span>{' '}
                  {main.a.fighter.lastName} vs {main.b.fighter.lastName}
                </p>
              )}
            </div>
          </div>
        </Section>
      )}

      {next && card.length > 0 && (
        <Section aria-labelledby="card-title">
          <SectionHeader index={idx()} eyebrow={eventTitle(next)} title="Karta zápasů" id="card-title" action={{ label: 'Detail akce', to: `/events/${next.id}` }} />
          <FightCardList fights={card} />
        </Section>
      )}

      {laterEvents.length > 0 && (
        <Section aria-labelledby="upcoming-title" tone="surface">
          <SectionHeader index={idx()} eyebrow="V kalendáři" title="Nadcházející akce" id="upcoming-title" action={{ label: 'Všechny akce', to: '/events' }} />
          <div className={s.events}>
            {laterEvents.map((e, i) => (
              <Reveal key={e.id} delay={i * 0.08}>
                <EventCard event={e} mainEvent={getMainEvent(e.id)} fightCount={getEventCard(e.id).length} variant={i === 0 ? 'feature' : 'default'} />
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      <Section aria-labelledby="fighters-title">
        <SectionHeader index={idx()} eyebrow="Šampioni" title="Tváře organizace" id="fighters-title" action={{ label: 'Všichni zápasníci', to: '/fighters' }} />
        <ul className={s.fighters}>
          {fighters.map((f, i) => (
            <li key={f.id}>
              <Reveal delay={i * 0.06}><FighterCard fighter={f} rank={getRank(f.id)} /></Reveal>
            </li>
          ))}
        </ul>
      </Section>

      <Section aria-labelledby="rankings-title" tone="surface">
        <SectionHeader index={idx()} eyebrow="Kdo je na řadě" title="Žebříčky" id="rankings-title" action={{ label: 'Všechny žebříčky', to: '/rankings' }} />
        <div className={s.rankings}>
          {rankings.map((r) => (
            <section key={r.divisionId} aria-label={`Žebříček – ${r.divisionName}`}>
              <h3 className={s.rankTitle}>
                <Link to={`/rankings?division=${r.divisionId}`}>{r.divisionName}</Link>
              </h3>
              <RankingList ranking={{ ...r, entries: r.entries.slice(0, 3) }} compact />
            </section>
          ))}
        </div>
      </Section>

      {results.length > 0 && (
        <Section aria-labelledby="results-title">
          <SectionHeader index={idx()} eyebrow="Nejnovější" title="Výsledky" id="results-title" action={{ label: 'Všechny výsledky', to: '/results' }} />
          <ul className={s.results}>
            {results.map((f) => <li key={f.id}><ResultCard fight={f} /></li>)}
          </ul>
        </Section>
      )}

      {lead && (
        <Section aria-labelledby="news-title" tone="surface">
          <SectionHeader index={idx()} eyebrow="Z organizace" title="Novinky" id="news-title" action={{ label: 'Všechny novinky', to: '/news' }} />
          <div className={s.news}>
            <NewsCard article={lead} variant="lead" />
            <div className={s.newsMore}>
              {moreNews.map((a) => <NewsCard key={a.slug} article={a} />)}
            </div>
          </div>
        </Section>
      )}

      <section className={s.join} aria-labelledby="join-title">
        <div className={s.joinInner}>
          <p className="label">Registrace otevřena · Všechny kategorie</p>
          <h2 id="join-title" className={s.joinTitle}>Vstup<br /> do klece</h2>
          <p className={s.joinText}>Myslíš, že na to máš? Zaregistruj svého zápasníka a dostaň se na soupisku.</p>
          <LinkButton to="/register" size="lg">Staň se zápasníkem <ArrowRight aria-hidden /></LinkButton>
        </div>
      </section>
    </>
  )
}
