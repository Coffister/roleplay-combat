import { brand } from '../config/brand'
import type { Fighter, FightEvent } from '../types'

const { locale, timeZone } = brand

const fmt = (opts: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat(locale, { timeZone, ...opts })

const dateLong = fmt({ day: 'numeric', month: 'long', year: 'numeric' })
const dateShort = fmt({ day: '2-digit', month: 'short', year: 'numeric' })
const weekday = fmt({ weekday: 'long' })
const time = fmt({ hour: '2-digit', minute: '2-digit', hour12: false })

export const formatDateLong = (iso: string) => dateLong.format(new Date(iso))
export const formatDateShort = (iso: string) => dateShort.format(new Date(iso))
export const formatWeekday = (iso: string) => weekday.format(new Date(iso))
export const formatTime = (iso: string) => time.format(new Date(iso))
export const yearOf = (iso: string) => fmt({ year: 'numeric' }).format(new Date(iso))

export const fullName = (f: Fighter) => `${f.firstName} ${f.lastName}`
export const formatRecord = (r: Fighter['record']) => `${r.wins}-${r.losses}-${r.draws}`

export const eventTitle = (e: FightEvent) => (e.number ? `${e.name} ${e.number}` : e.name)

/** "Š" for šampion, "#3" for ranked, empty when unranked. */
export const rankLabel = (rank?: number) => (rank === 0 ? 'Š' : rank ? `#${rank}` : '')

export const pad2 = (n: number) => String(n).padStart(2, '0')
export const formatDay = (iso: string) => fmt({ day: '2-digit' }).format(new Date(iso))
/** Month in genitive to follow the day number ("prosince 2026"), since Intl gives the nominative for a bare month. */
export const formatMonthYear = (iso: string) => formatDateLong(iso).replace(/^\d+\.\s*/, '')

/** Czech plural: 1 zápas, 2–4 zápasy, 5+ zápasů. */
export const plural = (n: number, one: string, few: string, many: string) =>
  `${n} ${n === 1 ? one : n >= 2 && n <= 4 ? few : many}`
export const roundsLabel = (n: number) => plural(n, 'kolo', 'kola', 'kol')
