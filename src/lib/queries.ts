/**
 * The only module that reads from src/data. Swap these bodies for API calls
 * later and the pages keep working.
 */
import { events } from '../data/events'
import { fighters } from '../data/fighters'
import { fights } from '../data/fights'
import { news } from '../data/news'
import { rankings } from '../data/rankings'
import { divisions } from '../config/site'
import type { Fight, FightEvent, Fighter } from '../types'

const fighterById = new Map(fighters.map((f) => [f.id, f]))

export const getFighters = () => fighters
export const getFighter = (id: string) => fighterById.get(id)
export const getDivision = (id: string) => divisions.find((d) => d.id === id)
export const getDivisions = () => divisions

const byDateAsc = (a: FightEvent, b: FightEvent) => a.date.localeCompare(b.date)

export const getEvent = (id: string) => events.find((e) => e.id === id)
export const getUpcomingEvents = () => events.filter((e) => e.status !== 'completed').sort(byDateAsc)
export const getPastEvents = () => events.filter((e) => e.status === 'completed').sort(byDateAsc).reverse()
export const getNextEvent = (): FightEvent | undefined => getUpcomingEvents()[0]

/** Ranking position for a fighter: 0 = champion, 1..n = ranked, undefined = unranked. */
export function getRank(fighterId: string): number | undefined {
  for (const r of rankings) {
    if (r.championId === fighterId) return 0
    const entry = r.entries.find((e) => e.fighterId === fighterId)
    if (entry) return entry.position
  }
}

export type Corner = { fighter: Fighter; rank?: number; outcome?: 'win' | 'loss' | 'draw' }
export type FightView = Fight & { a: Corner; b: Corner; event: FightEvent }

function outcome(fight: Fight, id: string): Corner['outcome'] {
  const r = fight.result
  if (!r) return undefined
  if (!r.winnerId) return 'draw'
  return r.winnerId === id ? 'win' : 'loss'
}

/** Joins a fight with its fighters, rankings and event. Skips fights referencing missing data. */
function view(fight: Fight): FightView | undefined {
  const a = getFighter(fight.fighterA)
  const b = getFighter(fight.fighterB)
  const event = getEvent(fight.eventId)
  if (!a || !b || !event) return undefined
  return {
    ...fight,
    event,
    a: { fighter: a, rank: getRank(a.id), outcome: outcome(fight, a.id) },
    b: { fighter: b, rank: getRank(b.id), outcome: outcome(fight, b.id) },
  }
}

const views = (list: Fight[]) => list.map(view).filter((v): v is FightView => !!v)

export const getEventCard = (eventId: string) =>
  views(fights.filter((f) => f.eventId === eventId).sort((x, y) => x.order - y.order))

export const getMainEvent = (eventId: string) => getEventCard(eventId)[0]

/** Completed fights, newest event first. */
export const getResults = () =>
  views(fights.filter((f) => f.status === 'completed')).sort(
    (x, y) => y.event.date.localeCompare(x.event.date) || x.order - y.order,
  )

export type HistoryRow = {
  fight: FightView
  opponent: Fighter
  outcome: Corner['outcome']
}

export function getFighterHistory(fighterId: string): HistoryRow[] {
  return getResults()
    .filter((f) => f.fighterA === fighterId || f.fighterB === fighterId)
    .map((fight) => {
      const [me, them] = fight.fighterA === fighterId ? [fight.a, fight.b] : [fight.b, fight.a]
      return { fight, opponent: them.fighter, outcome: me.outcome }
    })
}

export const getFighterUpcoming = (fighterId: string) =>
  views(fights.filter((f) => f.status !== 'completed' && (f.fighterA === fighterId || f.fighterB === fighterId)))

export type RankingView = {
  divisionId: string
  divisionName: string
  updatedAt: string
  champion?: Fighter
  entries: { fighter: Fighter; position: number; previousPosition?: number }[]
}

/** Rankings in the order divisions are configured. */
export function getRankings(): RankingView[] {
  return divisions.flatMap((d) => {
    const r = rankings.find((x) => x.divisionId === d.id)
    if (!r) return []
    return [{
      divisionId: d.id,
      divisionName: d.name,
      updatedAt: r.updatedAt,
      champion: r.championId ? getFighter(r.championId) : undefined,
      entries: r.entries
        .flatMap((e) => {
          const fighter = getFighter(e.fighterId)
          return fighter ? [{ ...e, fighter }] : []
        })
        .sort((x, y) => x.position - y.position),
    }]
  })
}

/** Champions and top contenders first, for featured-fighter strips. */
export function getFeaturedFighters(limit = 6): Fighter[] {
  const r = getRankings()
  const champs = r.flatMap((x) => (x.champion ? [x.champion] : []))
  const contenders = r.flatMap((x) => x.entries.slice(0, 1).map((e) => e.fighter))
  return [...champs, ...contenders].slice(0, limit)
}

export const getNews = () => [...news].sort((a, b) => b.date.localeCompare(a.date))
export const getArticle = (slug: string) => news.find((n) => n.slug === slug)
