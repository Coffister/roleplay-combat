import type { CardType, Division, FightMethod } from '../types'

/** Divisions in display order. Rankings, filters and the registration form all read from here. */
export const divisions: Division[] = [
  { id: 'lightweight', name: 'Lehká váha', limit: '70 kg' },
  { id: 'welterweight', name: 'Velterová váha', limit: '77 kg' },
  { id: 'middleweight', name: 'Střední váha', limit: '84 kg' },
  { id: 'heavyweight', name: 'Těžká váha', limit: '120 kg' },
]

export const cardTypeLabels: Record<CardType, string> = {
  main: 'Hlavní zápas',
  'co-main': 'Co-main event',
  featured: 'Vybraný zápas',
  prelim: 'Předkarta',
}

/** Groups used by the fight card filter. A fight belongs to exactly one group. */
export const cardGroups: { id: string; label: string; types: CardType[] }[] = [
  { id: 'main', label: 'Hlavní karta', types: ['main', 'co-main'] },
  { id: 'featured', label: 'Vybrané', types: ['featured'] },
  { id: 'prelim', label: 'Předkarta', types: ['prelim'] },
]

export const methodLabels: Record<FightMethod, string> = {
  KO: 'KO',
  TKO: 'TKO',
  SUB: 'Submise',
  UD: 'Jednohlasné rozhodnutí',
  SD: 'Nejednotné rozhodnutí',
  MD: 'Většinové rozhodnutí',
  DRAW: 'Remíza',
  NC: 'Bez výsledku',
  DQ: 'Diskvalifikace',
}

/** Short form shown large on result cards. */
export const methodShortLabels: Record<FightMethod, string> = {
  KO: 'KO',
  TKO: 'TKO',
  SUB: 'Submise',
  UD: 'Body',
  SD: 'Body',
  MD: 'Body',
  DRAW: 'Remíza',
  NC: 'NC',
  DQ: 'DQ',
}

export const fightingStyles = [
  'Box',
  'Kickbox',
  'Thajský box',
  'Brazilské jiu-jitsu',
  'Zápas',
  'Judo',
  'Karate',
  'Sambo',
  'Pouliční rváč',
  'Kombinovaný',
]
